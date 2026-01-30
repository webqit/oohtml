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

// node_modules/@webqit/use-live/src/index.js
var src_exports = {};
__export(src_exports, {
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
  parse: () => parse3,
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
  return function eat2(target2, path3, $params, $isSubtree) {
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
      const advance2 = (result2) => {
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
          return eat2(result2, path3, { ...$params, ...flags, keyInParent: result2.key, level: $params.level + 1 }, isSubtree);
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
          advance2(entry);
        }
        return;
      }
      addTrail(result);
      if (isLastSegment) {
        return final(result, ...args);
      }
      return advance2(result);
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
    function exec2(isUpdate, oldValue) {
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
        return exec2(exists);
      if (prop2 === "length" && Array.isArray(originalTarget) && _wq(originalTarget).has("$length")) {
        return exec2(true, _wq(originalTarget).get("$length"));
      }
      const $params = { ...params, withPropertyDescriptors: def };
      return get(originalTarget, prop2, (oldValue) => exec2(exists, oldValue), $params);
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
    function exec2(oldValue) {
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
    return get(originalTarget, prop2, exec2, params);
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

// node_modules/acorn/dist/acorn.mjs
var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938, 6, 4191];
var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var reservedWords = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};
var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
var keywords$1 = {
  5: ecma5AndLessKeywords,
  "5module": ecma5AndLessKeywords + " export import",
  6: ecma5AndLessKeywords + " const class extends export import super"
};
var keywordRelationalOperator = /^in(stanceof)?$/;
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
function isInAstralSet(code, set2) {
  var pos = 65536;
  for (var i = 0; i < set2.length; i += 2) {
    pos += set2[i];
    if (pos > code) {
      return false;
    }
    pos += set2[i + 1];
    if (pos >= code) {
      return true;
    }
  }
  return false;
}
function isIdentifierStart(code, astral) {
  if (code < 65) {
    return code === 36;
  }
  if (code < 91) {
    return true;
  }
  if (code < 97) {
    return code === 95;
  }
  if (code < 123) {
    return true;
  }
  if (code <= 65535) {
    return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
  }
  if (astral === false) {
    return false;
  }
  return isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code, astral) {
  if (code < 48) {
    return code === 36;
  }
  if (code < 58) {
    return true;
  }
  if (code < 65) {
    return false;
  }
  if (code < 91) {
    return true;
  }
  if (code < 97) {
    return code === 95;
  }
  if (code < 123) {
    return true;
  }
  if (code <= 65535) {
    return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
  }
  if (astral === false) {
    return false;
  }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
var TokenType = function TokenType2(label, conf) {
  if (conf === void 0)
    conf = {};
  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};
function binop(name, prec) {
  return new TokenType(name, { beforeExpr: true, binop: prec });
}
var beforeExpr = { beforeExpr: true };
var startsExpr = { startsExpr: true };
var keywords = {};
function kw(name, options) {
  if (options === void 0)
    options = {};
  options.keyword = name;
  return keywords[name] = new TokenType(name, options);
}
var types$1 = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  privateId: new TokenType("privateId", startsExpr),
  eof: new TokenType("eof"),
  bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  questionDot: new TokenType("?."),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
  eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
  assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
  incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
  prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=/===/!==", 6),
  relational: binop("</>/<=/>=", 7),
  bitShift: binop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", { beforeExpr: true }),
  coalesce: binop("??", 1),
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", { isLoop: true, beforeExpr: true }),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", { isLoop: true }),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", { isLoop: true }),
  _with: kw("with"),
  _new: kw("new", { beforeExpr: true, startsExpr: true }),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import", startsExpr),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", { beforeExpr: true, binop: 7 }),
  _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
  _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
  _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
  _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
};
var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");
function isNewLine(code) {
  return code === 10 || code === 13 || code === 8232 || code === 8233;
}
function nextLineBreak(code, from, end) {
  if (end === void 0)
    end = code.length;
  for (var i = from; i < end; i++) {
    var next = code.charCodeAt(i);
    if (isNewLine(next)) {
      return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
    }
  }
  return -1;
}
var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;
var toString = ref.toString;
var hasOwn = Object.hasOwn || function(obj, propName) {
  return hasOwnProperty.call(obj, propName);
};
var isArray = Array.isArray || function(obj) {
  return toString.call(obj) === "[object Array]";
};
function wordsRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
}
function codePointToString(code) {
  if (code <= 65535) {
    return String.fromCharCode(code);
  }
  code -= 65536;
  return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
}
var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
var Position = function Position2(line, col) {
  this.line = line;
  this.column = col;
};
Position.prototype.offset = function offset(n) {
  return new Position(this.line, this.column + n);
};
var SourceLocation = function SourceLocation2(p, start, end) {
  this.start = start;
  this.end = end;
  if (p.sourceFile !== null) {
    this.source = p.sourceFile;
  }
};
function getLineInfo(input, offset2) {
  for (var line = 1, cur = 0; ; ) {
    var nextBreak = nextLineBreak(input, cur, offset2);
    if (nextBreak < 0) {
      return new Position(line, offset2 - cur);
    }
    ++line;
    cur = nextBreak;
  }
}
var defaultOptions = {
  ecmaVersion: null,
  sourceType: "script",
  onInsertedSemicolon: null,
  onTrailingComma: null,
  allowReserved: null,
  allowReturnOutsideFunction: false,
  allowImportExportEverywhere: false,
  allowAwaitOutsideFunction: null,
  allowSuperOutsideMethod: null,
  allowHashBang: false,
  locations: false,
  onToken: null,
  onComment: null,
  ranges: false,
  program: null,
  sourceFile: null,
  directSourceFile: null,
  preserveParens: false
};
var warnedAboutEcmaVersion = false;
function getOptions(opts) {
  var options = {};
  for (var opt in defaultOptions) {
    options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
  }
  if (options.ecmaVersion === "latest") {
    options.ecmaVersion = 1e8;
  } else if (options.ecmaVersion == null) {
    if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
      warnedAboutEcmaVersion = true;
      console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
    }
    options.ecmaVersion = 11;
  } else if (options.ecmaVersion >= 2015) {
    options.ecmaVersion -= 2009;
  }
  if (options.allowReserved == null) {
    options.allowReserved = options.ecmaVersion < 5;
  }
  if (!opts || opts.allowHashBang == null) {
    options.allowHashBang = options.ecmaVersion >= 14;
  }
  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function(token) {
      return tokens.push(token);
    };
  }
  if (isArray(options.onComment)) {
    options.onComment = pushComment(options, options.onComment);
  }
  return options;
}
function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start,
      end
    };
    if (options.locations) {
      comment.loc = new SourceLocation(this, startLoc, endLoc);
    }
    if (options.ranges) {
      comment.range = [start, end];
    }
    array.push(comment);
  };
}
var SCOPE_TOP = 1;
var SCOPE_FUNCTION = 2;
var SCOPE_ASYNC = 4;
var SCOPE_GENERATOR = 8;
var SCOPE_ARROW = 16;
var SCOPE_SIMPLE_CATCH = 32;
var SCOPE_SUPER = 64;
var SCOPE_DIRECT_SUPER = 128;
var SCOPE_CLASS_STATIC_BLOCK = 256;
var SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
}
var BIND_NONE = 0;
var BIND_VAR = 1;
var BIND_LEXICAL = 2;
var BIND_FUNCTION = 3;
var BIND_SIMPLE_CATCH = 4;
var BIND_OUTSIDE = 5;
var Parser = function Parser2(options, input, startPos) {
  this.options = options = getOptions(options);
  this.sourceFile = options.sourceFile;
  this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
  var reserved = "";
  if (options.allowReserved !== true) {
    reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
    if (options.sourceType === "module") {
      reserved += " await";
    }
  }
  this.reservedWords = wordsRegexp(reserved);
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
  this.reservedWordsStrict = wordsRegexp(reservedStrict);
  this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
  this.input = String(input);
  this.containsEsc = false;
  if (startPos) {
    this.pos = startPos;
    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
  } else {
    this.pos = this.lineStart = 0;
    this.curLine = 1;
  }
  this.type = types$1.eof;
  this.value = null;
  this.start = this.end = this.pos;
  this.startLoc = this.endLoc = this.curPosition();
  this.lastTokEndLoc = this.lastTokStartLoc = null;
  this.lastTokStart = this.lastTokEnd = this.pos;
  this.context = this.initialContext();
  this.exprAllowed = true;
  this.inModule = options.sourceType === "module";
  this.strict = this.inModule || this.strictDirective(this.pos);
  this.potentialArrowAt = -1;
  this.potentialArrowInForAwait = false;
  this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
  this.labels = [];
  this.undefinedExports = /* @__PURE__ */ Object.create(null);
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
    this.skipLineComment(2);
  }
  this.scopeStack = [];
  this.enterScope(SCOPE_TOP);
  this.regexpState = null;
  this.privateNameStack = [];
};
var prototypeAccessors = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, inClassStaticBlock: { configurable: true } };
Parser.prototype.parse = function parse() {
  var node = this.options.program || this.startNode();
  this.nextToken();
  return this.parseTopLevel(node);
};
prototypeAccessors.inFunction.get = function() {
  return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
};
prototypeAccessors.inGenerator.get = function() {
  return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 && !this.currentVarScope().inClassFieldInit;
};
prototypeAccessors.inAsync.get = function() {
  return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 && !this.currentVarScope().inClassFieldInit;
};
prototypeAccessors.canAwait.get = function() {
  for (var i = this.scopeStack.length - 1; i >= 0; i--) {
    var scope = this.scopeStack[i];
    if (scope.inClassFieldInit || scope.flags & SCOPE_CLASS_STATIC_BLOCK) {
      return false;
    }
    if (scope.flags & SCOPE_FUNCTION) {
      return (scope.flags & SCOPE_ASYNC) > 0;
    }
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
prototypeAccessors.allowSuper.get = function() {
  var ref2 = this.currentThisScope();
  var flags = ref2.flags;
  var inClassFieldInit = ref2.inClassFieldInit;
  return (flags & SCOPE_SUPER) > 0 || inClassFieldInit || this.options.allowSuperOutsideMethod;
};
prototypeAccessors.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
};
prototypeAccessors.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
prototypeAccessors.allowNewDotTarget.get = function() {
  var ref2 = this.currentThisScope();
  var flags = ref2.flags;
  var inClassFieldInit = ref2.inClassFieldInit;
  return (flags & (SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK)) > 0 || inClassFieldInit;
};
prototypeAccessors.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
};
Parser.extend = function extend() {
  var plugins = [], len = arguments.length;
  while (len--)
    plugins[len] = arguments[len];
  var cls = this;
  for (var i = 0; i < plugins.length; i++) {
    cls = plugins[i](cls);
  }
  return cls;
};
Parser.parse = function parse2(input, options) {
  return new this(options, input).parse();
};
Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
  var parser = new this(options, input, pos);
  parser.nextToken();
  return parser.parseExpression();
};
Parser.tokenizer = function tokenizer(input, options) {
  return new this(options, input);
};
Object.defineProperties(Parser.prototype, prototypeAccessors);
var pp$9 = Parser.prototype;
var literal = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
pp$9.strictDirective = function(start) {
  if (this.options.ecmaVersion < 5) {
    return false;
  }
  for (; ; ) {
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this.input)[0].length;
    var match = literal.exec(this.input.slice(start));
    if (!match) {
      return false;
    }
    if ((match[1] || match[2]) === "use strict") {
      skipWhiteSpace.lastIndex = start + match[0].length;
      var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
      var next = this.input.charAt(end);
      return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
    }
    start += match[0].length;
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this.input)[0].length;
    if (this.input[start] === ";") {
      start++;
    }
  }
};
pp$9.eat = function(type) {
  if (this.type === type) {
    this.next();
    return true;
  } else {
    return false;
  }
};
pp$9.isContextual = function(name) {
  return this.type === types$1.name && this.value === name && !this.containsEsc;
};
pp$9.eatContextual = function(name) {
  if (!this.isContextual(name)) {
    return false;
  }
  this.next();
  return true;
};
pp$9.expectContextual = function(name) {
  if (!this.eatContextual(name)) {
    this.unexpected();
  }
};
pp$9.canInsertSemicolon = function() {
  return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
};
pp$9.insertSemicolon = function() {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon) {
      this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
    }
    return true;
  }
};
pp$9.semicolon = function() {
  if (!this.eat(types$1.semi) && !this.insertSemicolon()) {
    this.unexpected();
  }
};
pp$9.afterTrailingComma = function(tokType, notNext) {
  if (this.type === tokType) {
    if (this.options.onTrailingComma) {
      this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
    }
    if (!notNext) {
      this.next();
    }
    return true;
  }
};
pp$9.expect = function(type) {
  this.eat(type) || this.unexpected();
};
pp$9.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};
var DestructuringErrors = function DestructuringErrors2() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) {
    return;
  }
  if (refDestructuringErrors.trailingComma > -1) {
    this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
  }
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
  if (parens > -1) {
    this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
  if (!refDestructuringErrors) {
    return false;
  }
  var shorthandAssign = refDestructuringErrors.shorthandAssign;
  var doubleProto = refDestructuringErrors.doubleProto;
  if (!andThrow) {
    return shorthandAssign >= 0 || doubleProto >= 0;
  }
  if (shorthandAssign >= 0) {
    this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
  }
  if (doubleProto >= 0) {
    this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
  }
};
pp$9.checkYieldAwaitInDefaultParams = function() {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
    this.raise(this.yieldPos, "Yield expression cannot be a default value");
  }
  if (this.awaitPos) {
    this.raise(this.awaitPos, "Await expression cannot be a default value");
  }
};
pp$9.isSimpleAssignTarget = function(expr) {
  if (expr.type === "ParenthesizedExpression") {
    return this.isSimpleAssignTarget(expr.expression);
  }
  return expr.type === "Identifier" || expr.type === "MemberExpression";
};
var pp$8 = Parser.prototype;
pp$8.parseTopLevel = function(node) {
  var exports = /* @__PURE__ */ Object.create(null);
  if (!node.body) {
    node.body = [];
  }
  while (this.type !== types$1.eof) {
    var stmt = this.parseStatement(null, true, exports);
    node.body.push(stmt);
  }
  if (this.inModule) {
    for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1) {
      var name = list[i];
      this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
    }
  }
  this.adaptDirectivePrologue(node.body);
  this.next();
  node.sourceType = this.options.sourceType;
  return this.finishNode(node, "Program");
};
var loopLabel = { kind: "loop" };
var switchLabel = { kind: "switch" };
pp$8.isLet = function(context) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
    return false;
  }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
  if (nextCh === 91 || nextCh === 92) {
    return true;
  }
  if (context) {
    return false;
  }
  if (nextCh === 123 || nextCh > 55295 && nextCh < 56320) {
    return true;
  }
  if (isIdentifierStart(nextCh, true)) {
    var pos = next + 1;
    while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true)) {
      ++pos;
    }
    if (nextCh === 92 || nextCh > 55295 && nextCh < 56320) {
      return true;
    }
    var ident = this.input.slice(next, pos);
    if (!keywordRelationalOperator.test(ident)) {
      return true;
    }
  }
  return false;
};
pp$8.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
    return false;
  }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, after2;
  return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after2 = this.input.charCodeAt(next + 8)) || after2 > 55295 && after2 < 56320));
};
pp$8.parseStatement = function(context, topLevel, exports) {
  var starttype = this.type, node = this.startNode(), kind;
  if (this.isLet(context)) {
    starttype = types$1._var;
    kind = "let";
  }
  switch (starttype) {
    case types$1._break:
    case types$1._continue:
      return this.parseBreakContinueStatement(node, starttype.keyword);
    case types$1._debugger:
      return this.parseDebuggerStatement(node);
    case types$1._do:
      return this.parseDoStatement(node);
    case types$1._for:
      return this.parseForStatement(node);
    case types$1._function:
      if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
        this.unexpected();
      }
      return this.parseFunctionStatement(node, false, !context);
    case types$1._class:
      if (context) {
        this.unexpected();
      }
      return this.parseClass(node, true);
    case types$1._if:
      return this.parseIfStatement(node);
    case types$1._return:
      return this.parseReturnStatement(node);
    case types$1._switch:
      return this.parseSwitchStatement(node);
    case types$1._throw:
      return this.parseThrowStatement(node);
    case types$1._try:
      return this.parseTryStatement(node);
    case types$1._const:
    case types$1._var:
      kind = kind || this.value;
      if (context && kind !== "var") {
        this.unexpected();
      }
      return this.parseVarStatement(node, kind);
    case types$1._while:
      return this.parseWhileStatement(node);
    case types$1._with:
      return this.parseWithStatement(node);
    case types$1.braceL:
      return this.parseBlock(true, node);
    case types$1.semi:
      return this.parseEmptyStatement(node);
    case types$1._export:
    case types$1._import:
      if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
        skipWhiteSpace.lastIndex = this.pos;
        var skip = skipWhiteSpace.exec(this.input);
        var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
        if (nextCh === 40 || nextCh === 46) {
          return this.parseExpressionStatement(node, this.parseExpression());
        }
      }
      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel) {
          this.raise(this.start, "'import' and 'export' may only appear at the top level");
        }
        if (!this.inModule) {
          this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
        }
      }
      return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports);
    default:
      if (this.isAsyncFunction()) {
        if (context) {
          this.unexpected();
        }
        this.next();
        return this.parseFunctionStatement(node, true, !context);
      }
      var maybeName = this.value, expr = this.parseExpression();
      if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
        return this.parseLabeledStatement(node, maybeName, expr, context);
      } else {
        return this.parseExpressionStatement(node, expr);
      }
  }
};
pp$8.parseBreakContinueStatement = function(node, keyword) {
  var isBreak = keyword === "break";
  this.next();
  if (this.eat(types$1.semi) || this.insertSemicolon()) {
    node.label = null;
  } else if (this.type !== types$1.name) {
    this.unexpected();
  } else {
    node.label = this.parseIdent();
    this.semicolon();
  }
  var i = 0;
  for (; i < this.labels.length; ++i) {
    var lab = this.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) {
        break;
      }
      if (node.label && isBreak) {
        break;
      }
    }
  }
  if (i === this.labels.length) {
    this.raise(node.start, "Unsyntactic " + keyword);
  }
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
};
pp$8.parseDebuggerStatement = function(node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement");
};
pp$8.parseDoStatement = function(node) {
  this.next();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("do");
  this.labels.pop();
  this.expect(types$1._while);
  node.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6) {
    this.eat(types$1.semi);
  } else {
    this.semicolon();
  }
  return this.finishNode(node, "DoWhileStatement");
};
pp$8.parseForStatement = function(node) {
  this.next();
  var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  this.labels.push(loopLabel);
  this.enterScope(0);
  this.expect(types$1.parenL);
  if (this.type === types$1.semi) {
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node, null);
  }
  var isLet = this.isLet();
  if (this.type === types$1._var || this.type === types$1._const || isLet) {
    var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
    this.next();
    this.parseVar(init$1, true, kind);
    this.finishNode(init$1, "VariableDeclaration");
    if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types$1._in) {
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
        } else {
          node.await = awaitAt > -1;
        }
      }
      return this.parseForIn(node, init$1);
    }
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node, init$1);
  }
  var startsWithLet = this.isContextual("let"), isForOf = false;
  var refDestructuringErrors = new DestructuringErrors();
  var init9 = this.parseExpression(awaitAt > -1 ? "await" : true, refDestructuringErrors);
  if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
    if (this.options.ecmaVersion >= 9) {
      if (this.type === types$1._in) {
        if (awaitAt > -1) {
          this.unexpected(awaitAt);
        }
      } else {
        node.await = awaitAt > -1;
      }
    }
    if (startsWithLet && isForOf) {
      this.raise(init9.start, "The left-hand side of a for-of loop may not start with 'let'.");
    }
    this.toAssignable(init9, false, refDestructuringErrors);
    this.checkLValPattern(init9);
    return this.parseForIn(node, init9);
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  if (awaitAt > -1) {
    this.unexpected(awaitAt);
  }
  return this.parseFor(node, init9);
};
pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
  this.next();
  return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
};
pp$8.parseIfStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  node.consequent = this.parseStatement("if");
  node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
  return this.finishNode(node, "IfStatement");
};
pp$8.parseReturnStatement = function(node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
    this.raise(this.start, "'return' outside of function");
  }
  this.next();
  if (this.eat(types$1.semi) || this.insertSemicolon()) {
    node.argument = null;
  } else {
    node.argument = this.parseExpression();
    this.semicolon();
  }
  return this.finishNode(node, "ReturnStatement");
};
pp$8.parseSwitchStatement = function(node) {
  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(types$1.braceL);
  this.labels.push(switchLabel);
  this.enterScope(0);
  var cur;
  for (var sawDefault = false; this.type !== types$1.braceR; ) {
    if (this.type === types$1._case || this.type === types$1._default) {
      var isCase = this.type === types$1._case;
      if (cur) {
        this.finishNode(cur, "SwitchCase");
      }
      node.cases.push(cur = this.startNode());
      cur.consequent = [];
      this.next();
      if (isCase) {
        cur.test = this.parseExpression();
      } else {
        if (sawDefault) {
          this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
        }
        sawDefault = true;
        cur.test = null;
      }
      this.expect(types$1.colon);
    } else {
      if (!cur) {
        this.unexpected();
      }
      cur.consequent.push(this.parseStatement(null));
    }
  }
  this.exitScope();
  if (cur) {
    this.finishNode(cur, "SwitchCase");
  }
  this.next();
  this.labels.pop();
  return this.finishNode(node, "SwitchStatement");
};
pp$8.parseThrowStatement = function(node) {
  this.next();
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
    this.raise(this.lastTokEnd, "Illegal newline after throw");
  }
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement");
};
var empty$1 = [];
pp$8.parseTryStatement = function(node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.type === types$1._catch) {
    var clause = this.startNode();
    this.next();
    if (this.eat(types$1.parenL)) {
      clause.param = this.parseBindingAtom();
      var simple = clause.param.type === "Identifier";
      this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
      this.checkLValPattern(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
      this.expect(types$1.parenR);
    } else {
      if (this.options.ecmaVersion < 10) {
        this.unexpected();
      }
      clause.param = null;
      this.enterScope(0);
    }
    clause.body = this.parseBlock(false);
    this.exitScope();
    node.handler = this.finishNode(clause, "CatchClause");
  }
  node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
  if (!node.handler && !node.finalizer) {
    this.raise(node.start, "Missing catch or finally clause");
  }
  return this.finishNode(node, "TryStatement");
};
pp$8.parseVarStatement = function(node, kind) {
  this.next();
  this.parseVar(node, false, kind);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration");
};
pp$8.parseWhileStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("while");
  this.labels.pop();
  return this.finishNode(node, "WhileStatement");
};
pp$8.parseWithStatement = function(node) {
  if (this.strict) {
    this.raise(this.start, "'with' in strict mode");
  }
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement("with");
  return this.finishNode(node, "WithStatement");
};
pp$8.parseEmptyStatement = function(node) {
  this.next();
  return this.finishNode(node, "EmptyStatement");
};
pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
  for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1) {
    var label = list[i$1];
    if (label.name === maybeName) {
      this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    }
  }
  var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
  for (var i = this.labels.length - 1; i >= 0; i--) {
    var label$1 = this.labels[i];
    if (label$1.statementStart === node.start) {
      label$1.statementStart = this.start;
      label$1.kind = kind;
    } else {
      break;
    }
  }
  this.labels.push({ name: maybeName, kind, statementStart: this.start });
  node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
  this.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement");
};
pp$8.parseExpressionStatement = function(node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement");
};
pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
  if (createNewLexicalScope === void 0)
    createNewLexicalScope = true;
  if (node === void 0)
    node = this.startNode();
  node.body = [];
  this.expect(types$1.braceL);
  if (createNewLexicalScope) {
    this.enterScope(0);
  }
  while (this.type !== types$1.braceR) {
    var stmt = this.parseStatement(null);
    node.body.push(stmt);
  }
  if (exitStrict) {
    this.strict = false;
  }
  this.next();
  if (createNewLexicalScope) {
    this.exitScope();
  }
  return this.finishNode(node, "BlockStatement");
};
pp$8.parseFor = function(node, init9) {
  node.init = init9;
  this.expect(types$1.semi);
  node.test = this.type === types$1.semi ? null : this.parseExpression();
  this.expect(types$1.semi);
  node.update = this.type === types$1.parenR ? null : this.parseExpression();
  this.expect(types$1.parenR);
  node.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node, "ForStatement");
};
pp$8.parseForIn = function(node, init9) {
  var isForIn = this.type === types$1._in;
  this.next();
  if (init9.type === "VariableDeclaration" && init9.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init9.kind !== "var" || init9.declarations[0].id.type !== "Identifier")) {
    this.raise(init9.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer");
  }
  node.left = init9;
  node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
  this.expect(types$1.parenR);
  node.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
};
pp$8.parseVar = function(node, isFor, kind) {
  node.declarations = [];
  node.kind = kind;
  for (; ; ) {
    var decl = this.startNode();
    this.parseVarId(decl, kind);
    if (this.eat(types$1.eq)) {
      decl.init = this.parseMaybeAssign(isFor);
    } else if (kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      this.unexpected();
    } else if (decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
      this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(types$1.comma)) {
      break;
    }
  }
  return node;
};
pp$8.parseVarId = function(decl, kind) {
  decl.id = this.parseBindingAtom();
  this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
};
var FUNC_STATEMENT = 1;
var FUNC_HANGING_STATEMENT = 2;
var FUNC_NULLABLE_ID = 4;
pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
    if (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT) {
      this.unexpected();
    }
    node.generator = this.eat(types$1.star);
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  if (statement & FUNC_STATEMENT) {
    node.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent();
    if (node.id && !(statement & FUNC_HANGING_STATEMENT)) {
      this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
    }
  }
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(node.async, node.generator));
  if (!(statement & FUNC_STATEMENT)) {
    node.id = this.type === types$1.name ? this.parseIdent() : null;
  }
  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody, false, forInit);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
};
pp$8.parseFunctionParams = function(node) {
  this.expect(types$1.parenL);
  node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
};
pp$8.parseClass = function(node, isStatement) {
  this.next();
  var oldStrict = this.strict;
  this.strict = true;
  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var privateNameMap = this.enterClassBody();
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(types$1.braceL);
  while (this.type !== types$1.braceR) {
    var element = this.parseClassElement(node.superClass !== null);
    if (element) {
      classBody.body.push(element);
      if (element.type === "MethodDefinition" && element.kind === "constructor") {
        if (hadConstructor) {
          this.raise(element.start, "Duplicate constructor in the same class");
        }
        hadConstructor = true;
      } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
        this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
      }
    }
  }
  this.strict = oldStrict;
  this.next();
  node.body = this.finishNode(classBody, "ClassBody");
  this.exitClassBody();
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
};
pp$8.parseClassElement = function(constructorAllowsSuper) {
  if (this.eat(types$1.semi)) {
    return null;
  }
  var ecmaVersion = this.options.ecmaVersion;
  var node = this.startNode();
  var keyName = "";
  var isGenerator = false;
  var isAsync = false;
  var kind = "method";
  var isStatic = false;
  if (this.eatContextual("static")) {
    if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
      this.parseClassStaticBlock(node);
      return node;
    }
    if (this.isClassElementNameStart() || this.type === types$1.star) {
      isStatic = true;
    } else {
      keyName = "static";
    }
  }
  node.static = isStatic;
  if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
    if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
      isAsync = true;
    } else {
      keyName = "async";
    }
  }
  if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
    isGenerator = true;
  }
  if (!keyName && !isAsync && !isGenerator) {
    var lastValue = this.value;
    if (this.eatContextual("get") || this.eatContextual("set")) {
      if (this.isClassElementNameStart()) {
        kind = lastValue;
      } else {
        keyName = lastValue;
      }
    }
  }
  if (keyName) {
    node.computed = false;
    node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
    node.key.name = keyName;
    this.finishNode(node.key, "Identifier");
  } else {
    this.parseClassElementName(node);
  }
  if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
    var isConstructor = !node.static && checkKeyName(node, "constructor");
    var allowsDirectSuper = isConstructor && constructorAllowsSuper;
    if (isConstructor && kind !== "method") {
      this.raise(node.key.start, "Constructor can't have get/set modifier");
    }
    node.kind = isConstructor ? "constructor" : kind;
    this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
  } else {
    this.parseClassField(node);
  }
  return node;
};
pp$8.isClassElementNameStart = function() {
  return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
};
pp$8.parseClassElementName = function(element) {
  if (this.type === types$1.privateId) {
    if (this.value === "constructor") {
      this.raise(this.start, "Classes can't have an element named '#constructor'");
    }
    element.computed = false;
    element.key = this.parsePrivateIdent();
  } else {
    this.parsePropertyName(element);
  }
};
pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
  var key = method.key;
  if (method.kind === "constructor") {
    if (isGenerator) {
      this.raise(key.start, "Constructor can't be a generator");
    }
    if (isAsync) {
      this.raise(key.start, "Constructor can't be an async method");
    }
  } else if (method.static && checkKeyName(method, "prototype")) {
    this.raise(key.start, "Classes may not have a static property named prototype");
  }
  var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
  if (method.kind === "get" && value.params.length !== 0) {
    this.raiseRecoverable(value.start, "getter should have no params");
  }
  if (method.kind === "set" && value.params.length !== 1) {
    this.raiseRecoverable(value.start, "setter should have exactly one param");
  }
  if (method.kind === "set" && value.params[0].type === "RestElement") {
    this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params");
  }
  return this.finishNode(method, "MethodDefinition");
};
pp$8.parseClassField = function(field) {
  if (checkKeyName(field, "constructor")) {
    this.raise(field.key.start, "Classes can't have a field named 'constructor'");
  } else if (field.static && checkKeyName(field, "prototype")) {
    this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
  }
  if (this.eat(types$1.eq)) {
    var scope = this.currentThisScope();
    var inClassFieldInit = scope.inClassFieldInit;
    scope.inClassFieldInit = true;
    field.value = this.parseMaybeAssign();
    scope.inClassFieldInit = inClassFieldInit;
  } else {
    field.value = null;
  }
  this.semicolon();
  return this.finishNode(field, "PropertyDefinition");
};
pp$8.parseClassStaticBlock = function(node) {
  node.body = [];
  var oldLabels = this.labels;
  this.labels = [];
  this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
  while (this.type !== types$1.braceR) {
    var stmt = this.parseStatement(null);
    node.body.push(stmt);
  }
  this.next();
  this.exitScope();
  this.labels = oldLabels;
  return this.finishNode(node, "StaticBlock");
};
pp$8.parseClassId = function(node, isStatement) {
  if (this.type === types$1.name) {
    node.id = this.parseIdent();
    if (isStatement) {
      this.checkLValSimple(node.id, BIND_LEXICAL, false);
    }
  } else {
    if (isStatement === true) {
      this.unexpected();
    }
    node.id = null;
  }
};
pp$8.parseClassSuper = function(node) {
  node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
};
pp$8.enterClassBody = function() {
  var element = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  this.privateNameStack.push(element);
  return element.declared;
};
pp$8.exitClassBody = function() {
  var ref2 = this.privateNameStack.pop();
  var declared = ref2.declared;
  var used = ref2.used;
  var len = this.privateNameStack.length;
  var parent = len === 0 ? null : this.privateNameStack[len - 1];
  for (var i = 0; i < used.length; ++i) {
    var id = used[i];
    if (!hasOwn(declared, id.name)) {
      if (parent) {
        parent.used.push(id);
      } else {
        this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
      }
    }
  }
};
function isPrivateNameConflicted(privateNameMap, element) {
  var name = element.key.name;
  var curr = privateNameMap[name];
  var next = "true";
  if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
    next = (element.static ? "s" : "i") + element.kind;
  }
  if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
    privateNameMap[name] = "true";
    return false;
  } else if (!curr) {
    privateNameMap[name] = next;
    return false;
  } else {
    return true;
  }
}
function checkKeyName(node, name) {
  var computed = node.computed;
  var key = node.key;
  return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
}
pp$8.parseExport = function(node, exports) {
  this.next();
  if (this.eat(types$1.star)) {
    if (this.options.ecmaVersion >= 11) {
      if (this.eatContextual("as")) {
        node.exported = this.parseModuleExportName();
        this.checkExport(exports, node.exported, this.lastTokStart);
      } else {
        node.exported = null;
      }
    }
    this.expectContextual("from");
    if (this.type !== types$1.string) {
      this.unexpected();
    }
    node.source = this.parseExprAtom();
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration");
  }
  if (this.eat(types$1._default)) {
    this.checkExport(exports, "default", this.lastTokStart);
    var isAsync;
    if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) {
        this.next();
      }
      node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
    } else if (this.type === types$1._class) {
      var cNode = this.startNode();
      node.declaration = this.parseClass(cNode, "nullableID");
    } else {
      node.declaration = this.parseMaybeAssign();
      this.semicolon();
    }
    return this.finishNode(node, "ExportDefaultDeclaration");
  }
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseStatement(null);
    if (node.declaration.type === "VariableDeclaration") {
      this.checkVariableExport(exports, node.declaration.declarations);
    } else {
      this.checkExport(exports, node.declaration.id, node.declaration.id.start);
    }
    node.specifiers = [];
    node.source = null;
  } else {
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers(exports);
    if (this.eatContextual("from")) {
      if (this.type !== types$1.string) {
        this.unexpected();
      }
      node.source = this.parseExprAtom();
    } else {
      for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
        var spec = list[i];
        this.checkUnreserved(spec.local);
        this.checkLocalExport(spec.local);
        if (spec.local.type === "Literal") {
          this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
        }
      }
      node.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration");
};
pp$8.checkExport = function(exports, name, pos) {
  if (!exports) {
    return;
  }
  if (typeof name !== "string") {
    name = name.type === "Identifier" ? name.name : name.value;
  }
  if (hasOwn(exports, name)) {
    this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
  }
  exports[name] = true;
};
pp$8.checkPatternExport = function(exports, pat) {
  var type = pat.type;
  if (type === "Identifier") {
    this.checkExport(exports, pat, pat.start);
  } else if (type === "ObjectPattern") {
    for (var i = 0, list = pat.properties; i < list.length; i += 1) {
      var prop = list[i];
      this.checkPatternExport(exports, prop);
    }
  } else if (type === "ArrayPattern") {
    for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
      var elt = list$1[i$1];
      if (elt) {
        this.checkPatternExport(exports, elt);
      }
    }
  } else if (type === "Property") {
    this.checkPatternExport(exports, pat.value);
  } else if (type === "AssignmentPattern") {
    this.checkPatternExport(exports, pat.left);
  } else if (type === "RestElement") {
    this.checkPatternExport(exports, pat.argument);
  } else if (type === "ParenthesizedExpression") {
    this.checkPatternExport(exports, pat.expression);
  }
};
pp$8.checkVariableExport = function(exports, decls) {
  if (!exports) {
    return;
  }
  for (var i = 0, list = decls; i < list.length; i += 1) {
    var decl = list[i];
    this.checkPatternExport(exports, decl.id);
  }
};
pp$8.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
pp$8.parseExportSpecifiers = function(exports) {
  var nodes = [], first = true;
  this.expect(types$1.braceL);
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    var node = this.startNode();
    node.local = this.parseModuleExportName();
    node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
    this.checkExport(exports, node.exported, node.exported.start);
    nodes.push(this.finishNode(node, "ExportSpecifier"));
  }
  return nodes;
};
pp$8.parseImport = function(node) {
  this.next();
  if (this.type === types$1.string) {
    node.specifiers = empty$1;
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};
pp$8.parseImportSpecifiers = function() {
  var nodes = [], first = true;
  if (this.type === types$1.name) {
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
    if (!this.eat(types$1.comma)) {
      return nodes;
    }
  }
  if (this.type === types$1.star) {
    var node$1 = this.startNode();
    this.next();
    this.expectContextual("as");
    node$1.local = this.parseIdent();
    this.checkLValSimple(node$1.local, BIND_LEXICAL);
    nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
    return nodes;
  }
  this.expect(types$1.braceL);
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    var node$2 = this.startNode();
    node$2.imported = this.parseModuleExportName();
    if (this.eatContextual("as")) {
      node$2.local = this.parseIdent();
    } else {
      this.checkUnreserved(node$2.imported);
      node$2.local = node$2.imported;
    }
    this.checkLValSimple(node$2.local, BIND_LEXICAL);
    nodes.push(this.finishNode(node$2, "ImportSpecifier"));
  }
  return nodes;
};
pp$8.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
    var stringLiteral = this.parseLiteral(this.value);
    if (loneSurrogate.test(stringLiteral.value)) {
      this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
    }
    return stringLiteral;
  }
  return this.parseIdent(true);
};
pp$8.adaptDirectivePrologue = function(statements) {
  for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
    statements[i].directive = statements[i].expression.raw.slice(1, -1);
  }
};
pp$8.isDirectiveCandidate = function(statement) {
  return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && (this.input[statement.start] === '"' || this.input[statement.start] === "'");
};
var pp$7 = Parser.prototype;
pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
      case "Identifier":
        if (this.inAsync && node.name === "await") {
          this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
        }
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        node.type = "ObjectPattern";
        if (refDestructuringErrors) {
          this.checkPatternErrors(refDestructuringErrors, true);
        }
        for (var i = 0, list = node.properties; i < list.length; i += 1) {
          var prop = list[i];
          this.toAssignable(prop, isBinding);
          if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
            this.raise(prop.argument.start, "Unexpected token");
          }
        }
        break;
      case "Property":
        if (node.kind !== "init") {
          this.raise(node.key.start, "Object pattern can't contain getter or setter");
        }
        this.toAssignable(node.value, isBinding);
        break;
      case "ArrayExpression":
        node.type = "ArrayPattern";
        if (refDestructuringErrors) {
          this.checkPatternErrors(refDestructuringErrors, true);
        }
        this.toAssignableList(node.elements, isBinding);
        break;
      case "SpreadElement":
        node.type = "RestElement";
        this.toAssignable(node.argument, isBinding);
        if (node.argument.type === "AssignmentPattern") {
          this.raise(node.argument.start, "Rest elements cannot have a default value");
        }
        break;
      case "AssignmentExpression":
        if (node.operator !== "=") {
          this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
        }
        node.type = "AssignmentPattern";
        delete node.operator;
        this.toAssignable(node.left, isBinding);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(node.expression, isBinding, refDestructuringErrors);
        break;
      case "ChainExpression":
        this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!isBinding) {
          break;
        }
      default:
        this.raise(node.start, "Assigning to rvalue");
    }
  } else if (refDestructuringErrors) {
    this.checkPatternErrors(refDestructuringErrors, true);
  }
  return node;
};
pp$7.toAssignableList = function(exprList, isBinding) {
  var end = exprList.length;
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) {
      this.toAssignable(elt, isBinding);
    }
  }
  if (end) {
    var last = exprList[end - 1];
    if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
      this.unexpected(last.argument.start);
    }
  }
  return exprList;
};
pp$7.parseSpread = function(refDestructuringErrors) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
  return this.finishNode(node, "SpreadElement");
};
pp$7.parseRestBinding = function() {
  var node = this.startNode();
  this.next();
  if (this.options.ecmaVersion === 6 && this.type !== types$1.name) {
    this.unexpected();
  }
  node.argument = this.parseBindingAtom();
  return this.finishNode(node, "RestElement");
};
pp$7.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6) {
    switch (this.type) {
      case types$1.bracketL:
        var node = this.startNode();
        this.next();
        node.elements = this.parseBindingList(types$1.bracketR, true, true);
        return this.finishNode(node, "ArrayPattern");
      case types$1.braceL:
        return this.parseObj(true);
    }
  }
  return this.parseIdent();
};
pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (first) {
      first = false;
    } else {
      this.expect(types$1.comma);
    }
    if (allowEmpty && this.type === types$1.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this.afterTrailingComma(close)) {
      break;
    } else if (this.type === types$1.ellipsis) {
      var rest = this.parseRestBinding();
      this.parseBindingListItem(rest);
      elts.push(rest);
      if (this.type === types$1.comma) {
        this.raise(this.start, "Comma is not permitted after the rest element");
      }
      this.expect(close);
      break;
    } else {
      var elem = this.parseMaybeDefault(this.start, this.startLoc);
      this.parseBindingListItem(elem);
      elts.push(elem);
    }
  }
  return elts;
};
pp$7.parseBindingListItem = function(param) {
  return param;
};
pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) {
    return left;
  }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern");
};
pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
  if (bindingType === void 0)
    bindingType = BIND_NONE;
  var isBind = bindingType !== BIND_NONE;
  switch (expr.type) {
    case "Identifier":
      if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
        this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
      }
      if (isBind) {
        if (bindingType === BIND_LEXICAL && expr.name === "let") {
          this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
        }
        if (checkClashes) {
          if (hasOwn(checkClashes, expr.name)) {
            this.raiseRecoverable(expr.start, "Argument name clash");
          }
          checkClashes[expr.name] = true;
        }
        if (bindingType !== BIND_OUTSIDE) {
          this.declareName(expr.name, bindingType, expr.start);
        }
      }
      break;
    case "ChainExpression":
      this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      if (isBind) {
        this.raiseRecoverable(expr.start, "Binding member expression");
      }
      break;
    case "ParenthesizedExpression":
      if (isBind) {
        this.raiseRecoverable(expr.start, "Binding parenthesized expression");
      }
      return this.checkLValSimple(expr.expression, bindingType, checkClashes);
    default:
      this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
  }
};
pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
  if (bindingType === void 0)
    bindingType = BIND_NONE;
  switch (expr.type) {
    case "ObjectPattern":
      for (var i = 0, list = expr.properties; i < list.length; i += 1) {
        var prop = list[i];
        this.checkLValInnerPattern(prop, bindingType, checkClashes);
      }
      break;
    case "ArrayPattern":
      for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
        var elem = list$1[i$1];
        if (elem) {
          this.checkLValInnerPattern(elem, bindingType, checkClashes);
        }
      }
      break;
    default:
      this.checkLValSimple(expr, bindingType, checkClashes);
  }
};
pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
  if (bindingType === void 0)
    bindingType = BIND_NONE;
  switch (expr.type) {
    case "Property":
      this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(expr.left, bindingType, checkClashes);
      break;
    case "RestElement":
      this.checkLValPattern(expr.argument, bindingType, checkClashes);
      break;
    default:
      this.checkLValPattern(expr, bindingType, checkClashes);
  }
};
var TokContext = function TokContext2(token, isExpr, preserveSpace, override, generator) {
  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
  this.generator = !!generator;
};
var types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", false),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function(p) {
    return p.tryReadTemplateToken();
  }),
  f_stat: new TokContext("function", false),
  f_expr: new TokContext("function", true),
  f_expr_gen: new TokContext("function", true, false, null, true),
  f_gen: new TokContext("function", false, false, null, true)
};
var pp$6 = Parser.prototype;
pp$6.initialContext = function() {
  return [types.b_stat];
};
pp$6.curContext = function() {
  return this.context[this.context.length - 1];
};
pp$6.braceIsBlock = function(prevType) {
  var parent = this.curContext();
  if (parent === types.f_expr || parent === types.f_stat) {
    return true;
  }
  if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr)) {
    return !parent.isExpr;
  }
  if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed) {
    return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  }
  if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow) {
    return true;
  }
  if (prevType === types$1.braceL) {
    return parent === types.b_stat;
  }
  if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name) {
    return false;
  }
  return !this.exprAllowed;
};
pp$6.inGeneratorContext = function() {
  for (var i = this.context.length - 1; i >= 1; i--) {
    var context = this.context[i];
    if (context.token === "function") {
      return context.generator;
    }
  }
  return false;
};
pp$6.updateContext = function(prevType) {
  var update, type = this.type;
  if (type.keyword && prevType === types$1.dot) {
    this.exprAllowed = false;
  } else if (update = type.updateContext) {
    update.call(this, prevType);
  } else {
    this.exprAllowed = type.beforeExpr;
  }
};
pp$6.overrideContext = function(tokenCtx) {
  if (this.curContext() !== tokenCtx) {
    this.context[this.context.length - 1] = tokenCtx;
  }
};
types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = true;
    return;
  }
  var out = this.context.pop();
  if (out === types.b_stat && this.curContext().token === "function") {
    out = this.context.pop();
  }
  this.exprAllowed = !out.isExpr;
};
types$1.braceL.updateContext = function(prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
  this.exprAllowed = true;
};
types$1.dollarBraceL.updateContext = function() {
  this.context.push(types.b_tmpl);
  this.exprAllowed = true;
};
types$1.parenL.updateContext = function(prevType) {
  var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
  this.context.push(statementParens ? types.p_stat : types.p_expr);
  this.exprAllowed = true;
};
types$1.incDec.updateContext = function() {
};
types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
  if (prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat)) {
    this.context.push(types.f_expr);
  } else {
    this.context.push(types.f_stat);
  }
  this.exprAllowed = false;
};
types$1.backQuote.updateContext = function() {
  if (this.curContext() === types.q_tmpl) {
    this.context.pop();
  } else {
    this.context.push(types.q_tmpl);
  }
  this.exprAllowed = false;
};
types$1.star.updateContext = function(prevType) {
  if (prevType === types$1._function) {
    var index = this.context.length - 1;
    if (this.context[index] === types.f_expr) {
      this.context[index] = types.f_expr_gen;
    } else {
      this.context[index] = types.f_gen;
    }
  }
  this.exprAllowed = true;
};
types$1.name.updateContext = function(prevType) {
  var allowed = false;
  if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
    if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
      allowed = true;
    }
  }
  this.exprAllowed = allowed;
};
var pp$5 = Parser.prototype;
pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
    return;
  }
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
    return;
  }
  var key = prop.key;
  var name;
  switch (key.type) {
    case "Identifier":
      name = key.name;
      break;
    case "Literal":
      name = String(key.value);
      break;
    default:
      return;
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) {
        if (refDestructuringErrors) {
          if (refDestructuringErrors.doubleProto < 0) {
            refDestructuringErrors.doubleProto = key.start;
          }
        } else {
          this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
        }
      }
      propHash.proto = true;
    }
    return;
  }
  name = "$" + name;
  var other = propHash[name];
  if (other) {
    var redefinition;
    if (kind === "init") {
      redefinition = this.strict && other.init || other.get || other.set;
    } else {
      redefinition = other.init || other[kind];
    }
    if (redefinition) {
      this.raiseRecoverable(key.start, "Redefinition of property");
    }
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};
pp$5.parseExpression = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
  if (this.type === types$1.comma) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(types$1.comma)) {
      node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
    }
    return this.finishNode(node, "SequenceExpression");
  }
  return expr;
};
pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
  if (this.isContextual("yield")) {
    if (this.inGenerator) {
      return this.parseYield(forInit);
    } else {
      this.exprAllowed = false;
    }
  }
  var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
    oldTrailingComma = refDestructuringErrors.trailingComma;
    oldDoubleProto = refDestructuringErrors.doubleProto;
    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
  } else {
    refDestructuringErrors = new DestructuringErrors();
    ownDestructuringErrors = true;
  }
  var startPos = this.start, startLoc = this.startLoc;
  if (this.type === types$1.parenL || this.type === types$1.name) {
    this.potentialArrowAt = this.start;
    this.potentialArrowInForAwait = forInit === "await";
  }
  var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
  if (afterLeftParse) {
    left = afterLeftParse.call(this, left, startPos, startLoc);
  }
  if (this.type.isAssign) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    if (this.type === types$1.eq) {
      left = this.toAssignable(left, false, refDestructuringErrors);
    }
    if (!ownDestructuringErrors) {
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
    }
    if (refDestructuringErrors.shorthandAssign >= left.start) {
      refDestructuringErrors.shorthandAssign = -1;
    }
    if (this.type === types$1.eq) {
      this.checkLValPattern(left);
    } else {
      this.checkLValSimple(left);
    }
    node.left = left;
    this.next();
    node.right = this.parseMaybeAssign(forInit);
    if (oldDoubleProto > -1) {
      refDestructuringErrors.doubleProto = oldDoubleProto;
    }
    return this.finishNode(node, "AssignmentExpression");
  } else {
    if (ownDestructuringErrors) {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }
  }
  if (oldParenAssign > -1) {
    refDestructuringErrors.parenthesizedAssign = oldParenAssign;
  }
  if (oldTrailingComma > -1) {
    refDestructuringErrors.trailingComma = oldTrailingComma;
  }
  return left;
};
pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprOps(forInit, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) {
    return expr;
  }
  if (this.eat(types$1.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(types$1.colon);
    node.alternate = this.parseMaybeAssign(forInit);
    return this.finishNode(node, "ConditionalExpression");
  }
  return expr;
};
pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
  if (this.checkExpressionErrors(refDestructuringErrors)) {
    return expr;
  }
  return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
};
pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
  var prec = this.type.binop;
  if (prec != null && (!forInit || this.type !== types$1._in)) {
    if (prec > minPrec) {
      var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
      var coalesce = this.type === types$1.coalesce;
      if (coalesce) {
        prec = types$1.logicalAND.binop;
      }
      var op = this.value;
      this.next();
      var startPos = this.start, startLoc = this.startLoc;
      var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
      if (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) {
        this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
      }
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
    }
  }
  return left;
};
pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
  if (right.type === "PrivateIdentifier") {
    this.raise(right.start, "Private identifier can only be left side of binary expression");
  }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.operator = op;
  node.right = right;
  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
};
pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
  var startPos = this.start, startLoc = this.startLoc, expr;
  if (this.isContextual("await") && this.canAwait) {
    expr = this.parseAwait(forInit);
    sawUnary = true;
  } else if (this.type.prefix) {
    var node = this.startNode(), update = this.type === types$1.incDec;
    node.operator = this.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(null, true, update, forInit);
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) {
      this.checkLValSimple(node.argument);
    } else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") {
      this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
    } else if (node.operator === "delete" && isPrivateFieldAccess(node.argument)) {
      this.raiseRecoverable(node.start, "Private fields can not be deleted");
    } else {
      sawUnary = true;
    }
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else if (!sawUnary && this.type === types$1.privateId) {
    if (forInit || this.privateNameStack.length === 0) {
      this.unexpected();
    }
    expr = this.parsePrivateIdent();
    if (this.type !== types$1._in) {
      this.unexpected();
    }
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.operator = this.value;
      node$1.prefix = false;
      node$1.argument = expr;
      this.checkLValSimple(expr);
      this.next();
      expr = this.finishNode(node$1, "UpdateExpression");
    }
  }
  if (!incDec && this.eat(types$1.starstar)) {
    if (sawUnary) {
      this.unexpected(this.lastTokStart);
    } else {
      return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
    }
  } else {
    return expr;
  }
};
function isPrivateFieldAccess(node) {
  return node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" || node.type === "ChainExpression" && isPrivateFieldAccess(node.expression);
}
pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors, forInit);
  if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
    return expr;
  }
  var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) {
      refDestructuringErrors.parenthesizedAssign = -1;
    }
    if (refDestructuringErrors.parenthesizedBind >= result.start) {
      refDestructuringErrors.parenthesizedBind = -1;
    }
    if (refDestructuringErrors.trailingComma >= result.start) {
      refDestructuringErrors.trailingComma = -1;
    }
  }
  return result;
};
pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
  var optionalChained = false;
  while (true) {
    var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
    if (element.optional) {
      optionalChained = true;
    }
    if (element === base || element.type === "ArrowFunctionExpression") {
      if (optionalChained) {
        var chainNode = this.startNodeAt(startPos, startLoc);
        chainNode.expression = element;
        element = this.finishNode(chainNode, "ChainExpression");
      }
      return element;
    }
    base = element;
  }
};
pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
  var optionalSupported = this.options.ecmaVersion >= 11;
  var optional = optionalSupported && this.eat(types$1.questionDot);
  if (noCalls && optional) {
    this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  }
  var computed = this.eat(types$1.bracketL);
  if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.object = base;
    if (computed) {
      node.property = this.parseExpression();
      this.expect(types$1.bracketR);
    } else if (this.type === types$1.privateId && base.type !== "Super") {
      node.property = this.parsePrivateIdent();
    } else {
      node.property = this.parseIdent(this.options.allowReserved !== "never");
    }
    node.computed = !!computed;
    if (optionalSupported) {
      node.optional = optional;
    }
    base = this.finishNode(node, "MemberExpression");
  } else if (!noCalls && this.eat(types$1.parenL)) {
    var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
    if (maybeAsyncArrow && !optional && !this.canInsertSemicolon() && this.eat(types$1.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      if (this.awaitIdentPos > 0) {
        this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
      }
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      this.awaitIdentPos = oldAwaitIdentPos;
      return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
    }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;
    this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
    var node$1 = this.startNodeAt(startPos, startLoc);
    node$1.callee = base;
    node$1.arguments = exprList;
    if (optionalSupported) {
      node$1.optional = optional;
    }
    base = this.finishNode(node$1, "CallExpression");
  } else if (this.type === types$1.backQuote) {
    if (optional || optionalChained) {
      this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    }
    var node$2 = this.startNodeAt(startPos, startLoc);
    node$2.tag = base;
    node$2.quasi = this.parseTemplate({ isTagged: true });
    base = this.finishNode(node$2, "TaggedTemplateExpression");
  }
  return base;
};
pp$5.parseExprAtom = function(refDestructuringErrors, forInit) {
  if (this.type === types$1.slash) {
    this.readRegexp();
  }
  var node, canBeArrow = this.potentialArrowAt === this.start;
  switch (this.type) {
    case types$1._super:
      if (!this.allowSuper) {
        this.raise(this.start, "'super' keyword outside a method");
      }
      node = this.startNode();
      this.next();
      if (this.type === types$1.parenL && !this.allowDirectSuper) {
        this.raise(node.start, "super() call outside constructor of a subclass");
      }
      if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL) {
        this.unexpected();
      }
      return this.finishNode(node, "Super");
    case types$1._this:
      node = this.startNode();
      this.next();
      return this.finishNode(node, "ThisExpression");
    case types$1.name:
      var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
      var id = this.parseIdent(false);
      if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
        this.overrideContext(types.f_expr);
        return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
      }
      if (canBeArrow && !this.canInsertSemicolon()) {
        if (this.eat(types$1.arrow)) {
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
        }
        if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
          id = this.parseIdent(false);
          if (this.canInsertSemicolon() || !this.eat(types$1.arrow)) {
            this.unexpected();
          }
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
        }
      }
      return id;
    case types$1.regexp:
      var value = this.value;
      node = this.parseLiteral(value.value);
      node.regex = { pattern: value.pattern, flags: value.flags };
      return node;
    case types$1.num:
    case types$1.string:
      return this.parseLiteral(this.value);
    case types$1._null:
    case types$1._true:
    case types$1._false:
      node = this.startNode();
      node.value = this.type === types$1._null ? null : this.type === types$1._true;
      node.raw = this.type.keyword;
      this.next();
      return this.finishNode(node, "Literal");
    case types$1.parenL:
      var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
      if (refDestructuringErrors) {
        if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
          refDestructuringErrors.parenthesizedAssign = start;
        }
        if (refDestructuringErrors.parenthesizedBind < 0) {
          refDestructuringErrors.parenthesizedBind = start;
        }
      }
      return expr;
    case types$1.bracketL:
      node = this.startNode();
      this.next();
      node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
      return this.finishNode(node, "ArrayExpression");
    case types$1.braceL:
      this.overrideContext(types.b_expr);
      return this.parseObj(false, refDestructuringErrors);
    case types$1._function:
      node = this.startNode();
      this.next();
      return this.parseFunction(node, 0);
    case types$1._class:
      return this.parseClass(this.startNode(), false);
    case types$1._new:
      return this.parseNew();
    case types$1.backQuote:
      return this.parseTemplate();
    case types$1._import:
      if (this.options.ecmaVersion >= 11) {
        return this.parseExprImport();
      } else {
        return this.unexpected();
      }
    default:
      this.unexpected();
  }
};
pp$5.parseExprImport = function() {
  var node = this.startNode();
  if (this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword import");
  }
  var meta2 = this.parseIdent(true);
  switch (this.type) {
    case types$1.parenL:
      return this.parseDynamicImport(node);
    case types$1.dot:
      node.meta = meta2;
      return this.parseImportMeta(node);
    default:
      this.unexpected();
  }
};
pp$5.parseDynamicImport = function(node) {
  this.next();
  node.source = this.parseMaybeAssign();
  if (!this.eat(types$1.parenR)) {
    var errorPos = this.start;
    if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
      this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
    } else {
      this.unexpected(errorPos);
    }
  }
  return this.finishNode(node, "ImportExpression");
};
pp$5.parseImportMeta = function(node) {
  this.next();
  var containsEsc = this.containsEsc;
  node.property = this.parseIdent(true);
  if (node.property.name !== "meta") {
    this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'");
  }
  if (containsEsc) {
    this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters");
  }
  if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
    this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module");
  }
  return this.finishNode(node, "MetaProperty");
};
pp$5.parseLiteral = function(value) {
  var node = this.startNode();
  node.value = value;
  node.raw = this.input.slice(this.start, this.end);
  if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
    node.bigint = node.raw.slice(0, -1).replace(/_/g, "");
  }
  this.next();
  return this.finishNode(node, "Literal");
};
pp$5.parseParenExpression = function() {
  this.expect(types$1.parenL);
  var val = this.parseExpression();
  this.expect(types$1.parenR);
  return val;
};
pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var innerStartPos = this.start, innerStartLoc = this.startLoc;
    var exprList = [], first = true, lastIsComma = false;
    var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
    this.yieldPos = 0;
    this.awaitPos = 0;
    while (this.type !== types$1.parenR) {
      first ? first = false : this.expect(types$1.comma);
      if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
        lastIsComma = true;
        break;
      } else if (this.type === types$1.ellipsis) {
        spreadStart = this.start;
        exprList.push(this.parseParenItem(this.parseRestBinding()));
        if (this.type === types$1.comma) {
          this.raise(this.start, "Comma is not permitted after the rest element");
        }
        break;
      } else {
        exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
      }
    }
    var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
    this.expect(types$1.parenR);
    if (canBeArrow && !this.canInsertSemicolon() && this.eat(types$1.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
    }
    if (!exprList.length || lastIsComma) {
      this.unexpected(this.lastTokStart);
    }
    if (spreadStart) {
      this.unexpected(spreadStart);
    }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;
    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }
  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression");
  } else {
    return val;
  }
};
pp$5.parseParenItem = function(item) {
  return item;
};
pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
};
var empty = [];
pp$5.parseNew = function() {
  if (this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  }
  var node = this.startNode();
  var meta2 = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(types$1.dot)) {
    node.meta = meta2;
    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);
    if (node.property.name !== "target") {
      this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'");
    }
    if (containsEsc) {
      this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters");
    }
    if (!this.allowNewDotTarget) {
      this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block");
    }
    return this.finishNode(node, "MetaProperty");
  }
  var startPos = this.start, startLoc = this.startLoc, isImport = this.type === types$1._import;
  node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true, false);
  if (isImport && node.callee.type === "ImportExpression") {
    this.raise(startPos, "Cannot use new with import()");
  }
  if (this.eat(types$1.parenL)) {
    node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
  } else {
    node.arguments = empty;
  }
  return this.finishNode(node, "NewExpression");
};
pp$5.parseTemplateElement = function(ref2) {
  var isTagged = ref2.isTagged;
  var elem = this.startNode();
  if (this.type === types$1.invalidTemplate) {
    if (!isTagged) {
      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
    }
    elem.value = {
      raw: this.value,
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
      cooked: this.value
    };
  }
  this.next();
  elem.tail = this.type === types$1.backQuote;
  return this.finishNode(elem, "TemplateElement");
};
pp$5.parseTemplate = function(ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var isTagged = ref2.isTagged;
  if (isTagged === void 0)
    isTagged = false;
  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement({ isTagged });
  node.quasis = [curElt];
  while (!curElt.tail) {
    if (this.type === types$1.eof) {
      this.raise(this.pos, "Unterminated template literal");
    }
    this.expect(types$1.dollarBraceL);
    node.expressions.push(this.parseExpression());
    this.expect(types$1.braceR);
    node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral");
};
pp$5.isAsyncProp = function(prop) {
  return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
};
pp$5.parseObj = function(isPattern, refDestructuringErrors) {
  var node = this.startNode(), first = true, propHash = {};
  node.properties = [];
  this.next();
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    var prop = this.parseProperty(isPattern, refDestructuringErrors);
    if (!isPattern) {
      this.checkPropClash(prop, propHash, refDestructuringErrors);
    }
    node.properties.push(prop);
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
};
pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
  var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
  if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
    if (isPattern) {
      prop.argument = this.parseIdent(false);
      if (this.type === types$1.comma) {
        this.raise(this.start, "Comma is not permitted after the rest element");
      }
      return this.finishNode(prop, "RestElement");
    }
    prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
      refDestructuringErrors.trailingComma = this.start;
    }
    return this.finishNode(prop, "SpreadElement");
  }
  if (this.options.ecmaVersion >= 6) {
    prop.method = false;
    prop.shorthand = false;
    if (isPattern || refDestructuringErrors) {
      startPos = this.start;
      startLoc = this.startLoc;
    }
    if (!isPattern) {
      isGenerator = this.eat(types$1.star);
    }
  }
  var containsEsc = this.containsEsc;
  this.parsePropertyName(prop);
  if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
    isAsync = true;
    isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
    this.parsePropertyName(prop);
  } else {
    isAsync = false;
  }
  this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
  return this.finishNode(prop, "Property");
};
pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
  if ((isGenerator || isAsync) && this.type === types$1.colon) {
    this.unexpected();
  }
  if (this.eat(types$1.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
    if (isPattern) {
      this.unexpected();
    }
    prop.kind = "init";
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
  } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
    if (isGenerator || isAsync) {
      this.unexpected();
    }
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get") {
        this.raiseRecoverable(start, "getter should have no params");
      } else {
        this.raiseRecoverable(start, "setter should have exactly one param");
      }
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
        this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
      }
    }
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    if (isGenerator || isAsync) {
      this.unexpected();
    }
    this.checkUnreserved(prop.key);
    if (prop.key.name === "await" && !this.awaitIdentPos) {
      this.awaitIdentPos = startPos;
    }
    prop.kind = "init";
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
    } else if (this.type === types$1.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0) {
        refDestructuringErrors.shorthandAssign = this.start;
      }
      prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
    } else {
      prop.value = this.copyNode(prop.key);
    }
    prop.shorthand = true;
  } else {
    this.unexpected();
  }
};
pp$5.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types$1.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(types$1.bracketR);
      return prop.key;
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
pp$5.initFunction = function(node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) {
    node.generator = node.expression = false;
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = false;
  }
};
pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
  var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) {
    node.generator = isGenerator;
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
  this.expect(types$1.parenL);
  node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
  this.parseFunctionBody(node, false, true, false);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, "FunctionExpression");
};
pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true, false, forInit);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, "ArrowFunctionExpression");
};
pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
  var isExpression = isArrowFunction && this.type !== types$1.braceL;
  var oldStrict = this.strict, useStrict = false;
  if (isExpression) {
    node.body = this.parseMaybeAssign(forInit);
    node.expression = true;
    this.checkParams(node, false);
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end);
      if (useStrict && nonSimple) {
        this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
      }
    }
    var oldLabels = this.labels;
    this.labels = [];
    if (useStrict) {
      this.strict = true;
    }
    this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
    if (this.strict && node.id) {
      this.checkLValSimple(node.id, BIND_OUTSIDE);
    }
    node.body = this.parseBlock(false, void 0, useStrict && !oldStrict);
    node.expression = false;
    this.adaptDirectivePrologue(node.body.body);
    this.labels = oldLabels;
  }
  this.exitScope();
};
pp$5.isSimpleParamList = function(params) {
  for (var i = 0, list = params; i < list.length; i += 1) {
    var param = list[i];
    if (param.type !== "Identifier") {
      return false;
    }
  }
  return true;
};
pp$5.checkParams = function(node, allowDuplicates) {
  var nameHash = /* @__PURE__ */ Object.create(null);
  for (var i = 0, list = node.params; i < list.length; i += 1) {
    var param = list[i];
    this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
  }
};
pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (!first) {
      this.expect(types$1.comma);
      if (allowTrailingComma && this.afterTrailingComma(close)) {
        break;
      }
    } else {
      first = false;
    }
    var elt = void 0;
    if (allowEmpty && this.type === types$1.comma) {
      elt = null;
    } else if (this.type === types$1.ellipsis) {
      elt = this.parseSpread(refDestructuringErrors);
      if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0) {
        refDestructuringErrors.trailingComma = this.start;
      }
    } else {
      elt = this.parseMaybeAssign(false, refDestructuringErrors);
    }
    elts.push(elt);
  }
  return elts;
};
pp$5.checkUnreserved = function(ref2) {
  var start = ref2.start;
  var end = ref2.end;
  var name = ref2.name;
  if (this.inGenerator && name === "yield") {
    this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
  }
  if (this.inAsync && name === "await") {
    this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
  }
  if (this.currentThisScope().inClassFieldInit && name === "arguments") {
    this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer");
  }
  if (this.inClassStaticBlock && (name === "arguments" || name === "await")) {
    this.raise(start, "Cannot use " + name + " in class static initialization block");
  }
  if (this.keywords.test(name)) {
    this.raise(start, "Unexpected keyword '" + name + "'");
  }
  if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
    return;
  }
  var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
  if (re.test(name)) {
    if (!this.inAsync && name === "await") {
      this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
    }
    this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
  }
};
pp$5.parseIdent = function(liberal) {
  var node = this.startNode();
  if (this.type === types$1.name) {
    node.name = this.value;
  } else if (this.type.keyword) {
    node.name = this.type.keyword;
    if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
      this.context.pop();
    }
  } else {
    this.unexpected();
  }
  this.next(!!liberal);
  this.finishNode(node, "Identifier");
  if (!liberal) {
    this.checkUnreserved(node);
    if (node.name === "await" && !this.awaitIdentPos) {
      this.awaitIdentPos = node.start;
    }
  }
  return node;
};
pp$5.parsePrivateIdent = function() {
  var node = this.startNode();
  if (this.type === types$1.privateId) {
    node.name = this.value;
  } else {
    this.unexpected();
  }
  this.next();
  this.finishNode(node, "PrivateIdentifier");
  if (this.privateNameStack.length === 0) {
    this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class");
  } else {
    this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
  }
  return node;
};
pp$5.parseYield = function(forInit) {
  if (!this.yieldPos) {
    this.yieldPos = this.start;
  }
  var node = this.startNode();
  this.next();
  if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(types$1.star);
    node.argument = this.parseMaybeAssign(forInit);
  }
  return this.finishNode(node, "YieldExpression");
};
pp$5.parseAwait = function(forInit) {
  if (!this.awaitPos) {
    this.awaitPos = this.start;
  }
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary(null, true, false, forInit);
  return this.finishNode(node, "AwaitExpression");
};
var pp$4 = Parser.prototype;
pp$4.raise = function(pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos;
  err.loc = loc;
  err.raisedAt = this.pos;
  throw err;
};
pp$4.raiseRecoverable = pp$4.raise;
pp$4.curPosition = function() {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart);
  }
};
var pp$3 = Parser.prototype;
var Scope = function Scope2(flags) {
  this.flags = flags;
  this.var = [];
  this.lexical = [];
  this.functions = [];
  this.inClassFieldInit = false;
};
pp$3.enterScope = function(flags) {
  this.scopeStack.push(new Scope(flags));
};
pp$3.exitScope = function() {
  this.scopeStack.pop();
};
pp$3.treatFunctionsAsVarInScope = function(scope) {
  return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
};
pp$3.declareName = function(name, bindingType, pos) {
  var redeclared = false;
  if (bindingType === BIND_LEXICAL) {
    var scope = this.currentScope();
    redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
    scope.lexical.push(name);
    if (this.inModule && scope.flags & SCOPE_TOP) {
      delete this.undefinedExports[name];
    }
  } else if (bindingType === BIND_SIMPLE_CATCH) {
    var scope$1 = this.currentScope();
    scope$1.lexical.push(name);
  } else if (bindingType === BIND_FUNCTION) {
    var scope$2 = this.currentScope();
    if (this.treatFunctionsAsVar) {
      redeclared = scope$2.lexical.indexOf(name) > -1;
    } else {
      redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1;
    }
    scope$2.functions.push(name);
  } else {
    for (var i = this.scopeStack.length - 1; i >= 0; --i) {
      var scope$3 = this.scopeStack[i];
      if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
        redeclared = true;
        break;
      }
      scope$3.var.push(name);
      if (this.inModule && scope$3.flags & SCOPE_TOP) {
        delete this.undefinedExports[name];
      }
      if (scope$3.flags & SCOPE_VAR) {
        break;
      }
    }
  }
  if (redeclared) {
    this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
  }
};
pp$3.checkLocalExport = function(id) {
  if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
    this.undefinedExports[id.name] = id;
  }
};
pp$3.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
pp$3.currentVarScope = function() {
  for (var i = this.scopeStack.length - 1; ; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & SCOPE_VAR) {
      return scope;
    }
  }
};
pp$3.currentThisScope = function() {
  for (var i = this.scopeStack.length - 1; ; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) {
      return scope;
    }
  }
};
var Node = function Node2(parser, pos, loc) {
  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations) {
    this.loc = new SourceLocation(parser, loc);
  }
  if (parser.options.directSourceFile) {
    this.sourceFile = parser.options.directSourceFile;
  }
  if (parser.options.ranges) {
    this.range = [pos, 0];
  }
};
var pp$2 = Parser.prototype;
pp$2.startNode = function() {
  return new Node(this, this.start, this.startLoc);
};
pp$2.startNodeAt = function(pos, loc) {
  return new Node(this, pos, loc);
};
function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations) {
    node.loc.end = loc;
  }
  if (this.options.ranges) {
    node.range[1] = pos;
  }
  return node;
}
pp$2.finishNode = function(node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
};
pp$2.finishNodeAt = function(node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};
pp$2.copyNode = function(node) {
  var newNode = new Node(this, node.start, this.startLoc);
  for (var prop in node) {
    newNode[prop] = node[prop];
  }
  return newNode;
};
var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
var ecma11BinaryProperties = ecma10BinaryProperties;
var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
var ecma13BinaryProperties = ecma12BinaryProperties;
var ecma14BinaryProperties = ecma13BinaryProperties;
var unicodeBinaryProperties = {
  9: ecma9BinaryProperties,
  10: ecma10BinaryProperties,
  11: ecma11BinaryProperties,
  12: ecma12BinaryProperties,
  13: ecma13BinaryProperties,
  14: ecma14BinaryProperties
};
var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
var ecma14ScriptValues = ecma13ScriptValues + " Kawi Nag_Mundari Nagm";
var unicodeScriptValues = {
  9: ecma9ScriptValues,
  10: ecma10ScriptValues,
  11: ecma11ScriptValues,
  12: ecma12ScriptValues,
  13: ecma13ScriptValues,
  14: ecma14ScriptValues
};
var data = {};
function buildUnicodeData(ecmaVersion) {
  var d = data[ecmaVersion] = {
    binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
    nonBinary: {
      General_Category: wordsRegexp(unicodeGeneralCategoryValues),
      Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
    }
  };
  d.nonBinary.Script_Extensions = d.nonBinary.Script;
  d.nonBinary.gc = d.nonBinary.General_Category;
  d.nonBinary.sc = d.nonBinary.Script;
  d.nonBinary.scx = d.nonBinary.Script_Extensions;
}
for (i = 0, list = [9, 10, 11, 12, 13, 14]; i < list.length; i += 1) {
  ecmaVersion = list[i];
  buildUnicodeData(ecmaVersion);
}
var ecmaVersion;
var i;
var list;
var pp$1 = Parser.prototype;
var RegExpValidationState = function RegExpValidationState2(parser) {
  this.parser = parser;
  this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "");
  this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
  this.source = "";
  this.flags = "";
  this.start = 0;
  this.switchU = false;
  this.switchN = false;
  this.pos = 0;
  this.lastIntValue = 0;
  this.lastStringValue = "";
  this.lastAssertionIsQuantifiable = false;
  this.numCapturingParens = 0;
  this.maxBackReference = 0;
  this.groupNames = [];
  this.backReferenceNames = [];
};
RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
  var unicode = flags.indexOf("u") !== -1;
  this.start = start | 0;
  this.source = pattern + "";
  this.flags = flags;
  this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
  this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
};
RegExpValidationState.prototype.raise = function raise(message) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
};
RegExpValidationState.prototype.at = function at(i, forceU) {
  if (forceU === void 0)
    forceU = false;
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return -1;
  }
  var c = s.charCodeAt(i);
  if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l) {
    return c;
  }
  var next = s.charCodeAt(i + 1);
  return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
};
RegExpValidationState.prototype.nextIndex = function nextIndex(i, forceU) {
  if (forceU === void 0)
    forceU = false;
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return l;
  }
  var c = s.charCodeAt(i), next;
  if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l || (next = s.charCodeAt(i + 1)) < 56320 || next > 57343) {
    return i + 1;
  }
  return i + 2;
};
RegExpValidationState.prototype.current = function current(forceU) {
  if (forceU === void 0)
    forceU = false;
  return this.at(this.pos, forceU);
};
RegExpValidationState.prototype.lookahead = function lookahead(forceU) {
  if (forceU === void 0)
    forceU = false;
  return this.at(this.nextIndex(this.pos, forceU), forceU);
};
RegExpValidationState.prototype.advance = function advance(forceU) {
  if (forceU === void 0)
    forceU = false;
  this.pos = this.nextIndex(this.pos, forceU);
};
RegExpValidationState.prototype.eat = function eat(ch, forceU) {
  if (forceU === void 0)
    forceU = false;
  if (this.current(forceU) === ch) {
    this.advance(forceU);
    return true;
  }
  return false;
};
pp$1.validateRegExpFlags = function(state) {
  var validFlags = state.validFlags;
  var flags = state.flags;
  for (var i = 0; i < flags.length; i++) {
    var flag = flags.charAt(i);
    if (validFlags.indexOf(flag) === -1) {
      this.raise(state.start, "Invalid regular expression flag");
    }
    if (flags.indexOf(flag, i + 1) > -1) {
      this.raise(state.start, "Duplicate regular expression flag");
    }
  }
};
pp$1.validateRegExpPattern = function(state) {
  this.regexp_pattern(state);
  if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
    state.switchN = true;
    this.regexp_pattern(state);
  }
};
pp$1.regexp_pattern = function(state) {
  state.pos = 0;
  state.lastIntValue = 0;
  state.lastStringValue = "";
  state.lastAssertionIsQuantifiable = false;
  state.numCapturingParens = 0;
  state.maxBackReference = 0;
  state.groupNames.length = 0;
  state.backReferenceNames.length = 0;
  this.regexp_disjunction(state);
  if (state.pos !== state.source.length) {
    if (state.eat(41)) {
      state.raise("Unmatched ')'");
    }
    if (state.eat(93) || state.eat(125)) {
      state.raise("Lone quantifier brackets");
    }
  }
  if (state.maxBackReference > state.numCapturingParens) {
    state.raise("Invalid escape");
  }
  for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
    var name = list[i];
    if (state.groupNames.indexOf(name) === -1) {
      state.raise("Invalid named capture referenced");
    }
  }
};
pp$1.regexp_disjunction = function(state) {
  this.regexp_alternative(state);
  while (state.eat(124)) {
    this.regexp_alternative(state);
  }
  if (this.regexp_eatQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  if (state.eat(123)) {
    state.raise("Lone quantifier brackets");
  }
};
pp$1.regexp_alternative = function(state) {
  while (state.pos < state.source.length && this.regexp_eatTerm(state)) {
  }
};
pp$1.regexp_eatTerm = function(state) {
  if (this.regexp_eatAssertion(state)) {
    if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
      if (state.switchU) {
        state.raise("Invalid quantifier");
      }
    }
    return true;
  }
  if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
    this.regexp_eatQuantifier(state);
    return true;
  }
  return false;
};
pp$1.regexp_eatAssertion = function(state) {
  var start = state.pos;
  state.lastAssertionIsQuantifiable = false;
  if (state.eat(94) || state.eat(36)) {
    return true;
  }
  if (state.eat(92)) {
    if (state.eat(66) || state.eat(98)) {
      return true;
    }
    state.pos = start;
  }
  if (state.eat(40) && state.eat(63)) {
    var lookbehind = false;
    if (this.options.ecmaVersion >= 9) {
      lookbehind = state.eat(60);
    }
    if (state.eat(61) || state.eat(33)) {
      this.regexp_disjunction(state);
      if (!state.eat(41)) {
        state.raise("Unterminated group");
      }
      state.lastAssertionIsQuantifiable = !lookbehind;
      return true;
    }
  }
  state.pos = start;
  return false;
};
pp$1.regexp_eatQuantifier = function(state, noError) {
  if (noError === void 0)
    noError = false;
  if (this.regexp_eatQuantifierPrefix(state, noError)) {
    state.eat(63);
    return true;
  }
  return false;
};
pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
  return state.eat(42) || state.eat(43) || state.eat(63) || this.regexp_eatBracedQuantifier(state, noError);
};
pp$1.regexp_eatBracedQuantifier = function(state, noError) {
  var start = state.pos;
  if (state.eat(123)) {
    var min = 0, max = -1;
    if (this.regexp_eatDecimalDigits(state)) {
      min = state.lastIntValue;
      if (state.eat(44) && this.regexp_eatDecimalDigits(state)) {
        max = state.lastIntValue;
      }
      if (state.eat(125)) {
        if (max !== -1 && max < min && !noError) {
          state.raise("numbers out of order in {} quantifier");
        }
        return true;
      }
    }
    if (state.switchU && !noError) {
      state.raise("Incomplete quantifier");
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatAtom = function(state) {
  return this.regexp_eatPatternCharacters(state) || state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
};
pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
  var start = state.pos;
  if (state.eat(92)) {
    if (this.regexp_eatAtomEscape(state)) {
      return true;
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatUncapturingGroup = function(state) {
  var start = state.pos;
  if (state.eat(40)) {
    if (state.eat(63) && state.eat(58)) {
      this.regexp_disjunction(state);
      if (state.eat(41)) {
        return true;
      }
      state.raise("Unterminated group");
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatCapturingGroup = function(state) {
  if (state.eat(40)) {
    if (this.options.ecmaVersion >= 9) {
      this.regexp_groupSpecifier(state);
    } else if (state.current() === 63) {
      state.raise("Invalid group");
    }
    this.regexp_disjunction(state);
    if (state.eat(41)) {
      state.numCapturingParens += 1;
      return true;
    }
    state.raise("Unterminated group");
  }
  return false;
};
pp$1.regexp_eatExtendedAtom = function(state) {
  return state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
};
pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
  if (this.regexp_eatBracedQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  return false;
};
pp$1.regexp_eatSyntaxCharacter = function(state) {
  var ch = state.current();
  if (isSyntaxCharacter(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
function isSyntaxCharacter(ch) {
  return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
}
pp$1.regexp_eatPatternCharacters = function(state) {
  var start = state.pos;
  var ch = 0;
  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
    state.advance();
  }
  return state.pos !== start;
};
pp$1.regexp_eatExtendedPatternCharacter = function(state) {
  var ch = state.current();
  if (ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124) {
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_groupSpecifier = function(state) {
  if (state.eat(63)) {
    if (this.regexp_eatGroupName(state)) {
      if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
        state.raise("Duplicate capture group name");
      }
      state.groupNames.push(state.lastStringValue);
      return;
    }
    state.raise("Invalid group");
  }
};
pp$1.regexp_eatGroupName = function(state) {
  state.lastStringValue = "";
  if (state.eat(60)) {
    if (this.regexp_eatRegExpIdentifierName(state) && state.eat(62)) {
      return true;
    }
    state.raise("Invalid capture group name");
  }
  return false;
};
pp$1.regexp_eatRegExpIdentifierName = function(state) {
  state.lastStringValue = "";
  if (this.regexp_eatRegExpIdentifierStart(state)) {
    state.lastStringValue += codePointToString(state.lastIntValue);
    while (this.regexp_eatRegExpIdentifierPart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
    }
    return true;
  }
  return false;
};
pp$1.regexp_eatRegExpIdentifierStart = function(state) {
  var start = state.pos;
  var forceU = this.options.ecmaVersion >= 11;
  var ch = state.current(forceU);
  state.advance(forceU);
  if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierStart(ch)) {
    state.lastIntValue = ch;
    return true;
  }
  state.pos = start;
  return false;
};
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 36 || ch === 95;
}
pp$1.regexp_eatRegExpIdentifierPart = function(state) {
  var start = state.pos;
  var forceU = this.options.ecmaVersion >= 11;
  var ch = state.current(forceU);
  state.advance(forceU);
  if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierPart(ch)) {
    state.lastIntValue = ch;
    return true;
  }
  state.pos = start;
  return false;
};
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
}
pp$1.regexp_eatAtomEscape = function(state) {
  if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
    return true;
  }
  if (state.switchU) {
    if (state.current() === 99) {
      state.raise("Invalid unicode escape");
    }
    state.raise("Invalid escape");
  }
  return false;
};
pp$1.regexp_eatBackReference = function(state) {
  var start = state.pos;
  if (this.regexp_eatDecimalEscape(state)) {
    var n = state.lastIntValue;
    if (state.switchU) {
      if (n > state.maxBackReference) {
        state.maxBackReference = n;
      }
      return true;
    }
    if (n <= state.numCapturingParens) {
      return true;
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatKGroupName = function(state) {
  if (state.eat(107)) {
    if (this.regexp_eatGroupName(state)) {
      state.backReferenceNames.push(state.lastStringValue);
      return true;
    }
    state.raise("Invalid named reference");
  }
  return false;
};
pp$1.regexp_eatCharacterEscape = function(state) {
  return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
};
pp$1.regexp_eatCControlLetter = function(state) {
  var start = state.pos;
  if (state.eat(99)) {
    if (this.regexp_eatControlLetter(state)) {
      return true;
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatZero = function(state) {
  if (state.current() === 48 && !isDecimalDigit(state.lookahead())) {
    state.lastIntValue = 0;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatControlEscape = function(state) {
  var ch = state.current();
  if (ch === 116) {
    state.lastIntValue = 9;
    state.advance();
    return true;
  }
  if (ch === 110) {
    state.lastIntValue = 10;
    state.advance();
    return true;
  }
  if (ch === 118) {
    state.lastIntValue = 11;
    state.advance();
    return true;
  }
  if (ch === 102) {
    state.lastIntValue = 12;
    state.advance();
    return true;
  }
  if (ch === 114) {
    state.lastIntValue = 13;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatControlLetter = function(state) {
  var ch = state.current();
  if (isControlLetter(ch)) {
    state.lastIntValue = ch % 32;
    state.advance();
    return true;
  }
  return false;
};
function isControlLetter(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
}
pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
  if (forceU === void 0)
    forceU = false;
  var start = state.pos;
  var switchU = forceU || state.switchU;
  if (state.eat(117)) {
    if (this.regexp_eatFixedHexDigits(state, 4)) {
      var lead = state.lastIntValue;
      if (switchU && lead >= 55296 && lead <= 56319) {
        var leadSurrogateEnd = state.pos;
        if (state.eat(92) && state.eat(117) && this.regexp_eatFixedHexDigits(state, 4)) {
          var trail = state.lastIntValue;
          if (trail >= 56320 && trail <= 57343) {
            state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536;
            return true;
          }
        }
        state.pos = leadSurrogateEnd;
        state.lastIntValue = lead;
      }
      return true;
    }
    if (switchU && state.eat(123) && this.regexp_eatHexDigits(state) && state.eat(125) && isValidUnicode(state.lastIntValue)) {
      return true;
    }
    if (switchU) {
      state.raise("Invalid unicode escape");
    }
    state.pos = start;
  }
  return false;
};
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 1114111;
}
pp$1.regexp_eatIdentityEscape = function(state) {
  if (state.switchU) {
    if (this.regexp_eatSyntaxCharacter(state)) {
      return true;
    }
    if (state.eat(47)) {
      state.lastIntValue = 47;
      return true;
    }
    return false;
  }
  var ch = state.current();
  if (ch !== 99 && (!state.switchN || ch !== 107)) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatDecimalEscape = function(state) {
  state.lastIntValue = 0;
  var ch = state.current();
  if (ch >= 49 && ch <= 57) {
    do {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
      state.advance();
    } while ((ch = state.current()) >= 48 && ch <= 57);
    return true;
  }
  return false;
};
pp$1.regexp_eatCharacterClassEscape = function(state) {
  var ch = state.current();
  if (isCharacterClassEscape(ch)) {
    state.lastIntValue = -1;
    state.advance();
    return true;
  }
  if (state.switchU && this.options.ecmaVersion >= 9 && (ch === 80 || ch === 112)) {
    state.lastIntValue = -1;
    state.advance();
    if (state.eat(123) && this.regexp_eatUnicodePropertyValueExpression(state) && state.eat(125)) {
      return true;
    }
    state.raise("Invalid property name");
  }
  return false;
};
function isCharacterClassEscape(ch) {
  return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
}
pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
  var start = state.pos;
  if (this.regexp_eatUnicodePropertyName(state) && state.eat(61)) {
    var name = state.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(state)) {
      var value = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
      return true;
    }
  }
  state.pos = start;
  if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
    var nameOrValue = state.lastStringValue;
    this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
    return true;
  }
  return false;
};
pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
  if (!hasOwn(state.unicodeProperties.nonBinary, name)) {
    state.raise("Invalid property name");
  }
  if (!state.unicodeProperties.nonBinary[name].test(value)) {
    state.raise("Invalid property value");
  }
};
pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
  if (!state.unicodeProperties.binary.test(nameOrValue)) {
    state.raise("Invalid property name");
  }
};
pp$1.regexp_eatUnicodePropertyName = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyNameCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== "";
};
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 95;
}
pp$1.regexp_eatUnicodePropertyValue = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyValueCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== "";
};
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
}
pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
  return this.regexp_eatUnicodePropertyValue(state);
};
pp$1.regexp_eatCharacterClass = function(state) {
  if (state.eat(91)) {
    state.eat(94);
    this.regexp_classRanges(state);
    if (state.eat(93)) {
      return true;
    }
    state.raise("Unterminated character class");
  }
  return false;
};
pp$1.regexp_classRanges = function(state) {
  while (this.regexp_eatClassAtom(state)) {
    var left = state.lastIntValue;
    if (state.eat(45) && this.regexp_eatClassAtom(state)) {
      var right = state.lastIntValue;
      if (state.switchU && (left === -1 || right === -1)) {
        state.raise("Invalid character class");
      }
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
    }
  }
};
pp$1.regexp_eatClassAtom = function(state) {
  var start = state.pos;
  if (state.eat(92)) {
    if (this.regexp_eatClassEscape(state)) {
      return true;
    }
    if (state.switchU) {
      var ch$1 = state.current();
      if (ch$1 === 99 || isOctalDigit(ch$1)) {
        state.raise("Invalid class escape");
      }
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  var ch = state.current();
  if (ch !== 93) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatClassEscape = function(state) {
  var start = state.pos;
  if (state.eat(98)) {
    state.lastIntValue = 8;
    return true;
  }
  if (state.switchU && state.eat(45)) {
    state.lastIntValue = 45;
    return true;
  }
  if (!state.switchU && state.eat(99)) {
    if (this.regexp_eatClassControlLetter(state)) {
      return true;
    }
    state.pos = start;
  }
  return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
};
pp$1.regexp_eatClassControlLetter = function(state) {
  var ch = state.current();
  if (isDecimalDigit(ch) || ch === 95) {
    state.lastIntValue = ch % 32;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatHexEscapeSequence = function(state) {
  var start = state.pos;
  if (state.eat(120)) {
    if (this.regexp_eatFixedHexDigits(state, 2)) {
      return true;
    }
    if (state.switchU) {
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatDecimalDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isDecimalDigit(ch = state.current())) {
    state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
    state.advance();
  }
  return state.pos !== start;
};
function isDecimalDigit(ch) {
  return ch >= 48 && ch <= 57;
}
pp$1.regexp_eatHexDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isHexDigit(ch = state.current())) {
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return state.pos !== start;
};
function isHexDigit(ch) {
  return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
function hexToInt(ch) {
  if (ch >= 65 && ch <= 70) {
    return 10 + (ch - 65);
  }
  if (ch >= 97 && ch <= 102) {
    return 10 + (ch - 97);
  }
  return ch - 48;
}
pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
  if (this.regexp_eatOctalDigit(state)) {
    var n1 = state.lastIntValue;
    if (this.regexp_eatOctalDigit(state)) {
      var n2 = state.lastIntValue;
      if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
      } else {
        state.lastIntValue = n1 * 8 + n2;
      }
    } else {
      state.lastIntValue = n1;
    }
    return true;
  }
  return false;
};
pp$1.regexp_eatOctalDigit = function(state) {
  var ch = state.current();
  if (isOctalDigit(ch)) {
    state.lastIntValue = ch - 48;
    state.advance();
    return true;
  }
  state.lastIntValue = 0;
  return false;
};
function isOctalDigit(ch) {
  return ch >= 48 && ch <= 55;
}
pp$1.regexp_eatFixedHexDigits = function(state, length) {
  var start = state.pos;
  state.lastIntValue = 0;
  for (var i = 0; i < length; ++i) {
    var ch = state.current();
    if (!isHexDigit(ch)) {
      state.pos = start;
      return false;
    }
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return true;
};
var Token = function Token2(p) {
  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations) {
    this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
  }
  if (p.options.ranges) {
    this.range = [p.start, p.end];
  }
};
var pp = Parser.prototype;
pp.next = function(ignoreEscapeSequenceInKeyword) {
  if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
  }
  if (this.options.onToken) {
    this.options.onToken(new Token(this));
  }
  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};
pp.getToken = function() {
  this.next();
  return new Token(this);
};
if (typeof Symbol !== "undefined") {
  pp[Symbol.iterator] = function() {
    var this$1$1 = this;
    return {
      next: function() {
        var token = this$1$1.getToken();
        return {
          done: token.type === types$1.eof,
          value: token
        };
      }
    };
  };
}
pp.nextToken = function() {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) {
    this.skipSpace();
  }
  this.start = this.pos;
  if (this.options.locations) {
    this.startLoc = this.curPosition();
  }
  if (this.pos >= this.input.length) {
    return this.finishToken(types$1.eof);
  }
  if (curContext.override) {
    return curContext.override(this);
  } else {
    this.readToken(this.fullCharCodeAtPos());
  }
};
pp.readToken = function(code) {
  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92) {
    return this.readWord();
  }
  return this.getTokenFromCode(code);
};
pp.fullCharCodeAtPos = function() {
  var code = this.input.charCodeAt(this.pos);
  if (code <= 55295 || code >= 56320) {
    return code;
  }
  var next = this.input.charCodeAt(this.pos + 1);
  return next <= 56319 || next >= 57344 ? code : (code << 10) + next - 56613888;
};
pp.skipBlockComment = function() {
  var startLoc = this.options.onComment && this.curPosition();
  var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) {
    this.raise(this.pos - 2, "Unterminated comment");
  }
  this.pos = end + 2;
  if (this.options.locations) {
    for (var nextBreak = void 0, pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; ) {
      ++this.curLine;
      pos = this.lineStart = nextBreak;
    }
  }
  if (this.options.onComment) {
    this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
  }
};
pp.skipLineComment = function(startSkip) {
  var start = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && !isNewLine(ch)) {
    ch = this.input.charCodeAt(++this.pos);
  }
  if (this.options.onComment) {
    this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
  }
};
pp.skipSpace = function() {
  loop:
    while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);
      switch (ch) {
        case 32:
        case 160:
          ++this.pos;
          break;
        case 13:
          if (this.input.charCodeAt(this.pos + 1) === 10) {
            ++this.pos;
          }
        case 10:
        case 8232:
        case 8233:
          ++this.pos;
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }
          break;
        case 47:
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
              this.skipBlockComment();
              break;
            case 47:
              this.skipLineComment(2);
              break;
            default:
              break loop;
          }
          break;
        default:
          if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
            ++this.pos;
          } else {
            break loop;
          }
      }
    }
};
pp.finishToken = function(type, val) {
  this.end = this.pos;
  if (this.options.locations) {
    this.endLoc = this.curPosition();
  }
  var prevType = this.type;
  this.type = type;
  this.value = val;
  this.updateContext(prevType);
};
pp.readToken_dot = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) {
    return this.readNumber(true);
  }
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
    this.pos += 3;
    return this.finishToken(types$1.ellipsis);
  } else {
    ++this.pos;
    return this.finishToken(types$1.dot);
  }
};
pp.readToken_slash = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) {
    ++this.pos;
    return this.readRegexp();
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.slash, 1);
};
pp.readToken_mult_modulo_exp = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  var tokentype = code === 42 ? types$1.star : types$1.modulo;
  if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
    ++size;
    tokentype = types$1.starstar;
    next = this.input.charCodeAt(this.pos + 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, size + 1);
  }
  return this.finishOp(tokentype, size);
};
pp.readToken_pipe_amp = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (this.options.ecmaVersion >= 12) {
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (next2 === 61) {
        return this.finishOp(types$1.assign, 3);
      }
    }
    return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
};
pp.readToken_caret = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.bitwiseXOR, 1);
};
pp.readToken_plus_min = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken();
    }
    return this.finishOp(types$1.incDec, 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.plusMin, 1);
};
pp.readToken_lt_gt = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) {
      return this.finishOp(types$1.assign, size + 1);
    }
    return this.finishOp(types$1.bitShift, size);
  }
  if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken();
  }
  if (next === 61) {
    size = 2;
  }
  return this.finishOp(types$1.relational, size);
};
pp.readToken_eq_excl = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) {
    return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
  }
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
    this.pos += 2;
    return this.finishToken(types$1.arrow);
  }
  return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1);
};
pp.readToken_question = function() {
  var ecmaVersion = this.options.ecmaVersion;
  if (ecmaVersion >= 11) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 46) {
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (next2 < 48 || next2 > 57) {
        return this.finishOp(types$1.questionDot, 2);
      }
    }
    if (next === 63) {
      if (ecmaVersion >= 12) {
        var next2$1 = this.input.charCodeAt(this.pos + 2);
        if (next2$1 === 61) {
          return this.finishOp(types$1.assign, 3);
        }
      }
      return this.finishOp(types$1.coalesce, 2);
    }
  }
  return this.finishOp(types$1.question, 1);
};
pp.readToken_numberSign = function() {
  var ecmaVersion = this.options.ecmaVersion;
  var code = 35;
  if (ecmaVersion >= 13) {
    ++this.pos;
    code = this.fullCharCodeAtPos();
    if (isIdentifierStart(code, true) || code === 92) {
      return this.finishToken(types$1.privateId, this.readWord1());
    }
  }
  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};
