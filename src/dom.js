
/**
 * @imports
 */
import _isNumeric from '@onephrase/util/js/isNumeric.js';
import _with from '@onephrase/util/obj/with.js';
import ENV from '@onephrase/util/dom/ENV.js';

/**
 * A CHTML's meta tag props reader.
 *  
 * @param string prop
 * @param any	 set
 * 
 * @return string|number|bool
 */
var META, METATag;
export function meta(prop, set = null) {
	if (!META) {
		if (METATag = ENV.window.document.querySelector('meta[name="chtml"]')) {
			META = (METATag.getAttribute('content') || '').split(';').filter(v => v).reduce((META, directive) => {
				var directiveSplit = directive.split('=').map(d => d.trim());
				return _with(META, directiveSplit[0], directiveSplit[1] === 'true' 
					? true : (directiveSplit[1] === 'false' 
						? false : (_isNumeric(directiveSplit[1]) ? parseInt(directiveSplit[1]) : directiveSplit[1])
					)
				);
			}, {});
		};
	}
	if (arguments.length === 2) {
		if (set === false) {
			delete META[prop];
		} else {
			META[prop] = set === true ? 'true' : set;
		}
		var content = Object.keys(META).reduce((content, prop) => content + prop + '=' + META[prop] + ';', '');
		METATag.setAttribute('content', content);
		return true;
	}
    return META ? META[prop] : undefined;
};