
/**
 * @imports
 */
import _isNumeric from '@webqit/util/js/isNumeric.js';
import _merge from '@webqit/util/obj/merge.js';
import _set from '@webqit/util/obj/set.js';

/**
 * A OOHTML's meta tag props reader.
 *  
 * @param Object defaults
 * 
 * @return Object
 */
export function createParams(defaults) {
    let _meta = meta.call(this);
    return _merge(3, {}, defaults, _meta);
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
 * 
 * @return string|number|bool
 */
export function meta(prop, set = null) {
    if (!this.window.OOHTML_META) {
        if (this.window.OOHTML_METATag = this.window.document.querySelector('meta[name="oohtml"]')) {
            this.window.OOHTML_META = (this.window.OOHTML_METATag.getAttribute('content') || '').split(';').filter(v => v).reduce((META, directive) => {
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
    if (arguments.length === 2) {
        if (set === false) {
            delete this.window.OOHTML_META[prop];
        } else {
            this.window.OOHTML_META[prop] = set === true ? 'true' : set;
        }
        var content = Object.keys(this.window.OOHTML_META).reduce((content, prop) => content + prop + '=' + this.window.OOHTML_META[prop] + ';', '');
        this.window.OOHTML_METATag.setAttribute('content', content);
        return true;
    }
    if (arguments.length) {
        return this.window.OOHTML_META ? this.window.OOHTML_META[prop] : undefined;
    }
    return this.window.OOHTML_META;
};