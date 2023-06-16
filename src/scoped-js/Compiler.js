
export default class Compiler {

    // Unique ID generator
    static hashTable = new Map;
    static uniqId = () => (0|Math.random()*9e6).toString(36);

    // Hash of anything generator
    static toHash( val ) {
        let hash;
        if ( !( hash = this.hashTable.get( val ) ) ) {
            hash = this.uniqId();
            this.hashTable.set( val, hash );
        }
        return hash;
    }

    // Value of any hash
    static fromHash( hash ) {
        let val;
        this.hashTable.forEach( ( _hash, _val ) => {
            if ( _hash === hash ) val = _val;
        } );
        return val;
    }

    // Set window property
    constructor( window, config, executeCallback ) {
        this.window = window;
        this.config = config;
        // This is a global function
        window.webqit.oohtml.Script.run = execHash => {
            const exec = this.constructor.fromHash( execHash );
            if ( !exec ) throw new Error( `Argument must be a valid exec hash.` );
            const { script, compiledScript, thisContext } = exec;
            if ( thisContext instanceof window.Element && script.scoped ) {
                if ( !thisContext.scripts ) { Object.defineProperty( thisContext, 'scripts', { value: new Set } ); }
                thisContext.scripts.add( script );
            }
            switch ( config.script.retention ) {
                case 'dispose':
                    script.remove();
                    break;
                case 'hidden':
                    script.textContent = `"source hidden"`;
                    break;
                default:
                    script.textContent = compiledScript.function.originalSource;
            }
            return executeCallback.call( window, compiledScript, thisContext, script );
        };    
    }

    // Compile scipt
    compile( script, thisContext ) {
        const _static = this.constructor;
        const { webqit: { oohtml, ReflexFunction } } = this.window;
        const cache = oohtml.Script.compileCache[ script.reflex ? 0 : 1 ];
        const sourceHash = _static.toHash( script.textContent );
        // Script instances are parsed only once
        let source = script.textContent, compiledScript;
        if ( !( compiledScript = cache.get( sourceHash ) ) ) {
            // Are there "import" (and "await") statements? Then, we need to rewrite that
            let imports = [], meta = {};
            let targetKeywords = [];
            if ( script.type === 'module' ) targetKeywords.push( 'import ' );
            if ( script.type === 'module' && !script.reflex ) targetKeywords.push( 'await ' );
            if ( targetKeywords.length && ( new RegExp( targetKeywords.join( '|' ) ) ).test( source ) ) {
                [ imports, source, meta ] = this.parse( source );
                if ( imports.length ) {
                    source = `\n\t${ this.rewriteImportStmts( imports ).join( `\n\t` ) }\n\t${ source }\n`;
                }
            }
            // Let's obtain a material functions
            let _Function, { parserParams, compilerParams, runtimeParams } = this.config.advanced;
            if ( script.reflex ) {
                parserParams = { ...parserParams, allowAwaitOutsideFunction: script.type === 'module' };
                runtimeParams = { ...runtimeParams, async: script.type === 'module' };
                _Function = ReflexFunction( source, { compilerParams, parserParams, runtimeParams, } );
                Object.defineProperty( script, 'properties', { configurable: true, value: ReflexFunction.inspect( _Function ) } );
            } else {
                const isAsync = script.type === 'module'//meta.topLevelAwait || imports.length;
                const _FunctionConstructor = isAsync ? Object.getPrototypeOf( async function() {} ).constructor : Function;
                _Function = runtimeParams?.compileFunction 
                    ? runtimeParams.compileFunction( source )
                    : new _FunctionConstructor( source );
            }
            Object.defineProperty( _Function, 'originalSource', { configurable: true, value: script.textContent } );
            // Save material function to compile cache
            compiledScript = Object.defineProperty( script.cloneNode(), 'function', { value: _Function } );
            script.scoped && Object.defineProperty( compiledScript, 'scoped', Object.getOwnPropertyDescriptor( script, 'scoped') );
            script.reflex && Object.defineProperty( compiledScript, 'reflex', Object.getOwnPropertyDescriptor( script, 'reflex') );
            cache.set( sourceHash, compiledScript );
        }
        const execHash = _static.toHash( { script, compiledScript, thisContext } );
        if ( script.handling === 'manual' ) {
            webqit.oohtml.Script.run( execHash );
        } else {
            script.textContent = `webqit.oohtml.Script.run( '${ execHash }' );`;
        }
    }

