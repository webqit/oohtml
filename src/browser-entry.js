
/**
 * @imports
 */
import Chtml from './index.js';

// As globals
if (!window.WN) {
	window.WN = {};
}
window.WN.Chtml = Chtml;
if (!window.WebNative) {
	window.WebNative = {};
}
window.WebNative.Chtml = Chtml;

new Chtml(window);
