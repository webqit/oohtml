
/**
 * @imports
 */
import _isNumeric from '@webqit/util/js/isNumeric.js';
import _with from '@webqit/util/obj/with.js';

/**
 * A OOHTML's meta tag props reader.
 *  
 * @param string prop
 * @param any	 set
 * 
 * @return string|number|bool
 */
export default function meta(prop, set = null) {
    if (!this.window.OOHTML_META) {
        if (this.window.OOHTML_METATag = this.window.document.querySelector('meta[name="oohtml"]')) {
            this.window.OOHTML_META = (this.window.OOHTML_METATag.getAttribute('content') || '').split(';').filter(v => v).reduce((META, directive) => {
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
            delete this.window.OOHTML_META[prop];
        } else {
            this.window.OOHTML_META[prop] = set === true ? 'true' : set;
        }
        var content = Object.keys(this.window.OOHTML_META).reduce((content, prop) => content + prop + '=' + this.window.OOHTML_META[prop] + ';', '');
        this.window.OOHTML_METATag.setAttribute('content', content);
        return true;
    }
    return this.window.OOHTML_META ? this.window.OOHTML_META[prop] : undefined;
};