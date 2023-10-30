
/**
 * @imports
 */
import HTMLBracelets from './HTMLBracelets.js';
import Bracelet from './Bracelet.js';
import { _ } from '../util.js';

export default class TextBracelet extends Bracelet {
    static get query() { return `text()[not(ancestor::script) and ${ this.tokens.contains }]`; }
    
    static parse( ...nodes ) {
        return nodes.reduce( ( nodes, node ) => {
            let $node = node, $rest = node, startIndex, endIndex;
            while ( $rest && ( startIndex = $rest.nodeValue.indexOf( this.tokens.startTag ) ) > -1 ) {
                if ( startIndex > 0 ) { $node = $rest.splitText( startIndex ); }
                if ( ( endIndex = $node.nodeValue.indexOf( this.tokens.endTag ) + this.tokens.endTag.length ) !== $node.nodeValue.length ) {
                    $rest = $node.splitText( endIndex );
                } else { $rest = null; }
                nodes.push( new this( $node ) );
            }
            return nodes;
        }, [] );
    }

    static mount( ...bracelets ) {
        for ( const bracelet of bracelets ) {
            _( bracelet.node ).set( 'text-bracelet', bracelet );
            HTMLBracelets.instance( bracelet.ownerElement ).add( bracelet );
        }
    }

    static cleanup( ...nodes ) {
        for ( const node of nodes ) {
            const bracelet = _( node ).get( 'text-bracelet' );
            if ( !bracelet ) continue;
            bracelet.disconnect();
            HTMLBracelets.instance( bracelet.ownerElement ).delete( bracelet );
            _( node ).delete( 'text-bracelet' );
        }
    }

    constructor( node ) {
        super();
        const expr = [ ...node.nodeValue.match( new RegExp( this.constructor.tokens.regex ) ) ][ 1 ].trim();
        const $refs = [], $expr = this.parseExpr( expr, $refs );
        Object.defineProperties( this, {
            _value: { value: node.nodeValue, writable: true },
            _dirty: { value: false, writable: true },
            type: { get: () => 'text' },
            expr: { get: () => $expr },
            refs: { get: () => $refs },
            node: { get: () => node },
            ownerElement: { get: () => node.parentNode },
            originalValue: { value: node.nodeValue },
        } );
    }

    get value() { return this._value; }
    set value( value ) {
        if ( this.disconnected || value === this._value ) return;
        this._value = value;
        this._dirty = true;
        this.node.nodeValue = value;
    }

    get nextSibling() { return this.node.nextSibling; }
    get dirty() { return this._dirty; }
}