
/**
 * @imports
 */
import { _internals } from '@webqit/util/js/index.js';
import { createContext, compileFunction, runInContext } from 'vm';
import jsdom from 'jsdom';
import init, { Observer } from '../src/index.js';
import { SubscriptFunction } from '@webqit/subscript';
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

export function createDocument( head = '', body = '', callback = null, ) {
    const skeletonDoc = `
    <!DOCTYPE html>
    <html>
        <head>${ head }</head>
        <body>${ body }</body>
    </html>`;
    // TODO: Proper indentation for pretty-printing
    const instance  = new jsdom.JSDOM( skeletonDoc, {
        url: 'http://localhost',
        beforeParse( window ) {
            init.call( window );
            if ( callback ) callback( window, window.wq.dom );
        }
    } );
    return instance.window;
}

export function createDocumentForScopedJS( head = '', body = '', callback = null, params = {} ) {
    const skeletonDoc = `
    <!DOCTYPE html>
    <html>
        <head>${ head }</head>
        <body>${ body }</body>
    </html>`;
    const instance  = new jsdom.JSDOM( skeletonDoc, {
        ...params,
        url: 'http://localhost',
        beforeParse( window ) {
            window.testRecords = [];
            createContext( window );
            // Running advanced scripts
            init.call( window, { ScopedJS: {
                SubscriptFunction,
                runtimeParams: {
                    compileFunction: ( code, parameters ) => compileFunction( code, parameters, {
                        parsingContext: window,
                    } ),
                }
            } } );
            // Running basic scripts
            const dom = wqDom.call( window );
            if ( params.runScripts !== 'dangerously' ) {
                dom.realtime( window.document ).observe( 'script', record => {
                    record.entrants.forEach( script => {
                        if ( !script.textContent.trim() ) return;
                        runInContext( script.textContent, window );
                    } );
                }, { subtree: true } );
            }
            // Sync callback?
            if ( callback ) callback( window, window.wq.dom );
        }
    } );
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