
/**
 * @imports
 */
import Observer from '@webqit/observer';
import { _after,_before, _beforeLast } from '@webqit/util/str/index.js';
import { _each, _merge, _get } from '@webqit/util/obj/index.js';
import { _remove } from '@webqit/util/arr/index.js';
import { _isFunction, _isTypeObject, _internals } from '@webqit/util/js/index.js';
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

    const _getScriptBase = function(target) {
        var oohtmlBase = _internals(target, 'oohtml');
        if (!oohtmlBase.has('subscript')) {
            // Create scope
            const thisScope = {};
            const scriptBase = {
                scope: Scope.createStack([{}/** bindings scope */, thisScope/** the "this" scope */, globalScopeInstance/** global scope */], scopeParams, {
                    set: Observer.set,
                }),
            };
            Observer.set(thisScope, 'this', target);
            oohtmlBase.set('subscript', scriptBase);
            scriptBase.console = {
                errors: [],
                infos: [],
                warnings: [],
                logs: [],
                exceptions: [],
            };
        }
        return oohtmlBase.get('subscript');
    };

    const getScriptBase = function(target) {
        var scriptBase = _getScriptBase(target);
        if (!scriptBase.handler) {
            // Binding mode?
            scriptBase.handler = e => {
                if (!scriptBase.inWaitlist) {
                    applyBinding(scriptBase.srcCodes1, target, e);
                }
            };
            scriptBase.connected = c => {
                scriptBase.isConnected = c;
                if (c) {
                    scriptBase.scope.observe(Observer, scriptBase.handler, { tags: [ scriptBase.handler ] });
                } else {
                    // Unobserve only happens by tags
                    scriptBase.scope.unobserve(Observer, { tags: [ scriptBase.handler ] });
                }
            };
        }
        if (!scriptBase.isConnected) {
            // =====================
            var mo = mutations.onRemoved(target, () => {
                scriptBase.connected(false);
                mo.disconnect();
            }, { ignoreTransients: true });
            scriptBase.connected(true);
        }
        return scriptBase;
    };

    const applyBinding = function(srcCodes, target, event) {
        var targetScriptBase = _getScriptBase(target);
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
        srcCodes.forEach(srcCode => {
            Runtime.eval(srcCode, targetScriptBase.scope, params);
        });
    };

    // ----------------------
    // Capture scripts
    // ----------------------

    mutations.onPresent(_meta.get('selectors.script'), (scriptElement, p) => {
        if (!scriptElement.parentNode) {
            return;
        }
        // Remove
        var parentNode = scriptElement.parentNode,
            scriptBase = getScriptBase(parentNode);
        if (!_meta.get('isomorphic')) {
            scriptElement.remove();
        }
        scriptBase.scriptElements = scriptBase.scriptElements || [],
        scriptBase.srcCodes1 = scriptBase.srcCodes1 || [];
        if (scriptBase.scriptElements.includes(scriptElement)) {
            return;
        }
        scriptBase.scriptElements.push(scriptElement);
        var srcCode = (scriptElement.textContent || '').trim();
        if (!srcCode) {
            return;
        }
        // ------
        // Parse
        // ------
        var explain = [],
            shouldExplain = scriptElement.hasAttribute('explain') || _meta.get('script.explain'),
            srcCodeAST = parse(srcCode, {
                explain: shouldExplain ? explain : null,
            });
        scriptBase.srcCodes1.push(srcCodeAST);
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
            applyBinding([ srcCodeAST ], parentNode);
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
                                        applyBinding((scriptBase.srcCodes1 || []).concat(scriptBase.srcCodes2 || []), $this);
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
                            applyBinding((scriptBase.srcCodes1 || []).concat(scriptBase.srcCodes2 || []), $this);
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
                                        var scriptBase = getScriptBase(waitingElement);
                                        applyBinding((scriptBase.srcCodes1 || []).concat(scriptBase.srcCodes2 || []), waitingElement);
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
                            var scriptBase = getScriptBase(waitingElement);
                            applyBinding((scriptBase.srcCodes1 || []).concat(scriptBase.srcCodes2 || []), waitingElement);
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

    // ----------------------
    // Define the global "SubscriptElement()" mixin
    // ----------------------

    WebQit.SubscriptElement = BaseElement => class extends BaseElement {

        /**
         * @constructor()
         */
        constructor() {
            super();

            // -----------------------
            // Parse methods that are reactive by their default parameters
            // -----------------------

            this._parametersContextGroups = {};
            this._parametersDefaultValsRefs = {};
            (this.constructor.subscriptParameterBlocks || []).forEach(methodName => {
                if (methodName.replaceAll(' ', '').endsWith('()')) {
                    methodName = methodName.replaceAll('(', '').replaceAll('}', '');
                }
                if (methodName === 'constructor') {
                    throw new Error(`Constructors cannot be reactive methods.`);
                }
                if (!_isFunction(this[methodName])) {
                    throw new Error(`The implied reactive method "${methodName}" is not a function.`);
                }
                var srcCode = this[methodName].toString().trim();
                var parameters = _before(_after(srcCode, '('), ')').split(',').map(param => param.trim()).filter(param => param);
                if (!parameters.length) {
                    throw new Error(`[${methodName}()]: Reactive methods must have parameters.`);
                }
                this._parametersContextGroups[methodName] = {};
                this._parametersDefaultValsRefs[methodName] = parameters.map(param => {
                    if (!param.includes('=')) {
                        throw new Error(`[${methodName}(${param})]: All parameters must have a default value.`);
                    }
                    var _param = param.split('=').map(p => p.trim());
                    if (!_param[1].includes('.')) {
                        throw new Error(`[${methodName}(${param})]: Parameter's default value must be a path reference.`);
                    }
                    var refArr = _param[1].replaceAll('?.', '.').split('.');
                    var contextName = refArr.shift();
                    var context = contextName === 'this' ? this : (
                        contextName === 'document' ? document : (
                            contextName === 'window' ? window : globalThis[contextName]
                        )
                    );
                    if (!_isTypeObject(context)) {
                        throw new Error(`[${methodName}(${param})]: Parameter's default value does not reference an object in scope.`);
                    }
                    if (!this._parametersContextGroups[methodName][contextName]) {
                        this._parametersContextGroups[methodName][contextName] = { context, refs: [] };
                    }
                    this._parametersContextGroups[methodName][contextName].refs.push(refArr);
                    return _param[1];
                });
            });

            // -----------------------
            // Parse whole reactive blocks
            // -----------------------

            var explain = [],
                shouldExplain = _meta.get('script.explain'),
                scriptBase = _getScriptBase(this);
            scriptBase.srcCodes2 = (this.constructor.subscriptBlocks || []).map(blockName => {
                if (blockName === 'constructor') {
                    throw new Error(`Constructors cannot be reactive blocks.`);
                }
                if (!_isFunction(this[blockName])) {
                    throw new Error(`The implied reactive block "${blockName}" is not a function.`);
                }
                var srcCode = this[blockName].toString().trim();
                if (!srcCode.replaceAll(' ', '').startsWith(`${blockName}(){`)) {
                    throw new Error(`[${blockName}()]: Reactive blocks cannot have parameters.`);
                }
                return _beforeLast(_after(srcCode, '{'), '}');
            }).filter(srcCode => srcCode);
            scriptBase.srcCodes2 = scriptBase.srcCodes2.map(srcCode => parse(srcCode, {
                explain: shouldExplain ? explain : null,
            }));
            if (shouldExplain) {
                scriptBase.console.logs.push(explain);
                console.log(this, explain);
            }
            scriptBase.handler2 = e => {
                if (!scriptBase.inWaitlist) {
                    applyBinding(scriptBase.srcCodes2, this, e);
                }
            };

        }

        /**
         * @connectedCallback()
         */
        connectedCallback() {
            
            // -----------------------
            // Bind methods that are reactive by their default parameters
            // -----------------------

            _each(this._parametersContextGroups, (methodName, parametersContextGroups) => {
                const parametersDefaultValsRefs = this._parametersDefaultValsRefs[methodName];
                _each(parametersContextGroups, (contextName, dfn) => {
                    Observer.observe(dfn.context, dfn.refs, mutations => {
                        var argsByRef = {};
                        mutations.forEach(mutation => {
                            argsByRef[`${contextName}.${mutation.path.join('.')}`] = mutation.value;
                        });
                        var args = parametersDefaultValsRefs.map(ref => {
                            if (!argsByRef[ref]) {
                                var refArr = ref.split('.');
                                var contextName = refArr.shift();
                                argsByRef[ref] = _get(parametersContextGroups[contextName].context, refArr, Observer);
                            }
                            return argsByRef[ref];
                        });
                        try {
                            this[methodName](...args);
                        } catch(e) {
                            console.error(e);
                        }
                    }, { diff: true, suptree: true, tags: [ this, 'subscriptParameterBlocks' ] });
                });
                // Autorun?
                try {
                    this[methodName]();
                } catch(e) {}
            });
            
            // -----------------------
            // Bind whole reactive blocks
            // -----------------------

            const scriptBase = _getScriptBase(this);
            // Autorun?
            if (globalRuntimeInitialized || scriptBase.hasBindings) {
                applyBinding(scriptBase.srcCodes2, this);
            } else {
                scriptBase.inWaitlist = true;
                globalRuntimeInitializationWaitlist.push(this);
            }
            scriptBase.scope.observe(Observer, scriptBase.handler2, { tags: [ scriptBase.handler2 ] });

        }

        /**
         * @disconnectedCallback()
         */
        disconnectedCallback() {
            
            // -----------------------
            // Unbind methods that are reactive by their default parameters
            // -----------------------

            _each(this._parametersContextGroups, (methodName, parametersContextGroups) => {
                _each(parametersContextGroups, (contextName, dfn) => {
                    Observer.unobserve(dfn.context, null, null, { tags: [ this, 'subscriptParameterBlocks' ] });
                });
            });

            // -----------------------
            // Unbind whole reactive blocks
            // -----------------------

            const scriptBase = _getScriptBase(this);
            scriptBase.scope.unobserve(Observer, { tags: [ scriptBase.handler2 ] });

        }
    };

};

/**
 * @parse
 */
const parseCache = {};
function parse(srcCode, params = {}) {
    if (!parseCache[srcCode]) {
        if (!(parseCache[srcCode] = Parser.parse(srcCode, [Block], _merge({assert:false}, params)))) {
            parseCache[srcCode] = new Block([Parser.parse(srcCode, null, params)]);
        }
    }
    return parseCache[srcCode];
}
