
/**
 * @imports
 */
import Observer from '@webqit/observer';
import _HTMLImportsContext from './_HTMLImportsContext.js';
import HTMLExportsManager from './HTMLExportsManager.js';
import { _, _init } from '../util.js';

/**
 * Initializes HTML Modules.
 * 
 * @param Object        $config 
 *
 * @return Void
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'html-modules', $config, {
        template: { attr: { exportid: 'exportid', extends: 'extends', inherits: 'inherits' }, api: { modules: 'modules', exportid: 'exportid' }, },
        context: { attr: { importscontext: 'importscontext', contextname: 'contextname' }, api: { modules: 'modules' }, },
        export: { attr: { exportid: 'exportid' }, },
        staticsensitivity: true,
    } );
    config.templateSelector = `template[${ window.CSS.escape( config.template.attr.exportid ) }]`;
    config.ownerContextSelector = [ config.context.attr.contextname, config.context.attr.importscontext ].map( a => `[${ window.CSS.escape( a ) }]` ).join( ',' );
    window.webqit.HTMLImportsContext = class extends _HTMLImportsContext {
        static get config() { return config; }
    };
    window.webqit.Observer = Observer;
    exposeModulesObjects.call( window, config );
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
		Observer.intercept( modulesObj, 'set', ( event, receiver, next ) => {
			if ( !event.value || !event.key.startsWith( '#' ) || event.value instanceof Set ) return next();
            if ( !Array.isArray( event.value ) ) { event.value = [ event.value ]; }
            event.value = new Set( event.value );
			return next();
		} );
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
    if ( config.context.api.modules in window.document ) { throw new Error( `document already has a "${ config.context.api.modules }" property!` ); }
    if ( config.template.api.modules in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ config.template.api.modules }" property!` ); }
    if ( config.template.api.exportid in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ config.template.api.exportid }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.context.api.modules, { get: function() {
        return getModulesObject( window.document );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, config.template.api.modules, { get: function() {
        return getModulesObject( this );
    } } );
    Object.defineProperty( window.HTMLTemplateElement.prototype, config.template.api.exportid, { get: function() {
        return this.getAttribute( config.template.attr.exportid );
    } } );
}

/**
 * Performs realtime capture of elements and builds their contents graph.
 *
 * @param Object	    config
 *
 * @return Void
 */
function realtime( config ) {
    const window = this, { realdom, HTMLImportsContext } = window.webqit;
    // ------------
    const attachImportsContext = host => {
        const contextId = HTMLImportsContext.createId( host );
        HTMLImportsContext.attachTo( host, contextId );
    };
    const detachImportsContext = ( host, force ) => {
        const contextId = HTMLImportsContext.createId( host );
        HTMLImportsContext.detachFrom( host, contextId, cx => {
            return force || host.matches && !host.matches( config.ownerContextSelector ) && !Object.keys( cx.modules ).length;
        } );
    };
    // ------------
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( [ config.templateSelector, config.ownerContextSelector ], record => {
        record.entrants.forEach( entry => {
            if ( entry.matches( config.templateSelector ) ) {
                Object.defineProperty( entry, 'scoped', { value: entry.hasAttribute( 'scoped' ) } ); 
                const moduleExport = new HTMLExportsManager( window, entry, config );
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
                const moduleExport = HTMLExportsManager.instance( window, entry, config );
                const ownerContextModulesObj = getModulesObject( moduleExport.ownerContext );
                if ( moduleExport.exportId ) { Observer.deleteProperty( ownerContextModulesObj, moduleExport.exportId ); }
                detachImportsContext( moduleExport.ownerContext );
            } else {
                detachImportsContext( entry, true );
            }
        } );
    }, { live: true, timing: 'sync', staticSensitivity: config.staticsensitivity } );
}
