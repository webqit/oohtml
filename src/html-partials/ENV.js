
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
        bundleElement: 'partials-bundle',
        templateElement: 'template',
            templateNamespaceAttribute: 'name',
                slotReferenceAttribute: 'partials-slot',
        templateReferenceAttribute: 'template',
            slotElement: 'partials-slot',
                slotNameAttribute: 'name',
        itemsBindingMethod: 'partialsItemize',
            itemIndexAttribute: 'partials-index',
        keyValAttributes: [],
        listAttributes: [],
        inertContexts: ['template'],
        inertSubjects: [],
        noinheritAttributes: ['nocompose', 'name', 'template'],
        recomposeCallback: null,
    },
};