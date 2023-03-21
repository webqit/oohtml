
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import Observer from '@webqit/observer';
import { _ } from '../util.js';

/**
 * @init
 * 
 * @param Object $params
 */
export default function init( $params = {} ) {
	const window = this, dom = wqDom.call( window );
    if ( !window.wq ) { window.wq = {}; }
    window.wq.Observer = Observer;
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        api: { bind: 'bind', bindings: 'bindings', },
    } );
    exposeAPIs.call( this, params );
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
 * @param Object params
 *
 * @return Void
 */
function exposeAPIs( params ) {
	const window = this;
    // Assertions
    if ( params.api.bind in window.document ) { throw new Error( `document already has a "${ params.api.bind }" property!` ); }
    if ( params.api.bindings in window.document ) { throw new Error( `document already has a "${ params.api.bindings }" property!` ); }
    if ( params.api.bind in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ params.api.bind }" property!` ); }
    if ( params.api.bindings in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ params.api.bindings }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.api.bind, { value: function( bindings, params = {} ) {
        return applyBindings( window.document, bindings, params );
    } });
    Object.defineProperty( window.document, params.api.bindings, { get: function() {
        return Observer.proxy( getBindingsObject( window.document ) );
    } });
    Object.defineProperty( window.Element.prototype, params.api.bind, { value: function( bindings, params = {} ) {
        return applyBindings( this, bindings, params );
    } });
    Object.defineProperty( window.Element.prototype, params.api.bindings, { get: function() {
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
function applyBindings( target, bindings, params ) {
    const bindingsObj = getBindingsObject( target );
    const exitingKeys = Observer.ownKeys( bindingsObj, params ).filter( key => !( key in bindings ) );
    return Observer.batch( bindingsObj, () => {
        if ( exitingKeys.length ) { Observer.deleteProperty( bindingsObj, exitingKeys, params ); }
        Observer.set( bindingsObj, bindings, params );
    } );
}