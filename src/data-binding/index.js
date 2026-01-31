import { resolveParams } from '@webqit/use-live/params';
import { xpathQuery } from '@webqit/realdom/src/realtime/Util.js';
import { _wq, _init, _splitOuter } from '../util.js';

export default function init( $config = {} ) {
    const { config, window } = _init.call( this, 'data-binding', $config, {
        attr: { render: 'render', itemIndex: 'data-key' },
        tokens: { nodeType: 'processing-instruction', tagStart: '?{', tagEnd: '}?', stateStart: '; [=', stateEnd: ']' },
        advanced: resolveParams({ runtimeParams: { spec: { handler: e => {} } } }),
    } );
    ( { CONTEXT_API: config.CONTEXT_API, BINDINGS_API: config.BINDINGS_API, HTML_IMPORTS: config.HTML_IMPORTS } = window.webqit.oohtml.configs );
    config.attrSelector = `[${ window.CSS.escape( config.attr.render ) }]`;
    const discreteBindingsMatch = ( start, end ) => {
        const starting = `starts-with(., "${ start }")`;
        const ending = `substring(., string-length(.) - string-length("${ end }") + 1) = "${ end }"`;
        return `${ starting } and ${ ending }`;
    }
    config.discreteBindingsSelector = `comment()[${ discreteBindingsMatch( config.tokens.tagStart, config.tokens.tagEnd ) }]`;
    realtime.call( window, config );
}

function realtime( config ) {
    const window = this, { webqit: { realdom } } = window;
	// ----------------
    realdom.realtime( window.document ).query( config.attrSelector, record => {
        record.exits.forEach(( e ) => {
            if ( !e.isConnected && e.getAttribute( config.attr.render )?.includes( '@@disconnected' ) ) {
                e.dispatchEvent( new Event( '@disconnected' ) );
            }
        } );
        cleanup.call( this, ...record.exits );
        mountInlineBindings.call( window, config, ...record.entrants );
        queueMicrotask(() => {
        });
    }, { id: 'data-binding:attr', live: true, subtree: 'cross-roots', timing: 'sync', eventDetails: true, staticSensitivity: true } );
    realdom.realtime( window.document ).query( `(${ config.discreteBindingsSelector })`, record => {
        cleanup.call( this, ...record.exits );
        mountDiscreteBindings.call( window, config, ...record.entrants );
        queueMicrotask(() => {
        });
    }, { id: 'data-binding:descrete', live: true, subtree: 'cross-roots', timing: 'sync' } );
}

