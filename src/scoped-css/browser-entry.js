
/**
 * @imports
 */
import ScopedCSS, {ENV} from './index.js';

/**
 * @window
 */
ScopedCSS.init(window);
if (!window.WebNative) {
    window.WebNative = {};
}
window.WebNative.ScopedCSS = ScopedCSS;
window.WebNative.ScopedCSS.ENV = ENV;
