
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import ENV from './ENV.js';

/**
 * Creates a MutationObserver that fires when
 * the element leaves the DOM.
 *
 * @param string						input
 * @param function						callback
 *
 * @return void
 */
export default function disconnectedCallback(el, callback) {
	if (el.parentNode && ENV.Window.MutationObserver) {
		var called = false;
		var observer = new ENV.Window.MutationObserver(mutations => {
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
