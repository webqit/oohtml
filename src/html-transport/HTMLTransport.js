
/**
 * @imports
 */
import Jsen from '@web-native-js/jsen';
import _isTypeObject from '@web-native-js/commons/js/isTypeObject.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import _isNumeric from '@web-native-js/commons/js/isNumeric.js';
import _unique from '@web-native-js/commons/arr/unique.js';
import _following from '@web-native-js/commons/arr/following.js';
import parseNamespace from './parseNamespace.js';
import ENV from './ENV.js';

/**
 * ---------------------------
 * The HTMLTransport class
 * ---------------------------
 */				

export default class HTMLTransport {

	/**
	 * @inheritdoc
	 */
	static capture(el, binding, _binding) {
		const namespaceParse = parseNamespace(el.getAttribute(ENV.params.namespaceAttribute) || '');
		const syncListCallback = ENV.syncListCallback || function(nodeName, node, syncItem, isExistingNode = false) {
			if (arguments.length > 2) {
				return node.bind(syncItem);
			} else {
				return node.unbind();
			}
		};
		if (namespaceParse.subnamespace) {
			if (_isTypeObject(binding) && binding) {
				// Mirror
				ENV.Trap.observe(binding, changes => {
					return HTMLTransport.sync(el, binding, namespaceParse.subnamespace, syncListCallback);
				}, {tags:['#HTMLTransport-sync', el]});
			}
			if (_isTypeObject(_binding) && _binding) {
				// Unmirror
				ENV.Trap.unobserve(_binding, null, null, {tags:['#HTMLTransport-sync', el]});
			}
			// Initial Sync...
			return HTMLTransport.sync(el, binding || {}, namespaceParse.subnamespace, syncListCallback);
		}
	}
	
	/**
	 * Binds a (reactive) list context to the instance.
	 * Childnodes will be automatically created/removed per key.
	 *
	 * @param Element 		el
	 * @param array 		srcModel
	 * @param string 		subnamespace
	 * @param function 		syncListCallback
	 *
	 * @return ENV.Trap.MutationEvent
	 */
	static sync(el, srcModel, subnamespace, syncListCallback = null) {
		var scopedHTML = el['.scopedHTML'];
		// --------------
		var nodeNamespaceArray = subnamespace.split('//');
		// Create a namespace hash...
		if (nodeNamespaceArray[0].indexOf('[') > -1) {
			nodeNamespaceArray[0] = '"' + nodeNamespaceArray[0].replace(/\[/g, '" + ').replace(/\]/g, ' + "') + '"';
		}
		var srcModelKeys = ENV.Trap.keys(srcModel);
		var currentNodeNames = ENV.Trap.keys(scopedHTML.store);
		// --------------
		var e = new ENV.Trap.MutationEvent(el, {type:'remodelling'});
		_unique(srcModelKeys.concat(currentNodeNames)).forEach(nodeName => {
			nodeName = _isNumeric(nodeName) ? parseInt(nodeName) : nodeName;
			var existingNode = scopedHTML.find(nodeName);
			var rspns;
			if (ENV.Trap.has(srcModel, nodeName)) {
				var srcItem = ENV.Trap.get(srcModel, nodeName), isNewNode = false;
				if (!existingNode) {
					// --------------
					var nodeNamespaceArrayCopy = nodeNamespaceArray.slice();
					if (nodeNamespaceArrayCopy[0].indexOf('"') > -1) {
						nodeNamespaceArrayCopy[0] = nodeNamespaceArrayCopy[0].replace(/" \+  \+ "/g, nodeName);
						nodeNamespaceArrayCopy[0] = Jsen.parse(nodeNamespaceArrayCopy[0]).eval(srcItem);
					}
					var nodeEl = HTMLTransport.import(nodeNamespaceArrayCopy.join('//'));
					// --------------
					if (nodeEl) {
						var following = _following(srcModelKeys, nodeName + ''/*numeric nodeName needs this*/, true/*length*/)
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
					if (_isFunction(syncListCallback)) {
						rspns = syncListCallback(nodeName, existingNode, srcItem, isNewNode);
					}
				}
			} else if (existingNode) {
				if (_isFunction(syncListCallback)) {
					rspns = syncListCallback(nodeName, existingNode);
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
	}
};
