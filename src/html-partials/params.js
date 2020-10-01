
/**
 * @ENV
 */
export default {
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
};