
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import _HTMLImportElement from './_HTMLImportElement.js';
import { _ } from '../util.js';

/**
 * Initializes HTML Modules.
 * 
 * @param $params  Object
 *
 * @return Void
 */
export default function init( $params = { }) {
    const window = this, dom = wqDom.call( window );
    if ( !window.wq ) { window.wq = {}; }
    // -------
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        import: { tagName: 'import', attr: { moduleref: 'module' }, },
        export: { attr: { exportid: 'exportid' }, },
        isomorphic: true,
    } );
    params.slottedElementsSelector = `[${ window.CSS.escape( params.export.attr.exportid ) }]`;
    // -------
    window.wq.HTMLImportElement = _HTMLImportElement.call( this, params );
    // -------
    dom.ready( () => hydration.call( this, params ) );
    realtime.call( this, params );
}

/**
 * Performs realtime capture of elements and their attributes
 * and their module query results; then resolves the respective import elements.
 *
 * @param Object params
 *
 * @return Void
 */
function realtime( params ) {
    const window = this, { dom, HTMLImportElement } = window.wq;
    dom.realtime( window.document ).observe( params.import.tagName, record => {
        record.entrants.forEach( node => handleRealtime( node, true, record ) );
        record.exits.forEach( node => handleRealtime( node, false, record ) );
    }, { subtree: true, timing: 'sync' } );
    function handleRealtime( entry, connectedState, record ) {
        const elInstance = HTMLImportElement.instance( entry );
        if ( connectedState ) { elInstance[ '#' ].connectedCallback(); }
        else { elInstance[ '#' ].disconnectedCallback(); }
    }
}

/**
 * Performs hydration for server-slotted elements.
 *
 * @param Object params
 *
 * @return Void
 */
function hydration( params ) {
    const window = this, { HTMLImportElement } = window.wq;
    function scan( context ) {
        const slottedElements = new Set;
        context.childNodes.forEach( node => {
            if ( node.nodeType === 1/** ELEMENT_NODE */ ) {
                if ( !node.matches( params.slottedElementsSelector ) ) return;
                if ( _( node ).get( 'slot@imports' ) ) return;
                slottedElements.add( node );
            } else if ( node.nodeType === 8/** COMMENT_NODE */ ) {
                const nodeValue = node.nodeValue.trim();
                if ( !nodeValue.startsWith( '<' + params.import.tagName ) ) return;
                if ( !nodeValue.endsWith( '</' + params.import.tagName + '>' ) ) return;
                const reviver = window.document.createElement( 'div' );
                reviver.innerHTML = nodeValue;
                const importEl = reviver.firstChild;
                if ( !importEl.matches( params.import.tagName ) ) return;
                HTMLImportElement.instance( importEl )[ '#' ].hydrate(
                    node/* the comment node */, slottedElements
                );
                slottedElements.clear();
            }
        } );
    }
    Array.from( window.document.querySelectorAll( params.slottedElementsSelector ) ).forEach( slottedElement => {
        // hydration() might be running AFTER certain <slots> have resolved
        // and slottedElement might be a just-resolved node
        if ( _( slottedElement ).get( 'slot@imports' ) ) return;
        if ( _( slottedElement.parentNode ).get( 'alreadyscanned@imports' ) ) return;
        scan( slottedElement.parentNode );
        // Scanning is once for every parent
        _( slottedElement.parentNode ).set( 'alreadyscanned@imports', true );
    } );
}
