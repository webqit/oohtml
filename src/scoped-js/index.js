
/**
 * @imports
 */
import JSEN, { Block } from '@web-native-js/jsen';
import _merge from '@web-native-js/commons/obj/merge.js';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _remove from '@web-native-js/commons/arr/remove.js';
import _any from '@web-native-js/commons/arr/any.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import { capture, meta } from '../dom.js';
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
var inited = false;
export default function() {
	if (inited) {
		return;
	}
	inited = true;

    const isIsomorphic = meta('isomorphic') === true || meta('isomorphic') === 1;
    var preInitList = [];

    // ----------------------
    // Helpers
    // ----------------------

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
                if (!preInitList || target['.chtml'].scopedJS.hasBindings) {
                    applyBinding(target, e);
                }
            });
        }
        return target['.chtml'].scopedJS;
    };

    const applyBinding = function(target, event) {
        var targetScriptBase = getScriptBase(target);
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

    capture(ENV.params.scriptElement, scriptElement => {
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
        if (scriptElement.hasAttribute('autorun') || meta('script-errors') || scriptBase.hasBindings || !preInitList) {
            applyBinding(parentNode);
        } else {
            preInitList.push(parentNode);
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
            if (params.update) {
                mergeVal(scriptBase.scope.stack.main, binding);
            } else {
                setVal(scriptBase.scope.stack, 'main', binding);
            }
            scriptBase.hasBindings = true;
            if (preInitList && preInitList.includes(this)) {
                if (!preInitList.length) {
                    preInitList = null;
                }
                applyBinding(this);
            }
        }
    });

    if ('bindings' in ENV.window.Element.prototype) {
        throw new Error('The "Element" class already has a "bindings" property!');
    }
    Object.defineProperty(ENV.window.Element.prototype, 'bindings', {
        get: () => {
            var scriptBase = getScriptBase(this), _this = this;
            if (!scriptBase.scopeInstanceProxy) {
                // Same proxy instance, even if scriptBase.scope.stack.main
                // is later changed
                scriptBase.scopeInstanceProxy = new Proxy({}, {
                    set: (target, key, value) => {
                        if (ENV.trap) {
                            return EMV.trap.set(scriptBase.scope.stack.main, key, value);
                        } else {
                            scriptBase.scope.stack.main[key] = value;
                            true;
                        }
                        scriptBase.hasBindings = true;
                        if (preInitList && preInitList.includes(_this)) {
                            _remove(preInitList, _this);
                            if (!preInitList.length) {
                                preInitList = null;
                            }
                            applyBinding(_this);
                        }
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
            if (params.update) {
                mergeVal(globalScopeInstance.stack.main, binding);
            } else {
                setVal(globalScopeInstance.stack, 'main', binding);
            }
            if (preInitList) {
                preInitList.forEach(el => applyBinding(el));
                preInitList = null;
            }
        },
    });

    if ('bindings' in ENV.window.document) {
        throw new Error('document already has a "bindings" property!');
    }
    var globalScopeInstanceProxy;
    Object.defineProperty(ENV.window.document, 'bindings', {
        get: () => {
            if (!globalScopeInstanceProxy) {
                // Same proxy instance, even if globalScopeInstance.stack.main
                // is later changed
                globalScopeInstanceProxy = new Proxy({}, {
                    set: (target, key, value) => {
                        if (ENV.trap) {
                            ENV.trap.set(globalScopeInstance.stack.main, key, value);
                        } else {
                            globalScopeInstance.stack.main[key] = value;
                        }
                        if (preInitList) {
                            preInitList.forEach(el => applyBinding(el));
                            preInitList = null;
                        }
                        return true;
                    },
                });
            }
            return globalScopeInstanceProxy;
        },
    });

};