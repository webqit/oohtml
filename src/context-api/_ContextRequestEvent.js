
export default function() {
    const window = this;
    return class ContextRequestEvent extends window.Event {

        /**
         * @constructor
         */
        constructor( request, callback, { type = 'contextrequest', ...options } = {} ) {
            super( type, options );
            Object.defineProperty( this, 'request', { get: () => request } );
            Object.defineProperty( this, 'callback', { get: () => callback } );
        }

        /**
         * @respondWith
         */
        respondWith( response, ...rest ) {
            if ( this.request.diff ) {
                if ( 'prevValue' in this && this.prevValue === response ) return;
                Object.defineProperty( this, 'prevValue', { value: response, configurable: true } );
            }
            return this.callback( response, ...rest );
        }
    };
}