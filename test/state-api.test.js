
/**
 * @imports
 */
import { expect } from 'chai';
import { createDocument } from './index.js';
import Observer from '@webqit/observer';

describe(`State API`, function() {

    describe( `Basic...`, function() {
        
        const head = ``;
        const body = ``;
        const { document } = createDocument( head, body );

        it ( `The document object and elements should expose a "state" property each...`, async function() {
            expect( document ).to.have.property( 'state' );
            expect( document.body ).to.have.property( 'state' );
        } );

        it ( `State objects should be observable...`, async function() {
            let idReceived = null;
            Observer.observe( document.state, records => {
                idReceived = records[ 0 ].key;
            } );
            document.state.someKey = 'someValue';
            expect( idReceived ).to.eq( 'someKey' );
        } );

    } );

} );

