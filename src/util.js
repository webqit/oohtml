
/**
 * @imports
 */
import webqitDom from '@webqit/dom';
import { _internals } from '@webqit/util/js/index.js';
import { _merge } from '@webqit/util/obj/index.js';

export const _ = ( ...args ) => _internals( 'oohtml', ...args );

export function _init( name, $config, $defaults ) {
    const window = this, dom = webqitDom.call( window );
    window.webqit || ( window.webqit = {} );
    window.webqit.oohtml || ( window.webqit.oohtml = {} );
    window.webqit.oohtml.configs || ( window.webqit.oohtml.configs = {} );
    const config = _merge( 2, $defaults, $config, dom.meta( name ).json() );
    window.webqit.oohtml.configs[ name.toUpperCase().replace( '-', '_' ) ] = config;
    return { config, dom, window };
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
};