
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import Observer from '@webqit/observer';
import _HTMLImportsContext from './_HTMLImportsContext.js';
import HTMLExportsManager from './HTMLExportsManager.js';
import { _ } from '../util.js';

/**
 * Initializes HTML Modules.
 * 
 * @param Object        $params 
 *
 * @return Void
 */
export default function init( $params = {} ) {
    const window = this, dom = wqDom.call( window );
    // -------
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        template: { attr: { exportid: 'exportid', inherits: 'inherits' }, api: { modules: 'modules', exportid: 'exportid' }, },
        context: { attr: { importscontext: 'importscontext', contextname: 'contextname' }, api: { modules: 'modules' }, },
        export: { attr: { exportid: 'exportid' }, },
        staticsensitivity: true,
    } );
    params.window = window;
    params.templateSelector = `template[${ window.CSS.escape( params.template.attr.exportid ) }]`;
    params.ownerContextSelector = [ params.context.attr.contextname, params.context.attr.importscontext ].map( a => `[${ window.CSS.escape( a ) }]` ).join( ',' );
    params.HTMLImportsContext = class extends _HTMLImportsContext {
        static get params() { return params; }
    }
    // -------
    exposeModulesObjects.call( this, params );
    realtime.call( this, params );
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
			if ( !event.key.startsWith( '#' ) || event.value instanceof Set ) return next();
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
 * @param Object        params
 *
 * @return Void
 */
function exposeModulesObjects( params ) {
    const window = this;
    // Assertions
    if ( params.context.api.modules in window.document ) { throw new Error( `document already has a "${ params.context.api.modules }" property!` ); }
    if ( params.template.api.modules in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ params.template.api.modules }" property!` ); }
    if ( params.template.api.exportid in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ params.template.api.exportid }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.context.api.modules, { get: function() {
        return getModulesObject( window.document );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, params.template.api.modules, { get: function() {
        return getModulesObject( this );
    } } );
    Object.defineProperty( window.HTMLTemplateElement.prototype, params.template.api.exportid, { get: function() {
        return this.isConnected ? HTMLExportsManager.instance( this, params ).exportId : this.getAttribute( params.template.attr.exportid );
    } } );
}

/**
 * Performs realtime capture of elements and builds their contents graph.
 *
 * @param Object	    params
 *
 * @return Void
 */
function realtime( params ) {
    const window = this, { dom } = window.wq;
    // ------------
    const attachImportsContext = host => {
        const contextId = params.HTMLImportsContext.createId( host );
        params.HTMLImportsContext.attachTo( host, contextId );
    };
    const detachImportsContext = ( host, force ) => {
        const contextId = params.HTMLImportsContext.createId( host );
        params.HTMLImportsContext.detachFrom( host, contextId, cx => {
            return force || host.matches && !host.matches( params.ownerContextSelector ) && !Object.keys( cx.modules ).length;
        } );
    };
    // ------------
    dom.realtime( window.document ).observe( [ params.templateSelector, params.ownerContextSelector ], record => {
        record.entrants.forEach( entry => {
            if ( entry.matches( params.templateSelector ) ) {
                Object.defineProperty( entry, 'scoped', { value: entry.hasAttribute( 'scoped' ) } ); 
                const moduleExport = new HTMLExportsManager( entry, params );
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
            if ( entry.matches( params.templateSelector ) ) {
                const moduleExport = HTMLExportsManager.instance( entry, params );
                const ownerContextModulesObj = getModulesObject( moduleExport.ownerContext );
                if ( moduleExport.exportId ) { Observer.deleteProperty( ownerContextModulesObj, moduleExport.exportId ); }
                detachImportsContext( moduleExport.ownerContext );
            } else {
                detachImportsContext( entry, true );
            }
        } );
    }, { subtree: true, timing: 'sync', staticSensitivity: params.staticsensitivity } );
}
