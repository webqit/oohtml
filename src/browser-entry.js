
/**
 * @imports
 */
import params from './params.js';
import Chtml from './index.js';
import Reflex from '@web-native-js/reflex';
import Jsen from '@web-native-js/jsen';
params.env = 'browser';

// As globals
if (!window.WebNative) {
	window.WebNative = {};
}
window.WebNative.Chtml = Chtml;
window.WebNative.Chtml.params = params;
window.WebNative.Chtml.Reflex = Reflex;
window.WebNative.Chtml.Jsen = Jsen;
