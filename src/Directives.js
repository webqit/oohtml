
/**
 * @imports
 */
import Jsen, {
	Statements
} from '@web-native-js/jsen';
import _wrapped from '@web-native-js/commons/str/wrapped.js';
import _unwrap from '@web-native-js/commons/str/unwrap.js';
import _merge from '@web-native-js/commons/obj/merge.js';
import _isString from '@web-native-js/commons/js/isString.js';

/**
 * ---------------------------
 * Call class
 * ---------------------------
 */				

export default class Directives extends Statements {
	 
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
		var directives = [];
		this.stmts.forEach(directive => {
			Directives.flatten(directive, _directive => {
				directives.push(_directive);
			});
		});
		// -------------------
		directives = directives.reduce((build, current) => {
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
	 * Rewrites directives.
	 *
	 * @return array
	 */
	static flatten(directive, callback, assertion = '') {
		if (directive.jsenType === 'IfConditional') {
			// ======================
			// On true
			// ======================
			var _assertion = '(' + directive.assertion.toString() + ')';
			if (directive.onTrue) {
				if (directive.onTrue.jsenType === 'Statements') {
					directive.onTrue.stmts.forEach(_directive => {
						Directives.flatten(_directive, callback, (assertion ? assertion + ' && ' : '') + _assertion)
					});
				} else {
					Directives.flatten(directive.onTrue, callback, (assertion ? assertion + ' && ' : '') + _assertion)
				}
			}
			// ======================
			// On false
			// ======================
			if (directive.onFalse) {
				if (directive.onFalse.jsenType === 'Statements') {
					directive.onFalse.stmts.forEach(_directive => {
						Directives.flatten(_directive, callback, (assertion ? assertion + ' && ' : '') + '!' + _assertion)
					});
				} else {
					Directives.flatten(directive.onFalse, callback, (assertion ? assertion + ' && ' : '') + '!' + _assertion)
				}
			}
		} else {
			if (assertion) {
				callback(Jsen.parse(assertion + ' && "[ENDIF]" && (' + directive.toString() + ')'));
			} else {
				callback(directive);
			}
		}
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