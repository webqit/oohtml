
/**
 * @imports
 */
import * as HTMLPartials from './index.js';

/**
 * Configure CHTM with
 * a global window.
 */
if (!window.WebNative) {
    window.WebNative = {};
}
window.WebNative.HTMLPartials = HTMLPartials;
