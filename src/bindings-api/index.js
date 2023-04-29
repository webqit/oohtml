
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { _, _init } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'bindings-api', $config, {
        api: { bind: 'bind', bindings: 'bindings', },
    } );
    window.webqit.Observer = Observer;
    exposeAPIs.call( window, config );
}

export { Observer }

/**
 * @Exports
 * 
 * The internal bindings object
 * within elements and the document object.
 */
function getBindingsObject( node ) {
	if ( !_( node ).has( 'bindings' ) ) {
		const bindingsObj = Object.create( null );
		_( node ).set( 'bindings', bindingsObj );
	}
	return _( node ).get( 'bindings' );
}

/**
 * Exposes Bindings with native APIs.
 *
 * @param Object config
 *
 * @return Void
 */
function exposeAPIs( config ) {
	const window = this;
    // Assertions
    if ( config.api.bind in window.document ) { throw new Error( `document already has a "${ config.api.bind }" property!` ); }
    if ( config.api.bindings in window.document ) { throw new Error( `document already has a "${ config.api.bindings }" property!` ); }
    if ( config.api.bind in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.bind }" property!` ); }
    if ( config.api.bindings in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.bindings }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.api.bind, { value: function( bindings, config = {} ) {
        return applyBindings( window.document, bindings, config );
    } });
    Object.defineProperty( window.document, config.api.bindings, { get: function() {
        return Observer.proxy( getBindingsObject( window.document ) );
    } });
    Object.defineProperty( window.Element.prototype, config.api.bind, { value: function( bindings, config = {} ) {
        return applyBindings( this, bindings, config );
    } });
    Object.defineProperty( window.Element.prototype, config.api.bindings, { get: function() {
        return Observer.proxy( getBindingsObject( this ) );
    } } );
}

/**
 * Exposes Bindings with native APIs.
 *
 * @param document|Element  target
 * @param Object            bindings
 * @param Object            params
 *
 * @return Void
 */
function applyBindings( target, bindings, { merge, diff, namespace } = {} ) {
    const bindingsObj = getBindingsObject( target );
    const $params = { diff, namespace };
    if ( merge ) return Observer.set( bindingsObj, bindings, $params );;
    const exitingKeys = Observer.ownKeys( bindingsObj, $params ).filter( key => !( key in bindings ) );
    return Observer.batch( bindingsObj, () => {
        if ( exitingKeys.length ) { Observer.deleteProperty( bindingsObj, exitingKeys, $params ); }
        return Observer.set( bindingsObj, bindings, $params );
    }, $params );
}