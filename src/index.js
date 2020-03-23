
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import Jsen from '@web-native-js/jsen';
import Reflex from '@web-native-js/reflex';
import params from './params.js';
import Chtml from './Chtml.js';

/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */

/**
 * Configure CHTM with
 * a global window.
 */
(function(Window) {
	Chtml.init(Window, () => {
		var bundles = _arrFrom(Window.document.querySelectorAll(params.tagMap.bundle)).reverse();
		return bundles.map(b => {
			if (b.hasAttribute('src') && !b.content.children.length) {
				return new Promise(resolve => {
					b.addEventListener('bundleloadsuccess', () => resolve(b));
					b.addEventListener('bundleloaderror', () => resolve(b));
				});
			}
			return b;
		})
	});
})(this || window);

/**
 * @exports
 */
export {
	params,
	Jsen,
	Reflex,
};
export default Chtml;
