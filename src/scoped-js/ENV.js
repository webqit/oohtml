
/**
 * @imports
 */
import Observer from '@web-native-js/observer';
export { default as merge } from '@web-native-js/commons/obj/merge.js';

/**
 * @ENV
 */
const ENV = {
    window: null,
    trap: Observer,
    params: {
        scriptElement: 'script[type="scoped"]',
        globalBindingMethod: 'bind',
        localBindingMethod: 'bind',
        inertContexts: [],
    },
};

/**
 * @exports
 */
export default ENV;