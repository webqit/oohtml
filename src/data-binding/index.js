
/**
 * @imports
 */
import { _, _init } from '../util.js';

/**
 * Initializes DOM Parts.
 * 
 * @param $config  Object
 *
 * @return Void
 */
export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'html-bindings', $config, {
        attr: { expr: 'expr', itemIndex: 'data-key' },
        tokens: { nodeType: 'processing-instruction', tagStart: '?{', tagEnd: '}?', stateStart: '; [=', stateEnd: ']' },
        staticsensitivity: true,
        isomorphic: true,
    } );
    ( { CONTEXT_API: config.CONTEXT_API, BINDINGS_API: config.BINDINGS_API, HTML_IMPORTS: config.HTML_IMPORTS } = window.webqit.oohtml.configs );
    config.attrSelector = `[${ window.CSS.escape( config.attr.expr ) }]`;
    const discreteBindingsMatch = ( start, end ) => {
        const starting = `starts-with(., "${ start }")`;
        const ending = `substring(., string-length(.) - string-length("${ end }") + 1) = "${ end }"`;
        return `${ starting } and ${ ending }`;
    }
    config.discreteBindingsSelector = `comment()[${ discreteBindingsMatch( config.tokens.tagStart, config.tokens.tagEnd ) }]`;
    realtime.call( window, config );
}

/**
 * Performs realtime capture of elements and their attributes
 *
 * @param Object config
 *
 * @return Void
 */
function realtime( config ) {
    const window = this, { webqit: { realdom } } = window;
	// ----------------
    realdom.realtime( window.document ).subtree( `(${ config.discreteBindingsSelector })`, record => {
        cleanup.call( this, ...record.exits );  
        mountDiscreteBindings.call( this, config, ...record.entrants );  
    }, { live: true } );
    realdom.realtime( window.document ).subtree( config.attrSelector, record => {
        cleanup.call( this, ...record.exits );  
        mountInlineBindings.call( this, config, ...record.entrants );  
    }, { live: true, timing: 'sync', staticSensitivity: config.staticsensitivity } );
}

function createDynamicScope( config, root ) {
    const { webqit: { realdom, Observer, DOMBindingsContext } } = this;
    if ( _( root ).has( 'data-binding' ) ) return _( root ).get( 'data-binding' );
    const scope = Object.create( null ), abortController = new AbortController;
    scope[ '$exec__' ] = ( target, prop, ...args ) => {
        realdom.schedule( 'write', () => target[ prop ]( ...args ) );
    };
    scope[ '$assign__' ] = ( target, prop, val ) => {
        realdom.schedule( 'write', () => (target[ prop ] = val) );
    };
    Observer.intercept( scope, {
        get: ( e, recieved, next ) => {
            if ( !( e.key in scope ) ) {
                const request = { ...DOMBindingsContext.createRequest( e.key ), live: true, signal: abortController.signal };
                root[ config.CONTEXT_API.api.contexts ].request( request, value => {
                    Observer.set( scope, e.key, value );
                } );
            }
            return next( scope[ e.key ] ?? ( e.key in globalThis ? globalThis[ e.key ] : undefined ) );
        },
        has: ( e, recieved, next ) => { return next( true ); }
    } );
    const instance = { scope, abortController, bindings: new Map };
    _( root ).set( 'data-binding', instance );
    return instance;
}

function cleanup( ...entries ) {
    for ( const node of entries ) {
        const root = node.nodeName  === '#text' ? node.parentNode : node;
        const { bindings, abortController } = _( root ).get( 'data-binding' ) || {};
        if ( !bindings?.has( node ) ) return;
        bindings.get( node ).state.dispose();
        bindings.get( node ).signals?.forEach( s => s.abort() );
        bindings.delete( node );
        if ( !bindings.size ) {
            abortController.abort();
            _( root ).delete( 'data-binding' );
        }
    }
}

