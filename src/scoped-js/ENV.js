
/**
 * @imports
 */
import ENV from '@onephrase/util/dom/ENV.js';
import Observer from '@web-native-js/observer';

/**
 * @ENV
 */
export default {
    window: ENV.window,
    trap: Observer,
    params: {
        scriptElement: 'script[type="scoped"]',
        globalBindingMethod: 'bind',
        localBindingMethod: 'bind',
        inertContexts: [],
    },
};