
/**
 * @imports
 */
import DOMContext from '../context-api/DOMContext.js';
import { getDefs } from './index.js';
import { _, env } from '../util.js';

export default class HTMLImportsContext extends DOMContext {

    /**
     * @kind
     */
    static kind = 'html-imports';

    /**
     * @createRequest
     */
    static createRequest( detail = null ) {
        const request = super.createRequest();
        if ( detail?.startsWith( '/' ) ) {
            request.detail = detail;
            request.targetContext = Infinity;
        } else if ( detail?.startsWith( '@' ) ) {
            const [ targetContext, ..._detail ] = detail.slice( 1 ).split( /(?<=\w)(?=\/|#)/ ).map( s => s.trim() );
            request.targetContext = targetContext;
            request.detail = _detail.join( '' );
        } else { request.detail = detail; }
        return request;
    }
     
    /**
     * @localModules
     */
    get localModules() { return getDefs( this.host ); }
    get inheritedModules() { return this.#inheritedModules; }
    #inheritedModules = {};


    /**
     * @handle()
     */
    handle__( event ) {
        const { window: { webqit: { Observer } } } = env;
        // Any existing event.meta.controller? Abort!
        event.meta.controller?.abort();

        // Parse and translate detail
        if ( ( event.detail || '' ).trim() === '/' ) return event.respondWith( this.localModules );
        let path = ( event.detail || '' ).split( /\/|(?<=\w)(?=#)/g ).map( x => x.trim() ).filter( x => x );
        if ( !path.length ) return event.respondWith();
        path = path.join( `/${ this.configs.HTML_IMPORTS.api.defs }/` )?.split( '/' ) || [];

        // We'll now fulfill request
        const options = { live: event.live, signal: event.signal, descripted: true };
        // Find a way to resolve request against two sources
        event.meta.controller = Observer.reduce( this.localModules, path, Observer.get, ( result, { signal } = {} ) => {
            const _result = Array.isArray( result ) ? result : result.value;
            const _isValidLocalResult = Array.isArray( result ) ? result.length : result.value;
            if ( !_isValidLocalResult && this.host.isConnected === false ) return; // Subtree is being disposed
            if ( _isValidLocalResult || !this.#inheritedModules ) {
                event._isValidLocalResult = _isValidLocalResult;
                return event.respondWith( _result );
            }
            // This superModules binding is automatically aborted by the injected control.signal; see below
            return Observer.reduce( this.#inheritedModules, path, Observer.get, result => {
                event._currentSource = 'context';
                return event.respondWith( Array.isArray( result ) ? result : result.value );
            }, { ...options, signal } );
        }, { lifecycleSignals: true, ...options } );
    }

    /**
     * @startRealtime()
     */
    realtimeSources__( host ) {
        this.host = host;
        // ----------------
        const update = () => {
            for ( const subscriptionEvent of this.subscriptions ) {
                if ( subscriptionEvent._isValidLocalResult ) continue;
                this.handle( subscriptionEvent );
            }
        };
        // ----------------
        const $config = this.configs.HTML_IMPORTS;
        if ( !this.host.matches || !$config.attr.importscontext ) return;
        const realdom = this.host.ownerDocument.defaultView.webqit.realdom;
        let prevRef;
        this.controller3 = realdom.realtime( this.host ).attr( $config.attr.importscontext, ( record, { signal } ) => {
            if (record.value === prevRef) return;
            prevRef = record.value;
            // This superModules contextrequest is automatically aborted by the injected signal below
            const request = { ...this.constructor.createRequest( record.value?.trim() ), live: true, signal, diff: true };
            this.host.parentNode[ this.configs.CONTEXT_API.api.contexts ].request( request, response => {
                this.#inheritedModules = !( response && Object.getPrototypeOf( response ) ) ? response : getDefs( response );
                update();
            } );
        }, { live: true, timing: 'sync', lifecycleSignals: true } );
    }

    /**
     * @handle()
     */
    
    handle( event ) {
        const { window: { webqit: { Observer } } } = env;
        // Any existing event.meta.controller? Abort!
        event.meta.controller?.abort();
        // Parse and translate detail
        let path = ( event.detail || '' ).split( /\/|(?<=\w)(?=#)/g ).map( x => x.trim() ).filter( x => x );
        if ( !path.length ) return event.respondWith();
        path = path.join( `/${ this.configs.HTML_IMPORTS.api.defs }/` )?.split( '/' ).map( x => x === '-' ? Infinity : x ) || [];
        // We'll now fulfill request
        const options = { live: event.live, signal: event.signal, descripted: true };
        event.meta.controller = Observer.reduce( this.#modules, path, Observer.get, ( m ) => {
            if ( Array.isArray( m ) ) {
                // Paths with wildcard
                for ( const n of m ) {
                    event.respondWith( n );
                }
            } else event.respondWith( m.value );
        }, options );
    }

    /**
     * @unsubscribed()
     */
    unsubscribed( event ) { event.meta.controller?.abort(); }

    /**
     * @initialize()
     */
    #modules;
    #controller1;
    #controller2;
    initialize( host ) {
        this.host = host;
        const { window: { webqit: { Observer } } } = env;
        // ----------------
        // Observe local
        this.#modules = Object.assign( {}, this.localModules );
        this.#controller1?.abort();
        this.#controller1 = Observer.observe( this.localModules, ( mutations ) => {
            for ( const m of mutations ) {
                if ( m.type === 'delete' ) {
                    if ( this.inheritedModules && Observer.has( this.inheritedModules, m.key ) ) {
                        Observer.set( this.#modules, m.key, Observer.get( this.inheritedModules, m.key ) );
                    } else Observer.deleteProperty( this.#modules, m.key );
                } else Observer.set( this.#modules, m.key, m.value );
            }
        }, { timing: 'sync' } );
        // ----------------
        // If host has importscontext attr, compute that
        const $config = this.configs.HTML_IMPORTS;
        if ( this.host.matches && $config.attr.importscontext ) {
            const realdom = this.host.ownerDocument.defaultView.webqit.realdom;
            let prevRef;
            this.#controller2?.disconnect();
            this.#controller2 = realdom.realtime( this.host ).attr( $config.attr.importscontext, ( record, { signal } ) => {            
                const moduleRef = ( record.value || '' ).trim();
                if ( moduleRef === prevRef ) return;
                prevRef = moduleRef;
                // This superModules contextrequest is automatically aborted by the injected signal below
                const request = { ...this.constructor.createRequest( moduleRef ? `${moduleRef}/-` : '-' ), live: true, signal, diff: true };
                this.host.parentNode[ this.configs.CONTEXT_API.api.contexts ].request( request, ( m ) => {
                    if ( m.type === 'delete' ) {
                        Reflect.deleteProperty( this.inheritedModules, m.key );
                        if ( !Observer.has( this.localModules, m.key ) ) {
                            Observer.deleteProperty( this.#modules, m.key );
                        }
                    } else {
                        Reflect.set( this.inheritedModules, m.key, m.value );
                        if ( !Observer.has( this.localModules, m.key ) ) {
                            Observer.set( this.#modules, m.key, m.value );
                        }
                    }
                } );
            }, { live: true, timing: 'sync', lifecycleSignals: true } );
        }
        // ----------------
        return super.initialize( host );
    }
    
    /**
     * @dispose()
     */
    dispose( host ) {
        // Stop listening for sources
        this.#controller1?.disconnect();
        this.#controller2?.disconnect();
        // Now, stop listening for contextrequest and contextclaim events
        // And relinquish own subscribers to owner context
        return super.dispose( host );
    }
}
