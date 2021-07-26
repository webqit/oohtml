
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { _difference } from '@webqit/util/arr/index.js';
import { _internals } from '@webqit/util/js/index.js';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import { config } from '../util.js';

/**
 * ---------------------------
 * The State API
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

    const _meta = config.call(this, {
        api: {state: 'state', setState: 'setState', clearState: 'clearState',},
    }, _config);

    const getOrCreateState = function(subject, newStateObject = null) {
        if (!_internals(subject, 'oohtml').has('state') || newStateObject) {
            const stateObject = newStateObject || Object.create(null);
            const prevStateObject = _internals(subject, 'oohtml').get('state');
            _internals(subject, 'oohtml').set('state', stateObject);
            if (prevStateObject && Observer.unlink) {
                Observer.unlink(subject, _meta.get('api.state'), prevStateObject);
            }
            if (Observer.link) {
                let event = newStateObject ? {isUpdate: prevStateObject ? true : false, oldValue: prevStateObject} : null;
                Observer.link(subject, _meta.get('api.state'), stateObject, event);
            }
        }
        return _internals(subject, 'oohtml').get('state');
    };

    // ----------------------
    // Define the "local" state property on Element.prototype
    // ----------------------

    if (_meta.get('api.state') in window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.get('api.state') + '" property!');
    }
	Object.defineProperty(window.Element.prototype, _meta.get('api.state'), {
		get: function() {
            return Observer.proxy(getOrCreateState(this));
		}
	});

    // ----------------------

    if (_meta.get('api.setState') in window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.get('api.setState') + '" property!');
    }
    Object.defineProperty(window.Element.prototype, _meta.get('api.setState'), {
        value: function(stateObject, params = {}) {
            if (!params.update) {
                getOrCreateState(this, stateObject);
            } else {
                var currentStateObject = getOrCreateState(this);
                if (params.update !== 'merge') {
                    var outgoingKeys = _difference(Object.keys(currentStateObject), Object.keys(stateObject));
                    Observer.deleteProperty(currentStateObject, outgoingKeys);
                }
                Observer.set(currentStateObject, stateObject);
            }
        }
    });

    // ----------------------

    if (_meta.get('api.clearState') in window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.get('api.clearState') + '" property!');
    }
    Object.defineProperty(window.Element.prototype, _meta.get('api.clearState'), {
        value: function() {
            getOrCreateState(this, {});
        }
    });

    // ----------------------
    // Define the global "state" object
    // ----------------------

    if (_meta.get('api.state') in document) {
        throw new Error('The "document" object already has a "' + _meta.get('api.state') + '" property!');
    }
	Object.defineProperty(document, _meta.get('api.state'), {
		get: function() {
            return Observer.proxy(getOrCreateState(document));
		}
	});

    // ----------------------

    if (_meta.get('api.setState') in document) {
        throw new Error('The "document" object already has a "' + _meta.get('api.setState') + '" property!');
    }
    Object.defineProperty(document, _meta.get('api.setState'), {
        value: function(stateObject, params = {}) {
            if (!params.update) {
                getOrCreateState(document, stateObject);
            } else {
                var currentStateObject = getOrCreateState(document);
                if (params.update !== 'merge') {
                    var outgoingKeys = _difference(Object.keys(currentStateObject), Object.keys(stateObject));
                    Observer.deleteProperty(currentStateObject, outgoingKeys);
                }
                Observer.set(currentStateObject, stateObject);
            }
        }
    });

    // ----------------------

    if (_meta.get('api.clearState') in document) {
        throw new Error('The "document" object already has a "' + _meta.get('api.clearState') + '" property!');
    }
    Object.defineProperty(document, _meta.get('api.clearState'), {
        value: function() {
            getOrCreateState(document, {});
        }
    });
};