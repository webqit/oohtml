
/**
 * @imports
 */
import { _, _init } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'namespaced-html', $config, {
		id: { attr: 'id' },
		namespace: { attr: 'namespace',  api: 'namespace', },
		target: { attr: ':target', event: ':target', scrolling: true },
		staticsensitivity: true,
		eagermode: true,
    } );
	config.idSelector = `[${ window.CSS.escape( config.id.attr ) }]`;
	config.namespaceSelector = `[${ window.CSS.escape( config.namespace.attr ) }]`;
    exposeAPIs.call( window, config );
    realtime.call( window, config );
}

/**
 * Returns the "namespace" object associated with the given node.
 *
 * @param Element node
 *
 * @return Object
 */
function getNamespaceObject( node, config ) {
	const window = this, { webqit: { Observer } } = window;
	if ( !_( node ).has( 'namespace' ) ) {
		const namespaceObj = Object.create( null );
		Observer.intercept( namespaceObj, 'get', ( event, receiver, next ) => {
			if ( Observer.has( namespaceObj, event.key ) || !config.eagermode ) return next();
			const selector = `[${ window.CSS.escape( config.id.attr ) }="${ event.key }"]`;
			const resultNode = Array.from( node.querySelectorAll( selector ) ).filter( idNode => {
				const ownerRoot = idNode.parentNode.closest( config.namespaceSelector );
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
 * Exposes Namespaced HTML with native APIs.
 *
 * @param Object config
 *
 * @return Void
 */
function exposeAPIs( config ) {
    const window = this, { webqit: { Observer } } = window;
    // Assertions
    if ( config.namespace.api in window.document ) { throw new Error( `document already has a "${ config.namespace.api }" property!` ); }
    if ( config.namespace.api in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.namespace.api }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.namespace.api, { get: function() {
        return Observer.proxy( getNamespaceObject.call( window, window.document, config ) );
    } });
    Object.defineProperty( window.Element.prototype, config.namespace.api, { get: function() {
        return Observer.proxy( getNamespaceObject.call( window, this, config ) );
    } } );
}

/**
 * Performs realtime capture of elements and builds their relationships.
 *
 * @param Object config
 *
 * @return Void
 */
function realtime( config ) {
	const window = this, { webqit: { Observer, realdom } } = window;
	// ----------------
	const handle = ( target, entry, incoming ) => {
		const identifier = entry.getAttribute( config.id.attr );
		const ownerRoot = target.closest( config.namespaceSelector ) || _( entry ).get( 'ownerNamespace' ) || window.document;
		const namespaceObj = getNamespaceObject.call( window, ownerRoot, config );
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
	realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.idSelector, record => {
        record.entrants.forEach( entry => handle( record.target, entry, true ) );
        record.exits.forEach( entry => handle( record.target, entry, false ) );
	}, { live: true, timing: 'sync', staticSensitivity: config.staticsensitivity } );
	// ----------------
	if ( config.staticsensitivity ) {
		realdom.realtime( window.document, 'attr' ).observe( config.namespace.attr, record => {
			const ownerRoot = record.target.parentNode?.closest( config.namespaceSelector ) || _( record.target ).get( 'ownerNamespace' ) || window.document;
			const ownerRootNamespaceObj = getNamespaceObject.call( window, ownerRoot, config );
			const namespaceObj = getNamespaceObject.call( window, record.target, config );
			if ( record.target.matches( config.namespaceSelector ) ) {
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
	let prevTarget;
	const activateTarget = () => {
		const path = window.location.hash?.substring( 1 ).split( '/' ).map( s => s.trim() ).filter( s => s ) || [];
		const currTarget = path.reduce( ( prev, segment ) => prev && prev[ config.namespace.api ][ segment ], window.document );
		if ( prevTarget && config.target.attr ) { prevTarget.toggleAttribute( config.target.attr, false ); }
		if ( currTarget && currTarget !== window.document ) {
			if ( config.target.attr ) { currTarget.toggleAttribute( config.target.attr, true ); }
			if ( config.target.event ) { currTarget.dispatchEvent( new window.CustomEvent( config.target.event ) ); }
			if ( config.target.scrolling && path.length > 1 ) { currTarget.scrollIntoView(); }
			prevTarget = currTarget;
		}
	};
	window.addEventListener( 'hashchange', activateTarget );
	realdom.ready( activateTarget );
}
