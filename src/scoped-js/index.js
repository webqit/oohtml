
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import { SubscriptFunction } from '@webqit/subscript';
import { _internals, _isFunction, _isNumeric } from '@webqit/util/js/index.js';
import Observable from '../Observable.js';





/**
 * Internals shorthand.
 * 
 * @param Any el 
 * @param Array args 
 * 
 * @return Any
 */
const _ = ( el, ...args ) => _internals( el, 'oohtml', ...args );

/**
 * @Exports
 * 
 * The internal Namespace object
 * within elements and the document object.
 */
function classes( params ) {
	const window = this, { Observer } = window.wq;
    // --------------------
	class SubscriptElement {

        /**
         * @params
         */
        static get subscriptParams() { return { ...( params.subscriptParams || {} ), globalsAutoObserve: [ 'document' ] }; }
        static get compilerParams() { return { ...( params.compilerParams || {} ) }; }
        static get runtimeParams() { return { ...( params.runtimeParams || {} ) }; }

        /**
         * Create a new SubscriptElement class that extends the given base class.
         * 
         * @param Class   BaseElement
         * 
         * @return Class
         */
        static extend( BaseElement ) {
            class ExtendedSubscriptElement extends BaseElement {
                static get subscriptMethods() { return []; }
                constructor() {
                    super();
                    this.constructor.subscriptMethods.forEach( methodName => {
                        if ( !this[ methodName ] ) { throw new Error( `[static get subscriptMethods()]: "${ methodName }" is not a method.` ); }
                        if ( methodName === 'constructor' ) { throw new Error( `Class constructors cannot be subscript methods.` ); }
                        this[ methodName ] = SubscriptElement.addMethod( this, this[ methodName ] );
                    } );
                }
                connectedCallback() {
                    // Often needed on second-time addition to the DOM, as removal from DOM would have disconnected observation.
                    // Otherwise, the hook - collection.observe( 'set', '*' ) below - should suffice
                    connectedCallback.call( this );
                    if ( super.connectedCallback ) super.connectedCallback();
                }
                disconnectedCallback() {
                    disconnectedCallback.call( this );
                    if ( super.disconnectedCallback ) super.disconnectedCallback();
                }
            }
            return ExtendedSubscriptElement;
        }

        /**
         * Inspects an element instance and returns all Subscript runtimes
         * - runtimes of both methods and scripts.
         * 
         * @param Element   element
         * 
         * @return Map
         */
        static inspect( element ) {
            let collection = _( element ).get( 'runtimes' );
            if ( !collection ) {
                collection = new Observable;
                collection.observe( 'set', '*', value => {
                    // Validate...
                    if ( !_isFunction( value ) || !_isFunction( value.thread ) ) { throw new Error( `Values must be a SubscriptFunction.` ); }
                    // Start observing?
                    if ( collection.size === 1 ) { connectedCallback.call( element ); }
                } );
                collection.observe( 'delete', '*', () => {
                    // Stop observing?
                    if ( !collection.size ) { disconnectedCallback.call( element ); }
                } );
                _( element ).set( 'runtimes', collection );
            }
            return collection;
        }

        /**
         * Executes a script in the context of the given element.
         * 
         * @param Element   element
         * @param <script>|String   script
         * 
         * @return Function
         */
        static compile( element, script ) {
            const source = ( typeof script === 'string' ? script : ( script.textContent || '' ) ).trim();
            return integrateRuntime( element, SubscriptFunction.call( element, source, { compilerParams: this.compilerParams, runtimeParams: this.runtimeParams } ) );
        }

        /**
         * Transforms a function to a method on the given element.
         * 
         * @param Element   element
         * @param Function   script
         * 
         * @return Function
         */
        static addMethod( element, method ) {
            const subscriptFunction = SubscriptFunction.clone( method, element, this.compilerParams, this.runtimeParams );
            return integrateRuntime( element, subscriptFunction );
        }

    }
    function integrateRuntime( element, subscriptFunction ) {
        const collection = SubscriptElement.inspect( element );
        let id = subscriptFunction.name;
        if ( !id ) { id = [ ...collection.keys() ].filter( k => _isNumeric( k ) ).length; }
        collection.set( id, subscriptFunction );
        return subscriptFunction;
    }
    function connectedCallback() {
        if ( !Observer || _( this ).get( 'realtime' ) ) return;
        const collection = SubscriptElement.inspect( this );
        const signals = ( mutations, evt, namespace = [] ) => {
            collection.forEach( runtime => runtime.thread( ...mutations.map( mu => namespace.concat( mu.path ) ) ) );
        };
        ( SubscriptElement.subscriptParams.globalsAutoObserve || [] ).forEach( identifier => {
            Observer.observe( window[ identifier ], mutations => signals( mutations, null, [ identifier ] ), { 
                subtree: true, diff: true, tags: [ this, 'subscript-element', identifier ], unique: true
            } );
        } );
        Observer.observe( this, mutations => signals( mutations, null, [ 'this' ] ), { 
            subtree: true, diff: true, tags: [ this, 'subscript-element', 'this' ], unique: true
        } );
        _( this ).set( 'realtime', true );
    }
    function disconnectedCallback() {
        if ( !Observer || !_( this ).get( 'realtime' ) ) return;
        ( SubscriptElement.subscriptParams.globalsAutoObserve || [] ).forEach( identifier => {
            Observer.unobserve( window[ identifier ], null, null, { 
                subtree: true, tags: [ this, 'subscript-element', identifier ]
            } );
        } );
        Observer.unobserve( this, null, null, { 
            subtree: true, tags: [ this, 'subscript-element', 'this' ]
        } );
        _( this ).set( 'realtime', false );
    }
    // --------------------
	window.wq.SubscriptElement = SubscriptElement;
	return { SubscriptElement };
}

