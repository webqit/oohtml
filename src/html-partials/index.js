
/**
 * @imports
 */
import ready from '@onephrase/util/dom/ready.js';
import { onPresent, onRemoved, onAttrChange } from '@onephrase/util/dom/mutation.js';
import _isEmpty from '@onephrase/util/js/isEmpty.js';
import _any from '@onephrase/util/arr/any.js';
import _arrFrom from '@onephrase/util/arr/from.js';
import _remove from '@onephrase/util/arr/remove.js';
import _each from '@onephrase/util/obj/each.js';
import _merge from '@onephrase/util/obj/merge.js';
import { mergeAttributes, mergePartials } from './composition.js';
import * as composition from './composition.js';
import { meta } from '../dom.js';
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
var _window;
export function init(params = {}, window = null, trap = null) {
    if (params) {
        _merge(ENV.params, params);
    }
    if (window && window === _window) {
        // We could be called
        // just for "params"
        return;
    }
    if (_window) {
        throw new Error('"init()" already called with a window!');
    }
    ENV.window = window;
    _window = window;
    if (trap) {
        ENV.trap = trap;
    }

    // ----------------------
    // Primer
    // ----------------------

    const isIsomorphic = meta('isomorphic') === true || meta('isomorphic') === 1;
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
        if (name in ENV.window.document.templates) {
            console.warn('"' + name + '" already exists in document.templates!');
        }
        ENV.window.document.templates[name] = el;
    };
    onPresent('template[' + ENV.window.CSS.escape(ENV.params.templateNamespaceAttribute) + ']', el => {
        // --------------------------
        addTemplate(el);
        onAttrChange(el, attrs => {
            delete ENV.window.document.templates[attrs[0].oldValue];
            addTemplate(el);
        }, [ENV.params.templateNamespaceAttribute]);
        // --------------------------
        var src;
        if ((src = el.getAttribute('src')) && !el.content.children.length) {
            loadingTemplates.push(new Promise((resolve, reject) => {
                // Missing in jsdom
                if (ENV.window.fetch) {
                    ENV.window.fetch(src).then(response => {
                        return response.ok ? response.text() : Promise.reject(response.statusText);
                    }).then(content => {
                        el.innerHTML = content;
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
        if (_isEmpty(chtml(template).partials) || template.closest('[live]')) {
            // -----------------------
            // Templates and partials
            chtml(template).templates = {};
            chtml(template).partials = {};
            // -----------------------
            // Own partials
            _arrFrom((template.content || template).children).forEach(el => {
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
                if (!chtml(this).templates[templateId] || !this.hasAttribute('cache-template')) {
                    var imported = templateId.split('/').filter(n => n).reduce((context, item) => {
                        return context ? context.templates[item] || context.templates['*'] : null;
                    }, ENV.window.document);
                    chtml(this).templates[templateId] = imported;
                }
                return chtml(this).templates[templateId];
            }
        },
    });

    // ----------------------
    // Capture composable elements
    // ----------------------

    onPresent('[' + ENV.window.CSS.escape(ENV.params.templateReferenceAttribute) + ']', el => {
        var inerts = ENV.params.inertContexts.concat(ENV.params.inertSubjects);
        if (_any(inerts, inertContext => el.closest(inertContext))) {
            return;
        }
        onAttrChange(el, () => {
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
            chtml(this).slottedElements = slottedElements;
            chtml(this).compositionBlock = compositionBlock;
            this._bindSlotted(slottedElements);
            this._connectToCompositionBlock();
        }
      
		/**
		 * This triggers self-resolution
		 *
		 * @return void
		 */
		connectedCallback() {
			if (!this.anchorNode) {
                this.anchorNode = isIsomorphic
                    ? ENV.window.document.createComment(this.outerHTML)
                    : ENV.window.document.createTextNode('');
                this.after(this.anchorNode);
                chtml(this).compositionBlock = !this.hasAttribute(ENV.params.templateReferenceAttribute)
                    ? this.parentNode.closest('[' + ENV.window.CSS.escape(ENV.params.templateReferenceAttribute) + ']')
                    : null;
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
            chtml(this).slottedObserver = onRemoved(partials, removed => {
                removed.forEach(remd => {
                    // Let's ensure this wasn't slotted againe
                    if (!remd.parentNode) {
                        _remove(this.slottedElements, remd);
                    }
                    // if the slotted hasnt been slotted somewhere
                    if (remd.slotReference === this) {
                        delete remd.slotReference;
                    }
                });
                // If this was the last of the s,ottable in the same family of IDs,
                // we should restore the original slot
                if (!this.slottedElements.length) {
                    // Must be assigned bu now
                    // for it to be removed in the first place
                    this.anchorNode.before(this);
                }
            }, {onceEach:true});
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
            var template, partials;
            if (this.hasAttribute(ENV.params.templateReferenceAttribute)) {
                // Did we previously had a compositionBlock?
                // Let's remove ourself
                if (this.compositionBlock && chtml(this.compositionBlock).slots[this.name] === this) {
                    delete chtml(this.compositionBlock).slots[this.name];
                }
                if (template = this.template) {
                    partials = template.partials[this.name];
                }
            } else {
                if (!this.compositionBlock) {
                    console.warn('Scoped slots must be found within template contexts. [' + this.name + ']', this);
                    return;
                }
                // We dont want this proccessed again on restoration to its position
                if (template = this.compositionBlock.template) {
                    partials = template.partials[this.name];
                }
            }
            if (template) {
                this.fill(partials);
            } else {
                this.empty();
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
            partials = _arrFrom(partials, false/* castObject */).map(partial => partial.cloneNode(true));
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
                if (partial.getAttribute(ENV.params.templateReferenceAttribute) === '@slot') {
                    if (!chtml(partial).templates) {
                        chtml(partial).templates = {};
                    }
                    chtml(partial).templates['@slot'] = this;
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
            this.slottedElements.push(...partials);
        }

        /**
		 * Empty slot.
		 *
		 * @param bool              sliently
		 *
		 * @return void
		 */
        empty(silently = false) {
            if (this.slottedElements) {
                var slottedElements = this.slottedElements;
                if (silently && this.slottedObserver) {
                    this.slottedObserver.disconnect();
                    slottedElements = this.slottedElements.splice(0);
                }
                slottedElements.forEach(slottedElement => slottedElement.remove());
            }
        }

        /**
		 * Returns the slot's name.
		 *
		 * @return string
		 */
        get name() {
            return this.getAttribute(ENV.params.slotNameAttribute) || 'default';
        }
 
		/**
		 * Returns the slot's compositionBlock, if any.
		 *
		 * @return array
		 */
		get compositionBlock() {
			return chtml(this).compositionBlock;
        }
 
		/**
		 * Returns the slot's slotted elements.
		 *
		 * @return array
		 */
		get slottedElements() {
            if (!chtml(this).slottedElements) {
                chtml(this).slottedElements = [];
            }
			return chtml(this).slottedElements;
        }

		/**
		 * Returns the slot's implementable partials
		 *
		 * @return array
		 */
        get partials() {
            discoverContents(this);
            return chtml(this).partials;
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
        _arrFrom(ENV.window.document.querySelectorAll('[' + ENV.window.CSS.escape(ENV.params.slotReferenceAttribute) + ']')).forEach(partial => {
            // Scan
            if (!chtml(partial.parentNode).slotsCan) {
                var slottedElements = [];
                partial.parentNode.childNodes.forEach(node => {
                    var nodeValue;
                    if (node.nodeType === 1/** ELEMENT_NODE */ && node.matches('[' + ENV.window.CSS.escape(ENV.params.slotReferenceAttribute) + ']')) {
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
                                compositionBlock = node.parentNode.closest('[' + ENV.window.CSS.escape(ENV.params.templateReferenceAttribute) + ']');
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
        if (isIsomorphic) {
            hydrateSlots();
        }
    });
    
};
