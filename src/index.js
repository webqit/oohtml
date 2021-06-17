
/**
 * @imports
 */
import Observer from '@webqit/observer';
import * as Subscript from '@webqit/subscript';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import HTMLModules from './html-modules/index.js';
import HTMLImports from './html-imports/index.js';
import NamespacedHTML from './namespaced-html/index.js';
import StateAPI from './state-api/index.js';
import HTMLSubscript from './subscript/index.js';

/**
 * @init
 */
export default function init(config = null, onDomReady = false) {

    const WebQit = domInit.call(this);
    if (WebQit.OOHTML) {
        return;
    }
    WebQit.OOHTML = {};
    // --------------
    HTMLModules.call(this, config, onDomReady);
    HTMLImports.call(this, config, onDomReady);
    NamespacedHTML.call(this, config, onDomReady);
    StateAPI.call(this, config, onDomReady);
    HTMLSubscript.call(this, config, onDomReady);
    // --------------
    WebQit.Observer = Observer;
    WebQit.Subscript = Subscript;

}

/**
 * @exports
 */
export {
    Observer,
    Subscript,
}