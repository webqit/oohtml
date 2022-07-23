
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import { _internals } from '@webqit/util/js/index.js';
import { _from as _arrFrom, _intersect } from '@webqit/util/arr/index.js';
import { query as objectQuery } from '../object-ql.js';

/**
 * ---------------------------
 * Named Templates
 * ---------------------------
 */

/**
 * @ModuleStore
 * 
 * The reactivity object on the "internals" of module elements.
 */
const _ = ( el, ...args ) => _internals( el, 'oohtml', ...args );
const intersects = ( a, b ) => {
    if ( Array.isArray( b ) ) return _intersect( a, b ).length;
    return a.includes( b );
}
class ModuleStore extends Map {
    constructor( ...args ) {
        super( ...args );
        this.observers = new Set;
        this.state = new Map;
    }
    set( key, value ) {
        let returnValue = super.set( key, value );
        this.fire( 'set', key, value );
        return returnValue;
    }
    delete( key ) {
        let returnValue = super.delete( key );
        this.fire( 'delete', key );
        return returnValue;
    }
    get( key ) {
        // Fire must come first...
        // observers may need to make values available
        this.fire( 'get', key );
        return super.get( key );
    }
    setState( key, value ) {
        let returnValue = this.state.set( key, value );
        this.fire( 'set:state', key, value );
        return returnValue;
    }
    getState( key ) {
        // Fire must come first...
        // observers may need to make values available
        this.fire( 'get:state', key );
        return this.state.get( key );
    }
    observe( type, key, callback ) {
        const entry = { type, key, callback };
        this.observers.add( entry );
        return () => this.observers.delete( entry);;
    }
    unobserve( type, key, callback ) {
        if ( Array.isArray( type ) || Array.isArray( key ) ) {
            throw new Error( `The "type" and "key" arguments can only be strings.` );
        }
        this.observers.forEach( entry => {
            if ( !( intersects( [ type, '*' ], entry.type ) && intersects( [ key, '*' ], entry.key ) && entry.callback === callback ) ) return;
            this.observers.delete( entry);
        } );
    }
    fire( type, key, ...args ) {
        // IMPORTANT: Array.from() must be used so that new additions to this.observers
        // during the loop aren't picked up!
        Array.from( this.observers ).forEach( entry => {
            if ( !( intersects( [ type, '*' ], entry.type ) && intersects( [ key, '*' ], entry.key ) ) ) return;
            entry.callback( ...args );
        } );
    }
    ready( callback = null ) {
        let request = ( this.getState( 'request' ) || {} ).request;
        if ( !callback ) return request;
        if ( request ) request.then( callback );
        else callback();
    }
}

/**
 * Exposes HTML Modules API as native APIs.
 *
 * @param Object	            params
 *
 * @return Void
 */
