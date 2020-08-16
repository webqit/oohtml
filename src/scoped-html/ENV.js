
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
        rootAttribute: 'namespace',
        scopedIdAttribute: 'scoped:id',
        namespacePropertyName: 'namespace',
        inertContexts: [],
        inertSubjects: [],
    },
};

/**
 * @exports
 */
export default ENV;