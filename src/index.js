
/**
 * @imports
 */
import Observer from '@webqit/observer';
import HTMLModules from './html-modules/index.js';
import HTMLImports from './html-imports/index.js';
import NamespacedHTML from './namespaced-html/index.js';
import StateAPI from './state-api/index.js';
import ScopedJS from './scoped-js/index.js';

/**
 * @init
 */
export default function init( configs = {} ) {
    if ( !this.wq ) { this.wq = {}; }
    if ( this.wq.oohtml ) return;
    this.wq.Observer = Observer;
    // --------------
    //HTMLModules.call( this, (configs.HTMLModules || {}));
    //HTMLImports.call( this, (configs.HTMLImports || {}));
    //NamespacedHTML.call(this, (configs.NamespacedHTML || {}));
    //StateAPI.call(this, (configs.StateAPI || {}));
    ScopedJS.call(this, (configs.ScopedJS || {}));
    // --------------
    this.wq.oohtml = {};
}

/**
 * @exports
 */
export {
    Observer,
}