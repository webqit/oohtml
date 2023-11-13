
/**
 * @imports
 */
import { _init } from '../util.js';
import HTMLContext from './HTMLContext.js';
import HTMLContextProvider from './HTMLContextProvider.js';

/**
 * @exports
 */
export {
    HTMLContextProvider,
    HTMLContext,
}

/**
 * Initializes HTML Modules.
 * 
 * @param $config  Object
 *
 * @return Void
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'context-api', $config, {
        attr: { contextname: 'contextname', },
        api: { context: 'context', },
    } );
    window.webqit.HTMLContextProvider = HTMLContextProvider;
    window.webqit.HTMLContext = HTMLContext;
    exposeAPIs.call( window, config );
}

/**
 * Exposes HTML Modules with native APIs.
 *
 * @param Object                    config
 *
 * @return Void
 */
function exposeAPIs( config ) {
    const window = this;
    // Assertions
    if ( config.api.context in window.document ) { throw new Error( `document already has a "${ config.api.context }" property!` ); }
    if ( config.api.context in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ config.api.context }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.api.context, { get: function() {
        return HTMLContext.instance( window.document );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, config.api.context, { get: function() {
        return HTMLContext.instance( this );
    } } );
    const waitlist = new Set;
    window.addEventListener( 'contextrequest', event => {
        if ( !( typeof event.request === 'object' && event.request ) || typeof event.respondWith !== 'function' ) return;
        waitlist.add( event );
        event.respondWith();
    } );
    window.addEventListener( 'contextclaim', event => {
        if ( !( typeof event.request === 'object' && event.request ) || typeof event.respondWith !== 'function' ) return;
        const claims = new Set;
        waitlist.forEach( subscriptionEvent => {
            if ( !HTMLContextProvider.providers.get( event.request.type ).matchRequest( event.request/*provider ID*/, subscriptionEvent.request/*request ID*/ ) ) return;
            waitlist.delete( subscriptionEvent );
            claims.add( subscriptionEvent );
        } );
        event.respondWith( claims );
    } );
}
