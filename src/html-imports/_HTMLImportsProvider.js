
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { HTMLContext, HTMLContextProvider } from '../context-api/index.js';
import { getModulesObject } from './index.js';
import { _ } from '../util.js';

export default class _HTMLImportsProvider extends HTMLContextProvider {

    static type = 'html-imports';

    /**
     * @createRequest
     */
    static createRequest( fields = {} ) {
        const request = super.createRequest( fields );
        if ( !request.contextName && request.detail?.startsWith( '/' ) ) { request.contextName = 'root'; }
        else if ( request.detail?.startsWith( '@' ) ) {
            const [ contextName, ...detail ] = request.detail.slice( 1 ).split( /(?<=\w)(?=\/|#)/ ).map( s => s.trim() );
            request.contextName = contextName;
            request.detail = detail.join( '' );
        }
        return request;
    }
     
    /**
     * @localModules
     */
    get localModules() {
        return getModulesObject( this.host );
    }

    /**
     * @handle()
     */
    handle( event ) {
        // Any existing event.request.controller? Abort!
        event.request.controller?.abort();

        // Parse and translate detail
        if ( ( event.request.detail || '' ).trim() === '/' ) return event.respondWith( this.localModules );
        const $config = this.constructor.config;
        let path = ( event.request.detail || '' ).split( /\/|(?<=\w)(?=#)/g ).map( x => x.trim() ).filter( x => x );
        if ( path.length ) { path = path.join( `/${ $config.template.api.modules }/` )?.split( '/' ) || []; }
        // No detail?
        if ( !path.length ) return event.respondWith();
 
        // We'll now fulfill request
        const options = { live: event.request.live, descripted: true };
        // Find a way to resolve request against two sources
        event.request.controller = Observer.reduce( this.localModules, path, Observer.get, ( result, { signal } = {} ) => {
            const _result = Array.isArray( result ) ? result : result.value;
            const _isValidResult = Array.isArray( result ) ? result.length : result.value;
            if ( !_isValidResult && this.host.isConnected === false ) return; // Subtree is being disposed
            if ( _isValidResult || !this.contextModules ) return event.respondWith( _result );
            // This superModules binding is automatically aborted by the injected control.signal; see below
            return Observer.reduce( this.contextModules, path, Observer.get, result => {
                return event.respondWith( Array.isArray( result ) ? result : result.value );
            }, { signal, ...options } );
        }, { lifecycleSignals: true, ...options } );
    }

    /**
     * @startRealtime()
     */
    realtimeSources( host ) {
        this.host = host;
        // ----------------
        const update = () => {
            for ( const subscriptionEvent of this.subscriptions ) {
                this.handle( subscriptionEvent );
            }
        };
        // ----------------
        const $config = this.constructor.config;
        if ( !this.host.matches || !$config.context.attr.importscontext ) return;
        // Any existing this.refdSourceController? Abort!
        this.refdSourceController?.disconnect();
        const realdom = this.host.ownerDocument.defaultView.webqit.realdom;
        this.refdSourceController = realdom.realtime( this.host ).attr( $config.context.attr.importscontext, ( record, { signal } ) => {
            // No importscontext attr set. But we're still watching
            if ( !record.value ) {
                this.contextModules = undefined;
                return update();
            }
            // This superModules contextrequest is automatically aborted by the injected signal below
            const request = this.constructor.createRequest( { detail: record.value.trim(), live: true, signal, superContextOnly: true } );
            HTMLContext.instance( this.host ).request( request, response => {
                this.contextModules = !( response && Object.getPrototypeOf( response ) ) ? response : getModulesObject( response );
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
