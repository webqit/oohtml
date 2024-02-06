
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
        style: { retention: 'retain', mimeTypes: 'text/css', strategy: null },
    } );
    config.styleSelector = (Array.isArray( config.style.mimeTypes ) ? config.style.mimeTypes : config.style.mimeTypes.split( '|' ) ).concat( '' ).reduce( ( selector, mm ) => {
        const qualifier = mm ? `[type="${ window.CSS.escape( mm ) }"]` : ':not([type])';
        return selector.concat( `style${ qualifier }` );
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
    // The "styleSheets" API
    [ window.Element.prototype ].forEach( prototype => {
        // No-conflict assertions
        const type = 'Element';
        if ( config.api.styleSheets in prototype ) { throw new Error( `The ${ type } prototype already has a "${ config.api.styleSheets }" API!` ); }
        // Definitions
        Object.defineProperty( prototype, config.api.styleSheets, { get: function() {
            if ( !styleSheetsMap.has( this ) ) { styleSheetsMap.set( this, [] ); }
            return styleSheetsMap.get( this );
        }, } );
    } );
    // The HTMLStyleElement "scoped" property
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
    const inBrowser = Object.getOwnPropertyDescriptor( globalThis, 'window' )?.get?.toString().includes( '[native code]' ) ?? false;
    if ( !window.CSS.supports ) { window.CSS.supports = () => false; }
    const handled = new WeakSet;
    realdom.realtime( window.document ).query( config.styleSelector, record => {
        record.entrants.forEach( style => {
            if ( handled.has( style ) ) return;
            handled.add( style );
            // Do compilation
            const sourceHash = _toHash( style.textContent );
            const supportsHAS = CSS.supports( 'selector(:has(a,b))' );
            const scopeSelector = style.scoped && ( supportsHAS ? `:has(> style[rand-${ sourceHash }])` : `[rand-${ sourceHash }]` );
            const supportsScope = style.scoped && window.CSSScopeRule && false/* Disabled for buggy behaviour: rewriting selectorText within an @scope block invalidates the scoping */;
            const scopeRoot = style.scoped && style.parentNode || style.getRootNode();
            if ( scopeRoot instanceof window.Element ) {
                scopeRoot[ config.api.styleSheets ].push( style );
                if ( !inBrowser ) return;
                ( supportsHAS ? style : scopeRoot ).toggleAttribute( `rand-${ sourceHash }`, true );
            }
            if ( !inBrowser ) return;
            if ( style.scoped && style.hasAttribute( 'shared' ) ) {
                let compiledSheet;
                if ( !( compiledSheet = oohtml.Style.compileCache.get( sourceHash ) ) ) {
                    compiledSheet = createAdoptableStylesheet.call( window, style, null, supportsScope, scopeSelector );
                    oohtml.Style.compileCache.set( sourceHash, compiledSheet );
                }
                // Run now!!!
                Object.defineProperty( style, 'sheet', { value: compiledSheet, configurable: true } );
                style.textContent = '\n/*[ Shared style sheet ]*/\n';
            } else {
                const transform = () => {
                    const namespaceUUID = getNamespaceUUID( getOwnerNamespaceObject.call( window, scopeRoot ) );
                    upgradeSheet.call( this, style.sheet, namespaceUUID, !supportsScope && scopeSelector );
                };
                if ( style.isConnected ) { transform(); }
                else { setTimeout( () => { transform(); }, 0 ); }
            }
        } );
    }, { live: true, subtree: 'cross-roots', timing: 'intercept', generation: 'entrants' } );
    // ---
}

function createAdoptableStylesheet( style, namespaceUUID, supportsScope, scopeSelector ) {
    const window = this, textContent = style.textContent;
    let styleSheet, cssText = supportsScope && scopeSelector ? `@scope (${ scopeSelector }) {\n${ textContent.trim() }\n}` : textContent.trim();
    try {
        styleSheet = new window.CSSStyleSheet;
        styleSheet.replaceSync( cssText );
        upgradeSheet.call( this, styleSheet, namespaceUUID, !supportsScope && scopeSelector );
        const adopt = () => style.getRootNode().adoptedStyleSheets.push( styleSheet );
        if ( style.isConnected ) { adopt(); }
        else { setTimeout( () => { adopt(); }, 0 ); }
    } catch( e ) {
        const styleCopy = window.document.createElement( 'style' );
        style.after( styleCopy );
        styleCopy.textContent = cssText;
        styleSheet = styleCopy.sheet;
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