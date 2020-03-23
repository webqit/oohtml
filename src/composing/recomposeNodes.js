
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';
import recomposeDirectives from './recomposeDirectives.js';
import globalParams from '../params.js';
	
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
	var elFromNs = elFrom.getAttribute(globalParams.attrMap.namespace);
	var elToNs = elTo.getAttribute(globalParams.attrMap.namespace);
	var elToRoles = (elTo.getAttribute(globalParams.attrMap.superrole) || '').split(' ').map(r => r.trim());
	// -------------------------
	// So we concat() the role attribute
	// -------------------------
	elTo.setAttribute(globalParams.attrMap.namespace, elFromNs);
	// We will prepend defs from the elFrom into elTo
	recomposeDirectives(elFrom, elTo, 'append');
	// -------------------------
	// Upload nodes into elTo just the way slots work in Web Compoonents
	// -------------------------
	_arrFrom((elFrom.shadowRoot || elFrom).children).forEach((replacementNode, i) => {
		if (replacementNode.matches(globalParams.tagMap.jsen)) {
			return;
		}
		replacementNode = replacementNode.cloneNode(true);
		var applicableContextRoles = [], applicableReplacementNodeRoles = [];
		var replacementNodeRoles = (replacementNode.getAttribute(globalParams.attrMap.subrole) || '').split(' ').map(r => r.trim());
		replacementNodeRoles.forEach(replacementNodeRole => {
			var _applicableContextRoles = elToRoles.filter(contextRole => replacementNodeRole.startsWith(contextRole + '-'));
			if (_applicableContextRoles.length) {
				applicableContextRoles.push(_applicableContextRoles[0]);
				applicableReplacementNodeRoles.push(replacementNodeRole);
			}
		});
		var CSSEscape = globalParams.context.CSS ? globalParams.context.CSS.escape : str => str;
		if (applicableContextRoles.length) {
			var slotNodes;
			var contextSelector = applicableContextRoles.map(contextRole => '[' + CSSEscape(globalParams.attrMap.superrole) + '~="' + contextRole + '"]');
			var slotNodeSelector = applicableReplacementNodeRoles.map(replacementNodeRole => '[' + CSSEscape(globalParams.attrMap.subrole) + '~="' + replacementNodeRole + '"]');
			if ((elTo.shadowRoot && (slotNodes = elTo.shadowRoot.querySelectorAll(slotNodeSelector)))
			|| ((slotNodes = elTo.querySelectorAll(slotNodeSelector)).length === 1 && slotNodes[0].closest(contextSelector) === elTo)) {
				// We will prepend defs from the slot node into replacement node
				recomposeDirectives(slotNodes[0], replacementNode, 'prepend');
				// Port to target...
				slotNodes[0].replaceWith(replacementNode);
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
