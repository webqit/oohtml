
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { HTMLContext } from '../context-api/index.js';
import _HTMLBindingsProvider from '../bindings-api/_HTMLBindingsProvider.js';
import { StatefulAsyncFunction } from '@webqit/stateful-js/async';
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
        attr: { bind: 'bind', itemIndex: 'data-index' },
        tokens: { nodeType: 'processing-instruction', tagStart: '?{', tagEnd: '}?', stateStart: '; [=', stateEnd: ']' },
        staticsensitivity: true,
        isomorphic: true,
    } );
    config.api = {
        bind: window.webqit.oohtml.configs.BINDINGS_API.api.bind,
        import: window.webqit.oohtml.configs.HTML_IMPORTS.context.api.import,
    };
    config.attrSelector = `[${ window.CSS.escape( config.attr.bind ) }]`;
    const braceletMatch = ( start, end ) => {
        const starting = `starts-with(., "${ start }")`;
        const ending = `substring(., string-length(.) - string-length("${ end }") + 1) = "${ end }"`;
        return `${ starting } and ${ ending }`;
    }
    config.braceletSelector = `comment()[${ braceletMatch( config.tokens.tagStart, config.tokens.tagEnd ) }]`;
    window.webqit.Observer = Observer;
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
    const window = this, { realdom } = window.webqit;
	// ----------------
    realdom.realtime( window.document ).subtree( `(${ config.braceletSelector })`, record => {
        cleanup.call( this, ...record.exits );  
        mountBracelets.call( this, config, ...record.entrants );  
    }, { live: true } );
    realdom.realtime( window.document ).subtree( config.attrSelector, record => {
        cleanup.call( this, ...record.exits );  
        mountInlineSubscript.call( this, config, ...record.entrants );  
    }, { live: true, timing: 'sync', staticSensitivity: config.staticsensitivity } );
}

function createDynamicScope( root ) {
    if ( _( root ).has( 'subscripts' ) ) return _( root ).get( 'subscripts' );
    const scope = {}, abortController = new AbortController;
    scope.$set = function( node, prop, val ) {
        node && ( node[ prop ] = val );
    }
    Observer.intercept( scope, {
        get: ( e, recieved, next ) => {
            if ( !( e.key in scope ) ) {
                const request = _HTMLBindingsProvider.createRequest( { detail: e.key, live: true, signal: abortController.signal } );
                HTMLContext.instance( root ).request( request, value => {
                    Observer.set( scope, e.key, value );
                } );
            }
            return next( scope[ e.key ] ?? ( e.key in globalThis ? globalThis[ e.key ] : undefined ) );
        },
        has: ( e, recieved, next ) => { return next( true ); }
    } );
    const instance = { scope, abortController, subscripts: new Map };
    _( root ).set( 'subscripts', instance );
    return instance;
}

function cleanup( ...entries ) {
    for ( const node of entries ) {
        const root = node.nodeName  === '#text' ? node.parentNode : node;
        const { subscripts, abortController } = _( root ).get( 'subscripts' ) || {};
        if ( !subscripts?.has( node ) ) return;
        subscripts.get( node ).state.dispose();
        subscripts.get( node ).signals.forEach( s => s.abort() );
        subscripts.delete( node );
        if ( !subscripts.size ) {
            abortController.abort();
            _( root ).delete( 'subscripts' );
        }
    }
}

async function mountBracelets( config, ...entries ) {
    const window = this;
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
        if ( node.isBracelet ) return instances;
        const template = patternMatch( node.nodeValue );
        let textNode = node;
        if ( template.span ) {
            textNode = node.nextSibling;
            if ( textNode?.nodeName !== '#text' || textNode.nodeValue.length < template.span ) return instances;
            if ( textNode.nodeValue.length > template.span ) { textNode.splitText( template.span ); }
        } else if ( node.nextSibling ) {
            textNode = node.parentNode.insertBefore( node.ownerDocument.createTextNode( '' ), node.nextSibling );
        } else { textNode = node.parentNode.appendChild( node.ownerDocument.createTextNode( '' ) ); }
        textNode.isBracelet = true;
        let stateNode = node;
        if ( window.webqit.env !== 'server' ) {
            stateNode.remove();
            stateNode = null;
        }
        return instances.concat( { textNode, template, stateNode } );
    }, [] );

    for ( const { textNode, template, stateNode } of instances ) {
        const { scope: env, subscripts } = createDynamicScope( textNode.parentNode );
        let source = '';
        source += `let content = ((${ template.expr }) ?? '') + '';`;
        source += `$set(this, 'nodeValue', content);`;
        if ( stateNode ) { source += `$set($stateNode__, 'nodeValue', \`${ config.tokens.tagStart }${ template.expr }${ config.tokens.stateStart }\` + content.length + \`${ config.tokens.stateEnd } ${ config.tokens.tagEnd }\`);`; }
        const compiled = new StatefulAsyncFunction( '$signals__', `$stateNode__`, source, { env } );
        const signals = [];
        subscripts.set( textNode, { compiled, signals, state: await compiled.call( textNode, signals, stateNode ), } );
    }
}

