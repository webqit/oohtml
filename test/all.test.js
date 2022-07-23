
/**
 * @imports
 */
import { _internals } from '@webqit/util/js/index.js';
import { expect } from 'chai';
import init from '../src/index.js';
import jsdom from 'jsdom';

/**
 * -------
 * HELPERS
 * -------
 */

const _ = ( el, ...args ) => _internals( el, 'oohtml', ...args );

function createDocument( head = '', body = '' ) {
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

function mockRemoteFetch( window, contents, delay = 1000 ) {
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

function delay( duration, callback = undefined ) {
    return new Promise( res => {
        setTimeout( () => res( callback && callback() ), duration );
    } );
}

function printDocument( document, desc = '' ) {
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

/**
 * -------
 * TESTS
 * -------
 */


describe(`Modules & Imports`, function() {

    describe( `Basic...`, function() {
        
        const head = `
        <meta name="oohtml" content="element.import=html-import" />
        <template name="temp0">
            <p>Hello world Export</p>
            <p>Hellort</p>
        </template>`;
        const body = `
        <html-import template="temp0"></html-import>`;
        const { document } = createDocument( head, body );

        it ( `Should be automatically resolved: import default export...`, async function() {
            printDocument( document );
            const slot = _( document.body.firstElementChild ).get( 'slot' );
            expect( document.body.children ).to.have.length( 2 );
            expect( slot.slottedElements.size ).to.eq( 2 );
            expect( slot.nodeName ).to.eq( 'HTML-IMPORT' );
            expect( slot.moduleRef ).to.eq( 'temp0' );
            expect( slot.importId ).to.eq( 'default' );
        } );

        it( `Should be resolved again: after having mutated an export right at its module.`, async function() {
            const templateEl = document.querySelector( 'template' );
            await delay( 300, () => {
                let added = document.createElement( 'div' );
                templateEl.content.appendChild( added );
                //templateEl.remove();
                document.head.appendChild( templateEl );
            } );
            printDocument( document );
            expect( document.body.children ).to.have.length( 3 );
        } );
    } );

    describe(`Dynamic...`, function() {
        
        const head = `
        <template name="temp0">
            <p>Hello world Export</p>
            <p>Hellort</p>
            <input exportgroup="input" />
            <template name="temp1">
                <textarea exportgroup="input"></textarea>
                <template name="temp2">
                    <select exportgroup="input"></select>
                </template>
            </template>
        </template>`;
        const body = `
        <import template="temp0" name="uuu"></import>`;
        const { document } = createDocument( head, body );
        const importEl = document.querySelector( 'import' );

        it ( `Should not be resolved: no match for given import ID...`, async function() {
            printDocument( document );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
        } );

        it ( `Should be automatically resolved: new import ID is set...`, async function() {
            await delay( 300, () => {
                importEl.setAttribute( 'name', 'input' );
            } );
            printDocument( document );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'INPUT' );
        } );

        it ( `Should be automatically resolved: new moduleref is set - nested...`, async function() {
            await delay( 300, () => {
                importEl.setAttribute( 'template', 'temp0/temp1' );
            } );
            printDocument( document );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'TEXTAREA' );
        } );

        it ( `Should be automatically resolved: moduleref is unset - should now be inherited from <body>...`, async function() {
            await delay( 300, () => {
                importEl.removeAttribute( 'template' );
            } );
            printDocument( document );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'SELECT' );
        } );

        it ( `Should be automatically resolved: moduleref at <body> is changed...`, async function() {
            await delay( 300, () => {
                document.body.setAttribute( 'template', 'temp0' );
            } );
            printDocument( document );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'INPUT' );
        } );

        it ( `Should be automatically restored: slotted element is removed from DOM...`, async function() {
            await delay( 300, () => {
                document.body.querySelector( 'input' ).remove();
            } );
            printDocument( document );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
        } );
        
    } );

    describe(`Remote...`, function() {
        this.timeout( 10000 );

        const head = ``, body = ``;
        const window = createDocument( head, body ), document = window.document;
        printDocument( document, 'All empty at first.' );

        // Define a remote response
        const bundle1 = `
        <template name="temp11" src="/child-bundle.html" loading="lazy"></template>`;
        const childBundle = `
        <p>Hello world Export</p>
        <p>Hellort</p>
        <template name="temp22">
        </template>`;
        const timeout = 2000;
        mockRemoteFetch( window, { '/bundle.html': bundle1, '/child-bundle.html': childBundle }, timeout );

        it( `Should not yet be resolved. Bundle should be not found.`, async function() {
            await delay( 300, async () => {
                // Add a remote module
                const templateEl = document.createElement( 'template' );
                templateEl.setAttribute( 'name', 'temp0' );
                templateEl.setAttribute( 'src', '/temp.html' );
                document.head.appendChild( templateEl );
                // Add the import element to with a view to waiting for the remote module
                const importEl = document.createElement( 'import' );
                importEl.setAttribute( 'template', 'temp' );
                document.body.appendChild( importEl );
                // Print after remote request must have completed
                await delay( timeout + 10 );
                await printDocument( document );
            } );
            printDocument( document );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
        } );

        it( `Add remote lazy module, with a nested remote lazy module, then resolve.`, async function() {
            await delay( 300, async () => {
                // Add a remote module
                const templateEl = document.createElement( 'template' );
                templateEl.setAttribute( 'name', 'temp00' );
                templateEl.setAttribute( 'loading', 'lazy' );
                templateEl.setAttribute( 'src', '/bundle.html' );
                document.head.appendChild( templateEl );
                // Add the import element to with a view to waiting for the remote module
                await delay( 1200 );
                const importEl = document.createElement( 'import' );
                importEl.setAttribute( 'template', 'temp00/temp11' );
                document.body.appendChild( importEl );
                // Print after remote request must have completed
                await delay( ( timeout * 2 ) + 300 );
            } );
            await printDocument( document );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
            expect( document.body.children ).to.have.length( 3 );
        } );
    } );

} );
