
/**
 * @imports
 */
import domInit from '@webqit/browser-pie/src/dom/index.js';
import { _wrapped, _unwrap, _before, _after } from '@webqit/util/str/index.js';
import { _from as _arrFrom } from '@webqit/util/arr/index.js';
import { _internals }from '@webqit/util/js/index.js';
import { _merge } from '@webqit/util/obj/index.js';
import Lexer from '@webqit/util/str/Lexer.js';

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
 * @param Function	pathReduxCallback
 * @param Function	resultReduxCallback
 *
 * @return Array
 */
export function scopeQuery(contexts, query, pathReduxCallback, resultReduxCallback = null) {
    var queryPath = query.split('/').map(n => n.trim()).filter(n => n);
    return execScopeQueryByReduction(contexts, queryPath, pathReduxCallback, resultReduxCallback);
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
    path = path.split('/').map(n => n.trim()).filter(n => n);
    query = query.split('/').map(n => n.trim()).filter(n => n);
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

const getModulesAtSegment = (contexts, segment, pathReduxCallback) => {
    const lookAhead = contexts => contexts.reduce((_list, _module) => _list.concat(...pathReduxCallback(_module).values()), []);
    return evalAssertExpr(segment, _reference => {
        var [ _reference, modifiers ] = parseScopeReferenceExpr(_reference);
         // ------------
        return contexts.reduce((list, context) => {
            var collection = pathReduxCallback(context);
            if (_reference === '*') {
                _reference = '(' + collection.keys().join('+') + ')';
            }
            var itemArray = _wrapped(_reference, '(', ')') ? getModulesAtSegment([context], _unwrap(_reference, '(', ')'), pathReduxCallback) : _arrFrom(collection.get(_reference), false);
            // ------------
            var appliedModifiers = [], reapplyAppliedModifiers = expr => `${expr}${appliedModifiers.map(m => `:${m}(${modifiers[m]})`).join('')}`;
            Object.keys(modifiers).forEach(modifier => {
                if (modifier === 'deep' || modifier === 'deepest') {
                    var nextLevel = [context];
                    while ((modifier === 'deepest' || !itemArray.length) && (nextLevel = lookAhead(nextLevel)).length) {
                        var _itemArray = getModulesAtSegment(nextLevel, reapplyAppliedModifiers(_reference), pathReduxCallback);
                        if (_itemArray.length) {
                            itemArray = _itemArray;
                        }
                    }
                } else {
                    if (modifier === 'having' || modifier === 'not-having') {
                        itemArray = itemArray.filter(module => {
                            var filterHavingsResult = evalAssertExpr(modifiers[modifier], _filterHavings => pathReduxCallback(module, _filterHavings));
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

const execScopeQueryByReduction = function(contexts, path, pathReduxCallback, resultReduxCallback = null, level = 0) {
    if (!path.length) return [];
    let segment = path.shift(), isStopSegmentIfCount;
    // -----------
    if (segment.endsWith('.')) {
        isStopSegmentIfCount = true;
        segment = segment.substr(0, segment.length - 1).trim();
    }
    // -----------
    let modules_atSegment = getModulesAtSegment(contexts, segment, pathReduxCallback);
    modules_atSegment.forEach(context => {
        if (_internals(context, 'oohtml').has('queryCallback')) {
            _internals(context, 'oohtml').get('queryCallback')();
        }
    });
    // -----------
    if (modules_atSegment.length && isStopSegmentIfCount) return modules_atSegment;
    // -----------
    if (path.length) {
        let modules_atNextSegment = execScopeQueryByReduction(modules_atSegment, path.slice(), pathReduxCallback, resultReduxCallback, level + 1);
        // The result line at "return path"
        if (modules_atNextSegment === -1) {
            // Being -1 means that resultReduxCallback() tested it and decides to return such
            // Returning -1 as test result to a parent step means that resultReduxCallback() would like to evaluate the parent step itself
            return resultReduxCallback(modules_atSegment, level);
        }
        return modules_atNextSegment;
    }
    // The result line at the "last segment"
    return resultReduxCallback 
        ? resultReduxCallback(modules_atSegment, level, true/* Tell callback that we're at last level */) 
        : modules_atSegment;
};
