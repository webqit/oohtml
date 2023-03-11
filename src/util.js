
/**
 * @imports
 */
import { _internals } from '@webqit/util/js/index.js';

export const _ = ( node, ...args ) => _internals( node, 'oohtml', ...args );

export  const _compare = ( a, b, depth = 1, objectSizing = false ) => {
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