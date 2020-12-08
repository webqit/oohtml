
/**
 * @imports
 */
import _merge from '@webqit/util/obj/merge.js';
import _any from '@webqit/util/arr/any.js';
import params from './params.js';

/**
 * ---------------------------
 * The ScopedHTML class
 * ---------------------------
 */				

/**
 * An object from @webqit/browser-pie representing the
 * current window instance, as bound in here by caller
 * 
 * @param Object Ctxt
 */
export default function init(Ctxt) {
	
	// Define the  NAMESPACE_PROP
	if (!Ctxt.window || !('Element' in Ctxt.window)) {
		throw new Error('The "Element" class not found in global context!');
	}
	if (params.NAMESPACE_PROP in Ctxt.window.Element.prototype) {
		throw new Error('The "Element" class already has a "' + params.NAMESPACE_PROP + '" property!');
	}
	Object.defineProperty(Ctxt.window.Element.prototype, params.NAMESPACE_PROP, {
		get: function() {
			if (!this['.sopedHTML-namespace']) {
				var namespaceStore = {};
				this['.sopedHTML-namespace'] = namespaceStore;
				if (Ctxt.Observer.link) {
					Ctxt.Observer.link(this, params.NAMESPACE_PROP, namespaceStore);
				}
			}
			return this['.sopedHTML-namespace'];
		}
	});

	// Capture scoped elements
	Ctxt.Mutation.onPresent('[' + Ctxt.window.CSS.escape(params.SCOPED_ID_ATTR) + ']', el => {
		if (_any(params.SCOPED_ID_INERT_CONTEXTS, inertContext => el.closest(inertContext))) {
			return;
		}
		var scopedId = el.getAttribute(params.SCOPED_ID_ATTR),
			ownerRoot = el.parentNode.closest('[' + Ctxt.window.CSS.escape(params.NAMESPACE_ATTR) + '],html'),
			namespaceStore = ownerRoot[params.NAMESPACE_PROP];
		if (namespaceStore[scopedId] !== el) {
			Ctxt.Observer.set(namespaceStore, scopedId, el);
		}
		// On remove
		Ctxt.Mutation.onRemoved(el, () => {
			// ONLY if I am still the one in place
			if (namespaceStore[scopedId] === el) {
				// Properly remove me
				Ctxt.Observer.deleteProperty(namespaceStore, scopedId);
			}
		}, {once:true});
	});
};