
/**
 * @imports
 */
import Jsen, {
	Statements
} from '@web-native-js/jsen';
import _wrapped from '@web-native-js/commons/str/wrapped.js';
import _unwrap from '@web-native-js/commons/str/unwrap.js';
import _merge from '@web-native-js/commons/obj/merge.js';

/**
 * ---------------------------
 * Call class
 * ---------------------------
 */				

export default class Directives extends Statements {
	
	/**
	 * Rewrites directives.
	 *
	 * @return array
	 */
	flatten() {
		var directives = [];
		// ======================
		// Flatten directives
		// ======================
		var addDirective = (directive, assertion = '') => {
			if (directive.jsenType === 'IfConditional') {
				// ======================
				// On true
				// ======================
				var _assertion = '(' + directive.assertion.toString() + ')';
				if (directive.onTrue.jsenType === 'Statements') {
					directive.onTrue.stmts.forEach(_directive => {
						addDirective(_directive, (assertion ? assertion + ' && ' : '') + _assertion)
					});
				} else {
					addDirective(directive.onTrue, (assertion ? assertion + ' && ' : '') + _assertion)
				}
				// ======================
				// On false
				// ======================
				if (directive.onFalse) {
					if (directive.onFalse.jsenType === 'Statements') {
						directive.onFalse.stmts.forEach(_directive => {
							addDirective(_directive, (assertion ? assertion + ' && ' : '') + '!' + _assertion)
						});
					} else {
						addDirective(directive.onFalse, (assertion ? assertion + ' && ' : '') + '!' + _assertion)
					}
				}
			} else {
				if (assertion) {
					directives.push(Jsen.parse(assertion + ' && "[ENDIF]" && ' + directive.toString()));
				} else {
					directives.push(directive);
				}
			}
		};
		this.stmts.forEach(directive => {
			addDirective(directive);
		});
		return directives;
	}
	 
	/**
	 * Returns a flat list of rules whose
	 * that have not been overriden.
	 *
	 * @return array
	 */
	filter() {
		// -------------------
		// CASCADING AND OVERRIDING
		// -------------------
		var directives = this.flatten().reduce((build, current) => {
			build.forEach(existing => {
				if (existing.isDuplicate || existing.overridden) {
					return;
				}
				if (current.toString() === existing.toString() 
				&& (current.important === existing.important || current.fallback === existing.fallback)) {
					current.isDuplicate = true;
				} else if (current.important  || existing.fallback) {
					existing.overridden = true;
				} else if ((existing.important || current.fallback)) {
					current.overridden = true;
				}
			});
			return build.concat([current]);
		}, []);
		// -------------------
		// FINAL FILTERING AND PARSING
		// -------------------
		return directives.filter(directive => !directive.isDuplicate && !directive.overridden);
	}
	 
	/**
	 * @inheritdoc
	 */
	static parse(expr, params = {}) {
		return super.parse(
			!expr.trim().endsWith(';') ? expr + ';' : expr, 
			(_expr, _Parsers = null, _params = null)  => Jsen.parse(_expr, _Parsers, _params ? _merge(params, _params) : params)/*parseCallback*/, 
			Directives/*Static*/
		);
	}
};