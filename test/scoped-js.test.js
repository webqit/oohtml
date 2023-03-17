
/**
 * @imports
 */
import { expect } from 'chai';
import { delay, createDocumentForScopedJS } from './index.js';

describe(`Test: Scoped JS`, function() {

    describe(`Scripts`, function() {

        it(`Should do basic observe`, async function() {
            const head = '', body = `            
            <h1>Hello World!</h1>
            <script>
            let ul = document.createElement( 'ul' );
            let li = document.createElement( 'li' );
            ul.appendChild(li);
            document.body.appendChild(ul);
            </script>
            <div><p>Hello World!</p></div>`;

            const window = createDocumentForScopedJS( head, body, ( window, dom ) => {
                // Observer is bound before document is parsed.
                // Elements are going to show up as they are being parsed.
                dom.realtime( window.document ).observe( 'h1,p,li', record => {
                    window.testRecords.push( record.entrants[ 0 ] );
                }, { subtree: true } );
            }, { runScripts: 'dangerously' } );

            await delay( 60 );
            expect( window.testRecords ).to.have.length( 3 );
        });


    });

    describe(`Scripts`, function() {

        it(`Should do basic observe`, async function() {
            const head = '', body = `            
            <h1>Hello World!</h1>
            <script scoped contract>
                testRecords.push( this );
                console.log('-------scoped JS here.');
            </script>`;

            const window = createDocumentForScopedJS( head, body );

            await delay( 60 );
            expect( window.testRecords ).to.have.length( 1 );
            expect( window.testRecords[ 0 ] ).to.eql( window.document.body );
            //console.log('::::::::::::', window.testRecords );
        });

    });

});