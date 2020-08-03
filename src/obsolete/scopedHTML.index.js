
/**
 * @imports
 */
import _isArray from '@web-native-js/commons/js/isArray.js';
import _isNumeric from '@web-native-js/commons/js/isNumeric.js';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _each from '@web-native-js/commons/obj/each.js';
import { window, trap, params } from '../scoped-html/ENV.js';
import disconnectedCallback from './disconnectedCallback.js';
//import Schema from './Schema.js';

/**
 * ---------------------------
 * The Chtml class
 * ---------------------------
 */				

export default class ScopedHTML {

	/**
	 * Initializes the new Chtml instance.
	 *
	 * @param document|HTMLElement	el
	 *
	 * @return void
	 */
	constructor(el) {

        Object.defineProperty(this, '_el', {value: el});
		Object.defineProperty(this, 'el', {
			value: el.nodeName === '#document' ? el.querySelector('html') : el,
		});
		Object.defineProperty(this.el, '.scopedHTML', {value: this});
        
		// ------------
		// ROLES
		// ------------
		
		this.isRoot = this.el.hasAttribute(params.rootAttribute) || this.el.matches('html');
		
		// ------------
		// TREE
		// ------------
		
		const store = {};
		Object.defineProperty(this, 'store', {value:store});
		if (trap) {
			if (trap.trap) {
				trap.trap(store, (e, recieved, next) => {
					return next(recieved || this.find(e.query));
				}, {type:'get'});
			}
			if (trap.link) {
				trap.link(this.el, params.scopeTreePropertyName, this.store);
			}
			if (trap.init) {
				// The following nodes, being prelisted,
				// can be accessed dynamically
				const nodesHint = (this.el.getAttribute(params.idHintsAttribute) || '')
					.split(' ').map(r => r.trim()).filter(r => r);
				trap.init(this.store, nodesHint);
			}
		}
	}
	
	/**
	 * Adds a node instance.
	 *
	 * @param string|int	 nodeName
	 * @param mixed			 node
	 *
	 * @return Element
	 */
	add(nodeName, node) {
		var add = (target, key, node, isNode = false) => {
			var _node = node;
			if (isNode) {
				if (params.addCallback) {
					_node = params.addCallback(_node, this);
				}
				new ScopedHTML(_node);
			}
			// Set with trap?
			if (trap && trap.set) {
				trap.set(target, key, _node);
			} else if (_isArray(target)) {
				target.push(_node);
			} else {
				target[key] = _node;
			}
			if (isNode) {
				// We'll remove from tree at the
				// time it leaves the DOM
				disconnectedCallback(node, () => {
					if (trap && trap.deleteProperty) {
						trap.deleteProperty(target, key);
					} else if (_isArray(target)) {
						_remove(target, _node);
					} else {
						delete target[key];
					}
				});
			}
			return node;
		};
		if (_isArray(node)) {
			var nodeList = [];
			node.forEach((_node, i) => add(nodeList, i, _node, true/** isNode */));
			add(this.store, nodeName, nodeList);
			return nodeList;
		}
		return add(this.store, nodeName, node, true/** isNode */);
	}

	/**
	 * Gets a node or list of nodes.
	 *
	 * @param string|int|array	 nodeNames
	 *
	 * @return Chtml|array
	 */
	find(nodeNames) {
		_arrFrom(nodeNames).forEach(nodeName => {
			if (this.store[nodeName]) {
				// Arrays must not be reused!
				// Their sources of nodes cant be guaranteed to be same.
				// this.store[nodeName] could also be an empty getter/setter
				// So the instanceof is the way to go for both problems
				return this.store[nodeName];
			}
			var node;
			if ((node = this.findExplicit(nodeName))
			/*|| (node = this.findImplicit(nodeName))*/) {
				this.add(nodeName, node);
			}
		});
		return _isArray(nodeNames) ? _objFrom(nodeNames, this.store) : this.store[nodeNames];
	}
	
