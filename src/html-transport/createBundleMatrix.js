
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import recompose from './recompose.js';
import Matrix from './Matrix.js';
import ENV from './ENV.js';

/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */
export default function(bundleElements) {
	// Convert raw templates
	bundleElements = bundleElements.map(b => {
		if (!(b instanceof Promise) && !(b instanceof ENV.Window.HTMLTemplateElement)) {
			var template = ENV.Window.document.createElement('template');
			template.innerHTML = b.toString();
			b = template;
		}
		return b;
	});
	// Instantiate Matrix
	const anticyclicBundlesQuery = [];
	const bundleMatrix = new Matrix(bundleElements/*sources*/, []/*namespace*/, (bundle, namespace, superEl, bundleIndex) => {
		var _namespace = namespace.join('/');
		// ------------------
		// Is the current import process trying to be cyclic?
		// We move one-level up the namespace hierarchy.
		if (anticyclicBundlesQuery.includes(_namespace)) {
			return bundleMatrix.find(namespace.slice(0, -1).join('/'));
		}
		anticyclicBundlesQuery.push(_namespace);
		// ------------------
		// We query now...
		var CSSEscape = ENV.Window.CSS 
			? ENV.Window.CSS.escape 
			: str => str;
		var el = _arrFrom(bundle.content.children).filter(node => node.matches('[' + CSSEscape(ENV.params.namespaceAttribute) + '="' + _namespace + '"]'))[0];
		// ------------------
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
