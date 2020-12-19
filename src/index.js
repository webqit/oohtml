
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
export default function init(window) {

    let Ctxt = DOMInit(window);
    Ctxt.Observer = Observer;
    State(window);
    NamespacedHTML(window);
    NamedTemplates(window);
    ScopedJS(window);
    HTMLPartials(window);
    Ctxt.meta = (...args) => {
        return meta.call(Ctxt, ...args);
    };

};