async function mountDiscreteBindings( config, ...entries ) {
    const window = this, { webqit: { QuantumAsyncFunction } } = window;
    const patternMatch = str => {
        const tagStart = config.tokens.tagStart.split( '' ).map( x => `\\${ x }` ).join( '' );
        const tagEnd = config.tokens.tagEnd.split( '' ).map( x => `\\${ x }` ).join( '' );
        const stateStart = config.tokens.stateStart.split( '' ).map( x => x === ' ' ? `(?:\\s+)?` : `\\${ x }` ).join( '' );
        const stateEnd = config.tokens.stateEnd.split( '' ).map( x => `\\${ x }` ).join( '' );
        const pattern = `^${ tagStart }(.*?)(?:${ stateStart }(\\d+)${ stateEnd }(?:\\s+)?)?${ tagEnd }$`;
        const [ /*raw*/, expr, span ] = str.match( new RegExp( pattern ) );
        return { raw: str, expr, span: parseInt( span ?? 0 ) };
    };

    const instances = entries.reduce( ( instances, node ) => {
        if ( node.isBound ) return instances;
        const template = patternMatch( node.nodeValue );
        let textNode = node;
        if ( template.span ) {
            textNode = node.nextSibling;
            if ( textNode?.nodeName !== '#text' || textNode.nodeValue.length < template.span ) return instances;
            if ( textNode.nodeValue.length > template.span ) { textNode.splitText( template.span ); }
        } else {
            textNode = node.ownerDocument.createTextNode( '' );
            node.after( textNode );
        }
        textNode.isBound = true;
        let anchorNode = node;
        if ( window.webqit.env !== 'server' ) {
            anchorNode.remove();
            anchorNode = null;
        }
        return instances.concat( { textNode, template, anchorNode } );
    }, [] );

    for ( const { textNode, template, anchorNode } of instances ) {
        const compiled = compileDiscreteBindings( config, template.expr );
        const { scope, bindings } = createDynamicScope.call( this, config, textNode.parentNode );
        Object.defineProperty( textNode, '$oohtml_internal_databinding_anchorNode', { value: anchorNode, configurable: true } );
        bindings.set( textNode, { state: await ( await compiled.bind( textNode, scope ) ).execute(), } );
    }
}

const discreteParseCache = new Map;
function compileDiscreteBindings( config, str ) {
    if ( discreteParseCache.has( str ) ) return discreteParseCache.get( str );
    let source = `let content = ((${ str }) ?? '') + '';`;
    source += `$assign__(this, 'nodeValue', content);`;
    source += `if ( this.$oohtml_internal_databinding_anchorNode ) { $assign__(this.$oohtml_internal_databinding_anchorNode, 'nodeValue', "${ config.tokens.tagStart }${ escDouble( str ) }${ config.tokens.stateStart }" + content.length + "${ config.tokens.stateEnd } ${ config.tokens.tagEnd }"); }`;
    const { webqit: { QuantumModule } } = this;
    const compiled = new QuantumModule( source );
    discreteParseCache.set( str, compiled );
    return compiled;
}

async function mountInlineBindings( config, ...entries ) {
    for ( const node of entries ) {
        const compiled = compileInlineBindings( config, node.getAttribute( config.attr.expr ) );
        const { scope, bindings } = createDynamicScope.call( this, config, node );
        const signals = [];
        Object.defineProperty( node, '$oohtml_internal_databinding_signals', { value: signals, configurable: true } );
        bindings.set( node, { signals, state: await ( await compiled.bind( node, scope ) ).execute(), } );
    }
}

