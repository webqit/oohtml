
/**
 * @imports
 */
import _isEmpty from '@web-native-js/commons/js/isEmpty.js';
import _any from '@web-native-js/commons/arr/any.js';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _remove from '@web-native-js/commons/arr/remove.js';
import _each from '@web-native-js/commons/obj/each.js';
import { ready, capture, mutationCallback, attrChangeCallback, CSSEscape, meta } from '../dom.js';
import { mergeAttributes, mergePartials } from './composition.js';
import * as composition from './composition.js';
import lcINIT, { itemize } from './listCompose.js';
import ENV from './ENV.js';

/**
 * @ENV
 */
export {
    ENV,
};

/**
 * @init
 */
var inited = false;
export default function() {
	if (inited) {
		return;
	}
    inited = true;
    lcINIT();

    // ----------------------
    // Primer
    // ----------------------

    const chtml = el => {
        if (!el['.chtml']) {
            el['.chtml'] = {};
        }
        return el['.chtml'];
    };

    // ----------------------
    // Define the global "templates" object
    // ----------------------

    if ('templates' in ENV.window.document) {
        throw new Error('document already has a "templates" property!');
    }
    const templates = {}, loadingTemplates = [];
    Object.defineProperty(ENV.window.document, 'templates', {
        value: templates,
    });
    Object.defineProperty(ENV.window.document, 'templatesReadyState', {
        value: 'loading',
        writable: true,
    });

    // ----------------------
    // Capture template elements
    // ----------------------

    const addTemplate = el => {
        var name = el.getAttribute(ENV.params.templateNamespaceAttribute);
        if (name in document.templates) {
            console.warn('"' + name + '" already exists in document.templates!');
        }
        document.templates[name] = el;
    };
    capture('template[' + CSSEscape(ENV.params.templateNamespaceAttribute) + ']', el => {
        // --------------------------
        addTemplate(el);
        attrChangeCallback(el, attrs => {
            delete document.templates[attrs[0].oldValue];
            addTemplate(el);
        }, [ENV.params.templateNamespaceAttribute]);
        // --------------------------
        var src;
        if (src = el.getAttribute('src')) {
            loadingTemplates.push(new Promise((resolve, reject) => {
                // Missing in jsdom
                if (ENV.window.fetch) {
                    ENV.window.fetch(src).then(response => {
                        return response.ok ? response.text() : Promise.reject(response.statusText);
                    }).then(content => {
                        el.innerHTML = content;
                        if (meta('isomorphic') === true) {
                            el.removeAttribute('src');
                        }
                        resolve(el);
                    }).catch(error => {
                        // Dispatch the event.
                        reject('Error fetching the bundle at ' + src + '. (' + error + ')');
                    });
                } else {
                    reject('Error fetching the bundle at ' + src + '. (window.fetch() not supported by browser.)');
                }
            }));
        }
    });

    // ----------------------
    // Define the "templates" and "partials" properties on HTMLTemplateElement.prototype
    // ----------------------

    const discoverContents = template => {
        if (_isEmpty(chtml(template).templates) || template.closest('[live]')) {
            // -----------------------
            // Templates and partials
            chtml(template).templates = {};
            chtml(template).partials = {};
            // -----------------------
            // Own partials
            _arrFrom(template.content.children).forEach(el => {
                var templateName, partialsName;
                if ((el instanceof ENV.window.HTMLTemplateElement) && (templateName = el.getAttribute(ENV.params.templateNamespaceAttribute))) {
                    chtml(template).templates[templateName] = el;
                } else {
                    var partialsName = el.getAttribute(ENV.params.slotReferenceAttribute) || 'default';
                    if (!chtml(template).partials[partialsName]) {
                        chtml(template).partials[partialsName] = [];
                    }
                    chtml(template).partials[partialsName].push(el);
                }
            });
        }
    };
    if ('templates' in ENV.window.HTMLTemplateElement.prototype) {
        throw new Error('The "HTMLTemplateElement" class already has a "templates" property!');
    }
    Object.defineProperty(ENV.window.HTMLTemplateElement.prototype, 'templates', {
        get: function() {
            discoverContents(this);
            return chtml(this).templates;
        }
    });
    if ('partials' in ENV.window.HTMLTemplateElement.prototype) {
        throw new Error('The "HTMLTemplateElement" class already has a "partials" property!');
    }
    Object.defineProperty(ENV.window.HTMLTemplateElement.prototype, 'partials', {
        get: function() {
            discoverContents(this);
            return chtml(this).partials;
        }
    });

    // ----------------------
    // Define the "template" property on Element.prototype
    // ----------------------

    if ('template' in ENV.window.Element.prototype) {
        throw new Error('The "Element" class already has a "template" property!');
    }
    Object.defineProperty(ENV.window.Element.prototype, 'template', {
        get: function() {
            var templateId = this.getAttribute(ENV.params.templateReferenceAttribute);
            if (templateId) {
                if (!chtml(this).templates) {
                    chtml(this).templates = {};
                }
                if (!chtml(this).templates[templateId] || this.hasAttribute('template-nocache')) {
                    var imported = templateId.split('/').reduce((context, item) => {
                        return context ? context.templates[item] : null;
                    }, ENV.window.document);
                    if (imported) {
                        chtml(this).templates[templateId] = imported.cloneNode(true);
                    }
                }
                return chtml(this).templates[templateId];
            }
        },
    });

    // ----------------------
    // Capture composable elements
    // ----------------------

    capture('[' + CSSEscape(ENV.params.templateReferenceAttribute) + ']', el => {
        var inerts = ENV.params.inertContexts.concat(ENV.params.inertSubjects);
        if (_any(inerts, inertContext => el.closest(inertContext))) {
            return;
        }
        attrChangeCallback(el, () => {
            _each(chtml(el).slots, (name, slot) => {
                slot.resolve();
            });
        }, [ENV.params.templateReferenceAttribute]);
    });

    // ----------------------
    // Capture slot elements
    // ----------------------

    ENV.window.customElements.define(ENV.params.slotElement, class extends ENV.window.HTMLElement {
        
		/**
		 * Called by the Slots hydrator.
		 *
		 * @param Comment       anchorNode
		 * @param array         slottedElements
		 * @param Element       compositionBlock
		 *
		 * @return void
		 */
		hydrate(anchorNode, slottedElements, compositionBlock) {
            this.anchorNode = anchorNode;
            this._slottedElements = slottedElements;
            this.compositionBlock = compositionBlock;
            this._bindSlotted(slottedElements);
            this._connectToCompositionBlock();
        }

        /**
		 * This triggers resolution
		 *
		 * @param string	name
		 * @param string	oldValue
		 * @param string	newValue
		 *
		 * @return void
		 */
		attributeChangedCallback(name, oldValue, newValue) {
			if (name === ENV.params.slotNameAttribute) {
				this.name = newValue;
			}
        }
        
		/**
		 * This triggers self-resolution
		 *
		 * @return void
		 */
		connectedCallback() {
			if (!this.anchorNode) {
                this.anchorNode = meta('isomorphic') === true
                    ? ENV.window.document.createComment(this.outerHTML)
                    : ENV.window.document.createTextNode('');
                this.after(this.anchorNode);
                this.compositionBlock = this.parentNode.closest('[' + CSSEscape(ENV.params.templateReferenceAttribute) + ']');
                this._connectToCompositionBlock();
                ready(() => {
                    Promise.all(loadingTemplates).then(() => {
                        this.resolve();
                    });
                });
            }
        }
    
        /**
		 * Connects the instance to the compositionBlock.
		 */
        _connectToCompositionBlock() {
            if (this.compositionBlock) {
                if (!chtml(this.compositionBlock).slots) {
                    chtml(this.compositionBlock).slots = {};
                }
                // Now after the update slot ID
                chtml(this.compositionBlock).slots[this.name] = this;
            }
        }

        /**
		 * Bind a slotted element.
		 *
		 * @param array              partials
		 *
		 * @return void
		 */
        _bindSlotted(partials) {
            partials.forEach(partial => {
                partial.slotReference = this;
            });
            this.slottedObserver = mutationCallback(partials, removed => {
                removed.forEach(remd => {
                    // Let's ensure this wasn't slotted againe
                    if (!remd.parentNode) {
                        _remove(this._slottedElements, remd);
                    }
                    // if the slotted hasnt been slotted somewhere
                    if (remd.slotReference === this) {
                        delete remd.slotReference;
                    }
                });
                // If this was the last of the s,ottable in the same family of IDs,
                // we should restore the original slot
                if (!this._slottedElements.length) {
                    // Must be assigned bu now
                    // for it to be removed in the first place
                    this.anchorNode.before(this);
                }
            }, {on:'disconnected', onceEach:true});
        }

        /**
		 * Resolves the slot
		 */
        resolve() {
            if (_any(ENV.params.inertContexts, inertContext => this.closest(inertContext))) {
                return;
            }
            // -----------------
            // Global import or scoped slot?
            if (this.hasAttribute(ENV.params.templateReferenceAttribute)) {
                // Did we previously had a compositionBlock?
                // Let's remove ourself
                if (this.compositionBlock && chtml(this.compositionBlock).slots[this.name] === this) {
                    delete chtml(this.compositionBlock).slots[this.name];
                }
                var partials;
                if (this.template && (partials = this.template.partials[this.name])) {
                    this.fill(partials);
                } else {
                    this.empty();
                }
            } else {
                if (!this.compositionBlock) {
                    console.warn('Scoped slots must be found within template contexts. [' + this.name + ']', this);
                    return;
                }
                // We dont want this proccessed again on restoration to its position
                var partials;
                if (this.compositionBlock.template && (partials = this.compositionBlock.template.partials[this.name])) {
                    this.fill(partials);
                } else {
                    this.empty();
                }
            }
        }

        /**
		 * Fill slot with partials.
		 *
		 * @param array|Element     partials
		 *
		 * @return void
		 */
        fill(partials) {
            partials = _arrFrom(partials, false/* castObject */);
            // ---------------------
            // Discard previous slotted elements
            // But this intentional removal should not trigger slot restoration
            this.empty(true/* silently */);
            this.remove();
            // ---------------------
            // Slot-in the corresponding partials from template
            partials.forEach(partial => {
                // ---------------------
                // Implement the slot?
                if (partial.getAttribute(ENV.params.templateReferenceAttribute) === 'slot') {
                    mergePartials(partial, this);
                }
                // Inherit attributes from the slot element before replacement
                mergeAttributes(partial, this);
                // ---------------------
                if (!partial.getAttribute(ENV.params.slotReferenceAttribute)) {
                    partial.setAttribute(ENV.params.slotReferenceAttribute, this.name);
                }
                // Place slottable
                this.anchorNode.before(partial);
            });
            this._bindSlotted(partials);
            // ---------------------
            // Updatate records
            if (!this._slottedElements) {
                this._slottedElements = [];
            }
            this._slottedElements.push(...partials);
        }

        /**
		 * Empty slot.
		 *
		 * @param bool              sliently
		 *
		 * @return void
		 */
        empty(silently = false) {
            if (this._slottedElements) {
                var slottedElements = this._slottedElements;
                if (silently && this.slottedObserver) {
                    this.slottedObserver.disconnect();
                    slottedElements = this._slottedElements.splice(0);
                }
                slottedElements.forEach(slottedElement => slottedElement.remove());
            }
        }
        
		/**
		 * Returns the instance's slotted elements.
		 *
		 * @return array
		 */
		get slottedElements() {
			return this._slottedElements;
        }
                
		/**
		 * The attributes we want to observe.
		 *
		 * @return array
		 */
		static get observedAttributes() {
			return [ENV.params.slotNameAttribute];
		}
    });

    // ----------------------
    // Restore slots from snapshots
    // ----------------------

    const hydrateSlots = () => {
        _arrFrom(ENV.window.document.querySelectorAll('[' + CSSEscape(ENV.params.slotReferenceAttribute) + ']')).forEach(partial => {
            // Scan
            if (!chtml(partial.parentNode).slotsCan) {
                var slottedElements = [];
                partial.parentNode.childNodes.forEach(node => {
                    var nodeValue;
                    if (node.nodeType === 1/** ELEMENT_NODE */ && node.matches('[' + CSSEscape(ENV.params.slotReferenceAttribute) + ']')) {
                        slottedElements.push(node);
                    } else if (node.nodeType === 8/** COMMENT_NODE */ && (nodeValue = node.nodeValue.trim())
                    && nodeValue.startsWith('<' + ENV.params.slotElement)
                    && nodeValue.endsWith('</' + ENV.params.slotElement + '>')) {
                        var slot, reviver = ENV.window.document.createElement('div');
                        reviver.innerHTML = nodeValue;
                        if ((slot = reviver.firstChild).matches(ENV.params.slotElement)) {
                            // Belongs to a composition block?
                            var compositionBlock;
                            if (!slot.hasAttribute(ENV.params.templateReferenceAttribute)) {
                                compositionBlock = node.parentNode.closest('[' + CSSEscape(ENV.params.templateReferenceAttribute) + ']');
                            }
                            slot.hydrate(node, slottedElements, compositionBlock);
                            // Empty basket
                            slottedElements = [];
                        }
                    }
                });
                // Scanning is once for every parent
                chtml(partial.parentNode).slotsCan = true;
            }
        });
    };

    // ----------------------
    // Define the global "partials" object
    // ----------------------

    if ('partials' in ENV.window.document) {
        throw new Error('document already has a "partials" property!');
    }
    Object.defineProperty(ENV.window.document, 'partials', {
        value: {
            composition,
            utils: { itemize },
        },
    });

    // ----------------------
    // Hydrate
    // ----------------------

    loadingTemplates.forEach(promise => {
        promise.catch(error => {
            console.warn(error);
        });
    });
    ready(() => {
        Promise.all(loadingTemplates).then(() => {
            ENV.window.document.templatesReadyState = 'complete';
            ENV.window.document.dispatchEvent(new ENV.window.Event('templatesreadystatechange'));
        });
        if (meta('isomorphic') === true) {
            hydrateSlots();
        }
    });
    
};
