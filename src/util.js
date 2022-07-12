
/**
 * @imports
 */
import domInit from '@webqit/browser-pie/src/dom/index.js';
import { _merge } from '@webqit/util/obj/index.js';

/**
 * A OOHTML's meta tag props reader.
 *  
 * @param Object defaults
 * 
 * @return Object
 */
export function config(defaults, overrides = {}) {
    const WebQit = domInit.call(this);
    if (!WebQit.OOHTML) {
        // For feature modules that will call outside of ./index.js module
        WebQit.OOHTML = {};
    }
    if (!WebQit.OOHTML.meta) {
        WebQit.OOHTML.meta = WebQit.DOM.meta('oohtml', true/* readWrite */);
    }
    WebQit.OOHTML.meta.defaults(_merge(3, defaults, overrides));
    return WebQit.OOHTML.meta;
}