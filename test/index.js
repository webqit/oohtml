
/**
 * @imports
 */
import { createWindow } from '@webqit/oohtml-ssr';

/**
 * -------
 * HELPERS
 * -------
 */

export function delay( duration, callback = undefined ) {
    return new Promise( res => {
        setTimeout( () => res( callback && callback() ), duration );
    } );
}

export function createDocument( head = '', body = '', callback = null, ) {
    return createDocumentPrefixed( '', ...arguments );
}

export function createDocumentPrefixed( prefix, head = '', body = '', callback = null, ) {
    const skeletonDoc = `
    <!DOCTYPE html>
    <html>
        <head>
        <meta name="$q-compiler-url" content="../quantum-js/dist/compiler.js">
        ${ prefix ? `<meta name="webqit" content="prefix=${ prefix };">` : `` }
        ${ head }
        <script ssr src="/dist/main.lite.js"></script>
        </head>
        <body>${ body }</body>
    </html>`;
    return createWindow( skeletonDoc, {
        // Notice we do not want to use the Path utility here.
        // Destroys the file:/// url convention especially in windows
        url: import.meta.url.substring( 0, import.meta.url.lastIndexOf( '/test/index.js' ) ),
        beforeParse( window ) {
            if ( callback ) callback( window );
        }
    } );
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