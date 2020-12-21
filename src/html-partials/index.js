
/**
 * @imports
 */
import DOMInit from '@webqit/browser-pie/src/dom/index.js';
import _any from '@webqit/util/arr/any.js';
import _arrFrom from '@webqit/util/arr/from.js';
import _remove from '@webqit/util/arr/remove.js';
import _unique from '@webqit/util/arr/unique.js';
import _each from '@webqit/util/obj/each.js';
import { getOohtmlBase, createParams } from '../util.js';

/**
 * ---------------------------
 * HTML Partials
 * ---------------------------
 */

/**
 * @init
 * 
 * @param window window
 */
export default async function init(window, config = null) {

    const Ctxt = DOMInit(window);
    const document = Ctxt.window.document;
	const importInertContexts = [];
    const _meta = await createParams.call(Ctxt, {
		attr: {
            importid: 'name',
        },
        tag: {
            import: 'oo-import',
        },
    }, config);
    if (!_meta.tag.import.includes('-')) {
        throw new Error('The OOHTML import element must be specified as a custom element.');
    }
    _defaultNoInherits.push(_meta.attr.importid, _meta.attr.templatedep);

    // ----------------------
    // Capture composable elements
    // ----------------------

    Ctxt.Mutation.onPresent('[' + window.CSS.escape(_meta.attr.templatedep) + ']', el => {
        if (_any(importInertContexts, inertContext => el.closest(inertContext))) {
            return;
        }
        var resolveSlots = exportName => {
            if (el.matches(_meta.tag.import)) {
                if (!exportName || el.name === exportName) {
                    el.resolve();
                }
            } else {
                _each(getOohtmlBase(el).slots, (name, slot) => {
                    if (!exportName || name === exportName) {
                        slot.resolve();
                    }
                });
            }
        };

        // Resolve slots when reference to template changes
        Ctxt.Mutation.onAttrChange(el, resolveSlots, [_meta.attr.templatedep]);
        
        // Resolve slots when the referenced template changes
        var respondeToTemplateEvent = e => {
            let [ eventPath, exportName, ] = e.detail.path.split(':');
            var reference = el.getAttribute(_meta.attr.templatedep).split('/').map(s => s.trim()).filter(s => s).join('/');
            if (reference === eventPath) {
                resolveSlots(exportName);
            }
        };
        document.addEventListener('templateadded', respondeToTemplateEvent);
        document.addEventListener('templateremoved', respondeToTemplateEvent);
        document.addEventListener('exportadded', respondeToTemplateEvent);
        document.addEventListener('exportremoved', respondeToTemplateEvent);
    });

    // ----------------------
    // Capture slot elements
    // ----------------------

    window.customElements.define(_meta.tag.import, class extends window.HTMLElement {
        
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
            getOohtmlBase(this).slottedElements = slottedElements;
            getOohtmlBase(this).compositionBlock = compositionBlock;
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
                this.anchorNode = _meta.isomorphic
                    ? document.createComment(this.outerHTML)
                    : document.createTextNode('');
                this.after(this.anchorNode);
                getOohtmlBase(this).compositionBlock = !this.hasAttribute(_meta.attr.templatedep)
                    ? this.parentNode.closest('[' + window.CSS.escape(_meta.attr.templatedep) + ']')
                    : null;
                this._connectToCompositionBlock();
                Ctxt.ready.then(window => {
                    this.resolve();
                });
            }
        }
    
        /**
         * Connects the instance to the compositionBlock.
         */
        _connectToCompositionBlock() {
            if (this.compositionBlock) {
                if (!getOohtmlBase(this.compositionBlock).slots) {
                    getOohtmlBase(this.compositionBlock).slots = {};
                }
                // Now after the update slot ID
                getOohtmlBase(this.compositionBlock).slots[this.name] = this;
            }
        }

        /**
         * Bind a slotted element.
         *
         * @param array              exports
         *
         * @return void
         */
        _bindSlotted(exports) {
            exports.forEach(_export => {
                _export.slotReference = this;
            });
            getOohtmlBase(this).slottedObserver = Ctxt.Mutation.onRemoved(exports, removed => {
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
            if (_any(importInertContexts, inertContext => this.closest(inertContext))) {
                return;
            }
            var getPartials = template => {
                var exports, templateFallback = parseInt(this.getAttribute('template-fallback'));
                do {
                    exports = getOohtmlBase(template).exports[this.name];
                } while(!exports && (templateFallback --) > 0 && (template = getOohtmlBase(template).parentTemplate));
                return exports;
            };
            // -----------------
            // Global import or scoped slot?
            var template, exports;
            if (this.hasAttribute(_meta.attr.templatedep)) {
                // Did we previously had a compositionBlock?
                // Let's remove ourself
                if (this.compositionBlock && getOohtmlBase(this.compositionBlock).slots[this.name] === this) {
                    delete getOohtmlBase(this.compositionBlock).slots[this.name];
                }
                if (template = this.template) {
                    exports = getPartials(template);
                }
            } else {
                if (!this.compositionBlock) {
                    console.warn('Scoped slots must be found within template contexts. [' + this.name + ']', this);
                    return;
                }
                // We dont want this proccessed again on restoration to its position
                if (template = this.compositionBlock.template) {
                    exports = getPartials(template);
                }
            }
            if (template)
            if (template && exports) {
                this.fill(exports);
            } else {
                this.empty();
            }
        }

        /**
         * Fill slot with exports.
         *
         * @param array|Element     exports
         *
         * @return void
         */
        fill(exports) {
            exports = _arrFrom(exports, false/* castObject */).map(_export => _export.cloneNode(true));
            // ---------------------
            // Discard previous slotted elements
            // But this intentional removal should not trigger slot restoration
            this.empty(true/* silently */);
            this.remove();
            // ---------------------
            // Slot-in the corresponding exports from template
            exports.forEach(_export => {
                // ---------------------
                // Implement the slot?
                if (_export.getAttribute(_meta.attr.templatedep) === '@slot') {
                    if (!getOohtmlBase(_export).templates) {
                        getOohtmlBase(_export).templates = {};
                    }
                    getOohtmlBase(_export).templates['@slot'] = this;
                }
                // Inherit attributes from the slot element before replacement
                mergeAttributes(_export, this);
                // ---------------------
                if (!_export.getAttribute(_meta.attr.export)) {
                    _export.setAttribute(_meta.attr.export, this.name);
                }
                // Place slottable
                this.anchorNode.before(_export);
            });
            this._bindSlotted(exports);
            // ---------------------
            // Updatate records
            this.slottedElements.push(...exports);
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
            return this.getAttribute(_meta.attr.importid) || 'default';
        }

        /**
         * Returns the slot's compositionBlock, if any.
         *
         * @return array
         */
        get compositionBlock() {
            return getOohtmlBase(this).compositionBlock;
        }

        /**
         * Returns the slot's slotted elements.
         *
         * @return array
         */
        get slottedElements() {
            if (!getOohtmlBase(this).slottedElements) {
                getOohtmlBase(this).slottedElements = [];
            }
            return getOohtmlBase(this).slottedElements;
        }

        /**
         * Returns the slot's implementable exports
         *
         * @return array
         */
        get exports() {
            discoverContents(this, this);
            return getOohtmlBase(this).exports;
        }
                
        /**
         * The attributes we want to observe.
         *
         * @return array
         */
        static get observedAttributes() {
            return [_meta.attr.importid];
        }
    });

    // ----------------------
    // Restore slots from snapshots
    // ----------------------

    const hydrateSlots = () => {
        _arrFrom(document.querySelectorAll('[' + window.CSS.escape(_meta.attr.export) + ']')).forEach(_export => {
            // Scan
            if (!getOohtmlBase(_export.parentNode).slotsCan) {
                var slottedElements = [];
                _export.parentNode.childNodes.forEach(node => {
                    var nodeValue;
                    if (node.nodeType === 1/** ELEMENT_NODE */ && node.matches('[' + window.CSS.escape(_meta.attr.export) + ']')) {
                        slottedElements.push(node);
                    } else if (node.nodeType === 8/** COMMENT_NODE */ && (nodeValue = node.nodeValue.trim())
                    && nodeValue.startsWith('<' + _meta.tag.import)
                    && nodeValue.endsWith('</' + _meta.tag.import + '>')) {
                        var slot, reviver = document.createElement('div');
                        reviver.innerHTML = nodeValue;
                        if ((slot = reviver.firstChild).matches(_meta.tag.import)) {
                            // Belongs to a composition block?
                            var compositionBlock;
                            if (!slot.hasAttribute(_meta.attr.templatedep)) {
                                compositionBlock = node.parentNode.closest('[' + window.CSS.escape(_meta.attr.templatedep) + ']');
                            }
                            slot.hydrate(node, slottedElements, compositionBlock);
                            // Empty basket
                            slottedElements = [];
                        }
                    }
                });
                // Scanning is once for every parent
                getOohtmlBase(_export.parentNode).slotsCan = true;
            }
        });
    };

    // ----------------------
    // Hydrate
    // ----------------------

    Ctxt.ready.then(() => {
        if (_meta.isomorphic) {
            hydrateSlots();
        }
    });
};

