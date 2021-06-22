
/**
 * @imports
 */
 import _isEmpty from '@webqit/util/js/isEmpty.js';
import _arrFrom from '@webqit/util/arr/from.js';
import _remove from '@webqit/util/arr/remove.js';
import _each from '@webqit/util/obj/each.js';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import { config, footprint } from '../util.js';

/**
 * ---------------------------
 * Named Templates
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

    const _meta = config.call(this, {
        element: {
            template: '',
            export: 'export',
            import: 'import',
        },
		attr: {
            moduleid: 'name',
            moduleref: 'template',
            exportid: 'name',
            exportgroup: 'exportgroup',
        },
        api: {
            templateClass: '',
            templates: 'templates',
            exports: 'exports',
            moduleref: 'template',
        },
    }, _config);

    const templateSelector = 'template' + (_meta.get('element.template') ? '[is="' + _meta.get('element.template') + '"]' : '') + '[' + window.CSS.escape(_meta.get('attr.moduleid')) + ']';
    var TemplateElementClass = window.HTMLTemplateElement;
    if (_meta.get('api.templateClass')) {
        if (!window[_meta.get('api.templateClass')]) {
            throw new Error('The custom element class "' + _meta.get('api.templateClass') + '" is not defined!');
        }
        TemplateElementClass = window[_meta.get('api.templateClass')];
    }

    // ----------------------
    // Capture template elements
    // ----------------------

    const fireDocumentTemplateEvent = (type, value, path) => {
        if (type === 'templatemutation') {
            ['addedExports', 'removedExports'].forEach(listType => {
                Object.defineProperty(value, listType, {value: Object.keys(value[listType]).map(name => ({name, items: value[listType][name]}))});
            });
            ['addedTemplates', 'removedTemplates'].forEach(listType => {
                Object.defineProperty(value, listType, {value: Object.keys(value[listType]).map(name => ({name, item: value[listType][name]}))});
            });
        }
        Object.defineProperty(value, 'path', {value: path});
        document.dispatchEvent(new window.CustomEvent(type, {detail: value}));
    };

    const loadTemplateContent = (template, path) => {
        const fireTemplateEvent = type => {
            template.dispatchEvent(new window.CustomEvent(type, {detail: {path}}));
        };
        var src = template.getAttribute('src');
        return new Promise((resolve, reject) => {
            // Missing in jsdom
            if (window.fetch) {
                window.fetch(src).then(response => {
                    return response.ok ? response.text() : Promise.reject(response.statusText);
                }).then(content => {
                    template.innerHTML = content;
                    fireTemplateEvent('load');
                    fireDocumentTemplateEvent('templatecontentloaded', {template}, path);
                    resolve(template);
                }).catch(error => {
                    console.error('Error fetching the bundle at ' + src + '. (' + error + ')');
                    // Dispatch the event.
                    template.innerHTML = '';
                    fireTemplateEvent('loaderror');
                    fireDocumentTemplateEvent('templatecontentloaderror', {template}, path);
                    resolve(template);
                });
            } else {
                resolve();
                console.error('Error fetching the bundle at ' + src + '. (window.fetch() not supported by browser.)');
            }
        });
    };

    const discoverContents = (contents, node, path, mutationType = null, fireEvents = true) => {

        // -----------------------
        // Templates and exports
        const manageComponent = (el, eventsObject, mutationType, fireEvents) => {
            if (!el.matches) {
                // Not an element child
                return;
            }
            var templateName, exportId;
            if (el.matches(templateSelector) && (templateName = el.getAttribute(_meta.get('attr.moduleid'))) && validateModuleName(templateName)) {
                var _path = (path ? path + '/' : '') + templateName;
                if (mutationType === 'removed') {
                    delete footprint(node).templates[templateName];
                    if (footprint(node).parentTemplate === node) {
                        delete footprint(node).parentTemplate;
                    }
                    if (eventsObject) {
                        eventsObject.removedTemplates[templateName] = el;
                    }
                } else if (mutationType === 'added') {
                    footprint(node).templates[templateName] = el;
                    footprint(el).parentTemplate = node;
                    if (eventsObject) {
                        eventsObject.addedTemplates[templateName] = el;
                    }
                }
                // Recurse
                discoverContents(el.content, el, _path, mutationType, fireEvents);
            } else {
                const manageExportItem = exportItem => {
                    var exportId = exportItem.getAttribute(_meta.get('attr.exportgroup')) || 'default';
                    if (mutationType === 'removed') {
                        if (footprint(node).exports[exportId]) {
                            _remove(footprint(node).exports[exportId], exportItem);
                            if (!footprint(node).exports[exportId].length) {
                                delete footprint(node).exports[exportId];
                            }
                            if (eventsObject) {
                                if (!eventsObject.removedExports[exportId]) {
                                    eventsObject.removedExports[exportId] = [];
                                }
                                eventsObject.removedExports[exportId].push(exportItem);
                            }
                        }
                    } else if (mutationType === 'added') {
                        if (!footprint(node).exports[exportId]) {
                            footprint(node).exports[exportId] = [];
                        }
                        footprint(node).exports[exportId].push(exportItem);
                        if (eventsObject) {
                            if (!eventsObject.addedExports[exportId]) {
                                eventsObject.addedExports[exportId] = [];
                            }
                            eventsObject.addedExports[exportId].push(exportItem);
                        }
                    }
                };
                if (el.matches(_meta.get('element.export'))) {
                    var exportId = el.getAttribute(_meta.get('attr.exportid')) || 'default';
                    _arrFrom(el.children).forEach(exportItem => {
                        exportItem.setAttribute(_meta.get('attr.exportgroup'), exportId);
                        manageExportItem(exportItem);
                    });
                } else {
                    manageExportItem(el);
                }
            }
        };

        // -----------------------
        // Run...
        footprint(node).templates = {};
        footprint(node).exports = {};
        node.modulemutationsType = mutationType;
        const eventsObject = { addedTemplates: {}, removedTemplates: {}, addedExports: {}, removedExports: {}, }; 
        _arrFrom(contents.children).forEach(el => manageComponent(el, eventsObject, mutationType, fireEvents));
        if (fireEvents) {
            fireDocumentTemplateEvent('templatemutation', eventsObject, path);
        }

        // -----------------------
        // Handle content loading
        if (mutationType === 'added' && !footprint(node).onLiveMode) {
            footprint(node).onLiveMode = true;
            if (node.getAttribute('src') && !node.content.children.length) {
                loadingTemplates.push(loadTemplateContent(node, path));
            }
            mutations.onAttrChange(node, mr => {
                if (mr[0].target.getAttribute(mr[0].attributeName) !== mr[0].oldValue) {
                    loadTemplateContent(node, path);
                }
            }, ['src']);
                
            // -----------------------
            // Watch mutations
            var mo = new window.MutationObserver(mutations => {
                const eventsObject = { addedTemplates: {}, removedTemplates: {}, addedExports: {}, removedExports: {}, };    
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(el => manageComponent(el, eventsObject, 'added', true));
                    mutation.removedNodes.forEach(el => manageComponent(el, eventsObject, 'removed', true));
                });
                fireDocumentTemplateEvent('templatemutation', eventsObject, path);
            });
            mo.observe(contents, {childList: true});
        }

    };

    // ----------------------
    // Define the global "templates" object
    // ----------------------

    if (_meta.get('api.templates') in document) {
        throw new Error('document already has a "' + _meta.get('api.templates') + '" property!');
    }
    const loadingTemplates = [];
    footprint(document).templates = {};
    Object.defineProperty(document, _meta.get('api.templates'), {
        value: footprint(document).templates,
    });

    // ----------------------
    // Define the "templates" and "exports" properties on HTMLTemplateElement.prototype
    // ----------------------

    if (_meta.get('api.templates') in TemplateElementClass.prototype) {
        throw new Error('The "HTMLTemplateElement" class already has a "' + _meta.get('api.templates') + '" property!');
    }
    Object.defineProperty(TemplateElementClass.prototype, _meta.get('api.templates'), {
        get: function() {
            return footprint(this).templates || {};
        }
    });
    if (_meta.get('api.exports') in TemplateElementClass.prototype) {
        throw new Error('The "HTMLTemplateElement" class already has a "' + _meta.get('api.exports') + '" property!');
    }
    Object.defineProperty(TemplateElementClass.prototype, _meta.get('api.exports'), {
        get: function() {
            return footprint(this).exports || {};
        }
    });

    const validateModuleName = name => {
        if (name.match(/[~#\/\.]/)) {
            console.error(`Invalid module name: ${name}.`);
            return false;
        }
        return true;
    };

    _arrFrom(document.querySelectorAll(templateSelector)).forEach(async el => {
        var name = el.getAttribute(_meta.get('attr.moduleid'));
        if (!el.closest(_meta.get('element.import')) && validateModuleName(name)) {
            footprint(document).templates[name] = el;
            discoverContents(el.content, el, name, 'added', false);
        }
    });
    mutations.onPresenceChange(templateSelector, async (els, presence) => {
        const eventsObject = { addedTemplates: {}, removedTemplates: {}, addedExports: {}, removedExports: {}, }; 
        els.forEach(el => {
            var name = el.getAttribute(_meta.get('attr.moduleid'));
            if (!el.closest(_meta.get('element.import')) && validateModuleName(name)) {
                if (presence) {
                    footprint(document).templates[name] = el;
                    discoverContents(el.content, el, name, 'added');
                    eventsObject.addedTemplates[name] = el;
                } else {
                    if (footprint(document).templates[name] === el) {
                        delete footprint(document).templates[name];
                    }
                    discoverContents(el.content, el, name, 'removed');
                    eventsObject.removedTemplates[name] = el;
                }
            }
        });
        fireDocumentTemplateEvent('templatemutation', eventsObject, '');
    });

    // ----------------------
    // Capture import elements
    // ----------------------

    mutations.onPresent(_meta.get('element.import'), el => {
        discoverContents(el, el, '', 'added', false);
    });

    // ----------------------
    // Define the "template" property on Element.prototype
    // ----------------------

    if (_meta.get('api.moduleref') in window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.get('api.moduleref') + '" property!');
    }
    Object.defineProperty(window.Element.prototype, _meta.get('api.moduleref'), {
        get: function() {
            var templateId = this.getAttribute(_meta.get('attr.moduleref'));
            if (templateId) {
                return templateId.split('#')[0].split('/').map(n => n.trim()).filter(n => n).reduce((context, item) => {
                    return context ? footprint(context).templates[item] || footprint(context).templates['*'] : null;
                }, document);
            }
        },
    });

    // ----------------------
    // Hydrate
    // ----------------------

    var templatesReadyState = loadingTemplates.length ? 'loading' : 'indeterminate';
    Object.defineProperty(document, 'templatesReadyState', {get: () => templatesReadyState});
    WebQit.DOM.ready.call(WebQit, () => {
        loadingTemplates.forEach(promise => {
            promise.catch(error => {
                console.warn(error);
            });
        });
        return Promise.all(loadingTemplates).then(() => {
            templatesReadyState = 'complete';
            document.dispatchEvent(new window.Event('templatesreadystatechange'));
        });
    });
}