// node_modules/@webqit/use-live/src/params.js
function resolveParams(...extensions) {
  let extension, params = { runtimeParams, transformerParams, parserParams };
  while (extension = extensions.shift()) {
    const {
      runtimeParams: _runtimeParams = {},
      transformerParams: { globalsNoObserve: _globalsNoObserve = [], globalsOnlyPathsExcept: _globalsOnlyPathsExcept = [], ..._transformerParams } = {},
      parserParams: _parserParams = {}
    } = extension;
    params = {
      runtimeParams: { ...params.runtimeParams, ..._runtimeParams },
      transformerParams: { ...params.transformerParams, globalsNoObserve: [...params.transformerParams.globalsNoObserve, ..._globalsNoObserve], globalsOnlyPathsExcept: [...params.transformerParams.globalsOnlyPathsExcept, ..._globalsOnlyPathsExcept], ..._transformerParams },
      parserParams: { ...params.parserParams, ..._parserParams }
    };
    if (extensions.devMode) {
    }
  }
  return params;
}
var parserParams = {
  ecmaVersion: "latest",
  allowReturnOutsideFunction: true,
  allowAwaitOutsideFunction: false,
  allowSuperOutsideMethod: false,
  preserveParens: false,
  locations: true
};
var transformerParams = {
  globalsNoObserve: ["arguments", "debugger"],
  globalsOnlyPathsExcept: [],
  originalSource: true,
  locations: true,
  compact: 2
};
var runtimeParams = {
  apiVersion: 3
};

// node_modules/@webqit/realdom/src/realtime/Util.js
function isXpath(expr) {
  return (expr = expr.trim()) && expr.startsWith("(") && expr.endsWith(")");
}
function xpathQuery(window2, context, expr, subtree = true) {
  expr = (Array.isArray(expr) ? expr : [expr]).map((x) => (x + "").replace("(", subtree ? "(.//" : "(./")).join("|");
  let nodes = [], node;
  try {
    const result = window2.document.evaluate(expr, context, null, window2.XPathResult.ANY_TYPE);
    while (node = result.iterateNext())
      nodes.push(node);
  } catch (e) {
  }
  return nodes;
}
function xpathMatch(window2, node, expr) {
  expr = (Array.isArray(expr) ? expr : [expr]).map((x) => (x + "").replace("(", "(self::")).join("|");
  try {
    return window2.document.evaluate(`${expr}`, node, null, window2.XPathResult.BOOLEAN_TYPE).booleanValue;
  } catch (e) {
  }
}
function containsNode(window2, a, b, crossRoots = false, testCache = null) {
  const prevTest = testCache?.get(a)?.get(b);
  if (typeof prevTest !== "undefined")
    return prevTest;
  const response = (val) => {
    if (!testCache?.has(a))
      testCache?.set(a, /* @__PURE__ */ new WeakMap());
    testCache?.get(a)?.set(b, val);
    return val;
  };
  const rootNodeA = a.getRootNode();
  const rootNodeB = b.getRootNode();
  if (rootNodeA === rootNodeB)
    return response(a.contains(b));
  if (crossRoots && rootNodeB instanceof window2.ShadowRoot)
    return response(containsNode(window2, a, rootNodeB.host, crossRoots, testCache));
  return response(false);
}
function splitOuter(str, delim = "|") {
  return [...str].reduce(([quote, depth, splits, skip], x) => {
    if (!quote && depth === 0 && (Array.isArray(delim) ? delim : [delim]).includes(x)) {
      return [quote, depth, [""].concat(splits)];
    }
    if (!quote && ["(", "[", "{"].includes(x) && !splits[0].endsWith("\\"))
      depth++;
    if (!quote && [")", "]", "}"].includes(x) && !splits[0].endsWith("\\"))
      depth--;
    if (['"', "'", "`"].includes(x) && !splits[0].endsWith("\\")) {
      quote = quote === x ? null : quote || x;
    }
    splits[0] += x;
    return [quote, depth, splits];
  }, [null, 0, [""]])[2].reverse();
}

// node_modules/@webqit/util/js/isObject.js
function isObject_default(val) {
  return !Array.isArray(val) && typeof val === "object" && val;
}

// node_modules/@webqit/util/js/isArray.js
function isArray_default(val) {
  return Array.isArray(val);
}

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

