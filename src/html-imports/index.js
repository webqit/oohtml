
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { HTMLContext } from '../context-api/index.js';
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
        export: { attr: { exportid: 'def' }, },
        template: { attr: { exportid: 'def', extends: 'extends', inherits: 'inherits' }, api: { modules: 'modules', exportid: 'exportid' }, },
        context: { attr: { importscontext: 'importscontext', contextname: 'contextname' }, api: { modules: 'modules' }, },
        import: { tagName: 'import', attr: { moduleref: 'ref' }, },
        staticsensitivity: true,
        isomorphic: true,
    } );
    config.templateSelector = `template[${ window.CSS.escape( config.template.attr.exportid ) }]`;
    config.ownerContextSelector = [ config.context.attr.contextname, config.context.attr.importscontext ].map( a => `[${ window.CSS.escape( a ) }]` ).join( ',' );
    config.slottedElementsSelector = `[${ window.CSS.escape( config.export.attr.exportid ) }]`;
    window.webqit.HTMLImportElement = _HTMLImportElement.call( window, config );
    window.webqit.HTMLImportsProvider = class extends _HTMLImportsProvider {
        static get config() { return config; }
    };
    window.webqit.Observer = Observer;
    exposeModulesObjects.call( window, config );
    realdom.ready( () => hydration.call( window, config ) );
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
function exposeModulesObjects( config ) {
    const window = this;
    // Assertions
    if ( config.template.api.modules in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.template.api.modules }" property!` ); }
    if ( config.template.api.exportid in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.template.api.exportid }" property!` ); }
    if ( config.context.api.import in window.document ) { throw new Error( `document already has a "${ config.context.api.import }" property!` ); }
    if ( config.context.api.import in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ config.context.api.import }" property!` ); }
    // Definitions
    Object.defineProperty( window.HTMLTemplateElement.prototype, config.template.api.modules, { get: function() {
        return getModulesObject( this );
    } } );
    Object.defineProperty( window.HTMLTemplateElement.prototype, config.template.api.exportid, { get: function() {
        return this.getAttribute( config.template.attr.exportid );
    } } );
    Object.defineProperty( window.document, config.context.api.import, { value: function( ref, callback, options = {} ) {
        return importRequest( window.document, ref, callback, options );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, config.context.api.import, { value: function( ref, callback, options = {} ) {
        return importRequest( this, ref, callback, options );
    } } );
    function importRequest( context, ref, callback, options ) {
        const request = _HTMLImportsProvider.createRequest( { detail: ref, ...options } );
        return HTMLContext.instance( context ).request( request, callback );
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
