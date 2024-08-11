
/**
 * @imports
 */
import HTMLImportsContext from './HTMLImportsContext.js';
import { _, env } from '../util.js';

/**
 * Creates the HTMLImportElement class.
 * 
 * @param Object config 
 * 
 * @return HTMLImportElement
 */
export default function() {
    const { window } = env, { webqit } = window, { realdom, oohtml: { configs } } = webqit;
    if ( webqit.HTMLImportElement ) return webqit.HTMLImportElement;
    const BaseElement = configs.HTML_IMPORTS.elements.import.includes( '-' ) ? window.HTMLElement : class {};
    class HTMLImportElement extends BaseElement {
        
        /**
         * @instance
         * 
         * @param HTMLElement node
         * 
         * @returns 
         */
        static instance( node ) {
            if ( configs.HTML_IMPORTS.elements.import.includes( '-' ) && ( node instanceof this ) )  return node;
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
                return anchorNode;
            };

            priv.importRequest = ( callback, signal = null ) => {
                const request = { ...HTMLImportsContext.createRequest( priv.moduleRef?.includes( '#' ) ? priv.moduleRef : `${ priv.moduleRef }#`/* for live children */ ), live: signal && true, signal };
                ( this.el.isConnected ? this.el.parentNode : priv.anchorNode.parentNode )[ configs.CONTEXT_API.api.contexts ].request( request, response => {
                    callback( ( response instanceof window.HTMLTemplateElement ? [ ...response.content.children ] : (
                        Array.isArray( response ) ? response : response && [ response ]
                    ) ) || [] );
                } );
            };

            priv.hydrate = ( anchorNode, slottedElements ) => {
                // ----------------
                priv.moduleRef = ( this.el.getAttribute( configs.HTML_IMPORTS.attr.ref ) || '' ).trim();
                anchorNode.replaceWith( priv.setAnchorNode( this.createAnchorNode() ) );
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
                    const identifiersMap = fragments.map( ( fragment, i ) => ( { el: fragment, fragmentDef: fragment.getAttribute( configs.HTML_IMPORTS.attr.fragmentdef ) || '', tagName: fragment.tagName, i } ) );
                    let i = -1;
                    slottedElements.forEach( slottedElement => {
                        const tagName = slottedElement.tagName, fragmentDef = slottedElement.getAttribute( configs.HTML_IMPORTS.attr.fragmentdef ) || '';
                        const originalsMatch = ( i ++, identifiersMap.find( fragmentIdentifiers => fragmentIdentifiers.tagName === tagName && fragmentIdentifiers.fragmentDef === fragmentDef && fragmentIdentifiers.i === i ) );
                        if ( !originalsMatch ) return; // Or should we throw integrity error?
                        _( slottedElement ).set( 'original@imports', originalsMatch.el );
                    } );
                    priv.originalsRemapped = true;
                }, priv.hydrationImportRequest.signal );
            };

            priv.autoRestore = ( callback = null ) => {
                priv.autoRestoreRealtime?.disconnect();
                if ( callback ) callback();
                const restore = () => {
                    priv.anchorNode?.replaceWith( this.el );
                    priv.anchorNode = null;
                    this.el.setAttribute( 'data-nodecount', 0 );
                };
                if ( !priv.slottedElements.size ) return restore();
                const autoRestoreRealtime = realdom.realtime( window.document ).observe( [ ...priv.slottedElements ], record => {
                    record.exits.forEach( outgoingNode => {
                        _( outgoingNode ).delete( 'slot@imports' );
                        priv.slottedElements.delete( outgoingNode );
                    } );
                    if ( !priv.slottedElements.size ) {
                        autoRestoreRealtime.disconnect();
                        // At this point, ignore if this is a removal involving the whole parent node
                        if ( !record.target.isConnected ) return;
                        restore();
                    }
                }, { subtree: 'cross-roots', timing: 'sync', generation: 'exits' } );
                priv.autoRestoreRealtime = autoRestoreRealtime;
            };

            priv.connectedCallback = () => {
                // In case this is DOM node relocation or induced reinsertion into the DOM
                if ( priv.slottedElements.size ) throw new Error( `Illegal reinsertion into the DOM; import slot is not empty!` );
                // Totally initialize this instance?
                if ( priv.moduleRefRealtime ) return;
                priv.moduleRefRealtime = realdom.realtime( this.el ).attr( configs.HTML_IMPORTS.attr.ref, ( record, { signal } ) => {
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
                if ( priv.anchorNode?.isConnected ) return;
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
            if ( window.webqit.env !== 'server' ) { return window.document.createTextNode( '' ) }
            const escapeElement = window.document.createElement( 'div' );
            escapeElement.textContent = this.el.outerHTML;
            const anchorNode = window.document.createComment( escapeElement.innerHTML );
            _( anchorNode ).set( 'isAnchorNode', true );
            return anchorNode;
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
            // This state must be set before the diffing below and the serialization done at createAnchorNode()
            this.el.setAttribute( 'data-nodecount', slottableElements.size );
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
                if ( slottableElements.size ) {
                    const currentAnchorNode = this[ '#' ].anchorNode;
                    const anchorNode = this[ '#' ].setAnchorNode( this.createAnchorNode() );
                    ( this.el.isConnected ? this.el : currentAnchorNode ).replaceWith( anchorNode );
                }
                // Insert slottables now
                slottableElements.forEach( slottableElement => {
                    // Clone each slottable element and give it a reference to its original
                    const slottableElementClone = slottableElement.cloneNode( true );
                    // The folllowing references must be set before adding to DODM
                    if ( !slottableElementClone.hasAttribute( configs.HTML_IMPORTS.attr.fragmentdef ) ) {
                        slottableElementClone.toggleAttribute( configs.HTML_IMPORTS.attr.fragmentdef, true );
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
    if ( configs.HTML_IMPORTS.elements.import.includes( '-' ) ) { customElements.define( configs.HTML_IMPORTS.elements.import, HTMLImportElement ); }
    webqit.HTMLImportElement = HTMLImportElement;
    return HTMLImportElement;
}