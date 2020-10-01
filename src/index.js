
/**
 * @imports
 */
import polyfills from '@onephrase/util/dom/polyfills.js';
import Jsen from '@web-native-js/jsen';
import Observer from '@web-native-js/observer';
import HTMLPartials from './html-partials/index.js';
import ScopedHTML from './scoped-html/index.js';
import ScopedJS from './scoped-js/index.js';
import meta from './meta.js';

/**
 * @init
 */
export default class Chtml {

    /**
     * @pconstructor
     */
    constructor(window, trap = Observer, params = {}) {
        if (window.Chtml) {
            throw new Error('Window already initialized!');
        }
        window.Chtml = this;
        polyfills(window);
        this.window = window;
        this.HTMLPartials = new HTMLPartials(...arguments);
        this.ScopedHTML = new ScopedHTML(...arguments);
        this.ScopedJS = new ScopedJS(...arguments);
    }

    /**
     * @meta
     */
    meta(...args) {
        return meta(this.window, ...args);
    }

};

/**
 * @pther
 */
export {
	Observer,
    Jsen,
    meta,
};
