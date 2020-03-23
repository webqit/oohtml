
/**
 * @imports
 */
import _arrFrom from '@web-native-js/commons/arr/from.js';

/**
 * ---------------------------
 * The Matrix loader
 * ---------------------------
 */				

export default class Matrix {
	
	/**
	 * Creates a new Matrix instance.
	 *
	 * @param array 			sources
	 * @param string|array 		namespace
	 * @param function 			getter
	 * @param MatrixInterface	carry
	 *
	 * @return this
	 */
	constructor(sources, namespace, getter, carry = null) {
		this.sources = _arrFrom(sources);
		this.namespace = _arrFrom(namespace);
		this.getter = getter;
		this.carry = carry;
		this.collections = {};
		this.value;
	}

	/**
	 * Enters into a sub collection if exists.
	 *
	 * @param string 			name
	 *
	 * @return MatrixInterface
	 */
	enter(name) {
		if (!(name in this.collections)) {
			this.collections[name] = new Matrix(
				this.sources, 
				this.namespace.concat(name),
				this.getter,
				this 
			);
		}
		return this.collections[name];
	}

	/**
	 * Leaves the current current collection into the super collection if exists.
	 *
	 * @return MatrixInterface
	 */
	leave() {
		return this.carry;
	}

	/**
	 * Lazy-loads a property from sources.
	 *
	 * @return mixed
	 */
	get() {
		if (!this.value) {
			var namespace = this.namespace.slice();
			var value = this.carry ? this.carry.get() : null;
			this.sources.forEach((source, i) => {
				if (value = this.getter.call(null, source, namespace, value, i)) {
					this.value = value;
				}
			});
		}
		return this.value;
	}
	
	/**
	 * Finds the most-specific module for the given namespace from sources.
	 *
	 * @param sting					namespace
	 *
	 * @return object
	 */
	find(namespace) {
		var nsArray = namespace.split('/');
		var subMatrix, nsKey, nsDrill = this;
		while((nsKey = nsArray.shift()) && (nsDrill = nsDrill.enter(nsKey))) {
			subMatrix = nsDrill; 
		}
		// Clone now...
		var el = subMatrix.get();
		if (el) {
			return el.cloneNode(true);
		}
	}
};
