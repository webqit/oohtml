
/**
 * @imports
 */
import Observer from '@webqit/observer';
import HTMLModules from './html-modules/index.js';
import HTMLImports from './html-imports/index.js';/*
import NamespacedHTML from './namespaced-html/index.js';
import StateAPI from './state-api/index.js';
import Subscript from './subscript/index.js';*/

/**
 * @init
 */
export default function init( configs = {} ) {

    if ( this.wq && this.wq.oohtml ) return;
    // --------------
    HTMLModules.call( this, (configs.HTMLModules || {}));
    HTMLImports.call( this, (configs.HTMLImports || {}));
    //NamespacedHTML.call(this, (configs.NamespacedHTML || {}));
    //StateAPI.call(this, (configs.StateAPI || {}));
    //Subscript.call(this, (configs.Subscript || {}));
    this.wq.oohtml = {};
    this.wq.Observer = Observer;
}

/**
 * @exports
 */
export {
    Observer,
}