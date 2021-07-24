
/**
 * @imports
 */
import Observer from '@webqit/observer';
import _any from '@webqit/util/arr/any.js';
import _internals from '@webqit/util/js/internals.js';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import { config } from '../util.js';

/**
 * ---------------------------
 * Namespaced HTML
 * ---------------------------
 */				

/**
 * @init
 * 
 * @param Object config
 */
export default function init(_config = null, onDomReady = false) {

    const WebQit = domInit.call(this);
    if (onDomReady) {
        WebQit.DOM.ready(() => {
            init.call(this, _config, false);
        });
        return;
    }

    const window = WebQit.window;
    const document = WebQit.window.document;
    const mutations = WebQit.DOM.mutations;

	const scopedIdInertContexts = [];
    const _meta = config.call(this, {
		attr: {
            namespace: 'namespace',
            id: 'id',
        },
        api: {
            namespace: 'namespace',
        },
    }, _config);
	
    const getNamespaceObject = function(subject) {
        if (!_internals(subject, 'oohtml').has('namespace')) {
            const namespaceObject = Object.create(null);
            _internals(subject, 'oohtml').set('namespace', namespaceObject);
            if (Observer.link) {
                Observer.link(subject, _meta.get('api.namespace'), namespaceObject);
            }
        }
        return _internals(subject, 'oohtml').get('namespace');
	};

    // ----------------------
    // Define the local "namespace" object
    // ----------------------

	if (_meta.get('api.namespace') in window.Element.prototype) {
		throw new Error('The "Element" class already has a "' + _meta.get('api.namespace') + '" property!');
	}
	Object.defineProperty(window.Element.prototype, _meta.get('api.namespace'), {
		get: function() {
			return getNamespaceObject(this);
		}
	});

    // ----------------------
    // Define the global "namespace" object
    // ----------------------

    if (_meta.get('api.namespace') in document) {
        throw new Error('The "document" object already has a "' + _meta.get('api.namespace') + '" property!');
    }
	Object.defineProperty(document, _meta.get('api.namespace'), {
		get: function() {
            return getNamespaceObject(document);
		}
	});

	// ----------------------
	// Capture scoped elements
	// ----------------------

	mutations.onPresent('[' + window.CSS.escape(_meta.get('attr.id')) + ']', el => {
		var elOohtmlObj = _internals(el, 'oohtml');
		if (elOohtmlObj.get('idAlreadyBeingWatched') || _any(scopedIdInertContexts, inertContext => el.closest(inertContext))) {
			return;
		}
		var scopedId = el.getAttribute(_meta.get('attr.id')),
			ownerRoot = el.parentNode.closest('[' + window.CSS.escape(_meta.get('attr.namespace')) + ']');
		if (!ownerRoot) {
			ownerRoot = document;
		}
		var namespaceObject = getNamespaceObject(ownerRoot);
		if (namespaceObject[scopedId] !== el) {
			Observer.set(namespaceObject, scopedId, el);
		}
		// new permanent watch
		elOohtmlObj.set('idAlreadyBeingWatched', true);
		mutations.onPresenceChange(el, (els, presence) => {
			if (presence) {
				// ONLY if I am not currently the one in place
				if (namespaceObject[scopedId] !== el) {
					Observer.set(namespaceObject, scopedId, el);
				}
			} else {
				// ONLY if I am still the one in place
				if (namespaceObject[scopedId] === el) {
					Observer.deleteProperty(namespaceObject, scopedId);
				}
			}
		});
	});
};