// ------------------
// Token JavaScript source
export function tokenize( source, _callback ) {
    const lastI = source.length - 1;
    return [ ...source ].reduce( ( [ splits, meta, skip ], char, i ) => {
        
        if ( skip ) {
            splits[ 0 ] += char;
            return [ splits, meta, --skip ];
        }
        let callbackReturn;

        if ( meta.openQuote || meta.openComment ) {
            if ( char === meta.openQuote ) {
                meta.openQuote = null;
                callbackReturn = _callback( splits, 'end-quote', char, meta, i, i === lastI );
            } else if ( meta.openQuote ) {
                callbackReturn = _callback( splits, 'ongoing-quote', char, meta, i, i === lastI );
            } else if ( meta.openComment ) {
                if ( ( meta.openComment === '//' && char === `\n` ) || ( meta.openComment === '/*' && splits[ 0 ].substr( -1 ) === '*' && char === '/' ) ) {
                    meta.openComment = null;
                    callbackReturn = _callback( splits, 'end-comment', char, meta, i, i === lastI );
                }
            }
            if ( callbackReturn !== false ) {
                splits[ 0 ] += char;
            }
            return [ splits, meta, typeof callbackReturn === 'number' ? callbackReturn : skip ];
        }

        let enclosure;
        if ( enclosure = [ '()', '{}', '[]' ].filter( pair => char === pair[ 0 ] )[ 0 ] ) {
            callbackReturn = _callback( splits, 'start-enclosure', char, meta, i, i === lastI );
            meta.openEnclosures.unshift( enclosure );
        } else if ( meta.openEnclosures.length && char === meta.openEnclosures[ 0 ][ 1 ] ) {
            meta.openEnclosures.shift();
            callbackReturn = _callback( splits, 'end-enclosure', char, meta, i, i === lastI );
        } else if ( [ '"', "'", "`" ].includes( char ) ) {
            callbackReturn = _callback( splits, 'start-quote', char, meta, i, i === lastI );
            meta.openQuote = char;
        } else if ( !meta.openComment && [ '/*', '//' ].includes( source.substring( i, 2 ) ) ) {
            callbackReturn = _callback( splits, 'start-comment', char, meta, i, i === lastI );
            meta.openComment = source.substring( i, 2 );
        } else {
            callbackReturn = _callback( splits, 'char', char, meta, i, i === lastI );
        }

        if ( callbackReturn !== false ) {
            splits[ 0 ] += char;
        }
        return [ splits, meta, typeof callbackReturn === 'number' ? callbackReturn : skip ];

    }, [ [ '' ], { openEnclosures: [], }, 0 ] );
}

