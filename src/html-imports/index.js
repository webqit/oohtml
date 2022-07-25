
/**
 * @imports
 */
import wqDom from '@webqit/dom';
import { _internals } from '@webqit/util/js/index.js';
import { _any, _from as _arrFrom } from '@webqit/util/arr/index.js';
import { parseIdentifierToken } from '../object-ql.js';

/**
 * ---------------------------
 * HTML Partials
 * ---------------------------
 */

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
 * @ImportElementMixin
 * 
 * The export element class mixin.
 */
function classes( params ) {
    const window = this, { dom } = window.wq;
    // --------------------
    const SuperExportElement = params.element.import.includes( '-' ) ? window.HTMLElement : class {};
    class HTMLImportElement extends SuperExportElement {

        /**
         * @constructor
         */
        constructor( ...args ) {
            super();
            const el = args[ 0 ] || this;
            Object.defineProperty( this, 'el', { get: () => el } );
            _( this.el ).set( 'instance', this );
            _( this.el ).set( 'slottedElements', new Set );
            _( this.el ).set( 'specialMutationEventStack', [] );
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
        doConnectedCallback() {
            if ( _( this.el ).get( 'anchorNode' ) ) return;
            const anchorNode = this.createAnchorNode();
            this.bindAnchorElement( anchorNode );
        }
        
        /**
         * Called by the Slots hydrator.
         *
         * @param Comment anchorNode
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
         * @param Map  moduleQueryResult
         * @param String importId
         * @param Object importModifiers
         *
         * @return void
         */
        resolve( moduleQueryResult, importId = null, importModifiers = {} ) {
            // -------
            moduleQueryResult = moduleQueryResult.slice( 0 ) // IMPORTANT - often coming from cache
            importId = importId || _( this.el ).get( 'importId' );
            importModifiers = importModifiers || _( this.el ).get( 'importModifiers' );
            // -------
            const resolve = exportsSets => {
                const slottableElements = exportsSets.reduce( ( targetExportsSet, exportsSet ) => {
                    exportsSet.forEach( exportItem => targetExportsSet.add( exportItem ) );
                    return targetExportsSet;
                }, new Set );
                this.fill( slottableElements );
            };
            const getExportsSetAsync = ( template, callback ) => {
                const itemExports = _( template ).get( 'exports' );
                const getExportsSet = () => {
                    // TODO: honour importModifiers
                    return itemExports.get( `#${ importId }` );
                };
                itemExports.ready( () => callback( getExportsSet() ) );
            };
            ( function eatResult( prevExportsSet = [] ) {
                const resultItem = moduleQueryResult.shift();
                if ( !resultItem ) return resolve( prevExportsSet );
                getExportsSetAsync( resultItem.value, exportsSet => eatResult( prevExportsSet.concat( exportsSet || [] ) ) );
            } )();
        }

        /**
         * Fills the slot with slottableElements
         *
         * @param Array  slottableElements
         *
         * @return void
         */
        fill( slottableElements ) {
            if ( _any( params.importInertContexts || [], inertContext => this.el.closest( inertContext ) ) ) return;
            if ( Array.isArray( slottableElements ) ) { slottableElements = new Set( slottableElements ) }
            
            // If no more available in source, delete
            const slottedElements = _( this.el ).get( 'slottedElements' );
            slottedElements.forEach( slottedElement => {
                const slottedElementOriginal = _( slottedElement ).get( 'original' );
                // If still available in source, simply leave unchanged
                // otherwise remove it from slot... to reflect this change
                if ( slottableElements.has( slottedElementOriginal ) ) {
                    slottableElements.delete( slottedElementOriginal );
                } else {
                    slottedElements.delete( slottedElement );
                    slottedElement.remove();
                }
            } );

            // Make sure anchor node is what's in place...
            // not the import element itslef - but all only when we have slottableElements.size
            const anchorNode = _( this.el ).get( 'anchorNode' );
            if ( this.el.isConnected && slottableElements.size ) {
                _( this.el ).get( 'specialMutationEventStack' ).push( 1 );
                this.el.replaceWith( anchorNode );
            }

            // Insert slottables now
            slottableElements.forEach( slottableElement => {
                // Clone each slottable element and give it a reference to its original
                const slottableElementClone = slottableElement.cloneNode( true );
                _( slottableElementClone ).set( 'original', slottableElement );
                // Then add to slot
                slottedElements.add( slottableElementClone );
                anchorNode.before( slottableElementClone );
            } );

            // New total slotted elements should included those unchanged
            this.bindSlottedElements( new Set( slottedElements ) );
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
         * @param array  newSlottedElements
         *
         * @return void
         */
        bindSlottedElements( newSlottedElements ) {
            // Forget previous bindings... but not when newSlottedElements is empty
            // because we still need to get the import element to return to slot - thanks to being able to detect total exit of previous slottedElements.
            // On the other hand, not forgetting previous bindings opens the risk of them never ever reporting total exit state -
            // being that some of those slottedElements might have crossed unchanged
            // into newSlottedElements. Except if in future we're able to detect the exit of JUST THE ONES THAT DIDNT CROSS
            if ( newSlottedElements.size ) this.unbindSlottedElements();
            if ( Array.isArray( newSlottedElements ) ) { newSlottedElements = new Set( newSlottedElements ) }

            // Slotted elements should be added to the slottedElements set
            // and should have a reference back to this slot
            const slottedElements = _( this.el ).get( 'slottedElements' );
            newSlottedElements.forEach( newSlottedElement => {
                slottedElements.add( newSlottedElement );
                _( newSlottedElement ).set( 'slot', this.el );
            } );

            // New observer... for when all slotted elements have been removed from slot.
            const slottedElementsObserver = dom.realtime( ...newSlottedElements ).disconnectedCallback( ( removed, connectedState, transientPrevConnectedState, totalConnected, totalDisconnected ) => {
                // Disconnect observer when all slotted elements have been removed from slot.
                if ( totalDisconnected && totalDisconnected.size === newSlottedElements.size ) { slottedElementsObserver.disconnect(); }

                // The removed slotted element should be removed from the slottedElements set
                // and should forget reference to this slot
                // Let's ensure this wasn't slotted again...
                if ( !removed.isConnected ) { slottedElements.delete( removed ); }
                // if the slotted hasn't been slotted somewhere
                if ( _( removed ).get( 'slot' ) === this.el ) {
                    _( removed ).delete( 'slot' );
                }

                // If this was the last of the s,ottable in the same family of IDs,
                // we should restore the original slot
                if ( !slottedElements.size ) {
                    // Must be assigned bu now
                    // for it to be removed in the first place
                    const anchorNode = _( this.el ).get( 'anchorNode' );
                    if ( anchorNode.isConnected ) {
                        _( this.el ).get( 'specialMutationEventStack' ).push( 1 );
                        anchorNode.replaceWith( this.el );
                    }
                }
            }, { each: true, maintainCallState: true } );
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
        doDisconnectedCallback() { this.unbindSlottedElements(); }
        
    }
    // --------------------
    if ( params.element.import.includes( '-' ) ) {
        HTMLImportElement.node = el => {
            if ( !( el instanceof HTMLImportElement ) ) throw new Error( `Unable to resolve import element class.` );
            return el;
        };
        window.customElements.define( params.element.import, HTMLImportElement );
    } else {
        HTMLImportElement.node = el => _( el ).get( 'instance' ) || new HTMLImportElement( el );
    }
    // --------------------
    window.wq.HTMLImportElement = HTMLImportElement;
    return { HTMLImportElement };
}

/**
 * Performs hydration for server-slotted elements.
 *
 * @param Object params
 *
 * @return Void
 */
function hydrate( params ) {
    const window = this, { HTMLImportElement } = window.wq;
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
                const importElement = HTMLImportElement.node( importEl );
                importElement.bindAnchorElement( node/* the comment node */ );
                importElement.bindSlottedElements( [ ...slottedElements ] );
                // Empty basket
                slottedElements.clear();
            }
        } );
    };
    _arrFrom( window.document.querySelectorAll( params.exportgroupSelector ) ).forEach( slottedElement => {
        // hydration() might be running AFTER certain <slots> have resolved
        // and slottedElement might be a just-resolved node
        if ( _( slottedElement ).get( 'slot' ) ) return;
        if ( _( slottedElement.parentNode ).get( 'hydrationVisit' ) ) return;
        scan( slottedElement.parentNode );
        // Scanning is once for every parent
        _( slottedElement.parentNode ).set( 'hydrationVisit', true );
    } );
}

