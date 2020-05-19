
/**
 * @imports
 */
import Reflex from '@web-native-js/reflex';
import Jsen from '@web-native-js/jsen';
import Chtml from './Chtml.js';
import './scoped-html/browser-entry.js';
import './scoped-js/browser-entry.js';
import './scoped-css/browser-entry.js';
import './html-transport/browser-entry.js';

if (!window.WebNative.Chtml) {
	window.WebNative.Chtml = Chtml;
}
if (!window.WebNative.Reflex) {
	window.WebNative.Reflex = Reflex;
}
if (!window.WebNative.Jsen) {
	window.WebNative.Jsen = Jsen;
}