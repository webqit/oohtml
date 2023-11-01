
export default class Bracelet {
    static tokens = {
        startTag: `{`, endTag: `}`,
        get contains () { return `contains(., "${ this.startTag }") and contains(substring-after(., "${ this.startTag }"), "${ this.endTag }")`; },
        get startsAndEnds() { return `starts-with(., "${ this.startTag }") and substring(., string-length(.) - string-length("${ this.endTag }") + 1) = "${ this.endTag }"`; },
        get regex() {
            const startTag = this.startTag.split( '' ).map( s => '\\' + s );
            const endTag = this.endTag.split( '' ).map( s => '\\' + s );
            return `${ startTag.join( '' ) }([^${ startTag[ 0 ] }]+)${ endTag.join( '' ) }`;
        }
    }

    parseExpr( expr, refs ) {
        const tokens = expr.match( /[\+\-\*\/&|\?\:\=\<\>\%]+|(['"])[^'"]*\1|\[[^\]]*\]|\([^)]*\)|\S+/g ).map( s => s.trim() );
        return tokens.map( s => {
            let meta = {};
            if ( s[ 0 ] === '!' ) { meta = { negation: true }; s = s.slice( 1 ); }
            if ( /^\(.*\)$/.test( s ) ) return { type: 'expr', value: this.parseExpr( s.slice( 1, -1 ), refs ), ...meta }; // must be before the operator test
            if ( [ '"', "'" ].includes( s[ 0 ] ) ) return { type: 'literal', value: /(['"])(.*?)\1/g.exec( s )[ 2 ], ...meta }; // must be before the operator test
            if ( /[\+\-\*\/&|\?\:\=\<\>\%]/.test( s ) ) return { type: 'operator', value: s, ...meta };
            if ( !isNaN( s ) ) return { type: 'literal', value: parseFloat( s ), ...meta };
            const ref = s.match( /[^\.\[\]]+/g );
            refs.push( ref );
            return { type: 'ref', value: ref, ...meta };
        } );
    }

    renderExpr( expr, bindings ) {
        return expr.reduce( ( [ prev, operator, state ], token ) => {
            // No further evaluations allowed?
            if ( state === 'end' ) return [ prev, null, 'end' ];
            // Mode has been consequent and we've now hit the alternate block?
            if ( state === 'consequent' && token.type === 'operator' && token.value === ':' ) return [ prev, null, 'end' ];
            // Always return operators at this level
            if ( token.type === 'operator' ) return [ prev, token, state ];
            // Still expecting to hit the alternate block?
            if ( state === 'alternate' && operator?.value !== ':' ) return [ null, null, 'alternate' ];
            // Main...
            let value, render = ( token, val ) => token.negation ? !val : val;
            switch ( token.type ) {
                case 'ref': value = render( token, bindings[ token.value.join( '.' ) ].value ); break;
                case 'expr': value = render( token, this.renderExpr( token.value, bindings ) ); break;
                default: value = render( token, token.value );
            }
            switch ( operator?.value ) {
                case '-': return [ prev - value, null, state ];
                case '+': return [ prev + value, null, state ];
                case '/': return [ prev / value, null, state ];
                case '*': return [ prev * value, null, state ];
                case '%': return [ prev % value, null, state ];
                case '===': return [ prev === value, null, state ];
                case '==': return [ render( operator, prev == value ), null, state ];
                case '>=': return [ prev >= value, null, state ];
                case '<=': return [ prev <= value, null, state ];
                case '>': return [ prev > value, null, state ];
                case '<': return [ prev < value, null, state ];
                case '||': return [ prev || value, null, state ];
                case '&&': return [ prev && value, null, state ];
                case '?': return prev ? [ value, null, 'consequent' ] : [ null, null, 'alternate' ];
                case '??': return [ prev ?? value, null, state ];
                default: return [ value ];
            }
        }, [ null, null ] )[ 0 ];
    }

    render( bindings ) {
        let value = this.renderExpr( this.expr, bindings );
        if ( typeof value === 'undefined' ) {
            value = this.originalValue;
            if ( !this.dirty ) {
                if ( this._booleanAble ) { value = false; }
                else return;
            }
            this.value = value;
            return;
        }
        this.value = value;
    }

    disconnect() { this.disconnected = true; }
}