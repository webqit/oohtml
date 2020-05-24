
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import recomposeDirectives from './recomposeDirectives.js';
import ENV from './ENV.js';
	
/**
 * Composes a component from a super component.
 *
 * All definitions will be inherited.
 * If the idea is to import, the super component's element will be returned,
 * (On import, nodes in component (as defined, if) will be uploaded into slots in the super component.)
 *
 * @param HTMLElement				elFrom
 * @param HTMLElement				elTo
 *
 * @return HTMLElement
 */
export default function(elFrom, elTo) {
	elTo = elTo.cloneNode(true);
	var elFromNs = elFrom.getAttribute(ENV.params.namespaceAttribute);
	var elToisRoot = ENV.ScopedHTML && elTo.hasAttribute(ENV.ScopedHTML.params.rootAttribute);
	// -------------------------
	// So we concat() the role attribute
	// -------------------------
	elTo.setAttribute(ENV.params.namespaceAttribute, elFromNs);
	// We will prepend defs from the elFrom into elTo
	recomposeDirectives(elFrom, elTo, 'append');
	if (!ENV.ScopedHTML) {
		return elTo;
	}
	// -------------------------
	// Upload nodes into elTo just the way slots work in Web Compoonents
	// -------------------------
	_arrFrom((elFrom.shadowRoot || elFrom).children).forEach((replacementNode, i) => {
		if (ENV.ScopedJS && replacementNode.matches(ENV.ScopedJS.params.scriptElement)) {
			return;
		}
		replacementNode = replacementNode.cloneNode(true);
		var scopedID, CSSEscape = ENV.Window.CSS ? ENV.Window.CSS.escape : str => str;
		if (elToisRoot && (scopedID = replacementNode.getAttribute(ENV.ScopedHTML.params.scopedIdAttribute))) {
			var slotNode,
				rootSelector = '[' + CSSEscape(ENV.ScopedHTML.params.rootAttribute) + ']',
				slotNodeSelector = '[' + CSSEscape(ENV.ScopedHTML.params.scopedIdAttribute) + '="' + scopedID + '"]';
			if ((elTo.shadowRoot && (slotNode = elTo.shadowRoot.querySelector(slotNodeSelector)))
			|| ((slotNode = elTo.querySelector(slotNodeSelector)) && slotNode.parentNode.closest(rootSelector) === elTo)) {
				// We will prepend defs from the slot node into replacement node
				recomposeDirectives(slotNode, replacementNode, 'prepend');
				// Port to target...
				slotNode.replaceWith(replacementNode);
			} else {
				//throw new Error('Composition Error: Node #' + i + ' (at ' + elFromNs + ') must match exactly one targetNode in ' + elToNs + '! (' + slotNodes.length + ' matched)');
				elTo.append(replacementNode);
			}
		} else {
			elTo.append(replacementNode);
		}
	});
	return elTo;
};
