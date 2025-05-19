
/**
 * @imports
 */
import DOMBindingsContext from './DOMBindingsContext.js';
import { _wq, _init, _splitOuter } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'bindings-api', $config, {
        attr: { bindingsreflection: 'bindings' },
        api: { bind: 'bind', bindings: 'bindings', },
    } );
    window.webqit.DOMBindingsContext = DOMBindingsContext;
    exposeAPIs.call( window, config );
    realtime.call(window, config);
}

/**
 * @Defs
 * 
 * The internal bindings object
 * within elements and the document object.
 */
function getBindings( config, node ) {
    const window = this, { webqit: { Observer, oohtml: { configs: { CONTEXT_API: ctxConfig } } } } = window;
	if ( !_wq( node ).has( 'bindings' ) ) {
		const bindingsObj = Object.create( null );
		_wq( node ).set( 'bindings', bindingsObj );
        Observer.observe( bindingsObj, mutations => {
            if ( node instanceof window.Element ) {
                const bindingsParse = parseBindingsAttr( node.getAttribute( config.attr.bindingsreflection ) || '' );
                const bindingsParseBefore = new Map(bindingsParse);
                for ( const m of mutations ) {
                    if ( m.detail?.publish !== false ) {
                        if ( m.type === 'delete' ) bindingsParse.delete( m.key );
                        else bindingsParse.set( m.key, undefined );
                    }
                }
                if ( bindingsParse.size && bindingsParse.size !== bindingsParseBefore.size ) {
                    node.setAttribute( config.attr.bindingsreflection, `{ ${ [ ...bindingsParse.entries() ].map(([ key, value ]) => value === undefined ? key : `${ key }: ${ value }` ).join( ', ' ) } }` );
                } else if ( !bindingsParse.size ) node.toggleAttribute( config.attr.bindingsreflection, false );
            } else {
                const contextsApi = node[ ctxConfig.api.contexts ];
                for ( const m of mutations ) {
                    if ( m.type === 'delete' ) {
                        const ctx = contextsApi.find( DOMBindingsContext.kind, m.key );
                        if ( ctx ) contextsApi.detach( ctx );
                    } else if ( !contextsApi.find( DOMBindingsContext.kind, m.key ) ) {
                        contextsApi.attach( new DOMBindingsContext( m.key ) );
                    }
                }
            }
        } );
	}
	return _wq( node ).get( 'bindings' );
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
    // The Bindings APIs
    [ window.Document.prototype, window.Element.prototype, window.ShadowRoot.prototype ].forEach( prototype => {
        // No-conflict assertions
        const type = prototype === window.Document.prototype ? 'Document' : ( prototype === window.ShadowRoot.prototype ? 'ShadowRoot' : 'Element' );
        if ( config.api.bind in prototype ) { throw new Error( `The ${ type } prototype already has a "${ config.api.bind }" API!` ); }
        if ( config.api.bindings in prototype ) { throw new Error( `The ${ type } prototype already has a "${ config.api.bindings }" API!` ); }
        // Definitions
        Object.defineProperty( prototype, config.api.bind, { value: function( bindings, options = {} ) {
            return applyBindings.call( window, config, this, bindings, options );
        } });
        Object.defineProperty( prototype, config.api.bindings, { get: function() {
            return Observer.proxy( getBindings.call( window, config, this ) );
        } } );
    } );
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
function applyBindings( config, target, bindings, { merge, diff, publish, namespace } = {} ) {
    const window = this, { webqit: { Observer } } = window;
    const bindingsObj = getBindings.call( this, config, target );
    const $params = { diff, namespace, detail: { publish } };
    const exitingKeys = merge ? [] : Object.keys( bindingsObj ).filter( key => !( key in bindings ) );
    return Observer.batch( bindingsObj, () => {
        if ( exitingKeys.length ) { Observer.deleteProperties( bindingsObj, exitingKeys, $params ); }
        return Observer.set( bindingsObj, bindings, $params );
    }, $params );
}

/**
 * Performs realtime capture of elements and their attributes
 * and their module query results; then resolves the respective import elements.
 *
 * @param Object config
 *
 * @return Void
 */
function realtime(config) {
    const window = this, { webqit: { realdom, Observer, oohtml: { configs } } } = window;
    // ------------
    const attachBindingsContext = (host, key) => {
        const contextsApi = host[configs.CONTEXT_API.api.contexts];
        if ( !contextsApi.find( DOMBindingsContext.kind, key ) ) {
            contextsApi.attach( new DOMBindingsContext( key ) );
        }
    };
    const detachBindingsContext = (host, key) => {
        let ctx, contextsApi = host[configs.CONTEXT_API.api.contexts];
        while( ctx = contextsApi.find( DOMBindingsContext.kind, key ) ) contextsApi.detach(ctx);
    };
    // ------------
    realdom.realtime(window.document).query( `[${window.CSS.escape(config.attr.bindingsreflection)}]`, record => {
        record.exits.forEach( entry => detachBindingsContext( entry ) );
        record.entrants.forEach(entry => {
            const bindingsParse = parseBindingsAttr( entry.getAttribute( config.attr.bindingsreflection ) || '' );
            const newData = [ ...bindingsParse.entries() ].filter(([ k, v ]) => v !== undefined );
            if ( newData.length ) entry[ config.api.bind ]( Object.fromEntries( newData ), { merge: true, publish: false } );
            for ( const [ key ] of bindingsParse ) {
                attachBindingsContext( entry, key );
            }
        } );
    }, { id: 'bindings:dom', live: true, subtree: 'cross-roots', timing: 'sync', eventDetails: true });
	realdom.realtime( window.document, 'attr' ).observe( config.attr.bindingsreflection, record => {
        const bindingsObj = getBindings.call( window, config, record.target );
        const bindingsParse = parseBindingsAttr( record.value || '' );
        const oldBindings = parseBindingsAttr( record.oldValue || '' );
        for ( const key of new Set([ ...bindingsParse.keys(), ...oldBindings.keys() ]) ) {
            if ( !oldBindings.has( key ) ) {
                if ( bindingsParse.get( key ) !== undefined ) Observer.set( bindingsObj, key, bindingsParse.get( key ), { detail: { publish: false } } );
                attachBindingsContext( record.target, key );
            } else if ( !bindingsParse.has( key ) ) {
                if ( oldBindings.get( key ) !== undefined ) Observer.deleteProperty( bindingsObj, key, { detail: { publish: false } } );
                detachBindingsContext( record.target, key );
            } else if ( bindingsParse.get( key ) !== oldBindings.get( key ) ) {
                Observer.set( bindingsObj, key, bindingsParse.get( key ), { detail: { publish: false } } );
            }
        }
	}, { id: 'bindings:attr', subtree: 'cross-roots', timing: 'sync', newValue: true, oldValue: true } );
}

const parseBindingsAttr = str => {
    str = str.trim();
    return new Map(_splitOuter( str.slice(1, -1), ',' ).filter( s => s.trim() ).map( _str => {
        return _splitOuter( _str, ':' ).map( s => s.trim() );
    }));
};
