
/**
 * @imports
 */
import Observer from '@webqit/observer';
import BindingsAPI from './bindings-api/index.js';
import ContextAPI from './context-api/index.js';
import NamespaceAPI from './namespace-api/index.js';
import HTMLModules from './html-modules/index.js';
import HTMLImports from './html-imports/index.js';
import ScopedJS from './scoped-js/index.js';

/**
 * @init
 */
export default function init( configs = {} ) {
    if ( !this.webqit ) { this.webqit = {}; }
    // --------------
    BindingsAPI.call(this, ( configs.BINDINGS_API || {} ) );
    ContextAPI.call( this, ( configs.CONTEXT_API || {} ) );
    NamespaceAPI.call(this, ( configs.NAMESPACE_API || {} ) );
    HTMLModules.call( this, ( configs.HTML_MODULES || {} ) );
    HTMLImports.call( this, ( configs.HTML_IMPORTS || {} ) );
    ScopedJS.call( this, ( configs.SCOPED_JS || {} ) );
    // --------------
}

/**
 * @exports
 */
export { Observer }