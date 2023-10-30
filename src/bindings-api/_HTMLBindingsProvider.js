
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { HTMLContextProvider } from '../context-api/index.js';

export default class _HTMLBindingsProvider extends HTMLContextProvider {

    static type = 'bindings';

    /**
     * @matchesRequest
     */
    static matchRequest( id, request ) {
        return super.matchRequest( id, request ) && ( !request.detail || !id.detail || ( Array.isArray( request.detail ) ? request.detail[ 0 ] === id.detail : request.detail === id.detail ) );
    }

    /**
     * @bindingsObj
     */
    get bindingsObj() {
        return this.host[ this.constructor.config.api.bindings ];
    }

    /**
     * @handle()
     */
    handle( event ) {
        // Any existing event.request.controller? Abort!
        event.request.controller?.abort();
        if ( !( event.request.detail + '' ).trim() ) return event.respondWith( this.bindingsObj ); 
        event.request.controller = Observer.reduce( this.bindingsObj, Array.isArray( event.request.detail ) ? event.request.detail : [ event.request.detail ], Observer.get, descriptor => {
            if ( this.disposed ) return; // If already scheduled but aborted as in provider unmounting
            event.respondWith( descriptor.value );
        }, { live: event.request.live, descripted: true } );
    }
}
