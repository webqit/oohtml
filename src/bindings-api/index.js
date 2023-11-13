
/**
 * @imports
 */
import Observer from '@webqit/observer';
import _HTMLBindingsProvider from './_HTMLBindingsProvider.js';
import { _, _init } from '../util.js';

export { Observer }

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'bindings-api', $config, {
        context: { attr: { bindingscontext: 'bindings' }, },
        api: { bind: 'bind', bindings: 'bindings', },
    } );
    config.CONTEXT_API = window.webqit.oohtml.configs.CONTEXT_API;
    config.context.attr.contextname = config.CONTEXT_API.attr.contextname; // Inherit this
    window.webqit.HTMLBindingsProvider = class extends _HTMLBindingsProvider {
        static get config() { return config; }
    };
    window.webqit.Observer = Observer;
    exposeAPIs.call( window, config );
}

/**
 * @Exports
 * 
 * The internal bindings object
 * within elements and the document object.
 */
function getBindingsObject( config, node ) {
    const window = this;
	if ( !_( node ).has( 'bindings' ) ) {
		const bindingsObj = Object.create( null );
		_( node ).set( 'bindings', bindingsObj );
        Observer.observe( bindingsObj, mutations => {
            for ( const mutation of mutations ) {
                if ( mutation.type === 'delete' ) {
                    detachBindingsContext.call( this, node, mutation.key );
                } else { attachBindingsContext.call( this, node, mutation.key ); }
            }
            const props = Object.keys( bindingsObj );
            const targetNode = node === window.document ? window.document.documentElement : node;
            if ( props.length ) {
                targetNode.setAttribute( config.context.attr.bindingscontext, props.join( ' ') );
            } else {
                targetNode.toggleAttribute( config.context.attr.bindingscontext, false );
            }
        } );
	}
	return _( node ).get( 'bindings' );
}

function attachBindingsContext( host, key ) {
    const window = this, { HTMLBindingsProvider } = window.webqit;
    const contextId = HTMLBindingsProvider.createId( host, { detail: key } );
    HTMLBindingsProvider.attachTo( host, contextId );
}

function detachBindingsContext( host, key ) {
    const window = this, { HTMLBindingsProvider } = window.webqit;
    const contextId = HTMLBindingsProvider.createId( host, { detail: key } );
    HTMLBindingsProvider.detachFrom( host, contextId );
}

/**
 * Exposes Bindings with native APIs.
 *
 * @param Object            config
 * @param document|Element  target
 * @param Object            bindings
 * @param Object            params
 *
 * @return Void
 */
function applyBindings( config, target, bindings, { merge, diff, namespace } = {} ) {
    const bindingsObj = getBindingsObject.call( this, config, target );
    const $params = { diff, namespace };
    const exitingKeys = merge ? [] : Observer.ownKeys( bindingsObj, $params ).filter( key => !( key in bindings ) );
    return Observer.batch( bindingsObj, () => {
        if ( exitingKeys.length ) { Observer.deleteProperties( bindingsObj, exitingKeys, $params ); }
        return Observer.set( bindingsObj, bindings, $params );
    }, $params );
}

/**
 * Exposes Bindings with native APIs.
 *
 * @param Object config
 *
 * @return Void
 */
function exposeAPIs( config ) {
	const window = this;
    // Assertions
    if ( config.api.bind in window.document ) { throw new Error( `document already has a "${ config.api.bind }" property!` ); }
    if ( config.api.bindings in window.document ) { throw new Error( `document already has a "${ config.api.bindings }" property!` ); }
    if ( config.api.bind in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.bind }" property!` ); }
    if ( config.api.bindings in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.bindings }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.api.bind, { value: function( bindings, config = {} ) {
        return applyBindings.call( window, config, window.document, bindings );
    } });
    Object.defineProperty( window.document, config.api.bindings, { get: function() {
        return Observer.proxy( getBindingsObject.call( window, config, window.document ) );
    } });
    Object.defineProperty( window.Element.prototype, config.api.bind, { value: function( bindings, config = {} ) {
        return applyBindings.call( window, config, this, bindings );
    } });
    Object.defineProperty( window.Element.prototype, config.api.bindings, { get: function() {
        return Observer.proxy( getBindingsObject.call( window, config, this ) );
    } } );
}
