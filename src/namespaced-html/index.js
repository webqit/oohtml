
/**
 * @imports
 */
import DOMNamingContext from './DOMNamingContext.js';
import { _, _init, _splitOuter, _fromHash, _toHash } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'namespaced-html', $config, {
		attr: { namespace: 'namespace', lid: 'id', },
		api: { namespace: 'namespace', },
		tokens: { lidrefPrefix: '~', lidrefSeparator: ':' },
		target: { className: ':target', eventName: ':target', scrolling: true },
    } );
	config.lidSelector = `[${ window.CSS.escape( config.attr.lid ) }]`;
	config.namespaceSelector = `[${ window.CSS.escape( config.attr.namespace ) }]`;
    window.webqit.DOMNamingContext = DOMNamingContext;
    exposeAPIs.call( window, config );
    realtime.call( window, config );
}

/**
 * @init
 * 
 * @param Object config
 * 
 * @return String
 */
function lidUtil( config ) {
	const { lidrefPrefix, lidrefSeparator, } = config.tokens;
	return {
		escape( str, mode = 1 ) { return [ ...str ].map( x => !/\w/.test( x ) ? ( mode === 2 ? `\\\\${ x }` : `\\${ x }` ) : x ).join( '' ); },
		lidrefPrefix( escapeMode = 0 ) { return escapeMode ? this.escape( lidrefPrefix, escapeMode ) : lidrefPrefix; },
		lidrefSeparator( escapeMode = 0 ) { return escapeMode ? this.escape( lidrefSeparator, escapeMode ) : lidrefSeparator; },
		isUuid( str, escapeMode = 0 ) { return str.startsWith( this.lidrefPrefix( escapeMode ) ) && str.includes( this.lidrefSeparator( escapeMode ) ); },
		isLidref( str, escapeMode = 0 ) { return str.startsWith( this.lidrefPrefix( escapeMode ) ) && !str.includes( this.lidrefSeparator( escapeMode ) ); },
		toUuid( hash, lid, escapeMode = 0 ) { return `${ this.lidrefPrefix( escapeMode ) }${ hash }${ this.lidrefSeparator( escapeMode ) }${ lid }`; },
		uuidToLid( str, escapeMode = 0 ) { return this.isUuid( str ) ? str.split( this.lidrefSeparator( escapeMode ) )[ 1 ] : str; },
		uuidToLidref( str, escapeMode = 0 ) { return this.isUuid( str ) ? `${ this.lidrefPrefix( escapeMode ) }${ str.split( this.lidrefSeparator( escapeMode ) )[ 1 ] }` : str; },
	}
}

/**
 * @rewriteSelector
 * 
 * @param String selectorText
 * @param String namespaceUUID
 * @param String scopeSelector
 * @param Bool escapeMode
 * 
 * @return String
 */
