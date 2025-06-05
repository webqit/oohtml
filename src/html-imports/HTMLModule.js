
/**
 * @imports
 */
import { getDefs } from './index.js';
import { _wq, env } from '../util.js';

export default class HTMLModule {

    /**
     * @instance
     */
    static instance( host ) {
        return _wq( host ).get( 'defsmanager::instance' ) || new this( host );
    }

    /**
     * @constructor
     */
    constructor( host, parent = null, level = 0 ) {
        const { window } = env, { webqit: { realdom, oohtml: { configs } } } = window;
        _wq( host ).get( `defsmanager::instance` )?.dispose();
        _wq( host ).set( `defsmanager::instance`, this );
        this.window = window;
        this.host = host;
        this.config = configs.HTML_IMPORTS;
        this.parent = parent;
        this.level = level;
        this.defs = getDefs( this.host );
        this.defId = ( this.host.getAttribute( this.config.attr.def ) || '' ).trim();
        this.validateDefId( this.defId );
        // ----------
        this.realtimeA = realdom.realtime( this.host.content ).children( record => {
            this.expose( record.entrants, true );
            this.expose( record.exits, false );
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
     * @param String     defId
     *
     * @returns Void
     */
    validateDefId( defId ) {
        if ( [ '@', '/', '*', '#' ].some( token => defId.includes( token ) ) ) {
            throw new Error( `The export ID "${ defId }" contains an invalid character.` );
        }
    }

    /**
     * Maps module contents as defs.
     * 
     * @param Array     entries
     * @param Bool      isConnected
     *
     * @returns Void
     */
    expose( entries, isConnected ) {
        const { window } = env, { webqit: { Observer } } = window;
        let dirty, allFragments = this.defs[ '#' ] || [];
        entries.forEach( entry => {
            if ( !entry || entry.nodeType !== 1 ) return;
            const isTemplate = entry.matches( this.config.templateSelector );
            const defId = ( entry.getAttribute( isTemplate ? this.config.attr.def : this.config.attr.fragmentdef ) || '' ).trim();
            if ( isConnected ) {
                if ( isTemplate && defId ) {
                    new HTMLModule( entry, this.host, this.level + 1 );
                } else {
                    allFragments.push( entry );
                    dirty = true;
                    if ( typeof requestIdleCallback === 'function' ) {
                        requestIdleCallback( () => {
                            this.config.idleCompilers?.forEach( callback => callback.call( this.window, entry ) );
                        } );
                    }
                }
                if ( defId ) {
                    this.validateDefId( defId );
                    Observer.set( this.defs, ( !isTemplate && '#' || '' ) + defId, entry );
                }
            } else {
                if ( isTemplate && defId ) { HTMLModule.instance( entry ).dispose(); }
                else {
                    allFragments = allFragments.filter( x => x !== entry );
                    dirty = true;
                }
                if ( defId ) Observer.deleteProperty( this.defs, ( !isTemplate && '#' || '' ) + defId );
            }
        } );
        if ( dirty ) Observer.set( this.defs, '#', allFragments );
    }

    /**
     * Evaluates remote content loading.
     *
     * @param AbortSignal   signal
     * 
     * @returns Void
     */
    evaluateLoading( [ record1, record2 ], { signal } ) {
        const { window: { webqit: { Observer } } } = env;
        const src = ( record1.value || '' ).trim();
        if ( !src ) return;
        let $loadingPromise, loadingPromise = promise => {
            if ( !promise ) return $loadingPromise; // Get
            $loadingPromise = promise.then( () => interception.remove() ); // Set
        };
        const loading = ( record2.value || '' ).trim();
        const interception = Observer.intercept( this.defs, 'get', async ( descriptor, recieved, next ) => {
            if ( loading === 'lazy' ) { loadingPromise( this.load( src, true ) ); }
            await loadingPromise();
            return next();
        }, { signal } );
        if ( loading !== 'lazy' ) { loadingPromise( this.load( src ) ); }
    }
    
    /**
     * Fetches a module's "src".
     *
     * @param String src
     *
     * @return Promise
     */
    #fetchedURLs = new Set;
    #fetchInFlight;
    load( src ) {
        const { window } = env;
        if ( this.#fetchedURLs.has( src ) ) {
            // Cache busting is needed to 
            return Promise.resolve();
        }
        this.#fetchedURLs.add( src );
        if ( this.#fetchedURLs.size === 1 && this.host.content.children.length ) {
            return Promise.resolve();
        }
        // Ongoing request?
        this.#fetchInFlight?.controller.abort();
        // The promise
        const controller = new AbortController();
        const fire = ( type, detail ) => this.host.dispatchEvent( new window.CustomEvent( type, { detail } ) );
        const request = window.fetch( src, { signal: controller.signal, element: this.host } ).then( response => {
            return response.ok ? response.text() : Promise.reject( response.statusText );
        } ).then( content => {
            this.host.innerHTML = content.trim(); // IMPORTANT: .trim()
            fire( 'load' );
            return this.host;
        } ).catch( e => {
            console.error( `Error fetching the bundle at "${ src }": ${ e.message }` );
            this.#fetchInFlight = null;
            fire( 'loaderror' );
            return this.host;
        } );
        this.#fetchInFlight = { request, controller };
        return request;
    }

    /**
     * Evaluates module inheritance.
     *
     * @returns Void|AbortController
     */
    evalInheritance( ) {
        if ( !this.parent ) return [];
        const { window: { webqit: { Observer } } } = env;
        let extendedId = ( this.host.getAttribute( this.config.attr.extends ) || '' ).trim();
        let inheritedIds = ( this.host.getAttribute( this.config.attr.inherits ) || '' ).trim().split( ' ' ).map( id => id.trim() ).filter( x => x );
        const handleInherited = records => {
            records.forEach( record => {
                if ( Observer.get( this.defs, record.key ) !== record.oldValue ) return;
                if ( [ 'get'/*initial get*/, 'set', 'def' ].includes( record.type ) ) {
                    Observer[ record.type.replace( 'get', 'set' ) ]( this.defs, record.key, record.value );
                } else if ( record.type === 'delete' ) {
                    Observer.deleteProperty( this.defs, record.key );
                }
            } );
        };
        const realtimes = [];
        const parentDefsObj = getDefs( this.parent );
        if ( extendedId ) {
            realtimes.push( Observer.reduce( parentDefsObj, [ extendedId, this.config.api.defs, Infinity ], Observer.get, handleInherited, { live: true } ) );
        }
        if ( inheritedIds.length ) {
            realtimes.push( Observer.get( parentDefsObj, inheritedIds.includes( '*' ) ? Infinity : inheritedIds, handleInherited, { live: true } ) );
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
        this.realtimeC.forEach( r => ( r instanceof Promise ? r.then( r => r.abort() ) : r.abort() ) );
        Object.entries( this.defs ).forEach( ( [ key, entry ] ) => {
            if ( key.startsWith( '#' ) ) return;
            HTMLModule.instance( entry ).dispose();
        } );
    }
}
