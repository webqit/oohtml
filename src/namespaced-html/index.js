
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import { _internals } from '@webqit/util/js/index.js';
import { _from as _arrFrom } from '@webqit/util/arr/index.js';
import { query as objectQuery } from '../object-ql.js';
import Observable from '../Observable.js';

/**
 * ---------------------------
 * Namespaced HTML
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
		attr: { namespace: 'namespace',  id: 'id', },
        api: { namespace: 'namespace', },
		eagermode: true,
    } );
	params.idSelector = `[${ window.CSS.escape( params.attr.id ) }]`;
	params.namespaceSelector = `[${ window.CSS.escape( params.attr.namespace ) }]`;
	const { HTMLNamespaceCollection } = classes.call( this, params );
    // -------
    // realtime...
    realtime.call( this, params );
    // -------
    // expose?
    if ( params.expose !== false ) { expose.call( this, params ); }
    // -------
	// APIs
	return { HTMLNamespaceCollection };
}

/**
 * Performs realtime capture of elements and builds their relationships.
 *
 * @param Object params
 *
 * @return Void
 */
function realtime( params ) {
	const window = this, { dom, HTMLNamespaceCollection } = window.wq;
	dom.realtime().querySelectorAll( params.idSelector, ( entry, connectedState ) => {
		const identifier = entry.getAttribute( params.attr.id );
		let ownerRoot = ( entry.parentNode && entry.parentNode.closest( params.namespaceSelector ) ) || _( entry ).get( 'ownerNamespace' );
		if ( !ownerRoot ) { ownerRoot = window.document; }
		const namespace = HTMLNamespaceCollection.node( ownerRoot );
		if ( connectedState ) {
			if ( namespace.get( identifier ) !== entry ) {
				_( entry ).set( 'ownerNamespace', ownerRoot );
				namespace.set( identifier, entry );
			}
		} else if ( namespace.get( identifier ) === entry ) {
			_( entry ).delete( 'ownerNamespace' );
			namespace.delete( identifier );
		}
	}, { each: true } );
}

/**
 * Exposes Namespaced HTML with native APIs.
 *
 * @param Object params
 *
 * @return Void
 */
function expose( params ) {
	const window = this, { HTMLNamespaceCollection } = window.wq;
    // Assertions
    if ( params.api.namespace in window.document ) { throw new Error( `document already has a "${ params.api.namespace }" property!` ); }
    if ( params.api.namespace in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ params.api.namespace }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, params.api.namespace, { get: function() {
        return HTMLNamespaceCollection.node( window.document ).expose();
    } });
    Object.defineProperty( window.Element.prototype, params.api.namespace, { get: function() {
        return HTMLNamespaceCollection.node( this ).expose();
    } } );
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
	class HTMLNamespaceCollection extends Observable {
		static node( context ) {
			if ( !_( context ).has( 'namespace' ) ) {
				const namespace = new this;
                Object.defineProperty( namespace, 'context', { value: context } );
				namespace.observe( 'get', key => {
					if ( namespace.has( key ) ) return;
					const node = _arrFrom( context.querySelectorAll( `[${ window.CSS.escape( params.attr.id ) }="${ key }"]` ) ).filter( node => {
						const ownerRoot = node.parentNode.closest( params.namespaceSelector );
						if ( context === window.document ) {
							// Only IDs without a scope actually belong to the document scope
							return !ownerRoot;
						}
						return ownerRoot === context;
					} )[ 0 ];
					if ( node ) namespace.set( key, node );
				} );
				_( context ).set( 'namespace', namespace );
			}
			return _( context ).get( 'namespace' );
		}
        query( expr, returnLine, params = {}, traps = {} ) {
			const context = this.context;
            if ( !context || ( context !== window.document && !( context instanceof window.Element ) ) ) {
                throw new Error( `HTMLNamespaceCollection.query() expects an element or the document object.` );
            }
            return objectQuery( context, expr, returnLine, {
                // Gets a module object
                get: ( context, key ) => HTMLNamespaceCollection.node( context ).get( key ),
                // Gets all module keys
                keys: context => HTMLNamespaceCollection.node( context ).keyNames(),
                // Subscribes to changes
                subscribe: ( context, key, callback ) => HTMLNamespaceCollection.node( context ).observe( [ 'set', 'delete' ], key, callback ),
                ...traps,
            }, params );
        }
		set( key, value ) {
			if ( !( 'innerHTML' in value )/* rough way to check for elements */ ) throw new Error( `Value for namespace entry "${ key }" must be an Element.` );
			return super.set( key, value );
		}
		expose() { return this; }
	}
    // --------------------
	window.wq.HTMLNamespaceCollection = HTMLNamespaceCollection;
	return { HTMLNamespaceCollection };
}
