
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { getModulesObject } from './index.js';
import { _ } from '../util.js';

export default class HTMLExportsManager {

    /**
     * @instance
     */
    static instance( window, host, config ) {
        return _( host ).get( 'exportsmanager::instance' ) || new this( window, host, config );
    }

    /**
     * @constructor
     */
    constructor( window, host, config = {}, parent = null, level = 0 ) {
        _( host ).get( `exportsmanager::instance` )?.dispose();
        _( host ).set( `exportsmanager::instance`, this );
        this.host = host;
        this.window = window;
        this.config = config;
        this.parent = parent;
        this.level = level;
        this.modules = getModulesObject( this.host );
        this.exportId = ( this.host.getAttribute( this.config.template?.attr.exportid ) || '' ).trim();
        this.validateExportId( this.exportId );
        const realdom = this.window.webqit.realdom;
        // ----------
        this.realtimeA = realdom.realtime( this.host.content ).children( record => {
            this.export( record.entrants, true );
            this.export( record.exits, false );
        }, { live: true, timing: 'sync' } );
        // ----------
        this.realtimeB = realdom.realtime( this.host ).attr( [ 'src', 'loading' ], ( ...args ) => this.evaluateLoading( ...args ), {
            live: true,
            atomic: true,
            timing: 'sync',
            lifecycleSignals: true
        } );
        // ----------
        this.realtimeC = this.evalInheritance();
        // ----------
    }

    /**
     * Validates export ID.
     * 
     * @param String     exportId
     *
     * @returns Void
     */
    validateExportId( exportId ) {
        if ( [ '@', '#', ':' ].some( token => exportId.includes( token ) ) ) {
            throw new Error( `The export ID "${ exportId }" contains an invalid character.` );
        }
    }

    /**
     * Maps module contents as exports.
     * 
     * @param Array     entries
     * @param Bool      isConnected
     *
     * @returns Void
     */
    export( entries, isConnected ) {
        const fragmentsExports = new Map;
        entries.forEach( entry => {
            if ( entry.nodeType !== 1 ) return;
            const exportId = ( entry.getAttribute( this.config.export.attr.exportid ) || '' ).trim() || '#default';
            const isPackage = entry.matches( this.config.templateSelector );
            if ( exportId.startsWith( '#' ) ) {
                this.validateExportId( exportId.substring( 1 ) );
                if ( !fragmentsExports.has( exportId ) ) { fragmentsExports.set( exportId, [] ); }
                fragmentsExports.get( exportId ).push( entry );
            } else {
                if ( isConnected ) {
                    if ( isPackage ) { new HTMLExportsManager( this.window, entry, this.config, this.host, this.level + 1 ); }
                    Observer.set( this.modules, exportId, entry );
                } else {
                    if ( isPackage ) { HTMLExportsManager.instance( this.window, entry ).dispose(); }
                    Observer.deleteProperty( this.modules, exportId );
                }
            }
        } );
        // ----------------
        fragmentsExports.forEach( ( fragments, exportId ) => {
            let existingFragments = Observer.get( this.modules, exportId );
            if ( isConnected ) {
                existingFragments = new Set( ( existingFragments ? [ ...existingFragments ] : [] ).concat( fragments ) );
            } else if ( existingFragments ) {
                fragments.forEach( el => existingFragments.delete( el ) );
            }
            if ( !isConnected && !existingFragments.size ) { Observer.deleteProperty( this.modules, exportId ); }
            else { Observer.set( this.modules, exportId, existingFragments ) }
        } );
    }

    /**
     * Evaluates remote content loading.
     *
     * @param AbortSignal   signal
     * 
     * @returns Void
     */
    evaluateLoading( [ record1, record2 ], { signal } ) {
        const src = ( record1.value || '' ).trim();
        if ( !src ) return;
        const loading = ( record2.value || '' ).trim();
        if ( loading === 'lazy' ) {
            const interception = Observer.intercept( this.modules, 'get', async ( descriptor, recieved, next ) => {
                await this.load( src, true );
                interception.remove();
                return next();
            }, { signal } );
        } else { this.load( src ); }
    }
    
    /**
     * Fetches a module's "src".
     *
     * @param String src
     *
     * @return Promise
     */
    load( src ) {
        if ( this.host.content.children.length ) return;
        // Ongoing request?
        if ( this.fetchInFlight?.src === src ) return this.fetchInFlight.request;
        this.fetchInFlight?.controller.abort();
        // The promise
        const controller = new AbortController();
        const fire = ( type, detail ) => this.host.dispatchEvent( new this.window.CustomEvent( type, { detail } ) );
        const request = this.window.fetch( src, { signal: controller.signal, element: this.host } ).then( response => {
            return response.ok ? response.text() : Promise.reject( response.statusText );
        }).then( content => {
            this.host.innerHTML = content.trim(); // IMPORTANT: .trim()
            fire( 'load' );
            return this.host;
        } ).catch( e => {
            console.error( `Error fetching the bundle at "${ src }": ${ e.message }` );
            this.fetchInFlight = null;
            fire( 'loaderror' );
            return this.host;
        } );
        this.fetchInFlight = { src, request, controller };
        return request;
    }

    /**
     * Evaluates module inheritance.
     *
     * @returns Void|AbortController
     */
    evalInheritance( ) {
        if ( !this.parent ) return [];
        let extendedId = ( this.host.getAttribute( this.config.template.attr.extends ) || '' ).trim();
        let inheritedIds = ( this.host.getAttribute( this.config.template.attr.inherits ) || '' ).trim();
        const handleInherited = records => {
            records.forEach( record => {
                if ( Observer.get( this.modules, record.key ) !== record.oldValue ) return;
                if ( [ 'get'/*initial get*/, 'set', 'defineProperty' ].includes( record.type ) ) {
                    Observer[ record.type.replace( 'get', 'set' ) ]( this.modules, record.key, record.value );
                } else if ( record.type === 'deleteProperty' ) {
                    Observer.deleteProperty( this.modules, record.key );
                }
            } );
        };
        const realtimes = [];
        const parentExportsObj = getModulesObject( this.parent );
        if ( extendedId ) {
            realtimes.push( Observer.deep( parentExportsObj, [ extendedId, this.config.template.api.modules, Infinity ], Observer.get, handleInherited, { live: true } ) );
        }
        if ( ( inheritedIds = inheritedIds.split( ' ' ).map( id => id.trim() ).filter( x => x ) ).length ) {
            realtimes.push( Observer.get( parentExportsObj, inheritedIds, handleInherited, { live: true } ) );
        }
        return realtimes;
    }
    
    /**
     * Disposes the instance and its processes.
     *
     * @returns Void
     */
    dispose() {
        this.realtimeA.disconnect();
        this.realtimeB.disconnect();
        this.realtimeC.forEach( r => r.abort() );
        Object.entries( this.modules ).forEach( ( [ key, entry ] ) => {
            if ( key.startsWith( '#' ) ) return;
            HTMLExportsManager.instance( this.window, entry ).dispose();
        } );
    }
}
