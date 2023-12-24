
/**
 * @imports
 */
import { resolveParams } from '@webqit/quantum-js/params';
import { _init, _toHash, _fromHash } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init({ advanced = {}, ...$config }) {
    const { config, window } = _init.call( this, 'scoped-js', $config, {
        script: { retention: 'retain', mimeType: '' },
        api: { scripts: 'scripts' },
        advanced: resolveParams(advanced),
    } );
    config.scriptSelector = ( Array.isArray( config.script.mimeType ) ? config.script.mimeType : [ config.script.mimeType ] ).reduce( ( selector, mm ) => {
        const qualifier = mm ? `[type=${ window.CSS.escape( mm ) } ]` : '';
        return selector.concat( `script${ qualifier }[scoped],script${ qualifier }[quantum]` );
    }, [] ).join( ',' );
    window.webqit.oohtml.Script = {
        compileCache: [ new Map, new Map, ],
        execute: execute.bind( window, config ),
    };
    exposeAPIs.call( window, config );
    realtime.call( window, config );
}

/**
 * Exposes Bindings with native APIs.
 *
 * @param Object config
 *
 * @return Void
 */
function exposeAPIs( config ) {
    const window = this, scriptsMap = new Map;
    if ( config.api.scripts in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.scripts }" property!` ); }
    Object.defineProperty( window.HTMLElement.prototype, config.api.scripts, { get: function() {
        if ( !scriptsMap.has( this ) ) { scriptsMap.set( this, [] ); }
        return scriptsMap.get( this );
    }, } );
    Object.defineProperties( window.HTMLScriptElement.prototype, {
        scoped: {
            configurable: true,
            get() { return this.hasAttribute( 'scoped' ); },
            set( value ) { this.toggleAttribute( 'scoped', value ); },
        },
        quantum: {
            configurable: true,
            get() { return this.hasAttribute( 'quantum' ); },
            set( value ) { this.toggleAttribute( 'quantum', value ); },
        },
    } );
}

// Script runner
async function execute( config, execHash ) {
    const window = this, { realdom } = window.webqit;
    const exec = _fromHash( execHash );
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
        if ( script.scoped ) { thisContext[ config.api.scripts ].splice( thisContext[ config.api.scripts ].indexOf( script, 1 ) ); }
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
    const potentialManualTypes = [ 'module' ].concat( config.script.mimeType || [] ), handled = new WeakSet;
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.scriptSelector, record => {
        record.entrants.forEach( script => {
            if ( handled.has( script ) ) return;
            handled.add( script );
            // Do compilation
            const textContent = ( script._ = script.textContent.trim() ) && script._.startsWith( '/*@oohtml*/if(false){' ) && script._.endsWith( '}/*@oohtml*/' ) ? script._.slice( 21, -12 ) : script.textContent;
            const sourceHash = _toHash( textContent );
            const compileCache = oohtml.Script.compileCache[ script.quantum ? 0 : 1 ];
            let compiledScript;
            if ( !( compiledScript = compileCache.get( sourceHash ) ) ) {
                const { parserParams, compilerParams, runtimeParams } = config.advanced;
                compiledScript = new ( script.type === 'module' ? QuantumModule : (QuantumScript || QuantumAsyncScript) )( textContent, {
                    exportNamespace: `#${ script.id }`,
                    fileName: `${ window.document.url?.split( '#' )?.[ 0 ] || '' }#${ script.id }`,
                    parserParams,
                    compilerParams: { ...compilerParams, startStatic: !script.quantum },
                    runtimeParams,
                } );
                compileCache.set( sourceHash, compiledScript );
            }
            // Run now!!!
            const thisContext = script.scoped ? script.parentNode || record.target : ( script.type === 'module' ? undefined : window );
            if ( script.scoped ) { thisContext[ config.api.scripts ].push( script ); }
            const execHash = _toHash( { script, compiledScript, thisContext } );
            const manualHandling = record.type === 'query' || ( potentialManualTypes.includes( script.type ) && !window.HTMLScriptElement.supports( script.type ) );
            if ( manualHandling ) { oohtml.Script.execute( execHash ); } else {
                script.textContent = `webqit.oohtml.Script.execute( '${ execHash }' );`;
            }
        } );
    }, { live: true, timing: 'intercept', generation: 'entrants', eventDetails: true } );
    // ---
}