function nativate( params ) {
    const window = this;
    // Assertions
    if ( params.api.templates in window.document ) { throw new Error( `document already has a "${ params.api.templates }" property!` ); }
    if ( params.api.templates in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ params.api.templates }" property!` ); }
    if ( params.api.exports in window.HTMLTemplateElement.prototype ) { throw new Error( `The "HTMLTemplateElement" class already has a "${ params.api.exports }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.api.templates, { get: function() {
        return filterEntries( _( window.document ).get( 'moduleStore' ), key => !( key.startsWith( '#' ) ) );
    } });
    Object.defineProperty( window.HTMLTemplateElement.prototype, params.api.templates, { get: function() {
        return filterEntries( _( this ).get( 'moduleStore' ), key => !( key.startsWith( '#' ) ) );
    } } );
    Object.defineProperty( window.HTMLTemplateElement.prototype, params.api.exports, { get: function() {
        return filterEntries( _( this ).get( 'moduleStore' ), key => key.startsWith( '#' ) );
    } } );
    const filterEntries = ( moduleStore, fn ) => Object.defineProperties( {}, Array.from( moduleStore.keys() ).filter( fn ).reduce( ( desc, name ) => {
        desc[ name ] = { get: () => moduleStore.get( name ) };
        return desc;
    }, {} ) );
}

/**
 * Fetches a module's "src".
 *
 * @param HTMLTemplateElement   template
 *
 * @return Promise
 */
function srcFetch( template ) {
    const window = this;
    const fire = ( type, detail ) => template.dispatchEvent( new window.CustomEvent( type, { detail } ) );
    const src = template.getAttribute( 'src' );
    const moduleStore = _( template ).get( 'moduleStore' );
    // Ongoing request?
    const ongoingRequest = moduleStore.getState( 'request' );
    if ( ongoingRequest && ongoingRequest.src === src ) return;
    if ( ongoingRequest ) ongoingRequest.controller.abort();
    const controller = new AbortController();
    // The promise
    const request = window.fetch( src, { signal: controller.signal } ).then( response => {
        return response.ok ? response.text() : Promise.reject( response.statusText );
    }).then( content => {
        template.innerHTML = content.trim(); // IMPORTANT: .trim()
        moduleStore.setState( 'request', undefined );
        fire( 'load' );
        return template;
    } ).catch( e => {
        console.error( `Error fetching the bundle at "${ src }": ${ e.message }` );
        moduleStore.setState( 'request', undefined );
        fire('loaderror');
        return template;
    } );
    moduleStore.setState( 'request', { src, request, controller } );
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
    const window = this, dom = window.wq.dom;
    _( template ).set( 'moduleMeta', { parent, level } );
    // Store...
    let moduleStore =  _( template ).get( 'moduleStore' );
    if ( !moduleStore ) {
        moduleStore = new ModuleStore;
        _( template ).set( 'moduleStore', moduleStore );
    }
    // Contents...
    const connA = dom.realtime( template ).children( ( entries, connectedState ) => {
        const exports = new Map;
        entries.forEach( entry => {
            if ( entry.nodeType !== 1 ) return;
            let moduleId;
            if ( entry.matches( params.templateSelector ) && ( moduleId = entry.getAttribute( params.attr.moduleid ) ) ) {
                //validateModuleId( moduleId );
                if ( !connectedState ) {
                    _( entry ).get( 'moduleRealtimeConn' ).disconnect();
                    moduleStore.delete( moduleId );
                } else {
                    const moduleRealtimeConn = buildGraph.call( this, entry, params, { parent: template, level: level + 1 } );
                    _( entry ).set( 'moduleRealtimeConn', moduleRealtimeConn );
                    moduleStore.set( moduleId, entry );
                }
                return;
            }
            let exportId, exportGroup;
            if ( entry.matches && entry.matches( params.element.export ) ) {
                exportId = entry.getAttribute( params.attr.exportid ) || 'default';
                exportGroup = _arrFrom( entry.children ).map( exportItem => {
                    exportItem.setAttribute( params.attr.exportgroup, exportId );
                    return exportItem;
                } );
            } else { 
                exportId = entry.getAttribute( params.attr.exportgroup ) || 'default';
                exportGroup = [ entry ];
            }
            //validateExportId( exportId );
            if ( !exports.has( exportId ) ) { exports.set( exportId, [] ); }
            exports.get( exportId ).push( ...exportGroup );
        } );
        exports.forEach( ( exportGroup, exportId ) => {
            let exportsSet = moduleStore.get( `#${ exportId }` );
            if ( connectedState ) {
                exportsSet = new Set( exportsSet ? [ ...exportsSet ].concat( exportGroup ) : exportGroup );
            } else if ( exportsSet ) {
                exportGroup.forEach( el => exportsSet.delete( el ) );
            }
            if ( !exportsSet.size ) { moduleStore.delete( `#${ exportId }` ); }
            else { moduleStore.set( `#${ exportId }`, exportsSet ) }
        } );
    } );
    // Attributes
    const srcFetchHook = ( isImmediate = false/* just for when debugging */ ) => {
        if ( ( template.content || template ).children.length ) return;
        moduleStore.unobserve( 'get:state', 'request', srcFetchHook );
        moduleStore.unobserve( 'get', '*', srcFetchHook );
        return srcFetch.call( this, template );
    };
    const connB = dom.realtime( template ).attributes( [ 'src', 'loading' ], ( src, loading ) => {
        if ( !src ) return;
        if ( loading === 'lazy' ) {
            // When someone tries to see if he should await this module
            moduleStore.observe( 'get:state', 'request', srcFetchHook );
            // When someone tries to read entries of this module
            moduleStore.observe( 'get', '*', srcFetchHook );
        } else { srcFetchHook( true ); }
    } );
    return { disconnect() {
        [ connA, connB ].forEach( conn => conn.disconnect() );
        moduleStore.forEach( ( entry, key ) => {
            if ( key.startsWith( '#' ) ) return;
            _( entry ).get( 'moduleRealtimeConn' ).disconnect();
        } );
    } };

}

