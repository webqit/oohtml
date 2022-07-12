
/**
 * @imports
 */
import { _isObject, _isFunction } from '@webqit/util/js/index.js';
import { _from as _arrFrom } from '@webqit/util/arr/index.js';
import { _wrapped, _unwrap } from '@webqit/util/str/index.js';

/**
 * Runs a "scope-query" against a context.
 *
 * @param Array	        contexts
 * @param String	    query
 * @param Function	    returnLine
 * @param Object	    traps
 * @param Object	    params
 *
 * @return Array
 */
export function query( contexts, query, returnLine = null, traps = {}, params = {} ) {
    const $contexts = _arrFrom( contexts, false ).map( context => createContext( null, null, context ) );
    const $returnLine = returnLine || ( result => result ), $traps = { ...traps }, $params = { ...params };
    if ( !$traps.keys ) { $traps.keys = context => ( _isObject( context ) && Reflect.ownKeys( context ) ) || []; }
    if ( !$traps.get ) { $traps.get = ( context, key ) => _isObject( context ) && Reflect.get( context, key ) }
    if ( !$params.delim ) { $params.delim = '/'; }
    const returnValue = queryReduce( $contexts, query, $returnLine, $traps, $params );
    if ( $params.realtime && _isFunction( traps.subscribe ) ) {
        return { unsubscribe() { $contexts.forEach( context => { context.unsubscribe(); return returnValue; } ) } };
    }
    return returnValue;
}

/**
 * Executes a query by reductively evaluating the query step by step.
 *
 * @param Array	        contexts
 * @param String|Array	query
 * @param Function	    receiver
 * @param Object	    traps
 * @param Object	    params
 * @param Number	    level
 *
 * @return Array
 */
function queryReduce( contexts, query, returnLine, traps, params, level = 0 ) {
    const queryPath = Array.isArray( query ) ? query : splitOuter( query, [ params.delim ] ).map( n => n.trim() );
    if ( !queryPath.length ) { return returnLine( [] ) }

    // -----------
    // Main...
    const cntinue = () => {
        let $queryPath = queryPath.slice( 0 );
        let segment = $queryPath.shift(), isOptionalEndpoint;
        if ( segment.endsWith( '?' ) ) {
            segment = segment.substr( 0, segment.length - 1 );
            isOptionalEndpoint = true;
        }
        return segmentGetEach( contexts, segment, results_atSegment => {
            if ( $queryPath.length ) {
                return queryReduce( results_atSegment, $queryPath, results_atNextSegment => {
                    if ( isOptionalEndpoint && results_atNextSegment.length === 0 ) {
                        return returnLine( results_atSegment/* this segment, not the enpty next segment */ );
                    }
                    return returnLine( results_atNextSegment );
                }, traps, params, level + 1 );
            }
            return returnLine( results_atSegment );
        }, traps, params, level );
    };
    
    // -----------
    // Promises?
    const tryAwait = params.await && _isFunction( traps.await );
    const promises = ( tryAwait && contexts.map( context => traps.await( context.value, level ) ) ) || [];
    if ( promises.filter( x => x ).length ) {
        if ( params.await === 'atomic' ) {
            // Wait until all promises have settled (each may resolve or reject).
            return Promise.allSettled( promises ).then( cntinue );
        }
        // Wait until any of the promises is fulfilled or rejected.
        return Promise.race( promises ).then( cntinue );
    }
    return cntinue();
}

/**
 * Splits a string on delimiters outside of brackets and braces.
 *
 * @param String	    str
 * @param Array	        delims
 * @param Boolean	    inclusive
 *
 * @return Array
 */
export function splitOuter( str, delims, inclusive = false ) {
    str = str.trim();
    const closures = [ '()', '{}', '[]' ];
    if ( delims.length === 1 && closures.includes( delims[ 0 ] ) ) {
        let [ a, b ] = str.split( delims[ 0 ][ 0 ], 2 );
        if ( b && b.endsWith( delims[ 0 ][ 1 ] ) ) { b = b.substr( 0, b.length - 1 ) }
        return [ a, b ];
    }
    const [ tokens ] =  str.split( '' ).reduce( ( [ tokens, nesting ], char ) => {
        if ( delims.includes( char ) && !nesting ) {
            tokens.unshift( inclusive ? char : '' );
        } else {
            if ( [ '(', '{', '[' ].includes( char ) ) { nesting ++ }
            else if ( [ ')', '}', ']' ].includes( char ) ) { nesting -- }
            tokens[ 0 ] += char;
        }
        return [ tokens, nesting ];
    }, [ [ '' ], 0 ] );
    return tokens.reverse();
}