function createDynamicScope( config, root ) {
    const { webqit: { realdom, Observer, DOMBindingsContext } } = this;
    if ( _wq( root ).has( 'data-binding' ) ) return _wq( root ).get( 'data-binding' );
    const scope = Object.create( null ), abortController = new AbortController;
    scope[ '$exec__' ] = ( target, prop, ...args ) => {
        const exec = () => {
            try { target[ prop ]( ...args ); }
            catch( e ) { throw new Error( `Error executing "${ prop }()": ${ e.message } at ${ e.cause }` ); }
        };
        exec();
    };
    scope[ '$assign__' ] = ( target, prop, val ) => {
        const exec = () => {
            try { target[ prop ] = val; }
            catch( e ) { throw new Error( `Error executing "${ prop } = ${ val }": ${ e.message } at ${ e.cause }` ); }
        };
        exec();
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
    _wq( root ).set( 'data-binding', instance );
    return instance;
}

function cleanup( ...entries ) {
    for ( const node of entries ) {
        const root = node.nodeName  === '#text' ? node.parentNode : node;
        const { bindings, abortController } = _wq( root ).get( 'data-binding' ) || {};
        if ( !bindings?.has( node ) ) return;
        bindings.get( node ).liveProgramHandle.abort();
        bindings.get( node ).signals?.forEach( s => s.abort() );
        bindings.delete( node );
        if ( !bindings.size ) {
            abortController.abort();
            _wq( root ).delete( 'data-binding' );
        }
    }
}

function patternMatch( config, str ) {
    const tagStart = config.tokens.tagStart.split( '' ).map( x => `\\${ x }` ).join( '' );
    const tagEnd = config.tokens.tagEnd.split( '' ).map( x => `\\${ x }` ).join( '' );
    const stateStart = config.tokens.stateStart.split( '' ).map( x => x === ' ' ? `(?:\\s+)?` : `\\${ x }` ).join( '' );
    const stateEnd = config.tokens.stateEnd.split( '' ).map( x => `\\${ x }` ).join( '' );
    const pattern = `^${ tagStart }(.*?)(?:${ stateStart }(\\d+)${ stateEnd }(?:\\s+)?)?${ tagEnd }$`;
    const [ /*raw*/, expr, span ] = str.match( new RegExp( pattern ) );
    return { raw: str, expr, span: parseInt( span ?? 0 ) };
}

async function mountDiscreteBindings( config, ...entries ) {
    const window = this;
    const instances = entries.reduce( ( instances, node ) => {
        if ( node.isBound ) return instances;
        const template = patternMatch( config, node.nodeValue );
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
        const compiled = compileDiscreteBindings.call( window, config, template.expr );
        const { scope, bindings } = createDynamicScope.call( this, config, textNode.parentNode );
        Object.defineProperty( textNode, '$oohtml_internal_databinding_anchorNode', { value: anchorNode, configurable: true } );
        try {
            bindings.set( textNode, { liveProgramHandle: await ( await compiled.bind( textNode, scope ) ).execute(), } );
        } catch( e ) {
            console.log(e);
        }
    }
}

const discreteParseCache = new Map;
function compileDiscreteBindings( config, str ) {
    if ( discreteParseCache.has( str ) ) return discreteParseCache.get( str );
    let source = `let content = ((${ str }) ?? '') + '';`;
    source += `$assign__(this, 'nodeValue', content);`;
    source += `if ( this.$oohtml_internal_databinding_anchorNode ) { $assign__(this.$oohtml_internal_databinding_anchorNode, 'nodeValue', "${ config.tokens.tagStart }${ escDouble( str ) }${ config.tokens.stateStart }" + content.length + "${ config.tokens.stateEnd } ${ config.tokens.tagEnd }"); }`;
    const { webqit: { LiveScript, AsyncLiveScript } } = this;
    const { parserParams, compilerParams, runtimeParams } = config.advanced;
    const compiled = new (LiveScript || AsyncLiveScript)( source, { parserParams, compilerParams, runtimeParams } );
    discreteParseCache.set( str, compiled );
    return compiled;
}

async function mountInlineBindings( config, ...entries ) {
    for ( const node of entries ) {
        const compiled = compileInlineBindings.call( this, config, node.getAttribute( config.attr.render ) );
        const { scope, bindings } = createDynamicScope.call( this, config, node );
        const signals = [];
        Object.defineProperty( node, '$oohtml_internal_databinding_signals', { value: signals, configurable: true } );
        try {
            bindings.set( node, { signals, liveProgramHandle: await ( await compiled.bind( node, scope ) ).execute(), } );
        } catch( e ) {
            console.log(e);
        }
    }
}

const inlineParseCache = new Map;
function compileInlineBindings( config, str ) {
    if ( inlineParseCache.has( str ) ) return inlineParseCache.get( str );
    const validation = {};
    let $event_i = -1;
    const source = _splitOuter( str, ';' ).map( str => {
        const [ left, right ] = _splitOuter( str, ':' ).map( x => x.trim() );
        const directive = left[ 0 ], param = left.slice( 1 ).trim();
        const arg = `(${ right })`, $arg = `(${ arg } ?? '')`;
        // Functions
        if ( directive === '$' ) {
            return `$exec__(this, '${ param }', ${ arg });`;
        }
        // CSS
        if ( directive === '&' ) {
            if ( param.startsWith( '--' ) ) return `$exec__(this.style, 'setProperty', "${ escDouble( param ) }", ${ $arg });`;
            return `$assign__(this.style, "${ escDouble( param ) }", ${ $arg });`;
        }
        // Class list
        if ( directive === '%' ) return `$exec__(this.classList, 'toggle', "${ escDouble( param ) }", !!${ arg });`;
        // Attribute
        if ( directive === '~' ) {
            if ( param.startsWith( '?' ) ) return `$exec__(this, 'toggleAttribute', "${ escDouble( param.substring( 1 ).trim() ) }", !!${ arg });`;
            return `$exec__(this, 'setAttribute', "${ escDouble( param ) }", ${ $arg });`;
        }
        // Structure
        if ( directive === '#' ) {
            if ( validation[ param ] ) throw new Error( `Duplicate binding: ${ left }.` );
            validation[ param ] = true;
            if ( param === 'text' ) return `$assign__(this, 'textContent', ${ $arg });`;
            if ( param === 'html' ) return `$assign__(this, 'innerHTML', ${ $arg });`;
            if ( param === 'items' ) {
                const [ iterationSpec, importSpec ] = _splitOuter( right, '/' );
                if ( !importSpec ) throw new Error( `Invalid ${ directive }items spec: ${ str }; no import specifier.` );
                let [ raw, production, kind, iteratee ] = iterationSpec.trim().match( /(.*?[\)\s+])(of|in)([\(\{\[\s+].*)/i ) || [];
                if ( !raw ) throw new Error( `Invalid ${ directive }items spec: ${ str }.` );
                if ( production.startsWith( '(' ) ) {
                    production = production.trim().slice( 1, -1 ).split( ',' ).map( x => x.trim() );
                } else { production = [ production ]; }
                if ( production.length > ( kind === 'in' ? 3 : 2 ) ) throw new Error( `Invalid ${ directive }items spec: ${ str }.` );
                const indices = kind === 'in' ? production[ 2 ] : ( production[ 1 ] || '$index__' );
                const src = `
                let $iteratee__ = ${ iteratee };
                let $import__ = this.${ config.HTML_IMPORTS.api.import }( ${ importSpec.trim() }, true );
                this.$oohtml_internal_databinding_signals?.push( $import__ );
                if ( $import__.value && $iteratee__ ) {
                    let $existing__ = new Map;
                    [ ...this.children ].filter( el => el.matches( '[${ config.attr.itemIndex }]' ) ).forEach( x => {
                        $existing__.set( x.getAttribute( '${ config.attr.itemIndex }' ), x );
                    } );
                    ${ indices ? `let ${ indices } = -1;` : '' }
                    for ( let ${ production[ 0 ] } ${ kind } $iteratee__ ) {
                        ${ indices ? `${ indices } ++;` : '' }
                        ${ kind === 'in' && production[ 1 ] ? `let /*value*/${ production[ 1 ] } = $iteratee__[ ${ production[ 0 ] } ];` : '' }
                        let $itemBinding__ = { ${ production.join( ', ' ) } };
                        
                        const $key___ = ( ${ kind === 'in' ? production[ 0 ] : indices } ) + '';
                        let $itemNode__ = $existing__.get( $key___ );
                        if ( $itemNode__ ) {
                            $existing__.delete( $key___ );
                            $exec__($itemNode__, '${ config.BINDINGS_API.api.bind }', $itemBinding__ );
                        } else {
                            $itemNode__ = ( Array.isArray( $import__.value ) ? $import__.value[ 0 ] : ( $import__.value?.nodeName === 'TEMPLATE' ? $import__.value.content.firstElementChild : $import__.value ) ).cloneNode( true );
                            $itemNode__.setAttribute( "${ config.attr.itemIndex }", $key___ );
                            $exec__($itemNode__, '${ config.BINDINGS_API.api.bind }', $itemBinding__ );
                            $exec__(this, 'appendChild', $itemNode__ );
                        }

                        if ( ${ kind === 'in' ? `!( ${ production[ 0 ] } in $iteratee__ )` : `typeof ${ production[ 0 ] } === 'undefined'` } ) { $itemNode__.remove(); }
                    }
                    $existing__.forEach( x => x.remove() );
                    $existing__.clear();
                }`;
                return src;
            }
        }
        // Events
        if ( directive === '@' ) {
            if ( param === '@connected' ) {
                return `${arg};`;
            }
            $event_i++;
            return `
                const handler${ $event_i } = event => ${ right.startsWith('{') ? right : arg };
                this.addEventListener( '${ param }', handler${ $event_i }${ param === '@disconnected' ? ', { once: true }' : '' } );
                const abort${ $event_i } = () => this.removeEventListener( '${ param }', handler${ $event_i } );
                this.$oohtml_internal_databinding_signals?.push( { abort: abort${ $event_i } } );
            `;
        }
        if ( str.trim() ) throw new Error( `Invalid binding: ${ str }.` );
    } ).join( `\n` );
    const { webqit: { LiveScript, AsyncLiveScript } } = this;
    const { parserParams, compilerParams, runtimeParams } = config.advanced;
    const compiled = new (LiveScript || AsyncLiveScript)( source, { parserParams, compilerParams, runtimeParams } );
    inlineParseCache.set( str, compiled );
    return compiled;
}

const escDouble = str => str.replace(/"/g, '\\"');

export function idleCompiler( node ) {
    const window = this, { webqit: { oohtml: { configs: { DATA_BINDING: config } } } } = window;
    // Attr selector must also come first, as in above
    ( node?.matches( config.attrSelector ) ? [ node ] : [] ).concat([ ...( node?.querySelectorAll( config.attrSelector ) || [] ) ]).forEach( node => {
        compileInlineBindings.call( window, config, node.getAttribute( config.attr.render ) );
    } );
    xpathQuery( window, node, `(${ config.discreteBindingsSelector })` ).forEach( node => {
        const template = patternMatch( config, node.nodeValue );
        compileDiscreteBindings.call( window, config, template.expr );
    } );
}