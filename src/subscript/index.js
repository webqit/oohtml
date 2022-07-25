
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import { SubscriptFunction } from '@webqit/subscript';
import { _internals, _isFunction, _isNumeric } from '@webqit/util/js/index.js';
import Observable from '../Observable.js';





/**
 * Internals shorthand.
 * 
 * @param Any el 
 * @param Array args 
 * 
 * @return Any
 */
const _ = ( el, ...args ) => _internals( el, 'oohtml', ...args );

/**
 * @Exports
 * 
 * The internal Namespace object
 * within elements and the document object.
 */
function classes( params ) {
	const window = this, { Observer } = window.wq;
    // --------------------
	class SubscriptElement {

        /**
         * @params
         */
        static get subscriptParams() { return { ...( params.subscriptParams || {} ), globalsAutoObserve: [ 'document' ] }; }
        static get compilerParams() { return { ...( params.compilerParams || {} ) }; }
        static get runtimeParams() { return { ...( params.runtimeParams || {} ) }; }

        /**
         * Create a new SubscriptElement class that extends the given base class.
         * 
         * @param Class   BaseElement
         * 
         * @return Class
         */
        static extend( BaseElement ) {
            class ExtendedSubscriptElement extends BaseElement {
                static get subscriptMethods() { return []; }
                constructor() {
                    super();
                    this.constructor.subscriptMethods.forEach( methodName => {
                        if ( !this[ methodName ] ) { throw new Error( `[static get subscriptMethods()]: "${ methodName }" is not a method.` ); }
                        if ( methodName === 'constructor' ) { throw new Error( `Class constructors cannot be subscript methods.` ); }
                        this[ methodName ] = SubscriptElement.addMethod( this, this[ methodName ] );
                    } );
                }
                connectedCallback() {
                    // Often needed on second-time addition to the DOM, as removal from DOM would have disconnected observation.
                    // Otherwise, the hook - collection.observe( 'set', '*' ) below - should suffice
                    connectedCallback.call( this );
                    if ( super.connectedCallback ) super.connectedCallback();
                }
                disconnectedCallback() {
                    disconnectedCallback.call( this );
                    if ( super.disconnectedCallback ) super.disconnectedCallback();
                }
            }
            return ExtendedSubscriptElement;
        }

        /**
         * Inspects an element instance and returns all Subscript runtimes
         * - runtimes of both methods and scripts.
         * 
         * @param Element   element
         * 
         * @return Map
         */
        static inspect( element ) {
            let collection = _( element ).get( 'runtimes' );
            if ( !collection ) {
                collection = new Observable;
                collection.observe( 'set', '*', value => {
                    // Validate...
                    if ( !_isFunction( value ) || !_isFunction( value.thread ) ) { throw new Error( `Values must be a SubscriptFunction.` ); }
                    // Start observing?
                    if ( collection.size === 1 ) { connectedCallback.call( element ); }
                } );
                collection.observe( 'delete', '*', () => {
                    // Stop observing?
                    if ( !collection.size ) { disconnectedCallback.call( element ); }
                } );
                _( element ).set( 'runtimes', collection );
            }
            return collection;
        }

        /**
         * Executes a script in the context of the given element.
         * 
         * @param Element   element
         * @param <script>|String   script
         * 
         * @return Function
         */
        static compile( element, script ) {
            const source = ( typeof script === 'string' ? script : ( script.textContent || '' ) ).trim();
            return integrateRuntime( element, SubscriptFunction.call( element, source, { compilerParams: this.compilerParams, runtimeParams: this.runtimeParams } ) );
        }

        /**
         * Transforms a function to a method on the given element.
         * 
         * @param Element   element
         * @param Function   script
         * 
         * @return Function
         */
        static addMethod( element, method ) {
            const subscriptFunction = SubscriptFunction.clone( method, element, this.compilerParams, this.runtimeParams );
            return integrateRuntime( element, subscriptFunction );
        }

    }
    function integrateRuntime( element, subscriptFunction ) {
        const collection = SubscriptElement.inspect( element );
        let id = subscriptFunction.name;
        if ( !id ) { id = [ ...collection.keys() ].filter( k => _isNumeric( k ) ).length; }
        collection.set( id, subscriptFunction );
        return subscriptFunction;
    }
    function connectedCallback() {
        if ( !Observer || _( this ).get( 'realtime' ) ) return;
        const collection = SubscriptElement.inspect( this );
        const signals = ( mutations, evt, namespace = [] ) => {
            collection.forEach( runtime => runtime.thread( ...mutations.map( mu => namespace.concat( mu.path ) ) ) );
        };
        ( SubscriptElement.subscriptParams.globalsAutoObserve || [] ).forEach( identifier => {
            Observer.observe( window[ identifier ], mutations => signals( mutations, null, [ identifier ] ), { 
                subtree: true, diff: true, tags: [ this, 'subscript-element', identifier ], unique: true
            } );
        } );
        Observer.observe( this, mutations => signals( mutations, null, [ 'this' ] ), { 
            subtree: true, diff: true, tags: [ this, 'subscript-element', 'this' ], unique: true
        } );
        _( this ).set( 'realtime', true );
    }
    function disconnectedCallback() {
        if ( !Observer || !_( this ).get( 'realtime' ) ) return;
        ( SubscriptElement.subscriptParams.globalsAutoObserve || [] ).forEach( identifier => {
            Observer.unobserve( window[ identifier ], null, null, { 
                subtree: true, tags: [ this, 'subscript-element', identifier ]
            } );
        } );
        Observer.unobserve( this, null, null, { 
            subtree: true, tags: [ this, 'subscript-element', 'this' ]
        } );
        _( this ).set( 'realtime', false );
    }
    // --------------------
	window.wq.SubscriptElement = SubscriptElement;
	return { SubscriptElement };
}

/**
 * Performs realtime capture of elements and builds their relationships.
 *
 * @param Object params
 *
 * @return Void
 */
function realtime( params ) {
	const window = this, { dom, SubscriptElement } = window.wq;
	dom.realtime().querySelectorAll( params.selectors.script, ( script, connectedState ) => {
        let scriptMeta = _( script ).get( 'meta' );
		if ( connectedState ) {
            if ( scriptMeta ) return;
            const context = script.parentNode;
            const compiled = SubscriptElement.compile( context, script );
            _( script ).set( 'meta', { context, compiled } );
            compiled(); // Auto-run
		} else if ( scriptMeta ) {
            const collection = SubscriptElement.inspect( scriptMeta.context );
            collection.forEach( ( entry, key ) => {
                if ( entry === scriptMeta.compiled ) { collection.delete( key ); }
            } );
            _( script ).delete( 'meta' );
		}
	}, { each: true } );
}

/**
 * @init
 * 
 * @param Object $params
 */
export default function init( $params = {} ) {
	const window = this, dom = wqDom.call( window );
    // -------
    // params
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        selectors: { script: 'script[type="subscript"]', },
    } );
	const { SubscriptElement } = classes.call( this, params );
    // -------
    // realtime?
    realtime.call( this, params );
    // -------
    // APIs
	return { SubscriptElement };
}