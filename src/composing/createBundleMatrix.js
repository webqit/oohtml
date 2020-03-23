
/**
 * @imports
 */
import _divide from '@web-native-js/commons/arr/divide.js';
import globalParams from '../params.js';
import recompose from './recompose.js';
import Matrix from './Matrix.js';

/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */
export default function(bundleElements, promiseReciever = null) {
	
	var [loadingBundles, readyBundles] = _divide(bundleElements, b => b instanceof Promise);
	const loadingBundlesPromise = Promise.all(loadingBundles).then(fetchedBundles => {
		readyBundles.push(...fetchedBundles);
		loadingBundles = [];
	});
	if (promiseReciever) {
		promiseReciever(loadingBundlesPromise);
	}
	var warnedEarlyBundleAccess;
	const anticyclicBundlesQuery = [];
	const bundleMatrix = new Matrix(readyBundles/*sources*/, []/*namespace*/, (bundle, namespace, superEl, bundleIndex) => {
		var _namespace = namespace.join('/');
		// ------------------
		// Is the current import process trying to be cyclic?
		// We move one-level up the namespace hierarchy.
		if (anticyclicBundlesQuery.includes(_namespace)) {
			return bundleMatrix.find(namespace.slice(0, -1).join('/'));
		}
		anticyclicBundlesQuery.push(_namespace);
		// ------------------
		// Is someone trying to import while bundles are still loading?
		if (loadingBundles.length && !warnedEarlyBundleAccess) {
			warnedEarlyBundleAccess = true;
			console.warn('Remote bundles are still loading at this time! You should probabbly wrap bundle-dependent code within Chtml.ready(callback[, true/*waitForBundles*/]).');
		}
		// ------------------
		// We query now...
		var CSSEscape = globalParams.context.CSS 
			? globalParams.context.CSS.escape 
			: str => str;
		var el = bundle.content.querySelector('[' + CSSEscape(globalParams.attrMap.namespace) + '="' + _namespace + '"]');

		if (el && superEl) {
			try {
				var norecompose = [];
				if (bundle.hasAttribute('norecompose')) {
					norecompose = (bundle.getAttribute('norecompose') || '*').split(' ').map(val => val.trim());
				}
				el = recompose(superEl, el, 'prepend', norecompose);
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
	
	return bundleMatrix;
};
