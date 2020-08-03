
/**
 * @imports
 */
import Jsen from '@web-native-js/jsen';
import _isTypeObject from '@web-native-js/commons/js/isTypeObject.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import _isNumeric from '@web-native-js/commons/js/isNumeric.js';
import _unique from '@web-native-js/commons/arr/unique.js';
import _following from '@web-native-js/commons/arr/following.js';
import { parseNamespace } from './composition.js';
import { bundles } from './dom.js';
import { trap, params } from './ENV.js';
import './custom-elements.js';

/**
 * @exports
 */
export * from './dom.js';
export * from './composition.js';
export {
    params,
};

/**
 * Binds a (reactive) list context to the instance.
 * Childnodes will be automatically created/removed per key.
 *
 * @param Element 		el
 * @param array 		items
 * @param string 		subnamespace
 * @param function 		itemizeCallback
 *
 * @return trap.MutationEvent
 */
export function itemize(el, items, subnamespace, itemizeCallback = null) {
    var scopedHTML = el['.scopedHTML'];
    // --------------
    var nodeNamespaceArray = subnamespace.split('//');
    // Create a namespace hash...
    if (nodeNamespaceArray[0].indexOf('[') > -1) {
        nodeNamespaceArray[0] = '"' + nodeNamespaceArray[0].replace(/\[/g, '" + ').replace(/\]/g, ' + "') + '"';
    }
    var itemsKeys = trap.keys(items);
    var currentNodeNames = trap.keys(scopedHTML.store);
    // --------------
    var e = new trap.MutationEvent(el, {type:'remodelling'});
    _unique(itemsKeys.concat(currentNodeNames)).forEach(nodeName => {
        nodeName = _isNumeric(nodeName) ? parseInt(nodeName) : nodeName;
        var existingNode = scopedHTML.find(nodeName);
        var rspns;
        if (trap.has(items, nodeName)) {
            var srcItem = trap.get(items, nodeName), isNewNode = false;
            if (!existingNode) {
                // --------------
                var nodeNamespaceArrayCopy = nodeNamespaceArray.slice();
                if (nodeNamespaceArrayCopy[0].indexOf('"') > -1) {
                    nodeNamespaceArrayCopy[0] = nodeNamespaceArrayCopy[0].replace(/" \+  \+ "/g, nodeName);
                    nodeNamespaceArrayCopy[0] = Jsen.parse(nodeNamespaceArrayCopy[0]).eval(srcItem);
                }
                var nodeEl = bundles.find(nodeNamespaceArrayCopy.join('//'));
                // --------------
                if (nodeEl) {
                    var following = _following(itemsKeys, nodeName + ''/*numeric nodeName needs this*/, true/*length*/)
                        .reduce((closest, _nodeName) => closest || scopedHTML.find(_nodeName), null);
                    if (following) {
                        following.before(nodeEl);
                    } else {
                        el.append(nodeEl);
                    }
                    existingNode = scopedHTML.add(nodeName, nodeEl);
                    isNewNode = true;
                }
            }
            if (existingNode) {
                if (_isFunction(itemizeCallback)) {
                    rspns = itemizeCallback(nodeName, existingNode, srcItem, isNewNode);
                }
            }
        } else if (existingNode) {
            if (_isFunction(itemizeCallback)) {
                rspns = itemizeCallback(nodeName, existingNode);
            }
            var remove = () => {
                existingNode.remove();
            };
            if (rspns instanceof Promise) {
                rspns.then(remove).catch(remove);
            } else {
                remove();
            }
        }
        e.response(rspns);
    });
    return e;
};

/**
 * @init
 */

if (params.SCOPED_HTML) {
    /**
     * Traps new nodes in ScopedHTML
     * to automatically resolve them by HTML partials.
     *
     * @param Element 		newNode
     * @param ScopedHTML 	scopedHTML
     *
     * @return Element
     */
    params.SCOPED_HTML.addCallback = (newNode, scopedHTML) => {
        var _newNode;
        if (newNode.matches(params.importElement) && (_newNode = newNode.resolve())) {
            return _newNode;
        }
        return newNode;
    };
}

if (params.SCOPED_JS) {
    /**
     * Binds a (reactive) list context to the instance.
     * Childnodes will be automatically created/removed per key.
     *
     * @param Element 		el
     * @param object 		binding
     * @param object 		_binding
     *
     * @return trap.MutationEvent
     */
    params.SCOPED_JS.bindCallback = (el, binding, _binding) => {
        const namespaceParse = parseNamespace(el.getAttribute(params.namespaceAttribute) || '');
        const itemizeCallback = params.itemizeCallback || function(nodeName, node, itemizeItem, isExistingNode = false) {
            if (arguments.length > 2) {
                return node[params.SCOPED_JS.bindMethodName](itemizeItem);
            } else {
                return node[params.SCOPED_JS.unbindMethodName]();
            }
        };
        if (namespaceParse.subnamespace) {
            if (_isTypeObject(binding) && binding) {
                // Mirror
                trap.observe(binding, changes => {
                    return itemize(el, binding, namespaceParse.subnamespace, itemizeCallback);
                }, {tags: ['#HTMLPartials-itemize', el]});
            }
            if (_isTypeObject(_binding) && _binding) {
                // Unmirror
                trap.unobserve(_binding, null, null, {tags: ['#HTMLPartials-itemize', el]});
            }
            // Initial Sync...
            return itemize(el, binding || {}, namespaceParse.subnamespace, itemizeCallback);
        }
    };
}
