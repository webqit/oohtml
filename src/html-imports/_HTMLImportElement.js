
/**
 * @imports
 */
import HTMLImportsContext from './HTMLImportsContext.js';
import { _wq, env } from '../util.js';

/**
 * Creates the HTMLImportElement class.
 * 
 * @param Object config 
 * 
 * @return HTMLImportElement
 */
export default function () {
    const { window } = env, { webqit } = window, { realdom, oohtml: { configs } } = webqit;
    if (webqit.HTMLImportElement) return webqit.HTMLImportElement;
    const BaseElement = configs.HTML_IMPORTS.elements.import.includes('-') ? window.HTMLElement : class { };
    class HTMLImportElement extends BaseElement {

        /**
         * @instance
         * 
         * @param HTMLElement node
         * 
         * @returns 
         */
        static instance(node) {
            if (configs.HTML_IMPORTS.elements.import.includes('-') && (node instanceof this)) return node;
            return _wq(node).get('import::instance') || new this(node);
        }

        /**
         * @constructor
         */
        constructor(...args) {
            super();
            // --------
            const el = args[0] || this;
            _wq(el).set('import::instance', this);
            Object.defineProperty(this, 'el', { get: () => el, configurable: false });

            const priv = {};
            Object.defineProperty(this, '#', { get: () => priv, configurable: false });
            priv.slottedElements = new Set;

            priv.setAnchorNode = anchorNode => {
                priv.anchorNode = anchorNode;
                return anchorNode;
            };

            priv.live = callback => {
                if (priv.liveImportsRealtime) throw new Error(`Import element already in live mode.`);
                const parentNode = this.el.isConnected ? this.el.parentNode : priv.anchorNode.parentNode;
                priv.liveImportsRealtime = realdom.realtime(this.el).attr(configs.HTML_IMPORTS.attr.ref, (record, { signal }) => {
                    priv.moduleRef = record.value;
                    const moduleRef = priv.moduleRef.includes('#') ? priv.moduleRef : `${priv.moduleRef}#`/* for live children */;
                    const request = { ...HTMLImportsContext.createRequest(moduleRef), live: signal && true, signal, diff: !moduleRef.endsWith('#') };
                    parentNode[configs.CONTEXT_API.api.contexts].request(request, response => {
                        callback((response instanceof window.HTMLTemplateElement ? [...response.content.children] : (
                            Array.isArray(response) ? response : response && [response]
                        )) || []);
                    });
                }, { live: true, timing: 'sync', lifecycleSignals: true });
                priv.autoDestroyRealtime = realdom.realtime(window.document).track(parentNode, () => {
                    priv.die();
                }, { subtree: 'cross-roots', timing: 'sync', generation: 'exits' });
            };

            priv.die = () => {
                priv.autoDestroyRealtime?.disconnect();
                priv.liveImportsRealtime?.disconnect();
                priv.liveImportsRealtime = null;
            };

            priv.hydrate = (anchorNode, slottedElements) => {
                anchorNode.replaceWith(priv.setAnchorNode(this.createAnchorNode()));
                priv.live(fragments => {
                    // The default action
                    if (priv.originalsRemapped) return this.fill(fragments);
                    // Initial remap action
                    const identifiersMap = fragments.map((fragment, i) => ({ el: fragment, fragmentDef: fragment.getAttribute(configs.HTML_IMPORTS.attr.fragmentdef) || '', tagName: fragment.tagName, i }));
                    slottedElements.forEach((slottedElement, i) => {
                        const tagName = slottedElement.tagName, fragmentDef = slottedElement.getAttribute(configs.HTML_IMPORTS.attr.fragmentdef) || '';
                        const originalsMatch = (i++, identifiersMap.find(fragmentIdentifiers => fragmentIdentifiers.tagName === tagName && fragmentIdentifiers.fragmentDef === fragmentDef && fragmentIdentifiers.i === i));
                        if (originalsMatch) _wq(slottedElement).set('original@imports', originalsMatch.el); // Or should we throw integrity error here?
                        _wq(slottedElement).set('slot@imports', this.el);
                        priv.slottedElements.add(slottedElement);
                    });
                    priv.originalsRemapped = true;
                });
            };

            priv.autoRestore = (callback = null) => {
                priv.autoRestoreRealtime?.disconnect();
                if (callback) callback();
                const restore = () => {
                    if (this.el.isConnected) return;
                    this.el.setAttribute('data-nodecount', 0);
                    priv.internalMutation = true;
                    priv.anchorNode.replaceWith(this.el);
                    priv.internalMutation = false;
                    priv.setAnchorNode(null);
                };
                if (!priv.slottedElements.size) return restore();
                const autoRestoreRealtime = realdom.realtime(priv.anchorNode.parentNode).observe([...priv.slottedElements], record => {
                    record.exits.forEach(outgoingNode => {
                        _wq(outgoingNode).delete('slot@imports');
                        priv.slottedElements.delete(outgoingNode);
                    });
                    if (!priv.slottedElements.size) {
                        autoRestoreRealtime.disconnect();
                        // At this point, ignore if this is a removal involving the whole parent node
                        if (!record.target.isConnected) return;
                        restore();
                    }
                }, { subtree: 'cross-roots', timing: 'sync', generation: 'exits' });
                priv.autoRestoreRealtime = autoRestoreRealtime;
            };

            priv.connectedCallback = () => {
                if (priv.internalMutation) return;
                priv.live(fragments => this.fill(fragments));
            };

            priv.disconnectedCallback = () => {
                if (priv.internalMutation) return;
                priv.die();
            };
        }

        /**
         * Creates the slot's anchor node.
         *
         * @return Element
         */
        createAnchorNode() {
            if (window.webqit.env !== 'server') { return window.document.createTextNode('') }
            const escapeElement = window.document.createElement('div');
            escapeElement.textContent = this.el.outerHTML;
            const anchorNode = window.document.createComment(escapeElement.innerHTML);
            _wq(anchorNode).set('isAnchorNode', true);
            return anchorNode;
        }

        /**
         * Fills the slot with slottableElements
         *
         * @param Iterable  slottableElements
         *
         * @return void
         */
        fill(slottableElements, r) {
            if (!this.el.isConnected && (!this['#'].anchorNode || !this['#'].anchorNode.isConnected)) {
                // LiveImports must be responding to an event that just removed the subtree from DOM
                return;
            }
            if (Array.isArray(slottableElements)) { slottableElements = new Set(slottableElements) }
            // This state must be set before the diffing below and the serialization done at createAnchorNode()
            this.el.setAttribute('data-nodecount', slottableElements.size);
            this['#'].autoRestore(() => {
                this['#'].slottedElements.forEach(slottedElement => {
                    const slottedElementOriginal = _wq(slottedElement).get('original@imports');
                    // If still available in source, simply leave unchanged
                    // otherwise remove it from slot... to reflect this change
                    if (slottableElements.has(slottedElementOriginal)) {
                        slottableElements.delete(slottedElementOriginal);
                    } else {
                        this['#'].slottedElements.delete(slottedElement);
                        // This removal will not be caught
                        slottedElement.remove();
                    }
                });
                // Make sure anchor node is what's in place...
                // not the import element itslef - but all only when we have slottableElements.size
                if (slottableElements.size && this.el.isConnected) {
                    const newAnchorNode = this['#'].setAnchorNode(this.createAnchorNode());
                    this['#'].internalMutation = true;
                    this.el.replaceWith(newAnchorNode);
                    this['#'].internalMutation = false;
                }
                // Insert slottables now
                slottableElements.forEach(slottableElement => {
                    // Clone each slottable element and give it a reference to its original
                    const slottableElementClone = slottableElement.cloneNode(true);
                    // The folllowing references must be set before adding to DODM
                    if (!slottableElementClone.hasAttribute(configs.HTML_IMPORTS.attr.fragmentdef)) {
                        slottableElementClone.toggleAttribute(configs.HTML_IMPORTS.attr.fragmentdef, true);
                    }
                    _wq(slottableElementClone).set('original@imports', slottableElement);
                    _wq(slottableElementClone).set('slot@imports', this.el);
                    this['#'].slottedElements.add(slottableElementClone);
                    this['#'].anchorNode.before(slottableElementClone);
                });
            });
        }

        /**
         * Empty slot.
         *
         * @return void
         */
        empty() { this['#'].slottedElements.forEach(slottedElement => slottedElement.remove()); }

        /**
         * Returns the slot's anchorNode.
         *
         * @return array
         */
        get anchorNode() { return this['#'].anchorNode; }

        /**
         * Returns the slot's module reference, if any.
         *
         * @return string
         */
        get moduleRef() { return this['#'].moduleRef; }

        /**
         * Returns the slot's slotted elements.
         *
         * @return array
         */
        get slottedElements() { return this['#'].slottedElements; }
    }
    if (configs.HTML_IMPORTS.elements.import.includes('-')) { customElements.define(configs.HTML_IMPORTS.elements.import, HTMLImportElement); }
    webqit.HTMLImportElement = HTMLImportElement;
    return HTMLImportElement;
}