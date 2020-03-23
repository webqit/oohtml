
/**
 * @imports
 */
import Jsen from '@web-native-js/jsen';
import Reflex from '@web-native-js/reflex';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _isTypeObject from '@web-native-js/commons/js/isTypeObject.js';
import _isArray from '@web-native-js/commons/js/isArray.js';
import _isString from '@web-native-js/commons/js/isString.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import _isNumeric from '@web-native-js/commons/js/isNumeric.js';
import _unique from '@web-native-js/commons/arr/unique.js';
import _following from '@web-native-js/commons/arr/following.js';
import _before from '@web-native-js/commons/str/before.js';
import _beforeLast from '@web-native-js/commons/str/beforeLast.js';
import createElement from './core/createElement.js';
import defineBundleElements from './composing/defineBundleElements.js';
import defineImportElements from './composing/defineImportElements.js';
import createBundleMatrix from './composing/createBundleMatrix.js';
import parseNamespace from './composing/parseNamespace.js';
import recompose from './composing/recompose.js';
import Directives from './Directives.js';
import Core from './core/Core.js';
import globalParams from './params.js';

/**
 * ---------------------------
 * The Chtml class
 * ---------------------------
 */				

export default class Chtml extends Core {

	/**
	 * @inheritdoc
	 */
	constructor(el, params = {}) {
		super(el, params);

		// Create the factory used in Core
		this.params.factory = this.constructor.from;
		
		// ------------
		// NAMESPACE
		// ------------
		
		const namespaceParse = parseNamespace(el.getAttribute(globalParams.attrMap.namespace) || '');
		Object.defineProperty(this, 'namespace', {value:namespaceParse.namespace, enumerable:true,});
		
		// ------------
		// DIRECTIVES
		// ------------
		
		const directives = [];
		Reflex.defineProperty(this, 'directives', {value:directives, enumerable:true,});
		var stringifyEach = list => _unique(list.map(expr => _before(_before(expr.toString(), '['), '(')));
		Reflex.observe(this.directives, (entries, exits, e) => {
			Object.keys(entries).forEach(k => {
				// ------------
				// Unbind exits
				if (exits[k]) {
					Reflex.unobserve(this, null, null, {tags:['#directive', exits[k]]});
				}
				// ------------
				// Bind entries
				if (entries[k]) {
					if (this.autoEval !== false) {
						entries[k].eval(this, {get:Reflex.get});
					}
					Reflex.observe(this, stringifyEach(entries[k].meta.vars), (newState, oldState, e) => {
						var evalReturn = entries[k].eval(this, {get:Reflex.get});
						// If the result of this evaluation is false,
						// e.stopPropagation will be called and subsequent expressions
						// will not be evaluated. So we must not allow false to be returned.
						// All expressions are meant to be evaluated in parallel, independent of each other.
						if (evalReturn !== false) {
							return evalReturn;
						}
					}, {tags:['#directive', entries[k]]});
				}
			});
		});
		// ------------
		setTimeout(() => {
			var directives;
			if (!(this.dataBlockScript = _arrFrom(el.children).filter(node => node.matches(globalParams.tagMap.jsen))[0])
			|| !(directives = Directives.parse((this.dataBlockScript.textContent || '').trim()))) {
				directives = new Directives;
			}
			// ------------
			var directivesPush = Reflex.get(this.directives, 'push');
			directives.filter().forEach(directive => {
				this.autoEval = globalParams.initialRendering;
				directivesPush(directive);
				this.autoEval = true;
			});
			// ------------
			if (this.dataBlockScript && globalParams.hideDataBlockScript) {
				this.dataBlockScript.remove();
			}
		}, 0);
		// ------------
		
		// ------------
		// MIRROR
		// ------------
		
		Reflex.init(this, globalParams.modelProperty);
		// Setup mirror
		Reflex.observe(this, globalParams.modelProperty, (data, _data, e) => {
			if (namespaceParse.subnamespace) {
				if (_isTypeObject(data) && data) {
					// Mirror
					Reflex.observe(data, changes => {
						return this.remodel(data, namespaceParse.subnamespace, globalParams.remodelCallback);
					}, {tags:['#mirror', this]});
				}
				if (_isTypeObject(_data) && _data) {
					// Unmirror
					Reflex.unobserve(_data, null, null, {tags:['#mirror', this]});
				}
				// Initial Sync...
				return this.remodel(data || {}, namespaceParse.subnamespace, globalParams.remodelCallback);
			}
		});
	}
	
