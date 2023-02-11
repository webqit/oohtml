
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import { _internals } from '@webqit/util/js/index.js';
import { _from as _arrFrom } from '@webqit/util/arr/index.js';
import { query as objectQuery } from '../object-ql.js';
import Observable from '../Observable.js';

/**
 * ---------------------------
 * Named Templates
 * ---------------------------
 */

/**
 * Internals shorthand.
 * 
 * @param Any el 
 * @param Array args 
 * 
 * @return Any
 */
const _ = ( el, ...args ) => _internals( el, 'oohtml', ...args );

/**
 * Initializes HTML Modules.
 * 
 * @param $params  Object
 *
 * @return Void
 */
export default function init( $params = {} ) {
    const window = this, dom = wqDom.call( window );
    // -------
    // params
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        element: { template: '', export: 'export', import: 'import', },
        attr: { moduleid: 'name', moduleref: 'template', exportid: 'name', exportgroup: 'exportgroup', },
        api: { modules: 'templates', exports: 'exports',  },
    } );
    params.templateSelector = `template${ ( params.element.template ? `[is="${ params.element.template }"]` : '' ) }[ ${ window.CSS.escape( params.attr.moduleid ) }]`;
    const { HTMLExportsCollection } = classes.call( this, params );
    // -------
    // realtime...
    realtime.call( this, params );
    // -------
    // expose?
    if ( params.expose !== false ) { expose.call( this, params ); }
    // -------
    // APIs
    return { HTMLExportsCollection };
}

/**
 * Performs realtime capture of elements and builds their contents graph.
 *
 * @param Object	            params
 *
 * @return Void
 */
function realtime( params ) {
    const window = this, { dom, HTMLModulesCollection, HTMLExportsCollection } = window.wq;
    const modules = HTMLModulesCollection.node( window.document );
    dom.realtime().querySelectorAll( params.templateSelector, ( entry, connectedState ) => {
        let moduleId = entry.getAttribute( params.attr.moduleid );
        //validateModuleId( moduleId );
        if ( !connectedState ) {
            _( entry ).get( 'moduleRealtimeConn' ).disconnect();
            modules.delete( moduleId );
        } else {
            const moduleRealtimeConn = buildGraph.call( this, entry, params, { parent: window.document } );
            _( entry ).set( 'moduleRealtimeConn', moduleRealtimeConn );
            modules.set( moduleId, entry );
        }
    }, { each: true } );
}

/**
 * Fetches a module's "src".
 *
 * @param HTMLTemplateElement template
 *
 * @return Promise
 */
function srcFetch( template ) {
    const window = this, { HTMLExportsCollection } = window.wq;
    const fire = ( type, detail ) => template.dispatchEvent( new window.CustomEvent( type, { detail } ) );
    const src = template.getAttribute( 'src' );
    const exports = HTMLExportsCollection.node( template );
    // Ongoing request?
    const ongoingRequest = exports.getState( 'request' );
    if ( ongoingRequest && ongoingRequest.src === src ) return;
    if ( ongoingRequest ) ongoingRequest.controller.abort();
    const controller = new AbortController();
    // The promise
    const request = window.fetch( src, { signal: controller.signal } ).then( response => {
        return response.ok ? response.text() : Promise.reject( response.statusText );
    }).then( content => {
        template.innerHTML = content.trim(); // IMPORTANT: .trim()
        exports.setState( 'request', undefined );
        fire( 'load' );
        return template;
    } ).catch( e => {
        console.error( `Error fetching the bundle at "${ src }": ${ e.message }` );
        exports.setState( 'request', undefined );
        fire('loaderror');
        return template;
    } );
    exports.setState( 'request', { src, request, controller } );
    return request;
}

/**
 * Builds a modules/exports graph.
 *
 * @param HTMLTemplateElement        template
 * @param Object	                 params
 * @param Object                     meta
 *
 * @return Void
 */
