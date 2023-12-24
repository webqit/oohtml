
/**
 * @imports
 */
import DOMContext from '../context-api/DOMContext.js';
import { env } from '../util.js';

export default class DOMBindingsContext extends DOMContext {

    static kind = 'bindings';

    /**
     * @createRequest
     */
    static createRequest( detail = null ) {
        const request = super.createRequest();
        if ( detail?.startsWith( '@' ) ) {
            const [ targetContext, ...detail ] = detail.slice( 1 ).split( '.' ).map( s => s.trim() );
            request.targetContext = targetContext;
            request.detail = detail.join( '.' );
        } else { request.detail = detail; }
        return request;
    }

    /**
     * @bindingsObj
     */
    get bindingsObj() { return this.host[ this.configs.BINDINGS_API.api.bindings ]; }

    /**
     * @matchesEvent
     */
    matchEvent( event ) {
        return super.matchEvent( event )
        && ( !event.detail || !this.detail || ( Array.isArray( event.detail ) ? event.detail[ 0 ] === this.detail : event.detail === this.detail ) );
    }

    /**
     * @handle()
     */
    handle( event ) {
        // Any existing event._controller? Abort!
        event._controller?.abort();
        if ( !( event.detail + '' ).trim() ) return event.respondWith( this.bindingsObj );
        const { window: { webqit: { Observer } } } = env;
        event._controller = Observer.reduce( this.bindingsObj, Array.isArray( event.detail ) ? event.detail : [ event.detail ], Observer.get, descriptor => {
            if ( this.disposed ) return; // If already scheduled but aborted as in provider unmounting
            event.respondWith( descriptor.value );
        }, { live: event.live, signal: event.signal, descripted: true } );
    }

    /**
     * @unsubscribed()
     */
    unsubscribed( event ) { event._controller?.abort(); }
}
