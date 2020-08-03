
/**
 * @imports
 */
import JSEN, { Block } from '@web-native-js/jsen';
import _merge from '@web-native-js/commons/obj/merge.js';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _any from '@web-native-js/commons/arr/any.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import { window, trap, params, globals, initials } from './ENV.js';
import Scope from './Scope.js';
import liveQuery from '../liveQuery.js/index.js';

/**
 * ---------------------------
 * The ScopedJS class
 * ---------------------------
 */				

export default class ScopedJS {
    static parse(script, _params = {}) {
        var AST;
        if (!(AST = JSEN.parse(script, [Block], _merge({assert:false}, _params)))) {
            AST = new Block([JSEN.parse(script, null, _params)]);
        }
        return AST;
    }
};

// ----------------------
// Init with globals and initials
// ----------------------

var preInitList = [];
export function run(_globals = {}, _initials = {}) {
    _merge(globals, _globals);
    _merge(initials, _initials);
    if (preInitList) {
        preInitList.forEach(applyBinding);
        preInitList = null;
    }
};

/**
 * @exports
 */
export {
    params,
    globals,
    initials,
};

/**
 * @init
 */

// ----------------------
// Capture scripts
// ----------------------

const scriptElementsCallback = callback => {
    var notify = () => query().forEach(callback);
    var query = () => {
        return _arrFrom(window.document.scripts)
        .filter(script => script.matches(params.scriptElement) && !script['.scopedJS-scooped'] && !_any(params.inertContexts, innertContext => script.closest(innertContext)))
        .map(script => {
            script['.scopedJS-scooped'] = true;
            return script;
        });
    };
    // Document-readiness
    window.document.addEventListener('DOMContentLoaded', () => setTimeout(notify, 0), false);
    if (window.document.readyState === 'complete') {
        notify();
    }
    // On new scripts
    if (window && window.MutationObserver) {
        var observer = new window.MutationObserver(() => notify());
        observer.observe(window.document, {childList: true, subtree: true,});
    }
};

// ----------------------
// Helpers
// ----------------------

const getBase = function(target) {
    if (!target['.scopedJS']) {
        var base = {};
        Object.defineProperty(target, '.scopedJS', {
            get: function() {
                return base
            },
        })
    }
    return target['.scopedJS'];
};

const applyBinding = function(target) {
    var targetBase = getBase(target);
    if (targetBase.AST) {
        // --------
        // Create eval scope...
        var _super = {
            main: {}, 
            super: globals,
        };
        if (trap) {
            trap.set(_super.main, 'this', target);
        } else {
            _super.main['this'] = target;
        }
        var _main = {
            main: targetBase.binding, 
            super: new Scope(_super),
        };
        var scope = new Scope(_main);
        // --------
        var returnValue;
        if (params.silentMode) {
            try {
                returnValue = targetBase.AST.eval(scope, trap);
            } catch(e) {}
        } else {
            returnValue = targetBase.AST.eval(scope, trap);
        }
        if (_isFunction(returnValue)) {
            returnValue(targetBase.binding);
        }
    }
};

// ----------------------
// Run
// ----------------------

liveQuery(params.scriptElement, (script, connectedState) => {
    if (connectedState && _any(params.innertContexts, innertContext => script.closest(innertContext))) {
		return;
	}
    var srcCode;
    if (getBase(scriptElement.parentNode).AST) {
        throw new Error('An element must only have one scopedJS instance!');
    }
    if (!(script = (scriptElement.textContent || '').trim())) {
        return;
    }
    // Parse
    var ownBase = getBase(scriptElement.parentNode);
    ownBase.AST = ScopedJS.parse(script);
    if (!('binding' in ownBase)) {
        ownBase.binding = initials;
    }
    if (preInitList) {
        preInitList.push(scriptElement.parentNode);
    } else {
        applyBinding(scriptElement.parentNode);
    }
    // Remove
    if (!params.keepAlive) {
        scriptElement.remove();
    } 
});

// ----------------------
// Define the bind() method
// ----------------------

if (!window || !('Element' in window)) {
    throw new Error('The "Element" class not found in global context!');
}
if (params.bindMethodName in window.Element.prototype) {
    throw new Error('The "Element" class already has a "' + params.bindMethodName + '" property!');
}
Object.defineProperty(window.Element.prototype, params.bindMethodName, {
    value: function(binding) {
        var ownBase = getBase(this);
        var _binding = ownBase.binding;
        ownBase.binding = binding;
        applyBinding(this);
        if (params.bindCallback) {
            params.bindCallback(this, binding, _binding);
        }
    }
});
Object.defineProperty(window.Element.prototype, params.unbindMethodName, {
    value: function() {
        var ownBase = getBase(this);
        var _binding = ownBase.binding;
        ownBase.binding = {};
        applyBinding(this);
        if (params.unbindCallback) {
            params.unbindCallback(this, _binding);
        }
    }
});