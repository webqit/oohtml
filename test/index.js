
/**
 * @imports
 */
import { _internals } from '@webqit/util/js/index.js';
import { createContext, compileFunction, runInContext } from 'vm';
import jsdom from 'jsdom';
import init, { Observer } from '../src/index.js';
import wqDom from '@webqit/dom';

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
    // -------
    const skeletonDoc = `
    <!DOCTYPE html>
    <html>
        <head>${head}</head>
        <body>${body}</body>
    </html>`;
    // --------
    // TODO: Proper indentation for pretty-printing
    const instance  = new jsdom.JSDOM( skeletonDoc );
    init.call( instance.window );
    return instance.window;
}

export function createDocumentForScopedJS( body = '', head = '', callback = null, params = {} ) {
    // -------
    const skeletonDoc = `
    <!DOCTYPE html>
    <html>
        <head>${head}</head>
        <body>${body}</body>
    </html>`;
    // --------
    const instance  = new jsdom.JSDOM( skeletonDoc, {
        url: 'http://localhost',
        ...params,
        beforeParse( window ) {
            window.testRecords = [];
            createContext( window );
            // -----------------
            // Running advanced scripts
            const subscriptParams = {
                runtimeParams: {
                    compileFunction: ( code, parameters ) => compileFunction( code, parameters, {
                        parsingContext: window,
                    } ),
                }
            };
            init.call( window, { ScopedJS: subscriptParams } );
            // -----------------
            // Running basic scripts
            const dom = wqDom.call( window );
            if ( params.runScripts !== 'dangerously' ) {
                dom.Realtime.observe( window.document, 'script', record => {
                    record.addedNodes.forEach( script => {
                        //console.log( '-----------------------------------------', script.textContent );
                        runInContext( script.textContent, window );
                    } );
                }, { subtree: true } );
            }
            // -----------------
            if ( callback ) callback( window, window.wq.dom );
        }
    } );
    // --------
    return instance.window;
};


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