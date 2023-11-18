
/**
 * @imports
 */
import DOMBindingsContext from './DOMBindingsContext.js';
import { _, _init } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'bindings-api', $config, {
        context: { attr: { bindingsreflection: 'bindings' }, },
        api: { bind: 'bind', bindings: 'bindings', },
    } );
    window.webqit.DOMBindingsContext = DOMBindingsContext;
    exposeAPIs.call( window, config );
}

/**
 * @Exports
 * 
 * The internal bindings object
 * within elements and the document object.
 */
function getBindings( config, node ) {
    const window = this, { webqit: { Observer, oohtml: { configs: { CONTEXT_API: ctxConfig } } } } = window;
	if ( !_( node ).has( 'bindings' ) ) {
		const bindingsObj = Object.create( null );
		_( node ).set( 'bindings', bindingsObj );
        Observer.observe( bindingsObj, mutations => {
            // Reflection
            const props = Object.keys( bindingsObj );
            const targetNode = node === window.document ? window.document.documentElement : node;
            const bindingsReflection = config.context.attr.bindingsreflection;
            if ( props.length && bindingsReflection ) {
                targetNode.setAttribute( config.context.attr.bindingsreflection, props.join( ' ') );
            } else if ( bindingsReflection ) {
                targetNode.toggleAttribute( config.context.attr.bindingsreflection, false );
            }
            // Re: DOMBindingsContext
            const contextsApi = node[ ctxConfig.api.contexts ];
            for ( const mutation of mutations ) {
                if ( mutation.type === 'delete' ) {
                    const ctx = contextsApi.find( DOMBindingsContext.kind, mutation.key );
                    if ( ctx ) contextsApi.detach( ctx );
                } else if ( !contextsApi.find( DOMBindingsContext.kind, mutation.key ) ) {
                    contextsApi.attach( new DOMBindingsContext( mutation.key ) );
                }
            }
        } );
	}
	return _( node ).get( 'bindings' );
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
    const window = this, { webqit: { Observer } } = window;
    const bindingsObj = getBindings.call( this, config, target );
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
	const window = this, { webqit: { Observer } } = window;
    // Assertions
    if ( config.api.bind in window.document ) { throw new Error( `document already has a "${ config.api.bind }" property!` ); }
    if ( config.api.bindings in window.document ) { throw new Error( `document already has a "${ config.api.bindings }" property!` ); }
    if ( config.api.bind in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.bind }" property!` ); }
    if ( config.api.bindings in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.bindings }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.api.bind, { value: function( bindings, options = {} ) {
        return applyBindings.call( window, config, window.document, bindings, options );
    } });
    Object.defineProperty( window.document, config.api.bindings, { get: function() {
        return Observer.proxy( getBindings.call( window, config, window.document ) );
    } });
    Object.defineProperty( window.Element.prototype, config.api.bind, { value: function( bindings, options = {} ) {
        return applyBindings.call( window, config, this, bindings, options );
    } });
    Object.defineProperty( window.Element.prototype, config.api.bindings, { get: function() {
        return Observer.proxy( getBindings.call( window, config, this ) );
    } } );
}
