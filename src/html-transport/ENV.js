
/**
 * We expect the following here
 */
const ENV = {
    Window: null,
    Trap: null,
    ScopedHTML: null,
    ScopedJS: null,
    params: {
        namespaceAttribute: 'namespace',
        bundleElement: 'html-bundle',
        importElement: 'html-import',
        keyValAttributes: [],
        listAttributes: [],
        norecomposeAttributes: ['nocompose', 'shadow',],
        recomposeCallback: null,
    },
}

/**
 * @exports
 */
export default ENV;