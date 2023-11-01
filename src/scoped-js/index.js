
/**
 * @imports
 */
import { resolveParams } from '@webqit/stateful-js/params';
import { StatefulAsyncFunction, StatefulAsyncScript, StatefulModule, State } from '@webqit/stateful-js/async';
import Observer from '@webqit/observer';
import Hash from './Hash.js';
import { _init } from '../util.js';

export {
    StatefulAsyncFunction,
    StatefulAsyncScript,
    StatefulModule,
    State,
    Observer,
}

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( { advanced = {}, ...$config } ) {
    const { config, window } = _init.call( this, 'scoped-js', $config, {
        script: { retention: 'retain', mimeType: '' },
        advanced: resolveParams( advanced ),
    } );
	config.scriptSelector = ( Array.isArray( config.script.mimeType ) ? config.script.mimeType : [ config.script.mimeType ] ).reduce( ( selector, mm ) => {
        const qualifier = mm ? `[type=${ window.CSS.escape( mm ) }]` : '';
        return selector.concat( `script${ qualifier }[scoped],script${ qualifier }[stateful]` );
    }, [] ).join( ',' );
    Object.assign( window.webqit, { StatefulAsyncFunction, StatefulAsyncScript, StatefulModule, State, Observer } );
    window.webqit.oohtml.Script = {
        compileCache: [ new Map, new Map, ],
        execute: execute.bind( window, config ),
    };
    realtime.call( window, config );
}

// Script runner
async function execute( config, execHash ) {
    const window = this, { realdom } = window.webqit;
    const exec = Hash.fromHash( execHash );
    if ( !exec ) throw new Error( `Argument must be a valid exec hash.` );
    const { script, compiledScript, thisContext } = exec;
    // Honour retention flag
    if ( config.script.retention === 'dispose' ) {
        script.remove();
    } else if ( config.script.retention === 'dispose' ) {
        script.textContent = `"source hidden"`;
    } else {
        script.textContent = await compiledScript.toString();
    }
    // Execute and save state
    const state = ( await compiledScript.bind( thisContext ) ).execute();
    if ( script.stateful ) { Object.defineProperty( script, 'state', { value: state } ); }
    realdom.realtime( window.document ).observe( script, () => {
        if ( script.stateful ) { state.dispose(); }
        if ( script.scoped ) { thisContext.scripts.splice( thisContext.scripts.indexOf( script, 1 ) ); }
    }, { subtree: true, timing: 'sync', generation: 'exits' } );
}

/**
 * Performs realtime capture of elements and builds their relationships.
 *
 * @param Object config
 *
 * @return Void
 */
function realtime( config ) {
	const window = this, { oohtml, realdom } = window.webqit;
    if ( !window.HTMLScriptElement.supports ) { window.HTMLScriptElement.supports = () => false; }
    const potentialManualTypes = [ 'module' ].concat( config.script.mimeType || [] );
	realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.scriptSelector, record => {
        record.entrants.forEach( script => {
            if ( script.cloned ) return;
            if ( 'stateful' in script ) return handled( script );
            Object.defineProperty( script, 'stateful', { value: script.hasAttribute( 'stateful' ) } ); 
            if ( 'scoped' in script ) return handled( script );
            Object.defineProperty( script, 'scoped', { value: script.hasAttribute( 'scoped' ) } ); 
            // Do compilation
            const textContent = ( script._ = script.textContent.trim() ) && script._.startsWith( '/*@oohtml*/if(false){' ) && script._.endsWith( '}/*@oohtml*/' ) ? script._.slice( 21, -12 ) : script.textContent;
            const sourceHash = Hash.toHash( textContent );
            const compileCache = oohtml.Script.compileCache[ script.stateful ? 0 : 1 ];
            let compiledScript;
            if ( !( compiledScript = compileCache.get( sourceHash ) ) ) {
                const { parserParams, compilerParams, runtimeParams } = config.advanced;
                compiledScript = new ( script.type === 'module' ? StatefulModule : StatefulAsyncScript )( textContent, {
                    packageName: script.id,
                    parserParams,
                    compilerParams: { ...compilerParams, startStatic: !script.stateful },
                    runtimeParams,
                } );
                compileCache.set( sourceHash, compiledScript );
            }
            // Run now!!!
            const thisContext = script.scoped ? script.parentNode || record.target : ( script.type === 'module' ? undefined : window );
            if ( script.scoped ) {
                if ( !thisContext.scripts ) { Object.defineProperty( thisContext, 'scripts', { value: [] } ); }
                thisContext.scripts.push( script );
            }
            const execHash = Hash.toHash( { script, compiledScript, thisContext } );
            const manualHandling = record.type === 'query' || ( potentialManualTypes.includes( script.type ) && !window.HTMLScriptElement.supports( script.type ) );
            if ( manualHandling ) { oohtml.Script.execute( execHash ); } else {
                script.textContent = `webqit.oohtml.Script.execute( '${ execHash }' );`;
            }
        } );
	}, { live: true, timing: 'intercept', generation: 'entrants', eventDetails: true } );
    // ---
}