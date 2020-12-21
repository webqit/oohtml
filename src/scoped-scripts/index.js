
/**
 * @imports
 */
import DOMInit from '@webqit/browser-pie/src/dom/index.js';
import Subscript from '@webqit/subscript';
import { Block } from '@webqit/subscript/src/grammar.js';
import _merge from '@webqit/util/obj/merge.js';
import _remove from '@webqit/util/arr/remove.js';
import _isFunction from '@webqit/util/js/isFunction.js';
import { getOohtmlBase, objectUtil, createParams } from '../util.js';
import Scope from './Scope.js';

/**
 * ---------------------------
 * The ScopedJS class
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
    const globalRuntimeInitializationWaitlist = [];
    const globalRuntimeInitialized = false;
    const _meta = await createParams.call(Ctxt, {
        selectors: {script: 'script[type="scoped"]',},
        api: {bind: 'bind', unbind: 'unbind',},
        script: {},
    }, config);

    // ----------------------
    // Helpers
    // ----------------------

    const globalScopeInstance = new Scope(_objectUtil.setVal({
        super: new Scope({main: Ctxt.window})
    }, 'main', _objectUtil.setVal({}, 'document', Ctxt.window.document)), {
        errorLevel: _meta.script.errlevel,
    });

    const getScriptBase = function(target) {
        var oohtmlBase = getOohtmlBase(target);
        if (!oohtmlBase.scopedJS) {
            // Create scope
            oohtmlBase.scopedJS = {
                scope: new Scope(_objectUtil.setVal({
                    super: new Scope(_objectUtil.setVal({
                        super: globalScopeInstance,
                    }, 'main', {})),
                }, 'main', _objectUtil.setVal({}, 'this', target))),
            };
            // Binding mode?
            oohtmlBase.scopedJS.scope.observe(Ctxt.Observer, e => {
                if (oohtmlBase.scopedJS.isBinding && target.isConnected && !oohtmlBase.scopedJS.inWaitlist) {
                    applyBinding(target, e);
                }
            }, {diff: true});
            oohtmlBase.scopedJS.console = {
                errors: [],
                infos: [],
                warnings: [],
                logs: [],
                exceptions: [],
            };
        }
        return oohtmlBase.scopedJS;
    };

    const applyBinding = function(target, event) {
        var targetScriptBase = getScriptBase(target);
        targetScriptBase.inWaitlist = false;
        var params = {
            references: (event || {}).references, 
            catch: e => {
                if (targetScriptBase.errorLevel === 2) {
                    console.error(target, e);
                    targetScriptBase.console.errors.push(e);
                } else if (targetScriptBase.errorLevel !== 0) {
                    console.warn(target, e.message);
                    targetScriptBase.console.warns.push(e.message);
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

    // ----------------------
    // Capture scripts
    // ----------------------

    Ctxt.Mutation.onPresent(_meta.selectors.script, (scriptElement, p) => {
        if (!scriptElement.parentNode) {
            return;
        }
        // Remove
        var srcCode, parentNode = scriptElement.parentNode, scriptBase = getScriptBase(parentNode);
        if (!_meta.isomorphic) {
            scriptElement.remove();
        }
        if (scriptBase.scriptElement === scriptElement) {
            return;
        }
        if (scriptBase.scriptElement) {
            scriptBase.console.errors.push('An element must only have one scopedJS instance!');
            throw new Error('An element must only have one scopedJS instance!');
        }
        scriptBase.scriptElement = scriptElement;
        scriptBase.isBinding = scriptElement.hasAttribute('binding');
        if (!(srcCode = (scriptElement.textContent || '').trim())) {
            return;
        }
        // ------
        // Parse
        // ------
        var explain = [], shouldExplain = scriptElement.hasAttribute('explain') || _meta.script.explain;
        scriptBase.AST = parse(srcCode, {
            explain: shouldExplain ? explain : null,
        });
        if (shouldExplain) {
            scriptBase.console.logs.push(explain);
            console.log(parentNode, explain);
        }
        // ------
        // Eval
        // ------
        scriptBase.errorLevel = scriptElement.getAttribute('errors') 
            ? parseInt(scriptElement.getAttribute('errors'))
            : _meta.script.errors;
        if (globalRuntimeInitialized || scriptBase.hasBindings || _meta.script.autorun !== false || scriptElement.hasAttribute('autorun')) {
            applyBinding(parentNode);
        } else {
            scriptBase.inWaitlist = true;
            globalRuntimeInitializationWaitlist.push(parentNode);
        }
    });

    // ----------------------
    // Define the "local" binding method on Element.prototype
    // ----------------------

    /**
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
                        // NOTE that this element if in waitlist won't be called by this _objectUtil.setVal()
                        _objectUtil.setVal(scriptBase.scope.stack.main, key, value);
                        scriptBase.hasBindings = true;
                        // Explicitly remove from waitlist
                        if (globalRuntimeInitializationWaitlist.includes($this)) {
                            _remove(globalRuntimeInitializationWaitlist, $this);
                            applyBinding($this);
                        }
                        return true;
                    },
                    get: (target, key) => {
                        return _objectUtil.getVal(scriptBase.scope.stack.main, key);
                    },
                    deleteProperty: (target, key) => {
                        return _objectUtil.delVal(scriptBase.scope.stack.main, key);
                    },
                });
            }
            return scriptBase.scopeInstanceProxy;
        },
    });
     */

    if (_meta.api.bind in Ctxt.window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.api.bind + '" property!');
    }
    Object.defineProperty(Ctxt.window.Element.prototype, _meta.api.bind, {
        value: function(binding, params = {}) {
            let scriptBase = getScriptBase(this);
            // NOTE that this element if in waitlist won't be called by this _objectUtil.mergeVal()/_objectUtil.setVal()
            if (params.update) {
                _objectUtil.mergeVal(scriptBase.scope.stack.main, binding);
            } else {
                _objectUtil.setVal(scriptBase.scope.stack, 'main', binding);
            }
            scriptBase.hasBindings = true;
            // Explicitly remove from waitlist
            if (globalRuntimeInitializationWaitlist.includes(this)) {
                _remove(globalRuntimeInitializationWaitlist, this);
                applyBinding(this);
            }
        }
    });

    if (_meta.api.unbind in Ctxt.window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + _meta.api.unbind + '" property!');
    }
    Object.defineProperty(Ctxt.window.Element.prototype, _meta.api.unbind, {
        value: function() {
            let scriptBase = getScriptBase(this);
            _objectUtil.setVal(scriptBase.scope.stack, 'main', {});
        }
    });

    // ----------------------
    // Define the global "scopedJS" object
    // ----------------------

    /**
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
                        // NOTE that elements in waitlist won't be called by this _objectUtil.setVal()
                        _objectUtil.setVal(globalScopeInstance.stack.main, key, value);
                        // Explicitly empty waitlist
                        var waitingElement;
                        while(waitingElement = globalRuntimeInitializationWaitlist.shift()) {
                            applyBinding(waitingElement);
                        }
                        globalRuntimeInitialized = true;
                        return true;
                    },
                    get: (target, key) => {
                        return _objectUtil.getVal(globalScopeInstance.stack.main, key);
                    },
                    deleteProperty: (target, key) => {
                        return _objectUtil.delVal(globalScopeInstance.stack.main, key);
                    },
                });
            }
            return globalScopeInstanceProxy;
        },
    });
     */

    if (_meta.api.bind in Ctxt.window.document) {
        throw new Error('The "document" object already has a "' + _meta.api.bind + '" property!');
    }
    Object.defineProperty(Ctxt.window.document, _meta.api.bind, {
        value: function(binding, params = {}) {
            // NOTE that elements in waitlist won't be called by this _objectUtil.mergeVal()/_objectUtil.setVal()
            if (params.update) {
                _objectUtil.mergeVal(globalScopeInstance.stack.main, binding);
            } else {
                _objectUtil.setVal(globalScopeInstance.stack, 'main', binding);
            }
            // Explicitly empty waitlist
            var waitingElement;
            while(waitingElement = globalRuntimeInitializationWaitlist.shift()) {
                applyBinding(waitingElement);
            }
            globalRuntimeInitialized = true;
        },
    });

    if (_meta.api.unbind in Ctxt.window.document) {
        throw new Error('The "document" object already has a "' + _meta.api.unbind + '" property!');
    }
    Object.defineProperty(Ctxt.window.document, _meta.api.unbind, {
        value: function() {
            _objectUtil.setVal(globalScopeInstance.stack, 'main', {});
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
