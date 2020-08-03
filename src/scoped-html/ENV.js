
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
        rootAttribute: 'root',
        scopedIdAttribute: 'scoped:id',
        namespacePropertyName: 'idrefs',
        inertContexts: [],
        inertSubjects: [],
    },
};

/**
 * @exports
 */
export default ENV;