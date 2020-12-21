
/**
 * @imports
 */
import DOMInit from '@webqit/browser-pie/src/dom/index.js';
import { getOohtmlBase, objectUtil, createParams } from '../util.js';

/**
 * ---------------------------
 * The State API
 * ---------------------------
 */				

/**
 * @init
 * 
 * @param window window
 */
export default async function init(window, config = null) {

    const Ctxt = DOMInit(window);
    const _objectUtil = objectUtil.call(Ctxt);
    const _meta = await createParams.call(Ctxt, {
        api: {state: 'state', setState: 'setState', clearState: 'clearState',},
    }, config);

    const getOrCreateState = function(subject, newStateObject = null) {
        if (!getOohtmlBase(subject).state || newStateObject) {
            const stateObject = newStateObject || {};
            const prevStateObject = getOohtmlBase(subject).state;
            getOohtmlBase(subject).state = stateObject;
            if (prevStateObject && Ctxt.Observer.unlink) {
                Ctxt.Observer.unlink(subject, _meta.api.state, prevStateObject);
            }
            if (Ctxt.Observer.link) {
                let event = newStateObject ? {isUpdate: prevStateObject ? true : false, oldValue: prevStateObject} : null;
                Ctxt.Observer.link(subject, _meta.api.state, stateObject, event);
            }
        }
        return getOohtmlBase(subject).state;
    };

    // ----------------------
    // Define the "local" state property on Element.prototype
    // ----------------------

    if (_meta.api.state in Ctxt.window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.api.state + '" property!');
    }
	Object.defineProperty(Ctxt.window.Element.prototype, _meta.api.state, {
		get: function() {
            return Ctxt.Observer.proxy(getOrCreateState(this));
		}
	});

    // ----------------------

    if (_meta.api.setState in Ctxt.window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.api.setState + '" property!');
    }
    Object.defineProperty(Ctxt.window.Element.prototype, _meta.api.setState, {
        value: function(stateObject, params = {}) {
            if (params.update) {
                _objectUtil.mergeVal(getOrCreateState(this), stateObject);
            } else {
                getOrCreateState(this, stateObject);
            }
        }
    });

    // ----------------------

    if (_meta.api.clearState in Ctxt.window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.api.clearState + '" property!');
    }
    Object.defineProperty(Ctxt.window.Element.prototype, _meta.api.clearState, {
        value: function() {
            getOrCreateState(this, {});
        }
    });

    // ----------------------
    // Define the global "state" object
    // ----------------------

    if (_meta.api.state in Ctxt.window.document) {
        throw new Error('The "document" object already has a "' + _meta.api.state + '" property!');
    }
	Object.defineProperty(Ctxt.window.document, _meta.api.state, {
		get: function() {
            return Ctxt.Observer.proxy(getOrCreateState(Ctxt.window.document));
		}
	});

    // ----------------------

    if (_meta.api.setState in Ctxt.window.document) {
        throw new Error('The "document" object already has a "' + _meta.api.setState + '" property!');
    }
    Object.defineProperty(Ctxt.window.document, _meta.api.setState, {
        value: function(stateObject, params = {}) {
            if (params.update) {
                _objectUtil.mergeVal(getOrCreateState(Ctxt.window.document), stateObject);
            } else {
                getOrCreateState(Ctxt.window.document, stateObject);
            }
        }
    });

    // ----------------------

    if (_meta.api.clearState in Ctxt.window.document) {
        throw new Error('The "document" object already has a "' + _meta.api.clearState + '" property!');
    }
    Object.defineProperty(Ctxt.window.document, _meta.api.clearState, {
        value: function() {
            getOrCreateState(Ctxt.window.document, {});
        }
    });
};