
/**
 * @imports
 */
import _ContextRequestEvent from './_ContextRequestEvent.js';
import { _ } from '../util.js';

export default class HTMLContextManager {

    /**
     * @instance
     */
    static instance( host ) {
        return _( host ).get( 'contextsmanager::instance' ) || new this( host );;
    }

    /**
     * @constructor
     */
    constructor( host ) {
        _( host ).get( `contextsmanager::instance` )?.dispose();
        _( host ).set( `contextsmanager::instance`, this );
        const priv = { host, contexts: new Set };
        Object.defineProperty( this, '#', { get: () => priv } );
        const ContextRequestEvent = _ContextRequestEvent.call( host.ownerDocument?.defaultView || host.defaultView );
        Object.defineProperty( this, 'ContextRequestEvent', { get: () => ContextRequestEvent } );
        this[ Symbol.iterator ] = function*() {
            const it = priv.contexts[ Symbol.iterator ]();
            yield it.next().value;
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
    find( callback ) {
        return [ ...this[ '#' ].contexts ].find( callback );
    }

    /**
     * @attach()
     */
    attach( context ) {
        this[ '#' ].contexts.add( context );
        context.initialize( this[ '#' ].host );
    }

    /**
     * @detach()
     */
    detach( context ) {
        context.dispose( this[ '#' ].host );
        this[ '#' ].contexts.delete( context );
    }

    /**
     * @ask()
     */
    ask( request, callback, params = {} ) {
        return this[ '#' ].host.dispatchEvent(
            new this.ContextRequestEvent( request, callback, { bubbles: true, ...params } )
        );
    }

    /**
     * @dispose()
     */
    dispose() {}

}