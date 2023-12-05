
/**
 * @imports
 */
import { expect } from 'chai';
import { createDocument, delay } from './index.js';

describe(`Namespaced HTML`, function() {

    describe( `Basic...`, async function() {
        
        const head = ``;
        const body = `
        <div id="main" namespace>
            <div id="child"></div>
        </div>`;
        const { document, window } = createDocument( head, body );
        await delay( 60 );
        const { webqit: { Observer } } = window;

        it ( `The document object and elements should expose a "namespace" property each...`, async function() {
            expect( document ).to.have.property( 'namespace' );
            expect( document.namespace.main ).to.have.property( 'namespace' ).that.have.property( 'child' );
        } );

        it ( `Namespace objects should be observable...`, async function() {
            let idReceived = null;
            Observer.observe( document.namespace, records => {
                idReceived = records[ 0 ].key;
            } );
            const item = document.createElement( 'div' );
            item.setAttribute( 'id', 'some-id' );
            document.body.appendChild( item );
            expect( idReceived ).to.eq( 'some-id' );
        } );

        it ( `Namespace attributes should be applicable dynamically...`, async function() {
            expect( Object.keys( document.namespace ).length ).to.eq( 2 );
            document.body.toggleAttribute( 'namespace', true );
            expect( Object.keys( document.namespace ).length ).to.eq( 0 );
            expect( Object.keys( document.body.namespace ).length ).to.eq( 2 );
            document.body.toggleAttribute( 'namespace', false );
            expect( Object.keys( document.namespace ).length ).to.eq( 2 );
            expect( Object.keys( document.body.namespace ).length ).to.eq( 0 );
        } );

    } );

} );

