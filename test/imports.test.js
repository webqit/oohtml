
/**
 * @imports
 */
import { expect } from 'chai';
import { delay, createDocument, mockRemoteFetch, printDocument, _ } from './index.js';

describe(`HTML Imports`, function() {

    describe( `Basic...`, function() {
        
        const head = `
        <template exportid="temp0">
            <p>Hello world Export</p>
            <p>Hellort</p>
        </template>`;
        const body = `
        <import module="temp0"></import>`;
        const { document } = createDocument( head, body );

        it ( `The document object and <template> elements should expose a "modules" property`, async function() {
            expect( document ).to.have.property( 'modules' );
            expect( document.modules.temp0 ).to.have.property( 'modules' );
        } );

        it ( `<import> element be automatically resolved: import default export...`, async function() {
            expect( document.body.children ).to.have.length( 2 );
            const importElement = _( document.body.firstElementChild ).get( 'slot@imports' );
            expect( importElement.nodeName ).to.eq( 'IMPORT' );
        } );

        it( `<import> element be resolved again: after having mutated an export right at its module.`, async function() {
            const templateEl = document.querySelector( 'template' );
            let added = document.createElement( 'div' );
            templateEl.content.appendChild( added );
            expect( document.body.children ).to.have.length( 3 );
        } );
    } );

    describe( `Dynamic...`, function() {
        
        const head = `
        <template exportid="temp0">
            <p>Hello world Export</p>
            <p>Hellort</p>
            <input exportid="input" />
            <template exportid="temp1">
                <textarea exportid="input"></textarea>
                <template exportid="temp2">
                    <select exportid="input"></select>
                </template>
            </template>
        </template>`;
        const body = `
        <import module="temp0/uuu"></import>`;
        const { document } = createDocument( head, body );
        const importEl = document.querySelector( 'import' );

        it ( `<import> element should not be resolved: no match for given import ID...`, async function() {
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
        } );

        it ( `<import> element should be automatically resolved: new import ID is set...`, async function() {
            importEl.setAttribute( 'module', 'temp0#input' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'INPUT' );
        } );

        it ( `<import> element should be automatically resolved: new moduleref is set - nested...`, async function() {
            importEl.setAttribute( 'module', 'temp0/temp1#input' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'TEXTAREA' );
        } );

        it ( `<import> element should be automatically resolved: moduleref is unset - should now be inherited from <body>...`, async function() {
            importEl.setAttribute( 'module', '#input' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
            document.body.setAttribute( 'importscontext', 'temp0/temp1/temp2' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'SELECT' );
        } );

        it ( `<import> element should be automatically resolved: moduleref at <body> is changed...`, async function() {
            document.body.setAttribute( 'importscontext', 'temp0' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'INPUT' );
        } );

        it ( `<import> element should be automatically RESTORED: slotted element is removed from DOM...`, async function() {
            document.body.querySelector( 'input' ).remove();
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
        } );
        
    } );

    describe( `Remote...`, function() {

        it( `<import> element from nested remote modules.`, async function() {
            this.timeout( 10000 );

            const head = ``, body = ``, timeout = 2000;
            const window = createDocument( head, body, window => {
                // Define a remote response
                const temp0 = `
                <template exportid="temp1" src="/temp1.html" loading="lazy"></template>`;
                const temp1 = `
                <p>Hello world Export</p>
                <p>Hellort</p>
                <template exportid="temp22">
                </template>`;
                mockRemoteFetch( window, { '/temp0.html': temp0, '/temp1.html': temp1 }, timeout );
            } ), document = window.document;

            // Add a remote module
            const templateEl = document.createElement( 'template' );
            templateEl.setAttribute( 'exportid', 'temp0' );
            templateEl.setAttribute( 'src', '/temp0.html' );
            document.head.appendChild( templateEl );
            // Add the import element to with a view to waiting for the remote module
            const importEl = document.createElement( 'import' );
            importEl.setAttribute( 'module', 'temp0/temp1' );
            document.body.appendChild( importEl );
            // Should stil be waiting...
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
            // When remote request must have completed
            await delay( ( timeout * 2 ) + 100 );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'P' );
            expect( document.body.lastElementChild.nodeName ).to.eq( 'P' );
        } );
    } );

    describe( `Hydration...`, function() {

        it ( `Server-resolved <import> element should maintain relationship with slotted elements...`, async function() {

            const head = `
            <template exportid="temp0">
                <input exportid="input" />
                <template exportid="temp1">
                    <textarea exportid="input"></textarea>
                    <template exportid="temp2">
                        <select exportid="input"></select>
                    </template>
                </template>
            </template>`;
            const body = `
            <div importscontext="temp0/temp1">
                <textarea exportid="input"></textarea>
                <!--<import module="#input"></import>-->
            </div>`;
            const { document } = createDocument( head, body );
            await true;

            const routingElement = document.body.firstElementChild;
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'TEXTAREA' );
            const temp1 = document.modules.temp0.modules.temp1;
            const textarea = [ ...temp1.modules[ '#input' ] ][ 0 ];
            textarea.remove();
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'IMPORT' );
            temp1.content.prepend( textarea );
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'TEXTAREA' );
            routingElement.firstElementChild.remove();
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'IMPORT' );
        } );

        it ( `Server-resolved <import> element should maintain relationship with slotted elements...`, async function() {

            const head = `
            <template exportid="temp0">
                <input exportid="input" />
                <template exportid="temp1">
                    <textarea exportid="input"></textarea>
                    <template exportid="temp2">
                        <select exportid="input"></select>
                    </template>
                </template>
            </template>`;
            const body = `
            <div importscontext="temp0/temp1">
                <textarea exportid="input"></textarea>
                <!--<import module="#input"></import>-->
            </div>`;
            const { document } = createDocument( head, body );
            await true;

            const routingElement = document.body.firstElementChild;
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'TEXTAREA' );
            routingElement.setAttribute( 'importscontext', 'temp0/temp1/temp2' );
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'SELECT' );
            routingElement.removeChild( routingElement.firstElementChild );
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'IMPORT' );
            routingElement.setAttribute( 'importscontext', 'temp0' );
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'INPUT' );
        } );
        
    } );

} );
