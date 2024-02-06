
/**
 * @imports
 */
import DOMContext from '../context-api/DOMContext.js';
import { env } from '../util.js';

export default class DOMNamingContext extends DOMContext {

    static kind = 'namespace';

    /**
     * @createRequest
     */
    static createRequest( detail = null ) {
        const request = super.createRequest();
        if ( detail?.startsWith( '@' ) ) {
            const [ targetContext, ...detail ] = detail.slice( 1 ).split( '/' ).map( s => s.trim() );
            request.targetContext = targetContext;
            request.detail = detail.join( '/' );
        } else { request.detail = detail; }
        return request;
    }

    /**
     * @namespaceObj
     */
    get namespaceObj() { return this.host[ this.configs.NAMESPACED_HTML.api.namespace ]; }

    /**
     * @handle()
     */
    handle( event ) {
        const { window: { webqit: { Observer } } } = env;
        // Any existing event.meta.controller? Abort!
        event.meta.controller?.abort();

        // Parse and translate detail
        if ( !( event.detail || '' ).trim() ) return event.respondWith( Observer.unproxy( this.namespaceObj ) );
        let path = ( event.detail || '' ).split( '/' ).map( x => x.trim() ).filter( x => x );
        if ( !path.length ) return event.respondWith();
        path = path.join( `/${ this.configs.NAMESPACED_HTML.api.namespace }/` )?.split( '/' ) || [];

        event.meta.controller = Observer.reduce( this.namespaceObj, path, Observer.get, descriptor => {
            if ( this.disposed ) return; // If already scheduled but aborted as in provider unmounting
            event.respondWith( descriptor.value );
        }, { live: event.live, signal: event.signal, descripted: true } );
    }

    /**
     * @unsubscribed()
     */
    unsubscribed( event ) { event.meta.controller?.abort(); }
}
