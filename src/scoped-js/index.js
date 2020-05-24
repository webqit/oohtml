
/**
 * @imports
 */
import Reflex from '@web-native-js/reflex';
import _arrFrom from '@web-native-js/commons/arr/from.js';
import _any from '@web-native-js/commons/arr/any.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import ScopedJS from './ScopedJS.js';
import Scope from './Scope.js';
import ENV from './ENV.js';

/**
 * @init
 */
ScopedJS.init = function(Window, Trap = Reflex) {
    ENV.Window = Window;
    ENV.Trap = Trap;

    // ----------------------
    // Capture scripts
    // ----------------------
    const scriptElementsCallback = callback => {
        var notify = () => query().forEach(callback);
        var query = () => {
            return _arrFrom(ENV.Window.document.scripts)
            .filter(script => script.matches(ENV.params.scriptElement) && !script['.scopedJS-scooped'] && !_any(ENV.params.inertContexts, innertContext => script.closest(innertContext)))
            .map(script => {
                script['.scopedJS-scooped'] = true;
                return script;
            });
        };
        // Document-readiness
        ENV.Window.document.addEventListener('DOMContentLoaded', () => setTimeout(notify, 0), false);
        ENV.Window.addEventListener('load', () => setTimeout(notify, 0), false);
        if (ENV.Window.document.readyState === 'complete') {
            notify();
        }
        // On new scripts
        if (ENV.Window && ENV.Window.MutationObserver) {
            var observer = new ENV.Window.MutationObserver(() => notify());
            observer.observe(ENV.Window.document, {childList: true, subtree: true,});
        }
    };

    // ----------------------
    // Run
    // ----------------------
    scriptElementsCallback(scriptElement => {
        var script;
        if (getBase(scriptElement.parentNode).AST) {
            throw new Error('An element must only have one scopedJS instance!');
        }
        if (!(script = (scriptElement.textContent || '').trim())) {
            return;
        }
         // Parse
         getBase(scriptElement.parentNode).AST = ScopedJS.parse(script);
         applyBinding(scriptElement.parentNode);
        // Remove
        if (ENV.params.autoHide) {
            scriptElement.remove();
        } 
    });

    // ----------------------
    // Helpers
    // ----------------------
    var getBase = function(target) {
        if (!target['.scopedJS']) {
            var base = {};
            Object.defineProperty(target, '.scopedJS', {
                get: function() {
                    return base
                },
            })
        }
        return target['.scopedJS'];
    };
    var applyBinding = function(target) {
        if (getBase(target).AST) {
            var binding = getBase(target).binding || {};
            // --------
            // Create eval scope...
            var _super = {
                main: {}, 
                super: ENV.globals,
            };
            if (ENV.Trap) {
                ENV.Trap.set(_super.main, 'this', target);
            } else {
                _super.main['this'] = target;
            }
            var _main = {
                main: binding, 
                super: new Scope(_super),
            };
            var scope = new Scope(_main);
            // --------
            var returnValue = getBase(target).AST.eval(scope, ENV.Trap);
            if (_isFunction(returnValue)) {
                returnValue(binding);
            }
        }
        
    };

    // ----------------------
    // Define the bind() method
    // ----------------------
     if (!ENV.Window || !('Element' in ENV.Window)) {
        throw new Error('The "Element" class not found in global context!');
    }
    if (ENV.params.bindMethodName in ENV.Window.Element.prototype) {
        throw new Error('The "Element" class already has a "' + ENV.params.bindMethodName + '" property!');
    }
    Object.defineProperty(ENV.Window.Element.prototype, ENV.params.bindMethodName, {
        value: function(binding) {
            var _binding = getBase(this).binding;
            getBase(this).binding = binding;
            applyBinding(this);
            if (ENV.params.bindCallback) {
                ENV.params.bindCallback(this, binding, _binding);
            }
        }
    });
};

/**
 * @exports
 */
export {
    ScopedJS as default,
    ENV,
}