
/**
 * @imports
 */
import { expect } from 'chai';
import { createDocument, delay } from './index.js';

describe(`Test: Scoped JS`, function() {

    describe(`Scripts`, function() {

        it(`Should do basic observe`, async function() {
            const head = ``;
            const body = `            
            <h1>Hello World!</h1>
            <script scoped quantum>
                testRecords.push( this );
                console.log('-------scoped JS here.', this);
            </script>`;

            const window = createDocument( head, body );
            window.testRecords = [];
            await delay( 500 ); // Takes time to dynamically load Reflex compiler

            expect( window.testRecords ).to.have.length( 1 );
            expect( window.testRecords[ 0 ] ).to.eql( window.document.body );
        });

    });

});