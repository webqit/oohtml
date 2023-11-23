
/**
 * @imports
 */
import DOMContexts from './DOMContexts.js';
import DOMContext from './DOMContext.js';
import _DOMContextRequestEvent from './_DOMContextRequestEvent.js';
import DOMContextResponse from './DOMContextResponse.js';
import DuplicateContextError from './DuplicateContextError.js';
import { _init } from '../util.js';

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
        api: { contexts: 'contexts', },
    } );
    window.webqit.DOMContexts = DOMContexts;
    window.webqit.DOMContext = DOMContext;
    window.webqit.DOMContextRequestEvent = _DOMContextRequestEvent();
    window.webqit.DOMContextResponse = DOMContextResponse;
    window.webqit.DuplicateContextError = DuplicateContextError;
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
    if ( config.api.contexts in window.document ) { throw new Error( `document already has a "${ config.api.contexts }" property!` ); }
    if ( config.api.contexts in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ config.api.contexts }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.api.contexts, { get: function() {
        return DOMContexts.instance( window.document );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, config.api.contexts, { get: function() {
        return DOMContexts.instance( this );
    } } );
    const waitlist = new Set;
    window.addEventListener( 'contextrequest', event => {
        if ( typeof event.respondWith !== 'function' ) return;
        waitlist.add( event );
        event.respondWith();
    } );
    window.addEventListener( 'contextclaim', event => {
        if ( typeof event.detail !== 'object' || typeof event.detail.matchEvent !== 'function' || typeof event.respondWith !== 'function' ) return;
        const claims = new Set;
        waitlist.forEach( subscriptionEvent => {
            if ( !event.target.contains( subscriptionEvent.target ) || !event.detail.matchEvent( subscriptionEvent ) ) return;
            waitlist.delete( subscriptionEvent );
            claims.add( subscriptionEvent );
        } );
        event.respondWith( claims );
    } );
}
