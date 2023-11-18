
/**
 * @imports
 */
import DOMContexts from './DOMContexts.js';
import { env } from '../util.js';

export default class DOMContext {

    /**
     * To be implemented by subclasses
     */
    static kind;

    /**
     * @createRequest
     */
    static createRequest() { return { kind: this.kind }; }
    
    /**
     * @constructor
     */
    constructor( detail = null ) {
        Object.defineProperty( this, 'detail', { get: () => detail } );
        Object.defineProperty( this, 'subscriptions', { value: new Set } );
    }

    /**
     * @configs
     */
    get configs() {
        const { window: { webqit: { oohtml: { configs } } } } = env;
        return configs;
    }

    /**
     * @name
     */
    get name() { return this.host === env.window.document ? Infinity : this.host.getAttribute( this.configs.CONTEXT_API.attr.contextname ); }

    /**
     * @subscribed()
     */
    subscribed( event ) {}

    /**
     * @handle()
     */
    handle( event ) {}

    /**
     * @unsubscribed()
     */
    unsubscribed( event ) {}

    /**
     * @matchEvent
     */
    matchEvent( event ) {
        return event.kind === this.constructor.kind
        && ( !event.targetContext || event.targetContext === this.name );
    }

    /**
     * @handleEvent()
     */
    handleEvent( event ) {
        if ( this.disposed || typeof event.respondWith !== 'function'  ) return;
        if ( event.type === 'contextclaim' ) {
            if ( event.target === this.host || !( event.detail instanceof DOMContext ) ) return;
            const claims = new Set;
            this.subscriptions.forEach( subscriptionEvent => {
                if ( !event.target.contains( subscriptionEvent.target ) || !event.detail.matchEvent( subscriptionEvent ) ) return;
                event.stopPropagation();
                this.subscriptions.delete( subscriptionEvent );
                claims.add( subscriptionEvent );
            } );
            return event.respondWith( claims );
        }
        if ( event.type === 'contextrequest' ) {
            if ( !this.matchEvent( event ) ) return;
            if ( event.live ) {
                this.subscriptions.add( event );
                this.subscribed( event );
                event.signal?.addEventListener( 'abort', () => {
                    this.subscriptions.delete( event );
                    this.unsubscribed( event );
                } );
            }
            event.stopPropagation();
            return this.handle( event );
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
        const { value: claims } = DOMContexts.instance( host ).request( 'contextclaim', { kind: this.constructor.kind, detail: this } );
        claims.forEach( subscriptionEvent => {
            this.subscriptions.add( subscriptionEvent );
            this.subscribed( subscriptionEvent );
            this.handle( subscriptionEvent );
        } );
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
            this.subscriptions.delete( subscriptionEvent );
            this.unsubscribed( subscriptionEvent );
            const { target } = subscriptionEvent;
            target.dispatchEvent( subscriptionEvent );
        } );
        return this;
    }

}