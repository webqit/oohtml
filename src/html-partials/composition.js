
/**
 * @imports
 */
import _each from '@web-native-js/commons/obj/each.js';
import _unique from '@web-native-js/commons/arr/unique.js';
import ENV from './ENV.js';

/**
 * Imports partials from from sourceEl into el.
 *
 * @param Element				    exportEl
 * @param Element				    superExportEl
 * @param array    				    noinherit
 *
 * @return Element
 */
export function mergePartials(exportEl, superExportEl, noinherit = []) {
    if (!superExportEl.partialsSlottables) {
        return exportEl;
    }
    _each(superExportEl.partialsSlottables, (slotId, slottable) => {
        if (exportEl.partialsSlottables && exportEl.partialsSlottables[slotId]) {
            // Simply inherit attributes from the super slottable
            // The export may however define a no-inherit directive for all its slottables
            var _noinherit = noinherit.concat((exportEl.getAttribute('noinherit') || '').split(' ').map(val => val.trim()));
            mergeAttributes(exportEl.partialsSlottables[slotId], slottable, _noinherit, false/*prioritize*/);
        } else {
            // Copy new slottables
            exportEl.append(slottable.clone(true));
        }
    });
    return exportEl;
};

/**
 * Imports attributes from sourceEl into el.
 *
 * @param Element				    el
 * @param Element				    sourceEl
 * @param array						noinherit
 * @param bool						prioritize
 *
 * @return Element
 */
export function mergeAttributes(el, sourceEl, noinherit = [], prioritize = true) {
    // ----------------------------
    // Norecompose directive
    // ----------------------------
    noinherit = noinherit.concat(ENV.params.noinheritAttributes);
    if (el.hasAttribute('noinherit')) {
        noinherit = noinherit.concat((el.getAttribute('noinherit') || '*').split(' ').map(val => val.trim()));
    }
    // ----------------------------
    // Merge list attributes...
    // ----------------------------
    var listAttributes = ENV.params.listAttributes.concat(['role', 'class']);
    _unique(listAttributes).forEach(type => {
        var b_attr, a_attr;
        if (!noinherit.includes(type) && !noinherit.includes('*') && (b_attr = sourceEl.getAttribute(type))) {
            if (a_attr = el.getAttribute(type)) {
                var jointList = !prioritize ? [b_attr, a_attr] : [a_attr, b_attr];
            } else {
                var jointList = [b_attr];
            }
            el.setAttribute(type, _unique(jointList.join(' ').split(' ').map(r => r.trim())).join(' '));
            noinherit.push(type);
        }
    });
    // ----------------------------
    // Merge key/val attributes...
    // ----------------------------
    _unique(ENV.params.keyValAttributes.concat('style')).forEach(type => {
        var b_attr, a_attr;
        if (!noinherit.includes(type) && !noinherit.includes('*') && (b_attr = sourceEl.getAttribute(type))) {
            if (a_attr = el.getAttribute(type)) {
                var jointDefs = !prioritize ? [b_attr, a_attr] : [a_attr, b_attr];
                if (!jointDefs[0].trim().endsWith(';')) {
                    jointDefs[0] = jointDefs[0] + ';';
                }
            } else {
                var jointDefs = [b_attr];
            }
            el.setAttribute(type, jointDefs.join(' '));
            noinherit.push(type);
        }
    });
    // ----------------------------
    // Port all other attributes...
    // ----------------------------
    if (!noinherit.includes('*')) {
        for (var i = 0; i < sourceEl.attributes.length; i ++) {
            var attr = sourceEl.attributes[i];
            if (!noinherit.includes(attr.name) 
            && (!el.hasAttribute(attr.name) || prioritize)) {
                el.setAttribute(attr.name, attr.value);
            }
        }
    }
    return el;
};
