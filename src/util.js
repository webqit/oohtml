
/**
 * @imports
 */
import domInit from '@webqit/browser-pie/src/dom/index.js';
import _merge from '@webqit/util/obj/merge.js';
import Lexer from '@webqit/util/str/Lexer.js';
import _wrapped from '@webqit/util/str/wrapped.js';
import _unwrap from '@webqit/util/str/unwrap.js';
import _before from '@webqit/util/str/before.js';
import _after from '@webqit/util/str/after.js';
import _arrFrom from '@webqit/util/arr/from.js';
import _internals from '@webqit/util/js/internals.js';

/**
 * A OOHTML's meta tag props reader.
 *  
 * @param Object defaults
 * 
 * @return Object
 */
export function config(defaults, overrides = {}) {
    const WebQit = domInit.call(this);
    if (!WebQit.OOHTML) {
        // For feature modules that will call outside of ./index.js module
        WebQit.OOHTML = {};
    }
    if (!WebQit.OOHTML.meta) {
        WebQit.OOHTML.meta = WebQit.DOM.meta('oohtml', true/* readWrite */);
    }
    WebQit.OOHTML.meta.defaults(_merge(3, defaults, overrides));
    return WebQit.OOHTML.meta;
}

/**
 * Runs a "scope-query" against a context.
 *
 * @param Array	    contexts
 * @param String	query
 * @param Function	collectionCallback
 * @param Function	advancementCallback
 *
 * @return Array
 */
export function scopeQuery(contexts, query, collectionCallback, advancementCallback = null) {
    var queryPath = query.split('#')[0].split('/').map(n => n.trim()).filter(n => n);
    return execScopeQuery(contexts, queryPath, collectionCallback, advancementCallback);
}

/**
 * Parses a "scope-query" reference expression to seperate the "reference" and its "modifiers".
 *
 * @param String	expr
 *
 * @return Array
 */
export function parseScopeReferenceExpr(reference) {
    var split = Lexer.split(reference.trim(), [':']);
    reference = split.shift();
    var modifiers = split.reduce((_modifiers, _modifier) => {
        var [ name, parentheses ] = Lexer.split(_modifier.trim(), []);
        _modifiers[name] = _unwrap(parentheses, '(', ')');
        return _modifiers;
    }, {});
    return [ reference, modifiers ];
}

/**
 * Determines if a given path matches a "scope-query".
 *
 * @param String	query
 * @param String	path
 *
 * @return Bool
 */
export function queryMatchPath(query, path) {
    path = path.split('#')[0].split('/').map(n => n.trim()).filter(n => n);
    query = query.split('#')[0].split('/').map(n => n.trim()).filter(n => n);
    return !query.length ? false : query.reduce((prev, segment, i) => {
        if (!prev) return false;
        return Lexer.split(segment.trim(), ['|', '+']).reduce((_prev, _reference) => {
            var [ _reference, modifiers ] = parseScopeReferenceExpr(_reference);
            _reference = _reference.trim();
            var sementIsMatch = _reference === path[i];
            if (!sementIsMatch && (('deep' in modifiers) || ('deepest' in modifiers))) {
                var _sementIsMatch = path.slice(i + 1).reduce((prev, s, i) => {
                    return prev > -1 && ('deep' in modifiers) ? prev : (s === _reference ? i : prev);
                }, -1);
                if (_sementIsMatch > -1) {
                    var e = path.splice(i, _sementIsMatch + 1);
                    sementIsMatch = true;
                }
            }
            return _prev || sementIsMatch;
        }, false);
    }, true);
}

const evalAssertExpr = (segment, callback) => {
    return Lexer.split(segment.trim(), ['|', '+'], { preserveDelims: true }).reduce((_result, _reference) => {
        var operator;
        if (_reference.startsWith('|') || _reference.startsWith('+')) {
            operator = _reference.substr(0, 1);
            _reference = _reference.substr(1).trim();
        }
        if (_result.theEnd || (operator === '|' && _result.length)) {
            _result.theEnd = true;
            return _result;
        }
        return _result.concat(callback(_reference.trim()));
    }, []).filter(t => t);
};

const evalModuleExpr = (contexts, segment, collectionCallback) => {
    const lookAhead = contexts => contexts.reduce((_list, _module) => _list.concat(...collectionCallback(_module).values()), []);
    return evalAssertExpr(segment, _reference => {
        var [ _reference, modifiers ] = parseScopeReferenceExpr(_reference);
         // ------------
        return contexts.reduce((list, context) => {
            var collection = collectionCallback(context);
            if (_reference === '*') {
                    _reference = '(' + collection.keys().join('+') + ')';
            }
            var itemArray = _wrapped(_reference, '(', ')') ? evalModuleExpr([context], _unwrap(_reference, '(', ')'), collectionCallback) : _arrFrom(collection.get(_reference), false);
            // ------------
            var appliedModifiers = [], reapplyAppliedModifiers = expr => `${expr}${appliedModifiers.map(m => `:${m}(${modifiers[m]})`).join('')}`;
            Object.keys(modifiers).forEach(modifier => {
                if (modifier === 'deep' || modifier === 'deepest') {
                    var nextLevel = [context];
                    while ((modifier === 'deepest' || !itemArray.length) && (nextLevel = lookAhead(nextLevel)).length) {
                        var _itemArray = evalModuleExpr(nextLevel, reapplyAppliedModifiers(_reference), collectionCallback);
                        if (_itemArray.length) {
                            itemArray = _itemArray;
                        }
                    }
                } else {
                    if (modifier === 'having' || modifier === 'not-having') {
                        itemArray = itemArray.filter(module => {
                            var filterHavingsResult = evalAssertExpr(modifiers[modifier], _filterHavings => collectionCallback(module, _filterHavings));
                            return modifier === 'not-having' ? !filterHavingsResult.length : filterHavingsResult.length;
                        });    
                    }
                    appliedModifiers.push(modifier);
                }
            });
            return list.concat(itemArray);
        }, []);
    });
};

const execScopeQuery = function(contexts, path, collectionCallback, advancementCallback = null, level = 0) {

    if (!path.length) {
        return [];
    }

    var segment = path.shift(), isStopSegmentIfCount;
    if (segment.endsWith('.')) {
        isStopSegmentIfCount = true;
        segment = segment.substr(0, segment.length - 1).trim();
    }
    // -----------
    var modules = evalModuleExpr(contexts, segment, collectionCallback);
    // -----------
    if (modules.length && isStopSegmentIfCount) {
        return modules;
    }
    // -----------
    if (path.length) {
        var submodules = execScopeQuery(modules, path.slice(), collectionCallback, advancementCallback, level + 1);
        if (submodules === -1) {
            return advancementCallback(modules, level, true);
        }
        return submodules;
    }

    return advancementCallback ? advancementCallback(modules, level) : modules;
};
