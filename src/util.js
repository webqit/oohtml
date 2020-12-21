
/**
 * @imports
 */
import _isNumeric from '@webqit/util/js/isNumeric.js';
import _isObject from '@webqit/util/js/isObject.js';
import _merge from '@webqit/util/obj/merge.js';
import _inherit from '@webqit/util/obj/inherit.js';
import _set from '@webqit/util/obj/set.js';

/**
 * A OOHTML's meta tag props reader.
 *  
 * @param Object defaults
 * 
 * @return Object
 */
export async function createParams(defaults, config = null) {
    let _meta = await meta.call(this);
    this.window.WQ.OOHTML.META = _merge(3, defaults, config || {}, this.window.WQ.OOHTML.META);
    return this.window.WQ.OOHTML.META;
};

/**
 * Returns an element's oohtml base.
 *
 * @param Element	element
 *
 * @return Object
 */
export function getOohtmlBase(element) {
    var oohtmlBase, oohtmlBaseKeySymbol = Symbol.for('.oohtml');
    if (!(oohtmlBase = element[oohtmlBaseKeySymbol])) {
        oohtmlBase = {};
        Object.defineProperty(element, oohtmlBaseKeySymbol, {value: oohtmlBase, enumerable: false});
    }
    return oohtmlBase;
};

/**
 * Object Utils.
 * 
 * @return Object
 */
export function objectUtil() {
    const Ctxt = this;
    return {
        getVal: (target, key) => {
            if (Ctxt.Observer) {
                return Ctxt.Observer.get(target, key);
            }
            return target[key];
        },
        delVal: (target, key) => {
            if (Ctxt.Observer) {
                return Ctxt.Observer.deleteProperty(target, key);
            }
            delete target[key];
            return true;
        },
        setVal: (target, key, value) => {
            if (Ctxt.Observer) {
                Ctxt.Observer.set(target, key, value);
            } else {
                target[key] = value;
            }
            return target;
        },
        mergeVal: (target, value) => {
            if (Ctxt.Observer) {
                Ctxt.Observer.set(target, value);
            } else {
                Object.keys(value).forEach(key => {
                    target[key] = value[key];
                });
            }
            return target;
        },
    };
};

/**
 * A OOHTML's meta tag props reader.
 *  
 * @param string prop
 * @param any	 set
 * @param bool	 toTag
 * 
 * @return string|number|bool
 */
export async function meta(prop, set = null, toTag = true) {
    const Ctxt = this;
    if (!Ctxt.window.WQ.OOHTML.META) {
        await Ctxt.ready;
        if (Ctxt.window.WQ.OOHTML.METATag = Ctxt.window.document.querySelector('meta[name="oohtml"]')) {
            Ctxt.window.WQ.OOHTML.META = (Ctxt.window.WQ.OOHTML.METATag.getAttribute('content') || '').split(';').filter(v => v).reduce((META, directive) => {
                var directiveSplit = directive.split('=').map(d => d.trim());
                _set(META, directiveSplit[0].split('.'), directiveSplit[1] === 'true' 
                    ? true : (directiveSplit[1] === 'false' 
                        ? false : (_isNumeric(directiveSplit[1]) ? parseInt(directiveSplit[1]) : directiveSplit[1])
                    )
                );
                return META;
            }, {});
        }
    }
    if (_isObject(prop) || arguments.length > 1) {
        if (_isObject(prop)) {
            toTag = set;
        } else {
            prop = {[prop]: set === true ? 'true' : set};
        }
        if (!Ctxt.window.WQ.OOHTML.META) {
            Ctxt.window.WQ.OOHTML.META = {};
        }
        Object.keys(prop).forEach(name => {
            if (prop[name] === false) {
                delete Ctxt.window.WQ.OOHTML.META[name];
            } else if (_isObject(prop[name])) {
                _merge(3, Ctxt.window.WQ.OOHTML.META, prop[name]);
            } else {
                Ctxt.window.WQ.OOHTML.META[name] = prop[name];
            }
        });
        if (toTag) {
            const flatten = (base, obj) => Object.keys(obj).reduce((arr, name) => {
                var path = (base ? base + '.' : '') + name;
                if (_isObject(obj[name])) {
                    arr.push(...flatten(path, obj[name]));
                } else {
                    arr.push(path + '=' + obj[name]);
                }
                return arr;
            }, []);
            await Ctxt.ready;
            if (!(Ctxt.window.WQ.OOHTML.METATag = Ctxt.window.document.querySelector('meta[name="oohtml"]'))) {
                Ctxt.window.WQ.OOHTML.METATag = Ctxt.window.document.createElement('meta');
                Ctxt.window.WQ.OOHTML.METATag.setAttribute('name', 'oohtml');
                Ctxt.window.document.head.append(Ctxt.window.WQ.OOHTML.METATag);
            }
            Ctxt.window.WQ.OOHTML.METATag.setAttribute('content', flatten('', Ctxt.window.WQ.OOHTML.META).join(';'));
        }
        return true;
    }
    if (arguments.length) {
        return Ctxt.window.WQ.OOHTML.META ? Ctxt.window.WQ.OOHTML.META[prop] : undefined;
    }
    return Ctxt.window.WQ.OOHTML.META;
};