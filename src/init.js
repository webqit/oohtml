
/**
 * @imports
 */
import NamespacedHTML from './namespaced-html/index.js';
import ScopedJS, { idleCompiler as idleCompiler1 } from './scoped-js/index.js';
import DataBinding, { idleCompiler as idleCompiler2 } from './data-binding/index.js';
import BindingsAPI from './bindings-api/index.js';
import HTMLImports from './html-imports/index.js';
import ContextAPI from './context-api/index.js';
import ScopedCSS from './scoped-css/index.js';

/**
 * @init
 */
export default function init( QuantumJS, configs = {} ) {
    if ( !this.webqit ) { this.webqit = {}; }
    Object.assign( this.webqit, QuantumJS );
    // --------------
    ContextAPI.call( this, ( configs.CONTEXT_API || {} ) );
    BindingsAPI.call( this, ( configs.BINDINGS_API || {} ) ); // Depends on ContextAPI
    NamespacedHTML.call( this, ( configs.NAMESPACED_HTML || {} ) ); // Depends on ContextAPI
    HTMLImports.call( this, { ...( configs.HTML_IMPORTS || {} ), idleCompilers: [ idleCompiler1, idleCompiler2 ] } ); // Depends on ContextAPI
    DataBinding.call( this, ( configs.DATA_BINDING || {} ) ); // Depends on ContextAPI, BindingsAPI, HTMLImports
    ScopedCSS.call( this, ( configs.SCOPED_CSS || {} ) ); // Depends on NamespacedHTML
    ScopedJS.call( this, ( configs.SCOPED_JS || {} ) );
    // --------------
}
