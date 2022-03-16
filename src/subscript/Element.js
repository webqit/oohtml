
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

    static get subscriptParams() {
        return { globalsAutoObserve: [ 'document' ] };
    }

    static get subscriptMethods() {
        return [ 'render' ];
    }

    static implement( element, subscriptFunction ) {
        let subscripts = _internals( element, 'oohtml', 'subscripts' );
        let id = subscriptFunction.name;
        if ( !id ) {
            id = [ ...subscripts.keys() ].filter( k => _isNumeric( k ) ).length;
        }
        subscripts.set( id, subscriptFunction );
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
     * @disconnectedCallback()
     */
    static doConnectedCallback( instance ) {
        if ( ( typeof WebQit === 'undefined' ) || !WebQit.Observer ) return;
        const subscripts = _internals( instance, 'oohtml', 'subscripts' );
        const signals = ( mutations, evt, namespace = [] ) => {
            subscripts.forEach( api => api.thread( ...mutations.map( mu => namespace.concat( mu.path ) ) ) );
        };
        ( this.subscriptParams.globalsAutoObserve || [] ).forEach( identifier => {
            WebQit.Observer.observe( globalThis[ identifier ], mutations => signals( mutations, null, [ identifier ] ), { 
                subtree: true, diff: true, tags: [ instance, 'subscript-element', identifier ], unique: true
            } );
        } );
        WebQit.Observer.observe( instance, mutations => signals( mutations, null, [ 'this' ] ), { 
            subtree: true, diff: true, tags: [ instance, 'subscript-element', 'this' ], unique: true
        } );
    }

    /**
     * @disconnectedCallback()
     */
    static doDisconnectedCallback( instance ) {
        if ( ( typeof WebQit === 'undefined' ) || !WebQit.Observer ) return;
        ( this.subscriptParams.globalsAutoObserve || [] ).forEach( identifier => {
            WebQit.Observer.unobserve( globalThis[ identifier ], null, null, { 
                subtree: true, tags: [ instance, 'subscript-element', identifier ]
            } );
        } );
        WebQit.Observer.unobserve( instance, null, null, { 
            subtree: true, tags: [ instance, 'subscript-element', 'this' ]
        } );
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
    }

    /**
     * @connectedCallback()
     */
    connectedCallback() {
        this.constructor.doConnectedCallback( this );
        if ( super.connectedCallback ) {
            super.connectedCallback();
        }
    }

    /**
     * @disconnectedCallback()
     */
    disconnectedCallback() {
        this.constructor.doDisconnectedCallback( this );
        if ( super.disconnectedCallback ) {
            super.disconnectedCallback();
        }
    }

    get subscripts() {
        return _internals( this, 'oohtml', 'subscripts' );
    }

    /**
     * @render()
     */

    render() {}

}