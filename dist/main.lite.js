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

// node_modules/@webqit/use-live/src/index.lite.js
var index_lite_exports = {};
__export(index_lite_exports, {
  AsyncLiveFunction: () => AsyncLiveFunction,
  AsyncLiveScript: () => AsyncLiveScript,
  LiveFunction: () => LiveFunction,
  LiveModule: () => LiveModule,
  LiveProgramHandle: () => LiveProgramHandle,
  LiveScript: () => LiveScript,
  Observer: () => Observer,
  compile: () => compile2,
  matchPrologDirective: () => matchPrologDirective,
  nextKeyword: () => nextKeyword,
  parse: () => parse,
  serialize: () => serialize,
  transform: () => transform
});

// node_modules/@webqit/observer/src/main.js
var main_exports = {};
__export(main_exports, {
  any: () => any,
  apply: () => apply,
  batch: () => batch,
  construct: () => construct,
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
  map: () => map,
  observe: () => observe,
  ownKeys: () => ownKeys,
  path: () => path,
  preventExtensions: () => preventExtensions,
  reduce: () => reduce,
  set: () => set,
  setPrototypeOf: () => setPrototypeOf,
  subtree: () => subtree
});

// node_modules/@webqit/util/js/isObject.js
function isObject_default(val) {
  return !Array.isArray(val) && typeof val === "object" && val;
}

// node_modules/@webqit/util/js/getType.js
function getType_default(val) {
  return typeof val;
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
  let _ns, _wq3;
  while (_ns = namespaces.shift()) {
    if ((_wq3 = wq2) && !(wq2 = wq2.get(_ns))) {
      wq2 = new WQInternals();
      _wq3.set(_ns, wq2);
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

// node_modules/@webqit/observer/src/util.js
var _wq = (target, ...args) => wq(target, "observerAPI", ...args);
var _await = (value, callback) => value instanceof Promise ? value.then(callback) : callback(value);
var env = {};

// node_modules/@webqit/observer/src/core/Registration.js
var Registration = class {
  constructor(registry2, dfn) {
    this.registry = registry2;
    Object.assign(this, { ...dfn, target: registry2.target });
    if (this.params.signal) {
      this.params.signal.addEventListener("abort", () => this.remove());
    }
  }
  remove() {
    this.removed = true;
    return this.registry.removeRegistration(this);
  }
};

// node_modules/@webqit/observer/src/core/ListenerRegistration.js
var ListenerRegistration = class extends Registration {
  constructor() {
    super(...arguments);
    this.emit.currentRegistration = this;
    Object.defineProperty(this, "abortController", { value: new AbortController() });
    Object.defineProperty(this, "signal", { value: this.abortController.signal });
    env.setMaxListeners?.(0, this.signal);
  }
  remove() {
    this.abortController.abort();
    super.remove();
  }
  fire(events) {
    if (this.emit.recursionTarget && !["inject", "force-async", "force-sync"].includes(this.params.recursions))
      return;
    let matches = events, filter = this.filter;
    if (filter !== Infinity && (filter = from_default(filter, false))) {
      matches = events.filter((event) => filter.includes(event.key));
    }
    if (this.params.diff) {
      matches = matches.filter((event) => event.type !== "set" || event.value !== event.oldValue);
    }
    if (!matches.length)
      return;
    if (["inject", "defer"].includes(this.params.recursions)) {
      if (this.emit.recursionTarget) {
        this.emit.recursionTarget.push(...matches);
        return;
      }
      this.emit.recursionTarget = this.params.recursions === "inject" ? matches : [];
    }
    const $ret = this.filter === Infinity || Array.isArray(this.filter) ? this.emit(matches, this) : this.emit(matches[0], this);
    return _await($ret, (ret) => {
      const recursions = this.emit.recursionTarget;
      delete this.emit.recursionTarget;
      if (this.params.recursions === "defer") {
        if (recursions?.length)
          return this.emit.currentRegistration.fire(recursions);
      }
      return ret;
    });
  }
};

// node_modules/@webqit/observer/src/core/Registry.js
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
    if (!isTypeObject_default(target))
      throw new Error(`Subject must be of type object; "${getType_default(target)}" given!`);
    let ImplementationClass = this;
    if (namespace && _wq(globalThis, "observerAPI", "namespaces").has(type + "-" + namespace)) {
      ImplementationClass = _wq(globalThis, "observerAPI", "namespaces").get(type + "-" + namespace);
      type += "-" + namespace;
    }
    if (!_wq(target, "registry").has(type) && createIfNotExists) {
      _wq(target, "registry").set(type, new ImplementationClass(target));
    }
    return _wq(target, "registry").get(type);
  }
  static _namespace(type, namespace, ImplementationClass = null) {
    type += "-" + namespace;
    if (arguments.length === 2)
      return _wq(globalThis, "observerAPI", "namespaces").get(type);
    if (!(ImplementationClass.prototype instanceof this)) {
      throw new Error(`The implementation of the namespace ${this.name}.${namespace} must be a subclass of ${this.name}.`);
    }
    _wq(globalThis, "observerAPI", "namespaces").set(type, ImplementationClass);
    ImplementationClass.__namespace = namespace;
  }
};

// node_modules/@webqit/observer/src/core/Descriptor.js
var Descriptor = class {
  constructor(target, dfn) {
    this.target = target;
    if (!dfn.operation)
      throw new Error("Descriptor operation must be given in definition!");
    Object.assign(this, dfn);
  }
  get [Symbol.toStringTag]() {
    return "Descriptor";
  }
  static [Symbol.hasInstance](instance) {
    return instance?.[Symbol.toStringTag] === "Descriptor" && instance.operation;
  }
};

// node_modules/@webqit/observer/src/core/ListenerRegistry.js
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
  addRegistration(filter, emit, params) {
    return super.addRegistration(new ListenerRegistration(this, { filter, emit, params }));
  }
  emit(events, { eventsArePropertyDescriptors = false, eventIsArrayMethodDescriptor = false } = {}) {
    if (this.batches.length) {
      const arrayMethodName = this.batches[0].params.arrayMethodName;
      this.batches[0].snapshots.push({
        events: [...events],
        arrayMethodName,
        eventsArePropertyDescriptors,
        eventIsArrayMethodDescriptor
      });
      return;
    }
    this.$emit(this.entries, [{
      events,
      eventsArePropertyDescriptors,
      eventIsArrayMethodDescriptor
    }]);
  }
  $emit(listeners, snapshots) {
    let listenersLength = 0, listenersAskingEventsWithPropertyDescriptors = 0, listenersAskingArrayMethodDescriptors = 0;
    for (const listener of listeners) {
      listenersLength += 1;
      if (listener.params.withPropertyDescriptors) {
        listenersAskingEventsWithPropertyDescriptors += 1;
      }
      if (listener.params.withArrayMethodDescriptors) {
        listenersAskingArrayMethodDescriptors += 1;
      }
    }
    const events_with_PropertyDescriptors_with_ArrayMethodDescriptors = [], events_with_PropertyDescriptors_without_ArrayMethodDescriptors = [];
    const events_without_PropertyDescriptors_with_ArrayMethodDescriptors = [], events_without_PropertyDescriptors_without_ArrayMethodDescriptors = [];
    for (const snapshot of snapshots) {
      const arrayMethodName = snapshot.arrayMethodName;
      const eventsArePropertyDescriptors = snapshot.eventsArePropertyDescriptors;
      const eventIsArrayMethodDescriptor = snapshot.eventIsArrayMethodDescriptor;
      for (const event of snapshot.events) {
        if (arrayMethodName) {
          event.operation = arrayMethodName;
        }
        if (listenersAskingEventsWithPropertyDescriptors) {
          listenersAskingArrayMethodDescriptors && events_with_PropertyDescriptors_with_ArrayMethodDescriptors.push(event);
          if (!eventIsArrayMethodDescriptor) {
            listenersAskingArrayMethodDescriptors !== listenersLength && events_with_PropertyDescriptors_without_ArrayMethodDescriptors.push(event);
          }
        }
        if (listenersAskingEventsWithPropertyDescriptors !== listenersLength) {
          let $event = event;
          if (eventsArePropertyDescriptors) {
            const { target, type, ...details } = event;
            $event = new Descriptor(target, { type: "set", ...details });
            Object.defineProperty($event, "value", "get" in details.value ? { get: () => details.value.get() } : { value: details.value.value });
            if (details.oldValue) {
              Object.defineProperty($event, "oldValue", "get" in details.oldValue ? { get: () => details.oldValue.get() } : { value: details.oldValue.value });
            }
          }
          listenersAskingArrayMethodDescriptors && events_without_PropertyDescriptors_with_ArrayMethodDescriptors.push($event);
          if (!eventIsArrayMethodDescriptor) {
            listenersAskingArrayMethodDescriptors !== listenersLength && events_without_PropertyDescriptors_without_ArrayMethodDescriptors.push($event);
          }
        }
      }
    }
    for (const listener of listeners) {
      if (listener.params.withPropertyDescriptors) {
        if (listener.params.withArrayMethodDescriptors) {
          events_with_PropertyDescriptors_with_ArrayMethodDescriptors.length && listener.fire(events_with_PropertyDescriptors_with_ArrayMethodDescriptors);
        } else {
          events_with_PropertyDescriptors_without_ArrayMethodDescriptors.length && listener.fire(events_with_PropertyDescriptors_without_ArrayMethodDescriptors);
        }
      } else {
        if (listener.params.withArrayMethodDescriptors) {
          events_without_PropertyDescriptors_with_ArrayMethodDescriptors.length && listener.fire(events_without_PropertyDescriptors_with_ArrayMethodDescriptors);
        } else {
          events_without_PropertyDescriptors_without_ArrayMethodDescriptors.length && listener.fire(events_without_PropertyDescriptors_without_ArrayMethodDescriptors);
        }
      }
    }
  }
  batch(callback, params = {}) {
    this.batches.unshift({ entries: [...this.entries], snapshots: [], params });
    const returnValue = callback();
    return _await(returnValue, (returnValue2) => {
      const batch2 = this.batches.shift();
      if (!batch2.snapshots.length)
        return returnValue2;
      this.$emit(batch2.entries, batch2.snapshots);
      return returnValue2;
    });
  }
};

// node_modules/@webqit/observer/src/core/TrapsRegistration.js
var TrapsRegistration = class extends Registration {
  exec(descriptor, next, recieved) {
    if (this.running || !this.traps[descriptor.operation]) {
      return next(...Array.prototype.slice.call(arguments, 2));
    }
    this.running = true;
    return this.traps[descriptor.operation](descriptor, recieved, (...args) => {
      this.running = false;
      return next(...args);
    });
  }
};

// node_modules/@webqit/observer/src/core/TrapsRegistry.js
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

