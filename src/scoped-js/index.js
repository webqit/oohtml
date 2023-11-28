
/**
 * @imports
 */
import { resolveParams } from '@webqit/quantum-js/params';
import { _init } from '../util.js';
import Hash from './Hash.js';

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
        return selector.concat( `script${ qualifier }[scoped],script${ qualifier }[quantum]` );
    }, [] ).join( ',' );
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
    if ( script.quantum ) { Object.defineProperty( script, 'state', { value: state } ); }
    realdom.realtime( window.document ).observe( script, () => {
        if ( script.quantum ) { state.dispose(); }
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
	const window = this, { webqit: { oohtml, realdom, QuantumScript, QuantumAsyncScript, QuantumModule } } = window;
    if ( !window.HTMLScriptElement.supports ) { window.HTMLScriptElement.supports = () => false; }
    const potentialManualTypes = [ 'module' ].concat( config.script.mimeType || [] );
	realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.scriptSelector, record => {
        record.entrants.forEach( script => {
            if ( script.cloned ) return;
            if ( 'quantum' in script ) return handled( script );
            Object.defineProperty( script, 'quantum', { value: script.hasAttribute( 'quantum' ) } ); 
            if ( 'scoped' in script ) return handled( script );
            Object.defineProperty( script, 'scoped', { value: script.hasAttribute( 'scoped' ) } ); 
            // Do compilation
            const textContent = ( script._ = script.textContent.trim() ) && script._.startsWith( '/*@oohtml*/if(false){' ) && script._.endsWith( '}/*@oohtml*/' ) ? script._.slice( 21, -12 ) : script.textContent;
            const sourceHash = Hash.toHash( textContent );
            const compileCache = oohtml.Script.compileCache[ script.quantum ? 0 : 1 ];
            let compiledScript;
            if ( !( compiledScript = compileCache.get( sourceHash ) ) ) {
                const { parserParams, compilerParams, runtimeParams } = config.advanced;
                compiledScript = new ( script.type === 'module' ? QuantumModule : ( QuantumScript || QuantumAsyncScript ) )( textContent, {
                    exportNamespace: `#${ script.id }`,
                    fileName:`${ window.document.url?.split( '#' )?.[ 0 ] || '' }#${ script.id }`,
                    parserParams,
                    compilerParams: { ...compilerParams, startStatic: !script.quantum },
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