/**
 * Queries each context with given segment expression.
 *
 * @param Array	        contexts
 * @param String	    segment
 * @param Function	    returnLine
 * @param Object	    traps
 * @param Object	    params
 * @param Number	    level
 *
 * @return Array
 */
function segmentGetEach( contexts, segment, returnLine, traps, params, level ) {    

    // Parse segment...
    const operators = [ '|', '&', '+' ];
    const segTokens = splitOuter( segment, operators, true ).map( n => n.trim() );

    // ------------------
    // Contexts reducer: builds totalResults_contexts, with remainingContexts and originalSegTokens each time
    // Return Line: returnLine() - for total return
    return ( function eatContext( totalResults_contexts, remainingContexts, originalSegTokens, cause = null ) {
        let context = remainingContexts.shift();
        // Done with contexts? Next to caller...
        if ( !context ) { return returnLine( totalResults_contexts ); }
        // ------------------
        // Tokens reducer: builds totalResults_tokens, with remainingSegTokens each time
        // Return Line: eatContext() - for next context
        return ( function eatToken( totalResults_tokens, remainingSegTokens, subCause = null ) {
            let segToken = remainingSegTokens.shift();
            // Done with tokens? Next context...
            if ( !segToken ) { return eatContext( totalResults_contexts.concat( totalResults_tokens )/* new total */, remainingContexts, originalSegTokens, 'end-of-tokens' ); }

            // Parse token...
            const [ operator, identifier, modifiers ] = parseIdentifierToken( segToken, operators );
            // Early return? Next context...
            if ( ( operator === '|' && totalResults_tokens.length ) || ( operator === '&' && !totalResults_tokens.length ) ) {
                return eatContext( totalResults_contexts.concat( totalResults_tokens )/* new total */, remainingContexts, originalSegTokens, 'early-return-1' );
            }

            // Resolve now...
            return segmentGet( context, identifier, modifiers, contextIdentifierResult => {
                // Early return? Next context...
                if ( operator === '&' && !contextIdentifierResult.length ) {
                    return eatContext( totalResults_contexts.concat( totalResults_tokens )/* new total */, remainingContexts, originalSegTokens, 'early-return-2' );
                }
                // Done with seg? Next token...
                return eatToken( totalResults_tokens.concat( contextIdentifierResult )/* new total */, remainingSegTokens, 'next-token');
            }, traps, params, level );
        } )( [], originalSegTokens.slice( 0 ) );

    } )( [], contexts.slice( 0 ), segTokens );

}

/**
 * Parses a segToken into: operator, identifier, modifiers.
 *
 * @param String	    segToken
 * @param Array	        operators
 *
 * @return Array
 */
const segTokensParseCache = new Map;
export function parseIdentifierToken( segToken, operators ) {
    let result = segTokensParseCache.get( segToken );
    if ( !result ) {
        let $segToken = segToken;
        let operator;
        if ( operators.includes( $segToken.substr( 0, 1 ) ) ) {
            operator = $segToken.substr( 0, 1 );
            $segToken = $segToken.substr( 1 ).trim();
        }
        const [ identifier, ..._modifiers ] = splitOuter( $segToken.trim(), [ ':' ] );
        const modifiers = _modifiers.reduce( ( modObject, _modifier ) => {
            const [ name, parentheses ] = splitOuter( _modifier.trim(), [ '()' ] );
            modObject[ name ] = parentheses || true;
            return modObject;
        }, {} );
        result = [ operator, identifier, modifiers ];
        segTokensParseCache.set( segToken, result );
    }
    return result.slice( 0 );
}

/**
 * Queries a single context with given identifier + modifiers.
 *
 * @param Object	    context
 * @param String	    identifier
 * @param Object	    modifiers
 * @param Function	    returnLine
 * @param Object	    traps
 * @param Object	    params
 * @param Number	    level
 *
 * @return Array
 */
