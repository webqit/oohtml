
/**
 * @imports
 */
import ScopedJS, {ENV} from './index.js';

/**
 * @window
 */
ScopedJS.init(window);
if (!window.WebNative) {
    window.WebNative = {};
}
window.WebNative.ScopedJS = ScopedJS;
window.WebNative.ScopedJS.ENV = ENV;
