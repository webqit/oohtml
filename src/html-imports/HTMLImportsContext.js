
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
            const [ targetContext, ...detail ] = detail.slice( 1 ).split( /(?<=\w)(?=\/|#)/ ).map( s => s.trim() );
            request.targetContext = targetContext;
            request.detail = detail.join( '' );
        } else { request.detail = detail; }
        return request;
    }
     
    /**
     * @localModules
     */
    get localModules() { return getDefs( this.host ); }

    /**
     * @handle()
     */
    handle( event ) {
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
            if ( _isValidLocalResult || !this.contextModules ) {
                event._isValidLocalResult = _isValidLocalResult;
                return event.respondWith( _result );
            }
            // This superModules binding is automatically aborted by the injected control.signal; see below
            return Observer.reduce( this.contextModules, path, Observer.get, result => {
                event._currentSource = 'context';
                return event.respondWith( Array.isArray( result ) ? result : result.value );
            }, { ...options, signal } );
        }, { lifecycleSignals: true, ...options } );
    }

    /**
     * @unsubscribed()
     */
    unsubscribed( event ) { event.meta.controller?.abort(); }

    /**
     * @startRealtime()
     */
    realtimeSources( host ) {
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
        // Any existing this.refdSourceController? Abort!
        this.refdSourceController?.disconnect();
        const realdom = this.host.ownerDocument.defaultView.webqit.realdom;
        this.refdSourceController = realdom.realtime( this.host ).attr( $config.attr.importscontext, ( record, { signal } ) => {
            // No importscontext attr set. But we're still watching
            if ( !record.value ) {
                this.contextModules = undefined;
                return update();
            }
            // This superModules contextrequest is automatically aborted by the injected signal below
            const request = { ...this.constructor.createRequest( record.value.trim() ), live: true, signal };
            this.host.parentNode[ this.configs.CONTEXT_API.api.contexts ].request( request, response => {
                this.contextModules = !( response && Object.getPrototypeOf( response ) ) ? response : getDefs( response );
                update();
            } );
        }, { live: true, timing: 'sync', lifecycleSignals: true } );
    }

    /**
     * @initialize()
     */
    initialize( host ) {
        // If host has importscontext attr, compute that
        this.realtimeSources( host );
        // Now, listen for contextrequest and contextclaim events
        // And process own claim
        return super.initialize( host );
    }
    
    /**
     * @dispose()
     */
    dispose( host ) {
        // Stop listening for sources
        this.refdSourceController?.disconnect();
        // Now, stop listening for contextrequest and contextclaim events
        // And relinquish own subscribers to owner context
        return super.dispose( host );
    }
}