	/**
	 * Attempts to resolve a node from explicit tree.
	 *
	 * @param string				scopedID
	 *
	 * @return HTMLElement
	 */
	findExplicit(scopedID) {
		// If given a rolecase, we can perform a query if we understand the semantics.
		if (this.isRoot) {
			// Find matches...
			var CSSEscape = window.CSS ? window.CSS.escape : str => str;
			var closestSuperSelector = '[' + CSSEscape(params.rootAttribute) + '],html';
			var nodeSelector = '[' + CSSEscape(params.scopedIdAttribute) + '="' + scopedID + '"]';
			var closestSuper, _matchedNode;
			if ((_matchedNode = (this.el.shadowRoot || this.el).querySelector(nodeSelector))
			// If this.el has a shadowRoot, we don't expect _matchedNode to be able to find is superRole element.
			// If it finds one, then its not for the curren superRole element.
			&& ((this.el.shadowRoot && !(_matchedNode.parentNode.closest && _matchedNode.parentNode.closest(closestSuperSelector)))
			// _matchedNode must find this.el as its superRole element to qualify.
				|| (!this.el.shadowRoot && _matchedNode.parentNode && (closestSuper = _matchedNode.parentNode.closest(closestSuperSelector)) && closestSuper.isSameNode(this.el))
			)) {
				return _matchedNode;
			}
		}
	}
	
	/**
	 * Attempts to resolve a node from implicit tree.
	 *
	 * @param string				requestNodeName
	 *
	 * @return HTMLElement|array
	 */
	findImplicit(requestNodeName) {
		if (_isNumeric(requestNodeName) || requestNodeName.match(/[^a-zA-Z0-9\-]/)) {
			return;
		}
		// Use Schema...
		var nodeSchema, nodeSelector = [];
		var tries = [];
		if (Schema.aria[requestNodeName]) {
			tries.push({
				Schema: Schema.aria[requestNodeName],
				selector: ['[role="' + requestNodeName + '"]'],
			});
		} else {
			tries.push({
				Schema: Schema.std[requestNodeName] || Schema.aria[requestNodeName],
				selector: [requestNodeName, '[role="' + requestNodeName + '"]'],
			});
		}
		_each(Schema.std, (tagname, Schema) => {
			if (Schema.implicitRole === requestNodeName) {
				tries.push({
					Schema: Schema,
					selector: [tagname],
				});
			}
		});
		var matches = null;
		tries.forEach(trie => {
			(this.el.shadowRoot || this.el).querySelectorAll(trie.selector.join(',')).forEach(node => {
				if (Schema.assertNodeBelongsInScopeAs(this.el, node, trie.schema)) {
					if (trie.schema && trie.schema.singleton) {
						matches = node;
					} else if (!matches || _isArray(matches)) {
						matches = matches || [];
						matches.push(node);
					}
				}
			});
			if (!matches && trie.schema && !trie.schema.singleton) {
				matches = [];
			}
		});
		return matches;
	}
};

/**
 * @exports
 */
export {
	params,
};

/**
 * @init
 */

// ----------------------
// Capture scoped elements
// ----------------------

const scopedElementsCallback = callback => {
	var selector = '[' + CSSEscape(params.scopedIdAttribute) + ']';
    var notify = () => _arrFrom(window.document.querySelector(selector)).forEach(el => callback(el, true));
    // On DOM-ready
    window.document.addEventListener('DOMContentLoaded', notify, false);
    if (window.document.readyState === 'complete') {
        notify();
    }
    // On DOM mutation
    if (window.MutationObserver) {
		mutationCallback(selector, (connectedState, ...els) => {
			els.forEach(el => callback(el, connectedState));
		});
    }
};
if (!window || !('Element' in window)) {
    throw new Error('The "Element" class not found in global context!');
}
if (params.namespaceAttribute in window.Element.prototype) {
    throw new Error('The "Element" class already has a "' + params.namespaceAttribute + '" property!');
}
Object.defineProperty(window.Element.prototype, params.namespaceAttribute, {
    get: function() {
        if (!this['.scopedHTML']) {
            this['.scopedHTML'] = {};
        }
        return this['.scopedHTML'];
    }
});

// Dynamically form relationships
scopedElementsCallback((el, connectedState) => {
	if (connectedState && _any(params.inertContexts, innertContext => el.closest(innertContext))) {
		return;
	}
	var scopedId = el.getAttribute(params.scopedIdAttribute),
		ownerRoot = el.parentNode.closest('[' + CSSEscape(params.rootAttribute) + '],html'),
		namespaceStore = ownerRoot[params.namespaceAttribute];
	if (trap.link) {
		trap.link(ownerRoot, params.namespaceAttribute, namespaceStore);
	}
	if (connectedState) {
		trap.set(namespaceStore, scopedId, el);
	} else {
		trap.deleteProperty(namespaceStore, scopedId);
	}
});