async function mountInlineSubscript( config, ...entries ) {
    for ( const node of entries ) {
        const source = parseInlineBindings( config, node.getAttribute( config.attr.bind ) );
        const { scope: env, subscripts } = createDynamicScope( node );
        const compiled = new StatefulAsyncFunction( '$signals__', source, { env } );
        const signals = [];
        subscripts.set( node, { compiled, signals, state: await compiled.call( node, signals ), } );
    }
}

const parseCache = new Map;
function parseInlineBindings( config, str ) {
    if ( parseCache.has( str ) ) return parseCache.get( str );
    const validation = {};
    const source = splitOuter( str, ';' ).map( str => {
        const [ left, right ] = splitOuter( str, ':' ).map( x => x.trim() );
        const token = left[ 0 ], param = left.slice( 1 ).trim();
        const $expr = `(${ right })`, $$expr = `(${ $expr } ?? '')`;
        if ( token === '&' ) return `this.style[\`${ param }\`] = ${ $$expr };`;
        if ( token === '%' ) return `this.classList.toggle(\`${ param }\`, !!${ $expr });`;
        if ( token === '@' ) {
            if ( param.endsWith( '?' ) ) return `this.toggleAttribute(\`${ param.substring( 0, -1 ).trim() }\`, !!${ $expr });`;
            return `this.setAttribute(\`${ param }\`, ${ $$expr });`;
        }
        if ( token === '~' ) {
            if ( validation[ param ] ) throw new Error( `Duplicate binding: ${ left }.` );
            validation[ param ] = true;
            if ( param === 'text' ) return `$set(this, 'textContent', ${ $$expr });`;
            if ( param === 'html' ) return `this.setHTML(${ $$expr });`;
            if ( param === 'items' ) {
                const [ iterationSpec, importSpec ] = splitOuter( right, '/' );
                let [ raw, production, kind, iteratee ] = iterationSpec.trim().match( /(.*?[\)\s+])(of|in)([\(\{\[\s+].*)/i ) || [];
                if ( !raw ) throw new Error( `Invalid ${ token }items spec: ${ str }.` );
                if ( production.startsWith( '(' ) ) {
                    production = production.trim().slice( 1, -1 ).split( ',' ).map( x => x.trim() );
                } else { production = [ production ]; }
                if ( production.length > ( kind === 'in' ? 3 : 2 ) ) throw new Error( `Invalid ${ token }items spec: ${ str }.` );
                const indices = kind === 'in' ? production[ 2 ] : ( production[ 1 ] || '$index__' );
                return `
                let $iteratee__ = ${ iteratee };
                let $import__ = this.${ config.api.import }( ${ importSpec.trim() }, true );
                $signals__.push( $import__ );

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
                        } else {
                            $itemNode__ = ( Array.isArray( $import__.value ) ? $import__.value[ 0 ] : ( $import__.value.content ? $import__.value.content.firstElementChild : $import__.value ) ).cloneNode( true );
                            $itemNode__.setAttribute( "${ config.attr.itemIndex }", $key___ );
                            this.appendChild( $itemNode__ );
                        }
                        
                        $itemNode__.${ config.api.bind }( $itemBinding__ );
                        if ( ${ kind === 'in' ? `!( ${ production[ 0 ] } in $iteratee__ )` : `typeof ${ production[ 0 ] } === 'undefined'` } ) { $itemNode__.remove(); }
                    }
                    $existing__.forEach( x => x.remove() );
                    $existing__.clear();
                }`;
            }
        }
        if ( str.trim() ) throw new Error( `Invalid binding: ${ str }.` );
    } ).join( `\n` );
    parseCache.set( str, source );
    return source;
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