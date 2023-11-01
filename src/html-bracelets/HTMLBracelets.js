
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
        bracelet.refs.forEach( path => {
            const $path = path.join( '.' );
            if ( !( $path in bindings ) ) {
                bindings[ $path ] = { subs: new Set, controller: new AbortController };
               const request = _HTMLBindingsProvider.createRequest( { detail: path, live: true, signal: bindings[ $path ].signal } );
                HTMLContext.instance( this[ '#' ].host ).request( request, value => {
                    bindings[ $path ].value = value;
                    bindings[ $path ].subs.forEach( bracelet => bracelet.render( bindings ) );
                } );
            }
            bindings[ $path ].subs.add( bracelet );
        } );
        bracelet.render( bindings );
        return returnValue;
    }

    delete( bracelet ) {
        if ( !( bracelet instanceof Bracelet ) ) throw new Error( `Argument must be instance of Bracelet.` );
        const returnValue = super.delete( bracelet );
        const bindings = this[ '#' ].bindings;
        bracelet.refs.forEach( path => {
            const $path = path.join( '.' );
            bindings[ $path ].subs.delete( bracelet );
            if ( !bindings[ $path ].subs.size ) {
                bindings[ $path ].controller.abort();
                delete bindings[ $path ];
            }
        } );
        return returnValue;
    }

    clear() {
        for ( const bracelet of this ) { this.delete( bracelet ); }
    }
}