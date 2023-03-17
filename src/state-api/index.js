
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
        api: { state: 'state', },
    } );
    exposeAPIs.call( this, params );
}

export { Observer }

/**
 * @Exports
 * 
 * The internal state object
 * within elements and the document object.
 */
function getStateObject( node ) {
	if ( !_( node ).has( 'state' ) ) {
		const stateObj = Object.create( null );
		_( node ).set( 'state', stateObj );
	}
	return _( node ).get( 'state' );
}

/**
 * Exposes State with native APIs.
 *
 * @param Object params
 *
 * @return Void
 */
function exposeAPIs( params ) {
	const window = this;
    // Assertions
    if ( params.api.state in window.document ) { throw new Error( `document already has a "${ params.api.state }" property!` ); }
    if ( params.api.state in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ params.api.state }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.api.state, { get: function() {
        return Observer.proxy( getStateObject( window.document ) );
    } });
    Object.defineProperty( window.Element.prototype, params.api.state, { get: function() {
        return Observer.proxy( getStateObject( this ) );
    } } );
}