// node_modules/@webqit/observer/src/actors.js
var actors_exports = {};
__export(actors_exports, {
  accessorize: () => accessorize,
  proxy: () => proxy,
  unaccessorize: () => unaccessorize,
  unproxy: () => unproxy
});
var symWQOriginal = Symbol("wqOriginal");
function accessorize(target, props, params = {}) {
  target = resolveTarget(target);
  const accessorizedProps = _wq(target, "accessorizedProps");
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
    currentDescriptorRecord.getValue = function(withPropertyDescriptors = false) {
      if (withPropertyDescriptors)
        return this.descriptor;
      return this.descriptor.get ? this.descriptor.get() : this.descriptor.value;
    };
    currentDescriptorRecord.setValue = function(value, withPropertyDescriptors = false) {
      this.dirty = true;
      if (withPropertyDescriptors) {
        this.descriptor = value;
        return;
      }
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
    accessorizedProps.set(!isNaN(prop) ? parseInt(prop) : prop, currentDescriptorRecord);
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
  const accessorizedProps = _wq(target, "accessorizedProps");
  function unaccessorizeProp(prop) {
    if (!accessorizedProps.has(prop + ""))
      return true;
    return accessorizedProps.get(prop + "").restore();
  }
  const _props = Array.isArray(props) ? props : props === void 0 ? Object.keys(target) : [props];
  const statuses = _props.map(unaccessorizeProp);
  return props === void 0 || Array.isArray(props) ? statuses : statuses[0];
}
function proxy(target, params = {}, extendCallback = void 0) {
  const originalTarget = resolveTarget(target);
  if (typeof params.membrane === "boolean")
    throw new Error(`The params.membrane parameter cannot be of type boolean.`);
  if (params.membrane && _wq(originalTarget, "membraneRef").has(params.membrane)) {
    return _wq(originalTarget, "membraneRef").get(params.membrane);
  }
  const traps = {
    apply: (target2, thisArgument, argumentsList) => apply(target2, thisArgument, argumentsList, void 0, params),
    construct: (target2, argumentsList, newTarget = null) => construct(target2, argumentsList, newTarget, params),
    defineProperty: (target2, propertyKey, attributes) => defineProperty(target2, propertyKey, attributes, params),
    deleteProperty: (target2, propertyKey) => deleteProperty(target2, propertyKey, params),
    get: (target2, propertyKey, receiver = null) => {
      if (propertyKey === symWQOriginal) {
        return originalTarget;
      }
      const $params = { ...params, receiver };
      const returnValue = get(target2, propertyKey, $params);
      if (Array.isArray(target2) && typeof returnValue === "function" && !/^class\s?/.test(Function.prototype.toString.call(returnValue))) {
        return proxy(returnValue, { ...params, arrayMethodName: propertyKey, membrane: receiver }, extendCallback);
      }
      if (params.chainable && isTypeObject_default(returnValue) && propertyKey !== "prototype" && !(typeof returnValue === "function" && /^class\s?|\{\s\[native\scode\]\s\}$/.test(Function.prototype.toString.call(returnValue)))) {
        return proxy(returnValue, params, extendCallback);
      }
      return returnValue;
    },
    getOwnPropertyDescriptor: (target2, propertyKey) => getOwnPropertyDescriptor(target2, propertyKey, params),
    getPrototypeOf: (target2) => getPrototypeOf(target2, params),
    has: (target2, propertyKey) => has(target2, propertyKey, params),
    isExtensible: (target2) => isExtensible(target2, params),
    ownKeys: (target2) => ownKeys(target2, params),
    preventExtensions: (target2) => preventExtensions(target2, params),
    set: (target2, propertyKey, value, receiver = null) => set(target2, propertyKey, value, { ...params, receiver }),
    setPrototypeOf: (target2, prototype) => setPrototypeOf(target2, prototype, params)
  };
  const $traps = extendCallback?.(traps) || traps;
  const $proxy = new Proxy(originalTarget, $traps);
  if (params.membrane) {
    _wq(originalTarget, "membraneRef").set(params.membrane, $proxy);
  }
  return $proxy;
}
function unproxy(target) {
  return target && target[symWQOriginal] || target;
}
function resolveTarget(target) {
  if (!target || !isTypeObject_default(target))
    throw new Error("Target must be of type object!");
  return unproxy(target);
}

// node_modules/@webqit/observer/src/main.js
var Path = class extends Array {
  get [Symbol.toStringTag]() {
    return "Path";
  }
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance) && instance[Symbol.toStringTag] === "Path";
  }
};
function path(...segments) {
  return new Path(...segments);
}
var Subtree = class extends Array {
  get [Symbol.toStringTag]() {
    return "Subtree";
  }
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance) && instance[Symbol.toStringTag] === "Subtree";
  }
};
function subtree() {
  return new Subtree();
}
function any() {
  return Infinity;
}
function reduce(target, path2, receiver, final = (x) => x, params = {}) {
  const _isSubtree = path2 instanceof Subtree;
  if (!_isSubtree && !path2?.length)
    return;
  return function eat(target2, path3, $params, $isSubtree) {
    const isSubtree = $isSubtree || path3[$params.level] instanceof Subtree;
    const segment = isSubtree ? Infinity : path3[$params.level];
    const isLastSegment = isSubtree ? false : $params.level === path3.length - 1;
    if (target2 instanceof Descriptor && target2.operation !== "get") {
      $params = { ...$params, probe: "always" };
    } else if ($params.probe !== "always") {
      $params = { ...$params, probe: !isLastSegment };
    }
    return receiver(target2, segment, (result, ...args) => {
      const addTrail = (desc) => {
        if (!(desc instanceof Descriptor))
          return;
        desc.path = "key" in desc ? [desc.key] : [];
        if (target2 instanceof Descriptor) {
          desc.path = "key" in desc ? target2.path.concat(desc.key) : target2.path.slice(0);
          Object.defineProperty(desc, "context", { get: () => target2, configurable: true });
        }
      };
      const flags = args[0] || {};
      const advance = (result2) => {
        if (result2 instanceof Descriptor && "argumentsList" in result2) {
          return;
        }
        const $value = resolveObj(result2, false);
        return _await($value, ($value2) => {
          if (result2 instanceof Descriptor) {
            result2.value = $value2;
          } else {
            result2 = $value2;
          }
          return eat(result2, path3, { ...$params, ...flags, keyInParent: result2.key, level: $params.level + 1 }, isSubtree);
        });
      };
      if (isPropsList(segment) && Array.isArray(result)) {
        result.forEach(addTrail);
        if (isLastSegment) {
          return final(result, ...args);
        }
        if (isSubtree && result[0] instanceof Descriptor && (result[0].operation !== "get" || params.asGet)) {
          final(result, ...args);
        }
        for (const entry of result) {
          advance(entry);
        }
        return;
      }
      addTrail(result);
      if (isLastSegment) {
        return final(result, ...args);
      }
      return advance(result);
    }, $params);
  }(target, path2.slice(0), { ...params, level: 0 }, _isSubtree);
}
function observe(target, prop, receiver, params = {}) {
  const originalTarget = resolveObj(target, !params.level);
  if (isFunction_default(arguments[1])) {
    [, receiver, params = {}] = arguments;
    prop = Infinity;
  }
  if (!isFunction_default(receiver))
    throw new Error(`Handler must be a function; "${getType_default(receiver)}" given!`);
  if (prop instanceof Path || prop instanceof Subtree)
    return reduce(originalTarget, prop, observe, receiver, params);
  params = { ...params, descripted: true };
  delete params.live;
  if (!isTypeObject_default(originalTarget))
    return params.probe && get(originalTarget, prop, receiver, params) || void 0;
  const emit = bind(originalTarget, prop, receiver, params);
  if (params.probe) {
    return get(originalTarget, prop, emit, params);
  }
  return emit();
}
function intercept(target, traps, params = {}) {
  const originalTarget = resolveObj(target);
  if (!isObject_default(traps)) {
    [, , , params = {}] = arguments;
    traps = { [arguments[1]]: arguments[2] };
  }
  return TrapsRegistry.getInstance(originalTarget, true, params.namespace).addRegistration({ traps, params });
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
  const originalTarget = resolveObj(target, !params.level);
  if (isObject_default(receiver)) {
    [params, receiver] = [receiver, (x) => x];
  } else if (params.live) {
    isLive = true;
  }
  if (prop instanceof Path || prop instanceof Subtree)
    return reduce(originalTarget, prop, get, receiver, { ...params, asGet: true });
  return resolveProps(originalTarget, prop, (props) => {
    const related = [...props];
    return function next(results, _props, _done) {
      if (!_props.length)
        return _done(results);
      const prop2 = _props.shift();
      if (!["string", "number", "symbol"].includes(typeof prop2)) {
        throw new Error(`Property name/key ${prop2} invalid.`);
      }
      function defaultGet(descriptor2, value = void 0) {
        const _next = (value2) => (descriptor2.value = value2, next([...results, params.live || params.descripted ? descriptor2 : value2], _props, _done));
        if (arguments.length > 1)
          return _next(value);
        if (!isTypeObject_default(originalTarget))
          return _next(originalTarget?.[descriptor2.key]);
        const accessorizedProps = _wq(originalTarget, "accessorizedProps", false);
        const accessorization = accessorizedProps && accessorizedProps.get(descriptor2.key);
        if (accessorization && accessorization.intact()) {
          return _next(accessorization.getValue(params.withPropertyDescriptors));
        }
        if (params.withPropertyDescriptors) {
          const desc = Object.getOwnPropertyDescriptor(originalTarget, descriptor2.key);
          return _next(desc);
        }
        return _next(Reflect.get(originalTarget, descriptor2.key));
      }
      const descriptor = new Descriptor(originalTarget, {
        type: "get",
        key: prop2,
        value: void 0,
        operation: "get",
        related
      });
      if (!isTypeObject_default(originalTarget))
        return defaultGet(descriptor);
      const trapsRegistry = TrapsRegistry.getInstance(originalTarget, false, params.namespace);
      if (trapsRegistry) {
        return trapsRegistry.emit(descriptor, defaultGet);
      }
      return defaultGet(descriptor);
    }([], props.slice(0), (results) => {
      const result_s = isPropsList(prop) ? results : results[0];
      if (isLive && isTypeObject_default(originalTarget)) {
        const emit = bind(originalTarget, prop, receiver, params, target.key);
        return emit(result_s);
      }
      return receiver(result_s);
    });
  }, params);
}
function batch(target, callback, params = {}) {
  const originalTarget = resolveObj(target);
  return ListenerRegistry.getInstance(originalTarget, true, params.namespace).batch(callback, params);
}
function map(source, target, params = {}) {
  target = resolveObj(target);
  source = resolveObj(source);
  const only = (params.only || []).slice(0), except = (params.except || []).slice(0);
  const sourceKeys = Object.keys(params.spread ? [...source] : source).map((k) => !isNaN(k) ? parseInt(k) : k);
  const filteredKeys = only.length ? only.filter((k) => sourceKeys.includes(k)) : sourceKeys.filter((k) => !except.includes(k));
  const resolveKey = (k) => {
    if (!Array.isArray(target) || isNaN(k))
      return k;
    return k - except.filter((i) => i < k).length;
  };
  const doSet = (key) => {
    const descriptor = getOwnPropertyDescriptor(source, key, params);
    if ("value" in descriptor && descriptor.writable && descriptor.enumerable && descriptor.configurable) {
      set(target, resolveKey(key), descriptor.value, params);
    } else if (descriptor.enumerable || params.onlyEnumerable === false) {
      defineProperty(target, key, { ...descriptor, configurable: true }, params);
    }
  };
  batch(target, () => {
    filteredKeys.forEach(doSet);
  });
  return observe(source, (mutations) => {
    mutations.filter((m) => only.length ? only.includes(m.key) : !except.includes(m.key)).forEach((m) => {
      if (m.type === "delete")
        return deleteProperty(target, resolveKey(m.key), params);
      if (m.type === "def") {
        if (m.value.enumerable || params.onlyEnumerable === false) {
          defineProperty(target, resolveKey(m.key), { ...m.value, configurable: true }, params);
        }
        return;
      }
      doSet(m.key);
    });
  }, { ...params, withPropertyDescriptors: true });
}
function set(target, prop, value, receiver = (x) => x, params = {}, def = false) {
  const originalTarget = resolveObj(target);
  let entries = [[prop, value]];
  if (isObject_default(prop)) {
    [, , receiver = (x) => x, params = {}, def = false] = arguments;
    entries = Object.entries(prop);
  }
  if (isObject_default(receiver)) {
    [def, params, receiver] = [typeof params === "boolean" ? params : def, receiver, (x) => x];
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
      const accessorizedProps = _wq(originalTarget, "accessorizedProps", false);
      const accessorization = accessorizedProps && accessorizedProps.get(descriptor.key);
      if (descriptor.type === "def") {
        if (accessorization && !accessorization.restore())
          _next(false);
        Object.defineProperty(originalTarget, descriptor.key, descriptor.value);
        return _next(true);
      }
      if (accessorization && accessorization.intact()) {
        return _next(accessorization.setValue(descriptor.value));
      }
      return _next(Reflect.set(originalTarget, descriptor.key, descriptor.value));
    }
    function exec3(isUpdate, oldValue) {
      if (params.diff && value2 === oldValue)
        return next(descriptors, entries2, _done);
      const descriptor = new Descriptor(originalTarget, {
        type: def ? "def" : "set",
        key: prop2,
        value: value2,
        isUpdate,
        oldValue,
        related: [...related],
        operation: def ? "defineProperty" : "set",
        detail: params.detail
      });
      const trapsRegistry = TrapsRegistry.getInstance(originalTarget, false, params.namespace);
      return trapsRegistry ? trapsRegistry.emit(descriptor, defaultSet) : defaultSet(descriptor);
    }
    return has(originalTarget, prop2, (exists) => {
      if (!exists)
        return exec3(exists);
      if (prop2 === "length" && Array.isArray(originalTarget) && _wq(originalTarget).has("$length")) {
        return exec3(true, _wq(originalTarget).get("$length"));
      }
      const $params = { ...params, withPropertyDescriptors: def };
      return get(originalTarget, prop2, (oldValue) => exec3(exists, oldValue), $params);
    }, params);
  }([], entries.slice(0), (descriptors) => {
    const listenerRegistry = ListenerRegistry.getInstance(originalTarget, false, params.namespace);
    if (listenerRegistry)
      listenerRegistry.emit(descriptors, { eventsArePropertyDescriptors: !!def });
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
  const originalTarget = resolveObj(target);
  if (isObject_default(receiver)) {
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
      const accessorizedProps = _wq(originalTarget, "accessorizedProps", false);
      const accessorization = accessorizedProps && accessorizedProps.get(descriptor.key);
      if (accessorization && !accessorization.restore())
        _next(false);
      return _next(Reflect.deleteProperty(originalTarget, descriptor.key));
    }
    function exec3(oldValue) {
      const descriptor = new Descriptor(originalTarget, {
        type: "delete",
        key: prop2,
        oldValue,
        related: [...related],
        operation: "deleteProperty",
        detail: params.detail
      });
      const trapsRegistry = TrapsRegistry.getInstance(originalTarget, false, params.namespace);
      return trapsRegistry ? trapsRegistry.emit(descriptor, defaultDel) : defaultDel(descriptor);
    }
    return get(originalTarget, prop2, exec3, params);
  }([], props.slice(0), (descriptors) => {
    const listenerRegistry = ListenerRegistry.getInstance(originalTarget, false, params.namespace);
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
  const originalThis = unproxy(thisArgument);
  let returnValue;
  if (Array.isArray(thisArgument)) {
    if (params.arrayMethodName) {
      const descriptor = new Descriptor(originalThis, {
        operation: params.arrayMethodName,
        argumentsList
      });
      const listenerRegistry = ListenerRegistry.getInstance(originalThis, false, params.namespace);
      listenerRegistry?.emit([descriptor], { eventIsArrayMethodDescriptor: true });
    }
    _wq(originalThis).set("$length", originalThis.length);
    returnValue = batch(originalThis, () => exec(target, "apply", { thisArgument, argumentsList }, receiver, params), params);
    _wq(originalThis).delete("$length");
  } else {
    returnValue = exec(target, "apply", { thisArgument: originalThis, argumentsList }, receiver, params);
  }
  return returnValue;
}
function setPrototypeOf(target, proto, receiver = (x) => x, params = {}) {
  return exec(target, "setPrototypeOf", { proto }, receiver, params);
}
function preventExtensions(target, receiver = (x) => x, params = {}) {
  return exec(target, "preventExtensions", {}, receiver, params);
}
function bind(target, prop, receiver, params = {}) {
  const controller = new AbortController();
  env.setMaxListeners?.(0, controller.signal);
  if (params.signal) {
    params.signal.addEventListener("abort", () => controller.abort());
  }
  const $params = { ...params, signal: controller.signal };
  const listenerRegistry = ListenerRegistry.getInstance(target, true, $params.namespace);
  const childRegistrations = /* @__PURE__ */ new Map();
  return function emit(descriptor_s = [], prevRegistration = null) {
    let flags, registrationNext, isExisting;
    if (isPropsList(prop)) {
      if (prevRegistration) {
        isExisting = true;
        registrationNext = prevRegistration;
        for (const descriptor of descriptor_s) {
          childRegistrations.get(descriptor.key)?.remove();
          childRegistrations.delete(descriptor.key);
        }
      } else {
        registrationNext = listenerRegistry.addRegistration(prop, emit, $params);
      }
      flags = { signal: registrationNext.signal, childRegistrations };
    } else {
      prevRegistration?.remove();
      registrationNext = listenerRegistry.addRegistration(prop, emit, $params);
      flags = { signal: registrationNext.signal };
    }
    if ($params.childRegistrations && $params.keyInParent) {
      $params.childRegistrations.set($params.keyInParent, registrationNext);
    }
    if (arguments.length) {
      const handlerReturnValue = receiver(descriptor_s, flags);
      if (arguments.length > 1)
        return handlerReturnValue;
    }
    return controller;
  };
}
function exec(target, operation, payload = {}, receiver = (x) => x, params = {}) {
  target = resolveObj(target);
  if (isObject_default(receiver)) {
    [params, receiver] = [receiver, (x) => x];
  }
  function defaultExec(descriptor2, result) {
    if (arguments.length > 1)
      return receiver(result);
    return receiver((Reflect[operation] || Object[operation])(target, ...Object.values(payload)));
  }
  const descriptor = new Descriptor(target, { operation, ...payload });
  const trapsRegistry = TrapsRegistry.getInstance(target, false, params.namespace);
  if (trapsRegistry) {
    return trapsRegistry.emit(descriptor, defaultExec);
  }
  return defaultExec(descriptor);
}
function isPropsList(prop) {
  return prop === Infinity || Array.isArray(prop);
}
function resolveObj(obj, assert = true, probePropertyDescriptors = true) {
  if ((!obj || !isTypeObject_default(obj)) && assert)
    throw new Error(`Object must be of type object or array! "${getType_default(obj)}" given.`);
  if (obj instanceof Descriptor) {
    if (obj.type === "def" && probePropertyDescriptors) {
      obj = typeof obj.value.get === "function" ? obj.value.get() : obj.value.value;
    } else {
      obj = obj.value;
    }
  }
  return obj && unproxy(obj);
}
function resolveProps(obj, prop, receiver, params = {}) {
  if (prop === Infinity) {
    if (params.level && !isTypeObject_default(obj))
      return receiver([]);
    return receiver(Object.entries(Object.getOwnPropertyDescriptors(obj)).filter(([, p]) => p.writable !== false && !p.get && !p.set).map(([name]) => name));
  }
  return receiver(from_default(prop, false));
}

// node_modules/@webqit/observer/src/index.js
var Observer = { ...main_exports, ...actors_exports };

// node_modules/@webqit/use-live/src/runtime/LiveProgramHandle.js
var LiveProgramHandle = class {
  constructor(runtime) {
    Object.defineProperty(this, Symbol.toStringTag, { value: "LiveProgramHandle" });
    Object.defineProperty(this, "runtime", { value: runtime });
    const events = {
      statechange: () => {
        Observer.defineProperty(this, "value", { value: runtime.flowControl.get("return")?.arg, enumerable: true, configurable: true });
      }
    };
    for (const name in events) {
      runtime.on(name, events[name]);
      events[name]();
    }
    if (runtime.$params.sourceType === "module") {
      Object.defineProperty(this, "exports", { value: runtime.exports });
    }
  }
  abort() {
    return this.runtime.abort(true);
  }
};

// node_modules/@webqit/use-live/src/util.js
var _call = (_function, ...args) => {
  const callback = args.pop();
  if (_function.constructor.name === "AsyncFunction")
    return _await2(_function.call(...args), callback);
  try {
    return callback(_function.call(...args));
  } catch (e) {
    return callback(void 0, e);
  }
};
var _await2 = (maybePromise, callback) => {
  return maybePromise instanceof Promise ? maybePromise.then(callback).catch((e) => callback(void 0, e)) : callback(maybePromise);
};
var _isTypeObject = (val) => {
  return typeof val === "object" && val || typeof val === "function";
};
function _$functionArgs(args) {
  const params = typeof args[args.length - 1] === "object" ? args.pop() : {};
  const source = args.pop() || "";
  return { source, args, params };
}
var env2 = {};
function matchPrologDirective(str, strictStart = false) {
  if (strictStart)
    return /^(["'])use live\1\s*(;|$)/.test(str);
  return /(["'])use live\1\s*(;|$)/.test(str);
}
function nextKeyword(input, start = 0, mode = null) {
  let i = start;
  const l = input.length;
  const skipWS = () => {
    while (i < l && /\s/.test(input[i]))
      i++;
  };
  const skipLineComment = () => {
    i += 2;
    while (i < l && input[i] !== "\n" && input[i] !== "\r")
      i++;
  };
  const skipBlockComment = () => {
    i += 2;
    while (i < l && !(input[i] === "*" && input[i + 1] === "/"))
      i++;
    if (i < l)
      i += 2;
  };
  while (i < l) {
    skipWS();
    if (input[i] === "/" && input[i + 1] === "/") {
      skipLineComment();
      continue;
    }
    if (input[i] === "/" && input[i + 1] === "*") {
      skipBlockComment();
      continue;
    }
    break;
  }
  if (mode === 0)
    return input.slice(i);
  const startIdent = i;
  if (i < l && /[A-Za-z$_]/.test(input[i])) {
    i++;
    while (i < l && /[A-Za-z0-9$_]/.test(input[i]))
      i++;
    return input.slice(startIdent, i);
  }
  if (mode === 1 && i < l) {
    return input[i];
  }
  return null;
}

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

// node_modules/@webqit/use-live/src/transformer/Node.js
var Node_default = {
  throwStmt(argument) {
    return { type: "ThrowStatement", argument };
  },
  tryStmt(block, handler, finalizer, guardedHandlers) {
    return { type: "TryStatement", block, handler, finalizer, guardedHandlers };
  },
  catchClause(param, body) {
    return { type: "CatchClause", param, body };
  },
  exprStmt(expression) {
    return { type: "ExpressionStatement", expression };
  },
  blockStmt(body) {
    return { type: "BlockStatement", body };
  },
  labeledStmt(label, body) {
    return { type: "LabeledStatement", label, body };
  },
  withStmt(object, body) {
    return { type: "WithStatement", object, body };
  },
  ifStmt(test, consequent, alternate) {
    return this.conditionalExpr(test, consequent, alternate, "IfStatement");
  },
  switchStmt(discriminant, cases, lexical = false) {
    return { type: "SwitchStatement", discriminant, cases };
  },
  switchCase(test, consequent) {
    return { type: "SwitchCase", test, consequent };
  },
  whileStmt(test, body) {
    return { type: "WhileStatement", test, body };
  },
  doWhileStmt(test, body) {
    return { type: "DoWhileStatement", test, body };
  },
  forStmt(init9, test, update, body) {
    return { type: "ForStatement", init: init9, test, update, body };
  },
  forInStmt(left, right, body) {
    return { type: "ForInStatement", left, right, body };
  },
  forOfStmt(left, right, body) {
    return { type: "ForOfStatement", left, right, body };
  },
  breakStmt(label = null) {
    return { type: "BreakStatement", label };
  },
  continueStmt(label = null) {
    return { type: "ContinueStatement", label };
  },
  returnStmt(argument) {
    return { type: "ReturnStatement", argument };
  },
  yieldExpr(argument, delegate = false) {
    return { type: "YieldExpression", argument, delegate };
  },
  awaitExpr(argument) {
    return { type: "AwaitExpression", argument };
  },
  varDeclaration(kind, declarations) {
    return { type: "VariableDeclaration", kind, declarations };
  },
  varDeclarator(id, init9 = null) {
    return { type: "VariableDeclarator", id, init: init9 };
  },
  funcDeclaration(id, params, body, async = false, expression = false, generator = false) {
    return this.func("FunctionDeclaration", ...arguments);
  },
  sequenceExpr(expressions) {
    return { type: "SequenceExpression", expressions };
  },
  parensExpr(expression) {
    return { type: "ParenthesizedExpression", expression };
  },
  logicalExpr(operator, left, right) {
    return { type: "LogicalExpression", operator, left, right };
  },
  binaryExpr(operator, left, right) {
    return { type: "BinaryExpression", operator, left, right };
  },
  unaryExpr(operator, argument, prefix = true) {
    return { type: "UnaryExpression", operator, argument, prefix };
  },
  updateExpr(operator, argument, prefix = false) {
    return { type: "UpdateExpression", operator, argument, prefix };
  },
  assignmentExpr(left, right, operator = "=") {
    return { type: "AssignmentExpression", operator, left, right };
  },
  assignmentPattern(left, right) {
    return { type: "AssignmentPattern", left, right };
  },
  thisExpr() {
    return { type: "ThisExpression" };
  },
  conditionalExpr(test, consequent, alternate, type = "ConditionalExpression") {
    return { type, test, consequent, alternate };
  },
  arrayExpr(elements) {
    return { type: "ArrayExpression", elements };
  },
  arrayPattern(elements) {
    return { type: "ArrayPattern", elements };
  },
  objectExpr(properties) {
    return { type: "ObjectExpression", properties };
  },
  objectPattern(properties) {
    return { type: "ObjectPattern", properties };
  },
  chainExpr(expression) {
    return { type: "ChainExpression", expression };
  },
  callExpr(callee, args, optional = false) {
    return { type: "CallExpression", callee, arguments: args, optional };
  },
  newExpr(callee, args) {
    return { type: "NewExpression", callee, arguments: args };
  },
  taggedTemplateExpr(tag, quasi) {
    return { type: "TaggedTemplateExpression", tag, quasi };
  },
  memberExpr(object, property, computed = false, optional = false) {
    return { type: "MemberExpression", object, property, computed, optional };
  },
  funcExpr(id, params, body, async = false, expression = false, generator = false) {
    return this.func("FunctionExpression", ...arguments);
  },
  arrowFuncExpr(id, params, body, async = false, expression = false, generator = false) {
    return this.func("ArrowFunctionExpression", ...arguments);
  },
  func(type, id, params, body, async = false, expression = false, generator = false) {
    return { type, id, params, body, async, expression, generator };
  },
  identifier(name) {
    return { type: "Identifier", name };
  },
  property(key, value, kind = "init", shorthand = false, computed = false, method = false) {
    return { type: "Property", key, value, kind, shorthand, computed, method };
  },
  classDeclaration(id, body, superClass = null) {
    return this.class("ClassDeclaration", ...arguments);
  },
  classExpression(id, body, superClass = null) {
    return this.class("ClassExpression", ...arguments);
  },
  class(type, id, body, superClass = null) {
    return { type, id, body, superClass };
  },
  methodDefinition(key, value, kind = "method", $static = false, computed = false) {
    return { type: "MethodDefinition", key, value, kind, static: $static, computed };
  },
  propertyDefinition(key, value, $static = false, computed = false) {
    return { type: "PropertyDefinition", key, value, static: $static, computed };
  },
  spreadElement(argument) {
    return { type: "SpreadElement", argument };
  },
  literal(value) {
    if (typeof value === "object" && !("name" in value) && !("value" in value))
      throw new Error(`Objects that convert to literals must have a "name" or "value" property.`);
    return typeof value === "object" ? { type: "Literal", get value() {
      return "name" in value ? value.name : value.value;
    } } : { type: "Literal", value };
  },
  templateLiteral(quasis, expressions) {
    return { type: "TemplateLiteral", quasis, expressions };
  },
  comments(comments) {
    const valueObject = {};
    Object.defineProperty(valueObject, "toString", { value: () => comments });
    Object.defineProperty(valueObject, "trim", { value: function() {
      return this.toString();
    } });
    return [{ type: "Line", value: valueObject }];
  },
  withLoc(target, ...sources) {
    ["start", "end"].forEach((offset) => {
      const sourceNode = offset === "start" ? sources[0] : sources[sources.length - 1];
      target[offset] = sourceNode[offset];
      if (sourceNode.loc) {
        target.loc = target.loc || {};
        target.loc[offset] = sourceNode.loc?.[offset];
      }
    });
    return target;
  },
  invert(expr) {
    return this.unaryExpr("!", expr);
  },
  clone(expr) {
    expr = { ...expr };
    delete expr.start;
    delete expr.end;
    return expr;
  }
};

// node_modules/@webqit/use-live/src/runtime/hot-module-registry.js
var registry = /* @__PURE__ */ Object.create(null);

// node_modules/@webqit/use-live/src/runtime/EventTarget.js
var _EventTarget = class extends EventTarget {
  managedAlways = /* @__PURE__ */ new Set();
  managedOnce = /* @__PURE__ */ new Set();
  constructor() {
    super();
    env2.setMaxListeners?.(0, this);
  }
  fire(evenName) {
    return this.dispatchEvent(new Event(evenName, { cancelable: true }));
  }
  on(...args) {
    this.addEventListener(...args);
    return () => this.removeEventListener(...args);
  }
  abort(total = false) {
    this.managedAlways.forEach((x) => x.abort ? x.abort(total) : x(total));
    this.managedOnce.forEach((x) => x.abort ? x.abort(total) : x(total));
    this.managedOnce.clear();
    this.fire("abort");
  }
  manage(x) {
    this.managedAlways.add(x);
  }
  once(x) {
    this.managedOnce.add(x);
  }
};

// node_modules/@webqit/use-live/src/runtime/Signal.js
var Signal = class extends _EventTarget {
  subscribers = /* @__PURE__ */ new Set();
  signals = /* @__PURE__ */ new Map();
  constructor(context, type, state) {
    super();
    this.context = context;
    this.context?.once(() => this.abort());
    this.once(() => this.watchMode(false));
    this.type = type;
    this.state = state;
  }
  get name() {
    return [...this.context?.signals.keys() || []].find((k) => this.context.signals.get(k) === this);
  }
  signal(name, type = "prop") {
    let signal = this.signals.get(name);
    if (!signal) {
      signal = new Signal(this, type, type === "object" ? name : _isTypeObject(this.state) ? Observer.get(this.state, name) : void 0);
      this.signals.set(name, signal);
      if (this.signals.size === 1) {
        this.watchMode();
      }
      signal.once(() => {
        this.signals.delete(name);
        if (!this.signals.size) {
          this.watchMode(false);
        }
      });
    }
    return signal;
  }
  subscribe(autorun) {
    this.subscribers.add(autorun);
    autorun.once(() => {
      this.subscribers.delete(autorun);
      if (!this.subscribers.size) {
        this.abort();
      }
    });
  }
  watchMode(flag = true) {
    this.mutationsWatch?.abort();
    if (!flag || !this.signals.size || !_isTypeObject(this.state))
      return;
    this.mutationsWatch = Observer.observe(this.state, (mutations) => {
      const groupings = {
        map: /* @__PURE__ */ new Map(),
        add(autoruns, mutation, signal) {
          for (const autorun of autoruns) {
            if (autorun.runtime.thread.includes(autorun)) {
            }
            if (autorun.spec.beforeSchedule?.(mutation) === false)
              continue;
            if (!this.map.has(autorun.runtime)) {
              this.map.set(autorun.runtime, /* @__PURE__ */ new Set());
            }
            this.map.get(autorun.runtime).add(autorun);
          }
        }
      };
      for (const mutation of mutations) {
        const signal = this.signals.get(mutation.key);
        if (!signal)
          continue;
        groupings.add(signal.subscribers, mutation, signal);
        signal.refresh(mutation.value);
      }
      const runtimesMap = !groupings.map.size ? groupings.map : [...groupings.map].sort((a, b) => a[0].$serial > b[0].$serial ? 1 : -1);
      for (const [runtime, autoruns] of runtimesMap) {
        if (runtime.state === "aborted")
          continue;
        runtime.schedule(...autoruns);
      }
    }, { recursions: "force-sync" });
  }
  refresh(newState) {
    this.state = newState;
    for (const [name, signal] of this.signals) {
      signal.refresh(Observer.get(this.state ?? {}, name));
    }
    this.watchMode();
  }
};

// node_modules/@webqit/use-live/src/runtime/Scope.js
var Scope = class extends Signal {
  symbols = /* @__PURE__ */ new Map();
  constructor(context, type, state = void 0) {
    super(context, type, state || /* @__PURE__ */ Object.create(null));
  }
};

// node_modules/@webqit/use-live/src/runtime/Autorun.js
var Autorun = class extends _EventTarget {
  state;
  constructor(context, type, spec, serial, scope, closure) {
    super();
    context?.once(this);
    this.context = context;
    this.type = type;
    this.spec = spec || {};
    this.scope = scope;
    if (context?.scope !== scope) {
      this.manage(scope);
    }
    this.serial = serial;
    if (closure) {
      this.closure = closure;
    }
    if (context?.type === "iteration") {
      this.path = context.path.concat(this.spec.index);
    } else if (context?.type === "round") {
      this.path = context.path.concat(this.serial);
    } else {
      this.path = (context?.path || []).slice(0, -1).concat(this.serial);
    }
    this.flowControl = /* @__PURE__ */ new Map();
  }
  get runtime() {
    return this.context.runtime;
  }
  contains(node) {
    return this === node.context || node.context && this.contains(node.context);
  }
  order(node) {
    if (!node)
      return this;
    const [a, b] = node.path.length < this.path.length ? [node, this] : [this, node];
    return a.path.reduce((prev, key, i) => {
      return prev && key <= b.path[i];
    }, true) && a || b;
  }
  beforeExecute() {
    this.state = "running";
    const flowControlBefore = this.flowControl;
    this.flowControl = /* @__PURE__ */ new Map();
    return flowControlBefore;
  }
  execute(callback = null) {
    this.runtime.thread.unshift(this);
    return _await2(this.beforeExecute(), (stateBefore) => {
      return _call(this.closure, this, this, (returnValue, exception) => {
        if (exception)
          return this.throw(exception, [this.serial, this.context?.serial], exception.code);
        if (this.spec.complete) {
          returnValue = this.spec.complete(returnValue, this);
        }
        this.afterExecute(stateBefore);
        this.runtime.thread.shift();
        return callback ? callback(returnValue, this) : returnValue;
      });
    });
  }
  throw(e, serials, errorCode) {
    if (this.type === "function" && ["HandlerFunction", "FinalizerFunction"].includes(this.$params.executionMode)) {
      return this.$params.lexicalContext.throw(e, serials, errorCode);
    } else if (this.spec.handler)
      return this.spec.handler(e);
    else if (this.type !== "function" && this.context)
      return this.context.throw(e, serials, errorCode);
    if (e.cause)
      throw e;
    const message = `${e.message || e}`;
    const $message = errorCode !== null ? `[${errorCode}]: ${message}` : message;
    const cause = serials.map((serial) => serial !== -1 && this.extractSource(serial, true)).filter((x) => x);
    cause.push({ source: this.runtime.$params.originalSource });
    const ErrorClass = globalThis[e.name];
    const error = new (ErrorClass || Error)($message, { cause });
    const fileName = this.runtime.$params.sourceType === "module" && this.$params.experimentalFeatures !== false && this.$params.exportNamespace || this.$params.fileName;
    if (fileName) {
      error.fileName = fileName;
    }
    if (errorCode) {
      error.code = errorCode;
    }
    throw error;
  }
  afterExecute(flowControlBefore) {
    this.state = "complete";
    const flowControlAfter = this.flowControl;
    if (this.spec.finalizer)
      this.spec.finalizer();
    this.handleDownstream(flowControlAfter.size, flowControlBefore.size);
    this.handleRightstream(flowControlAfter.size, flowControlBefore.size);
    for (const cmd of ["break", "continue", "return"]) {
      if (flowControlAfter.has(cmd) && !flowControlAfter.get(cmd).endpoint) {
        this.hoistFlowControl(cmd, flowControlAfter.get(cmd).arg);
      } else if (flowControlBefore.has(cmd) && !flowControlBefore.get(cmd).endpoint) {
        this.hoistFlowControl(cmd, flowControlBefore.get(cmd).arg, true);
      }
    }
  }
  typed(as, value, name = void 0) {
    const valueType = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
    if (valueType === as || as === "iterable" && value?.[Symbol.iterator] || as === "desctructurable" && !["undefined", "null"].includes(valueType))
      return value;
    if (as === "iterable") {
      throw new Error(`value is not iterable.`);
    }
    if (as === "desctructurable") {
      throw new Error((name ? `Cannot access ${name}; ` : "") + `object not desctructurable.`);
    }
    throw new Error(`value must be of type ${as}.`);
  }
  let(name, serial, closure, spec = {}) {
    return this.var(name, serial, closure, { ...spec, kind: "let" });
  }
  const(name, serial, closure, spec = {}) {
    return this.var(name, serial, closure, { ...spec, kind: "const" });
  }
  var(name, serial, closure, spec = {}) {
    spec = { kind: "var", ...spec };
    if (!closure)
      closure = () => void 0;
    const $closure = !spec.restOf ? closure : (...args) => {
      try {
        return closure(...args);
      } catch (e) {
        throw new Error(`Cannot declare ${name}; ${e.message}`);
      }
    };
    const complete = (returnValue, autorun) => {
      let scope = autorun.scope;
      if (spec.kind === "var") {
        while (!["module", "function"].includes(scope.type) && !Observer.has(scope.state, name) && scope.context) {
          scope = scope.context;
        }
      } else if (scope.type === "this" && scope.context) {
        scope = scope.context;
      }
      let symbolState = scope.symbols.get(name);
      if (symbolState && (symbolState.kind !== spec.kind || spec.kind === "let" && symbolState.serial !== serial)) {
        throw new Error(`Identifier "${name}" has already been declared.`);
      }
      symbolState?.reader?.abort();
      symbolState = { serial, kind: spec.kind };
      let assignedValue = returnValue;
      if (spec.restOf) {
        if (spec.type === "array") {
          assignedValue = [];
        } else {
          assignedValue = {};
        }
        symbolState.reader = Observer.map(returnValue, assignedValue, { except: spec.restOf, spread: spec.type === "array" });
        autorun.once(symbolState.reader);
      }
      scope.symbols.set(name, symbolState);
      Observer.set(scope.state, name, assignedValue);
      return assignedValue;
    };
    return this.autorun(spec.kind, { complete, ...spec }, serial, $closure);
  }
  update(name, closure, spec = {}) {
    let lexicalScope = this.scope;
    while (lexicalScope && !Observer.has(lexicalScope.state, name)) {
      lexicalScope = lexicalScope.context;
    }
    if (!lexicalScope) {
      throw new ReferenceError(`${name} is not defined.`);
    }
    let symbolState = lexicalScope.symbols.get(name);
    if (symbolState?.kind === "const") {
      throw new ReferenceError(`Assignment to constant variable "${name}".`);
    }
    const valueBefore = Observer.get(lexicalScope.state, name);
    const $closure = !spec.restOf ? closure : (...args) => {
      try {
        return closure(...args);
      } catch (e) {
        throw new Error(`Cannot update ${name}; ${e.message}`);
      }
    };
    return _call($closure, void 0, valueBefore, (returnValue, exception) => {
      if (exception)
        return this.throw(exception, [this.serial]);
      symbolState?.reader?.abort();
      let assignedValue = returnValue;
      if (spec.restOf) {
        symbolState = symbolState || {};
        if (spec.type === "array") {
          assignedValue = [];
        } else {
          assignedValue = {};
        }
        symbolState.reader = Observer.map(returnValue, assignedValue, { except: spec.restOf, spread: spec.type === "array" });
        this.once(symbolState.reader);
      }
      const isStatic = this.spec.static || this.type === "function" && this.$params?.executionMode === "RegularFunction";
      Observer.set(lexicalScope.state, name, assignedValue);
      return ["postinc", "postdec"].includes(spec.kind) ? valueBefore : assignedValue;
    });
  }
  ref(name, ...rest) {
    let depth = 0, hint = {};
    if (typeof rest[0] === "number") {
      depth = rest.shift();
      hint = rest.shift() || {};
    } else if (typeof rest[0] === "object") {
      hint = rest.shift();
    }
    let lexicalScope = this.scope;
    while (lexicalScope && !Observer.has(lexicalScope.state, name)) {
      lexicalScope = lexicalScope.context;
    }
    if (!lexicalScope) {
      if (hint.isTypeCheck)
        return;
      throw new Error(`${name} is not defined.`);
    }
    const kind = lexicalScope.symbols.get(name)?.kind;
    const baseSignal = lexicalScope.signal(name, kind);
    if (hint.typed) {
      this.typed(hint.typed, baseSignal.state, name);
    }
    return this.autobind(baseSignal, depth, hint);
  }
  obj(val, ...rest) {
    let depth = 0, hint = {};
    if (typeof rest[0] === "number") {
      depth = rest.shift();
      hint = rest.shift() || {};
    } else if (typeof rest[0] === "object") {
      hint = rest.shift();
    }
    return this.autobind(this.runtime.$objects.signal(val, "object"), depth, hint);
  }
  autobind(baseSignal, depth, hint) {
    const liveMode = ["LiveProgram", "LiveFunction"].includes(this.runtime.$params.executionMode);
    const isConst = baseSignal.type === "const";
    const isRuntime = this === this.runtime;
    const isAborted = this.state === "aborted";
    const isStatic = this.spec.static;
    const isWrite = this.spec.isWrite;
    const nowRunning = this;
    return function proxy2(signal, params = {}, depth2) {
      if (liveMode && !isStatic && !isWrite && !hint?.isLeft && !isConst && !isRuntime && !isAborted) {
        signal.subscribe(nowRunning);
      }
      if (!depth2 || !signal.state || typeof signal.state !== "object") {
        let returnValue = signal.state;
        if (typeof signal.state === "function" && !/^class\s?/.test(Function.prototype.toString.call(signal.state))) {
          returnValue = Observer.proxy(signal.state, { ...params, membrane: signal });
        }
        return returnValue;
      }
      let propertyAlreadyBound;
      return Observer.proxy(signal.state, params, (traps) => ({
        ...traps,
        get(target, name, receiver = null) {
          if (propertyAlreadyBound) {
            return traps.get(target, name, receiver);
          }
          propertyAlreadyBound = true;
          let $params = { ...params };
          if (Array.isArray(target)) {
            $params.arrayMethodName = name;
          }
          return proxy2(signal.signal(name), $params, depth2 - 1);
        }
      }));
    }(baseSignal, {}, depth);
  }
  autorun(type, ...rest) {
    let closure = rest.pop();
    const serial = rest.pop();
    const spec = rest.pop() || {};
    let AutorunClass = Autorun, scope = this.scope;
    if (type === "iteration") {
      const staticDefs = this.runtime.constructor;
      AutorunClass = closure.constructor.name === "AsyncFunction" ? staticDefs.AutoAsyncIterator : staticDefs.AutoIterator;
    }
    if (["block", "switch", "iteration"].includes(type)) {
      scope = new Scope(scope, type);
    }
    const autorun = new AutorunClass(this, type, spec, serial, scope, closure);
    if (type === "downstream") {
      this.downstream = autorun;
      if (this.flowControlApplied())
        return;
    } else if (this.type === "switch" && this.breakpoint) {
      return;
    }
    return autorun.execute();
  }
  function(executionMode, functionKind, serial, $qFunction) {
    if (functionKind === "Declaration") {
      const declarationScope = this.scope.type === "this" ? this.scope.context : this.scope;
      Observer.set(declarationScope.state, $qFunction.name, $qFunction);
    }
    const _this = this;
    Object.defineProperty($qFunction, "toString", { value: function($qSource = false) {
      if ($qSource && executionMode === "LiveFunction")
        return Function.prototype.toString.call($qFunction);
      const originalSource = _this.runtime.extractSource(serial);
      return originalSource.startsWith("static ") ? originalSource.replace("static ", "") : originalSource;
    } });
    return $qFunction;
  }
  class(classKind, $class, methodsSpec) {
    if (classKind === "Declaration") {
      const declarationScope = this.scope.type === "this" ? this.scope.context : this.scope;
      Observer.set(this.scope.state, $class.name, $class);
    }
    methodsSpec.forEach(({ name, isLiveFunction, static: isStatic, serial }) => {
      this.function(isLiveFunction && "LiveFunction" || "RegularFunction", "Expression", serial, isStatic ? $class[name] : $class.prototype[name]);
    });
    return $class;
  }
  async import(...args) {
    return this.runtime.import(...args);
  }
  async export(...args) {
    return this.runtime.export(...args);
  }
  continue(label) {
    return this.applyFlowControl("continue", label);
  }
  break(label) {
    return this.applyFlowControl("break", label);
  }
  return(arg) {
    return this.applyFlowControl("return", arg);
  }
  applyFlowControl(cmd, arg, unset = false) {
    const sizeBefore = this.flowControl.size;
    if (unset) {
      this.flowControl.delete(cmd);
    } else {
      this.flowControl.set(cmd, { arg });
    }
    if (this.type === "round") {
      this.context.breakpoint = this;
    }
    if (this.type === "round" && ["break", "continue"].includes(cmd) && arg === this.context?.spec.label) {
      if (!unset) {
        this.flowControl.get(cmd).endpoint = true;
      }
      if (this.state !== "running") {
        this.handleRightstream(this.flowControl.size, sizeBefore);
      }
      return;
    }
    if (this.context?.type === "switch" && cmd === "break" && !arg) {
      if (!unset) {
        this.flowControl.get(cmd).endpoint = true;
      }
      this.context.breakpoint = this;
      return;
    }
    if (this.state !== "running") {
      this.handleDownstream(this.flowControl.size, sizeBefore);
      this.hoistFlowControl(...arguments);
    }
  }
  hoistFlowControl(...args) {
    return this.context?.applyFlowControl(...args);
  }
  flowControlApplied(cmd, arg) {
    if (!arguments.length)
      return this.flowControl.size || false;
    if (arguments.length === 1)
      return this.flowControl.has(cmd);
    return this.flowControl.get(cmd)?.arg === arg;
  }
  handleDownstream(sizeAfter, sizeBefore) {
    let downstream;
    if (!["block"].includes(this.type) || !(downstream = this.context?.downstream))
      return;
    if (sizeAfter) {
      downstream.abort();
    } else if (sizeBefore) {
      downstream.state = "resuming";
      this.runtime.schedule(downstream);
    }
  }
  handleRightstream(sizeAfter, sizeBefore) {
    if (this.type !== "round")
      return;
    let nextRound = this, returnees = /* @__PURE__ */ new Set();
    while (nextRound = nextRound.nextRound) {
      if (sizeAfter) {
        nextRound.abort();
      } else if (sizeBefore && nextRound.state !== "inert") {
        nextRound.state = "resuming";
        returnees.add(nextRound);
      }
    }
    if (returnees.size) {
      this.runtime.schedule(...returnees);
    }
    if (!sizeAfter && sizeBefore) {
      this.runtime.on("reflection", () => {
        if (this.context.iterating)
          return;
        this.context.iterate();
      }, { once: true });
    }
  }
  abort(total = false) {
    if (total) {
      if (this.context?.breakpoint === this) {
        delete this.context.breakpoint;
      }
      this.flowControl.clear();
    }
    this.state = total ? "inert" : "aborted";
    return super.abort(total);
  }
};

// node_modules/@webqit/use-live/src/runtime/AutoIterator.js
var AutoIterator = class extends Autorun {
  rounds = /* @__PURE__ */ new Map();
  constructor(context, type, spec, serial, scope, closure) {
    spec.$closure = closure;
    super(context, type, spec, serial, scope);
    this.manage(() => {
      delete this.breakpoint;
      this.rounds.clear();
    });
  }
  pseudorun(callback) {
    this.runtime.iThread.unshift(this);
    return _await2(callback(), (returnValue) => {
      this.runtime.iThread.pop();
      return returnValue;
    });
  }
  createIterator() {
    if (this.spec.kind === "for-in")
      return function* () {
        for (let key in this.iteratee)
          yield key;
      }.call(this);
    if (this.spec.kind === "for-of")
      return function* () {
        for (let val of this.iteratee)
          yield val;
      }.call(this);
    return { next: () => ({ done: !this.pseudorun(() => this.spec.test(this)) }) };
  }
  closure() {
    if (["for-of", "for-in"].includes(this.spec.kind)) {
      [this.production, this.iteratee] = this.spec.parameters(this);
      this.iterator = this.createIterator();
      this.iterator.original = true;
      this.watchMode();
    } else {
      if (this.spec.kind === "for") {
        this.spec.init(this);
      }
      this.iterator = this.createIterator();
    }
    this.iterate();
  }
  terminated() {
    return this.breakpoint && !this.breakpoint.flowControlApplied("continue", this.spec.label) && this.breakpoint.flowControlApplied();
  }
  advance() {
    if (this.spec.kind === "for") {
      this.pseudorun(() => this.spec.advance(this));
    }
  }
  iterate() {
    this.iterating = true;
    const $test = () => !this.terminated() && !(this.cursor = this.iterator.next()).done;
    const $round = () => {
      const round = this.createRound(this.cursor.value);
      round.execute();
      this.advance();
    };
    if (this.spec.kind === "do-while") {
      do
        $round();
      while ($test());
    } else {
      while ($test())
        $round();
    }
    this.iterating = false;
  }
  createRound(production) {
    const index = this.rounds.size, spec = { index };
    const state = ["for-in", "for-of"].includes(this.spec.kind) ? { [this.production]: production } : { ...this.scope.state };
    const scope = new Scope(this.scope, "round", state);
    this.scope.symbols.forEach((meta2, name) => {
      scope.symbols.set(name, meta2);
    });
    const round = new Autorun(this, "round", spec, this.serial, scope, this.spec.$closure);
    const key = this.spec.kind === "for-in" ? production : index;
    this.rounds.set(key, round);
    if (this.lastRound) {
      this.lastRound.nextRound = round;
      round.prevRound = this.lastRound;
    }
    this.lastRound = round;
    return round;
  }
  watchMode() {
    if (this.spec.static)
      return;
    const handleMutations = (mutations, currentCursor) => {
      const deletions = /* @__PURE__ */ new Set(), extension = /* @__PURE__ */ new Set();
      for (const mutation of mutations) {
        if (Array.isArray(this.iteratee) && mutation.key === "length")
          continue;
        const production = this.spec.kind === "for-in" ? mutation.key : mutation.value;
        const key = this.spec.kind === "for-in" ? mutation.key : parseInt(mutation.key);
        const existingRound = this.rounds.get(key);
        if (existingRound) {
          Observer.set(existingRound.scope.state, this.production, production);
          if (mutation.type === "delete") {
            this.rounds.set(key, void 0);
            if (existingRound.prevRound) {
              existingRound.prevRound.nextRound = existingRound.nextRound;
            }
            if (existingRound.nextRound) {
              existingRound.nextRound.prevRound = existingRound.prevRound;
            }
            deletions.add(existingRound);
          }
        } else if (mutation.type !== "delete" && !mutation.isUpdate) {
          if (this.spec.kind === "for-of" && this.iterator.original && !currentCursor.done)
            continue;
          extension.add(production);
        }
      }
      this.runtime.on("reflection", () => {
        deletions.forEach((deletion) => deletion.abort(true));
      }, { once: true });
      if (extension.size) {
        this.iterator = function* (parent) {
          yield* parent;
          yield* extension;
        }(this.iterator);
        if (currentCursor.done) {
          this.iterate();
        }
      }
    };
    this.once(Observer.observe(this.iteratee, (mutations) => {
      _await2(this.cursor, (currentCursor) => handleMutations(mutations, currentCursor));
    }));
  }
};

// node_modules/@webqit/use-live/src/runtime/AutoAsyncIterator.js
var AutoAsyncIterator = class extends AutoIterator {
  async createIterator() {
    if (this.spec.kind === "for-in")
      return function* () {
        for (let key in this.iteratee)
          yield key;
      }.call(this);
    if (this.spec.kind === "for-of")
      return function* () {
        for (let val of this.iteratee)
          yield val;
      }.call(this);
    return { next: async () => ({ done: !await this.pseudorun(() => this.spec.test(this)) }) };
  }
  async closure() {
    if (["for-of", "for-in"].includes(this.spec.kind)) {
      [this.production, this.iteratee] = await this.spec.parameters(this);
      this.iterator = await this.createIterator();
      this.iterator.original = true;
      this.watchMode();
    } else {
      if (this.spec.kind === "for") {
        await this.spec.init(this);
      }
      this.iterator = await this.createIterator();
    }
    await this.iterate();
  }
  async iterate() {
    let cursor;
    this.iterating = true;
    const $test = async () => !this.terminated() && (this.cursor = this.iterator.next()) && (cursor = await this.cursor) && !cursor.done;
    const $round = async () => {
      const round = this.createRound(cursor.value);
      await round.execute();
      await this.advance();
    };
    if (this.spec.kind === "do-while") {
      do
        await $round();
      while (await $test());
    } else {
      while (await $test())
        await $round();
    }
    this.iterating = false;
  }
};

// node_modules/@webqit/use-live/src/runtime/Runtime.js
var Runtime = class extends Autorun {
  locations = [];
  queue = /* @__PURE__ */ new Set();
  thread = [];
  iThread = [];
  constructor(context, type, params, scope, closure) {
    const { $serial = 0, spec, ...$params } = params;
    super(context, type, spec, -1, scope, closure);
    this.$serial = $serial;
    this.$params = $params;
    this.$objects = new Scope(void 0, "objects");
    this.manage(this.$objects);
    this.exports = /* @__PURE__ */ Object.create(null);
    this.$promises = { imports: [], exports: [] };
    this.manage(() => {
      Observer.deleteProperties(this.exports, Object.keys(this.exports));
      this.$promises.imports.splice(0);
      this.$promises.exports.splice(0);
    });
  }
  extractSource(serial, full = false) {
    const [[locStart, line, column], [locEnd]] = this.locations[serial];
    const expr = this.$params.originalSource.slice(locStart, locEnd);
    return full ? { expr, line, column } : expr;
  }
  get runtime() {
    return this;
  }
  get nowRunning() {
    return this.thread[0];
  }
  schedule(...autoruns) {
    const isActive = this.queue.size;
    for (const autorun of autoruns) {
      this.queue.add(autorun);
    }
    if (isActive)
      return;
    this.flowControlDirty = false;
    return function nextTick(prevReturn, current) {
      let following;
      for (const autorun of this.queue) {
        if (current && current.order(autorun) !== current || ["aborted", "running"].includes(autorun.state) || this.iThread[0]?.contains(autorun)) {
          this.queue.delete(autorun);
          continue;
        }
        following = following ? following.order(autorun) : autorun;
        if (!current) {
          current = following;
        }
      }
      if (!following) {
        this.fire("reflection");
        if (this.flowControlApplied()) {
          this.fire("statechange");
        }
        return prevReturn;
      }
      following.abort();
      return following.execute((returnValue) => {
        this.queue.delete(following);
        return nextTick.call(this, returnValue, following);
      });
    }.call(this, void 0, this.nowRunning);
  }
  execute(callback = null) {
    return super.execute((returnValue) => {
      const liveMode = ["LiveProgram", "LiveFunction"].includes(this.$params.executionMode);
      const isScript = this.$params.sourceType === "module" || this.$params.sourceType === "script";
      const actualReturnValue = liveMode || this.$params.executionMode === "RegularProgram" && isScript ? new LiveProgramHandle(this) : this.flowControl.get("return")?.arg;
      return callback ? callback(actualReturnValue, this) : actualReturnValue;
    });
  }
  spawn(executionMode, thisContext, closure, lexicalContext = null) {
    const context = this.nowRunning || lexicalContext || this;
    const params = { ...this.$params, $serial: this.$serial + 1, executionMode, lexicalContext };
    const scope = new Scope(context.scope, "function", thisContext ? { ["this"]: thisContext } : {});
    const subRuntime = new this.constructor(context, "function", params, scope, closure);
    return subRuntime.execute();
  }
  async import(...args) {
    const source = args.pop();
    const $source = typeof source === "string" ? { source } : source;
    const onload = (modules) => {
      if ($source.forExport || $source.isDynamic)
        return modules;
      this.assignModules(args, this.scope.state, modules, source.serial);
    };
    if (this.$params.experimentalFeatures !== false && registry[$source.source]) {
      return onload(registry[$source.source]);
    }
    const promise = (async () => {
      const moduleName = this.$params.sourceType === "module" && this.$params.experimentalFeatures !== false && this.$params.exportNamespace || this.$params.fileName;
      try {
        return onload({ ...await import($source.source) });
      } catch (e) {
        if (e.code === "ERR_MODULE_NOT_FOUND") {
          this.throw(new Error(`Cannot find module "${$source.source}"${moduleName ? ` imported at "${moduleName}"` : ""}.`), [$source.serial], e.code);
        } else
          this.throw(e, [$source.serial], e.code);
      }
    })();
    if (!$source.isDynamic) {
      this.$promises[$source.forExport ? "exports" : "imports"].push(promise);
    }
    return promise;
  }
  async export(...args) {
    const source = !Array.isArray(args[args.length - 1]) ? args.pop() : null;
    const modules = source ? await this.import({ ...source, forExport: true }) : this.scope.type === "this" ? this.scope.context.state : this.scope.state;
    this.assignModules(args, this.exports, modules, source?.serial);
  }
  assignModules(specifiers, target, source, sourceSerial = null) {
    const observeList = [];
    const liveMode = ["LiveProgram", "LiveFunction"].includes(this.$params.executionMode);
    for (const [local, serial, alias, literal] of specifiers) {
      if (local === null) {
        (liveMode ? Observer : Reflect).set(target, alias, literal);
        continue;
      }
      if (local === "*" && alias) {
        (liveMode ? Observer : Reflect).set(target, alias, source);
        continue;
      }
      if (!Observer.has(source, local)) {
        this.throw(new Error(`The requested module does not provide an export named "${local}".`), [serial, sourceSerial]);
      }
      (liveMode ? Observer : Reflect).set(target, alias || local, Observer.get(source, local));
      observeList.push([local, serial, alias]);
    }
    if (!observeList.length || !liveMode)
      return;
    this.once(Observer.observe(source, (mutations) => {
      for (const [local, , alias] of observeList) {
        for (const mutation of mutations) {
          if (local === "*") {
            Observer.set(target, mutation.key, mutation.value);
          } else if (mutation.key === local) {
            Observer.set(target, alias || local, mutation.value);
          }
        }
      }
    }));
  }
  afterExecute(...args) {
    if (this.$params.sourceType === "module" && this.$params.experimentalFeatures !== false && this.$params.exportNamespace) {
      registry[this.$params.exportNamespace] = this.exports;
      this.once(() => {
        delete registry[this.$params.exportNamespace];
      });
    }
    return super.afterExecute(...args);
  }
};
__publicField(Runtime, "AutoAsyncIterator", AutoAsyncIterator);
__publicField(Runtime, "AutoIterator", AutoIterator);

// node_modules/@webqit/use-live/src/runtime/index.js
function compile(sourceType, astTools, source, functionParams = [], params = {}) {
  if (typeof functionParams === "object" && functionParams && !Array.isArray(functionParams)) {
    params = functionParams;
    functionParams = [];
  }
  const { liveMode = true, thisContext, env: env4, exportNamespace, fileName, base64, compileFunction, forDynamicBinding = false, ...$params } = params;
  const { parserParams: parserParams2, transformerParams: transformerParams2, runtimeParams: runtimeParams2 } = resolveParams($params);
  const isModule = /module/.test(sourceType);
  const isScript = /script/.test(sourceType);
  const isFunction = /function/.test(sourceType);
  const isAsync = /async/.test(sourceType) || /module/.test(sourceType);
  const isSource = /source/.test(sourceType);
  const isFile = /file/.test(sourceType);
  const sourceIsProgram = typeof source === "object" && source?.type === "Program";
  if (!sourceIsProgram) {
    source = source + "";
  }
  const originalProgram = source;
  if (isModule) {
    parserParams2.sourceType = "module";
    parserParams2.allowAwaitOutsideFunction = true;
    parserParams2.executionMode = liveMode ? "LiveProgram" : "RegularProgram";
  } else if (isScript) {
    parserParams2.executionMode = liveMode ? "LiveProgram" : "RegularProgram";
  } else if (isFunction) {
    if (isSource) {
      if (sourceIsProgram) {
        source = Node_default.funcExpr(null, functionParams.map((param) => Node_default.identifier(param)), Node_default.blockStmt(liveMode ? [Node_default.literal("use live"), ...source.body] : source.body), isAsync);
        source.isLiveFunction = originalProgram.isLiveProgram;
      } else {
        const body = `  ` + source.split(`
`).join(`
  `);
        source = `${isAsync ? "async function" : "function"}(${functionParams.join(", ")}) {
${liveMode ? '  "use live";\n' : ""}${body}
}`;
      }
    } else if (sourceIsProgram) {
      source = source.body[0];
    }
    if (sourceIsProgram) {
      source = {
        type: "Program",
        body: [Node_default.returnStmt(source)],
        start: originalProgram.start,
        end: originalProgram.end,
        hasLiveFunctions: originalProgram.hasLiveFunctions,
        originalSource: originalProgram.originalSource
      };
    } else {
      source = `return ${source}`;
    }
    parserParams2.executionMode = "RegularProgram";
  } else {
    throw new Error(`Unrecognized sourceType specified: "${sourceType}".`);
  }
  const $sourceType = isModule ? "module" : isScript ? "script" : "function";
  const $base64 = isModule && isFile && base64 && `export default async function(%0) {%1}`;
  transformerParams2.sourceType = $sourceType;
  transformerParams2.base64 = $base64;
  runtimeParams2.sourceType = $sourceType;
  runtimeParams2.fileName = fileName;
  if (isModule) {
    runtimeParams2.exportNamespace = exportNamespace;
  }
  const transformResult = astTools.transform(source, { ...parserParams2, ...transformerParams2, astResult: sourceIsProgram });
  function finalBootstrapSource(bootstrapSource, forceStringify = false) {
    const result = bootstrapSource.join("\n");
    if (sourceIsProgram) {
      return _await2(astTools.parse(result, parserParams2), (result2) => {
        const insertionPoint = result2.body.find((m) => {
          return m.type === `ExpressionStatement` && m.expression?.type === "AssignmentExpression" && m.expression.left.type === "MemberExpression" && m.expression.left.object.type === "Identifier" && m.expression.left.property.type === "Identifier" && m.expression.left.property.name === "main" && m.expression.right.type === "FunctionExpression";
        }).expression.right.body;
        insertionPoint.body.push(...transformResult.transformedSource.body);
        return forceStringify ? _await2(result2, (result3) => astTools.serialize(result3)) : result2;
      });
    }
    return result;
  }
  return _await2(transformResult, (transformResult2) => {
    if (!transformResult2)
      return;
    const bootstrapSource = [];
    const $q2 = transformResult2.identifier2;
    let $$cx;
    if (isFile && importDir) {
      bootstrapSource.push(`const { Scope, Runtime } = await import('${importDir}/index.js');`);
      bootstrapSource.push(`const ${$q2} = { Scope, Runtime, params: { ...(${JSON.stringify(runtimeParams2)}), executionMode: '${transformResult2.isLiveProgram && "LiveProgram" || "RegularProgram"}', originalSource: \`${transformResult2.originalSource.replace(/`/g, "\\`")}\`, }, };`);
    } else {
      const $$$cx = {
        Scope,
        Runtime,
        params: { ...runtimeParams2, originalSource: transformResult2.originalSource, executionMode: transformResult2.isLiveProgram && "LiveProgram" || "RegularProgram" },
        thisContext,
        env: env4
      };
      if (isFile) {
        if (!globalThis.webqit)
          globalThis.webqit = {};
        if (!globalThis.webqit.UseLive)
          globalThis.webqit.UseLive = {};
        if (!globalThis.webqit.UseLive.Script)
          globalThis.webqit.UseLive.Script = $$$cx;
        bootstrapSource.push(`const ${$q2} = globalThis.webqit.UseLive.Script;`);
      } else {
        $$cx = $$$cx;
      }
    }
    bootstrapSource.push(`${$q2}.main = ${isModule ? "async " : ""}function(${transformResult2.identifier}) {${sourceIsProgram ? "" : `
  ${transformResult2.transformedSource.replace(/\n/g, "\n  ")}
`}};`);
    let contextType = "global";
    bootstrapSource.push(`${$q2}.scope = new ${$q2}.Scope(undefined, '${contextType}', globalThis);`);
    if (isScript || $$cx?.env || $$cx && forDynamicBinding) {
      contextType = "env";
      bootstrapSource.push(`${$q2}.scope = new ${$q2}.Scope(${$q2}.scope, '${contextType}', ${$q2}.env);`);
    }
    if (isModule) {
      contextType = "module";
      bootstrapSource.push(`${$q2}.scope = new ${$q2}.Scope(${$q2}.scope, '${contextType}');`);
    }
    if (typeof $$cx?.thisContext !== "undefined" || $$cx && forDynamicBinding) {
      bootstrapSource.push(`${$q2}.scope = new ${$q2}.Scope(${$q2}.scope, 'this', { ['this']: ${$q2}.thisContext });`);
    }
    bootstrapSource.push(`${$q2}.runtime = new ${$q2}.Runtime(undefined, '${contextType}', ${$q2}.params, ${$q2}.scope, ${$q2}.main);`);
    if (isModule && isFile) {
      bootstrapSource.push(`${$q2}.result = await ${$q2}.runtime.execute();`);
      const [_default, exports] = transformResult2.exportIds.reduce(([, acc], id) => {
        if (id === "default")
          return [id, acc];
        return [, acc.concat(id)];
      }, [null, []]);
      if (exports.length)
        bootstrapSource.push(`export const { ${exports.join(", ")} } = ${$q2}.result.exports;`);
      if (_default)
        bootstrapSource.push(`export default ${$q2}.result.exports.default;`);
      return finalBootstrapSource(bootstrapSource);
    }
    if (isFile) {
      bootstrapSource.push(`${$q2}.result = ${$q2}.runtime.execute();`);
      if (isFunction) {
        bootstrapSource.push(`return ${$q2}.result;`);
      }
      return finalBootstrapSource(bootstrapSource);
    }
    bootstrapSource.push(isFunction ? `return ${$q2}.runtime.execute();` : `return ${$q2}.runtime;`);
    const result = finalBootstrapSource(bootstrapSource, true);
    const fn = compileFunction || Function;
    return _await2(result, (result2) => forDynamicBinding ? [fn($q2, result2), $$cx] : fn($q2, result2)($$cx));
  });
}
var importDir;
try {
  importDir = eval("import.meta.url");
} catch (e) {
}
function fileURLToDirname(url) {
  const path2 = fileURLToPath(url);
  return dirname(path2);
}
function fileURLToPath(url) {
  if (typeof url !== "string")
    throw new TypeError("URL must be a string");
  if (!url.startsWith("file://"))
    return url;
  let path2 = url.slice("file://".length);
  path2 = path2.replace(/^\/([A-Za-z]:)/, "$1");
  path2 = decodeURIComponent(path2);
  return path2;
}
function dirname(path2) {
  if (typeof path2 !== "string")
    throw new TypeError("path must be a string");
  const slash = path2.includes("\\") ? "\\" : "/";
  const idx = path2.lastIndexOf(slash);
  if (idx === -1)
    return path2;
  if (idx === 0)
    return slash;
  return path2.slice(0, idx);
}

// node_modules/@webqit/use-live/src/AbstractLiveScript.js
var AbstractLiveScript = class {
  constructor(...args) {
    const $static = this.constructor;
    const params = typeof args[args.length - 1] === "object" ? args.pop() : {};
    this.source = args.pop() || "";
    this.$program = compile($static.sourceType, $static.astTools, this.source, { ...params, forDynamicBinding: true });
  }
  execute() {
    return _await2(this.$program, ([precompiled, $$cx]) => _await2(precompiled($$cx), (runtime) => runtime.execute()));
  }
  bind(thisContext, env4 = void 0) {
    return _await2(this.$program, ([precompiled, $$cx]) => precompiled({ ...$$cx, thisContext, env: env4 }));
  }
  toString($qSource = false) {
    if (!$qSource)
      return this.source;
    return _await2(this.$program, ([precompiled]) => precompiled + "");
  }
};

// node_modules/@webqit/use-live/src/index.lite.js
var LiveFunction;
function AsyncLiveFunction(...$args) {
  const { source, args, params } = _$functionArgs($args);
  const transformedFunction = compile2("async-function-source", source, args, params);
  if (!(transformedFunction instanceof Promise))
    return transformedFunction;
  const wrapperFunction = async function(...args2) {
    return (await transformedFunction).call(this, ...args2);
  };
  Object.defineProperty(wrapperFunction, "toString", { value: async function(...args2) {
    return (await transformedFunction).toString(...args2);
  } });
  return wrapperFunction;
}
var LiveScript;
var AsyncLiveScript = class extends AbstractLiveScript {
};
__publicField(AsyncLiveScript, "sourceType", "async-script-source");
__publicField(AsyncLiveScript, "astTools", { parse, transform, serialize });
var LiveModule = class extends AbstractLiveScript {
};
__publicField(LiveModule, "sourceType", "module");
__publicField(LiveModule, "astTools", { parse, transform, serialize });
function compile2(sourceType, source, ...params) {
  return compile(sourceType, { parse, transform, serialize }, source, ...params);
}
function parse(input, params) {
  return exec2("parse", input, params);
}
function transform(input, params) {
  return exec2("transform", input, params);
}
function serialize(input, params) {
  return exec2("serialize", input, params);
}
function exec2(action, input, params) {
  const patchToString = (result) => {
    Object.defineProperty(result, "toString", {
      value: (base64) => base64 === "base64" ? result.transformedSourceBase64 : result.transformedSource
    });
    return result;
  };
  if (globalThis.webqit?.$useLiveT) {
    const { parse: parse2, transform: transform2, serialize: serialize2 } = globalThis.webqit.$useLiveT;
    if (action === "serialize")
      return serialize2(input, params);
    if (action === "parse")
      return parse2(input, params);
    if (action === "transform") {
      const result = transform2(input, params);
      return patchToString(result);
    }
  }
  globalThis.webqit = globalThis.webqit || {};
  if (!globalThis.webqit.$useLiveTWorker) {
    const customUrl = document.querySelector('meta[name="$q-transformer-url"]');
    const transformerUrls = (customUrl?.content.split(",") || []).concat("https://unpkg.com/@webqit/use-live/dist/transformer.js");
    const workerScriptText = `
        const transformerUrls = [ '${transformerUrls.join(`','`)}' ];
        ( function importScript() {
            try { importScripts( transformerUrls.shift().trim() ) } catch( e ) { if ( transformerUrls.length ) { importScript(); } }
        } )();
        const { parse, transform, serialize } = globalThis.webqit.$useLiveT;
        globalThis.onmessage = e => {
            const { action, input, params } = e.data;
            let result;
            if (action === 'serialize') {
                result = serialize(input, params);
            } else if (action === 'parse') {
                result = parse(input, params);
            } else if (action === 'transform') {
                const { toString, ...compilation } = transform(input, params);
                result = compilation;
            }
            e.ports[0]?.postMessage(result);
        };`;
    globalThis.webqit.$useLiveTWorker = new Worker(`data:text/javascript;base64,${btoa(workerScriptText)}`);
  }
  return new Promise((res) => {
    let messageChannel = new MessageChannel();
    webqit.$useLiveTWorker.postMessage({ action, input, params }, [messageChannel.port2]);
    messageChannel.port1.onmessage = (e) => {
      const result = e.data;
      if (action === "transform")
        patchToString(result);
      res(result);
    };
  });
}

// node_modules/@webqit/util/obj/get.js
function get_default(ctxt, path2, trap = {}, reciever = {}) {
  path2 = from_default(path2).slice();
  var _ctxt = ctxt;
  while (!isUndefined_default(_ctxt) && !isNull_default(_ctxt) && path2.length) {
    var _key = path2.shift();
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
function set_default(obj, path2, val, buildTree = {}, trap = {}) {
  const _set = (target2, key, val2) => {
    if (trap.set) {
      return trap.set(target2, key, val2);
    } else {
      if (isNumeric_default(path2[i]) && isArray_default(target2)) {
        target2.push(val2);
      } else {
        target2[key] = val2;
      }
      return true;
    }
  };
  path2 = from_default(path2);
  var target = obj;
  for (var i = 0; i < path2.length; i++) {
    if (i < path2.length - 1) {
      if (!target || !isTypeObject_default(target) && !isFunction_default(target)) {
        return false;
      }
      var branch = get_default(target, path2[i], trap);
      if (!isTypeObject_default(branch)) {
        if (trap.buildTree === false) {
          return false;
        }
        branch = isFunction_default(trap.buildTree) ? trap.buildTree(i) : isNumeric_default(path2[i + 1]) ? [] : {};
        var branchSuccess = _set(target, path2[i], branch);
        if (!branchSuccess) {
          return false;
        }
      }
      target = branch;
    } else {
      return _set(target, path2[i], val);
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
function xpathQuery(window2, context, expr, subtree2 = true) {
  expr = (Array.isArray(expr) ? expr : [expr]).map((x) => (x + "").replace("(", subtree2 ? "(.//" : "(./")).join("|");
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
    const { context, window: window2, webqit: webqit2 } = this;
    if (params.eventDetails && !webqit2.realdom.attrInterceptionHooks?.intercepting) {
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
      registry2.delete(registration);
    } };
    const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
    const registration = { context, spec, callback, params, atomics: /* @__PURE__ */ new Map(), originalFilterIsString, signalGenerator, disconnectable };
    const registry2 = this.registry(interceptionTiming);
    registry2.set(registration, !!registration.params.deferred);
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
  const window2 = this, registry2 = window2.webqit.realdom.attrInterceptionRecords?.get(target) || {};
  const event = registry2[attributeName]?.[0] || "mutation";
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
    const registry2 = webqit2.realdom.attrInterceptionRecords.get(record.target);
    registry2[record.name] = registry2[record.name] || [];
    registry2[record.name].unshift(record.event);
    if (wq(record.target, "realdom", "internalAttrInteractions").get(record.name))
      return defaultAction();
    webqit2.realdom.attrInterceptionHooks.get("intercept")?.forEach((callback2) => callback2([record]));
    const returnValue = defaultAction();
    webqit2.realdom.attrInterceptionHooks.get("sync")?.forEach((callback2) => callback2([record]));
    return returnValue;
  };
  const mo = new window2.MutationObserver((records) => {
    records = records.filter((rcd) => {
      const registry2 = window2.webqit.realdom.attrInterceptionRecords?.get(rcd.target) || {};
      return !registry2[rcd.attributeName]?.shift();
    });
    records = dedupAndIgnoreInternals(records).map((rcd) => withAttrEventDetails.call(window2, rcd));
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
      let value, oldValue = internalAttrInteraction(this, args[0], () => this.getAttribute(args[0]));
      if (["setAttribute", "toggleAttribute"].includes(apiName)) {
        value = args[1];
      }
      if (apiName === "toggleAttribute" && value === void 0) {
        value = oldValue === null ? true : false;
      }
      const record = { target: this, name: args[0], value, oldValue, type: "interception", event: [this, apiName] };
      const exec3 = () => originalApis[apiName].call(this, ...args);
      return attrIntercept(record, exec3);
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
      registry2.delete(registration);
      mo.disconnect();
    } };
    const signalGenerator = params.signalGenerator || params.lifecycleSignals && this.createSignalGenerator();
    const registration = { context, spec, callback, params, signalGenerator, disconnectable };
    const registry2 = this.registry(interceptionTiming);
    registry2.set(registration, !!registration.params.deferred);
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
  const parse2 = (selector) => [...selector.matchAll(/\[([^\=\]]+)(\=[^\]]+)?\]/g)].map((x) => x[1]).concat(parseDot(selector)).concat(parseHash(selector));
  if (!(registration.$attrs = Array.from(new Set(cssSelectors.filter((s) => (s + "").includes("[")).reduce((attrs, selector) => attrs.concat(parse2(selector + "")), [])))).length)
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
  const { webqit: webqit2, document: document2, Node, CharacterData, Element, HTMLElement, HTMLTemplateElement, DocumentFragment } = window2;
  if (!webqit2.realdom.domInterceptionHooks) {
    Object.defineProperty(webqit2.realdom, "domInterceptionHooks", { value: /* @__PURE__ */ new Map() });
  }
  if (!webqit2.realdom.domInterceptionNoRecurse) {
    Object.defineProperty(webqit2.realdom, "domInterceptionNoRecurse", { value: /* @__PURE__ */ new Map() });
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
  const noRecurse = (node, method, callback2) => {
    webqit2.realdom.domInterceptionNoRecurse.set(node, method);
    const returnValue = callback2();
    webqit2.realdom.domInterceptionNoRecurse.delete(node);
    return returnValue;
  };
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
      let exec3 = () => $apiOriginals[apiName].value.call(this, ...args);
      if (webqit2.realdom.domInterceptionNoRecurse.get(this) === apiName)
        return exec3();
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
        const temp = document2.createElement(tempNodeName.includes("-") ? "div" : tempNodeName);
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
        return exec3();
      const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
      return intercept2(record, () => {
        return $apiOriginals[apiNameFinal].value.call(this, ...args);
      });
    }
    function setter(value) {
      const DOMClassName = Object.keys(_apiOriginals).find((name) => this instanceof window2[name] && apiName in _apiOriginals[name]);
      const $apiOriginals = _apiOriginals[DOMClassName];
      let exec3 = () => $apiOriginals[apiName].set.call(this, value);
      if (this instanceof HTMLScriptElement || webqit2.realdom.domInterceptionNoRecurse.get(this) === apiName)
        return exec3();
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
            return exec3();
          tempNodeName = this.parentNode.nodeName;
        }
        const temp = document2.createElement(tempNodeName.includes("-") ? "div" : tempNodeName);
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
            const $script = document2.createElement("script");
            [...script.attributes].forEach((attr) => $script.setAttribute(attr.name, attr.value));
            $script.textContent = script.textContent;
            noRecurse(script, "replaceWith", () => script.replaceWith($script));
          }
        }
        if (apiName === "outerHTML") {
          value = new DocumentFragment();
          noRecurse(value, "append", () => value.append(...entrants));
          exec3 = () => noRecurse(this, "replaceWith", () => Element.prototype.replaceWith.call(this, value));
        } else {
          if (this instanceof HTMLTemplateElement) {
            exec3 = () => noRecurse(this.content, "replaceChildren", () => this.content.replaceChildren(...entrants));
          } else {
            exec3 = () => noRecurse(this, "replaceChildren", () => Element.prototype.replaceChildren.call(this, ...entrants));
          }
        }
      }
      const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
      return intercept2(record, exec3);
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
var _wq2 = (target, ...args) => wq(target, "oohtml", ...args);
var env3 = {};
function _init(name, $config, $defaults) {
  const window2 = this, realdom = src_default.call(window2);
  env3.window = window2;
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
function getInternalAttrInteraction(node, attrName) {
  return wq(node, "realdom", "internalAttrInteractions").get(attrName);
}
function internalAttrInteraction2(node, attrName, callback) {
  const savedAttrLocking = wq(node, "realdom", "internalAttrInteractions").get(attrName);
  wq(node, "realdom", "internalAttrInteractions").set(attrName, true);
  const value = callback();
  wq(node, "realdom", "internalAttrInteractions").set(attrName, savedAttrLocking);
  return value;
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
var _uniqId = () => (0 | Math.random() * 9e6).toString(36);
var hashTable = /* @__PURE__ */ new Map();
function _toHash(val) {
  let hash;
  if (!(hash = hashTable.get(val))) {
    hash = _uniqId();
    hashTable.set(val, hash);
  }
  return hash;
}
function _fromHash(hash) {
  let val;
  hashTable.forEach((_hash, _val) => {
    if (_hash === hash)
      val = _val;
  });
  return val;
}

// src/context-api/_DOMContextRequestEvent.js
function DOMContextRequestEvent_default() {
  const { window: window2 } = env3, { webqit: webqit2 } = window2;
  if (webqit2.DOMContextRequestEvent)
    return webqit2.DOMContextRequestEvent;
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
  webqit2.DOMContextRequestEvent = DOMContextRequestEvent;
  return DOMContextRequestEvent;
}

// src/context-api/DOMContextResponse.js
var DOMContextResponse = class extends AbortController {
  constructor(callback) {
    super();
    callback((response) => {
      const { window: { webqit: { Observer: Observer2 } } } = env3;
      Observer2.defineProperty(this, "value", { value: response, configurable: true, enumerable: true });
    }, this);
  }
};

// src/context-api/DuplicateContextError.js
var DuplicateContextError = class extends Error {
};

// src/context-api/DOMContexts.js
var DOMContexts = class {
  static instance(host) {
    return _wq2(host).get("contexts::instance") || new this(host);
    ;
  }
  constructor(host) {
    _wq2(host).get(`contexts::instance`)?.dispose();
    _wq2(host).set(`contexts::instance`, this);
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
    const { window: { webqit: { oohtml: { configs } } } } = env3;
    return configs;
  }
  get name() {
    return [env3.window.Document, env3.window.ShadowRoot].some((x) => this.host instanceof x) ? Infinity : this.host.getAttribute(this.configs.CONTEXT_API.attr.contextname);
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

// src/namespaced-html/DOMNamingContext.js
var DOMNamingContext = class extends DOMContext {
  static createRequest(detail = null) {
    const request = super.createRequest();
    if (detail?.startsWith("@")) {
      const [targetContext, ...detail2] = detail2.slice(1).split("/").map((s) => s.trim());
      request.targetContext = targetContext;
      request.detail = detail2.join("/");
    } else {
      request.detail = detail;
    }
    return request;
  }
  get namespaceObj() {
    return this.host[this.configs.NAMESPACED_HTML.api.namespace];
  }
  handle(event) {
    const { window: { webqit: { Observer: Observer2 } } } = env3;
    event.meta.controller?.abort();
    if (!(event.detail || "").trim())
      return event.respondWith(Observer2.unproxy(this.namespaceObj));
    let path2 = (event.detail || "").split("/").map((x) => x.trim()).filter((x) => x);
    if (!path2.length)
      return event.respondWith();
    path2 = path2.join(`/${this.configs.NAMESPACED_HTML.api.namespace}/`)?.split("/") || [];
    event.meta.controller = Observer2.reduce(this.namespaceObj, path2, Observer2.get, (descriptor) => {
      if (this.disposed)
        return;
      event.respondWith(descriptor.value);
    }, { live: event.live, signal: event.signal, descripted: true });
  }
  unsubscribed(event) {
    event.meta.controller?.abort();
  }
};
__publicField(DOMNamingContext, "kind", "namespace");

// src/namespaced-html/index.js
function init($config = {}) {
  const { config, window: window2 } = _init.call(this, "namespaced-html", $config, {
    attr: { namespace: "namespace", lid: "id" },
    api: { namespace: "namespace" },
    tokens: { lidrefPrefix: "~", lidrefSeparator: ":" },
    target: { className: ":target", eventName: ":target", scrolling: true }
  });
  config.lidSelector = `[${window2.CSS.escape(config.attr.lid)}]`;
  config.namespaceSelector = `[${window2.CSS.escape(config.attr.namespace)}]`;
  window2.webqit.DOMNamingContext = DOMNamingContext;
  exposeAPIs.call(window2, config);
  realtime.call(window2, config);
}
function lidUtil(config) {
  const { lidrefPrefix, lidrefSeparator } = config.tokens;
  return {
    escape(str, mode = 1) {
      return [...str].map((x) => !/\w/.test(x) ? mode === 2 ? `\\\\${x}` : `\\${x}` : x).join("");
    },
    lidrefPrefix(escapeMode = 0) {
      return escapeMode ? this.escape(lidrefPrefix, escapeMode) : lidrefPrefix;
    },
    lidrefSeparator(escapeMode = 0) {
      return escapeMode ? this.escape(lidrefSeparator, escapeMode) : lidrefSeparator;
    },
    isUuid(str, escapeMode = 0) {
      return str.startsWith(this.lidrefPrefix(escapeMode)) && str.includes(this.lidrefSeparator(escapeMode));
    },
    toUuid(hash, lid, escapeMode = 0) {
      return hash.endsWith("-root") ? lid : `${this.lidrefPrefix(escapeMode)}${hash}${this.lidrefSeparator(escapeMode)}${lid}`;
    },
    uuidToId(str, escapeMode = 0) {
      return this.isUuid(str) ? str.split(this.lidrefSeparator(escapeMode))[1] : str;
    },
    uuidToLidref(str, escapeMode = 0) {
      return this.isUuid(str) ? `${this.lidrefPrefix(escapeMode)}${str.split(this.lidrefSeparator(escapeMode))[1]}` : str;
    }
  };
}
function rewriteSelector(selectorText, namespaceUUID, scopeSelector = null, escapeMode = 0) {
  const window2 = this, { webqit: { oohtml: { configs: { NAMESPACED_HTML: config } } } } = window2;
  const $lidUtil = lidUtil(config);
  const regex = new RegExp(`${scopeSelector ? `:scope|` : ""}#(${$lidUtil.lidrefPrefix(escapeMode + 1)})?([\\w]+${$lidUtil.lidrefSeparator(escapeMode + 1)})?((?:[\\w-]|\\\\.)+)`, "g");
  const [cat1, cat2] = _splitOuter(selectorText, ",").reduce(([cat12, cat22], selector) => {
    let quotesMatch, hadScopeSelector;
    selector = selector.replace(regex, (match, lidrefPrefixMatch, lidrefSeparatorMatch, id, index) => {
      if (!quotesMatch) {
        quotesMatch = [...selector.matchAll(/(["'])(?:(?=(\\?))\2.)*?\1/g)];
      }
      if (quotesMatch.some((q) => index > q.index && index + match.length < q.index + q[0].length))
        return match;
      if (match === ":scope") {
        hadScopeSelector = true;
        return scopeSelector;
      }
      const isLidref = lidrefPrefixMatch && !lidrefSeparatorMatch;
      const isUuid = lidrefPrefixMatch && lidrefSeparatorMatch;
      if (isUuid) {
        return `#${$lidUtil.escape(match.replace("#", ""), 1)}`;
      }
      if (isLidref) {
        if (config.attr.lid === "id" && namespaceUUID && !namespaceUUID.endsWith("-root")) {
          return `#${$lidUtil.toUuid(namespaceUUID, id, 1)}`;
        }
      }
      let rewrite;
      if (config.attr.lid === "id") {
        rewrite = `:is(#${id},[id^="${$lidUtil.lidrefPrefix(escapeMode)}"][id$="${$lidUtil.lidrefSeparator(escapeMode)}${id}"])`;
      } else {
        rewrite = `:is(#${id},[${window2.CSS.escape(config.attr.lid)}="${id}"])`;
      }
      return isLidref ? `:is(${rewrite}):not(${scopeSelector ? scopeSelector + " " : ""}${config.namespaceSelector} *)` : rewrite;
    });
    return hadScopeSelector ? [cat12, cat22.concat(selector)] : [cat12.concat(selector), cat22];
  }, [[], []]);
  let newSelectorText;
  if (scopeSelector && cat1.length) {
    newSelectorText = [cat1.length > 1 ? `${scopeSelector} :is(${cat1.join(", ")})` : `${scopeSelector} ${cat1[0]}`, cat2.join(", ")].filter((x) => x).join(", ");
  } else {
    newSelectorText = [...cat1, ...cat2].join(", ");
  }
  return newSelectorText;
}
function getOwnNamespaceObject(node) {
  const window2 = this;
  if (!_wq2(node).has("namespace")) {
    const namespaceObj = /* @__PURE__ */ Object.create(null);
    _wq2(node).set("namespace", namespaceObj);
    const isDocumentRoot = [window2.Document, window2.ShadowRoot].some((x) => node instanceof x);
    Object.defineProperty(namespaceObj, Symbol.toStringTag, {
      get() {
        return isDocumentRoot ? "RootNamespaceRegistry" : "NamespaceRegistry";
      }
    });
  }
  return _wq2(node).get("namespace");
}
function getOwnerNamespaceObject(node, forID = false) {
  const window2 = this, { webqit: { oohtml: { configs: { NAMESPACED_HTML: config } } } } = window2;
  const isDocumentRoot = [window2.Document, window2.ShadowRoot].some((x) => node instanceof x);
  return getOwnNamespaceObject.call(window2, isDocumentRoot ? node : (forID ? node.parentNode : node)?.closest?.(config.namespaceSelector) || node.getRootNode());
}
function getNamespaceUUID(namespaceObj) {
  const isDocumentRoot = Object.prototype.toString.call(namespaceObj) === "[object RootNamespaceRegistry]";
  return (_fromHash(namespaceObj) || _toHash(namespaceObj)) + (isDocumentRoot ? "-root" : "");
}
function exposeAPIs(config) {
  const window2 = this, { webqit: { Observer: Observer2 } } = window2;
  [window2.Document.prototype, window2.Element.prototype, window2.ShadowRoot.prototype].forEach((prototype) => {
    const type = prototype === window2.Document.prototype ? "Document" : prototype === window2.ShadowRoot.prototype ? "ShadowRoot" : "Element";
    if (config.api.namespace in prototype) {
      throw new Error(`The ${type} prototype already has a "${config.api.namespace}" API!`);
    }
    Object.defineProperty(prototype, config.api.namespace, {
      get: function() {
        return Observer2.proxy(getOwnNamespaceObject.call(window2, this));
      }
    });
  });
}
function realtime(config) {
  const window2 = this, { webqit: { Observer: Observer2, realdom, oohtml: { configs }, DOMNamingContext: DOMNamingContext2 } } = window2;
  const idRefsAttrs = ["aria-owns", "aria-controls", "aria-labelledby", "aria-describedby", "aria-flowto"];
  const idRefAttrs = ["for", "list", "form", "aria-activedescendant", "aria-details", "aria-errormessage", "popovertarget"];
  const attrList = [config.attr.lid, ...idRefsAttrs, ...idRefAttrs];
  const relMap = { id: "id", for: "htmlFor", "aria-owns": "ariaOwns", "aria-controls": "ariaControls", "aria-labelledby": "ariaLabelledBy", "aria-describedby": "ariaDescribedBy", "aria-flowto": "ariaFlowto", "aria-activedescendant": "ariaActiveDescendant", "aria-details": "ariaDetails", "aria-errormessage": "ariaErrorMessage", "popovertarget": "popoverTargetElement" };
  const $lidUtil = lidUtil(config);
  const uuidsToLidrefs = (node, attrName, getter) => {
    if (!getInternalAttrInteraction(node, attrName) && _wq2(node, "attrOriginals").has(attrName)) {
      return _wq2(node, "attrOriginals").get(attrName);
    }
    const value = getter();
    if (getInternalAttrInteraction(node, attrName))
      return value;
    return value && value.split(" ").map((x) => (x = x.trim()) && (attrName === config.attr.lid ? $lidUtil.uuidToId : $lidUtil.uuidToLidref).call($lidUtil, x)).join(" ");
  };
  const getElementByIdDescr = Object.getOwnPropertyDescriptor(window2.Document.prototype, "getElementById");
  Object.defineProperty(window2.Document.prototype, "getElementById", {
    ...getElementByIdDescr,
    value(id) {
      return this.querySelector(`#${id}`);
    }
  });
  for (const queryApi of ["querySelector", "querySelectorAll"]) {
    for (const nodeApi of [window2.Document, window2.Element]) {
      const querySelectorDescr = Object.getOwnPropertyDescriptor(nodeApi.prototype, queryApi);
      Object.defineProperty(nodeApi.prototype, queryApi, {
        ...querySelectorDescr,
        value(selector) {
          return querySelectorDescr.value.call(this, rewriteSelector.call(window2, selector, getNamespaceUUID(getOwnNamespaceObject.call(window2, this))));
        }
      });
    }
  }
  const getAttributeDescr = Object.getOwnPropertyDescriptor(window2.Element.prototype, "getAttribute");
  Object.defineProperty(window2.Element.prototype, "getAttribute", {
    ...getAttributeDescr,
    value(attrName) {
      const getter = () => getAttributeDescr.value.call(this, attrName);
      return attrList.includes(attrName) && !_wq2(this, "lock").get(attrName) ? uuidsToLidrefs(this, attrName, getter) : getter();
    }
  });
  const propertyDescr = Object.getOwnPropertyDescriptor(window2.Attr.prototype, "value");
  Object.defineProperty(window2.Attr.prototype, "value", {
    ...propertyDescr,
    get() {
      const getter = () => propertyDescr.get.call(this);
      return attrList.includes(this.name) ? uuidsToLidrefs(this.ownerElement, this.name, getter) : getter();
    }
  });
  const propertyDescr2 = Object.getOwnPropertyDescriptor(window2.Node.prototype, "nodeValue");
  Object.defineProperty(window2.Node.prototype, "nodeValue", {
    ...propertyDescr2,
    get() {
      const getter = () => propertyDescr2.get.call(this);
      return this instanceof window2.Attr && attrList.includes(this.name) ? uuidsToLidrefs(this.ownerElement, this.name, getter) : getter();
    }
  });
  for (const attrName of attrList) {
    if (!(attrName in relMap))
      continue;
    const domApis = attrName === "for" ? [window2.HTMLLabelElement, window2.HTMLOutputElement] : attrName === "popovertarget" ? [window2.HTMLButtonElement, window2.HTMLInputElement] : [window2.Element];
    for (const domApi of domApis) {
      const propertyDescr3 = Object.getOwnPropertyDescriptor(domApi.prototype, relMap[attrName]);
      if (!propertyDescr3)
        continue;
      Object.defineProperty(domApi.prototype, relMap[attrName], {
        ...propertyDescr3,
        get() {
          const getter = () => propertyDescr3.get.call(this, attrName);
          return uuidsToLidrefs(this, attrName, getter);
        }
      });
    }
  }
  if (config.attr.lid !== "id") {
    Object.defineProperty(window2.Element.prototype, config.attr.lid, {
      configurable: true,
      enumerable: true,
      get() {
        return this.getAttribute(config.attr.lid);
      },
      set(value) {
        return this.setAttribute(config.attr.lid, value);
      }
    });
  }
  const attrChange = (entry, attrName, value, callback) => {
    return internalAttrInteraction2(entry, attrName, () => {
      if (typeof value === "function")
        value = value();
      return callback(value);
    });
  };
  const setupBinding = (entry, attrName, value, newNamespaceObj = null) => {
    attrChange(entry, attrName, value, (value2) => {
      const isLidAttr = attrName === config.attr.lid;
      const namespaceObj = newNamespaceObj || getOwnerNamespaceObject.call(window2, entry, isLidAttr);
      const namespaceUUID = getNamespaceUUID(namespaceObj);
      if (isLidAttr) {
        const id = $lidUtil.uuidToId(value2);
        if (Observer2.get(namespaceObj, id) !== entry) {
          const uuid = $lidUtil.toUuid(namespaceUUID, id);
          if (uuid !== value2) {
            entry.setAttribute("id", uuid);
          }
          Observer2.set(namespaceObj, id, entry);
        }
      } else {
        _wq2(entry, "attrOriginals").set(attrName, value2);
        const newAttrValue = value2.split(" ").map((idref) => (idref = idref.trim()) && $lidUtil.isUuid(idref) ? idref : $lidUtil.toUuid(namespaceUUID, idref)).join(" ");
        entry.setAttribute(attrName, newAttrValue);
        _wq2(namespaceObj).set("idrefs", _wq2(namespaceObj).get("idrefs") || /* @__PURE__ */ new Set());
        _wq2(namespaceObj).get("idrefs").add(entry);
      }
    });
  };
  const cleanupBinding = (entry, attrName, oldValue, prevNamespaceObj = null) => {
    attrChange(entry, attrName, oldValue, (oldValue2) => {
      const isLidAttr = attrName === config.attr.lid;
      const namespaceObj = prevNamespaceObj || getOwnerNamespaceObject.call(window2, entry, isLidAttr);
      if (isLidAttr) {
        const id = $lidUtil.uuidToId(oldValue2);
        if (Observer2.get(namespaceObj, id) === entry) {
          Observer2.deleteProperty(namespaceObj, id);
        }
      } else {
        const newAttrValue = _wq2(entry, "attrOriginals").get(attrName);
        if (entry.hasAttribute(attrName))
          entry.setAttribute(attrName, newAttrValue);
        _wq2(namespaceObj).get("idrefs")?.delete(entry);
      }
    });
  };
  realdom.realtime(window2.document).query(config.namespaceSelector, (record) => {
    const reAssociate = (entry, attrName, oldNamespaceObj, newNamespaceObj) => {
      if (!entry.hasAttribute(attrName))
        return;
      const attrValue = () => entry.getAttribute(attrName);
      cleanupBinding(entry, attrName, attrValue, oldNamespaceObj);
      if (entry.isConnected) {
        setupBinding(entry, attrName, _wq2(entry, "attrOriginals").get(attrName) || attrValue, newNamespaceObj);
      }
    };
    record.exits.forEach((entry) => {
      if (entry.isConnected) {
        const namespaceObj = getOwnNamespaceObject.call(window2, entry);
        for (const node of /* @__PURE__ */ new Set([...Object.values(namespaceObj), ..._wq2(namespaceObj).get("idrefs") || []])) {
          for (const attrName of attrList) {
            reAssociate(node, attrName, namespaceObj);
          }
        }
      }
      const contextsApi = entry[configs.CONTEXT_API.api.contexts];
      const ctx = contextsApi.find(DOMNamingContext2.kind);
      if (ctx) {
        contextsApi.detach(ctx);
      }
    });
    record.entrants.forEach((entry) => {
      let newSuperNamespaceObj;
      const superNamespaceObj = getOwnerNamespaceObject.call(window2, entry, true);
      for (const node of /* @__PURE__ */ new Set([...Object.values(superNamespaceObj), ..._wq2(superNamespaceObj).get("idrefs") || []])) {
        if ((newSuperNamespaceObj = getOwnerNamespaceObject.call(window2, node, true)) === superNamespaceObj)
          continue;
        for (const attrName of attrList) {
          reAssociate(node, attrName, superNamespaceObj, newSuperNamespaceObj);
        }
      }
      const contextsApi = entry[configs.CONTEXT_API.api.contexts];
      if (!contextsApi.find(DOMNamingContext2.kind)) {
        contextsApi.attach(new DOMNamingContext2());
      }
    });
  }, { id: "namespace-html:namespace", live: true, subtree: "cross-roots", timing: "sync", staticSensitivity: true, eventDetails: true });
  realdom.realtime(window2.document).query(`[${attrList.map((attrName) => window2.CSS.escape(attrName)).join("],[")}]`, (record) => {
    const namespaceNodesToTest = { forID: /* @__PURE__ */ new Map(), forOther: /* @__PURE__ */ new Map() };
    for (const attrName of attrList) {
      const _namespaceNodesToTest = attrName === config.attr.lid ? namespaceNodesToTest.forID : namespaceNodesToTest.forOther;
      record.exits.forEach((entry) => {
        if (!entry.hasAttribute(attrName))
          return;
        let namespaceNodeToTest = _namespaceNodesToTest.get(entry);
        if (typeof namespaceNodeToTest === "undefined") {
          namespaceNodeToTest = (attrName === config.attr.lid ? entry.parentNode : entry)?.closest?.(config.namespaceSelector) || entry.getRootNode().host;
          _namespaceNodesToTest.set(entry, namespaceNodeToTest);
        }
        if (namespaceNodeToTest && !namespaceNodeToTest.isConnected)
          return;
        cleanupBinding(entry, attrName, () => entry.getAttribute(attrName));
      });
      record.entrants.forEach((entry) => {
        if (!entry.hasAttribute(attrName))
          return;
        setupBinding(entry, attrName, () => entry.getAttribute(attrName));
      });
    }
    namespaceNodesToTest.forID.clear();
    namespaceNodesToTest.forOther.clear();
  }, { id: "namespace-html:attrs", live: true, subtree: "cross-roots", timing: "sync" });
  realdom.realtime(window2.document, "attr").observe(attrList, (records) => {
    for (const record of records) {
      if (record.oldValue && record.value !== record.oldValue) {
        cleanupBinding(record.target, record.name, record.oldValue);
      }
      if (record.value && record.value !== record.oldValue) {
        setupBinding(record.target, record.name, record.value);
      }
    }
  }, { id: "namespace-html:attr(attrs)", subtree: "cross-roots", timing: "sync", newValue: true, oldValue: true });
  let prevTarget;
  const activateTarget = () => {
    if (!window2.location.hash?.startsWith(`#${$lidUtil.lidrefPrefix()}`))
      return;
    const path2 = window2.location.hash?.substring(`#${$lidUtil.lidrefPrefix()}`.length).split("/").map((s) => s.trim()).filter((s) => s) || [];
    const currTarget = path2.reduce((prev, segment) => prev && prev[config.api.namespace][segment], window2.document);
    if (prevTarget && config.target.className) {
      prevTarget.classList.toggle(config.target.className, false);
    }
    if (currTarget && currTarget !== window2.document) {
      if (config.target.className) {
        currTarget.classList.toggle(config.target.className, true);
      }
      if (config.target.eventName) {
        currTarget.dispatchEvent(new window2.CustomEvent(config.target.eventName));
      }
      if (config.target.scrolling && path2.length > 1) {
        currTarget.scrollIntoView();
      }
      prevTarget = currTarget;
    }
  };
  window2.addEventListener("hashchange", activateTarget);
  realdom.ready(activateTarget);
}

// src/scoped-js/index.js
function init2({ advanced = {}, ...$config }) {
  const { config, window: window2 } = _init.call(this, "scoped-js", $config, {
    script: { retention: "retain", mimeTypes: "module|text/javascript|application/javascript", timing: "auto" },
    api: { scripts: "scripts" },
    advanced: resolveParams(advanced)
  });
  const customTypes = Array.isArray(config.script.mimeTypes) ? config.script.mimeTypes : config.script.mimeTypes.split("|").filter((t) => t);
  config.scriptSelector = customTypes.map((t) => `script[type="${window2.CSS.escape(t)}"]:not([oohtmlignore])`).concat(`script:not([type])`).join(",");
  window2.webqit.oohtml.Script = {
    compileCache: [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()],
    execute: execute.bind(window2, config)
  };
  exposeAPIs2.call(window2, config);
  realtime2.call(window2, config);
}
function exposeAPIs2(config) {
  const window2 = this, { webqit: { nextKeyword: nextKeyword2, matchPrologDirective: matchPrologDirective2 } } = window2;
  const scriptsMap = /* @__PURE__ */ new Map();
  if (config.api.scripts in window2.Element.prototype) {
    throw new Error(`The "Element" class already has a "${config.api.scripts}" property!`);
  }
  [window2.ShadowRoot.prototype, window2.Element.prototype].forEach((proto) => {
    Object.defineProperty(proto, config.api.scripts, { get: function() {
      if (!scriptsMap.has(this)) {
        scriptsMap.set(this, []);
      }
      return scriptsMap.get(this);
    } });
  });
  Object.defineProperties(window2.HTMLScriptElement.prototype, {
    scoped: {
      configurable: true,
      get() {
        return this.hasAttribute("scoped");
      },
      set(value) {
        this.toggleAttribute("scoped", value);
      }
    },
    live: {
      configurable: true,
      get() {
        if (this.liveProgramHandle)
          return true;
        const scriptContents = nextKeyword2(this.oohtml__textContent || this.textContent || "", 0, 0);
        return matchPrologDirective2(scriptContents, true);
      }
    }
  });
}
async function execute(config, execHash) {
  const window2 = this, { realdom } = window2.webqit;
  const exec3 = _fromHash(execHash);
  if (!exec3)
    throw new Error(`Argument must be a valid exec hash.`);
  const { script, compiledScript, thisContext } = exec3;
  if (config.script.retention === "dispose") {
    script.remove();
  } else if (config.script.retention === "hidden") {
    script.textContent = `"source hidden"`;
  } else {
    setTimeout(async () => {
      script.textContent = await compiledScript.toString();
    }, 0);
  }
  const varScope = script.scoped ? thisContext : script.getRootNode();
  if (!_wq2(varScope).has("scriptEnv")) {
    _wq2(varScope).set("scriptEnv", /* @__PURE__ */ Object.create(null));
  }
  const liveProgramHandle = await (await compiledScript.bind(thisContext, _wq2(varScope).get("scriptEnv"))).execute();
  if (script.live) {
    Object.defineProperty(script, "liveProgramHandle", { value: liveProgramHandle });
  }
  realdom.realtime(window2.document).observe(script, () => {
    if (script.live) {
      liveProgramHandle.abort();
    }
    if (thisContext instanceof window2.Element) {
      thisContext[config.api.scripts]?.splice(thisContext[config.api.scripts].indexOf(script, 1));
    }
  }, { id: "scoped-js:script-exits", subtree: "cross-roots", timing: "sync", generation: "exits" });
}
function realtime2(config) {
  const inBrowser = Object.getOwnPropertyDescriptor(globalThis, "window")?.get?.toString().includes("[native code]") ?? false;
  const window2 = this, { webqit: { oohtml, realdom } } = window2;
  if (!window2.HTMLScriptElement.supports) {
    window2.HTMLScriptElement.supports = (type) => ["text/javascript", "application/javascript"].includes(type);
  }
  const handled = /* @__PURE__ */ new WeakSet();
  realdom.realtime(window2.document).query(config.scriptSelector, (record) => {
    record.entrants.forEach((script) => {
      if (handled.has(script) || script.hasAttribute("oohtmlno") || !inBrowser && !script.hasAttribute("ssr"))
        return;
      const compiledScript = compileScript.call(window2, config, script);
      if (!compiledScript)
        return;
      handled.add(script);
      const thisContext = script.scoped ? script.parentNode || record.target : script.type === "module" ? void 0 : window2;
      if (script.scoped) {
        thisContext[config.api.scripts].push(script);
      }
      const execHash = _toHash({ script, compiledScript, thisContext });
      const manualHandling = record.type === "query" || script.type && !window2.HTMLScriptElement.supports(script.type) || script.getAttribute("data-handling") === "manual";
      if (manualHandling || config.script.timing === "manual") {
        oohtml.Script.execute(execHash);
      } else {
        script.textContent = `webqit.oohtml.Script.execute( '${execHash}' );`;
      }
    });
  }, { id: "scoped-js:script-entries", live: true, subtree: "cross-roots", timing: "intercept", generation: "entrants", eventDetails: true });
}
function compileScript(config, script) {
  const window2 = this, { webqit: { oohtml, LiveScript: LiveScript2, AsyncLiveScript: AsyncLiveScript2, LiveModule: LiveModule2 } } = window2;
  let textContent = script.textContent.trim();
  if (textContent.startsWith("/*@oohtml*/if(false){") && textContent.endsWith("}/*@oohtml*/")) {
    textContent = textContent.slice(21, -12);
    Object.defineProperty(script, "oohtml__textContent", { value: textContent });
  }
  if (!textContent.trim().length)
    return;
  const sourceHash = _toHash(textContent);
  const compileCache = oohtml.Script.compileCache[script.live ? 0 : 1];
  let compiledScript;
  if (!(compiledScript = compileCache.get(sourceHash))) {
    const { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 } = config.advanced;
    compiledScript = new (script.type === "module" ? LiveModule2 : LiveScript2 || AsyncLiveScript2)(textContent, {
      liveMode: script.live,
      exportNamespace: `#${script.id}`,
      fileName: `${window2.document.url?.split("#")?.[0] || ""}#${script.id}`,
      parserParams: parserParams2,
      compilerParams,
      runtimeParams: runtimeParams2
    });
    compileCache.set(sourceHash, compiledScript);
  }
  return compiledScript;
}
function idleCompiler(node) {
  const window2 = this, { webqit: { oohtml: { configs: { SCOPED_JS: config } } } } = window2;
  [...node?.querySelectorAll(config.scriptSelector) || []].forEach((script) => {
    compileScript.call(window2, config, script);
  });
}

// src/data-binding/index.js
function init3($config = {}) {
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
  realtime3.call(window2, config);
}
function realtime3(config) {
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
  const { webqit: { realdom, Observer: Observer2, DOMBindingsContext: DOMBindingsContext2 } } = this;
  if (_wq2(root).has("data-binding"))
    return _wq2(root).get("data-binding");
  const scope = /* @__PURE__ */ Object.create(null), abortController = new AbortController();
  scope["$exec__"] = (target, prop, ...args) => {
    const exec3 = () => {
      try {
        target[prop](...args);
      } catch (e) {
        throw new Error(`Error executing "${prop}()": ${e.message} at ${e.cause}`);
      }
    };
    exec3();
  };
  scope["$assign__"] = (target, prop, val) => {
    const exec3 = () => {
      try {
        target[prop] = val;
      } catch (e) {
        throw new Error(`Error executing "${prop} = ${val}": ${e.message} at ${e.cause}`);
      }
    };
    exec3();
  };
  Observer2.intercept(scope, {
    get: (e, recieved, next) => {
      if (!(e.key in scope)) {
        const request = { ...DOMBindingsContext2.createRequest(e.key), live: true, signal: abortController.signal };
        root[config.CONTEXT_API.api.contexts].request(request, (value) => {
          Observer2.set(scope, e.key, value);
        });
      }
      return next(scope[e.key] ?? (e.key in globalThis ? globalThis[e.key] : void 0));
    },
    has: (e, recieved, next) => {
      return next(true);
    }
  });
  const instance = { scope, abortController, bindings: /* @__PURE__ */ new Map() };
  _wq2(root).set("data-binding", instance);
  return instance;
}
function cleanup(...entries) {
  for (const node of entries) {
    const root = node.nodeName === "#text" ? node.parentNode : node;
    const { bindings, abortController } = _wq2(root).get("data-binding") || {};
    if (!bindings?.has(node))
      return;
    bindings.get(node).liveProgramHandle.abort();
    bindings.get(node).signals?.forEach((s) => s.abort());
    bindings.delete(node);
    if (!bindings.size) {
      abortController.abort();
      _wq2(root).delete("data-binding");
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
  const { webqit: { LiveScript: LiveScript2, AsyncLiveScript: AsyncLiveScript2 } } = this;
  const { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 } = config.advanced;
  const compiled = new (LiveScript2 || AsyncLiveScript2)(source, { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 });
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
  const { webqit: { LiveScript: LiveScript2, AsyncLiveScript: AsyncLiveScript2 } } = this;
  const { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 } = config.advanced;
  const compiled = new (LiveScript2 || AsyncLiveScript2)(source, { parserParams: parserParams2, compilerParams, runtimeParams: runtimeParams2 });
  inlineParseCache.set(str, compiled);
  return compiled;
}
var escDouble = (str) => str.replace(/"/g, '\\"');
function idleCompiler2(node) {
  const window2 = this, { webqit: { oohtml: { configs: { DATA_BINDING: config } } } } = window2;
  (node?.matches(config.attrSelector) ? [node] : []).concat([...node?.querySelectorAll(config.attrSelector) || []]).forEach((node2) => {
    compileInlineBindings.call(window2, config, node2.getAttribute(config.attr.render));
  });
  xpathQuery(window2, node, `(${config.discreteBindingsSelector})`).forEach((node2) => {
    const template = patternMatch(config, node2.nodeValue);
    compileDiscreteBindings.call(window2, config, template.expr);
  });
}

// src/bindings-api/DOMBindingsContext.js
var DOMBindingsContext = class extends DOMContext {
  static createRequest(detail = null) {
    const request = super.createRequest();
    if (detail?.startsWith("@")) {
      const [targetContext, ...detail2] = detail2.slice(1).split(".").map((s) => s.trim());
      request.targetContext = targetContext;
      request.detail = detail2.join(".");
    } else {
      request.detail = detail;
    }
    return request;
  }
  get bindingsObj() {
    return this.host[this.configs.BINDINGS_API.api.bindings];
  }
  matchEvent(event) {
    return super.matchEvent(event) && (!event.detail || !this.detail || (Array.isArray(event.detail) ? event.detail[0] === this.detail : event.detail === this.detail));
  }
  handle(event) {
    event.meta.controller?.abort();
    if (!(event.detail + "").trim())
      return event.respondWith(this.bindingsObj);
    const { window: { webqit: { Observer: Observer2 } } } = env3;
    event.meta.controller = Observer2.reduce(this.bindingsObj, Array.isArray(event.detail) ? event.detail : [event.detail], Observer2.get, (descriptor) => {
      if (this.disposed)
        return;
      event.respondWith(descriptor.value);
    }, { live: event.live, signal: event.signal, descripted: true });
  }
  unsubscribed(event) {
    event.meta.controller?.abort();
  }
};
__publicField(DOMBindingsContext, "kind", "bindings");

// src/bindings-api/index.js
function init4($config = {}) {
  const { config, window: window2 } = _init.call(this, "bindings-api", $config, {
    attr: { bindingsreflection: "bindings" },
    api: { bind: "bind", bindings: "bindings" }
  });
  window2.webqit.DOMBindingsContext = DOMBindingsContext;
  exposeAPIs3.call(window2, config);
  realtime4.call(window2, config);
}
function getBindings(config, node) {
  const window2 = this, { webqit: { Observer: Observer2, oohtml: { configs: { CONTEXT_API: ctxConfig } } } } = window2;
  if (!_wq2(node).has("bindings")) {
    const bindingsObj = /* @__PURE__ */ Object.create(null);
    _wq2(node).set("bindings", bindingsObj);
    Observer2.observe(bindingsObj, (mutations) => {
      if (node instanceof window2.Element) {
        const bindingsParse = parseBindingsAttr(node.getAttribute(config.attr.bindingsreflection) || "");
        const bindingsParseBefore = new Map(bindingsParse);
        for (const m of mutations) {
          if (m.detail?.publish !== false) {
            if (m.type === "delete")
              bindingsParse.delete(m.key);
            else
              bindingsParse.set(m.key, void 0);
          }
        }
        if (bindingsParse.size && bindingsParse.size !== bindingsParseBefore.size) {
          node.setAttribute(config.attr.bindingsreflection, `{ ${[...bindingsParse.entries()].map(([key, value]) => value === void 0 ? key : `${key}: ${value}`).join(", ")} }`);
        } else if (!bindingsParse.size)
          node.toggleAttribute(config.attr.bindingsreflection, false);
      } else {
        const contextsApi = node[ctxConfig.api.contexts];
        for (const m of mutations) {
          if (m.type === "delete") {
            const ctx = contextsApi.find(DOMBindingsContext.kind, m.key);
            if (ctx)
              contextsApi.detach(ctx);
          } else if (!contextsApi.find(DOMBindingsContext.kind, m.key)) {
            contextsApi.attach(new DOMBindingsContext(m.key));
          }
        }
      }
    });
  }
  return _wq2(node).get("bindings");
}
function exposeAPIs3(config) {
  const window2 = this, { webqit: { Observer: Observer2 } } = window2;
  [window2.Document.prototype, window2.Element.prototype, window2.ShadowRoot.prototype].forEach((prototype) => {
    const type = prototype === window2.Document.prototype ? "Document" : prototype === window2.ShadowRoot.prototype ? "ShadowRoot" : "Element";
    if (config.api.bind in prototype) {
      throw new Error(`The ${type} prototype already has a "${config.api.bind}" API!`);
    }
    if (config.api.bindings in prototype) {
      throw new Error(`The ${type} prototype already has a "${config.api.bindings}" API!`);
    }
    Object.defineProperty(prototype, config.api.bind, { value: function(bindings, options = {}) {
      return applyBindings.call(window2, config, this, bindings, options);
    } });
    Object.defineProperty(prototype, config.api.bindings, { get: function() {
      return Observer2.proxy(getBindings.call(window2, config, this));
    } });
  });
}
function applyBindings(config, target, bindings, { merge, diff, publish, namespace } = {}) {
  const window2 = this, { webqit: { Observer: Observer2 } } = window2;
  const bindingsObj = getBindings.call(this, config, target);
  const $params = { diff, namespace, detail: { publish } };
  const exitingKeys = merge ? [] : Object.keys(bindingsObj).filter((key) => !(key in bindings));
  return Observer2.batch(bindingsObj, () => {
    if (exitingKeys.length) {
      Observer2.deleteProperties(bindingsObj, exitingKeys, $params);
    }
    return Observer2.set(bindingsObj, bindings, $params);
  }, $params);
}
function realtime4(config) {
  const window2 = this, { webqit: { realdom, Observer: Observer2, oohtml: { configs } } } = window2;
  const attachBindingsContext = (host, key) => {
    const contextsApi = host[configs.CONTEXT_API.api.contexts];
    if (!contextsApi.find(DOMBindingsContext.kind, key)) {
      contextsApi.attach(new DOMBindingsContext(key));
    }
  };
  const detachBindingsContext = (host, key) => {
    let ctx, contextsApi = host[configs.CONTEXT_API.api.contexts];
    while (ctx = contextsApi.find(DOMBindingsContext.kind, key))
      contextsApi.detach(ctx);
  };
  realdom.realtime(window2.document).query(`[${window2.CSS.escape(config.attr.bindingsreflection)}]`, (record) => {
    record.exits.forEach((entry) => detachBindingsContext(entry));
    record.entrants.forEach((entry) => {
      const bindingsParse = parseBindingsAttr(entry.getAttribute(config.attr.bindingsreflection) || "");
      const newData = [...bindingsParse.entries()].filter(([k, v]) => v !== void 0);
      if (newData.length)
        entry[config.api.bind](Object.fromEntries(newData), { merge: true, publish: false });
      for (const [key] of bindingsParse) {
        attachBindingsContext(entry, key);
      }
    });
  }, { id: "bindings:dom", live: true, subtree: "cross-roots", timing: "sync", eventDetails: true });
  realdom.realtime(window2.document, "attr").observe(config.attr.bindingsreflection, (record) => {
    const bindingsObj = getBindings.call(window2, config, record.target);
    const bindingsParse = parseBindingsAttr(record.value || "");
    const oldBindings = parseBindingsAttr(record.oldValue || "");
    for (const key of /* @__PURE__ */ new Set([...bindingsParse.keys(), ...oldBindings.keys()])) {
      if (!oldBindings.has(key)) {
        if (bindingsParse.get(key) !== void 0)
          Observer2.set(bindingsObj, key, bindingsParse.get(key), { detail: { publish: false } });
        attachBindingsContext(record.target, key);
      } else if (!bindingsParse.has(key)) {
        if (oldBindings.get(key) !== void 0)
          Observer2.deleteProperty(bindingsObj, key, { detail: { publish: false } });
        detachBindingsContext(record.target, key);
      } else if (bindingsParse.get(key) !== oldBindings.get(key)) {
        Observer2.set(bindingsObj, key, bindingsParse.get(key), { detail: { publish: false } });
      }
    }
  }, { id: "bindings:attr", subtree: "cross-roots", timing: "sync", newValue: true, oldValue: true });
}
var parseBindingsAttr = (str) => {
  str = str.trim();
  return new Map(_splitOuter(str.slice(1, -1), ",").filter((s) => s.trim()).map((_str) => {
    return _splitOuter(_str, ":").map((s) => s.trim());
  }));
};

// src/html-imports/HTMLModule.js
var HTMLModule = class {
  static instance(host) {
    return _wq2(host).get("defsmanager::instance") || new this(host);
  }
  constructor(host, parent = null, level = 0) {
    const { window: window2 } = env3, { webqit: { realdom, oohtml: { configs } } } = window2;
    _wq2(host).get(`defsmanager::instance`)?.dispose();
    _wq2(host).set(`defsmanager::instance`, this);
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
    const { window: window2 } = env3, { webqit: { Observer: Observer2 } } = window2;
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
          Observer2.set(this.defs, (!isTemplate && "#" || "") + defId, entry);
        }
      } else {
        if (isTemplate && defId) {
          HTMLModule.instance(entry).dispose();
        } else {
          allFragments = allFragments.filter((x) => x !== entry);
          dirty = true;
        }
        if (defId)
          Observer2.deleteProperty(this.defs, (!isTemplate && "#" || "") + defId);
      }
    });
    if (dirty)
      Observer2.set(this.defs, "#", allFragments);
  }
  evaluateLoading([record1, record2], { signal }) {
    const { window: { webqit: { Observer: Observer2 } } } = env3;
    const src = (record1.value || "").trim();
    if (!src)
      return;
    let $loadingPromise, loadingPromise = (promise) => {
      if (!promise)
        return $loadingPromise;
      $loadingPromise = promise.then(() => interception.remove());
    };
    const loading = (record2.value || "").trim();
    const interception = Observer2.intercept(this.defs, "get", async (descriptor, recieved, next) => {
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
    const { window: window2 } = env3;
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
    const { window: { webqit: { Observer: Observer2 } } } = env3;
    let extendedId = (this.host.getAttribute(this.config.attr.extends) || "").trim();
    let inheritedIds = (this.host.getAttribute(this.config.attr.inherits) || "").trim().split(" ").map((id) => id.trim()).filter((x) => x);
    const handleInherited = (records) => {
      records.forEach((record) => {
        if (Observer2.get(this.defs, record.key) !== record.oldValue)
          return;
        if (["get", "set", "def"].includes(record.type)) {
          Observer2[record.type.replace("get", "set")](this.defs, record.key, record.value);
        } else if (record.type === "delete") {
          Observer2.deleteProperty(this.defs, record.key);
        }
      });
    };
    const realtimes = [];
    const parentDefsObj = getDefs(this.parent);
    if (extendedId) {
      realtimes.push(Observer2.reduce(parentDefsObj, [extendedId, this.config.api.defs, Infinity], Observer2.get, handleInherited, { live: true }));
    }
    if (inheritedIds.length) {
      realtimes.push(Observer2.get(parentDefsObj, inheritedIds.includes("*") ? Infinity : inheritedIds, handleInherited, { live: true }));
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
    const { window: { webqit: { Observer: Observer2 } } } = env3;
    event.meta.controller?.abort();
    let path2 = (event.detail || "").split(/\/|(?<=\w)(?=#)/g).map((x) => x.trim()).filter((x) => x);
    if (!path2.length)
      return event.respondWith();
    path2 = path2.join(`/${this.configs.HTML_IMPORTS.api.defs}/`)?.split("/").map((x) => x === "*" ? Infinity : x) || [];
    const options = { live: event.live, sig_nal: event.signal, descripted: true };
    event.meta.controller = Observer2.reduce(__privateGet(this, _modules), path2, Observer2.get, (m) => {
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
    const { window: { webqit: { Observer: Observer2 } } } = env3;
    const resolve = () => {
      for (const key of /* @__PURE__ */ new Set([...Object.keys(this.localModules), ...Object.keys(this.inheritedModules), ...Object.keys(__privateGet(this, _modules))])) {
        if (!Observer2.has(this.localModules, key) && !Observer2.has(this.inheritedModules, key)) {
          Observer2.deleteProperty(__privateGet(this, _modules), key);
        } else if (key === "#" && Observer2.has(this.localModules, key) && Observer2.has(this.inheritedModules, key)) {
          Observer2.set(__privateGet(this, _modules), key, [...Observer2.get(this.localModules, key), ...Observer2.get(this.inheritedModules, key)]);
        } else {
          const _module = Observer2.get(this.localModules, key) || Observer2.get(this.inheritedModules, key);
          if (Observer2.get(__privateGet(this, _modules), key) !== _module) {
            Observer2.set(__privateGet(this, _modules), key, _module);
          }
        }
      }
    };
    __privateSet(this, _modules, { ...this.localModules });
    __privateGet(this, _controller1)?.abort();
    __privateSet(this, _controller1, Observer2.observe(this.localModules, () => resolve("local"), { timing: "sync" }));
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
              Observer2.deleteProperty(__privateGet(this, _modules), m.key);
            }
          } else {
            __privateGet(this, _inheritedModules)[m.key] = m.value;
            if (!Reflect.has(this.localModules, m.key) && Reflect.get(__privateGet(this, _modules), m.key) !== m.value) {
              Observer2.set(__privateGet(this, _modules), m.key, m.value);
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
  const { window: window2 } = env3, { webqit: webqit2 } = window2, { realdom, oohtml: { configs } } = webqit2;
  if (webqit2.HTMLImportElement)
    return webqit2.HTMLImportElement;
  const BaseElement = configs.HTML_IMPORTS.elements.import.includes("-") ? window2.HTMLElement : class {
  };
  class HTMLImportElement extends BaseElement {
    static instance(node) {
      if (configs.HTML_IMPORTS.elements.import.includes("-") && node instanceof this)
        return node;
      return _wq2(node).get("import::instance") || new this(node);
    }
    constructor(...args) {
      super();
      const el = args[0] || this;
      _wq2(el).set("import::instance", this);
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
            callback((response instanceof window2.HTMLTemplateElement ? [...response.content.children] : Array.isArray(response) ? response : response && [response]) || []);
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
              _wq2(slottedElement).set("original@imports", originalsMatch.el);
            _wq2(slottedElement).set("slot@imports", this.el);
            priv.slottedElements.add(slottedElement);
          });
          priv.originalsRemapped = true;
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
            _wq2(outgoingNode).delete("slot@imports");
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
      _wq2(anchorNode).set("isAnchorNode", true);
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
          const slottedElementOriginal = _wq2(slottedElement).get("original@imports");
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
          _wq2(slottableElementClone).set("original@imports", slottableElement);
          _wq2(slottableElementClone).set("slot@imports", this.el);
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
  webqit2.HTMLImportElement = HTMLImportElement;
  return HTMLImportElement;
}

// src/html-imports/index.js
function init5($config = {}) {
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
  exposeAPIs4.call(window2, config);
  realtime5.call(window2, config);
}
function getDefs(node, autoCreate = true) {
  if (!_wq2(node).has("defs") && autoCreate) {
    const defs = /* @__PURE__ */ Object.create(null);
    _wq2(node).set("defs", defs);
  }
  return _wq2(node).get("defs");
}
function exposeAPIs4(config) {
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
function realtime5(config) {
  const window2 = this, { webqit: { Observer: Observer2, realdom, oohtml: { configs }, HTMLImportElement, HTMLImportsContext: HTMLImportsContext2 } } = window2;
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
          Observer2.set(ownerContextModulesObj, htmlModule.defId, entry);
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
          Observer2.deleteProperty(ownerContextModulesObj, htmlModule.defId);
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
      if (_wq2(anchorNode).get("isAnchorNode"))
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

// src/context-api/index.js
function init6($config = {}) {
  const { config, window: window2 } = _init.call(this, "context-api", $config, {
    elements: { roots: "root,webflo-embedded" },
    attr: { contextname: "contextname" },
    api: { contexts: "contexts" }
  });
  const waitListMappings = /* @__PURE__ */ new Map(), dispatchEvent = window2.EventTarget.prototype.dispatchEvent;
  Object.defineProperty(window2.EventTarget.prototype, "dispatchEvent", { value: function(...args) {
    const event = args[0], rootNode = this?.closest?.(config.elements.roots) || this.getRootNode?.();
    if (["contextclaim", "contextrequest"].includes(event.type) && rootNode) {
      if (event.meta)
        event.meta.target = this;
      const temp = (event2) => {
        event2.stopImmediatePropagation();
        if (event2.meta)
          event2.meta.target = event2.target;
        if (event2.answered)
          return;
        if (!waitListMappings.get(rootNode))
          waitListMappings.set(rootNode, /* @__PURE__ */ new Set());
        if (event2.type === "contextrequest" && event2.live) {
          waitListMappings.get(rootNode).add(event2);
        } else if (event2.type === "contextclaim") {
          const claims = /* @__PURE__ */ new Set();
          waitListMappings.get(rootNode).forEach((subscriptionEvent) => {
            if (!event2.target.contains(subscriptionEvent.target) || !event2.detail?.matchEvent?.(subscriptionEvent))
              return;
            waitListMappings.get(rootNode).delete(subscriptionEvent);
            claims.add(subscriptionEvent);
          });
          if (!waitListMappings.get(rootNode).size)
            waitListMappings.delete(rootNode);
          return event2.respondWith?.(claims);
        }
      };
      rootNode.addEventListener(event.type, temp);
      const returnValue = dispatchEvent.call(this, ...args);
      rootNode.removeEventListener(event.type, temp);
      return returnValue;
    }
    return dispatchEvent.call(this, ...args);
  } });
  window2.webqit.DOMContexts = DOMContexts;
  window2.webqit.DOMContext = DOMContext;
  window2.webqit.DOMContextRequestEvent = DOMContextRequestEvent_default();
  window2.webqit.DOMContextResponse = DOMContextResponse;
  window2.webqit.DuplicateContextError = DuplicateContextError;
  exposeAPIs5.call(window2, config);
}
function exposeAPIs5(config) {
  const window2 = this;
  [window2.Document.prototype, window2.Element.prototype, window2.ShadowRoot.prototype].forEach((prototype) => {
    const type = prototype === window2.Document.prototype ? "Document" : prototype === window2.ShadowRoot.prototype ? "ShadowRoot" : "Element";
    if (config.api.contexts in prototype) {
      throw new Error(`The ${type} prototype already has a "${config.api.contexts}" API!`);
    }
    Object.defineProperty(prototype, config.api.contexts, { get: function() {
      return DOMContexts.instance(this);
    } });
  });
}

// src/scoped-css/index.js
function init7({ advanced = {}, ...$config }) {
  const { config, window: window2 } = _init.call(this, "scoped-css", $config, {
    api: { styleSheets: "styleSheets" },
    style: { retention: "retain", mimeTypes: "text/css", strategy: null }
  });
  config.styleSelector = (Array.isArray(config.style.mimeTypes) ? config.style.mimeTypes : config.style.mimeTypes.split("|")).concat("").reduce((selector, mm) => {
    const qualifier = mm ? `[type="${window2.CSS.escape(mm)}"]` : ":not([type])";
    return selector.concat(`style${qualifier}`);
  }, []).join(",");
  window2.webqit.oohtml.Style = {
    compileCache: /* @__PURE__ */ new Map()
  };
  exposeAPIs6.call(window2, config);
  realtime6.call(window2, config);
}
function exposeAPIs6(config) {
  const window2 = this, styleSheetsMap = /* @__PURE__ */ new Map();
  [window2.Element.prototype].forEach((prototype) => {
    const type = "Element";
    if (config.api.styleSheets in prototype) {
      throw new Error(`The ${type} prototype already has a "${config.api.styleSheets}" API!`);
    }
    Object.defineProperty(prototype, config.api.styleSheets, { get: function() {
      if (!styleSheetsMap.has(this)) {
        styleSheetsMap.set(this, []);
      }
      return styleSheetsMap.get(this);
    } });
  });
  Object.defineProperty(window2.HTMLStyleElement.prototype, "scoped", {
    configurable: true,
    get() {
      return this.hasAttribute("scoped");
    },
    set(value) {
      this.toggleAttribute("scoped", value);
    }
  });
}
function realtime6(config) {
  const window2 = this, { webqit: { oohtml, realdom } } = window2;
  const inBrowser = Object.getOwnPropertyDescriptor(globalThis, "window")?.get?.toString().includes("[native code]") ?? false;
  if (!window2.CSS.supports) {
    window2.CSS.supports = () => false;
  }
  const handled = /* @__PURE__ */ new WeakSet();
  realdom.realtime(window2.document).query(config.styleSelector, (record) => {
    record.entrants.forEach((style) => {
      if (handled.has(style))
        return;
      handled.add(style);
      const sourceHash = _toHash(style.textContent);
      const supportsHAS = CSS.supports("selector(:has(a,b))");
      const scopeSelector = style.scoped && (supportsHAS ? `:has(> style[rand-${sourceHash}])` : `[rand-${sourceHash}]`);
      const supportsScope = style.scoped && window2.CSSScopeRule && false;
      const scopeRoot = style.scoped && style.parentNode || style.getRootNode();
      if (scopeRoot instanceof window2.Element) {
        scopeRoot[config.api.styleSheets].push(style);
        if (!inBrowser)
          return;
        (supportsHAS ? style : scopeRoot).toggleAttribute(`rand-${sourceHash}`, true);
      }
      if (!inBrowser)
        return;
      if (style.scoped && style.hasAttribute("shared")) {
        let compiledSheet;
        if (!(compiledSheet = oohtml.Style.compileCache.get(sourceHash))) {
          compiledSheet = createAdoptableStylesheet.call(window2, style, null, supportsScope, scopeSelector);
          oohtml.Style.compileCache.set(sourceHash, compiledSheet);
        }
        Object.defineProperty(style, "sheet", { value: compiledSheet, configurable: true });
        style.textContent = "\n/*[ Shared style sheet ]*/\n";
      } else {
        const transform2 = () => {
          const namespaceUUID = getNamespaceUUID(getOwnerNamespaceObject.call(window2, scopeRoot));
          upgradeSheet.call(this, style.sheet, namespaceUUID, !supportsScope && scopeSelector);
        };
        if (style.isConnected) {
          transform2();
        } else {
          setTimeout(() => {
            transform2();
          }, 0);
        }
      }
    });
  }, { id: "scoped-css", live: true, subtree: "cross-roots", timing: "intercept", generation: "entrants" });
}
function createAdoptableStylesheet(style, namespaceUUID, supportsScope, scopeSelector) {
  const window2 = this, textContent = style.textContent;
  let styleSheet, cssText = supportsScope && scopeSelector ? `@scope (${scopeSelector}) {
${textContent.trim()}
}` : textContent.trim();
  try {
    styleSheet = new window2.CSSStyleSheet();
    styleSheet.replaceSync(cssText);
    upgradeSheet.call(this, styleSheet, namespaceUUID, !supportsScope && scopeSelector);
    const adopt = () => style.getRootNode().adoptedStyleSheets.push(styleSheet);
    if (style.isConnected) {
      adopt();
    } else {
      setTimeout(() => {
        adopt();
      }, 0);
    }
  } catch (e) {
    const styleCopy = window2.document.createElement("style");
    style.after(styleCopy);
    styleCopy.textContent = cssText;
    styleSheet = styleCopy.sheet;
    upgradeSheet.call(this, styleSheet, namespaceUUID, !supportsScope && scopeSelector);
  }
  return styleSheet;
}
function upgradeSheet(styleSheet, namespaceUUID, scopeSelector = null) {
  const l = styleSheet?.cssRules.length || -1;
  for (let i = 0; i < l; ++i) {
    const cssRule = styleSheet.cssRules[i];
    if (cssRule instanceof CSSImportRule) {
      continue;
    }
    upgradeRule.call(this, cssRule, namespaceUUID, scopeSelector);
  }
}
function upgradeRule(cssRule, namespaceUUID, scopeSelector = null) {
  if (cssRule instanceof CSSStyleRule) {
    upgradeSelector.call(this, cssRule, namespaceUUID, scopeSelector);
    return;
  }
  if ([window.CSSScopeRule, window.CSSMediaRule, window.CSSContainerRule, window.CSSSupportsRule, window.CSSLayerBlockRule].some((type) => type && cssRule instanceof type)) {
    const l = cssRule.cssRules.length;
    for (let i = 0; i < l; ++i) {
      upgradeRule.call(this, cssRule.cssRules[i], namespaceUUID, scopeSelector);
    }
  }
}
function upgradeSelector(cssRule, namespaceUUID, scopeSelector = null) {
  const newSelectorText = rewriteSelector.call(this, cssRule.selectorText, namespaceUUID, scopeSelector, 1);
  cssRule.selectorText = newSelectorText;
  if (cssRule.cssRules) {
    const l = cssRule.cssRules.length;
    for (let i = 0; i < l; ++i) {
      upgradeSelector.call(this, cssRule.cssRules[i], namespaceUUID);
    }
  }
}

// src/init.js
function init8(UseLive, configs = {}) {
  if (!this.webqit) {
    this.webqit = {};
  }
  Object.assign(this.webqit, UseLive);
  init6.call(this, configs.CONTEXT_API || {});
  init4.call(this, configs.BINDINGS_API || {});
  init5.call(this, { ...configs.HTML_IMPORTS || {}, idleCompilers: [idleCompiler, idleCompiler2] });
  init.call(this, configs.NAMESPACED_HTML || {});
  init3.call(this, configs.DATA_BINDING || {});
  init7.call(this, configs.SCOPED_CSS || {});
  init2.call(this, configs.SCOPED_JS || {});
}

// src/index.lite.js
init8.call(window, index_lite_exports);
//# sourceMappingURL=main.lite.js.map
