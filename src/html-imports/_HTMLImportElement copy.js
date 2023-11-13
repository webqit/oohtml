
/**
 * @imports
 */
import _HTMLImportsContext from './_HTMLImportsProvider.js';
import { _ } from '../util.js';

/**
 * Creates the HTMLImportElement class.
 * 
 * @param Object config 
 * 
 * @return HTMLImportElement
 */
export default function( config ) {
    const window = this, { realdom } = window.webqit;
    const BaseElement = config.import.tagName.includes( '-' ) ? window.HTMLElement : class {};
    class HTMLImportElement extends BaseElement {
        
        /**
         * @instance
         * 
         * @param HTMLElement node
         * 
         * @returns 
         */
        static instance( node ) {
            if ( config.import.tagName.includes( '-' ) && ( node instanceof this ) )  return node;
            return _( node ).get( 'import::instance' ) || new this( node );
        }

        /**
         * @constructor
         */
        constructor( ...args ) {
            super();
            // --------
            const el = args[ 0 ] || this;
            _( el ).set( 'import::instance', this );
            Object.defineProperty( this, 'el', { get: () => el, configurable: false } );

            const priv = {};
            Object.defineProperty( this, '#', { get: () => priv, configurable: false } );
            priv.slottedElements = new Set;

            priv.setAnchorNode = anchorNode => {
                priv.anchorNode = anchorNode;
                _( anchorNode ).set( 'anchoredNode@imports', this.el );
            };

            priv.importRequest = ( callback, signal = null ) => {
                const request = _HTMLImportsContext.createRequest( { detail: priv.moduleRef && !priv.moduleRef.includes( '#' ) ? priv.moduleRef + '#' : priv.moduleRef, live: signal && true, signal } );
                ( this.el.isConnected ? this.el.parentNode : priv.anchorNode.parentNode )[ config.CONTEXT_API.api.context ].request( request, response => {
                    callback( ( response instanceof window.HTMLTemplateElement ? [ ...response.content.children ] : (
                        Array.isArray( response ) ? response : response && [ response ]
                    ) ) || [] );
                } );
            };

            priv.hydrate = ( anchorNode, slottedElements ) => {
                // ----------------
                priv.moduleRef = ( this.el.getAttribute( config.import.attr.moduleref ) || '' ).trim();
                priv.setAnchorNode( anchorNode );
                priv.autoRestore( () => {
                    slottedElements.forEach( slottedElement => {
                        priv.slottedElements.add( slottedElement );
                        _( slottedElement ).set( 'slot@imports', this.el );
                    } );
                } );
                // ----------------
                priv.hydrationImportRequest = new AbortController;
                priv.importRequest( fragments => {
                    if ( priv.originalsRemapped ) { return this.fill( fragments ); }
                    const identifiersMap = fragments.map( fragment => ( { el: fragment, fragmentDef: fragment.getAttribute( config.template.attr.fragmentdef ) || '', tagName: fragment.tagName, } ) );
                    slottedElements.forEach( slottedElement => {
                        const tagName = slottedElement.tagName, fragmentDef = slottedElement.getAttribute( config.template.attr.fragmentdef ) || '';
                        const originalsMatch = identifiersMap.filter( fragmentIdentifiers => tagName === fragmentIdentifiers.tagName && fragmentDef === fragmentIdentifiers.fragmentDef );
                        if ( originalsMatch.length !== 1 ) return;
                        _( slottedElement ).set( 'original@imports', originalsMatch[ 0 ].el );
                    } );
                    priv.originalsRemapped = true;
                }, priv.hydrationImportRequest.signal );
            };

            priv.autoRestore = ( callback = null ) => {
                priv.autoRestoreRealtime?.disconnect();
                if ( callback ) callback();
                if ( !priv.slottedElements.size ) {
                    priv.anchorNode.replaceWith( this.el );
                    return;
                }
                const autoRestoreRealtime = realdom.realtime( window.document ).observe( [ ...priv.slottedElements ], record => {
                    record.exits.forEach( outgoingNode => {
                        _( outgoingNode ).delete( 'slot@imports' );
                        priv.slottedElements.delete( outgoingNode );
                    } );
                    if ( !priv.slottedElements.size ) {
                        autoRestoreRealtime.disconnect();
                        // At this point, ignore if this is a removal involving the whole parent node
                        if ( !record.target.isConnected ) return;
                        priv.anchorNode.replaceWith( this.el );
                    }
                }, { subtree: true, timing: 'sync', generation: 'exits' } );
                priv.autoRestoreRealtime = autoRestoreRealtime;
            };

            priv.connectedCallback = () => {
                // In case this is DOM node relocation or induced reinsertion into the DOM
                if ( priv.slottedElements.size ) throw new Error( `Illegal reinsertion into the DOM; import slot is not empty!` );
                // Totally initialize this instance?
                if ( !priv.anchorNode ) { priv.setAnchorNode( this.createAnchorNode() ); }
                if ( priv.moduleRefRealtime ) return;
                priv.moduleRefRealtime = realdom.realtime( this.el ).attr( config.import.attr.moduleref, ( record, { signal } ) => {
                    priv.moduleRef = record.value;
                    // Below, we ignore first restore from hydration
                    priv.importRequest( fragments => !priv.hydrationImportRequest && this.fill( fragments ), signal );
                }, { live: true, timing: 'sync', lifecycleSignals: true } );
                // Must come after
                priv.hydrationImportRequest?.abort();
                priv.hydrationImportRequest = null;
            };

            priv.disconnectedCallback = () => {
                priv.hydrationImportRequest?.abort();
                priv.hydrationImportRequest = null;
                if ( priv.anchorNode.isConnected ) return;
                priv.moduleRefRealtime?.disconnect();
                priv.moduleRefRealtime = null;
            };
        }

        /**
         * Creates the slot's anchor node.
         *
         * @return Element
         */
        createAnchorNode() {
            if ( !config.isomorphic ) { return window.document.createTextNode( '' ) }
            return window.document.createComment( this.el.outerHTML );
        }

        /**
         * Fills the slot with slottableElements
         *
         * @param Iterable  slottableElements
         *
         * @return void
         */
        fill( slottableElements ) {
            if ( Array.isArray( slottableElements ) ) { slottableElements = new Set( slottableElements ) }
            this[ '#' ].autoRestore( () => {              
                this[ '#' ].slottedElements.forEach( slottedElement => {
                    const slottedElementOriginal = _( slottedElement ).get( 'original@imports' );
                    // If still available in source, simply leave unchanged
                    // otherwise remove it from slot... to reflect this change
                    if ( slottableElements.has( slottedElementOriginal ) ) {
                        slottableElements.delete( slottedElementOriginal );
                    } else {
                        this[ '#' ].slottedElements.delete( slottedElement );
                        // This removal will not be caught
                        slottedElement.remove();
                    }
                } );
                // Make sure anchor node is what's in place...
                // not the import element itslef - but all only when we have slottableElements.size
                if ( this.el.isConnected && slottableElements.size ) {
                    this.el.replaceWith( this[ '#' ].anchorNode );
                }
                // Insert slottables now
                slottableElements.forEach( slottableElement => {
                    // Clone each slottable element and give it a reference to its original
                    const slottableElementClone = slottableElement.cloneNode( true );
                    // The folllowing references must be set before adding to DODM
                    if ( !slottableElementClone.hasAttribute( config.template.attr.fragmentdef ) ) {
                        slottableElementClone.toggleAttribute( config.template.attr.fragmentdef, true );
                    }
                    _( slottableElementClone ).set( 'original@imports', slottableElement );
                    _( slottableElementClone ).set( 'slot@imports', this.el );
                    this[ '#' ].slottedElements.add( slottableElementClone );
                    this[ '#' ].anchorNode.before( slottableElementClone );
                } );
            } );
        }

        /**
         * Empty slot.
         *
         * @return void
         */
        empty() { this[ '#' ].slottedElements.forEach( slottedElement => slottedElement.remove() ); }

        /**
         * Returns the slot's anchorNode.
         *
         * @return array
         */
        get anchorNode() { return this[ '#' ].anchorNode; }

        /**
         * Returns the slot's module reference, if any.
         *
         * @return string
         */
        get moduleRef() { return this[ '#' ].moduleRef; }

        /**
         * Returns the slot's slotted elements.
         *
         * @return array
         */
        get slottedElements() { return this[ '#' ].slottedElements; }
    }
    if ( config.import.tagName.includes( '-' ) ) {
        customElements.define( config.import.tagName, HTMLImportElement );
    }
    return HTMLImportElement;
}