
/**
 * @imports
 */
import { expect } from 'chai';
import jsdom from 'jsdom';
import { scopeQuery } from '../src/object-ql.js';

const dom = ( body = '', head = '' ) => {
    const instance  = new jsdom.JSDOM(`
    <!DOCTYPE html><html><head>
    ${head}
    </head><body>
    ${body}
    </body></html>
    `);
    return instance;
};

describe(`Test: HTML Modules`, function() {

    describe(`Module Query`, function() {

        it(`Should query with a basic path expression.`, function() {
            const { window: { document } } = dom();
            expect( document ).to.have.property( 'title' );
        });

    });

});