	/**
	 * Alias of super.getNodes().
	 *
	 * @param string 		nodeName
	 *
	 * @return Chtml
	 */
	get(nodeName) {
		return super.getNodes(nodeName);
	}
	
	/**
	 * Binds a (reactive) context object or logical object to the instance.
	 *
	 * @param object 		context
	 *
	 * @return Event
	 */
	bind(context) {
		if (!globalParams.modelProperty) {
			throw new Error('Data key has not been set!');
		}
		return Reflex.set(this, globalParams.modelProperty, context);
	}	
	/**
	 * Clears the instance of its context.
	 *
	 * @return Event
	 */
	unbind() {
		if (!globalParams.modelProperty) {
			throw new Error('Data key has not been set!');
		}
		return Reflex.del(this, globalParams.modelProperty);
	}
	
	/**
	 * Binds a (reactive) list context to the instance.
	 * Childnodes will be automatically created/removed per key.
	 *
	 * @param array 		srcModel
	 * @param string 		subnamespace
	 * @param function 		remodelCallback
	 *
	 * @return Reflex.MutationEvent
	 */
	remodel(srcModel, subnamespace, remodelCallback = null) {
		// --------------
		var nodeNamespaceArray = subnamespace.split('//');
		// Create a namespace hash...
		if (nodeNamespaceArray[0].indexOf('[') > -1) {
			nodeNamespaceArray[0] = '"' + nodeNamespaceArray[0].replace(/\[/g, '" + ').replace(/\]/g, ' + "') + '"';
		}
		var srcModelKeys = Reflex.keys(srcModel);
		var currentNodeNames = Reflex.keys(this[globalParams.treeProperty]);
		// --------------
		var e = new Reflex.MutationEvent(this.el, {type:'remodelling'});
		_unique(srcModelKeys.concat(currentNodeNames)).forEach(nodeName => {
			nodeName = _isNumeric(nodeName) ? parseInt(nodeName) : nodeName;
			var existingNode = this.getNodes(nodeName);
			var rspns;
			if (Reflex.has(srcModel, nodeName)) {
				var srcItem = Reflex.get(srcModel, nodeName), isNewNode = false;
				if (!existingNode) {
					// --------------
					var nodeNamespaceArrayCopy = nodeNamespaceArray.slice();
					if (nodeNamespaceArrayCopy[0].indexOf('"') > -1) {
						nodeNamespaceArrayCopy[0] = Jsen.parse(nodeNamespaceArrayCopy[0]).eval(srcItem);
					}
					nodeNamespaceArrayCopy[0] += '/' + nodeName;
					var nodeEl = Chtml.import(nodeNamespaceArrayCopy.join('//'));
					// --------------
					if (nodeEl) {
						var following = _following(srcModelKeys, nodeName + ''/*numeric nodeName needs this*/, true/*length*/)
							.reduce((closest, _nodeName) => closest || this.getNodes(_nodeName), null);
						if (following) {
							following.el.before(nodeEl);
						} else {
							this.el.append(nodeEl);
						}
						existingNode = this.addNode(nodeName, nodeEl);
						isNewNode = true;
					}
				}
				if (existingNode) {
					if (_isFunction(remodelCallback)) {
						rspns = remodelCallback(existingNode, srcItem, nodeName, isNewNode);
					} else {
						rspns = existingNode.bind(srcItem);
					}
				}
			} else if (existingNode) {
				if (_isFunction(remodelCallback)) {
					rspns = remodelCallback(existingNode, nodeName);
				} else {
					rspns = existingNode.unbind();
				}
				var remove = () => {
					existingNode.destroy();
					existingNode.el.remove();
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
	
	/**
	 * Frees the instance of observed directives.
	 *
	 * @return void
	 */
	destroy() {
		this.directives.forEach(
			binding => Reflex.unobserve(this, null, null, {tags:['#directive', binding]})
		);
		if (this.dataBlockScript && globalParams.hideDataBlockScript) {
			this.prepend(this.dataBlockScript);
		}
	}
	
	/**
	 * -------------------
	 * INSTANCE-RELATED METHODS
	 * -------------------
	 */
	
	/**
	 * The "init" function.
	 * Gives CHTML a global window context
	 * and lets it perform other necessary initializations.
	 *
	 * @param object	contextWindow
	 * @param function	bundlesCallback
	 *
	 * @return void
	 */
	static init(contextWindow, bundlesCallback = null) {
		
		globalParams.context = contextWindow;
		// Window must be set above... before this
		defineBundleElements();
		
		// ------------------
		// Chtml.contentLoadedPromise
		// ------------------
		Chtml.contentLoadedPromise = new Promise(resolve => {
			if (contextWindow.document.readyState === 'complete') {
				resolve(); return;
			}
			contextWindow.document.addEventListener('DOMContentLoaded', resolve, false);
			contextWindow.addEventListener('load', resolve, false);
		});
		
		// ------------------
		// globalParams.bundles
		// Chtml.loadingBundlesPromise
		// ------------------
		Chtml.contentLoadedPromise.then(() => {
			var bundleElements;
			if (bundlesCallback && (bundleElements = bundlesCallback())) {
				if (!_isArray(bundleElements)) {
					throw new Error('The bundlesCallback() function must return an array!');
				}
				globalParams.bundles = createBundleMatrix(bundleElements, loadingBundlesPromise => {
					Chtml.loadingBundlesPromise = loadingBundlesPromise;
					setTimeout(() => {
						defineImportElements(loadingBundlesPromise);
					}, 0);
				});
			}
		});
	}
	
	/**
	 * The "ready" function.
	 * Calls us when it becomes safe to run bundle-related code.
	 *
	 * @param function			callback
	 * @param bool				waitForBundles
	 *
	 * @return void
	 */
	static ready(callback, waitForBundles = true) {
		Chtml.contentLoadedPromise.then(() => {
			if (!waitForBundles) {
				callback(); return;
			}
			Chtml.loadingBundlesPromise.then(callback);
		});
	}

	/**
	 * Creates a Chtml over a root resolved from definition or markup string.
	 *
	 * @param string|document|HTMLElement	input
	 * @param object						params
	 * @param object						Static
	 *
	 * @return Chtml
	 */
	static from(input, params = {}, Static = Chtml) {
		// -----------------------------
		// Resolve element from input
		// -----------------------------
		var el = input;
		if (_isString(input) && !input.trim().startsWith('<') && input.indexOf('/') !== -1) {
			if (!(el = Chtml.import(_before(input, '//')))) {

				throw new Error('No element found on the namespace "' + input + '"!');
			}
		} else {
			if (_isString(input)) {
				if (!(el = createElement(input))) {
					throw new Error('Could not resolve the string "' +input + '" to an element!');
				}
			}
			var ns, superNs, superEl, isImport = el.matches(globalParams.tagMap.import);
			if ((ns = _before(el.getAttribute(globalParams.attrMap.namespace) || '', '//'))
			// The entire namespace is used for elements of type import.
			// The supernamespace is used for normal elements
			&& ((isImport && (superNs = ns)) || (superNs = _beforeLast(ns, '/')) && superNs.indexOf('/') > -1)
			&& (superEl = Chtml.import(superNs))) {
				var _el = el;
				el = recompose(superEl, el);
				if (isImport) {
					_el.replaceWith(el);
				}
			} else if (ns) {
				console.warn('Namespace resolution failed: ' + ns);
			}
		}
		return new Static(el, params);
	}
	
	/**
	 * Imports a module from bundles.
	 *
	 * @param string						namespace
	 *
	 * @return HTMLElement
	 */
	static import(namespace) {
		if (globalParams.bundles) {
			return globalParams.bundles.find(namespace);
		}
	}
};
