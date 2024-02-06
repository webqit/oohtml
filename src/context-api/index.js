
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
