
/**
 * @_import
 */
import _isTypeObject from '@web-native-js/commons/js/isTypeObject.js';
import _isNumeric from '@web-native-js/commons/js/isNumeric.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import _isEmpty from '@web-native-js/commons/js/isEmpty.js';
import _following from '@web-native-js/commons/arr/following.js';
import _unique from '@web-native-js/commons/arr/unique.js';
import ENV from './ENV.js';

// ----------------------
// Primer
// ----------------------

const chtml = el => {
    if (!el['.chtml']) {
        el['.chtml'] = {};
    }
    return el['.chtml'];
};

/**
 * Binds a (reactive) list context to the instance.
 * Childnodes will be automatically created/removed per key.
 *
 * @param Element 		el
 * @param array 		items
 * @param function 		addedCallback
 * @param function 		removedCallback
 *
 * @return ENV.trap.MutationEvent
 */
export function itemize(el, items, addedCallback = null, removedCallback = null) {
    if (!chtml(el).itemSlots) {
        chtml(el).itemSlots = {};
    }
    if (!el.template) {
        return;
    }
    // Keys of data items to be rendered
    var itemsKeys = ENV.trap.keys(items);
    // Keys of element items already rendered
    var currentNodeNames = ENV.trap.keys(chtml(el).itemSlots);
    if (!currentNodeNames.length && el.children.length) {
        _arrFrom(el.children).forEach((itemElement, i) => {
            var key = itemElement.getAttribute(ENV.params.itemIndexAttribute) || i;
            chtml(el).itemSlots[key] = itemElement;
        });
        currentNodeNames = ENV.trap.keys(chtml(el).itemSlots);
    }
    // --------------
    var e = new ENV.trap.MutationEvent(el, {type:'remodelling'});
    _unique(itemsKeys.concat(currentNodeNames)).forEach(key => {
        var rspns;
        var itemElement = chtml(el).itemSlots[key];
        if (ENV.trap.has(items, key)) {
            var srcItem = ENV.trap.get(items, key), isNewNode = false;
            if (!itemElement) {
                // --------------
                var partials = el.template.partials[key];
                if (_isEmpty(partials) && _isNumeric(key)) {
                    partials = el.template.partials['#'];
                }
                if (_isEmpty(partials)) {
                    partials = el.template.partials['default'];
                }
                // --------------
                if (!_isEmpty(partials)) {
                    itemElement = partials[0].cloneNode(true);
                    var following = _following(itemsKeys, key + ''/*numeric key needs this*/, true/*length*/)
                        .reduce((closest, _key) => closest || chtml(el).itemSlots[_key], null);
                    if (following) {
                        var d = following.before(itemElement);
                    } else {
                        var d = el.append(itemElement);
                    }
                    itemElement.setAttribute(ENV.params.itemIndexAttribute, key);
                    chtml(el).itemSlots[key] = itemElement;
                    isNewNode = true;
                }
            }
            if (itemElement) {
                if (_isFunction(addedCallback)) {
                    rspns = addedCallback(itemElement, srcItem, key, isNewNode);
                }
            }
        } else if (itemElement) {
            if (_isFunction(removedCallback)) {
                rspns = removedCallback(itemElement);
            }
            var remove = () => {
                itemElement.remove();
                delete chtml(el).itemSlots[key];
            };
            if (rspns instanceof Promise) {
                rspns.then(remove).catch(remove);
            } else {
                remove();
            }
        }
        e.response(rspns);
    });
    return e;
};

/**
 * @init
 */
var inited = false;
export default function() {
	if (inited) {
		return;
	}
	inited = true;

    // ----------------------
    // Define the items binding method on Element.prototype
    // ----------------------
    if (ENV.params.itemsBindingMethod in ENV.window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + ENV.params.itemsBindingMethod + '" property!');
    }
    Object.defineProperty(ENV.window.Element.prototype, ENV.params.itemsBindingMethod, {
        value: function(items, addedCallback, removedCallback = null) {
            if (_isTypeObject(items) && items) {
                // Mirror
                ENV.trap.observe(items, () => {
                    return itemize(this, items, addedCallback, removedCallback);
                }, {data:false, tags: ['#HTMLPartials-itemize', this]});
            }
            if (_isTypeObject(chtml(this).itemData)) {
                // Unmirror
                ENV.trap.unobserve(chtml(this).itemData, null, null, {tags: ['#HTMLPartials-itemize', this]});
            }
            chtml(this).itemData = items;
            // Initial Sync...
            return itemize(this, items || {}, addedCallback, removedCallback);
        },
    });
};