pp.getTokenFromCode = function(code) {
  switch (code) {
    case 46:
      return this.readToken_dot();
    case 40:
      ++this.pos;
      return this.finishToken(types$1.parenL);
    case 41:
      ++this.pos;
      return this.finishToken(types$1.parenR);
    case 59:
      ++this.pos;
      return this.finishToken(types$1.semi);
    case 44:
      ++this.pos;
      return this.finishToken(types$1.comma);
    case 91:
      ++this.pos;
      return this.finishToken(types$1.bracketL);
    case 93:
      ++this.pos;
      return this.finishToken(types$1.bracketR);
    case 123:
      ++this.pos;
      return this.finishToken(types$1.braceL);
    case 125:
      ++this.pos;
      return this.finishToken(types$1.braceR);
    case 58:
      ++this.pos;
      return this.finishToken(types$1.colon);
    case 96:
      if (this.options.ecmaVersion < 6) {
        break;
      }
      ++this.pos;
      return this.finishToken(types$1.backQuote);
    case 48:
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) {
        return this.readRadixNumber(16);
      }
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) {
          return this.readRadixNumber(8);
        }
        if (next === 98 || next === 66) {
          return this.readRadixNumber(2);
        }
      }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(false);
    case 34:
    case 39:
      return this.readString(code);
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(code);
    case 124:
    case 38:
      return this.readToken_pipe_amp(code);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(code);
    case 60:
    case 62:
      return this.readToken_lt_gt(code);
    case 61:
    case 33:
      return this.readToken_eq_excl(code);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(types$1.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};
