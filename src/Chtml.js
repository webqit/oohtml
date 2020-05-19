
/**
 * @imports
 */
import ScopedHTML from './scoped-html/index.js';
import ScopedCSS from './scoped-css/index.js';
import ScopedJS from './scoped-js/index.js';
import HTMLTransport from './html-transport/index.js';
import ENV from './ENV.js';

/**
 * @init
 */
const Chtml = {
	init: function(Window) {
		ScopedHTML.init(Window);
		ScopedCSS.init(Window);
		ScopedJS.init(Window);
		HTMLTransport.init(Window);
	},
	ready: HTMLTransport.ready,
};

/**
 * @exports
 */
export {
    Chtml as default,
	ScopedHTML,
	ScopedCSS,
	ScopedJS,
	HTMLTransport,
    ENV,
};