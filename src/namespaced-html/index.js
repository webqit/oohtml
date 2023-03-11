
/**
 * @imports
 */
import Observer from '@webqit/observer';
import wqDom from '@webqit/dom';
import { _ } from '../util.js';

/**
 * @init
 * 
 * @param Object $params
 */
export default function init( $params = {} ) {
	const window = this, dom = wqDom.call( window );
    // -------
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
		attr: { namespace: 'namespace',  id: 'data-id', },
        api: { namespace: 'namespace', },
		staticsensitivity: true,
		eagermode: true,
    } );
	params.idSelector = `[${ window.CSS.escape( params.attr.id ) }]`;
	params.namespaceSelector = `[${ window.CSS.escape( params.attr.namespace ) }]`;
    // -------
    exposeNamespaceObjects.call( this, params );
    realtime.call( this, params );
}

export { Observer }

/**
 * Exposes Namespaced HTML with native APIs.
 *
 * @param Object params
 *
 * @return Void
 */
function exposeNamespaceObjects( params ) {
	const window = this;
    // Assertions
    if ( params.api.namespace in window.document ) { throw new Error( `document already has a "${ params.api.namespace }" property!` ); }
    if ( params.api.namespace in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ params.api.namespace }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.api.namespace, { get: function() {
        return Observer.proxy( getNamespaceObject.call( window, window.document, params ) );
    } });
    Object.defineProperty( window.Element.prototype, params.api.namespace, { get: function() {
        return Observer.proxy( getNamespaceObject.call( window, this, params ) );
    } } );
}

/**
 * Returns the "namespace" object associated with the given node.
 *
 * @param Element node
 *
 * @return Object
 */
function getNamespaceObject( node, params ) {
	const window = this;
	if ( !_( node ).has( 'namespace' ) ) {
		const namespaceObj = Object.create( null );
		Observer.intercept( namespaceObj, 'get', ( event, receiver, next ) => {
			if ( Observer.has( namespaceObj, event.key ) || !params.eagermode ) return next();
			const selector = `[${ window.CSS.escape( params.attr.id ) }="${ event.key }"]`;
			const resultNode = Array.from( node.querySelectorAll( selector ) ).filter( idNode => {
				const ownerRoot = idNode.parentNode.closest( params.namespaceSelector );
				if ( node === window.document ) {
					// Only IDs without a scope actually belong to the document scope
					return !ownerRoot;
				}
				return ownerRoot === node;
			} )[ 0 ];
			if ( resultNode ) Observer.set( namespaceObj, event.key, resultNode );
			return next();
		} );
		_( node ).set( 'namespace', namespaceObj );
	}
	return _( node ).get( 'namespace' );
}

/**
 * Performs realtime capture of elements and builds their relationships.
 *
 * @param Object params
 *
 * @return Void
 */
function realtime( params ) {
	const window = this, { dom } = window.wq;
	// ----------------
	const handle = ( target, entry, incoming ) => {
		const identifier = entry.getAttribute( params.attr.id );
		const ownerRoot = target.closest( params.namespaceSelector ) || _( entry ).get( 'ownerNamespace' ) || window.document;
		const namespaceObj = getNamespaceObject.call( window, ownerRoot, params );
		if ( incoming ) {
			if ( Observer.get( namespaceObj, identifier ) !== entry ) {
				_( entry ).set( 'ownerNamespace', ownerRoot );
				Observer.set( namespaceObj, identifier, entry );
			}
		} else if ( Observer.get( namespaceObj, identifier ) === entry ) {
			_( entry ).delete( 'ownerNamespace' );
			Observer.deleteProperty( namespaceObj, identifier );
		}
	};
	dom.realtime( window.document ).observe( params.idSelector, record => {
        record.entrants.forEach( entry => handle( record.target, entry, true ) );
        record.exits.forEach( entry => handle( record.target, entry, false ) );
	}, { subtree: true, timing: 'sync', staticSensitivity: params.staticsensitivity } );
	// ----------------
	if ( params.staticsensitivity ) {
		dom.realtime( window.document, 'attr' ).observe( params.namespaceSelector, record => {
			const ownerRoot = record.target.parentNode?.closest( params.namespaceSelector ) || _( record.target ).get( 'ownerNamespace' ) || window.document;
			const ownerRootNamespaceObj = getNamespaceObject.call( window, ownerRoot, params );
			const namespaceObj = getNamespaceObject.call( window, record.target, params );
			if ( record.target.matches( params.namespaceSelector ) ) {
				for ( const [ key, entry ] of Object.entries( ownerRootNamespaceObj ) ) {
					if ( !record.target.contains( entry.parentNode ) ) continue;
					Observer.deleteProperty( ownerRootNamespaceObj, key );
					Observer.set( namespaceObj, key, entry );
				}
			} else {
				for ( const [ key, entry ] of Object.entries( namespaceObj ) ) {
					Observer.deleteProperty( namespaceObj, key );
					Observer.set( ownerRootNamespaceObj, key, entry );
				}
			}
		}, { subtree: true, timing: 'sync' } );
	}
	// ----------------
}