pp.finishOp = function(type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str);
};
pp.readRegexp = function() {
  var escaped, inClass, start = this.pos;
  for (; ; ) {
    if (this.pos >= this.input.length) {
      this.raise(start, "Unterminated regular expression");
    }
    var ch = this.input.charAt(this.pos);
    if (lineBreak.test(ch)) {
      this.raise(start, "Unterminated regular expression");
    }
    if (!escaped) {
      if (ch === "[") {
        inClass = true;
      } else if (ch === "]" && inClass) {
        inClass = false;
      } else if (ch === "/" && !inClass) {
        break;
      }
      escaped = ch === "\\";
    } else {
      escaped = false;
    }
    ++this.pos;
  }
  var pattern = this.input.slice(start, this.pos);
  ++this.pos;
  var flagsStart = this.pos;
  var flags = this.readWord1();
  if (this.containsEsc) {
    this.unexpected(flagsStart);
  }
  var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
  state.reset(start, pattern, flags);
  this.validateRegExpFlags(state);
  this.validateRegExpPattern(state);
  var value = null;
  try {
    value = new RegExp(pattern, flags);
  } catch (e) {
  }
  return this.finishToken(types$1.regexp, { pattern, flags, value });
};
pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
  var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0;
  var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
  var start = this.pos, total = 0, lastCode = 0;
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i, ++this.pos) {
    var code = this.input.charCodeAt(this.pos), val = void 0;
    if (allowSeparators && code === 95) {
      if (isLegacyOctalNumericLiteral) {
        this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
      }
      if (lastCode === 95) {
        this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
      }
      if (i === 0) {
        this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
      }
      lastCode = code;
      continue;
    }
    if (code >= 97) {
      val = code - 97 + 10;
    } else if (code >= 65) {
      val = code - 65 + 10;
    } else if (code >= 48 && code <= 57) {
      val = code - 48;
    } else {
      val = Infinity;
    }
    if (val >= radix) {
      break;
    }
    lastCode = code;
    total = total * radix + val;
  }
  if (allowSeparators && lastCode === 95) {
    this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
  }
  if (this.pos === start || len != null && this.pos - start !== len) {
    return null;
  }
  return total;
};
function stringToNumber(str, isLegacyOctalNumericLiteral) {
  if (isLegacyOctalNumericLiteral) {
    return parseInt(str, 8);
  }
  return parseFloat(str.replace(/_/g, ""));
}
function stringToBigInt(str) {
  if (typeof BigInt !== "function") {
    return null;
  }
  return BigInt(str.replace(/_/g, ""));
}
pp.readRadixNumber = function(radix) {
  var start = this.pos;
  this.pos += 2;
  var val = this.readInt(radix);
  if (val == null) {
    this.raise(this.start + 2, "Expected number in radix " + radix);
  }
  if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
    val = stringToBigInt(this.input.slice(start, this.pos));
    ++this.pos;
  } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
    this.raise(this.pos, "Identifier directly after number");
  }
  return this.finishToken(types$1.num, val);
};
pp.readNumber = function(startsWithDot) {
  var start = this.pos;
  if (!startsWithDot && this.readInt(10, void 0, true) === null) {
    this.raise(start, "Invalid number");
  }
  var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
  if (octal && this.strict) {
    this.raise(start, "Invalid number");
  }
  var next = this.input.charCodeAt(this.pos);
  if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
    var val$1 = stringToBigInt(this.input.slice(start, this.pos));
    ++this.pos;
    if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    return this.finishToken(types$1.num, val$1);
  }
  if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
    octal = false;
  }
  if (next === 46 && !octal) {
    ++this.pos;
    this.readInt(10);
    next = this.input.charCodeAt(this.pos);
  }
  if ((next === 69 || next === 101) && !octal) {
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) {
      ++this.pos;
    }
    if (this.readInt(10) === null) {
      this.raise(start, "Invalid number");
    }
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) {
    this.raise(this.pos, "Identifier directly after number");
  }
  var val = stringToNumber(this.input.slice(start, this.pos), octal);
  return this.finishToken(types$1.num, val);
};
pp.readCodePoint = function() {
  var ch = this.input.charCodeAt(this.pos), code;
  if (ch === 123) {
    if (this.options.ecmaVersion < 6) {
      this.unexpected();
    }
    var codePos = ++this.pos;
    code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
    ++this.pos;
    if (code > 1114111) {
      this.invalidStringToken(codePos, "Code point out of bounds");
    }
  } else {
    code = this.readHexChar(4);
  }
  return code;
};
pp.readString = function(quote) {
  var out = "", chunkStart = ++this.pos;
  for (; ; ) {
    if (this.pos >= this.input.length) {
      this.raise(this.start, "Unterminated string constant");
    }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) {
      break;
    }
    if (ch === 92) {
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(false);
      chunkStart = this.pos;
    } else if (ch === 8232 || ch === 8233) {
      if (this.options.ecmaVersion < 10) {
        this.raise(this.start, "Unterminated string constant");
      }
      ++this.pos;
      if (this.options.locations) {
        this.curLine++;
        this.lineStart = this.pos;
      }
    } else {
      if (isNewLine(ch)) {
        this.raise(this.start, "Unterminated string constant");
      }
      ++this.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(types$1.string, out);
};
var INVALID_TEMPLATE_ESCAPE_ERROR = {};
pp.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (err) {
    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
      this.readInvalidTemplateToken();
    } else {
      throw err;
    }
  }
  this.inTemplateElement = false;
};
pp.invalidStringToken = function(position, message) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
    throw INVALID_TEMPLATE_ESCAPE_ERROR;
  } else {
    this.raise(position, message);
  }
};
pp.readTmplToken = function() {
  var out = "", chunkStart = this.pos;
  for (; ; ) {
    if (this.pos >= this.input.length) {
      this.raise(this.start, "Unterminated template");
    }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
      if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
        if (ch === 36) {
          this.pos += 2;
          return this.finishToken(types$1.dollarBraceL);
        } else {
          ++this.pos;
          return this.finishToken(types$1.backQuote);
        }
      }
      out += this.input.slice(chunkStart, this.pos);
      return this.finishToken(types$1.template, out);
    }
    if (ch === 92) {
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(true);
      chunkStart = this.pos;
    } else if (isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.pos);
      ++this.pos;
      switch (ch) {
        case 13:
          if (this.input.charCodeAt(this.pos) === 10) {
            ++this.pos;
          }
        case 10:
          out += "\n";
          break;
        default:
          out += String.fromCharCode(ch);
          break;
      }
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      chunkStart = this.pos;
    } else {
      ++this.pos;
    }
  }
};
pp.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++) {
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{") {
          break;
        }
      case "`":
        return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
    }
  }
  this.raise(this.start, "Unterminated template");
};
pp.readEscapedChar = function(inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
    case 110:
      return "\n";
    case 114:
      return "\r";
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    case 117:
      return codePointToString(this.readCodePoint());
    case 116:
      return "	";
    case 98:
      return "\b";
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 13:
      if (this.input.charCodeAt(this.pos) === 10) {
        ++this.pos;
      }
    case 10:
      if (this.options.locations) {
        this.lineStart = this.pos;
        ++this.curLine;
      }
      return "";
    case 56:
    case 57:
      if (this.strict) {
        this.invalidStringToken(this.pos - 1, "Invalid escape sequence");
      }
      if (inTemplate) {
        var codePos = this.pos - 1;
        this.invalidStringToken(codePos, "Invalid escape sequence in template string");
      }
    default:
      if (ch >= 48 && ch <= 55) {
        var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
        var octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        this.pos += octalStr.length - 1;
        ch = this.input.charCodeAt(this.pos);
        if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
          this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode");
        }
        return String.fromCharCode(octal);
      }
      if (isNewLine(ch)) {
        return "";
      }
      return String.fromCharCode(ch);
  }
};
pp.readHexChar = function(len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) {
    this.invalidStringToken(codePos, "Bad character escape sequence");
  }
  return n;
};
pp.readWord1 = function() {
  this.containsEsc = false;
  var word = "", first = true, chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this.fullCharCodeAtPos();
    if (isIdentifierChar(ch, astral)) {
      this.pos += ch <= 65535 ? 1 : 2;
    } else if (ch === 92) {
      this.containsEsc = true;
      word += this.input.slice(chunkStart, this.pos);
      var escStart = this.pos;
      if (this.input.charCodeAt(++this.pos) !== 117) {
        this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
      }
      ++this.pos;
      var esc = this.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
        this.invalidStringToken(escStart, "Invalid Unicode escape");
      }
      word += codePointToString(esc);
      chunkStart = this.pos;
    } else {
      break;
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos);
};
pp.readWord = function() {
  var word = this.readWord1();
  var type = types$1.name;
  if (this.keywords.test(word)) {
    type = keywords[word];
  }
  return this.finishToken(type, word);
};
var version = "8.8.2";
Parser.acorn = {
  Parser,
  version,
  defaultOptions,
  Position,
  SourceLocation,
  getLineInfo,
  Node,
  TokenType,
  tokTypes: types$1,
  keywordTypes: keywords,
  TokContext,
  tokContexts: types,
  isIdentifierChar,
  isIdentifierStart,
  Token,
  isNewLine,
  lineBreak,
  lineBreakG,
  nonASCIIwhitespace
};

