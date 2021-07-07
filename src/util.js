
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

/**
 * A OOHTML's meta tag props reader.
 *  
 * @param Object defaults
 * 
 * @return Object
 */
export function config(defaults, overrides = {}) {
    const WebQit = domInit.call(this);
    if (!WebQit.OOHTML.meta) {
        WebQit.OOHTML.meta = WebQit.DOM.meta('oohtml', true/* readWrite */);
    }
    WebQit.OOHTML.meta.defaults(_merge(3, defaults, overrides));
    return WebQit.OOHTML.meta;
}

/**
 * Returns an OOHTML footprint object embedded on a host.
 *
 * @param Object	host
 *
 * @return Object
 */
export function footprint(host) {
    var _footprint, webqitFootprint, webqitFootprintSymbol = Symbol.for('.webqit');
    if (!(webqitFootprint = host[webqitFootprintSymbol])) {
        webqitFootprint = {};
        Object.defineProperty(host, webqitFootprintSymbol, {value: webqitFootprint, enumerable: false});
    }
    if (!(_footprint = webqitFootprint.oohtml)) {
        _footprint = {};
        webqitFootprint.oohtml = _footprint;
    }
    return _footprint;
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
    var path = query.split('#')[0].split('/').map(n => n.trim()).filter(n => n);
    return execScopeQuery(contexts, path, collectionCallback, advancementCallback);
}

/**
 * Parses a "scope-query" expression into an "identifier" plus "modifiers".
 *
 * @param String	expr
 *
 * @return Array
 */
export function parseScopeExpr(expr) {
    var split = Lexer.split(expr.trim(), [':']);
    expr = split.shift();
    var modifiers = split.reduce((_modifiers, _modifier) => {
        var [ name, parentheses ] = Lexer.split(_modifier.trim(), []);
        _modifiers[name] = _unwrap(parentheses, '(', ')');
        return _modifiers;
    }, {});
    return [ expr, modifiers ];
}

const evalAssertExpr = (expr, callback) => {
    return Lexer.split(expr.trim(), ['|', '+'], { preserveDelims: true }).reduce((_result, _expr) => {
        var operator;
        if (_expr.startsWith('|') || _expr.startsWith('+')) {
            operator = _expr.substr(0, 1);
            _expr = _expr.substr(1).trim();
        }
        if (_result.theEnd || (operator === '|' && _result.length)) {
            _result.theEnd = true;
            return _result;
        }
        return _result.concat(callback(_expr.trim()));
    }, []).filter(t => t);
};

const evalModuleExpr = (contexts, expr, collectionCallback) => {
    const lookAhead = contexts => contexts.reduce((_list, _module) => _list.concat(Object.values(collectionCallback(_module))), []);
    return evalAssertExpr(expr, _expr => {
        var [ _expr, modifiers ] = parseScopeExpr(_expr);
         // ------------
        return contexts.reduce((list, context) => {
            var collection = collectionCallback(context);
            if (_expr === '*') {
                    _expr = '(' + Object.keys(collection).join('+') + ')';
            }
            var itemArray = _wrapped(_expr, '(', ')') ? evalModuleExpr([context], _unwrap(_expr, '(', ')'), collectionCallback) : _arrFrom(collection[_expr], false);
            // ------------
            var appliedModifiers = [], reapplyAppliedModifiers = expr => `${expr}${appliedModifiers.map(m => `:${m}(${modifiers[m]})`).join('')}`;
            Object.keys(modifiers).forEach(modifier => {
                if (modifier === 'deep' || modifier === 'deepest') {
                    var nextLevel = [context];
                    while ((modifier === 'deepest' || !itemArray.length) && (nextLevel = lookAhead(nextLevel)).length) {
                        var _itemArray = evalModuleExpr(nextLevel, reapplyAppliedModifiers(_expr), collectionCallback);
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
