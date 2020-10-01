
/**
 * @imports
 */
import Observer from '@web-native-js/observer';
import ready from '@onephrase/util/dom/ready.js';
import { onPresent, onRemoved, onAttrChange } from '@onephrase/util/dom/mutation.js';
import _isEmpty from '@onephrase/util/js/isEmpty.js';
import _any from '@onephrase/util/arr/any.js';
import _arrFrom from '@onephrase/util/arr/from.js';
import _remove from '@onephrase/util/arr/remove.js';
import _unique from '@onephrase/util/arr/unique.js';
import _each from '@onephrase/util/obj/each.js';
import _merge from '@onephrase/util/obj/merge.js';
import meta from '../meta.js';
import params from './params.js';

/**
 * ---------------------------
 * The ScopedHTML class
 * ---------------------------
 */				

export default class HTMLPartials {

    /**
     * @constructor
     */
    constructor(window, trap = Observer, _params = {}) {

        const _this = this;
        _this.window = window;
        _this.trap = trap;
        _this.params = _merge({}, params, _params);

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

        if ('templates' in _this.window.document) {
            throw new Error('document already has a "templates" property!');
        }
        const templates = {}, loadingTemplates = [];
        Object.defineProperty(_this.window.document, 'templates', {
            value: templates,
        });
        Object.defineProperty(_this.window.document, 'templatesReadyState', {
            value: 'loading',
            writable: true,
        });

        // ----------------------
        // Capture template elements
        // ----------------------

        const addTemplate = el => {
            var name = el.getAttribute(_this.params.templateNamespaceAttribute);
            _this.trap.set(_this.window.document.templates, name, el);
        };
        onPresent(_this.window, 'template[' + _this.window.CSS.escape(_this.params.templateNamespaceAttribute) + ']', el => {
            // --------------------------
            const load = () => {
                var src = el.getAttribute('src');
                return new Promise((resolve, reject) => {
                    // Missing in jsdom
                    if (_this.window.fetch) {
                        _this.window.fetch(src).then(response => {
                            return response.ok ? response.text() : Promise.reject(response.statusText);
                        }).then(content => {
                            el.innerHTML = content;
                            addTemplate(el);
                            el.dispatchEvent(new _this.window.Event('load'));
                            resolve(el);
                        }).catch(error => {
                            // Dispatch the event.
                            el.innerHTML = '';
                            addTemplate(el);
                            el.dispatchEvent(new _this.window.Event('loaderror'));
                            resolve(el);
                            console.error('Error fetching the bundle at ' + src + '. (' + error + ')');
                        });
                    } else {
                        resolve(el);
                        console.error('Error fetching the bundle at ' + src + '. (window.fetch() not supported by browser.)');
                    }
                });
            };
            // --------------------------
            onAttrChange(_this.window, el, changes => {
                load();
            }, ['src']);
            onAttrChange(_this.window, el, changes => {
                if (_this.window.document.templates[changes[0].oldValue] === el) {
                    _this.trap.deleteProperty(_this.window.document.templates, changes[0].oldValue);
                }
                addTemplate(el);
            }, [_this.params.templateNamespaceAttribute]);
            onRemoved(_this.window, el, removed => {
                var name = el.getAttribute(_this.params.templateNamespaceAttribute);
                if (_this.window.document.templates[name] === el) {
                    _this.trap.deleteProperty(_this.window.document.templates, name);
                }
            }, {once:true});
            // --------------------------
            if (el.getAttribute('src') && !el.content.children.length) {
                loadingTemplates.push(load());
            } else {
                addTemplate(el);
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
                    if ((el instanceof _this.window.HTMLTemplateElement) && (templateName = el.getAttribute(_this.params.templateNamespaceAttribute))) {
                        chtml(template).templates[templateName] = el;
                    } else {
                        var partialsName = el.getAttribute(_this.params.slotReferenceAttribute) || 'default';
                        if (!chtml(template).partials[partialsName]) {
                            chtml(template).partials[partialsName] = [];
                        }
                        chtml(template).partials[partialsName].push(el);
                    }
                });
            }
        };
        if ('templates' in _this.window.HTMLTemplateElement.prototype) {
            throw new Error('The "HTMLTemplateElement" class already has a "templates" property!');
        }
        Object.defineProperty(_this.window.HTMLTemplateElement.prototype, 'templates', {
            get: function() {
                discoverContents(this);
                return chtml(this).templates;
            }
        });
        if ('partials' in _this.window.HTMLTemplateElement.prototype) {
            throw new Error('The "HTMLTemplateElement" class already has a "partials" property!');
        }
        Object.defineProperty(_this.window.HTMLTemplateElement.prototype, 'partials', {
            get: function() {
                discoverContents(this);
                return chtml(this).partials;
            }
        });

        // ----------------------
        // Define the "template" property on Element.prototype
        // ----------------------

        if ('template' in _this.window.Element.prototype) {
            throw new Error('The "Element" class already has a "template" property!');
        }
        Object.defineProperty(_this.window.Element.prototype, 'template', {
            get: function() {
                var templateId = this.getAttribute(_this.params.templateReferenceAttribute);
                if (templateId) {
                    if (!chtml(this).templates) {
                        chtml(this).templates = {};
                    }
                    if (!chtml(this).templates[templateId] || !this.hasAttribute('cache-template')) {
                        var imported = templateId.split('/').filter(n => n).reduce((context, item) => {
                            return context ? context.templates[item] || context.templates['*'] : null;
                        }, _this.window.document);
                        chtml(this).templates[templateId] = imported;
                    }
                    return chtml(this).templates[templateId];
                }
            },
        });

