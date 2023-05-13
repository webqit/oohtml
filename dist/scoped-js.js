(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/@webqit/util/js/isObject.js
  function isObject_default(val) {
    return !Array.isArray(val) && typeof val === "object" && val;
  }

  // node_modules/@webqit/util/js/isArray.js
  function isArray_default(val) {
    return Array.isArray(val);
  }

  // node_modules/@webqit/util/arr/intersect.js
  function intersect_default(arr, arr2, callback = null) {
    return !isArray_default(arr2) ? [] : arr.filter((val1) => callback ? arr2.filter((val2) => callback(val1, val2)).length : arr2.indexOf(val1) !== -1);
  }

  // node_modules/@webqit/util/js/internals.js
  function internals(obj, ...namespaces) {
    if (!globalThis.webqit) {
      globalThis.webqit = {};
    }
    if (!globalThis.webqit.refs) {
      Object.defineProperty(globalThis.webqit, "refs", { value: new ObservableMap() });
    }
    if (!arguments.length)
      return globalThis.webqit.refs;
    let itnls = globalThis.webqit.refs.get(obj);
    if (!itnls) {
      itnls = new ObservableMap();
      globalThis.webqit.refs.set(obj, itnls);
    }
    let _ns, _itnls;
    while (_ns = namespaces.shift()) {
      if ((_itnls = itnls) && !(itnls = itnls.get(_ns))) {
        itnls = new ObservableMap();
        _itnls.set(_ns, itnls);
      }
    }
    return itnls;
  }
  var ObservableMap = class extends Map {
    constructor(...args) {
      super(...args);
      this.observers = /* @__PURE__ */ new Set();
    }
    set(key, value) {
      let returnValue = super.set(key, value);
      this.fire("set", key, value, key);
      return returnValue;
    }
    delete(key) {
      let returnValue = super.delete(key);
      this.fire("delete", key);
      return returnValue;
    }
    has(key) {
      this.fire("has", key);
      return super.has(key);
    }
    get(key) {
      this.fire("get", key);
      return super.get(key);
    }
    keyNames() {
      return Array.from(super.keys());
    }
    observe(type, key, callback) {
      const entry = { type, key, callback };
      this.observers.add(entry);
      return () => this.observers.delete(entry);
    }
    unobserve(type, key, callback) {
      if (Array.isArray(type) || Array.isArray(key)) {
        throw new Error(`The "type" and "key" arguments can only be strings.`);
      }
      for (let entry of this.observers) {
        if (!(_intersection([type, "*"], entry.type) && _intersection([key, "*"], entry.key) && entry.callback === callback))
          continue;
        this.observers.delete(entry);
      }
    }
    fire(type, key, ...args) {
      for (let entry of this.observers) {
        if (!(_intersection([type, "*"], entry.type) && _intersection([key, "*"], entry.key)))
          continue;
        entry.callback(...args);
      }
    }
  };
  var _intersection = (a, b) => {
    if (Array.isArray(b))
      return intersect_default(a, b).length;
    return a.includes(b);
  };

  // node_modules/@webqit/util/js/isTypeFunction.js
  function isTypeFunction_default(val) {
    return typeof val === "function";
  }

  // node_modules/@webqit/util/js/isNull.js
  function isNull_default(val) {
    return val === null || val === "";
  }

  // node_modules/@webqit/util/js/isUndefined.js
  function isUndefined_default(val) {
    return arguments.length && (val === void 0 || typeof val === "undefined");
  }

  // node_modules/@webqit/util/js/isTypeObject.js
  function isTypeObject_default(val) {
    return Array.isArray(val) || typeof val === "object" && val || isTypeFunction_default(val);
  }

  // node_modules/@webqit/util/js/isEmpty.js
  function isEmpty_default(val) {
    return isNull_default(val) || isUndefined_default(val) || val === false || val === 0 || isTypeObject_default(val) && !Object.keys(val).length;
  }

  // node_modules/@webqit/util/js/isFunction.js
  function isFunction_default(val) {
    return isTypeFunction_default(val) || val && {}.toString.call(val) === "[object function]";
  }

  // node_modules/@webqit/util/js/isNumber.js
  function isNumber_default(val) {
    return val instanceof Number || typeof val === "number";
  }

  // node_modules/@webqit/util/js/isNumeric.js
  function isNumeric_default(val) {
    return isNumber_default(val) || val !== true && val !== false && val !== null && val !== "" && !isNaN(val * 1);
  }

  // node_modules/@webqit/util/js/isString.js
  function isString_default(val) {
    return val instanceof String || typeof val === "string" && val !== null;
  }

  // node_modules/@webqit/util/js/isTypeArray.js
  function isTypeArray_default(val) {
    return !isString_default(val) && !isUndefined_default(val.length);
  }

  // node_modules/@webqit/util/arr/pushUnique.js
  function pushUnique_default(arr, ...items) {
    items.forEach((itm) => {
      if (arr.indexOf(itm) < 0) {
        arr.push(itm);
      }
    });
    return arr;
  }

  // node_modules/@webqit/util/obj/getPrototypeChain.js
  function getPrototypeChain_default(obj, until) {
    until = until || Object.prototype;
    until = until && !isArray_default(until) ? [until] : until;
    var prototypalChain = [];
    var obj = obj;
    while (obj && (!until || until.indexOf(obj) < 0) && obj.name !== "default") {
      prototypalChain.push(obj);
      obj = obj ? Object.getPrototypeOf(obj) : null;
    }
    return prototypalChain;
  }

  // node_modules/@webqit/util/obj/getAllPropertyNames.js
  function getAllPropertyNames_default(obj, until) {
    var keysAll = [];
    getPrototypeChain_default(obj, until).forEach((obj2) => {
      pushUnique_default(keysAll, ...Object.getOwnPropertyNames(obj2));
    });
    return keysAll;
  }

  // node_modules/@webqit/util/obj/mergeCallback.js
  function mergeCallback(objs, callback, deepProps = false, isReplace = false, withSymbols = false) {
    var depth = 0;
    var obj1 = objs.shift();
    if (isNumeric_default(obj1) || obj1 === true || obj1 === false) {
      depth = obj1;
      obj1 = objs.shift();
    }
    if (!objs.length) {
      throw new Error("_merge() requires two or more array/objects.");
    }
    objs.forEach((obj2, i) => {
      if (!isTypeObject_default(obj2) && !isFunction_default(obj2)) {
        return;
      }
      (deepProps ? getAllPropertyNames_default(obj2) : Object.keys(obj2)).forEach((key) => {
        if (!callback(key, obj1, obj2, i)) {
          return;
        }
        var valAtObj1 = obj1[key];
        var valAtObj2 = obj2[key];
        if ((isArray_default(valAtObj1) && isArray_default(valAtObj2) || isObject_default(valAtObj1) && isObject_default(valAtObj2)) && (depth === true || depth > 0)) {
          obj1[key] = isArray_default(valAtObj1) && isArray_default(valAtObj2) ? [] : {};
          mergeCallback([isNumeric_default(depth) ? depth - 1 : depth, obj1[key], valAtObj1, valAtObj2], callback, deepProps, isReplace, withSymbols);
        } else {
          if (isArray_default(obj1) && isArray_default(obj2)) {
            if (isReplace) {
              obj1[key] = valAtObj2;
            } else {
              obj1.push(valAtObj2);
            }
          } else {
            try {
              if (withSymbols) {
                Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj2, key));
              } else {
                obj1[key] = obj2[key];
              }
            } catch (e) {
            }
          }
        }
      });
    });
    return obj1;
  }

  // node_modules/@webqit/util/obj/merge.js
  function merge_default(...objs) {
    return mergeCallback(objs, (k, obj1, obj2) => {
      return true;
    }, false, false, false);
  }

  // node_modules/@webqit/subscript/src/params.js
  function resolveParams(...extensions) {
    let params = { runtimeParams, compilerParams, parserParams }, extension;
    while (extension = extensions.shift()) {
      const {
        runtimeParams: _runtimeParams = {},
        compilerParams: { globalsNoObserve: _globalsNoObserve = [], globalsOnlyPathsExcept: _globalsOnlyPathsExcept = [], ..._compilerParams } = {},
        parserParams: _parserParams = {}
      } = extension;
      params = {
        runtimeParams: { ...params.runtimeParams, ..._runtimeParams },
        compilerParams: { ...params.compilerParams, globalsNoObserve: [...params.compilerParams.globalsNoObserve, ..._globalsNoObserve], globalsOnlyPathsExcept: [...params.compilerParams.globalsOnlyPathsExcept, ..._globalsOnlyPathsExcept], ..._compilerParams },
        parserParams: { ...params.parserParams, ..._parserParams }
      };
      if (extensions.devMode) {
      }
    }
    return params;
  }
  var parserParams = {
    ecmaVersion: "2020",
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
    allowSuperOutsideMethod: true,
    preserveParens: false,
    locations: false
  };
  var compilerParams = {
    globalsNoObserve: ["globalThis", "arguments", "console", "debugger"],
    globalsOnlyPathsExcept: [],
    originalSource: true,
    locations: true,
    compact: 2
  };
  var runtimeParams = {
    apiVersion: 1
  };

  // node_modules/@webqit/subscript/src/util.js
  function normalizeTabs(rawSource, isFunc = false) {
    let rawSourceSplit = rawSource.split(/\n/g);
    if (rawSourceSplit.length > 1) {
      while (!rawSourceSplit[0].trim().length)
        rawSourceSplit.shift();
      let possibleBodyIndentLevel = rawSourceSplit[isFunc ? 1 : 0].split(/[^\s]/)[0].length;
      if (possibleBodyIndentLevel) {
        return rawSourceSplit.map((line, i) => {
          let possibleIndent = line.substring(0, possibleBodyIndentLevel);
          if (!possibleIndent.trim().length) {
            return line.substring(possibleBodyIndentLevel);
          }
          if (possibleIndent.trim() === "}" && i === rawSourceSplit.length - 1) {
            return "}";
          }
          return line;
        }).join("\n");
      }
    }
    return rawSource;
  }
  var _await = (maybePromise, callback) => maybePromise instanceof Promise ? maybePromise.then(callback) : callback(maybePromise);

  // node_modules/@webqit/subscript/src/runtime/inspect.js
  var store = /* @__PURE__ */ new Map();
  function inspect_default(_function, property, value = void 0) {
    let insp = store.get(_function);
    if (arguments.length > 2) {
      if (!insp) {
        insp = /* @__PURE__ */ new Map();
        store.set(_function, insp);
      }
      insp.set(property, value);
      return;
    }
    return insp && insp.get(property);
  }

  // node_modules/@webqit/subscript/src/runtime/Contract.js
  var Contract = class {
    constructor(ownerContract, graph, callee, params = {}, $thread = null, exits = null) {
      this.ownerContract = ownerContract;
      this.graph = graph;
      this.callee = callee;
      this.params = !ownerContract ? { ...params, isSubscriptFunction: true } : params;
      this.exits = exits || /* @__PURE__ */ new Map();
      this.$thread = $thread || { entries: /* @__PURE__ */ new Map(), sequence: [], ownerContract: this };
      this.subContracts = /* @__PURE__ */ new Map();
      this.observers = [];
      this.contract = function(contractId, arg1, arg2 = null, arg3 = null) {
        if (!this.graph.subContracts[contractId]) {
          throw new Error(`[${this.graph.type}:${this.graph.lineage}]: Graph not found for child contract ${contractId}.`);
        }
        let subGraph = this.graph.subContracts[contractId];
        let subParams = {
          ...this.params,
          isIterationContract: arguments.length === 3,
          iterationId: arguments.length === 3 && arg1,
          isFunctionContract: arguments.length === 4,
          functionType: arguments.length === 4 && arg1,
          isSubscriptFunction: arguments.length === 4 && arg2,
          functionScope: this.params.isFunctionContract && this.graph.lineage || this.params.functionScope
        };
        if (subParams.isIterationContract) {
          let callee3 = arg2;
          let iterationInstanceContract = new Contract(this, subGraph, callee3, subParams, this.$thread, this.exits);
          let iterations = this.subContracts.get(contractId);
          if (!iterations) {
            iterations = /* @__PURE__ */ new Map();
            this.subContracts.set(contractId, iterations);
          }
          if (iterations.has(subParams.iterationId)) {
            iterations.get(subParams.iterationId).dispose();
          }
          iterations.set(subParams.iterationId, iterationInstanceContract);
          return iterationInstanceContract.call();
        }
        let callee2, subContract, returnValue;
        if (this.subContracts.has(contractId)) {
          this.subContracts.get(contractId).dispose();
        }
        if (subParams.isFunctionContract) {
          callee2 = arg3;
          const createCallback = () => new Contract(this, subGraph, callee2, subParams);
          if (subParams.functionType !== "FunctionDeclaration") {
            returnValue = this.createFunction(createCallback);
          } else {
            let subContract2 = createCallback();
            if (subParams.apiVersion > 1) {
              returnValue = function(...args) {
                let _returnValue = subContract2.call(this, ...args);
                _returnValue = _await(_returnValue, (__returnValue) => [_returnValue, subContract2.thread.bind(subContract2), subContract2]);
                subContract2 = createCallback();
                return _returnValue;
              };
              returnValue.target = subContract2;
            } else {
              returnValue = subContract2;
            }
          }
        } else {
          callee2 = arg1, subContract = new Contract(this, subGraph, callee2, subParams, this.$thread, this.exits);
          this.subContracts.set(contractId, subContract);
          returnValue = subContract.call();
        }
        return returnValue;
      }.bind(this);
      this.contract.memo = /* @__PURE__ */ Object.create(null);
      if (this.ownerContract && !["FunctionDeclaration", "FunctionExpression"].includes(this.graph.type)) {
        this.contract.args = this.ownerContract.contract.args;
      }
      this.contract.exiting = function(keyword, arg) {
        if (!arguments.length)
          return this.exits.size;
        let exitMatch = this.exits.get(keyword) === arg;
        if (exitMatch)
          this.exits.clear();
        return exitMatch;
      }.bind(this);
      this.contract.exit = function(keyword, arg) {
        this.exits.set(keyword, arg);
      }.bind(this);
      this.contract.functions = /* @__PURE__ */ new Map();
      this.contract.functions.declaration = (functionDeclaration, callTarget) => {
        this.contract.functions.set(functionDeclaration, callTarget);
        this.applyReflection(functionDeclaration, typeof callTarget === "function" ? callTarget.target : callTarget);
      };
    }
    fire(contractUrl, event, refs) {
      if (!this.ownerContract)
        return;
      const ret = this.ownerContract.fire(contractUrl, event, refs);
      this.observers.forEach((observer) => {
        if (observer.contractUrl !== contractUrl)
          return;
        observer.callback(event, refs);
      });
      return ret;
    }
    observe(contractUrl, callback) {
      if (!this.params.isFunctionContract)
        return;
      this.observers.push({ contractUrl, callback });
    }
    call($this, ...$arguments) {
      if (this.disposed) {
        throw new Error(`[${this.graph.type}:${this.graph.lineage}]: Instance not runable after having been disposed.`);
      }
      if (!this.ownerContract) {
        this.contract.args = $arguments;
        Object.defineProperty(this.contract.args, Symbol.toStringTag, { value: "Arguments" });
      }
      let returnValue = this.callee.call($this, this.contract, ...$arguments);
      if (this.graph.$sideEffects) {
        for (let referenceId in this.graph.effects) {
          for (let effectRef of this.graph.effects[referenceId].refs) {
            this.buildThread([], effectRef, [], 0, true);
          }
        }
      }
      return _await(returnValue, () => {
        if (!this.ownerContract || this.params.isFunctionContract) {
          let exitReturnValue = this.exits.get("return");
          this.exits.clear();
          if (exitReturnValue !== void 0)
            return exitReturnValue;
        }
        return returnValue;
      });
    }
    iterate(keys = []) {
      if (this.disposed)
        return false;
      if (!["ForOfStatement", "ForInStatement"].includes(this.graph.type) || this.subContracts.size !== 1) {
        throw new Error(`Contract ${this.graph.lineage} is not an iterator.`);
      }
      let [[, iterationInstances]] = this.subContracts;
      let prev;
      if (!keys.length || keys.includes("length") && this.graph.type === "ForOfStatement") {
        for (let [, iterationInstance] of iterationInstances) {
          prev = _await(prev, () => iterationInstance.call());
        }
      } else {
        for (let key of keys) {
          let instance = iterationInstances.get(key) || iterationInstances.get(parseInt(key));
          if (!instance)
            continue;
          prev = _await(prev, () => instance.call());
        }
      }
      return prev;
    }
    thread(...eventRefs) {
      if (this.disposed)
        return false;
      this.$thread.active = true;
      for (let referenceId in this.graph.effects) {
        for (let effectRef of this.graph.effects[referenceId].refs) {
          for (let eventRef of eventRefs) {
            let [isMatch, remainder, computes] = this.matchRefs(eventRef, effectRef);
            if (!isMatch)
              continue;
            this.buildThread(eventRef, effectRef, computes, remainder);
          }
        }
      }
      return this.runThread();
    }
    runThread() {
      let execute2 = (entry2, refs2) => {
        if (["ForOfStatement", "ForInStatement"].includes(entry2.graph.type) && refs2.every((ref) => ref.executionPlan.isIterationContractTarget)) {
          let targets = refs2.map((ref) => ref.executionPlan.iterationTarget);
          this.fire(entry2.graph.lineage, "iterating", refs2);
          return entry2.iterate(targets);
        }
        this.fire(entry2.graph.lineage, "executing", refs2);
        return entry2.call();
      };
      let prev, entry, refs;
      while ((entry = this.$thread.sequence.shift()) && (refs = [...this.$thread.entries.get(entry)]) && this.$thread.entries.delete(entry)) {
        prev = _await(prev, () => {
          if (entry.disposed || !entry.filterRefs(refs).length)
            return;
          this.$thread.current = entry;
          let maybePromise = execute2(entry, refs);
          _await(maybePromise, () => {
            for (let ref of refs) {
              [].concat(ref.executionPlan.assigneeRef || ref.executionPlan.assigneeRefs || []).forEach((assigneeRef) => {
                entry.buildThread([], assigneeRef, [], 0);
              });
            }
          });
          return maybePromise;
        });
      }
      return _await(prev, () => {
        let _ret = this.exits.get("return");
        this.exits.clear();
        this.$thread.current = null;
        this.$thread.active = false;
        return _ret;
      });
    }
    buildThread(eventRef, effectRef, computes, remainder = 0, isSideEffect = false) {
      let shouldMatchEventRef = remainder > 0;
      if (this.ownerContract) {
        if (!this.compute(computes))
          return;
        if (effectRef.condition !== void 0 && !this.assert(effectRef.condition))
          return;
      } else if (!shouldMatchEventRef) {
        shouldMatchEventRef = computes.length || effectRef.condition !== void 0;
      }
      let subscriptionsObject = isSideEffect ? effectRef.$subscriptions : effectRef.subscriptions;
      Object.keys(subscriptionsObject).forEach((fullReferenceUrl) => {
        let [contractUrl, referenceId] = fullReferenceUrl.split(":");
        let selectRefs = (_subscriberInstance) => {
          if (!_subscriberInstance)
            return;
          _subscriberInstance.selectRefs(referenceId, subscriptionsObject[fullReferenceUrl], shouldMatchEventRef ? eventRef : null);
        };
        let subscriberInstance = this.locate(contractUrl);
        if (Array.isArray(subscriberInstance)) {
          subscriberInstance.forEach(selectRefs);
        } else {
          selectRefs(subscriberInstance);
        }
      });
    }
    selectRefs(referenceId, refIds, eventRef = null) {
      let $thread = this.$thread;
      let reference = this.graph.signals[referenceId];
      let compare = (a, b) => a.graph.lineage.localeCompare(b.graph.lineage, void 0, { numeric: true });
      let selectRef = (ref, computes = [], executionPlan = {}) => {
        if (!$thread.active)
          return;
        if ($thread.current && compare(this, $thread.current) < 0)
          return;
        let refs = $thread.entries.get(this);
        if (!refs) {
          refs = /* @__PURE__ */ new Set();
          $thread.entries.set(this, refs);
          $thread.sequence.push(this);
          $thread.sequence.sort(compare);
        }
        refs.add({ ...ref, computes, executionPlan });
        if (!executionPlan.assigneeRef && ["VariableDeclaration", "AssignmentExpression"].includes(this.graph.type)) {
          executionPlan.assigneeRefs = [];
          for (let referenceId2 in this.graph.effects) {
            executionPlan.assigneeRefs.push(...this.graph.effects[referenceId2].refs);
          }
        }
      };
      for (let refId of refIds) {
        let ref = reference.refs[refId];
        if (!eventRef) {
          selectRef(ref);
          continue;
        }
        let [isMatch_b, remainder_b, computes_b] = this.matchRefs(eventRef, ref);
        if (!isMatch_b)
          continue;
        if (remainder_b <= 0) {
          selectRef(ref, computes_b);
          continue;
        }
        let eventRef_balance = eventRef.slice(-remainder_b);
        let assigneeReference = "assignee" in reference ? this.graph.effects[reference.assignee] : null;
        if (assigneeReference) {
          assigneeReference.refs.forEach((assigneeRef) => {
            if (assigneeRef.depth.length) {
              let [isMatch_c, remainder_c, computes_c] = this.matchRefs(eventRef_balance, assigneeRef.depth);
              let computes_d = computes_b.concat(computes_c);
              if (isMatch_c && remainder_c > 0) {
                let newEventRef = assigneeRef.path.concat(eventRef_balance.slice(-remainder_c));
                this.buildThread(newEventRef, assigneeRef, computes_d, remainder_c);
              } else if (isMatch_c) {
                selectRef(ref, computes_d, { assigneeRef });
              }
            } else {
              let newEventRef = assigneeRef.path.concat(eventRef_balance);
              this.buildThread(newEventRef, assigneeRef, computes_b, remainder_b);
            }
          });
          continue;
        }
        if (remainder_b === 1 && this.graph.type === "ForOfStatement") {
          selectRef(ref, computes_b, { isIterationContractTarget: true, iterationTarget: eventRef_balance[0] });
          continue;
        }
        if (remainder_b === 1 && this.graph.type === "ForInStatement") {
          selectRef(ref, computes_b, { isIterationContractTarget: true, iterationTarget: eventRef_balance[0] });
          continue;
        }
      }
    }
    filterRefs(refs) {
      return refs.filter((ref) => {
        if (!this.compute(ref.computes))
          return;
        if (ref.condition !== void 0 && !this.assert(ref.condition))
          return;
        return true;
      });
    }
    matchRefs(a, b) {
      let pathA, $pathA, pathB, $pathB;
      if (Array.isArray(a)) {
        pathA = a, $pathA = a.dotSafe ? a.join(".") : void 0;
      } else {
        pathA = a.path, $pathA = a.$path;
      }
      if (Array.isArray(b)) {
        pathB = b, $pathB = b.dotSafe ? b.join(".") : void 0;
      } else {
        pathB = b.path, $pathB = b.$path;
      }
      let remainder = pathA.length - pathB.length;
      if (remainder > 0) {
        [pathA, pathB, $pathA, $pathB] = [pathB, pathA, $pathB, $pathA];
      }
      if ($pathA && $pathB) {
        return [`${$pathB}.`.startsWith(`${$pathA}.`), remainder, []];
      }
      let computes = [];
      let getVal = (element) => typeof element === "object" ? element.name : element;
      let compareIdentifiers = (a2, b2) => {
        if (!a2 || !b2)
          return false;
        let isComputeA = typeof a2 === "object" && "memoId" in a2, isComputeB = typeof b2 === "object" && "memoId" in b2;
        if (isComputeA || isComputeB) {
          computes.push((memo) => {
            return (isComputeA ? memo[a2.memoId] : getVal(a2)) === (isComputeB ? memo[b2.memoId] : getVal(b2));
          });
          return true;
        }
        return getVal(a2) === getVal(b2);
      };
      return [
        pathA.reduce((prev, identifier, i) => prev && compareIdentifiers(identifier, pathB[i]), true),
        remainder,
        computes
      ];
    }
    locate(contractUrl) {
      let ownLineage_ = this.graph.lineage + "/";
      let contractUrl_ = contractUrl + "/";
      if (contractUrl_ === ownLineage_)
        return this;
      if (contractUrl_.startsWith(ownLineage_)) {
        let postLineage = contractUrl.slice(ownLineage_.length).split("/");
        let subContract = this.subContracts.get(parseInt(postLineage.shift()));
        if (postLineage.length) {
          if (subContract instanceof Map) {
            return Array.from(subContract).reduce((subContracts, [key, _subContract]) => {
              return subContracts.concat(_subContract.locate(contractUrl));
            }, []);
          }
          if (subContract) {
            return subContract.locate(contractUrl);
          }
        }
        return subContract;
      }
      if (this.ownerContract) {
        return this.ownerContract.locate(contractUrl);
      }
    }
    compute(computes) {
      return !computes.some((compute) => compute(this.contract.memo) === false);
    }
    assert(condition) {
      if (typeof condition === "string" && condition.includes(":")) {
        let [contractUrl, _condition] = condition.split(":");
        return this.locate(contractUrl).assert(_condition);
      }
      let conditionDef = this.graph.conditions[condition];
      let memo = this.contract.memo;
      if (typeof conditionDef.parent !== "undefined" && !this.assert(conditionDef.parent))
        return false;
      if (typeof conditionDef.switch !== "undefined") {
        return conditionDef.cases.some((_case) => memo[_case] === memo[conditionDef.switch]);
      }
      if (typeof conditionDef.whenNot !== "undefined") {
        return !memo[conditionDef.whenNot];
      }
      if (typeof conditionDef.when !== "undefined") {
        return memo[conditionDef.when];
      }
      return true;
    }
    dispose() {
      if (this.params.isFunctionContract)
        return;
      this.subContracts.forEach((subContract, contractId) => {
        if (subContract instanceof Map) {
          subContract.forEach((subContract2) => subContract2.dispose());
          subContract.clear();
        } else {
          subContract.dispose();
        }
      });
      this.subContracts.clear();
      delete this.ownerContract;
      delete this.callee;
      delete this.params;
      delete this.contract.memo;
      this.disposed = true;
    }
    createFunction(createCallback, defaultThis = void 0) {
      let contract = createCallback();
      const execute2 = function(_contract, ...args) {
        let _returnValue = _contract.call(this === void 0 ? defaultThis : this, ...args);
        if (_contract.params.isSubscriptFunction && _contract.params.apiVersion > 1) {
          _returnValue = _await(_returnValue, (__returnValue) => [__returnValue, _contract.thread.bind(_contract), _contract]);
          contract = createCallback(contract);
        }
        return _returnValue;
      };
      const _function = contract instanceof Promise || contract.callee instanceof async function() {
      }.constructor ? async function() {
        return _await(contract, (_contract) => execute2.call(this, _contract, ...arguments));
      } : function() {
        return execute2.call(this, contract, ...arguments);
      };
      _await(contract, (_contract) => {
        this.applyReflection(_function, _contract);
      });
      inspect_default(_function, "properties", _await(contract, (_contract) => {
        const graph = {
          type: _contract.params.functionType || "Program",
          apiVersion: _contract.params.apiVersion || 1,
          isSubscriptFunction: _contract.params.isSubscriptFunction,
          sideEffects: _contract.graph.sideEffects || false
        };
        if (_contract.params.isSubscriptFunction) {
          graph.dependencies = [];
          for (const [id, effect] of Object.entries(_contract.graph.effects)) {
            graph.dependencies.push(...effect.refs.map((ref) => ref.path.map((s) => !("name" in s) ? Infinity : s.name)));
          }
        }
        return graph;
      }));
      return _function;
    }
    applyReflection(_function, contract) {
      Object.defineProperty(contract.callee, "length", { configurable: true, value: contract.callee.length - 1 });
      const compiledSourceNeat = contract.callee.toString();
      Object.defineProperty(contract.callee, "toString", { configurable: true, value: (compiledSource = false) => {
        if (!compiledSource && contract.graph.originalSource) {
          return contract.graph.originalSource;
        }
        return compiledSourceNeat;
      } });
      let properties = {
        name: contract.callee.name,
        length: contract.callee.length,
        toString: contract.callee.toString
      };
      if (contract.params.isSubscriptFunction) {
        if (!(contract.params.apiVersion > 1)) {
          properties = {
            ...properties,
            thread: contract.thread.bind(contract),
            dispose: contract.dispose.bind(contract),
            runtime: contract
          };
        }
      }
      Object.keys(properties).forEach((name) => {
        Object.defineProperty(_function, name, { configurable: true, value: properties[name] });
      });
    }
  };

  // node_modules/@webqit/subscript/src/runtime/Runtime.js
  var Runtime = class extends Contract {
    static create(compilation, parameters = [], runtimeParams2 = {}) {
      const isAsync = runtimeParams2.async || compilation.graph.hoistedAwaitKeyword;
      const _Function = isAsync ? Object.getPrototypeOf(async function() {
      }).constructor : Function;
      const callee = runtimeParams2.compileFunction ? runtimeParams2.compileFunction(compilation.source, [compilation.identifier + ""].concat(parameters)) : new _Function(compilation.identifier + "", ...parameters, compilation.source);
      return new this(null, compilation.graph, callee, runtimeParams2);
    }
    static createFunction(sourceName, compilation, parameters = [], runtimeParams2 = {}, defaultThis, originalSource = null) {
      runtimeParams2 = { ...runtimeParams2, functionType: "Constructor" };
      if (compilation instanceof Promise) {
        runtimeParams2 = { ...runtimeParams2, async: true };
      }
      const createCallback = (contract) => {
        if (contract) {
          return new this(null, contract.graph, contract.callee, runtimeParams2);
        }
        return _await(compilation, (_compilation) => applyReflection(this.create(_compilation, parameters, runtimeParams2)));
      };
      const applyReflection = (contract) => {
        if (contract.graph.originalSource && !contract.graph.originalSourceModified) {
          const ownSource = `${runtimeParams2.async || contract.graph.hoistedAwaitKeyword ? "async " : ""}function ${sourceName || "anonymous"}`;
          const originalSourceIndented = contract.graph.originalSource.split(/\n/g).map((line) => `    ${line}`).join(`
`);
          contract.graph.originalSource = `${ownSource}(${parameters.join(", ")}) {
${originalSourceIndented}
}`;
          contract.graph.originalSourceModified = true;
        }
        if (sourceName) {
          Object.defineProperty(contract.callee, "name", { configurable: true, value: sourceName });
        }
        return contract;
      };
      const _function = this.prototype.createFunction(createCallback, defaultThis);
      inspect_default(_function, "locations", _await(compilation, (_compilation) => ({
        locations: _compilation.locations
      })));
      return _function;
    }
  };

  // node_modules/@webqit/subscript/src/SubscriptFunctionLite.js
  function SubscriptFunctionLite(...args) {
    if (typeof window !== "object")
      throw new Error(`No window in context.`);
    const params = resolveParams(typeof args[args.length - 1] === "object" ? args.pop() : {});
    const source = normalizeTabs(args.pop() || "");
    const parameters = args;
    const createFunction = (compilation) => Runtime.createFunction(void 0, compilation, parameters, params.runtimeParams, this, source);
    if (window.webqit?.SubscriptCompiler && !params.runtimeParams.async) {
      const { parse, compile } = window.webqit.SubscriptCompiler;
      const ast = parse(source, params.parserParams);
      return createFunction(compile(ast, params.compilerParams));
    }
    window.webqit = window.webqit || {};
    if (!window.webqit.SubscriptCompilerWorker) {
      const customUrl = document.querySelector('meta[name="subscript-compiler-url"]');
      const compilerUrls = (customUrl?.content.split(",") || []).concat("https://unpkg.com/@webqit/subscript/dist/compiler.js");
      const workerScriptText = `
        const compilerUrls = [ '${compilerUrls.join(`','`)}' ];
        ( function importScript() {
            try { importScripts( compilerUrls.shift().trim() ) } catch( e ) { if ( compilerUrls.length ) { importScript(); } }
        } )();
        const { parse, compile } = self.webqit.SubscriptCompiler;
        self.onmessage = e => {
            const { source, params } = e.data;
            const ast = parse( source, params.parserParams );
            const compilation = compile( ast, params.compilerParams );
            compilation.identifier = compilation.identifier.toString();
            e.ports[ 0 ]?.postMessage( compilation );
        };`;
      window.webqit.SubscriptCompilerWorker = new Worker(`data:text/javascript;base64,${btoa(workerScriptText)}`);
    }
    return createFunction(new Promise((res) => {
      let messageChannel = new MessageChannel();
      webqit.SubscriptCompilerWorker.postMessage({ source, params }, [messageChannel.port2]);
      messageChannel.port1.onmessage = (e) => res(e.data);
    }));
  }
  Object.defineProperty(SubscriptFunctionLite, "inspect", { value: inspect_default });

  // ../observer/src/main.js
  var main_exports = {};
  __export(main_exports, {
    apply: () => apply,
    batch: () => batch,
    construct: () => construct,
    deep: () => deep,
    defineProperties: () => defineProperties,
    defineProperty: () => defineProperty,
    deleteProperties: () => deleteProperties,
    deleteProperty: () => deleteProperty,
    get: () => get,
    getOwnPropertyDescriptor: () => getOwnPropertyDescriptor,
    getOwnPropertyDescriptors: () => getOwnPropertyDescriptors,
    getPrototypeOf: () => getPrototypeOf,
    has: () => has,
    intercept: () => intercept,
    isExtensible: () => isExtensible,
    observe: () => observe,
    ownKeys: () => ownKeys,
    preventExtensions: () => preventExtensions,
    set: () => set,
    setPrototypeOf: () => setPrototypeOf
  });

  // ../observer/node_modules/@webqit/util/js/isObject.js
  function isObject_default2(val) {
    return !Array.isArray(val) && typeof val === "object" && val;
  }

  // ../observer/node_modules/@webqit/util/js/getType.js
  function getType_default2(val) {
    return typeof val;
  }

  // ../observer/node_modules/@webqit/util/js/isArray.js
  function isArray_default2(val) {
    return Array.isArray(val);
  }

  // ../observer/node_modules/@webqit/util/arr/intersect.js
  function intersect_default2(arr, arr2, callback = null) {
    return !isArray_default2(arr2) ? [] : arr.filter((val1) => callback ? arr2.filter((val2) => callback(val1, val2)).length : arr2.indexOf(val1) !== -1);
  }

  // ../observer/node_modules/@webqit/util/js/internals.js
  function internals2(obj, ...namespaces) {
    if (!globalThis.webqit) {
      globalThis.webqit = {};
    }
    if (!globalThis.webqit.refs) {
      Object.defineProperty(globalThis.webqit, "refs", { value: new ObservableMap2() });
    }
    if (!arguments.length)
      return globalThis.webqit.refs;
    let itnls = globalThis.webqit.refs.get(obj);
    if (!itnls) {
      itnls = new ObservableMap2();
      globalThis.webqit.refs.set(obj, itnls);
    }
    let _ns, _itnls;
    while (_ns = namespaces.shift()) {
      if ((_itnls = itnls) && !(itnls = itnls.get(_ns))) {
        itnls = new ObservableMap2();
        _itnls.set(_ns, itnls);
      }
    }
    return itnls;
  }
  var ObservableMap2 = class extends Map {
    constructor(...args) {
      super(...args);
      this.observers = /* @__PURE__ */ new Set();
    }
    set(key, value) {
      let returnValue = super.set(key, value);
      this.fire("set", key, value, key);
      return returnValue;
    }
    delete(key) {
      let returnValue = super.delete(key);
      this.fire("delete", key);
      return returnValue;
    }
    has(key) {
      this.fire("has", key);
      return super.has(key);
    }
    get(key) {
      this.fire("get", key);
      return super.get(key);
    }
    keyNames() {
      return Array.from(super.keys());
    }
    observe(type, key, callback) {
      const entry = { type, key, callback };
      this.observers.add(entry);
      return () => this.observers.delete(entry);
    }
    unobserve(type, key, callback) {
      if (Array.isArray(type) || Array.isArray(key)) {
        throw new Error(`The "type" and "key" arguments can only be strings.`);
      }
      for (let entry of this.observers) {
        if (!(_intersection2([type, "*"], entry.type) && _intersection2([key, "*"], entry.key) && entry.callback === callback))
          continue;
        this.observers.delete(entry);
      }
    }
    fire(type, key, ...args) {
      for (let entry of this.observers) {
        if (!(_intersection2([type, "*"], entry.type) && _intersection2([key, "*"], entry.key)))
          continue;
        entry.callback(...args);
      }
    }
  };
  var _intersection2 = (a, b) => {
    if (Array.isArray(b))
      return intersect_default2(a, b).length;
    return a.includes(b);
  };

  // ../observer/node_modules/@webqit/util/js/isTypeFunction.js
  function isTypeFunction_default2(val) {
    return typeof val === "function";
  }

  // ../observer/node_modules/@webqit/util/js/isClass.js
  function isClass_default2(val) {
    return isTypeFunction_default2(val) && /^class\s?/.test(Function.prototype.toString.call(val));
  }

  // ../observer/node_modules/@webqit/util/js/isNull.js
  function isNull_default2(val) {
    return val === null || val === "";
  }

  // ../observer/node_modules/@webqit/util/js/isUndefined.js
  function isUndefined_default2(val) {
    return arguments.length && (val === void 0 || typeof val === "undefined");
  }

  // ../observer/node_modules/@webqit/util/js/isTypeObject.js
  function isTypeObject_default2(val) {
    return Array.isArray(val) || typeof val === "object" && val || isTypeFunction_default2(val);
  }

  // ../observer/node_modules/@webqit/util/js/isEmpty.js
  function isEmpty_default2(val) {
    return isNull_default2(val) || isUndefined_default2(val) || val === false || val === 0 || isTypeObject_default2(val) && !Object.keys(val).length;
  }

  // ../observer/node_modules/@webqit/util/js/isFunction.js
  function isFunction_default2(val) {
    return isTypeFunction_default2(val) || val && {}.toString.call(val) === "[object function]";
  }

  // ../observer/node_modules/@webqit/util/js/isString.js
  function isString_default2(val) {
    return val instanceof String || typeof val === "string" && val !== null;
  }

  // ../observer/node_modules/@webqit/util/js/isTypeArray.js
  function isTypeArray_default2(val) {
    return !isString_default2(val) && !isUndefined_default2(val.length);
  }

  // ../observer/node_modules/@webqit/util/arr/from.js
  function from_default(val, castObject = true) {
    if (isArray_default2(val)) {
      return val;
    }
    ;
    if (!castObject && isObject_default2(val)) {
      return [val];
    }
    ;
    if (val !== false && val !== 0 && isEmpty_default2(val)) {
      return [];
    }
    ;
    if (isTypeArray_default2(val)) {
      return Array.prototype.slice.call(val);
    }
    ;
    if (isObject_default2(val)) {
      return Object.values(val);
    }
    ;
    return [val];
  }

  // ../observer/src/core/Registration.js
  var Registration = class {
    constructor(registry, dfn) {
      this.registry = registry;
      Object.assign(this, { ...dfn, target: registry.target });
      if (this.params.signal) {
        this.params.signal.addEventListener("abort", () => this.remove());
      }
    }
    remove() {
      this.removed = true;
      return this.registry.removeRegistration(this);
    }
  };

  // ../observer/src/util.js
  var _ = (...args) => internals2("observer-api", ...args);
  var _await2 = (value, callback) => value instanceof Promise ? value.then(callback) : callback(value);

  // ../observer/src/core/ListenerRegistration.js
  var ListenerRegistration = class extends Registration {
    constructor() {
      super(...arguments);
      Object.defineProperty(this, "abortController", { value: new AbortController() });
      Object.defineProperty(this, "signal", { value: this.abortController.signal });
    }
    remove() {
      this.abortController.abort();
      super.remove();
    }
    fire(events) {
      if (this.handler.recursionTarget && !["inject", "force-async", "force-sync"].includes(this.params.recursions))
        return;
      let matches = events, filter = this.filter;
      if (filter !== Infinity && (filter = from_default(filter, false))) {
        matches = events.filter((event) => filter.includes(event.key));
      }
      if (this.params.diff) {
        matches = matches.filter((event) => event.type !== "set" || event.value !== event.oldValue);
      }
      if (matches.length) {
        if (this.handler.recursionTarget && this.params.recursions !== "force-sync") {
          this.handler.recursionTarget.push(...matches);
          return;
        }
        this.handler.recursionTarget = this.params.recursions === "inject" ? matches : [];
        const $ret = this.filter === Infinity || Array.isArray(this.filter) ? this.handler(matches, this) : this.handler(matches[0], this);
        return _await2($ret, (ret) => {
          const recursions = this.handler.recursionTarget;
          delete this.handler.recursionTarget;
          if (this.params.recursions === "force-async") {
            if (recursions.length)
              return this.fire(recursions);
          }
          return ret;
        });
      }
    }
  };

  // ../observer/src/core/Registry.js
  var Registry = class {
    constructor(target) {
      this.target = target;
      this.entries = [];
    }
    addRegistration(registration) {
      this.entries.push(registration);
      return registration;
    }
    removeRegistration(registration) {
      this.entries = this.entries.filter((_entry) => _entry !== registration);
    }
    static _getInstance(type, target, createIfNotExists = true, namespace = this.__namespace) {
      if (!isTypeObject_default2(target))
        throw new Error(`Subject must be of type object; "${getType_default2(target)}" given!`);
      let ImplementationClass = this;
      if (namespace && _("namespaces").has(type + "-" + namespace)) {
        ImplementationClass = _("namespaces").get(type + "-" + namespace);
        type += "-" + namespace;
      }
      if (!_(target, "registry").has(type) && createIfNotExists) {
        _(target, "registry").set(type, new ImplementationClass(target));
      }
      return _(target, "registry").get(type);
    }
    static _namespace(type, namespace, ImplementationClass = null) {
      type += "-" + namespace;
      if (arguments.length === 2)
        return _("namespaces").get(type);
      if (!(ImplementationClass.prototype instanceof this)) {
        throw new Error(`The implementation of the namespace ${this.name}.${namespace} must be a subclass of ${this.name}.`);
      }
      _("namespaces").set(type, ImplementationClass);
      ImplementationClass.__namespace = namespace;
    }
  };

  // ../observer/src/core/ListenerRegistry.js
  var ListenerRegistry = class extends Registry {
    static getInstance(target, createIfNotExists = true, namespace = null) {
      return super._getInstance("listeners", ...arguments);
    }
    static namespace(namespace, ImplementationClass = null) {
      return super._namespace("listeners", ...arguments);
    }
    constructor(target) {
      super(target);
      this.batches = [];
    }
    addRegistration(filter, handler, params) {
      return super.addRegistration(new ListenerRegistration(this, { filter, handler, params }));
    }
    emit(events) {
      if (this.batches.length) {
        this.batches[0].events.push(...events);
        return;
      }
      this.entries.forEach((listener) => listener.fire(events));
    }
    batch(callback) {
      this.batches.unshift({ entries: [...this.entries], events: [] });
      const returnValue = callback();
      return _await2(returnValue, (returnValue2) => {
        const batch2 = this.batches.shift();
        if (batch2.events.length) {
          batch2.entries.forEach((listener) => listener.fire(batch2.events));
        }
        return returnValue2;
      });
    }
  };

  // ../observer/src/core/TrapsRegistration.js
  var TrapsRegistration = class extends Registration {
    exec(descriptor, next, recieved) {
      if (this.running || !this.traps[descriptor.type]) {
        return next(...Array.prototype.slice.call(arguments, 2));
      }
      this.running = true;
      return this.traps[descriptor.type](descriptor, recieved, (...args) => {
        this.running = false;
        return next(...args);
      });
    }
  };

  // ../observer/src/core/TrapsRegistry.js
  var TrapsRegistry = class extends Registry {
    static getInstance(target, createIfNotExists = true, namespace = null) {
      return super._getInstance("traps", ...arguments);
    }
    static namespace(namespace, ImplementationClass = null) {
      return super._namespace("traps", ...arguments);
    }
    addRegistration(dfn) {
      return super.addRegistration(new TrapsRegistration(this, dfn));
    }
    emit(descriptor, defaultHandler = null) {
      const $this = this;
      return function next(index, ..._args) {
        const registration = $this.entries[index];
        if (registration) {
          return registration.exec(descriptor, (...args) => {
            return next(index + 1, ...args);
          }, ..._args);
        }
        return defaultHandler ? defaultHandler(descriptor, ..._args) : _args[0];
      }(0);
    }
  };

  // ../observer/src/core/Descriptor.js
  var Descriptor = class {
    constructor(target, dfn) {
      this.target = target;
      if (!dfn.type)
        throw new Error("Descriptor type must be given in definition!");
      Object.assign(this, dfn);
    }
  };

  // ../observer/src/actors.js
  var actors_exports = {};
  __export(actors_exports, {
    accessorize: () => accessorize,
    proxy: () => proxy,
    unaccessorize: () => unaccessorize,
    unproxy: () => unproxy
  });
  function accessorize(target, props, params = {}) {
    target = resolveTarget(target);
    const accessorizedProps = _(target, "accessorizedProps");
    function getDescriptorDeep(prop) {
      let descriptor, proto = target;
      do {
        descriptor = Object.getOwnPropertyDescriptor(proto, prop);
      } while (!descriptor && (proto = Object.getPrototypeOf(proto)));
      return descriptor ? { proto, descriptor } : { descriptor: { value: void 0, configurable: true, enumerable: true, writable: true } };
    }
    function accessorizeProp(prop) {
      if (accessorizedProps.has(prop + ""))
        return true;
      const currentDescriptorRecord = getDescriptorDeep(prop);
      currentDescriptorRecord.getValue = function() {
        return this.descriptor.get ? this.descriptor.get() : this.descriptor.value;
      };
      currentDescriptorRecord.setValue = function(value) {
        this.dirty = true;
        return this.descriptor.set ? this.descriptor.set(value) !== false : (this.descriptor.value = value, true);
      };
      currentDescriptorRecord.intact = function() {
        const currentDescriptor = Object.getOwnPropertyDescriptor(target, prop);
        return currentDescriptor?.get === accessorization.get && currentDescriptor?.set === accessorization.set && accessorizedProps.get(prop + "") === this;
      };
      currentDescriptorRecord.restore = function() {
        if (!this.intact())
          return false;
        if (this.proto && this.proto !== target || !this.proto && !this.dirty) {
          delete target[prop];
        } else {
          Object.defineProperty(target, prop, this.descriptor);
        }
        accessorizedProps.delete(prop + "");
        return true;
      };
      accessorizedProps.set(prop + "", currentDescriptorRecord);
      const { enumerable = true } = currentDescriptorRecord.descriptor;
      const accessorization = { enumerable, configurable: true };
      if ("value" in currentDescriptorRecord.descriptor || currentDescriptorRecord.descriptor.set) {
        accessorization.set = function(value) {
          return set(this, prop, value, params);
        };
      }
      if ("value" in currentDescriptorRecord.descriptor || currentDescriptorRecord.descriptor.get) {
        accessorization.get = function() {
          return get(this, prop, params);
        };
      }
      try {
        Object.defineProperty(target, prop, accessorization);
        return true;
      } catch (e) {
        accessorizedProps.delete(prop + "");
        return false;
      }
    }
    const _props = Array.isArray(props) ? props : props === void 0 ? Object.keys(target) : [props];
    const statuses = _props.map(accessorizeProp);
    return props === void 0 || Array.isArray(props) ? statuses : statuses[0];
  }
  function unaccessorize(target, props, params = {}) {
    target = resolveTarget(target);
    const accessorizedProps = _(target, "accessorizedProps");
    function unaccessorizeProp(prop) {
      if (!accessorizedProps.has(prop + ""))
        return true;
      return accessorizedProps.get(prop + "").restore();
    }
    const _props = Array.isArray(props) ? props : props === void 0 ? Object.keys(target) : [props];
    const statuses = _props.map(unaccessorizeProp);
    return props === void 0 || Array.isArray(props) ? statuses : statuses[0];
  }
  function proxy(target, params = {}) {
    target = resolveTarget(target);
    const proxy2 = new Proxy(target, {
      apply: (target2, thisArgument, argumentsList) => apply(target2, thisArgument, argumentsList, params),
      construct: (target2, argumentsList, newTarget = null) => construct(target2, argumentsList, newTarget, params),
      defineProperty: (target2, propertyKey, attributes) => defineProperty(target2, propertyKey, attributes, params),
      deleteProperty: (target2, propertyKey) => deleteProperty(target2, propertyKey, params),
      get: (target2, propertyKey, receiver = null) => {
        const val = get(target2, propertyKey, { ...params, receiver });
        if (params.proxyAutoBinding !== false && isFunction_default2(val) && !isClass_default2(val)) {
          return function(...args) {
            const _this = this || proxy2;
            return batch(_this, () => val.call(_this, ...args));
          };
        }
        return val;
      },
      getOwnPropertyDescriptor: (target2, propertyKey) => getOwnPropertyDescriptor(target2, propertyKey, params),
      getPrototypeOf: (target2) => getPrototypeOf(target2, params),
      has: (target2, propertyKey) => has(target2, propertyKey, params),
      isExtensible: (target2) => isExtensible(target2, params),
      ownKeys: (target2) => ownKeys(target2, params),
      preventExtensions: (target2) => preventExtensions(target2, params),
      set: (target2, propertyKey, value, receiver = null) => set(target2, propertyKey, value, { ...params, receiver }),
      setPrototypeOf: (target2, prototype) => setPrototypeOf(target2, prototype, params)
    });
    _(proxy2).set(proxy2, target);
    return proxy2;
  }
  function unproxy(target) {
    return _(target).get(target) || target;
  }
  function resolveTarget(target) {
    if (!target || !isTypeObject_default2(target))
      throw new Error("Target must be of type object!");
    return unproxy(target);
  }

  // ../observer/src/main.js
  function deep(target, path, receiver, final = (x) => x, params = {}) {
    if (!path.length)
      return;
    return function eat(target2, path2, $params) {
      const segment = path2[$params.level];
      const isLastSegment = $params.level === path2.length - 1;
      if (target2 instanceof Descriptor && target2.type !== "get") {
        $params = { ...$params, probe: "always" };
      } else if ($params.probe !== "always") {
        $params = { ...$params, probe: !isLastSegment };
      }
      return receiver(target2, segment, (result, ...args) => {
        const addTrail = (desc) => {
          if (!(desc instanceof Descriptor))
            return;
          desc.path = [desc.key];
          if (target2 instanceof Descriptor) {
            desc.path = target2.path.concat(desc.key);
            Object.defineProperty(desc, "context", { get: () => target2, configurable: true });
          }
        };
        const advance = (result2) => {
          const $value = resolveObj(result2, false);
          return _await2($value, ($value2) => {
            if (result2 instanceof Descriptor) {
              result2.value = $value2;
            } else {
              result2 = $value2;
            }
            const flags = args[0] || {};
            return eat(result2, path2, { ...$params, ...flags, level: $params.level + 1 });
          });
        };
        if (isPropsList(segment) && Array.isArray(result)) {
          result.forEach(addTrail);
          if (isLastSegment)
            return final(result, ...args);
          return result.map(advance);
        }
        addTrail(result);
        if (isLastSegment)
          return final(result, ...args);
        return advance(result);
      }, $params);
    }(target, path.slice(0), { ...params, level: 0 });
  }
  function observe(target, prop, receiver, params = {}) {
    target = resolveObj(target, !params.level);
    if (isFunction_default2(arguments[1])) {
      [, receiver, params = {}] = arguments;
      prop = Infinity;
    }
    if (!isFunction_default2(receiver))
      throw new Error(`Handler must be a function; "${getType_default2(receiver)}" given!`);
    params = { ...params, descripted: true };
    delete params.live;
    if (!isTypeObject_default2(target))
      return params.probe && get(target, prop, receiver, params);
    const emit = bind(target, prop, receiver, params);
    if (params.probe) {
      return get(target, prop, emit, params);
    }
    return emit();
  }
  function intercept(target, traps, params = {}) {
    target = resolveObj(target);
    if (!isObject_default2(traps)) {
      [, , , params = {}] = arguments;
      traps = { [arguments[1]]: arguments[2] };
    }
    return TrapsRegistry.getInstance(target, true, params.namespace).addRegistration({ traps, params });
  }
  function getOwnPropertyDescriptor(target, prop, receiver = (x) => x, params = {}) {
    return exec(target, "getOwnPropertyDescriptor", { key: prop }, receiver, params);
  }
  function getOwnPropertyDescriptors(target, prop, receiver = (x) => x, params = {}) {
    return exec(target, "getOwnPropertyDescriptors", { key: prop }, receiver, params);
  }
  function getPrototypeOf(target, receiver = (x) => x, params = {}) {
    return exec(target, "getPrototypeOf", {}, receiver, params);
  }
  function isExtensible(target, receiver = (x) => x, params = {}) {
    return exec(target, "isExtensible", {}, receiver, params);
  }
  function ownKeys(target, receiver = (x) => x, params = {}) {
    return exec(target, "ownKeys", {}, receiver, params);
  }
  function has(target, prop, receiver = (x) => x, params = {}) {
    return exec(target, "has", { key: prop }, receiver, params);
  }
  function get(target, prop, receiver = (x) => x, params = {}) {
    let isLive;
    target = resolveObj(target, !params.level);
    if (isObject_default2(receiver)) {
      [params, receiver] = [receiver, (x) => x];
    } else if (params.live) {
      isLive = true;
    }
    return resolveProps(target, prop, (props) => {
      const related = [...props];
      return function next(results, _props, _done) {
        if (!_props.length)
          return _done(results);
        const prop2 = _props.shift();
        function defaultGet(descriptor2, value = void 0) {
          const _next = (value2) => (descriptor2.value = value2, next([...results, params.live || params.descripted ? descriptor2 : value2], _props, _done));
          if (arguments.length > 1)
            return _next(value);
          const accessorizedProps = _(target, "accessorizedProps", false);
          const accessorization = accessorizedProps && accessorizedProps.get(descriptor2.key + "");
          if (accessorization && accessorization.intact()) {
            return _next(accessorization.getValue());
          }
          return _next(Reflect.get(target, descriptor2.key, ...params.receiver ? [params.receiver] : []));
        }
        const descriptor = new Descriptor(target, {
          type: "get",
          key: prop2,
          value: void 0,
          related
        });
        if (!isTypeObject_default2(target))
          return next([...results, params.live || params.descripted ? descriptor : void 0], _props, _done);
        const listenerRegistry = TrapsRegistry.getInstance(target, false, params.namespace);
        if (listenerRegistry) {
          return listenerRegistry.emit(descriptor, defaultGet);
        }
        return defaultGet(descriptor);
      }([], props.slice(0), (results) => {
        const result_s = isPropsList(prop) ? results : results[0];
        if (isLive && isTypeObject_default2(target)) {
          const emit = bind(target, prop, receiver, params);
          return emit(result_s);
        }
        return receiver(result_s);
      });
    }, params);
  }
  function batch(target, callback, params = {}) {
    target = resolveObj(target);
    return ListenerRegistry.getInstance(target, true, params.namespace).batch(callback);
  }
  function set(target, prop, value, receiver = (x) => x, params = {}, def = false) {
    target = resolveObj(target);
    let entries = [[prop, value]];
    if (isObject_default2(prop)) {
      [, , receiver = (x) => x, params = {}, def = false] = arguments;
      entries = Object.entries(prop);
    }
    if (isObject_default2(receiver)) {
      [def, params, receiver] = [typeof params === "boolean" ? params : false, receiver, (x) => x];
    }
    const related = entries.map(([prop2]) => prop2);
    return function next(descriptors, entries2, _done) {
      if (!entries2.length)
        return _done(descriptors);
      const [prop2, value2] = entries2.shift();
      function defaultSet(descriptor, status = void 0) {
        const _next = (status2) => (descriptor.status = status2, next(descriptors.concat(descriptor), entries2, _done));
        if (arguments.length > 1)
          return _next(descriptor, status);
        const accessorizedProps = _(target, "accessorizedProps", false);
        const accessorization = accessorizedProps && accessorizedProps.get(descriptor.key + "");
        if (descriptor.type === "defineProperty") {
          if (accessorization && !accessorization.restore())
            _next(false);
          Object.defineProperty(target, descriptor.key, descriptor.value);
          return _next(true);
        }
        if (accessorization && accessorization.intact()) {
          return _next(accessorization.setValue(descriptor.value));
        }
        return _next(Reflect.set(target, descriptor.key, descriptor.value));
      }
      function exec2(isUpdate, oldValue) {
        if (params.diff && value2 === oldValue)
          return next(descriptors, entries2, _done);
        const descriptor = new Descriptor(target, {
          type: def ? "defineProperty" : "set",
          key: prop2,
          value: value2,
          isUpdate,
          oldValue,
          related: [...related],
          detail: params.detail
        });
        const listenerRegistry = TrapsRegistry.getInstance(target, false, params.namespace);
        return listenerRegistry ? listenerRegistry.emit(descriptor, defaultSet) : defaultSet(descriptor);
      }
      return has(target, prop2, (exists) => {
        if (!exists)
          return exec2(exists);
        return get(target, prop2, (oldValue) => exec2(exists, oldValue), params);
      }, params);
    }([], entries.slice(0), (descriptors) => {
      const listenerRegistry = ListenerRegistry.getInstance(target, false, params.namespace);
      if (listenerRegistry)
        listenerRegistry.emit(descriptors);
      return receiver(isPropsList(prop) ? descriptors.map((opr) => opr.status) : descriptors[0]?.status);
    });
  }
  function defineProperty(target, prop, descriptor, receiver = (x) => x, params = {}) {
    return set(target, prop, descriptor, receiver, params, true);
  }
  function defineProperties(target, descriptors, receiver = (x) => x, params = {}) {
    return set(target, descriptors, receiver, params, true);
  }
  function deleteProperty(target, prop, receiver = (x) => x, params = {}) {
    target = resolveObj(target);
    if (isObject_default2(receiver)) {
      [params, receiver] = [receiver, (x) => x];
    }
    const props = from_default(prop, false), related = [...props];
    return function next(descriptors, props2, _done) {
      if (!props2.length)
        return _done(descriptors);
      const prop2 = props2.shift();
      function defaultDel(descriptor, status = void 0) {
        const _next = (status2) => (descriptor.status = status2, next(descriptors.concat(descriptor), props2, _done));
        if (arguments.length > 1)
          return _next(descriptor, status);
        const accessorizedProps = _(target, "accessorizedProps", false);
        const accessorization = accessorizedProps && accessorizedProps.get(descriptor.key + "");
        if (accessorization && !accessorization.restore())
          _next(false);
        return _next(Reflect.deleteProperty(target, descriptor.key));
      }
      function exec2(oldValue) {
        const descriptor = new Descriptor(target, {
          type: "deleteProperty",
          key: prop2,
          oldValue,
          related: [...related],
          detail: params.detail
        });
        const listenerRegistry = TrapsRegistry.getInstance(target, false, params.namespace);
        return listenerRegistry ? listenerRegistry.emit(descriptor, defaultDel) : defaultDel(descriptor);
      }
      return get(target, prop2, exec2, params);
    }([], props.slice(0), (descriptors) => {
      const listenerRegistry = ListenerRegistry.getInstance(target, false, params.namespace);
      if (listenerRegistry)
        listenerRegistry.emit(descriptors);
      return receiver(isPropsList(prop) ? descriptors.map((opr) => opr.status) : descriptors[0].status);
    });
  }
  function deleteProperties(target, props, receiver = (x) => x, params = {}) {
    return deleteProperty(...arguments);
  }
  function construct(target, argumentsList, newTarget = null, receiver = (x) => x, params = {}) {
    return exec(target, "construct", arguments.length > 2 ? { argumentsList, newTarget } : { argumentsList }, receiver, params);
  }
  function apply(target, thisArgument, argumentsList, receiver = (x) => x, params = {}) {
    return exec(target, "apply", { thisArgument, argumentsList }, receiver, params);
  }
  function setPrototypeOf(target, proto, receiver = (x) => x, params = {}) {
    return exec(target, "setPrototypeOf", { proto }, receiver, params);
  }
  function preventExtensions(target, receiver = (x) => x, params = {}) {
    return exec(target, "preventExtensions", {}, receiver, params);
  }
  function bind(target, prop, receiver, params = {}) {
    let controller;
    if (!params.signal) {
      controller = new AbortController();
      params = { ...params, signal: controller.signal };
    }
    const listenerRegistry = ListenerRegistry.getInstance(target, true, params.namespace);
    return function emit(descriptor_s, prevRegistration = null) {
      prevRegistration?.remove();
      const registrationNext = listenerRegistry.addRegistration(prop, emit, params);
      const flags = { signal: registrationNext.signal };
      if (arguments.length) {
        const handlerReturnValue = receiver(descriptor_s, flags);
        if (arguments.length > 1)
          return handlerReturnValue;
      }
      return controller;
    };
  }
  function exec(target, type, payload = {}, receiver = (x) => x, params = {}) {
    target = resolveObj(target);
    if (isObject_default2(receiver)) {
      [params, receiver] = [receiver, (x) => x];
    }
    function defaultExec(descriptor2, result) {
      if (arguments.length > 1)
        return receiver(result);
      return receiver(Reflect[type](target, ...Object.values(payload)));
    }
    const descriptor = new Descriptor(target, { type, ...payload });
    const listenerRegistry = TrapsRegistry.getInstance(target, false, params.namespace);
    if (listenerRegistry) {
      return listenerRegistry.emit(descriptor, defaultExec);
    }
    return defaultExec(descriptor);
  }
  function isPropsList(prop) {
    return prop === Infinity || Array.isArray(prop);
  }
  function resolveObj(obj, assert = true) {
    if ((!obj || !isTypeObject_default2(obj)) && assert)
      throw new Error(`Object must be of type object or array! "${getType_default2(obj)}" given.`);
    if (obj instanceof Descriptor) {
      obj = obj.value;
    }
    return obj && unproxy(obj);
  }
  function resolveProps(obj, prop, receiver, params = {}) {
    if (prop === Infinity) {
      if (params.level && !isTypeObject_default2(obj))
        return receiver([]);
      return ownKeys(obj, receiver, params);
    }
    return receiver(from_default(prop, false));
  }

  // ../observer/src/index.js
  var Observer = { ...main_exports, ...actors_exports };
  var src_default = Observer;

  // src/scoped-js/Compiler.js
  var Compiler = class {
    static toHash(val) {
      let hash;
      if (!(hash = this.hashTable.get(val))) {
        hash = this.uniqId();
        this.hashTable.set(val, hash);
      }
      return hash;
    }
    static fromHash(hash) {
      let val;
      this.hashTable.forEach((_hash, _val) => {
        if (_hash === hash)
          val = _val;
      });
      return val;
    }
    constructor(window2, config, executeCallback) {
      this.window = window2;
      this.config = config;
      window2.webqit.oohtml.Script.run = (execHash) => {
        const exec2 = this.constructor.fromHash(execHash);
        if (!exec2)
          throw new Error(`Argument must be a valid exec hash.`);
        const { script, compiledScript, thisContext } = exec2;
        if (thisContext instanceof window2.Element && script.scoped) {
          if (!thisContext.scripts) {
            Object.defineProperty(thisContext, "scripts", { value: /* @__PURE__ */ new Set() });
          }
          thisContext.scripts.add(script);
        }
        switch (config.script.retention) {
          case "dispose":
            script.remove();
            break;
          case "hidden":
            script.textContent = `"source hidden"`;
            break;
          default:
            script.textContent = compiledScript.function.originalSource;
        }
        return executeCallback.call(window2, compiledScript, thisContext, script);
      };
    }
    compile(script, thisContext) {
      const _static = this.constructor;
      const { webqit: { oohtml, SubscriptFunction } } = this.window;
      const cache = oohtml.Script.compileCache[script.contract ? 0 : 1];
      const sourceHash = _static.toHash(script.textContent);
      let source = script.textContent, compiledScript;
      if (!(compiledScript = cache.get(sourceHash))) {
        let imports = [], meta2 = {};
        let targetKeywords = [];
        if (script.type === "module")
          targetKeywords.push("import ");
        if (script.type === "module" && !script.contract)
          targetKeywords.push("await ");
        if (targetKeywords.length && new RegExp(targetKeywords.join("|")).test(source)) {
          [imports, source, meta2] = this.parse(source);
          if (imports.length) {
            source = `
	${this.rewriteImportStmts(imports).join(`
	`)}
	${source}
`;
          }
        }
        let _Function, { parserParams: parserParams2, compilerParams: compilerParams2, runtimeParams: runtimeParams2 } = this.config.advanced;
        if (script.contract) {
          parserParams2 = { ...parserParams2, allowAwaitOutsideFunction: script.type === "module" };
          runtimeParams2 = { ...runtimeParams2, async: script.type === "module" };
          _Function = SubscriptFunction(source, { compilerParams: compilerParams2, parserParams: parserParams2, runtimeParams: runtimeParams2 });
          Object.defineProperty(script, "properties", { configurable: true, value: SubscriptFunction.inspect(_Function, "properties") });
        } else {
          const isAsync = script.type === "module";
          const _FunctionConstructor = isAsync ? Object.getPrototypeOf(async function() {
          }).constructor : Function;
          _Function = runtimeParams2?.compileFunction ? runtimeParams2.compileFunction(source) : new _FunctionConstructor(source);
        }
        Object.defineProperty(_Function, "originalSource", { configurable: true, value: script.textContent });
        compiledScript = Object.defineProperty(script.cloneNode(), "function", { value: _Function });
        script.scoped && Object.defineProperty(compiledScript, "scoped", Object.getOwnPropertyDescriptor(script, "scoped"));
        script.contract && Object.defineProperty(compiledScript, "contract", Object.getOwnPropertyDescriptor(script, "contract"));
        cache.set(sourceHash, compiledScript);
      }
      const execHash = _static.toHash({ script, compiledScript, thisContext });
      if (script.handling === "manual") {
        webqit.oohtml.Script.run(execHash);
      } else {
        script.textContent = `webqit.oohtml.Script.run( '${execHash}' );`;
      }
    }
    parse(source) {
      const [tokens, meta2] = this.tokenize(source, ($tokens, event, char, meta3, i, isLastChar) => {
        if (event === "start-enclosure" && char === "{" && !meta3.openAsync?.type && meta3.openEnclosures.length === meta3.openAsync?.scopeId) {
          meta3.openAsync.type = "block";
        } else if (event === "end-enclosure" && char === "}" && meta3.openAsync?.type === "block" && meta3.openEnclosures.length === meta3.openAsync.scopeId) {
          meta3.openAsync = null;
        } else if (event === "start-quote" && !meta3.openEnclosures.length && ["starting", "from"].includes(meta3.openImport)) {
          meta3.openImport = "url";
        } else if (event === "end-quote" && meta3.openImport === "url") {
          meta3.openImport = "closing";
        } else if (event === "char") {
          if (meta3.openImport === "closing" && (char === ";" || ![" ", `
`].includes(char) || isLastChar)) {
            if (char === ";" || isLastChar) {
              $tokens[0] += char;
              $tokens.unshift("");
            } else {
              $tokens.unshift(char);
            }
            meta3.openImport = null;
            return false;
          }
          let remainder = source.substring(i - 1);
          if (!meta3.openImport && /^[\W]?import[ ]*[^\(]/.test(remainder)) {
            meta3.openImport = "starting";
            $tokens.unshift("");
            return 6;
          }
          if (meta3.openImport === "starting" && /^[\W]?from /.test(remainder)) {
            meta3.openImport = "from";
            return 4;
          }
          if (!meta3.openAsync) {
            if (/^[\W]?async /.test(remainder)) {
              meta3.openAsync = { scopeId: meta3.openEnclosures.length };
              return 5;
            }
            if (/^[\W]?await /.test(remainder)) {
              meta3.topLevelAwait = true;
              return 5;
            }
          }
          if (meta3.openAsync) {
            if (!meta3.openAsync.type && /.?\=\>[ ]*?\{/.test(remainder)) {
              meta3.openAsync.type = "inline-arrow";
            } else if (meta3.openAsync.type === "inline-arrow" && [`
`, ";"].includes(char) && meta3.openEnclosures.length === meta3.openAsync.scopeId) {
              meta3.openAsync = null;
            }
          }
        }
      });
      let imports = [], body = "", _str;
      for (const str of tokens.reverse()) {
        if ((_str = str.trim()).startsWith("import ")) {
          imports.push(str);
        } else if (_str) {
          body += str;
        }
      }
      return [imports, body, meta2];
    }
    rewriteImportStmts(imports) {
      const importSpecs = [], importPromises = [];
      imports.forEach(($import, i) => {
        $import = parseImportStmt($import);
        const [wholeImport, individualImports] = $import.items.reduce(([whole, parts], item) => {
          return item.id === "*" ? [item.alias, parts] : [whole, parts.concat(item)];
        }, [null, []]);
        if (wholeImport) {
          importSpecs.push(`const ${wholeImport} = __$imports$__[${i}];`);
        }
        if (individualImports.length) {
          const individualImportsSpec = individualImports.map((item) => `${item.id}${item.id !== item.alias ? `: ${item.alias}` : ""}`).join(", ");
          importSpecs.push(`const { ${individualImportsSpec} } = __$imports$__[${i}];`);
        }
        importPromises.push(`import("${$import.url}")`);
      });
      return [
        `
	const __$imports$__ = await Promise.all([
		${importPromises.join(`,
		`)}
	]);`,
        importSpecs.join(`
	`)
      ];
    }
    parseImportStmt(str) {
      const getUrl = (str2) => {
        let quo = /^[`'"]/.exec(str2);
        return quo && str2.substring(1, str2.lastIndexOf(quo[0]));
      };
      let $import = { items: [{ id: "" }] }, _str = str.replace("import", "").trim();
      if (!($import.url = getUrl(_str))) {
        this.tokenize(_str, ($tokens, event, char, meta2, i, isLastChar) => {
          if (["start-quote", "ongoing-quote", "end-quote", "char"].includes(event)) {
            if ($import.url)
              return;
            if (!meta2.openQuote) {
              let remainder = _str.substring(i);
              if (char === ",") {
                $import.items.unshift({ id: "" });
                return;
              }
              if (remainder.startsWith(" as ")) {
                $import.items[0].alias = "";
                return 3;
              }
              if (remainder.startsWith(" from ")) {
                $import.url = getUrl(remainder.replace("from", "").trim());
                return remainder.length;
              }
            }
            if ("alias" in $import.items[0]) {
              $import.items[0].alias += char;
            } else {
              $import.items[0].id += char;
              if (meta2.openEnclosures.length) {
                $import.items[0].enclosed = true;
              }
            }
          }
        });
      }
      $import.items = $import.items.map((item) => ({
        id: item.id && !item.alias && !item.enclosed ? "default" : item.id.trim(),
        alias: item.alias ? item.alias.trim() : item.id.trim()
      })).filter((item) => item.id).reverse();
      return $import;
    }
    tokenize(source, _callback) {
      const lastI = source.length - 1;
      return [...source].reduce(([$tokens, meta2, skip], char, i) => {
        if (skip) {
          $tokens[0] += char;
          return [$tokens, meta2, --skip];
        }
        let callbackReturn;
        if (meta2.openQuote || meta2.openComment) {
          if (char === meta2.openQuote) {
            meta2.openQuote = null;
            callbackReturn = _callback($tokens, "end-quote", char, meta2, i, i === lastI);
          } else if (meta2.openQuote) {
            callbackReturn = _callback($tokens, "ongoing-quote", char, meta2, i, i === lastI);
          } else if (meta2.openComment) {
            if (meta2.openComment === "//" && char === `
` || meta2.openComment === "/*" && $tokens[0].substr(-1) === "*" && char === "/") {
              meta2.openComment = null;
              callbackReturn = _callback($tokens, "end-comment", char, meta2, i, i === lastI);
            }
          }
          if (callbackReturn !== false) {
            $tokens[0] += char;
          }
          return [$tokens, meta2, typeof callbackReturn === "number" ? callbackReturn : skip];
        }
        let enclosure;
        if (enclosure = ["()", "{}", "[]"].filter((pair) => char === pair[0])[0]) {
          callbackReturn = _callback($tokens, "start-enclosure", char, meta2, i, i === lastI);
          meta2.openEnclosures.unshift(enclosure);
        } else if (meta2.openEnclosures.length && char === meta2.openEnclosures[0][1]) {
          meta2.openEnclosures.shift();
          callbackReturn = _callback($tokens, "end-enclosure", char, meta2, i, i === lastI);
        } else if (['"', "'", "`"].includes(char)) {
          callbackReturn = _callback($tokens, "start-quote", char, meta2, i, i === lastI);
          meta2.openQuote = char;
        } else if (!meta2.openComment && ["/*", "//"].includes(source.substr(i, 2))) {
          callbackReturn = _callback($tokens, "start-comment", char, meta2, i, i === lastI);
          meta2.openComment = source.substr(i, 2);
        } else {
          callbackReturn = _callback($tokens, "char", char, meta2, i, i === lastI);
        }
        if (callbackReturn !== false) {
          $tokens[0] += char;
        }
        return [$tokens, meta2, typeof callbackReturn === "number" ? callbackReturn : skip];
      }, [[""], { openEnclosures: [] }, 0]);
    }
  };
  __publicField(Compiler, "hashTable", /* @__PURE__ */ new Map());
  __publicField(Compiler, "uniqId", () => (0 | Math.random() * 9e6).toString(36));

  // node_modules/@webqit/util/arr/from.js
  function from_default2(val, castObject = true) {
    if (isArray_default(val)) {
      return val;
    }
    ;
    if (!castObject && isObject_default(val)) {
      return [val];
    }
    ;
    if (val !== false && val !== 0 && isEmpty_default(val)) {
      return [];
    }
    ;
    if (isTypeArray_default(val)) {
      return Array.prototype.slice.call(val);
    }
    ;
    if (isObject_default(val)) {
      return Object.values(val);
    }
    ;
    return [val];
  }

  // node_modules/@webqit/util/obj/get.js
  function get_default(ctxt, path, trap = {}, reciever = {}) {
    path = from_default2(path).slice();
    var _ctxt = ctxt;
    while (!isUndefined_default(_ctxt) && !isNull_default(_ctxt) && path.length) {
      var _key = path.shift();
      if (!(trap.get ? trap.get(_ctxt, _key) : isTypeObject_default(_ctxt) ? _key in _ctxt : _ctxt[_key])) {
        reciever.exists = false;
        return;
      }
      _ctxt = trap.get ? trap.get(_ctxt, _key) : _ctxt[_key];
    }
    reciever.exists = true;
    return _ctxt;
  }

  // node_modules/@webqit/util/obj/set.js
  function set_default(obj, path, val, buildTree = {}, trap = {}) {
    const _set = (target2, key, val2) => {
      if (trap.set) {
        return trap.set(target2, key, val2);
      } else {
        if (isNumeric_default(path[i]) && isArray_default(target2)) {
          target2.push(val2);
        } else {
          target2[key] = val2;
        }
        return true;
      }
    };
    path = from_default2(path);
    var target = obj;
    for (var i = 0; i < path.length; i++) {
      if (i < path.length - 1) {
        if (!target || !isTypeObject_default(target) && !isFunction_default(target)) {
          return false;
        }
        var branch = get_default(target, path[i], trap);
        if (!isTypeObject_default(branch)) {
          if (trap.buildTree === false) {
            return false;
          }
          branch = isFunction_default(trap.buildTree) ? trap.buildTree(i) : isNumeric_default(path[i + 1]) ? [] : {};
          var branchSuccess = _set(target, path[i], branch);
          if (!branchSuccess) {
            return false;
          }
        }
        target = branch;
      } else {
        return _set(target, path[i], val);
      }
    }
  }

  // node_modules/@webqit/realdom/src/Scheduler.js
  var Scheduler = class {
    constructor(window2, asyncDOM = true) {
      Object.defineProperty(this, "window", { value: window2 });
      Object.defineProperty(this, "readCallbacks", { value: /* @__PURE__ */ new Set() });
      Object.defineProperty(this, "writeCallbacks", { value: /* @__PURE__ */ new Set() });
      this.async = asyncDOM;
      if (this.window.requestAnimationFrame) {
        this._run();
      } else {
        this.async = false;
      }
    }
    _run() {
      this.window.requestAnimationFrame(() => {
        for (const callback of this.readCallbacks) {
          callback();
          this.readCallbacks.delete(callback);
        }
        for (const callback of this.writeCallbacks) {
          callback();
          this.writeCallbacks.delete(callback);
        }
        this._run();
      });
    }
    onread(callback, withPromise = false) {
      if (withPromise) {
        return new Promise((resolve) => {
          if (this.async === false) {
            resolve(callback());
          } else {
            this.readCallbacks.add(() => {
              resolve(callback());
            });
          }
        });
      }
      if (this.async === false) {
        callback();
      } else {
        this.readCallbacks.add(callback);
      }
    }
    onwrite(callback, withPromise = false) {
      if (withPromise) {
        return new Promise((resolve) => {
          if (this.async === false) {
            resolve(callback());
          } else {
            this.writeCallbacks.add(() => {
              resolve(callback());
            });
          }
        });
      }
      if (this.async === false) {
        callback();
      } else {
        this.writeCallbacks.add(callback);
      }
    }
    cycle(onread, onwrite, prevTransaction) {
      this.onread(() => {
        const readReturn = onread(prevTransaction);
        const callWrite = (readReturn2) => {
          if (readReturn2 === void 0)
            return;
          this.onwrite(() => {
            const writeReturn = onwrite(readReturn2, prevTransaction);
            const repeatTransaction = (writeReturn2) => {
              if (writeReturn2 === void 0)
                return;
              this.cycle(onread, onwrite, writeReturn2);
            };
            if (writeReturn instanceof Promise) {
              writeReturn.then(repeatTransaction);
            } else {
              repeatTransaction(writeReturn);
            }
          });
        };
        if (readReturn instanceof Promise) {
          readReturn.then(callWrite);
        } else {
          callWrite(readReturn);
        }
      });
    }
  };

  // node_modules/@webqit/realdom/src/realtime/Realtime.js
  var Realtime = class {
    constructor(context, namespace, window2) {
      this.context = context;
      this.namespace = namespace;
      this.window = context.defaultView || context.ownerDocument?.defaultView || window2;
      this.document = this.window.document;
      this.webqit = this.window.webqit;
      Object.defineProperty(this, "#", { value: {} });
    }
    resolveArgs(args) {
      if (isFunction_default(args[0])) {
        args = [[], ...args];
      } else if (isObject_default(args[0]) && args.length === 1) {
        args = [[], void 0, args[0]];
      } else if (isObject_default(args[1]) && args.length === 2) {
        args = [from_default2(args[0], false), void 0, args[1]];
      } else {
        args[0] = from_default2(args[0], false);
      }
      return args;
    }
    registry(...args) {
      return internals("realdom.realtime", this.window, this.namespace, ...args);
    }
    createSignalGenerator() {
      return {
        generate() {
          this.lastController?.abort();
          this.lastController = new AbortController();
          const flags = { signal: this.lastController.signal };
          return flags;
        },
        disconnect() {
          this.lastController?.abort();
        }
      };
    }
    forEachMatchingContext(interceptionTiming, record_s, callback) {
      const { window: window2 } = this, records = Array.isArray(record_s) ? record_s : [record_s];
      let dispatchBatch = /* @__PURE__ */ new Set();
      for (const [depth, registries] of this.registry(interceptionTiming)) {
        for (const [context, registry] of registries) {
          let matches = records.filter((record) => {
            if (!context.contains(record.target))
              return false;
            return depth === "subtree" || record.target === context;
          });
          if (!matches.length)
            continue;
          if (!Array.isArray(record_s)) {
            matches = matches[0];
          }
          for (const registration of registry) {
            dispatchBatch.add([registration, matches, context]);
          }
        }
      }
      for (const [registration, record_s2, context] of dispatchBatch) {
        callback.call(this, registration, record_s2, context);
      }
    }
    disconnectables(signal, ...objects) {
      const disconnectable = { disconnect() {
        objects.forEach((d) => d && isFunction_default(d.disconnect) && d.disconnect() || isFunction_default(d) && d() || isObject_default(d) && (d.disconnected = true));
      } };
      if (signal)
        signal.addEventListener("abort", () => disconnectable.disconnect());
      return disconnectable;
    }
  };

  // node_modules/@webqit/realdom/src/realtime/AttrRealtime.js
  var AttrRealtime = class extends Realtime {
    constructor(context, ...args) {
      super(context, "attr", ...args);
    }
    get(filter, callback = void 0, params = {}) {
      const originalFilterIsString = typeof filter === "string";
      [filter = [], callback = void 0, params = {}] = this.resolveArgs(arguments);
      const { context } = this;
      const records = attrIntersection(context, filter);
      const record_s = originalFilterIsString ? records[0] : records;
      if (!callback)
        return record_s;
      const signalGenerator = callback && params.lifecycleSignals && this.createSignalGenerator();
      const flags = signalGenerator?.generate() || {};
      callback(record_s, flags, context);
      if (params.live) {
        if (signalGenerator) {
          params = { ...params, signalGenerator };
        }
        const disconnectable_live = this.observe(originalFilterIsString ? filter[0] : filter, callback, { newValue: true, ...params });
        return this.disconnectables(params.signal, disconnectable_live);
      }
    }
    observe(filter, callback, params = {}) {
      const originalFilterIsString = typeof filter === "string";
      [filter = [], callback, params = {}] = this.resolveArgs(arguments);
      if (["sync", "intercept"].includes(params.timing))
        return this.observeSync(originalFilterIsString ? filter[0] : filter, callback, params);
      if (params.timing && params.timing !== "async")
        throw new Error(`Timing option "${params.timing}" invalid.`);
      const { context, window: window2, webqit: webqit2 } = this;
      if (params.eventDetails && !webqit2.realdom.attrInterceptionHooks?.intercepting) {
        attrInterception.call(window2, "intercept", () => {
        });
      }
      const disconnectable = new window2.MutationObserver((records) => {
        records = dedup(records).map((rcd) => withAttrEventDetails.call(window2, rcd));
        dispatch.call(window2, registration, records, context);
      });
      const $params = { attributes: true, attributeOldValue: params.oldValue, subtree: params.subtree };
      if (filter.length) {
        $params.attributeFilter = filter;
      }
      disconnectable.observe(context, $params);
      const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
      const registration = { context, filter, callback, params, atomics: /* @__PURE__ */ new Map(), originalFilterIsString, signalGenerator, disconnectable };
      return this.disconnectables(params.signal, disconnectable, signalGenerator);
    }
    observeSync(filter, callback, params = {}) {
      const originalFilterIsString = typeof filter === "string";
      [filter, callback, params = {}] = this.resolveArgs(arguments);
      const { context, window: window2 } = this;
      if (params.timing && !["sync", "intercept"].includes(params.timing))
        throw new Error(`Timing option "${params.timing}" invalid.`);
      const interceptionTiming = params.timing === "intercept" ? "intercept" : "sync";
      const intersectionDepth = params.subtree ? "subtree" : "children";
      if (!this.registry(interceptionTiming).size) {
        attrInterception.call(window2, interceptionTiming, (records) => {
          this.forEachMatchingContext(interceptionTiming, records, dispatch);
        });
      }
      const disconnectable = { disconnect() {
        registry.delete(registration);
        if (!registry.size) {
          registries.delete(context);
        }
      } };
      const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
      const registration = { context, filter, callback, params, atomics: /* @__PURE__ */ new Map(), originalFilterIsString, signalGenerator, disconnectable };
      const registries = this.registry(interceptionTiming, intersectionDepth);
      if (!registries.has(context)) {
        registries.set(context, /* @__PURE__ */ new Set());
      }
      const registry = registries.get(context);
      registry.add(registration);
      return this.disconnectables(params.signal, disconnectable, signalGenerator);
    }
  };
  function dedup(records) {
    return records.reduce((rcds, rcd, i) => {
      if (rcds[i - 1]?.attributeName === rcd.attributeName)
        return rcds;
      return rcds.concat(rcd);
    }, []);
  }
  function dispatch(registration, records) {
    const { context, filter, callback, params, atomics, originalFilterIsString, signalGenerator } = registration;
    if (params.atomic && !atomics.size) {
      records = attrIntersection(context, filter, records);
    }
    if (!(params.newValue === null && params.oldValue === null && params.eventDetails)) {
      records = records.map((rcd) => {
        let exclusion;
        if (!params.eventDetails) {
          ({ event: exclusion, ...rcd } = rcd);
        }
        if (!params.oldValue && "oldValue" in rcd) {
          ({ oldValue: exclusion, ...rcd } = rcd);
        }
        if (!params.newValue && "value" in rcd) {
          ({ value: exclusion, ...rcd } = rcd);
        } else if (params.newValue && typeof rcd.value === "undefined") {
          rcd = { ...rcd, value: rcd.target.getAttribute(rcd.name) };
        }
        return rcd;
      });
    }
    if (params.atomic) {
      records.forEach((record) => atomics.set(record.name, record));
      records = Array.from(atomics.entries()).map(([, value]) => value);
    }
    const record_s = originalFilterIsString ? records[0] : records;
    const flags = signalGenerator?.generate() || {};
    callback(record_s, flags, context);
  }
  function attrIntersection(context, filter, records = []) {
    const _type = { event: null, type: "attribute" };
    if (filter.length) {
      return filter.map((attrName) => {
        return records.find((r) => r.name === attrName) || { target: context, name: attrName, value: context.getAttribute(attrName), ..._type };
      });
    }
    const attrs = Array.from(context.attributes);
    return attrs.map((attr) => {
      return records.find((r) => r.name === attr.nodeName) || { target: context, name: attr.nodeName, value: attr.nodeValue, ..._type };
    });
  }
  function withAttrEventDetails({ target, attributeName, value, oldValue }) {
    const window2 = this, registry = window2.webqit.realdom.attrInterceptionRecords?.get(target) || {};
    const event = registry[attributeName] || "mutation";
    const record = { target, name: attributeName, value, oldValue, type: "observation", event };
    return record;
  }
  function attrInterception(timing, callback) {
    const window2 = this;
    const { webqit: webqit2, document: document2, Element } = window2;
    if (!webqit2.realdom.attrInterceptionHooks) {
      Object.defineProperty(webqit2.realdom, "attrInterceptionHooks", { value: /* @__PURE__ */ new Map() });
    }
    if (!webqit2.realdom.attrInterceptionHooks.has(timing)) {
      webqit2.realdom.attrInterceptionHooks.set(timing, /* @__PURE__ */ new Set());
    }
    webqit2.realdom.attrInterceptionHooks.get(timing).add(callback);
    const rm = () => webqit2.realdom.attrInterceptionHooks.get(timing).delete(callback);
    if (webqit2.realdom.attrInterceptionHooks?.intercepting)
      return rm;
    console.warn(`Attr mutation APIs are now being intercepted.`);
    webqit2.realdom.attrInterceptionHooks.intercepting = true;
    Object.defineProperty(webqit2.realdom, "attrInterceptionRecords", { value: /* @__PURE__ */ new Map() });
    const attrIntercept = (record, defaultAction) => {
      if (!webqit2.realdom.attrInterceptionRecords.has(record.target)) {
        webqit2.realdom.attrInterceptionRecords.set(record.target, {});
      }
      const registry = webqit2.realdom.attrInterceptionRecords.get(record.target);
      clearTimeout(registry[record.name]?.timeout);
      registry[record.name] = record.event;
      const timeout = setTimeout(() => {
        delete registry[record.name];
      }, 0);
      Object.defineProperty(record.event, "timeout", { value: timeout, configurable: true });
      webqit2.realdom.attrInterceptionHooks.get("intercept")?.forEach((callback2) => callback2([record]));
      const returnValue = defaultAction();
      webqit2.realdom.attrInterceptionHooks.get("sync")?.forEach((callback2) => callback2([record]));
      return returnValue;
    };
    const mo = new window2.MutationObserver((records) => {
      records = dedup(records).map((rcd) => withAttrEventDetails.call(window2, rcd)).filter((rcd, i) => {
        return !Array.isArray(rcd.event);
      });
      if (!records.length)
        return;
      webqit2.realdom.attrInterceptionHooks.get("intercept")?.forEach((callback2) => callback2(records));
      webqit2.realdom.attrInterceptionHooks.get("sync")?.forEach((callback2) => callback2(records));
    });
    mo.observe(document2, { attributes: true, subtree: true, attributeOldValue: true });
    const originalApis = /* @__PURE__ */ Object.create(null);
    ["setAttribute", "removeAttribute", "toggleAttribute"].forEach((apiName) => {
      originalApis[apiName] = Element.prototype[apiName];
      Element.prototype[apiName] = function(...args) {
        let value, oldValue = this.getAttribute(args[0]);
        if (["setAttribute", "toggleAttribute"].includes(apiName)) {
          value = args[1];
        }
        if (apiName === "toggleAttribute" && value === void 0) {
          value = oldValue === null ? true : false;
        }
        const record = { target: this, name: args[0], value, oldValue, type: "interception", event: [this, apiName] };
        const exec2 = () => originalApis[apiName].call(this, ...args);
        return attrIntercept(record, exec2);
      };
    });
    return rm;
  }

  // node_modules/@webqit/realdom/src/realtime/DOMRealtime.js
  var DOMRealtime = class extends Realtime {
    constructor(context, ...args) {
      super(context, "tree", ...args);
    }
    attr(filter, callback = void 0, params = {}) {
      const { context, window: window2 } = this;
      return new AttrRealtime(context, window2).get(...arguments);
    }
    query(selectors, callback = void 0, params = {}) {
      [selectors, callback = void 0, params = {}] = this.resolveArgs(arguments);
      const { context } = this;
      const records = /* @__PURE__ */ new Map(), getRecord = (target) => {
        if (!records.has(target)) {
          records.set(target, { target, entrants: [], exits: [], type: "query", event: null });
        }
        return records.get(target);
      };
      if (!params.generation || params.generation === "entrants") {
        if (!selectors.length) {
          [...context.children].forEach((node) => getRecord(context).entrants.push(node));
        } else if (selectors.every((selector) => typeof selector === "string") && (selectors = selectors.join(","))) {
          const matches = params.subtree ? context.querySelectorAll(selectors) : [...context.children].filter((node) => node.matches(selectors));
          matches.forEach((node) => getRecord(node.parentNode || context).entrants.push(node));
        }
      }
      if (!callback)
        return records;
      const disconnectable = { disconnected: false };
      const signalGenerator = callback && params.lifecycleSignals && this.createSignalGenerator();
      for (const [, record] of records) {
        if (disconnectable.disconnected)
          break;
        const flags = signalGenerator?.generate() || {};
        callback(record, flags, context);
      }
      if (params.live) {
        if (signalGenerator) {
          params = { ...params, signalGenerator };
        }
        const disconnectable_live = this.observe(selectors, callback, params);
        return this.disconnectables(params.signal, disconnectable, disconnectable_live);
      }
      return this.disconnectables(params.signal, disconnectable, signalGenerator);
    }
    children(selectors, callback = void 0, params = {}) {
      [selectors, callback = void 0, params = {}] = this.resolveArgs(arguments);
      return this.query(selectors, callback, { ...params, subtree: false });
    }
    subtree(selectors, callback = void 0, params = {}) {
      [selectors, callback = void 0, params = {}] = this.resolveArgs(arguments);
      return this.query(selectors, callback, { ...params, subtree: true });
    }
    observe(selectors, callback, params = {}) {
      [selectors, callback, params = {}] = this.resolveArgs(arguments);
      if (["sync", "intercept"].includes(params.timing))
        return this.observeSync(selectors, callback, params);
      if (params.timing && params.timing !== "async")
        throw new Error(`Timing option "${params.timing}" invalid.`);
      const { context, window: window2, webqit: webqit2, document: document2 } = this;
      if (params.eventDetails) {
        webqit2.realdom.domInterceptionRecordsAlwaysOn = true;
      }
      if ((document2.readyState === "loading" || webqit2.realdom.domInterceptionRecordsAlwaysOn) && !webqit2.realdom.domInterceptionHooks?.intercepting) {
        domInterception.call(window2, "sync", () => {
        });
      }
      const disconnectable = new window2.MutationObserver((records) => records.forEach((record) => {
        dispatch2.call(window2, registration, withEventDetails.call(window2, record), context);
      }));
      disconnectable.observe(context, { childList: true, subtree: params.subtree });
      const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
      const registration = { context, selectors, callback, params, signalGenerator, disconnectable };
      if (params.staticSensitivity) {
        const disconnectable_attr = staticSensitivity.call(window2, registration);
        return this.disconnectables(params.signal, disconnectable, signalGenerator, disconnectable_attr);
      }
      return this.disconnectables(params.signal, disconnectable, signalGenerator);
    }
    observeSync(selectors, callback, params = {}) {
      [selectors, callback, params = {}] = this.resolveArgs(arguments);
      const { context, window: window2 } = this;
      if (params.timing && !["sync", "intercept"].includes(params.timing))
        throw new Error(`Timing option "${params.timing}" invalid.`);
      const interceptionTiming = params.timing === "intercept" ? "intercept" : "sync";
      const intersectionDepth = params.subtree ? "subtree" : "children";
      if (!this.registry(interceptionTiming).size) {
        domInterception.call(window2, interceptionTiming, (record) => {
          this.forEachMatchingContext(interceptionTiming, record, dispatch2);
        });
      }
      const mo = new window2.MutationObserver((records) => records.forEach((record) => {
        if (Array.isArray((record = withEventDetails.call(window2, record)).event))
          return;
        dispatch2.call(window2, registration, record, context);
      }));
      mo.observe(context, { childList: true, subtree: params.subtree });
      const disconnectable = { disconnect() {
        mo.disconnect();
        registry.delete(registration);
        if (!registry.size) {
          registries.delete(context);
        }
      } };
      const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
      const registration = { context, selectors, callback, params, signalGenerator, disconnectable };
      const registries = this.registry(interceptionTiming, intersectionDepth);
      if (!registries.has(context)) {
        registries.set(context, /* @__PURE__ */ new Set());
      }
      const registry = registries.get(context);
      registry.add(registration);
      if (params.staticSensitivity) {
        const disconnectable_attr = staticSensitivity.call(window2, registration);
        return this.disconnectables(params.signal, disconnectable, signalGenerator, disconnectable_attr);
      }
      return this.disconnectables(params.signal, disconnectable, signalGenerator);
    }
  };
  function staticSensitivity(registration) {
    const window2 = this;
    const { context, selectors, callback, params, signalGenerator } = registration;
    const parseDot = (selector) => selector.match(/\.([\w-]+)/g)?.length ? ["class"] : [];
    const parseHash = (selector) => selector.match(/#([\w-]+)/g)?.length ? ["id"] : [];
    const parse = (selector) => [...selector.matchAll(/\[([^\=\]]+)(\=[^\]]+)?\]/g)].map((x) => x[1]).concat(parseDot(selector)).concat(parseHash(selector));
    if (!(registration.$attrs = Array.from(new Set(selectors.filter((s) => typeof s === "string" && s.includes("[")).reduce((attrs, selector) => attrs.concat(parse(selector)), [])))).length)
      return;
    const entrants = /* @__PURE__ */ new Set(), exits = /* @__PURE__ */ new Set();
    entrants.push = (val) => (exits.delete(val), entrants.add(val));
    exits.push = (val) => (entrants.delete(val), exits.add(val));
    registration.$deliveryCache = { entrants, exits };
    return new AttrRealtime(context, window2).observe(registration.$attrs, (_records) => {
      const records = /* @__PURE__ */ new Map(), getRecord = (target) => {
        if (!records.has(target)) {
          records.set(target, { target, entrants: [], exits: [], type: "static", event: null });
        }
        return records.get(target);
      };
      const matchesCache = /* @__PURE__ */ new WeakMap();
      const matches = (node) => {
        if (!matchesCache.has(node)) {
          matchesCache.set(node, selectors.some((selector) => node.matches(selector)));
        }
        return matchesCache.get(node);
      };
      for (const _record of _records) {
        ["entrants", "exits"].forEach((generation) => {
          if (params.generation && generation !== params.generation)
            return;
          if (registration.$deliveryCache[generation].has(_record.target) || (generation === "entrants" ? !matches(_record.target) : matches(_record.target)))
            return;
          registration.$deliveryCache[generation].push(_record.target);
          getRecord(_record.target)[generation].push(_record.target);
          getRecord(_record.target).event = _record.event;
        });
      }
      for (const [, record] of records) {
        const flags = signalGenerator?.generate() || {};
        callback(record, flags, context);
      }
    }, { subtree: params.subtree, timing: params.timing, eventDetails: params.eventDetails });
  }
  function dispatch2(registration, _record) {
    const { context, selectors, callback, params, signalGenerator, $deliveryCache } = registration;
    const record = { ..._record, entrants: [], exits: [] };
    if (!params.eventDetails) {
      delete record.event;
    }
    ["entrants", "exits"].forEach((generation) => {
      if (params.generation && generation !== params.generation)
        return;
      if (selectors.length) {
        record[generation] = nodesIntersection(selectors, _record[generation], _record.event !== "parse");
      } else {
        record[generation] = [..._record[generation]];
      }
      if (!$deliveryCache)
        return;
      for (const node of record[generation]) {
        $deliveryCache[generation].push(node);
      }
    });
    if (!record.entrants.length && !record.exits.length)
      return;
    const flags = signalGenerator?.generate() || {};
    callback(record, flags, context);
  }
  function nodesIntersection(targets, sources, deepIntersect) {
    sources = Array.isArray(sources) ? sources : [...sources];
    const match = (sources2, target) => {
      sources2 = sources2.filter((source) => source.matches);
      if (typeof target === "string") {
        let matches = sources2.filter((source) => source.matches(target));
        if (deepIntersect) {
          matches = sources2.reduce((collection, source) => {
            return [...collection, ...source.querySelectorAll(target)];
          }, matches);
        }
        if (matches.length)
          return matches;
      } else {
        if (sources2.includes(target) || deepIntersect && sources2.some((source) => source.contains(target))) {
          return [target];
        }
      }
    };
    if (!sources.$$searchCache) {
      sources.$$searchCache = /* @__PURE__ */ new Map();
    }
    return targets.reduce((matches, target) => {
      let _matches;
      if (sources.$$searchCache.has(target)) {
        _matches = sources.$$searchCache.get(target);
      } else {
        _matches = match(sources, target) || [];
        if (isObject_default(target)) {
          sources.$$searchCache.set(target, _matches);
        }
      }
      return matches.concat(_matches);
    }, []);
  }
  function withEventDetails({ target, addedNodes, removedNodes }) {
    let window2 = this, event;
    event = from_default2(addedNodes).reduce((prev, node) => prev || window2.webqit.realdom.domInterceptionRecords?.get(node), null);
    event = from_default2(removedNodes).reduce((prev, node) => prev || window2.webqit.realdom.domInterceptionRecords?.get(node), event);
    event = event || window2.document.readyState === "loading" && "parse" || "mutation";
    return { target, entrants: addedNodes, exits: removedNodes, type: "observation", event };
  }
  function domInterception(timing, callback) {
    const window2 = this;
    const { webqit: webqit2, document: document2, Node, CharacterData, Element, HTMLElement, HTMLTemplateElement, DocumentFragment } = window2;
    if (!webqit2.realdom.domInterceptionHooks) {
      Object.defineProperty(webqit2.realdom, "domInterceptionHooks", { value: /* @__PURE__ */ new Map() });
    }
    if (!webqit2.realdom.domInterceptionHooks.has(timing)) {
      webqit2.realdom.domInterceptionHooks.set(timing, /* @__PURE__ */ new Set());
    }
    webqit2.realdom.domInterceptionHooks.get(timing).add(callback);
    const rm = () => webqit2.realdom.domInterceptionHooks.get(timing).delete(callback);
    if (webqit2.realdom.domInterceptionHooks?.intercepting)
      return rm;
    console.warn(`DOM mutation APIs are now being intercepted.`);
    webqit2.realdom.domInterceptionHooks.intercepting = true;
    Object.defineProperty(webqit2.realdom, "domInterceptionRecords", { value: /* @__PURE__ */ new Map() });
    const intercept2 = (record, defaultAction) => {
      record.entrants.concat(record.exits).forEach((node) => {
        clearTimeout(webqit2.realdom.domInterceptionRecords.get(node)?.timeout);
        webqit2.realdom.domInterceptionRecords.set(node, record.event);
        const timeout = setTimeout(() => {
          webqit2.realdom.domInterceptionRecords.delete(node);
        }, 0);
        Object.defineProperty(record.event, "timeout", { value: timeout, configurable: true });
      });
      webqit2.realdom.domInterceptionHooks.get("intercept")?.forEach((callback2) => callback2(record));
      const returnValue = defaultAction();
      webqit2.realdom.domInterceptionHooks.get("sync")?.forEach((callback2) => callback2(record));
      return returnValue;
    };
    const _originalApis = { characterData: /* @__PURE__ */ Object.create(null), other: /* @__PURE__ */ Object.create(null) };
    [
      "insertBefore",
      "insertAdjacentElement",
      "insertAdjacentHTML",
      "setHTML",
      "replaceChildren",
      "replaceWith",
      "remove",
      "replaceChild",
      "removeChild",
      "before",
      "after",
      "append",
      "prepend",
      "appendChild"
    ].forEach((apiName) => {
      function method(...args) {
        const originalApis2 = this instanceof CharacterData ? _originalApis.characterData : _originalApis.other;
        const exec2 = () => originalApis2[apiName].call(this, ...args);
        if (!(this instanceof CharacterData || this instanceof Element || this instanceof DocumentFragment))
          return exec2();
        let exits = [], entrants = [], target = this;
        if (["insertBefore"].includes(apiName)) {
          entrants = [args[0]];
        } else if (["insertAdjacentElement", "insertAdjacentHTML"].includes(apiName)) {
          entrants = [args[1]];
          if (["beforebegin", "afterend"].includes(args[0])) {
            target = this.parentNode;
          }
        } else if (["setHTML", "replaceChildren"].includes(apiName)) {
          exits = [...this.childNodes];
          entrants = apiName === "replaceChildren" ? [...args] : [args[0]];
        } else if (["replaceWith", "remove"].includes(apiName)) {
          exits = [this];
          entrants = apiName === "replaceWith" ? [...args] : [];
          target = this.parentNode;
        } else if (["replaceChild"].includes(apiName)) {
          exits = [args[1]];
          entrants = [args[0]];
        } else if (["removeChild"].includes(apiName)) {
          exits = [...args];
        } else {
          entrants = [...args];
          if (["before", "after"].includes(apiName)) {
            target = this.parentNode;
          }
        }
        let apiNameFinal = apiName;
        if (["insertAdjacentHTML", "setHTML"].includes(apiName)) {
          let tempNodeName = this.nodeName;
          if (apiName === "insertAdjacentHTML" && ["beforebegin", "afterend"].includes(args[0])) {
            if (!this.parentNode)
              return originalApis2[apiName].call(this, ...args);
            tempNodeName = this.parentNode.nodeName;
          }
          const temp = document2.createElement(tempNodeName);
          originalApis2.setHTML.call(temp, entrants[0], apiName === "setHTML" ? args[1] : {});
          entrants = [...temp.childNodes];
          if (apiName === "insertAdjacentHTML") {
            apiNameFinal = "insertAdjacentElement";
            args[1] = new DocumentFragment();
            args[1].______isTemp = true;
            args[1].append(...temp.childNodes);
          } else {
            apiNameFinal = "replaceChildren";
            args = [...temp.childNodes];
          }
        }
        const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
        return intercept2(record, () => {
          return originalApis2[apiNameFinal].call(this, ...args);
        });
      }
      if (["insertBefore", "replaceChild", "removeChild", "appendChild"].includes(apiName)) {
        _originalApis.other[apiName] = Node.prototype[apiName];
        Node.prototype[apiName] = method;
      } else {
        if (["after", "before", "remove", "replaceWith"].includes(apiName)) {
          _originalApis.characterData[apiName] = CharacterData.prototype[apiName];
          CharacterData.prototype[apiName] = method;
        }
        if (Element.prototype[apiName]) {
          _originalApis.other[apiName] = Element.prototype[apiName];
          Element.prototype[apiName] = method;
        }
      }
    });
    const originalApis = /* @__PURE__ */ Object.create(null);
    [
      "outerHTML",
      "outerText",
      "innerHTML",
      "innerText",
      "textContent",
      "nodeValue"
    ].forEach((apiName) => {
      const Interface = ["textContent", "nodeValue"].includes(apiName) ? Node : ["outerText", "innerText"].includes(apiName) ? HTMLElement : Element;
      originalApis[apiName] = Object.getOwnPropertyDescriptor(Interface.prototype, apiName);
      Object.defineProperty(Interface.prototype, apiName, { ...originalApis[apiName], set: function(value) {
        let exec2 = () => originalApis[apiName].set.call(this, value);
        if (!(this instanceof Element))
          return exec2();
        let exits = [], entrants = [], target = this;
        if (["outerHTML", "outerText"].includes(apiName)) {
          exits = [this];
          target = this.parentNode;
        } else {
          exits = [...this.childNodes];
        }
        if (["outerHTML", "innerHTML"].includes(apiName)) {
          let tempNodeName = this.nodeName;
          if (apiName === "outerHTML") {
            if (!this.parentNode)
              return exec2();
            tempNodeName = this.parentNode.nodeName;
          }
          const temp = document2.createElement(tempNodeName === "TEMPLATE" ? "div" : tempNodeName);
          originalApis[apiName].set.call(temp, value);
          entrants = this instanceof HTMLTemplateElement ? [] : [...temp.childNodes];
          if (apiName === "outerHTML") {
            value = new DocumentFragment();
            value.______isTemp = true;
            value.append(...temp.childNodes);
            exec2 = () => Element.prototype.replaceWith.call(this, value);
          } else {
            if (this instanceof HTMLTemplateElement) {
              exec2 = () => this.content.replaceChildren(...temp.childNodes);
            } else {
              exec2 = () => Element.prototype.replaceChildren.call(this, ...temp.childNodes);
            }
          }
        }
        const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
        return intercept2(record, exec2);
      } });
    });
    ["append", "prepend", "replaceChildren"].forEach((apiName) => {
      [document2, DocumentFragment.prototype].forEach((target) => {
        const originalApi = target[apiName];
        target[apiName] = function(...args) {
          if (this.______isTemp)
            return originalApi.call(this, ...args);
          const exits = apiName === "replaceChildren" ? [...this.childNodes] : [];
          const record = {
            target: this,
            entrants: args,
            exits,
            type: "interception",
            event: [this, apiName]
          };
          return intercept2(record, () => {
            return originalApi.call(this, ...args);
          });
        };
      });
    });
    return rm;
  }

  // node_modules/@webqit/realdom/src/polyfills.js
  function polyfills_default() {
    CSS_escape.call(this);
    Node_isConnected.call(this);
    Element_matches.call(this);
  }
  function CSS_escape() {
    const window2 = this;
    if (!window2.CSS) {
      window2.CSS = {};
    }
    if (!window2.CSS.escape) {
      window2.CSS.escape = (str) => str.replace(/([\:@\~\$\&])/g, "\\$1");
    }
  }
  function Node_isConnected() {
    const window2 = this;
    if (!("isConnected" in window2.Node.prototype)) {
      Object.defineProperty(window2.Node.prototype, "isConnected", { get: function() {
        return !this.ownerDocument || !(this.ownerDocument.compareDocumentPosition(this) & this.DOCUMENT_POSITION_DISCONNECTED);
      } });
    }
  }
  function Element_matches() {
    const window2 = this;
    if (!window2.Element.prototype.matches) {
      window2.Element.prototype.matches = window2.Element.prototype.matchesSelector || window2.Element.prototype.mozMatchesSelector || window2.Element.prototype.msMatchesSelector || window2.Element.prototype.oMatchesSelector || window2.Element.prototype.webkitMatchesSelector || function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {
        }
        return i > -1;
      };
    }
  }

  // node_modules/@webqit/realdom/src/index.js
  function src_default2() {
    const window2 = this;
    if (!window2.webqit)
      window2.webqit = {};
    if (window2.webqit.realdom)
      return window2.webqit.realdom;
    window2.webqit.realdom = {};
    polyfills_default.call(window2);
    window2.webqit.realdom.meta = (...args) => meta.call(window2, ...args);
    window2.webqit.realdom.ready = (...args) => ready.call(window2, ...args);
    window2.webqit.realdom.realtime = (context, namespace = "dom") => {
      if (namespace === "dom")
        return new DOMRealtime(context, window2);
      if (namespace === "attr")
        return new AttrRealtime(context, window2);
    };
    const scheduler = new Scheduler(window2);
    window2.webqit.realdom.schedule = (type, ...args) => {
      return scheduler[`on${type}`](...args);
    };
    return window2.webqit.realdom;
  }
  function ready(...args) {
    let timing = "interactive", callback;
    if (isString_default(args[0])) {
      timing = args[0];
      if (isFunction_default(args[1])) {
        callback = args[1];
      }
    } else if (isFunction_default(args[0])) {
      callback = args[0];
    }
    const timings = { interactive: ["interactive", "complete"], complete: ["complete"] };
    if (!timings[timing])
      throw new Error(`Invalid ready-state timing: ${timing}.`);
    const window2 = this;
    if (!callback) {
      if (!window2.webqit.realdom.readyStatePromises) {
        window2.webqit.realdom.readyStatePromises = {
          interactive: new Promise((res) => ready.call(this, "interactive", res)),
          complete: new Promise((res) => ready.call(this, "complete", res))
        };
      }
      return window2.webqit.realdom.readyStatePromises[timing];
    }
    if (timings[timing].includes(window2.document.readyState))
      return callback(window2);
    if (!window2.webqit.realdom.readyStateCallbacks) {
      window2.webqit.realdom.readyStateCallbacks = { interactive: [], complete: [] };
      window2.document.addEventListener("readystatechange", () => {
        const state = window2.document.readyState;
        for (const callback2 of window2.webqit.realdom.readyStateCallbacks[state].splice(0)) {
          callback2(window2);
        }
      }, false);
    }
    window2.webqit.realdom.readyStateCallbacks[timing].push(callback);
  }
  function meta(name) {
    const window2 = this;
    let _content = {}, _el;
    if (_el = window2.document.querySelector(`meta[name="${name}"]`)) {
      _content = (_el.content || "").split(";").filter((v) => v).reduce((_metaVars, directive) => {
        const directiveSplit = directive.split("=").map((d) => d.trim());
        set_default(_metaVars, directiveSplit[0].split("."), directiveSplit[1] === "true" ? true : directiveSplit[1] === "false" ? false : isNumeric_default(directiveSplit[1]) ? parseInt(directiveSplit[1]) : directiveSplit[1]);
        return _metaVars;
      }, {});
    }
    return { get name() {
      return name;
    }, get content() {
      return _el.content;
    }, json() {
      return JSON.parse(JSON.stringify(_content));
    } };
  }

  // src/util.js
  function _init(name, $config, $defaults) {
    const _name = name.toUpperCase().replace("-", "_");
    const window2 = this, realdom = src_default2.call(window2);
    window2.webqit || (window2.webqit = {});
    window2.webqit.oohtml || (window2.webqit.oohtml = {});
    window2.webqit.oohtml.configs || (window2.webqit.oohtml.configs = {});
    window2.webqit.oohtml.configs[_name] || (window2.webqit.oohtml.configs[_name] = {});
    merge_default(2, window2.webqit.oohtml.configs[_name], $defaults, $config, realdom.meta(name).json());
    return { config: window2.webqit.oohtml.configs[_name], realdom, window: window2 };
  }

  // src/scoped-js/index.js
  function init({ advanced = {}, ...$config }) {
    const { config, window: window2 } = _init.call(this, "scoped-js", $config, {
      script: { retention: "retain", mimeType: "" },
      advanced: resolveParams(advanced, {
        parserParams: { allowReturnOutsideFunction: false, allowSuperOutsideMethod: false },
        compilerParams: { globalsNoObserve: ["alert"] },
        runtimeParams: { apiVersion: 2 }
      })
    });
    config.scriptSelector = (Array.isArray(config.script.mimeType) ? config.script.mimeType : [config.script.mimeType]).reduce((selector, mm) => {
      const qualifier = mm ? `[type=${window2.CSS.escape(mm)}]` : "";
      return selector.concat(`script${qualifier}[scoped],script${qualifier}[contract]`);
    }, []).join(",");
    window2.webqit.oohtml.Script = { compileCache: [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()] };
    window2.webqit.SubscriptFunction = SubscriptFunctionLite;
    window2.webqit.Observer = src_default;
    realtime.call(window2, config);
  }
  function execute(compiledScript, thisContext, script) {
    if (!compiledScript.function)
      throw new Error(`Input script must already be compiled!`);
    const _try = (callback, isRerender = false) => {
      return callback();
    };
    const returnValue = compiledScript.function.call(thisContext);
    if (script.contract) {
      Object.defineProperty(script, "rerender", { value: (...args) => _await3(returnValue, ([, rerender]) => rerender(...args)) });
      _await3(script.properties, (properties) => {
        properties.processes = properties.dependencies.map((path) => {
          const _env = { "this": thisContext, "globalThis": globalThis, "window": globalThis.window, "self": globalThis.self };
          const getPaths = (base, record_s) => (Array.isArray(record_s) ? record_s : [record_s]).map((record) => [...base, ...record.path || [record.key]]);
          properties.processes = properties.dependencies.map((path2) => {
            if (isTypeObject_default(_env[path2[0]])) {
              if (path2.length === 1)
                return;
              return src_default.deep(_env[path2[0]], path2.slice(1), src_default.observe, (record_s) => {
                script.rerender(...getPaths([path2[0]], record_s));
              });
            }
            return src_default.deep(globalThis, path2, src_default.observe, (record_s) => {
              script.rerender(...getPaths([], record_s));
            });
          });
        });
      });
    }
    const window2 = this, { realdom } = window2.webqit;
    realdom.realtime(window2.document).observe(thisContext, () => {
      if (script.contract) {
        _await3(script.properties, (properties) => {
          properties.processes.forEach((process) => process.abort());
        });
      }
      thisContext.dispatchEvent(new window2.CustomEvent("remove"));
      thisContext.scripts.delete(script);
    }, { subtree: true, timing: "sync", generation: "exits" });
    return script;
  }
  function realtime(config) {
    const window2 = this, { realdom } = window2.webqit;
    if (!window2.HTMLScriptElement.supports) {
      window2.HTMLScriptElement.supports = () => false;
    }
    const potentialManualTypes = ["module"].concat(config.script.mimeType || []);
    const compiler = new Compiler(window2, config, execute), handled = () => {
    };
    realdom.realtime(window2.document).subtree(config.scriptSelector, (record) => {
      record.entrants.forEach((script) => {
        if ("contract" in script)
          return handled(script);
        Object.defineProperty(script, "contract", { value: script.hasAttribute("contract") });
        if ("scoped" in script)
          return handled(script);
        Object.defineProperty(script, "scoped", { value: script.hasAttribute("scoped") });
        if (record.type === "query" || potentialManualTypes.includes(script.type) && !window2.HTMLScriptElement.supports(script.type)) {
          Object.defineProperty(script, "handling", { value: "manual" });
        }
        const thisContext = script.scoped ? script.parentNode || record.target : script.type === "module" ? void 0 : window2;
        compiler.compile(script, thisContext);
      });
    }, { live: true, timing: "intercept", generation: "entrants", eventDetails: true });
  }
  var _await3 = (value, callback) => value instanceof Promise ? value.then(callback) : callback(value);

  // src/scoped-js/targets.browser.js
  init.call(window);
})();
//# sourceMappingURL=scoped-js.js.map
