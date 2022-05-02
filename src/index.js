
/**
 * @imports
 */
import Observer from '@webqit/observer';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import HTMLModules from './html-modules/index.js';
import HTMLImports from './html-imports/index.js';
import NamespacedHTML from './namespaced-html/index.js';
import StateAPI from './state-api/index.js';
import Subscript from './subscript/index.js';

/**
 * @init
 */
export default function init(configs = {}) {

    const WebQit = domInit.call(this);
    if (WebQit.OOHTML) {
        return;
    }
    WebQit.OOHTML = {};
    // --------------
    HTMLModules.call(this, (configs.HTMLModules || {}));
    HTMLImports.call(this, (configs.HTMLImports || {}));
    NamespacedHTML.call(this, (configs.NamespacedHTML || {}));
    StateAPI.call(this, (configs.StateAPI || {}));
    Subscript.call(this, (configs.Subscript || {}));
    // --------------
    WebQit.Observer = Observer;

}

/**
 * @exports
 */
export {
    Observer,
}