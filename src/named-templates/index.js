
/**
 * @imports
 */
import DOMInit from '@webqit/browser-pie/src/dom/index.js';
import _isEmpty from '@webqit/util/js/isEmpty.js';
import _arrFrom from '@webqit/util/arr/from.js';
import _remove from '@webqit/util/arr/remove.js';
import { getOohtmlBase, createParams } from '../util.js';

/**
 * ---------------------------
 * Named Templates
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
    const _meta = await createParams.call(Ctxt, {
		attr: {
            templatename: 'name',
            export: 'export',
            templatedep: 'template',
        },
        api: {
            templates: 'templates',
            exports: 'exports',
            templatedep: 'template',
        },
    }, config);

    // ----------------------
    // Capture template elements
    // ----------------------

    const fireDocumentTemplateEvent = (type, template, path) => {
        document.dispatchEvent(new window.CustomEvent(type, {detail: {template, path}}));
    };

    const fireTemplateEvent = (template, type, path) => {
        template.dispatchEvent(new window.CustomEvent(type, {detail: {path}}));
    };

    const loadTemplateContent = (template, path) => {
        var src = template.getAttribute('src');
        return new Promise((resolve, reject) => {
            // Missing in jsdom
            if (window.fetch) {
                window.fetch(src).then(response => {
                    return response.ok ? response.text() : Promise.reject(response.statusText);
                }).then(content => {
                    template.innerHTML = content;
                    fireTemplateEvent(template, 'load', path);
                    fireDocumentTemplateEvent('templatecontentloaded', template, path);
                    resolve(template);
                }).catch(error => {
                    console.error('Error fetching the bundle at ' + src + '. (' + error + ')');
                    // Dispatch the event.
                    template.innerHTML = '';
                    fireTemplateEvent(template, 'loaderror', path);
                    fireDocumentTemplateEvent('templatecontentloaderror', template, path);
                    resolve(template);
                });
            } else {
                resolve();
                console.error('Error fetching the bundle at ' + src + '. (window.fetch() not supported by browser.)');
            }
        });
    };

    const discoverContents = (contents, node, path, onNamespaceAdded = false) => {
        if (_isEmpty(getOohtmlBase(node).exports)) {

            // -----------------------
            // Templates and exports
            getOohtmlBase(node).templates = {};
            getOohtmlBase(node).exports = {};
            const manageComponent = (el, onMutation, remove) => {
                if (!el.matches) {
                    // Not an element child
                    return;
                }
                var templateName, exportsName;
                if ((el instanceof window.HTMLTemplateElement) && (templateName = el.getAttribute(_meta.attr.templatename))) {
                    var _path = (path ? path + '/' : '') + templateName;
                    if (remove) {
                        delete getOohtmlBase(node).templates[templateName];
                        if (getOohtmlBase(node).parentTemplate === node) {
                            delete getOohtmlBase(node).parentTemplate;
                        }
                        if (onMutation) {
                            fireDocumentTemplateEvent('templateremoved', el, _path);
                        }
                    } else {
                        getOohtmlBase(node).templates[templateName] = el;
                        getOohtmlBase(el).parentTemplate = node;
                        // Recurse
                        discoverContents(el.content, el, _path, onMutation);
                        if (onMutation) {
                            fireDocumentTemplateEvent('templateadded', el, _path);
                        }
                    }
                } else {
                    var exportsName = el.getAttribute(_meta.attr.export) || 'default';
                    if (remove) {
                        if (getOohtmlBase(node).exports[exportsName]) {
                            _remove(getOohtmlBase(node).exports[exportsName], el);
                            if (!getOohtmlBase(node).exports[exportsName].length) {
                                delete getOohtmlBase(node).exports[exportsName];
                            }
                            if (onMutation) {
                                fireDocumentTemplateEvent('exportremoved', el, path + ':' + exportsName);
                            }
                        }
                    } else {
                        if (!getOohtmlBase(node).exports[exportsName]) {
                            getOohtmlBase(node).exports[exportsName] = [];
                        }
                        getOohtmlBase(node).exports[exportsName].push(el);
                        if (onMutation) {
                            fireDocumentTemplateEvent('exportadded', el, path + ':' + exportsName);
                        }
                    }
                }
            };

            // -----------------------
            // Handle content loading
            if (node.getAttribute('src') && !node.content.children.length) {
                loadingTemplates.push(loadTemplateContent(node, path));
            }
            Ctxt.Mutation.onAttrChange(node, changes => {
                loadTemplateContent(node, path);
            }, ['src']);

            // -----------------------
            // Own exports
            _arrFrom(contents.children).forEach(el => manageComponent(el, onNamespaceAdded));

            // -----------------------
            // Watch mutations
            var mo = new window.MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(el => manageComponent(el, true/* onMutation */));
                    mutation.removedNodes.forEach(el => manageComponent(el, true/* onMutation */, true/* remove */));
                });
            });
            mo.observe(contents, {childList:true});

        }
    };

    // ----------------------
    // Define the global "templates" object
    // ----------------------

    if (_meta.api.templates in document) {
        throw new Error('document already has a "' + _meta.api.templates + '" property!');
    }
    const loadingTemplates = [];
    getOohtmlBase(document).templates = {};
    Object.defineProperty(document, _meta.api.templates, {
        value: getOohtmlBase(document).templates,
    });
    Object.defineProperty(document, 'templatesReadyState', {
        value: 'loading',
        writable: true,
    });

    // ----------------------
    // Define the "templates" and "exports" properties on HTMLTemplateElement.prototype
    // ----------------------

    if (_meta.api.templates in window.HTMLTemplateElement.prototype) {
        throw new Error('The "HTMLTemplateElement" class already has a "' + _meta.api.templates + '" property!');
    }
    Object.defineProperty(window.HTMLTemplateElement.prototype, _meta.api.templates, {
        get: function() {
            return getOohtmlBase(this).templates || {};
        }
    });
    if (_meta.api.exports in window.HTMLTemplateElement.prototype) {
        throw new Error('The "HTMLTemplateElement" class already has a "' + _meta.api.exports + '" property!');
    }
    Object.defineProperty(window.HTMLTemplateElement.prototype, _meta.api.exports, {
        get: function() {
            return getOohtmlBase(this).exports || {};
        }
    });

    Ctxt.Mutation.onPresent('template[' + window.CSS.escape(_meta.attr.templatename) + ']', async el => {
        var name = el.getAttribute(_meta.attr.templatename);
        getOohtmlBase(document).templates[name] = el;
        // --------------------------
        discoverContents(el.content, el, name, true);
        fireDocumentTemplateEvent('templateadded', el, name);
        // --------------------------
        Ctxt.Mutation.onRemoved(el, removed => {
            if (getOohtmlBase(document).templates[name] === el) {
                delete getOohtmlBase(document).templates[name];
            }
            fireDocumentTemplateEvent('templateremoved', el, name);
        }, {once:true});
        // --------------------------
    });

    // ----------------------
    // Define the "template" property on Element.prototype
    // ----------------------

    if (_meta.api.templatedep in window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.api.templatedep + '" property!');
    }
    Object.defineProperty(window.Element.prototype, _meta.api.templatedep, {
        get: function() {
            var templateId = this.getAttribute(_meta.attr.templatedep);
            if (templateId) {
                if (!getOohtmlBase(this).templates) {
                    getOohtmlBase(this).templates = {};
                }
                if (!getOohtmlBase(this).templates[templateId] || !this.hasAttribute('cache-template')) {
                    var imported = templateId.split('/').map(n => n.trim()).filter(n => n).reduce((context, item) => {
                        return context ? getOohtmlBase(context).templates[item] || getOohtmlBase(context).templates['*'] : null;
                    }, document);
                    getOohtmlBase(this).templates[templateId] = imported;
                }
                return getOohtmlBase(this).templates[templateId];
            }
        },
    });

    // ----------------------
    // Hydrate
    // ----------------------

    Object.defineProperty(Ctxt, 'templatesReady', {value: Ctxt.ready.then(() => {
        loadingTemplates.forEach(promise => {
            promise.catch(error => {
                console.warn(error);
            });
        });
        return Promise.all(loadingTemplates).then(() => {
            document.templatesReadyState = 'complete';
            document.dispatchEvent(new window.Event('templatesreadystatechange'));
        });
    })});
};