// ------------------
// Parse import statements
function parseImportStmt( str ) {
    const getUrl = str => {
        let quo = /^[`'"]/.exec( str );
        return quo && str.substring( 1, str.lastIndexOf( quo[ 0 ] ) );
    }
    let _import = { items: [ { id: '' } ] }, _str = str.replace( 'import', '' ).trim();
    if ( !( _import.url = getUrl( _str ) ) ) {
        tokenize( _str, ( splits, event, char, meta, i, isLastChar ) => {
            if ( [ 'start-quote', 'ongoing-quote', 'end-quote', 'char' ].includes( event ) ) {
                if ( _import.url ) return;
                if ( !meta.openQuote ) {
                    let remainder = _str.substring( i );
                    if ( char === ',' ) {
                        _import.items.unshift( { id: '' } );
                        return;
                    }
                    if ( remainder.startsWith( ' as ' ) ) {
                        _import.items[ 0 ].alias = '';
                        return 3;
                    }
                    if ( remainder.startsWith( ' from ' ) ) {
                        _import.url = getUrl( remainder.replace( 'from', '' ).trim() );
                        return remainder.length;
                    }
                }
                if ( 'alias' in _import.items[ 0 ] ) {
                    _import.items[ 0 ].alias += char;
                } else {
                    _import.items[ 0 ].id += char;
                    if ( meta.openEnclosures.length ) {
                        _import.items[ 0 ].enclosed = true;
                    }
                }
            }
        } );
    }
    _import.items = _import.items
        .map( item => ( {
            id: item.id && !item.alias && !item.enclosed ? 'default' : item.id.trim(),
            alias: item.alias ? item.alias.trim() : item.id.trim(),
        } ) )
        .filter( item => item.id )
        .reverse();
    return _import;
}

// ------------------
// Match import statements
// and detect top-level await
export function analyzeSource( source, parseImports = false ) {
    const [ tokens, meta ] = tokenize( source, ( splits, event, char, meta, i, isLastChar ) => {
        
        if ( event === 'start-enclosure' && char === '{' && !meta.openAsync?.type && meta.openEnclosures.length === meta.openAsync?.scopeId ) {
            meta.openAsync.type = 'block';
        } else if ( event === 'end-enclosure' && char === '}' && meta.openAsync?.type === 'block' && meta.openEnclosures.length === meta.openAsync.scopeId ) {
            meta.openAsync = null;
        } else if ( event === 'start-quote' && !meta.openEnclosures.length && [ 'starting', 'from' ].includes( meta.openImport ) ) {
            meta.openImport = 'url';
        } else if ( event === 'end-quote' && meta.openImport === 'url' ) {
            meta.openImport = 'closing';
        } else if ( event === 'char' ) {

            if ( meta.openImport === 'closing' && (
                char === ';'/* explicit */ || ![ ' ', `\n` ].includes( char )/* implicit */ || isLastChar
            ) ) {
                if ( char === ';' || i === lastI ) {
                    splits[ 0 ] += char;
                    splits.unshift( '' );
                } else { splits.unshift( char ); }
                meta.openImport = null;
                return false;
            }

            let remainder = source.substring( i - 1 );

            if ( !meta.openImport && /^[\W]?import /.test( remainder ) ) {
                meta.openImport = 'starting';
                splits.unshift( '' );
                return 6;
            }
            if ( meta.openImport === 'starting' && /^[\W]?from /.test( remainder ) ) {
                meta.openImport = 'from';
                return 4;
            }
            if ( !meta.openAsync ) {
                if ( /^[\W]?async /.test( remainder ) ) {
                    meta.openAsync = { scopeId: meta.openEnclosures.length };
                    return 5;
                }
                if ( /^[\W]?await /.test( remainder ) ) {
                    meta.topLevelAwait = true;
                    return 5;
                }
            }
            if ( meta.openAsync ) {
                if ( !meta.openAsync.type && /.?\=\>[ ]*?\{/.test( remainder ) ) {
                    meta.openAsync.type = 'inline-arrow';
                } else if ( meta.openAsync.type === 'inline-arrow' && [ `\n`, ';' ].includes( char ) && meta.openEnclosures.length === meta.openAsync.scopeId ) {
                    meta.openAsync = null;
                }
            }

        }

    } );
    // Hoist all import statements
    let imports = [], body = '', _str;
    for ( const str of tokens.reverse() ) {
        if ( ( _str = str.trim() ).startsWith( 'import ' ) ) {
            if ( parseImports ) { imports.push( parseImportStmt( str ) ); }
            else { imports.push( str ); }
        } else if ( _str ) { body += str; }
    }

    return [ imports, body, meta ];
}

// ------------------
// Unique ID generator
const uniqId = () => (0|Math.random()*9e6).toString(36);

// ------------------
// JAVASCRIPT::[SCOPED]
export function handleScopedJS( script, shared = true ) {
    const uiid = uniqId();
    let imports = [], body = script.textContent, meta = {};
    if ( /(import |await )/.test( body ) ) {
        [ imports, body, meta ] = analyzeSource( body, shared );
    }
    let func;
    if ( shared && imports.length ) {
        imports = imports.reduce( ( _imports, _import ) => {
            const importSource = `await import("${ _import.url }")`;
            const [ main, others ] = _import.items.reduce( ( [ main, others ], item ) => {
                return item.id === '*' ? [ item.alias, others ] : [ main, others.concat( item ) ];
            }, [ null, [] ] );
            if ( main ) {
                // const main = await import("url");
                _imports = _imports.concat( `const ${ main } = ${ importSource };` );
            }
            if ( others.length ) {
                // const { aa: bb, cc } = main | await import("url");
                const importSpec = others.map( item => `${ item.id }${ item.id !== item.alias ? `: ${ item.alias }` : '' }` ).join( ', ' );
                const _importSource = `${ main ? main : importSource };`;
                _imports = _imports.concat( `const { ${ importSpec } } = ${ _importSource }` );
            }
            if ( !_import.items.length ) {
                _imports = _imports.concat( `${ importSource };` );
            }
            return _imports;
        }, [] );
        func = `
        ${ meta.topLevelAwait || imports.length ? 'async ' : ''}function() {
            ${ imports.join( `\n\t` ) }
            ${ body }
        }`;
        //script.parentNode?.setAttribute( `scoped-js`, uiid );
    } else {
        func = `
        ${ imports.join( `\n\t` ) }
        (${ meta.topLevelAwait ? 'async ' : ''}function() {
            ${ body }
        }).call( document.querySelector( 'script[scoped-js-${ uiid }]' ).parentNode );`;
        //script.toggleAttribute( `scoped-js-${ uiid }`, true );
    }
    return func;
}

// ------------------
// JAVASCRIPT::[CONTRACT]
function handleContractJS( thisContext, node ) {
    const compiled = SubscriptElement.compile( thisContext, node );
    compiled(); // Auto-run
}

/**
 * Performs realtime capture of elements and builds their relationships.
 *
 * @param Object params
 *
 * @return Void
 */
function realtime( params ) {
	const window = this, { dom, SubscriptElement } = window.wq;
    const handled = () => {};
	dom.Realtime.intercept( window.document, 'script[scoped],script[contract]', record => {
        record.incomingNodes.forEach( node => {
            // ----------
            if ( 'contract' in node ) return handled( node );
            Object.defineProperty( node, 'contract', { value: node.hasAttribute( 'contract' ) } ); 
            if ( 'scoped' in node ) return handled( node );
            Object.defineProperty( node, 'scoped', { value: node.hasAttribute( 'scoped' ) } ); 
            // ----------
            const thisContext = node.scoped ? node.parentNode : ( node.type === 'module' ? undefined : window );
            if ( node.contract ) return handleContractJS( thisContext, node );
            if ( node.scoped ) return handleScopedJS( thisContext, node );

        } );
        record.outgoingNodes.forEach( node => {
        } );

        let scriptMeta = _( script ).get( 'meta' );
		if ( connectedState ) {
            if ( scriptMeta ) return;
            const context = script.parentNode;
            const compiled = SubscriptElement.compile( context, script );
            _( script ).set( 'meta', { context, compiled } );
            compiled(); // Auto-run
		} else if ( scriptMeta ) {
            const collection = SubscriptElement.inspect( scriptMeta.context );
            collection.forEach( ( entry, key ) => {
                if ( entry === scriptMeta.compiled ) { collection.delete( key ); }
            } );
            _( script ).delete( 'meta' );
		}
	}, { each: true } );
}

/**
 * @init
 * 
 * @param Object $params
 */
export default function init( $params = {} ) {
	const window = this, dom = wqDom.call( window );
    // -------
    // params
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        selectors: { script: 'script[type="subscript"]', },
    } );
	const { SubscriptElement } = classes.call( this, params );
    // -------
    // realtime?
    realtime.call( this, params );
    // -------
    // APIs
	return { SubscriptElement };
}