
/**
 * @imports
 */
import { _internals } from '@webqit/util/js/index.js';
import { _from as _arrFrom } from '@webqit/util/arr/index.js';
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
const _ = el => _internals( el, 'oohtml' );
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
        let returnValue = super.get( key );
        this.fire( 'get', key );
        return returnValue;
    }
    setState( key, value ) {
        let returnValue = this.state.set( key, value );
        this.fire( 'state', key, value );
        return returnValue;
    }
    getState( key ) {
        this.state.get( key );
    }
    observe( type, key, callback ) {
        this.observers.add( { type, key, callback } );
        return () => this.unobserve( type, key, callback );
    }
    unobserve( type, key, callback ) {
        this.observers.forEach( entry => {
            if ( !( [ entry.type, '*' ].includes( type ) && [ entry.key, '*' ].includes( key ) && entry.callback === callback ) ) return;
            this.observers[ type ].delete( entry);
        } );
    }
    fire( type, key, ...args ) {
        this.observers[ type ].forEach( entry => {
            if ( !( [ entry.type, '*' ].includes( type ) && [ entry.key, '*' ].includes( key ) ) ) return;
            entry.callback( ...args );
        } );
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
    // Unique src only
    if ( ( moduleStore.getState( 'loading' ) || {} ).src === src ) return;
    // Refrence to the promise
    const request = window.fetch( src );
    moduleStore.setState( 'loading', { src, request } );
    // The promise
    return request.then( response => {
        return response.ok ? response.text() : Promise.reject( response.statusText );
    }).then( content => {
        moduleStore.setState( 'loading', undefined );
        template.innerHTML = content;
        fire( 'load' );
        res( template );
    }).catch( e => {
        moduleStore.setState( 'loading', undefined );
        console.error( `Error fetching the bundle at ${ src }: ${ e.message }` );
        fire('loaderror');
        res( template );
    } );
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
    const window = this, dom = window.wq.dom( window );
    _( template ).set( 'moduleMeta', { parent, level } );
    // Store...
    let moduleStore =  _( template ).get( 'moduleStore' );
    if ( !moduleStore ) {
        moduleStore = new ModuleStore;
        _( template ).set( 'moduleStore', moduleStore );
    }
    // Contents...
    dom.realtime( template ).children( ( entry, state ) => {
        let moduleId;
        if ( entry.matches( params.templateSelector ) && ( moduleId = entry.getAttribute( params.attr.moduleid ) ) ) {
            //validateModuleId( moduleId );
            if ( state === 'removed' ) {
                moduleStore.delete( moduleId );
            } else {
                moduleStore.set( moduleId, entry );
                buildGraph.call( this, entry, params, { parent: template, level: level + 1 } );
            }
            return;
        }
        let exportId, exports;
        if ( entry.matches( params.element.export ) ) {
            exportId = entry.getAttribute( params.attr.exportid ) || 'default';
            exports = _arrFrom( entry.children ).map( exportItem => {
                exportItem.setAttribute( params.attr.exportgroup, exportId );
                return exportItem;
            } );
        } else { 
            exportId = entry.getAttribute( params.attr.exportgroup ) || 'default';
            exports = [ entry ];
        }
        //validateExportId( exportId );
        let exportsSet = moduleStore.get( `#${ exportId }` ) || new Set;
        exports.forEach( x => { state === 'removed' ? exportsSet.delete( x ) : exportsSet.add( x ) } );
        if ( !exportsSet.size ) { moduleStore.delete( `#${ exportId }` ) }
        else { moduleStore.set( `#${ exportId }`, exportsSet ) }
    } );
    // Attributes
    const srcFetchHook = () => {
        if ( ( template.content || template ).children.length ) return;
        moduleStore.unobserve( 'get', '*', srcFetchHook );
        return srcFetch.call( this, template );
    };
    dom.realtime( template ).getAttributes( [ 'src', 'loading' ], ( src, loading ) => {
        if ( !src ) return;
        if ( loading === 'lazy' ) { moduleStore.observe( 'get', '*', srcFetchHook ); }
        else { srcFetchHook(); }
    } );
}

/**
 * Performs realtime capture of elements and builds their contents graph.
 *
 * @param Object	            params
 *
 * @return Void
 */
function realtime( params ) {
    const window = this, dom = window.wq.dom( window );
    let moduleStore = _( window.document ).get( 'moduleStore' );
    if ( !moduleStore ) {
        moduleStore = new ModuleStore;
        _( window.document ).set( 'moduleStore', moduleStore );
    }
    dom.realtime( window.document ).querySelectorAll( params.templateSelector, ( entry, state ) => {
    let moduleId = entry.getAttribute( params.attr.moduleid );
    //validateModuleId( moduleId );
    if ( state === 'removed' ) {
        moduleStore.delete( moduleId );
    } else {
        moduleStore.set( moduleId, entry );
        buildGraph.call( this, entry, params, { parent: window.document } );
    }
    } );
}

/**
 * Initializes HTML Modules.
 *
 * @param Object	            paramsOverride
 *
 * @return Void
 */
export function init( paramsOverride = {} ) {
    const window = this, dom = window.wq.dom( window );
    // Params
    const params = dom.meta( 'oohtml', {
        element: { template: '', export: 'export', import: 'import', },
        attr: { moduleid: 'name', moduleref: 'template', exportid: 'name', exportgroup: 'exportgroup', },
        api: { templateClass: '', templates: 'templates', exports: 'exports', moduleref: 'template',  },
    }, paramsOverride );
    params.templateSelector = `template${ ( params.element.template ? `[is="${ params.element.template }"]` : '' ) }[ ${ window.CSS.escape( params.attr.moduleid ) }]`;
    // Tree...
    realtime.call( this, params );
    // nativate?
    if ( params.nativate !== false ) { nativate.call( this, params ); }
    // Extend wq.dom().query with a importsObjectModelQuery() function
    dom.define( 'importsObjectModelQuery', ( context, [ expr, returnLine, traps = {}, params = {} ], next ) => {
        if ( context !== window.document && !context.matches( params.templateSelector ) ) return next();
        return objectQuery( context, expr, returnLine, {
            // Gets a module object
            get: ( template, key ) => _( template ).get( 'moduleStore' ).get( key ),
            // Gets all module keys
            keys: template => Array.from( _( template ).get( 'moduleStore' ).keys() ).filter( key => !key.startsWith( '#' ) ),
            // Subscribes to changes
            subscribe: ( template, key, callback ) => _( template ).get( 'moduleStore' ).observe( '*', key, callback ),
            // Returns a promise if a module is loading
            await: template => ( _( template ).get( 'moduleStore' ).getState( 'loading' ) || {} ).request,
            ...traps,
        }, params );
    }, { supportsRealtime: true } );
}
