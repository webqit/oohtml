
/**
 * @imports
 */
import _HTMLImportElement from './_HTMLImportElement.js';
import { _, _init } from '../util.js';

/**
 * Initializes HTML Modules.
 * 
 * @param $config  Object
 *
 * @return Void
 */
export default function init( $config = {} ) {
    const { config, realdom, window } = _init.call( this, 'html-imports', $config, {
        import: { tagName: 'import', attr: { moduleref: 'module' }, },
        export: { attr: { exportid: 'exportid' }, },
        isomorphic: true,
    } );
    config.slottedElementsSelector = `[${ window.CSS.escape( config.export.attr.exportid ) }]`;
    window.webqit.HTMLImportElement = _HTMLImportElement.call( window, config );
    realdom.ready( () => hydration.call( window, config ) );
    realtime.call( window, config );
}

/**
 * Performs realtime capture of elements and their attributes
 * and their module query results; then resolves the respective import elements.
 *
 * @param Object config
 *
 * @return Void
 */
function realtime( config ) {
    const window = this, { realdom, HTMLImportElement } = window.webqit;
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.import.tagName, record => {
        record.entrants.forEach( node => handleRealtime( node, true, record ) );
        record.exits.forEach( node => handleRealtime( node, false, record ) );
    }, { live: true, timing: 'sync' } );
    function handleRealtime( entry, connectedState, record ) {
        const elInstance = HTMLImportElement.instance( entry );
        if ( connectedState ) { elInstance[ '#' ].connectedCallback(); }
        else { elInstance[ '#' ].disconnectedCallback(); }
    }
}

/**
 * Performs hydration for server-slotted elements.
 *
 * @param Object config
 *
 * @return Void
 */
function hydration( config ) {
    const window = this, { HTMLImportElement } = window.webqit;
    function scan( context ) {
        const slottedElements = new Set;
        context.childNodes.forEach( node => {
            if ( node.nodeType === 1/** ELEMENT_NODE */ ) {
                if ( !node.matches( config.slottedElementsSelector ) ) return;
                if ( _( node ).get( 'slot@imports' ) ) return;
                slottedElements.add( node );
            } else if ( node.nodeType === 8/** COMMENT_NODE */ ) {
                const nodeValue = node.nodeValue.trim();
                if ( !nodeValue.startsWith( '<' + config.import.tagName ) ) return;
                if ( !nodeValue.endsWith( '</' + config.import.tagName + '>' ) ) return;
                const reviver = window.document.createElement( 'div' );
                reviver.innerHTML = nodeValue;
                const importEl = reviver.firstChild;
                if ( !importEl.matches( config.import.tagName ) ) return;
                HTMLImportElement.instance( importEl )[ '#' ].hydrate(
                    node/* the comment node */, slottedElements
                );
                slottedElements.clear();
            }
        } );
    }
    Array.from( window.document.querySelectorAll( config.slottedElementsSelector ) ).forEach( slottedElement => {
        // hydration() might be running AFTER certain <slots> have resolved
        // and slottedElement might be a just-resolved node
        if ( _( slottedElement ).get( 'slot@imports' ) ) return;
        if ( _( slottedElement.parentNode ).get( 'alreadyscanned@imports' ) ) return;
        scan( slottedElement.parentNode );
        // Scanning is once for every parent
        _( slottedElement.parentNode ).set( 'alreadyscanned@imports', true );
    } );
}