// node_modules/@webqit/use-live/src/transformer/Parser.js
var Parser_default = Parser.extend(function(Parser3) {
  return class extends Parser3 {
    static parse(input, options) {
      if (!options.ecmaVersion) {
        options = { ...options, ecmaVersion: "latest" };
      }
      const ast = super.parse(input, options);
      return ast;
    }
    constructor(...args) {
      super(...args);
      this.___meta = {};
      this.isLiveFunction = false;
      this.isLiveProgram = args[0].executionMode !== "RegularProgram";
      this.functionStack = [];
    }
    parse(...args) {
      const ast = super.parse(...args);
      ast.isLiveProgram = this.isLiveProgram || matchPrologDirective(nextKeyword(this.input, 0, 0), true);
      ast.hasLiveFunctions = !!this.___meta.hasLiveFunctions;
      ast.originalSource = this.input;
      return ast;
    }
    parseFunctionBody(...args) {
      const isLiveExecutionMode = matchPrologDirective(nextKeyword(this.input, this.pos, 0), true);
      if (isLiveExecutionMode && this.functionStack[0]) {
        this.functionStack[0].isLiveFunction = true;
        this.___meta.hasLiveFunctions = true;
      }
      return super.parseFunctionBody(...args);
    }
    parseArrowExpression(...args) {
      this.functionStack.unshift({ type: "arrowFunction", isLiveFunction: this.isLiveFunction });
      const node = super.parseArrowExpression(...args);
      if (this.functionStack[0].isLiveFunction) {
        node.isLiveFunction = true;
      }
      this.functionStack.shift();
      return node;
    }
    parseFunction(node, statement, allowExpressionBody, isAsync, forInit) {
      this.functionStack.unshift({ type: "function", isLiveFunction: this.isLiveFunction });
      this.isLiveFunction = false;
      const _node = super.parseFunction(node, statement, allowExpressionBody, isAsync, forInit);
      if (this.functionStack[0].isLiveFunction) {
        _node.isLiveFunction = true;
      }
      this.functionStack.shift();
      return _node;
    }
    parseProperty(isPattern, refDestructuringErrors) {
      this.functionStack.unshift({ type: "property", isLiveFunction: this.isLiveFunction });
      const node = super.parseProperty(isPattern, refDestructuringErrors);
      if (this.functionStack[0].isLiveFunction) {
        node.value.isLiveFunction = true;
      }
      this.functionStack.shift();
      return node;
    }
    parseClassElement(constructorAllowsSuper) {
      this.functionStack.unshift({ type: "classElement", isLiveFunction: this.isLiveFunction });
      const node = super.parseClassElement(constructorAllowsSuper);
      if (this.functionStack[0].isLiveFunction) {
        node.value.isLiveFunction = true;
      }
      this.functionStack.shift();
      return node;
    }
  };
});

