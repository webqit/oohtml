
/**
 * @imports
 */
import _before from '@web-native-js/commons/str/before.js';
import recompose from './recompose.js';
import globalParams from '../params.js';

/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */
export default function(loadingBundlesPromise) {
	
	const Window = globalParams.context;
				
	/**
	 * Define the custom import element
	 */
	Window.customElements.define(globalParams.tagMap.import, class extends Window.HTMLElement {
	
		/**
		 * Tests if conditions are right to resolve the import.
		 *
		 * @return bool
		 */
		shouldResolve() {
			return !this.hasAttribute('ondemand')
				&& !this.closest('template')
				&& !this.closest(globalParams.tagMap.import + '[ondemand]');
		}
	
		/**
		 * This triggers self-replacement
		 * when so defined.
		 *
		 * @return void
		 */
		connectedCallback() {
			this.processed = false;
			if (this.shouldResolve()) {
				this.resolve();
			}
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
			if (this.shouldResolve()) {
				this.resolve();
			}
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
			loadingBundlesPromise.then(() => {
				var replacement, namespace, namespaceAttr = globalParams.attrMap.namespace;
				if ((namespace = _before(this.getAttribute(namespaceAttr) || '', '//'))
				&& (namespace !== this.__namespace)) {
					this.__namespace = namespace;
					if (!globalParams.bundles || !(replacement = globalParams.bundles.find(namespace))) {
						this.innnerText = 'No element found on the namespace "' + namespace + '"!';
					} else {
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
					}
				}
			});
		}
	
		/**
		 * The attributes we want to observe.
		 *
		 * @return array
		 */
		static get observedAttributes() {
			return ['ondemand', globalParams.attrMap.namespace];
		}
	});
};
