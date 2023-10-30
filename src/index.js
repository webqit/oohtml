
/**
 * @imports
 */
import Observer from '@webqit/observer';
import ContextAPI from './context-api/index.js';
import BindingsAPI from './bindings-api/index.js';
import HTMLBracelets from './html-bracelets/index.js';
import HTMLNamespaces from './html-namespaces/index.js';
import HTMLImports from './html-imports/index.js';
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
    HTMLBracelets.call( this, ( configs.HTML_BRACELETS || {} ) );
    HTMLNamespaces.call( this, ( configs.HTML_NAMESPACES || {} ) );
    HTMLImports.call( this, ( configs.HTML_IMPORTS || {} ) );
    ScopedCSS.call( this, ( configs.SCOPED_CSS || {} ) );
    ScopedJS.call( this, ( configs.SCOPED_JS || {} ) );
    // --------------
}
