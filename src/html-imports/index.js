
/**
 * @imports
 */
import { _internals } from '@webqit/util/js/index.js';
import { _any, _from as _arrFrom } from '@webqit/util/arr/index.js';
import { parseIdentifierToken } from '../object-ql.js';

/**
 * ---------------------------
 * HTML Partials
 * ---------------------------
 */

/**
 * @ImportElementMixin
 * 
 * The export element class mixin.
 */
const _ = el => _internals( el, 'oohtml' );
function ImportElementMixin( BaseClass, params ) {
    const window = this, dom = window.wq.dom( window );
    return class extends BaseClass {

         /**
         * @constructor
         */
        constructor( ...args ) {
            super( ...args );
            this.el = this.el || this;
            _( this.el ).set( 'slottedElements', new Set() );
        }

        /**
         * Returns the slot's module reference, if any.
         *
         * @return string
         */
        get moduleRef() {
            return _( this.el ).get( 'moduleref' );
        }

        /**
         * Returns the slot's name.
         *
         * @return string
         */
        get importId() {
            return _( this.el ).get( 'importId' );
        }

        /**
         * Returns the slot's import Modifiers.
         *
         * @return string
         */
        get importModifiers() {
            return _( this.el ).get( 'importModifiers' );
        }

        /**
         * Returns the slot's anchorNode.
         *
         * @return array
         */
        get anchorNode() {
            return _( this.el ).get( 'anchorNode' );
        }

        /**
         * Returns the slot's compositionBlock, if any.
         *
         * @return array
         */
        get compositionBlock() {
            return _( this.el ).get( 'compositionBlock' );
        }

        /**
         * Returns the slot's slotted elements.
         *
         * @return array
         */
        get slottedElements() {
            return _( this.el ).get( 'slottedElements' );
        }

        /**
         * Returns the slot's implementable exports
         *
         * @return array
         */
        get exports() {
            return _( this.el ).get( 'exports' );
        }

        /**
         * Creates the slot's anchor node.
         *
         * @return Element
         */
        createAnchorNode() {
            if ( !params.isomorphic ) { return window.document.createTextNode( '' ) }
            return window.document.createComment( this.el.outerHTML );
        }

        /**
         * Resolves slot and keeps it in sync
         *
         * @return void
         */
        connectedCallback() {
            if ( _( this.el ).get( 'anchorNode' ) ) return;
            const anchorNode = this.createAnchorNode();
            this.bindAnchorElement( anchorNode );
        }
        
        /**
         * Called by the Slots hydrator.
         *
         * @param Comment       anchorNode
         *
         * @return void
         */
        bindAnchorElement( anchorNode ) {
            // Create a reference to anchor node
            _( this.el ).set( 'anchorNode', anchorNode );
            _( anchorNode ).set( 'anchoredNode', this.el );
        }

        /**
         * Resolves the slot from a module query result.
         *
         * @param Map               moduleQueryResult
         * @param String            importId
         * @param Object            importModifiers
         *
         * @return void
         */
        resolve( moduleQueryResult, importId = null, importModifiers = {} ) {
            const importId = _( this.el ).get( 'importId' );
            const importModifiers = _( this.el ).get( 'importModifiers' );
        }

        /**
         * Fills the slot with slottableElements
         *
         * @param Array            slottableElements
         *
         * @return void
         */
        fill( slottableElements ) {
            if ( _any( params.importInertContexts, inertContext => this.el.closest( inertContext ) ) ) return;
            if ( Array.isArray( slottableElements ) ) { slottableElements = new Set( slottableElements ) }
            
            // If no more available in source, delete
            const slottedElementsUnchanged = new Set;
            const slottedElements = _( this.el ).get( 'slottedElements' );
            slottedElements.forEach( slottedElement => {
                const slottedElementOriginal = _( slottedElement ).get( 'original' );
                // If still available in source, simply leave unchanged
                // otherwise remove it from slot... to reflect this change
                if ( slottableElements.has( slottedElementOriginal ) ) {
                    slottableElements.delete( slottedElementOriginal );
                    slottedElementsUnchanged.add( slottedElement );
                } else { slottedElement.remove(); }
            } );

            // Make sure anchor node is what's in place...
            // not the import element itslef - but all only when we have newSlottedElements.size
            const anchorNode = _( this.el ).get( 'anchorNode' );
            if ( this.el.isConnected && newSlottedElements.size ) { this.el.replaceWith( anchorNode ) }

            // Insert slottables now
            const newSlottedElements = new Set;
            slottableElements.forEach( slottableElement => {
                // Clone each slottable element and give it a reference to its original
                // Then add to slot
                const slottableElementClone = slottableElement.cloneNode( true );
                _( slottableElementClone ).set( 'original', slottableElement );
                newSlottedElements.add( slottableElementClone );
                anchorNode.before( slottableElementClone );
            } );

            // New total slotted elements should included those unchanged
            slottedElementsUnchanged.forEach( slottedElement => newSlottedElements.add( slottedElement ) );
            this.bindSlottedElements( newSlottedElements );
        }

        /**
         * Empty slot.
         *
         * @return void
         */
        empty() { _( this.el ).get( 'slottedElements' ).forEach( slottedElement => slottedElement.remove() ); }

        /**
         * Bind a slotted element.
         *
         * @param array              newSlottedElements
         *
         * @return void
         */
        bindSlottedElements( newSlottedElements ) {
            this.unbindSlottedElements();
            if ( Array.isArray( newSlottedElements ) ) { newSlottedElements = new Set( newSlottedElements ) }

            // Slotted elements should be added to the slottedElements set
            // and should have a reference back to this slot
            const slottedElements = _( this.el ).get( 'slottedElements' );
            newSlottedElements.forEach( newSlottedElement => {
                slottedElements.add( newSlottedElement );
                _( newSlottedElement ).set( 'slot', this.el );
            } );

            // New observer... for when all slotted elements have been removed from slot.
            const slottedElementsObserver = dom.realtime( newSlottedElements ).disconnected( ( removed, state, isTransient, addedState, removedState ) => {
                // Disconnect observer when all slotted elements have been removed from slot.
                if ( removedState && removedState.size === newSlottedElements.size ) { slottedElementsObserver.disconnect(); }
                
                // The removed slotted element should be removed from the slottedElements set
                // and should forget reference to this slot
                removed.forEach( rm => {
                    // Let's ensure this wasn't slotted again...
                    if ( !rm.parentNode ) { slottedElements.delete( rm ); }
                    // if the slotted hasn't been slotted somewhere
                    if ( _( rm ).get( 'slot' ) === this.el ) {
                        _( rm ).delete( 'slot' );
                    }
                } );

                // If this was the last of the s,ottable in the same family of IDs,
                // we should restore the original slot
                if ( !slottedElements.size ) {
                    // Must be assigned bu now
                    // for it to be removed in the first place
                    const anchorNode = _( this.el ).get( 'anchorNode' );
                    if ( anchorNode.isConnected ) { anchorNode.replaceWith( this.el ); }
                }
            }, { maintainCallState: true, ignoreTransients: true } );
            _( this.el ).set( 'slottedElementsObserver', slottedElementsObserver );

        }

        /**
         * Bind a slotted element.
         *
         * @return void
         */
        unbindSlottedElements() {
            const slottedElementsObserver = _( this.el ).get( 'slottedElementsObserver' );
            if ( slottedElementsObserver ) slottedElementsObserver.disconnect();
            _( this.el ).get( 'slottedElements' ).clear();
        }

        /**
         * Stops keeping slot in sync
         *
         * @return void
         */
        disconnectedCallback() { this.unbindSlottedElements(); }
        
    }

}

