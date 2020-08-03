
/**
 * @imports
 */
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import _isString from '@web-native-js/commons/js/isString.js';
import _isArray from '@web-native-js/commons/js/isArray.js';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _unique from '@web-native-js/commons/arr/unique.js';
import _before from '@web-native-js/commons/str/before.js';
import _after from '@web-native-js/commons/str/after.js';
import { window, params } from './ENV.js';

/**
 * Composes a component from a template component.
 *
 * @param Element				    el
 * @param Element				    sourceEl
 * @param array						noinherit
 *
 * @return Element
 */
export function recompose(el, sourceEl, noinherit = []) {
    if (sourceEl.matches(params.recomposeElement)) {
        return inherit(sourceEl, el, noinherit, false/*cloneSource*/);
    }
    return el;
};

/**
 * Composes a component from a super component.
 *
 * All definitions will be inherited.
 * If the idea is to import, the super component's element will be returned,
 * (On import, nodes in component (as defined, if) will be uploaded into slots in the super component.)
 *
 * @param Element				    el
 * @param Element				    sourceEl
 * @param array						noinherit
 * @param bool						cloneSource
 *
 * @return Element
 */
export function inherit(el, sourceEl, noinherit = [], cloneSource = true) {
    if (el.matches(params.importElement) || el.matches(params.recomposeElement)) {
        var importEl = el, clonedSourceEl = !cloneSource ? sourceEl : sourceEl.cloneNode(true);
        // replacementEl needs to inherit attributes and scoped script from importEl
        importNodes(clonedSourceEl, importEl);
        importAttributes(clonedSourceEl, importEl, noinherit);
        importScript(clonedSourceEl, importEl, noinherit);
        return clonedSourceEl;
    }
    // We will append defs from the sourceEl into el
    importAttributes(el, sourceEl, noinherit, false/*prioritize*/);
    importScript(el, sourceEl, noinherit, false/*prioritize*/);
    return el;
};

/**
 * Imports nodes from from sourceEl into el.
 *
 * @param Element				    el
 * @param Element				    sourceEl
 *
 * @return Element
 */
