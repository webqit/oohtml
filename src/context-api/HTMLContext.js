
/**
 * @imports
 */
import { _compare } from '../util.js';
import HTMLContextManager from './HTMLContextManager.js';

export default class HTMLContext {

    /**
     * @params
     */
    static get params() {
        return {};
    }

    /**
     * @attachTo
     */
    static attachTo( host, Id, multiple = false ) {
        let instance, contextMgr = HTMLContextManager.instance( host );
        if ( !multiple && ( instance = contextMgr.find( cx => this.matchRequest( cx.id, Id, true ) ) ) ) return instance;
        return contextMgr.attach( new this( Id ) );
    }

    /**
     * @detachFrom
     */
    static detachFrom( host, Id, multiple = false ) {
        let instance, contextMgr = HTMLContextManager.instance( host );
        for ( instance of contextMgr[ '#' ].contexts ) {
            if ( !this.matchRequest( instance.id, Id, true ) || ( typeof multiple === 'function' && !multiple( instance ) ) ) continue;
            contextMgr.detach( instance );
            if ( typeof multiple !== 'function' && !multiple ) return instance;
        }
    }
 
    /**
     * @createId
     */
    static createId( host, fields = {} ) {
        const id = { type: 'HTMLModules', ...fields };
        if ( id.name ) return id;
        if ( host.getAttribute && !( id.name = ( host.getAttribute( this.params.context.attr.contextname ) || '' ).trim() ) ) {
            delete id.name;
        } else if ( !host.ownerDocument ) {
            id.name = 'root';
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
        return request.type === id.type && !request.name || request.name === id.name;
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
        if ( this.disposed || ( event.target === this.host && !event.request?.selfScoped )
        || !event.request || typeof event.callback !== 'function' || !this.constructor.matchRequest( this.id, event.request ) ) return;
        event.stopPropagation();
        if ( event.type === 'contextclaim' ) {
            const claims = new Set;
            this.subscriptions.forEach( subscriptionEvent => {
                if ( !event.target.contains( subscriptionEvent.request.selfScoped ? subscriptionEvent.target : subscriptionEvent.target.parentNode ) 
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
        HTMLContextManager.instance( host ).ask( this.id, claims => claims.forEach( subscriptionEvent => {
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
            const { target, request, callback, params } = subscriptionEvent;
            HTMLContextManager.instance( target ).ask( request, callback, params );
        } );
        return this;
    }

}