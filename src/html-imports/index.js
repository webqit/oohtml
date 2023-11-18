
/**
 * @imports
 */
import HTMLModule from './HTMLModule.js';
import HTMLImportsContext from './HTMLImportsContext.js';
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
        template: { attr: { moduledef: 'def', fragmentdef: 'def', extends: 'extends', inherits: 'inherits' }, api: { exports: 'exports', moduledef: 'def' }, },
        context: { attr: { importscontext: 'importscontext', }, api: { import: 'import' }, },
        import: { tagName: 'import', attr: { moduleref: 'ref' }, },
        staticsensitivity: true,
        isomorphic: true,
    } );
    config.templateSelector = `template[${ window.CSS.escape( config.template.attr.moduledef ) }]`;
    config.importsContextSelector = `[${ window.CSS.escape( config.context.attr.importscontext ) }]`;
    config.slottedElementsSelector = `[${ window.CSS.escape( config.template.attr.fragmentdef ) }]:not(template)`;
    const anchorNodeMatch = ( start, end ) => {
        const starting = `starts-with(., "${ start }")`;
        const ending = `substring(., string-length(.) - string-length("${ end }") + 1) = "${ end }"`;
        return `${ starting } and ${ ending }`;
    }
    config.anchorNodeSelector = `comment()[${ anchorNodeMatch( `&lt;${ config.import.tagName }`, `&lt;/${ config.import.tagName }&gt;` ) }]`;
    window.webqit.HTMLImportsContext = HTMLImportsContext;
    window.webqit.HTMLImportElement = _HTMLImportElement();
    exposeAPIs.call( window, config );
    realtime.call( window, config );
}

/**
 * Returns the "exports" object associated with the given node.
 *
 * @param Element       node
 * @param Bool          autoCreate
 *
 * @return Object
 */
export function getExports( node, autoCreate = true ) {
	if ( !_( node ).has( 'exports' ) && autoCreate ) {
		const exports = Object.create( null );
		_( node ).set( 'exports', exports );
	}
	return _( node ).get( 'exports' );
}

/**
 * Exposes HTML Modules with native APIs.
 *
 * @param Object        config
 *
 * @return Void
 */
function exposeAPIs( config ) {
    const window = this, { webqit: { oohtml: { configs } } } = window;
    // Assertions
    if ( config.template.api.exports in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.template.api.exports }" property!` ); }
    if ( config.template.api.moduledef in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.template.api.moduledef }" property!` ); }
    if ( config.context.api.import in window.document ) { throw new Error( `document already has a "${ config.context.api.import }" property!` ); }
    if ( config.context.api.import in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ config.context.api.import }" property!` ); }
    // Definitions
    Object.defineProperty( window.HTMLTemplateElement.prototype, config.template.api.exports, { get: function() {
        return getExports( this );
    } } );
    Object.defineProperty( window.HTMLTemplateElement.prototype, config.template.api.moduledef, { get: function() {
        return this.getAttribute( config.template.attr.moduledef );
    } } );
    Object.defineProperty( window.document, config.context.api.import, { value: function( ref, live = false, callback = null ) {
        return importRequest( window.document, ...arguments );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, config.context.api.import, { value: function( ref, live = false, callback = null ) {
        return importRequest( this, ...arguments );
    } } );
    function importRequest( context, ref, live = false, callback = null ) {
        let options = {};
        if ( typeof live === 'function' ) {
            callback = live;
            live = false;
        } else if ( typeof live === 'object' && live ) {
            options = { ...live, ...options };
        } else { options = { live }; }
        const request = { ...HTMLImportsContext.createRequest( ref ), ...options };
        return context[ configs.CONTEXT_API.api.contexts ].request( request, callback );
    }
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
    const window = this, { webqit: { Observer, realdom, oohtml: { configs }, HTMLImportElement, HTMLImportsContext } } = window;
    // ------------
    // MODULES
    // ------------
    const attachImportsContext = host => {
        const contextsApi = host[ configs.CONTEXT_API.api.contexts ];
        if ( !contextsApi.find( HTMLImportsContext.kind ) ) {
            contextsApi.attach( new HTMLImportsContext );
        }
    };
    const detachImportsContext = host => {
        const contextsApi = host[ configs.CONTEXT_API.api.contexts ];
        const ctx = contextsApi.find( HTMLImportsContext.kind );
        if ( ctx && ( /* disconnect? */!host.isConnected || /* not inheriting && no localModules? */(
            !host.matches?.( config.importsContextSelector ) && !Object.keys( ctx.localModules ).length
        ) ) ) {
            contextsApi.detach( ctx );
        }
    };
    // ------------
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( [ config.templateSelector, config.importsContextSelector ], record => {
        record.entrants.forEach( entry => {
            if ( entry.matches( config.templateSelector ) ) {
                Object.defineProperty( entry, 'scoped', { value: entry.hasAttribute( 'scoped' ) } ); 
                const htmlModule = HTMLModule.instance( entry );
                htmlModule.ownerContext = entry.scoped ? record.target : window.document;
                const ownerContextModulesObj = getExports( htmlModule.ownerContext );
                if ( htmlModule.defId ) { Observer.set( ownerContextModulesObj, htmlModule.defId, entry ); }
                // The ownerContext's exports - ownerContextModulesObj - has to be populated
                // Before attaching a context instance to it, to give the just created context something to use for
                // fullfiling reclaimed requests.
                attachImportsContext( htmlModule.ownerContext );
            } else {
                attachImportsContext( entry );
            }
        } );
        record.exits.forEach( entry => {
            if ( entry.matches( config.templateSelector ) ) {
                const htmlModule = HTMLModule.instance( entry );
                const ownerContextModulesObj = getExports( htmlModule.ownerContext );
                if ( htmlModule.defId ) { Observer.deleteProperty( ownerContextModulesObj, htmlModule.defId ); }
                detachImportsContext( htmlModule.ownerContext );
            } else {
                detachImportsContext( entry );
            }
        } );
    }, { live: true, timing: 'sync', staticSensitivity: config.staticsensitivity } );
    // ------------
    // IMPORTS
    // ------------
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.import.tagName, record => {
        record.entrants.forEach( node => handleRealtime( node, true, record ) );
        record.exits.forEach( node => handleRealtime( node, false, record ) );
    }, { live: true, timing: 'sync' } );
    function handleRealtime( entry, connectedState ) {
        const elInstance = HTMLImportElement.instance( entry );
        if ( connectedState ) { elInstance[ '#' ].connectedCallback(); }
        else { elInstance[ '#' ].disconnectedCallback(); }
    }
    // Hydration
    if ( window.webqit.env === 'server' ) return;
    realdom.realtime( window.document ).subtree( `(${ config.anchorNodeSelector })`, record => {
        record.entrants.forEach( anchorNode => {
            if ( _( anchorNode ).get( 'isAnchorNode' ) ) return; // Doubling up on the early return above! Ignoring every just created anchorNode
            const reviver = window.document.createElement( 'div' );
            reviver.innerHTML = anchorNode.nodeValue;
            reviver.innerHTML = reviver.firstChild.textContent;
            const importEl = reviver.firstChild;
            let nodecount = parseInt( importEl.getAttribute( 'data-nodecount' ) );
            const slottedElements = new Set;
            let slottedElement = anchorNode;
            while ( ( slottedElement = slottedElement.previousElementSibling ) && slottedElement.matches( config.slottedElementsSelector ) && nodecount -- ) {
                slottedElements.add( slottedElement );
            }
            HTMLImportElement.instance( importEl )[ '#' ].hydrate( anchorNode, slottedElements );
        } );
    }, { live: true } );
}