// node_modules/@webqit/util/js/wq.js
function wq(obj, ...namespaces) {
  if (!obj || !["object", "function"].includes(typeof obj)) {
    throw new Error(`Argument #1 must be of type object`);
  }
  let wq2 = obj[Symbol.for("wq")];
  if (!wq2) {
    wq2 = new WQInternals();
    Object.defineProperty(obj, Symbol.for("wq"), {
      value: wq2,
      enumerable: false,
      configurable: false,
      writable: false
    });
  }
  if (!namespaces.length) {
    return wq2;
  }
  let _ns, _wq2;
  while (_ns = namespaces.shift()) {
    if ((_wq2 = wq2) && !(wq2 = wq2.get(_ns))) {
      wq2 = new WQInternals();
      _wq2.set(_ns, wq2);
    }
  }
  return wq2;
}
var WQInternals = class extends Map {
};

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
  constructor(window2, synthesis = false) {
    Object.defineProperty(this, "window", { value: window2 });
    Object.defineProperty(this, "readCallbacks", { value: /* @__PURE__ */ new Set() });
    Object.defineProperty(this, "writeCallbacks", { value: /* @__PURE__ */ new Set() });
    Object.defineProperty(this, "_synthesis", { value: 0, writable: true });
    if (!synthesis && this.window.requestAnimationFrame) {
      this._loop();
    } else {
      this._synthesis++;
    }
  }
  get synthesis() {
    return this._synthesis;
  }
  async synthesizeWhile(callback) {
    this._synthesis++;
    this._fulfill();
    const returnValue = await callback();
    this._synthesis--;
    return returnValue;
  }
  _fulfill() {
    for (const callback of this.readCallbacks) {
      callback();
      this.readCallbacks.delete(callback);
    }
    for (const callback of this.writeCallbacks) {
      callback();
      this.writeCallbacks.delete(callback);
    }
  }
  _loop() {
    this.window.requestAnimationFrame(() => {
      this._fulfill();
      this._loop();
    });
  }
  onread(callback, withPromise = false) {
    if (withPromise) {
      return new Promise((resolve) => {
        if (this.synthesis) {
          resolve(callback());
        } else {
          this.readCallbacks.add(() => {
            resolve(callback());
          });
        }
      });
    }
    if (this.synthesis) {
      Promise.resolve().then(callback);
    } else {
      this.readCallbacks.add(callback);
    }
  }
  onwrite(callback, withPromise = false) {
    if (withPromise) {
      return new Promise((resolve) => {
        if (this.synthesis) {
          resolve(callback());
        } else {
          this.writeCallbacks.add(() => {
            resolve(callback());
          });
        }
      });
    }
    if (this.synthesis) {
      Promise.resolve().then(callback);
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

// node_modules/@webqit/realdom/src/realtime/DOMSpec.js
var DOMSpec = class {
  constructor(content) {
    this.content = content;
    this.type = typeof content === "string" ? "selector" : "instance";
    this.kind = this.type === "instance" ? null : isXpath(content) ? "xpath" : "css";
    if (this.kind === "xpath") {
      this.isXpathAttr = splitOuter(content.trim().slice(1, -1), "@").length > 1;
    }
  }
  toString() {
    return this.content;
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
    } else if (isObject_default(args[0]) && !(args[0] instanceof DOMSpec) && args.length === 1) {
      args = [[], void 0, args[0]];
    } else if (isObject_default(args[1]) && args.length === 2) {
      args = [from_default(args[0], false), void 0, args[1]];
    } else {
      args[0] = from_default(args[0], false);
    }
    if (args[0].filter((x) => typeof x !== "string" && !(x instanceof DOMSpec) && !(isObject_default(x) && typeof x.addEventListener === "function")).length) {
      throw new Error(`Argument #2 must be either a string or a Node object, or a list of those.`);
    }
    args[0] = args[0].map((s) => s instanceof DOMSpec ? s : new DOMSpec(s));
    return args;
  }
  registry(...args) {
    return wq(this.window, "realdom", this.namespace, ...args);
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
    const { window: window2 } = this, deferreds = /* @__PURE__ */ new Set(), testCache = /* @__PURE__ */ new WeakMap();
    for (const [registration, deferred] of this.registry(interceptionTiming)) {
      let $records = [].concat(record_s).filter((record) => containsNode(window2, registration.context, record.target, registration.params.subtree === "cross-roots", testCache));
      if (!$records.length)
        continue;
      const args = [registration, Array.isArray(record_s) ? $records : $records[0]];
      if (deferred)
        deferreds.add(args);
      else
        callback.call(window2, ...args);
    }
    for (const args of deferreds)
      callback.call(window2, ...args);
    deferreds.clear();
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
  type = "attr";
  constructor(context, ...args) {
    super(context, "attr", ...args);
  }
  get(spec, callback = void 0, params = {}) {
    const originalFilterIsString = typeof spec === "string" || spec instanceof DOMSpec;
    [spec = [], callback = void 0, params = {}] = this.resolveArgs(arguments);
    const { context } = this;
    const records = attrIntersection(context, spec);
    if (!callback)
      return records;
    const signalGenerator = params.lifecycleSignals && this.createSignalGenerator();
    if (!originalFilterIsString) {
      const flags = signalGenerator?.generate() || {};
      callback(records, flags, context);
    } else {
      for (const record of records) {
        const flags = signalGenerator ? signalGenerator.generate() : {};
        callback(record, flags, context);
      }
    }
    if (params.live) {
      if (signalGenerator) {
        params = { ...params, signalGenerator };
      }
      const disconnectable_live = this.observe(originalFilterIsString ? spec[0] : spec, callback, { newValue: true, ...params });
      return this.disconnectables(params.signal, disconnectable_live);
    }
  }
  observe(spec, callback, params = {}) {
    const originalFilterIsString = typeof spec === "string" || spec instanceof DOMSpec;
    [spec = [], callback, params = {}] = this.resolveArgs(arguments);
    if (["sync", "intercept"].includes(params.timing))
      return this.observeSync(originalFilterIsString ? spec[0] : spec, callback, params);
    if (params.timing && params.timing !== "async")
      throw new Error(`Timing option "${params.timing}" invalid.`);
    const { context, window: window2, webqit } = this;
    if (params.eventDetails && !webqit.realdom.attrInterceptionHooks?.intercepting) {
      attrInterception.call(window2, "intercept", () => {
      });
    }
    const disconnectable = new window2.MutationObserver((records) => {
      records = dedupAndIgnoreInternals(records).map((rcd) => withAttrEventDetails.call(window2, rcd));
      dispatch.call(window2, registration, records, context);
    });
    const $params = { attributes: true, attributeOldValue: params.oldValue, subtree: params.subtree && true };
    if (spec.length) {
      $params.attributeFilter = spec.map((a) => a + "");
    }
    disconnectable.observe(context, $params);
    const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
    const registration = { context, spec, callback, params, atomics: /* @__PURE__ */ new Map(), originalFilterIsString, signalGenerator, disconnectable };
    return this.disconnectables(params.signal, disconnectable, signalGenerator);
  }
  observeSync(spec, callback, params = {}) {
    const originalFilterIsString = typeof spec === "string" || spec instanceof DOMSpec;
    [spec, callback, params = {}] = this.resolveArgs(arguments);
    const { context, window: window2 } = this;
    if (params.timing && !["sync", "intercept"].includes(params.timing))
      throw new Error(`Timing option "${params.timing}" invalid.`);
    const interceptionTiming = params.timing === "intercept" ? "intercept" : "sync";
    if (!this.registry(interceptionTiming).size) {
      attrInterception.call(window2, interceptionTiming, (records) => {
        this.forEachMatchingContext(interceptionTiming, records, dispatch);
      });
    }
    const disconnectable = { disconnect() {
      registry.delete(registration);
    } };
    const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
    const registration = { context, spec, callback, params, atomics: /* @__PURE__ */ new Map(), originalFilterIsString, signalGenerator, disconnectable };
    const registry = this.registry(interceptionTiming);
    registry.set(registration, !!registration.params.deferred);
    return this.disconnectables(params.signal, disconnectable, signalGenerator);
  }
};
function dedupAndIgnoreInternals(records) {
  return records.reduce((rcds, rcd, i) => {
    if (rcds[i - 1]?.attributeName === rcd.attributeName)
      return rcds;
    if (wq(rcd.target, "realdom", "internalAttrInteractions").get(rcd.attributeName))
      return rcds;
    return rcds.concat(rcd);
  }, []);
}
function dispatch(registration, records) {
  const { context, spec, callback, params, atomics, originalFilterIsString, signalGenerator } = registration;
  if (!params.subtree) {
    records = records.filter((r) => {
      return r.target === context;
    });
  }
  if (!records.length)
    return;
  const $spec = spec.map((a) => a + "");
  if (params.atomic && !atomics.size) {
    records = attrIntersection(context, spec, records);
  } else if (params.timing !== "async" && spec.length) {
    records = records.filter((r) => $spec.includes(r.name));
  }
  if (!records.length)
    return;
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
        rcd = { ...rcd, value: internalAttrInteraction(rcd.target, rcd.name, () => rcd.target.getAttribute(rcd.name)) };
      }
      return rcd;
    });
  }
  if (params.atomic) {
    records.forEach((record) => atomics.set(record.name, record));
    records = Array.from(atomics.entries()).map(([, value]) => value);
  }
  const record_s = originalFilterIsString ? records[0] : records;
  const flags = signalGenerator ? signalGenerator.generate() : {};
  callback(record_s, flags, context);
}
function internalAttrInteraction(node, attrName, callback) {
  const savedAttrLocking = wq(node, "realdom", "internalAttrInteractions").get(attrName);
  wq(node, "realdom", "internalAttrInteractions").set(attrName, true);
  const value = callback();
  wq(node, "realdom", "internalAttrInteractions").set(attrName, savedAttrLocking);
  return value;
}
function attrIntersection(context, spec, records = []) {
  const _type = { event: null, type: "attribute" };
  if (spec.length) {
    return spec.map((attrName) => {
      attrName = attrName + "";
      return records.find((r) => r.name === attrName) || { target: context, name: attrName, value: internalAttrInteraction(context, attrName, () => context.getAttribute(attrName)), ..._type };
    });
  }
  const attrs = Array.from(context.attributes);
  return attrs.map((attr) => {
    return records.find((r) => r.name === attr.nodeName) || { target: context, name: attr.nodeName, value: internalAttrInteraction(context, attr.nodeName, () => attr.nodeValue), ..._type };
  });
}
function withAttrEventDetails({ target, attributeName, value, oldValue }) {
  const window2 = this, registry = window2.webqit.realdom.attrInterceptionRecords?.get(target) || {};
  const event = registry[attributeName]?.[0] || "mutation";
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
    registry[record.name] = registry[record.name] || [];
    registry[record.name].unshift(record.event);
    if (wq(record.target, "realdom", "internalAttrInteractions").get(record.name))
      return defaultAction();
    webqit.realdom.attrInterceptionHooks.get("intercept")?.forEach((callback2) => callback2([record]));
    const returnValue = defaultAction();
    webqit.realdom.attrInterceptionHooks.get("sync")?.forEach((callback2) => callback2([record]));
    return returnValue;
  };
  const mo = new window2.MutationObserver((records) => {
    records = records.filter((rcd) => {
      const registry = window2.webqit.realdom.attrInterceptionRecords?.get(rcd.target) || {};
      return !registry[rcd.attributeName]?.shift();
    });
    records = dedupAndIgnoreInternals(records).map((rcd) => withAttrEventDetails.call(window2, rcd));
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
      let value, oldValue = internalAttrInteraction(this, args[0], () => this.getAttribute(args[0]));
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
  query(spec, callback = void 0, params = {}) {
    [spec, callback = void 0, params = {}] = this.resolveArgs(arguments);
    const { context } = this;
    const records = /* @__PURE__ */ new Map(), getRecord = (target) => {
      if (!records.has(target)) {
        records.set(target, { target, entrants: [], exits: [], type: "query", event: null });
      }
      return records.get(target);
    };
    if (!params.generation || params.generation === "entrants") {
      if (!spec.length) {
        [...context.children].forEach((node) => getRecord(context).entrants.push(node));
      } else if (spec.every((s) => s.type === "selector")) {
        const [cssSelectors, xpathQueries] = spec.reduce(([css, xpath], s) => {
          return s.kind === "xpath" ? [css, xpath.concat(s)] : [css.concat(s), xpath];
        }, [[], []]);
        const matches = [];
        if (params.subtree) {
          if (cssSelectors.length) {
            matches.push(...context.querySelectorAll(cssSelectors.join(",")));
          }
          if (xpathQueries.length) {
            matches.push(...xpathQuery(this.window, context, xpathQueries));
          }
        } else {
          if (cssSelectors.length) {
            matches.push(...[...context.children].filter((node) => node.matches(cssSelectors)));
          }
          if (xpathQueries.length) {
            matches.push(...xpathQuery(this.window, context, xpathQueries, false));
          }
        }
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
      const disconnectable_live = this.observe(spec, callback, params);
      return this.disconnectables(params.signal, disconnectable, disconnectable_live);
    }
    return this.disconnectables(params.signal, disconnectable, signalGenerator);
  }
  children(spec, callback = void 0, params = {}) {
    [spec, callback = void 0, params = {}] = this.resolveArgs(arguments);
    return this.query(spec, callback, { ...params, subtree: false });
  }
  subtree(spec, callback = void 0, params = {}) {
    [spec, callback = void 0, params = {}] = this.resolveArgs(arguments);
    return this.query(spec, callback, { ...params, subtree: true });
  }
  observe(spec, callback, params = {}) {
    [spec, callback, params = {}] = this.resolveArgs(arguments);
    if (["sync", "intercept"].includes(params.timing))
      return this.observeSync(spec, callback, params);
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
    disconnectable.observe(context, { childList: true, subtree: params.subtree && true });
    const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
    const registration = { context, spec, callback, params, signalGenerator, disconnectable };
    if (params.staticSensitivity) {
      const disconnectable_attr = staticSensitivity.call(window2, registration);
      return this.disconnectables(params.signal, disconnectable, signalGenerator, disconnectable_attr);
    }
    return this.disconnectables(params.signal, disconnectable, signalGenerator);
  }
  observeSync(spec, callback, params = {}) {
    [spec, callback, params = {}] = this.resolveArgs(arguments);
    const { context, window: window2 } = this;
    if (params.timing && !["sync", "intercept"].includes(params.timing))
      throw new Error(`Timing option "${params.timing}" invalid.`);
    const interceptionTiming = params.timing === "intercept" ? "intercept" : "sync";
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
    mo.observe(context, { childList: true, subtree: params.subtree && true });
    const disconnectable = { disconnect() {
      registry.delete(registration);
      mo.disconnect();
    } };
    const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
    const registration = { context, spec, callback, params, signalGenerator, disconnectable };
    const registry = this.registry(interceptionTiming);
    registry.set(registration, !!registration.params.deferred);
    if (params.staticSensitivity) {
      const disconnectable_attr = staticSensitivity.call(window2, registration);
      return this.disconnectables(params.signal, disconnectable, signalGenerator, disconnectable_attr);
    }
    return this.disconnectables(params.signal, disconnectable, signalGenerator);
  }
  track(elements, callback, params = {}) {
    params = { subtree: true, ...params };
    return this.observe(elements, (record) => {
      if (record.entrants.length)
        callback(true, Array.isArray(elements) ? record.entrants : record.entrants[0]);
      if (record.exits.length)
        callback(false, Array.isArray(elements) ? record.exits : record.exits[0]);
    }, params);
  }
};
function staticSensitivity(registration) {
  const window2 = this;
  const { context, spec, callback, params, signalGenerator } = registration;
  const cssSelectors = spec.filter((s) => s.kind === "css");
  const parseDot = (selector) => selector.match(/\.([\w-]+)/g)?.length ? ["class"] : [];
  const parseHash = (selector) => selector.match(/#([\w-]+)/g)?.length ? ["id"] : [];
  const parse = (selector) => [...selector.matchAll(/\[([^\=\]]+)(\=[^\]]+)?\]/g)].map((x) => x[1]).concat(parseDot(selector)).concat(parseHash(selector));
  if (!(registration.$attrs = Array.from(new Set(cssSelectors.filter((s) => (s + "").includes("[")).reduce((attrs, selector) => attrs.concat(parse(selector + "")), [])))).length)
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
        matchesCache.set(node, cssSelectors.some((s) => node.matches(s + "")));
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
  const { context, spec, callback, params, signalGenerator, $deliveryCache } = registration;
  const record = { ..._record, entrants: [], exits: [] };
  if (!params.eventDetails) {
    delete record.event;
  }
  ["entrants", "exits"].forEach((generation) => {
    if (params.generation && generation !== params.generation)
      return;
    if (spec.length) {
      record[generation] = nodesIntersection.call(this, spec, params.subtree === "cross-roots", _record[generation], _record.event !== "parse");
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
function nodesIntersection(spec, crossRoots, sources, deepIntersect) {
  sources = Array.isArray(sources) ? sources : [...sources];
  const match = (sources2, s) => {
    if (s.type === "selector") {
      let matches = s.isXpathAttr ? [] : sources2.filter((source) => s.kind === "xpath" ? xpathMatch(this, source, s + "") : source.matches && source.matches(s + ""));
      if (deepIntersect || s.isXpathAttr) {
        matches = sources2.reduce((collection, source) => {
          if (s.kind === "xpath") {
            return [...collection, ...xpathQuery(this, source, s, deepIntersect)];
          }
          return source.querySelectorAll ? [...collection, ...source.querySelectorAll(s + "")] : collection;
        }, matches);
      }
      if (matches.length)
        return matches;
    } else {
      if (sources2.includes(s.content) || deepIntersect && sources2.some((source) => containsNode(this, source, s.content, crossRoots))) {
        return [s.content];
      }
    }
  };
  if (!sources.$$searchCache) {
    sources.$$searchCache = /* @__PURE__ */ new Map();
  }
  return spec.reduce((matches, s) => {
    let _matches;
    if (sources.$$searchCache.has(s.content)) {
      _matches = sources.$$searchCache.get(s.content);
    } else {
      _matches = match(sources, s) || [];
      if (s.type === "instance") {
        sources.$$searchCache.set(s.content, _matches);
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
  if (!webqit.realdom.domInterceptionNoRecurse) {
    Object.defineProperty(webqit.realdom, "domInterceptionNoRecurse", { value: /* @__PURE__ */ new Map() });
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
  const noRecurse = (node, method, callback2) => {
    webqit.realdom.domInterceptionNoRecurse.set(node, method);
    const returnValue = callback2();
    webqit.realdom.domInterceptionNoRecurse.delete(node);
    return returnValue;
  };
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
  const _apiNames = {
    ShadowRoot: ["innerHTML", "setHTMLUnsafe"],
    DocumentFragment: ["replaceChildren", "append", "prepend"],
    Document: ["replaceChildren", "append", "prepend"],
    HTMLElement: ["outerText", "innerText"],
    Element: ["append", "prepend", "before", "after", "insertAdjacentElement", "insertAdjacentHTML", "remove", "replaceChildren", "replaceWith", "setHTMLUnsafe", "innerHTML", "outerHTML"],
    CharacterData: ["before", "after", "remove", "replaceWith"],
    Node: ["insertBefore", "replaceChild", "removeChild", "appendChild", "textContent", "nodeValue"]
  };
  const _apiOriginals = {
    ShadowRoot: /* @__PURE__ */ Object.create(null),
    DocumentFragment: /* @__PURE__ */ Object.create(null),
    Document: /* @__PURE__ */ Object.create(null),
    HTMLElement: /* @__PURE__ */ Object.create(null),
    Element: /* @__PURE__ */ Object.create(null),
    CharacterData: /* @__PURE__ */ Object.create(null),
    Node: /* @__PURE__ */ Object.create(null)
  };
  const _apiNamesUnique = new Set(Object.values(_apiNames).reduce((all, apis) => all.concat(apis), []));
  _apiNamesUnique.forEach((apiName) => {
    Object.keys(_apiNames).forEach((DOMClassName) => {
      if (!_apiNames[DOMClassName].includes(apiName))
        return;
      const _apiOriginal = Object.getOwnPropertyDescriptor(window2[DOMClassName].prototype, apiName);
      if (!_apiOriginal)
        return;
      Object.defineProperty(window2[DOMClassName].prototype, apiName, "value" in _apiOriginal ? { ..._apiOriginal, value: method } : { ..._apiOriginal, set: setter });
      _apiOriginals[DOMClassName][apiName] = _apiOriginal;
    });
    function method(...args) {
      const DOMClassName = Object.keys(_apiOriginals).find((name) => this instanceof window2[name] && apiName in _apiOriginals[name]);
      const $apiOriginals = _apiOriginals[DOMClassName];
      let exec = () => $apiOriginals[apiName].value.call(this, ...args);
      if (webqit.realdom.domInterceptionNoRecurse.get(this) === apiName)
        return exec();
      let exits = [], entrants = [], target = this;
      if (["insertBefore"].includes(apiName)) {
        entrants = [args[0]];
      } else if (["insertAdjacentElement", "insertAdjacentHTML"].includes(apiName)) {
        entrants = [args[1]];
        if (["beforebegin", "afterend"].includes(args[0])) {
          target = this.parentNode;
        }
      } else if (["setHTMLUnsafe", "replaceChildren"].includes(apiName)) {
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
      if (["insertAdjacentHTML", "setHTMLUnsafe"].includes(apiName)) {
        let tempNodeName = this.nodeName;
        if (apiName === "insertAdjacentHTML" && ["beforebegin", "afterend"].includes(args[0])) {
          if (!this.parentNode)
            return $apiOriginals[apiName].value.call(this, ...args);
          tempNodeName = this.parentNode.nodeName;
        }
        const temp = document.createElement(tempNodeName.includes("-") ? "div" : tempNodeName);
        $apiOriginals.setHTMLUnsafe.value.call(temp, entrants[0], apiName === "setHTMLUnsafe" ? args[1] : {});
        entrants = [...temp.childNodes];
        if (apiName === "insertAdjacentHTML") {
          apiNameFinal = "insertAdjacentElement";
          args[1] = new DocumentFragment();
          noRecurse(args[1], "append", () => args[1].append(...temp.childNodes));
        } else {
          apiNameFinal = "replaceChildren";
          args = [...temp.childNodes];
        }
      }
      if (!target)
        return exec();
      const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
      return intercept(record, () => {
        return $apiOriginals[apiNameFinal].value.call(this, ...args);
      });
    }
    function setter(value) {
      const DOMClassName = Object.keys(_apiOriginals).find((name) => this instanceof window2[name] && apiName in _apiOriginals[name]);
      const $apiOriginals = _apiOriginals[DOMClassName];
      let exec = () => $apiOriginals[apiName].set.call(this, value);
      if (this instanceof HTMLScriptElement || webqit.realdom.domInterceptionNoRecurse.get(this) === apiName)
        return exec();
      let exits = [], entrants = [], target = this;
      if (["outerHTML", "outerText"].includes(apiName)) {
        exits = [this];
        target = this.parentNode;
      } else {
        if (this instanceof HTMLTemplateElement) {
          target = this.content;
          exits = [...this.content.childNodes];
        } else {
          exits = [...this.childNodes];
        }
      }
      if (["outerHTML", "innerHTML"].includes(apiName)) {
        let tempNodeName = this.nodeName;
        if (apiName === "outerHTML") {
          if (!this.parentNode)
            return exec();
          tempNodeName = this.parentNode.nodeName;
        }
        const temp = document.createElement(tempNodeName.includes("-") ? "div" : tempNodeName);
        noRecurse(temp, apiName, () => temp[apiName] = value);
        entrants = this instanceof HTMLTemplateElement ? [...temp.content.childNodes] : [...temp.childNodes];
        if (this instanceof HTMLTemplateElement && this.hasAttribute("src") || this instanceof ShadowRoot) {
          const getScripts = (nodes) => nodes.reduce((scripts, el) => {
            if (el instanceof HTMLScriptElement)
              return scripts.concat(el);
            if (el instanceof HTMLTemplateElement)
              return scripts.concat(getScripts([el.content]));
            scripts = scripts.concat(getScripts([...el.querySelectorAll?.("template") || []].map((t) => t.content)));
            return scripts.concat(...el.querySelectorAll?.("script") || []);
          }, []);
          for (const script of getScripts(entrants)) {
            if (this instanceof ShadowRoot) {
              script.setAttribute("data-handling", "manual");
              continue;
            }
            const $script = document.createElement("script");
            [...script.attributes].forEach((attr) => $script.setAttribute(attr.name, attr.value));
            $script.textContent = script.textContent;
            noRecurse(script, "replaceWith", () => script.replaceWith($script));
          }
        }
        if (apiName === "outerHTML") {
          value = new DocumentFragment();
          noRecurse(value, "append", () => value.append(...entrants));
          exec = () => noRecurse(this, "replaceWith", () => Element.prototype.replaceWith.call(this, value));
        } else {
          if (this instanceof HTMLTemplateElement) {
            exec = () => noRecurse(this.content, "replaceChildren", () => this.content.replaceChildren(...entrants));
          } else {
            exec = () => noRecurse(this, "replaceChildren", () => Element.prototype.replaceChildren.call(this, ...entrants));
          }
        }
      }
      const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
      return intercept(record, exec);
    }
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
  window2.webqit.realdom.synthesizeWhile = (...args) => {
    return scheduler.synthesizeWhile(...args);
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

// node_modules/@webqit/util/str/toTitle.js
function toTitle_default(str, strict) {
  if (typeof str !== "string") {
    return str;
  }
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + (typeof strict !== void 0 && strict ? txt.substr(1).toLowerCase() : txt.substr(1));
  });
}

// src/util.js
var _wq = (target, ...args) => wq(target, "oohtml", ...args);
var env = {};
function _init(name, $config, $defaults) {
  const window2 = this, realdom = src_default.call(window2);
  env.window = window2;
  if (!window2.webqitConfig) {
    window2.webqitConfig = realdom.meta("webqit").json();
  }
  window2.webqit || (window2.webqit = {});
  window2.webqit.oohtml || (window2.webqit.oohtml = {});
  window2.webqit.oohtml.configs || (window2.webqit.oohtml.configs = {});
  const configKey = name.toUpperCase().replace("-", "_");
  if (!window2.webqit.oohtml.configs[configKey]) {
    window2.webqit.oohtml.configs[configKey] = {};
    const config = window2.webqit.oohtml.configs[configKey];
    merge_default(2, config, $defaults, $config, realdom.meta(name).json());
    if (window2.webqitConfig.prefix) {
      Object.keys(config).forEach((main) => {
        Object.keys(config[main]).forEach((key) => {
          if (main === "api" && typeof config[main][key] === "string") {
            config[main][key] = `${window2.webqitConfig.prefix}${toTitle_default(config[main][key])}`;
          } else if (["attr", "elements"].includes(main) && config[main][key]?.startsWith("data-") === false) {
            config[main][key] = `${window2.webqitConfig.prefix}-${config[main][key]}`;
          }
        });
      });
    }
  }
  return { config: window2.webqit.oohtml.configs[configKey], realdom, window: window2 };
}
function _splitOuter(str, delim) {
  return [...str].reduce(([quote, depth, splits], x) => {
    if (!quote && depth === 0 && (Array.isArray(delim) ? delim : [delim]).includes(x)) {
      return [quote, depth, [""].concat(splits)];
    }
    if (!quote && ["(", "[", "{"].includes(x) && !splits[0].endsWith("\\"))
      depth++;
    if (!quote && [")", "]", "}"].includes(x) && !splits[0].endsWith("\\"))
      depth--;
    if (['"', "'", "`"].includes(x) && !splits[0].endsWith("\\")) {
      quote = quote === x ? null : quote || x;
    }
    splits[0] += x;
    return [quote, depth, splits];
  }, [null, 0, [""]])[2].reverse();
}

// src/data-binding/index.js
function init($config = {}) {
  const { config, window: window2 } = _init.call(this, "data-binding", $config, {
    attr: { render: "render", itemIndex: "data-key" },
    tokens: { nodeType: "processing-instruction", tagStart: "?{", tagEnd: "}?", stateStart: "; [=", stateEnd: "]" },
    advanced: resolveParams({ runtimeParams: { spec: { handler: (e) => {
    } } } })
  });
  ({ CONTEXT_API: config.CONTEXT_API, BINDINGS_API: config.BINDINGS_API, HTML_IMPORTS: config.HTML_IMPORTS } = window2.webqit.oohtml.configs);
  config.attrSelector = `[${window2.CSS.escape(config.attr.render)}]`;
  const discreteBindingsMatch = (start, end) => {
    const starting = `starts-with(., "${start}")`;
    const ending = `substring(., string-length(.) - string-length("${end}") + 1) = "${end}"`;
    return `${starting} and ${ending}`;
  };
  config.discreteBindingsSelector = `comment()[${discreteBindingsMatch(config.tokens.tagStart, config.tokens.tagEnd)}]`;
  realtime.call(window2, config);
}
function realtime(config) {
  const window2 = this, { webqit: { realdom } } = window2;
  realdom.realtime(window2.document).query(config.attrSelector, (record) => {
    record.exits.forEach((e) => {
      if (!e.isConnected && e.getAttribute(config.attr.render)?.includes("@@disconnected")) {
        e.dispatchEvent(new Event("@disconnected"));
      }
    });
    cleanup.call(this, ...record.exits);
    mountInlineBindings.call(window2, config, ...record.entrants);
    queueMicrotask(() => {
    });
  }, { id: "data-binding:attr", live: true, subtree: "cross-roots", timing: "sync", eventDetails: true, staticSensitivity: true });
  realdom.realtime(window2.document).query(`(${config.discreteBindingsSelector})`, (record) => {
    cleanup.call(this, ...record.exits);
    mountDiscreteBindings.call(window2, config, ...record.entrants);
    queueMicrotask(() => {
    });
  }, { id: "data-binding:descrete", live: true, subtree: "cross-roots", timing: "sync" });
}
function createDynamicScope(config, root) {
  const { webqit: { realdom, Observer, DOMBindingsContext } } = this;
  if (_wq(root).has("data-binding"))
    return _wq(root).get("data-binding");
  const scope = /* @__PURE__ */ Object.create(null), abortController = new AbortController();
  scope["$exec__"] = (target, prop, ...args) => {
    const exec = () => {
      try {
        target[prop](...args);
      } catch (e) {
        throw new Error(`Error executing "${prop}()": ${e.message} at ${e.cause}`);
      }
    };
    exec();
  };
  scope["$assign__"] = (target, prop, val) => {
    const exec = () => {
      try {
        target[prop] = val;
      } catch (e) {
        throw new Error(`Error executing "${prop} = ${val}": ${e.message} at ${e.cause}`);
      }
    };
    exec();
  };
  Observer.intercept(scope, {
    get: (e, recieved, next) => {
      if (!(e.key in scope)) {
        const request = { ...DOMBindingsContext.createRequest(e.key), live: true, signal: abortController.signal };
        root[config.CONTEXT_API.api.contexts].request(request, (value) => {
          Observer.set(scope, e.key, value);
        });
      }
      return next(scope[e.key] ?? (e.key in globalThis ? globalThis[e.key] : void 0));
    },
    has: (e, recieved, next) => {
      return next(true);
    }
  });
  const instance = { scope, abortController, bindings: /* @__PURE__ */ new Map() };
  _wq(root).set("data-binding", instance);
  return instance;
}
function cleanup(...entries) {
  for (const node of entries) {
    const root = node.nodeName === "#text" ? node.parentNode : node;
    const { bindings, abortController } = _wq(root).get("data-binding") || {};
    if (!bindings?.has(node))
      return;
    bindings.get(node).liveProgramHandle.abort();
    bindings.get(node).signals?.forEach((s) => s.abort());
    bindings.delete(node);
    if (!bindings.size) {
      abortController.abort();
      _wq(root).delete("data-binding");
    }
  }
}
function patternMatch(config, str) {
  const tagStart = config.tokens.tagStart.split("").map((x) => `\\${x}`).join("");
  const tagEnd = config.tokens.tagEnd.split("").map((x) => `\\${x}`).join("");
  const stateStart = config.tokens.stateStart.split("").map((x) => x === " " ? `(?:\\s+)?` : `\\${x}`).join("");
  const stateEnd = config.tokens.stateEnd.split("").map((x) => `\\${x}`).join("");
  const pattern = `^${tagStart}(.*?)(?:${stateStart}(\\d+)${stateEnd}(?:\\s+)?)?${tagEnd}$`;
  const [, expr, span] = str.match(new RegExp(pattern));
  return { raw: str, expr, span: parseInt(span ?? 0) };
}
async function mountDiscreteBindings(config, ...entries) {
  const window2 = this;
  const instances = entries.reduce((instances2, node) => {
    if (node.isBound)
      return instances2;
    const template = patternMatch(config, node.nodeValue);
    let textNode = node;
    if (template.span) {
      textNode = node.nextSibling;
      if (textNode?.nodeName !== "#text" || textNode.nodeValue.length < template.span)
        return instances2;
      if (textNode.nodeValue.length > template.span) {
        textNode.splitText(template.span);
      }
    } else {
      textNode = node.ownerDocument.createTextNode("");
      node.after(textNode);
    }
    textNode.isBound = true;
    let anchorNode = node;
    if (window2.webqit.env !== "server") {
      anchorNode.remove();
      anchorNode = null;
    }
    return instances2.concat({ textNode, template, anchorNode });
  }, []);
  for (const { textNode, template, anchorNode } of instances) {
    const compiled = compileDiscreteBindings.call(window2, config, template.expr);
    const { scope, bindings } = createDynamicScope.call(this, config, textNode.parentNode);
    Object.defineProperty(textNode, "$oohtml_internal_databinding_anchorNode", { value: anchorNode, configurable: true });
    try {
      bindings.set(textNode, { liveProgramHandle: await (await compiled.bind(textNode, scope)).execute() });
    } catch (e) {
      console.log(e);
    }
  }
}
var discreteParseCache = /* @__PURE__ */ new Map();
function compileDiscreteBindings(config, str) {
  if (discreteParseCache.has(str))
    return discreteParseCache.get(str);
  let source = `let content = ((${str}) ?? '') + '';`;
  source += `$assign__(this, 'nodeValue', content);`;
  source += `if ( this.$oohtml_internal_databinding_anchorNode ) { $assign__(this.$oohtml_internal_databinding_anchorNode, 'nodeValue', "${config.tokens.tagStart}${escDouble(str)}${config.tokens.stateStart}" + content.length + "${config.tokens.stateEnd} ${config.tokens.tagEnd}"); }`;
  const { webqit: { LiveScript, AsyncLiveScript } } = this;
  const { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 } = config.advanced;
  const compiled = new (LiveScript || AsyncLiveScript)(source, { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 });
  discreteParseCache.set(str, compiled);
  return compiled;
}
async function mountInlineBindings(config, ...entries) {
  for (const node of entries) {
    const compiled = compileInlineBindings.call(this, config, node.getAttribute(config.attr.render));
    const { scope, bindings } = createDynamicScope.call(this, config, node);
    const signals = [];
    Object.defineProperty(node, "$oohtml_internal_databinding_signals", { value: signals, configurable: true });
    try {
      bindings.set(node, { signals, liveProgramHandle: await (await compiled.bind(node, scope)).execute() });
    } catch (e) {
      console.log(e);
    }
  }
}
var inlineParseCache = /* @__PURE__ */ new Map();
function compileInlineBindings(config, str) {
  if (inlineParseCache.has(str))
    return inlineParseCache.get(str);
  const validation = {};
  let $event_i = -1;
  const source = _splitOuter(str, ";").map((str2) => {
    const [left, right] = _splitOuter(str2, ":").map((x) => x.trim());
    const directive = left[0], param = left.slice(1).trim();
    const arg = `(${right})`, $arg = `(${arg} ?? '')`;
    if (directive === "$") {
      return `$exec__(this, '${param}', ${arg});`;
    }
    if (directive === "&") {
      if (param.startsWith("--"))
        return `$exec__(this.style, 'setProperty', "${escDouble(param)}", ${$arg});`;
      return `$assign__(this.style, "${escDouble(param)}", ${$arg});`;
    }
    if (directive === "%")
      return `$exec__(this.classList, 'toggle', "${escDouble(param)}", !!${arg});`;
    if (directive === "~") {
      if (param.startsWith("?"))
        return `$exec__(this, 'toggleAttribute', "${escDouble(param.substring(1).trim())}", !!${arg});`;
      return `$exec__(this, 'setAttribute', "${escDouble(param)}", ${$arg});`;
    }
    if (directive === "#") {
      if (validation[param])
        throw new Error(`Duplicate binding: ${left}.`);
      validation[param] = true;
      if (param === "text")
        return `$assign__(this, 'textContent', ${$arg});`;
      if (param === "html")
        return `$assign__(this, 'innerHTML', ${$arg});`;
      if (param === "items") {
        const [iterationSpec, importSpec] = _splitOuter(right, "/");
        if (!importSpec)
          throw new Error(`Invalid ${directive}items spec: ${str2}; no import specifier.`);
        let [raw, production, kind, iteratee] = iterationSpec.trim().match(/(.*?[\)\s+])(of|in)([\(\{\[\s+].*)/i) || [];
        if (!raw)
          throw new Error(`Invalid ${directive}items spec: ${str2}.`);
        if (production.startsWith("(")) {
          production = production.trim().slice(1, -1).split(",").map((x) => x.trim());
        } else {
          production = [production];
        }
        if (production.length > (kind === "in" ? 3 : 2))
          throw new Error(`Invalid ${directive}items spec: ${str2}.`);
        const indices = kind === "in" ? production[2] : production[1] || "$index__";
        const src = `
                let $iteratee__ = ${iteratee};
                let $import__ = this.${config.HTML_IMPORTS.api.import}( ${importSpec.trim()}, true );
                this.$oohtml_internal_databinding_signals?.push( $import__ );
                if ( $import__.value && $iteratee__ ) {
                    let $existing__ = new Map;
                    [ ...this.children ].filter( el => el.matches( '[${config.attr.itemIndex}]' ) ).forEach( x => {
                        $existing__.set( x.getAttribute( '${config.attr.itemIndex}' ), x );
                    } );
                    ${indices ? `let ${indices} = -1;` : ""}
                    for ( let ${production[0]} ${kind} $iteratee__ ) {
                        ${indices ? `${indices} ++;` : ""}
                        ${kind === "in" && production[1] ? `let /*value*/${production[1]} = $iteratee__[ ${production[0]} ];` : ""}
                        let $itemBinding__ = { ${production.join(", ")} };
                        
                        const $key___ = ( ${kind === "in" ? production[0] : indices} ) + '';
                        let $itemNode__ = $existing__.get( $key___ );
                        if ( $itemNode__ ) {
                            $existing__.delete( $key___ );
                            $exec__($itemNode__, '${config.BINDINGS_API.api.bind}', $itemBinding__ );
                        } else {
                            $itemNode__ = ( Array.isArray( $import__.value ) ? $import__.value[ 0 ] : ( $import__.value instanceof window.HTMLTemplateElement ? $import__.value.content.firstElementChild : $import__.value ) ).cloneNode( true );
                            $itemNode__.setAttribute( "${config.attr.itemIndex}", $key___ );
                            $exec__($itemNode__, '${config.BINDINGS_API.api.bind}', $itemBinding__ );
                            $exec__(this, 'appendChild', $itemNode__ );
                        }

                        if ( ${kind === "in" ? `!( ${production[0]} in $iteratee__ )` : `typeof ${production[0]} === 'undefined'`} ) { $itemNode__.remove(); }
                    }
                    $existing__.forEach( x => x.remove() );
                    $existing__.clear();
                }`;
        return src;
      }
    }
    if (directive === "@") {
      if (param === "@connected") {
        return `${arg};`;
      }
      $event_i++;
      return `
                const handler${$event_i} = event => ${right.startsWith("{") ? right : arg};
                this.addEventListener( '${param}', handler${$event_i}${param === "@disconnected" ? ", { once: true }" : ""} );
                const abort${$event_i} = () => this.removeEventListener( '${param}', handler${$event_i} );
                this.$oohtml_internal_databinding_signals?.push( { abort: abort${$event_i} } );
            `;
    }
    if (str2.trim())
      throw new Error(`Invalid binding: ${str2}.`);
  }).join(`
`);
  const { webqit: { LiveScript, AsyncLiveScript } } = this;
  const { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 } = config.advanced;
  const compiled = new (LiveScript || AsyncLiveScript)(source, { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 });
  inlineParseCache.set(str, compiled);
  return compiled;
}
var escDouble = (str) => str.replace(/"/g, '\\"');

// src/data-binding/targets.browser.js
init.call(window);
//# sourceMappingURL=data-binding.js.map