const inlineParseCache = new Map;
function compileInlineBindings( config, str ) {
    if ( inlineParseCache.has( str ) ) return inlineParseCache.get( str );
    const validation = {};
    const source = splitOuter( str, ';' ).map( str => {
        const [ left, right ] = splitOuter( str, ':' ).map( x => x.trim() );
        const directive = left[ 0 ], param = left.slice( 1 ).trim();
        const arg = `(${ right })`, $arg = `(${ arg } ?? '')`;
        if ( directive === '&' ) {
            if ( param.startsWith( '--' ) ) return `$exec__(this.style, 'setProperty', "${ escDouble( param ) }", ${ $arg });`;
            return `$assign__(this.style, "${ escDouble( param ) }", ${ $arg });`;
        }
        if ( directive === '%' ) return `$exec__(this.classList, 'toggle', "${ escDouble( param ) }", !!${ arg });`;
        if ( directive === '~' ) {
            if ( param.startsWith( '?' ) ) return `$exec__(this, 'toggleAttribute', "${ escDouble( param.substring( 1 ).trim() ) }", !!${ arg });`;
            return `$exec__(this, 'setAttribute', "${ escDouble( param ) }", ${ $arg });`;
        }
        if ( directive === '@' ) {
            if ( validation[ param ] ) throw new Error( `Duplicate binding: ${ left }.` );
            validation[ param ] = true;
            if ( param === 'text' ) return `$assign__(this, 'textContent', ${ $arg });`;
            if ( param === 'html' ) return `$exec__(this, 'setHTML', ${ $arg });`;
            if ( param === 'items' ) {
                const [ iterationSpec, importSpec ] = splitOuter( right, '/' );
                if ( !importSpec ) throw new Error( `Invalid ${ directive }items spec: ${ str }; no import specifier.` );
                let [ raw, production, kind, iteratee ] = iterationSpec.trim().match( /(.*?[\)\s+])(of|in)([\(\{\[\s+].*)/i ) || [];
                if ( !raw ) throw new Error( `Invalid ${ directive }items spec: ${ str }.` );
                if ( production.startsWith( '(' ) ) {
                    production = production.trim().slice( 1, -1 ).split( ',' ).map( x => x.trim() );
                } else { production = [ production ]; }
                if ( production.length > ( kind === 'in' ? 3 : 2 ) ) throw new Error( `Invalid ${ directive }items spec: ${ str }.` );
                const indices = kind === 'in' ? production[ 2 ] : ( production[ 1 ] || '$index__' );
                return `
                let $iteratee__ = ${ iteratee };
                let $import__ = this.${ config.HTML_IMPORTS.context.api.import }( ${ importSpec.trim() }, true );
                this.$oohtml_internal_databinding_signals?.push( $import__ );

                if ( $import__.value && $iteratee__ ) {
                    let $existing__ = new Map;
                    this.querySelectorAll( '[${ config.attr.itemIndex }]' ).forEach( x => {
                        $existing__.set( x.getAttribute( '${ config.attr.itemIndex }' ), x );
                    } );
                    ${ indices ? `let ${ indices } = -1;` : '' }
                    for ( let ${ production[ 0 ] } ${ kind } $iteratee__ ) {
                        ${ indices ? `${ indices } ++;` : '' }
                        ${ kind === 'in' && production[ 1 ] ? `let ${ production[ 1 ] } = $iteratee__[ ${ production[ 0 ] } ];` : '' }
                        const $itemBinding__ = { ${ production.join( ', ' ) } };
                        
                        const $key___ = ( ${ kind === 'in' ? production[ 0 ] : indices } ) + '';
                        let $itemNode__ = $existing__.get( $key___ );
                        if ( $itemNode__ ) {
                            $existing__.delete( $key___ );
                            $exec__($itemNode__, '${ config.BINDINGS_API.api.bind }', $itemBinding__ );
                        } else {
                            $itemNode__ = ( Array.isArray( $import__.value ) ? $import__.value[ 0 ] : ( $import__.value instanceof window.HTMLTemplateElement ? $import__.value.content.firstElementChild : $import__.value ) ).cloneNode( true );
                            $itemNode__.setAttribute( "${ config.attr.itemIndex }", $key___ );
                            $exec__($itemNode__, '${ config.BINDINGS_API.api.bind }', $itemBinding__ );
                            $exec__(this, 'appendChild', $itemNode__ );
                        }

                        if ( ${ kind === 'in' ? `!( ${ production[ 0 ] } in $iteratee__ )` : `typeof ${ production[ 0 ] } === 'undefined'` } ) { $itemNode__.remove(); }
                    }
                    $existing__.forEach( x => x.remove() );
                    $existing__.clear();
                }`;
            }
        }
        if ( str.trim() ) throw new Error( `Invalid binding: ${ str }.` );
    } ).join( `\n` );
    const { webqit: { QuantumModule } } = this;
    const compiled = new QuantumModule( source );
    inlineParseCache.set( str, compiled );
    return compiled;
}

export function splitOuter( str, delim ) {
    return [ ...str ].reduce( ( [ quote, depth, splits, skip ], x ) => {
        if ( !quote && depth === 0 && ( Array.isArray( delim ) ? delim : [ delim ] ).includes( x ) ) {
            return [ quote, depth, [ '' ].concat( splits ) ];
        }
        if ( !quote && [ '(', '[', '{' ].includes( x ) && !splits[ 0 ].endsWith( '\\' ) ) depth++;
        if ( !quote && [ ')', ']', '}' ].includes( x ) && !splits[ 0 ].endsWith( '\\' ) ) depth--;
        if ( [ '"', "'", '`' ].includes( x ) && !splits[ 0 ].endsWith( '\\' ) ) {
            quote = quote === x ? null : ( quote || x );
        }
        splits[ 0 ] += x;
        return [ quote, depth, splits ]
    }, [ null, 0, [ '' ] ] )[ 2 ].reverse();
}

const escDouble = str => str.replace(/"/g, '\\"');