/**
 * Imports exports from from sourceEl into el.
 *
 * @param Element				    exportEl
 * @param Element				    superExportEl
 * @param array    				    noinherit
 *
 * @return Element
 */
export function mergePartials(exportEl, superExportEl, noinherit = []) {
    if (!superExportEl.exportsSlottables) {
        return exportEl;
    }
    _each(superExportEl.exportsSlottables, (slotId, slottable) => {
        if (exportEl.exportsSlottables && exportEl.exportsSlottables[slotId]) {
            // Simply inherit attributes from the super slottable
            // The export may however define a no-inherit directive for all its slottables
            var _noinherit = noinherit.concat((exportEl.getAttribute('noinherit') || '').split(' ').map(val => val.trim()));
            this.mergeAttributes(exportEl.exportsSlottables[slotId], slottable, _noinherit, false/*prioritize*/);
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
    noinherit = noinherit.concat(_defaultNoInherits);
    if (el.hasAttribute('noinherit')) {
        noinherit = noinherit.concat((el.getAttribute('noinherit') || '*').split(' ').map(val => val.trim()));
    }
    // ----------------------------
    // Merge list attributes...
    // ----------------------------
    var defaultListAttrs = _defaultListAttrs.concat(['role', 'class']);
    _unique(defaultListAttrs).forEach(type => {
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
    _unique(_defaultKeyValAttrs.concat('style')).forEach(type => {
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

const _defaultNoInherits = ['nocompose'], 
    _defaultKeyValAttrs = [],
    _defaultListAttrs = [];
