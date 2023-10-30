
/**
 * @imports
 */
import { HTMLContext } from '../context-api/index.js';
import _HTMLBindingsProvider from '../bindings-api/_HTMLBindingsProvider.js';
import Bracelet from './Bracelet.js';
import { _ } from '../util.js';

export default class HTMLBracelets extends Set {
 
    /**
     * @instance
     */
    static instance( host ) {
        return _( host ).get( 'bracelets::instance' ) || new this( host );
    }

    /**
     * @constructor
     */
    constructor( host ) {
        super();
        _( host ).get( `bracelets::instance` )?.dispose();
        _( host ).set( `bracelets::instance`, this );
        const priv = { host, bindings: Object.create( null ) };
        Object.defineProperty( this, '#', { get: () => priv } );
    }

    add( bracelet ) {
        if ( !( bracelet instanceof Bracelet ) ) throw new Error( `Argument must be instance of Bracelet.` );
        const returnValue = super.add( bracelet );
        const bindings = this[ '#' ].bindings;
        bracelet.refs.forEach( ref => {
            const $ref = ref.join( '.' );
            if ( !( $ref in bindings ) ) {
                bindings[ $ref ] = { subs: new Set, controller: new AbortController };
               const request = _HTMLBindingsProvider.createRequest( { detail: ref, live: true, signal: bindings[ $ref ].signal } );
                HTMLContext.instance( this[ '#' ].host ).request( request, value => {
                    bindings[ $ref ].value = value;
                    bindings[ $ref ].subs.forEach( bracelet => bracelet.render( bindings ) );
                } );
            }
            bindings[ $ref ].subs.add( bracelet );
        } );
        bracelet.render( bindings );
        return returnValue;
    }

    delete( bracelet ) {
        if ( !( bracelet instanceof Bracelet ) ) throw new Error( `Argument must be instance of Bracelet.` );
        const returnValue = super.delete( bracelet );
        const bindings = this[ '#' ].bindings;
        bracelet.refs.forEach( ref => {
            bindings[ ref ].subs.delete( bracelet );
            if ( !bindings[ ref ].subs.size ) {
                bindings[ ref ].controller.abort();
                delete bindings[ ref ];
            }
        } );
        return returnValue;
    }

    clear() {
        for ( const bracelet of this ) { this.delete( bracelet ); }
    }
}