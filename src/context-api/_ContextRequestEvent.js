
export default function() {
    const window = this;
    return class ContextRequestEvent extends window.Event {

        /**
         * @constructor
         */
        constructor( request, callback, { type = 'contextrequest', ...params } = {} ) {
            super( type, params );
            Object.defineProperty( this, 'request', { get: () => request } );
            Object.defineProperty( this, 'callback', { get: () => callback } );
        }

        /**
         * @respondWith
         */
        respondWith( response, ...rest ) {
            if ( this.request.diff ) {
                if ( 'previousValue' in this && this.previousValue === response ) return;
                this.previousValue = response;
            }
            return this.callback( response, ...rest );
        }
    };
}