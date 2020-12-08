
/**
 * @imports
 */
import Subscript from '@webqit/subscript';
import { Block } from '@webqit/subscript/src/grammar.js';
import _merge from '@webqit/util/obj/merge.js';
import _arrFrom from '@webqit/util/arr/from.js';
import _remove from '@webqit/util/arr/remove.js';
import _any from '@webqit/util/arr/any.js';
import _isFunction from '@webqit/util/js/isFunction.js';
import meta from '../meta.js';
import Scope from './Scope.js';
import params from './params.js';

/**
 * ---------------------------
 * The ScopedJS class
 * ---------------------------
 */				

export default function init(Ctxt) {

    var globalRuntimeInitializationWaitlist = [],
        globalRuntimeInitialized = false,
        globalAutorun = false;
    Ctxt.ready.then(window => {
        globalAutorun = meta.call(Ctxt, 'script-autorun');
    });

    // ----------------------
    // Helpers
    // ----------------------

    const getVal = (target, key) => {
        if (Ctxt.Observer) {
            return Ctxt.Observer.get(target, key);
        }
        return target[key];
    };

    const delVal = (target, key) => {
        if (Ctxt.Observer) {
            return Ctxt.Observer.deleteProperty(target, key);
        }
        delete target[key];
        return true;
    };

    const setVal = (target, key, value) => {
        if (Ctxt.Observer) {
            Ctxt.Observer.set(target, key, value);
        } else {
            target[key] = value;
        }
        return target;
    };

    const mergeVal = (target, value) => {
        if (Ctxt.Observer) {
            Ctxt.Observer.set(target, value);
        } else {
            Object.keys(value).forEach(key => {
                target[key] = value[key];
            });
        }
        return target;
    };

    const getScriptBase = function(target) {
        if (!target['.oohtml']) {
            target['.oohtml'] = {};
        }
        if (!target['.oohtml'].scopedJS) {
            // Create scope
            target['.oohtml'].scopedJS = {
                scope: new Scope(setVal({
                    super: new Scope(setVal({
                        super: globalScopeInstance,
                    }, 'main', setVal({}, 'this', target))),
                }, 'main', {})),
            };
            // Watch scope
            target['.oohtml'].scopedJS.scope.observe(Ctxt.Observer, e => {
                if (target.isConnected && !target['.oohtml'].scopedJS.inWaitlist) {
                    applyBinding(target, e);
                }
            }, {diff: true});
        }
        return target['.oohtml'].scopedJS;
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
            trap: Ctxt.Observer,
        };
        if (targetScriptBase.AST) {
            var returnValue = targetScriptBase.AST.eval(targetScriptBase.scope, params);
            if (_isFunction(returnValue)) {
                returnValue(targetScriptBase.scope.stack.main);
            }
        }
    };

    const globalScopeInstance = new Scope(setVal({
        super: new Scope({main: Ctxt.window})
    }, 'main', {}), {
        errorLevel:params.errorLevel,
    });

    // ----------------------
    // Capture scripts
    // ----------------------

    Ctxt.Mutation.onPresent(params.SCRIPT_ELEMENT, (scriptElement, p) => {
        if (_any(params.SCRIPT_INERT_CONTEXTS, inertContext => scriptElement.closest(inertContext)) || !scriptElement.parentNode) {
            return;
        }
        // Remove
        var srcCode, parentNode = scriptElement.parentNode, scriptBase = getScriptBase(parentNode);
        if (!meta.call(Ctxt, 'isomorphic')) {
            scriptElement.remove();
        }
        if (scriptBase.scriptElement === scriptElement) {
            return;
        }
        if (scriptBase.scriptElement) {
            throw new Error('An element must only have one scopedJS instance!');
        }
        scriptBase.scriptElement = scriptElement;
        if (!(srcCode = (scriptElement.textContent || '').trim())) {
            return;
        }
        // ------
        // Parse
        // ------
        var explain = [], shouldExplain = scriptElement.hasAttribute('explain') || meta.call(Ctxt, 'script-explain');
        scriptBase.AST = parse(srcCode, {
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
            : meta.call(Ctxt, 'script-errors');
        if (globalRuntimeInitialized || scriptBase.hasBindings || globalAutorun || scriptElement.hasAttribute('autorun')) {
            applyBinding(parentNode);
        } else {
            scriptBase.inWaitlist = true;
            globalRuntimeInitializationWaitlist.push(parentNode);
        }
    });

    // ----------------------
    // Define the "local" binding method on Element.prototype
    // ----------------------

    if (params.LOCAL_BINDING_METHOD in Ctxt.window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + params.LOCAL_BINDING_METHOD + '" property!');
    }
    Object.defineProperty(Ctxt.window.Element.prototype, params.LOCAL_BINDING_METHOD, {
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

    if ('bindings' in Ctxt.window.Element.prototype) {
        throw new Error('The "Element" class already has a "bindings" property!');
    }
    Object.defineProperty(Ctxt.window.Element.prototype, 'bindings', {
        get: function() {
            var $this = this,
                scriptBase = getScriptBase($this);
            if (!scriptBase.scopeInstanceProxy) {
                // Same proxy instance, even if scriptBase.scope.stack.main
                // is later changed
                scriptBase.scopeInstanceProxy = new Proxy(scriptBase.scope.stack.main, {
                    set: (target, key, value) => {
                        // NOTE that this element if in waitlist won't be called by this setVal()
                        setVal(scriptBase.scope.stack.main, key, value);
                        scriptBase.hasBindings = true;
                        // Explicitly remove from waitlist
                        if (globalRuntimeInitializationWaitlist.includes($this)) {
                            _remove(globalRuntimeInitializationWaitlist, $this);
                            applyBinding($this);
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

    if (params.GLOBAL_BINDING_METHOD in Ctxt.window.document) {
        throw new Error('document already has a "' + params.GLOBAL_BINDING_METHOD + '" property!');
    }
    Object.defineProperty(Ctxt.window.document, params.GLOBAL_BINDING_METHOD, {
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

    if ('bindings' in Ctxt.window.document) {
        throw new Error('document already has a "bindings" property!');
    }
    var globalScopeInstanceProxy;
    Object.defineProperty(Ctxt.window.document, 'bindings', {
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
};

/**
 * @parse
 */
function parse(script, params = {}) {
    var AST;
    if (!(AST = Subscript.parse(script, [Block], _merge({assert:false}, params)))) {
        AST = new Block([Subscript.parse(script, null, params)]);
    }
    return AST;
}
