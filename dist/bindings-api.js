(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

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
  function isObject_default(val) {
    return !Array.isArray(val) && typeof val === "object" && val;
  }

  // ../observer/node_modules/@webqit/util/js/getType.js
  function getType_default(val) {
    return typeof val;
  }

  // ../observer/node_modules/@webqit/util/js/isArray.js
  function isArray_default(val) {
    return Array.isArray(val);
  }

  // ../observer/node_modules/@webqit/util/arr/intersect.js
  function intersect_default(arr, arr2, callback = null) {
    return !isArray_default(arr2) ? [] : arr.filter((val1) => callback ? arr2.filter((val2) => callback(val1, val2)).length : arr2.indexOf(val1) !== -1);
  }

  // ../observer/node_modules/@webqit/util/js/internals.js
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

  // ../observer/node_modules/@webqit/util/js/isTypeFunction.js
  function isTypeFunction_default(val) {
    return typeof val === "function";
  }

  // ../observer/node_modules/@webqit/util/js/isClass.js
  function isClass_default(val) {
    return isTypeFunction_default(val) && /^class\s?/.test(Function.prototype.toString.call(val));
  }

  // ../observer/node_modules/@webqit/util/js/isNull.js
  function isNull_default(val) {
    return val === null || val === "";
  }

  // ../observer/node_modules/@webqit/util/js/isUndefined.js
  function isUndefined_default(val) {
    return arguments.length && (val === void 0 || typeof val === "undefined");
  }

  // ../observer/node_modules/@webqit/util/js/isTypeObject.js
  function isTypeObject_default(val) {
    return Array.isArray(val) || typeof val === "object" && val || isTypeFunction_default(val);
  }

  // ../observer/node_modules/@webqit/util/js/isEmpty.js
  function isEmpty_default(val) {
    return isNull_default(val) || isUndefined_default(val) || val === false || val === 0 || isTypeObject_default(val) && !Object.keys(val).length;
  }

  // ../observer/node_modules/@webqit/util/js/isFunction.js
  function isFunction_default(val) {
    return isTypeFunction_default(val) || val && {}.toString.call(val) === "[object function]";
  }

  // ../observer/node_modules/@webqit/util/js/isString.js
  function isString_default(val) {
    return val instanceof String || typeof val === "string" && val !== null;
  }

  // ../observer/node_modules/@webqit/util/js/isTypeArray.js
  function isTypeArray_default(val) {
    return !isString_default(val) && !isUndefined_default(val.length);
  }

  // ../observer/node_modules/@webqit/util/arr/from.js
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
  var _ = (...args) => internals("observer-api", ...args);
  var _await = (value, callback) => value instanceof Promise ? value.then(callback) : callback(value);

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
        return _await($ret, (ret) => {
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
      if (!isTypeObject_default(target))
        throw new Error(`Subject must be of type object; "${getType_default(target)}" given!`);
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
      return _await(returnValue, (returnValue2) => {
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
        if (params.proxyAutoBinding !== false && isFunction_default(val) && !isClass_default(val)) {
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
    if (!target || !isTypeObject_default(target))
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
          return _await($value, ($value2) => {
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
    if (isFunction_default(arguments[1])) {
      [, receiver, params = {}] = arguments;
      prop = Infinity;
    }
    if (!isFunction_default(receiver))
      throw new Error(`Handler must be a function; "${getType_default(receiver)}" given!`);
    params = { ...params, descripted: true };
    delete params.live;
    if (!isTypeObject_default(target))
      return params.probe && get(target, prop, receiver, params);
    const emit = bind(target, prop, receiver, params);
    if (params.probe) {
      return get(target, prop, emit, params);
    }
    return emit();
  }
  function intercept(target, traps, params = {}) {
    target = resolveObj(target);
    if (!isObject_default(traps)) {
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
    if (isObject_default(receiver)) {
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
        if (!isTypeObject_default(target))
          return next([...results, params.live || params.descripted ? descriptor : void 0], _props, _done);
        const listenerRegistry = TrapsRegistry.getInstance(target, false, params.namespace);
        if (listenerRegistry) {
          return listenerRegistry.emit(descriptor, defaultGet);
        }
        return defaultGet(descriptor);
      }([], props.slice(0), (results) => {
        const result_s = isPropsList(prop) ? results : results[0];
        if (isLive && isTypeObject_default(target)) {
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
    if (isObject_default(prop)) {
      [, , receiver = (x) => x, params = {}, def = false] = arguments;
      entries = Object.entries(prop);
    }
    if (isObject_default(receiver)) {
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
    if (isObject_default(receiver)) {
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
    if ((!obj || !isTypeObject_default(obj)) && assert)
      throw new Error(`Object must be of type object or array! "${getType_default(obj)}" given.`);
    if (obj instanceof Descriptor) {
      obj = obj.value;
    }
    return obj && unproxy(obj);
  }
  function resolveProps(obj, prop, receiver, params = {}) {
    if (prop === Infinity) {
      if (params.level && !isTypeObject_default(obj))
        return receiver([]);
      return ownKeys(obj, receiver, params);
    }
    return receiver(from_default(prop, false));
  }

  // ../observer/src/index.js
  var Observer = { ...main_exports, ...actors_exports };
  var src_default = Observer;

  // node_modules/@webqit/util/js/isObject.js
  function isObject_default2(val) {
    return !Array.isArray(val) && typeof val === "object" && val;
  }

  // node_modules/@webqit/util/js/isArray.js
  function isArray_default2(val) {
    return Array.isArray(val);
  }

  // node_modules/@webqit/util/arr/intersect.js
  function intersect_default2(arr, arr2, callback = null) {
    return !isArray_default2(arr2) ? [] : arr.filter((val1) => callback ? arr2.filter((val2) => callback(val1, val2)).length : arr2.indexOf(val1) !== -1);
  }

  // node_modules/@webqit/util/js/internals.js
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

  // node_modules/@webqit/util/js/isTypeFunction.js
  function isTypeFunction_default2(val) {
    return typeof val === "function";
  }

  // node_modules/@webqit/util/js/isNull.js
  function isNull_default2(val) {
    return val === null || val === "";
  }

  // node_modules/@webqit/util/js/isUndefined.js
  function isUndefined_default2(val) {
    return arguments.length && (val === void 0 || typeof val === "undefined");
  }

  // node_modules/@webqit/util/js/isTypeObject.js
  function isTypeObject_default2(val) {
    return Array.isArray(val) || typeof val === "object" && val || isTypeFunction_default2(val);
  }

  // node_modules/@webqit/util/js/isEmpty.js
  function isEmpty_default2(val) {
    return isNull_default2(val) || isUndefined_default2(val) || val === false || val === 0 || isTypeObject_default2(val) && !Object.keys(val).length;
  }

  // node_modules/@webqit/util/js/isFunction.js
  function isFunction_default2(val) {
    return isTypeFunction_default2(val) || val && {}.toString.call(val) === "[object function]";
  }

  // node_modules/@webqit/util/js/isNumber.js
  function isNumber_default2(val) {
    return val instanceof Number || typeof val === "number";
  }

  // node_modules/@webqit/util/js/isNumeric.js
  function isNumeric_default2(val) {
    return isNumber_default2(val) || val !== true && val !== false && val !== null && val !== "" && !isNaN(val * 1);
  }

  // node_modules/@webqit/util/js/isString.js
  function isString_default2(val) {
    return val instanceof String || typeof val === "string" && val !== null;
  }

  // node_modules/@webqit/util/js/isTypeArray.js
  function isTypeArray_default2(val) {
    return !isString_default2(val) && !isUndefined_default2(val.length);
  }

  // node_modules/@webqit/util/arr/pushUnique.js
  function pushUnique_default2(arr, ...items) {
    items.forEach((itm) => {
      if (arr.indexOf(itm) < 0) {
        arr.push(itm);
      }
    });
    return arr;
  }

  // node_modules/@webqit/util/obj/getPrototypeChain.js
  function getPrototypeChain_default2(obj, until) {
    until = until || Object.prototype;
    until = until && !isArray_default2(until) ? [until] : until;
    var prototypalChain = [];
    var obj = obj;
    while (obj && (!until || until.indexOf(obj) < 0) && obj.name !== "default") {
      prototypalChain.push(obj);
      obj = obj ? Object.getPrototypeOf(obj) : null;
    }
    return prototypalChain;
  }

  // node_modules/@webqit/util/obj/getAllPropertyNames.js
  function getAllPropertyNames_default2(obj, until) {
    var keysAll = [];
    getPrototypeChain_default2(obj, until).forEach((obj2) => {
      pushUnique_default2(keysAll, ...Object.getOwnPropertyNames(obj2));
    });
    return keysAll;
  }

  // node_modules/@webqit/util/obj/mergeCallback.js
  function mergeCallback2(objs, callback, deepProps = false, isReplace = false, withSymbols = false) {
    var depth = 0;
    var obj1 = objs.shift();
    if (isNumeric_default2(obj1) || obj1 === true || obj1 === false) {
      depth = obj1;
      obj1 = objs.shift();
    }
    if (!objs.length) {
      throw new Error("_merge() requires two or more array/objects.");
    }
    objs.forEach((obj2, i) => {
      if (!isTypeObject_default2(obj2) && !isFunction_default2(obj2)) {
        return;
      }
      (deepProps ? getAllPropertyNames_default2(obj2) : Object.keys(obj2)).forEach((key) => {
        if (!callback(key, obj1, obj2, i)) {
          return;
        }
        var valAtObj1 = obj1[key];
        var valAtObj2 = obj2[key];
        if ((isArray_default2(valAtObj1) && isArray_default2(valAtObj2) || isObject_default2(valAtObj1) && isObject_default2(valAtObj2)) && (depth === true || depth > 0)) {
          obj1[key] = isArray_default2(valAtObj1) && isArray_default2(valAtObj2) ? [] : {};
          mergeCallback2([isNumeric_default2(depth) ? depth - 1 : depth, obj1[key], valAtObj1, valAtObj2], callback, deepProps, isReplace, withSymbols);
        } else {
          if (isArray_default2(obj1) && isArray_default2(obj2)) {
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
  function merge_default2(...objs) {
    return mergeCallback2(objs, (k, obj1, obj2) => {
      return true;
    }, false, false, false);
  }

  // node_modules/@webqit/util/arr/from.js
  function from_default2(val, castObject = true) {
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

  // node_modules/@webqit/util/obj/get.js
  function get_default(ctxt, path, trap = {}, reciever = {}) {
    path = from_default2(path).slice();
    var _ctxt = ctxt;
    while (!isUndefined_default2(_ctxt) && !isNull_default2(_ctxt) && path.length) {
      var _key = path.shift();
      if (!(trap.get ? trap.get(_ctxt, _key) : isTypeObject_default2(_ctxt) ? _key in _ctxt : _ctxt[_key])) {
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
        if (isNumeric_default2(path[i]) && isArray_default2(target2)) {
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
        if (!target || !isTypeObject_default2(target) && !isFunction_default2(target)) {
          return false;
        }
        var branch = get_default(target, path[i], trap);
        if (!isTypeObject_default2(branch)) {
          if (trap.buildTree === false) {
            return false;
          }
          branch = isFunction_default2(trap.buildTree) ? trap.buildTree(i) : isNumeric_default2(path[i + 1]) ? [] : {};
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
      if (isFunction_default2(args[0])) {
        args = [[], ...args];
      } else if (isObject_default2(args[0]) && args.length === 1) {
        args = [[], void 0, args[0]];
      } else if (isObject_default2(args[1]) && args.length === 2) {
        args = [from_default2(args[0], false), void 0, args[1]];
      } else {
        args[0] = from_default2(args[0], false);
      }
      return args;
    }
    registry(...args) {
      return internals2("realdom.realtime", this.window, this.namespace, ...args);
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
        objects.forEach((d) => d && isFunction_default2(d.disconnect) && d.disconnect() || isFunction_default2(d) && d() || isObject_default2(d) && (d.disconnected = true));
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
        if (isObject_default2(target)) {
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
          const temp = document.createElement(tempNodeName === "TEMPLATE" ? "div" : tempNodeName);
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
    if (isString_default2(args[0])) {
      timing = args[0];
      if (isFunction_default2(args[1])) {
        callback = args[1];
      }
    } else if (isFunction_default2(args[0])) {
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
        set_default(_metaVars, directiveSplit[0].split("."), directiveSplit[1] === "true" ? true : directiveSplit[1] === "false" ? false : isNumeric_default2(directiveSplit[1]) ? parseInt(directiveSplit[1]) : directiveSplit[1]);
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
  var _2 = (...args) => internals2("oohtml", ...args);
  function _init(name, $config, $defaults) {
    const _name = name.toUpperCase().replace("-", "_");
    const window2 = this, realdom = src_default2.call(window2);
    window2.webqit || (window2.webqit = {});
    window2.webqit.oohtml || (window2.webqit.oohtml = {});
    window2.webqit.oohtml.configs || (window2.webqit.oohtml.configs = {});
    window2.webqit.oohtml.configs[_name] || (window2.webqit.oohtml.configs[_name] = {});
    merge_default2(2, window2.webqit.oohtml.configs[_name], $defaults, $config, realdom.meta(name).json());
    return { config: window2.webqit.oohtml.configs[_name], realdom, window: window2 };
  }

  // src/bindings-api/index.js
  function init($config = {}) {
    const { config, window: window2 } = _init.call(this, "bindings-api", $config, {
      api: { bind: "bind", bindings: "bindings" }
    });
    window2.webqit.Observer = src_default;
    exposeAPIs.call(window2, config);
  }
  function getBindingsObject(node) {
    if (!_2(node).has("bindings")) {
      const bindingsObj = /* @__PURE__ */ Object.create(null);
      _2(node).set("bindings", bindingsObj);
    }
    return _2(node).get("bindings");
  }
  function exposeAPIs(config) {
    const window2 = this;
    if (config.api.bind in window2.document) {
      throw new Error(`document already has a "${config.api.bind}" property!`);
    }
    if (config.api.bindings in window2.document) {
      throw new Error(`document already has a "${config.api.bindings}" property!`);
    }
    if (config.api.bind in window2.Element.prototype) {
      throw new Error(`The "Element" class already has a "${config.api.bind}" property!`);
    }
    if (config.api.bindings in window2.Element.prototype) {
      throw new Error(`The "Element" class already has a "${config.api.bindings}" property!`);
    }
    Object.defineProperty(window2.document, config.api.bind, { value: function(bindings, config2 = {}) {
      return applyBindings(window2.document, bindings, config2);
    } });
    Object.defineProperty(window2.document, config.api.bindings, { get: function() {
      return src_default.proxy(getBindingsObject(window2.document));
    } });
    Object.defineProperty(window2.Element.prototype, config.api.bind, { value: function(bindings, config2 = {}) {
      return applyBindings(this, bindings, config2);
    } });
    Object.defineProperty(window2.Element.prototype, config.api.bindings, { get: function() {
      return src_default.proxy(getBindingsObject(this));
    } });
  }
  function applyBindings(target, bindings, { merge, diff, namespace } = {}) {
    const bindingsObj = getBindingsObject(target);
    const $params = { diff, namespace };
    if (merge)
      return src_default.set(bindingsObj, bindings, $params);
    ;
    const exitingKeys = src_default.ownKeys(bindingsObj, $params).filter((key) => !(key in bindings));
    return src_default.batch(bindingsObj, () => {
      if (exitingKeys.length) {
        src_default.deleteProperty(bindingsObj, exitingKeys, $params);
      }
      return src_default.set(bindingsObj, bindings, $params);
    }, $params);
  }

  // src/bindings-api/targets.browser.js
  init.call(window);
})();
//# sourceMappingURL=bindings-api.js.map
