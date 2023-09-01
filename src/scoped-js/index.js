
/**
 * @imports
 */
import { _isTypeObject } from '@webqit/util/js/index.js';
import { resolveParams } from '@webqit/reflex-functions/src/params.js';
import ReflexFunction from '@webqit/reflex-functions/src/ReflexFunctionLite.js';
import Observer from '@webqit/observer';
import Compiler from './Compiler.js';
import { _init } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( { advanced = {}, ...$config } ) {
    const { config, window } = _init.call( this, 'scoped-js', $config, {
        script: { retention: 'retain', mimeType: '' },
        advanced: resolveParams( advanced, {
            parserParams: { allowReturnOutsideFunction: false, allowSuperOutsideMethod: false },
            compilerParams: { globalsNoObserve: [ 'alert' ] },
            runtimeParams: { apiVersion: 2 },
        } ),
    } );
	config.scriptSelector = ( Array.isArray( config.script.mimeType ) ? config.script.mimeType : [ config.script.mimeType ] ).reduce( ( selector, mm ) => {
        const qualifier = mm ? `[type=${ window.CSS.escape( mm ) }]` : '';
        return selector.concat( `script${ qualifier }[scoped],script${ qualifier }[reflex]` );
    }, [] ).join( ',' );
    window.webqit.oohtml.Script = { compileCache: [ new Map, new Map, ] };
    window.webqit.ReflexFunction = ReflexFunction;
    window.webqit.Observer = Observer;
    realtime.call( window, config );
}

export {
    ReflexFunction,
    Observer,
}

// ------------------
// Script runner
export function execute( compiledScript, thisContext, script ) {
    if ( !compiledScript.function ) throw new Error( `Input script must already be compiled!` );
    const _try = ( callback, isRerender = false ) => {
        return callback();
    };
    // Execute...
    const returnValue = compiledScript.function.call( thisContext );
    if ( script.reflex ) {
        // Rerending processes,,,
        Object.defineProperty( script, 'reflect', { value: ( ...args ) => _await( returnValue, ( [ , reflect ] ) => reflect( ...args ) ) } );
        _await( script.properties, properties => {
            const _env = { 'this': thisContext };
            const getPaths = ( base, record_s ) => ( Array.isArray( record_s ) ? record_s : [ record_s ] ).map( record => [ ...base, ...( record.path || [ record.key ] ) ] );
            properties.processes = properties.dependencies.map( path => {
                if ( _isTypeObject( _env[ path[ 0 ] ] ) ) {
                    if ( path.length === 1 ) return;
                    return Observer.reduce( _env[ path[ 0 ] ], path.slice( 1 ), Observer.observe, record_s => {
                        script.reflect( ...getPaths( [ path[ 0 ] ], record_s ) );
                    } );
                }
                return Observer.reduce( globalThis, path, Observer.observe, record_s => {
                    script.reflect( ...getPaths( [], record_s ) );
                } );
            } );
        } );
    }
    const window = this, { realdom } = window.webqit;
    if ( !( thisContext instanceof window.Node ) ) return script;
    realdom.realtime( window.document ).observe( thisContext, () => {
        if ( script.reflex ) {
            // Rerending processes,,,
            _await( script.properties, properties => {
                properties.processes.forEach( process => process?.abort() );
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
 * @param Object config
 *
 * @return Void
 */
function realtime( config ) {
	const window = this, { realdom } = window.webqit;
    if ( !window.HTMLScriptElement.supports ) { window.HTMLScriptElement.supports = () => false; }
    const potentialManualTypes = [ 'module' ].concat( config.script.mimeType || [] );
    const compiler = new Compiler( window, config, execute ), handled = () => {};
	realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.scriptSelector, record => {
        record.entrants.forEach( script => {
            if ( script.cloned ) return;
            if ( 'reflex' in script ) return handled( script );
            Object.defineProperty( script, 'reflex', { value: script.hasAttribute( 'reflex' ) } ); 
            if ( 'scoped' in script ) return handled( script );
            Object.defineProperty( script, 'scoped', { value: script.hasAttribute( 'scoped' ) } ); 
            if ( /*record.type === 'query' ||*/ ( potentialManualTypes.includes( script.type ) && !window.HTMLScriptElement.supports( script.type ) ) ) {
                Object.defineProperty( script, 'handling', { value: 'manual' } ); 
            }
            const thisContext = script.scoped ? script.parentNode || record.target : ( script.type === 'module' ? undefined : window );
            compiler.compile( script, thisContext );
        } );
	}, { live: true, timing: 'intercept', generation: 'entrants', eventDetails: true } );
    // ---
}

const _await = ( value, callback ) => value instanceof Promise ? value.then( callback ) : callback( value );
