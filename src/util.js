
/**
 * @imports
 */
import realdomInit from '@webqit/realdom';
import { _internals } from '@webqit/util/js/index.js';
import { _merge } from '@webqit/util/obj/index.js';
import { _toTitle } from '@webqit/util/str/index.js';

export const _ = ( ...args ) => _internals( 'oohtml', ...args );

export const env = {};

export function _init( name, $config, $defaults ) {
    const window = this, realdom = realdomInit.call( window );
    env.window = window;
    if ( !window.webqitConfig ) {
        window.webqitConfig = realdom.meta( 'webqit' ).json();
    }
    window.webqit || ( window.webqit = {} );
    window.webqit.oohtml || ( window.webqit.oohtml = {} );
    window.webqit.oohtml.configs || ( window.webqit.oohtml.configs = {} );
    // ---------------------
    const configKey = name.toUpperCase().replace( '-', '_' );
    if ( !window.webqit.oohtml.configs[ configKey ] ) {
        window.webqit.oohtml.configs[ configKey ] =  {};
        const config = window.webqit.oohtml.configs[ configKey ];
        _merge( 2, config, $defaults, $config, realdom.meta( name ).json() );
        if ( window.webqitConfig.prefix ) {
            Object.keys( config ).forEach( main => {
                Object.keys( config[ main ] ).forEach( key => {
                    if ( main === 'api' && typeof config[ main ][ key ] === 'string' ) {
                        config[ main ][ key ] = `${ window.webqitConfig.prefix }${ _toTitle( config[ main ][ key ] ) }`
                    } else if ( [ 'attr', 'elements' ].includes( main ) && config[ main ][ key ]?.startsWith( 'data-' ) === false ) {
                        config[ main ][ key ] = `${ window.webqitConfig.prefix }-${ config[ main ][ key ] }`
                    }
                } );
            } );
        }
    }
    // ---------------------
    return { config: window.webqit.oohtml.configs[ configKey ], realdom, window };
}

export function getInternalAttrInteraction( node, attrName ) {
	return _internals( node, 'internalAttrInteractions' ).get( attrName );
}
export function internalAttrInteraction( node, attrName, callback ) {
	const savedAttrLocking = _internals( node, 'internalAttrInteractions' ).get( attrName );
	_internals( node, 'internalAttrInteractions' ).set( attrName, true );
	const value = callback();
	_internals( node, 'internalAttrInteractions' ).set( attrName, savedAttrLocking );
	return value;
}

export function _compare( a, b, depth = 1, objectSizing = false ) {
    if ( depth && typeof a === 'object' && a && typeof b === 'object' && b && ( !objectSizing || Object.keys( a ).length === Object.keys( b ).length ) ) {
        for ( let key in a ) {
            if ( !_compare( a[ key ], b[ key ], depth - 1, objectSizing ) ) return false;
        }
        return true;
    }
    if ( Array.isArray( a ) && Array.isArray( b ) && a.length === b.length ) {
        return ( b = b.slice( 0 ).sort() ) && a.slice( 0 ).sort().every( ( valueA, i ) => valueA === b[ i ] );
    }
    return a === b;
}

export function _splitOuter( str, delim ) {
    return [ ...str ].reduce( ( [ quote, depth, splits ], x ) => {
        if ( !quote && depth === 0 && ( Array.isArray( delim ) ? delim : [ delim ] ).includes( x ) ) {
            return [ quote, depth, [ '' ].concat( splits ) ];
        }
        if ( !quote && [ '(', '[', '{' ].includes( x ) && !splits[ 0 ].endsWith( '\\' ) ) depth++;
        if ( !quote && [ ')', ']', '}' ].includes( x ) && !splits[ 0 ].endsWith( '\\' ) ) depth--;
        if ( [ '"', "'", '`' ].includes( x ) && !splits[ 0 ].endsWith( '\\' ) ) {
            quote = quote === x ? null : ( quote || x );
        }
        splits[ 0 ] += x;
        return [ quote, depth, splits ]
    }, [ null, 0, [ '' ] ] )[ 2 ].reverse();
}

// Unique ID generator
export const _uniqId = () => ( 0 | Math.random() * 9e6 ).toString( 36 );

// Hash of anything generator
const hashTable = new Map;
export function _toHash( val ) {
    let hash;
    if ( !( hash = hashTable.get( val ) ) ) {
        hash = _uniqId();
        hashTable.set( val, hash );
    }
    return hash;
}

// Value of any hash
export function _fromHash( hash ) {
    let val;
    hashTable.forEach( ( _hash, _val ) => {
        if ( _hash === hash ) val = _val;
    } );
    return val;
}