
/**
 * @imports
 */
import JSEN, { Block } from '@web-native-js/jsen';
import { onPresent } from '@onephrase/util/dom/mutation.js';
import _merge from '@onephrase/util/obj/merge.js';
import _arrFrom from '@onephrase/util/arr/from.js';
import _remove from '@onephrase/util/arr/remove.js';
import _any from '@onephrase/util/arr/any.js';
import _isFunction from '@onephrase/util/js/isFunction.js';
import { meta } from '../dom.js';
import Scope from './Scope.js';
import ENV from './ENV.js';

/**
 * @ENV
 */
export {
    ENV,
};

/**
 * ---------------------------
 * The ScopedJS class
 * ---------------------------
 */				
export class ScopedJS {
    static parse(script, params = {}) {
        var AST;
        if (!(AST = JSEN.parse(script, [Block], _merge({assert:false}, params)))) {
            AST = new Block([JSEN.parse(script, null, params)]);
        }
        return AST;
    }
};

/**
 * @init
 */
var _window;
export function init(params = {}, window = null, trap = null) {
    if (params) {
        _merge(ENV.params, params);
    }
    if (window && window === _window) {
        // We could be called
        // just for "params"
        return;
    }
    if (_window) {
        throw new Error('"init()" already called with a window!');
    }
    ENV.window = window;
    _window = window;
    if (trap) {
        ENV.trap = trap;
    }

    const isIsomorphic = meta('isomorphic') === true || meta('isomorphic') === 1;
    var globalRuntimeInitializationWaitlist = [], globalRuntimeInitialized = meta('script-autorun');

    // ----------------------
    // Helpers
    // ----------------------

    const getVal = (target, key) => {
        if (ENV.trap) {
            return ENV.trap.get(target, key);
        }
        return target[key];
    };

    const setVal = (target, key, value) => {
        if (ENV.trap) {
            ENV.trap.set(target, key, value);
        } else {
            target[key] = value;
        }
        return target;
    };

    const mergeVal = (target, value) => {
        if (ENV.trap) {
            ENV.trap.set(target, value);
        } else {
            Object.keys(value).forEach(key => {
                target[key] = value[key];
            });
        }
        return target;
    };

    const getScriptBase = function(target) {
        if (!target['.chtml']) {
            target['.chtml'] = {};
        }
        if (!target['.chtml'].scopedJS) {
            // Create scope
            target['.chtml'].scopedJS = {
                scope: new Scope(setVal({
                    super: new Scope(setVal({
                        super: globalScopeInstance,
                    }, 'main', setVal({}, 'this', target))),
                }, 'main', {})),
            };
            // Watch scope
            target['.chtml'].scopedJS.scope.observe(ENV.trap, e => {
                if (!target['.chtml'].scopedJS.inWaitlist) {
                    applyBinding(target, e);
                }
            });
        }
        return target['.chtml'].scopedJS;
    };

    const applyBinding = function(target, event) {
        var targetScriptBase = getScriptBase(target);
        targetScriptBase.inWaitlist = false;
        var params = {
            references: (event || {}).references, 
            catch: e => {
                if (targetScriptBase.errorLevel === 2) {
                    console.error(target, e);
                } else if (targetScriptBase.errorLevel !== 0) {
                    console.warn(target, e.message);
                }
            },
            trap: ENV.trap,
        };
        if (targetScriptBase.AST) {
            var returnValue = targetScriptBase.AST.eval(targetScriptBase.scope, params);
            if (_isFunction(returnValue)) {
                returnValue(targetScriptBase.scope.stack.main);
            }
        }
    };

    const globalScopeInstance = new Scope(setVal({}, 'main', {}), {
        errorLevel:ENV.params.errorLevel,
    });

    // ----------------------
    // Capture scripts
    // ----------------------

    onPresent(ENV.params.scriptElement, scriptElement => {
        if (_any(ENV.params.inertContexts, inertContext => scriptElement.closest(inertContext))) {
            return;
        }
        // Remove
        var srcCode, parentNode = scriptElement.parentNode, scriptBase = getScriptBase(parentNode);
        if (!isIsomorphic) {
            scriptElement.remove();
        }
        if (scriptBase.scriptElement === scriptElement) {
            return;
        } else if (scriptBase.scriptElement) {
            throw new Error('An element must only have one scopedJS instance!');
        }
        scriptBase.scriptElement = scriptElement;
        if (!(srcCode = (scriptElement.textContent || '').trim())) {
            return;
        }
        // ------
        // Parse
        // ------
        var explain = [], shouldExplain = scriptElement.hasAttribute('explain') || meta('script-explain');
        scriptBase.AST = ScopedJS.parse(srcCode, {
            explain: shouldExplain ? explain : null,
        });
        if (shouldExplain) {
            console.log(parentNode, explain);
        }
        // ------
        // Eval
        // ------
        scriptBase.errorLevel = scriptElement.getAttribute('errors') 
            ? parseInt(scriptElement.getAttribute('errors'))
            : meta('script-errors');
        if (globalRuntimeInitialized || scriptBase.hasBindings || scriptElement.hasAttribute('autorun')) {
            applyBinding(parentNode);
        } else {
            scriptBase.inWaitlist = true;
            globalRuntimeInitializationWaitlist.push(parentNode);
        }
    });

    // ----------------------
    // Define the "local" binding method on Element.prototype
    // ----------------------

    if (ENV.params.localBindingMethod in ENV.window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + ENV.params.localBindingMethod + '" property!');
    }
    Object.defineProperty(ENV.window.Element.prototype, ENV.params.localBindingMethod, {
        value: function(binding, params = {}) {
            let scriptBase = getScriptBase(this);
            // NOTE that this element if in waitlist won't be called by this mergeVal()/setVal()
            if (params.update) {
                mergeVal(scriptBase.scope.stack.main, binding);
            } else {
                setVal(scriptBase.scope.stack, 'main', binding);
            }
            scriptBase.hasBindings = true;
            // Explicitly remove from waitlist
            if (globalRuntimeInitializationWaitlist.includes(this)) {
                _remove(globalRuntimeInitializationWaitlist, this);
                applyBinding(this);
            }
        }
    });

    if ('bindings' in ENV.window.Element.prototype) {
        throw new Error('The "Element" class already has a "bindings" property!');
    }
    Object.defineProperty(ENV.window.Element.prototype, 'bindings', {
        get: function() {
            console.log(this)
            var scriptBase = getScriptBase(this), _this = this;
            if (!scriptBase.scopeInstanceProxy) {
                // Same proxy instance, even if scriptBase.scope.stack.main
                // is later changed
                scriptBase.scopeInstanceProxy = new Proxy({}, {
                    set: (target, key, value) => {
                        // NOTE that this element if in waitlist won't be called by this setVal()
                        setVal(scriptBase.scope.stack.main, key, value);
                        scriptBase.hasBindings = true;
                        // Explicitly remove from waitlist
                        if (globalRuntimeInitializationWaitlist.includes(_this)) {
                            _remove(globalRuntimeInitializationWaitlist, _this);
                            applyBinding(_this);
                        }
                        return true;
                    },
                    get: (target, key) => {
                        return getVal(scriptBase.scope.stack.main, key);
                    },
                });
            }
            return scriptBase.scopeInstanceProxy;
        },
    });

    // ----------------------
    // Define the global "scopedJS" object
    // ----------------------

    if (ENV.params.globalBindingMethod in ENV.window.document) {
        throw new Error('document already has a "' + ENV.params.globalBindingMethod + '" property!');
    }
    Object.defineProperty(ENV.window.document, ENV.params.globalBindingMethod, {
        value: function(binding, params = {}) {
            // NOTE that elements in waitlist won't be called by this mergeVal()/setVal()
            if (params.update) {
                mergeVal(globalScopeInstance.stack.main, binding);
            } else {
                setVal(globalScopeInstance.stack, 'main', binding);
            }
            // Explicitly empty waitlist
            var waitingElement;
            while(waitingElement = globalRuntimeInitializationWaitlist.shift()) {
                applyBinding(waitingElement);
            }
            globalRuntimeInitialized = true;
        },
    });

    if ('bindings' in ENV.window.document) {
        throw new Error('document already has a "bindings" property!');
    }
    var globalScopeInstanceProxy;
    Object.defineProperty(ENV.window.document, 'bindings', {
        get: function() {
            if (!globalScopeInstanceProxy) {
                // Same proxy instance, even if globalScopeInstance.stack.main
                // is later changed
                globalScopeInstanceProxy = new Proxy({}, {
                    set: (target, key, value) => {
                        // NOTE that elements in waitlist won't be called by this setVal()
                        setVal(globalScopeInstance.stack.main, key, value);
                        // Explicitly empty waitlist
                        var waitingElement;
                        while(waitingElement = globalRuntimeInitializationWaitlist.shift()) {
                            applyBinding(waitingElement);
                        }
                        globalRuntimeInitialized = true;
                        return true;
                    },
                    get: (target, key) => {
                        return getVal(globalScopeInstance.stack.main, key);
                    },
                });
            }
            return globalScopeInstanceProxy;
        },
    });

};