export function rewriteSelector( selectorText, namespaceUUID, scopeSelector = null, escapeMode = 0 ) {
	const window = this, { webqit: { oohtml: { configs: { NAMESPACED_HTML: config } } } } = window;
	const $lidUtil = lidUtil( config );
	// Match :scope and relative ID selector
	const regex = new RegExp( `${ scopeSelector ? `:scope|` : '' }#(${ $lidUtil.lidrefPrefix( escapeMode + 1 ) })?([\\w]+${ $lidUtil.lidrefSeparator( escapeMode + 1 ) })?((?:[\\w-]|\\\\.)+)`, 'g' );
	// Parse potentially combined selectors individually and categorise into categories per whether they have :scope or not
	const [ cat1, cat2 ] = _splitOuter( selectorText, ',' ).reduce( ( [ cat1, cat2 ], selector ) => {
		// The deal: match and replace
		let quotesMatch, hadScopeSelector;
		selector = selector.replace( regex, ( match, lidrefPrefixMatch, lidrefSeparatorMatch, id, index ) => {
			if ( !quotesMatch ) { // Lazy: stuff
				// Match strings between quotes (single or double) and use that qualify matches above
				// The string: String.raw`She said, "Hello, John. I\"m your friend." or "you're he're" 'f\'"j\'"f'jfjf`;
				// Should yield: `"Hello, John. I\\"m your friend."`, `"you're he're"`, `'f\\'"j\\'"f'`
				quotesMatch = [ ...selector.matchAll( /(["'])(?:(?=(\\?))\2.)*?\1/g ) ];
			}
			if ( quotesMatch[ 0 ] )
			// Qualify match
			if ( quotesMatch.some( q => index > q.index && index + match.length < q.index + q[ 0 ].length ) ) return match;
			// Replace :scope
			if ( match === ':scope' ) {
				hadScopeSelector = true;
				return scopeSelector;
			}
			const isLidref = lidrefPrefixMatch && !lidrefSeparatorMatch;
			const isUuid = lidrefPrefixMatch && lidrefSeparatorMatch;			
			if ( isUuid ) {
				return `#${ $lidUtil.escape( match.replace( '#', '' ), 1 ) }`;
			}
			// Rewrite relative ID selector
			let lowerBoundFactor = false;
			if ( isLidref ) {
				if ( config.attr.lid === 'id' && namespaceUUID ) {
					return `#${ $lidUtil.toUuid( namespaceUUID, id, 1 ) }`;
				}
				// Fallback to attr-based
				lowerBoundFactor = true;
			}
			// Rewrite absolute ID selector
			let rewrite;
			if ( config.attr.lid === 'id' ) {
				rewrite = `[id^="${ $lidUtil.lidrefPrefix( escapeMode ) }"][id$="${ $lidUtil.lidrefSeparator( escapeMode ) }${ id }"]`;
			} else {
				rewrite = `:is(#${ id },[${ window.CSS.escape( config.attr.lid ) }="${ id }"])`;
			}
			return scopeSelector && lowerBoundFactor ? `:is(${ rewrite }):not(${ scopeSelector } [${ config.attr.namespace }] *)` : rewrite;
		} );
		// Category 2 has :scope and category 1 does not
		return hadScopeSelector ? [ cat1, cat2.concat( selector ) ] : [ cat1.concat( selector ), cat2 ];
	}, [ [], [] ] );
	// Do the upgrade
	let newSelectorText;
	if ( scopeSelector && cat1.length ) {
		newSelectorText = [ cat1.length > 1 ? `${ scopeSelector } :is(${ cat1.join( ', ' ) })` : `${ scopeSelector } ${ cat1[ 0 ] }`, cat2.join( ', ' ) ].filter( x => x ).join( ', ' );
	} else {
		newSelectorText = [ ...cat1, ...cat2 ].join( ', ' );
	}
	return newSelectorText;
}

/**
 * @param Element node
 *
 * @return Object
 */
export function getOwnNamespaceObject( node ) {
	if ( !_( node ).has( 'namespace' ) ) {
		const namespaceObj = Object.create( null );
		_( node ).set( 'namespace', namespaceObj );
	}
	return _( node ).get( 'namespace' );
}

/**
 * @param Element node
 * @param Bool forID
 *
 * @return Object
 */
export function getOwnerNamespaceObject( node, forID = false ) {
	const window = this, { webqit: { oohtml: { configs: { NAMESPACED_HTML: config } } } } = window;
	return getOwnNamespaceObject( node instanceof window.Document ? node : ( ( forID ? node.parentNode : node )?.closest( `[${ config.attr.namespace }]` ) || node.ownerDocument ) );
}

/**
 * @param Object namespaceObj
 *
 * @return String
 */
export function getNamespaceUUID( namespaceObj ) {
    return _fromHash( namespaceObj ) || _toHash( namespaceObj );
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
    if ( config.api.namespace in window.document ) { throw new Error( `document already has a "${ config.api.namespace }" property!` ); }
    if ( config.api.namespace in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.namespace }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.api.namespace, { get: function() {
        return Observer.proxy( getOwnNamespaceObject.call( window, window.document ) );
    } });
    Object.defineProperty( window.Element.prototype, config.api.namespace, { get: function() {
        return Observer.proxy( getOwnNamespaceObject.call( window, this ) );
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
    const window = this, { webqit: { Observer, realdom, oohtml: { configs }, DOMNamingContext } } = window;
	
	// ------------
	// APIS
    // ------------
	// See https://wicg.github.io/aom/aria-reflection-explainer.html & https://github.com/whatwg/html/issues/3515 for the ARIA refelction properties idea
	// See https://www.w3.org/TR/wai-aria-1.1/#attrs_relationships for the relational ARIA attributes
	const idRefsAttrs = [ 'aria-owns', 'aria-controls', 'aria-labelledby', 'aria-describedby', 'aria-flowto', ];
	const idRefAttrs = [ 'for', 'list', 'form', 'aria-activedescendant', 'aria-details', 'aria-errormessage', ];
	const attrList = [ config.attr.lid, ...idRefsAttrs, ...idRefAttrs ];
	const relMap = { id: 'id'/* just in case it's in attrList */, for: 'htmlFor', 'aria-owns': 'ariaOwns', 'aria-controls': 'ariaControls', 'aria-labelledby': 'ariaLabelledBy', 'aria-describedby': 'ariaDescribedBy', 'aria-flowto': 'ariaFlowto', 'aria-activedescendant': 'ariaActiveDescendant', 'aria-details': 'ariaDetails', 'aria-errormessage': 'ariaErrorMessage' };
	const $lidUtil = lidUtil( config );

	// Intercept getAttribute()
	const getAttributeDescr = Object.getOwnPropertyDescriptor( window.Element.prototype, 'getAttribute' );
	Object.defineProperty( window.Element.prototype, 'getAttribute', { ...getAttributeDescr, value( attrName ) {
		const value = getAttributeDescr.value.call( this, attrName );
		return value && !_( this, 'lock' ).get( attrName ) && attrList.includes( attrName ) ? ( attrName === 'id' ? $lidUtil.uuidToLid : $lidUtil.uuidToLidref ).call( $lidUtil, value ) : value;
	} } );
	// Intercept getElementById()
	const getElementByIdDescr = Object.getOwnPropertyDescriptor( window.Document.prototype, 'getElementById' );
	Object.defineProperty( window.Document.prototype, 'getElementById', { ...getElementByIdDescr, value( id ) {
		return this.querySelector( `#${ id }`/* Will be rewritten at querySelector() */ );
	} } );
	// Intercept querySelector() and querySelectorAll()
	for ( const queryApi of [ 'querySelector', 'querySelectorAll' ] ) {
		for ( nodeApi of [ window.Document, window.Element ] ) {
			const querySelectorDescr = Object.getOwnPropertyDescriptor( nodeApi.prototype, queryApi );
			Object.defineProperty( nodeApi.prototype, queryApi, { ...querySelectorDescr, value( selector ) {
				return querySelectorDescr.value.call( this, rewriteSelector.call( window, selector, getNamespaceUUID.call( window, this ) ) );
			} } );
		}
	}
	// These APIs should return LIDREFS minus the hash part
	for ( const attrName of attrList ) {
		if ( !( attrName in relMap ) ) continue;
		const domApis = attrName === 'for' ? [ window.HTMLLabelElement, window.HTMLOutputElement ] : [ window.Element ];
		for ( const domApi of domApis ) {
			const propertyDescr = Object.getOwnPropertyDescriptor( domApi.prototype, relMap[ attrName ] );
			if ( !propertyDescr ) continue;
			Object.defineProperty( domApi.prototype, relMap[ attrName ], { ...propertyDescr, get() {
				return ( attrName === 'id' ? $lidUtil.uuidToLid : $lidUtil.uuidToLidref ).call( $lidUtil, propertyDescr.get.call( this, attrName ) || '' );
			} } );
		}
	}
	// Hide implementation details on the Attr node too.
	const propertyDescr = Object.getOwnPropertyDescriptor( window.Attr.prototype, 'value' );
	Object.defineProperty( window.Attr.prototype, 'value', { ...propertyDescr, get() {
		const value = propertyDescr.get.call( this );
		return value && attrList.includes( this.name ) ? ( this.name === 'id' ? $lidUtil.uuidToLid : $lidUtil.uuidToLidref ).call( $lidUtil, value ) : value;
	} } );
	if ( config.attr.lid !== 'id' ) {
		// Reflect the custom [config.attr.lid] attribute
		Object.defineProperty( window.Element.prototype, config.attr.lid, { configurable: true, enumerable: true, get() {
			return this.getAttribute( config.attr.lid );
		}, set( value ) {
			return this.setAttribute( config.attr.lid, value );
		} } );
	}

	// ------------
    // LOCAL IDS & IDREFS
    // ------------
	const attrChange = ( entry, attrName, value, callback ) => {
		// Create or honour locking
		if ( _( entry, 'lock' ).get( attrName ) ) return;
		_( entry, 'lock' ).set( attrName, true );
		if ( typeof value === 'function' ) value = value();
		callback( value );
		_( entry, 'lock' ).delete( attrName );
	};
	const setupBinding = ( entry, attrName, value, newNamespaceObj = null ) => {
		attrChange( entry, attrName, value, value => {
			const isLidAttr = attrName === config.attr.lid;
			const namespaceObj = newNamespaceObj || getOwnerNamespaceObject( entry, isLidAttr );
			const namespaceUUID = getNamespaceUUID( namespaceObj );
			if ( isLidAttr ) {
				const lid = $lidUtil.uuidToLid( value );
				if ( Observer.get( namespaceObj, lid ) !== entry ) {
					entry.setAttribute( 'id', $lidUtil.toUuid( namespaceUUID, lid ) );
					Observer.set( namespaceObj, lid, entry );
				}
			} else {
				const newAttrValue = value.split( ' ' ).map( lid => ( lid = lid.trim() ) && !$lidUtil.isLidref( lid ) ? lid : $lidUtil.toUuid( namespaceUUID, lid.replace( $lidUtil.lidrefPrefix(), '' ) ) ).join( ' ' );
				entry.setAttribute( attrName, newAttrValue );
				_( namespaceObj ).set( 'idrefs', _( namespaceObj ).get( 'idrefs' ) || new Set );
				_( namespaceObj ).get( 'idrefs' ).add( entry );
			}
		} );
	};
	const cleanupBinding = ( entry, attrName, oldValue, prevNamespaceObj = null ) => {
		attrChange( entry, attrName, oldValue, oldValue => {
			const isLidAttr = attrName === config.attr.lid;
			const namespaceObj = prevNamespaceObj || getOwnerNamespaceObject( entry, isLidAttr );
			if ( isLidAttr ) {
				const lid = $lidUtil.uuidToLid( oldValue );
				if ( Observer.get( namespaceObj, lid ) === entry ) {
					Observer.deleteProperty( namespaceObj, lid );
				}
			} else {
				const newAttrValue = oldValue.split( ' ' ).map( lid => ( lid = lid.trim() ) && $lidUtil.uuidToLidref( lid ) ).join( ' ' );
				entry.setAttribute( attrName, newAttrValue );
				_( namespaceObj ).get( 'idrefs' ).delete( entry );
			}
		} );
	};

    // ------------
    // NAMESPACE
    // ------------
	window.document[ configs.CONTEXT_API.api.contexts ].attach( new DOMNamingContext );
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.namespaceSelector, record => {
		const reAssociate = ( entry, attrName, oldNamespaceObj, newNamespaceObj ) => {
			if ( !entry.hasAttribute( attrName ) ) return;
			const attrValue = () => entry.getAttribute( attrName );
			cleanupBinding( entry, attrName, attrValue, oldNamespaceObj );
			if ( entry.isConnected ) { setupBinding( entry, attrName, attrValue, newNamespaceObj ); }
		};
        record.exits.forEach( entry => {
			const namespaceObj = getOwnNamespaceObject( entry );
			// Detach ID and IDREF associations
			for ( const node of new Set( [ ...Object.values( namespaceObj ), ..._( namespaceObj ).get( 'idrefs' ) ] ) ) {
				for ( const attrName of attrList ) { reAssociate( node, attrName, namespaceObj ); }
			}
			// Detach ID associations
			const contextsApi = entry[ configs.CONTEXT_API.api.contexts ];
			const ctx = contextsApi.find( DOMNamingContext.kind );
			// Detach namespace instance
			if ( ctx ) { contextsApi.detach( ctx ); }
        } );
        record.entrants.forEach( entry => {
			// Claim ID and IDREF associations
			let newSuperNamespaceObj;
			const superNamespaceObj = getOwnerNamespaceObject( entry, true );
			for ( const node of new Set( [ ...Object.values( superNamespaceObj ), ...( _( superNamespaceObj ).get( 'idrefs' ) || [] ) ] ) ) {
				if ( ( newSuperNamespaceObj = getOwnerNamespaceObject( node, true ) ) === superNamespaceObj ) continue;
				for ( const attrName of attrList ) { reAssociate( node, attrName, superNamespaceObj, newSuperNamespaceObj ); }
			}
			// Attach namespace instance
			const contextsApi = entry[ configs.CONTEXT_API.api.contexts ];
			if ( !contextsApi.find( DOMNamingContext.kind ) ) { contextsApi.attach( new DOMNamingContext ); }
        } );
    }, { live: true, timing: 'sync', staticSensitivity: true } );

	// DOM realtime
	realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( `[${ attrList.map( attrName => window.CSS.escape( attrName ) ).join( '],[' ) }]`, record => {
		for ( const attrName of attrList ) {
			record.exits.forEach( entry => {
				if ( !entry.hasAttribute( attrName ) ) return;
				cleanupBinding( entry, attrName, () => entry.getAttribute( attrName ) );
			} );
			record.entrants.forEach( entry => {
				if ( !entry.hasAttribute( attrName ) ) return;
				setupBinding( entry, attrName, () => entry.getAttribute( attrName ) );
			} );
		}
	}, { live: true, timing: 'sync' } );
	// Attr realtime
	realdom.realtime( window.document, 'attr' ).observe( attrList, records => {
		for ( const record of records ) {
			if ( record.oldValue ) { cleanupBinding( record.target, record.name, record.oldValue ); }
			if ( record.value ) { setupBinding( record.target, record.name, record.value ); }
		}
	}, { subtree: true, timing: 'sync', newValue: true, oldValue: true } );

    // ------------
	// TARGETS
    // ------------
	let prevTarget;
	const activateTarget = () => {
		if ( !window.location.hash?.startsWith( `#${ $lidUtil.lidrefPrefix() }` ) ) return;
		const path = window.location.hash?.substring( `#${ $lidUtil.lidrefPrefix() }`.length ).split( '/' ).map( s => s.trim() ).filter( s => s ) || [];
		const currTarget = path.reduce( ( prev, segment ) => prev && prev[ config.api.namespace ][ segment ], window.document );
		if ( prevTarget && config.target.className ) { prevTarget.classList.toggle( config.target.className, false ); }
		if ( currTarget && currTarget !== window.document ) {
			if ( config.target.className ) { currTarget.classList.toggle( config.target.className, true ); }
			if ( config.target.eventName ) { currTarget.dispatchEvent( new window.CustomEvent( config.target.eventName ) ); }
			if ( config.target.scrolling && path.length > 1 ) { currTarget.scrollIntoView(); }
			prevTarget = currTarget;
		}
	};
	// "hash" realtime
	window.addEventListener( 'hashchange', activateTarget );
	realdom.ready( activateTarget );
	// ----------------
}
