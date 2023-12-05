
/**
 * @imports
 */
import { expect } from 'chai';
import { createDocument, createDocumentPrefixed, mockRemoteFetch, delay } from './index.js';

describe(`HTML Imports`, function() {

    describe( `Basic...`, function() {
        
        const head = `
        <template def="temp0">
            <p>Hello world Export</p>
            <p>Hellort</p>
        </template>`;
        const body = `
        <import ref="temp0"></import>`;
        const { document } = createDocument( head, body );

        it ( `The document object and <template> elements should expose an "import" property`, async function() {
            expect( document ).to.have.property( 'import' );
        } );

        it ( `<import> element be automatically resolved: import default export...`, async function() {
            expect( document.body.children ).to.have.length( 2 );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'P' );
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
        <template wq-def="temp0">
            <!-- ------- -->
            <p>Hello world Export</p>
            <p>Hellort</p>
            <input wq-def="input" />
            <template wq-def="temp1">
                <textarea wq-def="input"></textarea>
                <template wq-def="temp2">
                    <select wq-def="input"></select>
                </template>
            </template>
            <!-- ------- -->
            <template wq-def="_landing1">
                <div wq-def="main.html">a</div>
                <template wq-def="_landing2">
                    <div wq-def="main.html">b</div>
                    <template wq-def="_docs">
                        <div wq-def="main.html">c</div>
                    </template>
                </template>
            </template>
            <!-- ------- -->
            <template wq-def="landing1" wq-extends="_landing1">
                <div wq-def="README.md">1</div>
                <template wq-def="landing2" wq-extends="_landing2">
                    <div wq-def="README.md">2</div>
                    <template wq-def="docs" wq-extends="_docs">
                        <div wq-def="README.md">3</div>
                    </template>
                </template>
            </template>
            <!-- ------- -->
        </template>`;
        const body = `
        <wq-import wq-ref="temp0/uuu"></wq-import>`;
        const { document } = createDocumentPrefixed( 'wq', head, body );
        const importEl = document.querySelector( 'wq-import' );

        it ( `<import> element should not be resolved: no match for given import ID...`, async function() {
            expect( document.body.firstElementChild.nodeName ).to.eq( 'WQ-IMPORT' );
        } );

        it ( `<import> element should be automatically resolved: new import ID is set...`, async function() {
            importEl.setAttribute( 'wq-ref', 'temp0#input' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'INPUT' );
        } );

        it ( `<import> element should be automatically resolved: new moduleref is set - nested...`, async function() {
            importEl.setAttribute( 'wq-ref', 'temp0/temp1#input' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'TEXTAREA' );
        } );

        it ( `<import> element should be automatically resolved: moduleref is unset - should now be inherited from <body>...`, async function() {
            importEl.setAttribute( 'wq-ref', '#input' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'WQ-IMPORT' );
            document.body.setAttribute( 'wq-importscontext', 'temp0/temp1/temp2' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'SELECT' );
        } );

        it ( `<import> element should be automatically resolved: moduleref at <body> is changed...`, async function() {
            document.body.setAttribute( 'wq-importscontext', 'temp0' );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'INPUT' );
        } );

        it ( `<import> element should be automatically RESTORED: slotted element is removed from DOM...`, async function() {
            document.body.querySelector( 'input' ).remove();
            expect( document.body.firstElementChild.nodeName ).to.eq( 'WQ-IMPORT' );
        } );
        
    } );

    describe( `Remote...`, function() {

        it( `<import> element from nested remote modules.`, async function() {
            this.timeout( 10000 );

            const head = ``, body = ``, timeout = 2000;
            const window = createDocument( head, body, window => {
                // Define a remote response
                const contents0 = `
                <template def="temp1" src="/temp1.html" loading="lazy"></template>`;
                const contents1 = `
                <p>Hello world Export</p>
                <p>Hellort</p>
                <template def="temp22">
                </template>`;
                mockRemoteFetch( window, { '/temp0.html': contents0, '/temp1.html': contents1 }, timeout );
            } ), document = window.document;

            // Add a remote module
            const templateEl = document.createElement( 'template' );
            templateEl.setAttribute( 'def', 'temp0' );
            templateEl.setAttribute( 'src', '/temp0.html' );
            document.head.appendChild( templateEl );
            // Add the import element to with a view to waiting for the remote module
            const importEl = document.createElement( 'import' );
            importEl.setAttribute( 'ref', 'temp0/temp1' );
            document.body.appendChild( importEl );
            // Should stil be waiting...
            expect( document.body.firstElementChild.nodeName ).to.eq( 'IMPORT' );
            // When remote request must have completed
            await delay( ( timeout * 2 ) + 150 );
            expect( document.body.firstElementChild.nodeName ).to.eq( 'P' );
            expect( document.body.lastElementChild.nodeName ).to.eq( 'P' );
        } );
    } );

    describe( `Hydration...`, function() {

        it ( `Server-resolved <import> element should maintain relationship with slotted elements...`, async function() {

            const head = `
            <template def="temp0">
                <input def="input" />
                <template def="temp1">
                    <textarea def="input"></textarea>
                    <template def="temp2">
                        <select def="input"></select>
                    </template>
                </template>
            </template>`;
            const body = `
            <div importscontext="temp0/temp1">
                <textarea def="input"></textarea>
                <!--&lt;import ref="#input" data-nodecount="1"&gt;&lt;/import&gt;-->
            </div>`;
            const { document } = createDocument( head, body, window => window.webqit.env = 'client' );
            await delay( 20 );

            const routingElement = document.body.firstElementChild;
            expect( routingElement.firstElementChild.nodeName ).to.eq( 'TEXTAREA' );
            document.import( 'temp0/temp1', temp1 => {
                const textarea = temp1.defs[ '#input' ];
                textarea.remove();
                expect( routingElement.firstElementChild.nodeName ).to.eq( 'IMPORT' );
                temp1.content.prepend( textarea );
                expect( routingElement.firstElementChild.nodeName ).to.eq( 'TEXTAREA' );
                routingElement.firstElementChild.remove();
                expect( routingElement.firstElementChild.nodeName ).to.eq( 'IMPORT' );
            } );
        } );

        it ( `Server-resolved <import> element should maintain relationship with slotted elements...`, async function() {

            const head = `
            <template def="temp0">
                <input def="input" />
                <template def="temp1">
                    <textarea def="input"></textarea>
                    <template def="temp2">
                        <select def="input"></select>
                    </template>
                </template>
            </template>`;
            const body = `
            <div importscontext="temp0/temp1">
                <textarea def="input"></textarea>
                <!--&lt;import ref="#input" data-nodecount="1"&gt;&lt;/import&gt;-->
            </div>`;
            const { document } = createDocument( head, body, window => window.webqit.env = 'client' );
            await delay( 20 );

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
