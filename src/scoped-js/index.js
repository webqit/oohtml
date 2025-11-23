import { resolveParams } from '@webqit/use-live/params';
import { _wq, _init, _toHash, _fromHash } from '../util.js';

export default function init({ advanced = {}, ...$config }) {
    const { config, window } = _init.call( this, 'scoped-js', $config, {
        script: { retention: 'retain', mimeTypes: 'module|text/javascript|application/javascript', timing: 'auto' },
        api: { scripts: 'scripts' },
        advanced: resolveParams(advanced),
    } );
    const customTypes = Array.isArray( config.script.mimeTypes ) ? config.script.mimeTypes : config.script.mimeTypes.split( '|' ).filter( t => t );
    config.scriptSelector =  customTypes.map( t => `script[type="${ window.CSS.escape( t ) }"]:not([oohtmlignore])` ).concat(`script:not([type])`).join( ',' );
    window.webqit.oohtml.Script = {
        compileCache: [ new Map, new Map, ],
        execute: execute.bind( window, config ),
    };
    exposeAPIs.call( window, config );
    realtime.call( window, config );
}

function exposeAPIs( config ) {
    const window = this, { webqit: { nextKeyword, matchPrologDirective } } = window;
    const scriptsMap = new Map;
    if ( config.api.scripts in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.scripts }" property!` ); }
    [ window.ShadowRoot.prototype, window.Element.prototype ].forEach( proto => {
        Object.defineProperty( proto, config.api.scripts, { get: function() {
            if ( !scriptsMap.has( this ) ) { scriptsMap.set( this, [] ); }
            return scriptsMap.get( this );
        }, } );
    } );
    Object.defineProperties( window.HTMLScriptElement.prototype, {
        scoped: {
            configurable: true,
            get() { return this.hasAttribute( 'scoped' ); },
            set( value ) { this.toggleAttribute( 'scoped', value ); },
        },
        live: {
            configurable: true,
            get() {
                if (this.liveMode) return true;
                const scriptContents = nextKeyword(this.oohtml__textContent || this.textContent || '', 0, 0);
                return matchPrologDirective(scriptContents, true);
            },
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
    } else if ( config.script.retention === 'hidden' ) {
        script.textContent = `"source hidden"`;
    } else {
        setTimeout(async () => {
            script.textContent = await compiledScript.toString();
        }, 0); //Anti-eval hack
    }
    // Execute and save state
    const varScope = script.scoped ? thisContext : script.getRootNode();
    if ( !_wq( varScope ).has( 'scriptEnv' ) ) {
        _wq( varScope ).set( 'scriptEnv', Object.create( null ) );
    }
    const liveMode = await ( await compiledScript.bind( thisContext, _wq( varScope ).get( 'scriptEnv' ) ) ).execute();
    if ( script.live ) { Object.defineProperty( script, 'liveMode', { value: liveMode } ); }
    realdom.realtime( window.document ).observe( script, () => {
        if ( script.live ) { liveMode.abort(); }
        if ( thisContext instanceof window.Element ) { thisContext[ config.api.scripts ]?.splice( thisContext[ config.api.scripts ].indexOf( script, 1 ) ); }
    }, { id: 'scoped-js:script-exits', subtree: 'cross-roots', timing: 'sync', generation: 'exits' } );
}

function realtime( config ) {
    const inBrowser = Object.getOwnPropertyDescriptor( globalThis, 'window' )?.get?.toString().includes( '[native code]' ) ?? false;
    const window = this, { webqit: { oohtml, realdom } } = window;
    if ( !window.HTMLScriptElement.supports ) { window.HTMLScriptElement.supports = type => [ 'text/javascript', 'application/javascript' ].includes( type ); }
    const handled = new WeakSet;
    realdom.realtime( window.document ).query( config.scriptSelector, record => {
        record.entrants.forEach( script => {
            if ( handled.has( script ) || script.hasAttribute('oohtmlno') || (!inBrowser && !script.hasAttribute('ssr')) ) return;
            // Do compilation
            const compiledScript = compileScript.call( window, config, script );
            if ( !compiledScript ) return;
            handled.add( script );
            // Run now!!!
            const thisContext = script.scoped ? script.parentNode || record.target : ( script.type === 'module' ? undefined : window );
            if ( script.scoped ) { thisContext[ config.api.scripts ].push( script ); }
            const execHash = _toHash( { script, compiledScript, thisContext } );
            const manualHandling = record.type === 'query' || ( script.type && !window.HTMLScriptElement.supports( script.type ) ) || script.getAttribute('data-handling') === 'manual';
            if ( manualHandling || config.script.timing === 'manual' ) { oohtml.Script.execute( execHash ); } else {
                script.textContent = `webqit.oohtml.Script.execute( '${ execHash }' );`;
            }
        } );
    }, { id: 'scoped-js:script-entries', live: true, subtree: 'cross-roots', timing: 'intercept', generation: 'entrants', eventDetails: true } );
    // ---
}

function compileScript( config, script ) {
    const window = this, { webqit: { oohtml, LiveScript, AsyncLiveScript, LiveModule } } = window;
    
    let textContent = script.textContent.trim();
    if ( textContent.startsWith( '/*@oohtml*/if(false){' ) && textContent.endsWith( '}/*@oohtml*/' ) ) {
        textContent = textContent.slice( 21, -12 );
        Object.defineProperty( script, 'oohtml__textContent', { value: textContent } );
    }
    if ( !textContent.trim().length ) return;

    const sourceHash = _toHash( textContent );
    const compileCache = oohtml.Script.compileCache[ script.live ? 0 : 1 ];
    let compiledScript;
    if ( !( compiledScript = compileCache.get( sourceHash ) ) ) {
        const { parserParams, compilerParams, runtimeParams } = config.advanced;
        compiledScript = new ( script.type === 'module' ? LiveModule : ( LiveScript || AsyncLiveScript ) )( textContent, {
            liveMode: script.live,
            exportNamespace: `#${ script.id }`,
            fileName: `${ window.document.url?.split( '#' )?.[ 0 ] || '' }#${ script.id }`,
            parserParams,
            compilerParams,
            runtimeParams,
        } );
        compileCache.set( sourceHash, compiledScript );
    }
    return compiledScript;
}

export function idleCompiler( node ) {
    const window = this, { webqit: { oohtml: { configs: { SCOPED_JS: config } } } } = window;
    [ ...( node?.querySelectorAll( config.scriptSelector ) || [] ) ].forEach( script => {
        compileScript.call( window, config, script );
    } );
}