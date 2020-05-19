
/**
 * @imports
 */
import _before from '@web-native-js/commons/str/before.js';
import recompose from './recompose.js';
import ENV from './ENV.js';

/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */
export default function(HTMLTransport) {

	/**
	 * Define the custom import element
	 */
	ENV.Window.customElements.define(ENV.params.importElement, class extends ENV.Window.HTMLElement {
	
		/**
		 * Tests if conditions are right to resolve the import.
		 *
		 * @return bool
		 */
		attemptResolve() {
			if (!this.hasAttribute('ondemand') && !this.closest('template') && !this.closest(ENV.params.importElement + '[ondemand]')) {
				HTMLTransport.bundleMatrix.loadingSources.then(() => {
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
			if (!this.parentNode) {
				return false;
			}
			var replacement, namespace, namespaceAttr = ENV.params.namespaceAttribute;
			if ((namespace = _before(this.getAttribute(namespaceAttr) || '', '//'))
			&& (namespace !== this.__namespace)) {
				if (!HTMLTransport.bundleMatrix || !(replacement = HTMLTransport.import(namespace))) {
					this.innnerText = 'No element found on the namespace "' + namespace + '"!';
				} else {
					this.__namespace = namespace;
					var resolved = recompose(replacement, this);
					if (this.hasAttribute('shadow')) {
						if (!this.parentNode.shadowRoot) {
							this.parentNode.attachShadow({mode: 'open'});
						} 
						this.parentNode.shadowRoot.append(resolved);
						this.remove();
					} else {
						this.replaceWith(resolved);
					}
					resolved.setAttribute('autoimported', 'true');
					resolved.dispatchEvent(new ENV.Window.Event('imported', {
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
			return ['ondemand', ENV.params.namespaceAttribute];
		}
	});
};
