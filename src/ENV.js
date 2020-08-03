
/**
 * @imports
 */
import Observer from '@web-native-js/observer';
import SCOPED_HTML from './scoped-html/ENV.js';
import SCOPED_JS from './scoped-js/ENV.js';
import HTML_PARTIALS from './html-partials/ENV.js';

// Set cross package parameters
SCOPED_JS.params.inertContexts.push(
    HTML_PARTIALS.params.slotElement, 
    HTML_PARTIALS.params.moduleElement
);
SCOPED_HTML.params.inertSubjects.push(
    HTML_PARTIALS.params.slotElement, 
);

// Define cross package ENV
var window, trap, ENV = {

    get window() { return window; },
    set window(_window) {
        window = _window;
        SCOPED_HTML.window = _window;
        SCOPED_JS.window = _window;
        HTML_PARTIALS.window = _window;
    },

    get trap() { return trap; },
    set trap(_trap) {
        trap = _trap;
        SCOPED_HTML.trap = _trap;
        SCOPED_JS.trap = _trap;
        HTML_PARTIALS.trap = _trap;
    },

    params: {
        SCOPED_HTML: SCOPED_HTML.params,
        SCOPED_JS: SCOPED_JS.params,
        HTML_PARTIALS: HTML_PARTIALS.params,
    },
};

ENV.trap = Observer;

/**
 * @exports
 */
export default ENV;