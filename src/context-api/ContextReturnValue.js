
/**
 * @imports
 */
import Observer from "@webqit/observer";

export default class ContextReturnValue {
    constructor( request, hostElement ) {
        Object.defineProperty( this, 'request', { value: request } );
        Object.defineProperty( this, 'hostElement', { value: hostElement } );
        if ( request.live && !request.signal ) {
            Object.defineProperty( this, 'abortController', { value: new AbortController } );
            request.signal = this.abortController.signal;
        }
    }
    callback( response ) { Observer.defineProperty( this, 'value', { value: response, configurable: true, enumerable: true } ); }
    abort() {
        if ( this.abortController ) { return this.abortController.abort(); }
        const window = this.hostElement.ownerDocument?.defaultView || this.hostElement.defaultView;
        if ( this.request.signal ) { return this.request.signal.dispatchEvent( new window.Event( 'abort' ) ); }
    }
}