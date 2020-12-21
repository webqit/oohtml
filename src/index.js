
/**
 * @imports
 */
import DOMInit from '@webqit/browser-pie/src/dom/index.js';
import Observer from '@webqit/observer';
import State from './state/index.js';
import NamespacedHTML from './namespaced-html/index.js';
import NamedTemplates from './named-templates/index.js';
import ScopedJS from './scoped-scripts/index.js';
import HTMLPartials from './html-partials/index.js';
import { meta } from './util.js';

/**
 * @init
 */
export default function init(window, config = null) {

    let Ctxt = DOMInit(window);
    if (window.WQ.OOHTML) {
        return;
    }
    Ctxt.Observer = Observer;
    window.WQ.OOHTML = {};
    window.WQ.OOHTML.ready = Promise.all([
        State(window, config),
        NamespacedHTML(window, config),
        NamedTemplates(window, config),
        ScopedJS(window, config),
        HTMLPartials(window, config),
    ]);
    window.WQ.OOHTML.meta = (...args) => {
        return meta.call(Ctxt, ...args);
    };

};