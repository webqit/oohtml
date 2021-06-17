
/**
 * @imports
 */
import domInit from '@webqit/browser-pie/src/dom/index.js';
import _merge from '@webqit/util/obj/merge.js';

/**
 * A OOHTML's meta tag props reader.
 *  
 * @param Object defaults
 * 
 * @return Object
 */
export function config(defaults, overrides = {}) {
    const WebQit = domInit.call(this);
    if (!WebQit.OOHTML.meta) {
        WebQit.OOHTML.meta = WebQit.DOM.meta('oohtml', true/* readWrite */);
    }
    WebQit.OOHTML.meta.defaults(_merge(3, defaults, overrides));
    return WebQit.OOHTML.meta;
}

/**
 * Returns an OOHTML footprint object embedded on a host.
 *
 * @param Object	host
 *
 * @return Object
 */
export function footprint(host) {
    var _footprint, webqitFootprint, webqitFootprintSymbol = Symbol.for('.webqit');
    if (!(webqitFootprint = host[webqitFootprintSymbol])) {
        Object.defineProperty(host, webqitFootprintSymbol, {value: {}, enumerable: false});
        webqitFootprint = host[webqitFootprintSymbol];
    }
    if (!(_footprint = webqitFootprint.oohtml)) {
        _footprint = {};
        webqitFootprint.oohtml = _footprint;
    }
    return _footprint;
}