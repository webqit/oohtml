
/**
 * @imports
 */
import Observer from '@webqit/observer';
import HTMLPartials from './html-partials/index.js';
import ScopedHTML from './scoped-html/index.js';
import ScopedJS from './scoped-js/index.js';
import meta from './meta.js';

/**
 * @init
 */
export default function init(Ctxt) {

    Ctxt.Observer = Observer;
    HTMLPartials(Ctxt);
    ScopedHTML(Ctxt);
    ScopedJS(Ctxt);
    Ctxt.meta = (...args) => {
        return meta.call(Ctxt, ...args);
    };

};