/**
 * Performs hydration for server-slotted elements.
 *
 * @param Class	                ImportElement
 * @param Object	            params
 *
 * @return Void
 */
function hydrate( ImportElement, params ) {
    const window = this;
    function scan( context ) {
        const slottedElements = new Set;
        context.childNodes.forEach( node => {
            if ( node.nodeType === 1/** ELEMENT_NODE */ ) {
                if ( !node.matches( params.exportgroupSelector ) ) return;
                slottedElements.add( node );
            } else if ( node.nodeType === 8/** COMMENT_NODE */ ) {
                const nodeValue = node.nodeValue.trim();
                if ( !nodeValue.startsWith( '<' + params.element.import ) ) return;
                if ( !nodeValue.endsWith( '</' + params.element.import + '>' ) ) return;
                const reviver = window.document.createElement( 'div' );
                reviver.innerHTML = nodeValue;
                const importEl = reviver.firstChild;
                if ( !importEl.matches( params.element.import ) ) return;
                const importElInstance = ImportElement.instance( importEl );
                importElInstance.bindAnchorElement( node/* the comment node */ );
                importElInstance.bindSlottedElements( [ ...slottedElements ] );
                // Empty basket
                slottedElements.clear();
            }
        } );
    };
    _arrFrom( window.document.querySelectorAll( params.exportgroupSelector ) ).forEach( slottedElement => {
        // hydration() might be running AFTER certain <slots> have resolved
        // and slottedElement might be a just-resolved node
        if ( _( slottedElement ).get( 'slot' ) ) return;
        if ( _( slottedElement.parentNode ).get( 'importsCan' ) ) return;
        scan( slottedElement.parentNode );
        // Scanning is once for every parent
        _( slottedElement.parentNode ).set( 'importsCan', true );
    } );
}

/**
 * Performs realtime capture of elements and their attributes
 * and their module query results; then resolves the respective import elements.
 *
 * @param Class	                ImportElement
 * @param Object	            params
 *
 * @return Void
 */
