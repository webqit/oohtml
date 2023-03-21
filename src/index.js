
/**
 * @imports
 */
import Observer from '@webqit/observer';
import BindingsAPI from './bindings-api/index.js';
import ContextAPI from './context-api/index.js';
import HTMLModules from './html-modules/index.js';
import HTMLImports from './html-imports/index.js';
import NamespacedHTML from './namespaced-html/index.js';
import ScopedJS from './scoped-js/index.js';

/**
 * @init
 */
export default function init( configs = {} ) {
    if ( !this.wq ) { this.wq = {}; }
    if ( this.wq.oohtml ) return;
    this.wq.oohtml = {};
    // --------------
    BindingsAPI.call(this, ( configs.BindingsAPI || {} ) );
    ContextAPI.call( this, ( configs.ContextAPI || {} ) );
    HTMLModules.call( this, ( configs.HTMLModules || {} ) );
    HTMLImports.call( this, ( configs.HTMLImports || {} ) );
    NamespacedHTML.call(this, ( configs.NamespacedHTML || {} ) );
    ScopedJS.call( this, ( configs.ScopedJS || {} ) );
    // --------------
}

/**
 * @exports
 */
export { Observer }