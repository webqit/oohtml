
/**
 * @imports
 */
import _before from '@web-native-js/commons/str/before.js';
import { window, params } from './ENV.js';
import { inherit } from './composition.js';
import { bundles } from './dom.js';

/**
 * ---------------------------
 * Defines custom elements
 * ---------------------------
 */

/**
 * Define the customized built-in template element
 * that supports remote content.
 */
window.customElements.define(params.bundleElement, class extends window.HTMLTemplateElement {

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
			if (window.fetch) {
				window.fetch(src).then(response => {
					return response.ok ? response.text() : Promise.reject(response.statusText);
				}).then(content => {
					this.innerHTML = content;
					// Dispatch the event.
					this.dispatchEvent(new window.Event('bundleloadsuccess', {
						bubbles: true,
					}));
				}).catch(error => {
					// Dispatch the event.
					console.warn('Error fetching the bundle at ' + src + '. (' + error + ')');
					this.dispatchEvent(new window.Event('bundleloaderror', {
						bubbles: true,
					}));
				});
			} else {
				setTimeout(() => {
					// Otherwise, this event will fire BEFORE the code that binds to it
					this.dispatchEvent(new window.Event('bundleloadsuccess', {
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

/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */

/**
 * Define the custom import element
 */
window.customElements.define(params.importElement, class extends window.HTMLElement {

	/**
	 * Tests if conditions are right to resolve the import.
	 *
	 * @return bool
	 */
	attemptResolve() {
		if (!this.hasAttribute('ondemand') && !this.closest('template') && !this.closest(params.importElement + '[ondemand]')) {
			bundles.ready.then(() => {
				this.resolve();
			});
		}
	}

	/**
	 * This triggers self-replacement
	 * when so defined.
	 *
	 * @return void
	 */
	connectedCallback() {
		this.processed = false;
		this.attemptResolve();
	}

	/**
	 * This triggers self-replacement
	 * when so defined.
	 *
	 * @param string	name
	 * @param string	oldValue
	 * @param string	newValue
	 *
	 * @return void
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		this.attemptResolve();
	}

	/**
	 * Attempt self-replacement if so defined.
	 *
	 * @return void
	 */
	resolve() {
		var replacement, namespace, namespaceAttr = params.namespaceAttribute;
		if ((namespace = _before(this.getAttribute(namespaceAttr) || '', '//'))
		&& (namespace !== this.__namespace)) {
			if (!(replacement = bundles.find(namespace))) {
				this.innnerText = 'No element found on the namespace "' + namespace + '"!';
			} else {
				this.__namespace = namespace;
				var resolved = inherit(this, replacement);
				if (this.parentNode) {
					if (this.hasAttribute('shadow')) {
						if (!this.parentNode.shadowRoot) {
							this.parentNode.attachShadow({mode: 'open'});
						} 
						this.parentNode.shadowRoot.append(resolved);
						this.remove();
					} else {
						this.replaceWith(resolved);
					}
				}
				resolved.setAttribute('autoimported', 'true');
				resolved.dispatchEvent(new window.Event('imported', {
					bubbles:true,
				}));
				return resolved;
			}
		}
	}

	/**
	 * The attributes we want to observe.
	 *
	 * @return array
	 */
	static get observedAttributes() {
		return ['ondemand', params.namespaceAttribute];
	}
});