/**
 * Performs realtime capture of elements and builds their contents graph.
 *
 * @param Object	            params
 *
 * @return Void
 */
function realtime( params ) {
    const window = this, dom = window.wq.dom;
    let moduleStore = _( window.document ).get( 'moduleStore' );
    if ( !moduleStore ) {
        moduleStore = new ModuleStore;
        _( window.document ).set( 'moduleStore', moduleStore );
    }
    dom.realtime().querySelectorAll( params.templateSelector, ( entry, connectedState ) => {
        let moduleId = entry.getAttribute( params.attr.moduleid );
        //validateModuleId( moduleId );
        if ( !connectedState ) {
            _( entry ).get( 'moduleRealtimeConn' ).disconnect();
            moduleStore.delete( moduleId );
        } else {
            const moduleRealtimeConn = buildGraph.call( this, entry, params, { parent: window.document } );
            _( entry ).set( 'moduleRealtimeConn', moduleRealtimeConn );
            moduleStore.set( moduleId, entry );
        }
    }, { each: true } );
}

/**
 * Initializes HTML Modules.
 * 
 * @param $params  Object
 *
 * @return Void
 */
export default function init( $params = {} ) {
    const window = this, dom = wqDom.call( window );
    // Params
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        element: { template: '', export: 'export', import: 'import', },
        attr: { moduleid: 'name', moduleref: 'template', exportid: 'name', exportgroup: 'exportgroup', },
        api: { templateClass: '', templates: 'templates', exports: 'exports', moduleref: 'template',  },
    } );
    params.templateSelector = `template${ ( params.element.template ? `[is="${ params.element.template }"]` : '' ) }[ ${ window.CSS.escape( params.attr.moduleid ) }]`;
    // Tree...
    realtime.call( this, params );
    // nativate?
    if ( params.nativate !== false ) { nativate.call( this, params ); }
    // Extend wq.dom().query with a importsObjectModelQuery() function
    dom.extend( 'importsObjectModelQuery', function( expr, returnLine, traps = {}, params = {} ) {
        const context = this.get( 0 ) || window.document;
        if ( !context || ( context !== window.document && !context.matches( params.templateSelector ) ) ) {
            throw new Error( `The "importsObjectModelQuery()" method can only be called on a selection of the document object or "<template>" element objects.` );
        }
        return objectQuery( context, expr, returnLine, {
            // Gets a module object
            get: ( template, key ) => _( template ).get( 'moduleStore' ).get( key ),
            // Gets all module keys
            keys: template => Array.from( _( template ).get( 'moduleStore' ).keys() ).filter( key => !key.startsWith( '#' ) ),
            // Subscribes to changes
            subscribe: ( template, key, callback ) => _( template ).get( 'moduleStore' ).observe( [ 'set', 'delete' ], key, callback ),
            // Returns a promise if a module is loading
            ready: template => _( template ).get( 'moduleStore' ).ready(),
            ...traps,
        }, params );
    }, { supportsRealtime: true } );
}
