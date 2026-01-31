
/**
 * @imports
 */
import { expect } from 'chai';
import { createDocument, delay } from './index.js';

describe(`Bindings API`, function() {

    describe( `Basic...`, function() {
        
        const head = ``;
        const body = ``;
        const { document, window } = createDocument( head, body );

        it ( `The document object and elements should expose a "bindings" property each...`, async function() {
            //expect( document ).to.have.property( 'bindings' );
            //expect( document.body ).to.have.property( 'bindings' );
        } );

        it ( `Bindings objects should be observable...`, async function() {
            await delay( 200 );
            const { webqit: { Observer } } = window;
            
            let idReceived = null;
            Observer.observe( document.bindings, records => {
                idReceived = records[ 0 ].key;
            } );
            document.bindings.someKey = 'someValue'; // new
            expect( idReceived ).to.eq( 'someKey' );
            // -------------
            let changes = [];
            Observer.observe( document.bindings, records => {
                changes.push( ...records );
            } );
            document.bindings.someKey2 = 'someValue2'; // new
            document.bind( { someKey: 'someValue'/* update */, someKey3: 'someValue3'/* new */ } );
            expect( changes ).to.an( 'array' ).with.length( 4 ); // (1) sets: someKey2, (2) deletes: someKey2, (3) updates: someKey, (4) sets: someKey3;
        } );

    } );

} );

