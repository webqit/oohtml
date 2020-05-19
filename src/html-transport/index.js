
/**
 * @imports
 */
import Reflex from '@web-native-js/reflex';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import defineBundleElements from './defineBundleElements.js';
import defineImportElements from './defineImportElements.js';
import createBundleMatrix from './createBundleMatrix.js';
import HTMLTransport from './HTMLTransport.js';
import ENV from './ENV.js';

/**
 * The "init" function.
 * Gives CHTML a global window context
 * and lets it perform other necessary initializations.
 *
 * @param object		Window
 * @param object		Trap
 * @param array			bundles
 *
 * @return void
 */
HTMLTransport.init = function(Window, Trap = Reflex, bundles = []) {
    ENV.Window = Window;
    ENV.Trap = Trap;

    // Trap CHTML new nodes
    if (ENV.ScopedHTML) {
        ENV.ScopedHTML.params.addCallback = (newNode, scopedHTML) => {
            var _newNode;
            if (newNode.matches(ENV.params.importElement) && (_newNode = newNode.resolve())) {
                return _newNode;
            }
            return newNode;
        };
    }
    // Setup sync
    if (ENV.ScopedJS && ENV.Trap && ENV.Trap.observe) {
        ENV.ScopedJS.params.bindCallback = HTMLTransport.capture;
    }

    // ------------------
    // HTMLTransport.contentLoadedPromise
    // ------------------
    HTMLTransport.contentLoadedPromise = new Promise(resolve => {
        if (ENV.Window.document.readyState === 'complete') {
            resolve(); return;
        }
        ENV.Window.document.addEventListener('DOMContentLoaded', resolve, false);
        ENV.Window.addEventListener('load', resolve, false);
    });

    // ------------------
    // ENV.bundles
    // HTMLTransport.loadingBundlesPromise
    // ------------------
    defineBundleElements();
    HTMLTransport.contentLoadedPromise.then(() => {
        // --------------------
        if (_isFunction(bundles)) {
            bundles = bundles();
        } else if (!bundles || !bundles.length) {
            var _bundles = _arrFrom(ENV.Window.document.querySelectorAll('template[is="' + ENV.params.bundleElement + '"]')).reverse();
            bundles = _bundles.map(b => {
                if (b.hasAttribute('src') && !b.content.children.length) {
                    return new Promise(resolve => {
                        b.addEventListener('bundleloadsuccess', () => resolve(b));
                        b.addEventListener('bundleloaderror', () => resolve(b));
                    });
                }
                return b;
            });
        }
        // --------------------
        HTMLTransport.bundleMatrix = createBundleMatrix(bundles);
        HTMLTransport.bundleMatrix.loadingSources.then(() => {
            // Must come before resolveAutoImports()
            // so that resolveAutoImports calls won't throw errors
            HTMLTransport.importsReady = true;
        });	
        defineImportElements(HTMLTransport);
    });
};

/**
 * The "ready" function.
 * Calls us when it becomes safe to run bundle-related code.
 *
 * @param function			callback
 * @param bool				waitForBundles
 *
 * @return void
 */
HTMLTransport.ready = function(callback, waitForBundles = true) {
    HTMLTransport.contentLoadedPromise.then(() => {
        if (!waitForBundles) {
            callback(); return;
        }
        HTMLTransport.bundleMatrix.loadingSources.then(callback);
    });
};

/**
 * Imports a module from bundles.
 *
 * @param string						namespace
 *
 * @return HTMLElement
 */
HTMLTransport.import = function(namespace) {
    if (HTMLTransport.bundleMatrix) {
        // ------------------
        // Is someone trying to import while bundles are still loading?
        if (!HTMLTransport.importsReady && !HTMLTransport.warnedEarlyBundleAccess) {
            HTMLTransport.warnedEarlyBundleAccess = true;
            console.warn('Remote bundles are still loading at this time! You should probabbly wrap bundle-dependent code within HTMLTransport.ready(callback[, true/*waitForBundles*/]).');
        }
        return HTMLTransport.bundleMatrix.find(namespace);
    }
};

/**
 * @exports
 */
export {
    HTMLTransport as default,
    ENV,
}