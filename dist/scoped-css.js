(() => {
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

  // node_modules/@webqit/util/arr/from.js
  function from_default(val, castObject = true) {
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
    path = from_default(path).slice();
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
    path = from_default(path);
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
        args = [from_default(args[0], false), void 0, args[1]];
      } else {
        args[0] = from_default(args[0], false);
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
      const { context, window: window2, webqit } = this;
      if (params.eventDetails && !webqit.realdom.attrInterceptionHooks?.intercepting) {
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
    const { webqit, document, Element } = window2;
    if (!webqit.realdom.attrInterceptionHooks) {
      Object.defineProperty(webqit.realdom, "attrInterceptionHooks", { value: /* @__PURE__ */ new Map() });
    }
    if (!webqit.realdom.attrInterceptionHooks.has(timing)) {
      webqit.realdom.attrInterceptionHooks.set(timing, /* @__PURE__ */ new Set());
    }
    webqit.realdom.attrInterceptionHooks.get(timing).add(callback);
    const rm = () => webqit.realdom.attrInterceptionHooks.get(timing).delete(callback);
    if (webqit.realdom.attrInterceptionHooks?.intercepting)
      return rm;
    console.warn(`Attr mutation APIs are now being intercepted.`);
    webqit.realdom.attrInterceptionHooks.intercepting = true;
    Object.defineProperty(webqit.realdom, "attrInterceptionRecords", { value: /* @__PURE__ */ new Map() });
    const attrIntercept = (record, defaultAction) => {
      if (!webqit.realdom.attrInterceptionRecords.has(record.target)) {
        webqit.realdom.attrInterceptionRecords.set(record.target, {});
      }
      const registry = webqit.realdom.attrInterceptionRecords.get(record.target);
      clearTimeout(registry[record.name]?.timeout);
      registry[record.name] = record.event;
      const timeout = setTimeout(() => {
        delete registry[record.name];
      }, 0);
      Object.defineProperty(record.event, "timeout", { value: timeout, configurable: true });
      webqit.realdom.attrInterceptionHooks.get("intercept")?.forEach((callback2) => callback2([record]));
      const returnValue = defaultAction();
      webqit.realdom.attrInterceptionHooks.get("sync")?.forEach((callback2) => callback2([record]));
      return returnValue;
    };
    const mo = new window2.MutationObserver((records) => {
      records = dedup(records).map((rcd) => withAttrEventDetails.call(window2, rcd)).filter((rcd, i) => {
        return !Array.isArray(rcd.event);
      });
      if (!records.length)
        return;
      webqit.realdom.attrInterceptionHooks.get("intercept")?.forEach((callback2) => callback2(records));
      webqit.realdom.attrInterceptionHooks.get("sync")?.forEach((callback2) => callback2(records));
    });
    mo.observe(document, { attributes: true, subtree: true, attributeOldValue: true });
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
        const exec = () => originalApis[apiName].call(this, ...args);
        return attrIntercept(record, exec);
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
      const { context, window: window2, webqit, document } = this;
      if (params.eventDetails) {
        webqit.realdom.domInterceptionRecordsAlwaysOn = true;
      }
      if ((document.readyState === "loading" || webqit.realdom.domInterceptionRecordsAlwaysOn) && !webqit.realdom.domInterceptionHooks?.intercepting) {
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
    event = from_default(addedNodes).reduce((prev, node) => prev || window2.webqit.realdom.domInterceptionRecords?.get(node), null);
    event = from_default(removedNodes).reduce((prev, node) => prev || window2.webqit.realdom.domInterceptionRecords?.get(node), event);
    event = event || window2.document.readyState === "loading" && "parse" || "mutation";
    return { target, entrants: addedNodes, exits: removedNodes, type: "observation", event };
  }
  function domInterception(timing, callback) {
    const window2 = this;
    const { webqit, document, Node, CharacterData, Element, HTMLElement, HTMLTemplateElement, DocumentFragment } = window2;
    if (!webqit.realdom.domInterceptionHooks) {
      Object.defineProperty(webqit.realdom, "domInterceptionHooks", { value: /* @__PURE__ */ new Map() });
    }
    if (!webqit.realdom.domInterceptionHooks.has(timing)) {
      webqit.realdom.domInterceptionHooks.set(timing, /* @__PURE__ */ new Set());
    }
    webqit.realdom.domInterceptionHooks.get(timing).add(callback);
    const rm = () => webqit.realdom.domInterceptionHooks.get(timing).delete(callback);
    if (webqit.realdom.domInterceptionHooks?.intercepting)
      return rm;
    console.warn(`DOM mutation APIs are now being intercepted.`);
    webqit.realdom.domInterceptionHooks.intercepting = true;
    Object.defineProperty(webqit.realdom, "domInterceptionRecords", { value: /* @__PURE__ */ new Map() });
    const intercept = (record, defaultAction) => {
      record.entrants.concat(record.exits).forEach((node) => {
        clearTimeout(webqit.realdom.domInterceptionRecords.get(node)?.timeout);
        webqit.realdom.domInterceptionRecords.set(node, record.event);
        const timeout = setTimeout(() => {
          webqit.realdom.domInterceptionRecords.delete(node);
        }, 0);
        Object.defineProperty(record.event, "timeout", { value: timeout, configurable: true });
      });
      webqit.realdom.domInterceptionHooks.get("intercept")?.forEach((callback2) => callback2(record));
      const returnValue = defaultAction();
      webqit.realdom.domInterceptionHooks.get("sync")?.forEach((callback2) => callback2(record));
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
        const exec = () => originalApis2[apiName].call(this, ...args);
        if (!(this instanceof CharacterData || this instanceof Element || this instanceof DocumentFragment))
          return exec();
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
          const temp = document.createElement(tempNodeName);
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
        return intercept(record, () => {
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
        let exec = () => originalApis[apiName].set.call(this, value);
        if (!(this instanceof Element))
          return exec();
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
              return exec();
            tempNodeName = this.parentNode.nodeName;
          }
          const temp = document.createElement(tempNodeName === "TEMPLATE" ? "div" : tempNodeName);
          originalApis[apiName].set.call(temp, value);
          entrants = this instanceof HTMLTemplateElement ? [] : [...temp.childNodes];
          if (apiName === "outerHTML") {
            value = new DocumentFragment();
            value.______isTemp = true;
            value.append(...temp.childNodes);
            exec = () => Element.prototype.replaceWith.call(this, value);
          } else {
            if (this instanceof HTMLTemplateElement) {
              exec = () => this.content.replaceChildren(...temp.childNodes);
            } else {
              exec = () => Element.prototype.replaceChildren.call(this, ...temp.childNodes);
            }
          }
        }
        const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
        return intercept(record, exec);
      } });
    });
    ["append", "prepend", "replaceChildren"].forEach((apiName) => {
      [document, DocumentFragment.prototype].forEach((target) => {
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
          return intercept(record, () => {
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
  function src_default() {
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
    const window2 = this, realdom = src_default.call(window2);
    window2.webqit || (window2.webqit = {});
    window2.webqit.oohtml || (window2.webqit.oohtml = {});
    window2.webqit.oohtml.configs || (window2.webqit.oohtml.configs = {});
    window2.webqit.oohtml.configs[_name] || (window2.webqit.oohtml.configs[_name] = {});
    merge_default(2, window2.webqit.oohtml.configs[_name], $defaults, $config, realdom.meta(name).json());
    return { config: window2.webqit.oohtml.configs[_name], realdom, window: window2 };
  }

  // src/scoped-css/index.js
  function init({ advanced = {}, ...$config }) {
    const { config, window: window2 } = _init.call(this, "scoped-css", $config, {
      style: { retention: "retain", mimeType: "", strategy: null }
    });
    config.styleSelector = (Array.isArray(config.style.mimeType) ? config.style.mimeType : [config.style.mimeType]).reduce((selector, mm) => {
      const qualifier = mm ? `[type=${window2.CSS.escape(mm)}]` : "";
      return selector.concat(`style${qualifier}[scoped]`);
    }, []).join(",");
    realtime.call(window2, config);
  }
  function realtime(config) {
    const window2 = this, { realdom } = window2.webqit;
    if (!window2.HTMLScriptElement.supports) {
      window2.HTMLScriptElement.supports = () => false;
    }
    const handled = () => {
    };
    realdom.realtime(window2.document).subtree(config.styleSelector, (record) => {
      record.entrants.forEach((style) => {
        if ("scoped" in style)
          return handled(style);
        if (config.style.strategy === "@scope") {
          Object.defineProperty(style, "scoped", { value: style.hasAttribute("scoped") });
          if (style.hasAttribute("ref"))
            return;
          const uuid = `scoped${uniqId()}`;
          style.setAttribute("ref", uuid);
          style.textContent = `@scope from (:has(> style[ref="${uuid}"])) {
${style.textContent}
}`;
        }
      });
    }, { live: true, timing: "intercept", generation: "entrants" });
  }
  var uniqId = () => (0 | Math.random() * 9e6).toString(36);

  // src/scoped-css/targets.browser.js
  init.call(window);
})();
//# sourceMappingURL=scoped-css.js.map