function buildGraph( template, params, { parent, level = 0 } ) {
    const window = this, { dom, HTMLExportsCollection } = window.wq;
    _( template ).set( 'moduleMeta', { parent, level } );
    const exports =  HTMLExportsCollection.node( template );
    // Contents...
    const connA = dom.realtime( template ).children( ( entries, connectedState ) => {
        const partials = new Map;
        entries.forEach( entry => {
            if ( entry.nodeType !== 1 ) return;
            let moduleId;
            if ( entry.matches( params.templateSelector ) && ( moduleId = entry.getAttribute( params.attr.moduleid ) ) ) {
                // TODO: validateModuleId( moduleId );
                if ( !connectedState ) {
                    _( entry ).get( 'moduleRealtimeConn' ).disconnect();
                    exports.delete( moduleId );
                } else {
                    const moduleRealtimeConn = buildGraph.call( this, entry, params, { parent: template, level: level + 1 } );
                    _( entry ).set( 'moduleRealtimeConn', moduleRealtimeConn );
                    exports.set( moduleId, entry );
                }
                return;
            }
            let exportId, exportItems;
            if ( entry.matches && entry.matches( params.element.export ) ) {
                exportId = entry.getAttribute( params.attr.exportid ) || 'default';
                exportItems = _arrFrom( entry.children ).map( exportItem => {
                    exportItem.setAttribute( params.attr.exportgroup, exportId );
                    return exportItem;
                } );
            } else { 
                exportId = entry.getAttribute( params.attr.exportgroup ) || 'default';
                exportItems = [ entry ];
            }
            // TODO: validateExportId( exportId );
            if ( !partials.has( exportId ) ) { partials.set( exportId, [] ); }
            partials.get( exportId ).push( ...exportItems );
        } );
        partials.forEach( ( exportItems, exportId ) => {
            let exportNode = exports.get( `#${ exportId }` );
            if ( connectedState ) {
                exportNode = new Set( exportNode ? [ ...exportNode ].concat( exportItems ) : exportItems );
            } else if ( exportNode ) {
                exportItems.forEach( el => exportNode.delete( el ) );
            }
            if ( !connectedState && !exportNode.size ) { exports.delete( `#${ exportId }` ); }
            else { exports.set( `#${ exportId }`, exportNode ) }
        } );
    } );
    // Attributes
    const srcFetchHook = ( isImmediate = false/* just for when debugging */ ) => {
        if ( ( template.content || template ).children.length ) return;
        exports.unobserve( 'get:state', 'request', srcFetchHook );
        exports.unobserve( 'get', '*', srcFetchHook );
        return srcFetch.call( this, template );
    };
    const connB = dom.realtime( template ).attributes( [ 'src', 'loading' ], ( src, loading ) => {
        if ( !src ) return;
        if ( loading === 'lazy' ) {
            // When someone tries to see if he should await this module
            exports.observe( 'get:state', 'request', srcFetchHook );
            // When someone tries to read entries of this module
            exports.observe( 'get', '*', srcFetchHook );
        } else { srcFetchHook( true ); }
    } );
    return { disconnect() {
        [ connA, connB ].forEach( conn => conn.disconnect() );
        exports.forEach( ( entry, key ) => {
            if ( key.startsWith( '#' ) ) return;
            _( entry ).get( 'moduleRealtimeConn' ).disconnect();
        } );
    } };

}

/**
 * Exposes HTML Modules with native APIs.
 *
 * @param Object params
 *
 * @return Void
 */
function expose( params ) {
    const window = this, { HTMLModulesCollection, HTMLExportsCollection } = window.wq;
    // Assertions
    if ( params.api.modules in window.document ) { throw new Error( `document already has a "${ params.api.modules }" property!` ); }
    if ( params.api.exports in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ params.api.exports }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.api.modules, { get: function() {
        return HTMLModulesCollection.node( window.document ).expose();
    } });
    Object.defineProperty( window.HTMLTemplateElement.prototype, params.api.exports, { get: function() {
        return HTMLExportsCollection.node( this ).expose();
    } } );
}

/**
 * @HTMLExportsCollection
 * 
 * The internal HTMLExportsCollection object
 * within <template> elements and the document object.
 */
function classes( params ) {
    const window = this;
    // --------------------
    class HTMLExportsCollection extends Observable {
        static node( context ) {
            if ( !_( context ).has( 'exports' ) ) {
                const collection = new this;
                Object.defineProperty( collection, 'context', { value: context } );
                _( context ).set( 'exports', collection );
            }
            return _( context ).get( 'exports' );
        }
        query( expr, returnLine, params = {}, traps = {} ) {
            const context = this.context;
            if ( !context || ( context !== window.document && !context.matches( params.templateSelector ) ) ) {
                throw new Error( `HTMLExportsCollection.query() expects a "<template>" element or the document object.` );
            }
            return objectQuery( context, expr, returnLine, {
                // Gets a module object
                get: ( context, key ) => HTMLExportsCollection.node( context ).get( key ),
                // Gets all module keys
                keys: context => HTMLExportsCollection.node( context ).keyNames().filter( key => !key.startsWith( '#' ) ),
                // Subscribes to changes
                subscribe: ( context, key, callback ) => HTMLExportsCollection.node( context ).observe( [ 'set', 'delete' ], key, callback ),
                // Returns a promise if a module is loading
                ready: context => HTMLExportsCollection.node( context ).ready(),
                ...traps,
            }, params );
        }
        ready( callback = null ) {
            let request = ( this.getState( 'request' ) || {} ).request;
            if ( !callback ) return request;
            if ( request ) request.then( callback );
            else callback();
        }
        set( key, value ) {
            const isPartId = key.startsWith( '#' );
            if ( isPartId && !( value instanceof Set ) ) throw new Error( `Value for export ID "${ key }" must be an instance of Set.` );
            else if ( !isPartId && !value.content/* rough way to check for <template> */ ) throw new Error( `Value for export ID "${ key }" must be an instance of HTMLTemplateElement.` );
            return super.set( key, value );
        }
        expose() { return this; }
    }
    class HTMLModulesCollection extends HTMLExportsCollection {};
    // --------------------
    window.wq.HTMLModulesCollection = HTMLModulesCollection;
    window.wq.HTMLExportsCollection = HTMLExportsCollection;
    return { HTMLModulesCollection, HTMLExportsCollection };
}
