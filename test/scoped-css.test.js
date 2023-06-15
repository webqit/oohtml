
/**
 * @imports
 */
import { expect } from 'chai';
import { createDocument, delay } from './index.js';

describe(`Test: Scoped CSS`, function() {

    describe(`Styles`, function() {

        it(`Should do basic rewrite`, async function() {
            const head = '<meta name="scoped-css" content="style.strategy=@scope">', body = `
            <div>
              <h1>Hello World!</h1>
              <style scoped>
                h1 {
                    color: red;
                }
              </style>
            </div>`;

            const window = createDocument( head, body );
            await delay( 160 ); // Takes time to dynamically load Contract compiler
            const styleElement = window.document.querySelector( 'style' );

            expect( styleElement.textContent.substring( 0, 13 ) ).to.eq( '@scope from (' );
        });

    });

});