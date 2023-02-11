
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import { _internals } from '@webqit/util/js/index.js';
import Observable from '../Observable.js';

/**
 * ---------------------------
 * The State API
 * ---------------------------
 */				

/**
 * Internals shorthand.
 * 
 * @param Any el 
 * @param Array args 
 * 
 * @return Any
 */
const _ = ( el, ...args ) => _internals( el, 'oohtml', ...args );

/**
 * @init
 * 
 * @param Object $params
 */
export default function init( $params = {} ) {
	const window = this, dom = wqDom.call( window );
    // -------
    // params
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        api: { state: 'state', },
    } );
	const { HTMLState } = classes.call( this, params );
    // -------
    // expose?
    if ( params.expose !== false ) { expose.call( this, params ); }
    // -------
    // APIs
	return { HTMLState };
}

/**
 * @Exports
 * 
 * The internal Namespace object
 * within elements and the document object.
 */
function classes( params ) {
	const window = this;
    // --------------------
	class HTMLState extends Observable {
		expose() { return this; }
		static node( context ) {
			if ( !_( context ).has( 'state' ) ) {
				const state = new this;
                Object.defineProperty( state, 'context', { value: context } );
				_( context ).set( 'state', state );
			}
			return _( context ).get( 'state' );
		}
	}
    // --------------------
	window.wq.HTMLState = HTMLState;
	return { HTMLState };
}

/**
 * Exposes Namespaced HTML with native APIs.
 *
 * @param Object params
 *
 * @return Void
 */
function expose( params ) {
	const window = this, { HTMLState } = window.wq;
    // Assertions
    if ( params.api.state in window.document ) { throw new Error( `document already has a "${ params.api.state }" property!` ); }
    if ( params.api.state in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ params.api.state }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.api.state, { get: function() {
        return HTMLState.node( window.document ).expose();
    } });
    Object.defineProperty( window.Element.prototype, params.api.state, { get: function() {
        return HTMLState.node( this ).expose();
    } } );
}
