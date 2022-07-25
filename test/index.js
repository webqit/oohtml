
/**
 * @imports
 */
import { _internals } from '@webqit/util/js/index.js';
import { compileFunction } from 'vm';
import jsdom from 'jsdom';
import init, { Observer } from '../src/index.js';

/**
 * -------
 * HELPERS
 * -------
 */

 export { Observer };

export const _ = ( el, ...args ) => _internals( el, 'oohtml', ...args );

export function delay( duration, callback = undefined ) {
    return new Promise( res => {
        setTimeout( () => res( callback && callback() ), duration );
    } );
}

export function createDocument( head = '', body = '' ) {
    // TODO: Proper indentation for pretty-printing
    const instance  = new jsdom.JSDOM(`
    <!DOCTYPE html><html><head>
    ${ head }
    </head><body template="temp0/temp1/temp2">
    ${ body }
    </body></html>
    `);
    init.call( instance.window );
    return instance.window;
}

export function createDocumentForSubscript( head = '', body = '' ) {
    // TODO: Proper indentation for pretty-printing
    const instance  = new jsdom.JSDOM(`
    <!DOCTYPE html><html><head>
    ${ head }
    </head><body>
    ${ body }
    </body></html>
    `,
    { runScripts: 'dangerously' } );
    const vmContext = instance.getInternalVMContext();
    const subscriptParams = { runtimeParams: {
        compileFunction: ( code, parameters ) => compileFunction( code, parameters, {
            parsingContext: vmContext,
        } ),
    } };
    init.call( instance.window, { Subscript: subscriptParams } );
    return instance.window;
}

export function mockRemoteFetch( window, contents, delay = 1000 ) {
    window.fetch = url => {
        console.info( 'Fetching .......... ', url );
        const successResponse = () => ( { ok: true, text: () => Promise.resolve( contents[ url ] ), } );
        return new Promise( ( res, rej ) => {
            setTimeout( () => {
                if ( contents[ url ] ) res( successResponse() )
                else rej( { message: 'Not found.' } );
            }, delay );
        } );
    };
}

export function printDocument( document, desc = '' ) {
    return; new Promise( res => {
        setTimeout( () => {
            console.log( '' );
            console.log( '-------------' );
            console.log( desc );
            console.log( '-------------' );
            console.log( document.documentElement.outerHTML );
            console.log( '-------------' );
            console.log( '' );
            res();
        }, 0 );
    } );
}