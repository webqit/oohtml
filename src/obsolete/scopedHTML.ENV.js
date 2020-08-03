
/**
 * @imports
 */
import _merge from '@web-native-js/commons/obj/merge.js';

if (typeof window === 'undefined') {
    throw new Error('A window object must be globally available before importing ENV.');
}
const win = window;
const wn = typeof WebNative !== 'undefined' ? WebNative : win.WebNative || {};
const init = wn.init ? wn.init('scoped-html') : {};
const trap = init.trap || wn.Observer;
const params = _merge({
    rootAttribute: 'scope:root',
    scopedIdAttribute: 'scope:id',
    idHintsAttribute: 'scope-hint',
    scopeTreePropertyName: 'scopeTree',
    addCallback: null,
}, init.params);

/**
 * @exports
 */
export {
    win as window,
    trap,
    params,
    init,
};