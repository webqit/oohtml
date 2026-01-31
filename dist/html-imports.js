var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
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
  if (crossRoots && isShadowRoot(rootNodeB))
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
    if (args[0].filter((x) => typeof x !== "string" && !(x instanceof DOMSpec) && !isNode(x)).length) {
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
    const disconnectable = {
      disconnect() {
        registry.delete(registration);
        mo.disconnect();
      }
    };
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
      const DOMClassName = Object.keys(_apiOriginals).find((name) => isNodeInterface(this, name) && apiName in _apiOriginals[name]);
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
      const DOMClassName = Object.keys(_apiOriginals).find((name) => isNodeInterface(this, name) && apiName in _apiOriginals[name]);
      const $apiOriginals = _apiOriginals[DOMClassName];
      let exec = () => $apiOriginals[apiName].set.call(this, value);
      if (isNodeInterface(this, "HTMLScriptElement") || webqit.realdom.domInterceptionNoRecurse.get(this) === apiName)
        return exec();
      let exits = [], entrants = [], target = this;
      if (["outerHTML", "outerText"].includes(apiName)) {
        exits = [this];
        target = this.parentNode;
      } else {
        if (isNodeInterface(this, "HTMLTemplateElement")) {
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
        entrants = isNodeInterface(this, "HTMLTemplateElement") ? [...temp.content.childNodes] : [...temp.childNodes];
        if (isNodeInterface(this, "HTMLTemplateElement") && this.hasAttribute("src") || isShadowRoot(this)) {
          const getScripts = (nodes) => nodes.reduce((scripts, el) => {
            if (isNodeInterface(el, "HTMLScriptElement"))
              return scripts.concat(el);
            if (isNodeInterface(el, "HTMLTemplateElement"))
              return scripts.concat(getScripts([el.content]));
            scripts = scripts.concat(getScripts([...el.querySelectorAll?.("template") || []].map((t) => t.content)));
            return scripts.concat(...el.querySelectorAll?.("script") || []);
          }, []);
          for (const script of getScripts(entrants)) {
            if (isShadowRoot(this)) {
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
          if (isNodeInterface(this, "HTMLTemplateElement")) {
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
      set_default(
        _metaVars,
        directiveSplit[0].split("."),
        directiveSplit[1] === "true" ? true : directiveSplit[1] === "false" ? false : isNumeric_default(directiveSplit[1]) ? parseInt(directiveSplit[1]) : directiveSplit[1]
      );
      return _metaVars;
    }, {});
  }
  return {
    get name() {
      return name;
    },
    get content() {
      return _el.content;
    },
    json() {
      return JSON.parse(JSON.stringify(_content));
    }
  };
}
function isNode(value) {
  return value !== null && typeof value === "object" && typeof value.nodeType === "number" && typeof value.nodeName === "string";
}
function isElement(value) {
  return value?.nodeType === 1;
}
function isShadowRoot(value) {
  return value?.nodeType === 11 && Object.prototype.toString.call(value) === "[object ShadowRoot]";
}
function isDocument(value) {
  return value?.nodeType === 9 && Object.prototype.toString.call(value) === "[object Document]";
}
function isCharacterData(value) {
  const toStringValue = Object.prototype.toString.call(value);
  return toStringValue === "[object Text]" || toStringValue === "[object Comment]" || toStringValue === "[object CDATASection]" || toStringValue === "[object ProcessingInstruction]";
}
function isNodeInterface(value, interfaceName) {
  if (!isNode(value))
    return false;
  if (interfaceName === "ShadowRoot") {
    return isShadowRoot(value);
    HTMLUnknownElement;
  }
  const toStringValue = Object.prototype.toString.call(value);
  if (toStringValue === `[object ${interfaceName}]`)
    return true;
  if (interfaceName === "DocumentFragment" && isShadowRoot(value))
    return true;
  if (interfaceName === "CharacterData" && isCharacterData(value))
    return true;
  return (interfaceName === "Node" || interfaceName === "Element" || interfaceName === "HTMLElement") && isElement(value) || interfaceName === "Node" && isNode(value);
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

// src/html-imports/HTMLModule.js
var HTMLModule = class {
  static instance(host) {
    return _wq(host).get("defsmanager::instance") || new this(host);
  }
  constructor(host, parent = null, level = 0) {
    const { window: window2 } = env, { webqit: { realdom, oohtml: { configs } } } = window2;
    _wq(host).get(`defsmanager::instance`)?.dispose();
    _wq(host).set(`defsmanager::instance`, this);
    this.window = window2;
    this.host = host;
    this.config = configs.HTML_IMPORTS;
    this.parent = parent;
    this.level = level;
    this.defs = getDefs(this.host);
    this.defId = (this.host.getAttribute(this.config.attr.def) || "").trim();
    this.validateDefId(this.defId);
    this.realtimeA = realdom.realtime(this.host.content).children((record) => {
      this.expose(record.exits, false);
      this.expose(record.entrants, true);
    }, { live: true, timing: "sync" });
    this.realtimeB = realdom.realtime(this.host).attr(["src", "loading"], (...args) => this.evaluateLoading(...args), {
      live: true,
      atomic: true,
      timing: "sync",
      lifecycleSignals: true
    });
    this.realtimeC = this.evalInheritance();
  }
  validateDefId(defId) {
    if (["@", "/", "*", "#"].some((token) => defId.includes(token))) {
      throw new Error(`The export ID "${defId}" contains an invalid character.`);
    }
  }
  expose(entries, isConnected) {
    const { window: window2 } = env, { webqit: { Observer } } = window2;
    let dirty, allFragments = this.defs["#"] || [];
    entries.forEach((entry) => {
      if (!entry || entry.nodeType !== 1)
        return;
      const isTemplate = entry.matches(this.config.templateSelector);
      const defId = (entry.getAttribute(isTemplate ? this.config.attr.def : this.config.attr.fragmentdef) || "").trim();
      if (isConnected) {
        if (isTemplate && defId) {
          new HTMLModule(entry, this.host, this.level + 1);
        } else {
          allFragments.push(entry);
          dirty = true;
          if (typeof requestIdleCallback === "function") {
            requestIdleCallback(() => {
              this.config.idleCompilers?.forEach((callback) => callback.call(this.window, entry));
            });
          }
        }
        if (defId) {
          this.validateDefId(defId);
          Observer.set(this.defs, (!isTemplate && "#" || "") + defId, entry);
        }
      } else {
        if (isTemplate && defId) {
          HTMLModule.instance(entry).dispose();
        } else {
          allFragments = allFragments.filter((x) => x !== entry);
          dirty = true;
        }
        if (defId)
          Observer.deleteProperty(this.defs, (!isTemplate && "#" || "") + defId);
      }
    });
    if (dirty)
      Observer.set(this.defs, "#", allFragments);
  }
  evaluateLoading([record1, record2], { signal }) {
    const { window: { webqit: { Observer } } } = env;
    const src = (record1.value || "").trim();
    if (!src)
      return;
    let $loadingPromise, loadingPromise = (promise) => {
      if (!promise)
        return $loadingPromise;
      $loadingPromise = promise.then(() => interception.remove());
    };
    const loading = (record2.value || "").trim();
    const interception = Observer.intercept(this.defs, "get", async (descriptor, recieved, next) => {
      if (loading === "lazy") {
        loadingPromise(this.load(src, true));
      }
      await loadingPromise();
      return next();
    }, { signal });
    if (loading !== "lazy") {
      loadingPromise(this.load(src));
    }
  }
  #fetchedURLs = /* @__PURE__ */ new Set();
  #fetchInFlight;
  load(src) {
    const { window: window2 } = env;
    if (this.#fetchedURLs.has(src)) {
      return Promise.resolve();
    }
    this.#fetchedURLs.add(src);
    if (this.#fetchedURLs.size === 1 && this.host.content.children.length) {
      return Promise.resolve();
    }
    this.#fetchInFlight?.controller.abort();
    const controller = new AbortController();
    const fire = (type, detail) => this.host.dispatchEvent(new window2.CustomEvent(type, { detail }));
    const request = window2.fetch(src, { signal: controller.signal, element: this.host }).then((response) => {
      return response.ok ? response.text() : Promise.reject(response.statusText);
    }).then((content) => {
      this.host.innerHTML = content.trim();
      fire("load");
      return this.host;
    }).catch((e) => {
      console.error(`Error fetching the bundle at "${src}": ${e.message}`);
      this.#fetchInFlight = null;
      fire("loaderror");
      return this.host;
    });
    this.#fetchInFlight = { request, controller };
    return request;
  }
  evalInheritance() {
    if (!this.parent)
      return [];
    const { window: { webqit: { Observer } } } = env;
    let extendedId = (this.host.getAttribute(this.config.attr.extends) || "").trim();
    let inheritedIds = (this.host.getAttribute(this.config.attr.inherits) || "").trim().split(" ").map((id) => id.trim()).filter((x) => x);
    const handleInherited = (records) => {
      records.forEach((record) => {
        if (Observer.get(this.defs, record.key) !== record.oldValue)
          return;
        if (["get", "set", "def"].includes(record.type)) {
          Observer[record.type.replace("get", "set")](this.defs, record.key, record.value);
        } else if (record.type === "delete") {
          Observer.deleteProperty(this.defs, record.key);
        }
      });
    };
    const realtimes = [];
    const parentDefsObj = getDefs(this.parent);
    if (extendedId) {
      realtimes.push(Observer.reduce(parentDefsObj, [extendedId, this.config.api.defs, Infinity], Observer.get, handleInherited, { live: true }));
    }
    if (inheritedIds.length) {
      realtimes.push(Observer.get(parentDefsObj, inheritedIds.includes("*") ? Infinity : inheritedIds, handleInherited, { live: true }));
    }
    return realtimes;
  }
  dispose() {
    this.realtimeA.disconnect();
    this.realtimeB.disconnect();
    this.realtimeC.forEach((r) => r instanceof Promise ? r.then((r2) => r2.abort()) : r.abort());
    Object.entries(this.defs).forEach(([key, entry]) => {
      if (key.startsWith("#"))
        return;
      HTMLModule.instance(entry).dispose();
    });
  }
};

// src/context-api/_DOMContextRequestEvent.js
function DOMContextRequestEvent_default() {
  const { window: window2 } = env, { webqit } = window2;
  if (webqit.DOMContextRequestEvent)
    return webqit.DOMContextRequestEvent;
  class DOMContextRequestEvent extends window2.Event {
    constructor(...args) {
      const callback = args.pop();
      if (typeof callback !== "function")
        throw new Error(`Callback must be provided.`);
      const options = args.pop();
      if (!options?.kind)
        throw new Error(`"options.kind" must be specified.`);
      const eventNames = ["contextrequest", "contextclaim"];
      const type = args.pop() || eventNames[0];
      if (!eventNames.includes(type))
        throw new Error(`Invalid event type. Must be one of: ${eventNames.join(",")}`);
      const { kind, detail, targetContext, live, signal, diff, ...otherOpts } = options;
      super(type, { ...otherOpts, bubbles: otherOpts.bubbles !== false });
      Object.defineProperty(this, "callback", { get: () => callback });
      Object.defineProperty(this, "kind", { get: () => kind });
      Object.defineProperty(this, "targetContext", { get: () => targetContext });
      Object.defineProperty(this, "detail", { get: () => detail });
      Object.defineProperty(this, "live", { get: () => live });
      Object.defineProperty(this, "signal", { get: () => signal });
      Object.defineProperty(this, "diff", { get: () => diff });
      Object.defineProperty(this, "options", { get: () => otherOpts });
      Object.defineProperty(this, "meta", { value: {} });
    }
    get target() {
      return super.target || this.meta.target;
    }
    get answered() {
      return this.meta.answered || false;
    }
    respondWith(response) {
      this.meta.answered = true;
      if (this.diff) {
        if ("_prevValue" in this && this._prevValue === response)
          return;
        Object.defineProperty(this, "_prevValue", { value: response, configurable: true });
      }
      return this.callback(response);
    }
  }
  webqit.DOMContextRequestEvent = DOMContextRequestEvent;
  return DOMContextRequestEvent;
}

// src/context-api/DOMContextResponse.js
var DOMContextResponse = class extends AbortController {
  constructor(callback) {
    super();
    callback((response) => {
      const { window: { webqit: { Observer } } } = env;
      Observer.defineProperty(this, "value", { value: response, configurable: true, enumerable: true });
    }, this);
  }
};

// src/context-api/DuplicateContextError.js
var DuplicateContextError = class extends Error {
};

// src/context-api/DOMContexts.js
var DOMContexts = class {
  static instance(host) {
    return _wq(host).get("contexts::instance") || new this(host);
    ;
  }
  constructor(host) {
    _wq(host).get(`contexts::instance`)?.dispose();
    _wq(host).set(`contexts::instance`, this);
    const priv = { host, contexts: /* @__PURE__ */ new Set() };
    Object.defineProperty(this, "#", { get: () => priv });
  }
  [Symbol.iterator]() {
    return this["#"].contexts[Symbol.iterator]();
  }
  get length() {
    return this["#"].contexts.size;
  }
  find(...args) {
    return [...this["#"].contexts].find((ctx) => {
      if (typeof args[0] === "function")
        return args[0](ctx);
      return ctx.constructor.kind === args[0] && (!args[1] || ctx.detail === args[1]);
    });
  }
  attach(ctx) {
    if (!(ctx instanceof DOMContext))
      throw new TypeError(`Context is not a valid DOMContext instance.`);
    if (this.find(ctx.constructor.kind, ctx.detail)) {
      throw new DuplicateContextError(`Context of same kind "${ctx.constructor.kind}"${ctx.detail ? ` and detail "${ctx.detail}"` : ""} already exists.`);
    }
    this["#"].contexts.add(ctx);
    ctx.initialize(this["#"].host);
  }
  detach(ctx) {
    ctx.dispose(this["#"].host);
    this["#"].contexts.delete(ctx);
  }
  request(...args) {
    return new DOMContextResponse((emitter, responseInstance) => {
      if (typeof args[args.length - 1] !== "function") {
        if (!args[args.length - 1]) {
          args[args.length - 1] = emitter;
        } else {
          args.push(emitter);
        }
      }
      let options;
      if ((options = args.find((arg) => typeof arg === "object" && arg)) && options.live) {
        if (options.signal)
          options.signal.addEventListener("abort", () => responseInstance.abort());
        args[args.indexOf(options)] = { ...options, signal: responseInstance.signal };
      }
      const event = new (DOMContextRequestEvent_default())(...args);
      this["#"].host.dispatchEvent(event);
    });
  }
};

// src/context-api/DOMContext.js
var _DOMContext = class {
  static createRequest() {
    return { kind: this.kind };
  }
  constructor(detail = null) {
    Object.defineProperty(this, "detail", { get: () => detail });
    Object.defineProperty(this, "subscriptions", { value: /* @__PURE__ */ new Set() });
  }
  get configs() {
    const { window: { webqit: { oohtml: { configs } } } } = env;
    return configs;
  }
  get name() {
    return isDocument(this.host) || isShadowRoot(this.host) ? Infinity : this.host.getAttribute(this.configs.CONTEXT_API.attr.contextname);
  }
  subscribed(event) {
  }
  handle(event) {
  }
  unsubscribed(event) {
  }
  matchEvent(event) {
    return event.kind === this.constructor.kind && (!event.targetContext || event.targetContext === this.name);
  }
  handleEvent(event) {
    if (this.disposed || typeof event.respondWith !== "function")
      return;
    if (event.type === "contextclaim") {
      if (!(event.detail instanceof _DOMContext) || event.target === this.host)
        return;
      const claims = /* @__PURE__ */ new Set();
      this.subscriptions.forEach((subscriptionEvent) => {
        if (!event.target.contains(subscriptionEvent.target) || !event.detail.matchEvent(subscriptionEvent))
          return;
        this.subscriptions.delete(subscriptionEvent);
        this.unsubscribed(subscriptionEvent);
        claims.add(subscriptionEvent);
      });
      if (claims.size) {
        return event.respondWith(claims);
      }
    }
    if (event.type === "contextrequest") {
      if (!this.matchEvent(event))
        return;
      if (event.live) {
        this.subscriptions.add(event);
        this.subscribed(event);
        event.signal?.addEventListener("abort", () => {
          this.subscriptions.delete(event);
          this.unsubscribed(event);
        });
      }
      event.stopPropagation();
      return this.handle(event);
    }
  }
  initialize(host) {
    this.host = host;
    this.disposed = false;
    host.addEventListener("contextrequest", this);
    host.addEventListener("contextclaim", this);
    const { value: claims } = DOMContexts.instance(host).request("contextclaim", { kind: this.constructor.kind, detail: this });
    claims?.forEach((subscriptionEvent) => {
      this.subscriptions.add(subscriptionEvent);
      this.subscribed(subscriptionEvent);
      this.handle(subscriptionEvent);
    });
    return this;
  }
  dispose(host) {
    this.disposed = true;
    host.removeEventListener("contextrequest", this);
    host.removeEventListener("contextclaim", this);
    this.subscriptions.forEach((subscriptionEvent) => {
      this.subscriptions.delete(subscriptionEvent);
      this.unsubscribed(subscriptionEvent);
      const { target } = subscriptionEvent;
      subscriptionEvent.meta.answered = false;
      target.dispatchEvent(subscriptionEvent);
    });
    return this;
  }
};
var DOMContext = _DOMContext;
__publicField(DOMContext, "kind");

// src/html-imports/HTMLImportsContext.js
var _inheritedModules, _modules, _controller1, _controller2;
var HTMLImportsContext = class extends DOMContext {
  constructor() {
    super(...arguments);
    __privateAdd(this, _inheritedModules, {});
    __privateAdd(this, _modules, void 0);
    __privateAdd(this, _controller1, void 0);
    __privateAdd(this, _controller2, void 0);
  }
  static createRequest(detail = null) {
    const request = super.createRequest();
    if (detail?.startsWith("/")) {
      request.detail = detail;
      request.targetContext = Infinity;
    } else if (detail?.startsWith("@")) {
      const [targetContext, ..._detail] = detail.slice(1).split(/(?<=\w)(?=\/|#)/).map((s) => s.trim());
      request.targetContext = targetContext;
      request.detail = _detail.join("");
    } else {
      request.detail = detail;
    }
    return request;
  }
  get localModules() {
    return getDefs(this.host);
  }
  get inheritedModules() {
    return __privateGet(this, _inheritedModules);
  }
  handle(event) {
    const { window: { webqit: { Observer } } } = env;
    event.meta.controller?.abort();
    let path = (event.detail || "").split(/\/|(?<=\w)(?=#)/g).map((x) => x.trim()).filter((x) => x);
    if (!path.length)
      return event.respondWith();
    path = path.join(`/${this.configs.HTML_IMPORTS.api.defs}/`)?.split("/").map((x) => x === "*" ? Infinity : x) || [];
    const options = { live: event.live, sig_nal: event.signal, descripted: true };
    event.meta.controller = Observer.reduce(__privateGet(this, _modules), path, Observer.get, (m) => {
      if (Array.isArray(m)) {
        if (!m.length) {
          event.respondWith();
          return;
        }
        for (const n of m) {
          event.respondWith(n);
        }
      } else {
        event.respondWith(m.value);
      }
    }, options);
  }
  unsubscribed(event) {
    event.meta.controller?.abort();
  }
  initialize(host) {
    this.host = host;
    const { window: { webqit: { Observer } } } = env;
    const resolve = () => {
      for (const key of /* @__PURE__ */ new Set([...Object.keys(this.localModules), ...Object.keys(this.inheritedModules), ...Object.keys(__privateGet(this, _modules))])) {
        if (!Observer.has(this.localModules, key) && !Observer.has(this.inheritedModules, key)) {
          Observer.deleteProperty(__privateGet(this, _modules), key);
        } else if (key === "#" && Observer.has(this.localModules, key) && Observer.has(this.inheritedModules, key)) {
          Observer.set(__privateGet(this, _modules), key, [...Observer.get(this.localModules, key), ...Observer.get(this.inheritedModules, key)]);
        } else {
          const _module = Observer.get(this.localModules, key) || Observer.get(this.inheritedModules, key);
          if (Observer.get(__privateGet(this, _modules), key) !== _module) {
            Observer.set(__privateGet(this, _modules), key, _module);
          }
        }
      }
    };
    __privateSet(this, _modules, { ...this.localModules });
    __privateGet(this, _controller1)?.abort();
    __privateSet(this, _controller1, Observer.observe(this.localModules, () => resolve("local"), { timing: "sync" }));
    const $config = this.configs.HTML_IMPORTS;
    if (this.host.matches && $config.attr.importscontext) {
      const realdom = this.host.ownerDocument.defaultView.webqit.realdom;
      let prevRef;
      __privateGet(this, _controller2)?.disconnect();
      __privateSet(this, _controller2, realdom.realtime(this.host).attr($config.attr.importscontext, (record, { signal }) => {
        const moduleRef = (record.value || "").trim();
        prevRef = moduleRef;
        __privateSet(this, _inheritedModules, {});
        const request = { ...this.constructor.createRequest(moduleRef ? `${moduleRef}/*` : "*"), live: true, signal, diff: true };
        this.host.parentNode[this.configs.CONTEXT_API.api.contexts].request(request, (m) => {
          if (!m) {
            __privateSet(this, _inheritedModules, {});
            resolve("inherited");
          } else if (m.type === "delete") {
            delete __privateGet(this, _inheritedModules)[m.key];
            if (!Reflect.has(this.localModules, m.key)) {
              Observer.deleteProperty(__privateGet(this, _modules), m.key);
            }
          } else {
            __privateGet(this, _inheritedModules)[m.key] = m.value;
            if (!Reflect.has(this.localModules, m.key) && Reflect.get(__privateGet(this, _modules), m.key) !== m.value) {
              Observer.set(__privateGet(this, _modules), m.key, m.value);
            }
          }
        });
        resolve("inherited");
      }, { live: true, timing: "sync", oldValue: true, lifecycleSignals: true }));
    }
    return super.initialize(host);
  }
  dispose(host) {
    __privateGet(this, _controller1)?.abort();
    __privateGet(this, _controller2)?.disconnect();
    return super.dispose(host);
  }
};
_inheritedModules = new WeakMap();
_modules = new WeakMap();
_controller1 = new WeakMap();
_controller2 = new WeakMap();
__publicField(HTMLImportsContext, "kind", "html-imports");

// src/html-imports/_HTMLImportElement.js
function HTMLImportElement_default() {
  const { window: window2 } = env, { webqit } = window2, { realdom, oohtml: { configs } } = webqit;
  if (webqit.HTMLImportElement)
    return webqit.HTMLImportElement;
  const BaseElement = configs.HTML_IMPORTS.elements.import.includes("-") ? window2.HTMLElement : class {
  };
  class HTMLImportElement extends BaseElement {
    static instance(node) {
      if (configs.HTML_IMPORTS.elements.import.includes("-") && node.nodeName === this.nodeName)
        return node;
      return _wq(node).get("import::instance") || new this(node);
    }
    constructor(...args) {
      super();
      const el = args[0] || this;
      _wq(el).set("import::instance", this);
      Object.defineProperty(this, "el", { get: () => el, configurable: false });
      const priv = {};
      Object.defineProperty(this, "#", { get: () => priv, configurable: false });
      priv.slottedElements = /* @__PURE__ */ new Set();
      priv.setAnchorNode = (anchorNode) => {
        priv.anchorNode = anchorNode;
        return anchorNode;
      };
      priv.live = (callback) => {
        if (priv.liveImportsRealtime)
          throw new Error(`Import element already in live mode.`);
        const parentNode = this.el.isConnected ? this.el.parentNode : priv.anchorNode.parentNode;
        priv.liveImportsRealtime = realdom.realtime(this.el).attr(configs.HTML_IMPORTS.attr.ref, (record, { signal }) => {
          priv.moduleRef = record.value;
          const moduleRef = priv.moduleRef.includes("#") ? priv.moduleRef : `${priv.moduleRef}#`;
          const request = { ...HTMLImportsContext.createRequest(moduleRef), live: signal && true, signal, diff: !moduleRef.endsWith("#") };
          parentNode[configs.CONTEXT_API.api.contexts].request(request, (response) => {
            callback((isNodeInterface(response, "HTMLTemplateElement") ? [...response.content.children] : Array.isArray(response) ? response : response && [response]) || []);
          });
        }, { live: true, timing: "sync", lifecycleSignals: true });
        priv.autoDestroyRealtime = realdom.realtime(window2.document).track(parentNode, () => {
          priv.die();
        }, { subtree: "cross-roots", timing: "sync", generation: "exits" });
      };
      priv.die = () => {
        priv.autoDestroyRealtime?.disconnect();
        priv.liveImportsRealtime?.disconnect();
        priv.liveImportsRealtime = null;
      };
      priv.hydrate = (anchorNode, slottedElements) => {
        anchorNode.replaceWith(priv.setAnchorNode(this.createAnchorNode()));
        priv.live((fragments) => {
          if (priv.originalsRemapped)
            return this.fill(fragments);
          const identifiersMap = fragments.map((fragment, i) => ({ el: fragment, fragmentDef: fragment.getAttribute(configs.HTML_IMPORTS.attr.fragmentdef) || "", tagName: fragment.tagName, i }));
          slottedElements.forEach((slottedElement, i) => {
            const tagName = slottedElement.tagName, fragmentDef = slottedElement.getAttribute(configs.HTML_IMPORTS.attr.fragmentdef) || "";
            const originalsMatch = (i++, identifiersMap.find((fragmentIdentifiers) => fragmentIdentifiers.tagName === tagName && fragmentIdentifiers.fragmentDef === fragmentDef && fragmentIdentifiers.i === i));
            if (originalsMatch)
              _wq(slottedElement).set("original@imports", originalsMatch.el);
            _wq(slottedElement).set("slot@imports", this.el);
            priv.slottedElements.add(slottedElement);
          });
          priv.originalsRemapped = true;
          priv.autoRestore();
        });
      };
      priv.autoRestore = (callback = null) => {
        priv.autoRestoreRealtime?.disconnect();
        if (callback)
          callback();
        const restore = () => {
          if (this.el.isConnected)
            return;
          this.el.setAttribute("data-nodecount", 0);
          priv.internalMutation = true;
          priv.anchorNode.replaceWith(this.el);
          priv.internalMutation = false;
          priv.setAnchorNode(null);
        };
        if (!priv.slottedElements.size)
          return restore();
        const autoRestoreRealtime = realdom.realtime(priv.anchorNode.parentNode).observe([...priv.slottedElements], (record) => {
          record.exits.forEach((outgoingNode) => {
            _wq(outgoingNode).delete("slot@imports");
            priv.slottedElements.delete(outgoingNode);
          });
          if (!priv.slottedElements.size) {
            autoRestoreRealtime.disconnect();
            if (!record.target.isConnected)
              return;
            restore();
          }
        }, { subtree: "cross-roots", timing: "sync", generation: "exits" });
        priv.autoRestoreRealtime = autoRestoreRealtime;
      };
      priv.connectedCallback = () => {
        if (priv.internalMutation)
          return;
        priv.live((fragments) => this.fill(fragments));
      };
      priv.disconnectedCallback = () => {
        if (priv.internalMutation)
          return;
        priv.die();
      };
    }
    createAnchorNode() {
      if (window2.webqit.env !== "server") {
        return window2.document.createTextNode("");
      }
      const escapeElement = window2.document.createElement("div");
      escapeElement.textContent = this.el.outerHTML;
      const anchorNode = window2.document.createComment(escapeElement.innerHTML);
      _wq(anchorNode).set("isAnchorNode", true);
      return anchorNode;
    }
    fill(slottableElements, r) {
      if (!this.el.isConnected && (!this["#"].anchorNode || !this["#"].anchorNode.isConnected)) {
        return;
      }
      if (Array.isArray(slottableElements)) {
        slottableElements = new Set(slottableElements);
      }
      this.el.setAttribute("data-nodecount", slottableElements.size);
      this["#"].autoRestore(() => {
        this["#"].slottedElements.forEach((slottedElement) => {
          const slottedElementOriginal = _wq(slottedElement).get("original@imports");
          if (slottableElements.has(slottedElementOriginal)) {
            slottableElements.delete(slottedElementOriginal);
          } else {
            this["#"].slottedElements.delete(slottedElement);
            slottedElement.remove();
          }
        });
        if (slottableElements.size && this.el.isConnected) {
          const newAnchorNode = this["#"].setAnchorNode(this.createAnchorNode());
          this["#"].internalMutation = true;
          this.el.replaceWith(newAnchorNode);
          this["#"].internalMutation = false;
        }
        slottableElements.forEach((slottableElement) => {
          const slottableElementClone = slottableElement.cloneNode(true);
          if (!slottableElementClone.hasAttribute(configs.HTML_IMPORTS.attr.fragmentdef)) {
            slottableElementClone.toggleAttribute(configs.HTML_IMPORTS.attr.fragmentdef, true);
          }
          _wq(slottableElementClone).set("original@imports", slottableElement);
          _wq(slottableElementClone).set("slot@imports", this.el);
          this["#"].slottedElements.add(slottableElementClone);
          this["#"].anchorNode.before(slottableElementClone);
        });
      });
    }
    empty() {
      this["#"].slottedElements.forEach((slottedElement) => slottedElement.remove());
    }
    get anchorNode() {
      return this["#"].anchorNode;
    }
    get moduleRef() {
      return this["#"].moduleRef;
    }
    get slottedElements() {
      return this["#"].slottedElements;
    }
  }
  if (configs.HTML_IMPORTS.elements.import.includes("-")) {
    customElements.define(configs.HTML_IMPORTS.elements.import, HTMLImportElement);
  }
  webqit.HTMLImportElement = HTMLImportElement;
  return HTMLImportElement;
}

// src/html-imports/index.js
function init($config = {}) {
  const { config, window: window2 } = _init.call(this, "html-imports", $config, {
    elements: { import: "import" },
    attr: { def: "def", extends: "extends", inherits: "inherits", ref: "ref", importscontext: "importscontext" },
    api: { def: "def", defs: "defs", import: "import" }
  });
  if (!config.attr.fragmentdef) {
    config.attr.fragmentdef = config.attr.def;
  }
  config.templateSelector = `template[${window2.CSS.escape(config.attr.def)}]`;
  config.importsContextSelector = `[${window2.CSS.escape(config.attr.importscontext)}]`;
  config.slottedElementsSelector = `[${window2.CSS.escape(config.attr.fragmentdef)}]:not(template)`;
  const anchorNodeMatch = (start, end) => {
    const starting = `starts-with(., "${start}")`;
    const ending = `substring(., string-length(.) - string-length("${end}") + 1) = "${end}"`;
    return `${starting} and ${ending}`;
  };
  config.anchorNodeSelector = `comment()[${anchorNodeMatch(`&lt;${config.elements.import}`, `&lt;/${config.elements.import}&gt;`)}]`;
  window2.webqit.HTMLImportsContext = HTMLImportsContext;
  window2.webqit.HTMLImportElement = HTMLImportElement_default();
  exposeAPIs.call(window2, config);
  realtime.call(window2, config);
}
function getDefs(node, autoCreate = true) {
  if (!_wq(node).has("defs") && autoCreate) {
    const defs = /* @__PURE__ */ Object.create(null);
    _wq(node).set("defs", defs);
  }
  return _wq(node).get("defs");
}
function exposeAPIs(config) {
  const window2 = this, { webqit: { oohtml: { configs } } } = window2;
  if (config.api.def in window2.HTMLTemplateElement.prototype) {
    throw new Error(`The "HTMLTemplateElement" prototype already has a "${config.api.def}" API!`);
  }
  if (config.api.defs in window2.HTMLTemplateElement.prototype) {
    throw new Error(`The "HTMLTemplateElement" prototype already has a "${config.api.defs}" API!`);
  }
  Object.defineProperty(window2.HTMLTemplateElement.prototype, config.api.def, {
    get: function() {
      return this.getAttribute(config.attr.def);
    }
  });
  Object.defineProperty(window2.HTMLTemplateElement.prototype, config.api.defs, {
    get: function() {
      return getDefs(this);
    }
  });
  Object.defineProperty(window2.HTMLTemplateElement.prototype, "scoped", {
    configurable: true,
    get() {
      return this.hasAttribute("scoped");
    },
    set(value) {
      this.toggleAttribute("scoped", value);
    }
  });
  [window2.Document.prototype, window2.Element.prototype, window2.ShadowRoot.prototype].forEach((prototype) => {
    const type = prototype === window2.Document.prototype ? "Document" : prototype === window2.ShadowRoot.prototype ? "ShadowRoot" : "Element";
    if (config.api.import in prototype) {
      throw new Error(`The ${type} prototype already has a "${config.api.import}" API!`);
    }
    if (config.api.defs in prototype) {
      throw new Error(`The ${type} prototype already has a "${config.api.defs}" API!`);
    }
    Object.defineProperty(prototype, config.api.defs, {
      get: function() {
        return getDefs(this);
      }
    });
    Object.defineProperty(prototype, config.api.import, {
      value: function(ref, live = false, callback = null) {
        return importRequest(this, ...arguments);
      }
    });
  });
  function importRequest(context, ref, live = false, callback = null) {
    let options = {};
    if (typeof live === "function") {
      callback = live;
      live = false;
    } else if (typeof live === "object" && live) {
      options = { ...live, ...options };
    } else {
      options = { live };
    }
    const request = { ...HTMLImportsContext.createRequest(ref), ...options };
    return context[configs.CONTEXT_API.api.contexts].request(request, callback);
  }
}
function realtime(config) {
  const window2 = this, { webqit: { Observer, realdom, oohtml: { configs }, HTMLImportElement, HTMLImportsContext: HTMLImportsContext2 } } = window2;
  const attachImportsContext = (host) => {
    const contextsApi = host[configs.CONTEXT_API.api.contexts];
    if (!contextsApi.find(HTMLImportsContext2.kind)) {
      contextsApi.attach(new HTMLImportsContext2());
    }
  };
  const detachImportsContext = (host) => {
    const contextsApi = host[configs.CONTEXT_API.api.contexts];
    const ctx = contextsApi.find(HTMLImportsContext2.kind);
    if (ctx && (!host.isConnected || !host.matches?.(config.importsContextSelector) && !Object.keys(ctx.localModules).length)) {
      contextsApi.detach(ctx);
    }
  };
  realdom.realtime(window2.document).query([config.templateSelector, config.importsContextSelector], (record) => {
    record.entrants.forEach((entry) => {
      if (entry.matches(config.templateSelector)) {
        const htmlModule = HTMLModule.instance(entry);
        htmlModule.ownerContext = entry.scoped ? entry.parentNode : entry.getRootNode();
        const ownerContextModulesObj = getDefs(htmlModule.ownerContext);
        if (htmlModule.defId) {
          Observer.set(ownerContextModulesObj, htmlModule.defId, entry);
        }
        attachImportsContext(htmlModule.ownerContext);
      } else {
        attachImportsContext(entry);
      }
    });
    record.exits.forEach((entry) => {
      if (entry.matches(config.templateSelector)) {
        const htmlModule = HTMLModule.instance(entry);
        const ownerContextModulesObj = getDefs(htmlModule.ownerContext);
        if (htmlModule.defId && htmlModule.ownerContext.isConnected) {
          Observer.deleteProperty(ownerContextModulesObj, htmlModule.defId);
        }
        detachImportsContext(htmlModule.ownerContext);
      } else {
        detachImportsContext(entry);
      }
    });
  }, { id: "imports:template/importscontext", live: true, subtree: "cross-roots", timing: "sync", staticSensitivity: true, eventDetails: true });
  realdom.realtime(window2.document).query(config.elements.import, (record) => {
    record.entrants.forEach((node) => handleRealtime(node, true, record));
    record.exits.forEach((node) => handleRealtime(node, false, record));
  }, { id: "imports:import", live: true, subtree: "cross-roots", timing: "sync", deferred: true });
  function handleRealtime(entry, connectedState) {
    const elInstance = HTMLImportElement.instance(entry);
    if (connectedState) {
      elInstance["#"].connectedCallback();
    } else {
      elInstance["#"].disconnectedCallback();
    }
  }
  if (window2.webqit.env === "server")
    return;
  realdom.realtime(window2.document).query(`(${config.anchorNodeSelector})`, (record) => {
    record.entrants.forEach((anchorNode) => {
      if (_wq(anchorNode).get("isAnchorNode"))
        return;
      const reviver = window2.document.createElement("div");
      reviver.innerHTML = anchorNode.nodeValue;
      reviver.innerHTML = reviver.firstChild.textContent;
      const importEl = reviver.firstChild;
      let nodecount = parseInt(importEl.getAttribute("data-nodecount"));
      const slottedElements = /* @__PURE__ */ new Set();
      let slottedElement = anchorNode;
      while ((slottedElement = slottedElement.previousElementSibling) && slottedElement.matches(config.slottedElementsSelector) && nodecount--) {
        slottedElements.add(slottedElement);
      }
      HTMLImportElement.instance(importEl)["#"].hydrate(anchorNode, slottedElements);
    });
  }, { id: "imports:hydration", live: true, subtree: "cross-roots", timing: "sync" });
}

// src/html-imports/targets.browser.js
init.call(window);
//# sourceMappingURL=html-imports.js.map