    // Match import statements
    // and detect top-level await
    parse( source ) {
        const [ tokens, meta ] = this.tokenize( source, ( $tokens, event, char, meta, i, isLastChar ) => {
            
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
                    if ( char === ';' || isLastChar ) {
                        $tokens[ 0 ] += char;
                        $tokens.unshift( '' );
                    } else { $tokens.unshift( char ); }
                    meta.openImport = null;
                    return false;
                }

                let remainder = source.substring( i - 1 );

                if ( !meta.openImport && /^[\W]?import[ ]*[^\(]/.test( remainder ) ) {
                    meta.openImport = 'starting';
                    $tokens.unshift( '' );
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
                imports.push( str );
            } else if ( _str ) { body += str; }
        }

        return [ imports, body, meta ];
    }

    // Rewrite import statements
    rewriteImportStmts( imports ) {
        const importSpecs = [], importPromises = [];
        imports.forEach( ( $import, i ) => {
            $import = parseImportStmt( $import );
            // Identify whole imports and individual imports
            const [ wholeImport, individualImports ] = $import.items.reduce( ( [ whole, parts ], item ) => {
                return item.id === '*' ? [ item.alias, parts ] : [ whole, parts.concat( item ) ];
            }, [ null, [] ] );
            if ( wholeImport ) {
                // const main = await import("url");
                importSpecs.push( `const ${ wholeImport } = __$imports$__[${ i }];` );
            }
            if ( individualImports.length ) {
                // const { aa: bb, cc } = await import("url");
                const individualImportsSpec = individualImports.map( item => `${ item.id }${ item.id !== item.alias ? `: ${ item.alias }` : '' }` ).join( ', ' );
                importSpecs.push( `const { ${ individualImportsSpec } } = __$imports$__[${ i }];` );
            }
            importPromises.push( `import("${ $import.url }")` );
        } );
        return [
            `\n\tconst __$imports$__ = await Promise.all([\n\t\t${ importPromises.join( `,\n\t\t` ) }\n\t]);`,
            importSpecs.join( `\n\t` ),
        ];
    }

    // Parse import statements
    parseImportStmt( str ) {
        const getUrl = str => {
            let quo = /^[`'"]/.exec( str );
            return quo && str.substring( 1, str.lastIndexOf( quo[ 0 ] ) );
        }
        let $import = { items: [ { id: '' } ] }, _str = str.replace( 'import', '' ).trim();
        if ( !( $import.url = getUrl( _str ) ) ) {
            this.tokenize( _str, ( $tokens, event, char, meta, i, isLastChar ) => {
                if ( [ 'start-quote', 'ongoing-quote', 'end-quote', 'char' ].includes( event ) ) {
                    if ( $import.url ) return;
                    if ( !meta.openQuote ) {
                        let remainder = _str.substring( i );
                        if ( char === ',' ) {
                            $import.items.unshift( { id: '' } );
                            return;
                        }
                        if ( remainder.startsWith( ' as ' ) ) {
                            $import.items[ 0 ].alias = '';
                            return 3;
                        }
                        if ( remainder.startsWith( ' from ' ) ) {
                            $import.url = getUrl( remainder.replace( 'from', '' ).trim() );
                            return remainder.length;
                        }
                    }
                    if ( 'alias' in $import.items[ 0 ] ) {
                        $import.items[ 0 ].alias += char;
                    } else {
                        $import.items[ 0 ].id += char;
                        if ( meta.openEnclosures.length ) {
                            $import.items[ 0 ].enclosed = true;
                        }
                    }
                }
            } );
        }
        $import.items = $import.items
            .map( item => ( {
                id: item.id && !item.alias && !item.enclosed ? 'default' : item.id.trim(),
                alias: item.alias ? item.alias.trim() : item.id.trim(),
            } ) )
            .filter( item => item.id )
            .reverse();
        return $import;
    }

    // Token JavaScript source
    tokenize( source, _callback ) {
        const lastI = source.length - 1;
        return [ ...source ].reduce( ( [ $tokens, meta, skip ], char, i ) => {
            
            if ( skip ) {
                $tokens[ 0 ] += char;
                return [ $tokens, meta, --skip ];
            }
            let callbackReturn;

            if ( meta.openQuote || meta.openComment ) {
                if ( char === meta.openQuote ) {
                    meta.openQuote = null;
                    callbackReturn = _callback( $tokens, 'end-quote', char, meta, i, i === lastI );
                } else if ( meta.openQuote ) {
                    callbackReturn = _callback( $tokens, 'ongoing-quote', char, meta, i, i === lastI );
                } else if ( meta.openComment ) {
                    if ( ( meta.openComment === '//' && char === `\n` ) || ( meta.openComment === '/*' && $tokens[ 0 ].substr( -1 ) === '*' && char === '/' ) ) {
                        meta.openComment = null;
                        callbackReturn = _callback( $tokens, 'end-comment', char, meta, i, i === lastI );
                    }
                }
                if ( callbackReturn !== false ) {
                    $tokens[ 0 ] += char;
                }
                return [ $tokens, meta, typeof callbackReturn === 'number' ? callbackReturn : skip ];
            }

            let enclosure;
            if ( enclosure = [ '()', '{}', '[]' ].filter( pair => char === pair[ 0 ] )[ 0 ] ) {
                callbackReturn = _callback( $tokens, 'start-enclosure', char, meta, i, i === lastI );
                meta.openEnclosures.unshift( enclosure );
            } else if ( meta.openEnclosures.length && char === meta.openEnclosures[ 0 ][ 1 ] ) {
                meta.openEnclosures.shift();
                callbackReturn = _callback( $tokens, 'end-enclosure', char, meta, i, i === lastI );
            } else if ( [ '"', "'", "`" ].includes( char ) ) {
                callbackReturn = _callback( $tokens, 'start-quote', char, meta, i, i === lastI );
                meta.openQuote = char;
            } else if ( !meta.openComment && [ '/*', '//' ].includes( source.substr( i, 2 ) ) ) {
                callbackReturn = _callback( $tokens, 'start-comment', char, meta, i, i === lastI );
                meta.openComment = source.substr( i, 2 );
            } else {
                callbackReturn = _callback( $tokens, 'char', char, meta, i, i === lastI );
            }

            if ( callbackReturn !== false ) {
                $tokens[ 0 ] += char;
            }
            return [ $tokens, meta, typeof callbackReturn === 'number' ? callbackReturn : skip ];

        }, [ [ '' ], { openEnclosures: [], }, 0 ] );
    }
}