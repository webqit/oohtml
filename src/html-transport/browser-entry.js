
/**
 * @imports
 */
import HTMLTransport, {ENV} from './index.js';

/**
 * Configure CHTM with
 * a global window.
 */
HTMLTransport.init(window);
if (!window.WebNative) {
    window.WebNative = {};
}
window.WebNative.HTMLTransport = HTMLTransport;
window.WebNative.HTMLTransport.ENV = ENV;
