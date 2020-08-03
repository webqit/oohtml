
/**
 * @imports
 */
import Observer from '@web-native-js/observer';
import Jsen from '@web-native-js/jsen';
import HTMLPartials from './html-partials/index.js';
import ScopedHTML from './scoped-html/index.js';
import ScopedJS from './scoped-js/index.js';
import { ready } from './dom.js';
import ENV from './ENV.js';

/**
 * @ENV
 */
export {
	Observer,
	Jsen,
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

	// INIT components
	HTMLPartials();
	ScopedHTML();
	ScopedJS();

	// ----------------------
	// Define the global "chtml" object
	// ----------------------

	if ('chtml' in ENV.window.document) {
		throw new Error('document already has a "chtml" property!');
	}
	Object.defineProperty(ENV.window.document, 'chtml', {
		value: {
			ready,
			params: ENV.params,
		}
	});
};
