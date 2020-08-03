
/**
 * @imports
 */
import _any from '@web-native-js/commons/arr/any.js';
import { capture, mutationCallback, CSSEscape } from '../dom.js';
import ENV from './ENV.js';

/**
 * @ENV
 */
export {
    ENV,
};

/**
 * @init
 */
var inited = false;
export default function() {
	if (inited) {
		return;
	}
	inited = true;
		
	// Define the  namespacePropertyName
	if (!ENV.window || !('Element' in ENV.window)) {
		throw new Error('The "Element" class not found in global context!');
	}
	if (ENV.params.namespacePropertyName in ENV.window.Element.prototype) {
		throw new Error('The "Element" class already has a "' + ENV.params.namespacePropertyName + '" property!');
	}
	Object.defineProperty(ENV.window.Element.prototype, ENV.params.namespacePropertyName, {
		get: function() {
			if (!this['.sopedHTML-namespace']) {
				var namespaceStore = {};
				this['.sopedHTML-namespace'] = namespaceStore;
				if (ENV.trap.link) {
					ENV.trap.link(this, ENV.params.namespacePropertyName, namespaceStore);
				}
			}
			return this['.sopedHTML-namespace'];
		}
	});

	// Capture scoped elements
	capture('[' + CSSEscape(ENV.params.scopedIdAttribute) + ']', el => {
		var inerts = ENV.params.inertContexts.concat(ENV.params.inertSubjects);
		if (_any(inerts, inertContext => el.closest(inertContext))) {
			return;
		}
		var scopedId = el.getAttribute(ENV.params.scopedIdAttribute),
			ownerRoot = el.parentNode.closest('[' + CSSEscape(ENV.params.rootAttribute) + '],html'),
			namespaceStore = ownerRoot[ENV.params.namespacePropertyName];
		if (namespaceStore[scopedId] !== el) {
			if (namespaceStore[scopedId]) {
				// Properly remove any previous thing
				ENV.trap.deleteProperty(namespaceStore, scopedId);
			}
			// Set new now
			ENV.trap.set(namespaceStore, scopedId, el);
		}
		// On remove
		mutationCallback(el, () => {
			// ONLY if I am still the one in place
			if (namespaceStore[scopedId] === el) {
				// Properly remove me
				ENV.trap.deleteProperty(namespaceStore, scopedId);
			}
		}, {on:'disconnected', once:true});
	});

};