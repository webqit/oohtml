
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
        rootAttribute: 'namespace',
        scopedIdAttribute: 'scoped:id',
        namespacePropertyName: 'namespace',
        inertContexts: [],
        inertSubjects: [],
    },
};