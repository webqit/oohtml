
/**
 * @imports
 */
import Observer from '@webqit/observer';
import NamespacedHTML from './namespaced-html/index.js';
import ScopedCSS from './scoped-css/index.js';
import ScopedJS from './scoped-js/index.js';
import ContextAPI from './context-api/index.js';
import BindingsAPI from './bindings-api/index.js';
import HTMLImports from './html-imports/index.js';
import DataBinding from './data-binding/index.js';

/**
 * @exports
 */
export { Observer }

/**
 * @init
 */
export default function init( configs = {} ) {
    if ( !this.webqit ) { this.webqit = {}; }
    // --------------
    NamespacedHTML.call( this, ( configs.NAMESPACED_HTML || {} ) );
    ScopedCSS.call( this, ( configs.SCOPED_CSS || {} ) );
    ScopedJS.call( this, ( configs.SCOPED_JS || {} ) );
    ContextAPI.call( this, ( configs.CONTEXT_API || {} ) );
    BindingsAPI.call( this, ( configs.BINDINGS_API || {} ) ); // Depends on ContextAPI
    HTMLImports.call( this, ( configs.HTML_IMPORTS || {} ) ); // Depends on ContextAPI
    DataBinding.call( this, ( configs.DATA_BINDING || {} ) ); // Depends on ContextAPI, BindingsAPI, HTMLImports
    // --------------
}