export function importNodes(el, sourceEl) {
    if (!params.SCOPED_HTML) {
        return el;
    }
    // -------------------------
    // Upload nodes into el just the way slots work in Web Compoonents
    // -------------------------
    var elIsRoot = el.hasAttribute(params.SCOPED_HTML.rootAttribute) || el.matches('html');
    _arrFrom((sourceEl.shadowRoot || sourceEl).children).forEach((replacementNode, i) => {
        if (params.SCOPED_JS && replacementNode.matches(params.SCOPED_JS.scriptElement)) {
            return;
        }
        replacementNode = replacementNode.cloneNode(true);
        var scopedID, CSSEscape = window.CSS ? window.CSS.escape : str => str;
        if (elIsRoot && (scopedID = replacementNode.getAttribute(params.SCOPED_HTML.scopedIdAttribute))) {
            var originalNode,
                rootSelector = '[' + CSSEscape(params.SCOPED_HTML.rootAttribute) + '],html',
                originalNodeSelector = '[' + CSSEscape(params.SCOPED_HTML.scopedIdAttribute) + '="' + scopedID + '"]';
            if ((el.shadowRoot && (originalNode = el.shadowRoot.querySelector(originalNodeSelector)))
            || ((originalNode = el.querySelector(originalNodeSelector)) && originalNode.parentNode.closest(rootSelector) === el)) {
                // Replace or recompose in-place?
                if (replacementNode.matches(params.recomposeElement)) {
                    // originalNode needs to inherit attributes and scoped script from replacementNode
                    importAttributes(originalNode, replacementNode);
                    importScript(originalNode, replacementNode);
                    // Recompose in-place
                    importNodes(originalNode, replacementNode);
                } else {
                    // Just before we replace,
                    // replacementNode needs to inherit attributes and scoped script from originalNode
                    importAttributes(replacementNode, originalNode, [], false/*prioritize*/);
                    importScript(replacementNode, originalNode, [], false/*prioritize*/);
                    // Port to target...
                    originalNode.replaceWith(replacementNode);
                }
            } else {
                //throw new Error('Composition Error: Node #' + i + ' (at ' + sourceElNs + ') must match exactly one targetNode in ' + elNs + '! (' + originalNodes.length + ' matched)');
                el.append(replacementNode);
            }
        } else {
            el.append(replacementNode);
        }
    });
    return el;
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
export function importAttributes(el, sourceEl, noinherit = [], prioritize = true) {
    // ----------------------------
    // Norecompose directive
    // ----------------------------
    noinherit = noinherit.concat(params.noinheritAttributes);
    if (!prioritize) {
        noinherit = noinherit.concat(params.namespaceAttribute);
    }
    if (el.hasAttribute('noinherit')) {
        noinherit = noinherit.concat((el.getAttribute('noinherit') || '*').split(' ').map(val => val.trim()));
    }
    // ----------------------------
    // Custom Composition...
    // ----------------------------
    if (_isFunction(params.recomposeCallback)) {
        var disposition = params.recomposeCallback(el, sourceEl, noinherit);
        if (disposition === false) {
            return false;
        } else if (_isString(disposition) || _isArray(disposition)) {
            noinherit = noinherit.concat(disposition);
        }
    }
    // ----------------------------
    // Merge list attributes...
    // ----------------------------
    var listAttributes = params.listAttributes.concat(['role', 'class']);
    if (params.SCOPED_HTML) {
        listAttributes.push(params.SCOPED_HTML.idHintsAttribute);
    }
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
    _unique(params.keyValAttributes.concat('style')).forEach(type => {
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
    var priorityAttrs = [params.namespaceAttribute];
    if (params.SCOPED_HTML) {
        priorityAttrs.push(params.SCOPED_HTML.rootAttribute, params.SCOPED_HTML.scopedIdAttribute);
    }
    if (!noinherit.includes('*')) {
        for (var i = 0; i < sourceEl.attributes.length; i ++) {
            var attr = sourceEl.attributes[i];
            if (!noinherit.includes(attr.name) 
            && (!el.hasAttribute(attr.name) || priorityAttrs.includes(attr.name))) {
                el.setAttribute(attr.name, attr.value);
            }
        }
    }
    return el;
};

/**
 * Imports script from sourceEl into el.
 *
 * @param Element				    el
 * @param Element				    sourceEl
 * @param array					    noinherit
 * @param bool					    prioritize
 *
 * @return Element
 */
export function importScript(el, sourceEl, noinherit = [], prioritize = true) {
    // ----------------------------
    // Norecompose directive
    // ----------------------------
    if (el.hasAttribute('noinherit')) {
        noinherit = noinherit.concat((el.getAttribute('noinherit') || '*').split(' ').map(val => val.trim()));
    }
    // ----------------------------
    // For data blocks...
    // ----------------------------
    if (!noinherit.includes('<script>') && !noinherit.includes('*') && params.SCOPED_JS) {
        var elDefs = _arrFrom((el.shadowRoot || el).children)
            .filter(node => node.matches(params.SCOPED_JS.scriptElement));
        var sourceElDefs = _arrFrom((sourceEl.shadowRoot || sourceEl).children)
            .filter(node => node.matches(params.SCOPED_JS.scriptElement));
        if (sourceElDefs.length) {
            if (elDefs.length) {
                elDefs[0][!prioritize ? 'prepend' : 'append'](sourceElDefs[0].textContent);
            } else {
                el.prepend(sourceElDefs[0].cloneNode(true));
            }
        }
    }
    return el;
};

/**
 * Parses an element's CHTML namespace.
 * This explains how an element's namespace is used in CHTML.
 *
 * @param string					namespaceStr
 *
 * @return object
 */
export function parseNamespace(namespaceStr) {
    var namespaceParse = {roadmap:namespaceStr};
    if (namespaceParse.roadmap) {
        namespaceParse.namespace = _before(namespaceParse.roadmap, '//');
        namespaceParse.subnamespace = _after(namespaceParse.roadmap, '//');
        // In case this is the /// spot...
        if (namespaceParse.subnamespace.startsWith('/')) {
            namespaceParse.subnamespace = _after(namespaceParse.subnamespace, '/');
        }
        if (namespaceParse.subnamespace.endsWith('//') && namespaceParse.subnamespace.indexOf('///') === -1) {
            namespaceParse.subnamespace = namespaceParse.subnamespace + namespaceParse.namespace + '//';
        }
    }
    return namespaceParse;
};
