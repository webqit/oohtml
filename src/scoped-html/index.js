
/**
 * @imports
 */
import Reflex from '@web-native-js/reflex';
import ScopedHTML from './ScopedHTML.js';
import Schema from './Schema.js';
import ENV from './ENV.js';

/**
 * @init
 */
ScopedHTML.init = function(Window, Trap = Reflex) {
    ENV.Window = Window;
    ENV.Trap = Trap;
    // Define
    if (!ENV.Window || !('Element' in ENV.Window)) {
        throw new Error('The "Element" class not found in global context!');
    }
    if (ENV.params.scopeTreePropertyName in ENV.Window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + ENV.params.scopeTreePropertyName + '" property!');
    }
    Object.defineProperty(ENV.Window.Element.prototype, ENV.params.scopeTreePropertyName, {
        get: function() {
            if (!this['.scopedHTML']) {
                new ScopedHTML(this);
            }
            if (ENV.params.proxyScopedObjects) {
                return ENV.Trap ? new Proxy(this['.scopedHTML'].store, ENV.Trap) : new Proxy(this['.scopedHTML'].store);
            }
            return this['.scopedHTML'].store;
        }
    });
};

/**
 * @exports
 */
export {
    ScopedHTML as default,
    Schema,
    ENV,
}