function realtime( ImportElement, params ) {
    const window = this, dom = window.wq.dom( window );
    // ----------
    // Tree...
    dom.realtime( window.document ).querySelectorAll( params.modulerefSelector, ( entry, state ) => {
        const isImportElement = entry.matches( params.element.import );
        
        // Any previous observer should be disconnected
        let attributesObserver = _( entry ).get( 'attributesObserver' );
        if ( attributesObserver ) attributesObserver.disconnect();
        
        // Handle element absence/presence
        // specially for import elements
        if ( state === 'removed' ) {
            // Also just disconnect modules query observer
            let moduleQueryObserver = _( this.el ).get( 'moduleQueryObserver' );
            if ( moduleQueryObserver ) { moduleQueryObserver.disconnect(); }
            if ( isImportElement ) { ImportElement.instance( entry ).disconnectedCallback();  }
            return;
        } else if ( isImportElement ) { ImportElement.instance( entry ).connectedCallback();  }

        // Move on to observing attributes
        // specially for import elements
        const observedAttributes = [ params.attr.moduleref ];
        if ( isImportElement ) { observedAttributes.push( params.attr.importId ) }
        attributesObserver = dom.realtime( entry ).getAttributes( observedAttributes, ( moduleRefExpr, importIdExpr = null ) => {
            
            // Any previous observer should be disconnected
            let moduleQueryObserver = _( entry ).get( 'moduleQueryObserver' );
            if ( moduleQueryObserver ) moduleQueryObserver.disconnect();

            // Set attribute props
            // specially for import elements
            _( entry ).set( 'moduleref', moduleRefExpr );
            let importId, importModifiers;
            if ( isImportElement ) {
                [ /* operator */, importId, importModifiers ] = parseIdentifierToken( importIdExpr || 'default' );
                _( entry ).set( 'importId', importId );
                _( entry ).set( 'importModifiers', importModifiers );
            }

            // Handle attribute absence
            // specially for import elements
            if ( !moduleRefExpr ) {
                if ( !isImportElement ) return;
                // We don't have a reference...
                // so, we'll inherit from compositionBlock and use it
                const compositionBlock = entry.parentNode.closest( params.modulerefSelector );
                if ( !compositionBlock ) return;

                // Cross-link with composition block
                // Then inherit its most current moduleQueryResult
                _( entry ).set( 'compositionBlock', compositionBlock );
                _( compositionBlock, 'imports' ).set( importId, entry );
                const moduleQueryResult = _( compositionBlock ).get( 'moduleQueryResult' );
                ImportElement.instance( entry ).resolve( moduleQueryResult );
                return;
            }

            // Handle attribute presence...
            // specially for import elements
            if ( isImportElement ) {
                // Here, we unlink with any previous compositionBlock
                const compositionBlock = _( entry ).get( 'compositionBlock' );
                if ( compositionBlock ) {
                    _( entry ).delete( 'compositionBlock' );
                    _( compositionBlock, 'imports' ).delete( importId );
                }
            }

            // Query modules in realtime
            // continue differently for import elements
            moduleQueryObserver = dom.realtime( window.document ).objectQuery( moduleRefExpr, moduleQueryResult => {
                _( entry ).set( 'moduleQueryResult', moduleQueryResult );
                if ( isImportElement ) { ImportElement.instance( entry ).resolve( moduleQueryResult, importId, importModifiers ); }
                else { _( entry, 'imports' ).forEach( importElement => { ImportElement.instance( importElement ).resolve( moduleQueryResult ); } ); }
            } );
            _( entry ).set( 'moduleQueryObserver', moduleQueryObserver );

        } );
        _( entry ).set( 'attributesObserver', attributesObserver );
        
    } );

}

/**
 * Initializes HTML Modules.
 *
 * @param Object	            paramsOverride
 *
 * @return Void
 */
export function init( paramsOverride = {} ) {
    const window = this, dom = window.wq.dom( window );
    // Params
    const params = dom.meta( 'oohtml', {
        element: { import: 'import', },
        attr: { importid: 'name', exportsearch: 'exportsearch', },
    }, paramsOverride );
    params.exportgroupSelector = `[${ window.CSS.escape(params.attr.exportgroup) }]`;
    params.modulerefSelector = `[${ window.CSS.escape(params.attr.moduleref) }]`;
    // The ImportElement class
    const ImportElement = ImportElementMixin.call( window, class {
        static instance( el ) { return _( el ).get( 'instance' ) || new ImportElement( el ); }
        constructor( el ) {
            this.el = el;
            _( el ).set( 'instance', this );
        }
    }, params );
    // Start realtime DOM bindings...
    realtime.call( this, ImportElement, params );
    // Hydration
    dom.ready( () => { hydrate.call( this, ImportElement, params ) } );
}
