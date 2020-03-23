
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
export default function() {
	
	const Window = globalParams.context;

	/**
	 * Define the customized built-in template element
	 * that supports remote content.
	 */
	Window.customElements.define(globalParams.attrMap.bundle, class extends Window.HTMLTemplateElement {
	
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
			} else if (src) {
				// Missing in jsdom
				if (Window.fetch) {
					Window.fetch(src).then(response => {
						return response.ok ? response.text() : Promise.reject(response.statusText);
					}).then(content => {
						this.innerHTML = content;
						// Dispatch the event.
						this.dispatchEvent(new Window.Event('bundleloadsuccess'));
					}).catch(error => {
						// Dispatch the event.
						console.warn('Error fetching the bundle at ' + src + '. (' + error + ')');
						this.dispatchEvent(new Window.Event('bundleloaderror'));
					});
				} else {
					setTimeout(() => {
						// Otherwise, this event will fire BEFORE the code that binds to it
						this.dispatchEvent(new Window.Event('bundleloadsuccess'));
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
};
