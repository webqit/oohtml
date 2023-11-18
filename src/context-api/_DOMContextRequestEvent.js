
/**
 * @imports
 */
import { env } from '../util.js';

export default function() {
    const { window } = env, { webqit } = window;
    if ( webqit.DOMContextRequestEvent ) return webqit.DOMContextRequestEvent;
    class DOMContextRequestEvent extends window.Event {
        /**
         * @constructor
         */
        constructor( ...args ) {
            const callback = args.pop();
            if ( typeof callback !== 'function' ) throw new Error( `Callback must be provided.` );
            const options = args.pop();
            if ( !options?.kind ) throw new Error( `"options.kind" must be specified.` );
            const eventNames = [ 'contextrequest', 'contextclaim' ];
            const type = args.pop() || eventNames[ 0 ];
            if ( !eventNames.includes( type ) ) throw new Error( `Invalid event type. Must be one of: ${ eventNames.join( ',' ) }` );
            // -------------
            const { kind, detail, targetContext, live, signal, diff, ...otherOpts } = options;
            super( type, { ...otherOpts, bubbles: otherOpts.bubbles !== false  } );
            // -------------
            Object.defineProperty( this, 'callback', { get: () => callback } );
            Object.defineProperty( this, 'kind', { get: () => kind } );
            Object.defineProperty( this, 'targetContext', { get: () => targetContext } );
            Object.defineProperty( this, 'detail', { get: () => detail } );
            Object.defineProperty( this, 'live', { get: () => live } );
            Object.defineProperty( this, 'signal', { get: () => signal } );
            Object.defineProperty( this, 'diff', { get: () => diff } );
            Object.defineProperty( this, 'options', { get: () => otherOpts } );
        }

        /**
         * @respondWith
         */
        respondWith( response ) {
            if ( this.diff ) {
                if ( '_prevValue' in this && this._prevValue === response ) return;
                Object.defineProperty( this, '_prevValue', { value: response, configurable: true } );
            }
            return this.callback( response );
        }
    }
    webqit.DOMContextRequestEvent = DOMContextRequestEvent;
    return DOMContextRequestEvent;
}