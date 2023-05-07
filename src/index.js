
/**
 * @imports
 */
import Observer from '@webqit/observer';
import BindingsAPI from './bindings-api/index.js';
import ContextAPI from './context-api/index.js';
import ScopedCSS from './scoped-css/index.js';
import ScopedJS from './scoped-js/index.js';
import NamespaceAPI from './namespace-api/index.js';
import HTMLImports from './html-imports/index.js';

/**
 * @init
 */
export default function init( configs = {} ) {
    if ( !this.webqit ) { this.webqit = {}; }
    // --------------
    BindingsAPI.call( this, ( configs.BINDINGS_API || {} ) );
    ContextAPI.call( this, ( configs.CONTEXT_API || {} ) );
    ScopedJS.call( this, ( configs.SCOPED_JS || {} ) );
    ScopedCSS.call( this, ( configs.SCOPED_CSS || {} ) );
    NamespaceAPI.call( this, ( configs.NAMESPACE_API || {} ) );
    HTMLImports.call( this, ( configs.HTML_IMPORTS || {} ) );
    // --------------
}

/**
 * @exports
 */
export { Observer }