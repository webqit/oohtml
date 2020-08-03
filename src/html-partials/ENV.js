
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

/**
 * @exports
 */
export default ENV;