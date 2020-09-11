
/**
 * @imports
 */
import { onPresent, onRemoved } from '@onephrase/util/dom/mutation.js';
import _merge from '@onephrase/util/obj/merge.js';
import _any from '@onephrase/util/arr/any.js';
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
var _window;
export function init(params = {}, window = null, trap = null) {
    if (params) {
        _merge(ENV.params, params);
    }
    if (window && window === _window) {
        // We could be called
        // just for "params"
        return;
    }
    if (_window) {
        throw new Error('"init()" already called with a window!');
    }
    ENV.window = window;
    _window = window;
    if (trap) {
        ENV.trap = trap;
    }
		
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
	onPresent('[' + ENV.window.CSS.escape(ENV.params.scopedIdAttribute) + ']', el => {
		var inerts = ENV.params.inertContexts.concat(ENV.params.inertSubjects);
		if (_any(inerts, inertContext => el.closest(inertContext))) {
			return;
		}
		var scopedId = el.getAttribute(ENV.params.scopedIdAttribute),
			ownerRoot = el.parentNode.closest('[' + ENV.window.CSS.escape(ENV.params.rootAttribute) + '],html'),
			namespaceStore = ownerRoot[ENV.params.namespacePropertyName];
		if (namespaceStore[scopedId] !== el) {
			ENV.trap.set(namespaceStore, scopedId, el);
		}
		// On remove
		onRemoved(el, () => {
			// ONLY if I am still the one in place
			if (namespaceStore[scopedId] === el) {
				// Properly remove me
				ENV.trap.deleteProperty(namespaceStore, scopedId);
			}
		}, {once:true});
	});

};