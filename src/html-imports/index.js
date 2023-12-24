
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
    const { config, window } = _init.call( this, 'html-imports', $config, {
        elements: { import: 'import', },
        attr: { def: 'def', extends: 'extends', inherits: 'inherits', ref: 'ref', importscontext: 'importscontext', },
        api: { def: 'def', defs: 'defs', import: 'import' },
    } );
    if ( !config.attr.fragmentdef ) { config.attr.fragmentdef = config.attr.def; }
    config.templateSelector = `template[${ window.CSS.escape( config.attr.def ) }]`;
    config.importsContextSelector = `[${ window.CSS.escape( config.attr.importscontext ) }]`;
    config.slottedElementsSelector = `[${ window.CSS.escape( config.attr.fragmentdef ) }]:not(template)`;
    const anchorNodeMatch = ( start, end ) => {
        const starting = `starts-with(., "${ start }")`;
        const ending = `substring(., string-length(.) - string-length("${ end }") + 1) = "${ end }"`;
        return `${ starting } and ${ ending }`;
    }
    config.anchorNodeSelector = `comment()[${ anchorNodeMatch( `&lt;${ config.elements.import }`, `&lt;/${ config.elements.import }&gt;` ) }]`;
    window.webqit.HTMLImportsContext = HTMLImportsContext;
    window.webqit.HTMLImportElement = _HTMLImportElement();
    exposeAPIs.call( window, config );
    realtime.call( window, config );
}

/**
 * Returns the "defs" object associated with the given node.
 *
 * @param Element       node
 * @param Bool          autoCreate
 *
 * @return Object
 */
export function getDefs( node, autoCreate = true ) {
	if ( !_( node ).has( 'defs' ) && autoCreate ) {
		const defs = Object.create( null );
		_( node ).set( 'defs', defs );
	}
	return _( node ).get( 'defs' );
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
    if ( config.api.defs in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.api.defs }" property!` ); }
    if ( config.api.def in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.api.def }" property!` ); }
    if ( config.api.import in window.document ) { throw new Error( `document already has a "${ config.api.import }" property!` ); }
    if ( config.api.import in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ config.api.import }" property!` ); }
    // Definitions
    Object.defineProperty( window.HTMLTemplateElement.prototype, config.api.defs, { get: function() {
        return getDefs( this );
    } } );
    Object.defineProperty( window.HTMLTemplateElement.prototype, config.api.def, { get: function() {
        return this.getAttribute( config.attr.def );
    } } );
    Object.defineProperty( window.HTMLTemplateElement.prototype, 'scoped', {
        configurable: true,
        get() { return this.hasAttribute( 'scoped' ); },
        set( value ) { this.toggleAttribute( 'scoped', value ); },
    } );
    Object.defineProperty( window.document, config.api.import, { value: function( ref, live = false, callback = null ) {
        return importRequest( window.document, ...arguments );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, config.api.import, { value: function( ref, live = false, callback = null ) {
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
                const htmlModule = HTMLModule.instance( entry );
                htmlModule.ownerContext = entry.scoped ? record.target : window.document;
                const ownerContextModulesObj = getDefs( htmlModule.ownerContext );
                if ( htmlModule.defId ) { Observer.set( ownerContextModulesObj, htmlModule.defId, entry ); }
                // The ownerContext's defs - ownerContextModulesObj - has to be populated
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
                const ownerContextModulesObj = getDefs( htmlModule.ownerContext );
                if ( htmlModule.defId ) { Observer.deleteProperty( ownerContextModulesObj, htmlModule.defId ); }
                detachImportsContext( htmlModule.ownerContext );
            } else {
                detachImportsContext( entry );
            }
        } );
    }, { live: true, timing: 'sync', staticSensitivity: true } );
    
    // ------------
    // IMPORTS
    // ------------
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.elements.import, record => {
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