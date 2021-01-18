
/**
 * @imports
 */
import DOMInit from '@webqit/browser-pie/src/dom/index.js';
import ENV from '@webqit/browser-pie/src/ENV.js';
import Observer from '@webqit/observer';
import * as Subscript from '@webqit/subscript';
import HTMLModules from './html-modules/index.js';
import HTMLImports from './html-imports/index.js';
import State from './state-api/index.js';
import NamespacedHTML from './namespaced-html/index.js';
import ReflexScripts from './reflex-scripts/index.js';
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
        HTMLModules(window, config),
        HTMLImports(window, config),
        State(window, config),
        NamespacedHTML(window, config),
        ReflexScripts(window, config),
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