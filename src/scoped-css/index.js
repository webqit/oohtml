
/**
 * @imports
 */
import { rewriteSelector } from '../namespaced-html/index.js';
import { _init, _toHash, _splitOuter } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init({ advanced = {}, ...$config }) {
    const { config, window } = _init.call( this, 'scoped-css', $config, {
        api: { styleSheets: 'styleSheets' },
        style: { retention: 'retain', mimeType: '', strategy: null },
    } );
    config.styleSelector = (Array.isArray( config.style.mimeType ) ? config.style.mimeType : [ config.style.mimeType ] ).reduce( ( selector, mm ) => {
        const qualifier = mm ? `[type=${ window.CSS.escape( mm ) }]` : '';
        return selector.concat( `style${ qualifier }[scoped]` );
    }, [] ).join( ',' );
    window.webqit.oohtml.Style = {
        compileCache: new Map,
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
    const window = this, styleSheetsMap = new Map;
    if ( config.api.styleSheets in window.Element.prototype ) { throw new Error( `The "Element" class already has a "${ config.api.styleSheets }" property!` ); }
    Object.defineProperty( window.HTMLElement.prototype, config.api.styleSheets, { get: function() {
        if ( !styleSheetsMap.has( this ) ) { styleSheetsMap.set( this, [] ); }
        return styleSheetsMap.get( this );
    }, } );
    Object.defineProperty( window.HTMLStyleElement.prototype, 'scoped', {
        configurable: true,
        get() { return this.hasAttribute( 'scoped' ); },
        set( value ) { this.toggleAttribute( 'scoped', value ); },
    } );
}

/**
 * Performs realtime capture of elements and builds their relationships.
 *
 * @param Object config
 *
 * @return Void
 */
function realtime( config ) {
    const window = this, { webqit: { oohtml, realdom } } = window;
    if ( !window.CSS.supports ) { window.CSS.supports = () => false; }
    const handled = new WeakSet;
    realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.styleSelector, record => {
        record.entrants.forEach( style => {
            if ( handled.has( style ) ) return;
            handled.add( style );
            if ( !style.scoped ) return;
            // Do compilation
            const sourceHash = _toHash( style.textContent );
            let compiledSheet, supportsHAS = CSS.supports( 'selector(:has(a,b))' );
            if ( !( compiledSheet = oohtml.Style.compileCache.get( sourceHash ) ) ) {
                const scopeSelector = supportsHAS ? `:has(> style[rand-${ sourceHash }])` : `[rand-${ sourceHash }]`;
                compiledSheet = createAdoptableStylesheet.call( window, style, scopeSelector );
                //compiledSheet = style.sheet; upgradeSheet( style.sheet, /*!window.CSSScopeRule &&*/ scopeSelector );
                oohtml.Style.compileCache.set( sourceHash, compiledSheet );
            }
            // Run now!!!
            style.parentNode[ config.api.styleSheets ].push( style );
            Object.defineProperty( style, 'sheet', { value: compiledSheet, configurable: true } );
            ( supportsHAS ? style : style.parentNode ).toggleAttribute( `rand-${ sourceHash }`, true );
            style.textContent = '\n/*[ Shared style sheet ]*/\n';
        } );
    }, { live: true, timing: 'intercept', generation: 'entrants' } );
    // ---
}

function createAdoptableStylesheet( style, scopeSelector ) {
    const window = this, textContent = style.textContent, supportsScope = window.CSSScopeRule && false/* Disabled for buggy behaviour: rewriting selectorText within an @scope block invalidates the scoping */;
    let styleSheet, cssText = supportsScope ? `@scope (${ scopeSelector }) {\n${ textContent.trim() }\n}` : textContent.trim();
    try {
        styleSheet = new window.CSSStyleSheet;
        styleSheet.replaceSync( cssText );
        upgradeSheet( styleSheet, !supportsScope && scopeSelector );
        document.adoptedStyleSheets.push( styleSheet );
    } catch( e ) {
        const style = window.document.createElement( 'style' );
        window.document.body.appendChild( style );
        style.textContent = cssText;
        styleSheet = style.sheet;
        upgradeSheet( styleSheet, !supportsScope && scopeSelector );
    }
    return styleSheet;
}

function upgradeSheet( styleSheet, scopeSelector = null ) {
    const l = styleSheet?.cssRules.length || -1;
    for ( let i = 0; i < l; ++i ) {
        const cssRule = styleSheet.cssRules[ i ];
        if ( cssRule instanceof CSSImportRule ) {
            // Handle imported stylesheets
            //upgradeSheet( cssRule.styleSheet, scopeSelector );
            continue;
        }
        upgradeRule( cssRule, scopeSelector );
    }
}

function upgradeRule( cssRule, scopeSelector = null ) {
    if ( cssRule instanceof CSSStyleRule ) {
        // Resolve relative IDs and scoping (for non-@scope browsers)
        upgradeSelector( cssRule, scopeSelector );
        return;
    }
    if ( [ window.CSSScopeRule, window.CSSMediaRule, window.CSSContainerRule, window.CSSSupportsRule, window.CSSLayerBlockRule ].some( type => type && cssRule instanceof type ) ) {
        // Parse @rule blocks
        const l = cssRule.cssRules.length;
        for ( let i = 0; i < l; ++i ) {
            upgradeRule( cssRule.cssRules[ i ], scopeSelector );
        }
    }
}

function upgradeSelector( cssRule, scopeSelector = null ) {
    const newSelectorText = rewriteSelector( cssRule.selectorText, scopeSelector, true );
    cssRule.selectorText = newSelectorText;
    // Parse nested blocks. (CSS nesting)
    if ( cssRule.cssRules ) {
        const l = cssRule.cssRules.length;
        for ( let i = 0; i < l; ++i ) {
            upgradeSelector( cssRule.cssRules[ i ], /* Nesting has nothing to do with scopeSelector */ );
        }
    }
}