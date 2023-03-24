
/**
 * @imports
 */
import { expect } from 'chai';
import { createDocument, mockRemoteFetch, delay } from './index.js';
const getQueryPath = str => str.split( '/' ).join( '/modules/' ).split( '/' );

describe(`HTML Modules`, function() {

    describe( `APIs...`, function() {

        it ( `The document object and <template> elements should expose a "modules" property...`, async function() {
            
            const head = `
            <template exportid="temp0">
                <p>Hello world Export</p>
                <p>Hellort</p>
            </template>`;
            const body = `
            <template exportid="temp1" scoped>
                <p>Hello world Export</p>
                <p>Hellort</p>
            </template>`;
            const { document } = createDocument( head, body );
            await delay( 200 );
            // -------
            expect( document ).to.have.property( 'modules' );
            expect( document.modules[ 'temp0' ] ).to.have.property( 'modules' );
            expect( document.modules[ 'temp0' ].exportid ).to.eq( 'temp0' );
            // -------
            expect( document.body ).to.have.property( 'modules' );
            expect( document.body.modules[ 'temp1' ] ).to.have.property( 'modules' );
            expect( document.body.modules[ 'temp1' ].exportid ).to.eq( 'temp1' );
        } );
        
        it ( `The document object and <template> elements should expose a "modules" property...`, async function() {
            
            const body = '', head = `
            <template exportid="temp0">
                <p>Hello world Export</p>
                <p>Hellort</p>
                <template exportid="temp1"></template>
                <template exportid="temp2" inherits="temp1 temp3">
                    <p>Hello world Export</p>
                    <p>Hellort</p>
                </template>
            </template>`;
            const { document, window } = createDocument( head, body );
            await delay( 20 );
            const { webqit: { Observer } } = window;
            // -------
            const temp0 = Observer.deep( document.modules, getQueryPath( 'temp0' ), Observer.get );
            expect( temp0 ).to.have.property( 'modules' );
            expect( temp0.modules[ '#default' ] ).to.have.length( 2 );
            const temp2 = Observer.deep( document.modules, getQueryPath( 'temp0/temp2' ), Observer.get );
            expect( temp2 ).to.have.property( 'modules' );
            // -------
            const temp1Inherited = Observer.deep( document.modules, getQueryPath( 'temp0/temp2/temp1' ), Observer.get );
            expect( temp1Inherited ).to.have.property( 'modules' );
            // -------
            const temp3Observed = [];
            Observer.deep( document.modules, getQueryPath( 'temp0/temp2/temp3' ), Observer.observe, record => {
                temp3Observed.push( record.value );
            } );
            // -------
            const temp3 = document.createElement( 'template' );
            temp3.setAttribute( 'exportid', 'temp3' );
            temp0.content.appendChild( temp3 );
            // -------
            expect( temp3Observed ).to.be.an( 'array' ).with.length( 1 );
            expect( temp3Observed[ 0 ] ).to.have.property( 'modules' );
            // -------
            const temp3Inherited = Observer.deep( document.modules, getQueryPath( 'temp0/temp2/temp3' ), Observer.get );
            expect( temp3Inherited ).to.have.property( 'modules' );
            // -------
        } );

    } );

    describe( `Remote...`, function() {
        this.timeout( 10000 );

        it( `Add remote lazy module, with a nested remote lazy module, then resolve.`, async function() {

            const head = ``, body = ``;
            const { document, window } = createDocument( head, body, window => {
                // Define remote responses
                const temp0 = `
                <template exportid="temp1" src="/temp1.html" loading="lazy"></template>`;
                const temp1 = `
                <template exportid="temp2" src="/temp2.html"></template>`;
                const temp2 = `
                <template exportid="temp3"></template>
                <p>Hello world Export</p>
                <p>Hellort</p>`;
                const timeout = 1000;
                mockRemoteFetch( window, { '/temp0.html': temp0, '/temp1.html': temp1, '/temp2.html': temp2 }, timeout );
            } );
            await delay( 20 );
            const { webqit: { Observer } } = window;
            // -------
            // Add a remote module
            const templateEl = document.createElement( 'template' );
            templateEl.setAttribute( 'exportid', 'temp0' );
            templateEl.setAttribute( 'loading', 'lazy' );
            templateEl.setAttribute( 'src', '/temp0.html' );
            document.head.appendChild( templateEl );
            // -------
            // Add the import element to with a view to waiting for the remote module
            const temp0 = Observer.deep( document.modules, getQueryPath( 'temp0' ), Observer.get );
            expect( temp0 ).to.have.property( 'modules' );
            await delay( 2100 );
            // temp1 shouldn't have been automatically loaded still
            const hasTemp1 = Observer.deep( document.modules, getQueryPath( 'temp0/temp1' ), Observer.has );
            expect( hasTemp1 ).to.be.false;
            // Try access temp1 to trigger loading and await
            const _temp1 = await Observer.deep( document.modules, getQueryPath( 'temp0/temp1' ), Observer.get );
            expect( _temp1 ).to.have.property( 'modules' );
            // -------
            // Receive updates
            const temp3Observed = [];
            Observer.deep( document.modules, getQueryPath( 'temp0/temp1/temp2/temp3' ), Observer.observe, ( record, lifecycle ) => {
                temp3Observed.push( record.value );
            } );
            await delay( 2100 );
            // -------
            // temp2 should be loaded by now
            expect( temp3Observed ).to.be.an( 'array' ).with.length( 1 );
            expect( temp3Observed[ 0 ] ).to.have.property( 'modules' );
            expect( temp3Observed[ 0 ].getAttribute( 'exportid' ) ).to.eq( 'temp3' );
        } );
    } );

    describe( `Context...`, function() {
        this.timeout( 10000 );

        it( `Use the context API to fire a scoped-request that is imitially resolved from the document and then from a scoped context.`, async function() {

            const head = `
            <template exportid="temp0">
                <template exportid="temp-head1">
                    <p>Hello world Export</p>
                    <p>Hellort</p>
                </template>
            </template>`;
            const body = `
            <div></div>`;
            const { document, window } = createDocument( head, body );
            await delay( 20 );

            // -------
            const addScopedModules = () => {
                const templateEl = document.createElement( 'template' );
                templateEl.setAttribute( 'exportid', 'temp0' );
                templateEl.toggleAttribute( 'scoped', true );
                const scoped = document.body.appendChild( templateEl );
                document.body.setAttribute( 'importscontext', '/' );
                return scoped;
            };
            // -------
            const contextRequest = ( el, params, callback ) => {
                const request = { type: 'HTMLModules', live: true, ...params };
                const event = new document.context.ContextRequestEvent( request, callback, {
                    bubbles: true,
                } );
                return el.dispatchEvent( event );
            };
            // -------
            await 'For some reason, the <template> element in the head needs to show up in the document modulesObj';
            const modulesObjs = [], div = document.querySelector( 'div' );
            // -------
            contextRequest( div, { detail: '/temp0', diff: false }, response => {
                modulesObjs.push( response );
            } );
            expect( modulesObjs ).to.have.length( 1 );
            expect( modulesObjs[ 0 ] ).to.have.property( 'scoped', false );
            // -------
            const scoped = addScopedModules();
            expect( modulesObjs ).to.have.length( 3 );
            expect( modulesObjs[ 1 ] ).to.have.property( 'scoped', true );
            expect( modulesObjs[ 2 ] ).to.have.property( 'scoped', true );
            // -------
            scoped.remove();
            expect( modulesObjs ).to.have.length( 4 );
            expect( modulesObjs[ 3 ] ).to.have.property( 'scoped', false );
            // -------
            document.body.appendChild( scoped );
            expect( modulesObjs ).to.have.length( 5 );
            expect( modulesObjs[ 4 ] ).to.have.property( 'scoped', true );
            // -------
            const unscoped = document.modules.temp0;
            unscoped.remove();
            document.head.appendChild( unscoped );
            document.body.remove();
            expect( modulesObjs ).to.have.length( 5 );
        } );
    } );

} );
