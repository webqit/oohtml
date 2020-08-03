
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import { window, params } from './ENV.js';
import { inherit } from './composition.js';
import Matrix from './Matrix.js';

/**
 * ---------------------------
 * DOM access
 * ---------------------------
 */

// ------------------
// ready
// ------------------
const ready = new Promise(resolve => {
    if (window.document.readyState === 'complete') {
        resolve(window.document); return;
    }
    window.document.addEventListener('DOMContentLoaded', () => resolve(window.document), false);
    window.addEventListener('load', () => resolve(window.document), false);
});

// ------------------
// bundles
// ------------------
var bundleElementsPromise = ready.then(() => {
    var bundles = _arrFrom(window.document.querySelectorAll('template[is="' + params.bundleElement + '"]')).reverse();
    return bundles.map(b => {
        if (b.hasAttribute('src') && !b.content.children.length) {
            return new Promise(resolve => {
                b.addEventListener('bundleloadsuccess', () => resolve(b));
                b.addEventListener('bundleloaderror', () => resolve(b));
            });
        }
        return b;
    });
});

// Instantiate Matrix
var warnedEarlyBundleAccess, anticyclicBundlesQuery = [];
var bundles = new Matrix(bundleElementsPromise/*sources*/, []/*namespace*/, (bundle, namespace, superEl, bundleIndex) => {
	// Is someone trying to import while bundles are still loading?
	if (!bundles.isReady && !warnedEarlyBundleAccess) {
		warnedEarlyBundleAccess = true;
		console.warn('Remote bundles are still loading at this time! You should probabbly wrap bundle-dependent code within HTMLPartials.ready(callback[, true/*waitForBundles*/]).');
	}
	// ------------------
	var _namespace = namespace.join('/');
	// ------------------
	// Is the current import process trying to be cyclic?
	// We move one-level up the namespace hierarchy.
	if (anticyclicBundlesQuery.includes(_namespace)) {
		return bundles.find(namespace.slice(0, -1).join('/'));
	}
	anticyclicBundlesQuery.push(_namespace);
	// ------------------
	// We query now...
	var CSSEscape = window.CSS 
		? window.CSS.escape 
		: str => str;
	var el = _arrFrom(bundle.content.children).filter(node => node.matches('[' + CSSEscape(params.namespaceAttribute) + '="' + _namespace + '"]'))[0];
	// ------------------
	if (el && superEl && inherit) {
		try {
			var noinherit = [];
			if (bundle.hasAttribute('noinherit')) {
				noinherit = (bundle.getAttribute('noinherit') || '*').split(' ').map(val => val.trim());
			}
			el = inherit(el, superEl, noinherit);
		} catch(e) {
			console.error('[Inheritance error at source #' + bundleIndex + ']: ' + e.message);
		}
		anticyclicBundlesQuery.pop();
		return el;
	}
	// ------------------
	// Update cyclicism... lol
	anticyclicBundlesQuery.pop();
	// ------------------
	// If there was no module with the requested namespace
	// we return the super module
	return el ? el.cloneNode(true) : (
		superEl ? superEl.cloneNode(true) : null
	);
}/*getter*/);

/**
 * @exports
 */
export {
	ready,
	bundles,
};
