
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import HTMLContextManager from './HTMLContextManager.js';
import HTMLContext from './HTMLContext.js';

/**
 * Initializes HTML Modules.
 * 
 * @param $params  Object
 *
 * @return Void
 */
export default function init( $params = { }) {
    const window = this, dom = wqDom.call( window );
    // -------
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        api: { context: 'context', },
    } );
    // -------
    exposeModulesObjects.call( this, params );
}

/**
 * Exposes HTML Modules with native APIs.
 *
 * @param Object                    params
 *
 * @return Void
 */
function exposeModulesObjects( params ) {
    const window = this;
    // Assertions
    if ( params.api.context in window.document ) { throw new Error( `document already has a "${ params.api.context }" property!` ); }
    if ( params.api.context in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ params.api.context }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.api.context, { get: function() {
        return HTMLContextManager.instance( window.document );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, params.api.context, { get: function() {
        return HTMLContextManager.instance( this );
    } } );
}

/**
 * @exports
 */
export {
    HTMLContextManager,
    HTMLContext,
}