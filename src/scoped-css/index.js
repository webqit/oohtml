
/**
 * @imports
 */
import { _init } from '../util.js';

/**
 * @init
 * 
 * @param Object $config
 */
export default function init( { advanced = {}, ...$config } ) {
    const { config, window } = _init.call( this, 'scoped-css', $config, {
        style: { retention: 'retain', mimeType: '', strategy: null },
    } );
	config.styleSelector = ( Array.isArray( config.style.mimeType ) ? config.style.mimeType : [ config.style.mimeType ] ).reduce( ( selector, mm ) => {
        const qualifier = mm ? `[type=${ window.CSS.escape( mm ) }]` : '';
        return selector.concat( `style${ qualifier }[scoped]` );
    }, [] ).join( ',' );
    realtime.call( window, config );
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
	realdom.realtime( window.document ).subtree/*instead of observe(); reason: jsdom timing*/( config.styleSelector, record => {
        record.entrants.forEach( style => {
            if ( 'scoped' in style ) return handled( style );
            if ( config.style.strategy === '@scope' ) {
                Object.defineProperty( style, 'scoped', { value: style.hasAttribute( 'scoped' ) } );
                if ( style.hasAttribute( 'ref' ) ) return; // Server-rendered
                const uuid = `scoped${ uniqId() }`;
                style.setAttribute( 'ref', uuid );
                style.textContent = `@scope from (:has(> style[ref="${ uuid }"])) {\n${ style.textContent }\n}`;
            }
        } );
	}, { live: true, timing: 'intercept', generation: 'entrants' } );
    // ---
}

const uniqId = () => (0|Math.random()*9e6).toString(36);