function segmentGet( context, identifier, modifiers, returnLine, traps, params, level ) {

    // Modifiers engine...
    const  modifiersList = Object.keys( modifiers ), appliedModifiers = [];
    function modifiersPipeline( segResults ) {
        const modifier = modifiersList.shift();
        if ( !modifier ) {  return returnLine( segResults ) }
        appliedModifiers.push( modifier );
        // Modifiers: deep | deepest
        if ( modifier === 'deep' || modifier === 'deepest' ) {
            if ( !segResults.length || modifier === 'deepest' ) {
                const $identifier = `*${ params.delim }${ identifier }${ appliedModifiers.map( m => `:${ m }(${ modifiers[ m ] === true ? '' : modifiers[ m ] })` ).join( '' ) }`;
                return queryReduce( [ context ], $identifier, deepResults => {
                    if ( !deepResults.length && modifier === 'deepest' && context.name === identifier ) {
                        return modifiersPipeline( [ context ] );
                    }
                    return modifiersPipeline( deepResults );
                }, traps, params, level );
            }
            return modifiersPipeline( segResults );
        }
        // Modifiers: having | not-having
        if ( modifier === 'having' || modifier === 'not-having' ) {
            let filteredSegResults = [], segResult;
            return ( function filter() {
                if ( segResults.length ) {
                    return queryReduce( [ segResult = segResults.shift() ], modifiers[ modifier ], assertionResults => {
                        if ( ( modifier === 'not-having' && !assertionResults.length ) || assertionResults.length ) { filteredSegResults.push( segResult ); }
                        return filter();
                    }, traps, params );
                }
                return modifiersPipeline( filteredSegResults )
            } )();
        }
        // Next modifier to pipeline
        throw new Error( `Modifier not recognized: ${ modifier }` );
    }

    // Run the identifier on context...
    if ( identifier === '*' || ( identifier === '' && modifiersList.length ) ) {
        identifier = '(' + ( traps.ownKeys || traps.keys )( context.value ).join( '+' ) + ')';
    }
    if ( _wrapped( identifier, '(', ')' ) ) {
        // If identifier is also a complex expression
        const cntinue = segResults => modifiersPipeline( segResults );
        return queryReduce( [ context ], _unwrap( identifier, '(', ')' ), cntinue, traps, params, level );
    }

    // If identifier is a bare identifier
    return ( function eat( prevResult = null ) {
        if ( prevResult && prevResult.unsubscribe ) prevResult.unsubscribe();
        // -----------
        let value = traps.get( context.value, identifier ), unsubscribeCallback;
        if ( params.realtime && _isFunction( traps.subscribe ) && !context.nowUnsubscribed ) {
            unsubscribeCallback = traps.subscribe( context.value, identifier, () => eat( prevResult ), level );
        }
        let result = createContext( context, identifier, value, unsubscribeCallback, prevResult && true/*isEvent*/ );
        prevResult = result;
        return modifiersPipeline( value ? [ result ] : [] );
    } )();

}

/**
 * 
 * @param Context       parentContext
 * @param String        name
 * @param Any           value
 * @param Function      unsubscribeCallback
 * @param Boolean       isEvent
 * 
 * @returns void
 */
const createContext = ( parentContext, name, value, unsubscribeCallback = null, isEvent = false ) => {
    const path = ( parentContext && parentContext.path.concat( name ) ) || [];
    const unsubscribe = () => {
        unsubscribeCallbacks.forEach( fn => fn() );
        unsubscribeCallback && unsubscribeCallback();
        parentContext && parentContext.unsubscribeCallbacks.delete( unsubscribe );
        context.nowUnsubscribed = true;
    };
    parentContext && parentContext.unsubscribeCallbacks.add( unsubscribe );
    const context = { name, value, unsubscribe };
    const unsubscribeCallbacks = new Set;
    Object.defineProperties( context, {
        context: { value: parentContext },
        path: { value: path },
        event: { value: isEvent ? context : ( parentContext && parentContext.event ) },
        unsubscribeCallback: { value: unsubscribeCallback },
        unsubscribeCallbacks: { value: unsubscribeCallbacks },
        nowUnsubscribed: { value: parentContext && parentContext.nowUnsubscribed, writable: true },
    } );
    return context;
};