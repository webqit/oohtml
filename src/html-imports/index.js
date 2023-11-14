
/**
 * @imports
 */
import Observer from '@webqit/observer';
import _HTMLExportsManager from './_HTMLExportsManager.js';
import _HTMLImportElement from './_HTMLImportElement.js';
import _HTMLImportsProvider from './_HTMLImportsProvider.js';
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
        template: { attr: { moduledef: 'def', fragmentdef: 'def', extends: 'extends', inherits: 'inherits' }, api: { modules: 'modules', moduledef: 'def' }, },
        context: { attr: { importscontext: 'importscontext', }, api: { import: 'import' }, },
        import: { tagName: 'import', attr: { moduleref: 'ref' }, },
        staticsensitivity: true,
        isomorphic: true,
    } );
    config.CONTEXT_API = window.webqit.oohtml.configs.CONTEXT_API;
    config.context.attr.contextname = config.CONTEXT_API.attr.contextname; // Inherit this
    config.templateSelector = `template[${ window.CSS.escape( config.template.attr.moduledef ) }]`;
    config.ownerContextSelector = [ config.context.attr.contextname, config.context.attr.importscontext ].map( a => `[${ window.CSS.escape( a ) }]` ).join( ',' );
    config.slottedElementsSelector = `[${ window.CSS.escape( config.template.attr.fragmentdef ) }]`;
    const anchorNodeMatch = ( start, end ) => {
        const starting = `starts-with(., "${ start }")`;
        const ending = `substring(., string-length(.) - string-length("${ end }") + 1) = "${ end }"`;
        return `${ starting } and ${ ending }`;
    }
    config.anchorNodeSelector = `comment()[${ anchorNodeMatch( `&lt;${ config.import.tagName }`, `&lt;/${ config.import.tagName }&gt;` ) }]`;
    window.webqit.HTMLImportElement = _HTMLImportElement.call( window, config );
    window.webqit.HTMLImportsProvider = class extends _HTMLImportsProvider {
        static get config() { return config; }
    };
    window.webqit.Observer = Observer;
    exposeAPIs.call( window, config );
    realtime.call( window, config );
}

export { Observer }

/**
 * Returns the "exports" object associated with the given node.
 *
 * @param Element       node
 * @param Bool          autoCreate
 *
 * @return Object
 */
export function getModulesObject( node, autoCreate = true ) {
	if ( !_( node ).has( 'modules' ) && autoCreate ) {
		const modulesObj = Object.create( null );
		_( node ).set( 'modules', modulesObj );
	}
	return _( node ).get( 'modules' );
}

/**
 * Exposes HTML Modules with native APIs.
 *
 * @param Object        config
 *
 * @return Void
 */
function exposeAPIs( config ) {
    const window = this;
    // Assertions
    if ( config.template.api.modules in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.template.api.modules }" property!` ); }
    if ( config.template.api.moduledef in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.template.api.moduledef }" property!` ); }
    if ( config.context.api.import in window.document ) { throw new Error( `document already has a "${ config.context.api.import }" property!` ); }
    if ( config.context.api.import in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ config.context.api.import }" property!` ); }
    // Definitions
    Object.defineProperty( window.HTMLTemplateElement.prototype, config.template.api.modules, { get: function() {
        return getModulesObject( this );
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
        let options = { detail: ref };
        if ( typeof live === 'function' ) {
            callback = live;
            live = false;
        } else if ( typeof live === 'object' && live ) {
            options = { ...live, ...options };
        }
        const request = _HTMLImportsProvider.createRequest( options );
        return context[ config.CONTEXT_API.api.context ].request( request, callback );
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
    const window = this, { realdom, HTMLImportElement, HTMLImportsProvider } = window.webqit;
    // ------------
    // MODULES
    // ------------
    const attachImportsContext = host => {
        const contextId = HTMLImportsProvider.createId( host );
        HTMLImportsProvider.attachTo( host, contextId );
    };
    const detachImportsContext = ( host, force ) => {
        const contextId = HTMLImportsProvider.createId( host );
        HTMLImportsProvider.detachFrom( host, contextId, cx => {
            return force || host.matches && !host.matches( config.ownerContextSelector ) && !Object.keys( cx.localModules ).length;
        } );
    };
    // ------------
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( [ config.templateSelector, config.ownerContextSelector ], record => {
        record.entrants.forEach( entry => {
            if ( entry.matches( config.templateSelector ) ) {
                Object.defineProperty( entry, 'scoped', { value: entry.hasAttribute( 'scoped' ) } ); 
                const moduleExport = new _HTMLExportsManager( window, entry, config );
                moduleExport.ownerContext = entry.scoped ? record.target : window.document;
                const ownerContextModulesObj = getModulesObject( moduleExport.ownerContext );
                if ( moduleExport.exportId ) { Observer.set( ownerContextModulesObj, moduleExport.exportId, entry ); }
                // The ownerContext's modulesObj - ownerContextModulesObj - has to be populated
                // Before attaching a context instance to it, to give the just created context something to use for
                // fullfiling reclaimed requests.
                attachImportsContext( moduleExport.ownerContext );
            } else {
                attachImportsContext( entry );
            }
        } );
        record.exits.forEach( entry => {
            if ( entry.matches( config.templateSelector ) ) {
                const moduleExport = _HTMLExportsManager.instance( window, entry, config );
                const ownerContextModulesObj = getModulesObject( moduleExport.ownerContext );
                if ( moduleExport.exportId ) { Observer.deleteProperty( ownerContextModulesObj, moduleExport.exportId ); }
                detachImportsContext( moduleExport.ownerContext );
            } else {
                detachImportsContext( entry, true );
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
    function handleRealtime( entry, connectedState, record ) {
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