/**
 * Performs realtime capture of elements and their attributes
 * and their module query results; then resolves the respective import elements.
 *
 * @param Object params
 *
 * @return Void
 */
function realtime( params ) {
    const window = this, { dom, HTMLImportElement } = window.wq;
    // ----------
    // Tree...
    dom.realtime().querySelectorAll( params.modulerefSelector, ( entry, connectedState ) => {
        const isImportElement = entry.matches( params.element.import );
        if ( isImportElement && ( _( entry ).get( 'specialMutationEventStack' ) || [] ).length ) {
            // Slotting is going on... we ignore, but unset the flag
            return _( entry ).get( 'specialMutationEventStack' ).pop();
        }

        // Any previous observer should be disconnected
        let attributesRealtimeConn = _( entry ).get( 'attributesRealtimeConn' );
        if ( attributesRealtimeConn ) attributesRealtimeConn.disconnect();
        
        // Handle element absence/presence
        // specially for import elements
        if ( !connectedState ) {
            // Also just disconnect modules query observer
            let moduleQueryRealtimeConn = _( entry ).get( 'moduleQueryRealtimeConn' );
            if ( moduleQueryRealtimeConn ) { moduleQueryRealtimeConn.unsubscribe(); }
            if ( isImportElement ) { HTMLImportElement.node( entry ).doDisconnectedCallback();  }
            return;
        } else if ( isImportElement ) { HTMLImportElement.node( entry ).doConnectedCallback();  }

        // Move on to observing attributes
        // specially for import elements
        const observedAttributes = [ params.attr.moduleref ];
        if ( isImportElement ) { observedAttributes.push( params.attr.importid ) }
        attributesRealtimeConn = dom.realtime( entry ).attributes( observedAttributes, ( moduleRefExpr, importIdExpr = null ) => {
            
            // Any previous observer should be disconnected
            let moduleQueryRealtimeConn = _( entry ).get( 'moduleQueryRealtimeConn' );
            if ( moduleQueryRealtimeConn ) moduleQueryRealtimeConn.unsubscribe();

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
                const parentNode = entry.parentNode/* in case not connected */ || _( entry ).get( 'anchorNode' ).parentNode;
                const compositionBlock = parentNode.closest( params.modulerefSelector );
                if ( !compositionBlock ) return;

                // Cross-link with composition block
                // Then inherit its most current moduleQueryResult
                _( entry ).set( 'compositionBlock', compositionBlock );
                _( compositionBlock, 'imports' ).set( importId, entry );
                const moduleQueryResult = _( compositionBlock ).get( 'moduleQueryResult' );
                HTMLImportElement.node( entry ).resolve( moduleQueryResult );
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
            moduleQueryRealtimeConn = _( window.document ).get( 'exports' ).query( moduleRefExpr, moduleQueryResult => {
                _( entry ).set( 'moduleQueryResult', moduleQueryResult );
                if ( isImportElement ) { HTMLImportElement.node( entry ).resolve( moduleQueryResult, importId, importModifiers ); }
                else { _( entry, 'imports' ).forEach( importElement => { HTMLImportElement.node( importElement ).resolve( moduleQueryResult ); } ); }
            }, { realtime: true, await: 'atomic' } );
            _( entry ).set( 'moduleQueryRealtimeConn', moduleQueryRealtimeConn );

        } );
        _( entry ).set( 'attributesRealtimeConn', attributesRealtimeConn );
        
    }, { each: true } );

}

/**
 * Initializes HTML Modules.
 * 
 * @param $params  Object
 *
 * @return Void
 */
export default function init( $params = { }) {
    const window = this, dom = wqDom.call( window );
    // -------
    // params
    const params = dom.meta( 'oohtml' ).copyWithDefaults( $params, {
        element: { import: 'import', },
        attr: { importid: 'name', exportsearch: 'exportsearch', moduleref: 'template', exportgroup: 'exportgroup', },
    } );
    params.exportgroupSelector = `[${ window.CSS.escape( params.attr.exportgroup ) }]`;
    params.modulerefSelector = `[${ window.CSS.escape( params.attr.moduleref ) }]`;    
    const { HTMLImportElement } = classes.call( this, params );
    // -------
    // hydration...
    dom.ready( () => { hydrate.call( this, params ) } );
    // -------
    // realtime...
    realtime.call( this, params );
    // -------
    // APIs
    return { HTMLImportElement };
}
