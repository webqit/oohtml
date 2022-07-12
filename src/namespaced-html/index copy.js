
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { _any, _from as _arrFrom } from '@webqit/util/arr/index.js';
import { _isString, _internals } from '@webqit/util/js/index.js';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import { config } from '../namespace-ql.js';

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
export default function init( _config = {} ) {

    const WebQit = domInit.call( this );
    if ( _config.onDomReady ) {
        WebQit.DOM.ready( () => {
            init.call( this, { ..._config, onDomReady: false } );
        } );
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
		eagermode: true,
    }, _config.params );
	
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
	
    const getPublicNamespaceObject = function(subject) {
        if (!_internals(subject, 'oohtml').has('publicNamespace')) {
            const namespaceObject = getNamespaceObject(subject);
            _internals(subject, 'oohtml').set('publicNamespace', !_meta.get('eagermode') ? namespaceObject : new Proxy(namespaceObject, {
				get(target, name) {
					if (_isString(name) && !namespaceObject[name]) {
						var node = _arrFrom(subject.querySelectorAll('[' + window.CSS.escape(_meta.get('attr.id')) + '="' + name + '"]')).filter(node => {
							var ownerRoot = node.parentNode.closest('[' + window.CSS.escape(_meta.get('attr.namespace')) + ']');
							if (subject === document) {
								// Only IDs without a scope actually belong to the document scope
								return !ownerRoot;
							}
							return ownerRoot === subject;
						})[0];
						if (node) {
							Observer.set(namespaceObject, name, node);
						}
					}
					return namespaceObject[name];
				}
			}));
        }
        return _internals(subject, 'oohtml').get('publicNamespace');
	};

    // ----------------------
    // Define the local "namespace" object
    // ----------------------

	if (_meta.get('api.namespace') in window.Element.prototype) {
		throw new Error('The "Element" class already has a "' + _meta.get('api.namespace') + '" property!');
	}
	Object.defineProperty(window.Element.prototype, _meta.get('api.namespace'), {
		get: function() {
			return getPublicNamespaceObject(this);
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
            return getPublicNamespaceObject(document);
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