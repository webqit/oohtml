
/**
 * @imports
 */
import ScopedHTML, {ENV} from './index.js';

/**
 * @window
 */
ScopedHTML.init(window);
if (!window.WebNative) {
    window.WebNative = {};
}
window.WebNative.ScopedHTML = ScopedHTML;
window.WebNative.ScopedHTML.ENV = ENV;
