
/**
 * @imports
 */
import HTMLBracelets from './HTMLBracelets.js';
import Bracelet from './Bracelet.js';
import { _ } from '../util.js';

export default class AttrBracelet extends Bracelet {
    static get query() { return `*[@*[${ this.tokens.contains }]]`; }
    
    static parse( ...attrs ) {
        return attrs.reduce( ( attrs, attr ) => {
            return attrs.concat( [ ...attr.nodeValue.matchAll( new RegExp( this.tokens.regex, 'g' ) ) ].reduce( ( bracelets, match ) => {
                const bracelet = new this( attr, match[ 0 ], match.index, match[ 1 ].trim() );
                const prev = bracelets.slice( -1 )[ 0 ];
                if ( prev ) { prev._nextSibling = bracelet; }
                return bracelets.concat( bracelet );
            }, [] ) );
        }, [] );
    }

    static mount( ...bracelets ) {
        for ( const bracelet of bracelets ) {
            // Add to attr-specific registry
            let attrBraceletsRegistry = _( bracelet.ownerElement ).get( 'attr-bracelets' );
            if ( !attrBraceletsRegistry ) {
                attrBraceletsRegistry = new Map;
                attrBraceletsRegistry.active = [];
                _( bracelet.ownerElement ).set( 'attr-bracelets', attrBraceletsRegistry );
            }
            let attrBracelets = attrBraceletsRegistry.get( bracelet.attr.nodeName );
            if ( !attrBracelets ) {
                attrBracelets = new Set;
                attrBraceletsRegistry.set( bracelet.attr.nodeName, attrBracelets );
            }
            attrBracelets.add( bracelet );
            attrBraceletsRegistry.active[ 0 ]?._nested.add( bracelet );
            // Add to general registry
            HTMLBracelets.instance( bracelet.ownerElement ).add( bracelet );
        }
    }

    static cleanup( ...attrs ) {
        for ( const attr of attrs ) {
            // Remove from attr-specific registry
            const attrBraceletsRegistry = _( attr.ownerElement ).get( 'attr-bracelets' );
            attrBraceletsRegistry?.get( attr.nodeName )?.forEach( bracelet => {
                bracelet.disconnect();
                // Remove from general registry
                HTMLBracelets.instance( bracelet.ownerElement ).delete( bracelet );
            } );
            attrBraceletsRegistry?.delete( attr.nodeName );
            if ( attrBraceletsRegistry && !attrBraceletsRegistry.size ) { _( attr.ownerElement ).delete( 'attr-bracelets' ); }
        }
    }

    constructor( attr, _value, startIndex, expr ) {
        super();
        const $refs = [], $expr = this.parseExpr( expr, $refs );
        Object.defineProperties( this, {
            type: { get: () => 'attr' },
            expr: { get: () => $expr },
            refs: { get: () => $refs },
            attr: { get: () => attr },
            ownerElement: { get: () => attr.ownerElement },
            originalValue: { value: _value },
            _value: { value: _value, writable: true },
            _dirty: { value: false, writable: true },
            _startIndex: { value: undefined, writable: true },
            _endIndex: { value: undefined, writable: true },
            _nextSibling: { value: undefined, writable: true },
            _nested: { value: new Set },
        } );
        this.startIndex = startIndex;
    }

    get startIndex() { return this._startIndex; }
    set startIndex( value ) {
        this._startIndex = value;
        this.endIndex = this._startIndex + this.value.length;
    }

    get endIndex() { return this._endIndex; }
    set endIndex( value ) {
        if ( value === this._endIndex ) return;
        if ( this.nextSibling ) { this.nextSibling.startIndex += value - this._endIndex; }
        this._endIndex = value;
    }

    get value() { return this._value; }
    set value( value ) {
        if ( this.disconnected || value === this._value ) return;
        this._value = value;
        this._dirty = true;
        // Set attribute; but first disconnect any "nested"
        this._nested.forEach( p => p.disconnect() );
        const attrBraceletsRegistry = _( this.ownerElement ).get( 'attr-bracelets' );
        attrBraceletsRegistry.active.unshift( this );
        this.ownerElement.setAttribute( this.attr.nodeName, this.attr.nodeValue.substring( 0, this.startIndex ) + value + this.attr.nodeValue.substring( this.endIndex ) );
        attrBraceletsRegistry.active.shift();
        // Reindex
        const newEndIndex = this.startIndex + value.length;
        if ( newEndIndex !== this.endIndex ) { this.endIndex = newEndIndex; }
    }

    get nextSibling() { return this._nextSibling; }
    get dirty() { return this._dirty; }
}