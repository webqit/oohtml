
/**
 * @imports
 */
import Observer from '@webqit/observer';
import ContextAPI from './context-api/index.js';
import BindingsAPI from './bindings-api/index.js';
import HTMLImports from './html-imports/index.js';
import HTMLBindings from './html-bindings/index.js';
import HTMLNamespaces from './html-namespaces/index.js';
import ScopedCSS from './scoped-css/index.js';
import ScopedJS from './scoped-js/index.js';

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
    ContextAPI.call( this, ( configs.CONTEXT_API || {} ) );
    BindingsAPI.call( this, ( configs.BINDINGS_API || {} ) );
    HTMLImports.call( this, ( configs.HTML_IMPORTS || {} ) ); // Depends ContextAPI
    HTMLBindings.call( this, ( configs.HTML_BRACELETS || {} ) ); // Depends ContextAPI, BindingsAPI, HTMLImports
    HTMLNamespaces.call( this, ( configs.HTML_NAMESPACES || {} ) );
    ScopedCSS.call( this, ( configs.SCOPED_CSS || {} ) );
    ScopedJS.call( this, ( configs.SCOPED_JS || {} ) );
    // --------------
}
