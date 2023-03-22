
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { HTMLContextManager, HTMLContext } from '../context-api/index.js';
import { getModulesObject } from './index.js';
import { _ } from '../util.js';

export default class _HTMLImportsContext extends HTMLContext {
 
    /**
     * @createRequest
     */
    static createRequest( fields = {} ) {
        const request = { type: 'HTMLModules', ...fields };
        if ( !request.name && request.detail?.startsWith( '/' ) ) { request.name = 'root'; }
        else if ( request.detail?.startsWith( '@' ) ) {
            const [ contextName, detail ] = request.detail.split( ':' ).map( s => s.trim() );
            request.name = contextName.slice( 1 );
            request.detail = detail;
        }
        return request;
    }

    /**
     * @modules
     */
    get modules() {
        return getModulesObject( this.host );
    }

    /**
     * @handle()
     */
    handle( event ) {
        // Any existing event.request.controller? Abort!
        event.request.controller?.abort();

        // Parse and translate detail
        if ( ( event.request.detail || '' ).trim() === '/' ) return event.respondWith( this.modules );
        const $config = this.constructor.config;
        let path = ( event.request.detail || '' ).split( /\/|(?<=\w)(?=\W)/g ).map( x => x.trim() ).filter( x => x );
        if ( path.length ) { path = path.join( `/${ $config.template.api.modules }/` )?.split( '/' ) || []; }
        // No detail?
        if ( !path.length ) return event.respondWith();

        // We'll now fulfill request
        const params = { live: event.request.live, descripted: true, midwayResults: true };
        // Find a way to resolve request against two sources
        event.request.controller = Observer.deep( this.modules, path, Observer.get, ( result, { signal } = {} ) => {
            if ( !result.value && this.host.isConnected === false ) return; // Subtree is being disposed
            if ( result.value || !this.altModules ) return event.respondWith( result.value );
            // This superModules binding is automatically aborted by the injected control.signal; see below
            return Observer.deep( this.altModules, path, Observer.get, result => {
                return event.respondWith( result.value );
            }, { signal, ...params } );
        }, params );
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
        const dom = this.host.ownerDocument.defaultView.webqit.dom;
        this.refdSourceController = dom.realtime( this.host ).attr( $config.context.attr.importscontext, ( record, { signal } ) => {
            // No importscontext attr set. But we're still watching
            if ( !record.value ) {
                this.altModules = undefined;
                return update();
            }
            // This superModules contextrequest is automatically aborted by the injected signal below
            const request = this.constructor.createRequest( { detail: record.value.trim(), live: true, signal, superContextOnly: true } );
            HTMLContextManager.instance( this.host ).ask( request, response => {
                this.altModules = !( response && Object.getPrototypeOf( response ) ) ? response : getModulesObject( response );
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
