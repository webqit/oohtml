
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _before from '@web-native-js/commons/str/before.js';
import _after from '@web-native-js/commons/str/after.js';
import { mergePartials } from '../html-partials/composition.js';
import { ready, CSSEscape } from '../dom.js';
import Matrix from './Matrix.js';
import ENV from '../html-partials/ENV.js';


/**
 * @init
 */
var bundlesAPI;
export default function() {
	if (bundlesAPI) {
		return bundlesAPI;
	}
		
	/**
	 * Define the customized built-in template element
	 * that supports remote content.
	 */
	ENV.window.customElements.define(ENV.params.bundleElement, class extends ENV.window.HTMLTemplateElement {

		/**
		 * Loads the bundle's templates into a public property.
		 *
		 * @return void
		 */
		get templates() {
			if (!this.__templates) {
				this.__templates = {};
				_arrFrom(this.content.children).forEach(el => {
					if (el.matches(ENV.params.templateElement + '[' + CSSEscape(ENV.params.templateNamespaceAttribute) + ']')) {
						var templateNamespace = el.getAttribute(ENV.params.templateNamespaceAttribute) || '';
						this.__templates[templateNamespace] = el;
					}
				});
			}
			return this.__templates;
		}	

		/**
		 * This handles both triggers remote loading
		 * when so defined.
		 *
		 * @param string	name
		 * @param string	oldValue
		 * @param string	newValue
		 *
		 * @return void
		 */
		attributeChangedCallback(name, oldValue, newValue) {
			if (newValue) {
				delete this.__templates;
				this.load();
			}
		}

		/**
		 * Attempt to load remote content if so defined.
		 *
		 * @return void
		 */
		load() {
			var src = this.getAttribute('src');
			if (src && this.content.children.length) {
				console.warn('A CHTML bundle must define only either a remote content or local content! Bundle ignored.');
			}
			if (src) {
				// Missing in jsdom
				if (ENV.window.fetch) {
					ENV.window.fetch(src).then(response => {
						return response.ok ? response.text() : Promise.reject(response.statusText);
					}).then(content => {
						this.innerHTML = content;
						this.removeAttribute('src');
						// Dispatch the event.
						this.dispatchEvent(new ENV.window.Event('bundleloadsuccess', {
							bubbles: true,
						}));
					}).catch(error => {
						// Dispatch the event.
						console.warn('Error fetching the bundle at ' + src + '. (' + error + ')');
						this.dispatchEvent(new ENV.window.Event('bundleloaderror', {
							bubbles: true,
						}));
					});
				} else {
					setTimeout(() => {
						// Otherwise, this event will fire BEFORE the code that binds to it
						this.dispatchEvent(new ENV.window.Event('bundleloadsuccess', {
							bubbles: true,
						}));
					}, 0);
				}
			}
		}

		/**
		 * The attributes we want to observe.
		 *
		 * @return array
		 */
		static get observedAttributes() {
			return ['src'];
		}
	}, {extends: 'template'});

	// ------------------
	// bundles
	// ------------------

	var bundleElementsPromise = new Promise((resolve, reject) => {
		ready(() => {
			var bundles = _arrFrom(ENV.window.document.querySelectorAll('template[is="' + ENV.params.bundleElement + '"]')).reverse();
			resolve(bundles.map(b => {
				if (b.hasAttribute('src') && !b.content.children.length) {
					return new Promise(resolve => {
						b.addEventListener('bundleloadsuccess', () => resolve(b));
						b.addEventListener('bundleloaderror', () => resolve(b));
					});
				}
				return b;
			}));
		});
	});

	// Instantiate Matrix
	var warnedEarlyBundleAccess, anticyclicBundlesQuery = [];
	bundlesAPI = new Matrix(bundleElementsPromise/*sources*/, []/*importId*/, (bundle, importId, superExportElement, bundleIndex) => {
		// Is someone trying to import while bundles are still loading?
		if (!bundlesAPI.isReady && !warnedEarlyBundleAccess) {
			warnedEarlyBundleAccess = true;
			console.warn('Remote bundles are still loading at this time! You should probabbly wrap bundle-dependent code within document.partials.ready(callback).');
		}
		// ------------------
		var _templateId = importId.filter(a => a).join('/'), partialId;
		if (_templateId.indexOf('#') > -1) {
			partialId = _after(_templateId, '#');
			_templateId = _before(_templateId, '#');
		}
		// ------------------
		// Is the current import process trying to be cyclic?
		// We move one-level up the importId hierarchy.
		if (anticyclicBundlesQuery.includes(_templateId)) {
			return bundlesAPI.find(importId.slice(0, -1).join('/'));
		}
		anticyclicBundlesQuery.push(_templateId);
		// ------------------
		// We query now...
		var templateElement = bundle.templates ? bundle.templates[_templateId] : null;
		// ------------------
		if (templateElement && superExportElement) {
			try {
				var noinherit = [];
				if (bundle.hasAttribute('noinherit')) {
					noinherit = (bundle.getAttribute('noinherit') || '*').split(' ').map(val => val.trim());
				}
				templateElement = mergePartials(templateElement, superExportElement, noinherit);
			} catch(e) {
				console.error('[Inheritance error at source #' + bundleIndex + ']: ' + e.message);
			}
			anticyclicBundlesQuery.pop();
			return templateElement;
		}
		// ------------------
		// Update cyclicism... lol
		anticyclicBundlesQuery.pop();
		// ------------------
		// If there was no template with the requested namespace
		// we return the super template
		var result = templateElement ? templateElement.cloneNode(true) : (
			superExportElement ? superExportElement.cloneNode(true) : null
		);

		// It's slottable selection?
		if (partialId) {
			return _arrFrom(result.children).filter(el => el.matches('[' + CSSEscape(ENV.params.partialIdAttribute) + '="' + partialId + '"]'))[0];
		}
		return result;

	}/*getter*/);

	return bundlesAPI;
};
