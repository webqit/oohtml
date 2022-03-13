
/**
 * @imports
 */
import { _internals, _isNumeric, _isFunction } from '@webqit/util/js/index.js';
import Subscript from '@webqit/subscript';

/**
 * ---------------------------
 * Subscript Element
 * ---------------------------
 */

export const Element  = BaseElement => class extends BaseElement {

    /**
     * @subscript Element
     */

    static get subscriptMethods() {
        return [ 'render' ];
    }

    static get subscriptParams() {
        return { globalsAutoObserve: [ 'document' ] };
    }

    static implement( element, subscriptFunction ) {
        let subscriptConsole = _internals( element, 'oohtml', 'subscript', 'console' );
        let id = subscriptFunction.name;
        if ( !id ) {
            id = [ ...subscriptConsole.keys() ].filter( k => _isNumeric( k ) ).length;
        }
        subscriptConsole.set( id, subscriptFunction );
        return subscriptFunction;
    }
    
    static implementScript( element, script ) {
        let source = ( script.textContent || '' ).trim();
        return this.implement( element, Subscript.call( element, source ) );
    }
    
    static implementMethod( element, method ) {
        if ( method.name === 'constructor' ) {
            throw new Error(`Constructors cannot be subscript methods.`);
        }
       return this.implement( element, Subscript.clone( method, element ) );
    }

    /**
     * @constructor()
     */
    constructor() {
        super();
        const subscriptConstructor = this.constructor;
        subscriptConstructor.subscriptMethods.forEach( methodName => {
            if ( !this[ methodName ] ) return;
            let proxy = subscriptConstructor.implementMethod( this, this[ methodName ] );
            this[ methodName ] = proxy;
        } );
        if ( ( typeof WebQit === 'undefined' ) || !WebQit.Observer ) return;
        ( subscriptConstructor.subscriptParams.globalsAutoObserve || [] ).forEach( identifier => {
            WebQit.Observer.link( globalThis, identifier, globalThis[ identifier ] );
        } );
    }

    /**
     * @connectedCallback()
     */
    connectedCallback() {
        if ( ( typeof WebQit === 'undefined' ) || !WebQit.Observer ) return;
        const signals = ( mutations, evt, namespace = [] ) => {
            let subscriptConsole = _internals( this, 'oohtml', 'subscript', 'console' );
            subscriptConsole.forEach( api => api.thread( ...mutations.map( mu => ( { ...mu, path: namespace.concat( mu.path ) } ) ) ) );
        };
        WebQit.Observer.observe( globalThis, signals, {
            subtree: true, tags: [ this, 'subscript-element', 'globals' ], unique: true
        } );
        WebQit.Observer.observe( this, mutations => signals( mutations, null, [ 'this' ] ), { 
            subtree: true, tags: [ this, 'subscript-element', 'this' ], unique: true
        } );
        if ( super.connectedCallback ) {
            super.connectedCallback();
        }
    }

    /**
     * @disconnectedCallback()
     */
    disconnectedCallback() {
         let subscriptConsole = _internals( this, 'oohtml', 'subscript', 'console' );
         subscriptConsole.forEach( api => api.dispose() );
        if ( ( typeof WebQit === 'undefined' ) || !WebQit.Observer ) return;
        WebQit.Observer.unobserve( globalThis, null, null, { 
            subtree: true, tags: [ this, 'subscript-element', 'globals' ]
        } );
        WebQit.Observer.unobserve( this, null, null, { 
            subtree: true, tags: [ this, 'subscript-element', 'this' ]
        } );
        if ( super.disconnectedCallback ) {
            super.disconnectedCallback();
        }
    }

    get subscriptConsole() {
        return _internals( this, 'oohtml', 'subscript', 'console' );
    }

    /**
     * @render()
     */

    render() {}

}