// node_modules/astring/dist/astring.mjs
var { stringify } = JSON;
if (!String.prototype.repeat) {
  throw new Error("String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation");
}
if (!String.prototype.endsWith) {
  throw new Error("String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation");
}
var OPERATOR_PRECEDENCE = {
  "||": 2,
  "??": 3,
  "&&": 4,
  "|": 5,
  "^": 6,
  "&": 7,
  "==": 8,
  "!=": 8,
  "===": 8,
  "!==": 8,
  "<": 9,
  ">": 9,
  "<=": 9,
  ">=": 9,
  in: 9,
  instanceof: 9,
  "<<": 10,
  ">>": 10,
  ">>>": 10,
  "+": 11,
  "-": 11,
  "*": 12,
  "%": 12,
  "/": 12,
  "**": 13
};
var NEEDS_PARENTHESES = 17;
var EXPRESSIONS_PRECEDENCE = {
  ArrayExpression: 20,
  TaggedTemplateExpression: 20,
  ThisExpression: 20,
  Identifier: 20,
  PrivateIdentifier: 20,
  Literal: 18,
  TemplateLiteral: 20,
  Super: 20,
  SequenceExpression: 20,
  MemberExpression: 19,
  ChainExpression: 19,
  CallExpression: 19,
  NewExpression: 19,
  ArrowFunctionExpression: NEEDS_PARENTHESES,
  ClassExpression: NEEDS_PARENTHESES,
  FunctionExpression: NEEDS_PARENTHESES,
  ObjectExpression: NEEDS_PARENTHESES,
  UpdateExpression: 16,
  UnaryExpression: 15,
  AwaitExpression: 15,
  BinaryExpression: 14,
  LogicalExpression: 13,
  ConditionalExpression: 4,
  AssignmentExpression: 3,
  YieldExpression: 2,
  RestElement: 1
};
function formatSequence(state, nodes) {
  const { generator } = state;
  state.write("(");
  if (nodes != null && nodes.length > 0) {
    generator[nodes[0].type](nodes[0], state);
    const { length } = nodes;
    for (let i = 1; i < length; i++) {
      const param = nodes[i];
      state.write(", ");
      generator[param.type](param, state);
    }
  }
  state.write(")");
}
function expressionNeedsParenthesis(state, node, parentNode, isRightHand) {
  const nodePrecedence = state.expressionsPrecedence[node.type];
  if (nodePrecedence === NEEDS_PARENTHESES) {
    return true;
  }
  const parentNodePrecedence = state.expressionsPrecedence[parentNode.type];
  if (nodePrecedence !== parentNodePrecedence) {
    return !isRightHand && nodePrecedence === 15 && parentNodePrecedence === 14 && parentNode.operator === "**" || nodePrecedence < parentNodePrecedence;
  }
  if (nodePrecedence !== 13 && nodePrecedence !== 14) {
    return false;
  }
  if (node.operator === "**" && parentNode.operator === "**") {
    return !isRightHand;
  }
  if (nodePrecedence === 13 && parentNodePrecedence === 13 && (node.operator === "??" || parentNode.operator === "??")) {
    return true;
  }
  if (isRightHand) {
    return OPERATOR_PRECEDENCE[node.operator] <= OPERATOR_PRECEDENCE[parentNode.operator];
  }
  return OPERATOR_PRECEDENCE[node.operator] < OPERATOR_PRECEDENCE[parentNode.operator];
}
function formatExpression(state, node, parentNode, isRightHand) {
  const { generator } = state;
  if (expressionNeedsParenthesis(state, node, parentNode, isRightHand)) {
    state.write("(");
    generator[node.type](node, state);
    state.write(")");
  } else {
    generator[node.type](node, state);
  }
}
function reindent(state, text, indent, lineEnd) {
  const lines = text.split("\n");
  const end = lines.length - 1;
  state.write(lines[0].trim());
  if (end > 0) {
    state.write(lineEnd);
    for (let i = 1; i < end; i++) {
      state.write(indent + lines[i].trim() + lineEnd);
    }
    state.write(indent + lines[end].trim());
  }
}
function formatComments(state, comments, indent, lineEnd) {
  const { length } = comments;
  for (let i = 0; i < length; i++) {
    const comment = comments[i];
    state.write(indent);
    if (comment.type[0] === "L") {
      state.write("// " + comment.value.trim() + "\n", comment);
    } else {
      state.write("/*");
      reindent(state, comment.value, indent, lineEnd);
      state.write("*/" + lineEnd);
    }
  }
}
function hasCallExpression(node) {
  let currentNode = node;
  while (currentNode != null) {
    const { type } = currentNode;
    if (type[0] === "C" && type[1] === "a") {
      return true;
    } else if (type[0] === "M" && type[1] === "e" && type[2] === "m") {
      currentNode = currentNode.object;
    } else {
      return false;
    }
  }
}
function formatVariableDeclaration(state, node) {
  const { generator } = state;
  const { declarations } = node;
  state.write(node.kind + " ");
  const { length } = declarations;
  if (length > 0) {
    generator.VariableDeclarator(declarations[0], state);
    for (let i = 1; i < length; i++) {
      state.write(", ");
      generator.VariableDeclarator(declarations[i], state);
    }
  }
}
var ForInStatement;
var FunctionDeclaration;
var RestElement;
var BinaryExpression;
var ArrayExpression;
var BlockStatement;
var GENERATOR = {
  Program(node, state) {
    const indent = state.indent.repeat(state.indentLevel);
    const { lineEnd, writeComments } = state;
    if (writeComments && node.comments != null) {
      formatComments(state, node.comments, indent, lineEnd);
    }
    const statements = node.body;
    const { length } = statements;
    for (let i = 0; i < length; i++) {
      const statement = statements[i];
      if (writeComments && statement.comments != null) {
        formatComments(state, statement.comments, indent, lineEnd);
      }
      state.write(indent);
      this[statement.type](statement, state);
      state.write(lineEnd);
    }
    if (writeComments && node.trailingComments != null) {
      formatComments(state, node.trailingComments, indent, lineEnd);
    }
  },
  BlockStatement: BlockStatement = function(node, state) {
    const indent = state.indent.repeat(state.indentLevel++);
    const { lineEnd, writeComments } = state;
    const statementIndent = indent + state.indent;
    state.write("{");
    const statements = node.body;
    if (statements != null && statements.length > 0) {
      state.write(lineEnd);
      if (writeComments && node.comments != null) {
        formatComments(state, node.comments, statementIndent, lineEnd);
      }
      const { length } = statements;
      for (let i = 0; i < length; i++) {
        const statement = statements[i];
        if (writeComments && statement.comments != null) {
          formatComments(state, statement.comments, statementIndent, lineEnd);
        }
        state.write(statementIndent);
        this[statement.type](statement, state);
        state.write(lineEnd);
      }
      state.write(indent);
    } else {
      if (writeComments && node.comments != null) {
        state.write(lineEnd);
        formatComments(state, node.comments, statementIndent, lineEnd);
        state.write(indent);
      }
    }
    if (writeComments && node.trailingComments != null) {
      formatComments(state, node.trailingComments, statementIndent, lineEnd);
    }
    state.write("}");
    state.indentLevel--;
  },
  ClassBody: BlockStatement,
  StaticBlock(node, state) {
    state.write("static ");
    this.BlockStatement(node, state);
  },
  EmptyStatement(node, state) {
    state.write(";");
  },
  ExpressionStatement(node, state) {
    const precedence = state.expressionsPrecedence[node.expression.type];
    if (precedence === NEEDS_PARENTHESES || precedence === 3 && node.expression.left.type[0] === "O") {
      state.write("(");
      this[node.expression.type](node.expression, state);
      state.write(")");
    } else {
      this[node.expression.type](node.expression, state);
    }
    state.write(";");
  },
  IfStatement(node, state) {
    state.write("if (");
    this[node.test.type](node.test, state);
    state.write(") ");
    this[node.consequent.type](node.consequent, state);
    if (node.alternate != null) {
      state.write(" else ");
      this[node.alternate.type](node.alternate, state);
    }
  },
  LabeledStatement(node, state) {
    this[node.label.type](node.label, state);
    state.write(": ");
    this[node.body.type](node.body, state);
  },
  BreakStatement(node, state) {
    state.write("break");
    if (node.label != null) {
      state.write(" ");
      this[node.label.type](node.label, state);
    }
    state.write(";");
  },
  ContinueStatement(node, state) {
    state.write("continue");
    if (node.label != null) {
      state.write(" ");
      this[node.label.type](node.label, state);
    }
    state.write(";");
  },
  WithStatement(node, state) {
    state.write("with (");
    this[node.object.type](node.object, state);
    state.write(") ");
    this[node.body.type](node.body, state);
  },
  SwitchStatement(node, state) {
    const indent = state.indent.repeat(state.indentLevel++);
    const { lineEnd, writeComments } = state;
    state.indentLevel++;
    const caseIndent = indent + state.indent;
    const statementIndent = caseIndent + state.indent;
    state.write("switch (");
    this[node.discriminant.type](node.discriminant, state);
    state.write(") {" + lineEnd);
    const { cases: occurences } = node;
    const { length: occurencesCount } = occurences;
    for (let i = 0; i < occurencesCount; i++) {
      const occurence = occurences[i];
      if (writeComments && occurence.comments != null) {
        formatComments(state, occurence.comments, caseIndent, lineEnd);
      }
      if (occurence.test) {
        state.write(caseIndent + "case ");
        this[occurence.test.type](occurence.test, state);
        state.write(":" + lineEnd);
      } else {
        state.write(caseIndent + "default:" + lineEnd);
      }
      const { consequent } = occurence;
      const { length: consequentCount } = consequent;
      for (let i2 = 0; i2 < consequentCount; i2++) {
        const statement = consequent[i2];
        if (writeComments && statement.comments != null) {
          formatComments(state, statement.comments, statementIndent, lineEnd);
        }
        state.write(statementIndent);
        this[statement.type](statement, state);
        state.write(lineEnd);
      }
    }
    state.indentLevel -= 2;
    state.write(indent + "}");
  },
  ReturnStatement(node, state) {
    state.write("return");
    if (node.argument) {
      state.write(" ");
      this[node.argument.type](node.argument, state);
    }
    state.write(";");
  },
  ThrowStatement(node, state) {
    state.write("throw ");
    this[node.argument.type](node.argument, state);
    state.write(";");
  },
  TryStatement(node, state) {
    state.write("try ");
    this[node.block.type](node.block, state);
    if (node.handler) {
      const { handler } = node;
      if (handler.param == null) {
        state.write(" catch ");
      } else {
        state.write(" catch (");
        this[handler.param.type](handler.param, state);
        state.write(") ");
      }
      this[handler.body.type](handler.body, state);
    }
    if (node.finalizer) {
      state.write(" finally ");
      this[node.finalizer.type](node.finalizer, state);
    }
  },
  WhileStatement(node, state) {
    state.write("while (");
    this[node.test.type](node.test, state);
    state.write(") ");
    this[node.body.type](node.body, state);
  },
  DoWhileStatement(node, state) {
    state.write("do ");
    this[node.body.type](node.body, state);
    state.write(" while (");
    this[node.test.type](node.test, state);
    state.write(");");
  },
  ForStatement(node, state) {
    state.write("for (");
    if (node.init != null) {
      const { init: init9 } = node;
      if (init9.type[0] === "V") {
        formatVariableDeclaration(state, init9);
      } else {
        this[init9.type](init9, state);
      }
    }
    state.write("; ");
    if (node.test) {
      this[node.test.type](node.test, state);
    }
    state.write("; ");
    if (node.update) {
      this[node.update.type](node.update, state);
    }
    state.write(") ");
    this[node.body.type](node.body, state);
  },
  ForInStatement: ForInStatement = function(node, state) {
    state.write(`for ${node.await ? "await " : ""}(`);
    const { left } = node;
    if (left.type[0] === "V") {
      formatVariableDeclaration(state, left);
    } else {
      this[left.type](left, state);
    }
    state.write(node.type[3] === "I" ? " in " : " of ");
    this[node.right.type](node.right, state);
    state.write(") ");
    this[node.body.type](node.body, state);
  },
  ForOfStatement: ForInStatement,
  DebuggerStatement(node, state) {
    state.write("debugger;", node);
  },
  FunctionDeclaration: FunctionDeclaration = function(node, state) {
    state.write((node.async ? "async " : "") + (node.generator ? "function* " : "function ") + (node.id ? node.id.name : ""), node);
    formatSequence(state, node.params);
    state.write(" ");
    this[node.body.type](node.body, state);
  },
  FunctionExpression: FunctionDeclaration,
  VariableDeclaration(node, state) {
    formatVariableDeclaration(state, node);
    state.write(";");
  },
  VariableDeclarator(node, state) {
    this[node.id.type](node.id, state);
    if (node.init != null) {
      state.write(" = ");
      this[node.init.type](node.init, state);
    }
  },
  ClassDeclaration(node, state) {
    state.write("class " + (node.id ? `${node.id.name} ` : ""), node);
    if (node.superClass) {
      state.write("extends ");
      const { superClass } = node;
      const { type } = superClass;
      const precedence = state.expressionsPrecedence[type];
      if ((type[0] !== "C" || type[1] !== "l" || type[5] !== "E") && (precedence === NEEDS_PARENTHESES || precedence < state.expressionsPrecedence.ClassExpression)) {
        state.write("(");
        this[node.superClass.type](superClass, state);
        state.write(")");
      } else {
        this[superClass.type](superClass, state);
      }
      state.write(" ");
    }
    this.ClassBody(node.body, state);
  },
  ImportDeclaration(node, state) {
    state.write("import ");
    const { specifiers, attributes } = node;
    const { length } = specifiers;
    let i = 0;
    if (length > 0) {
      for (; i < length; ) {
        if (i > 0) {
          state.write(", ");
        }
        const specifier = specifiers[i];
        const type = specifier.type[6];
        if (type === "D") {
          state.write(specifier.local.name, specifier);
          i++;
        } else if (type === "N") {
          state.write("* as " + specifier.local.name, specifier);
          i++;
        } else {
          break;
        }
      }
      if (i < length) {
        state.write("{");
        for (; ; ) {
          const specifier = specifiers[i];
          const { name } = specifier.imported;
          state.write(name, specifier);
          if (name !== specifier.local.name) {
            state.write(" as " + specifier.local.name);
          }
          if (++i < length) {
            state.write(", ");
          } else {
            break;
          }
        }
        state.write("}");
      }
      state.write(" from ");
    }
    this.Literal(node.source, state);
    if (attributes && attributes.length > 0) {
      state.write(" with { ");
      for (let i2 = 0; i2 < attributes.length; i2++) {
        this.ImportAttribute(attributes[i2], state);
        if (i2 < attributes.length - 1)
          state.write(", ");
      }
      state.write(" }");
    }
    state.write(";");
  },
  ImportAttribute(node, state) {
    this.Identifier(node.key, state);
    state.write(": ");
    this.Literal(node.value, state);
  },
  ImportExpression(node, state) {
    state.write("import(");
    this[node.source.type](node.source, state);
    state.write(")");
  },
  ExportDefaultDeclaration(node, state) {
    state.write("export default ");
    this[node.declaration.type](node.declaration, state);
    if (state.expressionsPrecedence[node.declaration.type] != null && node.declaration.type[0] !== "F") {
      state.write(";");
    }
  },
  ExportNamedDeclaration(node, state) {
    state.write("export ");
    if (node.declaration) {
      this[node.declaration.type](node.declaration, state);
    } else {
      state.write("{");
      const { specifiers } = node, { length } = specifiers;
      if (length > 0) {
        for (let i = 0; ; ) {
          const specifier = specifiers[i];
          const { name } = specifier.local;
          state.write(name, specifier);
          if (name !== specifier.exported.name) {
            state.write(" as " + specifier.exported.name);
          }
          if (++i < length) {
            state.write(", ");
          } else {
            break;
          }
        }
      }
      state.write("}");
      if (node.source) {
        state.write(" from ");
        this.Literal(node.source, state);
      }
      if (node.attributes && node.attributes.length > 0) {
        state.write(" with { ");
        for (let i = 0; i < node.attributes.length; i++) {
          this.ImportAttribute(node.attributes[i], state);
          if (i < node.attributes.length - 1)
            state.write(", ");
        }
        state.write(" }");
      }
      state.write(";");
    }
  },
  ExportAllDeclaration(node, state) {
    if (node.exported != null) {
      state.write("export * as " + node.exported.name + " from ");
    } else {
      state.write("export * from ");
    }
    this.Literal(node.source, state);
    if (node.attributes && node.attributes.length > 0) {
      state.write(" with { ");
      for (let i = 0; i < node.attributes.length; i++) {
        this.ImportAttribute(node.attributes[i], state);
        if (i < node.attributes.length - 1)
          state.write(", ");
      }
      state.write(" }");
    }
    state.write(";");
  },
  MethodDefinition(node, state) {
    if (node.static) {
      state.write("static ");
    }
    const kind = node.kind[0];
    if (kind === "g" || kind === "s") {
      state.write(node.kind + " ");
    }
    if (node.value.async) {
      state.write("async ");
    }
    if (node.value.generator) {
      state.write("*");
    }
    if (node.computed) {
      state.write("[");
      this[node.key.type](node.key, state);
      state.write("]");
    } else {
      this[node.key.type](node.key, state);
    }
    formatSequence(state, node.value.params);
    state.write(" ");
    this[node.value.body.type](node.value.body, state);
  },
  ClassExpression(node, state) {
    this.ClassDeclaration(node, state);
  },
  ArrowFunctionExpression(node, state) {
    state.write(node.async ? "async " : "", node);
    const { params } = node;
    if (params != null) {
      if (params.length === 1 && params[0].type[0] === "I") {
        state.write(params[0].name, params[0]);
      } else {
        formatSequence(state, node.params);
      }
    }
    state.write(" => ");
    if (node.body.type[0] === "O") {
      state.write("(");
      this.ObjectExpression(node.body, state);
      state.write(")");
    } else {
      this[node.body.type](node.body, state);
    }
  },
  ThisExpression(node, state) {
    state.write("this", node);
  },
  Super(node, state) {
    state.write("super", node);
  },
  RestElement: RestElement = function(node, state) {
    state.write("...");
    this[node.argument.type](node.argument, state);
  },
  SpreadElement: RestElement,
  YieldExpression(node, state) {
    state.write(node.delegate ? "yield*" : "yield");
    if (node.argument) {
      state.write(" ");
      this[node.argument.type](node.argument, state);
    }
  },
  AwaitExpression(node, state) {
    state.write("await ", node);
    formatExpression(state, node.argument, node);
  },
  TemplateLiteral(node, state) {
    const { quasis, expressions } = node;
    state.write("`");
    const { length } = expressions;
    for (let i = 0; i < length; i++) {
      const expression = expressions[i];
      const quasi2 = quasis[i];
      state.write(quasi2.value.raw, quasi2);
      state.write("${");
      this[expression.type](expression, state);
      state.write("}");
    }
    const quasi = quasis[quasis.length - 1];
    state.write(quasi.value.raw, quasi);
    state.write("`");
  },
  TemplateElement(node, state) {
    state.write(node.value.raw, node);
  },
  TaggedTemplateExpression(node, state) {
    formatExpression(state, node.tag, node);
    this[node.quasi.type](node.quasi, state);
  },
  ArrayExpression: ArrayExpression = function(node, state) {
    state.write("[");
    if (node.elements.length > 0) {
      const { elements } = node, { length } = elements;
      for (let i = 0; ; ) {
        const element = elements[i];
        if (element != null) {
          this[element.type](element, state);
        }
        if (++i < length) {
          state.write(", ");
        } else {
          if (element == null) {
            state.write(", ");
          }
          break;
        }
      }
    }
    state.write("]");
  },
  ArrayPattern: ArrayExpression,
  ObjectExpression(node, state) {
    const indent = state.indent.repeat(state.indentLevel++);
    const { lineEnd, writeComments } = state;
    const propertyIndent = indent + state.indent;
    state.write("{");
    if (node.properties.length > 0) {
      state.write(lineEnd);
      if (writeComments && node.comments != null) {
        formatComments(state, node.comments, propertyIndent, lineEnd);
      }
      const comma = "," + lineEnd;
      const { properties } = node, { length } = properties;
      for (let i = 0; ; ) {
        const property = properties[i];
        if (writeComments && property.comments != null) {
          formatComments(state, property.comments, propertyIndent, lineEnd);
        }
        state.write(propertyIndent);
        this[property.type](property, state);
        if (++i < length) {
          state.write(comma);
        } else {
          break;
        }
      }
      state.write(lineEnd);
      if (writeComments && node.trailingComments != null) {
        formatComments(state, node.trailingComments, propertyIndent, lineEnd);
      }
      state.write(indent + "}");
    } else if (writeComments) {
      if (node.comments != null) {
        state.write(lineEnd);
        formatComments(state, node.comments, propertyIndent, lineEnd);
        if (node.trailingComments != null) {
          formatComments(state, node.trailingComments, propertyIndent, lineEnd);
        }
        state.write(indent + "}");
      } else if (node.trailingComments != null) {
        state.write(lineEnd);
        formatComments(state, node.trailingComments, propertyIndent, lineEnd);
        state.write(indent + "}");
      } else {
        state.write("}");
      }
    } else {
      state.write("}");
    }
    state.indentLevel--;
  },
  Property(node, state) {
    if (node.method || node.kind[0] !== "i") {
      this.MethodDefinition(node, state);
    } else {
      if (!node.shorthand) {
        if (node.computed) {
          state.write("[");
          this[node.key.type](node.key, state);
          state.write("]");
        } else {
          this[node.key.type](node.key, state);
        }
        state.write(": ");
      }
      this[node.value.type](node.value, state);
    }
  },
  PropertyDefinition(node, state) {
    if (node.static) {
      state.write("static ");
    }
    if (node.computed) {
      state.write("[");
    }
    this[node.key.type](node.key, state);
    if (node.computed) {
      state.write("]");
    }
    if (node.value == null) {
      if (node.key.type[0] !== "F") {
        state.write(";");
      }
      return;
    }
    state.write(" = ");
    this[node.value.type](node.value, state);
    state.write(";");
  },
  ObjectPattern(node, state) {
    state.write("{");
    if (node.properties.length > 0) {
      const { properties } = node, { length } = properties;
      for (let i = 0; ; ) {
        this[properties[i].type](properties[i], state);
        if (++i < length) {
          state.write(", ");
        } else {
          break;
        }
      }
    }
    state.write("}");
  },
  SequenceExpression(node, state) {
    formatSequence(state, node.expressions);
  },
  UnaryExpression(node, state) {
    if (node.prefix) {
      const {
        operator,
        argument,
        argument: { type }
      } = node;
      state.write(operator);
      const needsParentheses = expressionNeedsParenthesis(state, argument, node);
      if (!needsParentheses && (operator.length > 1 || type[0] === "U" && (type[1] === "n" || type[1] === "p") && argument.prefix && argument.operator[0] === operator && (operator === "+" || operator === "-"))) {
        state.write(" ");
      }
      if (needsParentheses) {
        state.write(operator.length > 1 ? " (" : "(");
        this[type](argument, state);
        state.write(")");
      } else {
        this[type](argument, state);
      }
    } else {
      this[node.argument.type](node.argument, state);
      state.write(node.operator);
    }
  },
  UpdateExpression(node, state) {
    if (node.prefix) {
      state.write(node.operator);
      this[node.argument.type](node.argument, state);
    } else {
      this[node.argument.type](node.argument, state);
      state.write(node.operator);
    }
  },
  AssignmentExpression(node, state) {
    this[node.left.type](node.left, state);
    state.write(" " + node.operator + " ");
    this[node.right.type](node.right, state);
  },
  AssignmentPattern(node, state) {
    this[node.left.type](node.left, state);
    state.write(" = ");
    this[node.right.type](node.right, state);
  },
  BinaryExpression: BinaryExpression = function(node, state) {
    const isIn = node.operator === "in";
    if (isIn) {
      state.write("(");
    }
    formatExpression(state, node.left, node, false);
    state.write(" " + node.operator + " ");
    formatExpression(state, node.right, node, true);
    if (isIn) {
      state.write(")");
    }
  },
  LogicalExpression: BinaryExpression,
  ConditionalExpression(node, state) {
    const { test } = node;
    const precedence = state.expressionsPrecedence[test.type];
    if (precedence === NEEDS_PARENTHESES || precedence <= state.expressionsPrecedence.ConditionalExpression) {
      state.write("(");
      this[test.type](test, state);
      state.write(")");
    } else {
      this[test.type](test, state);
    }
    state.write(" ? ");
    this[node.consequent.type](node.consequent, state);
    state.write(" : ");
    this[node.alternate.type](node.alternate, state);
  },
  NewExpression(node, state) {
    state.write("new ");
    const precedence = state.expressionsPrecedence[node.callee.type];
    if (precedence === NEEDS_PARENTHESES || precedence < state.expressionsPrecedence.CallExpression || hasCallExpression(node.callee)) {
      state.write("(");
      this[node.callee.type](node.callee, state);
      state.write(")");
    } else {
      this[node.callee.type](node.callee, state);
    }
    formatSequence(state, node["arguments"]);
  },
  CallExpression(node, state) {
    const precedence = state.expressionsPrecedence[node.callee.type];
    if (precedence === NEEDS_PARENTHESES || precedence < state.expressionsPrecedence.CallExpression) {
      state.write("(");
      this[node.callee.type](node.callee, state);
      state.write(")");
    } else {
      this[node.callee.type](node.callee, state);
    }
    if (node.optional) {
      state.write("?.");
    }
    formatSequence(state, node["arguments"]);
  },
  ChainExpression(node, state) {
    this[node.expression.type](node.expression, state);
  },
  MemberExpression(node, state) {
    const precedence = state.expressionsPrecedence[node.object.type];
    if (precedence === NEEDS_PARENTHESES || precedence < state.expressionsPrecedence.MemberExpression) {
      state.write("(");
      this[node.object.type](node.object, state);
      state.write(")");
    } else {
      this[node.object.type](node.object, state);
    }
    if (node.computed) {
      if (node.optional) {
        state.write("?.");
      }
      state.write("[");
      this[node.property.type](node.property, state);
      state.write("]");
    } else {
      if (node.optional) {
        state.write("?.");
      } else {
        state.write(".");
      }
      this[node.property.type](node.property, state);
    }
  },
  MetaProperty(node, state) {
    state.write(node.meta.name + "." + node.property.name, node);
  },
  Identifier(node, state) {
    state.write(node.name, node);
  },
  PrivateIdentifier(node, state) {
    state.write(`#${node.name}`, node);
  },
  Literal(node, state) {
    if (node.raw != null) {
      state.write(node.raw, node);
    } else if (node.regex != null) {
      this.RegExpLiteral(node, state);
    } else if (node.bigint != null) {
      state.write(node.bigint + "n", node);
    } else {
      state.write(stringify(node.value), node);
    }
  },
  RegExpLiteral(node, state) {
    const { regex } = node;
    state.write(`/${regex.pattern}/${regex.flags}`, node);
  }
};
var EMPTY_OBJECT = {};
var State = class {
  constructor(options) {
    const setup = options == null ? EMPTY_OBJECT : options;
    this.output = "";
    if (setup.output != null) {
      this.output = setup.output;
      this.write = this.writeToStream;
    } else {
      this.output = "";
    }
    this.generator = setup.generator != null ? setup.generator : GENERATOR;
    this.expressionsPrecedence = setup.expressionsPrecedence != null ? setup.expressionsPrecedence : EXPRESSIONS_PRECEDENCE;
    this.indent = setup.indent != null ? setup.indent : "  ";
    this.lineEnd = setup.lineEnd != null ? setup.lineEnd : "\n";
    this.indentLevel = setup.startingIndentLevel != null ? setup.startingIndentLevel : 0;
    this.writeComments = setup.comments ? setup.comments : false;
    if (setup.sourceMap != null) {
      this.write = setup.output == null ? this.writeAndMap : this.writeToStreamAndMap;
      this.sourceMap = setup.sourceMap;
      this.line = 1;
      this.column = 0;
      this.lineEndSize = this.lineEnd.split("\n").length - 1;
      this.mapping = {
        original: null,
        generated: this,
        name: void 0,
        source: setup.sourceMap.file || setup.sourceMap._file
      };
    }
  }
  write(code) {
    this.output += code;
  }
  writeToStream(code) {
    this.output.write(code);
  }
  writeAndMap(code, node) {
    this.output += code;
    this.map(code, node);
  }
  writeToStreamAndMap(code, node) {
    this.output.write(code);
    this.map(code, node);
  }
  map(code, node) {
    if (node != null) {
      const { type } = node;
      if (type[0] === "L" && type[2] === "n") {
        this.column = 0;
        this.line++;
        return;
      }
      if (node.loc != null) {
        const { mapping } = this;
        mapping.original = node.loc.start;
        mapping.name = node.name;
        this.sourceMap.addMapping(mapping);
      }
      if (type[0] === "T" && type[8] === "E" || type[0] === "L" && type[1] === "i" && typeof node.value === "string") {
        const { length: length2 } = code;
        let { column, line } = this;
        for (let i = 0; i < length2; i++) {
          if (code[i] === "\n") {
            column = 0;
            line++;
          } else {
            column++;
          }
        }
        this.column = column;
        this.line = line;
        return;
      }
    }
    const { length } = code;
    const { lineEnd } = this;
    if (length > 0) {
      if (this.lineEndSize > 0 && (lineEnd.length === 1 ? code[length - 1] === lineEnd : code.endsWith(lineEnd))) {
        this.line += this.lineEndSize;
        this.column = 0;
      } else {
        this.column += length;
      }
    }
  }
  toString() {
    return this.output;
  }
};
function generate(node, options) {
  const state = new State(options);
  state.generator[node.type](node, state);
  return state.output;
}

