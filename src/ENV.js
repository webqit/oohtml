
/**
 * @imports
 */
import SCOPED_HTML_ENV from './scoped-html/ENV.js';
import SCOPED_JS_ENV from './scoped-js/ENV.js';
import HTML_TRANSPORT_ENV from './html-transport/ENV.js';

SCOPED_JS_ENV.params.innertContexts.push(HTML_TRANSPORT_ENV.params.importElement);
// Default common Trap
HTML_TRANSPORT_ENV.ScopedHTML = SCOPED_HTML_ENV;
HTML_TRANSPORT_ENV.ScopedJS = SCOPED_JS_ENV;
// Individual Access
const ENV = {
    ScopedHTML: SCOPED_HTML_ENV,
    ScopedJS: SCOPED_JS_ENV,
    HTMLTransport: HTML_TRANSPORT_ENV,
};

/**
 * @exports
 */
export default ENV;