
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import globalParams from '../params.js';

/**
 * Creates a MutationObserver that fires when
 * the element leaves the DOM.
 *
 * @param string						input
 * @param function					callback
 *
 * @return void
 */
export default function disconnectedCallback(el, callback) {
	if (el.parentNode && globalParams.context.MutationObserver) {
		var called = false;
		var observer = new globalParams.context.MutationObserver(mutations => {
			mutations.forEach(m => {
				if (!called && _arrFrom(m.removedNodes).includes(el)) {
					called = true;
					callback();
				}
			});
		});
		observer.observe(el.parentNode, {childList:true});
		disconnectedCallback(el.parentNode, () => {
			if (!called) {
				called = true;
				callback();
			}
		});
	}
};
