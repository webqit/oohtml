
/**
 * @imports
 */
import { _, _init } from '../util.js';
import AttrBracelet from './AttrBracelet.js';
import TextBracelet from './TextBracelet.js';
import HTMLBracelets from './HTMLBracelets.js';

/**
 * Initializes DOM Parts.
 * 
 * @param $config  Object
 *
 * @return Void
 */
export default function init( $config = {} ) {
    const { config, realdom, window } = _init.call( this, 'html-bracelets', $config, {
        api: { bracelets: 'bracelets' },
        isomorphic: true,
    } );
    exposeAPIs.call( window, config );
    realtime.call( window, config );
}

/**
 * Exposes DOM Parts with native APIs.
 *
 * @param Object        config
 *
 * @return Void
 */
function exposeAPIs( config ) {
    const window = this;
    // Assertions
    if ( config.api.bracelets in window.document ) { throw new Error( `document already has a "${ config.api.bracelets }" property!` ); }
    if ( config.api.bracelets in window.HTMLElement.prototype ) { throw new Error( `The "HTMLElement" class already has a "${ config.api.bracelets }" property!` ); }
    // Definitions
    Object.defineProperty( window.document, config.api.bracelets, { get: function() {
        return HTMLBracelets.instance( window.document );
    } } );
    Object.defineProperty( window.HTMLElement.prototype, config.api.bracelets, { get: function() {
        return HTMLBracelets.instance( this );
    } } );
}

/**
 * Performs realtime capture of elements and their attributes
 *
 * @param Object config
 *
 * @return Void
 */
function realtime( config ) {
    const window = this, { realdom } = window.webqit;
    realdom.realtime( window.document ).subtree( `(${ TextBracelet.query })`, record => {
        TextBracelet.cleanup( ...record.exits );
        TextBracelet.mount( ...TextBracelet.parse( ...record.entrants.filter( node => !_( node ).has( 'text-bracelet' )/** generated text nodes during parse() */ ) ) );                
    }, { live: true } );
    realdom.realtime( window.document ).subtree( `(${ AttrBracelet.query })`, record => {
        AttrBracelet.cleanup( ...record.exits );
        AttrBracelet.mount( ...AttrBracelet.parse( ...record.entrants ) );
    }, { live: true } );
    realdom.realtime( window.document, 'attr' ).observe( records => {
        for ( const record of records ) {
            if ( _( record.target ).get( 'attr-bracelets' )?.active.some( p => p.attr.nodeName === record.name ) ) continue;
            if ( [ ...( _( record.target ).get( 'attr-bracelets' )?.get( record.name ) || [] ) ].some( p => p.isBoolean ) ) continue;
            if ( record.oldValue ) { AttrBracelet.cleanup( record.value ? record.target.attributes[ record.name ] : { ownerElement: record.target, nodeName: record.name } ); }
            if ( record.value ) { AttrBracelet.mount( ...AttrBracelet.parse( record.target.attributes[ record.name ] ) ); }
        }
    }, { subtree: true, newValue: true, oldValue: true, timing: 'sync' } );
}