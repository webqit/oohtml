
/**
 * @imports
 */
import _DOMContextRequestEvent from './_DOMContextRequestEvent.js';
import DOMContextResponse from './DOMContextResponse.js';
import DOMContext from './DOMContext.js';
import DuplicateContextError from './DuplicateContextError.js';
import { _wq } from '../util.js';

const waitListMappings = new Map;
export default class DOMContexts {

    /**
     * @instance
     */
    static instance( host ) {
        return _wq( host ).get( 'contexts::instance' ) || new this( host );;
    }

    /**
     * @constructor
     */
    constructor( host ) {
        _wq( host ).get( `contexts::instance` )?.dispose();
        _wq( host ).set( `contexts::instance`, this );
        const priv = { host, contexts: new Set };
        Object.defineProperty( this, '#', { get: () => priv } );
    }

    /**
     * @Symbol.iterator
     */
    [ Symbol.iterator ] () { return this[ '#' ].contexts[ Symbol.iterator ](); }

    /**
     * @length
     */
    get length() { return this[ '#' ].contexts.size; }

    /**
     * @find()
     */
    find( ...args ) {
        return [ ...this[ '#' ].contexts ].find( ctx => {
            if ( typeof args[ 0 ] === 'function' ) return args[ 0 ]( ctx );
            return ctx.constructor.kind === args[ 0 ] && ( !args[ 1 ] || ctx.detail === args[ 1 ] );
        } );
    }

    /**
     * @attach()
     */
    attach( ctx ) {
        if ( !( ctx instanceof DOMContext) ) throw new TypeError( `Context is not a valid DOMContext instance.` );
        if ( this.find( ctx.constructor.kind, ctx.detail ) ) {
            throw new DuplicateContextError( `Context of same kind "${ ctx.constructor.kind }"${ ctx.detail ? ` and detail "${ ctx.detail }"` : '' } already exists.` );
        }
        this[ '#' ].contexts.add( ctx );
        ctx.initialize( this[ '#' ].host );
    }

    /**
     * @detach()
     */
    detach( ctx ) {
        ctx.dispose( this[ '#' ].host );
        this[ '#' ].contexts.delete( ctx );
    }

    /**
     * @request()
     */
    request( ...args ) {
        return new DOMContextResponse( ( emitter, responseInstance ) => {
            if ( typeof args[ args.length - 1 ] !== 'function' ) {
                if ( !args[ args.length - 1 ] ) { args[ args.length - 1 ] = emitter; }
                else { args.push( emitter ); }
            }

            let options;
            if ( ( options = args.find( arg => typeof arg === 'object' && arg ) ) && options.live ) {
                if ( options.signal ) options.signal.addEventListener( 'abort', () => responseInstance.abort() );
                args[ args.indexOf( options ) ] = { ...options, signal: responseInstance.signal };
            }
            const event = new ( _DOMContextRequestEvent() )( ...args );
            this[ '#' ].host.dispatchEvent( event );
        } );
    }

}