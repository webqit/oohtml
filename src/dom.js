
/**
 * @imports
 */
import _isString from '@web-native-js/commons/js/isString.js';
import _isNumeric from '@web-native-js/commons/js/isNumeric.js';
import _difference from '@web-native-js/commons/arr/difference.js';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _with from '@web-native-js/commons/obj/with.js';
import ENV from './ENV.js';


// ------------------
// ready
// ------------------
var readyCallbacks = [];
export function ready(callback) {
    if (ENV.window.document.readyState === 'complete') {
		callback();
    } else {
		readyCallbacks.push(callback);
	}
    ENV.window.document.addEventListener('DOMContentLoaded', () => {
		readyCallbacks.forEach(callback => callback());
		readyCallbacks.splice(0);
	}, false);
};

/**
 * Creates a MutationObserver that fires when
 * the element leaves the DOM.
 *
 * @param string						input
 * @param function						callback
 *
 * @return void
 */
export function capture(selector, callback, params = {}) {
	// On DOM-ready
	ready(() => {
		// On DOM mutation
		if (ENV.window.MutationObserver) {
			if (!params.on) {
				params.on = 'connected';
			}
			mutationCallback(selector, (els, connectedState) => {
				els.forEach(el => callback(el, connectedState));
			}, params);
		}
		// IMPORTANT: This must come after having observed mutations above
		_arrFrom(ENV.window.document.querySelectorAll(selector)).forEach(el => callback(el, 1));
	});
};;

/**
 * Observes when the given elements or selectors are added or removed
 * from the given context.
 *
 * @param array|HTMLElement|string	els
 * @param function					callback
 * @param object					params
 *
 * @return MutationObserver
 */
export function mutationCallback(els, callback, params = {}) {
	els = _arrFrom(els, false/*castObject*/);
	var search = (el, nodeListArray) => {
		// Filter out text nodes
		nodeListArray = nodeListArray.filter(node => node.matches);
		if (_isString(el)) {
			// Is directly mutated...
			var matches = nodeListArray.filter(node => node.matches(el));
			// Is contextly mutated...
			if (params.observeIndirectMutation !== false) {
				matches = nodeListArray
					.reduce((collection, node) => collection.concat(_arrFrom(node.querySelectorAll(el))), matches);
				if (matches.length) {
					return matches;
				}
			}
		} else {
			// Is directly mutated...
			if (nodeListArray.includes(el)) {
				return [el];
			}
			// Is contextly mutated...
			if (params.observeIndirectMutation !== false && nodeListArray.length) {
				var parentNode = el;
				while(parentNode = parentNode.parentNode) {
					if (nodeListArray.includes(parentNode)) {
						return [el];
					}
				}
			}
		}
	};
	var connected = [], disconnected = [];
	var subject = params.context || ENV.window.document.documentElement;
	var mo = new ENV.window.MutationObserver(mutations => {
		if (!params.on || params.on === 'connected') {
			var matchedAddedNodes = [];
			els.forEach(el => {
				if (_isString(el)) {
					matchedAddedNodes = mutations
						.reduce((matches, mut) => matches.concat(search(el, _arrFrom(mut.addedNodes)) || []), matchedAddedNodes);
				} else {
					var matchedAsAddedNode = mutations
						.reduce((match, mut) => match || (search(el, _arrFrom(mut.addedNodes)) || [])[0], null);
					if (matchedAsAddedNode) {
						matchedAddedNodes.push(matchedAsAddedNode);
					}
				}
			});
			if (matchedAddedNodes.length) {
				if (params.onceEach) {
					var newlyConnected = _difference(matchedAddedNodes, connected);
					if (newlyConnected.length) {
						connected.push(...newlyConnected);
						callback(newlyConnected, 1);
					}
				} else {
					if (params.once) {
						mo.disconnect();
					}
					callback(matchedAddedNodes, 1);
				}
			}
		}
		if (!params.on || params.on === 'disconnected') {
			var matchedRemovedNodes = [];
			els.forEach(el => {
				if (_isString(el)) {
					matchedRemovedNodes = mutations
						.reduce((matches, mut) => matches.concat(search(el, _arrFrom(mut.removedNodes)) || []), matchedRemovedNodes);
				} else {
					var matchedAsRemovedNode = mutations
						.reduce((match, mut) => match || (search(el, _arrFrom(mut.removedNodes)) || [])[0], null);
					if (matchedAsRemovedNode) {
						matchedRemovedNodes.push(matchedAsRemovedNode);
					}
				}
			});
			if (matchedRemovedNodes.length) {
				if (params.onceEach) {
					var newlyDisconnected = _difference(matchedRemovedNodes, disconnected);
					if (newlyDisconnected.length) {
						disconnected.push(...newlyDisconnected);
						callback(newlyDisconnected, 0);
					}
				} else {
					if (params.once) {
						mo.disconnect();
					}
					callback(matchedRemovedNodes, 0);
				}
			}
		}
	});
	mo.observe(subject, {childList:true, subtree:true});
	return mo;
};

/**
 * Observes changes in attributes of the given element.
 *
 * @param HTMLElement				el
 * @param function					callback
 * @param array						filter
 *
 * @return MutationObserver
 */
export function attrChangeCallback(el, callback, filter = []) {
	var observer = new ENV.window.MutationObserver(callback);
	var params = {attributes:true, attributeOldValue:true};
	if (filter) {
		params.attributeFilter = filter;
	}
	observer.observe(el, params);
	return observer;
};

/**
 * A CHTML's meta tag props reader.
 *  
 * @param string prop
 * @param any	 set
 * 
 * @return string|number|bool
 */
var META, METATag;
export function meta(prop, set = null) {
	if (!META) {
		if (METATag = ENV.window.document.querySelector('meta[name="chtml"]')) {
			META = (METATag.getAttribute('content') || '').split(';').filter(v => v).reduce((META, directive) => {
				var directiveSplit = directive.split('=').map(d => d.trim());
				return _with(META, directiveSplit[0], directiveSplit[1] === 'true' 
					? true : (directiveSplit[1] === 'false' 
						? false : (_isNumeric(directiveSplit[1]) ? parseInt(directiveSplit[1]) : directiveSplit[1])
					)
				);
			}, {});
		};
	}
	if (arguments.length === 2) {
		if (set === false) {
			delete META[prop];
		} else {
			META[prop] = set === true ? 'true' : set;
		}
		var content = Object.keys(META).reduce((content, prop) => content + prop + '=' + META[prop] + ';', '');
		METATag.setAttribute('content', content);
		return true;
	}
    return META ? META[prop] : undefined;
};

/**
 * A polyfill for window.CSS.escape.
 *  
 * @param string str 
 * 
 * @return string
 */
export function CSSEscape(str) {
	return ENV.window.CSS ? ENV.window.CSS.escape(str) : str.replace(/([\:@\~\$\&])/g, '\\$1');
};