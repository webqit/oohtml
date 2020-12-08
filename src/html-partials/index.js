
/**
 * @imports
 */
import _any from '@webqit/util/arr/any.js';
import _arrFrom from '@webqit/util/arr/from.js';
import _remove from '@webqit/util/arr/remove.js';
import _unique from '@webqit/util/arr/unique.js';
import _each from '@webqit/util/obj/each.js';
import _merge from '@webqit/util/obj/merge.js';
import params from './params.js';
import meta from '../meta.js';

/**
 * ---------------------------
 * The ScopedHTML class
 * ---------------------------
 */

/**
 * An object from @webqit/browser-pie representing the
 * current window instance, as bound in here by caller
 * 
 * @param Object Ctxt
 */
export default function init(Ctxt) {

    const oohtml = el => {
        if (!el['.oohtml']) {
            el['.oohtml'] = {};
        }
        return el['.oohtml'];
    };

    // ----------------------
    // Define the global "templates" object
    // ----------------------

    if ('templates' in Ctxt.window.document) {
        throw new Error('document already has a "templates" property!');
    }
    const templates = {}, loadingTemplates = [];
    Object.defineProperty(Ctxt.window.document, 'templates', {
        value: templates,
    });
    Object.defineProperty(Ctxt.window.document, 'templatesReadyState', {
        value: 'loading',
        writable: true,
    });

    // ----------------------
    // Capture template elements
    // ----------------------

    const fireDocumentTemplateEvent = (template, type, namespace) => {
        Ctxt.window.document.dispatchEvent(new Ctxt.window.CustomEvent(type, {detail: {template, namespace}}));
    };

    const fireTemplateEvent = (template, type, namespace) => {
        template.dispatchEvent(new Ctxt.window.CustomEvent(type, {detail: {namespace}}));
    };

    const loadTemplateContent = (template, namespace) => {
        var src = template.getAttribute('src');
        return new Promise((resolve, reject) => {
            // Missing in jsdom
            if (Ctxt.window.fetch) {
                Ctxt.window.fetch(src).then(response => {
                    return response.ok ? response.text() : Promise.reject(response.statusText);
                }).then(content => {
                    template.innerHTML = content;
                    fireTemplateEvent(template, 'load', namespace);
                    fireDocumentTemplateEvent(template, 'templatecontentloaded', namespace);
                    resolve(template);
                }).catch(error => {
                    console.error('Error fetching the bundle at ' + src + '. (' + error + ')');
                    // Dispatch the event.
                    template.innerHTML = '';
                    fireTemplateEvent(template, 'loaderror', namespace);
                    fireDocumentTemplateEvent(template, 'templatecontentloaderror', namespace);
                    resolve(template);
                });
            } else {
                resolve();
                console.error('Error fetching the bundle at ' + src + '. (window.fetch() not supported by browser.)');
            }
        });
    };

    const discoverContents = (contents, node, namespace, onNamespaceAdded = false) => {
        if (!oohtml(node).partials) {

            // -----------------------
            // Templates and partials
            oohtml(node).templates = {};
            oohtml(node).partials = {};
            const manageComponent = (el, onMutation, remove) => {
                if (!el.matches) {
                    // Not an element child
                    return;
                }
                var templateName, partialsName;
                if ((el instanceof Ctxt.window.HTMLTemplateElement) && (templateName = el.getAttribute(params.TEMPLATE_NAMESPACE_ATTR))) {
                    var _namespace = (namespace ? namespace + '/' : '') + templateName;
                    if (remove) {
                        delete oohtml(node).templates[templateName];
                        if (oohtml(node).parentTemplate === node) {
                            delete oohtml(node).parentTemplate;
                        }
                        if (onMutation) {
                            fireDocumentTemplateEvent(el, 'templateremoved', _namespace);
                        }
                    } else {
                        oohtml(node).templates[templateName] = el;
                        oohtml(el).parentTemplate = node;
                        // Recurse
                        discoverContents(el.content, el, _namespace, onMutation);
                        if (onMutation) {
                            fireDocumentTemplateEvent(el, 'templateadded', _namespace);
                        }
                    }
                } else {
                    var partialsName = el.getAttribute(params.SLOT_REFERENCE_ATTR) || 'default';
                    if (remove) {
                        if (oohtml(node).partials[partialsName]) {
                            _remove(oohtml(node).partials[partialsName], el);
                            if (!oohtml(node).partials[partialsName].length) {
                                delete oohtml(node).partials[partialsName];
                            }
                        }
                    } else {
                        if (!oohtml(node).partials[partialsName]) {
                            oohtml(node).partials[partialsName] = [];
                        }
                        oohtml(node).partials[partialsName].push(el);
                    }
                }
            };

            // -----------------------
            // Handle content loading
            if (node.getAttribute('src') && !node.content.children.length) {
                loadingTemplates.push(loadTemplateContent(node, namespace));
            }
            Ctxt.Mutation.onAttrChange(node, changes => {
                loadTemplateContent(node, namespace);
            }, ['src']);

            // -----------------------
            // Own partials
            _arrFrom(contents.children).forEach(el => manageComponent(el, onNamespaceAdded));

            // -----------------------
            // Watch mutations
            var mo = new Ctxt.window.MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(el => manageComponent(el, true/* onMutation */));
                    mutation.removedNodes.forEach(el => manageComponent(el, true/* onMutation */, true/* remove */));
                })
            });
            mo.observe(contents, {childList:true});

        }
    };

    // ----------------------
    // Define the "templates" and "partials" properties on HTMLTemplateElement.prototype
    // ----------------------

    if ('templates' in Ctxt.window.HTMLTemplateElement.prototype) {
        throw new Error('The "HTMLTemplateElement" class already has a "templates" property!');
    }
    Object.defineProperty(Ctxt.window.HTMLTemplateElement.prototype, 'templates', {
        get: function() {
            return oohtml(this).templates;
        }
    });
    if ('partials' in Ctxt.window.HTMLTemplateElement.prototype) {
        throw new Error('The "HTMLTemplateElement" class already has a "partials" property!');
    }
    Object.defineProperty(Ctxt.window.HTMLTemplateElement.prototype, 'partials', {
        get: function() {
            return oohtml(this).partials;
        }
    });

    Ctxt.Mutation.onPresent('template[' + Ctxt.window.CSS.escape(params.TEMPLATE_NAMESPACE_ATTR) + ']', async el => {
        var name = el.getAttribute(params.TEMPLATE_NAMESPACE_ATTR);
        Ctxt.Observer.set(Ctxt.window.document.templates, name, el);
        // --------------------------
        discoverContents(el.content, el, name, true);
        fireDocumentTemplateEvent(el, 'templateadded', name);
        // --------------------------
        Ctxt.Mutation.onRemoved(el, removed => {
            if (Ctxt.window.document.templates[name] === el) {
                Ctxt.Observer.deleteProperty(Ctxt.window.document.templates, name);
            }
            fireDocumentTemplateEvent(el, 'templateremoved', name);
        }, {once:true});
        // --------------------------
    });

    // ----------------------
    // Define the "template" property on Element.prototype
    // ----------------------

    if ('template' in Ctxt.window.Element.prototype) {
        throw new Error('The "Element" class already has a "template" property!');
    }
    Object.defineProperty(Ctxt.window.Element.prototype, 'template', {
        get: function() {
            var templateId = this.getAttribute(params.TEMPLATE_REFERENCE_ATTR);
            if (templateId) {
                if (!oohtml(this).templates) {
                    oohtml(this).templates = {};
                }
                if (!oohtml(this).templates[templateId] || !this.hasAttribute('cache-template')) {
                    var imported = templateId.split('/').filter(n => n).reduce((context, item) => {
                        return context ? context.templates[item] || context.templates['*'] : null;
                    }, Ctxt.window.document);
                    oohtml(this).templates[templateId] = imported;
                }
                return oohtml(this).templates[templateId];
            }
        },
    });

    // ----------------------
    // Capture composable elements
    // ----------------------

    Ctxt.Mutation.onPresent('[' + Ctxt.window.CSS.escape(params.TEMPLATE_REFERENCE_ATTR) + ']', el => {
        if (_any(params.SLOTS_INERT_CONTEXTS, inertContext => el.closest(inertContext))) {
            return;
        }
        var resolveSlots = () => {
            _each(oohtml(el).slots, (name, slot) => {
                slot.resolve();
            });
        };

        // Resolve slots when reference to template changes
        Ctxt.Mutation.onAttrChange(el, resolveSlots, [params.TEMPLATE_REFERENCE_ATTR]);
        
        // Resolve slots when the referenced template changes
        var respondeToTemplateEvent = e => {
            var reference = el.getAttribute(params.TEMPLATE_REFERENCE_ATTR).split('/').filter(s => s).join('/');
            if (reference === e.detail.namespace || reference.startsWith(e.detail.namespace + '/')) {
                resolveSlots();
            }
        };
        Ctxt.window.document.addEventListener('templateadded', respondeToTemplateEvent);
        Ctxt.window.document.addEventListener('templateremoved', respondeToTemplateEvent);
        Ctxt.window.document.addEventListener('templatecontentloaded', respondeToTemplateEvent);
    });

    // ----------------------
    // Capture slot elements
    // ----------------------

    Ctxt.window.customElements.define(params.SLOT_ELEMENT, class extends Ctxt.window.HTMLElement {
        
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
            oohtml(this).slottedElements = slottedElements;
            oohtml(this).compositionBlock = compositionBlock;
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
                this.anchorNode = meta.call(Ctxt, 'isomorphic')
                    ? Ctxt.window.document.createComment(this.outerHTML)
                    : Ctxt.window.document.createTextNode('');
                this.after(this.anchorNode);
                oohtml(this).compositionBlock = !this.hasAttribute(params.TEMPLATE_REFERENCE_ATTR)
                    ? this.parentNode.closest('[' + Ctxt.window.CSS.escape(params.TEMPLATE_REFERENCE_ATTR) + ']')
                    : null;
                this._connectToCompositionBlock();
                Ctxt.ready.then(window => {
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
                if (!oohtml(this.compositionBlock).slots) {
                    oohtml(this.compositionBlock).slots = {};
                }
                // Now after the update slot ID
                oohtml(this.compositionBlock).slots[this.name] = this;
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
            oohtml(this).slottedObserver = Ctxt.Mutation.onRemoved(partials, removed => {
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
            if (_any(params.SLOTS_INERT_CONTEXTS, inertContext => this.closest(inertContext))) {
                return;
            }
            var getPartials = template => {
                var partials, templateFallback = parseInt(this.getAttribute('template-fallback'));
                do {
                    partials = template.partials[this.name];
                } while(!partials && (templateFallback --) > 0 && (template = oohtml(template).parentTemplate));
                return partials;
            };
            // -----------------
            // Global import or scoped slot?
            var template, partials;
            if (this.hasAttribute(params.TEMPLATE_REFERENCE_ATTR)) {
                // Did we previously had a compositionBlock?
                // Let's remove ourself
                if (this.compositionBlock && oohtml(this.compositionBlock).slots[this.name] === this) {
                    delete oohtml(this.compositionBlock).slots[this.name];
                }
                if (template = this.template) {
                    partials = getPartials(template);
                }
            } else {
                if (!this.compositionBlock) {
                    console.warn('Scoped slots must be found within template contexts. [' + this.name + ']', this);
                    return;
                }
                // We dont want this proccessed again on restoration to its position
                if (template = this.compositionBlock.template) {
                    partials = getPartials(template);
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
                if (partial.getAttribute(params.TEMPLATE_REFERENCE_ATTR) === '@slot') {
                    if (!oohtml(partial).templates) {
                        oohtml(partial).templates = {};
                    }
                    oohtml(partial).templates['@slot'] = this;
                }
                // Inherit attributes from the slot element before replacement
                mergeAttributes(partial, this);
                // ---------------------
                if (!partial.getAttribute(params.SLOT_REFERENCE_ATTR)) {
                    partial.setAttribute(params.SLOT_REFERENCE_ATTR, this.name);
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
            return this.getAttribute(params.SLOT_NAME_ATTR) || 'default';
        }

        /**
         * Returns the slot's compositionBlock, if any.
         *
         * @return array
         */
        get compositionBlock() {
            return oohtml(this).compositionBlock;
        }

        /**
         * Returns the slot's slotted elements.
         *
         * @return array
         */
        get slottedElements() {
            if (!oohtml(this).slottedElements) {
                oohtml(this).slottedElements = [];
            }
            return oohtml(this).slottedElements;
        }

        /**
         * Returns the slot's implementable partials
         *
         * @return array
         */
        get partials() {
            discoverContents(this, this);
            return oohtml(this).partials;
        }
                
        /**
         * The attributes we want to observe.
         *
         * @return array
         */
        static get observedAttributes() {
            return [params.SLOT_NAME_ATTR];
        }
    });

    // ----------------------
    // Restore slots from snapshots
    // ----------------------

    const hydrateSlots = () => {
        _arrFrom(Ctxt.window.document.querySelectorAll('[' + Ctxt.window.CSS.escape(params.SLOT_REFERENCE_ATTR) + ']')).forEach(partial => {
            // Scan
            if (!oohtml(partial.parentNode).slotsCan) {
                var slottedElements = [];
                partial.parentNode.childNodes.forEach(node => {
                    var nodeValue;
                    if (node.nodeType === 1/** ELEMENT_NODE */ && node.matches('[' + Ctxt.window.CSS.escape(params.SLOT_REFERENCE_ATTR) + ']')) {
                        slottedElements.push(node);
                    } else if (node.nodeType === 8/** COMMENT_NODE */ && (nodeValue = node.nodeValue.trim())
                    && nodeValue.startsWith('<' + params.SLOT_ELEMENT)
                    && nodeValue.endsWith('</' + params.SLOT_ELEMENT + '>')) {
                        var slot, reviver = Ctxt.window.document.createElement('div');
                        reviver.innerHTML = nodeValue;
                        if ((slot = reviver.firstChild).matches(params.SLOT_ELEMENT)) {
                            // Belongs to a composition block?
                            var compositionBlock;
                            if (!slot.hasAttribute(params.TEMPLATE_REFERENCE_ATTR)) {
                                compositionBlock = node.parentNode.closest('[' + Ctxt.window.CSS.escape(params.TEMPLATE_REFERENCE_ATTR) + ']');
                            }
                            slot.hydrate(node, slottedElements, compositionBlock);
                            // Empty basket
                            slottedElements = [];
                        }
                    }
                });
                // Scanning is once for every parent
                oohtml(partial.parentNode).slotsCan = true;
            }
        });
    };

    // ----------------------
    // Hydrate
    // ----------------------

    Object.defineProperty(Ctxt, 'templatesReady', {value: Ctxt.ready.then(() => {
        if (meta.call(Ctxt, 'isomorphic')) {
            hydrateSlots();
        }
        loadingTemplates.forEach(promise => {
            promise.catch(error => {
                console.warn(error);
            });
        });
        return Promise.all(loadingTemplates).then(() => {
            Ctxt.window.document.templatesReadyState = 'complete';
            Ctxt.window.document.dispatchEvent(new Ctxt.window.Event('templatesreadystatechange'));
        });
    })});
};

    /**
     * Imports partials from from sourceEl into el.
     *
     * @param Element				    exportEl
     * @param Element				    superExportEl
     * @param array    				    noinherit
     *
     * @return Element
     */
export function mergePartials(exportEl, superExportEl, noinherit = []) {
    if (!superExportEl.partialsSlottables) {
        return exportEl;
    }
    _each(superExportEl.partialsSlottables, (slotId, slottable) => {
        if (exportEl.partialsSlottables && exportEl.partialsSlottables[slotId]) {
            // Simply inherit attributes from the super slottable
            // The export may however define a no-inherit directive for all its slottables
            var _noinherit = noinherit.concat((exportEl.getAttribute('noinherit') || '').split(' ').map(val => val.trim()));
            this.mergeAttributes(exportEl.partialsSlottables[slotId], slottable, _noinherit, false/*prioritize*/);
        } else {
            // Copy new slottables
            exportEl.append(slottable.clone(true));
        }
    });
    return exportEl;
};

/**
 * Imports attributes from sourceEl into el.
 *
 * @param Element				    el
 * @param Element				    sourceEl
 * @param array						noinherit
 * @param bool						prioritize
 *
 * @return Element
 */
export function mergeAttributes(el, sourceEl, noinherit = [], prioritize = true) {
    // ----------------------------
    // Norecompose directive
    // ----------------------------
    noinherit = noinherit.concat(params.NO_INHERIT_ATTR);
    if (el.hasAttribute('noinherit')) {
        noinherit = noinherit.concat((el.getAttribute('noinherit') || '*').split(' ').map(val => val.trim()));
    }
    // ----------------------------
    // Merge list attributes...
    // ----------------------------
    var LIST_ATTR = params.LIST_ATTR.concat(['role', 'class']);
    _unique(LIST_ATTR).forEach(type => {
        var b_attr, a_attr;
        if (!noinherit.includes(type) && !noinherit.includes('*') && (b_attr = sourceEl.getAttribute(type))) {
            if (a_attr = el.getAttribute(type)) {
                var jointList = !prioritize ? [b_attr, a_attr] : [a_attr, b_attr];
            } else {
                var jointList = [b_attr];
            }
            el.setAttribute(type, _unique(jointList.join(' ').split(' ').map(r => r.trim())).join(' '));
            noinherit.push(type);
        }
    });
    // ----------------------------
    // Merge key/val attributes...
    // ----------------------------
    _unique(params.KEY_VAL_ATTR.concat('style')).forEach(type => {
        var b_attr, a_attr;
        if (!noinherit.includes(type) && !noinherit.includes('*') && (b_attr = sourceEl.getAttribute(type))) {
            if (a_attr = el.getAttribute(type)) {
                var jointDefs = !prioritize ? [b_attr, a_attr] : [a_attr, b_attr];
                if (!jointDefs[0].trim().endsWith(';')) {
                    jointDefs[0] = jointDefs[0] + ';';
                }
            } else {
                var jointDefs = [b_attr];
            }
            el.setAttribute(type, jointDefs.join(' '));
            noinherit.push(type);
        }
    });
    // ----------------------------
    // Port all other attributes...
    // ----------------------------
    if (!noinherit.includes('*')) {
        for (var i = 0; i < sourceEl.attributes.length; i ++) {
            var attr = sourceEl.attributes[i];
            if (!noinherit.includes(attr.name) 
            && (!el.hasAttribute(attr.name) || prioritize)) {
                el.setAttribute(attr.name, attr.value);
            }
        }
    }
    return el;
};
