
/**
 * @imports
 */
import { _init } from '../util.js';
import HTMLContext from './HTMLContext.js';
import HTMLContextProvider from './HTMLContextProvider.js';

/**
 * Initializes HTML Modules.
 * 
 * @param $config  Object
 *
 * @return Void
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'context-api', $config, {
        api: { context: 'context', },
    } );
    window.webqit.HTMLContextProvider = HTMLContextProvider;
    window.webqit.HTMLContext = HTMLContext;
    exposeModulesObjects.call( window, config );
}

/**
 * Exposes HTML Modules with native APIs.
 *
 * @param Object                    config
 *
 * @return Void
 */
function exposeModulesObjects( config ) {
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
}

/**
 * @exports
 */
export {
    HTMLContextProvider,
    HTMLContext,
}