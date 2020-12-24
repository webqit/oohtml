
/**
 * @imports
 */
import DOMInit from '@webqit/browser-pie/src/dom/index.js';
import ENV from '@webqit/browser-pie/src/ENV.js';
import Observer from '@webqit/observer';
import Subscript from '@webqit/subscript';
import State from './state/index.js';
import NamespacedHTML from './namespaced-html/index.js';
import HTMLModules from './html-modules/index.js';
import ScopedScripts from './scoped-scripts/index.js';
import HTMLImports from './html-imports/index.js';
import { meta } from './util.js';

/**
 * @init
 */
export default function init(window, config = null) {

    let Ctxt = DOMInit(window);
    if (window.WQ.OOHTML) {
        return;
    }
    window.WQ.Observer = Observer;
    // --------------
    const OOHTML = ENV.create(window, 'OOHTML');
    OOHTML.ready = Promise.all([
        State(window, config),
        NamespacedHTML(window, config),
        HTMLModules(window, config),
        ScopedScripts(window, config),
        HTMLImports(window, config),
    ]);
    OOHTML.meta = (...args) => {
        return meta.call(Ctxt, ...args);
    };
    // --------------
    window.WQ.Subscript = Subscript;

};

/**
 * @exports
 */
export {
    Observer,
    Subscript,
}