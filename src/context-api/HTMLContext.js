
/**
 * @imports
 */
import ContextReturnValue from './ContextReturnValue.js';
import _ContextRequestEvent from './_ContextRequestEvent.js';
import { _ } from '../util.js';

export default class HTMLContext {

    /**
     * @instance
     */
    static instance( host ) {
        return _( host ).get( 'context::instance' ) || new this( host );;
    }

    /**
     * @constructor
     */
    constructor( host ) {
        _( host ).get( `context::instance` )?.dispose();
        _( host ).set( `context::instance`, this );
        const priv = { host, contexts: new Set };
        Object.defineProperty( this, '#', { get: () => priv } );
        const ContextRequestEvent = _ContextRequestEvent.call( host.ownerDocument?.defaultView || host.defaultView );
        Object.defineProperty( this, 'ContextRequestEvent', { get: () => ContextRequestEvent } );
        this[ Symbol.iterator ] = function*() {
            yield* priv.contexts;
        }
    }

    /**
     * @length()
     */
    get length() {
        this[ '#' ].contexts.size;
    }

    /**
     * @find()
     */
    findProvider( callback ) {
        return [ ...this[ '#' ].contexts ].find( callback );
    }

    /**
     * @attachProvider()
     */
    attachProvider( context ) {
        this[ '#' ].contexts.add( context );
        context.initialize( this[ '#' ].host );
    }

    /**
     * @detachProvider()
     */
    detachProvider( context ) {
        context.dispose( this[ '#' ].host );
        this[ '#' ].contexts.delete( context );
    }

    /**
     * @request()
     */
    request( request, callback = null, options = {} ) {
        if ( typeof callback === 'object' ) {
            options = callback;
            callback = null;
        }
        let contextReturnValue;
        if ( !callback ) {
            contextReturnValue = new ContextReturnValue( request, this[ '#' ].host );
            callback = contextReturnValue.callback.bind( contextReturnValue );
        }
        const returnValue = this[ '#' ].host.dispatchEvent( new this.ContextRequestEvent( request, callback, { bubbles: true, ...options } ) );
        return contextReturnValue ?? returnValue;
    }

    /**
     * @dispose()
     */
    dispose() {}

}