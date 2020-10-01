
/**
 * @imports
 */
import Observer from '@web-native-js/observer';
import { onPresent, onRemoved } from '@onephrase/util/dom/mutation.js';
import _merge from '@onephrase/util/obj/merge.js';
import _any from '@onephrase/util/arr/any.js';
import params from './params.js';

/**
 * ---------------------------
 * The ScopedHTML class
 * ---------------------------
 */				

export default class ScopedHTML {

    /**
     * @constructor
     */
    constructor(window, trap = Observer, _params = {}) {

        const _this = this;
        _this.params = _merge({}, params, _params);
        _this.window = window;
        _this.trap = trap;
			
		// Define the  namespacePropertyName
		if (!_this.window || !('Element' in _this.window)) {
			throw new Error('The "Element" class not found in global context!');
		}
		if (_this.params.namespacePropertyName in _this.window.Element.prototype) {
			throw new Error('The "Element" class already has a "' + _this.params.namespacePropertyName + '" property!');
		}
		Object.defineProperty(_this.window.Element.prototype, _this.params.namespacePropertyName, {
			get: function() {
				if (!this['.sopedHTML-namespace']) {
					var namespaceStore = {};
					this['.sopedHTML-namespace'] = namespaceStore;
					if (_this.trap.link) {
						_this.trap.link(this, _this.params.namespacePropertyName, namespaceStore);
					}
				}
				return this['.sopedHTML-namespace'];
			}
		});

		// Capture scoped elements
		onPresent(_this.window, '[' + _this.window.CSS.escape(_this.params.scopedIdAttribute) + ']', el => {
			var inerts = _this.params.inertContexts.concat(_this.params.inertSubjects);
			if (_any(inerts, inertContext => el.closest(inertContext))) {
				return;
			}
			var scopedId = el.getAttribute(_this.params.scopedIdAttribute),
				ownerRoot = el.parentNode.closest('[' + _this.window.CSS.escape(_this.params.rootAttribute) + '],html'),
				namespaceStore = ownerRoot[_this.params.namespacePropertyName];
			if (namespaceStore[scopedId] !== el) {
				_this.trap.set(namespaceStore, scopedId, el);
			}
			// On remove
			onRemoved(_this.window, el, () => {
				// ONLY if I am still the one in place
				if (namespaceStore[scopedId] === el) {
					// Properly remove me
					_this.trap.deleteProperty(namespaceStore, scopedId);
				}
			}, {once:true});
		});
	}
};