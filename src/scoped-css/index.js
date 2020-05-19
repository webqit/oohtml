
/**
 * @imports
 */
import ScopedCSS from './ScopedCSS.js';
import ENV from './ENV.js';

/**
 * @init
 */
ScopedCSS.init = function(Window,) {
    ENV.Window = Window;
}

/**
 * @exports
 */
export {
    ScopedCSS as default,
    ENV,
}