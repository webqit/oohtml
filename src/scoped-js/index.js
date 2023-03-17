
/**
 * @imports
 */
import { resolveParams } from '@webqit/subscript/src/params.js';
import SubscriptFunction from '@webqit/subscript/src/SubscriptFunctionLite.js';
import Observer from '@webqit/observer';
import Compiler from './Compiler.js';
import wqDom from '@webqit/dom';

/**
 * @init
 * 
 * @param Object $params
 */
export default function init( $params = {} ) {
	const window = this, dom = wqDom.call( window );
    if ( !window.wq ) { window.wq = {}; }
    if ( !window.wq.oohtml ) { window.wq.oohtml = {}; }
    window.wq.oohtml.Script = { compileCache: [ new Map, new Map, ] };
    window.wq.SubscriptFunction = $params.SubscriptFunction/* allow for injection, e.g. from test runner */ || SubscriptFunction;
    window.wq.Observer = Observer;
    // -------
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        script: { retention: 'retain', mimeType: '' },
        config: resolveParams( {
            parserParams: { allowReturnOutsideFunction: false, allowSuperOutsideMethod: false, ...( $params.parserParams || {} ) },
            compilerParams: { globalsNoObserve: [ 'alert' ], ...( $params.compilerParams || {} ) },
            runtimeParams: { apiVersion: 2, ...( $params.runtimeParams || {} ) },
        } ),
    } );
	params.scriptSelector = ( Array.isArray( params.script.mimeType ) ? params.script.mimeType : [ params.script.mimeType ] ).reduce( ( selector, mm ) => {
        const qualifier = mm ? `[type=${ window.CSS.escape( mm ) }]` : '';
        return selector.concat( `script${ qualifier }[scoped],script${ qualifier }[contract]` );
    }, [] ).join( ',' );
    // -------
    realtime.call( this, params );
}

export {
    SubscriptFunction,
    Observer,
}

// ------------------
// Script runner
export function execute( compiledScript, thisContext, script ) {
    if ( !compiledScript.function ) throw new Error( `Input script must already be compiled!` );
    // Execute...
    const returnValue = compiledScript.function.call( thisContext );
    if ( script.contract ) {
        // Rerending processes,,,
        Object.defineProperty( script, 'rerender', { value: ( ...args ) => _await( returnValue, ( [ , rerender ] ) => rerender( ...args ) ) } );
        _await( script.properties, properties => {
            const getPaths = ( base, record_s ) => ( Array.isArray( record_s ) ? record_s : [ record_s ] ).map( record => [ ...base, ...( record.path || [ record.key ] ) ] );
            properties.processes = properties.dependencies.map( path => {
                if ( path[ 0 ] === 'this' ) {
                    return Observer.deep( thisContext, path.slice( 1 ), Observer.observe, record_s => {
                        script.rerender( ...getPaths( [ 'this' ], record_s ) );
                    } );
                }
                return Observer.deep( globalThis, path, Observer.observe, record_s => {
                    script.rerender( ...getPaths( [], record_s ) );
                } );
            } );
        } );
    }
    const window = this, { dom } = window.wq;
    dom.realtime( window.document ).observe( thisContext, () => {
        if ( script.contract ) {
            // Rerending processes,,,
            _await( script.properties, properties => {
                properties.processes.forEach( process => process.abort() );
            } );
        }
        thisContext.dispatchEvent( new window.CustomEvent( 'remove' ) );
        thisContext.scripts.delete( script );
    }, { subtree: true, timing: 'sync', generation: 'exits' } );
    return script;
}

/**
 * Performs realtime capture of elements and builds their relationships.
 *
 * @param Object params
 *
 * @return Void
 */
function realtime( params ) {
	const window = this, { dom } = window.wq;
    const compiler = new Compiler( window, params, execute ), handled = () => {};
	dom.realtime( window.document ).observe( params.scriptSelector, record => {
        record.entrants.forEach( script => {
            if ( 'contract' in script ) return handled( script );
            Object.defineProperty( script, 'contract', { value: script.hasAttribute( 'contract' ) } ); 
            if ( 'scoped' in script ) return handled( script );
            Object.defineProperty( script, 'scoped', { value: script.hasAttribute( 'scoped' ) } ); 
            // ---
            const thisContext = script.scoped ? record.target : ( script.type === 'module' ? undefined : window );
            compiler.compile( script, thisContext );
        } );
	}, { subtree: true, timing: 'intercept', generation: 'entrants' } );
    // ---
}

const _await = ( value, callback ) => value instanceof Promise ? value.then( callback ) : callback( value );
