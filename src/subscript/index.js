
/**
 * @imports
 */
import Observer from '@webqit/observer';
import _merge from '@webqit/util/obj/merge.js';
import _remove from '@webqit/util/arr/remove.js';
import _isFunction from '@webqit/util/js/isFunction.js';
import _internals from '@webqit/util/js/internals.js';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import { Parser, Runtime, Scope } from '@webqit/subscript';
import { Block } from '@webqit/subscript/src/grammar.js';
import { config } from '../util.js';

/**
 * ---------------------------
 * The Reflex class
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
    const mutations = WebQit.DOM.mutations;

    const globalRuntimeInitializationWaitlist = [];
    const _meta = config.call(this, {
        selectors: {script: 'script[type="subscript"]',},
        api: {bind: 'bind', unbind: 'unbind',},
        script: {},
    }, _config);
    const parseCache = {};
    var globalRuntimeInitialized = _meta.get('script.autorun') !== false;

    // ----------------------
    // Helpers
    // ----------------------

    const scopeParams = { errorLevel: _meta.get('script.errlevel'), };
    const docCntxt = {};
    Observer.set(docCntxt, 'document', document);
    const globalScopeInstance = Scope.createStack([docCntxt, Scope.create(window)], scopeParams, {
        set: Observer.set,
    });

    const getScriptBase = function(target) {
        var oohtmlBase = _internals(target, 'oohtml');
        if (!oohtmlBase.has('subscript') || !oohtmlBase.get('subscript').isConnected) {
            if (!oohtmlBase.has('subscript')) {
                // Create scope
                var thisScope = {};
                Observer.set(thisScope, 'this', target);
                oohtmlBase.set('subscript', {
                    scope: Scope.createStack([{}/** bindings scope */, thisScope/** the "this" scope */, globalScopeInstance/** global scope */], scopeParams, {
                        set: Observer.set,
                    }),
                });
                oohtmlBase.get('subscript').console = {
                    errors: [],
                    infos: [],
                    warnings: [],
                    logs: [],
                    exceptions: [],
                };
                // Binding mode?
                oohtmlBase.get('subscript').handler = e => {
                    if (!oohtmlBase.get('subscript').inWaitlist) {
                        applyBinding(target, e);
                    }
                };
                oohtmlBase.get('subscript').connected = c => {
                    oohtmlBase.get('subscript').isConnected = c;
                    if (c) {
                        oohtmlBase.get('subscript').scope.observe(Observer, oohtmlBase.get('subscript').handler, {tags: [oohtmlBase.get('subscript').handler]});
                    } else {
                        // Unobserve only happens by tags
                        oohtmlBase.get('subscript').scope.unobserve(Observer, {tags: [oohtmlBase.get('subscript').handler]});
                    }
                };
            }
            // =====================
            var mo = mutations.onRemoved(target, () => {
                oohtmlBase.get('subscript').connected(false);
                mo.disconnect();
            }, {ignoreTransients: true});
            oohtmlBase.get('subscript').connected(true);
        }
        return oohtmlBase.get('subscript');
    };

    const applyBinding = function(target, event) {
        var targetScriptBase = getScriptBase(target);
        targetScriptBase.inWaitlist = false;
        var params = {
            references: (event || {}).references, 
            catch: targetScriptBase.catch ? targetScriptBase.catch : e => {
                if (targetScriptBase.errorLevel === 2) {
                    console.error(target, e);
                    targetScriptBase.console.errors.push(e);
                } else if (targetScriptBase.errorLevel !== 0) {
                    console.warn(target, e.message);
                    targetScriptBase.console.warnings.push(e.message);
                }
            },
            trap: Observer,
        };
        if (targetScriptBase.AST) {
            var returnValue = Runtime.eval(targetScriptBase.AST, targetScriptBase.scope, params);
            if (_isFunction(returnValue)) {
                returnValue(targetScriptBase.scope.stack.main);
            }
        }
    };

    // ----------------------
    // Capture scripts
    // ----------------------

    mutations.onPresent(_meta.get('selectors.script'), (scriptElement, p) => {
        if (!scriptElement.parentNode) {
            return;
        }
        // Remove
        var srcCode, parentNode = scriptElement.parentNode, scriptBase = getScriptBase(parentNode);
        if (!_meta.get('isomorphic')) {
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
        if (!(srcCode = (scriptElement.textContent || '').trim())) {
            return;
        }
        // ------
        // Parse
        // ------
        var explain = [], shouldExplain = scriptElement.hasAttribute('explain') || _meta.get('script.explain');
        if (!parseCache[srcCode]) {
            parseCache[srcCode] = parse(srcCode, {
                explain: shouldExplain ? explain : null,
            });
        }
        scriptBase.AST = parseCache[srcCode];
        if (scriptElement.hasAttribute('scoped')) {
            //Observer.set(scriptBase.scope.stack.super.stack.main, 'this', parentNode);
        }
        if (shouldExplain) {
            scriptBase.console.logs.push(explain);
            console.log(parentNode, explain);
        }
        // ------
        // Eval
        // ------
        scriptBase.errorLevel = scriptElement.getAttribute('errors') 
            ? parseInt(scriptElement.getAttribute('errors'))
            : _meta.get('script.errors');
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

    if ('subscript' in window.Element.prototype) {
        throw new Error('The "Element" class already has a "subscript" property!');
    }
    Object.defineProperty(window.Element.prototype, 'subscript', {
        get: function() {
            let scriptBase = getScriptBase(this);
            if (!('bindings' in scriptBase)) {
                var $this = this;

                // ---------------------

                Object.defineProperty(scriptBase, 'bindings', {
                    get: function() {
                        if (!scriptBase.scopeInstanceProxy) {
                            // Same proxy instance, even if scriptBase.scope.stack.main
                            // is later changed
                            scriptBase.scopeInstanceProxy = new Proxy(scriptBase.scope.stack.main, {
                                set: (target, key, value) => {
                                    // NOTE that this element if in waitlist won't be called by this Observer.set()
                                    Observer.set(scriptBase.scope.stack.main, key, value);
                                    scriptBase.hasBindings = true;
                                    // Explicitly remove from waitlist
                                    if (globalRuntimeInitializationWaitlist.includes($this)) {
                                        _remove(globalRuntimeInitializationWaitlist, $this);
                                        applyBinding($this);
                                    }
                                    return true;
                                },
                                get: (target, key) => {
                                    return Observer.get(scriptBase.scope.stack.main, key);
                                },
                                deleteProperty: (target, key) => {
                                    return Observer.deleteProperty(scriptBase.scope.stack.main, key);
                                },
                            });
                        }
                        return scriptBase.scopeInstanceProxy;
                    },
                });

                // ---------------------

                Object.defineProperty(scriptBase, 'bind', {
                    value: function(binding, params = {}) {
                        // NOTE that this element if in waitlist won't be called by this Observer.set()/Observer.set()
                        if (params.update) {
                            Observer.set(scriptBase.scope.stack.main, binding);
                        } else {
                            Observer.set(scriptBase.scope.stack, 'main', binding);
                        }
                        scriptBase.hasBindings = true;
                        // Explicitly remove from waitlist
                        if (globalRuntimeInitializationWaitlist.includes($this)) {
                            _remove(globalRuntimeInitializationWaitlist, $this);
                            applyBinding($this);
                        }
                    }
                });

                // ---------------------
                
                Object.defineProperty(scriptBase, _meta.get('api.unbind'), {
                    value: function() {
                        Observer.set(scriptBase.scope.stack, 'main', {});
                    }
                });
            }
            return scriptBase;
        }
    });

    // ----------------------
    // Define the global "scopedJS" object
    // ----------------------

    if ('subscript' in document) {
        throw new Error('The "document" object already has a "subscript" property!');
    }
    var globalScopeInstanceProxy, globalSubscript = {};
    Object.defineProperty(document, 'subscript', {
        get: function() {
            if (!('bindings' in globalSubscript)) {

                Object.defineProperty(globalSubscript, 'bindings', {
                    get: function() {
                        if (!globalScopeInstanceProxy) {
                            // Same proxy instance, even if globalScopeInstance.stack.main
                            // is later changed
                            globalScopeInstanceProxy = new Proxy(globalScopeInstance.stack.main, {
                                set: (target, key, value) => {
                                    // NOTE that elements in waitlist won't be called by this Observer.set()
                                    Observer.set(globalScopeInstance.stack.main, key, value);
                                    // Explicitly empty waitlist
                                    var waitingElement;
                                    while(waitingElement = globalRuntimeInitializationWaitlist.shift()) {
                                        applyBinding(waitingElement);
                                    }
                                    globalRuntimeInitialized = true;
                                    return true;
                                },
                                get: (target, key) => {
                                    return Observer.get(globalScopeInstance.stack.main, key);
                                },
                                deleteProperty: (target, key) => {
                                    return Observer.deleteProperty(globalScopeInstance.stack.main, key);
                                },
                            });
                        }
                        return globalScopeInstanceProxy;
                    },
                });

                // ---------------------

                Object.defineProperty(globalSubscript, 'bind', {
                    value: function(binding, params = {}) {
                        // NOTE that elements in waitlist won't be called by this Observer.set()/Observer.set()
                        if (params.update) {
                            Observer.set(globalScopeInstance.stack.main, binding);
                        } else {
                            Observer.set(globalScopeInstance.stack, 'main', binding);
                        }
                        // Explicitly empty waitlist
                        var waitingElement;
                        while(waitingElement = globalRuntimeInitializationWaitlist.shift()) {
                            applyBinding(waitingElement);
                        }
                        globalRuntimeInitialized = true;
                    },
                });

                // ---------------------
            
                Object.defineProperty(globalSubscript, 'unbind', {
                    value: function() {
                        Observer.set(globalScopeInstance.stack, 'main', {});
                    },
                });
            
            }
            return globalSubscript;
        },
    });

};

/**
 * @parse
 */
function parse(script, params = {}) {
    var AST;
    if (!(AST = Parser.parse(script, [Block], _merge({assert:false}, params)))) {
        AST = new Block([Parser.parse(script, null, params)]);
    }
    return AST;
}
