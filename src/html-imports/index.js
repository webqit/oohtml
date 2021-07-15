
/**
 * @imports
 */
import _any from '@webqit/util/arr/any.js';
import _arrFrom from '@webqit/util/arr/from.js';
import _remove from '@webqit/util/arr/remove.js';
import _unique from '@webqit/util/arr/unique.js';
import _difference from '@webqit/util/arr/difference.js';
import _each from '@webqit/util/obj/each.js';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import _internals from '@webqit/util/js/internals.js';
import { config, scopeQuery,
    parseScopeReferenceExpr, queryMatchPath
} from '../util.js';

/**
 * ---------------------------
 * HTML Partials
 * ---------------------------
 */

/**
 * @init
 * 
 * @param Object config
 */
export default function init(_config = null, onDomReady = false) {

    const WebQit = domInit.call(this);
    if (onDomReady) {
        WebQit.DOM.ready(() => {
            init.call(this, _config, false);
        });
        return;
    }

    const window = WebQit.window;
    const document = WebQit.window.document;
    const mutations = WebQit.DOM.mutations;

    const importInertContexts = [];
    const _meta = config.call(this, {
        element: {
            import: 'import',
        },
        attr: {
            importid: 'name',
            templatespec: 'template-specificity',
        },
    }, _config);

    _defaultNoInherits.push(_meta.get('attr.importid'), _meta.get('attr.moduleref'));
    const modulerefSelector = '[' + window.CSS.escape(_meta.get('attr.moduleref')) + ']';
    const exportgroupSelector = '[' + window.CSS.escape(_meta.get('attr.exportgroup')) + ']';

    // ----------------------
    // Capture slot elements
    // ----------------------

    const Import = class/* extends window.HTMLElement*/ {

        /*
        static create(el) {
            return el;
        }
        constructor(importEl) {
            super();
            this.el = this;
        }
        */

        static create(el) {
            return new Import(el);
        }
        constructor(importEl) {
            this.el = importEl;
            const [ importID, modifiers ] = parseScopeReferenceExpr(importEl.getAttribute(_meta.get('attr.importid')) || 'default');
            _internals(this.el, 'oohtml').set('importID', importID);
            _internals(this.el, 'oohtml').set('importModifiers', modifiers);
        }
        
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
            _internals(this.el, 'oohtml').set('anchorNode', anchorNode);
            _internals(this.el, 'oohtml').set('slottedElements', slottedElements);
            _internals(this.el, 'oohtml').set('compositionBlock', compositionBlock);
            this._bindSlotted(slottedElements);
            this._connectToCompositionBlock();
        }
    
        /**
         * This triggers self-resolution
         *
         * @return void
         */
        connectedCallback() {
            if (!_internals(this.el, 'oohtml').has('anchorNode')) {
                _internals(this.el, 'oohtml').set('anchorNode', _meta.get('isomorphic')
                    ? document.createComment(this.el.outerHTML)
                    : document.createTextNode(''));
                _internals(this.el, 'oohtml').set('compositionBlock', !this.el.hasAttribute(_meta.get('attr.moduleref'))
                    ? this.el.parentNode.closest(modulerefSelector) : (
                        this.el.getAttribute(_meta.get('attr.moduleref')).trim().startsWith('~') ? this.el.parentNode.closest(exportgroupSelector) : null
                    ));
                this._connectToCompositionBlock();
            }
            WebQit.DOM.ready.call(WebQit, () => {
                this.resolve();
            });
        }
    
        /**
         * Connects the instance to the compositionBlock.
         */
        _connectToCompositionBlock() {
            if (this.compositionBlock) {
                // Now after the update slot ID
                _internals(this.compositionBlock, 'oohtml', 'imports').set(this.importID, this.el);
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
                _export.importReference = this.el;
            });
            _internals(this.el, 'oohtml').set('slottedObserver', mutations.onRemoved(exports, (removed, state, isTransient, addedState, removedState) => {
                if (removedState && removedState.size === exports.length) {
                    _internals(this.el, 'oohtml').get('slottedObserver').disconnect();
                }
                removed.forEach(remd => {
                    // Let's ensure this wasn't slotted againe
                    if (!remd.parentNode) {
                        _remove(this.slottedElements, remd);
                    }
                    // if the slotted hasnt been slotted somewhere
                    if (remd.importReference === this.el) {
                        delete remd.importReference;
                    }
                });
                // If this was the last of the s,ottable in the same family of IDs,
                // we should restore the original slot
                if (!this.slottedElements.length) {
                    // Must be assigned bu now
                    // for it to be removed in the first place
                    if (this.anchorNode.isConnected) {
                        this.anchorNode.replaceWith(this.el);
                    }
                }
            }, {maintainCallState: true, ignoreTransients: true}));
        }

        /**
         * Resolves the slot
         */
        resolve() {
            if (_any(importInertContexts, inertContext => this.el.closest(inertContext))) {
                return;
            }
            var getExports = (contexts, moduleref) => {
                var importId = this.importID,
                    modifiers = this.importModifiers,
                    [ superA, superB ] = 'super' in modifiers ? modifiers.super.split('-').filter(a => a).map(a => parseInt(a || 0)).concat([0, 1000]) : [0, 0];
                    const aggrExports = modules => modules.reduce((_exports, _module) => _exports.concat(_internals(_module, 'oohtml', 'exports').get(importId) || []), []);
                return scopeQuery(contexts, moduleref, function(host, prop) {
                    var collection = _internals(host, 'oohtml', 'templates');
                    if (arguments.length === 1) return collection;
                    if (prop.startsWith(':')) return _internals(host, 'oohtml', 'exports').get(prop.substr(1));
                    return collection.get(prop);
                }, function(_modules, level, isRewinding) {
                    var exportsAggr = aggrExports(_modules);
                    if (!exportsAggr.length && level > superA && superB) {
                        superB --;
                        return -1;
                    }
                    return exportsAggr;
                });
            };
            // -----------------
            // Global import or scoped slot?
            var templateSource, exports;
            if (this.el.hasAttribute(_meta.get('attr.moduleref'))) {
                // Did we previously had a compositionBlock?
                // Let's remove ourself
                if (this.compositionBlock && _internals(this.compositionBlock, 'oohtml', 'imports').get(this.importID) === this.el) {
                    _internals(this.compositionBlock, 'oohtml', 'imports').delete(this.importID);
                }
                templateSource = this.el;
            } else {
                if (!this.compositionBlock) {
                    console.warn('Scoped slots must be found within template contexts. [' + this.importID + ']', this.el);
                    return;
                }
                templateSource = this.compositionBlock;
            }
            var moduleref = templateSource.getAttribute(_meta.get('attr.moduleref')).trim();
            if (templateSource && (exports = getExports([moduleref.startsWith('~') ? this.compositionBlock : document], moduleref)).length) {
                if (_difference(exports, _internals(this.el, 'oohtml').get('originalSlottedElements') || []).length) {
                    _internals(this.el, 'oohtml').set('originalSlottedElements', exports);
                    this.fill(exports);
                }
            } else {
                _internals(this.el, 'oohtml').set('originalSlottedElements', null);
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
            if (this.el.isConnected) {
                this.el.replaceWith(this.anchorNode);
            }
            // ---------------------
            // Slot-in the corresponding exports from template
            exports.forEach(_export => {
                // ---------------------
                // Implement the slot?
                _internals(_export, 'oohtml', 'templates').set('~', this.el);
                // Inherit attributes from the slot element before replacement
                mergeAttributes(_export, this.el);
                // ---------------------
                if (!_export.getAttribute(_meta.get('attr.exportgroup'))) {
                    _export.setAttribute(_meta.get('attr.exportgroup'), this.importID);
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
                if (silently && _internals(this.el, 'oohtml').has('slottedObserver')) {
                    _internals(this.el, 'oohtml').get('slottedObserver').disconnect();
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
        get importID() {
            return _internals(this.el, 'oohtml').get('importID');
        }

        /**
         * Returns the slot's import Modifiers.
         *
         * @return string
         */
         get importModifiers() {
            return _internals(this.el, 'oohtml').get('importModifiers');
        }

        /**
         * Returns the slot's anchorNode.
         *
         * @return array
         */
        get anchorNode() {
            return _internals(this.el, 'oohtml').get('anchorNode');
        }

        /**
         * Returns the slot's compositionBlock, if any.
         *
         * @return array
         */
        get compositionBlock() {
            return _internals(this.el, 'oohtml').get('compositionBlock');
        }

        /**
         * Returns the slot's slotted elements.
         *
         * @return array
         */
        get slottedElements() {
            if (!_internals(this.el, 'oohtml').has('slottedElements')) {
                _internals(this.el, 'oohtml').set('slottedElements', []);
            }
            return _internals(this.el, 'oohtml').get('slottedElements');
        }

        /**
         * Returns the slot's implementable exports
         *
         * @return array
         */
        get exports() {
            return _internals(this.el, 'oohtml').get('exports');
        }
                
        /**
         * The attributes we want to observe.
         *
         * @return array
         */
        static get observedAttributes() {
            return [_meta.get('attr.importid')];
        }
    };

    // ----------------------
    // Capture import elements
    // ----------------------

    mutations.onPresent(_meta.get('element.import'), el => {
        var importElInstance = Import.create(el);
        importElInstance.connectedCallback();
    });
    /**
    window.customElements.define(_meta.get('element.import'), Import);
    */

    // ----------------------
    // Progressive resolution
    // ----------------------
    
    const resolveSlots = (el, exportName) => {
        const shouldResolve = (importEl, importName) => !exportName || importName === exportName || (exportName === true && importEl.getAttribute(_meta.get('attr.templatespec')));
        if (el.matches(_meta.get('element.import'))) {
            var importElInstance = Import.create(el);
            importElInstance.connectedCallback();
            if (shouldResolve(el, importElInstance.importID)) {
                importElInstance.resolve();
            }
        } else {
            _internals(el, 'oohtml', 'imports').forEach((importEl, name) => {
                if (shouldResolve(importEl, name)) {
                    var importElInstance = Import.create(importEl);
                    importElInstance.resolve();
                }
            });
        }
    };
    
    mutations.onPresent(modulerefSelector, el => {
        if (_any(importInertContexts, inertContext => el.closest(inertContext))) {
            return;
        }
        // Imports resolve by themselves
        // But...
        // We resolve them again when reference to template changes
        mutations.onAttrChange(el, mr => {
            if (mr[0].target.getAttribute(mr[0].attributeName) !== mr[0].oldValue) {
                resolveSlots(el);
            }
        }, [_meta.get('attr.moduleref'), _meta.get('attr.importid')]);
    });

    document.addEventListener('templatemutation', e => {
        // Resolve slots when the referenced template changes
        if (!e.detail.path) {
            return;
        }
        _arrFrom(document.querySelectorAll('[' + window.CSS.escape(_meta.get('attr.moduleref')) + ']')).forEach(el => {
            if (queryMatchPath(el.getAttribute(_meta.get('attr.moduleref')), e.detail.path)) {
                resolveSlots(el, true);
                e.detail.addedExports.concat(e.detail.removedExports).forEach(exportGroup => {
                    resolveSlots(el, exportGroup.name);
                });
            }
        });
    });

    // ----------------------
    // Restore slots from snapshots
    // ----------------------

    const hydrateSlots = () => {
        _arrFrom(document.querySelectorAll(exportgroupSelector)).forEach(_export => {
            // Scan
            if (!_internals(_export.parentNode, 'oohtml').get('importsCan')) {
                var slottedElements = [];
                _export.parentNode.childNodes.forEach(node => {
                    var nodeValue;
                    if (node.nodeType === 1/** ELEMENT_NODE */ && node.matches(exportgroupSelector)) {
                        slottedElements.push(node);
                    } else if (node.nodeType === 8/** COMMENT_NODE */ && (nodeValue = node.nodeValue.trim())
                    && nodeValue.startsWith('<' + _meta.get('element.import'))
                    && nodeValue.endsWith('</' + _meta.get('element.import') + '>')) {
                        var importEl, reviver = document.createElement('div');
                        reviver.innerHTML = nodeValue;
                        if ((importEl = reviver.firstChild).matches(_meta.get('element.import'))) {
                            // Belongs to a composition block?
                            var compositionBlock = !importEl.hasAttribute(_meta.get('attr.moduleref'))
                                ? node.parentNode.closest(modulerefSelector) : (
                                    importEl.getAttribute(_meta.get('attr.moduleref')).trim().startsWith('~') ? node.parentNode.closest(exportgroupSelector) : null
                                )
                            var importElInstance = Import.create(importEl);
                            importElInstance.hydrate(node, slottedElements, compositionBlock);
                            // Empty basket
                            slottedElements = [];
                        }
                    }
                });
                // Scanning is once for every parent
                _internals(_export.parentNode, 'oohtml').set('importsCan', true);
            }
        });
    };

    // ----------------------
    // Hydrate
    // ----------------------

    WebQit.DOM.ready.call(WebQit, () => {
        if (_meta.get('isomorphic')) {
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
