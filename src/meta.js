
/**
 * @imports
 */
import _isNumeric from '@onephrase/util/js/isNumeric.js';
import _with from '@onephrase/util/obj/with.js';

/**
 * A CHTML's meta tag props reader.
 *  
 * @param window window
 * @param string prop
 * @param any	 set
 * 
 * @return string|number|bool
 */
export default function meta(window, prop, set = null) {
    if (!window.CHTML_META) {
        if (window.CHTML_METATag = window.document.querySelector('meta[name="chtml"]')) {
            window.CHTML_META = (window.CHTML_METATag.getAttribute('content') || '').split(';').filter(v => v).reduce((META, directive) => {
                var directiveSplit = directive.split('=').map(d => d.trim());
                return _with(META, directiveSplit[0], directiveSplit[1] === 'true' 
                    ? true : (directiveSplit[1] === 'false' 
                        ? false : (_isNumeric(directiveSplit[1]) ? parseInt(directiveSplit[1]) : directiveSplit[1])
                    )
                );
            }, {});
        }
    }
    if (arguments.length === 3) {
        if (set === false) {
            delete window.CHTML_META[prop];
        } else {
            window.CHTML_META[prop] = set === true ? 'true' : set;
        }
        var content = Object.keys(window.CHTML_META).reduce((content, prop) => content + prop + '=' + window.CHTML_META[prop] + ';', '');
        window.CHTML_METATag.setAttribute('content', content);
        return true;
    }
    return window.CHTML_META ? window.CHTML_META[prop] : undefined;
};