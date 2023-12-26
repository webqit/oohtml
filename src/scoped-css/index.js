
/**
 * @imports
 */
import { rewriteSelector, getOwnerNamespaceObject, getNamespaceUUID } from '../namespaced-html/index.js';
import { _init, _toHash } from '../util.js';

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
            style.parentNode[ config.api.styleSheets ].push( style );
            // Do compilation
            const sourceHash = _toHash( style.textContent );
            const supportsHAS = CSS.supports( 'selector(:has(a,b))' );
            const scopeSelector = supportsHAS ? `:has(> style[rand-${ sourceHash }])` : `[rand-${ sourceHash }]`;
            const supportsScope = window.CSSScopeRule && false/* Disabled for buggy behaviour: rewriting selectorText within an @scope block invalidates the scoping */;
            ( supportsHAS ? style : style.parentNode ).toggleAttribute( `rand-${ sourceHash }`, true );
            if ( style.hasAttribute( 'shared' ) ) {
                let compiledSheet;
                if ( !( compiledSheet = oohtml.Style.compileCache.get( sourceHash ) ) ) {
                    compiledSheet = createAdoptableStylesheet.call( window, style, null, supportsScope, scopeSelector );
                    oohtml.Style.compileCache.set( sourceHash, compiledSheet );
                }
                // Run now!!!
                Object.defineProperty( style, 'sheet', { value: compiledSheet, configurable: true } );
                style.textContent = '\n/*[ Shared style sheet ]*/\n';
            } else {
                const namespaceUUID = getNamespaceUUID( getOwnerNamespaceObject.call( window, style ) );
                upgradeSheet.call( this, style.sheet, namespaceUUID, !supportsScope && scopeSelector );
            }
        } );
    }, { live: true, timing: 'intercept', generation: 'entrants' } );
    // ---
}

function createAdoptableStylesheet( style, namespaceUUID, supportsScope, scopeSelector ) {
    const window = this, textContent = style.textContent;
    let styleSheet, cssText = supportsScope ? `@scope (${ scopeSelector }) {\n${ textContent.trim() }\n}` : textContent.trim();
    try {
        styleSheet = new window.CSSStyleSheet;
        styleSheet.replaceSync( cssText );
        upgradeSheet.call( this, styleSheet, namespaceUUID, !supportsScope && scopeSelector );
        document.adoptedStyleSheets.push( styleSheet );
    } catch( e ) {
        const style = window.document.createElement( 'style' );
        window.document.body.appendChild( style );
        style.textContent = cssText;
        styleSheet = style.sheet;
        upgradeSheet.call( this, styleSheet, namespaceUUID, !supportsScope && scopeSelector );
    }
    return styleSheet;
}

function upgradeSheet( styleSheet, namespaceUUID, scopeSelector = null ) {
    const l = styleSheet?.cssRules.length || -1;
    for ( let i = 0; i < l; ++i ) {
        const cssRule = styleSheet.cssRules[ i ];
        if ( cssRule instanceof CSSImportRule ) {
            // Handle imported stylesheets
            //upgradeSheet( cssRule.styleSheet, namespaceUUID, scopeSelector );
            continue;
        }
        upgradeRule.call( this, cssRule, namespaceUUID, scopeSelector );
    }
}

function upgradeRule( cssRule, namespaceUUID, scopeSelector = null ) {
    if ( cssRule instanceof CSSStyleRule ) {
        // Resolve relative IDs and scoping (for non-@scope browsers)
        upgradeSelector.call( this, cssRule, namespaceUUID, scopeSelector );
        return;
    }
    if ( [ window.CSSScopeRule, window.CSSMediaRule, window.CSSContainerRule, window.CSSSupportsRule, window.CSSLayerBlockRule ].some( type => type && cssRule instanceof type ) ) {
        // Parse @rule blocks
        const l = cssRule.cssRules.length;
        for ( let i = 0; i < l; ++i ) {
            upgradeRule.call( this, cssRule.cssRules[ i ], namespaceUUID, scopeSelector );
        }
    }
}

function upgradeSelector( cssRule, namespaceUUID, scopeSelector = null ) {
    const newSelectorText = rewriteSelector.call( this, cssRule.selectorText, namespaceUUID, scopeSelector, 1 );
    cssRule.selectorText = newSelectorText;
    // Parse nested blocks. (CSS nesting)
    if ( cssRule.cssRules ) {
        const l = cssRule.cssRules.length;
        for ( let i = 0; i < l; ++i ) {
            upgradeSelector.call( this, cssRule.cssRules[ i ], namespaceUUID, /* Nesting has nothing to do with scopeSelector */ );
        }
    }
}