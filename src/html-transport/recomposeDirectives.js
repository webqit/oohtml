
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _unique from '@web-native-js/commons/arr/unique.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import _isString from '@web-native-js/commons/js/isString.js';
import _isArray from '@web-native-js/commons/js/isArray.js';
import ENV from './ENV.js';

/**
 * Composes definitions from elFrom into elTo.
 *
 * @param HTMLElement				elFrom
 * @param HTMLElement				elTo
 * @param string					appendOrPrepend
 * @param array						norecompose
 *
 * @return HTMLElement
 */
export default function(elFrom, elTo, appendOrPrepend, norecompose = []) {
	norecompose = norecompose.concat([ENV.params.namespaceAttribute, ...ENV.params.norecomposeAttributes]);
	if (elTo.hasAttribute('norecompose')) {
		norecompose = norecompose.concat((elTo.getAttribute('norecompose') || '*').split(' ').map(val => val.trim()));
	}
	// ----------------------------
	// Custom Composition...
	// ----------------------------
	if (_isFunction(ENV.params.recomposeCallback)) {
		var disposition = ENV.params.recomposeCallback(elFrom, elTo, appendOrPrepend, norecompose);
		if (disposition === false) {
			return false;
		} else if (_isString(disposition) || _isArray(disposition)) {
			norecompose = norecompose.concat(disposition);
		}
	}
	// ----------------------------
	// Merge list attributes...
	// ----------------------------
	var listAttributes = ENV.params.listAttributes.concat(['role', 'class']);
	if (ENV.scopedHTML) {
		listAttributes = listAttributes.concat([ENV.ScopedHTML.params.partsHintAttribute, ENV.ScopedHTML.params.scopeAttribute, ENV.ScopedHTML.params.partAttribute,]);
	}
	_unique(listAttributes).forEach(type => {
		var b_attr, a_attr;
		if (!norecompose.includes(type) && !norecompose.includes('*') && (b_attr = elFrom.getAttribute(type))) {
			if (a_attr = elTo.getAttribute(type)) {
				var jointList = appendOrPrepend === 'prepend' ? [b_attr, a_attr] : [a_attr, b_attr];
			} else {
				var jointList = [b_attr];
			}
			elTo.setAttribute(type, _unique(jointList.join(' ').split(' ').map(r => r.trim())).join(' '));
			norecompose.push(type);
		}
	});
	// ----------------------------
	// Merge key/val attributes...
	// ----------------------------
	_unique(ENV.params.keyValAttributes.concat('style')).forEach(type => {
		var b_attr, a_attr;
		if (!norecompose.includes(type) && !norecompose.includes('*') && (b_attr = elFrom.getAttribute(type))) {
			if (a_attr = elTo.getAttribute(type)) {
				var jointDefs = appendOrPrepend === 'prepend' ? [b_attr, a_attr] : [a_attr, b_attr];
				if (!jointDefs[0].trim().endsWith(';')) {
					jointDefs[0] = jointDefs[0] + ';';
				}
			} else {
				var jointDefs = [b_attr];
			}
			elTo.setAttribute(type, jointDefs.join(' '));
			norecompose.push(type);
		}
	});
	// ----------------------------
	// Port all other attributes...
	// ----------------------------
	for (var i = 0; i < elFrom.attributes.length; i ++) {
		var attr = elFrom.attributes[i];
		if (!norecompose.includes(attr.name) && !norecompose.includes('*') && !elTo.hasAttribute(attr.name)) {
			elTo.setAttribute(attr.name, attr.value);
			norecompose.push(attr.name);
		}
	}
	// ----------------------------
	// For data blocks...
	// ----------------------------
	if (!norecompose.includes('<scoped-js>') && !norecompose.includes('*') && ENV.ScopedJS) {
		var elToDefs = _arrFrom((elTo.shadowRoot || elTo).children)
			.filter(node => node.matches(ENV.ScopedJS.params.scriptElement));
		var elFromDefs = _arrFrom((elFrom.shadowRoot || elFrom).children)
			.filter(node => node.matches(ENV.ScopedJS.params.scriptElement));
		if (elFromDefs.length) {
			if (elToDefs.length) {
				elToDefs[0][appendOrPrepend](elFromDefs[0].textContent);
			} else {
				elTo.prepend(elFromDefs[0].cloneNode(true));
			}
		}
	}
	return elTo;
};
