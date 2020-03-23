
/**
 * @imports
 */
import _before from '@web-native-js/commons/str/before.js';
import _after from '@web-native-js/commons/str/after.js';


/**
 * Parses an element's CHTML namespace.
 * This explains how an element's namespace is used in CHTML.
 *
 * @param string					namespaceStr
 *
 * @return object
 */
export default function(namespaceStr) {
	var namespaceParse = {roadmap:namespaceStr};
	if (namespaceParse.roadmap) {
		namespaceParse.namespace = _before(namespaceParse.roadmap, '//');
		namespaceParse.subnamespace = _after(namespaceParse.roadmap, '//');
		// In case this is the /// spot...
		if (namespaceParse.subnamespace.startsWith('/')) {
			namespaceParse.subnamespace = _after(namespaceParse.subnamespace, '/');
		}
		if (namespaceParse.subnamespace.endsWith('//') && namespaceParse.subnamespace.indexOf('///') === -1) {
			namespaceParse.subnamespace = namespaceParse.subnamespace + namespaceParse.namespace + '//';
		}
	}
	return namespaceParse;
};
