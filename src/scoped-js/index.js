
/**
 * @imports
 */
import Observer from '@web-native-js/observer';
import JSEN, { Block } from '@web-native-js/jsen';
import ready from '@onephrase/util/dom/ready.js';
import { onPresent } from '@onephrase/util/dom/mutation.js';
import _merge from '@onephrase/util/obj/merge.js';
import _arrFrom from '@onephrase/util/arr/from.js';
import _remove from '@onephrase/util/arr/remove.js';
import _any from '@onephrase/util/arr/any.js';
import _isFunction from '@onephrase/util/js/isFunction.js';
import meta from '../meta.js';
import Scope from './Scope.js';
import params from './params.js';

/**
 * ---------------------------
 * The ScopedJS class
 * ---------------------------
 */				

export default class ScopedJS {

    /**
     * @parse
     */
    static parse(script, params = {}) {
        var AST;
        if (!(AST = JSEN.parse(script, [Block], _merge({assert:false}, params)))) {
            AST = new Block([JSEN.parse(script, null, params)]);
        }
        return AST;
    }

    /**
     * @constructor
     */
    constructor(window, trap = Observer, _params = {}) {

        const _this = this;
        _this.params = _merge({}, params, _params);
        _this.window = window;
        _this.trap = trap;

        var globalRuntimeInitializationWaitlist = [], globalRuntimeInitialized = false;
        ready(_this.window, () => {
            globalRuntimeInitialized = meta(_this.window, 'script-autorun');
        });

        // ----------------------
        // Helpers
        // ----------------------

        const getVal = (target, key) => {
            if (_this.trap) {
                return _this.trap.get(target, key);
            }
            return target[key];
        };

        const delVal = (target, key) => {
            if (_this.trap) {
                return _this.trap.deleteProperty(target, key);
            }
            delete target[key];
            return true;
        };

        const setVal = (target, key, value) => {
            if (_this.trap) {
                _this.trap.set(target, key, value);
            } else {
                target[key] = value;
            }
            return target;
        };

        const mergeVal = (target, value) => {
            if (_this.trap) {
                _this.trap.set(target, value);
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
                target['.chtml'].scopedJS.scope.observe(_this.trap, e => {
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
                trap: _this.trap,
            };
            if (targetScriptBase.AST) {
                var returnValue = targetScriptBase.AST.eval(targetScriptBase.scope, params);
                if (_isFunction(returnValue)) {
                    returnValue(targetScriptBase.scope.stack.main);
                }
            }
        };

        const globalScopeInstance = new Scope(setVal({}, 'main', {}), {
            errorLevel:_this.params.errorLevel,
        });

        // ----------------------
        // Capture scripts
        // ----------------------

        onPresent(_this.window, _this.params.scriptElement, (scriptElement, p) => {
            if (_any(_this.params.inertContexts, inertContext => scriptElement.closest(inertContext)) || !scriptElement.parentNode) {
                return;
            }
            // Remove
            var srcCode, parentNode = scriptElement.parentNode, scriptBase = getScriptBase(parentNode);
            if (!meta(_this.window, 'isomorphic')) {
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
            var explain = [], shouldExplain = scriptElement.hasAttribute('explain') || meta(_this.window, 'script-explain');
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
                : meta(_this.window, 'script-errors');
            if (meta(_this.window, 'script-autorun') || scriptBase.hasBindings || scriptElement.hasAttribute('autorun')) {
                applyBinding(parentNode);
            } else {
                scriptBase.inWaitlist = true;
                globalRuntimeInitializationWaitlist.push(parentNode);
            }
        });

        // ----------------------
        // Define the "local" binding method on Element.prototype
        // ----------------------

        if (_this.params.localBindingMethod in _this.window.Element.prototype) {
            throw new Error('The "Element" class already has a "' + _this.params.localBindingMethod + '" property!');
        }
        Object.defineProperty(_this.window.Element.prototype, _this.params.localBindingMethod, {
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

        if ('bindings' in _this.window.Element.prototype) {
            throw new Error('The "Element" class already has a "bindings" property!');
        }
        Object.defineProperty(_this.window.Element.prototype, 'bindings', {
            get: function() {
                var scriptBase = getScriptBase(this), _this = this;
                if (!scriptBase.scopeInstanceProxy) {
                    // Same proxy instance, even if scriptBase.scope.stack.main
                    // is later changed
                    scriptBase.scopeInstanceProxy = new Proxy(scriptBase.scope.stack.main, {
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
                        deleteProperty: (target, key) => {
                            return delVal(scriptBase.scope.stack.main, key);
                        },
                    });
                }
                return scriptBase.scopeInstanceProxy;
            },
        });

        // ----------------------
        // Define the global "scopedJS" object
        // ----------------------

        if (_this.params.globalBindingMethod in _this.window.document) {
            throw new Error('document already has a "' + _this.params.globalBindingMethod + '" property!');
        }
        Object.defineProperty(_this.window.document, _this.params.globalBindingMethod, {
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

        if ('bindings' in _this.window.document) {
            throw new Error('document already has a "bindings" property!');
        }
        var globalScopeInstanceProxy;
        Object.defineProperty(_this.window.document, 'bindings', {
            get: function() {
                if (!globalScopeInstanceProxy) {
                    // Same proxy instance, even if globalScopeInstance.stack.main
                    // is later changed
                    globalScopeInstanceProxy = new Proxy(globalScopeInstance.stack.main, {
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
                        deleteProperty: (target, key) => {
                            return delVal(globalScopeInstance.stack.main, key);
                        },
                    });
                }
                return globalScopeInstanceProxy;
            },
        });
    }
};