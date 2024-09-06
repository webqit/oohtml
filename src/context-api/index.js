
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
    const waitListMappings = new Map, dispatchEvent = window.EventTarget.prototype.dispatchEvent;
    Object.defineProperty( window.EventTarget.prototype, 'dispatchEvent', { value: function( ...args ) {
        const event = args[0], rootNode = this.getRootNode?.();
        if ( [ 'contextclaim', 'contextrequest' ].includes( event.type ) && rootNode ) {
            if ( event.meta ) event.meta.target = this;
            const temp = event => {
                event.stopImmediatePropagation();
                // Always set this whether answered or not
                if ( event.meta ) event.meta.target = event.target;
                if ( event.answered ) return;
                if ( !waitListMappings.get( rootNode ) ) waitListMappings.set( rootNode, new Set );
                if ( event.type === 'contextrequest' && event.live ) {
                    waitListMappings.get( rootNode ).add( event );
                } else if ( event.type === 'contextclaim' ) {
                    const claims = new Set;
                    waitListMappings.get( rootNode ).forEach( subscriptionEvent => {
                        if ( !event.target.contains( subscriptionEvent.target ) || !event.detail?.matchEvent?.( subscriptionEvent ) ) return;
                        waitListMappings.get( rootNode ).delete( subscriptionEvent );
                        claims.add( subscriptionEvent );
                    } );
                    if ( !waitListMappings.get( rootNode ).size ) waitListMappings.delete( rootNode );
                    return event.respondWith?.( claims );
                }
            };
            rootNode.addEventListener( event.type, temp );
            const returnValue = dispatchEvent.call( this, ...args );
            rootNode.removeEventListener( event.type, temp );
            return returnValue;
        }
        return dispatchEvent.call( this, ...args );
    } } );
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
    [ window.Document.prototype, window.Element.prototype, window.ShadowRoot.prototype ].forEach( prototype => {
        // No-conflict assertions
        const type = prototype === window.Document.prototype ? 'Document' : ( prototype === window.ShadowRoot.prototype ? 'ShadowRoot' : 'Element' );
        if ( config.api.contexts in prototype ) { throw new Error( `The ${ type } prototype already has a "${ config.api.contexts }" API!` ); }
        // Definitions
        Object.defineProperty( prototype, config.api.contexts, { get: function() {
            return DOMContexts.instance( this );
        } } );
    } );
}
