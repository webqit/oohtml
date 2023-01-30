
/**
 * @imports
 */
import { expect } from 'chai';
import { delay, createDocument } from './index.js';

describe(`Namespaced HTML`, function() {

    describe( `Basic...`, function() {
        
        const head = `
        <meta name="oohtml" content="attr.id=data-id" />`;
        const body = `
        <div data-id="main" namespace>
            <div data-id="child"></div>
        </div>`;
        const { document } = createDocument( head, body );

        it ( `The document object and elements should expose a "namespace" property each...`, async function() {
            expect( document ).to.have.property( 'namespace' );
            expect( document.namespace.get( 'main' ) ).to.have.property( 'namespace' );
        } );

        it ( `Namespace objects should be observable...`, async function() {
            let idReceived = null;
            document.namespace.observe( 'set', '*', ( value, key ) => {
                idReceived = key;
            } );
            const item = document.createElement( 'div' );
            item.setAttribute( 'data-id', 'some-id' );
            document.body.appendChild( item );
            await delay( 0 );
            expect( idReceived ).to.eq( 'some-id' );
        } );

    } );

    describe( `query()...`, function() {

        const head = ``;
        const body = `
        <div namespace id="space0">
            <div namespace id="space1">
                <div namespace id="space2"></div>
            </div>
        </div>`;
        const { document } = createDocument( head, body );

        it ( `doucment.namespace.query() should get the target element...`, async function() {
            const space2Result = document.namespace.query( 'space0/space1/space2' );
            expect( space2Result ).to.an( 'array').with.length( 1 );
        } );

        it ( `doucment.templates.query() in live mode should capture the addition of target module, then STOP capturing on being disconnected...`, async function() {
            const space2Result = document.namespace.query( 'space0/space1/space2' );
            let space3Result;
            const conn = document.namespace.query( 'space0/space1/space2/spae3', result => {
                space3Result = result;
            }, { realtime: true } );
            // Addition...
            const namespaceEl = document.createElement( 'div' );
            namespaceEl.setAttribute( 'id', 'spae3' );
            space2Result[ 0 ].value.appendChild( namespaceEl );
            await delay( 0 );
            expect( space3Result ).to.an( 'array').with.length( 1 );
            // Removal
            namespaceEl.remove();
            await delay( 0 );
            expect( space3Result ).to.an( 'array').with.length( 0 );
            // Re-addition
            conn.unsubscribe();
            space2Result[ 0 ].value.appendChild( namespaceEl );
            await delay( 0 );
            expect( space3Result ).to.an( 'array').with.length( 0 );
        } );

    } );

} );

