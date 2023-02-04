
/**
 * @imports
 */
import { expect } from 'chai';
import { delay, createDocumentForSubscript, Observer } from './index.js';

describe(`Subscript`, function() {

    describe( `Basic...`, function() {
        
        const head = ``;
        const body = `
        <div>
            <script type="subscript">
            document.title = document.newTitle || 'Hello from Subscript!';
            </script>
        </div>`;
        const window = createDocumentForSubscript( head, body ), { document } = window;
        const script = document.querySelector( 'script' );

        it ( `The "window.wq" object should expose a "SubscriptElement" class...`, async function() {
            expect( window.wq ).to.have.property( 'SubscriptElement' );
            expect( window.wq.SubscriptElement ).to.have.property( 'extend' );
        } );

        it ( `The "SubscriptElement.inspect()" function should expose an element's Subscript methods and embbeded script...`, async function() {
            expect( window.wq.SubscriptElement ).to.have.property( 'inspect' );
            const scriptContext = document.querySelector( 'div' );
            const runtimes = window.wq.SubscriptElement.inspect( scriptContext );
            expect( runtimes.size ).to.eq( 1 );
        } );

        const docTitle1 = 'Hello from Subscript!';
        it ( `Embbeded script should set string "${ docTitle1 }" to document.title...`, async function() {
            expect( document.title ).to.eq( docTitle1 );
        } );

        const docTitle2 = 'Hello again from Subscript!';
        it ( `Embbeded script should set new string "${ docTitle2 }" to document.title - as observed via the Observer API...`, async function() {
            Observer.set( document, 'newTitle', docTitle2 );
            expect( document.title ).to.eq( docTitle2 );
        } );

        it ( `Embbeded script should no more be reactive on being removed from DOM...`, async function() {
            script.remove();
            await delay( 0 );
            Observer.set( document, 'newTitle', docTitle1 );
            expect( document.title ).to.eq( docTitle2 );
        } );

        const docTitle3 = 'Hello yet again from Subscript!';
        it ( `Embbeded script should again be reactive on being added to the DOM...`, async function() {
            document.querySelector( 'div' ).appendChild( script );
            await delay( 0 );
            Observer.set( document, 'newTitle', docTitle3 );
            expect( document.title ).to.eq( docTitle3 );
        } );

    } );

    describe( `SubscriptElement.extend()...`, function() {

        const head = ``;
        const body = `<my-element></my-element>`;
        const window = createDocumentForSubscript( head, body ), { document } = window;

        class MyElement extends window.wq.SubscriptElement.extend( window.HTMLElement ) {
            static get subscriptMethods() { return [ 'render' ]; }
            connectedCallback() { super.connectedCallback(); this.render(); }
            render() { this.innerHTML = this.newContent || 'Hello from Subscript!'; }
        }
        window.customElements.define( 'my-element', MyElement );
        const myElement = document.querySelector( 'my-element' );

        it ( `"instanceof" should work correctly for custom elements created from SubscriptElement.extend()...`, async function() {
            expect( myElement ).to.instanceOf( MyElement );
        } );

        const innerHTML1 = 'Hello from Subscript!';
        it ( `"myElement.render()" should set string "${ innerHTML1 }" to document.title...`, async function() {
            expect( myElement.innerHTML ).to.eq( innerHTML1 );
        } );

        const innerHTML2 = 'Hello again from Subscript!';
        it ( `"myElement.render()" should set new string "${ innerHTML2 }" to document.title - as observed via the Observer API...`, async function() {
            Observer.set( myElement, 'newContent', innerHTML2 );
            expect( myElement.innerHTML ).to.eq( innerHTML2 );
        } );

        it ( `"myElement.render()" should no more be reactive on element being removed from DOM...`, async function() {
            myElement.remove();
            await delay( 0 );
            Observer.set( myElement, 'newContent', innerHTML1 );
            expect( myElement.innerHTML ).to.eq( innerHTML2 );
        } );

        const innerHTML3 = 'Hello yet again from Subscript!';
        it ( `"myElement.render()" should again be reactive on element being added to the DOM...`, async function() {
            document.body.appendChild( myElement );
            await delay( 0 );
            Observer.set( myElement, 'newContent', innerHTML3 );
            expect( myElement.innerHTML ).to.eq( innerHTML3 );
        } );

    } );

} );
