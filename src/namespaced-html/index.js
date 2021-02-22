
/**
 * @imports
 */
import DOMInit from '@webqit/browser-pie/src/dom/index.js';
import _any from '@webqit/util/arr/any.js';
import { getOohtmlBase, objectUtil, createParams } from '../util.js';

/**
 * ---------------------------
 * Namespaced HTML
 * ---------------------------
 */				

/**
 * @init
 * 
 * @param window window
 */
export default async function init(window, config = null) {

	const Ctxt = DOMInit(window);
	const scopedIdInertContexts = [];
    const _objectUtil = objectUtil.call(Ctxt);
    const _meta = await createParams.call(Ctxt, {
		attr: {
            namespace: 'namespace',
            id: 'id',
        },
        api: {
            namespace: 'namespace',
        },
    }, config);
	
    const getNamespaceObject = function(subject) {
        if (!getOohtmlBase(subject).namespace) {
            const namespaceObject = {};
            getOohtmlBase(subject).namespace = namespaceObject;
            if (Ctxt.Observer.link) {
                Ctxt.Observer.link(subject, _meta.api.namespace, namespaceObject);
            }
        }
        return getOohtmlBase(subject).namespace;
	};

    // ----------------------
    // Define the local "namespace" object
    // ----------------------

	if (_meta.api.namespace in Ctxt.window.Element.prototype) {
		throw new Error('The "Element" class already has a "' + _meta.api.namespace + '" property!');
	}
	Object.defineProperty(Ctxt.window.Element.prototype, _meta.api.namespace, {
		get: function() {
			return getNamespaceObject(this);
		}
	});

    // ----------------------
    // Define the global "namespace" object
    // ----------------------

    if (_meta.api.namespace in Ctxt.window.document) {
        throw new Error('The "document" object already has a "' + _meta.api.namespace + '" property!');
    }
	Object.defineProperty(Ctxt.window.document, _meta.api.namespace, {
		get: function() {
            return getNamespaceObject(Ctxt.window.document);
		}
	});

	// ----------------------
	// Capture scoped elements
	// ----------------------

	Ctxt.Mutation.onPresent('[' + Ctxt.window.CSS.escape(_meta.attr.id) + ']', el => {
		var elOohtmlObj = getOohtmlBase(el);
		if (elOohtmlObj.idAlreadyBeingWatched || _any(scopedIdInertContexts, inertContext => el.closest(inertContext))) {
			return;
		}
		var scopedId = el.getAttribute(_meta.attr.id),
			ownerRoot = el.parentNode.closest('[' + Ctxt.window.CSS.escape(_meta.attr.namespace) + ']');
		if (!ownerRoot) {
			ownerRoot = Ctxt.window.document;
		}
		var namespaceObject = getNamespaceObject(ownerRoot);
		if (namespaceObject[scopedId] !== el) {
			_objectUtil.setVal(namespaceObject, scopedId, el);
		}
		// new permanent watch
		elOohtmlObj.idAlreadyBeingWatched = true;
		Ctxt.Mutation.onPresenceChange(el, (els, presence) => {
			if (presence) {
				// ONLY if I am not currently the one in place
				if (namespaceObject[scopedId] !== el) {
					_objectUtil.setVal(namespaceObject, scopedId, el);
				}
			} else {
				// ONLY if I am still the one in place
				if (namespaceObject[scopedId] === el) {
					_objectUtil.delVal(namespaceObject, scopedId);
				}
			}
		});
	});
};