
/**
 * @imports
 */
import Jsen from '@web-native-js/jsen';
import Reflex from '@web-native-js/reflex';
import _isString from '@web-native-js/commons/js/isString.js';
import _isArray from '@web-native-js/commons/js/isArray.js';
import _isNumeric from '@web-native-js/commons/js/isNumeric.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _inherit from '@web-native-js/commons/obj/inherit.js';
import _each from '@web-native-js/commons/obj/each.js';
import _before from '@web-native-js/commons/str/before.js';
import disconnectedCallback from './disconnectedCallback.js';
import createElement from './createElement.js';
import schema from './schema.js';
import globalParams from '../params.js';

/**
 * ---------------------------
 * The Chtml class
 * ---------------------------
 */				

export default class Core {

	/**
	 * Initializes the new Chtml instance.
	 *
	 * @param document|HTMLElement	el
	 * @param object				params
	 *
	 * @return void
	 */
	constructor(el, params = {}) {
		Object.defineProperty(this, 'params', {
			value:_inherit(globalParams, params),
		});
		Object.defineProperty(this, '_el', {value:el, enumerable:true,});
		Object.defineProperty(this, 'el', {
			value:el.nodeName === '#document' ? el.querySelector('html') : el,
			enumerable:true,
		});

		// ------------
		// ROLES
		// ------------
		
		const roles = (el.getAttribute(globalParams.attrMap.superrole) || '')
			.split(' ').map(r => r.trim()).filter(r => r);
		Object.defineProperty(this, 'roles', {value:roles, enumerable:true,});
		
		// ------------
		// TREE
		// ------------
		
		const tree = {};
		Reflex.defineProperty(this, globalParams.treeProperty, {value:tree, enumerable:true,});
		Reflex.trap(tree, (e, recieved, next) => {
			return next(recieved || this.getNodes(e.query));
		}, {type:'get'});
		// The following nodes, being prelisted,
		// can be accessed dynamically
		const nodesHint = (el.getAttribute(globalParams.attrMap.hint) || '')
			.split(' ').map(r => r.trim()).filter(r => r);
		Reflex.init(this[globalParams.treeProperty], nodesHint);
	}
	
	/**
	 * Gets a node or list of nodes.
	 *
	 * @param string|int|array	 nodeNames
	 *
	 * @return Chtml|array|object
	 */
	getNodes(nodeNames) {
		_arrFrom(nodeNames).forEach(nodeName => {
			if (nodeName in this[globalParams.treeProperty] && this[globalParams.treeProperty][nodeName] instanceof Core) {
				// Arrays must not be reused!
				// Their sources of nodes cant be guaranteed to be same.
				// this[globalParams.treeProperty][nodeName] could also be an empty getter/setter
				// So the instanceof is the way to go for both problems
				return this[globalParams.treeProperty][nodeName];
			}
			var node;
			if ((node = this.getExplicitNode(nodeName))
			|| (node = this.getImplicitNode(nodeName))) {
				this.addNode(nodeName, node);
			}
		});
		return _isArray(nodeNames) ? _objFrom(nodeNames, this[globalParams.treeProperty]) : this[globalParams.treeProperty][nodeNames];
	}
	
	/**
	 * Attempts to resolve a node from explicit tree.
	 *
	 * @param string				requestNodeName
	 *
	 * @return HTMLElement
	 */
	getExplicitNode(requestNodeName) {
		// If given a rolecase, we can perform a query if we understand the semantics.
		if ((this.roles && this.roles.length)
		|| (this.roles = (this.el.getAttribute(globalParams.attrMap.superrole) || '').replace('  ', ' ').split(' ')).length) {
			var roles = globalParams.rolecase ? [globalParams.rolecase] : this.roles;
			// Find matches...
			var CSSEscape = globalParams.context.CSS ? globalParams.context.CSS.escape : str => str;
			return roles.reduce((matchedNode, role) => {
				if (!matchedNode) {
					var closestSuperSelector = '[' + CSSEscape(globalParams.attrMap.superrole) + '~="' + role + '"]';
					var nodeSelector = '[' + CSSEscape(globalParams.attrMap.subrole) + '~="' + role + '-' + requestNodeName + '"]';
					var closestSuper, _matchedNode;
					if ((_matchedNode = (this.el.shadowRoot || this.el).querySelector(nodeSelector))
					// If this.el has a shadowRoot, we don't expect _matchedNode to be able to find is superRole element.
					// If it finds one, then its not for the curren superRole element.
					&& ((this.el.shadowRoot && !(_matchedNode.parentNode.closest && _matchedNode.parentNode.closest(closestSuperSelector)))
					// _matchedNode must find this.el as its superRole element to qualify.
						|| (!this.el.shadowRoot && _matchedNode.parentNode && (closestSuper = _matchedNode.parentNode.closest(closestSuperSelector)) && closestSuper.isSameNode(this.el))
					)) {
						matchedNode = _matchedNode;
					}
				}
				return matchedNode;
			}, null);
		}
	}
	
	/**
	 * Attempts to resolve a node from implicit tree.
	 *
	 * @param string				requestNodeName
	 *
	 * @return HTMLElement|array
	 */
	getImplicitNode(requestNodeName) {
		if (_isNumeric(requestNodeName) || requestNodeName.match(/[^a-zA-Z0-9\-]/)) {
			return;
		}
		// Use schema...
		var nodeSchema, nodeSelector = [];
		var tries = [];
		if (schema.aria[requestNodeName]) {
			tries.push({
				schema: schema.aria[requestNodeName],
				selector: ['[role="' + requestNodeName + '"]'],
			});
		} else {
			tries.push({
				schema: schema.std[requestNodeName] || schema.aria[requestNodeName],
				selector: [requestNodeName, '[role="' + requestNodeName + '"]'],
			});
		}
		_each(schema.std, (tagname, schema) => {
			if (schema.implicitRole === requestNodeName) {
				tries.push({
					schema: schema,
					selector: [tagname],
				});
			}
		});
		var matches = null;
		tries.forEach(trie => {
			(this.el.shadowRoot || this.el).querySelectorAll(trie.selector.join(',')).forEach(node => {
				if (schema.assertNodeBelongsInScopeAs(this.el, node, trie.schema)) {
					if (trie.schema && trie.schema.singleton) {
						matches = node;
					} else if (!matches || _isArray(matches)) {
						matches = matches || [];
						matches.push(node);
					}
				}
			});
		});
		return matches;
	}
	
	/**
	 * Adds a node instance.
	 *
	 * @param string|int	 nodeName
	 * @param mixed			 node
	 *
	 * @return Core
	 */
	addNode(nodeName, node) {
		var nodeComponent, factory = this.params.factory || ((el, params) => new Core(el, params));
		if (_isArray(node)) {
			// Still set the collection as node, even tho it wont be reused.
			nodeComponent = node.map(_node => factory(_node, this.params));
		} else {
			nodeComponent = factory(node, this.params);
			// We'll remove from tree at the
			// time it leaves the DOM
			disconnectedCallback(node, () => {
				Reflex.del(this[globalParams.treeProperty], nodeName);
			});
		}
		Reflex.set(this[globalParams.treeProperty], nodeName, nodeComponent);
		return nodeComponent;
	}
};