        // ----------------------
        // Capture composable elements
        // ----------------------

        onPresent(_this.window, '[' + _this.window.CSS.escape(_this.params.templateReferenceAttribute) + ']', el => {
            var inerts = _this.params.inertContexts.concat(_this.params.inertSubjects);
            if (_any(inerts, inertContext => el.closest(inertContext))) {
                return;
            }
            var resolveSlots = () => {
                _each(chtml(el).slots, (name, slot) => {
                    slot.resolve();
                });
            };
            // Resolve slots when reference to template changes
            onAttrChange(_this.window, el, resolveSlots, [_this.params.templateReferenceAttribute]);
            // Resolve slots when the referenced template changes
            _this.trap.observe(_this.window.document.templates, changes => {
                var reference = el.getAttribute(_this.params.templateReferenceAttribute);
                changes.forEach(change => {
                    if (reference === change.value || reference.startsWith(change.value + '/')) {
                        resolveSlots();
                    }
                });
            });
        });

        // ----------------------
        // Capture slot elements
        // ----------------------

        _this.window.customElements.define(_this.params.slotElement, class extends _this.window.HTMLElement {
            
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
                    this.anchorNode = meta(_this.window, 'isomorphic')
                        ? _this.window.document.createComment(this.outerHTML)
                        : _this.window.document.createTextNode('');
                    this.after(this.anchorNode);
                    chtml(this).compositionBlock = !this.hasAttribute(_this.params.templateReferenceAttribute)
                        ? this.parentNode.closest('[' + _this.window.CSS.escape(_this.params.templateReferenceAttribute) + ']')
                        : null;
                    this._connectToCompositionBlock();
                    ready(_this.window, () => {
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
                chtml(this).slottedObserver = onRemoved(_this.window, partials, removed => {
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
                if (_any(_this.params.inertContexts, inertContext => this.closest(inertContext))) {
                    return;
                }
                // -----------------
                // Global import or scoped slot?
                var template, partials;
                if (this.hasAttribute(_this.params.templateReferenceAttribute)) {
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
                    if (partial.getAttribute(_this.params.templateReferenceAttribute) === '@slot') {
                        if (!chtml(partial).templates) {
                            chtml(partial).templates = {};
                        }
                        chtml(partial).templates['@slot'] = this;
                    }
                    // Inherit attributes from the slot element before replacement
                    _this.mergeAttributes(partial, this);
                    // ---------------------
                    if (!partial.getAttribute(_this.params.slotReferenceAttribute)) {
                        partial.setAttribute(_this.params.slotReferenceAttribute, this.name);
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
                return this.getAttribute(_this.params.slotNameAttribute) || 'default';
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
                return [_this.params.slotNameAttribute];
            }
        });

        // ----------------------
        // Restore slots from snapshots
        // ----------------------

        const hydrateSlots = () => {
            _arrFrom(_this.window.document.querySelectorAll('[' + _this.window.CSS.escape(_this.params.slotReferenceAttribute) + ']')).forEach(partial => {
                // Scan
                if (!chtml(partial.parentNode).slotsCan) {
                    var slottedElements = [];
                    partial.parentNode.childNodes.forEach(node => {
                        var nodeValue;
                        if (node.nodeType === 1/** ELEMENT_NODE */ && node.matches('[' + _this.window.CSS.escape(_this.params.slotReferenceAttribute) + ']')) {
                            slottedElements.push(node);
                        } else if (node.nodeType === 8/** COMMENT_NODE */ && (nodeValue = node.nodeValue.trim())
                        && nodeValue.startsWith('<' + _this.params.slotElement)
                        && nodeValue.endsWith('</' + _this.params.slotElement + '>')) {
                            var slot, reviver = _this.window.document.createElement('div');
                            reviver.innerHTML = nodeValue;
                            if ((slot = reviver.firstChild).matches(_this.params.slotElement)) {
                                // Belongs to a composition block?
                                var compositionBlock;
                                if (!slot.hasAttribute(_this.params.templateReferenceAttribute)) {
                                    compositionBlock = node.parentNode.closest('[' + _this.window.CSS.escape(_this.params.templateReferenceAttribute) + ']');
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
        // Hydrate
        // ----------------------

        loadingTemplates.forEach(promise => {
            promise.catch(error => {
                console.warn(error);
            });
        });
        ready(_this.window, () => {
            Promise.all(loadingTemplates).then(() => {
                _this.window.document.templatesReadyState = 'complete';
                _this.window.document.dispatchEvent(new _this.window.Event('templatesreadystatechange'));
            });
            if (meta(_this.window, 'isomorphic')) {
                hydrateSlots();
            }
        });
    }

    /**
     * Imports partials from from sourceEl into el.
     *
     * @param Element				    exportEl
     * @param Element				    superExportEl
     * @param array    				    noinherit
     *
     * @return Element
     */
    mergePartials(exportEl, superExportEl, noinherit = []) {
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
    }

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
    mergeAttributes(el, sourceEl, noinherit = [], prioritize = true) {
        // ----------------------------
        // Norecompose directive
        // ----------------------------
        noinherit = noinherit.concat(this.params.noinheritAttributes);
        if (el.hasAttribute('noinherit')) {
            noinherit = noinherit.concat((el.getAttribute('noinherit') || '*').split(' ').map(val => val.trim()));
        }
        // ----------------------------
        // Merge list attributes...
        // ----------------------------
        var listAttributes = this.params.listAttributes.concat(['role', 'class']);
        _unique(listAttributes).forEach(type => {
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
        _unique(this.params.keyValAttributes.concat('style')).forEach(type => {
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
    }

};
