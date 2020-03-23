
/**
 * @imports
 */
import globalParams from '../params.js';

/**
 * Creates or finds a DOM element from source.
 *
 * @param string		source
 * @param object		contextDocument
 *
 * @return HTMLElement
 */
export default function(source, contextDocument = null) {
	contextDocument = contextDocument || globalParams.context.document;
	if (contextDocument) {
		var el;
		if (source.trim().startsWith('<')) {
			// Create a node from markup
			var temp = contextDocument.createElement('div');
			temp.innerHtml = source;
			el = temp.firstChild;
		} else {
			el = contextDocument.querySelector(source);
		}
		return el;
	}
};