// node_modules/@webqit/use-live/src/transformer/$qIdentifier.js
var $qIdentifier = class {
  type = "Identifier";
  whitelist = [];
  blacklist = [];
  constructor(name) {
    this.whitelist[0] = name;
  }
  get name() {
    return this.whitelist[0];
  }
  noConflict(name) {
    const i = this.whitelist.indexOf(name);
    if (i === -1)
      return false;
    this.blacklist.push(this.whitelist.splice(i, 1));
    if (!this.whitelist.length) {
      this.whitelist = this.blacklist.map((name2) => {
        let newVar;
        do {
          let randChar = String.fromCharCode(0 | Math.random() * 26 + 97);
          newVar = `${name2}${randChar}`;
        } while (this.blacklist.includes(newVar));
        return newVar;
      });
    }
  }
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
    ["start", "end"].forEach((offset2) => {
      const sourceNode = offset2 === "start" ? sources[0] : sources[sources.length - 1];
      target[offset2] = sourceNode[offset2];
      if (sourceNode.loc) {
        target.loc = target.loc || {};
        target.loc[offset2] = sourceNode.loc?.[offset2];
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

// node_modules/@webqit/use-live/src/transformer/$qDownstream.js
var $qDownstream = class {
  type = "BlockStatement";
  $body = [];
  constructor(nodes) {
    this.body = nodes;
  }
  get body() {
    return this.$body;
  }
  set body(nodes) {
    this.$body = nodes;
    Node_default.withLoc(this, ...nodes);
  }
};

// node_modules/@webqit/use-live/src/transformer/Scope.js
var Scope3 = class {
  constructor(context, { type }) {
    this.context = context;
    Object.assign(this, { type });
    this.vars = /* @__PURE__ */ new Set();
    this.$qIdentifiers = /* @__PURE__ */ new Map();
    this.$qIdentifiersCursors = { ...this.context?.$qIdentifiersCursors || {} };
    this.locations = [];
  }
  index(node, withLineColumn = false) {
    if (!this.type.includes("Function") && this.context)
      return this.context.index(...arguments);
    const locations = ["start", "end"].map((offset2) => {
      const elements = [Node_default.literal(node[offset2])];
      if (withLineColumn && node.loc) {
        elements.push(Node_default.literal(node.loc[offset2].line));
        elements.push(Node_default.literal(node.loc[offset2].column));
      }
      return Node_default.arrayExpr(elements);
    });
    this.locations.push(Node_default.arrayExpr(locations));
    return Node_default.literal(this.locations.length - 1);
  }
  get$qIdentifier(name, globally = true, random = false) {
    let identifer = this.$qIdentifiers.get(name);
    if (!identifer) {
      if (globally && this.context)
        return this.context.get$qIdentifier(name, globally);
      if (random) {
        if (typeof this.$qIdentifiersCursors[name] === "undefined") {
          this.$qIdentifiersCursors[name] = 0;
        }
        name += this.$qIdentifiersCursors[name]++;
      }
      this.$qIdentifiers.set(name, identifer = new $qIdentifier(name));
    }
    return identifer;
  }
  getRandomIdentifier(name, globally = true) {
    return this.get$qIdentifier(name, globally, true);
  }
  $qIdentifiersNoConflict(name) {
    for (let [, identifer] of this.$qIdentifiers) {
      identifer.noConflict(name);
    }
    this.context && this.context.$qIdentifiersNoConflict(name);
  }
  push(identifier, type, willUpdate = false) {
    let def;
    if (["var", "update"].includes(type) && (def = this.find(identifier, false)) && def.type !== "const") {
      def.willUpdate = true;
    } else if (type !== "update" || !this.context) {
      if (!(identifier instanceof $qIdentifier)) {
        this.$qIdentifiersNoConflict(identifier.name + "");
      }
      this.vars.add({ identifier, type, willUpdate: willUpdate || type === "update" });
    }
    if (this.context && (type === "update" || type === "var" && !this.type.includes("Function"))) {
      return this.context.push(identifier, type);
    }
    return true;
  }
  find(identifier, globally = true) {
    let def;
    for (const _var of this.vars) {
      if (_var.identifier.name + "" === identifier.name + "") {
        def = _var;
        break;
      }
    }
    if (!def && globally)
      return this.context?.find(identifier, globally);
    return def;
  }
};

// node_modules/@webqit/use-live/src/transformer/Transformer.js
var Transformer = class {
  history = [];
  scopes = [];
  functionTypes = ["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"];
  loopTypes = ["DoWhileStatement", "WhileStatement", "ForStatement", "ForOfStatement", "ForInStatement"];
  labeledTypes = ["SwitchStatement", "LabeledStatement"];
  topLevelAwait = false;
  topLevelArgsKeyword = false;
  exportIds = [];
  constructor(params = {}) {
    this.params = params;
  }
  pushScope(scopeData, callback) {
    const scope = new Scope3(this.currentScope, scopeData);
    this.scopes.unshift(scope);
    const returnValue = callback();
    this.scopes.shift();
    return returnValue;
  }
  get currentScope() {
    return this.scopes[0];
  }
  pushHistory(state, callback) {
    this.history.unshift(state);
    const returnValue = callback();
    this.history.shift();
    return returnValue;
  }
  get currentEntry() {
    return this.history[0];
  }
  serialize(ast, params = {}) {
    return generate(ast, { comments: true, ...params });
  }
  transform(ast) {
    if (ast.type !== "Program")
      throw new Error('AST must be of type "Program".');
    return this.pushScope(ast, () => {
      this.currentScope.get$qIdentifier("$q");
      this.currentScope.get$qIdentifier("$q2");
      const body = this.transformNodes(ast.body, { static: !ast.isLiveProgram });
      const newAst = { ...ast, body };
      if (newAst.body.length) {
        newAst.body[0].comments = Node_default.comments("Program body");
      }
      const locationsAssignment = Node_default.exprStmt(Node_default.assignmentExpr(this.$path("locations"), Node_default.arrayExpr(this.currentScope.locations)));
      locationsAssignment.comments = Node_default.comments("Location data");
      newAst.body.unshift(locationsAssignment);
      if (this.exports.size) {
        this.exports.forEach((args) => {
          newAst.body.push(Node_default.exprStmt(this.$call("export", ...args)));
        });
        const promiseAll = Node_default.memberExpr(Node_default.identifier("Promise"), Node_default.identifier("all"));
        newAst.body.push(Node_default.exprStmt(Node_default.awaitExpr(Node_default.callExpr(promiseAll, [this.$path("$promises.exports")]))));
        this.topLevelAwait = true;
      }
      const identifier = this.currentScope.get$qIdentifier("$q").name;
      const identifier2 = this.currentScope.get$qIdentifier("$q2").name;
      const transformedSource = this.params.astResult ? newAst : this.serialize(newAst, { startingIndentLevel: this.params.startingIndentLevel });
      const transformedSourceBase64 = this.params.base64 && !this.params.astResult ? btoa(this.params.base64.replace("%0", identifier + "").replace("%1", transformedSource)) : "";
      return {
        identifier,
        identifier2,
        transformedSource,
        transformedSourceBase64,
        originalSource: ast.originalSource,
        isLiveProgram: ast.isLiveProgram,
        hasLiveFuntions: ast.hasLiveFuntions,
        topLevelAwait: this.topLevelAwait,
        exportIds: this.exportIds,
        toString(base64 = void 0) {
          return base64 === "base64" ? this.transformedSourceBase64 : this.transformedSource;
        }
      };
    });
  }
  transformNodes(nodes, state = {}) {
    const total = (nodes = nodes.filter((s) => s)).length;
    const [imports, functions, other] = nodes.reduce(([imports2, functions2, other2], node) => {
      return node?.type === "ImportDeclaration" ? [imports2.concat(node), functions2, other2] : node?.type === "FunctionDeclaration" ? [imports2, functions2.concat(node), other2] : [imports2, functions2, other2.concat(node)];
    }, [[], [], []]);
    nodes = [...imports, ...functions, ...other];
    return function eat2(build, i) {
      if (i === total)
        return build;
      const [$node_s, $state] = this.transformNode(nodes[i], state, true);
      build = build.concat($node_s || []);
      if (i === imports.length - 1) {
        const promiseAll = Node_default.memberExpr(Node_default.identifier("Promise"), Node_default.identifier("all"));
        build = build.concat(Node_default.exprStmt(Node_default.awaitExpr(Node_default.callExpr(promiseAll, [this.$path("$promises.imports")]))));
      }
      if (["ReturnStatement", "BreakStatement", "ContinueStatement"].includes(nodes[i].type))
        return build;
      if ($state.flowControl?.size && $state.node.type === "IfStatement") {
        const restNodes = nodes.slice(i + 1);
        if (restNodes.length) {
          const downstream = new $qDownstream(restNodes);
          return build.concat(this.transformNode(downstream));
        }
      }
      return eat2.call(this, build, i + 1);
    }.call(this, [], 0);
  }
  transformNode(node, state = {}, getState = false) {
    if (typeof node !== "object" || !node)
      return node;
    const historyData = {
      static: this.currentEntry?.static,
      isLeft: this.currentEntry?.isLeft,
      mode: this.currentEntry?.mode,
      ...state,
      parentNode: this.currentEntry?.node,
      node,
      hoistedAwaitKeyword: false,
      flowControl: /* @__PURE__ */ new Map()
    };
    const $node = this.pushHistory(historyData, () => {
      if (this[`transform${node.type}`]) {
        return this[`transform${node.type}`].call(this, node);
      }
      return Object.keys(node).reduce(($node2, key) => {
        const value = Array.isArray(node[key]) ? this.transformNodes(node[key], state) : this.transformNode(node[key], state);
        return { ...$node2, [key]: value };
      }, {});
    });
    return getState ? [$node, historyData] : $node;
  }
  $serial(node) {
    return this.currentScope.index(node, this.params.locations);
  }
  $path(path2) {
    return path2.split(".").reduce((obj, prop) => Node_default.memberExpr(obj, Node_default.identifier(prop)), this.currentScope.get$qIdentifier("$q"));
  }
  $trail() {
    return this.currentEntry.trail ? [Node_default.literal(this.currentEntry.trail)] : [];
  }
  $call(callee, ...args) {
    return Node_default.callExpr(this.$path(callee), args);
  }
  $typed(as, value, name = null) {
    const $namePart = name ? [Node_default.literal(name)] : [];
    return this.$call("typed", Node_default.literal(as), value, ...$namePart);
  }
  $obj(obj) {
    const entries = Object.entries(obj).map(([name, value]) => Node_default.property(Node_default.identifier(name), Array.isArray(value) ? Node_default.arrayExpr(value) : value));
    return Node_default.objectExpr(entries);
  }
  $closure(...args) {
    let body = args.pop(), params = args.pop() || [];
    if (body.type === "EmptyStatement")
      body = Node_default.blockStmt([]);
    return Node_default.arrowFuncExpr(null, params, body, this.currentEntry.hoistedAwaitKeyword);
  }
  $var(kind, $serial, id, init9, ...$rest) {
    const closure = init9 ? this.$closure([this.currentScope.get$qIdentifier("$q")], init9) : Node_default.identifier("undefined");
    let autorunExpr = this.$call(kind, Node_default.literal(id), $serial, closure, ...$rest);
    if (closure.async) {
      autorunExpr = Node_default.awaitExpr(autorunExpr);
    }
    return Node_default.exprStmt(autorunExpr);
  }
  $update(left, right, ...$rest) {
    const closure = this.$closure(right);
    return this.$call("update", Node_default.literal(left.name), closure, ...$rest);
  }
  $autorun(type, ...rest) {
    const body = rest.pop();
    const $serial = rest.pop();
    const spec = rest.pop() || {};
    const $spec = Object.keys(spec).length ? [this.$obj(spec)] : [];
    ;
    const closure = this.$closure([this.currentScope.get$qIdentifier("$q")], body);
    let autorunExpr = this.$call("autorun", Node_default.literal(type), ...$spec, $serial, closure);
    if (closure.async) {
      autorunExpr = Node_default.awaitExpr(autorunExpr);
    }
    return Node_default.exprStmt(autorunExpr);
  }
  $iteration(kind, $serial, body) {
    const $kind = Node_default.literal(kind);
    const label = this.currentEntry.parentNode?.label ? Node_default.literal(this.currentEntry.parentNode.label.name) : Node_default.identifier("null");
    const spec = { kind: $kind, label };
    const $body = Node_default.blockStmt(body);
    return this.$autorun("iteration", spec, $serial, $body);
  }
  hoistAwaitKeyword() {
    for (const entry of this.history) {
      entry.hoistedAwaitKeyword = true;
      if (entry.node.type.includes("Function"))
        return;
    }
    this.topLevelAwait = true;
  }
  hoistArgumentsKeyword() {
    const keywordScopes = ["FunctionDeclaration", "FunctionExpression"];
    if (this.history.some((e) => keywordScopes.includes(e.node.type)))
      return;
    this.topLevelArgsKeyword = true;
    return true;
  }
  hoistExitStatement(cmd, arg = {}) {
    for (const entry of this.history) {
      const isTargetSwitch = () => entry.node?.type === "SwitchStatement" && cmd.value === "break" && arg.name === "null";
      const isTargetLabel = () => entry.parentNode?.type === "LabeledStatement" && this.loopTypes.includes(entry.parentNode.body.type) && arg.value === entry.parentNode.label.name;
      const isBareExit = () => this.loopTypes.includes(entry.node.type) && arg.name === "null";
      if (isTargetSwitch()) {
        return entry.node;
      }
      if (isTargetLabel() || isBareExit()) {
        entry.flowControl.set(cmd, { ...arg, endpoint: true });
        return entry.node;
      }
      if (entry.node.type.includes("Function"))
        return;
      entry.flowControl.set(cmd, arg);
    }
  }
  transformFunctionDeclaration(node) {
    return this.transformFunction(Node_default.funcDeclaration, ...arguments);
  }
  transformFunctionExpression(node) {
    return this.transformFunction(Node_default.funcExpr, ...arguments);
  }
  transformArrowFunctionExpression(node) {
    return this.transformFunction(Node_default.arrowFuncExpr, ...arguments);
  }
  transformFunction(transform2, node) {
    if (node.generator && node.isLiveFunction) {
      throw new Error(`Generator functions cannot be live functions.`);
    }
    const $serial = this.$serial(node);
    let { id, params, body } = node;
    [id, params, body] = this.pushScope(node, () => {
      const $body2 = [];
      if (this.currentEntry.isExport && !id) {
        id = this.currentScope.getRandomIdentifier("$rand", true);
      }
      if (id) {
        this.currentScope.push(id, "self");
      }
      const $params = params.map((param) => {
        if (param.type === "AssignmentPattern" && node.isLiveFunction) {
          const $rand = this.currentScope.getRandomIdentifier("$rand", false);
          const $param = this.transformSignal($rand, "param");
          const declaration = Node_default.varDeclarator(param.left, Node_default.withLoc(Node_default.logicalExpr("||", $rand, param.right), param));
          $body2.push(...this.transformNode(Node_default.varDeclaration("let", [Node_default.withLoc(declaration, param)]), { static: !node.isLiveFunction }));
          return $param;
        }
        return this.transformSignal(param, "param");
      });
      const $$body = this.transformNodes(body.type === "BlockStatement" ? body.body : [Node_default.returnStmt(body)], { static: !node.isLiveFunction });
      $body2.push(...$$body);
      if ($body2.length) {
        $body2[0].comments = Node_default.comments("Function body");
      }
      const locationsAssignment = Node_default.exprStmt(Node_default.assignmentExpr(this.$path("locations"), Node_default.arrayExpr(this.currentScope.locations)));
      locationsAssignment.comments = Node_default.comments("Location data");
      $body2.unshift(locationsAssignment);
      return [id, $params, Node_default.blockStmt($body2)];
    });
    const $qIdentifier2 = this.currentScope.get$qIdentifier("$q");
    const closure = this.$closure([$qIdentifier2], body);
    const executionMode = Node_default.literal(node.isLiveFunction ? "LiveFunction" : node.isHandler ? "HandlerFunction" : node.isFinalizer ? "FinalizerFunction" : "RegularFunction");
    const functionKind = Node_default.literal(node.type === "FunctionDeclaration" ? "Declaration" : "Expression");
    const $body = Node_default.blockStmt([Node_default.returnStmt(this.$call("runtime.spawn", executionMode, node.type === "ArrowFunctionExpression" ? Node_default.identifier("null") : Node_default.thisExpr(), closure, $qIdentifier2))]);
    const metarisation = (reference) => this.$call("function", executionMode, functionKind, $serial, reference);
    let resultNode = transform2.call(Node_default, id, params, $body, node.async, node.expresion, node.generator);
    if (node.type === "FunctionDeclaration") {
      this.currentScope.push(id, "static");
      resultNode = [resultNode, Node_default.exprStmt(metarisation(id))];
      if (this.currentEntry.isExport) {
        const spec = [Node_default.literal(id), $serial];
        if (this.currentEntry.isExport === "as-default") {
          spec.push(Node_default.literal("default"));
          this.exportIds.push("default");
        } else {
          this.exportIds.push(id.name);
        }
        this.exports.add([Node_default.arrayExpr(spec)]);
      }
    } else if (!this.currentEntry.isMethod) {
      resultNode = metarisation(resultNode);
    }
    return resultNode;
  }
  transformClassDeclaration(node) {
    return this.transformClass(Node_default.classDeclaration, ...arguments);
  }
  transformClassExpression(node) {
    return this.transformClass(Node_default.classExpression, ...arguments);
  }
  transformClass(transform2, node) {
    let { id, body, superClass } = node;
    if (superClass) {
      superClass = this.transformNode(superClass);
    }
    const methods = /* @__PURE__ */ new Set();
    body = this.pushScope(node, () => {
      if (this.currentEntry.isExport && !id) {
        id = this.currentScope.getRandomIdentifier("$rand", true);
      }
      if (id) {
        this.currentScope.push(id, "self");
      }
      return this.transformNode(body, { methods });
    });
    const classKind = Node_default.literal(node.type === "ClassDeclaration" ? "Declaration" : "Expression");
    const metarisation = (reference) => {
      const methodsSpec = Node_default.arrayExpr([...methods].map((m) => this.$obj(m)));
      return this.$call("class", classKind, reference, methodsSpec);
    };
    let resultNode = transform2.call(Node_default, id, body, superClass);
    if (node.type === "ClassDeclaration") {
      this.currentScope.push(id, "static");
      resultNode = [resultNode, Node_default.exprStmt(metarisation(id))];
      if (this.currentEntry.isExport) {
        const spec = [Node_default.literal(id), this.$serial(node)];
        if (this.currentEntry.isExport === "as-default") {
          spec.push(Node_default.literal("default"));
          this.exportIds.push("default");
        } else {
          this.exportIds.push(id.name);
        }
        this.exports.add([Node_default.arrayExpr(spec)]);
      }
    } else {
      resultNode = metarisation(resultNode);
    }
    return resultNode;
  }
  transformMethodDefinition(node) {
    let { key, value } = node;
    if (node.computed) {
      key = this.transformNode(key);
    }
    const $value = this.transformNode(value, { static: true, isMethod: true });
    this.currentEntry.methods.add({
      name: node.computed ? key : Node_default.literal(key),
      static: Node_default.identifier(node.static),
      isLiveFunction: Node_default.identifier(value.isLiveFunction || false),
      serial: this.$serial(node)
    });
    return Node_default.methodDefinition(key, $value, node.kind, node.static, node.computed);
  }
  transformPropertyDefinition(node) {
    let { key, value } = node;
    if (node.computed) {
      key = this.transformNode(key);
    }
    value = this.transformNode(value);
    return Node_default.exprStmt(Node_default.propertyDefinition(key, value, node.static, node.computed));
  }
  exports = /* @__PURE__ */ new Set();
  transformExportDefaultDeclaration(node) {
    return this.handleExports(...arguments);
  }
  transformExportNamedDeclaration(node) {
    return this.handleExports(...arguments);
  }
  transformExportAllDeclaration(node) {
    return this.handleExports(...arguments);
  }
  handleExports(node) {
    if (node.type === "ExportAllDeclaration") {
      const spec = [Node_default.literal("*"), this.$serial(node.exported || node), Node_default.literal(node.exported?.name || node.exported?.value || "")];
      this.exports.add([Node_default.arrayExpr(spec), this.$obj({ source: node.source, serial: this.$serial(node) })]);
      this.exportIds.push(spec[2].value);
      return;
    }
    const specifiers = (specs) => specs.map((spec) => {
      const $spec = [Node_default.literal(spec.local.name), this.$serial(spec)];
      const alias = spec.exported.name || spec.exported.value;
      if (alias !== spec.local.name)
        $spec.push(Node_default.literal(alias));
      this.exportIds.push(alias);
      return Node_default.arrayExpr($spec);
    });
    if (node.source) {
      this.exports.add(specifiers(node.specifiers).concat(this.$obj({ source: node.source, serial: this.$serial(node) })));
      return;
    }
    if (node.type === "ExportNamedDeclaration" && node.specifiers.length) {
      this.exports.add(specifiers(node.specifiers));
      return;
    }
    if (node.type === "ExportDefaultDeclaration") {
      if (["Identifier", "ThisExpression"].includes(node.declaration.type)) {
        const spec = [Node_default.literal(node.declaration.name || "this"), this.$serial(node), Node_default.literal("default")];
        this.exports.add([Node_default.arrayExpr(spec)]);
        this.exportIds.push("default");
        return;
      }
      if (node.declaration.type === "Literal") {
        const spec = [Node_default.identifier(null), this.$serial(node), Node_default.literal("default"), node.declaration];
        this.exports.add([Node_default.arrayExpr(spec)]);
        this.exportIds.push("default");
        return;
      }
    }
    return this.transformNode(node.declaration, { isExport: node.type === "ExportDefaultDeclaration" ? "as-default" : true });
  }
  transformImportDeclaration(node) {
    const specifiers = node.specifiers.map((spec) => {
      let { imported, local } = spec;
      this.transformSignal(local, "import");
      if (spec.type === "ImportNamespaceSpecifier") {
        imported = Node_default.identifier("*");
      } else if (spec.type === "ImportDefaultSpecifier") {
        imported = Node_default.identifier("default");
      }
      const $imported = imported.name || imported.value || "";
      const $spec = [Node_default.literal($imported), this.$serial(spec)];
      if ($imported !== spec.local.name)
        $spec.push(Node_default.literal(spec.local.name));
      return Node_default.arrayExpr($spec);
    });
    return Node_default.exprStmt(this.$call("import", ...specifiers.concat(this.$obj({ source: node.source, serial: this.$serial(node) }))));
  }
  transformImportExpression(node) {
    return this.$call("import", this.$obj({ source: node.source, isDynamic: Node_default.identifier("true"), serial: this.$serial(node) }));
  }
  transformSignal(node, mode, signals = null) {
    if (node.type === "Identifier") {
      this.currentScope.push(node, mode, ["let", "param"].includes(mode));
      signals?.add(node);
      return node;
    }
    return this.transformNode(node, { mode, static: true, signals });
  }
  transformThisExpression(node) {
    return this.transformIdentifier(...arguments);
  }
  transformIdentifier(node) {
    const ref2 = this.currentScope.find(node);
    if (!ref2 && node.name) {
      this.currentScope.$qIdentifiersNoConflict(node.name);
    }
    const hintArg = [];
    if (node.hint) {
      hintArg.push(this.$obj({ [node.hint]: Node_default.identifier(true) }));
    } else if (this.currentEntry.mode === "callee") {
    }
    if (["param", "self"].includes(ref2?.type) || ["arguments"].includes(node.name)) {
      if (this.currentEntry.trail)
        return this.$call("obj", node, ...this.$trail(), ...hintArg);
      return node;
    }
    if (node.type === "ThisExpression") {
      return this.$call("ref", Node_default.literal("this"), ...this.$trail(), ...hintArg);
    }
    this.history.forEach((state) => state.refs?.add(node));
    if (this.currentEntry.isLeft && this.currentEntry.mode !== "callee") {
      hintArg.push(this.$obj({ isLeft: Node_default.literal(true) }));
    }
    return this.$call("ref", Node_default.literal(node), ...this.$trail(), ...hintArg);
  }
  transformMemberExpression(node) {
    let { object, property, computed, optional } = node;
    if (computed) {
      property = this.transformNode(property);
    }
    let $object = this.transformNode(object, { trail: (this.currentEntry.trail || 0) + 1 });
    if (object.typed) {
      $object = this.$typed(object.typed, $object, Node_default.literal(property));
    }
    return Node_default.memberExpr($object, property, computed, optional);
  }
  transformVariableDeclaration(node) {
    const isExport = this.currentEntry.isExport;
    const entries = node.declarations.reduce((decs, dec) => {
      if (["ObjectPattern", "ArrayPattern"].includes(dec.id.type)) {
        return decs.concat(this.expandPattern(dec.id, dec.init));
      }
      return decs.concat(dec);
    }, []);
    return entries.reduce((stmts, dec) => {
      const $serial = this.$serial(dec);
      let $init = this.transformNode(dec.init);
      this.transformSignal(dec.id, node.kind, this.currentEntry.signals);
      let $rest = [];
      if (dec.restOf) {
        $init = this.$typed(dec.init.typed, $init);
        $rest.push(this.$obj({ restOf: dec.restOf, type: Node_default.literal(dec.init.typed === "iterable" ? "array" : "object") }));
      }
      const $stmts = stmts.concat(this.$var(node.kind, $serial, dec.id, $init, ...$rest));
      if (isExport && !(dec.id instanceof $qIdentifier)) {
        const spec = [Node_default.literal(dec.id), $serial];
        this.exports.add([Node_default.arrayExpr(spec)]);
        this.exportIds.push(dec.id.name);
      }
      return $stmts;
    }, []);
  }
  transformAssignmentExpression(node) {
    const staticMode = this.currentEntry.static;
    const expandableAsStatements = !staticMode && this.history[1].node.type === "ExpressionStatement";
    let { left, right } = node;
    const assignmentExpr = (left2, right2) => {
      right2 = this.transformNode(right2);
      left2 = this.transformNode(left2, { isLeft: true });
      return Node_default.assignmentExpr(left2, right2, node.operator);
    };
    if (["MemberExpression", "ChainExpression"].includes(left.type)) {
      return assignmentExpr(left, right);
    }
    if (["ObjectPattern", "ArrayPattern"].includes(left.type)) {
      let potentialNewRight = right;
      const declarations = this.expandPattern(left, right, expandableAsStatements).reduce((stmts, dec) => {
        if (dec.id.originalB) {
          potentialNewRight = dec.id;
        }
        if (dec.type === "AssignmentExpression") {
          return stmts.concat(assignmentExpr(dec.left, dec.right));
        }
        let $init = this.transformNode(dec.init);
        if (dec.id instanceof $qIdentifier) {
          const $serial = this.$serial(dec);
          return stmts.concat(this.$var("let", $serial, dec.id, $init));
        }
        this.transformSignal(dec.id, "update", this.currentEntry.signals);
        let $rest = [];
        if (dec.restOf) {
          $init = this.$typed(dec.init.typed, $init);
          $rest.push(this.$obj({ restOf: dec.restOf, type: Node_default.literal(dec.init.typed === "iterable" ? "array" : "object") }));
        }
        return stmts.concat(this.$update(dec.id, $init, ...$rest));
      }, []);
      if (expandableAsStatements)
        return declarations;
      return Node_default.sequenceExpr(declarations.concat(potentialNewRight));
    }
    right = this.transformNode(right);
    this.transformSignal(left, "update", this.currentEntry.signals);
    const currentValueLocalIdentifier = this.currentScope.getRandomIdentifier("$current", false);
    return this.$call("update", Node_default.literal(left), this.$closure([currentValueLocalIdentifier], Node_default.assignmentExpr(currentValueLocalIdentifier, right, node.operator.replace("====", ""))));
  }
  transformAssignmentPattern(node) {
    let { left, right } = node;
    right = this.transformNode(right);
    if (["MemberExpression", "ChainExpression"].includes(left.type)) {
      left = this.transformNode(left, { static: true });
    } else {
      left = this.transformSignal(left, this.currentEntry.mode, this.currentEntry.signals);
    }
    return Node_default.assignmentPattern(left, right);
  }
  expandPattern(a, b, withIntermediates = true) {
    const declarations = [], _this = this;
    if (!["Identifier", "Literal"].includes(b.type) && withIntermediates) {
      const intermediateLocalIdentifier = Node_default.withLoc(_this.currentScope.getRandomIdentifier("$rand", false), b);
      intermediateLocalIdentifier.originalB = true;
      b.typed = a.type === "ObjectPattern" ? "desctructurable" : "iterable";
      declarations.push(Node_default.withLoc(Node_default.varDeclarator(intermediateLocalIdentifier, b), b));
      b = intermediateLocalIdentifier;
    }
    (function expand(patternEntries, $init, isObjectType) {
      $init.typed = isObjectType ? "desctructurable" : "iterable";
      const localIdentifiers = [];
      for (let i = 0; i < patternEntries.length; i++) {
        let entry = patternEntries[i], key = i, value = entry;
        if (entry === null) {
          localIdentifiers.push(i);
          continue;
        }
        if (entry.type === "RestElement") {
          const dec = Node_default.withLoc(Node_default.varDeclarator(entry.argument, $init), entry);
          dec.restOf = localIdentifiers.map((v) => Node_default.literal(v));
          declarations.push(dec);
          continue;
        }
        if (isObjectType) {
          ({ key, value } = entry);
        } else {
          key = Node_default.literal(key);
        }
        let defaultValue, localIdentifier;
        if (value.type === "AssignmentPattern") {
          defaultValue = value.right;
          if (value.left.type === "Identifier") {
            localIdentifier = value.left;
          } else {
            value = value.left;
          }
        } else if (value.type === "Identifier") {
          localIdentifier = value;
        }
        let init9 = Node_default.memberExpr($init, key, isObjectType ? entry.computed : true);
        if (defaultValue) {
          init9 = Node_default.logicalExpr("||", init9, defaultValue);
        }
        if (localIdentifier) {
          declarations.push(Node_default.withLoc(Node_default.varDeclarator(localIdentifier, init9), entry));
          localIdentifiers.push(key);
        } else if (value.type === "MemberExpression" || value.type === "ChainExpression" && (value = value.expression)) {
          declarations.push(Node_default.withLoc(Node_default.assignmentExpr(value, init9), entry));
        } else if (value.elements || value.properties) {
          const numDeclarationsAtLevel = (value.properties ? value.properties : value.elements).length > 1;
          if (withIntermediates && numDeclarationsAtLevel) {
            const intermediateLocalIdentifier = _this.currentScope.getRandomIdentifier("$rand", false);
            declarations.push(Node_default.withLoc(Node_default.varDeclarator(intermediateLocalIdentifier, init9), entry));
            init9 = intermediateLocalIdentifier;
          }
          expand(value.elements || value.properties, init9, value.properties && true);
        }
      }
    })(a.elements || a.properties, b, a.properties && true);
    return declarations;
  }
  transformUpdateExpression(node) {
    if (node.argument.type === "Identifier") {
      this.transformSignal(node.argument, "update", this.currentEntry.signals);
      const currentValueLocalIdentifier = this.currentScope.getRandomIdentifier("$current", false);
      const expr = Node_default.binaryExpr(node.operator === "--" ? "-" : "+", currentValueLocalIdentifier, Node_default.literal(1), true);
      const kind = (node.prefix ? "pre" : "post") + (node.operator === "--" ? "dec" : "inc");
      return this.$call("update", Node_default.literal(node.argument.name), this.$closure([currentValueLocalIdentifier], expr), this.$obj({ kind: Node_default.literal(kind) }));
    }
    return Node_default.updateExpr(node.operator, this.transformNode(node.argument), node.prefix);
  }
  transformUnaryExpression(node) {
    if (node.operator === "typeof" && node.argument.type === "Identifier") {
      node.argument.hint = "isTypeCheck";
    }
    return Node_default.unaryExpr(node.operator, this.transformNode(node.argument));
  }
  transformIfStatement(node) {
    const $serial = this.$serial(node);
    let { test, consequent, alternate } = node;
    test = this.transformNode(node.test);
    consequent = this.pushScope(node, () => this.transformNodes(consequent.type === "BlockStatement" ? consequent.body : [consequent]));
    if (alternate)
      alternate = [].concat(this.transformNode(alternate))[0];
    const construct2 = Node_default.ifStmt(test, Node_default.blockStmt(consequent), alternate);
    return this.$autorun("block", { static: Node_default.identifier(this.currentEntry.static) }, $serial, Node_default.blockStmt([construct2]));
  }
  transformSwitchStatement(node) {
    const $serial = this.$serial(node);
    return this.pushScope(node, () => {
      const discriminant = this.transformNode(node.discriminant);
      const cases = node.cases.map((caseNode) => {
        const test = this.transformNode(caseNode.test);
        const consequent = this.transformNodes(caseNode.consequent);
        return Node_default.switchCase(test, consequent);
      });
      const construct2 = Node_default.switchStmt(discriminant, cases);
      return this.$autorun("switch", { static: Node_default.identifier(this.currentEntry.static) }, $serial, Node_default.blockStmt([construct2]));
    });
  }
  transformTryStatement(node) {
    return this.pushScope(node, () => {
      const $serial = this.$serial(node);
      const { block, handler, finalizer } = node;
      const body = this.transformNodes(block.body);
      const spec = {};
      if (handler) {
        const { start, end } = handler;
        const $handler = Node_default.arrowFuncExpr(null, [handler.param], handler.body);
        spec.handler = this.transformNode({ ...$handler, isHandler: true, start, end }, { static: true });
      }
      if (finalizer) {
        const { start, end } = finalizer;
        const $finalizer = Node_default.arrowFuncExpr(null, [], finalizer.body);
        spec.finalizer = this.transformNode({ ...$finalizer, isFinalizer: true, start, end }, { static: true });
      }
      return this.$autorun("block", spec, $serial, Node_default.blockStmt(body));
    });
  }
  transformWhileStatement(node) {
    return this.transformLoopStmtA(Node_default.whileStmt, ...arguments);
  }
  transformDoWhileStatement(node) {
    return this.transformLoopStmtA(Node_default.doWhileStmt, ...arguments);
  }
  transformForStatement(node) {
    return this.transformLoopStmtA(Node_default.forStmt, ...arguments);
  }
  transformLoopStmtA(transform2, node) {
    const kind = node.type === "WhileStatement" ? "while" : node.type === "DoWhileStatement" ? "do-while" : "for";
    const $serial = this.$serial(node);
    return this.pushScope(node, () => {
      const $qIdentifier2 = this.currentScope.get$qIdentifier("$q");
      let createNodeCallback;
      const spec = {
        kind: Node_default.literal(kind),
        label: this.currentEntry.parentNode?.label ? Node_default.literal(this.currentEntry.parentNode.label.name) : Node_default.identifier("null"),
        static: Node_default.identifier(this.currentEntry.static)
      };
      if (kind === "for") {
        const init9 = Node_default.blockStmt([].concat(this.transformNode(node.init) || []));
        spec.init = this.$closure([$qIdentifier2], init9);
        const test = this.transformNode(node.test);
        spec.test = this.$closure([$qIdentifier2], test);
        const update = this.transformNode(node.update);
        spec.advance = this.$closure([$qIdentifier2], update);
        createNodeCallback = ($body2) => transform2.call(Node_default, init9, test, update, $body2);
      } else {
        const test = this.transformNode(node.test);
        spec.test = this.$closure([$qIdentifier2], test);
        createNodeCallback = ($body2) => transform2.call(Node_default, test, $body2);
      }
      const $body = Node_default.blockStmt(this.transformNodes(node.body.type === "BlockStatement" ? node.body.body : [node.body]));
      return this.$autorun("iteration", spec, $serial, $body);
    });
  }
  transformForOfStatement(node) {
    return this.transformLoopStmtB(Node_default.forOfStmt, ...arguments);
  }
  transformForInStatement(node) {
    return this.transformLoopStmtB(Node_default.forInStmt, ...arguments);
  }
  transformLoopStmtB(transform2, node) {
    const kind = node.type === "ForInStatement" ? "for-in" : "for-of";
    const $serial = this.$serial(node);
    const right = this.transformNode(node.right);
    return this.pushScope(node, () => {
      const $qIdentifier2 = this.currentScope.get$qIdentifier("$q");
      const production = this.currentScope.get$qIdentifier(kind === "for-of" ? "$val" : "$key", false);
      const spec = {
        kind: Node_default.literal(kind),
        label: this.currentEntry.parentNode?.label ? Node_default.literal(this.currentEntry.parentNode.label.name) : Node_default.identifier("null"),
        parameters: this.$closure([$qIdentifier2], Node_default.arrayExpr([Node_default.literal(production), right])),
        static: Node_default.identifier(this.currentEntry.static)
      };
      let originalLeft;
      if (node.left.type === "VariableDeclaration") {
        const declarator = Node_default.withLoc(Node_default.varDeclarator(node.left.declarations[0].id, production), node.left);
        originalLeft = Node_default.varDeclaration(node.left.kind, [declarator]);
      } else {
        originalLeft = Node_default.withLoc(Node_default.assignmentExpr(node.left, production), node.left);
      }
      const $body = Node_default.blockStmt(this.transformNodes([originalLeft].concat(node.body.type === "BlockStatement" ? node.body.body : node.body)));
      return this.$autorun("iteration", spec, $serial, $body);
    });
  }
  transformBreakStatement(node) {
    return this.transformExitStmt(Node_default.breakStmt, ...arguments);
  }
  transformContinueStatement(node) {
    return this.transformExitStmt(Node_default.continueStmt, ...arguments);
  }
  transformExitStmt(transform2, node) {
    const keyword = node.type === "BreakStatement" ? "break" : "continue";
    const cmd = Node_default.literal(keyword);
    const label = node.label ? Node_default.literal(node.label.name) : Node_default.identifier("null");
    this.hoistExitStatement(cmd, label);
    if (this.currentEntry.parentNode?.type === "SwitchStatement") {
      return transform2.call(Node_default);
    }
    return Node_default.exprStmt(this.$call(keyword, label));
  }
  transformReturnStatement(node) {
    const refs = /* @__PURE__ */ new Set();
    const argument = this.transformNode(node.argument, { refs });
    const cmd = Node_default.literal("return");
    const args = argument ? [cmd, argument] : [cmd];
    this.hoistExitStatement(...args);
    const hoisting = this.$call("return", ...args.slice(1));
    if (!refs.size)
      return Node_default.exprStmt(hoisting);
    const $serial = this.$serial(node);
    return this.$autorun("return", $serial, hoisting);
  }
  transformBlockStatement(node) {
    const $serial = this.$serial(node);
    if (node instanceof $qDownstream) {
      const body = this.transformNodes(node.body, { static: false });
      return this.$autorun("downstream", $serial, Node_default.blockStmt(body));
    }
    return this.pushScope(node, () => {
      const body = Node_default.blockStmt(this.transformNodes(node.body));
      return this.$autorun("block", { static: Node_default.identifier(this.currentEntry.static) }, $serial, body);
    });
  }
  transformLabeledStatement(node) {
    this.currentScope.push(node.label, "const");
    const body = [].concat(this.transformNode(node.body));
    return [Node_default.labeledStmt(node.label, body.shift()), ...body];
  }
  transformExpressionStatement(node) {
    const $serial = this.$serial(node);
    const expression = this.transformNode(node.expression);
    const expression_s = [].concat(expression || []);
    return expression_s.reduce((stmts, expression2) => {
      if (expression2.type === "VariableDeclaration" || expression2.type.endsWith("Statement")) {
        return stmts.concat(expression2);
      }
      const spec = {};
      if (this.currentEntry.static) {
        spec.static = Node_default.literal(true);
      }
      if (["UpdateExpression", "UnaryExpression"].includes(expression2.type)) {
        spec.isWrite = Node_default.literal(true);
      }
      return stmts.concat(this.$autorun("stmt", spec, $serial, expression2));
    }, []);
  }
  transformAwaitExpression(node) {
    this.hoistAwaitKeyword();
    const argument = this.transformNode(node.argument);
    return Node_default.awaitExpr(argument);
  }
  transformSequenceExpression(node) {
    const expresions = node.expressions.reduce((exprs, expr, i) => {
      return exprs.concat(this.transformNode(expr, { trail: i === node.expressions.length - 1 ? this.currentEntry.trail : void 0 }));
    }, []);
    if (this.history[1].node.type === "ExpressionStatement")
      return expresions;
    return Node_default.sequenceExpr(expresions);
  }
  transformConditionalExpression(node) {
    let { test, consequent, alternate } = node;
    test = this.transformNode(test);
    consequent = this.transformNode(consequent, { trail: this.currentEntry.trail });
    alternate = this.transformNode(alternate, { trail: this.currentEntry.trail });
    return Node_default.conditionalExpr(test, consequent, alternate);
  }
  transformLogicalExpression(node) {
    let { left, right } = node;
    left = this.transformNode(left, { trail: this.currentEntry.trail });
    right = this.transformNode(right, { trail: this.currentEntry.trail });
    return Node_default.logicalExpr(node.operator, left, right);
  }
  transformBinaryExpression(node) {
    let { left, right } = node;
    left = this.transformNode(left);
    right = this.transformNode(right);
    const expr = Node_default.binaryExpr(node.operator, left, right);
    if (this.currentEntry.trail) {
      return this.$call("obj", expr, ...this.$trail());
    }
    return expr;
  }
  transformCallExpression(node) {
    return this.transformCallExpr(Node_default.callExpr, ...arguments);
  }
  transformNewExpression(node) {
    return this.transformCallExpr(Node_default.newExpr, ...arguments);
  }
  transformCallExpr(transform2, node) {
    const callee = this.transformNode(node.callee, { mode: "callee" });
    const args = node.arguments.map((argument) => this.transformNode(argument));
    const expr = transform2.call(Node_default, callee, args, node.optional);
    if (this.currentEntry.trail) {
      return this.$call("obj", expr, ...this.$trail());
    }
    return expr;
  }
  transformObjectExpression(node) {
    const expr = Node_default.objectExpr(node.properties.map((property) => this.transformNode(property)));
    if (this.currentEntry.trail) {
      return this.$call("obj", expr, ...this.$trail());
    }
    return expr;
  }
  transformProperty(node) {
    let { key, value } = node;
    if (node.computed) {
      key = this.transformNode(key);
    }
    value = this.transformNode(value);
    return Node_default.property(key, value, node.kind, false, node.computed, false);
  }
  transformArrayExpression(node) {
    const expr = Node_default.arrayExpr(node.elements.map((element) => this.transformNode(element)));
    if (this.currentEntry.trail) {
      return this.$call("obj", expr, ...this.$trail());
    }
    return expr;
  }
  transformTaggedTemplateExpression(node) {
    const [tag, quasi] = this.transformNodes([node.tag, node.quasi]);
    const expr = Node_default.taggedTemplateExpr(tag, quasi);
    if (this.currentEntry.trail) {
      return this.$call("obj", expr, ...this.$trail());
    }
    return expr;
  }
  transformTemplateLiteral(node) {
    const expressions = node.expressions.map((expression) => this.transformNode(expression));
    const expr = Node_default.templateLiteral(node.quasis, expressions);
    if (this.currentEntry.trail) {
      return this.$call("obj", expr, ...this.$trail());
    }
    return expr;
  }
};

// node_modules/@webqit/use-live/src/transformer/index.js
var parseCache = /* @__PURE__ */ new Map();
function parse3(source, params = {}) {
  if (typeof source !== "string")
    return source;
  const cacheKey = `${source}${JSON.stringify(params)}`;
  let ast = parseCache.get(cacheKey);
  if (!ast) {
    ast = Parser_default.parse(source, params);
    try {
    } catch (e) {
      const message = `${e.message || e}`;
      const { pos, loc: { line, column } = {} } = e;
      const expr = source.slice(Math.max(0, pos - 15), pos + 15);
      const cause = [{ expr, line, column }, { source }];
      if (params.inBrowser)
        console.error(cause);
      throw new (globalThis[e.name] || Error)(message, { cause });
    }
    parseCache.set(cacheKey, ast);
  }
  return ast;
}
function transform(ast, params = {}) {
  ast = parse3(ast, params);
  const transformer = new Transformer(params);
  return transformer.transform(ast);
}
function serialize(ast, params = {}) {
  const transformer = new Transformer(params);
  return transformer.serialize(ast);
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
var Scope4 = class extends Signal {
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
      scope = new Scope4(scope, type);
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
    const scope = new Scope4(this.scope, "round", state);
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
    this.$objects = new Scope4(void 0, "objects");
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
    return function nextTick(prevReturn, current2) {
      let following;
      for (const autorun of this.queue) {
        if (current2 && current2.order(autorun) !== current2 || ["aborted", "running"].includes(autorun.state) || this.iThread[0]?.contains(autorun)) {
          this.queue.delete(autorun);
          continue;
        }
        following = following ? following.order(autorun) : autorun;
        if (!current2) {
          current2 = following;
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
    const scope = new Scope4(context.scope, "function", thisContext ? { ["this"]: thisContext } : {});
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
    for (const [local, serial, alias, literal2] of specifiers) {
      if (local === null) {
        (liveMode ? Observer : Reflect).set(target, alias, literal2);
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
        Scope: Scope4,
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

// node_modules/@webqit/use-live/src/index.js
function LiveFunction(...$args) {
  const { source, args, params } = _$functionArgs($args);
  return compile2("function-source", source, args, params);
}
function AsyncLiveFunction(...$args) {
  const { source, args, params } = _$functionArgs($args);
  return compile2("async-function-source", source, args, params);
}
var LiveScript = class extends AbstractLiveScript {
};
__publicField(LiveScript, "sourceType", "script");
__publicField(LiveScript, "astTools", { parse: parse3, transform, serialize });
var AsyncLiveScript = class extends AbstractLiveScript {
};
__publicField(AsyncLiveScript, "sourceType", "async-script");
__publicField(AsyncLiveScript, "astTools", { parse: parse3, transform, serialize });
var LiveModule = class extends AbstractLiveScript {
};
__publicField(LiveModule, "sourceType", "module");
__publicField(LiveModule, "astTools", { parse: parse3, transform, serialize });
function compile2(sourceType, source, ...params) {
  return compile(sourceType, { parse: parse3, transform, serialize }, source, ...params);
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
    const registry2 = webqit.realdom.attrInterceptionRecords.get(record.target);
    registry2[record.name] = registry2[record.name] || [];
    registry2[record.name].unshift(record.event);
    if (wq(record.target, "realdom", "internalAttrInteractions").get(record.name))
      return defaultAction();
    webqit.realdom.attrInterceptionHooks.get("intercept")?.forEach((callback2) => callback2([record]));
    const returnValue = defaultAction();
    webqit.realdom.attrInterceptionHooks.get("sync")?.forEach((callback2) => callback2([record]));
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
  const parse4 = (selector) => [...selector.matchAll(/\[([^\=\]]+)(\=[^\]]+)?\]/g)].map((x) => x[1]).concat(parseDot(selector)).concat(parseHash(selector));
  if (!(registration.$attrs = Array.from(new Set(cssSelectors.filter((s) => (s + "").includes("[")).reduce((attrs, selector) => attrs.concat(parse4(selector + "")), [])))).length)
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
  const { webqit, document, Node: Node3, CharacterData, Element, HTMLElement, HTMLTemplateElement, DocumentFragment } = window2;
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
  const intercept2 = (record, defaultAction) => {
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
      let exec2 = () => $apiOriginals[apiName].value.call(this, ...args);
      if (webqit.realdom.domInterceptionNoRecurse.get(this) === apiName)
        return exec2();
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
        return exec2();
      const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
      return intercept2(record, () => {
        return $apiOriginals[apiNameFinal].value.call(this, ...args);
      });
    }
    function setter(value) {
      const DOMClassName = Object.keys(_apiOriginals).find((name) => this instanceof window2[name] && apiName in _apiOriginals[name]);
      const $apiOriginals = _apiOriginals[DOMClassName];
      let exec2 = () => $apiOriginals[apiName].set.call(this, value);
      if (this instanceof HTMLScriptElement || webqit.realdom.domInterceptionNoRecurse.get(this) === apiName)
        return exec2();
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
            return exec2();
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
          exec2 = () => noRecurse(this, "replaceWith", () => Element.prototype.replaceWith.call(this, value));
        } else {
          if (this instanceof HTMLTemplateElement) {
            exec2 = () => noRecurse(this.content, "replaceChildren", () => this.content.replaceChildren(...entrants));
          } else {
            exec2 = () => noRecurse(this, "replaceChildren", () => Element.prototype.replaceChildren.call(this, ...entrants));
          }
        }
      }
      const record = { target, entrants, exits, type: "interception", event: [this, apiName] };
      return intercept2(record, exec2);
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
  const { window: window2 } = env3, { webqit } = window2;
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
  const exec2 = _fromHash(execHash);
  if (!exec2)
    throw new Error(`Argument must be a valid exec hash.`);
  const { script, compiledScript, thisContext } = exec2;
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
    const exec2 = () => {
      try {
        target[prop](...args);
      } catch (e) {
        throw new Error(`Error executing "${prop}()": ${e.message} at ${e.cause}`);
      }
    };
    exec2();
  };
  scope["$assign__"] = (target, prop, val) => {
    const exec2 = () => {
      try {
        target[prop] = val;
      } catch (e) {
        throw new Error(`Error executing "${prop} = ${val}": ${e.message} at ${e.cause}`);
      }
    };
    exec2();
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
  const { window: window2 } = env3, { webqit } = window2, { realdom, oohtml: { configs } } = webqit;
  if (webqit.HTMLImportElement)
    return webqit.HTMLImportElement;
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
  webqit.HTMLImportElement = HTMLImportElement;
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
      value: function(ref2, live = false, callback = null) {
        return importRequest(this, ...arguments);
      }
    });
  });
  function importRequest(context, ref2, live = false, callback = null) {
    let options = {};
    if (typeof live === "function") {
      callback = live;
      live = false;
    } else if (typeof live === "object" && live) {
      options = { ...live, ...options };
    } else {
      options = { live };
    }
    const request = { ...HTMLImportsContext.createRequest(ref2), ...options };
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

// src/index.js
init8.call(window, src_exports);
//# sourceMappingURL=main.js.map
