
/**
 * @imports
 */
import Jsen from '@web-native-js/jsen';
import ENV from '@onephrase/util/dom/ENV.js';
import polyfills from '@onephrase/util/dom/polyfills.js';
import Observer from '@web-native-js/observer';
import _merge from '@onephrase/util/obj/merge.js';
import { init as initHTMLPartials } from './html-partials/index.js';
import { init as initScopedHTML } from './scoped-html/index.js';
import { init as initScopedJS } from './scoped-js/index.js';

/**
 * @init
 */
var _window;
export function init(params = {}, window = null, trap = null) {
    if (params) {
        _merge(ENV.params, params);
    }
    if (window && window === _window) {
        // We could be called
        // just for "params"
        return;
    }
    if (_window) {
        throw new Error('"init()" already called with a window!');
    }
    ENV.window = window;
    _window = window;
    if (trap) {
        ENV.trap = trap;
    }

    // INIT components

    polyfills();
    initHTMLPartials({}, window, trap);
    initScopedHTML({}, window, trap);
    initScopedJS({}, window, trap);
};

/**
 * @pther
 */
export {
	Observer,
	Jsen,
	ENV,
};
