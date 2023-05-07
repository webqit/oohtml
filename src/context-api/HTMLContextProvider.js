
/**
 * @imports
 */
import { _compare } from '../util.js';
import HTMLContext from './HTMLContext.js';

export default class HTMLContextProvider {

    /**
     * @config
     */
    static get config() {
        return {};
    }

    /**
     * @attachTo
     */
    static attachTo( host, Id, multiple = false ) {
        let provider, contextMgr = HTMLContext.instance( host );
        if ( !multiple && ( provider = contextMgr.findProvider( cx => this.matchRequest( cx.id, Id, true ) ) ) ) return provider;
        return contextMgr.attachProvider( new this( Id ) );
    }

    /**
     * @detachFrom
     */
    static detachFrom( host, Id, multiple = false ) {
        let provider, contextMgr = HTMLContext.instance( host );
        for ( provider of contextMgr[ '#' ].contexts ) {
            if ( !this.matchRequest( provider.id, Id, true ) || ( typeof multiple === 'function' && !multiple( provider ) ) ) continue;
            contextMgr.detachProvider( provider );
            if ( typeof multiple !== 'function' && !multiple ) return provider;
        }
    }
 
    /**
     * @createId
     */
    static createId( host, fields = {} ) {
        const id = { ...fields };
        if ( id.contextName ) return id;
        if ( host.getAttribute && !( id.contextName = ( host.getAttribute( this.config.context.attr.contextname ) || '' ).trim() ) ) {
            delete id.contextName;
        } else if ( !host.ownerDocument ) {
            id.contextName = 'root';
        }
        return id;
    }
 
    /**
     * @createRequest
     */
    static createRequest( fields = {} ) {
        return { ...fields };
    }

    /**
     * @matchesRequest
     */
    static matchRequest( id, request, strict = false ) {
        if ( strict ) return _compare( id, request, 1, true );
        return request.type === id.type && !request.contextName || request.contextName === id.contextName;
    }

    /**
     * @constructor
     */
    constructor( id ) {
        Object.defineProperty( this, 'id', { get: () => id } );
        Object.defineProperty( this, 'subscriptions', { value: new Set } );
    }

    /**
     * @length()
     */
    get length() {
        this.subscriptions.size;
    }

    /**
     * @handle()
     */
    handle( event ) {}

    /**
     * @subscribe()
     */
    subscribe( event ) {
        this.subscriptions.add( event );
        if ( !event.request.signal ) return;
        event.request.signal.addEventListener( 'abort', () => {
            this.unsubscribe( event );
        } );
    }

    /**
     * @unsubscribe()
     */
    unsubscribe( event ) {
        this.subscriptions.delete( event );
        event.request.controller?.abort();
    }

    /**
     * @handleEvent()
     */
    handleEvent( event ) {
        if ( this.disposed || ( event.target === this.host && event.request?.superContextOnly )
        || !event.request || typeof event.callback !== 'function' || !this.constructor.matchRequest( this.id, event.request ) ) return;
        event.stopPropagation();
        if ( event.type === 'contextclaim' ) {
            const claims = new Set;
            this.subscriptions.forEach( subscriptionEvent => {
                if ( !event.target.contains( subscriptionEvent.request.superContextOnly ? subscriptionEvent.target.parentNode : subscriptionEvent.target ) 
                || !this.constructor.matchRequest( event.request/*provider ID*/, subscriptionEvent.request/*request ID*/ ) ) return;
                this.subscriptions.delete( subscriptionEvent );
                claims.add( subscriptionEvent );
            } );
            event.respondWith( claims );
        } else if ( event.type === 'contextrequest' ) {
            if ( event.request.live ) { this.subscribe( event ); }
            this.handle( event );
        }
    }

    /**
     * @initialize()
     */
    initialize( host ) {
        this.host = host;
        this.disposed = false;
        host.addEventListener( 'contextrequest', this );
        host.addEventListener( 'contextclaim', this );
        HTMLContext.instance( host ).request( { ...this.id, superContextOnly: true }, claims => claims.forEach( subscriptionEvent => {
            this.subscribe( subscriptionEvent );
            this.handle( subscriptionEvent );
        } ), { type: 'contextclaim' } );
        return this;
    }
     
    /**
     * @dispose()
     */
    dispose( host ) {
        this.disposed = true;
        host.removeEventListener( 'contextrequest', this );
        host.removeEventListener( 'contextclaim', this );
        this.subscriptions.forEach( subscriptionEvent => {
            this.unsubscribe( subscriptionEvent );
            const { target, request, callback, options } = subscriptionEvent;
            HTMLContext.instance( target ).request( request, callback, options );
        } );
        return this;
    }

}