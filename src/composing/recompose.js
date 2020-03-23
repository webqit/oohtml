
/**
 * @imports
 */
import recomposeNodes from './recomposeNodes.js';
import recomposeDirectives from './recomposeDirectives.js';
import globalParams from '../params.js';

/**
 * Composes a component from a super component.
 *
 * All definitions will be inherited.
 * If the idea is to import, the super component's element will be returned,
 * (On import, nodes in component (as defined, if) will be uploaded into slots in the super component.)
 *
 * @param HTMLElement				elTo
 * @param HTMLElement				elFrom
 *
 * @return HTMLElement
 */
export default function(elFrom, elTo) {
	if (elTo.matches(globalParams.tagMap.import)) {
		return recomposeNodes(elTo/*from import actually*/, elFrom/*to element actually*/);
	}
	// We will append defs from the elFrom into elTo
	return recomposeDirectives(elFrom, elTo, 'prepend');
};
