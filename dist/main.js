/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/browser-entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../commons/arr/divide.js":
/*!********************************!*\
  !*** ../commons/arr/divide.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Makes a separation between items that pass a callback test and those that fail.
 *
 * @param array	 				arr
 * @param function				callback
 *	 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, callback) {
	var passes = [];
	var failures = [];
	var length = arr.length;
	for (var i = 0; i < length; i++) {
		if (callback(arr[i])) {
			passes.push(arr[i]);
		} else {
			failures.push(arr[i]);
		};
	};
	return [passes, failures];
});;


/***/ }),

/***/ "../commons/arr/following.js":
/*!***********************************!*\
  !*** ../commons/arr/following.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isUndefined.js */ "../commons/js/isUndefined.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isFunction.js */ "../commons/js/isFunction.js");

/**
 * @imports
 */



/**
 * 1. Returns the ENTRY following (either the FIRST or the LAST instance of) the reference.
 * 2. Returns A NUMBER OF ENTRIES counting forwards from (either the FIRST or the LAST instance of) the given reference.
 *
 * @param array 		arr
 * @param mixed	 		reference
 * @param int|bool 		length
 * @param bool|function	 loop
 * @param bool	 		lastReference
 *
 * @return mixed|array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, reference, length = false, loop = false, lastReference = false) {
	if (arr.indexOf(reference) === -1) {
		return length ? [] : undefined;
	}
	var amount = length === true ? arr.length - 1 : (length === false ? 1 : length);
	var from = lastReference ? arr.lastIndexOf(reference) + 1 : arr.indexOf(reference) + 1;
	var after = !Object(_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(reference) ? arr.slice(from, from + amount) : [];
	if (loop && after.length < amount && after.length < arr.length) {
		if (!Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(loop) || loop(amount - after.length)) {
			after = after.concat(arr.slice(0, amount - after.length));
		}
	};
	return length ? after : after[0];
});;


/***/ }),

/***/ "../commons/arr/from.js":
/*!******************************!*\
  !*** ../commons/arr/from.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../commons/js/isArray.js");
/* harmony import */ var _js_isTypeArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isTypeArray.js */ "../commons/js/isTypeArray.js");
/* harmony import */ var _js_isEmpty_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isEmpty.js */ "../commons/js/isEmpty.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isObject.js */ "../commons/js/isObject.js");

/**
 * @imports
 */





/**
 * Casts an array-like object to an array.
 *
 * @param mixed 	val
 * @param bool	 	castObject
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val, castObject = true) {
	if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val)) {
		return val;
	};
	if (!castObject && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val)) {
		return [val];
	};
	if (val !== false && val !== 0 && Object(_js_isEmpty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val)) {
		return [];
	};
	if (Object(_js_isTypeArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val)) {
		return Array.prototype.slice.call(val);
	};
	if (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val)) {
		return Object.values(val);
	};
	return [val];
});;


/***/ }),

/***/ "../commons/arr/intersect.js":
/*!***********************************!*\
  !*** ../commons/arr/intersect.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../commons/js/isArray.js");

/**
 * @imports
 */


/**
 * Returns the intersection of two arrays;
 * optionally using a custom matching function.
 *
 * @param array 	arr
 * @param array	 	arr2
 * @param function 	callback
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, arr2, callback = null) {
	return !Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr2) ? [] : arr.filter(val1 => callback 
		? arr2.filter(val2 => callback(val1, val2)).length 
		: arr2.indexOf(val1) !== -1
	);
});;


/***/ }),

/***/ "../commons/arr/pushUnique.js":
/*!************************************!*\
  !*** ../commons/arr/pushUnique.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Adds an item if not already exist.
 *
 * @param array 	arr
 * @param array	 	...itms
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, ...items) {
	items.forEach(itm => {
		if (arr.indexOf(itm) < 0) {
			arr.push(itm);
		}
	});
	return arr;
});;


/***/ }),

/***/ "../commons/arr/unique.js":
/*!********************************!*\
  !*** ../commons/arr/unique.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Returns a list of unique items.
 *
 * @param array	 				arr
 *	 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr) {
	const distinct = (value, index, self) => {
		return self.indexOf(value) === index;
	};
	return arr.filter(distinct);
});;


/***/ }),

/***/ "../commons/js/isArray.js":
/*!********************************!*\
  !*** ../commons/js/isArray.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "array".
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Array.isArray(val);
});;


/***/ }),

/***/ "../commons/js/isEmpty.js":
/*!********************************!*\
  !*** ../commons/js/isEmpty.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNull.js */ "../commons/js/isNull.js");
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isUndefined.js */ "../commons/js/isUndefined.js");
/* harmony import */ var _isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isTypeObject.js */ "../commons/js/isTypeObject.js");

/**
 * @imports
 */




/**
 * Tells if val is empty in its own type.
 * This holds true for NULLs, UNDEFINED, FALSE, 0,
 * objects without keys, empty arrays.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Object(_isNull_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) || Object(_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) || val === false || val === 0 
		|| (Object(_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val) && !Object.keys(val).length);
});;


/***/ }),

/***/ "../commons/js/isFunction.js":
/*!***********************************!*\
  !*** ../commons/js/isFunction.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isTypeFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isTypeFunction.js */ "../commons/js/isTypeFunction.js");

/**
 * @imports
 */


/**
 * Tells if val is of type "function".
 *
 * @param object 		val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Object(_isTypeFunction_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) || (val && {}.toString.call(val) === '[object function]');
});;


/***/ }),

/***/ "../commons/js/isNull.js":
/*!*******************************!*\
  !*** ../commons/js/isNull.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is undefined or is null.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return val === null || val === '';
});;


/***/ }),

/***/ "../commons/js/isNumeric.js":
/*!**********************************!*\
  !*** ../commons/js/isNumeric.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "string" or a numeric string.
 * This holds true for both numbers and numeric strings.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return val !== true && val !== false && val !== null && val !== '' && !isNaN(val * 1);
});;


/***/ }),

/***/ "../commons/js/isObject.js":
/*!*********************************!*\
  !*** ../commons/js/isObject.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is pure object.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return !Array.isArray(val) && typeof val === 'object' && val;
});;


/***/ }),

/***/ "../commons/js/isString.js":
/*!*********************************!*\
  !*** ../commons/js/isString.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "string".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val === 'string';
});;


/***/ }),

/***/ "../commons/js/isTypeArray.js":
/*!************************************!*\
  !*** ../commons/js/isTypeArray.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isString.js */ "../commons/js/isString.js");
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isUndefined.js */ "../commons/js/isUndefined.js");

/**
 * @imports
 */



/**
 * Tells if val is "array-like".
 * This holds true for anything that has a length property.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return !Object(_isString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) && !Object(_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val.length);
});;


/***/ }),

/***/ "../commons/js/isTypeFunction.js":
/*!***************************************!*\
  !*** ../commons/js/isTypeFunction.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "function".
 * This holds true for both regular functions and classes.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val === 'function';
});;


/***/ }),

/***/ "../commons/js/isTypeObject.js":
/*!*************************************!*\
  !*** ../commons/js/isTypeObject.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "object".
 * This holds true for anything object, including built-ins.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Array.isArray(val) || typeof val === 'object';
});;


/***/ }),

/***/ "../commons/js/isUndefined.js":
/*!************************************!*\
  !*** ../commons/js/isUndefined.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is undefined or is of type "undefined".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return arguments.length && (val === undefined || typeof val === 'undefined');
});;


/***/ }),

/***/ "../commons/obj/copy.js":
/*!******************************!*\
  !*** ../commons/obj/copy.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../commons/js/isArray.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isFunction.js */ "../commons/js/isFunction.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isNumeric.js */ "../commons/js/isNumeric.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../commons/js/isTypeObject.js");
/* harmony import */ var _mergeCallback_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeCallback.js */ "../commons/obj/mergeCallback.js");

/**
 * @imports
 */






/**
 * Copies an object.
 *
 * @param object	 	obj
 * @param array		 	filter
 *
 * @return object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, filter = [], withSymbols = true) {
	var depth = 0;
	if (Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arguments[0]) && Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arguments[1])) {
		depth = arguments[0];
		obj = arguments[1];
		filter = arguments[2] || [];
	}
	return Object(_mergeCallback_js__WEBPACK_IMPORTED_MODULE_4__["default"])([depth, {}, obj], (key, obj1, obj2) => {
		return Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(filter) ? filter(key) 
			: (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(filter) && filter.length ? filter.indexOf(key) > -1 : true);
	}, false/*deepProps*/, false/*isReplace*/, withSymbols);
});;


/***/ }),

/***/ "../commons/obj/each.js":
/*!******************************!*\
  !*** ../commons/obj/each.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../commons/js/isTypeObject.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isNumeric.js */ "../commons/js/isNumeric.js");

/**
 * @imports
 */



/**
 * Loops thru obj flatly with a callback function.
 * Stops when callback returns a non-undefined value.
 *
 * @param array|object 			obj 			The array or object to iterate.
 * @param function 				callback 		The callback function.
 *
 * @return mixed|null			Any non-null return from callback
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, callback) {
	var returnValue = undefined;
	if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
		Object.keys(obj).forEach((k, i) => {
			if (returnValue !== false) {
				returnValue = callback(Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k) ? parseFloat(k) : k, obj[k], i);
			}
		});
	}
	return returnValue;
});;


/***/ }),

/***/ "../commons/obj/getAllPropertyNames.js":
/*!*********************************************!*\
  !*** ../commons/obj/getAllPropertyNames.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../arr/pushUnique.js */ "../commons/arr/pushUnique.js");
/* harmony import */ var _getPrototypeChain_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPrototypeChain.js */ "../commons/obj/getPrototypeChain.js");

/**
 * @imports
 */



/**
 * Eagerly retrieves object members all down the prototype chain.
 *
 * @param object	 	obj
 * @param object	 	until
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, until) {
	var keysAll = [];
	Object(_getPrototypeChain_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj, until).forEach(obj => {
		Object(_arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_0__["default"])(keysAll, ...Object.getOwnPropertyNames(obj));
	});
	return keysAll;
});;


/***/ }),

/***/ "../commons/obj/getPrototypeChain.js":
/*!*******************************************!*\
  !*** ../commons/obj/getPrototypeChain.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../commons/js/isArray.js");

/**
 * @imports
 */


/**
 * Returns the prototype chain.
 *
 * @param object 		obj
 * @param object	 	until
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, until) {
	until = until || Object.prototype;
	until = until && !Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(until) ? [until] : until;
	// We get the chain of inheritance
	var prototypalChain = [];
	var obj = obj;
	while((obj && (!until || until.indexOf(obj) < 0) && obj.name !== 'default')) {
		prototypalChain.push(obj);
		obj = obj ? Object.getPrototypeOf(obj) : null;
	}
	return prototypalChain;
});;


/***/ }),

/***/ "../commons/obj/merge.js":
/*!*******************************!*\
  !*** ../commons/obj/merge.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mergeCallback_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeCallback.js */ "../commons/obj/mergeCallback.js");

/**
 * @imports
 */


/**
  * Merges values from subsequent arrays/objects first array/object;
  * optionally recursive
  *
  * @param array ...objs
  *
  * @return void
  */
/* harmony default export */ __webpack_exports__["default"] = (function(...objs) {
	return Object(_mergeCallback_js__WEBPACK_IMPORTED_MODULE_0__["default"])(objs, (k, obj1, obj2) => {
		return true;
	}, false/*deepProps*/, false/*isReplace*/, false/*withSymbols*/);
});;


/***/ }),

/***/ "../commons/obj/mergeCallback.js":
/*!***************************************!*\
  !*** ../commons/obj/mergeCallback.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergeCallback; });
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../commons/js/isArray.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isFunction.js */ "../commons/js/isFunction.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isObject.js */ "../commons/js/isObject.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../commons/js/isTypeObject.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/isNumeric.js */ "../commons/js/isNumeric.js");
/* harmony import */ var _getAllPropertyNames_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getAllPropertyNames.js */ "../commons/obj/getAllPropertyNames.js");

/**
 * @imports
 */







/**
  * Merges values from subsequent arrays/objects first array/object;
  * optionally recursive
  *
  * @param array ...objs
  *
  * @return void
  */
function mergeCallback(objs, callback, deepProps = false, isReplace = false, withSymbols = true) {
	var depth = 0;
	var obj1 = objs.shift();
	if (Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__["default"])(obj1) || obj1 === true || obj1 === false) {
		depth = obj1;
		obj1 = objs.shift();
	}
	if (!objs.length) {
		throw new Error('_merge() requires two or more array/objects.');
	}
	objs.forEach((obj2, i) => {
		if (!Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(obj2) && !Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2)) {
			return;
		}
		(deepProps ? Object(_getAllPropertyNames_js__WEBPACK_IMPORTED_MODULE_5__["default"])(obj2) : Object.getOwnPropertyNames(obj2)).forEach(key => {
			var valAtObj1 = obj1[key];
			var valAtObj2 = obj2[key];
			if (((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj2)) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(valAtObj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(valAtObj2))) 
			&& (depth === true || depth > 0)) {
				// RECURSE...
				obj1[key] = Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj2) ? [] : {};
				mergeCallback([Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__["default"])(depth) ? depth - 1 : depth, obj1[key], valAtObj1, valAtObj2], callback, deepProps, isReplace, withSymbols);
			} else if (callback(key, obj1, obj2, i)) {
				if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj2)) {
					if (isReplace) {
						obj1[key] = valAtObj2;
					} else {
						obj1.push(valAtObj2);
					}
				} else {
					// In case we're setting a read-only property
					try {
						if (withSymbols) {
							Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj2, key));
						} else {
							obj1[key] = obj2[key];
						}
					} catch(e) {}
				}
			}
		});
	});
	return obj1;
};


/***/ }),

/***/ "../commons/str/after.js":
/*!*******************************!*\
  !*** ../commons/str/after.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Return the remainder of a string after a given value.
 *
 * @param  string  subject
 * @param  string  search
 * @param  bool	   afterLast
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, search, afterLast = false) {
	if (search == '') {
		return subject;
	}
	var pos = afterLast ? subject.lastIndexOf(search) : subject.indexOf(search);
	if (pos === -1) {
		return '';
	}
	return subject.substr(pos + search.length);
});;


/***/ }),

/***/ "../commons/str/before.js":
/*!********************************!*\
  !*** ../commons/str/before.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Return the part of a string before a given value.
 *
 * @param  string  subject
 * @param  string  search
 * @param  bool	   beforeLast
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, search, beforeLast = false) {
	if (search == '') {
		return subject;
	}
	var pos = beforeLast ? subject.lastIndexOf(search) : subject.indexOf(search);
	if (pos === -1) {
		return subject;
	}
	return subject.substr(0, pos);
});;


/***/ }),

/***/ "../commons/str/beforeLast.js":
/*!************************************!*\
  !*** ../commons/str/beforeLast.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _before_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./before.js */ "../commons/str/before.js");

/**
 * @imports
 */


/**
 * Return the part of a string before last occurence of a given value.
 *
 * @param  string  subject
 * @param  string  search
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, search) {
	return Object(_before_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subject, search, true);
});;


/***/ }),

/***/ "../commons/str/unwrap.js":
/*!********************************!*\
  !*** ../commons/str/unwrap.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _after_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./after.js */ "../commons/str/after.js");
/* harmony import */ var _beforeLast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./beforeLast.js */ "../commons/str/beforeLast.js");

/**
 * @imports
 */



/**
 * Returns the string without the given opening and closing tags.
 *
 * @param  string  subject
 * @param  string  openingTag
 * @param  string  closingTag
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, openingTag, closingTag) {
	return Object(_beforeLast_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_after_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subject, openingTag), closingTag);
});;


/***/ }),

/***/ "../commons/str/wrapped.js":
/*!*********************************!*\
  !*** ../commons/str/wrapped.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if the string is warapped with the given opening and closing tags.
 *
 * @param  string  subject
 * @param  string  openingTag
 * @param  string  closingTag
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, openingTag, closingTag) {
	return subject.startsWith(openingTag) && subject.endsWith(closingTag);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/difference.js":
/*!*********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/difference.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");

/**
 * @imports
 */


/**
 * Returns the difference of two arrays;
 * optionally using a custom matching function.
 *
 * @param array 	arr
 * @param array	 	arr2
 * @param function 	callback
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, arr2, callback = null) {
	return !Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr2) ? [] : arr.filter(val1 => callback 
		? arr2.filter(val2 => callback(val1, val2)).length 
		: arr2.indexOf(val1) === -1
	);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/first.js":
/*!****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/first.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Returns THE FIRST ENTRY OR A NUMBER OF ENTRIES counting forward from the begining.
 *
 * @param array 	arr
 * @param int	 	amount
 *
 * @return mixed|array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, amount = 1) {
	var count = 0;
	arr.forEach(itm => {
		count ++;
	});
	var firsts = arr.slice(arr.length - count, amount);
	return arguments.length > 1 ? firsts : firsts[0];
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/flatten.js":
/*!******************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/flatten.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isNumeric.js */ "../jsen/node_modules/@web-native-js/commons/js/isNumeric.js");

/**
 * @imports
 */




/**
 * Flattens a nested array to the given depth.
 *
 * @param array 	arr
 * @param int 	 	depth
 * @param bool 	 	withObjects
 *
 * @return array
 */
const _flatten = function(arr, depth = 1, withObjects = true) {
	if (!Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__["default"])(depth) || depth <= 0) {
		return arr;
	};
	if (!Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) && withObjects) {
		arr = Object.values(arr);
	};
	if (!Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr)) {
		return arr;
	};
	return arr.reduce((acc, val) => Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) && withObjects) 
		? acc.concat(_flatten(!Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) ? Object.values(val) : val, depth - 1, withObjects)) 
		: acc.concat(val), []);
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (_flatten);

/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/from.js":
/*!***************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/from.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isTypeArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isTypeArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeArray.js");
/* harmony import */ var _js_isEmpty_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isEmpty.js */ "../jsen/node_modules/@web-native-js/commons/js/isEmpty.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isObject.js");

/**
 * @imports
 */





/**
 * Casts an array-like object to an array.
 *
 * @param mixed 	val
 * @param bool	 	castObject
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val, castObject = true) {
	if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val)) {
		return val;
	};
	if (!castObject && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val)) {
		return [val];
	};
	if (val !== false && val !== 0 && Object(_js_isEmpty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val)) {
		return [];
	};
	if (Object(_js_isTypeArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val)) {
		return Array.prototype.slice.call(val);
	};
	if (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val)) {
		return Object.values(val);
	};
	return [val];
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/intersect.js":
/*!********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/intersect.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");

/**
 * @imports
 */


/**
 * Returns the intersection of two arrays;
 * optionally using a custom matching function.
 *
 * @param array 	arr
 * @param array	 	arr2
 * @param function 	callback
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, arr2, callback = null) {
	return !Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr2) ? [] : arr.filter(val1 => callback 
		? arr2.filter(val2 => callback(val1, val2)).length 
		: arr2.indexOf(val1) !== -1
	);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/last.js":
/*!***************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/last.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _first_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./first.js */ "../jsen/node_modules/@web-native-js/commons/arr/first.js");

/**
 * @imports
 */


/**
 * Returns THE LAST ENTRY OR A NUMBER OF ENTRIES counting forward to the end.
 *
 * @param array 	arr
 * @param int	 	amount
 *
 * @return mixed|array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, amount = 1) {
	return arguments.length > 1
		? Object(_first_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr.slice().reverse(), amount).reverse()
		: Object(_first_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr.slice().reverse());
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/pushUnique.js":
/*!*********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/pushUnique.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Adds an item if not already exist.
 *
 * @param array 	arr
 * @param array	 	...itms
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, ...items) {
	items.forEach(itm => {
		if (arr.indexOf(itm) < 0) {
			arr.push(itm);
		}
	});
	return arr;
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/remove.js":
/*!*****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/remove.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Removes instances of reference up to <limit> times.
 *
 * @param array 	arr
 * @param mixed	 	itm
 * @param int|bool 	limit
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, itm, limit = false) {
	var i = arr.indexOf(itm);
	while (i > -1 && (limit || limit === false)) {
		arr.splice(i, 1);
		if (limit > 0) {
			limit --;
		};
		i = arr.indexOf(itm);
	};
	return arr;
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/arr/unique.js":
/*!*****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/arr/unique.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Returns a list of unique items.
 *
 * @param array	 				arr
 *	 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr) {
	const distinct = (value, index, self) => {
		return self.indexOf(value) === index;
	};
	return arr.filter(distinct);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/instanceof.js":
/*!********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/instanceof.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Instanceof that supports our multi-inheritance implementstion.
 *
 * @param object	 	obj1
 * @param object	 	classB
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, classB) {
	if (!obj) {
		return false;
	}
	if (obj instanceof classB) {
		return true;
	}
	var mixinTest = classA => {
		while (classA && classA !== Function.prototype) {
			if (classA === classB || (classA.prototypes && classA.prototypes.reduce((prevAns, prototype) => prevAns || (prototype === classB) || mixinTest(prototype), false))) {
				return true;
			}
			classA = Object.getPrototypeOf(classA);
		}
		return false;
	};
	return mixinTest(obj.constructor);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isArray.js":
/*!*****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isArray.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "array".
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Array.isArray(val);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isBoolean.js":
/*!*******************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isBoolean.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is undefined or is of type "boolean".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return val === true || val === false;
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isEmpty.js":
/*!*****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isEmpty.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNull.js */ "../jsen/node_modules/@web-native-js/commons/js/isNull.js");
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isTypeObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js");

/**
 * @imports
 */




/**
 * Tells if val is empty in its own type.
 * This holds true for NULLs, UNDEFINED, FALSE, 0,
 * objects without keys, empty arrays.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Object(_isNull_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) || Object(_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) || val === false || val === 0 
		|| (Object(_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val) && !Object.keys(val).length);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isFunction.js":
/*!********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isFunction.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isTypeFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isTypeFunction.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeFunction.js");

/**
 * @imports
 */


/**
 * Tells if val is of type "function".
 *
 * @param object 		val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Object(_isTypeFunction_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) || (val && {}.toString.call(val) === '[object function]');
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isNull.js":
/*!****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isNull.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is undefined or is null.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return val === null || val === '';
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isNumber.js":
/*!******************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isNumber.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "number".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val === 'number';
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isNumeric.js":
/*!*******************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isNumeric.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "string" or a numeric string.
 * This holds true for both numbers and numeric strings.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return val !== true && val !== false && val !== null && val !== '' && !isNaN(val * 1);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isObject.js":
/*!******************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isObject.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is pure object.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return !Array.isArray(val) && typeof val === 'object' && val;
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isPlainObject.js":
/*!***********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isPlainObject.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isObject.js");

/**
 * @imports
 */


/**
 * Tells if an object is direct instance of Object.prototype.
 * Quite useful in differentiating native objects and class instances from plain objects ({}).
 *
 * @param object 	obj
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj) {
	return Object(_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj) && Object.getPrototypeOf(obj) === Object.prototype;
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isString.js":
/*!******************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isString.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "string".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val === 'string';
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isTypeArray.js":
/*!*********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isTypeArray.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isString.js */ "../jsen/node_modules/@web-native-js/commons/js/isString.js");
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");

/**
 * @imports
 */



/**
 * Tells if val is "array-like".
 * This holds true for anything that has a length property.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return !Object(_isString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) && !Object(_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val.length);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isTypeFunction.js":
/*!************************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isTypeFunction.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "function".
 * This holds true for both regular functions and classes.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val === 'function';
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js":
/*!**********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "object".
 * This holds true for anything object, including built-ins.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Array.isArray(val) || typeof val === 'object';
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js":
/*!*********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/js/isUndefined.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is undefined or is of type "undefined".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return arguments.length && (val === undefined || typeof val === 'undefined');
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/compareCallback.js":
/*!**************************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/compareCallback.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isBoolean_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isBoolean.js */ "../jsen/node_modules/@web-native-js/commons/js/isBoolean.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./each.js */ "../jsen/node_modules/@web-native-js/commons/obj/each.js");

/**
 * @imports
 */






/**
 * Gets the match(es) between (members of) two values;
 * assertion optionally custom.
 *
 * @param mixed 			ob1
 * @param mixed 			obj2
 * @param string|function	assertion
 * @param bool				netComparison
 * @param bool				contrast
 * @param bool				returnOnFirstFalse
 *
 * @return bool|array|object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj1, obj2, assertion = true, netComparison = true, contrast = false, returnOnFirstFalse = false) {
	if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj2)) {
		var result = [];
		var contn = true;
		obj1.forEach(v1 => {
			if (!contn) {
				return;
			}
			var testPass = false;
			Object(_each_js__WEBPACK_IMPORTED_MODULE_4__["default"])(obj2, (k, v2) => {
				if (!testPass || (netComparison && Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(v1))) {
					testPass = assertion(v1, v2);
					if ((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(testPass) && !testPass.length) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(testPass) && !Object.keys(testPass).length)) {
						testPass = false;
					}
					if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(testPass) && netComparison) {
						// Further recursions should use this testPass as v1
						v1 = testPass;
					}
				}
			});
			if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(testPass)) {
				result.push(netComparison ? testPass : v1);
			} else if (!Object(_js_isBoolean_js__WEBPACK_IMPORTED_MODULE_3__["default"])(testPass)) {
				result.push(testPass);
			} else if ((contrast && !testPass) || (!contrast && testPass)) {
				result.push(v1);
			} else if (returnOnFirstFalse) {
				contn = false;
			}
		});
		return result;
	}
	
	if (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2)) {
		var result = {};
		var contn = true;
		Object.keys(obj1).forEach(k => {
			if (!contn) {
				return;
			}
			var testPass = assertion(obj1[k], obj2[k]);
			if ((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(testPass) && !testPass.length) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(testPass) && !Object.keys(testPass).length)) {
				testPass = false;
			}
			if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(testPass)) {
				result[k] = netComparison ? testPass : obj1[k];
			} else if (!Object(_js_isBoolean_js__WEBPACK_IMPORTED_MODULE_3__["default"])(testPass)) {
				result[k] = testPass;
			} else if ((contrast && !testPass) || (!contrast && testPass)) {
				result[k] = obj1[k];
			} else if (returnOnFirstFalse) {
				contn = false;
			}
		});
		return result;
	}
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/copy.js":
/*!***************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/copy.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isFunction.js */ "../jsen/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isNumeric.js */ "../jsen/node_modules/@web-native-js/commons/js/isNumeric.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _mergeCallback_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeCallback.js */ "../jsen/node_modules/@web-native-js/commons/obj/mergeCallback.js");

/**
 * @imports
 */






/**
 * Copies an object.
 *
 * @param object	 	obj
 * @param array		 	filter
 *
 * @return object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, filter = [], withSymbols = true) {
	var depth = 0;
	if (Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arguments[0]) && Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arguments[1])) {
		depth = arguments[0];
		obj = arguments[1];
		filter = arguments[2] || [];
	}
	return Object(_mergeCallback_js__WEBPACK_IMPORTED_MODULE_4__["default"])([depth, {}, obj], (key, obj1, obj2) => {
		return Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(filter) ? filter(key) 
			: (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(filter) && filter.length ? filter.indexOf(key) > -1 : true);
	}, false/*deepProps*/, false/*isReplace*/, withSymbols);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/copyPlain.js":
/*!********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/copyPlain.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isFunction.js */ "../jsen/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _mergeCallback_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeCallback.js */ "../jsen/node_modules/@web-native-js/commons/obj/mergeCallback.js");

/**
 * @imports
 */




/**
 * Copies only properties of an object.
 *
 * @param object	 	obj
 * @param array		 	only
 * @param array		 	except
 *
 * @return object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, filter = []) {
	return Object(_mergeCallback_js__WEBPACK_IMPORTED_MODULE_2__["default"])([{}, obj], (key, obj1, obj2) => {
		if (!Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2[key])) {
			return Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(filter) ? filter(key) 
				: (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(filter) && filter.length ? filter.indexOf(key) > -1 : true);
		}
	}, false/*deepProps*/, false/*isReplace*/, false/*withSymbols*/);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/each.js":
/*!***************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/each.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isNumeric.js */ "../jsen/node_modules/@web-native-js/commons/js/isNumeric.js");

/**
 * @imports
 */



/**
 * Loops thru obj flatly with a callback function.
 * Stops when callback returns a non-undefined value.
 *
 * @param array|object 			obj 			The array or object to iterate.
 * @param function 				callback 		The callback function.
 *
 * @return mixed|null			Any non-null return from callback
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, callback) {
	var returnValue = undefined;
	if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
		Object.keys(obj).forEach((k, i) => {
			if (returnValue !== false) {
				returnValue = callback(Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k) ? parseFloat(k) : k, obj[k], i);
			}
		});
	}
	return returnValue;
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/even.js":
/*!***************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/even.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isNumber.js */ "../jsen/node_modules/@web-native-js/commons/js/isNumber.js");
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/isFunction.js */ "../jsen/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _js_isPlainObject_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/isPlainObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isPlainObject.js");
/* harmony import */ var _compareCallback_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./compareCallback.js */ "../jsen/node_modules/@web-native-js/commons/obj/compareCallback.js");

/**
 * @imports
 */








/**
 * Asserts (members of) the first value against (members of) subsequent values.
 * Assertion could be TRUE, FALSE, or custom.
 *
 * @param mixed 			obj1
 * @param mixed 			obj2
 * @param bool|function		assertion
 * @param int				depth
 *
 * @return bool
 */
const _even = function(obj1, obj2, assertion = true, depth = 1) {
	if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2) && obj1.length !== obj2.length) {
		return !assertion;
	}
	if (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj2)) {
		var obj1Keys = Object.keys(obj1);
		var obj2Keys = Object.keys(obj2);
		if (!obj1Keys.length && !obj2Keys.length) {
			// Objects that won't show keys must be compared by instance
			// Many native objects won't. So we can't judge by keys alone.
			return Object(_js_isPlainObject_js__WEBPACK_IMPORTED_MODULE_5__["default"])(obj1) && Object(_js_isPlainObject_js__WEBPACK_IMPORTED_MODULE_5__["default"])(obj2) 
				? assertion
				: (obj1 === obj2) === assertion;
		}
		if (!_even(obj1Keys, obj2Keys)) {
			return !assertion;
		}
	}
	if (depth > 0 && ((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2)) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj2)))) {
		var result = Object(_compareCallback_js__WEBPACK_IMPORTED_MODULE_6__["default"])(obj1, obj2, (v1, v2) => {
			return _even(v1, v2, assertion, depth - 1);
		}, false/*netComparison*/, false/*contrast*/, true/*returnOnFirstFalse*/);
		return Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result) 
			? result.length === obj1.length && result.length === obj2.length 
			: (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(result) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj1) 
				? Object.keys(result).length === Object.keys(obj1).length && Object.keys(result).length ===  Object.keys(obj2).length 
				: result);
	}
	return Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_4__["default"])(assertion) ? assertion(obj1, obj2) : (
		Object(_js_isNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj1) && Object(_js_isNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj2) && isNaN(obj1) && isNaN(obj2) 
			? assertion 
			: (obj1 === obj2) === assertion
	);
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (_even);


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/getAllPropertyNames.js":
/*!******************************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/getAllPropertyNames.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../arr/pushUnique.js */ "../jsen/node_modules/@web-native-js/commons/arr/pushUnique.js");
/* harmony import */ var _getPrototypeChain_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPrototypeChain.js */ "../jsen/node_modules/@web-native-js/commons/obj/getPrototypeChain.js");

/**
 * @imports
 */



/**
 * Eagerly retrieves object members all down the prototype chain.
 *
 * @param object	 	obj
 * @param object	 	until
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, until) {
	var keysAll = [];
	Object(_getPrototypeChain_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj, until).forEach(obj => {
		Object(_arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_0__["default"])(keysAll, ...Object.getOwnPropertyNames(obj));
	});
	return keysAll;
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/getPrototypeChain.js":
/*!****************************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/getPrototypeChain.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");

/**
 * @imports
 */


/**
 * Returns the prototype chain.
 *
 * @param object 		obj
 * @param object	 	until
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, until) {
	until = until || Object.prototype;
	until = until && !Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(until) ? [until] : until;
	// We get the chain of inheritance
	var prototypalChain = [];
	var obj = obj;
	while((obj && (!until || until.indexOf(obj) < 0) && obj.name !== 'default')) {
		prototypalChain.push(obj);
		obj = obj ? Object.getPrototypeOf(obj) : null;
	}
	return prototypalChain;
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/merge.js":
/*!****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/merge.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mergeCallback_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeCallback.js */ "../jsen/node_modules/@web-native-js/commons/obj/mergeCallback.js");

/**
 * @imports
 */


/**
  * Merges values from subsequent arrays/objects first array/object;
  * optionally recursive
  *
  * @param array ...objs
  *
  * @return void
  */
/* harmony default export */ __webpack_exports__["default"] = (function(...objs) {
	return Object(_mergeCallback_js__WEBPACK_IMPORTED_MODULE_0__["default"])(objs, (k, obj1, obj2) => {
		return true;
	}, false/*deepProps*/, false/*isReplace*/, false/*withSymbols*/);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/obj/mergeCallback.js":
/*!************************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/obj/mergeCallback.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergeCallback; });
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isFunction.js */ "../jsen/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/isNumeric.js */ "../jsen/node_modules/@web-native-js/commons/js/isNumeric.js");
/* harmony import */ var _getAllPropertyNames_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getAllPropertyNames.js */ "../jsen/node_modules/@web-native-js/commons/obj/getAllPropertyNames.js");

/**
 * @imports
 */







/**
  * Merges values from subsequent arrays/objects first array/object;
  * optionally recursive
  *
  * @param array ...objs
  *
  * @return void
  */
function mergeCallback(objs, callback, deepProps = false, isReplace = false, withSymbols = true) {
	var depth = 0;
	var obj1 = objs.shift();
	if (Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__["default"])(obj1) || obj1 === true || obj1 === false) {
		depth = obj1;
		obj1 = objs.shift();
	}
	if (!objs.length) {
		throw new Error('_merge() requires two or more array/objects.');
	}
	objs.forEach((obj2, i) => {
		if (!Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(obj2) && !Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2)) {
			return;
		}
		(deepProps ? Object(_getAllPropertyNames_js__WEBPACK_IMPORTED_MODULE_5__["default"])(obj2) : Object.getOwnPropertyNames(obj2)).forEach(key => {
			var valAtObj1 = obj1[key];
			var valAtObj2 = obj2[key];
			if (((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj2)) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(valAtObj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(valAtObj2))) 
			&& (depth === true || depth > 0)) {
				// RECURSE...
				obj1[key] = Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj2) ? [] : {};
				mergeCallback([Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__["default"])(depth) ? depth - 1 : depth, obj1[key], valAtObj1, valAtObj2], callback, deepProps, isReplace, withSymbols);
			} else if (callback(key, obj1, obj2, i)) {
				if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj2)) {
					if (isReplace) {
						obj1[key] = valAtObj2;
					} else {
						obj1.push(valAtObj2);
					}
				} else {
					// In case we're setting a read-only property
					try {
						if (withSymbols) {
							Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj2, key));
						} else {
							obj1[key] = obj2[key];
						}
					} catch(e) {}
				}
			}
		});
	});
	return obj1;
};


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/str/after.js":
/*!****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/str/after.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Return the remainder of a string after a given value.
 *
 * @param  string  subject
 * @param  string  search
 * @param  bool	   afterLast
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, search, afterLast = false) {
	if (search == '') {
		return subject;
	}
	var pos = afterLast ? subject.lastIndexOf(search) : subject.indexOf(search);
	if (pos === -1) {
		return '';
	}
	return subject.substr(pos + search.length);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/str/before.js":
/*!*****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/str/before.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Return the part of a string before a given value.
 *
 * @param  string  subject
 * @param  string  search
 * @param  bool	   beforeLast
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, search, beforeLast = false) {
	if (search == '') {
		return subject;
	}
	var pos = beforeLast ? subject.lastIndexOf(search) : subject.indexOf(search);
	if (pos === -1) {
		return subject;
	}
	return subject.substr(0, pos);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/str/beforeLast.js":
/*!*********************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/str/beforeLast.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _before_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./before.js */ "../jsen/node_modules/@web-native-js/commons/str/before.js");

/**
 * @imports
 */


/**
 * Return the part of a string before last occurence of a given value.
 *
 * @param  string  subject
 * @param  string  search
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, search) {
	return Object(_before_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subject, search, true);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js":
/*!*****************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/str/unwrap.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _after_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./after.js */ "../jsen/node_modules/@web-native-js/commons/str/after.js");
/* harmony import */ var _beforeLast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./beforeLast.js */ "../jsen/node_modules/@web-native-js/commons/str/beforeLast.js");

/**
 * @imports
 */



/**
 * Returns the string without the given opening and closing tags.
 *
 * @param  string  subject
 * @param  string  openingTag
 * @param  string  closingTag
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, openingTag, closingTag) {
	return Object(_beforeLast_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_after_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subject, openingTag), closingTag);
});;


/***/ }),

/***/ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js":
/*!******************************************************************!*\
  !*** ../jsen/node_modules/@web-native-js/commons/str/wrapped.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if the string is warapped with the given opening and closing tags.
 *
 * @param  string  subject
 * @param  string  openingTag
 * @param  string  closingTag
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, openingTag, closingTag) {
	return subject.startsWith(openingTag) && subject.endsWith(closingTag);
});;


/***/ }),

/***/ "../jsen/src/Contexts.js":
/*!*******************************!*\
  !*** ../jsen/src/Contexts.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Contexts; });
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../jsen/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../jsen/node_modules/@web-native-js/commons/js/isString.js");
/* harmony import */ var _web_native_js_commons_js_isNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isNumber.js */ "../jsen/node_modules/@web-native-js/commons/js/isNumber.js");

/**
 * @imports
 */






/**
 * @exports
 */
class Contexts {

	/**
	 * Creates a new context stack.
	 *
	 * @param any		 	mainContext
	 * @param Contexts	 	superContext
	 * @param object	 	localContext
	 * @param object	 	localContextMeta
	 *
	 * @return Contexts
	 */
	constructor(mainContext, superContext = null, localContext = {}, localContextMeta = {}) {
		this.mainContext = mainContext;
		this.superContext = superContext ? Contexts.create(superContext) : null;
		this.localContext = localContext
		this.localContextMeta = localContextMeta
	}
	
	/**
	 * Tries the handler on the different contexts in the stack.
	 *
	 * @param string|number 	prop
	 * @param function		 	callback
	 * @param function		 	final
	 *
	 * @return Contexts
	 */
	handle(prop, callback, final, level = 0) {
		var callMain = () => {
			return callback(this.mainContext, null, () => {
				if (this.superContext) {
					return this.superContext.handle(prop, callback, final, level + 1);
				}
				if (final) {
					return final();
				}
			}, level);
		};
		if (prop === 'toString' && this.localContext.toString === Object.prototype.toString) {
			return callMain();
		}
		return callback(this.localContext, this.localContextMeta, callMain, level);
	}

	/**
	 * Returns a property's value from the first possessing context.
	 *
	 * @param string|number prop
	 * @param object		trap
	 * @param bool			bindThis
	 *
	 * @return mixed
	 */
	get(prop, trap = {}, bindThis = true) {
		if (prop instanceof String) {
			// incase we recieved new String()
			prop = prop + '';
		}
		return this.handle(prop, (contxtObj, contxtMeta, advance, level) => {
			var val = _get(contxtObj, prop, trap);
			// asking first mught not go well generally && _has(this[i], prop, trap)
			if (!Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) || _has(contxtObj, prop, trap)) {
				if (Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val) && bindThis) {
					return val.bind(contxtObj);
				}
				return val;
			}
			return advance();
		});
	}
	
	/**
	 * Updates a property's value from the first possessing context.
	 * Or adds a new context to set the property.
	 *
	 * @param string|number prop
	 * @param mixed			val
	 * @param object		trap
	 * @param bool			initKeyword
	 *
	 * @return bool
	 */
	set(prop, val, trap = {}, initKeyword = false) {
		if (prop instanceof String) {
			// incase we recieved new String()
			prop = prop + '';
		}
		const _set = (cntxt, prop, val, trap) => {
			if (trap.set) {
				return trap.set(cntxt, prop, val);
			}
			cntxt[prop] = val;
			return true;
		};
		return this.handle(initKeyword ? true : prop, (contxtObj, localContxtMeta, advance) => {
			// Whatever the level of localContext...
			if (localContxtMeta && localContxtMeta[prop] === 'const') {
				throw new Error('CONST ' + prop + 'cannot be modified!');
			}
			// Set this locally, we wont be getting to advance()
			if (initKeyword) {
				if (!['var', 'let', 'const'].includes(initKeyword)) {
					throw new Error('Unrecognized declarator: ' + initKeyword + '!');
				}
				localContxtMeta[prop] = initKeyword;
				return _set(contxtObj, prop, val, trap);
			}
			// For any other contex, it must already exists
			if (_has(contxtObj, prop, trap)) {
				return _set(contxtObj, prop, val, trap);
			}
			return advance();
		}, () => {throw new Error('"' + prop + '" is undefined!');});
	}
	
	/**
	 * Deletes a property from the first possessing context.
	 *
	 * @param string|number prop
	 * @param object		trap
	 *
	 * @return bool
	 */
	del(prop, trap = {}) {
		if (prop instanceof String) {
			// incase we recieved new String()
			prop = prop + '';
		}
		return this.handle(prop, (contxtObj, contxtMeta, advance) => {
			if (_has(contxtObj, prop, trap)) {
				if (trap.deleteProperty || trap.del) {
					return (trap.deleteProperty || trap.del)(contxtObj, prop);
				}
				delete contxtObj[prop];
				return true;
			}
			return advance();
		});
	}

	/**
	 * Tests if a property exists in any context.
	 *
	 * @param string|number prop
	 * @param string|number prop2
	 * @param object		trap
	 *
	 * @return bool
	 */
	has(prop, prop2, trap = {}) {
		if (prop instanceof String) {
			// incase we recieved new String()
			prop = prop + '';
		}
		if (prop2 instanceof String) {
			// incase we recieved new String()
			prop2 = prop2 + '';
		}
		return this.handle(prop, (contxtObj, contxtMeta, advance) => {
			if (_has(contxtObj, prop, trap)) {
				var contextObj2 = _get(contxtObj, prop, trap);
				return _has(contextObj2, prop2, trap);
			}
			return advance();
		}, () => {throw new Error('"' + prop + '" is undefined!');});
	}
	
	/**
	 * Tests if a property exists in any context.
	 *
	 * @param string|number prop
	 * @param array			args
	 * @param object		trap
	 *
	 * @return mixed
	 */
	exec(prop, args, trap = {}) {
		if (prop instanceof String) {
			// incase we recieved new String()
			prop = prop + '';
		}
		return this.handle(prop, (contxtObj, contxtMeta, advance) => {
			var fn = _get(contxtObj, prop, trap);
			if (!Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn) || _has(contxtObj, prop, trap)) {
				if (!Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fn)) {
					if (trap.exec) {
						return trap.exec(contxtObj, prop, args);
					}
					throw new Error('"' + prop + '" is not a function! (Called on type: ' + typeof contxtObj + '.)');
				}
				if (trap.apply) {
					return trap.apply(fn, contxtObj, args);
				}
				return fn.apply(contxtObj, args);
			}
			return advance();
		}, () => {
			if (trap.execUnknown) {
				return trap.execUnknown(this, prop, args);
			}
			throw new Error('"' + prop + '()" is undefined!');
		});
	}

	/**
	 * Factory method for making a Contexts instance.
	 *
	 * @param array|object 	cntxt
	 *
	 * @return Contexts
	 */
	static create(cntxt) {
		return cntxt instanceof Contexts ? cntxt : new Contexts(cntxt);
	}
};

const _get = (cntxt, prop, trap) => trap.get ? trap.get(cntxt, prop) 
	: ((Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(cntxt) && cntxt) || Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cntxt) || Object(_web_native_js_commons_js_isNumber_js__WEBPACK_IMPORTED_MODULE_4__["default"])(cntxt) ? cntxt[prop] : undefined);;

const _has = (cntxt, prop, trap) => trap.has ? trap.has(cntxt, prop) : (
	Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(cntxt) && cntxt ? prop in cntxt : !Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cntxt[prop])
);

class LocalContext {};

/***/ }),

/***/ "../jsen/src/Expr/Abstraction.js":
/*!***************************************!*\
  !*** ../jsen/src/Expr/Abstraction.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js");
/* harmony import */ var _AbstractionInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractionInterface.js */ "../jsen/src/Expr/AbstractionInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */





/**
 * ---------------------------
 * Abstraction class
 * ---------------------------
 */				

const Abstraction = class extends _AbstractionInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	 
	/**
	 * @inheritdoc
	 */
	constructor(expr) {
		super();
		this.expr = expr;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return this.expr.eval(context, trap);
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return '(' + this.expr.toString(context) + ')';
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Abstraction) {
		if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(expr, '(', ')') && !_Lexer_js__WEBPACK_IMPORTED_MODULE_3__["default"].match(expr, [' ']).length) {
			return new Static(
				parseCallback(Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(expr, '(', ')'))
			);
		}
	}
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Abstraction);


/***/ }),

/***/ "../jsen/src/Expr/AbstractionInterface.js":
/*!************************************************!*\
  !*** ../jsen/src/Expr/AbstractionInterface.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * AbstractionInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'Abstraction'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Arguments.js":
/*!*************************************!*\
  !*** ../jsen/src/Expr/Arguments.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js");
/* harmony import */ var _ArgumentsInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArgumentsInterface.js */ "../jsen/src/Expr/ArgumentsInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */





/**
 * ---------------------------
 * Arguments class
 * ---------------------------
 */				

const Arguments = class extends _ArgumentsInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	 
	/**
	 * @inheritdoc
	 */
	constructor(list = []) {
		super();
		this.list = list;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return this.list.map(arg => arg.eval(context, trap));
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return '(' + this.list.map(arg => arg.toString(context)).join(', ') + ')';
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Arguments) {
		var args; expr = expr.trim();
		if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(expr, '(', ')') && !_Lexer_js__WEBPACK_IMPORTED_MODULE_3__["default"].match(expr, [' ']).length) {
			return new Static(
				_Lexer_js__WEBPACK_IMPORTED_MODULE_3__["default"].split(Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(expr, '(', ')'), [',']).map(arg => parseCallback(arg.trim()))
			);
		}
	}
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Arguments);


/***/ }),

/***/ "../jsen/src/Expr/ArgumentsInterface.js":
/*!**********************************************!*\
  !*** ../jsen/src/Expr/ArgumentsInterface.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * ArgumentsInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'Arguments'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Arr.js":
/*!*******************************!*\
  !*** ../jsen/src/Expr/Arr.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js");
/* harmony import */ var _ArrInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArrInterface.js */ "../jsen/src/Expr/ArrInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */





/**
 * ---------------------------
 * Array utils
 * ---------------------------
 */				

const Arr = class extends _ArrInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(exprs) {
		super();
		this.exprs = exprs || [];
	}
	
	/**
	 * @inheritdoc
	 */
	inherit(Super) {
		if (Super instanceof _ArrInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
			var newExprs = Super.exprs.filter(exprA => {
				return this.exprs.reduce((uniqueSoFar, exprB) => uniqueSoFar && !exprA.even(exprB), true);
			});
			this.exprs = newExprs.concat(this.exprs);
		}
		return this;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return this.exprs.map(expr => expr.eval(context, trap));
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return '[' + this.exprs.map(expr => expr.toString(context)).join(', ') + ']';
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Arr) {
		if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(expr, '[', ']') && !_Lexer_js__WEBPACK_IMPORTED_MODULE_3__["default"].match(expr.trim(), [' ']).length) {
			var splits = _Lexer_js__WEBPACK_IMPORTED_MODULE_3__["default"].split(Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(expr, '[', ']'), [','])
				.map(n => n.trim()).filter(n => n).map(expr => parseCallback(expr));
			return new Static(splits);
		}
	}
};

/**
 * @export
 */
/* harmony default export */ __webpack_exports__["default"] = (Arr);


/***/ }),

/***/ "../jsen/src/Expr/ArrInterface.js":
/*!****************************************!*\
  !*** ../jsen/src/Expr/ArrInterface.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * ArrInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'ArrayType'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Assertion.js":
/*!*************************************!*\
  !*** ../jsen/src/Expr/Assertion.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/first.js */ "../jsen/node_modules/@web-native-js/commons/arr/first.js");
/* harmony import */ var _web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/flatten.js */ "../jsen/node_modules/@web-native-js/commons/arr/flatten.js");
/* harmony import */ var _web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/unique.js */ "../jsen/node_modules/@web-native-js/commons/arr/unique.js");
/* harmony import */ var _AssertionInterface_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AssertionInterface.js */ "../jsen/src/Expr/AssertionInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */






/**
 * ---------------------------
 * Assertion class
 * ---------------------------
 */				

const Assertion = class extends _AssertionInterface_js__WEBPACK_IMPORTED_MODULE_3__["default"] {

	/**
	 * @inheritdoc
	 */
	constructor(exprs, logic) {
		super();
		this.exprs = exprs;
		this.logic = logic;
	}
	 
	/**
	 * @inheritdoc
	 */
	 eval(context = null, trap = {}) {
		if (this.logic === '!') {
			return !Object(_web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.exprs).eval(context, trap);
		}
		var operators = Object(_web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Assertion.operators);
		var logic = (this.logic || '').trim().toUpperCase();
		var isOr = logic === (Assertion.operators.or || '').trim().toUpperCase();
		var isNor = logic === (Assertion.operators.nor || '').trim().toUpperCase();
		var isAnd = logic === (Assertion.operators.and || '').trim().toUpperCase();
		var isNand = logic === (Assertion.operators.nand || '').trim().toUpperCase();
		var lastResult = true, trues = 0;
		for(var i = 0; i < this.exprs.length; i ++) {
			lastResult = this.exprs[i].eval(context, trap);
			if (isAnd && !lastResult) {
				return false;
			}
			if (isNand && !lastResult) {
				return true;
			}
			if (isOr && lastResult) {
				return lastResult;
			}
			trues += lastResult ? 1 : 0;
		}
		if (isOr) {
			// Which is falsey,
			// by virtue of getting here
			return lastResult;
		}
		if (isAnd || isNand) {
			// For AND and NAND, all entries must be true by now,
			// by virtue of getting here.
			// For AND, this means true; for NAND, false
			return isAnd;
		}
		// For NOR, all entries need to be false
		return isNor && trues === 0;
	}
	
	/**
	 * @inheritdoc
	 */
	 toString(context = null) {
		if (this.logic === '!') {
			return '!' + Object(_web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.exprs).toString(context);
		}
		return this.exprs.map(expr => expr.toString(context)).join(' ' + this.logic + ' ');
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Assertion) {
		if (expr.startsWith('!')) {
			return new Static(
				[parseCallback(expr.substr(1))],
				'!'
			);
		}
		var parse = _Lexer_js__WEBPACK_IMPORTED_MODULE_4__["default"].lex(expr, Object(_web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Static.operators));
		if (parse.tokens.length > 1) {
			var logic = Object(_web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_2__["default"])(parse.matches);
			if (logic.length > 1) {
				throw new Error('"AND" and "OR" logic cannot be asserted in the same expression: ' + expr + '!');
			}
			return new Static(
				parse.tokens.map(expr => parseCallback(expr.trim())),
				Object(_web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_0__["default"])(logic)
			);
		}
	}
};

/**
 * @prop object
 */
Assertion.operators = {
	and: '&&',
	or: '||',
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Assertion);


/***/ }),

/***/ "../jsen/src/Expr/AssertionInterface.js":
/*!**********************************************!*\
  !*** ../jsen/src/Expr/AssertionInterface.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * AssertionInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'AssertionExpression'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Assignment.js":
/*!**************************************!*\
  !*** ../jsen/src/Expr/Assignment.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/last.js */ "../jsen/node_modules/@web-native-js/commons/arr/last.js");
/* harmony import */ var _web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/before.js */ "../jsen/node_modules/@web-native-js/commons/str/before.js");
/* harmony import */ var _web_native_js_commons_str_after_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/str/after.js */ "../jsen/node_modules/@web-native-js/commons/str/after.js");
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _AssignmentInterface_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AssignmentInterface.js */ "../jsen/src/Expr/AssignmentInterface.js");
/* harmony import */ var _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReferenceInterface.js */ "../jsen/src/Expr/ReferenceInterface.js");
/* harmony import */ var _Contexts_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Contexts.js */ "../jsen/src/Contexts.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */









/**
 * ---------------------------
 * Assignment class
 * ---------------------------
 */				

const Assignment = class extends _AssignmentInterface_js__WEBPACK_IMPORTED_MODULE_4__["default"] {

	/**
	 * @inheritdoc
	 */
	constructor(initKeyword, reference, val, operator = '=') {
		super();
		this.initKeyword = initKeyword;
		this.reference = reference;
		this.val = val;
		this.operator = operator;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		var reference = this.reference.getEval(context, trap);
		var val = this.val.eval(context, trap);
		if (!Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_3__["default"])(reference.context) && !Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_3__["default"])(reference.name)) {
			return _Contexts_js__WEBPACK_IMPORTED_MODULE_6__["default"].create(reference.context).set(reference.name, val, trap, this.initKeyword);
		}
		throw new Error('"' + this + '" is undefined!');
	}
	 
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return (this.initKeyword ? this.initKeyword + ' ' : '')
			+ [this.reference.toString(context), this.operator, this.val.toString(context)].join(' ');
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Assignment) {
		var parse = _Lexer_js__WEBPACK_IMPORTED_MODULE_7__["default"].lex(expr, Static.operators);
		if (parse.tokens.length === 2) {
			var initKeyword, reference = parse.tokens.shift().trim(), val = parse.tokens.shift().trim();
			if (['var', 'let', 'const'].includes(Object(_web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference, ' '))) {
				initKeyword = Object(_web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference, ' ');
				reference = Object(_web_native_js_commons_str_after_js__WEBPACK_IMPORTED_MODULE_2__["default"])(reference, ' ').trim();
			}
			if (!((reference = parseCallback(reference)) instanceof _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_5__["default"]) 
			|| !(val = parseCallback(val))) {
				throw new Error('Invalid assignment expression: ' + expr);
			}
			return new Static(initKeyword, reference, val, parse.matches[0].trim());
		}
	}
};	

/**
 * @prop array
 */
Assignment.operators = [' = '];

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Assignment);


/***/ }),

/***/ "../jsen/src/Expr/AssignmentInterface.js":
/*!***********************************************!*\
  !*** ../jsen/src/Expr/AssignmentInterface.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * AssignmentInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'AssignmentExpression'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Bool.js":
/*!********************************!*\
  !*** ../jsen/src/Expr/Bool.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");
/* harmony import */ var _BoolInterface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoolInterface.js */ "../jsen/src/Expr/BoolInterface.js");

/**
 * @imports
 */



/**
 * ---------------------------
 * Bool (boolean) class
 * ---------------------------
 */				

const Bool = class extends _BoolInterface_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(state) {
		super();
		this.state = state;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval() {
		return this.state.toLowerCase().trim() === 'true';
	}
	
	/**
	 * @inheritdoc
	 */
	toString() {
		return this.state;
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Bool) {
		var expr = expr.toLowerCase().trim();
		if (expr === 'true' || expr === 'false') {
			return new Static(expr);
		}
	}
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Bool);


/***/ }),

/***/ "../jsen/src/Expr/BoolInterface.js":
/*!*****************************************!*\
  !*** ../jsen/src/Expr/BoolInterface.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * BoolInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'BooleanType'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Call.js":
/*!********************************!*\
  !*** ../jsen/src/Expr/Call.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReferenceInterface.js */ "../jsen/src/Expr/ReferenceInterface.js");
/* harmony import */ var _CallInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CallInterface.js */ "../jsen/src/Expr/CallInterface.js");
/* harmony import */ var _Arguments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Arguments.js */ "../jsen/src/Expr/Arguments.js");
/* harmony import */ var _Contexts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Contexts.js */ "../jsen/src/Contexts.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */







/**
 * ---------------------------
 * Call class
 * ---------------------------
 */				

const Call = class extends _CallInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {

	/**
	 * @inheritdoc
	 */
	constructor(reference, args) {
		super();
		this.reference = reference;
		this.args = args;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		var reference = this.reference.getEval(context, trap);
		var args = this.args.eval(context, trap);
		if (!Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(reference.context) && !Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(reference.name)) {
			return _Contexts_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(reference.context).exec(reference.name, args, trap);
		}
		throw new Error('"' + this + '" is undefined!');
	}
	 
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return this.reference.toString(context) + this.args.toString(context);
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Call) {
		if (!expr.startsWith('(') && expr.endsWith(')') && !_Lexer_js__WEBPACK_IMPORTED_MODULE_5__["default"].match(expr, [' ']).length) {
			var tokens = _Lexer_js__WEBPACK_IMPORTED_MODULE_5__["default"].split(expr, []);
			var reference, args = tokens.pop();
			if (!((reference = parseCallback(tokens.join(''))) instanceof _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_1__["default"]) 
			|| !(args = parseCallback(args, [_Arguments_js__WEBPACK_IMPORTED_MODULE_3__["default"]]))) {
				throw new Error('Invalid call directive: ' + expr);
			}
			return new Static(reference, args);
		}
	}
};	

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Call);


/***/ }),

/***/ "../jsen/src/Expr/CallInterface.js":
/*!*****************************************!*\
  !*** ../jsen/src/Expr/CallInterface.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * CallInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'CallExpression'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Comparison.js":
/*!**************************************!*\
  !*** ../jsen/src/Expr/Comparison.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/flatten.js */ "../jsen/node_modules/@web-native-js/commons/arr/flatten.js");
/* harmony import */ var _web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/first.js */ "../jsen/node_modules/@web-native-js/commons/arr/first.js");
/* harmony import */ var _web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/last.js */ "../jsen/node_modules/@web-native-js/commons/arr/last.js");
/* harmony import */ var _web_native_js_commons_arr_difference_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/arr/difference.js */ "../jsen/node_modules/@web-native-js/commons/arr/difference.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @web-native-js/commons/js/isObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../jsen/node_modules/@web-native-js/commons/js/isString.js");
/* harmony import */ var _web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @web-native-js/commons/obj/each.js */ "../jsen/node_modules/@web-native-js/commons/obj/each.js");
/* harmony import */ var _ComparisonInterface_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ComparisonInterface.js */ "../jsen/src/Expr/ComparisonInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */











/**
 * ---------------------------
 * Comparison class
 * ---------------------------
 */				

const Comparison = class extends _ComparisonInterface_js__WEBPACK_IMPORTED_MODULE_8__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(operand1, operand2, operator) {
		super();
		this.operand1 = operand1;
		this.operand2 = operand2;
		this.operator = operator;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return Comparison.compare(
			this.operand1.eval(context, trap), 
			this.operand2.eval(context, trap), 
			this.operator
		);
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return [
			this.operand1.toString(context), 
			this.operator, 
			this.operand2.toString(context)
		].join(' ');
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Comparison) {
		var operators = Object(_web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Static.operators).map(oper => ' ' + oper + ' ');
		var parse = _Lexer_js__WEBPACK_IMPORTED_MODULE_9__["default"].lex(expr, operators);
		if (parse.tokens.length > 1) {
			if (parse.tokens.length > 2) {
				throw new Error('Malformed "Comparison" expression: ' + expr + '!');
			}
			return new Static(
				parseCallback(Object(_web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_1__["default"])(parse.tokens).trim()),
				parseCallback(Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_2__["default"])(parse.tokens).trim()),
				parse.matches[0].trim()
			);
		}
	}
	
	/**
	 * -------------------------------------------------------
	 */
	 
	/**
	 * Use the operator type to compare the two operands
	 *
	 * @param mixed		operand1		
	 * @param mixed		operand2		
	 * @param string 	operator		
	 *
	 * @return bool
	 */
	static compare(operand1, operand2, operator = '==') {
		if (Object(_web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Comparison.operators).indexOf(operator) === -1) {
			throw new Error('The operator "' + operator + '" is not recognized.');
		}
		switch(operator) {
			case '===':
				return operand1 === operand2;
			case '==':
			case '=':
				return operand1 == operand2;
			case '>':
				return operand1 > operand2;
			case '<':
				return operand1 < operand2;
			case '>=':
				return operand1 >= operand2;
			case '<=':
				return operand1 <= operand2;
			case '!=':
				return operand1 != operand2;
			case '!==':
				return operand1 !== operand2;
			case '^=':
				return Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_6__["default"])(operand1) && operand1.startsWith(operand2);
			case '$=':
				return Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_6__["default"])(operand1) && operand1.endsWith(operand2);
			case '*=':
				// Contains
				return Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(operand2) || Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_6__["default"])(operand2) ? operand1.indexOf(operand2) > -1 : false;
			case '~=':
				// Contains word
				return Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_6__["default"])(operand1) && Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_6__["default"])(operand2) && (' ' + operand1 + ' ').indexOf(' ' + operand2 + ' ') > -1;
			case '>=<': // Between
				 if (!(Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(operand2) && operand2.length === 2)) {
					 throw new Error('A \'Between\' comparison requires argument 2 to be an array of exactly 2 values.');
				 }
				 return operand1 >= operand2[0] && operand1 <= operand2[1];
	
			case '/**/': // Regex
				return operand2.match(new RegExp(operand1));
			default:
				return false;
		}
	}
	 
	/**
	 * Compares two operands for differences
	 *
	 * @param mixed		operand1		
	 * @param mixed		operand2		
	 * @param bool	 	strict		
	 *
	 * @return bool
	 */
	static diff(operand1, operand2, strict) {
		return !Comparison.compare(operand1, operand2, strict ? '===' : '==');
	}
};

/**
 * @prop object
 */
Comparison.operators = {
	exact: {
		is: '===',
		isNull: '===',
		equalsTo: '==',
		strictlyNotEqualsTo: '!==',
		notEqualsTo: '!=',
	},
	relative: {
		lesserThan: '<',
		greaterThan: '>',
		lesserThanOrEqualsTo: '<=',
		greaterThanOrEqualsTo: '>=',
		between: '>=<',
	},
	partial: {
		startsWith: '^=',
		endsWith: '$=',
		contains: '*=',
		any: '~=',
		in: '~=',
		matches: '/**/',
	},
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Comparison);


/***/ }),

/***/ "../jsen/src/Expr/ComparisonInterface.js":
/*!***********************************************!*\
  !*** ../jsen/src/Expr/ComparisonInterface.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * ComparisonInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'ComparisonExpression'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Condition.js":
/*!*************************************!*\
  !*** ../jsen/src/Expr/Condition.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");
/* harmony import */ var _ConditionInterface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConditionInterface.js */ "../jsen/src/Expr/ConditionInterface.js");

/**
 * @imports
 */



/**
 * ---------------------------
 * Condition class
 * ---------------------------
 */				

const Condition = class extends _ConditionInterface_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(assertion, onTrue, onFalse) {
		super();
		this.assertion = assertion;
		this.onTrue = onTrue;
		this.onFalse = onFalse;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return this.assertion.eval(context, trap) 
			? this.onTrue.eval(context, trap) 
			: this.onFalse.eval(context, trap);
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return [
			this.assertion.toString(context), 
			Condition.operators[0], 
			this.onTrue.toString(context),
			Condition.operators[1], 
			this.onFalse.toString(context)
		].join(' ');
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Condition) {
		var splits = _Lexer_js__WEBPACK_IMPORTED_MODULE_0__["default"].split(expr, Static.operators);
		if (splits.length > 1) {
			if (splits.length === 2) {
				throw new Error('Malformed ternary expression: ' + expr + '!');
			}
			return new Static(
				parseCallback(splits[0].trim()),
				parseCallback(splits[1].trim()),
				parseCallback(splits[2].trim())
			);
		}
	}
};

/**
 * @prop object
 */
Condition.operators = ['?', ':'];

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Condition);


/***/ }),

/***/ "../jsen/src/Expr/ConditionInterface.js":
/*!**********************************************!*\
  !*** ../jsen/src/Expr/ConditionInterface.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * ConditionInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'TernaryConditional'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Deletion.js":
/*!************************************!*\
  !*** ../jsen/src/Expr/Deletion.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/last.js */ "../jsen/node_modules/@web-native-js/commons/arr/last.js");
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReferenceInterface.js */ "../jsen/src/Expr/ReferenceInterface.js");
/* harmony import */ var _DeletionInterface_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeletionInterface.js */ "../jsen/src/Expr/DeletionInterface.js");
/* harmony import */ var _Contexts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Contexts.js */ "../jsen/src/Contexts.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */







/**
 * ---------------------------
 * Deletion class
 * ---------------------------
 */				

const Deletion = class extends _DeletionInterface_js__WEBPACK_IMPORTED_MODULE_3__["default"] {

	/**
	 * @inheritdoc
	 */
	constructor(reference, operator = 'delete') {
		super();
		this.reference = reference;
		this.operator = operator;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		var reference = this.reference.getEval(context, trap);
		if (!Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.context) && !Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.name)) {
			return _Contexts_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(reference.context).del(reference.name, trap);
		}
		throw new Error('"' + this + '" is undefined!');
	}
	 
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return this.operator + ' ' + this.reference.toString(context);
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Deletion) {
		var parse = _Lexer_js__WEBPACK_IMPORTED_MODULE_5__["default"].lex(expr, Object.values(Static.operators));
		if (parse.matches.length === 1 && expr.startsWith(parse.matches[0] + ' ')) {
			var reference;
			if (!((reference = parseCallback(parse.tokens.pop().trim())) instanceof _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"])) {
				throw new Error('Invalid delete directive: ' + expr);
			}
			return new Static(reference, parse.matches[0].trim());
		}
	}
};	

/**
 * @prop array
 */
Deletion.operators = {
	red: 'reduce', 
	del: 'delete',
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Deletion);


/***/ }),

/***/ "../jsen/src/Expr/DeletionInterface.js":
/*!*********************************************!*\
  !*** ../jsen/src/Expr/DeletionInterface.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * DeletionInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'DeleteExpression'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Func.js":
/*!********************************!*\
  !*** ../jsen/src/Expr/Func.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_obj_copy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/copy.js */ "../jsen/node_modules/@web-native-js/commons/obj/copy.js");
/* harmony import */ var _web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/obj/each.js */ "../jsen/node_modules/@web-native-js/commons/obj/each.js");
/* harmony import */ var _web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/flatten.js */ "../jsen/node_modules/@web-native-js/commons/arr/flatten.js");
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js");
/* harmony import */ var _FuncInterface_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FuncInterface.js */ "../jsen/src/Expr/FuncInterface.js");
/* harmony import */ var _Contexts_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Contexts.js */ "../jsen/src/Contexts.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");
/* harmony import */ var _Statements_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Statements.js */ "../jsen/src/Expr/Statements.js");

/**
 * @imports
 */










/**
 * ---------------------------
 * Func class
 * ---------------------------
 */				

const Func = class extends _FuncInterface_js__WEBPACK_IMPORTED_MODULE_5__["default"] {
	 
	/**
	 * @inheritdoc
	 */
	constructor(paramters, statements, arrowFunctionFormatting = {}) {
		super();
		this.paramters = paramters || {};
		this.statements = statements;
		this.arrowFunctionFormatting = arrowFunctionFormatting;
	}
	
	/**
	 * @inheritdoc
	 */
	inherit(Super) {
		if (Super instanceof _FuncInterface_js__WEBPACK_IMPORTED_MODULE_5__["default"]) {
			var parentParams = Object.keys(Super.paramters);
			var ownParams = Object.keys(this.paramters);
			for (var i = 0; i < Math.max(ownParams.length, parentParams.length); i ++) {
				var nameInParent = parentParams[i];
				var nameInSelf = ownParams[i];
				if (!nameInSelf && nameInParent) {
					throw new Error('Parameter #' + i + ' (' + nameInParent + ') in parent function must be implemented.');
				}
				if (nameInSelf && nameInParent) {
					var defaultValInParent = Super.paramters[nameInParent];
					var defaultValInSelf = this.paramters[nameInSelf];
					if (defaultValInSelf && !defaultValInParent) {
						throw new Error('Parameter #' + i + ' (' + nameInSelf + ') must not have a default value as established in parent function.');
					}
					if (defaultValInSelf && defaultValInParent && defaultValInSelf.jsenType !== defaultValInParent.jsenType) {
						throw new Error('Default value for parameter #' + i + ' (' + nameInSelf + ') must be of type ' + defaultValInParent.jsenType + ' as established in parent function.');
					}
				}
			}
			this.sup = Super;
		}
		return this;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return (...args) => {
			var newMainContext = {};
			Object(_web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.keys(this.paramters), (i, name) => {
				var defaultVal = this.paramters[name];
				if (args.length - 1 < i && !defaultVal) {
					throw new Error('The parameter "' + name + '" is required.');
				}
				newMainContext[name] = args.length > i 
					? args[i] 
					: (this.paramters[name] 
						? this.paramters[name].eval(context, trap) 
						: null);
			});
			// But this newer context should come first
			var nestedContext = new _Contexts_js__WEBPACK_IMPORTED_MODULE_6__["default"](newMainContext, context);
			return this.statements.eval(nestedContext, trap);
		};
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		var paramters = [];
		Object(_web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.paramters, (name, value) => {
			paramters.push(name + (value ? '=' + value.toString(context) : ''));
		});
		if (this.arrowFunctionFormatting) {
			var headNoWrap = this.arrowFunctionFormatting.head === false || (paramters.length === 1 && paramters[0].indexOf('=') === -1);
			var bodyNoWrap = this.arrowFunctionFormatting.body === false
			return (headNoWrap ? paramters[0] : '(' + paramters.join(', ') + ')')
			+ ' => ' + (bodyNoWrap ? this.statements.toString(context) : '{' + this.statements.toString(context) + '}');
		}
		return 'function (' + paramters.join(', ') + ') {' + this.statements.toString(context) + '}';
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Func) {
		expr = expr.trim();
		var splits;
		if (expr.startsWith('function') 
		&& (splits = _Lexer_js__WEBPACK_IMPORTED_MODULE_7__["default"].split(expr, []).slice(1).filter(b => b.trim())) && splits.length === 2) {
			var arrowFunctionFormatting = false;
			var funcHead = Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_4__["default"])(splits.shift().trim(), '(', ')');
			var funcBody = Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_4__["default"])(splits.shift().trim(), '{', '}');
		} else if (!expr.startsWith('function') 
		&& (splits = _Lexer_js__WEBPACK_IMPORTED_MODULE_7__["default"].split(expr, ['=>'])) && splits.length === 2) {
			var funcHead = splits.shift().trim();
			var funcBody = splits.shift().trim();
			var arrowFunctionFormatting = {};
			if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_3__["default"])(funcHead, '(', ')')) {
				funcHead = Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_4__["default"])(funcHead, '(', ')');
			} else {
				arrowFunctionFormatting.head = false;
			}
			if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_3__["default"])(funcBody, '{', '}')) {
				funcBody = Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_4__["default"])(funcBody, '{', '}');
			} else {
				arrowFunctionFormatting.body = false;
			}
		} else {
			return;
		}
		var paramters = {};
		_Lexer_js__WEBPACK_IMPORTED_MODULE_7__["default"].split(funcHead, [',']).forEach(param => {
			var paramSplit = param.split('=');
			if (paramSplit[1]) {
				paramters[paramSplit[0].trim()] = parseCallback(paramSplit[1].trim());
			} else {
				paramters[param.trim()] = null;
			}
		});
		var statements = parseCallback(funcBody, [_Statements_js__WEBPACK_IMPORTED_MODULE_8__["default"]], {assert:false}) || parseCallback(funcBody);
		return new Static(paramters, statements, arrowFunctionFormatting);
	}
};

/**
 * @prop object
 */
Func.operators = ['=>',];

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Func);

/***/ }),

/***/ "../jsen/src/Expr/FuncInterface.js":
/*!*****************************************!*\
  !*** ../jsen/src/Expr/FuncInterface.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * FuncInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'FunctionType'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/If.js":
/*!******************************!*\
  !*** ../jsen/src/Expr/If.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");
/* harmony import */ var _IfInterface_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IfInterface.js */ "../jsen/src/Expr/IfInterface.js");
/* harmony import */ var _Statements_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Statements.js */ "../jsen/src/Expr/Statements.js");

/**
 * @imports
 */






/**
 * ---------------------------
 * Condition class
 * ---------------------------
 */				

const If = class extends _IfInterface_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(assertion, onTrue, onFalse, params = {}) {
		super();
		this.assertion = assertion;
		this.onTrue = onTrue;
		this.onFalse = onFalse;
		this.params = params;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return this.assertion.eval(context, trap) 
			? (this.onTrue ? this.onTrue.eval(context, trap) : undefined)
			: (this.onFalse ? this.onFalse.eval(context, trap) : undefined);
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
        var onTrue = this.params.onTrueIsBlock 
            ? '{' + this.onTrue.toString(context) + '}' 
            : (this.onTrue ? this.onTrue.toString(context) : '');
        var onFalse = this.params.onFalseIsBlock 
            ? '{' + this.onFalse.toString(context) + '}' 
            : (this.onFalse ? this.onFalse.toString(context) : '');
		return 'if (' + this.assertion.toString(context) + ')' + onTrue + (onFalse ? ' else ' + onFalse : '');
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = If) {
        expr = expr.trim();
        var splits;
        if (expr.startsWith('if') 
		&& (splits = _Lexer_js__WEBPACK_IMPORTED_MODULE_2__["default"].split(expr, [], {limit:2}/*IMPORTANT*/).slice(1).filter(b => b.trim())) && splits.length === 2) {
            var assertion = parseCallback(Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(splits.shift().trim(), '(', ')').trim());
            var rest = _Lexer_js__WEBPACK_IMPORTED_MODULE_2__["default"].split(splits.shift().trim(), ['else'], {limit:1}/*IMPORTANT*/);
            var onTrue = rest.shift().trim(), onTrueIsBlock, onFalse = (rest.shift() || '').trim(), onFalseIsBlock;
            if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(onTrue, '{', '}')) {
                // The braces gives us the onTrue block
                onTrueIsBlock = true;
                onTrue = Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(onTrue, '{', '}').trim();
                onTrue = parseCallback(onTrue, [_Statements_js__WEBPACK_IMPORTED_MODULE_4__["default"]], {assert:false}) || parseCallback(onTrue);
            } else {
                onTrue = parseCallback(onTrue);
            }
            if (onFalse) {
                if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(onFalse, '{', '}')) {
                    // The braces gives us the onTrue block
                    onFalseIsBlock = true;
                    onFalse = Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(onFalse, '{', '}').trim();
                    onFalse = parseCallback(onFalse, [_Statements_js__WEBPACK_IMPORTED_MODULE_4__["default"]], {assert:false}) || parseCallback(onFalse);
            } else {
                    onFalse = parseCallback(onFalse);
                }
            }
			return new Static(assertion, onTrue, onFalse, {onTrueIsBlock, onFalseIsBlock});
         }
	}
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (If);


/***/ }),

/***/ "../jsen/src/Expr/IfInterface.js":
/*!***************************************!*\
  !*** ../jsen/src/Expr/IfInterface.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * IfInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'IfConditional'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Math.js":
/*!********************************!*\
  !*** ../jsen/src/Expr/Math.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isNumeric.js */ "../jsen/node_modules/@web-native-js/commons/js/isNumeric.js");
/* harmony import */ var _web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/flatten.js */ "../jsen/node_modules/@web-native-js/commons/arr/flatten.js");
/* harmony import */ var _web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/intersect.js */ "../jsen/node_modules/@web-native-js/commons/arr/intersect.js");
/* harmony import */ var _web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/arr/unique.js */ "../jsen/node_modules/@web-native-js/commons/arr/unique.js");
/* harmony import */ var _MathInterface_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MathInterface.js */ "../jsen/src/Expr/MathInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */







/**
 * ---------------------------
 * Math class
 * ---------------------------
 */				

const Math = class extends _MathInterface_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(val, exprs) {
		super();
		this.val = val;
		this.exprs = exprs;
	}
	
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return this.exprs.reduce((currentTotal, expr) => {
			var val = expr.val.eval(context, trap);
			var operator = expr.operator.trim();
			if ((!Object(_web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_0__["default"])(currentTotal) || !Object(_web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val)) && operator !== '+') {
				throw new Error('Invalid Math expression: ' + this.toString() + '!');
			}
			switch(operator) {
				case '+':
					return currentTotal + val;
				case '-':
					return currentTotal - val;
				case '*':
					return currentTotal * val;
				case '/':
					return currentTotal / val;
			}
		}, this.val.eval(context, trap));
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return [this.val.toString(context)].concat(
			this.exprs.map(expr => expr.operator + ' ' + expr.val.toString(context))
		).join(' ');
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Math) {
		var parse = _Lexer_js__WEBPACK_IMPORTED_MODULE_5__["default"].lex(expr, Object(_web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Static.operators));
		if (parse.tokens.length > 1 && parse.matches.length === parse.tokens.length - 1) {
			var operators = Object(_web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_3__["default"])(parse.matches);
			if (Object(_web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(operators, Math.operators.sup).length && Object(_web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(operators, Math.operators.sub).length) {
				throw new Error('"Addition/subtraction" and "multiplication/division" operators cannot be used in the same expression: ' + expr + '!');
			}
			return new Static(
				parseCallback(parse.tokens.shift().trim()),
				parse.tokens.map((expr, i) => {return {
					operator: parse.matches[i],
					val: parseCallback(expr.trim())
				};})
			);
		}
	}
};

/**
 * @prop object
 */
Math.operators = {
	sup: ['*', '/'],
	sub: [' + ', ' - '],
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Math);


/***/ }),

/***/ "../jsen/src/Expr/MathInterface.js":
/*!*****************************************!*\
  !*** ../jsen/src/Expr/MathInterface.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * MathInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'MathExpression'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Num.js":
/*!*******************************!*\
  !*** ../jsen/src/Expr/Num.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isNumeric.js */ "../jsen/node_modules/@web-native-js/commons/js/isNumeric.js");
/* harmony import */ var _NumInterface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NumInterface.js */ "../jsen/src/Expr/NumInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */




/**
 * ---------------------------
 * Num (number) class
 * ---------------------------
 */				

const Num = class extends _NumInterface_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(int, dec = 0) {
		super();
		this.int = int;
		this.dec = dec;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval() {
		return parseFloat(this.int + (this.dec ? '.' + this.dec : null));
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return this.int + (this.dec ? '.' + this.dec : null);
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Num) {
		if (Object(_web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_0__["default"])(expr)) {
			var expr = expr.split('.');
			return new Static(
				parseInt(expr.shift()),
				parseInt(expr.shift())
			);
		}
	}
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Num);


/***/ }),

/***/ "../jsen/src/Expr/NumInterface.js":
/*!****************************************!*\
  !*** ../jsen/src/Expr/NumInterface.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * NumInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'NumberType'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Obj.js":
/*!*******************************!*\
  !*** ../jsen/src/Expr/Obj.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js");
/* harmony import */ var _web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/first.js */ "../jsen/node_modules/@web-native-js/commons/arr/first.js");
/* harmony import */ var _web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/arr/last.js */ "../jsen/node_modules/@web-native-js/commons/arr/last.js");
/* harmony import */ var _web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/obj/each.js */ "../jsen/node_modules/@web-native-js/commons/obj/each.js");
/* harmony import */ var _ObjInterface_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ObjInterface.js */ "../jsen/src/Expr/ObjInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */








/**
 * ---------------------------
 * Object utils
 * ---------------------------
 */				

const Obj = class extends _ObjInterface_js__WEBPACK_IMPORTED_MODULE_5__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(entries) {
		super();
		this.entries = entries || {};
	}
	
	/**
	 * @inheritdoc
	 */
	inherit(Super) {
		if (Super instanceof _ObjInterface_js__WEBPACK_IMPORTED_MODULE_5__["default"]) {
			Object(_web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_4__["default"])(Super.entries, (name, val) => {
				if (!(name in this.entries)) {
					this.entries[name] = val;
				}
			});
		}
		return this;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		var items = {};
		Object(_web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.entries, (key, expr) => {
			items[key] = expr.eval(context, trap);
		});
		return items;
	}
	 
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		var str = [];
		Object(_web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.entries, (key, expr) => {
			str.push(key + Obj.operators.sub + expr.toString(context));
		});
		return '{' + str.join(Obj.operators.sup) + '}';
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Obj) {
		if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(expr, '{', '}') && !_Lexer_js__WEBPACK_IMPORTED_MODULE_6__["default"].match(expr.trim(), [' ']).length) {
			var entries = {};
			var _entriesSplit = _Lexer_js__WEBPACK_IMPORTED_MODULE_6__["default"].split(Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(expr, '{', '}'), [Obj.operators.sup])
				.map(n => n.trim()).filter(n => n);
			Object(_web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_entriesSplit, (key, expr) => {
				var entry = _Lexer_js__WEBPACK_IMPORTED_MODULE_6__["default"].split(expr, [Obj.operators.sub], {limit:1}/*IMPORTANT*/);
				entries[Object(_web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_2__["default"])(entry).trim()] = parseCallback(Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_3__["default"])(entry).trim());
			});
			return new Static(entries);
		}
	}
};

/**
 * @prop object
 */
Obj.operators = {
	sup: ',',
	sub: ':',
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Obj);


/***/ }),

/***/ "../jsen/src/Expr/ObjInterface.js":
/*!****************************************!*\
  !*** ../jsen/src/Expr/ObjInterface.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * ObjInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'ObjectType'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Presence.js":
/*!************************************!*\
  !*** ../jsen/src/Expr/Presence.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/last.js */ "../jsen/node_modules/@web-native-js/commons/arr/last.js");
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _PresenceInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PresenceInterface.js */ "../jsen/src/Expr/PresenceInterface.js");
/* harmony import */ var _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReferenceInterface.js */ "../jsen/src/Expr/ReferenceInterface.js");
/* harmony import */ var _Contexts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Contexts.js */ "../jsen/src/Contexts.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */







/**
 * ---------------------------
 * Presence class
 * ---------------------------
 */				

const Presence = class extends _PresenceInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {

	/**
	 * @inheritdoc
	 */
	constructor(prop, reference, operator = 'in') {
		super();
		this.prop = prop;
		this.reference = reference;
		this.operator = operator;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		var reference = this.reference.getEval(context, trap);
		var prop = this.prop.eval(context, trap);
		if (!Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.context) && !Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.name)) {
			return _Contexts_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(reference.context).has(reference.name, prop, trap);
		}
		throw new Error('"' + this + '" is undefined!');
	}
	 
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return [this.prop.toString(context), this.operator, this.reference.toString(context)].join(' ');
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Presence) {
		var parse = _Lexer_js__WEBPACK_IMPORTED_MODULE_5__["default"].lex(expr, Static.operators);
		if (parse.tokens.length === 2) {
			var prop, reference;
			if (!(prop = parseCallback(parse.tokens.shift().trim()))
			|| !((reference = parseCallback(parse.tokens.shift().trim())) instanceof _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
				throw new Error('Invalid presence check expression: ' + expr);
			}
			return new Static(prop, reference, parse.matches[0].trim());
		}
	}
};	

/**
 * @prop array
 */
Presence.operators = [' in '];

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Presence);


/***/ }),

/***/ "../jsen/src/Expr/PresenceInterface.js":
/*!*********************************************!*\
  !*** ../jsen/src/Expr/PresenceInterface.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * PresenceInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'PresenceOperator'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Reference.js":
/*!*************************************!*\
  !*** ../jsen/src/Expr/Reference.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js");
/* harmony import */ var _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReferenceInterface.js */ "../jsen/src/Expr/ReferenceInterface.js");
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");
/* harmony import */ var _Contexts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Contexts.js */ "../jsen/src/Contexts.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */








/**
 * ---------------------------
 * Reference class
 * ---------------------------
 */				

const Reference = class extends _ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_3__["default"] {

	/**
	 * @inheritdoc
	 */
	constructor(context, name, backticks = false) {
		super();
		this.context = context;
		this.name = name;
		this.backticks = backticks;
	}
	 
	/**
	 * @inheritdoc
	 */
	getEval(context = null, trap = {}) {
		var sourceContext = context, name = this.name;
		if (this.context) {
			if (name instanceof _ExprInterface_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
				name = name.eval(context, trap);
			}
			sourceContext = this.context.eval(context, trap);
		}
		return {context:sourceContext, name:name,};
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		var parts = this.getEval(context, trap);
		if (!Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(parts.context) && !Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(parts.name)) {
			return _Contexts_js__WEBPACK_IMPORTED_MODULE_5__["default"].create(parts.context).get(parts.name, trap);
		}
	}
	 
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		var name = this.name;
		if (this.context) {
			var subjectContext = this.context.toString(context);
			if (name instanceof _ExprInterface_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
				name = '[' + name.toString(context) + ']';
			} else if (this.backticks) {
				name = '`' + name + '`';
			}
		} else {
			var subjectContext = context;
			if (this.backticks) {
				name = '`' + name + '`';
			}
		}
		return (subjectContext || '') + (subjectContext && !name.startsWith('[') ? Reference.separator : '') + name;
	}
	
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Reference) {
		if (!_Lexer_js__WEBPACK_IMPORTED_MODULE_6__["default"].match(expr.trim(), [' ']).length) {
			var splits = _Lexer_js__WEBPACK_IMPORTED_MODULE_6__["default"].split(expr, []);
			// ------------------------
			// name, first
			// ------------------------
			var context, name = splits.pop(), backticks;
			var nameSplit = _Lexer_js__WEBPACK_IMPORTED_MODULE_6__["default"].split(name.trim(), [Static.separator], {preserveDelims:true});
			if (nameSplit.length > 1) {
				name = nameSplit.pop().substr(1);
				splits = splits.concat(nameSplit);
			}
			if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_1__["default"])(name, '`', '`')) {
				name = Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(name, '`', '`');
				backticks = true;
			}
			// ------------------------
			// context, second
			// ------------------------
			if (splits.length) {
				context = parseCallback(splits.join(''));
				context.isContext = true;
			}
			if (Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_1__["default"])(name, '[', ']')) {
				if (!context) {
					throw new Error('Invalid reference: ' + expr + '!');
				}
				name = parseCallback(Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(name, '[', ']'));
			}
			return new Static(context, name, backticks);
		}
	}
};

/**
 * @prop string
 */
Reference.separator = '.';

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Reference);


/***/ }),

/***/ "../jsen/src/Expr/ReferenceInterface.js":
/*!**********************************************!*\
  !*** ../jsen/src/Expr/ReferenceInterface.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * ReferenceInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'Reference'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Return.js":
/*!**********************************!*\
  !*** ../jsen/src/Expr/Return.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");
/* harmony import */ var _ReturnInterface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReturnInterface.js */ "../jsen/src/Expr/ReturnInterface.js");

/**
 * @imports
 */



/**
 * ---------------------------
 * Ret (return) class
 * ---------------------------
 */				

const Return = class extends _ReturnInterface_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(expr) {
		super();
		this.expr = expr;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		return this.expr ? this.expr.eval(context, trap) : undefined;
	}
	
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return this.expr ? 'return ' + this.expr.toString(context) : 'return';
	}
	
	/**
	 * -------------------------------------------------------
	 */
	 
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Return) {
		var exprLc = expr.toLowerCase();
		if (exprLc.startsWith('return ') || exprLc === 'return') {
			return new Static(
				parseCallback(expr.substr(6).trim())
			);
		}
	}
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Return);


/***/ }),

/***/ "../jsen/src/Expr/ReturnInterface.js":
/*!*******************************************!*\
  !*** ../jsen/src/Expr/ReturnInterface.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * ReturnInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'ReturnDirective'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Statements.js":
/*!**************************************!*\
  !*** ../jsen/src/Expr/Statements.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/flatten.js */ "../jsen/node_modules/@web-native-js/commons/arr/flatten.js");
/* harmony import */ var _StatementsInterface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatementsInterface.js */ "../jsen/src/Expr/StatementsInterface.js");
/* harmony import */ var _ReturnInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReturnInterface.js */ "../jsen/src/Expr/ReturnInterface.js");
/* harmony import */ var _Contexts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Contexts.js */ "../jsen/src/Contexts.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");

/**
 * @imports
 */






/**
 * ---------------------------
 * Statements class
 * ---------------------------
 */				

const Statements = class extends _StatementsInterface_js__WEBPACK_IMPORTED_MODULE_1__["default"] {

	/**
	 * @inheritdoc
	 */
	constructor(stmts, delim) {
		super();
		this.stmts = stmts || [];
		this.delim = delim;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval(context = null, trap = {}) {
		context = _Contexts_js__WEBPACK_IMPORTED_MODULE_3__["default"].create(context);
		var stmts = [];
		for (var i = 0; i < this.stmts.length; i ++) {
			if (this.stmts[i] instanceof _ReturnInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
				return this.stmts[i].eval(context, trap);
			} else {
				stmts[i] = this.stmts[i].eval(context, trap);
			}
		}
		return stmts;
	}
	 
	/**
	 * @inheritdoc
	 */
	toString(context = null) {
		return this.stmts.map(stmt => stmt.toString(context)).join(this.delim);
	}
	 
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Statements) {
		var parse = _Lexer_js__WEBPACK_IMPORTED_MODULE_4__["default"].lex(expr, Object(_web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Static.operators).concat([(a, b) => {
			// Cases of code blocks that won't end in ";"
			if (a.endsWith('}') && !b.trim().startsWith('else')) {
				return '';
			}
			return false;
		}]));
		if (parse.matches.length) {
			return new Static(
				parse.tokens.map(stmt => parseCallback(stmt.trim())).filter(a => a),
				parse.matches[0].trim()
			);
		}
	}
};

/**
 * @prop array
 */
Statements.operators = [
	';',
	"\r\n",
];

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Statements);


/***/ }),

/***/ "../jsen/src/Expr/StatementsInterface.js":
/*!***********************************************!*\
  !*** ../jsen/src/Expr/StatementsInterface.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * StatementsInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'Statements'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/Expr/Str.js":
/*!*******************************!*\
  !*** ../jsen/src/Expr/Str.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../jsen/node_modules/@web-native-js/commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../jsen/node_modules/@web-native-js/commons/str/unwrap.js");
/* harmony import */ var _StrInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StrInterface.js */ "../jsen/src/Expr/StrInterface.js");
/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Lexer.js */ "../jsen/src/Lexer.js");
/* harmony import */ var _Bool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Bool.js */ "../jsen/src/Expr/Bool.js");

/**
 * @imports
 */






/**
 * ---------------------------
 * String utils
 * ---------------------------
 */

const Str = class extends _StrInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	
	/**
	 * @inheritdoc
	 */
	constructor(expr, quote) {
		super();
		this.expr = expr;
		this.quote = quote;
	}
	 
	/**
	 * @inheritdoc
	 */
	eval() {
		return this.expr;
	}
	
	/**
	 * @inheritdoc
	 */
	toString() {
		return this.quote + this.expr + this.quote;
	}
	 
	/**
	 * @inheritdoc
	 */
	static parse(expr, parseCallback, Static = Str) {
		expr = expr.trim();
		if ((Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(expr, '"', '"') || Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(expr, "'", "'")) 
		&& !_Lexer_js__WEBPACK_IMPORTED_MODULE_3__["default"].match(expr, [' ']).length) {
			var quote = Object(_web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_0__["default"])(expr, '"', '"') ? '"' : "'";
			return new Static(
				Object(_web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(expr, quote, quote),
				quote
			);
		}
	}
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Str);


/***/ }),

/***/ "../jsen/src/Expr/StrInterface.js":
/*!****************************************!*\
  !*** ../jsen/src/Expr/StrInterface.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExprInterface.js */ "../jsen/src/ExprInterface.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * StrInterface
 * ---------------------------
 */				

const Interface = class extends _ExprInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {};
Object.defineProperty(Interface.prototype, 'jsenType', {
	get() { return 'StringType'; },
});
/* harmony default export */ __webpack_exports__["default"] = (Interface);


/***/ }),

/***/ "../jsen/src/ExprInterface.js":
/*!************************************!*\
  !*** ../jsen/src/ExprInterface.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isObject.js */ "../jsen/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/obj/even.js */ "../jsen/node_modules/@web-native-js/commons/obj/even.js");

/**
 * @imports
 */



/**
 * ---------------------------
 * ExprInterface
 * ---------------------------
 */				

/* harmony default export */ __webpack_exports__["default"] = (class {
	
	/**
	 * Compares the current instance with another object.
	 *
	 * @param object Expr
	 *
	 * @return bool
	 */
	even(Expr) {
		if (Object(_web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Expr) && Expr.jsenType === this.jsenType) {
			return Object(_web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Expr, this);
		}
		return false;
	}
	
	/**
	 * Inherits properties from a super Expr.
	 *
	 * @param ExprInterface Super
	 *
	 * @return this
	 */
	inherit(Super) {
		return this;
	}
	
	/**
	 * Adds comments to the instance.
	 *
	 * @param string	 comments
	 *
	 * @return this
	 */
	withComments(comments) {
		if (!this.meta) {
			this.meta = {};
		}
		this.meta.comments = comments;
		return this;
	}
	
	/**
	 * Adds variables to the instance.
	 *
	 * @param array		 vars
	 *
	 * @return this
	 */
	withVars(vars) {
		if (!this.meta) {
			this.meta = {};
		}
		this.meta.vars = vars;
		return this;
	}
	
	/**
	 * Evaluates the expression instance for a result,
	 * optionally in the context of an object.
	 *
	 * @param object context
	 *
	 * @return mixed
	 */
	//eval(context = null, trap = {})
	
	/**
	 * Serializes the expression instance back to a string,
	 * optionally in the context of an object.
	 *
	 * @param object context
	 *
	 * @return string
	 */
	//toString(context = null)
	
	/**
	 * SAttempts to parse a string into the class instance.
	 *
	 * @param string expr
	 * @param object params
	 *
	 * @return ExprInterface
	 */
	//static parse(expr, params = {})
});;


/***/ }),

/***/ "../jsen/src/Jsen.js":
/*!***************************!*\
  !*** ../jsen/src/Jsen.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/merge.js */ "../jsen/node_modules/@web-native-js/commons/obj/merge.js");
/* harmony import */ var _web_native_js_commons_arr_remove_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/remove.js */ "../jsen/node_modules/@web-native-js/commons/arr/remove.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../jsen/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _web_native_js_commons_js_instanceof_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/instanceof.js */ "../jsen/node_modules/@web-native-js/commons/js/instanceof.js");
/* harmony import */ var _Expr_ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Expr/ReferenceInterface.js */ "../jsen/src/Expr/ReferenceInterface.js");
/* harmony import */ var _Expr_CallInterface_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Expr/CallInterface.js */ "../jsen/src/Expr/CallInterface.js");
/* harmony import */ var _Expr_FuncInterface_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Expr/FuncInterface.js */ "../jsen/src/Expr/FuncInterface.js");

/**
 * @imports
 */








/**
 * ---------------------------
 * Jsen (base) class
 * ---------------------------
 */				

const Jsen = class {
	 
	/**
	 * @inheritdoc
	 */
	static parse(expr, Parsers, params = {}, Static = Jsen) {
		if (!params.meta) {
			params.meta = {vars: [], _vars: []};
		}
		if (expr.length) {
			var parsers = Object.values(Parsers || Static.grammars);
			for (var i = 0; i < parsers.length; i ++) {
				// From this point forward, all vars is within current scope
				var varsScope = params.meta && Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(params.meta.vars) ? params.meta.vars.length : 0;
				var parsed = parsers[i].parse(expr, (_expr, _Parsers, _params = {}) => Jsen.parse(_expr, _Parsers, _params ? Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, _params) : params, Static));
				// Add/remove vars to scope
				if (parsed) {
					if (!parsed.meta) {
						parsed.meta = {};
					}
					// Reap vars into scope expr
					if (Object(_web_native_js_commons_js_instanceof_js__WEBPACK_IMPORTED_MODULE_3__["default"])(parsed, _Expr_FuncInterface_js__WEBPACK_IMPORTED_MODULE_6__["default"])) {
						var secondLevelVars = params.meta.vars.splice(varsScope);
						params.meta._vars = params.meta._vars.concat(secondLevelVars);
						parsed.meta._vars = secondLevelVars;
					} else {
						parsed.meta.vars = params.meta.vars.slice(varsScope);
					}
					// Add vars to scope
					if (Object(_web_native_js_commons_js_instanceof_js__WEBPACK_IMPORTED_MODULE_3__["default"])(parsed, _Expr_ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_4__["default"]) || Object(_web_native_js_commons_js_instanceof_js__WEBPACK_IMPORTED_MODULE_3__["default"])(parsed, _Expr_CallInterface_js__WEBPACK_IMPORTED_MODULE_5__["default"])) {
						Object(_web_native_js_commons_arr_remove_js__WEBPACK_IMPORTED_MODULE_1__["default"])(parsed.meta.vars, parsed.context);
						Object(_web_native_js_commons_arr_remove_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.meta.vars, parsed.context);
						params.meta.vars.push(parsed);
					} 
				}
				if (parsed && Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(params.explain)) {
					params.explain.push(expr + ' >>------------->> ' + parsed.jsenType);
				}
				if (parsed) {
					return parsed;
				}
			}
			if (params.assert === false) {
				return;
			}
			throw new Error('[Syntax error:] ' + expr);
		}
	}
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Jsen);


/***/ }),

/***/ "../jsen/src/Lexer.js":
/*!****************************!*\
  !*** ../jsen/src/Lexer.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../jsen/node_modules/@web-native-js/commons/js/isString.js");
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../jsen/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../jsen/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../jsen/node_modules/@web-native-js/commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/arr/flatten.js */ "../jsen/node_modules/@web-native-js/commons/arr/flatten.js");
/* harmony import */ var _web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @web-native-js/commons/arr/first.js */ "../jsen/node_modules/@web-native-js/commons/arr/first.js");
/* harmony import */ var _web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web-native-js/commons/arr/last.js */ "../jsen/node_modules/@web-native-js/commons/arr/last.js");
/* harmony import */ var _web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @web-native-js/commons/obj/merge.js */ "../jsen/node_modules/@web-native-js/commons/obj/merge.js");
/* harmony import */ var _web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @web-native-js/commons/obj/even.js */ "../jsen/node_modules/@web-native-js/commons/obj/even.js");
/* harmony import */ var _web_native_js_commons_obj_copyPlain_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @web-native-js/commons/obj/copyPlain.js */ "../jsen/node_modules/@web-native-js/commons/obj/copyPlain.js");

/**
 * @imports
 */











/**
 * --------------------------
 * TOKENIZER
 * --------------------------
 */

const Lexer = class {

	/**
	 * Factory method.
	 *
	 * Handles caching.
	 *
	 * @see constructor()
	 */
	static lex(str, delims, options = {}) {
		if (!Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(str)) {
			throw new Error('Argument1 must be a string!');
		}
		var copyResult = result => {
			return {
				delims: result.delims.slice(),
				options: Object(_web_native_js_commons_obj_copyPlain_js__WEBPACK_IMPORTED_MODULE_9__["default"])(result.options),
				nesting: result.nesting.slice(),
				maxDepth: result.maxDepth,
				comments: result.comments.slice(),
				tokens: result.tokens.slice(),
				matches: result.matches.slice(),
				matchesi: Object(_web_native_js_commons_obj_copyPlain_js__WEBPACK_IMPORTED_MODULE_9__["default"])(result.matchesi),
			};
		};
		// ASK CACHE ---------------------------
		if (Lexer.$cache[str] && options.cache !== false) {
			for (var i = 0; i < Lexer.$cache[str].length; i ++) {
				var cached = Lexer.$cache[str][i];
				if (Object(_web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_8__["default"])(cached.delims, delims)) {
					return copyResult(cached);
				}
			}
		}
		// FRESH PARSE	 -------------------------------
		var instance = new Lexer(str, options);
		var result = instance.lex(delims);
		// SAVE TO CACHE -------------------------------
		if (options.cache !== false) {
			Lexer.$cache[str] = Lexer.$cache[str] || [];
			Lexer.$cache[str].push(result);
		}
		return copyResult(result);
		
	}

	/**
	 * Factory method for .split().
	 *
	 * Handles caching.
	 *
	 * @see constructor()
	 */
	static split(str, delims, options) {
		return Lexer.lex(str, delims, options).tokens;
	}

	/**
	 * Factory method for .match().
	 *
	 * Handles caching.
	 *
	 * @see constructor()
	 */
	static match(str, delims, options) {
		return Lexer.lex(str, delims, options).matches;
	}

	/**
	 * Creates a lexer instance on a string with the given options.
	 *
	 * @param string 	str
	 * @param object	options:
	 * @param string 		blocks				The strings that begin and end a nested structure
	 * @param number 		limit				Max results to return
	 * @param string 		backreference		A character like (\) that prefixes non-delim characters
	 *
	 * @return array
	 */
	constructor(str, options) {
		if (!Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(str)) {
			throw new Error('Lexer requires the first argument to be a string.');
		}
		this.$str = str;
		this.$options = options || {};
		if (!this.$options.blocks) {
			this.$options.blocks = Lexer.$blocks;
		}
		if (!this.$options.quotes) {
			this.$options.quotes = Lexer.$quotes;
		}
		if (!this.$options.comments) {
			this.$options.comments = Lexer.$comments;
		}
	}

	/**
	 * Parses the instance string on the given delimeters.
	 *
	 * This method supports static calling,
	 * in which case a string is required as the first argument.
	 *
	 * @param string 	str
	 * @param object	options
	 *
	 * @return object
	 */
	lex(delims, options) {
		var runtime = {
			delims: Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_3__["default"])(delims),
			options: Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_7__["default"])(true, {}, this.$options, options || {}),
			nesting: [],
			maxDepth: 0,
			comments: [],
			tokens: [],
			matches: [],
			matchesi: {},
		};
		// Iterate over each character, keep track of current row and column (of the returned array)
		this._evalCharsAt(runtime, 0);
		if (runtime.nesting.length) {
			throw new Error('Error parsing the string: ' + this.$str + '. Unterminated blocks: ' + Object(_web_native_js_commons_arr_flatten_js__WEBPACK_IMPORTED_MODULE_4__["default"])(runtime.nesting).join(', ') + '');
		}
		// RETURN NEW ----------------------------------
		return runtime;
	}

	/**
	 * Expr helper: evaluates and handles the character on the current cursor.
	 * Advances the cursor.
	 *
	 * @param object 	runtime
	 * @param int		i
	 *
	 * @return void
	 */
	_evalCharsAt(runtime, i) {
		if (i >= this.$str.length) {
			return;
		}
		var charWidth = 1;
		var commentTest = {}, quoteTest = {}, nestingTest = {};
		// Quotes inside comments must be ignored
		if (!runtime.openComment) {
			quoteTest = this._testQuotes(runtime, i);
		}
		// Comments inside quotes must be ignored
		if (!runtime.openQuote) {
			commentTest = this._testComments(runtime, i);
		}
		// Save comments
		if (runtime.openComment || commentTest.ending) {
			// Save only outer comments
			if (!runtime.nesting.length && !nestingTest.ending) {
				var chars = commentTest.starting || commentTest.ending || this.$str[i];
				charWidth = chars.length;
				this._push(runtime, chars, 'comments', commentTest.starting);
			} else {
				this._push(runtime, this.$str[i]);
			}
		} else if (runtime.openQuote || quoteTest.ending) {
			// Yes add quotes
			this._push(runtime, this.$str[i]);
		} else if (runtime.options.limit && runtime.matches.length === runtime.options.limit) {
			this._push(runtime, this.$str[i]);
			return this._evalCharsAt(runtime, i + 1);
		} else {
			// Nesting tags inside comments and quotes have been ignored
			nestingTest = this._testNesting(runtime, i);
			// ---------------------
			// STOP ON THIS CHARACTER...?
			// ---------------------
			var nestingTest = this._testNesting(runtime, i);
			// STOP CHAR(S)? at top level?
			var stopChar = this._testChars(runtime.options.stopChars || [], runtime, i);
			if (!runtime.nesting.length && stopChar !== false) {
				runtime.options.stopChar = stopChar;
				runtime.options.stopCharForward = this.$str.substr(i);
				return;
			}
			// ---------------------
			// Match and split now...
			// ---------------------
			if (!runtime.delims.length) {
				// BLOCK-BASED SPLITTING...
				if (runtime.nesting.length === 2 && nestingTest.starting) {
					runtime.matches.push(null);
					this._push(runtime, nestingTest.starting);
					charWidth = nestingTest.starting.length;
				} else if (!runtime.nesting.length && nestingTest.ending) {
					this._push(runtime, nestingTest.ending);
					charWidth = nestingTest.ending.length;
					runtime.matches.push(null);
				} else/*no-nesting flag*/ {
					this._push(runtime, this.$str[i]);
				}
			} else {
				// ---------------------
				// DELIMS-BASED SPLITTING
				// ---------------------
				if (!runtime.nesting.length && !nestingTest.ending) {
					// In case the chars at index 0 is a delim,
					// the resulting split should first have an empty string, instead of undefined
					this._push(runtime, '');
					var matchedDelim = this._testChars(runtime.delims, runtime, i);
					if (matchedDelim !== false) {
						runtime.matches.push(matchedDelim);
						runtime.matchesi[i] = matchedDelim;
						charWidth = matchedDelim.length || 1;
						if (!runtime.options.preserveDelims) {
							// The current character is a delimiter...
							// and should not get to appending to the split series down the line
							return this._evalCharsAt(runtime, i + (matchedDelim.length || 1));
						}
					}
					this._push(runtime, matchedDelim || this.$str[i]);
				} else {
					var chars = nestingTest.starting || nestingTest.ending || this.$str[i];
					charWidth = chars.length;
					this._push(runtime, chars);
				}
			}
		}
		return this._evalCharsAt(runtime, i + charWidth);
	}

	/**
	 * Expr helper: tests for a quote start/end character on the current cursor.
	 *
	 * @param object	runtime
	 * @param int		i
	 *
	 * @return object
	 */
	_testQuotes(runtime, i) {
		var result = {};
		(runtime.options.quotes || []).forEach(quote => {
			if (this.$str.substr(i, 1) === quote) {
				if (!runtime.openQuote) {
					runtime.openQuote = quote;
					result.starting = quote;
				} else if (quote === runtime.openQuote) {
					runtime.openQuote = false;
					result.ending = quote;
				}
			}
		});
		return result;
	}

	/**
	 * Expr helper: tests for a comment start/end character on the current cursor.
	 *
	 * @param object	runtime
	 * @param int		i
	 *
	 * @return object
	 */
	_testComments(runtime, i) {
		var result = {};
		(runtime.options.comments || []).forEach(block => {
			if (!runtime.openComment) {
				var starting = Object(_web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_5__["default"])(block);
				if (this.$str.substr(i).startsWith(starting)) {
					runtime.openComment = block;
					result.starting = starting;
				}
			} else if (Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_6__["default"])(block) === Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_6__["default"])(runtime.openComment)) {
				var ending = Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_6__["default"])(block);
				if (this.$str.substr(i).startsWith(ending)) {
					runtime.openComment = false;
					result.ending = ending;
				}
			}
		});
		return result;
	}

	/**
	 * Expr helper: tests for a nesting start/end character on the current cursor.
	 *
	 * @param object	runtime
	 * @param int		i
	 *
	 * @return object
	 */
	_testNesting(runtime, i) {
		var result = {};
		(runtime.options.blocks || []).forEach(block => {
			var starting = Object(_web_native_js_commons_arr_first_js__WEBPACK_IMPORTED_MODULE_5__["default"])(block);
			if (this.$str.substr(i).startsWith(starting)) {
				runtime.nesting = runtime.nesting.concat([block]);
				result.starting = starting;
			} else if (runtime.nesting.length && Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_6__["default"])(block) === Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_6__["default"])(runtime.nesting))) {
				var ending = Object(_web_native_js_commons_arr_last_js__WEBPACK_IMPORTED_MODULE_6__["default"])(block);
				if (this.$str.substr(i).startsWith(ending)) {
					runtime.nesting = runtime.nesting.slice(0, -1);
					result.ending = ending;
				}
			}
		});
		runtime.maxDepth = Math.max(runtime.maxDepth, runtime.nesting.length);
		return result;
	}

	/**
	 * Expr helper: tests for a delimiter or stop character on the current cursor.
	 *
	 * @param array		testList
	 * @param object 	runtime
	 * @param int		i
	 *
	 * @return mixed
	 */
	_testChars(testList, runtime, i) {
		for (var k = 0; k < testList.length; k ++) {
			var test = testList[k];
			if (Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(test)) {
				var ret = test(this.$str.substr(0, i), this.$str.substr(i));
				if (ret !== false) {
					return ret;
				}
			}
			if (runtime.options.useRegex) {
				var m = this.$str.substr(i).match(new RegExp('^' + test, runtime.options.useRegex !== true ? runtime.options.useRegex : ''));
				if (m) {
					return m[0];
				}
			}
			if ((!runtime.options.ci && this.$str.substr(i, test.length) === test)
			|| (runtime.options.ci && this.$str.substr(i, test.length).toLowerCase() === test.toLowerCase())) {
				return test;
			}
		}
		return false;
	}
	
	/**
	 * Expr helper: pushes a character or set of characters into the current split series.
	 *
	 * @param object 	runtime
	 * @param string	chars
	 * @param string	target
	 * @param bool		isNewSeries
	 *
	 * @return void
	 */
	_push(runtime, chars, target = 'tokens', isNewSeries = false) {
		var splitSeries = runtime.matches.length;
		if (Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(runtime.tokens[splitSeries])) {
			runtime.tokens[splitSeries] = '';
		}

		if (target === 'comments') {
			if (!runtime.tokens[splitSeries].comments) {
				runtime.tokens[splitSeries] = new String(runtime.tokens[splitSeries]);
				runtime.tokens[splitSeries].comments = [];
			}
			var splitSeries2 = runtime.tokens[splitSeries].comments.length - (!runtime.tokens[splitSeries].comments.length || isNewSeries ? 0 : 1);
			runtime.tokens[splitSeries].comments[splitSeries2] = (runtime.tokens[splitSeries].comments[splitSeries2] || '') + chars;
		} else {
			var comments = runtime.tokens[splitSeries].comments;
			runtime.tokens[splitSeries] = new String(runtime.tokens[splitSeries] + chars);
			runtime.tokens[splitSeries].comments = comments;
		}
	}

	/**
	 * Splits the instance string on the given delimeters and returns the tokens.
	 *
	 * @param string 	str
	 * @param object	options
	 *
	 * @return array
	 */
	split(str, delims, options) {
		return this.lex(delims, options).tokens;
	}
	
	/**
	 * Splits the instance string on the given delimeters and returns the matches.
	 *
	 * @param string 	str
	 * @param object	options:
	 *
	 * @return array
	 */
	match(str, delims, options) {
		return this.lex(delims, options).matches;
	}
	
	/**
	 * Parses the instance string on the given delimeters using regex.
	 *
	 * @param string 	str
	 * @param object	options
	 *
	 * @return object
	 */
	regParse(delims, options) {
		return this.lex(delims, Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_7__["default"])({useRegex: true}, options || {}));
	}
	
	/**
	 * Splits the instance string on the given delimeters using regex; returns the tokens.
	 *
	 * @param string 	str
	 * @param object	options
	 *
	 * @return array
	 */
	regSplit(delims, options) {
		return this.regParse(delims, options).tokens;
	}
	
	/**
	 * Matches the instance string on the given delimeters using regex; returns the matches.
	 *
	 * @param string 	str
	 * @param object	options
	 *
	 * @return array
	 */
	regMatch(delims, options) {
		return this.regParse(delims, options).matches;
	}
};

/**
 * @var array
 */
Lexer.$blocks = [['(', ')'], ['[', ']'], ['{', '}'],];

/**
 * @var array
 */
Lexer.$quotes = ['"', "'", '`',];

/**
 * @var array
 */
Lexer.$comments = [['/*', '*/'], ['//', "\n"],];

/**
 * @var object
 */
Lexer.$cache = {};

/**
 * @export
 */
/* harmony default export */ __webpack_exports__["default"] = (Lexer);



/***/ }),

/***/ "../jsen/src/index.js":
/*!****************************!*\
  !*** ../jsen/src/index.js ***!
  \****************************/
/*! exports provided: ExprInterface, Lexer, Contexts, Abstraction, Arr, Arguments, Assertion, Assignment, Bool, Call, Comparison, Condition, Deletion, Func, If, Math, Num, Obj, Presence, Reference, Return, Str, Statements, AbstractionInterface, ArrInterface, ArgumentsInterface, AssertionInterface, AssignmentInterface, BoolInterface, CallInterface, ComparisonInterface, ConditionInterface, DeletionInterface, FuncInterface, IfInterface, MathInterface, NumInterface, ObjInterface, PresenceInterface, ReferenceInterface, ReturnInterface, StrInterface, StatementsInterface, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Jsen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Jsen.js */ "../jsen/src/Jsen.js");
/* harmony import */ var _ExprInterface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExprInterface.js */ "../jsen/src/ExprInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExprInterface", function() { return _ExprInterface_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Lexer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lexer.js */ "../jsen/src/Lexer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Lexer", function() { return _Lexer_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Contexts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Contexts.js */ "../jsen/src/Contexts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Contexts", function() { return _Contexts_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Expr_Abstraction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Expr/Abstraction.js */ "../jsen/src/Expr/Abstraction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Abstraction", function() { return _Expr_Abstraction_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Expr_AbstractionInterface_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Expr/AbstractionInterface.js */ "../jsen/src/Expr/AbstractionInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractionInterface", function() { return _Expr_AbstractionInterface_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Expr_Arr_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Expr/Arr.js */ "../jsen/src/Expr/Arr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Arr", function() { return _Expr_Arr_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Expr_ArrInterface_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Expr/ArrInterface.js */ "../jsen/src/Expr/ArrInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrInterface", function() { return _Expr_ArrInterface_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _Expr_Arguments_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Expr/Arguments.js */ "../jsen/src/Expr/Arguments.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Arguments", function() { return _Expr_Arguments_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _Expr_ArgumentsInterface_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Expr/ArgumentsInterface.js */ "../jsen/src/Expr/ArgumentsInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArgumentsInterface", function() { return _Expr_ArgumentsInterface_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _Expr_Assertion_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Expr/Assertion.js */ "../jsen/src/Expr/Assertion.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Assertion", function() { return _Expr_Assertion_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _Expr_AssertionInterface_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Expr/AssertionInterface.js */ "../jsen/src/Expr/AssertionInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssertionInterface", function() { return _Expr_AssertionInterface_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _Expr_Assignment_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Expr/Assignment.js */ "../jsen/src/Expr/Assignment.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Assignment", function() { return _Expr_Assignment_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _Expr_AssignmentInterface_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Expr/AssignmentInterface.js */ "../jsen/src/Expr/AssignmentInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssignmentInterface", function() { return _Expr_AssignmentInterface_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _Expr_Bool_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Expr/Bool.js */ "../jsen/src/Expr/Bool.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bool", function() { return _Expr_Bool_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _Expr_BoolInterface_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Expr/BoolInterface.js */ "../jsen/src/Expr/BoolInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoolInterface", function() { return _Expr_BoolInterface_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _Expr_Call_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Expr/Call.js */ "../jsen/src/Expr/Call.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Call", function() { return _Expr_Call_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _Expr_CallInterface_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Expr/CallInterface.js */ "../jsen/src/Expr/CallInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CallInterface", function() { return _Expr_CallInterface_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _Expr_Comparison_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Expr/Comparison.js */ "../jsen/src/Expr/Comparison.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Comparison", function() { return _Expr_Comparison_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _Expr_ComparisonInterface_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Expr/ComparisonInterface.js */ "../jsen/src/Expr/ComparisonInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComparisonInterface", function() { return _Expr_ComparisonInterface_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _Expr_Condition_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Expr/Condition.js */ "../jsen/src/Expr/Condition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Condition", function() { return _Expr_Condition_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _Expr_ConditionInterface_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Expr/ConditionInterface.js */ "../jsen/src/Expr/ConditionInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConditionInterface", function() { return _Expr_ConditionInterface_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _Expr_Deletion_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Expr/Deletion.js */ "../jsen/src/Expr/Deletion.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Deletion", function() { return _Expr_Deletion_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _Expr_DeletionInterface_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Expr/DeletionInterface.js */ "../jsen/src/Expr/DeletionInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeletionInterface", function() { return _Expr_DeletionInterface_js__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _Expr_Func_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Expr/Func.js */ "../jsen/src/Expr/Func.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Func", function() { return _Expr_Func_js__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _Expr_FuncInterface_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Expr/FuncInterface.js */ "../jsen/src/Expr/FuncInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FuncInterface", function() { return _Expr_FuncInterface_js__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _Expr_If_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./Expr/If.js */ "../jsen/src/Expr/If.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "If", function() { return _Expr_If_js__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _Expr_IfInterface_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Expr/IfInterface.js */ "../jsen/src/Expr/IfInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfInterface", function() { return _Expr_IfInterface_js__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _Expr_Math_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./Expr/Math.js */ "../jsen/src/Expr/Math.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Math", function() { return _Expr_Math_js__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _Expr_MathInterface_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Expr/MathInterface.js */ "../jsen/src/Expr/MathInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MathInterface", function() { return _Expr_MathInterface_js__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _Expr_Num_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./Expr/Num.js */ "../jsen/src/Expr/Num.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Num", function() { return _Expr_Num_js__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _Expr_NumInterface_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Expr/NumInterface.js */ "../jsen/src/Expr/NumInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumInterface", function() { return _Expr_NumInterface_js__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _Expr_Obj_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Expr/Obj.js */ "../jsen/src/Expr/Obj.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Obj", function() { return _Expr_Obj_js__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _Expr_ObjInterface_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./Expr/ObjInterface.js */ "../jsen/src/Expr/ObjInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjInterface", function() { return _Expr_ObjInterface_js__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony import */ var _Expr_Presence_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./Expr/Presence.js */ "../jsen/src/Expr/Presence.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Presence", function() { return _Expr_Presence_js__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony import */ var _Expr_PresenceInterface_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Expr/PresenceInterface.js */ "../jsen/src/Expr/PresenceInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PresenceInterface", function() { return _Expr_PresenceInterface_js__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _Expr_Reference_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./Expr/Reference.js */ "../jsen/src/Expr/Reference.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return _Expr_Reference_js__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony import */ var _Expr_ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./Expr/ReferenceInterface.js */ "../jsen/src/Expr/ReferenceInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReferenceInterface", function() { return _Expr_ReferenceInterface_js__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony import */ var _Expr_Return_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Expr/Return.js */ "../jsen/src/Expr/Return.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Return", function() { return _Expr_Return_js__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/* harmony import */ var _Expr_ReturnInterface_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./Expr/ReturnInterface.js */ "../jsen/src/Expr/ReturnInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReturnInterface", function() { return _Expr_ReturnInterface_js__WEBPACK_IMPORTED_MODULE_39__["default"]; });

/* harmony import */ var _Expr_Statements_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./Expr/Statements.js */ "../jsen/src/Expr/Statements.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Statements", function() { return _Expr_Statements_js__WEBPACK_IMPORTED_MODULE_40__["default"]; });

/* harmony import */ var _Expr_StatementsInterface_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./Expr/StatementsInterface.js */ "../jsen/src/Expr/StatementsInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StatementsInterface", function() { return _Expr_StatementsInterface_js__WEBPACK_IMPORTED_MODULE_41__["default"]; });

/* harmony import */ var _Expr_Str_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./Expr/Str.js */ "../jsen/src/Expr/Str.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Str", function() { return _Expr_Str_js__WEBPACK_IMPORTED_MODULE_42__["default"]; });

/* harmony import */ var _Expr_StrInterface_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./Expr/StrInterface.js */ "../jsen/src/Expr/StrInterface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StrInterface", function() { return _Expr_StrInterface_js__WEBPACK_IMPORTED_MODULE_43__["default"]; });


/**
 * @imports
 */













































/**
 * @var object
 */
_Jsen_js__WEBPACK_IMPORTED_MODULE_0__["default"].grammars = {
	If: _Expr_If_js__WEBPACK_IMPORTED_MODULE_26__["default"],						// if (condition) expr1 else expre2
	//Statements: Statements,		// field1 = 3; field2 = val2
	Return: _Expr_Return_js__WEBPACK_IMPORTED_MODULE_38__["default"],				// return field1
	Deletion: _Expr_Deletion_js__WEBPACK_IMPORTED_MODULE_22__["default"],			// delete field1
	Assignment: _Expr_Assignment_js__WEBPACK_IMPORTED_MODULE_12__["default"],		// field1[key1].key2 = k
	Presence: _Expr_Presence_js__WEBPACK_IMPORTED_MODULE_34__["default"],			// key1 in field1
	Func: _Expr_Func_js__WEBPACK_IMPORTED_MODULE_24__["default"],					// (field1, field2) => {}
	Abstraction: _Expr_Abstraction_js__WEBPACK_IMPORTED_MODULE_4__["default"],	// (field1)
	Condition: _Expr_Condition_js__WEBPACK_IMPORTED_MODULE_20__["default"],		// field1 > field2 ? val1 : val2
	Assertion: _Expr_Assertion_js__WEBPACK_IMPORTED_MODULE_10__["default"],		// !field1 && field2
	Comparison: _Expr_Comparison_js__WEBPACK_IMPORTED_MODULE_18__["default"],		// field1 > field2
	Math: _Expr_Math_js__WEBPACK_IMPORTED_MODULE_28__["default"],					// field1 + field2
	Arr: _Expr_Arr_js__WEBPACK_IMPORTED_MODULE_6__["default"],					// [field1, field2]
	Obj: _Expr_Obj_js__WEBPACK_IMPORTED_MODULE_32__["default"],					// {field1:val1, field2:val2}
	Num: _Expr_Num_js__WEBPACK_IMPORTED_MODULE_30__["default"],					// [0-9]
	Str: _Expr_Str_js__WEBPACK_IMPORTED_MODULE_42__["default"],					// ""
	Bool: _Expr_Bool_js__WEBPACK_IMPORTED_MODULE_14__["default"],					// true
	Call: _Expr_Call_js__WEBPACK_IMPORTED_MODULE_16__["default"],					// field1()
	Reference: _Expr_Reference_js__WEBPACK_IMPORTED_MODULE_36__["default"],		// field1
};

/**
 * @exports
 */



/* harmony default export */ __webpack_exports__["default"] = (_Jsen_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/all.js":
/*!****************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/all.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if ALL items pass the test.
 *
 * @param array 	arr
 * @param function 	callback
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, callback) {
	return arr.reduce((prevTest, itm) => prevTest && callback(itm), true);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/concatUnique.js":
/*!*************************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/concatUnique.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pushUnique_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pushUnique.js */ "../reflex/node_modules/@web-native-js/commons/arr/pushUnique.js");
/* harmony import */ var _from_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");

/**
 * @imports
 */



/**
 * Adds items that do not already exist.
 *
 * @param array 	arr
 * @param array	 	...arrs
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, ...arrs) {
	arrs.forEach(_arr => {
		_arr.forEach(itm => Object(_pushUnique_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr, ...Object(_from_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_arr)));
	});
	return arr;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/crossJoin.js":
/*!**********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/crossJoin.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");

/**
 * @imports
 */


/**
 * Accepts a list of column and joins them to a table.
 *
 * @param array 	arr
 *
 * @return number
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr) {
	return arr.reduce((currTable, column) => {
		var newTable = [];
		currTable.forEach(row => {
			Object(_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(column).forEach(column => {
				var _row = row.slice();
				_row.push(column);
				newTable.push(_row);
			});
		});
		return newTable;
	}, [[]]);
});;

/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/exclude.js":
/*!********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/exclude.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./remove.js */ "../reflex/node_modules/@web-native-js/commons/arr/remove.js");

/**
 * @imports
 */


/**
 * Removes all instances of each item.
 *
 * @param array 	arr
 * @param array	 	itms
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, ...itms) {
	itms.forEach(itm => Object(_remove_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr, itm));
	return arr;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/from.js":
/*!*****************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/from.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isTypeArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isTypeArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeArray.js");
/* harmony import */ var _js_isEmpty_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isEmpty.js */ "../reflex/node_modules/@web-native-js/commons/js/isEmpty.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isObject.js");

/**
 * @imports
 */





/**
 * Casts an array-like object to an array.
 *
 * @param mixed 	val
 * @param bool	 	castObject
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val, castObject = true) {
	if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val)) {
		return val;
	};
	if (!castObject && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val)) {
		return [val];
	};
	if (val !== false && val !== 0 && Object(_js_isEmpty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val)) {
		return [];
	};
	if (Object(_js_isTypeArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val)) {
		return Array.prototype.slice.call(val);
	};
	if (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(val)) {
		return Object.values(val);
	};
	return [val];
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/intersect.js":
/*!**********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/intersect.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");

/**
 * @imports
 */


/**
 * Returns the intersection of two arrays;
 * optionally using a custom matching function.
 *
 * @param array 	arr
 * @param array	 	arr2
 * @param function 	callback
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, arr2, callback = null) {
	return !Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr2) ? [] : arr.filter(val1 => callback 
		? arr2.filter(val2 => callback(val1, val2)).length 
		: arr2.indexOf(val1) !== -1
	);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/pushUnique.js":
/*!***********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/pushUnique.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Adds an item if not already exist.
 *
 * @param array 	arr
 * @param array	 	...itms
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, ...items) {
	items.forEach(itm => {
		if (arr.indexOf(itm) < 0) {
			arr.push(itm);
		}
	});
	return arr;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/remove.js":
/*!*******************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/remove.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Removes instances of reference up to <limit> times.
 *
 * @param array 	arr
 * @param mixed	 	itm
 * @param int|bool 	limit
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr, itm, limit = false) {
	var i = arr.indexOf(itm);
	while (i > -1 && (limit || limit === false)) {
		arr.splice(i, 1);
		if (limit > 0) {
			limit --;
		};
		i = arr.indexOf(itm);
	};
	return arr;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/arr/unique.js":
/*!*******************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/arr/unique.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Returns a list of unique items.
 *
 * @param array	 				arr
 *	 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(arr) {
	const distinct = (value, index, self) => {
		return self.indexOf(value) === index;
	};
	return arr.filter(distinct);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/getType.js":
/*!*******************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/getType.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Returns the val's type.
 *
 * @param string 	val
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isArray.js":
/*!*******************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isArray.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "array".
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Array.isArray(val);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isBoolean.js":
/*!*********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isBoolean.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is undefined or is of type "boolean".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return val === true || val === false;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isEmpty.js":
/*!*******************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isEmpty.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNull.js */ "../reflex/node_modules/@web-native-js/commons/js/isNull.js");
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isUndefined.js */ "../reflex/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");

/**
 * @imports
 */




/**
 * Tells if val is empty in its own type.
 * This holds true for NULLs, UNDEFINED, FALSE, 0,
 * objects without keys, empty arrays.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Object(_isNull_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) || Object(_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) || val === false || val === 0 
		|| (Object(_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val) && !Object.keys(val).length);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isFunction.js":
/*!**********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isFunction.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isTypeFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isTypeFunction.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeFunction.js");

/**
 * @imports
 */


/**
 * Tells if val is of type "function".
 *
 * @param object 		val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Object(_isTypeFunction_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) || (val && {}.toString.call(val) === '[object function]');
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isNull.js":
/*!******************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isNull.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is undefined or is null.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return val === null || val === '';
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isNumber.js":
/*!********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isNumber.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "number".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val === 'number';
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isNumeric.js":
/*!*********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isNumeric.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "string" or a numeric string.
 * This holds true for both numbers and numeric strings.
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return val !== true && val !== false && val !== null && val !== '' && !isNaN(val * 1);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isObject.js":
/*!********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isObject.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is pure object.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return !Array.isArray(val) && typeof val === 'object' && val;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isPlainObject.js":
/*!*************************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isPlainObject.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isObject.js");

/**
 * @imports
 */


/**
 * Tells if an object is direct instance of Object.prototype.
 * Quite useful in differentiating native objects and class instances from plain objects ({}).
 *
 * @param object 	obj
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj) {
	return Object(_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj) && Object.getPrototypeOf(obj) === Object.prototype;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isString.js":
/*!********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isString.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "string".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val === 'string';
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isTypeArray.js":
/*!***********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isTypeArray.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isString.js */ "../reflex/node_modules/@web-native-js/commons/js/isString.js");
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isUndefined.js */ "../reflex/node_modules/@web-native-js/commons/js/isUndefined.js");

/**
 * @imports
 */



/**
 * Tells if val is "array-like".
 * This holds true for anything that has a length property.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return !Object(_isString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val) && !Object(_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val.length);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isTypeFunction.js":
/*!**************************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isTypeFunction.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "function".
 * This holds true for both regular functions and classes.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return typeof val === 'function';
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js":
/*!************************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is of type "object".
 * This holds true for anything object, including built-ins.
 *
 * @param object	 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return Array.isArray(val) || typeof val === 'object';
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/js/isUndefined.js":
/*!***********************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/js/isUndefined.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Tells if val is undefined or is of type "undefined".
 *
 * @param string 	val
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(val) {
	return arguments.length && (val === undefined || typeof val === 'undefined');
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/compareCallback.js":
/*!****************************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/compareCallback.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isBoolean_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isBoolean.js */ "../reflex/node_modules/@web-native-js/commons/js/isBoolean.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./each.js */ "../reflex/node_modules/@web-native-js/commons/obj/each.js");

/**
 * @imports
 */






/**
 * Gets the match(es) between (members of) two values;
 * assertion optionally custom.
 *
 * @param mixed 			ob1
 * @param mixed 			obj2
 * @param string|function	assertion
 * @param bool				netComparison
 * @param bool				contrast
 * @param bool				returnOnFirstFalse
 *
 * @return bool|array|object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj1, obj2, assertion = true, netComparison = true, contrast = false, returnOnFirstFalse = false) {
	if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj2)) {
		var result = [];
		var contn = true;
		obj1.forEach(v1 => {
			if (!contn) {
				return;
			}
			var testPass = false;
			Object(_each_js__WEBPACK_IMPORTED_MODULE_4__["default"])(obj2, (k, v2) => {
				if (!testPass || (netComparison && Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(v1))) {
					testPass = assertion(v1, v2);
					if ((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(testPass) && !testPass.length) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(testPass) && !Object.keys(testPass).length)) {
						testPass = false;
					}
					if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(testPass) && netComparison) {
						// Further recursions should use this testPass as v1
						v1 = testPass;
					}
				}
			});
			if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(testPass)) {
				result.push(netComparison ? testPass : v1);
			} else if (!Object(_js_isBoolean_js__WEBPACK_IMPORTED_MODULE_3__["default"])(testPass)) {
				result.push(testPass);
			} else if ((contrast && !testPass) || (!contrast && testPass)) {
				result.push(v1);
			} else if (returnOnFirstFalse) {
				contn = false;
			}
		});
		return result;
	}
	
	if (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2)) {
		var result = {};
		var contn = true;
		Object.keys(obj1).forEach(k => {
			if (!contn) {
				return;
			}
			var testPass = assertion(obj1[k], obj2[k]);
			if ((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(testPass) && !testPass.length) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(testPass) && !Object.keys(testPass).length)) {
				testPass = false;
			}
			if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(testPass)) {
				result[k] = netComparison ? testPass : obj1[k];
			} else if (!Object(_js_isBoolean_js__WEBPACK_IMPORTED_MODULE_3__["default"])(testPass)) {
				result[k] = testPass;
			} else if ((contrast && !testPass) || (!contrast && testPass)) {
				result[k] = obj1[k];
			} else if (returnOnFirstFalse) {
				contn = false;
			}
		});
		return result;
	}
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/copy.js":
/*!*****************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/copy.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isFunction.js */ "../reflex/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isNumeric.js */ "../reflex/node_modules/@web-native-js/commons/js/isNumeric.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _mergeCallback_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeCallback.js */ "../reflex/node_modules/@web-native-js/commons/obj/mergeCallback.js");

/**
 * @imports
 */






/**
 * Copies an object.
 *
 * @param object	 	obj
 * @param array		 	filter
 *
 * @return object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, filter = [], withSymbols = true) {
	var depth = 0;
	if (Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arguments[0]) && Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arguments[1])) {
		depth = arguments[0];
		obj = arguments[1];
		filter = arguments[2] || [];
	}
	return Object(_mergeCallback_js__WEBPACK_IMPORTED_MODULE_4__["default"])([depth, {}, obj], (key, obj1, obj2) => {
		return Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(filter) ? filter(key) 
			: (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(filter) && filter.length ? filter.indexOf(key) > -1 : true);
	}, false/*deepProps*/, false/*isReplace*/, withSymbols);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/each.js":
/*!*****************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/each.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isNumeric.js */ "../reflex/node_modules/@web-native-js/commons/js/isNumeric.js");

/**
 * @imports
 */



/**
 * Loops thru obj flatly with a callback function.
 * Stops when callback returns a non-undefined value.
 *
 * @param array|object 			obj 			The array or object to iterate.
 * @param function 				callback 		The callback function.
 *
 * @return mixed|null			Any non-null return from callback
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, callback) {
	var returnValue = undefined;
	if (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
		Object.keys(obj).forEach((k, i) => {
			if (returnValue !== false) {
				returnValue = callback(Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k) ? parseFloat(k) : k, obj[k], i);
			}
		});
	}
	return returnValue;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/even.js":
/*!*****************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/even.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isNumber.js */ "../reflex/node_modules/@web-native-js/commons/js/isNumber.js");
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/isFunction.js */ "../reflex/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _js_isPlainObject_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/isPlainObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isPlainObject.js");
/* harmony import */ var _compareCallback_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./compareCallback.js */ "../reflex/node_modules/@web-native-js/commons/obj/compareCallback.js");

/**
 * @imports
 */








/**
 * Asserts (members of) the first value against (members of) subsequent values.
 * Assertion could be TRUE, FALSE, or custom.
 *
 * @param mixed 			obj1
 * @param mixed 			obj2
 * @param bool|function		assertion
 * @param int				depth
 *
 * @return bool
 */
const _even = function(obj1, obj2, assertion = true, depth = 1) {
	if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2) && obj1.length !== obj2.length) {
		return !assertion;
	}
	if (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj2)) {
		var obj1Keys = Object.keys(obj1);
		var obj2Keys = Object.keys(obj2);
		if (!obj1Keys.length && !obj2Keys.length) {
			// Objects that won't show keys must be compared by instance
			// Many native objects won't. So we can't judge by keys alone.
			return Object(_js_isPlainObject_js__WEBPACK_IMPORTED_MODULE_5__["default"])(obj1) && Object(_js_isPlainObject_js__WEBPACK_IMPORTED_MODULE_5__["default"])(obj2) 
				? assertion
				: (obj1 === obj2) === assertion;
		}
		if (!_even(obj1Keys, obj2Keys)) {
			return !assertion;
		}
	}
	if (depth > 0 && ((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2)) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj2)))) {
		var result = Object(_compareCallback_js__WEBPACK_IMPORTED_MODULE_6__["default"])(obj1, obj2, (v1, v2) => {
			return _even(v1, v2, assertion, depth - 1);
		}, false/*netComparison*/, false/*contrast*/, true/*returnOnFirstFalse*/);
		return Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result) 
			? result.length === obj1.length && result.length === obj2.length 
			: (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(result) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj1) 
				? Object.keys(result).length === Object.keys(obj1).length && Object.keys(result).length ===  Object.keys(obj2).length 
				: result);
	}
	return Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_4__["default"])(assertion) ? assertion(obj1, obj2) : (
		Object(_js_isNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj1) && Object(_js_isNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj2) && isNaN(obj1) && isNaN(obj2) 
			? assertion 
			: (obj1 === obj2) === assertion
	);
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (_even);


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/from.js":
/*!*****************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/from.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isString.js */ "../reflex/node_modules/@web-native-js/commons/js/isString.js");

/**
 * @imports
 */



/**
 * Return an object for the given pair(s) of input.
 *
 * @param string|array 			key
 * @param mixed|array			val 
 *
 * @return object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(key, val = null) {
	var obj = {};
	if (arguments.length === 2) {
		if (Object(_js_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key)) {
			obj[key] = val;
		} else if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val)) {
			key.forEach((k, i) => obj[k] = val[i]);
		}
	}
	return obj;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/get.js":
/*!****************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/get.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isUndefined.js */ "../reflex/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _js_isNull_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isNull.js */ "../reflex/node_modules/@web-native-js/commons/js/isNull.js");
/* harmony import */ var _arr_from_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../arr/from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");

/**
 * @imports
 */





/**
 * Retrieves the value at the given path.
 *
 * A return value of undefined is ambiguous, and can mean either that the
 * path does not exist, or that the path actually exists but with a value of undefined. If it is required to
 * know whether the path actually exists, pass an object as a third argument.
 * This object will have an "exists" key set to true/false.
 *
 * @param object 				ctxt
 * @param array 				path
 * @param object 				trap
 * @param object 				reciever
 *
 * @return mixed
 */
/* harmony default export */ __webpack_exports__["default"] = (function(ctxt, path, trap = {}, reciever = {}) {
	path = Object(_arr_from_js__WEBPACK_IMPORTED_MODULE_3__["default"])(path).slice();
	var _ctxt = ctxt;
	while(!Object(_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ctxt) && !Object(_js_isNull_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ctxt) && path.length) {
		var _key = path.shift();
		if (!(trap.get ? trap.get(_ctxt, _key) : (Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ctxt) ? _key in _ctxt : _ctxt[_key]))) {
			reciever.exists = false;
			return;
		}
		_ctxt = trap.get ? trap.get(_ctxt, _key) : _ctxt[_key];
	}
	reciever.exists = true;
	return _ctxt;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/getAllPropertyNames.js":
/*!********************************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/getAllPropertyNames.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../arr/pushUnique.js */ "../reflex/node_modules/@web-native-js/commons/arr/pushUnique.js");
/* harmony import */ var _getPrototypeChain_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPrototypeChain.js */ "../reflex/node_modules/@web-native-js/commons/obj/getPrototypeChain.js");

/**
 * @imports
 */



/**
 * Eagerly retrieves object members all down the prototype chain.
 *
 * @param object	 	obj
 * @param object	 	until
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, until) {
	var keysAll = [];
	Object(_getPrototypeChain_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj, until).forEach(obj => {
		Object(_arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_0__["default"])(keysAll, ...Object.getOwnPropertyNames(obj));
	});
	return keysAll;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/getPrototypeChain.js":
/*!******************************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/getPrototypeChain.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");

/**
 * @imports
 */


/**
 * Returns the prototype chain.
 *
 * @param object 		obj
 * @param object	 	until
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(obj, until) {
	until = until || Object.prototype;
	until = until && !Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(until) ? [until] : until;
	// We get the chain of inheritance
	var prototypalChain = [];
	var obj = obj;
	while((obj && (!until || until.indexOf(obj) < 0) && obj.name !== 'default')) {
		prototypalChain.push(obj);
		obj = obj ? Object.getPrototypeOf(obj) : null;
	}
	return prototypalChain;
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/merge.js":
/*!******************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/merge.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mergeCallback_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeCallback.js */ "../reflex/node_modules/@web-native-js/commons/obj/mergeCallback.js");

/**
 * @imports
 */


/**
  * Merges values from subsequent arrays/objects first array/object;
  * optionally recursive
  *
  * @param array ...objs
  *
  * @return void
  */
/* harmony default export */ __webpack_exports__["default"] = (function(...objs) {
	return Object(_mergeCallback_js__WEBPACK_IMPORTED_MODULE_0__["default"])(objs, (k, obj1, obj2) => {
		return true;
	}, false/*deepProps*/, false/*isReplace*/, false/*withSymbols*/);
});;


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/obj/mergeCallback.js":
/*!**************************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/obj/mergeCallback.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergeCallback; });
/* harmony import */ var _js_isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/isFunction.js */ "../reflex/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _js_isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/isObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/isNumeric.js */ "../reflex/node_modules/@web-native-js/commons/js/isNumeric.js");
/* harmony import */ var _getAllPropertyNames_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getAllPropertyNames.js */ "../reflex/node_modules/@web-native-js/commons/obj/getAllPropertyNames.js");

/**
 * @imports
 */







/**
  * Merges values from subsequent arrays/objects first array/object;
  * optionally recursive
  *
  * @param array ...objs
  *
  * @return void
  */
function mergeCallback(objs, callback, deepProps = false, isReplace = false, withSymbols = true) {
	var depth = 0;
	var obj1 = objs.shift();
	if (Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__["default"])(obj1) || obj1 === true || obj1 === false) {
		depth = obj1;
		obj1 = objs.shift();
	}
	if (!objs.length) {
		throw new Error('_merge() requires two or more array/objects.');
	}
	objs.forEach((obj2, i) => {
		if (!Object(_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(obj2) && !Object(_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj2)) {
			return;
		}
		(deepProps ? Object(_getAllPropertyNames_js__WEBPACK_IMPORTED_MODULE_5__["default"])(obj2) : Object.getOwnPropertyNames(obj2)).forEach(key => {
			var valAtObj1 = obj1[key];
			var valAtObj2 = obj2[key];
			if (((Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj2)) || (Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(valAtObj1) && Object(_js_isObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(valAtObj2))) 
			&& (depth === true || depth > 0)) {
				// RECURSE...
				obj1[key] = Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valAtObj2) ? [] : {};
				mergeCallback([Object(_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__["default"])(depth) ? depth - 1 : depth, obj1[key], valAtObj1, valAtObj2], callback, deepProps, isReplace, withSymbols);
			} else if (callback(key, obj1, obj2, i)) {
				if (Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj1) && Object(_js_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj2)) {
					if (isReplace) {
						obj1[key] = valAtObj2;
					} else {
						obj1.push(valAtObj2);
					}
				} else {
					// In case we're setting a read-only property
					try {
						if (withSymbols) {
							Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj2, key));
						} else {
							obj1[key] = obj2[key];
						}
					} catch(e) {}
				}
			}
		});
	});
	return obj1;
};


/***/ }),

/***/ "../reflex/node_modules/@web-native-js/commons/str/after.js":
/*!******************************************************************!*\
  !*** ../reflex/node_modules/@web-native-js/commons/str/after.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Return the remainder of a string after a given value.
 *
 * @param  string  subject
 * @param  string  search
 * @param  bool	   afterLast
 *
 * @return string
 */
/* harmony default export */ __webpack_exports__["default"] = (function(subject, search, afterLast = false) {
	if (search == '') {
		return subject;
	}
	var pos = afterLast ? subject.lastIndexOf(search) : subject.indexOf(search);
	if (pos === -1) {
		return '';
	}
	return subject.substr(pos + search.length);
});;


/***/ }),

/***/ "../reflex/src/_getProps.js":
/*!**********************************!*\
  !*** ../reflex/src/_getProps.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/QueryEvent.js */ "../reflex/src/internal/QueryEvent.js");
/* harmony import */ var _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/TrapBase.js */ "../reflex/src/internal/TrapBase.js");

/**
 * @imports
 */




/**
 * Runs a "getProps" type of query operation on a target.
 * Fires any observers for the specific type that may be bound to target.
 *
 * @param bool			ownKeys
 * @param array|object	target
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(ownKeys, target) {
	if (!target || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target)) {
		throw new Error('Target must be of type object!');
	}
	// ---------------------------------
	// Execute any "keys" traps, otherwise "test" the default way
	var trapBase, defaultKeys = function(_keys) {
		return arguments.length ? _keys : (
			ownKeys ? Object.getOwnPropertyNames(target) : Object.keys(target)
		);
	};
	if (trapBase = _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].getForTarget(target)) {
		return trapBase.fire(new _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"](target, {type:ownKeys ? 'ownKeys' : 'keys'}), defaultKeys);
	}
	return defaultKeys();
});


/***/ }),

/***/ "../reflex/src/_setProp.js":
/*!*********************************!*\
  !*** ../reflex/src/_setProp.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_arr_all_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/all.js */ "../reflex/node_modules/@web-native-js/commons/arr/all.js");
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../reflex/node_modules/@web-native-js/commons/js/isString.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _web_native_js_commons_js_isNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isNumber.js */ "../reflex/node_modules/@web-native-js/commons/js/isNumber.js");
/* harmony import */ var _web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @web-native-js/commons/js/isObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./internal/MutationEvent.js */ "../reflex/src/internal/MutationEvent.js");
/* harmony import */ var _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./internal/QueryEvent.js */ "../reflex/src/internal/QueryEvent.js");
/* harmony import */ var _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./internal/ObserverBase.js */ "../reflex/src/internal/ObserverBase.js");
/* harmony import */ var _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./internal/TrapBase.js */ "../reflex/src/internal/TrapBase.js");
/* harmony import */ var _unlink_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./unlink.js */ "../reflex/src/unlink.js");
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./link.js */ "../reflex/src/link.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./has.js */ "../reflex/src/has.js");

/**
 * @imports
 */















/**
 * Executes a "_setProp" type of operation on a target.
 * Fires any observers for the specific type that may be bound to target.
 *
 * @param bool			define
 * @param array|object	target
 * @param string|array	keysOrPayload
 * @param mixed			value
 * @param bool			returnEvent
 *
 * @return bool|Event
 */
/* harmony default export */ __webpack_exports__["default"] = (function(define, target, keysOrPayload, value = null, returnEvent = false) {
	if (!target || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_6__["default"])(target)) {
		throw new Error('Target must be of type object!');
	}
	if (Object(_web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_5__["default"])(keysOrPayload)) {
		returnEvent = value;
	}
	var keys = keysOrPayload, _data = {}, data = {}, created = [];
	var handleSet = (key, value, related) => {
		_data[key] = target[key];
		if (!Object(_has_js__WEBPACK_IMPORTED_MODULE_13__["default"])(target, key)) {
			created.push(key);
		}
		// ---------------------------------
		var descriptor;
		if (define) {
			descriptor = value || {};
			value = descriptor.value;
		}
		// Execute any "set" traps, otherwise "set" the default way
		var success, trapBase, defaultSet = function(_success) {
			if (!arguments.length) {
				if (descriptor) {
					Object.defineProperty(target, key, descriptor);
				} else {
					target[key] = value;
				}
				return true;
			}
			return _success;
		};
		if (trapBase = _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_10__["default"].getForTarget(target)) {
			var details = descriptor 
				? {type:'def', query:key, descriptor, related} 
				: {type:'set', query:key, value, related};
			success = trapBase.fire(new _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_8__["default"](target, details), defaultSet);
		} else {
			success = defaultSet();
		}
		// ---------------------------------
		if (success) {
			data[key] = value;
			if (data[key] !== _data[key]) {
				// Unobserve outgoing value for bubbling
				if (_data[key] && Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_data[key])) {
					Object(_unlink_js__WEBPACK_IMPORTED_MODULE_11__["default"])(target, key, _data[key]);
				}
				// Observe incoming value for bubbling
				if (data[key] && Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_6__["default"])(data[key])) {
					Object(_link_js__WEBPACK_IMPORTED_MODULE_12__["default"])(target, key, data[key]);
				}
			} else {
				delete data[key];
				delete _data[key];
			}
		} else {
			delete _data[key];
		}
		return success;
	};
	// ---------------------------------
	var successStates = [];
	if (Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(keys) || ((Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(keys) || Object(_web_native_js_commons_js_isNumber_js__WEBPACK_IMPORTED_MODULE_4__["default"])(keys)) && (keys = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(keys)))) {
		successStates = keys.map(key => handleSet(key, value, keys))
	} else if (Object(_web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_5__["default"])(keysOrPayload)) {
		var payloadKeys = Object.keys(keysOrPayload);
		successStates = payloadKeys.map(key => handleSet(key, keysOrPayload[key], payloadKeys))
	}
	// ---------------------------------
	var evt, mutationBase;
	if ((mutationBase = _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_9__["default"].getForTarget(target)) || returnEvent) {
		evt = new _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_7__["default"](target, {type:'set', data, _data, created});
		if (mutationBase) {
			mutationBase.fire(evt);
		}
	}
	return returnEvent ? evt : Object(_web_native_js_commons_arr_all_js__WEBPACK_IMPORTED_MODULE_1__["default"])(successStates, state => state);
});


/***/ }),

/***/ "../reflex/src/build.js":
/*!******************************!*\
  !*** ../reflex/src/build.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return build; });
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init.js */ "../reflex/src/init.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "../reflex/src/keys.js");
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get.js */ "../reflex/src/get.js");
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./link.js */ "../reflex/src/link.js");

/**
 * @imports
 */






/**
 * Recursively "connects" an object's members to the object
 * for reflex actions.
 *
 * @param array|object	target
 * @param bool			_init
 *
 * @return void
 */
function build(target, _init = false) {
	if (!target || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target)) {
		throw new Error('Target must be of type object!');
	}
	// ---------------------------------
	var keys = Object(_keys_js__WEBPACK_IMPORTED_MODULE_2__["default"])(target);
	keys.forEach(key => {
		var value = Object(_get_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target, key);
		if (Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) && value) {
			Object(_link_js__WEBPACK_IMPORTED_MODULE_4__["default"])(target, key, value);
			build(value, _init);
		}
	});
	if (_init) {
		Object(_init_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target, keys);
	}
}


/***/ }),

/***/ "../reflex/src/def.js":
/*!****************************!*\
  !*** ../reflex/src/def.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setProp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setProp.js */ "../reflex/src/_setProp.js");

/**
 * @imports
 */


/**
 * Executes a "set" operation on a target.
 * Fires any observers that may be bound to target.
 *
 * @param array|object	target
 * @param string|array	keysOrPayload
 * @param mixed			value
 * @param bool			returnEvent
 *
 * @return bool|Event
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target, keysOrPayload, value = null, returnEvent = false) {
	return Object(_setProp_js__WEBPACK_IMPORTED_MODULE_0__["default"])(true/*define*/, ...arguments);
});


/***/ }),

/***/ "../reflex/src/del.js":
/*!****************************!*\
  !*** ../reflex/src/del.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_arr_all_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/all.js */ "../reflex/node_modules/@web-native-js/commons/arr/all.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/MutationEvent.js */ "../reflex/src/internal/MutationEvent.js");
/* harmony import */ var _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/QueryEvent.js */ "../reflex/src/internal/QueryEvent.js");
/* harmony import */ var _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/ObserverBase.js */ "../reflex/src/internal/ObserverBase.js");
/* harmony import */ var _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/TrapBase.js */ "../reflex/src/internal/TrapBase.js");
/* harmony import */ var _unlink_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./unlink.js */ "../reflex/src/unlink.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./has.js */ "../reflex/src/has.js");

/**
 * @imports
 */










/**
 * Executes a "delete" operation on a target.
 * Fires any observers that may be bound to target.
 *
 * @param array|object	target
 * @param string|array	keys
 * @param bool			returnEvent
 *
 * @return bool|Event
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target, keys, returnEvent = false) {
	if (!target || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(target)) {
		throw new Error('Target must be of type object!');
	}
	var keys = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(keys), _data = {}, data = {}, deleted = [];
	var successStates = keys.map(key => {
		_data[key] = target[key];
		if (Object(_has_js__WEBPACK_IMPORTED_MODULE_8__["default"])(target, key)) {
			deleted.push(key);
		}
		// ---------------------------------
		// Execute any "del" traps, otherwise "del" the default way
		var success, trapBase, defaultDel = function(_success) {
			if (!arguments.length) {
				delete target[key];
				return true;
			}
			return _success;
		};
		if (trapBase = _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_6__["default"].getForTarget(target)) {
			success = trapBase.fire(new _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_4__["default"](target, {type:'del', query:key, related:keys}), defaultDel);
		} else {
			success = defaultDel();
		}
		// ---------------------------------
		if (success) {
			data[key] = undefined;
			// Unobserve outgoing value for bubbling
			if (_data[key] && Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_data[key])) {
				Object(_unlink_js__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, _data[key]);
			}
		}
		return success;
	});
	// ---------------------------------
	var evt, mutationBase;
	if ((mutationBase = _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_5__["default"].getForTarget(target)) || returnEvent) {
		evt = new _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_3__["default"](target, {type:'del', data, _data, deleted});
		if (mutationBase && Object.keys(data).length) {
			mutationBase.fire(evt);
		}
	}
	return returnEvent ? evt : Object(_web_native_js_commons_arr_all_js__WEBPACK_IMPORTED_MODULE_1__["default"])(successStates, state => state);
});


/***/ }),

/***/ "../reflex/src/get.js":
/*!****************************!*\
  !*** ../reflex/src/get.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_obj_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/from.js */ "../reflex/node_modules/@web-native-js/commons/obj/from.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isNumeric.js */ "../reflex/node_modules/@web-native-js/commons/js/isNumeric.js");
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../reflex/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/QueryEvent.js */ "../reflex/src/internal/QueryEvent.js");
/* harmony import */ var _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/TrapBase.js */ "../reflex/src/internal/TrapBase.js");
/* harmony import */ var _transaction_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transaction.js */ "../reflex/src/transaction.js");

/**
 * @imports
 */









/**
 * Runs a "get" query operation on a target.
 * Fires any such query observers that may be bound to target.
 *
 * @param array|object	target
 * @param string|array	keys
 *
 * @return mixed
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target, keys) {
	if (!target || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_4__["default"])(target)) {
		throw new Error('Target must be of type object!');
	}
	// ---------------------------------
	// Execute any "get" traps, otherwise "get" the default way
	var value, trapBase, defaultGet = function(_value) {
		return arguments.length ? _value : (Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(keys) ? Object(_web_native_js_commons_obj_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(keys, target) : target[keys]);
	};
	if (trapBase = _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_6__["default"].getForTarget(target)) {
		value = trapBase.fire(new _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_5__["default"](target, {type:'get', query:keys}), defaultGet);
	} else {
		value = defaultGet();
	}
	// ---------------------------------
	// Execute array methods in "mutation" mode
	if (Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target) && !Object(_web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_2__["default"])(keys) && Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_3__["default"])(value)) {
		return function reflexArrayMethodWrapper(...args) {
			return Object(_transaction_js__WEBPACK_IMPORTED_MODULE_7__["default"])([target], () => {
				return value.apply(target, args);
			});
		};
	}
	return value;
});


/***/ }),

/***/ "../reflex/src/has.js":
/*!****************************!*\
  !*** ../reflex/src/has.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/QueryEvent.js */ "../reflex/src/internal/QueryEvent.js");
/* harmony import */ var _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/TrapBase.js */ "../reflex/src/internal/TrapBase.js");

/**
 * @imports
 */




/**
 * Runs an "in" query operation on a target.
 * Fires any such query observers that may be bound to target.
 *
 * @param array|object	target
 * @param string		key
 *
 * @return bool
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target, key) {
	if (!target || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target)) {
		throw new Error('Target must be of type object!');
	}
	// ---------------------------------
	// Execute any "has" traps, otherwise "test" the default way
	var trapBase, defaultHas = function(_state) {
		return arguments.length ? _state : (key in target);
	};
	if (trapBase = _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].getForTarget(target)) {
		return trapBase.fire(new _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"](target, {type:'has', query:key}), defaultHas);
	}
	return defaultHas();
});


/***/ }),

/***/ "../reflex/src/index.js":
/*!******************************!*\
  !*** ../reflex/src/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build.js */ "../reflex/src/build.js");
/* harmony import */ var _observe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observe.js */ "../reflex/src/observe.js");
/* harmony import */ var _unobserve_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unobserve.js */ "../reflex/src/unobserve.js");
/* harmony import */ var _trap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trap.js */ "../reflex/src/trap.js");
/* harmony import */ var _untrap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./untrap.js */ "../reflex/src/untrap.js");
/* harmony import */ var _def_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./def.js */ "../reflex/src/def.js");
/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./set.js */ "../reflex/src/set.js");
/* harmony import */ var _del_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./del.js */ "../reflex/src/del.js");
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./link.js */ "../reflex/src/link.js");
/* harmony import */ var _unlink_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./unlink.js */ "../reflex/src/unlink.js");
/* harmony import */ var _transaction_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./transaction.js */ "../reflex/src/transaction.js");
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./get.js */ "../reflex/src/get.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./has.js */ "../reflex/src/has.js");
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./init.js */ "../reflex/src/init.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./keys.js */ "../reflex/src/keys.js");
/* harmony import */ var _ownKeys_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ownKeys.js */ "../reflex/src/ownKeys.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./on.js */ "../reflex/src/on.js");
/* harmony import */ var _off_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./off.js */ "../reflex/src/off.js");
/* harmony import */ var _trigger_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./trigger.js */ "../reflex/src/trigger.js");
/* harmony import */ var _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./internal/MutationEvent.js */ "../reflex/src/internal/MutationEvent.js");
/* harmony import */ var _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./internal/QueryEvent.js */ "../reflex/src/internal/QueryEvent.js");
/* harmony import */ var _internal_Event_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./internal/Event.js */ "../reflex/src/internal/Event.js");

/**
 * @imports
 */























// Now we'll mimick standard Trap properties
// so that can be used as standard Trap out of the box.
const deleteProperty = _del_js__WEBPACK_IMPORTED_MODULE_7__["default"];
const defineProperty = _def_js__WEBPACK_IMPORTED_MODULE_5__["default"];

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = ({
	build: _build_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	observe: _observe_js__WEBPACK_IMPORTED_MODULE_1__["default"],
	unobserve: _unobserve_js__WEBPACK_IMPORTED_MODULE_2__["default"],
	trap: _trap_js__WEBPACK_IMPORTED_MODULE_3__["default"],
	untrap: _untrap_js__WEBPACK_IMPORTED_MODULE_4__["default"],
	def: _def_js__WEBPACK_IMPORTED_MODULE_5__["default"],
	defineProperty,
	set: _set_js__WEBPACK_IMPORTED_MODULE_6__["default"],
	del: _del_js__WEBPACK_IMPORTED_MODULE_7__["default"],
	deleteProperty,
	link: _link_js__WEBPACK_IMPORTED_MODULE_8__["default"],
	unlink: _unlink_js__WEBPACK_IMPORTED_MODULE_9__["default"],
	transaction: _transaction_js__WEBPACK_IMPORTED_MODULE_10__["default"],
	get: _get_js__WEBPACK_IMPORTED_MODULE_11__["default"],
	has: _has_js__WEBPACK_IMPORTED_MODULE_12__["default"],
	init: _init_js__WEBPACK_IMPORTED_MODULE_13__["default"],
	keys: _keys_js__WEBPACK_IMPORTED_MODULE_14__["default"],
	ownKeys: _ownKeys_js__WEBPACK_IMPORTED_MODULE_15__["default"],
	on: _on_js__WEBPACK_IMPORTED_MODULE_16__["default"],
	off: _off_js__WEBPACK_IMPORTED_MODULE_17__["default"],
	trigger: _trigger_js__WEBPACK_IMPORTED_MODULE_18__["default"],
	// Events
	MutationEvent: _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_19__["default"],
	QueryEvent: _internal_QueryEvent_js__WEBPACK_IMPORTED_MODULE_20__["default"],
	Event: _internal_Event_js__WEBPACK_IMPORTED_MODULE_21__["default"],
});

/***/ }),

/***/ "../reflex/src/init.js":
/*!*****************************!*\
  !*** ../reflex/src/init.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get.js */ "../reflex/src/get.js");
/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set.js */ "../reflex/src/set.js");

/**
 * @imports
 */




/**
 * Initializes "Reflxive getter/setter" traps on the target.
 *
 * @param array|object	target
 * @param string|array	keys
 *
 * @return void
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target, keys) {
	Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(keys).forEach(key => {
		var value = target[key], onGetFire, onSetFire;
		var currentDescriptor = Object.getOwnPropertyDescriptor(target, key)
		|| {enumerable: key in target ? false/*existing but hidden*/ : true};
		if ('value' in currentDescriptor) {
			delete currentDescriptor.value;
		}
		if ('writable' in currentDescriptor) {
			delete currentDescriptor.writable;
		}
		currentDescriptor.get = () => {
			if (onGetFire) {
				return value;
			}
			onGetFire = true;
			var _value = Object(_get_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key);
			onGetFire = false;
			return _value;
		};
		currentDescriptor.set = newValue => {
			if (onSetFire) {
				value = newValue;
				return true;
			}
			onSetFire = true;
			var rspns = Object(_set_js__WEBPACK_IMPORTED_MODULE_2__["default"])(target, key, newValue);
			onSetFire = false;
			return true;
		};
		Object.defineProperty(target, key, currentDescriptor);
	});
});


/***/ }),

/***/ "../reflex/src/internal/Event.js":
/*!***************************************!*\
  !*** ../reflex/src/internal/Event.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../reflex/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isObject.js");
/* harmony import */ var _web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/obj/each.js */ "../reflex/node_modules/@web-native-js/commons/obj/each.js");

/**
 * @imports
 */




/**
 * ---------------------------
 * The Event class
 * ---------------------------
 */

/* harmony default export */ __webpack_exports__["default"] = (class {
	
	/**
	 * Initializes the instance.
	 *
	 * @param array|object		target
	 * @param object			details
	 *
	 * @return void
	 */
	constructor(target, details = {}) {
		this.$ = {};
		this.$.target = target;
		this.$.details = details;
		this.$.propagationStopped = false;
		this.$.defaultPrevented = false;
		this.$.promisesInstance = null;
		this.$.promises = [];
		// -----------------------
		Object(_web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_2__["default"])(details, (prop, value) => {
			if (prop !== '$') {
				Object.defineProperty(this, prop, {value});
			}
		});
	}

	/**
	 * Gets the "target" object.
	 *
	 * @return array|object
	 */
	get target() {
		return this.$.target;
	}

	/**
	 * Gets the "details" object.
	 *
	 * @return object
	 */
	get details() {
		return this.$.details;
	}

	/**
	 * -----------------------
	 * RESPONSE HANDLERS
	 * -----------------------
	 */

	/**
	 * Stops the evnt from reaching other listeners.
	 *
	 * @return bool
	 */
	stopPropagation() {
		this.$.propagationStopped = true;
	}
		
	/**
	 * (Readonly) tells if stopPropagation() has been called.
	 *
	 * @return bool
	 */
	get propagationStopped() {
		return this.$.propagationStopped;
	}
		
	/**
	 * Sets a disposition that asks event initiator not to
	 * proceed with default action.
	 *
	 * @return void
	 */
	preventDefault() {
		this.$.defaultPrevented = true;
	}
		
	/**
	 * (Readonly) tells if preventDefault() has been called.
	 *
	 * @return bool
	 */
	get defaultPrevented() {
		return this.$.defaultPrevented;
	}
		
	/**
	 * Sets a Promise disposition.
	 *
	 * @param Promise	promise
	 *
	 * @return void
	 */
	promise(promise) {
		if (!(promise instanceof Promise)) {
			throw new Error('Event.promise() must be called with a Promise.');
		}
		this.$.promises.push(promise);
		this.$.promisesInstance = null;
	}
		
	/**
	 * (Readonly) returns all promises.
	 *
	 * @return Promise|null
	 */
	get promises() {
		if (!this.$.promisesInstance && this.$.promises.length) {
			this.$.promisesInstance = Promise.all(this.$.promises);
		}
		return this.$.promisesInstance;
	}
		
	/**
	 * Evaluates the given disposition value and
	 * calls an appropriate disposition method.
	 *
	 * @params mixed 	rspns
	 *
	 * @return void
	 */
	response(rspns) {
		var proms;
		var isEvent = Object(_web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rspns) && !Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(rspns.propagationStopped) && !Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(rspns.defaultPrevented)
		if ((rspns === false) || (isEvent && rspns.propagationStopped)) {
			this.stopPropagation();
		} else if ((rspns === false) || (isEvent && rspns.defaultPrevented)) {
			this.preventDefault();
		} else if ((rspns instanceof Promise && (proms = rspns))
		|| (isEvent && (proms = rspns.promises))) {
			this.promise(proms);
		}
	}
});;

/***/ }),

/***/ "../reflex/src/internal/Fireable.js":
/*!******************************************!*\
  !*** ../reflex/src/internal/Fireable.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * ---------------------------
 * The Fireable class
 * ---------------------------
 */

/* harmony default export */ __webpack_exports__["default"] = (class {
	
	/**
	 * Sets a "disconnected" flag on the Fireable.
	 *
	 * @return void
	 */
	disconnect() {
		this.disconnected = true;
	}
});;

/***/ }),

/***/ "../reflex/src/internal/Firebase.js":
/*!******************************************!*\
  !*** ../reflex/src/internal/Firebase.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/intersect.js */ "../reflex/node_modules/@web-native-js/commons/arr/intersect.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _Fireable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Fireable.js */ "../reflex/src/internal/Fireable.js");

/**
 * @imports
 */




/**
 * ---------------------------
 * The Firebase class
 * ---------------------------
 */

/* harmony default export */ __webpack_exports__["default"] = (class {
	
	/**
	 * Initializes the instance.
	 *
	 * @return void
	 */
	constructor() {
		this.fireables = [];
		this.currentlyFiringEvents = [];
	}
	
	/**
	 * Adds an Fireable instance
	 * with optional tags.
	 *
	 * @param Fireable			fireable
	 *
	 * @return Fireable
	 */
	addFireable(fireable) {
		this.fireables.push(fireable);
		return fireable;
	}
	
	/**
	 * Removes an Fireable instance
	 * with optional tags.
	 *
	 * @param Fireable			fireable
	 * @param array				tags
	 *
	 * @return void
	 */
	removeFireable(fireable, tags = []) {
		this.fireables = this.fireables.filter(_fireable => _fireable !== fireable);
	}
	
	/**
	 * Finds the Observer instances
	 * with the given query parameters.
	 *
	 * @param object			query
	 *
	 * @return array
	 */
	findFireables(query) {
		return this.fireables.filter(observer => {
			return (!query.handler || observer.handler === query.handler) && (!query.params || (
				(!query.params.type || observer.params.type === query.params.type)
				&& (!query.params.tags || Object(_web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(observer.params.tags || [], query.params.tags).length === query.params.tags.length)
			));
		});
	}
	
	/**
	 * Create an object's firebase.
	 *
	 * @param array|object	object
	 * @param string		type
	 *
	 * @return Firebase
	 */
	static createForTarget (object, type, Base) {
		if (object && Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object)) {
			var firebases;
			if (!(firebases = object[firebaseKey])) {
				firebases = {};
				Object.defineProperty(object, firebaseKey, {
					get:() => firebases,
					set:value => {
						if (value !== firebases) {
							throw new Error('Attempt to overwrite the "' + firebaseKey + '" special property!');
						}
					},
					enumerable:false,
				});
			}
			firebases[type] = type === 'listeners' ? new Base(object) : new Base;
			return firebases[type];
		}
	}
	
	/**
	 * Returns an object's firebase.
	 *
	 * @param array|object	object
	 * @param string		type
	 *
	 * @return Firebase
	 */
	static getForTarget(object, type) {
		var firebases;
		if (object && Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object) && (firebases = object[firebaseKey])) {
			return firebases[type];
		}
	}
});;

/**
 * @var string
 */
const firebaseKey = '< r e f l e x >';


/***/ }),

/***/ "../reflex/src/internal/Listener.js":
/*!******************************************!*\
  !*** ../reflex/src/internal/Listener.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Fireable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fireable.js */ "../reflex/src/internal/Fireable.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * The Listener class
 * ---------------------------
 */				
/* harmony default export */ __webpack_exports__["default"] = (class extends _Fireable_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	
	/**
	 * Initializes the instance.
	 *
	 * @param function		handler
	 * @param object		params
	 *
	 * @return void
	 */
	constructor(handler, params = {}) {
		super();
		this.handler = handler;
		this.params = params;

	}

	/**
	 * Calls the observer's handler function
	 * on matching with the event's fields.
	 *
	 * @param MutationEvent			 	evt
	 *
	 * @return void
	 */
	fire(evt) {
		if (this.params.type === evt.type) {
			evt.response(this.handler.call(this.target, evt.e));
		}
	}
});;

/***/ }),

/***/ "../reflex/src/internal/ListenerBase.js":
/*!**********************************************!*\
  !*** ../reflex/src/internal/ListenerBase.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListenerBase; });
/* harmony import */ var _Firebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Firebase.js */ "../reflex/src/internal/Firebase.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * The ListenerBase class
 * ---------------------------
 */				
class ListenerBase extends _Firebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	
	/**
	 * Fires all observers with the given evt (change).
	 *
	 * @param Event				evt
	 *
	 * @return Event
	 */
	fire(evt) {
		this.fireables.forEach(listener => {
			if (evt.propagationStopped) {
				return;
			}
			listener.fire(evt);
		});
		return evt;
	}
	
	/**
	 * @inheritdoc
	 */
	static createForTarget(object, Static = ListenerBase) {
		return super.createForTarget(object, 'listeners', Static);
	}
	
	/**
	 * @inheritdoc
	 */
	static getForTarget(object) {
		return super.getForTarget(object, 'listeners');
	}
};

/***/ }),

/***/ "../reflex/src/internal/MutationEvent.js":
/*!***********************************************!*\
  !*** ../reflex/src/internal/MutationEvent.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/even.js */ "../reflex/node_modules/@web-native-js/commons/obj/even.js");
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event.js */ "../reflex/src/internal/Event.js");

/**
 * @imports
 */



/**
 * ---------------------------
 * The MutationEvent class
 * ---------------------------
 */

/* harmony default export */ __webpack_exports__["default"] = (class extends _Event_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	
	/**
	 * Initializes the instance.
	 *
	 * @param array|object		target
	 * @param object			details
	 *
	 * @return void
	 */
	constructor(target, details = {}) {
		if (details.data) {
			details.fields = Object.keys(details.data);
		}
		super(target, details);
		// -----------------------
		if (this.srcEvt) {
			this.dataEven = this.srcEvt.dataEven;
			this.originatingTarget = this.srcEvt.originatingTarget;
			this.originatingType = this.srcEvt.originatingType;
			this.originatingFields = [];
			this.originatingData = {};
			this._originatingData = {};
			var field = this.fields[0];
			Object.keys(this.srcEvt.originatingData).forEach(path => {
				var _path = field + '.' + path;
				this.originatingFields.push(_path);
				this.originatingData[_path] = this.srcEvt.originatingData[path];
				this._originatingData[_path] = this.srcEvt._originatingData[path];
			});
			this.originatingCreated = this.srcEvt.originatingCreated;
			this.originatingDeleted = this.srcEvt.originatingDeleted;
		} else {
			this.dataEven = Object(_web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.data, this._data);
			this.originatingTarget = this.target;
			this.originatingType = this.type;
			this.originatingFields = this.fields;
			this.originatingData = this.data;
			this._originatingData = this._data;
			this.originatingCreated = this.created;
			this.originatingDeleted = this.deleted;
		}
	}
});;

/***/ }),

/***/ "../reflex/src/internal/Observer.js":
/*!******************************************!*\
  !*** ../reflex/src/internal/Observer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_crossJoin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/crossJoin.js */ "../reflex/node_modules/@web-native-js/commons/arr/crossJoin.js");
/* harmony import */ var _web_native_js_commons_arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/pushUnique.js */ "../reflex/node_modules/@web-native-js/commons/arr/pushUnique.js");
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_str_after_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/str/after.js */ "../reflex/node_modules/@web-native-js/commons/str/after.js");
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../reflex/node_modules/@web-native-js/commons/js/isString.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _web_native_js_commons_obj_get_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web-native-js/commons/obj/get.js */ "../reflex/node_modules/@web-native-js/commons/obj/get.js");
/* harmony import */ var _Fireable_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Fireable.js */ "../reflex/src/internal/Fireable.js");
/* harmony import */ var _MutationEvent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MutationEvent.js */ "../reflex/src/internal/MutationEvent.js");
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../get.js */ "../reflex/src/get.js");

/**
 * @imports
 */











/**
 * ---------------------------
 * The Observer class
 * ---------------------------
 */

/* harmony default export */ __webpack_exports__["default"] = (class extends _Fireable_js__WEBPACK_IMPORTED_MODULE_7__["default"] {
	
	/**
	 * Initializes the instance.
	 *
	 * @param function		handler
	 * @param string|array	fields
	 * @param object		params
	 *
	 * @return void
	 */
	constructor(handler, fields = null, params = {}) {
		super();
		this.handler = handler;
		this.fields = fields;
		this.params = params;
		// -----------------------
		this.fieldsArray = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.fields);
		this.isDynamicField = this.fieldsArray.filter(
			field => field.indexOf('..') > -1 || field.startsWith('.') || field.endsWith('.')
		).length;
		if (this.isDynamicField && this.fieldsArray.length > 1) {
			throw new Error('Only one "Dynamic Field" must be observed at a time! "' + this.fieldsArray.join(', ') + '" have been bound together.');
		}

	}
	
	/**
	 * Calls the observer's handler function
	 * on matching with the event's fields.
	 *
	 * @param MutationEvent			 	evt
	 *
	 * @return void
	 */
	fire(evt) {
		if (this.disconnected || (this.params.type && this.params.type !== evt.type)) {
			return;
		}
		if (evt.dataEven && this.params.diff !== false) {
			return;
		}
		this.fireCallback(evt, fields => {
			if (fields) {
				// Call listener...
				var data = [];
				var _data = [];
				if (this.params.data !== false) {
					fields.forEach(field => {
						// --------------------------
						// The NEW/OLD values of the change of field which could be a path
						var fieldData = evt.originatingFields.reduce((fieldData, originatingField) => {
							// So field is the exact originatingField path?
							var value = evt.originatingData[originatingField];
							var _value = evt._originatingData[originatingField];
							if (!fieldData && field === originatingField) {
								return [value, _value];
							}
							// Field matches, but is deeper than, originatingField path?
							if (!fieldData && (field + '.').startsWith((originatingField + '.'))) {
								var fieldQuery = Object(_web_native_js_commons_str_after_js__WEBPACK_IMPORTED_MODULE_3__["default"])(field, originatingField + '.');
								return [
									// Notice we're using _commonsGet to dig the path
									// but with reflexGet as trap for "reactive getting"
									Object(_web_native_js_commons_obj_get_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value, fieldQuery.split('.'), {get:_get_js__WEBPACK_IMPORTED_MODULE_9__["default"]}),
									Object(_web_native_js_commons_obj_get_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_value, fieldQuery.split('.'), {get:_get_js__WEBPACK_IMPORTED_MODULE_9__["default"]})
								];
							}
							return fieldData;
						}, null);
						// --------------------------
						if (fieldData) {
							data.push(fieldData.shift());
							_data.push(fieldData.shift());
						} else {
							var currentValue = Object(_web_native_js_commons_obj_get_js__WEBPACK_IMPORTED_MODULE_6__["default"])(evt.target, Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(field) ? field.split('.') : field, {get:_get_js__WEBPACK_IMPORTED_MODULE_9__["default"]});
							data.push(currentValue);
							_data.push(currentValue);
						}
					});
				}
				return Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(this.fields) // NOTE:we're asking the original format!
					? evt.response(this.handler(data, _data, evt))
					: evt.response(this.handler(data[0], _data[0], evt));
			}
			var data = {};
			var _data = {};
			evt.fields.forEach(field => {
				// Remeber that evt.originatingData might actually be bubbling
				// in which case we don't expect to see eventName key.
				var currentValue = field in evt.data 
					? evt.data[field] 
					: Object(_get_js__WEBPACK_IMPORTED_MODULE_9__["default"])(evt.target, field);
				var prevValue = field in evt._data
					? evt._data[field] 
					: currentValue;
				data[field] = currentValue;
				_data[field] = prevValue;
			});
			// Call listener...
			return evt.response(this.handler(data, _data, evt));
		});
	}
	
	/**
	 * Validates a proposed fire operation.
	 *
	 * @param MutationEvent		 	evt
	 *
	 * @return bool
	 */
	fireCallback(evt, callback) {
		if (this.fieldsArray.length) {
			var dynamicFieldOutcomes = [];
			var matches = this.fieldsArray.filter((observedField, i) => {
				observedField = Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(observedField) 
					? observedField.replace(/`/g, '')
					: observedField;
				dynamicFieldOutcomes[i] = [];
				// one observedField can turn out to be two if dynamic
				// and evt.originatingFields is multiple
				return evt.originatingFields.filter(inputOriginatingField => {
					var inputOriginatingFieldSplit = inputOriginatingField.split('.');
					var observedDynamicFieldOutcome = this.isDynamicField 
						? observedField.split('.').map((seg, k) => seg || inputOriginatingFieldSplit[k] || '').join('.')
						: observedField;
					Object(_web_native_js_commons_arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dynamicFieldOutcomes[i], observedDynamicFieldOutcome);
					return (observedDynamicFieldOutcome === inputOriginatingField && !evt.srcEvt
						|| (this.params.observeUp !== false && (observedDynamicFieldOutcome + '.').startsWith(inputOriginatingField + '.'))
						|| (this.params.observeDown && (inputOriginatingField + '.').startsWith(observedDynamicFieldOutcome + '.'))
					) && (!this.isDynamicField || !observedDynamicFieldOutcome.split('.').filter(seg => !seg).length);
				}).length;
			}).length;
			if (matches) {
				Object(_web_native_js_commons_arr_crossJoin_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dynamicFieldOutcomes).forEach(callback);
			}
		} else if (!evt.srcEvt || this.params.observeDown) {
			callback();
		}
	}
});;

/***/ }),

/***/ "../reflex/src/internal/ObserverBase.js":
/*!**********************************************!*\
  !*** ../reflex/src/internal/ObserverBase.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ObserverBase; });
/* harmony import */ var _web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/even.js */ "../reflex/node_modules/@web-native-js/commons/obj/even.js");
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/intersect.js */ "../reflex/node_modules/@web-native-js/commons/arr/intersect.js");
/* harmony import */ var _web_native_js_commons_arr_concatUnique_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/arr/concatUnique.js */ "../reflex/node_modules/@web-native-js/commons/arr/concatUnique.js");
/* harmony import */ var _web_native_js_commons_arr_exclude_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/arr/exclude.js */ "../reflex/node_modules/@web-native-js/commons/arr/exclude.js");
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../reflex/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _web_native_js_commons_js_isNull_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web-native-js/commons/js/isNull.js */ "../reflex/node_modules/@web-native-js/commons/js/isNull.js");
/* harmony import */ var _MutationEvent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MutationEvent.js */ "../reflex/src/internal/MutationEvent.js");
/* harmony import */ var _Firebase_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Firebase.js */ "../reflex/src/internal/Firebase.js");

/**
 * @imports
 */










/**
 * ---------------------------
 * The Reactive class
 * ---------------------------
 */

class ObserverBase extends _Firebase_js__WEBPACK_IMPORTED_MODULE_8__["default"] {
	
	/**
	 * Finds the Observer instances
	 * with the given query parameters.
	 *
	 * @param object			query
	 *
	 * @return array
	 */
	findFireables(query) {
		return super.findFireables(query).filter(observer => {
			return Object(_web_native_js_commons_js_isNull_js__WEBPACK_IMPORTED_MODULE_6__["default"])(query.fields) || Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(query.fields) || Object(_web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_1__["default"])(observer.fields), Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query.fields));
		});
	}
	
	/**
	 * Fires all observers with the given evt (change).
	 *
	 * @param Event				evt
	 *
	 * @return Event
	 */
	fire(evt) {
		if (this.currentlyFiringEvents.filter(e => e.type === evt.type && e.fields === evt.fields).length) {
			return evt;
		}
		this.currentlyFiringEvents.push(evt);
		this.fireables.forEach(observer => {
			if (evt.propagationStopped || (observer.params.type && observer.params.type !== evt.type)) {
				return;
			}
			observer.fire(evt);
		});
		this.currentlyFiringEvents.pop();
		return evt;
	}
	
	/**
	 * @inheritdoc
	 */
	static createForTarget(object) {
		return super.createForTarget(object, 'observers', ObserverBase);
	}
	
	/**
	 * @inheritdoc
	 */
	static getForTarget(object) {
		return super.getForTarget(object, 'observers');
	}
};

/***/ }),

/***/ "../reflex/src/internal/QueryEvent.js":
/*!********************************************!*\
  !*** ../reflex/src/internal/QueryEvent.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event.js */ "../reflex/src/internal/Event.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * The QueryEvent class
 * ---------------------------
 */

/* harmony default export */ __webpack_exports__["default"] = (class extends _Event_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	
	/**
	 * Initializes the instance.
	 *
	 * @param array|object		target
	 * @param object			details
	 *
	 * @return void
	 */
	constructor(target, details = {}) {
		super(target, details);
	}
});;

/***/ }),

/***/ "../reflex/src/internal/Trap.js":
/*!**************************************!*\
  !*** ../reflex/src/internal/Trap.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../reflex/node_modules/@web-native-js/commons/arr/from.js");
/* harmony import */ var _QueryEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryEvent.js */ "../reflex/src/internal/QueryEvent.js");
/* harmony import */ var _Fireable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Fireable.js */ "../reflex/src/internal/Fireable.js");

/**
 * @imports
 */




/**
 * ---------------------------
 * The Trap class
 * ---------------------------
 */

/* harmony default export */ __webpack_exports__["default"] = (class extends _Fireable_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	
	/**
	 * Initializes the instance.
	 *
	 * @param function		handler
	 * @param object		params
	 *
	 * @return void
	 */
	constructor(handler, params = {}) {
		super();
		this.handler = handler;
		this.params = params;

	}
	
	/**
	 * Calls the observer's handler function
	 * on matching with the event's fields.
	 *
	 * @param MutationEvent			 	evt
	 * @param function					next
	 * @param mixed					 	recieved
	 *
	 * @return void
	 */
	fire(evt, next, recieved) {
		if (this.disconnected || (this.params.type && this.params.type !== evt.type)) {
			return next(...Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arguments).slice(2));
		}
		return this.handler(evt, recieved, next);
	}
});;

/***/ }),

/***/ "../reflex/src/internal/TrapBase.js":
/*!******************************************!*\
  !*** ../reflex/src/internal/TrapBase.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TrapBase; });
/* harmony import */ var _web_native_js_commons_obj_even_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/even.js */ "../reflex/node_modules/@web-native-js/commons/obj/even.js");
/* harmony import */ var _QueryEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryEvent.js */ "../reflex/src/internal/QueryEvent.js");
/* harmony import */ var _Firebase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Firebase.js */ "../reflex/src/internal/Firebase.js");
/* harmony import */ var _Trap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Trap.js */ "../reflex/src/internal/Trap.js");

/**
 * @imports
 */





/**
 * ---------------------------
 * The Reactive class
 * ---------------------------
 */

class TrapBase extends _Firebase_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	
	/**
	 * Fires all observers with the given evt (change).
	 *
	 * @param Event				evt
	 * @param function			defaultHandler
	 *
	 * @return mixed
	 */
	fire(evt, defaultHandler = null) {
		if (this.currentlyFiringEvents.filter(e => e.type === evt.type && e.query === evt.query).length) {
			return defaultHandler ? defaultHandler() : undefined;
		}
		this.currentlyFiringEvents.push(evt);
		const next = (index, ..._args) => {
			var trap = this.fireables[index];
			if (trap) {
				return trap.fire(evt, (...args) => {
					return next(index + 1, ...args);
				}/*next*/, ..._args);
			}
			return defaultHandler ? defaultHandler(..._args) : _args[0];
		};
		var value = next(0);
		this.currentlyFiringEvents.pop();
		return value;
	}
	
	/**
	 * @inheritdoc
	 */
	static createForTarget(object) {
		return super.createForTarget(object, 'traps', TrapBase);
	}
	
	/**
	 * @inheritdoc
	 */
	static getForTarget(object) {
		return super.getForTarget(object, 'traps');
	}
};

/***/ }),

/***/ "../reflex/src/keys.js":
/*!*****************************!*\
  !*** ../reflex/src/keys.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getProps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getProps.js */ "../reflex/src/_getProps.js");

/**
 * @imports
 */


/**
 * Runs a "keys" query operation on a target.
 * Fires any such query observers that may be bound to target.
 *
 * @param array|object	target
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target) {
	return Object(_getProps_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false/*ownKeys*/, ...arguments);
});


/***/ }),

/***/ "../reflex/src/link.js":
/*!*****************************!*\
  !*** ../reflex/src/link.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_obj_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/from.js */ "../reflex/node_modules/@web-native-js/commons/obj/from.js");
/* harmony import */ var _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/MutationEvent.js */ "../reflex/src/internal/MutationEvent.js");
/* harmony import */ var _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/ObserverBase.js */ "../reflex/src/internal/ObserverBase.js");
/* harmony import */ var _observe_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./observe.js */ "../reflex/src/observe.js");

/**
 * @imports
 */





/**
 * Bubble helper
 *
 * @param array|object	target
 * @param string		field
 * @param array|object	object
 *
 * @return void
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target, field, object) {
	var firebase;
	Object(_observe_js__WEBPACK_IMPORTED_MODULE_3__["default"])(object, (entries, _entries, e) => {
		if (firebase = _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].getForTarget(target)) {
			var base = Object(_web_native_js_commons_obj_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(field, object);
			return firebase.fire(new _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"](target, {type:e.type, bubbling:true, data:base, _data:base, srcEvt:e}));
		}
	}, {observeDown:true, tags:['#e-bubbling', field, target]});
});


/***/ }),

/***/ "../reflex/src/observe.js":
/*!********************************!*\
  !*** ../reflex/src/observe.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../reflex/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _web_native_js_commons_js_getType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/getType.js */ "../reflex/node_modules/@web-native-js/commons/js/getType.js");
/* harmony import */ var _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/ObserverBase.js */ "../reflex/src/internal/ObserverBase.js");
/* harmony import */ var _internal_Observer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/Observer.js */ "../reflex/src/internal/Observer.js");

/**
 * @imports
 */






/**
 * Adds an observer to an object's firebase.
 *
 * @param array|object				object
 * @param string|array|function		fields
 * @param function					callback
 * @param object					params
 *
 * @return Observer
 */
/* harmony default export */ __webpack_exports__["default"] = (function(object, fields, callback = null, params = {}) {
	if (!object || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object)) {
		throw new Error('Object must be of type object!');
	}
	if (Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fields)) {
		params = arguments.length > 2 ? callback : {};
		callback = fields;
		fields = null;
	}
	if (!Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_0__["default"])(callback)) {
		throw new Error('Callback must be a function; "' + Object(_web_native_js_commons_js_getType_js__WEBPACK_IMPORTED_MODULE_2__["default"])(callback) + '" given!');
	}
	var firebase;
	if (!(firebase = _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_3__["default"].getForTarget(object))) {
		firebase = _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_3__["default"].createForTarget(object);
	}
	return firebase.addFireable(new _internal_Observer_js__WEBPACK_IMPORTED_MODULE_4__["default"](callback, fields, params));
});


/***/ }),

/***/ "../reflex/src/off.js":
/*!****************************!*\
  !*** ../reflex/src/off.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_ListenerBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/ListenerBase.js */ "../reflex/src/internal/ListenerBase.js");

/**
 * @imports
 */


/**
 * Unbinds listeners from an element's event controller.
 *
 * @param array|object 				object
 * @param string		 			type
 * @param function		 			originalCallback
 * @param object					params
 *
 * @return void
 */
/* harmony default export */ __webpack_exports__["default"] = (function(object, type, originalCallback = null, params = {}) {
	var firebase;
	if (firebase = _internal_ListenerBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].getForTarget(object)) {
		firebase.findFireables({handler:originalCallback, type, params}).forEach(listener => {
			firebase.removeFireable(listener);
		});
	}
});;

/***/ }),

/***/ "../reflex/src/on.js":
/*!***************************!*\
  !*** ../reflex/src/on.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/merge.js */ "../reflex/node_modules/@web-native-js/commons/obj/merge.js");
/* harmony import */ var _internal_ListenerBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/ListenerBase.js */ "../reflex/src/internal/ListenerBase.js");
/* harmony import */ var _internal_Listener_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/Listener.js */ "../reflex/src/internal/Listener.js");

/**
 * @imports
 */




/**
 * Binds listeners to an element's event controller.
 *
 * @param array|object 				object
 * @param string		 			type
 * @param function		 			callback
 * @param object					params
 *
 * @return object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(object, type, callback, params = {}) {
	var firebase;
	if (!(firebase = _internal_ListenerBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].getForTarget(object))) {
		firebase = _internal_ListenerBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].createForTarget(object);
	}
	return firebase.addFireable(new _internal_Listener_js__WEBPACK_IMPORTED_MODULE_2__["default"](callback, Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, {type})));
});;

/***/ }),

/***/ "../reflex/src/ownKeys.js":
/*!********************************!*\
  !*** ../reflex/src/ownKeys.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getProps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getProps.js */ "../reflex/src/_getProps.js");

/**
 * @imports
 */


/**
 * Runs a "ownKeys" query operation on a target.
 * Fires any such query observers that may be bound to target.
 *
 * @param array|object	target
 *
 * @return array
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target) {
	return Object(_getProps_js__WEBPACK_IMPORTED_MODULE_0__["default"])(true/*ownKeys*/, ...arguments);
});


/***/ }),

/***/ "../reflex/src/set.js":
/*!****************************!*\
  !*** ../reflex/src/set.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setProp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setProp.js */ "../reflex/src/_setProp.js");

/**
 * @imports
 */


/**
 * Executes a "set" operation on a target.
 * Fires any observers that may be bound to target.
 *
 * @param array|object	target
 * @param string|array	keysOrPayload
 * @param mixed			value
 * @param bool			returnEvent
 *
 * @return bool|Event
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target, keysOrPayload, value = null, returnEvent = false) {
	return Object(_setProp_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false/*define*/, ...arguments);
});


/***/ }),

/***/ "../reflex/src/transaction.js":
/*!************************************!*\
  !*** ../reflex/src/transaction.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_obj_copy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/copy.js */ "../reflex/node_modules/@web-native-js/commons/obj/copy.js");
/* harmony import */ var _web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/obj/merge.js */ "../reflex/node_modules/@web-native-js/commons/obj/merge.js");
/* harmony import */ var _web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/unique.js */ "../reflex/node_modules/@web-native-js/commons/arr/unique.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../reflex/node_modules/@web-native-js/commons/js/isArray.js");
/* harmony import */ var _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/MutationEvent.js */ "../reflex/src/internal/MutationEvent.js");
/* harmony import */ var _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/ObserverBase.js */ "../reflex/src/internal/ObserverBase.js");
/* harmony import */ var _unlink_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./unlink.js */ "../reflex/src/unlink.js");
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./link.js */ "../reflex/src/link.js");

/**
 * @imports
 */










/**
 * Executes a callback function on a target in "transaction" mode.
 * Fires any observers that may be bound to target on recorded changes.
 *
 * @param array			targets
 * @param function		callback
 * @param array			keys
 * @param bool			returnEvent
 *
 * @return array|Event
 */
/* harmony default export */ __webpack_exports__["default"] = (function(targets, callback, keys = [], returnEvent = false) {
	var context = targets.map((target, i) => {
		if (!target || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)) {
			throw new Error('Target must be of type object!');
		}
		return {
			target,
			targetCopy: Object(_web_native_js_commons_obj_copy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, keys),
			setData: {},
			_setData: {},
			delData: {}, 
			_delData: {},
			created: [],
			deleted: [],
		};
	});
	// ---------------------------------
	var result = callback(...targets);
	// ---------------------------------
	context.map(cntxt => {
		var initialKeys = Object.keys(cntxt.targetCopy);
		var currentKeys = Object.keys(cntxt.target);
		var changedKeys = Object(_web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_2__["default"])(initialKeys.concat(currentKeys)).filter(key => {
			if ((keys.length && !keys.includes(key)) 
			|| (Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(cntxt.target) && (key === 'length' || key === '< r e f l e x >'))) {
				return;
			}
			if (!currentKeys.includes(key)) {
				cntxt._delData[key] = cntxt.targetCopy[key];
				cntxt.delData[key] = undefined;
				cntxt.deleted.push(key);
			} else {
				cntxt._setData[key] = cntxt.targetCopy[key];
				cntxt.setData[key] = cntxt.target[key];
				if (!initialKeys.includes(key)) {
					cntxt.created.push(key);
				} 
			}
			if (cntxt.targetCopy[key] !== cntxt.target[key]) {
				// Unobserve outgoing value for bubbling
				if (cntxt.targetCopy[key] && Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cntxt.targetCopy[key])) {
					Object(_unlink_js__WEBPACK_IMPORTED_MODULE_7__["default"])(cntxt.target, key, cntxt.targetCopy[key]);
				}
				// Observe incoming value for bubbling
				if (cntxt.target[key] && Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cntxt.target[key])) {
					Object(_link_js__WEBPACK_IMPORTED_MODULE_8__["default"])(cntxt.target, key, cntxt.target[key]);
				}
				return true;
			}
			delete cntxt.setData[key];
			delete cntxt._setData[key];
		});
		// ---------------------------------
		var evt, mutationBase;
		if ((mutationBase = _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_6__["default"].getForTarget(cntxt.target)) || returnEvent) {
			evt = new _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_5__["default"](cntxt.target, {
				type:'transaction', 
				data:Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cntxt.setData, cntxt.delData),
				_data:Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cntxt._setData, cntxt._delData),
				created:cntxt.created,
				deleted:cntxt.deleted
			});
			if (mutationBase) {
				if (Object.keys(cntxt.delData).length) {
					evt.response(mutationBase.fire(
						new _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_5__["default"](cntxt.target, {type:'del', data:cntxt.delData, _data:cntxt._delData, deleted:cntxt.deleted})
					));
				}
				if (Object.keys(cntxt.setData).length) {
					evt.response(mutationBase.fire(
						new _internal_MutationEvent_js__WEBPACK_IMPORTED_MODULE_5__["default"](cntxt.target, {type:'set', data:cntxt.setData, _data:cntxt._setData, created:cntxt.created})
					));
				}
			}
		}
		return returnEvent ? evt : changedKeys;
	});
	return result;
});


/***/ }),

/***/ "../reflex/src/trap.js":
/*!*****************************!*\
  !*** ../reflex/src/trap.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../reflex/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _web_native_js_commons_js_getType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/getType.js */ "../reflex/node_modules/@web-native-js/commons/js/getType.js");
/* harmony import */ var _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/TrapBase.js */ "../reflex/src/internal/TrapBase.js");
/* harmony import */ var _internal_Trap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/Trap.js */ "../reflex/src/internal/Trap.js");

/**
 * @imports
 */






/**
 * Adds a trap to an object's firebase.
 *
 * @param array|object				object
 * @param function					callback
 * @param object					params
 *
 * @return Trap
 */
/* harmony default export */ __webpack_exports__["default"] = (function(object, callback, params = {}) {
	if (!object || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object)) {
		throw new Error('Object must be of type object!');
	}
	if (!Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_0__["default"])(callback)) {
		throw new Error('Callback must be a function; "' + Object(_web_native_js_commons_js_getType_js__WEBPACK_IMPORTED_MODULE_2__["default"])(callback) + '" given!');
	}
	var firebase;
	if (!(firebase = _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_3__["default"].getForTarget(object))) {
		firebase = _internal_TrapBase_js__WEBPACK_IMPORTED_MODULE_3__["default"].createForTarget(object);
	}
	return firebase.addFireable(new _internal_Trap_js__WEBPACK_IMPORTED_MODULE_4__["default"](callback, params));
});


/***/ }),

/***/ "../reflex/src/trigger.js":
/*!********************************!*\
  !*** ../reflex/src/trigger.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/obj/merge.js */ "../reflex/node_modules/@web-native-js/commons/obj/merge.js");
/* harmony import */ var _internal_ListenerBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/ListenerBase.js */ "../reflex/src/internal/ListenerBase.js");
/* harmony import */ var _internal_Event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/Event.js */ "../reflex/src/internal/Event.js");

/**
 * @imports
 */




/**
 * Fires an event on an object's listenerBase.
 *
 * @param array|object 			object
 * @param string                type
 * @param object                data
 *
 * @return Event
 */
/* harmony default export */ __webpack_exports__["default"] = (function(object, type, data = {}) {
	var firebase;
	if (firebase = _internal_ListenerBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].getForTarget(object)) {
		return firebase.fire(new _internal_Event_js__WEBPACK_IMPORTED_MODULE_2__["default"](object, Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_0__["default"])(data, {type})));
	}
});;

/***/ }),

/***/ "../reflex/src/unlink.js":
/*!*******************************!*\
  !*** ../reflex/src/unlink.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unobserve_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unobserve.js */ "../reflex/src/unobserve.js");

/**
 * @imports
 */


/**
 * Unbubble helper
 *
 * @param array|object	target
 * @param string		field
 * @param array|object	object
 *
 * @return void
 */
/* harmony default export */ __webpack_exports__["default"] = (function(target, field, object) {
	Object(_unobserve_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, null, {tags:['#e-bubbling', field, target]});
});


/***/ }),

/***/ "../reflex/src/unobserve.js":
/*!**********************************!*\
  !*** ../reflex/src/unobserve.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isNull_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isNull.js */ "../reflex/node_modules/@web-native-js/commons/js/isNull.js");
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../reflex/node_modules/@web-native-js/commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isUndefined.js */ "../reflex/node_modules/@web-native-js/commons/js/isUndefined.js");
/* harmony import */ var _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/ObserverBase.js */ "../reflex/src/internal/ObserverBase.js");

/**
 * @imports
 */






/**
 * Removes an observer from an object's firebase.
 *
 * @param array|object				object
 * @param string|array|function		fields
 * @param function					originalCallback
 * @param object					params
 *
 * @return void
 */
/* harmony default export */ __webpack_exports__["default"] = (function(object, fields, originalCallback = null, params = {}) {
	if (!object || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object)) {
		throw new Error('Object must be of type object!');
	}
	if (Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fields) || Object(_web_native_js_commons_js_isNull_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fields) || Object(_web_native_js_commons_js_isUndefined_js__WEBPACK_IMPORTED_MODULE_3__["default"])(fields)) {
		params = arguments.length > 2 ? originalCallback : {};
		originalCallback = fields;
		fields = null;
	}
	var firebase;
	if (firebase = _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_4__["default"].getForTarget(object)) {
		firebase.findFireables({handler:originalCallback, fields, params}).forEach(observer => {
			firebase.removeFireable(observer);
		});
	}
});


/***/ }),

/***/ "../reflex/src/untrap.js":
/*!*******************************!*\
  !*** ../reflex/src/untrap.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../reflex/node_modules/@web-native-js/commons/js/isTypeObject.js");
/* harmony import */ var _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/ObserverBase.js */ "../reflex/src/internal/ObserverBase.js");

/**
 * @imports
 */



/**
 * Removes a trap from an object's firebase.
 *
 * @param array|object				object
 * @param function					originalCallback
 * @param object					params
 *
 * @return void
 */
/* harmony default export */ __webpack_exports__["default"] = (function(object, originalCallback = null, params = {}) {
	if (!object || !Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object)) {
		throw new Error('Object must be of type object!');
	}
	var firebase;
	if (firebase = _internal_ObserverBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].getForTarget(object)) {
		firebase.findFireables({handler:originalCallback, params}).forEach(trap => {
			firebase.removeFireable(trap);
		});
	}
});


/***/ }),

/***/ "./src/Chtml.js":
/*!**********************!*\
  !*** ./src/Chtml.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Chtml; });
/* harmony import */ var _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/jsen */ "../jsen/src/index.js");
/* harmony import */ var _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/reflex */ "../reflex/src/index.js");
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isTypeObject.js */ "../commons/js/isTypeObject.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../commons/js/isArray.js");
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../commons/js/isString.js");
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @web-native-js/commons/js/isNumeric.js */ "../commons/js/isNumeric.js");
/* harmony import */ var _web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @web-native-js/commons/arr/unique.js */ "../commons/arr/unique.js");
/* harmony import */ var _web_native_js_commons_arr_following_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @web-native-js/commons/arr/following.js */ "../commons/arr/following.js");
/* harmony import */ var _web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @web-native-js/commons/str/before.js */ "../commons/str/before.js");
/* harmony import */ var _web_native_js_commons_str_beforeLast_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @web-native-js/commons/str/beforeLast.js */ "../commons/str/beforeLast.js");
/* harmony import */ var _core_createElement_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core/createElement.js */ "./src/core/createElement.js");
/* harmony import */ var _composing_defineBundleElements_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./composing/defineBundleElements.js */ "./src/composing/defineBundleElements.js");
/* harmony import */ var _composing_defineImportElements_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./composing/defineImportElements.js */ "./src/composing/defineImportElements.js");
/* harmony import */ var _composing_createBundleMatrix_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./composing/createBundleMatrix.js */ "./src/composing/createBundleMatrix.js");
/* harmony import */ var _composing_parseNamespace_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./composing/parseNamespace.js */ "./src/composing/parseNamespace.js");
/* harmony import */ var _composing_recompose_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./composing/recompose.js */ "./src/composing/recompose.js");
/* harmony import */ var _Directives_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Directives.js */ "./src/Directives.js");
/* harmony import */ var _core_Core_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./core/Core.js */ "./src/core/Core.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./params.js */ "./src/params.js");

/**
 * @imports
 */






















/**
 * ---------------------------
 * The Chtml class
 * ---------------------------
 */				

class Chtml extends _core_Core_js__WEBPACK_IMPORTED_MODULE_19__["default"] {

	/**
	 * @inheritdoc
	 */
	constructor(el, params = {}) {
		super(el, params);

		// Create the factory used in Core
		this.params.factory = this.constructor.from;
		
		// ------------------
		// Auto-imported elements
		// ------------------
		this.el.addEventListener('imported', e => {
			this.params.factory(e.target);
			e.stopImmediatePropagation();
		});

		// ------------
		// NAMESPACE
		// ------------
		
		const namespaceParse = Object(_composing_parseNamespace_js__WEBPACK_IMPORTED_MODULE_16__["default"])(el.getAttribute(_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].attrMap.namespace) || '');
		Object.defineProperty(this, 'namespace', {value:namespaceParse.namespace, enumerable:true,});
		
		// ------------
		// MIRROR
		// ------------
		
		_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].init(this, _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bindingProperty);
		// Setup mirror
		_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].observe(this, _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bindingProperty, (data, _data, e) => {
			if (namespaceParse.subnamespace) {
				if (Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(data) && data) {
					// Mirror
					_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].observe(data, changes => {
						return this.populate(data, namespaceParse.subnamespace, _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].remodelCallback);
					}, {tags:['#mirror', this]});
				}
				if (Object(_web_native_js_commons_js_isTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_data) && _data) {
					// Unmirror
					_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].unobserve(_data, null, null, {tags:['#mirror', this]});
				}
				// Initial Sync...
				return this.populate(data || {}, namespaceParse.subnamespace, _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].remodelCallback);
			}
		});
		
		// ------------
		// DIRECTIVES
		// ------------
		
		const directives = [];
		_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].defineProperty(this, 'directives', {value:directives, enumerable:true,});
		// ---------------------------------
		// ---------------------------------
		// evaluationContext will be "this" as main context, and params.env as super context
		var localContext = {};
		var superContext = this.params.env;
		var evaluationContext = new _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__["Contexts"](this, superContext, localContext);
		// Descendants will recieve my localContext and superContext
		this.descendantParams.env = new _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__["Contexts"](localContext, superContext);
		// ---------------------------------
		// ---------------------------------
		// Stringifies JSEN vars
		var stringifyEach = list => Object(_web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_8__["default"])(list.map(expr => Object(_web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_10__["default"])(expr.toString(), '['), '(')));
		// We handle directives as they make entry
		_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].observe(this.directives, (entries, exits, e) => {
			Object.keys(entries).forEach(k => {
				// ------------
				// Unbind exits
				if (exits[k]) {
					_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].unobserve(this, null, null, {tags:['#directive', exits[k]],});
				}
				// ------------
				// Bind entries
				if (entries[k]) {
					if (this.autoEval !== false) {
						entries[k].eval(evaluationContext, _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"]);
					}
					_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].observe(this, stringifyEach(entries[k].meta.vars), (newState, oldState, e) => {
						var evalReturn = entries[k].eval(evaluationContext, _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"]);
						// If the result of this evaluation is false,
						// e.stopPropagation will be called and subsequent expressions
						// will not be evaluated. So we must not allow false to be returned.
						// All expressions are meant to be evaluated in parallel, independent of each other.
						if (evalReturn !== false) {
							return evalReturn;
						}
					}, {data: false, tags:['#directive', entries[k]]});
				}
			});
		});
		// ------------
		setTimeout(() => {
			if (this.dataBlockScript = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_2__["default"])(el.children).filter(node => node.matches(_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].tagMap.jsen))[0]) {
				var directivesPush = _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].get(this.directives, 'push');
				_Directives_js__WEBPACK_IMPORTED_MODULE_18__["default"].parse((this.dataBlockScript.textContent || '').trim()).filter().forEach(directive => {
					this.autoEval = _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].initialRendering;
					directivesPush(directive);
					this.autoEval = true;
				});
			}
			// ------------
			if (this.dataBlockScript && _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].hideDataBlockScript) {
				this.dataBlockScript.remove();
			}
		}, 0);
		// ------------
		
		// CHTML is singleton
		Object.defineProperty(el, '< c h t m l >', {value: this});
	}
	
	/**
	 * Alias of super.getNodes().
	 *
	 * @param string 		nodeName
	 *
	 * @return Chtml
	 */
	get(nodeName) {
		return super.getNodes(nodeName);
	}
	
	/**
	 * Binds a (reactive) context object or logical object to the instance.
	 *
	 * @param object 		context
	 *
	 * @return Event
	 */
	bind(context) {
		if (!_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bindingProperty) {
			throw new Error('Data key has not been set!');
		}
		return _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].set(this, _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bindingProperty, context);
	}	
	/**
	 * Clears the instance of its context.
	 *
	 * @return Event
	 */
	unbind() {
		if (!_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bindingProperty) {
			throw new Error('Data key has not been set!');
		}
		return _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].set(this, _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bindingProperty, null);
	}
	
	/**
	 * Binds a (reactive) list context to the instance.
	 * Childnodes will be automatically created/removed per key.
	 *
	 * @param array 		srcModel
	 * @param string 		subnamespace
	 * @param function 		remodelCallback
	 *
	 * @return Reflex.MutationEvent
	 */
	populate(srcModel, subnamespace, remodelCallback = null) {
		// --------------
		var nodeNamespaceArray = subnamespace.split('//');
		// Create a namespace hash...
		if (nodeNamespaceArray[0].indexOf('[') > -1) {
			nodeNamespaceArray[0] = '"' + nodeNamespaceArray[0].replace(/\[/g, '" + ').replace(/\]/g, ' + "') + '"';
		}
		var srcModelKeys = _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].keys(srcModel);
		var currentNodeNames = _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].keys(this[_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].treeProperty]);
		// --------------
		var e = new _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].MutationEvent(this.el, {type:'remodelling'});
		Object(_web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_8__["default"])(srcModelKeys.concat(currentNodeNames)).forEach(nodeName => {
			nodeName = Object(_web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_7__["default"])(nodeName) ? parseInt(nodeName) : nodeName;
			var existingNode = this.getNodes(nodeName);
			var rspns;
			if (_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].has(srcModel, nodeName)) {
				var srcItem = _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].get(srcModel, nodeName), isNewNode = false;
				if (!existingNode) {
					// --------------
					var nodeNamespaceArrayCopy = nodeNamespaceArray.slice();
					if (nodeNamespaceArrayCopy[0].indexOf('"') > -1) {
						nodeNamespaceArrayCopy[0] = _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__["default"].parse(nodeNamespaceArrayCopy[0]).eval(srcItem);
					}
					nodeNamespaceArrayCopy[0] += '/' + nodeName;
					var nodeEl = Chtml.import(nodeNamespaceArrayCopy.join('//'));
					// --------------
					if (nodeEl) {
						var following = Object(_web_native_js_commons_arr_following_js__WEBPACK_IMPORTED_MODULE_9__["default"])(srcModelKeys, nodeName + ''/*numeric nodeName needs this*/, true/*length*/)
							.reduce((closest, _nodeName) => closest || this.getNodes(_nodeName), null);
						if (following) {
							following.el.before(nodeEl);
						} else {
							this.el.append(nodeEl);
						}
						existingNode = this.addNode(nodeName, nodeEl);
						isNewNode = true;
					}
				}
				if (existingNode) {
					if (Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_6__["default"])(remodelCallback)) {
						rspns = remodelCallback(existingNode, srcItem, nodeName, isNewNode);
					} else {
						rspns = existingNode.bind(srcItem);
					}
				}
			} else if (existingNode) {
				if (Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_6__["default"])(remodelCallback)) {
					rspns = remodelCallback(existingNode, nodeName);
				} else {
					rspns = existingNode.unbind();
				}
				var remove = () => {
					existingNode.destroy();
					existingNode.el.remove();
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
	}
	
	/**
	 * Frees the instance of observed directives.
	 *
	 * @return void
	 */
	destroy() {
		this.directives.forEach(
			binding => _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].unobserve(this, null, null, {tags:['#directive', binding]})
		);
		delete this.el['< c h t m l >'];
		if (this.dataBlockScript && _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].hideDataBlockScript) {
			this.prepend(this.dataBlockScript);
		}
	}
	
	/**
	 * -------------------
	 * INSTANCE-RELATED METHODS
	 * -------------------
	 */
	
	/**
	 * The "init" function.
	 * Gives CHTML a global window context
	 * and lets it perform other necessary initializations.
	 *
	 * @param object	contextWindow
	 * @param function	bundlesCallback
	 *
	 * @return void
	 */
	static init(contextWindow, bundlesCallback = null) {
		
		_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].context = contextWindow;
		// Window must be set above... before this
		Object(_composing_defineBundleElements_js__WEBPACK_IMPORTED_MODULE_13__["default"])();
		
		// ------------------
		// Chtml.contentLoadedPromise
		// ------------------
		Chtml.contentLoadedPromise = new Promise(resolve => {
			if (contextWindow.document.readyState === 'complete') {
				resolve(); return;
			}
			contextWindow.document.addEventListener('DOMContentLoaded', resolve, false);
			contextWindow.addEventListener('load', resolve, false);
		});
		
		// ------------------
		// globalParams.bundles
		// Chtml.loadingBundlesPromise
		// ------------------
		Chtml.contentLoadedPromise.then(() => {
			var bundleElements;
			if (bundlesCallback && (bundleElements = bundlesCallback())) {
				if (!Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(bundleElements)) {
					throw new Error('The bundlesCallback() function must return an array!');
				}
				_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bundles = Object(_composing_createBundleMatrix_js__WEBPACK_IMPORTED_MODULE_15__["default"])(bundleElements, loadingBundlesPromise => {
					Chtml.loadingBundlesPromise = loadingBundlesPromise;
					setTimeout(() => {
						Object(_composing_defineImportElements_js__WEBPACK_IMPORTED_MODULE_14__["default"])(loadingBundlesPromise);
					}, 0);
				});
			}
		});
	}
	
	/**
	 * The "ready" function.
	 * Calls us when it becomes safe to run bundle-related code.
	 *
	 * @param function			callback
	 * @param bool				waitForBundles
	 *
	 * @return void
	 */
	static ready(callback, waitForBundles = true) {
		Chtml.contentLoadedPromise.then(() => {
			if (!waitForBundles) {
				callback(); return;
			}
			Chtml.loadingBundlesPromise.then(callback);
		});
	}

	/**
	 * Creates a Chtml over a root resolved from definition or markup string.
	 *
	 * @param string|document|HTMLElement	input
	 * @param object						params
	 * @param object						Static
	 *
	 * @return Chtml
	 */
	static from(input, params = {}, Static = Chtml) {
		// -----------------------------
		// Resolve element from input
		// -----------------------------
		var el = input;
		if (Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_5__["default"])(input) && !input.trim().startsWith('<') && input.indexOf('/') !== -1) {
			if (!(el = Chtml.import(Object(_web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_10__["default"])(input, '//')))) {
				throw new Error('No element found on the namespace "' + input + '"!');
			}
		} else {
			if (Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_5__["default"])(input)) {
				if (!(el = Object(_core_createElement_js__WEBPACK_IMPORTED_MODULE_12__["default"])(input))) {
					throw new Error('Could not resolve the string "' +input + '" to an element!');
				}
			}
			var ns, superNs, superEl, isImport = el.matches(_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].tagMap.import);
			if ((ns = Object(_web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_10__["default"])(el.getAttribute(_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].attrMap.namespace) || '', '//'))
			// The entire namespace is used for elements of type import.
			// The supernamespace is used for normal elements
			&& ((isImport && (superNs = ns)) || (superNs = Object(_web_native_js_commons_str_beforeLast_js__WEBPACK_IMPORTED_MODULE_11__["default"])(ns, '/')) && superNs.indexOf('/') > -1)
			&& (superEl = Chtml.import(superNs))) {
				var _el = el;
				el = Object(_composing_recompose_js__WEBPACK_IMPORTED_MODULE_17__["default"])(superEl, el);
				if (isImport) {
					_el.replaceWith(el);
				}
			} else if (ns) {
				console.warn('Namespace resolution failed: ' + ns);
			}
		}
		return el['< c h t m l >'] || new Static(el, params);
	}
	
	/**
	 * Imports a module from bundles.
	 *
	 * @param string						namespace
	 *
	 * @return HTMLElement
	 */
	static import(namespace) {
		if (_params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bundles) {
			return _params_js__WEBPACK_IMPORTED_MODULE_20__["default"].bundles.find(namespace);
		}
	}
};


/***/ }),

/***/ "./src/Directives.js":
/*!***************************!*\
  !*** ./src/Directives.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Directives; });
/* harmony import */ var _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/jsen */ "../jsen/src/index.js");
/* harmony import */ var _web_native_js_commons_str_wrapped_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/wrapped.js */ "../commons/str/wrapped.js");
/* harmony import */ var _web_native_js_commons_str_unwrap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/str/unwrap.js */ "../commons/str/unwrap.js");
/* harmony import */ var _web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/obj/merge.js */ "../commons/obj/merge.js");
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../commons/js/isString.js");

/**
 * @imports
 */






/**
 * ---------------------------
 * Call class
 * ---------------------------
 */				

class Directives extends _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__["Statements"] {
	 
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
				callback(_web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__["default"].parse(assertion + ' && "[ENDIF]" && (' + directive.toString() + ')'));
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
			(_expr, _Parsers = null, _params = null)  => _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__["default"].parse(_expr, _Parsers, _params ? Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_3__["default"])(params, _params) : params)/*parseCallback*/, 
			Directives/*Static*/
		);
	}
};

/***/ }),

/***/ "./src/browser-entry.js":
/*!******************************!*\
  !*** ./src/browser-entry.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params.js */ "./src/params.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
/* harmony import */ var _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/reflex */ "../reflex/src/index.js");
/* harmony import */ var _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/jsen */ "../jsen/src/index.js");

/**
 * @imports
 */




_params_js__WEBPACK_IMPORTED_MODULE_0__["default"].env = 'browser';

// As globals
if (!window.WebNative) {
	window.WebNative = {};
}
window.WebNative.Chtml = _index_js__WEBPACK_IMPORTED_MODULE_1__["default"];
window.WebNative.Chtml.params = _params_js__WEBPACK_IMPORTED_MODULE_0__["default"];
window.WebNative.Chtml.Reflex = _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_2__["default"];
window.WebNative.Chtml.Jsen = _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_3__["default"];


/***/ }),

/***/ "./src/composing/Matrix.js":
/*!*********************************!*\
  !*** ./src/composing/Matrix.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Matrix; });
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../commons/arr/from.js");

/**
 * @imports
 */


/**
 * ---------------------------
 * The Matrix loader
 * ---------------------------
 */				

class Matrix {
	
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
		this.sources = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(sources);
		this.namespace = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(namespace);
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


/***/ }),

/***/ "./src/composing/createBundleMatrix.js":
/*!*********************************************!*\
  !*** ./src/composing/createBundleMatrix.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_arr_divide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/divide.js */ "../commons/arr/divide.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../params.js */ "./src/params.js");
/* harmony import */ var _recompose_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recompose.js */ "./src/composing/recompose.js");
/* harmony import */ var _Matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Matrix.js */ "./src/composing/Matrix.js");

/**
 * @imports
 */






/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */
/* harmony default export */ __webpack_exports__["default"] = (function(bundleElements, promiseReciever = null) {
	
	var [loadingBundles, readyBundles] = Object(_web_native_js_commons_arr_divide_js__WEBPACK_IMPORTED_MODULE_1__["default"])(bundleElements, b => b instanceof Promise);
	const loadingBundlesPromise = Promise.all(loadingBundles).then(fetchedBundles => {
		readyBundles.push(...fetchedBundles);
		loadingBundles = [];
	});
	if (promiseReciever) {
		promiseReciever(loadingBundlesPromise);
	}
	var warnedEarlyBundleAccess;
	const anticyclicBundlesQuery = [];
	const bundleMatrix = new _Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"](readyBundles/*sources*/, []/*namespace*/, (bundle, namespace, superEl, bundleIndex) => {
		var _namespace = namespace.join('/');
		// ------------------
		// Is the current import process trying to be cyclic?
		// We move one-level up the namespace hierarchy.
		if (anticyclicBundlesQuery.includes(_namespace)) {
			return bundleMatrix.find(namespace.slice(0, -1).join('/'));
		}
		anticyclicBundlesQuery.push(_namespace);
		// ------------------
		// Is someone trying to import while bundles are still loading?
		if (loadingBundles.length && !warnedEarlyBundleAccess) {
			warnedEarlyBundleAccess = true;
			console.warn('Remote bundles are still loading at this time! You should probabbly wrap bundle-dependent code within Chtml.ready(callback[, true/*waitForBundles*/]).');
		}
		// ------------------
		// We query now...
		var CSSEscape = _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].context.CSS 
			? _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].context.CSS.escape 
			: str => str;
		var el = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bundle.content.children).filter(node => node.matches('[' + CSSEscape(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.namespace) + '="' + _namespace + '"]'))[0]

		if (el && superEl) {
			try {
				var norecompose = [];
				if (bundle.hasAttribute('norecompose')) {
					norecompose = (bundle.getAttribute('norecompose') || '*').split(' ').map(val => val.trim());
				}
				el = Object(_recompose_js__WEBPACK_IMPORTED_MODULE_3__["default"])(superEl, el, 'prepend', norecompose);
			} catch(e) {
				console.error('[Inheritance error at source #' + bundleIndex + ']: ' + e.message);
			}
			anticyclicBundlesQuery.pop();
			return el;
		}
		// ------------------
		// Update cyclicism... lol
		anticyclicBundlesQuery.pop();
		// ------------------
		// If there was no module with the requested namespace
		// we return the super module
		return el ? el.cloneNode(true) : (
			superEl ? superEl.cloneNode(true) : null
		);
	}/*getter*/);
	
	return bundleMatrix;
});;


/***/ }),

/***/ "./src/composing/defineBundleElements.js":
/*!***********************************************!*\
  !*** ./src/composing/defineBundleElements.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/before.js */ "../commons/str/before.js");
/* harmony import */ var _recompose_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recompose.js */ "./src/composing/recompose.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../params.js */ "./src/params.js");

/**
 * @imports
 */




/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */
/* harmony default export */ __webpack_exports__["default"] = (function() {
	
	const Window = _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].context;

	/**
	 * Define the customized built-in template element
	 * that supports remote content.
	 */
	Window.customElements.define(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.bundle, class extends Window.HTMLTemplateElement {
	
		/**
		 * This handles both triggers remote loading
		 * when so defined.
		 *
		 * @param string	name
		 * @param string	oldValue
		 * @param string	newValue
		 *
		 * @return void
		 */
		attributeChangedCallback(name, oldValue, newValue) {
			if (newValue) {
				this.load();
			}
		}
	
		/**
		 * Attempt to load remote content if so defined.
		 *
		 * @return void
		 */
		load() {
			var src = this.getAttribute('src');
			if (src && this.content.children.length) {
				console.warn('A CHTML bundle must define only either a remote content or local content! Bundle ignored.');
			} else if (src) {
				// Missing in jsdom
				if (Window.fetch) {
					Window.fetch(src).then(response => {
						return response.ok ? response.text() : Promise.reject(response.statusText);
					}).then(content => {
						this.innerHTML = content;
						// Dispatch the event.
						this.dispatchEvent(new Window.Event('bundleloadsuccess', {
							bubbles:true,
						}));
					}).catch(error => {
						// Dispatch the event.
						console.warn('Error fetching the bundle at ' + src + '. (' + error + ')');
						this.dispatchEvent(new Window.Event('bundleloaderror', {
							bubbles:true,
						}));
					});
				} else {
					setTimeout(() => {
						// Otherwise, this event will fire BEFORE the code that binds to it
						this.dispatchEvent(new Window.Event('bundleloadsuccess', {
							bubbles:true,
						}));
					}, 0);
				}
			}
		}
	
		/**
		 * The attributes we want to observe.
		 *
		 * @return array
		 */
		static get observedAttributes() {
			return ['src'];
		}
	}, {extends: 'template'});
});;


/***/ }),

/***/ "./src/composing/defineImportElements.js":
/*!***********************************************!*\
  !*** ./src/composing/defineImportElements.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/before.js */ "../commons/str/before.js");
/* harmony import */ var _recompose_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recompose.js */ "./src/composing/recompose.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../params.js */ "./src/params.js");

/**
 * @imports
 */




/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */
/* harmony default export */ __webpack_exports__["default"] = (function(loadingBundlesPromise) {
	
	const Window = _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].context;
				
	/**
	 * Define the custom import element
	 */
	Window.customElements.define(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].tagMap.import, class extends Window.HTMLElement {
	
		/**
		 * Tests if conditions are right to resolve the import.
		 *
		 * @return bool
		 */
		shouldResolve() {
			return !this.hasAttribute('ondemand')
				&& !this.closest('template')
				&& !this.closest(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].tagMap.import + '[ondemand]');
		}
	
		/**
		 * This triggers self-replacement
		 * when so defined.
		 *
		 * @return void
		 */
		connectedCallback() {
			this.processed = false;
			if (this.shouldResolve()) {
				this.resolve();
			}
		}
	
		/**
		 * This triggers self-replacement
		 * when so defined.
		 *
		 * @param string	name
		 * @param string	oldValue
		 * @param string	newValue
		 *
		 * @return void
		 */
		attributeChangedCallback(name, oldValue, newValue) {
			if (this.shouldResolve()) {
				this.resolve();
			}
		}
	
		/**
		 * Attempt self-replacement if so defined.
		 *
		 * @return void
		 */
		resolve() {
			if (!this.parentNode) {
				return false;
			}
			loadingBundlesPromise.then(() => {
				var replacement, namespace, namespaceAttr = _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.namespace;
				if ((namespace = Object(_web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.getAttribute(namespaceAttr) || '', '//'))
				&& (namespace !== this.__namespace)) {
					this.__namespace = namespace;
					if (!_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].bundles || !(replacement = _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].bundles.find(namespace))) {
						this.innnerText = 'No element found on the namespace "' + namespace + '"!';
					} else {
						var resolved = Object(_recompose_js__WEBPACK_IMPORTED_MODULE_1__["default"])(replacement, this);
						if (this.hasAttribute('shadow')) {
							if (!this.parentNode.shadowRoot) {
								this.parentNode.attachShadow({mode: 'open'});
							} 
							this.parentNode.shadowRoot.append(resolved);
							this.remove();
						} else {
							this.replaceWith(resolved);
						}
						resolved.setAttribute('autoimported', 'true');
						resolved.dispatchEvent(new Window.Event('imported', {
							bubbles:true,
						}));
					}
				}
			});
		}
	
		/**
		 * The attributes we want to observe.
		 *
		 * @return array
		 */
		static get observedAttributes() {
			return ['ondemand', _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.namespace];
		}
	});
});;


/***/ }),

/***/ "./src/composing/parseNamespace.js":
/*!*****************************************!*\
  !*** ./src/composing/parseNamespace.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/str/before.js */ "../commons/str/before.js");
/* harmony import */ var _web_native_js_commons_str_after_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/str/after.js */ "../commons/str/after.js");

/**
 * @imports
 */




/**
 * Parses an element's CHTML namespace.
 * This explains how an element's namespace is used in CHTML.
 *
 * @param string					namespaceStr
 *
 * @return object
 */
/* harmony default export */ __webpack_exports__["default"] = (function(namespaceStr) {
	var namespaceParse = {roadmap:namespaceStr};
	if (namespaceParse.roadmap) {
		namespaceParse.namespace = Object(_web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_0__["default"])(namespaceParse.roadmap, '//');
		namespaceParse.subnamespace = Object(_web_native_js_commons_str_after_js__WEBPACK_IMPORTED_MODULE_1__["default"])(namespaceParse.roadmap, '//');
		// In case this is the /// spot...
		if (namespaceParse.subnamespace.startsWith('/')) {
			namespaceParse.subnamespace = Object(_web_native_js_commons_str_after_js__WEBPACK_IMPORTED_MODULE_1__["default"])(namespaceParse.subnamespace, '/');
		}
		if (namespaceParse.subnamespace.endsWith('//') && namespaceParse.subnamespace.indexOf('///') === -1) {
			namespaceParse.subnamespace = namespaceParse.subnamespace + namespaceParse.namespace + '//';
		}
	}
	return namespaceParse;
});;


/***/ }),

/***/ "./src/composing/recompose.js":
/*!************************************!*\
  !*** ./src/composing/recompose.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _recomposeNodes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./recomposeNodes.js */ "./src/composing/recomposeNodes.js");
/* harmony import */ var _recomposeDirectives_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recomposeDirectives.js */ "./src/composing/recomposeDirectives.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../params.js */ "./src/params.js");

/**
 * @imports
 */




/**
 * Composes a component from a super component.
 *
 * All definitions will be inherited.
 * If the idea is to import, the super component's element will be returned,
 * (On import, nodes in component (as defined, if) will be uploaded into slots in the super component.)
 *
 * @param HTMLElement				elTo
 * @param HTMLElement				elFrom
 *
 * @return HTMLElement
 */
/* harmony default export */ __webpack_exports__["default"] = (function(elFrom, elTo) {
	if (elTo.matches(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].tagMap.import)) {
		return Object(_recomposeNodes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(elTo/*from import actually*/, elFrom/*to element actually*/);
	}
	// We will append defs from the elFrom into elTo
	return Object(_recomposeDirectives_js__WEBPACK_IMPORTED_MODULE_1__["default"])(elFrom, elTo, 'prepend');
});;


/***/ }),

/***/ "./src/composing/recomposeDirectives.js":
/*!**********************************************!*\
  !*** ./src/composing/recomposeDirectives.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/unique.js */ "../commons/arr/unique.js");
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../commons/js/isString.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../commons/js/isArray.js");
/* harmony import */ var _recomposeDirectives_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recomposeDirectives.js */ "./src/composing/recomposeDirectives.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../params.js */ "./src/params.js");

/**
 * @imports
 */








/**
 * Composes definitions from elFrom into elTo.
 *
 * @param HTMLElement				elFrom
 * @param HTMLElement				elTo
 * @param string					appendOrPrepend
 * @param array						norecompose
 *
 * @return HTMLElement
 */
/* harmony default export */ __webpack_exports__["default"] = (function(elFrom, elTo, appendOrPrepend, norecompose = []) {
	norecompose = norecompose.concat([_params_js__WEBPACK_IMPORTED_MODULE_6__["default"].attrMap.namespace, ..._params_js__WEBPACK_IMPORTED_MODULE_6__["default"].attrMap.nocompose]);
	if (elTo.hasAttribute('norecompose')) {
		norecompose = norecompose.concat((elTo.getAttribute('norecompose') || '*').split(' ').map(val => val.trim()));
	}
	// ----------------------------
	// Custom Composition...
	// ----------------------------
	if (Object(_web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_params_js__WEBPACK_IMPORTED_MODULE_6__["default"].recomposeCallback)) {
		var disposition = _params_js__WEBPACK_IMPORTED_MODULE_6__["default"].recomposeCallback(elFrom, elTo, appendOrPrepend, norecompose);
		if (disposition === false) {
			return false;
		} else if (Object(_web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(disposition) || Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(disposition)) {
			norecompose = norecompose.concat(disposition);
		}
	}
	// ----------------------------
	// Merge list attributes...
	// ----------------------------
	Object(_web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_params_js__WEBPACK_IMPORTED_MODULE_6__["default"].listAttributes.concat([_params_js__WEBPACK_IMPORTED_MODULE_6__["default"].attrMap.hint, _params_js__WEBPACK_IMPORTED_MODULE_6__["default"].attrMap.superrole, _params_js__WEBPACK_IMPORTED_MODULE_6__["default"].attrMap.subrole, 'role', 'class'])).forEach(type => {
		var b_attr, a_attr;
		if (!norecompose.includes(type) && !norecompose.includes('*') && (b_attr = elFrom.getAttribute(type))) {
			if (a_attr = elTo.getAttribute(type)) {
				var jointList = appendOrPrepend === 'prepend' ? [b_attr, a_attr] : [a_attr, b_attr];
			} else {
				var jointList = [b_attr];
			}
			elTo.setAttribute(type, Object(_web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_1__["default"])(jointList.join(' ').split(' ').map(r => r.trim())).join(' '));
			norecompose.push(type);
		}
	});
	// ----------------------------
	// Merge key/val attributes...
	// ----------------------------
	Object(_web_native_js_commons_arr_unique_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_params_js__WEBPACK_IMPORTED_MODULE_6__["default"].keyValAttributes.concat('style')).forEach(type => {
		var b_attr, a_attr;
		if (!norecompose.includes(type) && !norecompose.includes('*') && (b_attr = elFrom.getAttribute(type))) {
			if (a_attr = elTo.getAttribute(type)) {
				var jointDefs = appendOrPrepend === 'prepend' ? [b_attr, a_attr] : [a_attr, b_attr];
				if (!jointDefs[0].trim().endsWith(';')) {
					jointDefs[0] = jointDefs[0] + ';';
				}
			} else {
				var jointDefs = [b_attr];
			}
			elTo.setAttribute(type, jointDefs.join(' '));
			norecompose.push(type);
		}
	});
	// ----------------------------
	// Port all other attributes...
	// ----------------------------
	for (var i = 0; i < elFrom.attributes.length; i ++) {
		var attr = elFrom.attributes[i];
		if (!norecompose.includes(attr.name) && !norecompose.includes('*') && !elTo.hasAttribute(attr.name)) {
			elTo.setAttribute(attr.name, attr.value);
			norecompose.push(attr.name);
		}
	}
	// ----------------------------
	// For data blocks...
	// ----------------------------
	if (!norecompose.includes('@directives') && !norecompose.includes('*')) {
		var elToDefs = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])((elTo.shadowRoot || elTo).children)
			.filter(node => node.matches(_params_js__WEBPACK_IMPORTED_MODULE_6__["default"].tagMap.jsen));
		var elFromDefs = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])((elFrom.shadowRoot || elFrom).children)
			.filter(node => node.matches(_params_js__WEBPACK_IMPORTED_MODULE_6__["default"].tagMap.jsen));
		if (elFromDefs.length) {
			if (elToDefs.length) {
				elToDefs[0][appendOrPrepend](elFromDefs[0].textContent);
			} else {
				elTo.prepend(elFromDefs[0].cloneNode(true));
			}
		}
	}
	return elTo;
});;


/***/ }),

/***/ "./src/composing/recomposeNodes.js":
/*!*****************************************!*\
  !*** ./src/composing/recomposeNodes.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../commons/arr/from.js");
/* harmony import */ var _recomposeDirectives_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recomposeDirectives.js */ "./src/composing/recomposeDirectives.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../params.js */ "./src/params.js");

/**
 * @imports
 */



	
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
/* harmony default export */ __webpack_exports__["default"] = (function(elFrom, elTo) {
	elTo = elTo.cloneNode(true);
	var elFromNs = elFrom.getAttribute(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.namespace);
	var elToNs = elTo.getAttribute(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.namespace);
	var elToRoles = (elTo.getAttribute(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.superrole) || '').split(' ').map(r => r.trim());
	// -------------------------
	// So we concat() the role attribute
	// -------------------------
	elTo.setAttribute(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.namespace, elFromNs);
	// We will prepend defs from the elFrom into elTo
	Object(_recomposeDirectives_js__WEBPACK_IMPORTED_MODULE_1__["default"])(elFrom, elTo, 'append');
	// -------------------------
	// Upload nodes into elTo just the way slots work in Web Compoonents
	// -------------------------
	Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])((elFrom.shadowRoot || elFrom).children).forEach((replacementNode, i) => {
		if (replacementNode.matches(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].tagMap.jsen)) {
			return;
		}
		replacementNode = replacementNode.cloneNode(true);
		var applicableContextRoles = [], applicableReplacementNodeRoles = [];
		var replacementNodeRoles = (replacementNode.getAttribute(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.subrole) || '').split(' ').map(r => r.trim());
		replacementNodeRoles.forEach(replacementNodeRole => {
			var _applicableContextRoles = elToRoles.filter(contextRole => replacementNodeRole.startsWith(contextRole + '-'));
			if (_applicableContextRoles.length) {
				applicableContextRoles.push(_applicableContextRoles[0]);
				applicableReplacementNodeRoles.push(replacementNodeRole);
			}
		});
		var CSSEscape = _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].context.CSS ? _params_js__WEBPACK_IMPORTED_MODULE_2__["default"].context.CSS.escape : str => str;
		if (applicableContextRoles.length) {
			var slotNodes;
			var contextSelector = applicableContextRoles.map(contextRole => '[' + CSSEscape(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.superrole) + '~="' + contextRole + '"]');
			var slotNodeSelector = applicableReplacementNodeRoles.map(replacementNodeRole => '[' + CSSEscape(_params_js__WEBPACK_IMPORTED_MODULE_2__["default"].attrMap.subrole) + '~="' + replacementNodeRole + '"]');
			if ((elTo.shadowRoot && (slotNodes = elTo.shadowRoot.querySelectorAll(slotNodeSelector)))
			|| ((slotNodes = elTo.querySelectorAll(slotNodeSelector)).length === 1 && slotNodes[0].closest(contextSelector) === elTo)) {
				// We will prepend defs from the slot node into replacement node
				Object(_recomposeDirectives_js__WEBPACK_IMPORTED_MODULE_1__["default"])(slotNodes[0], replacementNode, 'prepend');
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
});;


/***/ }),

/***/ "./src/core/Core.js":
/*!**************************!*\
  !*** ./src/core/Core.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Core; });
/* harmony import */ var _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/jsen */ "../jsen/src/index.js");
/* harmony import */ var _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/reflex */ "../reflex/src/index.js");
/* harmony import */ var _web_native_js_commons_js_isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/js/isString.js */ "../commons/js/isString.js");
/* harmony import */ var _web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web-native-js/commons/js/isArray.js */ "../commons/js/isArray.js");
/* harmony import */ var _web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web-native-js/commons/js/isNumeric.js */ "../commons/js/isNumeric.js");
/* harmony import */ var _web_native_js_commons_js_isFunction_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @web-native-js/commons/js/isFunction.js */ "../commons/js/isFunction.js");
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../commons/arr/from.js");
/* harmony import */ var _web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @web-native-js/commons/obj/merge.js */ "../commons/obj/merge.js");
/* harmony import */ var _web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @web-native-js/commons/obj/each.js */ "../commons/obj/each.js");
/* harmony import */ var _web_native_js_commons_obj_copy_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @web-native-js/commons/obj/copy.js */ "../commons/obj/copy.js");
/* harmony import */ var _web_native_js_commons_str_before_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @web-native-js/commons/str/before.js */ "../commons/str/before.js");
/* harmony import */ var _disconnectedCallback_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./disconnectedCallback.js */ "./src/core/disconnectedCallback.js");
/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./createElement.js */ "./src/core/createElement.js");
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./schema.js */ "./src/core/schema.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../params.js */ "./src/params.js");

/**
 * @imports
 */
















/**
 * ---------------------------
 * The Chtml class
 * ---------------------------
 */				

class Core {

	/**
	 * Initializes the new Chtml instance.
	 *
	 * @param document|HTMLElement	el
	 * @param object				params
	 *
	 * @return void
	 */
	constructor(el, params = {}) {
		Object.defineProperty(this, 'params', {
			value:Object(_web_native_js_commons_obj_merge_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_params_js__WEBPACK_IMPORTED_MODULE_14__["default"], params),
		});
		// ---------------------------
		Object.defineProperty(this, 'descendantParams', {
			value:Object(_web_native_js_commons_obj_copy_js__WEBPACK_IMPORTED_MODULE_9__["default"])(this.params),
		});
		// ---------------------------
		Object.defineProperty(this, '_el', {value:el, enumerable:true,});
		Object.defineProperty(this, 'el', {
			value:el.nodeName === '#document' ? el.querySelector('html') : el,
			enumerable:true,
		});

		// ------------
		// ROLES
		// ------------
		
		const roles = (el.getAttribute(_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].attrMap.superrole) || '')
			.split(' ').map(r => r.trim()).filter(r => r);
		Object.defineProperty(this, 'roles', {value:roles, enumerable:true,});
		
		// ------------
		// TREE
		// ------------
		
		const tree = {};
		_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].defineProperty(this, _params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty, {value:tree, enumerable:true,});
		_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].trap(tree, (e, recieved, next) => {
			return next(recieved || this.getNodes(e.query));
		}, {type:'get'});
		// The following nodes, being prelisted,
		// can be accessed dynamically
		const nodesHint = (el.getAttribute(_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].attrMap.hint) || '')
			.split(' ').map(r => r.trim()).filter(r => r);
		_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].init(this[_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty], nodesHint);
	}
	
	/**
	 * Gets a node or list of nodes.
	 *
	 * @param string|int|array	 nodeNames
	 *
	 * @return Chtml|array|object
	 */
	getNodes(nodeNames) {
		Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_6__["default"])(nodeNames).forEach(nodeName => {
			if (nodeName in this[_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty] && this[_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty][nodeName] instanceof Core) {
				// Arrays must not be reused!
				// Their sources of nodes cant be guaranteed to be same.
				// this[globalParams.treeProperty][nodeName] could also be an empty getter/setter
				// So the instanceof is the way to go for both problems
				return this[_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty][nodeName];
			}
			var node;
			if ((node = this.getExplicitNode(nodeName))
			|| (node = this.getImplicitNode(nodeName))) {
				this.addNode(nodeName, node);
			}
		});
		return Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(nodeNames) ? _objFrom(nodeNames, this[_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty]) : this[_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty][nodeNames];
	}
	
	/**
	 * Attempts to resolve a node from explicit tree.
	 *
	 * @param string				requestNodeName
	 *
	 * @return HTMLElement
	 */
	getExplicitNode(requestNodeName) {
		// If given a rolecase, we can perform a query if we understand the semantics.
		if (this.roles && this.roles.length) {
			var roles = _params_js__WEBPACK_IMPORTED_MODULE_14__["default"].rolecase ? [_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].rolecase] : this.roles;
			// Find matches...
			var CSSEscape = _params_js__WEBPACK_IMPORTED_MODULE_14__["default"].context.CSS ? _params_js__WEBPACK_IMPORTED_MODULE_14__["default"].context.CSS.escape : str => str;
			return roles.reduce((matchedNode, role) => {
				if (!matchedNode) {
					var closestSuperSelector = '[' + CSSEscape(_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].attrMap.superrole) + '~="' + role + '"]';
					var nodeSelector = '[' + CSSEscape(_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].attrMap.subrole) + '~="' + role + '-' + requestNodeName + '"]';
					var closestSuper, _matchedNode;
					if ((_matchedNode = (this.el.shadowRoot || this.el).querySelector(nodeSelector))
					// If this.el has a shadowRoot, we don't expect _matchedNode to be able to find is superRole element.
					// If it finds one, then its not for the curren superRole element.
					&& ((this.el.shadowRoot && !(_matchedNode.parentNode.closest && _matchedNode.parentNode.closest(closestSuperSelector)))
					// _matchedNode must find this.el as its superRole element to qualify.
						|| (!this.el.shadowRoot && _matchedNode.parentNode && (closestSuper = _matchedNode.parentNode.closest(closestSuperSelector)) && closestSuper.isSameNode(this.el))
					)) {
						matchedNode = _matchedNode;
					}
				}
				return matchedNode;
			}, null);
		}
	}
	
	/**
	 * Attempts to resolve a node from implicit tree.
	 *
	 * @param string				requestNodeName
	 *
	 * @return HTMLElement|array
	 */
	getImplicitNode(requestNodeName) {
		if (Object(_web_native_js_commons_js_isNumeric_js__WEBPACK_IMPORTED_MODULE_4__["default"])(requestNodeName) || requestNodeName.match(/[^a-zA-Z0-9\-]/)) {
			return;
		}
		// Use schema...
		var nodeSchema, nodeSelector = [];
		var tries = [];
		if (_schema_js__WEBPACK_IMPORTED_MODULE_13__["default"].aria[requestNodeName]) {
			tries.push({
				schema: _schema_js__WEBPACK_IMPORTED_MODULE_13__["default"].aria[requestNodeName],
				selector: ['[role="' + requestNodeName + '"]'],
			});
		} else {
			tries.push({
				schema: _schema_js__WEBPACK_IMPORTED_MODULE_13__["default"].std[requestNodeName] || _schema_js__WEBPACK_IMPORTED_MODULE_13__["default"].aria[requestNodeName],
				selector: [requestNodeName, '[role="' + requestNodeName + '"]'],
			});
		}
		Object(_web_native_js_commons_obj_each_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_schema_js__WEBPACK_IMPORTED_MODULE_13__["default"].std, (tagname, schema) => {
			if (schema.implicitRole === requestNodeName) {
				tries.push({
					schema: schema,
					selector: [tagname],
				});
			}
		});
		var matches = null;
		tries.forEach(trie => {
			(this.el.shadowRoot || this.el).querySelectorAll(trie.selector.join(',')).forEach(node => {
				if (_schema_js__WEBPACK_IMPORTED_MODULE_13__["default"].assertNodeBelongsInScopeAs(this.el, node, trie.schema)) {
					if (trie.schema && trie.schema.singleton) {
						matches = node;
					} else if (!matches || Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(matches)) {
						matches = matches || [];
						matches.push(node);
					}
				}
			});
			if (!matches && trie.schema && !trie.schema.singleton) {
				matches = [];
			}
		});
		return matches;
	}
	
	/**
	 * Adds a node instance.
	 *
	 * @param string|int	 nodeName
	 * @param mixed			 node
	 *
	 * @return Core
	 */
	addNode(nodeName, node) {
		var nodeComponent, factory = this.params.factory || ((el, params) => new Core(el, params));
		if (Object(_web_native_js_commons_js_isArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node)) {
			// Still set the collection as node, even tho it wont be reused.
			nodeComponent = node.map(_node => factory(_node, this.descendantParams));
		} else {
			nodeComponent = factory(node, this.descendantParams);
			// We'll remove from tree at the
			// time it leaves the DOM
			Object(_disconnectedCallback_js__WEBPACK_IMPORTED_MODULE_11__["default"])(node, () => {
				_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].del(this[_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty], nodeName);
			});
		}
		_web_native_js_reflex__WEBPACK_IMPORTED_MODULE_1__["default"].set(this[_params_js__WEBPACK_IMPORTED_MODULE_14__["default"].treeProperty], nodeName, nodeComponent);
		return nodeComponent;
	}
};


/***/ }),

/***/ "./src/core/createElement.js":
/*!***********************************!*\
  !*** ./src/core/createElement.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../params.js */ "./src/params.js");

/**
 * @imports
 */


/**
 * Creates or finds a DOM element from source.
 *
 * @param string		source
 * @param object		contextDocument
 *
 * @return HTMLElement
 */
/* harmony default export */ __webpack_exports__["default"] = (function(source, contextDocument = null) {
	contextDocument = contextDocument || _params_js__WEBPACK_IMPORTED_MODULE_0__["default"].context.document;
	if (contextDocument) {
		var el;
		if (source.trim().startsWith('<')) {
			// Create a node from markup
			var temp = contextDocument.createElement('div');
			temp.innerHtml = source;
			el = temp.firstChild;
		} else {
			el = contextDocument.querySelector(source);
		}
		return el;
	}
});;


/***/ }),

/***/ "./src/core/disconnectedCallback.js":
/*!******************************************!*\
  !*** ./src/core/disconnectedCallback.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return disconnectedCallback; });
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../commons/arr/from.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../params.js */ "./src/params.js");

/**
 * @imports
 */



/**
 * Creates a MutationObserver that fires when
 * the element leaves the DOM.
 *
 * @param string						input
 * @param function					callback
 *
 * @return void
 */
function disconnectedCallback(el, callback) {
	if (el.parentNode && _params_js__WEBPACK_IMPORTED_MODULE_1__["default"].context.MutationObserver) {
		var called = false;
		var observer = new _params_js__WEBPACK_IMPORTED_MODULE_1__["default"].context.MutationObserver(mutations => {
			mutations.forEach(m => {
				if (!called && Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(m.removedNodes).includes(el)) {
					called = true;
					callback();
				}
			});
		});
		observer.observe(el.parentNode, {childList:true});
		disconnectedCallback(el.parentNode, () => {
			if (!called) {
				called = true;
				callback();
			}
		});
	}
};


/***/ }),

/***/ "./src/core/schema.js":
/*!****************************!*\
  !*** ./src/core/schema.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/js/isObject.js */ "../commons/js/isObject.js");
/* harmony import */ var _web_native_js_commons_arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/commons/arr/pushUnique.js */ "../commons/arr/pushUnique.js");
/* harmony import */ var _web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/commons/arr/intersect.js */ "../commons/arr/intersect.js");

/**
 * @imports
 */




/**
 * ---------------------------
 * The HTML Context Model Schema.
 * @see https://html.spec.whatwg.org/multipage
 * ---------------------------
 */				

/**
 * @object
 */
const Schema = {
	
	/**
	 * @object
	 */
	std: {
		/**
		 * @uncategorized
		 */
		html: {
			type: ['#sectioning-root'],
			model: ['head', 'body'],
			singleton: true,
		},
		caption: {
			model: ['#flow', '!table'],
			singleton: true,
		},
		col: {
			model: ['#nothing'],
		},
		colgroup: {
			model: [{'colgroup[span]': ['#nothing']}, {':not(colgroup[span])': ['col', 'template']}],
			singleton: true,
		},
		dd: {
			model: ['#flow'],
			implicitRole: 'definition',
		},
		dt: {
			model: ['#flow', '!#heading', '!#sectioning', '!header', '!footer'],
			implicitRole: 'term',
		},
		figcaption: {
			model: ['#flow'],
			singleton: true,
		},
		head: {
			model: ['#metadata'],
			singleton: true,
		},
		legend: {
			model: ['#phrasing'],
			singleton: true,
		},
		li: {
			model: ['#flow'],
			implicitRole: 'listitem',
		},
		optgroup: {
			model: ['option', '#script-supporting'],
			implicitRole: 'group',
		},
		option: {
			model: [{'option[label][value]': ['#nothing']}, {'option[label]:not(option[value])': ['#text']}, {':not(option[label])': ['#text']}],
		},
		param: {
			model: ['#nothing'],
		},
		rp: {
			model: ['#text'],
		},
		rt: {
			model: ['#phrasing'],
		},
		source: {
			model: ['#nothing'],
		},
		summary: {
			/*complicated*/
			model: ['#phrasing', '#heading'],
			singleton: true,
		},
		track: {
			model: ['#nothing'],
		},
		tbody: {
			model: ['#script-supporting', 'tr'],
		},
		td: {
			model: ['#flow', '!#heading', '!#sectioning', '!header', '!footer'],
		},
		tfoot: {
			model: ['tr', '#script-supporting'],
			singleton: true,
		},
		thead: {
			model: ['tr', '#script-supporting'],
			singleton: true,
		},
		tr: {
			model: ['#script-supporting', 'td', 'th'],
		},
		/**
		 * @categorized
		 */
		a: {
			type: ['#flow', '#phrasing', {'a[href]': ['#interactive', '#palpable']}], 
			model: ['#transparent', '!#interactive', '!a'],
		},
		abbr: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing',],
		},
		address: {
			type: ['#flow', '#palpable'], 
			model: ['#flow', '!#heading', '!#sectioning', '!header', '!footer', '!address',],
		},
		// If a child of <map>
		area: {
			type: ['#flow', '#phrasing'], 
			model: ['#nothing'],
		},
		article: {
			type: ['#flow', '#palpable', '#sectioning-content'], 
			model: ['#flow'],
			implicitRole: 'article',
			acceptableRoles: ['application', 'article', 'document', 'main',],
		},
		aside: {
			type: ['#flow', '#palpable', '#sectioning-content'], 
			model: ['#flow'],
			implicitRole: 'complementary',
			acceptableRoles: ['complementary', 'note', 'search',],
		},
		audio: {
			type: ['#embedded', '#flow', '#phrasing', {'audio[controls]': ['#interactive', '#palpable']}], 
			model: ['#transparent', '!#media', 'track', {':not(audio[src])': ['source']}],
		},
		b: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		base: {
			type: ['#metadata'],
			model: ['#nothing'],
			singleton: true,
		},
		bdi: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		bdo: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		blockquote: {
			type: ['#flow', '#palpable', '#sectioning-root'],
			model: ['#flow'],
		},
		body: {
			type: ['#sectioning-root'], 
			model: ['#flow', '@banner', '@contentinfo', '@complementary', '@main'],
			singleton: true,
		},
		br: {
			type: ['#flow', '#phrasing'], 
			model: ['#nothing'],
		},
		button: {
			type: ['#flow', '#interactive', '#palpable', '#phrasing'], 
			model: ['#phrasing', '!#interactive'],
		},
		canvas: {
			type: ['#embedded', '#flow', '#palpable', '#phrasing'], 
			model: ['#transparent', '!#interactive', 'a', 'img[usemap]', 'button', 'input[type="button"]', 'input[type="radio"]', 'input[type="checkbox"]', 'select[multiple]', 'select[size>=1]', /*has tabindex but not #interactive*/'[tabindex]!#interactive'],
		},
		cite: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		code: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		data: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		datalist: {
			type: ['#flow', '#phrasing'],
			model: ['#phrasing', '#script-supporting', 'option'],
		},
		del: {
			type: ['#flow', '#phrasing'],
			model: ['#transparent'],
		},
		details: {
			type: ['#flow', '#interactive', '#palpable', '#sectioning-root'],
			model: ['#flow', 'summary'],
		},
		dfn: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing', '!dfn'],
			implicitRole: 'term',
		},
		dialog: {
			type: ['#flow', '#sectioning-root'],
			model: ['#flow'],
			implicitRole: 'dialog',
		},
		div: {
			type: ['#flow', '#palpable'],
			/*complicated*/
			model: [{'dl > div': ['dt', 'dd']}, {div/*TODO':not(dl > div)'*/: ['#flow']}],
		},
		dl: {
			/*complicated*/
			type: ['#flow', /*{:contains(> * name-value group): ['#palpable']}*/],
			/*complicated*/
			model: ['#script-supporting', 'dl', 'dt', 'div'],
		},
		em: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		embed: {
			type: ['#embedded', '#flow', '#phrasing', '#interactive', '#palpable'], 
			model: ['#nothing'],
		},
		fieldset: {
			type: ['#flow', '#sectioning-root', '#palpable'],
			model: ['legend', '#flow'],
		},
		figure: {
			type: ['#flow', '#sectioning-root', '#palpable'],
			model: ['#flow', 'figcaption'],
			implicitRole: 'figure',
		},
		footer: {
			type: ['#flow', '#palpable'],
			model: ['#flow', '!header', '!footer'],
			acceptableRoles: ['contentinfo',],
			singleton: true,
		},
		form: {
			type: ['#flow', '#palpable'],
			model: ['#flow', '!form'],
		},
		h1: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h2: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h3: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h4: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h5: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h6: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		header: {
			type: ['#flow', '#palpable'],
			model: ['#flow', '!header', '!footer'],
			acceptableRoles: ['banner',],
			singleton: true,
		},
		hgroup: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', '#script-supporting'],
		},
		hr: {
			type: ['#flow'],
			model: ['#nothing'],
			implicitRole: 'separator',
		},
		i: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		iframe: {
			type: ['#embedded', '#flow', '#phrasing', '#interactive', '#palpable'], 
			model: ['#nothing'],
		},
		img: {
			type: ['#embedded', '#flow', '#phrasing', {'img[usemap]': ['#interactive', '#palpable']}], 
			model: ['#nothing'],
		},
		input: {
			type: ['#flow', '#phrasing', {'input:not([type!="hidden"])': ['#interactive', '#palpable']}], 
			model: ['#nothing'],
		},
		ins: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#transparent'],
		},
		kbd: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		label: {
			type: ['#flow', '#phrasing', '#interactive', '#palpable'], 
			model: ['#phrasing', '!label'],
		},
		link: {
			type: ['#metadata', {'body link': ['#flow', '#phrasing']}], 
			model: ['#nothing'],
		},
		main: {
			type: ['#flow', '#palpable'], 
			model: ['#flow'],
			implicitRole: 'main',
			singleton: true,
		},
		map: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#transparent'],
		},
		mark: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#transparent'],
		},
		math: {
			type: ['#embedded', '#flow', '#phrasing', '#palpable'], 
			/*complicated*/
			model: [],
		},
		menu: {
			type: ['#flow', {':contains(> li)': ['#palpable']}], 
			model: ['#script-supporting', 'li'],
			implicitRole: 'list',
		},
		meta: {
			type: ['#metadata', {'meta[itemprop]': ['#flow', '#phrasing']}], 
			model: ['#nothing'],
			names: ['application-name', 'author', 'description', 'generator', 'keywords', 'referrer', 'theme-color'],
		},
		meter: {
			type: ['#flow', '#labelable', '#phrasing', '#palpable'], 
			model: ['#phrasing', '!meter'],
		},
		nav: {
			type: ['#flow', '#sectioning-content', '#palpable'], 
			model: ['#flow'],
			implicitRole: 'navigation',
			acceptableRoles: ['navigation',],
		},
		noscript: {
			type: ['#metadata', '#flow', '#phrasing'], 
			model: [{'head link': ['style', 'meta', 'link']}, {':not(head link)': ['#transparent', '!noscript']}],
		},
		object: {
			type: ['#embedded', '#flow', '#phrasing', {'object[usemap]': ['#interactive', '#palpable']}], 
			model: ['#transparent', 'param'],
		},
		ol: {
			type: ['#flow', {':contains(> li)': ['#palpable']}], 
			model: ['#script-supporting', 'li'],
			implicitRole: 'list',
		},
		output: {
			type: ['#flow', '#labelable', '#phrasing', '#palpable'], 
			model: ['#phrasing', '!meter'],
		},
		p: {
			type: ['#flow', '#palpable'], 
			model: ['#phrasing'],
		},
		picture: {
			type: ['#embedded', '#flow', '#phrasing'], 
			model: ['source', 'img', '#acript-supporting'],
		},
		pre: {
			type: ['#flow', '#palpable'], 
			model: ['#phrasing'],
		},
		progress: {
			type: ['#flow', '#labelable', '#phrasing', '#palpable'], 
			model: ['#phrasing', '!progress'],
		},
		q: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		ruby: {
			type: ['#flow', '#phrasing', '#palpable'],
			/*complicated*/ 
			model: ['rp', 'rt'],
		},
		s: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		samp: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		script: {
			type: ['#flow', '#metadata', '#phrasing', '#acript-supporting'], 
			model: [{'script[src]': []}],
		},
		section: {
			type: ['#flow', '#sectioning-content', '#palpable'], 
			model: ['#flow'],
			implicitRole: 'region',
			acceptableRoles: ['alert', 'alertdialog', 'application', 'contentinfo', 'dialog', 'document', 'log', 'main', 'marquee', 'region', 'search', 'status',],
		},
		select: {
			type: ['#flow', '#interactive', '#labelable', '#phrasing', '#palpable'], 
			model: ['option', 'optgroup', '#acript-supporting'],
		},
		slot: {
			type: ['#flow', '#phrasing'], 
			model: ['#transparent'],
		},
		small: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		span: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		strong: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		style: {
			type: ['#metadata'],
			model: ['#text'],
		},
		sub: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		sup: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		svg: {
			type: ['#embedded', '#flow', '#phrasing', '#palpable'], 
			/*complicated*/
			model: [],
		},
		table: {
			type: ['#flow', '#palpable'], 
			model: ['caption', 'colgroup', 'thead', 'tbody', 'tr', 'tfoot', '#script-supporting'],
		},
		td: {
			type: ['#sectioning-root'], 
			model: ['#flow'],
		},
		template: {
			type: ['#metadata', '#flow', '#phrasing', '#script-supporting'], 
			model: ['#nothing'],
		},
		textarea: {
			type: ['#flow', '#interactive', '#labelable', '#phrasing', '#palpable'], 
			model: ['#text'],
		},
		time: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: [{'time[datetime]': ['#phrasing']}, {':not(time[datetime])': ['#text']}],
		},
		title: {
			type: ['#metadata'],
			model: ['#text'],
			singleton: true,
		},
		u: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		ul: {
			type: ['#flow', {':contains(> li)': ['#palpable']}], 
			model: ['#script-supporting', 'li'],
			implicitRole: 'list',
		},
		var: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		video: {
			type: ['#embedded', '#flow', '#phrasing', {'video[controls]': ['#interactive', '#palpable']}], 
			model: ['#transparent', '!#media', 'track', {':not(video[src])': ['source']}],
		},
		wbr: {
			type: ['#flow', '#phrasing'], 
			model: ['#nothing'],
		},
	},
	
	/**
	 * @object
	 */
	aria: {
		banner: {
			type: ['@banner'], 
			singleton: true,
		},
		contentinfo: {
			type: ['@contentinfo'], 
			singleton: true,
		},
		complementary: {
			type: ['@complementary'], 
			singleton: true,
		},
		navigation: {
			type: ['@navigation'], 
			singleton: true,
		},
		list: {
			type: ['@list'], 
		},
		listitem: {
			type: ['@listitem'], 
		},
	},
	
	/**
	 * Returns the semantic content model for the given element.
	 *
	 * @param HTMLElement				el
	 *
	 * @return array
	 */
	getContentModelFor(el) { 
		var elTagName = el.nodeName.toLowerCase();
		return Schema.std[elTagName] ? Schema.expandRules(el, Schema.std[elTagName].model || []) : [];
	},
	
	/**
	 * Returns the semantic categories for the given element.
	 *
	 * @param HTMLElement				el
	 * @param bool						roleInclusive
	 *
	 * @return array
	 */
	getCategoriesFor(el, roleInclusive = true) {
		var elTagName = el.nodeName.toLowerCase();
		var elSchema = Schema.std[elTagName] || Schema.aria[elTagName] || {};
		var currentElCategories = [];
		if (roleInclusive && !el.nodeName.startsWith('#') 
		&& (el.hasAttribute('role') || elSchema.implicitRole)) {
			// Current el's impliable/acceptable roles
			// (These take precedence over native semantics)
			if (el.hasAttribute('role')) {
				var definedRoles = el.getAttribute('role').split(' ');
				el.getAttribute('role').split(' ').forEach(role => {
					if (elSchema && elSchema.acceptableRoles && !elSchema.acceptableRoles.includes(role)) {
						return;
					}
					role = role.trim();
					currentElCategories.push('@' + role);
					if (Schema.aria[role] && Schema.aria[role].type) {
						currentElCategories = currentElCategories.concat(Schema.expandRules(el, Schema.aria[role].type || []));
					}
				});
			} else if (elSchema.implicitRole) {
				Object(_web_native_js_commons_arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentElCategories, '@' + elSchema.implicitRole, elTagName);
			}
		} else {
			// Current node's categories/tagname
			var currentElCategories = Object(_web_native_js_commons_arr_pushUnique_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Schema.expandRules(el, elSchema.type || []), elTagName);
		}
		return currentElCategories;
	},

	/**
	 * Validates that the given node belongs in the context's content model
	 * going by the semantics
	 *
	 * @param HTMLElement				context
	 * @param HTMLElement				node
	 *
	 * @return bool
	 */
	assertNodeBelongsInContentModel(context, node) {
		var contextModel = context instanceof HTMLElement 
			? Schema.getContentModelFor(context)
			: context;
		var nodeCategories = node instanceof HTMLElement 
			? Schema.getCategoriesFor(node)
			: node;
		if (Object(_web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(contextModel, ['#nothing', '#text']).length) {
			return false;
		}
		var valid;
		// So current content model has to list either this node's categories,
		// tagname, or impliable/acceptable roles
		contextModel.forEach(allowedNode => {
			if (allowedNode.startsWith('!')) {
				var disallowedNode = allowedNode.substr(1);
				if (nodeCategories.includes(disallowedNode)) {
					valid = false;
				}
			} else if (valid !== false) {
				if (nodeCategories.includes(allowedNode)) {
					valid = true;
				}
			}
		});
		return valid && true;
	},

	/**
	 * Validates that the given node is associated to the context directly
	 * going by the semantics
	 *
	 * @param HTMLElement				scope
	 * @param HTMLElement				node
	 * @param object					nodeSchema
	 *
	 * @return bool
	 */
	assertNodeBelongsInScopeAs(scope, node, nodeSchema = null) {
		var contextCategories = Schema.getCategoriesFor(scope);
		var closest, current = node, nodeModel;
		while (!closest && (current = current.parentNode)) {
			if (Object(_web_native_js_commons_arr_intersect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(contextCategories, Schema.getCategoriesFor(current)).length
				&& Schema.assertNodeBelongsInContentModel(current, nodeSchema ? (nodeSchema.type || node) : node)
			) {
				closest = current;
			}
		}
		return closest === scope;
	},
	
	/**
	 * Flattens the schema rules for the given element.
	 *
	 * @param HTMLElement				el
	 * @param array						rules
	 *
	 * @return array
	 */
	expandRules(el, rules) {
		var rles = rules.reduce((categories, rule) => {
			if (Object(_web_native_js_commons_js_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(rule)) {
				if (el.matches(Object.keys(rule)[0])) {
					categories = categories.concat(Object.values(rule)[0]);
				}
			} else {
				categories.push(rule);
			}
			return categories;
		}, []);
		if (rles.includes('#sectioning-root')) {
			rles.push('#sectioning-content');
		}
		return rles;
	},
};

/**
 * @exports
 */
/* harmony default export */ __webpack_exports__["default"] = (Schema);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: params, Jsen, Reflex, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web-native-js/commons/arr/from.js */ "../commons/arr/from.js");
/* harmony import */ var _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web-native-js/jsen */ "../jsen/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Jsen", function() { return _web_native_js_jsen__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web-native-js/reflex */ "../reflex/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reflex", function() { return _web_native_js_reflex__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./params.js */ "./src/params.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "params", function() { return _params_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Chtml_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Chtml.js */ "./src/Chtml.js");

/**
 * @imports
 */






/**
 * ---------------------------
 * The client-build entry
 * ---------------------------
 */

/**
 * Configure CHTM with
 * a global window.
 */
(function(Window) {
	_Chtml_js__WEBPACK_IMPORTED_MODULE_4__["default"].init(Window, () => {
		var bundles = Object(_web_native_js_commons_arr_from_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Window.document.querySelectorAll(_params_js__WEBPACK_IMPORTED_MODULE_3__["default"].tagMap.bundle)).reverse();
		return bundles.map(b => {
			if (b.hasAttribute('src') && !b.content.children.length) {
				return new Promise(resolve => {
					b.addEventListener('bundleloadsuccess', () => resolve(b));
					b.addEventListener('bundleloaderror', () => resolve(b));
				});
			}
			return b;
		})
	});
})(undefined || window);

/**
 * @exports
 */

/* harmony default export */ __webpack_exports__["default"] = (_Chtml_js__WEBPACK_IMPORTED_MODULE_4__["default"]);


/***/ }),

/***/ "./src/params.js":
/*!***********************!*\
  !*** ./src/params.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * -----------------
 * Static parameters
 * used across CHTML
 * -----------------
 */
/* harmony default export */ __webpack_exports__["default"] = ({
	env: '',
	context:{},
	attrMap: {
		hint: 'data-tree',
		namespace: 'data-namespace',
		superrole: 'data-role',
		subrole: 'data-role',
		bundle: 'chtml-bundle',
		nocompose: ['nocompose', 'shadow',],
	},
	tagMap: {
		jsen: 'script[type="text/scoped-js"]',
		bundle: 'template[is="chtml-bundle"]',
		import: 'chtml-import',
	},
	treeProperty:'tree',
	bindingProperty:'binding',
	keyValAttributes:[],
	listAttributes:[],
	remodelCallback:null,
	recomposeCallback:null,
	hideDataBlockScript:true,
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbnMvYXJyL2RpdmlkZS5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9hcnIvZm9sbG93aW5nLmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL2Fyci9mcm9tLmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL2Fyci9pbnRlcnNlY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbnMvYXJyL3B1c2hVbmlxdWUuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbnMvYXJyL3VuaXF1ZS5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9qcy9pc0FycmF5LmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL2pzL2lzRW1wdHkuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbnMvanMvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9qcy9pc051bGwuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbnMvanMvaXNOdW1lcmljLmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL2pzL2lzT2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL2pzL2lzU3RyaW5nLmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL2pzL2lzVHlwZUFycmF5LmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL2pzL2lzVHlwZUZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL2pzL2lzVHlwZU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9qcy9pc1VuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9vYmovY29weS5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9vYmovZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9vYmovZ2V0QWxsUHJvcGVydHlOYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9vYmovZ2V0UHJvdG90eXBlQ2hhaW4uanMiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbnMvb2JqL21lcmdlLmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL29iai9tZXJnZUNhbGxiYWNrLmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL3N0ci9hZnRlci5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9ucy9zdHIvYmVmb3JlLmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL3N0ci9iZWZvcmVMYXN0LmpzIiwid2VicGFjazovLy8uLi9jb21tb25zL3N0ci91bndyYXAuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbnMvc3RyL3dyYXBwZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2RpZmZlcmVuY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2ZpcnN0LmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mbGF0dGVuLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mcm9tLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9pbnRlcnNlY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2xhc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL3B1c2hVbmlxdWUuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL3JlbW92ZS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvdW5pcXVlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2luc3RhbmNlb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc0Jvb2xlYW4uanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNFbXB0eS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzTnVsbC5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc051bWJlci5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc051bWVyaWMuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1R5cGVBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1R5cGVGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1R5cGVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNVbmRlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2NvbXBhcmVDYWxsYmFjay5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovY29weS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovY29weVBsYWluLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9lYWNoLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9ldmVuLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9nZXRBbGxQcm9wZXJ0eU5hbWVzLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9nZXRQcm90b3R5cGVDaGFpbi5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL21lcmdlQ2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL2FmdGVyLmpzIiwid2VicGFjazovLy8uLi9qc2VuL25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci9iZWZvcmUuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL2JlZm9yZUxhc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL3Vud3JhcC5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvd3JhcHBlZC5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvQ29udGV4dHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvQWJzdHJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvQWJzdHJhY3Rpb25JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL0FyZ3VtZW50c0ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9BcnIuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvQXJySW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL0Fzc2VydGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9Bc3NlcnRpb25JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvQXNzaWdubWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9Bc3NpZ25tZW50SW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL0Jvb2wuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvQm9vbEludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9DYWxsLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL0NhbGxJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvQ29tcGFyaXNvbi5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9Db21wYXJpc29uSW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL0NvbmRpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9Db25kaXRpb25JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvRGVsZXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvRGVsZXRpb25JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvRnVuYy5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9GdW5jSW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL0lmLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL0lmSW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL01hdGguanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvTWF0aEludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9OdW0uanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvTnVtSW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL09iai5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9PYmpJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvUHJlc2VuY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvUHJlc2VuY2VJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvUmVmZXJlbmNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL1JlZmVyZW5jZUludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9SZXR1cm4uanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvUmV0dXJuSW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHByL1N0YXRlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvU3RhdGVtZW50c0ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvRXhwci9TdHIuanMiLCJ3ZWJwYWNrOi8vLy4uL2pzZW4vc3JjL0V4cHIvU3RySW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9FeHBySW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9Kc2VuLmpzIiwid2VicGFjazovLy8uLi9qc2VuL3NyYy9MZXhlci5qcyIsIndlYnBhY2s6Ly8vLi4vanNlbi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvYWxsLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2NvbmNhdFVuaXF1ZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9jcm9zc0pvaW4uanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZXhjbHVkZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mcm9tLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2ludGVyc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9wdXNoVW5pcXVlLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL3JlbW92ZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci91bmlxdWUuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9nZXRUeXBlLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzQm9vbGVhbi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzRW1wdHkuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNOdWxsLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNOdW1iZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc051bWVyaWMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzUGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVHlwZUFycmF5LmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNUeXBlRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1R5cGVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1VuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9jb21wYXJlQ2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovY29weS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9lYWNoLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2V2ZW4uanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9nZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9ub2RlX21vZHVsZXMvQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovZ2V0QWxsUHJvcGVydHlOYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9nZXRQcm90b3R5cGVDaGFpbi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L25vZGVfbW9kdWxlcy9Ad2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9tZXJnZUNhbGxiYWNrLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvbm9kZV9tb2R1bGVzL0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL2FmdGVyLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvc3JjL19nZXRQcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9fc2V0UHJvcC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9idWlsZC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9kZWYuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9zcmMvZGVsLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvc3JjL2dldC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9oYXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9zcmMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9pbnRlcm5hbC9FdmVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9pbnRlcm5hbC9GaXJlYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9pbnRlcm5hbC9GaXJlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9pbnRlcm5hbC9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9pbnRlcm5hbC9MaXN0ZW5lckJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9zcmMvaW50ZXJuYWwvTXV0YXRpb25FdmVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9pbnRlcm5hbC9PYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9pbnRlcm5hbC9PYnNlcnZlckJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9zcmMvaW50ZXJuYWwvUXVlcnlFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9pbnRlcm5hbC9UcmFwLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvc3JjL2ludGVybmFsL1RyYXBCYXNlLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvc3JjL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9zcmMvbGluay5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9vYnNlcnZlLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvc3JjL29mZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9vbi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy9vd25LZXlzLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvc3JjL3NldC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy90cmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy90cmFwLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvc3JjL3RyaWdnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlZmxleC9zcmMvdW5saW5rLmpzIiwid2VicGFjazovLy8uLi9yZWZsZXgvc3JjL3Vub2JzZXJ2ZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVmbGV4L3NyYy91bnRyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NodG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9EaXJlY3RpdmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLWVudHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpbmcvTWF0cml4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpbmcvY3JlYXRlQnVuZGxlTWF0cml4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpbmcvZGVmaW5lQnVuZGxlRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvc2luZy9kZWZpbmVJbXBvcnRFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9zaW5nL3BhcnNlTmFtZXNwYWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpbmcvcmVjb21wb3NlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpbmcvcmVjb21wb3NlRGlyZWN0aXZlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9zaW5nL3JlY29tcG9zZU5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvY3JlYXRlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9kaXNjb25uZWN0ZWRDYWxsYmFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zY2hlbWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJhbXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtR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QUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ2UscUVBQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1cUJ0QjtBQUNBO0FBQ0E7QUFDMEQ7QUFDbkI7QUFDSTtBQUNWO0FBQ0Y7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsaURBQUs7QUFDTixnQkFBZ0Isa0ZBQVEsa0NBQWtDLGtEQUFNO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0YsQ0FBQyxFQUFFLFNBQUk7O0FBRVA7QUFDQTtBQUNBO0FBS0U7QUFDYSxnSEFBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2Jyb3dzZXItZW50cnkuanNcIik7XG4iLCJcclxuLyoqXHJcbiAqIE1ha2VzIGEgc2VwYXJhdGlvbiBiZXR3ZWVuIGl0ZW1zIHRoYXQgcGFzcyBhIGNhbGxiYWNrIHRlc3QgYW5kIHRob3NlIHRoYXQgZmFpbC5cclxuICpcclxuICogQHBhcmFtIGFycmF5XHQgXHRcdFx0XHRhcnJcclxuICogQHBhcmFtIGZ1bmN0aW9uXHRcdFx0XHRjYWxsYmFja1xyXG4gKlx0ICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyLCBjYWxsYmFjaykge1xyXG5cdHZhciBwYXNzZXMgPSBbXTtcclxuXHR2YXIgZmFpbHVyZXMgPSBbXTtcclxuXHR2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAoY2FsbGJhY2soYXJyW2ldKSkge1xyXG5cdFx0XHRwYXNzZXMucHVzaChhcnJbaV0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZmFpbHVyZXMucHVzaChhcnJbaV0pO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cdHJldHVybiBbcGFzc2VzLCBmYWlsdXJlc107XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNVbmRlZmluZWQgZnJvbSAnLi4vanMvaXNVbmRlZmluZWQuanMnO1xyXG5pbXBvcnQgX2lzRnVuY3Rpb24gZnJvbSAnLi4vanMvaXNGdW5jdGlvbi5qcyc7XHJcblxyXG4vKipcclxuICogMS4gUmV0dXJucyB0aGUgRU5UUlkgZm9sbG93aW5nIChlaXRoZXIgdGhlIEZJUlNUIG9yIHRoZSBMQVNUIGluc3RhbmNlIG9mKSB0aGUgcmVmZXJlbmNlLlxyXG4gKiAyLiBSZXR1cm5zIEEgTlVNQkVSIE9GIEVOVFJJRVMgY291bnRpbmcgZm9yd2FyZHMgZnJvbSAoZWl0aGVyIHRoZSBGSVJTVCBvciB0aGUgTEFTVCBpbnN0YW5jZSBvZikgdGhlIGdpdmVuIHJlZmVyZW5jZS5cclxuICpcclxuICogQHBhcmFtIGFycmF5IFx0XHRhcnJcclxuICogQHBhcmFtIG1peGVkXHQgXHRcdHJlZmVyZW5jZVxyXG4gKiBAcGFyYW0gaW50fGJvb2wgXHRcdGxlbmd0aFxyXG4gKiBAcGFyYW0gYm9vbHxmdW5jdGlvblx0IGxvb3BcclxuICogQHBhcmFtIGJvb2xcdCBcdFx0bGFzdFJlZmVyZW5jZVxyXG4gKlxyXG4gKiBAcmV0dXJuIG1peGVkfGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnIsIHJlZmVyZW5jZSwgbGVuZ3RoID0gZmFsc2UsIGxvb3AgPSBmYWxzZSwgbGFzdFJlZmVyZW5jZSA9IGZhbHNlKSB7XHJcblx0aWYgKGFyci5pbmRleE9mKHJlZmVyZW5jZSkgPT09IC0xKSB7XHJcblx0XHRyZXR1cm4gbGVuZ3RoID8gW10gOiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cdHZhciBhbW91bnQgPSBsZW5ndGggPT09IHRydWUgPyBhcnIubGVuZ3RoIC0gMSA6IChsZW5ndGggPT09IGZhbHNlID8gMSA6IGxlbmd0aCk7XHJcblx0dmFyIGZyb20gPSBsYXN0UmVmZXJlbmNlID8gYXJyLmxhc3RJbmRleE9mKHJlZmVyZW5jZSkgKyAxIDogYXJyLmluZGV4T2YocmVmZXJlbmNlKSArIDE7XHJcblx0dmFyIGFmdGVyID0gIV9pc1VuZGVmaW5lZChyZWZlcmVuY2UpID8gYXJyLnNsaWNlKGZyb20sIGZyb20gKyBhbW91bnQpIDogW107XHJcblx0aWYgKGxvb3AgJiYgYWZ0ZXIubGVuZ3RoIDwgYW1vdW50ICYmIGFmdGVyLmxlbmd0aCA8IGFyci5sZW5ndGgpIHtcclxuXHRcdGlmICghX2lzRnVuY3Rpb24obG9vcCkgfHwgbG9vcChhbW91bnQgLSBhZnRlci5sZW5ndGgpKSB7XHJcblx0XHRcdGFmdGVyID0gYWZ0ZXIuY29uY2F0KGFyci5zbGljZSgwLCBhbW91bnQgLSBhZnRlci5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsZW5ndGggPyBhZnRlciA6IGFmdGVyWzBdO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi4vanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNUeXBlQXJyYXkgZnJvbSAnLi4vanMvaXNUeXBlQXJyYXkuanMnO1xyXG5pbXBvcnQgX2lzRW1wdHkgZnJvbSAnLi4vanMvaXNFbXB0eS5qcyc7XHJcbmltcG9ydCBfaXNPYmplY3QgZnJvbSAnLi4vanMvaXNPYmplY3QuanMnO1xyXG5cclxuLyoqXHJcbiAqIENhc3RzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGFuIGFycmF5LlxyXG4gKlxyXG4gKiBAcGFyYW0gbWl4ZWQgXHR2YWxcclxuICogQHBhcmFtIGJvb2xcdCBcdGNhc3RPYmplY3RcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsLCBjYXN0T2JqZWN0ID0gdHJ1ZSkge1xyXG5cdGlmIChfaXNBcnJheSh2YWwpKSB7XHJcblx0XHRyZXR1cm4gdmFsO1xyXG5cdH07XHJcblx0aWYgKCFjYXN0T2JqZWN0ICYmIF9pc09iamVjdCh2YWwpKSB7XHJcblx0XHRyZXR1cm4gW3ZhbF07XHJcblx0fTtcclxuXHRpZiAodmFsICE9PSBmYWxzZSAmJiB2YWwgIT09IDAgJiYgX2lzRW1wdHkodmFsKSkge1xyXG5cdFx0cmV0dXJuIFtdO1xyXG5cdH07XHJcblx0aWYgKF9pc1R5cGVBcnJheSh2YWwpKSB7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodmFsKTtcclxuXHR9O1xyXG5cdGlmIChfaXNPYmplY3QodmFsKSkge1xyXG5cdFx0cmV0dXJuIE9iamVjdC52YWx1ZXModmFsKTtcclxuXHR9O1xyXG5cdHJldHVybiBbdmFsXTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4uL2pzL2lzQXJyYXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGludGVyc2VjdGlvbiBvZiB0d28gYXJyYXlzO1xyXG4gKiBvcHRpb25hbGx5IHVzaW5nIGEgY3VzdG9tIG1hdGNoaW5nIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXkgXHRhcnJcclxuICogQHBhcmFtIGFycmF5XHQgXHRhcnIyXHJcbiAqIEBwYXJhbSBmdW5jdGlvbiBcdGNhbGxiYWNrXHJcbiAqXHJcbiAqIEByZXR1cm4gYXJyYXlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFyciwgYXJyMiwgY2FsbGJhY2sgPSBudWxsKSB7XHJcblx0cmV0dXJuICFfaXNBcnJheShhcnIyKSA/IFtdIDogYXJyLmZpbHRlcih2YWwxID0+IGNhbGxiYWNrIFxyXG5cdFx0PyBhcnIyLmZpbHRlcih2YWwyID0+IGNhbGxiYWNrKHZhbDEsIHZhbDIpKS5sZW5ndGggXHJcblx0XHQ6IGFycjIuaW5kZXhPZih2YWwxKSAhPT0gLTFcclxuXHQpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEFkZHMgYW4gaXRlbSBpZiBub3QgYWxyZWFkeSBleGlzdC5cclxuICpcclxuICogQHBhcmFtIGFycmF5IFx0YXJyXHJcbiAqIEBwYXJhbSBhcnJheVx0IFx0Li4uaXRtc1xyXG4gKlxyXG4gKiBAcmV0dXJuIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnIsIC4uLml0ZW1zKSB7XHJcblx0aXRlbXMuZm9yRWFjaChpdG0gPT4ge1xyXG5cdFx0aWYgKGFyci5pbmRleE9mKGl0bSkgPCAwKSB7XHJcblx0XHRcdGFyci5wdXNoKGl0bSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiB1bmlxdWUgaXRlbXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheVx0IFx0XHRcdFx0YXJyXHJcbiAqXHQgKlxyXG4gKiBAcmV0dXJuIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnIpIHtcclxuXHRjb25zdCBkaXN0aW5jdCA9ICh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHtcclxuXHRcdHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcclxuXHR9O1xyXG5cdHJldHVybiBhcnIuZmlsdGVyKGRpc3RpbmN0KTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgb2YgdHlwZSBcImFycmF5XCIuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3RcdCBcdHZhbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbCkge1xyXG5cdHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNOdWxsIGZyb20gJy4vaXNOdWxsLmpzJztcclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICcuL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi9pc1R5cGVPYmplY3QuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBlbXB0eSBpbiBpdHMgb3duIHR5cGUuXHJcbiAqIFRoaXMgaG9sZHMgdHJ1ZSBmb3IgTlVMTHMsIFVOREVGSU5FRCwgRkFMU0UsIDAsXHJcbiAqIG9iamVjdHMgd2l0aG91dCBrZXlzLCBlbXB0eSBhcnJheXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gX2lzTnVsbCh2YWwpIHx8IF9pc1VuZGVmaW5lZCh2YWwpIHx8IHZhbCA9PT0gZmFsc2UgfHwgdmFsID09PSAwIFxyXG5cdFx0fHwgKF9pc1R5cGVPYmplY3QodmFsKSAmJiAhT2JqZWN0LmtleXModmFsKS5sZW5ndGgpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzVHlwZUZ1bmN0aW9uIGZyb20gJy4vaXNUeXBlRnVuY3Rpb24uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwiZnVuY3Rpb25cIi5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCBcdFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIF9pc1R5cGVGdW5jdGlvbih2YWwpIHx8ICh2YWwgJiYge30udG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBmdW5jdGlvbl0nKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgdW5kZWZpbmVkIG9yIGlzIG51bGwuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJyc7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogVGVsbHMgaWYgdmFsIGlzIG9mIHR5cGUgXCJzdHJpbmdcIiBvciBhIG51bWVyaWMgc3RyaW5nLlxyXG4gKiBUaGlzIGhvbGRzIHRydWUgZm9yIGJvdGggbnVtYmVycyBhbmQgbnVtZXJpYyBzdHJpbmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIHZhbCAhPT0gdHJ1ZSAmJiB2YWwgIT09IGZhbHNlICYmIHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09ICcnICYmICFpc05hTih2YWwgKiAxKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgcHVyZSBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3RcdCBcdHZhbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbCkge1xyXG5cdHJldHVybiAhQXJyYXkuaXNBcnJheSh2YWwpICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbDtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgb2YgdHlwZSBcInN0cmluZ1wiLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzU3RyaW5nIGZyb20gJy4vaXNTdHJpbmcuanMnO1xyXG5pbXBvcnQgX2lzVW5kZWZpbmVkIGZyb20gJy4vaXNVbmRlZmluZWQuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBcImFycmF5LWxpa2VcIi5cclxuICogVGhpcyBob2xkcyB0cnVlIGZvciBhbnl0aGluZyB0aGF0IGhhcyBhIGxlbmd0aCBwcm9wZXJ0eS5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuICFfaXNTdHJpbmcodmFsKSAmJiAhX2lzVW5kZWZpbmVkKHZhbC5sZW5ndGgpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwiZnVuY3Rpb25cIi5cclxuICogVGhpcyBob2xkcyB0cnVlIGZvciBib3RoIHJlZ3VsYXIgZnVuY3Rpb25zIGFuZCBjbGFzc2VzLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgb2YgdHlwZSBcIm9iamVjdFwiLlxyXG4gKiBUaGlzIGhvbGRzIHRydWUgZm9yIGFueXRoaW5nIG9iamVjdCwgaW5jbHVkaW5nIGJ1aWx0LWlucy5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSB8fCB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgdW5kZWZpbmVkIG9yIGlzIG9mIHR5cGUgXCJ1bmRlZmluZWRcIi5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyBcdHZhbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbCkge1xyXG5cdHJldHVybiBhcmd1bWVudHMubGVuZ3RoICYmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICcuLi9qcy9pc0FycmF5LmpzJztcclxuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJy4uL2pzL2lzRnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgX2lzTnVtZXJpYyBmcm9tICcuLi9qcy9pc051bWVyaWMuanMnO1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICcuLi9qcy9pc1R5cGVPYmplY3QuanMnO1xyXG5pbXBvcnQgX21lcmdlQ2FsbGJhY2sgZnJvbSAnLi9tZXJnZUNhbGxiYWNrLmpzJztcclxuXHJcbi8qKlxyXG4gKiBDb3BpZXMgYW4gb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHRvYmpcclxuICogQHBhcmFtIGFycmF5XHRcdCBcdGZpbHRlclxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqLCBmaWx0ZXIgPSBbXSwgd2l0aFN5bWJvbHMgPSB0cnVlKSB7XHJcblx0dmFyIGRlcHRoID0gMDtcclxuXHRpZiAoX2lzTnVtZXJpYyhhcmd1bWVudHNbMF0pICYmIF9pc1R5cGVPYmplY3QoYXJndW1lbnRzWzFdKSkge1xyXG5cdFx0ZGVwdGggPSBhcmd1bWVudHNbMF07XHJcblx0XHRvYmogPSBhcmd1bWVudHNbMV07XHJcblx0XHRmaWx0ZXIgPSBhcmd1bWVudHNbMl0gfHwgW107XHJcblx0fVxyXG5cdHJldHVybiBfbWVyZ2VDYWxsYmFjayhbZGVwdGgsIHt9LCBvYmpdLCAoa2V5LCBvYmoxLCBvYmoyKSA9PiB7XHJcblx0XHRyZXR1cm4gX2lzRnVuY3Rpb24oZmlsdGVyKSA/IGZpbHRlcihrZXkpIFxyXG5cdFx0XHQ6IChfaXNBcnJheShmaWx0ZXIpICYmIGZpbHRlci5sZW5ndGggPyBmaWx0ZXIuaW5kZXhPZihrZXkpID4gLTEgOiB0cnVlKTtcclxuXHR9LCBmYWxzZS8qZGVlcFByb3BzKi8sIGZhbHNlLyppc1JlcGxhY2UqLywgd2l0aFN5bWJvbHMpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICcuLi9qcy9pc1R5cGVPYmplY3QuanMnO1xyXG5pbXBvcnQgX2lzTnVtZXJpYyBmcm9tICcuLi9qcy9pc051bWVyaWMuanMnO1xyXG5cclxuLyoqXHJcbiAqIExvb3BzIHRocnUgb2JqIGZsYXRseSB3aXRoIGEgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIFN0b3BzIHdoZW4gY2FsbGJhY2sgcmV0dXJucyBhIG5vbi11bmRlZmluZWQgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3QgXHRcdFx0b2JqIFx0XHRcdFRoZSBhcnJheSBvciBvYmplY3QgdG8gaXRlcmF0ZS5cclxuICogQHBhcmFtIGZ1bmN0aW9uIFx0XHRcdFx0Y2FsbGJhY2sgXHRcdFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICpcclxuICogQHJldHVybiBtaXhlZHxudWxsXHRcdFx0QW55IG5vbi1udWxsIHJldHVybiBmcm9tIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmosIGNhbGxiYWNrKSB7XHJcblx0dmFyIHJldHVyblZhbHVlID0gdW5kZWZpbmVkO1xyXG5cdGlmIChfaXNUeXBlT2JqZWN0KG9iaikpIHtcclxuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaCgoaywgaSkgPT4ge1xyXG5cdFx0XHRpZiAocmV0dXJuVmFsdWUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuVmFsdWUgPSBjYWxsYmFjayhfaXNOdW1lcmljKGspID8gcGFyc2VGbG9hdChrKSA6IGssIG9ialtrXSwgaSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfcHVzaFVuaXF1ZSBmcm9tICcuLi9hcnIvcHVzaFVuaXF1ZS5qcyc7XHJcbmltcG9ydCBfZ2V0UHJvdG90eXBlQ2hhaW4gZnJvbSAnLi9nZXRQcm90b3R5cGVDaGFpbi5qcyc7XHJcblxyXG4vKipcclxuICogRWFnZXJseSByZXRyaWV2ZXMgb2JqZWN0IG1lbWJlcnMgYWxsIGRvd24gdGhlIHByb3RvdHlwZSBjaGFpbi5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0b2JqXHJcbiAqIEBwYXJhbSBvYmplY3RcdCBcdHVudGlsXHJcbiAqXHJcbiAqIEByZXR1cm4gYXJyYXlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iaiwgdW50aWwpIHtcclxuXHR2YXIga2V5c0FsbCA9IFtdO1xyXG5cdF9nZXRQcm90b3R5cGVDaGFpbihvYmosIHVudGlsKS5mb3JFYWNoKG9iaiA9PiB7XHJcblx0XHRfcHVzaFVuaXF1ZShrZXlzQWxsLCAuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKTtcclxuXHR9KTtcclxuXHRyZXR1cm4ga2V5c0FsbDtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4uL2pzL2lzQXJyYXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHByb3RvdHlwZSBjaGFpbi5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCBcdFx0b2JqXHJcbiAqIEBwYXJhbSBvYmplY3RcdCBcdHVudGlsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqLCB1bnRpbCkge1xyXG5cdHVudGlsID0gdW50aWwgfHwgT2JqZWN0LnByb3RvdHlwZTtcclxuXHR1bnRpbCA9IHVudGlsICYmICFfaXNBcnJheSh1bnRpbCkgPyBbdW50aWxdIDogdW50aWw7XHJcblx0Ly8gV2UgZ2V0IHRoZSBjaGFpbiBvZiBpbmhlcml0YW5jZVxyXG5cdHZhciBwcm90b3R5cGFsQ2hhaW4gPSBbXTtcclxuXHR2YXIgb2JqID0gb2JqO1xyXG5cdHdoaWxlKChvYmogJiYgKCF1bnRpbCB8fCB1bnRpbC5pbmRleE9mKG9iaikgPCAwKSAmJiBvYmoubmFtZSAhPT0gJ2RlZmF1bHQnKSkge1xyXG5cdFx0cHJvdG90eXBhbENoYWluLnB1c2gob2JqKTtcclxuXHRcdG9iaiA9IG9iaiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopIDogbnVsbDtcclxuXHR9XHJcblx0cmV0dXJuIHByb3RvdHlwYWxDaGFpbjtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9tZXJnZUNhbGxiYWNrIGZyb20gJy4vbWVyZ2VDYWxsYmFjay5qcyc7XHJcblxyXG4vKipcclxuICAqIE1lcmdlcyB2YWx1ZXMgZnJvbSBzdWJzZXF1ZW50IGFycmF5cy9vYmplY3RzIGZpcnN0IGFycmF5L29iamVjdDtcclxuICAqIG9wdGlvbmFsbHkgcmVjdXJzaXZlXHJcbiAgKlxyXG4gICogQHBhcmFtIGFycmF5IC4uLm9ianNcclxuICAqXHJcbiAgKiBAcmV0dXJuIHZvaWRcclxuICAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiguLi5vYmpzKSB7XHJcblx0cmV0dXJuIF9tZXJnZUNhbGxiYWNrKG9ianMsIChrLCBvYmoxLCBvYmoyKSA9PiB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LCBmYWxzZS8qZGVlcFByb3BzKi8sIGZhbHNlLyppc1JlcGxhY2UqLywgZmFsc2UvKndpdGhTeW1ib2xzKi8pO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi4vanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICcuLi9qcy9pc0Z1bmN0aW9uLmpzJztcclxuaW1wb3J0IF9pc09iamVjdCBmcm9tICcuLi9qcy9pc09iamVjdC5qcyc7XHJcbmltcG9ydCBfaXNUeXBlT2JqZWN0IGZyb20gJy4uL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBfaXNOdW1lcmljIGZyb20gJy4uL2pzL2lzTnVtZXJpYy5qcyc7XHJcbmltcG9ydCBfZ2V0QWxsUHJvcGVydHlOYW1lcyBmcm9tICcuL2dldEFsbFByb3BlcnR5TmFtZXMuanMnO1xyXG5cclxuLyoqXHJcbiAgKiBNZXJnZXMgdmFsdWVzIGZyb20gc3Vic2VxdWVudCBhcnJheXMvb2JqZWN0cyBmaXJzdCBhcnJheS9vYmplY3Q7XHJcbiAgKiBvcHRpb25hbGx5IHJlY3Vyc2l2ZVxyXG4gICpcclxuICAqIEBwYXJhbSBhcnJheSAuLi5vYmpzXHJcbiAgKlxyXG4gICogQHJldHVybiB2b2lkXHJcbiAgKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VDYWxsYmFjayhvYmpzLCBjYWxsYmFjaywgZGVlcFByb3BzID0gZmFsc2UsIGlzUmVwbGFjZSA9IGZhbHNlLCB3aXRoU3ltYm9scyA9IHRydWUpIHtcclxuXHR2YXIgZGVwdGggPSAwO1xyXG5cdHZhciBvYmoxID0gb2Jqcy5zaGlmdCgpO1xyXG5cdGlmIChfaXNOdW1lcmljKG9iajEpIHx8IG9iajEgPT09IHRydWUgfHwgb2JqMSA9PT0gZmFsc2UpIHtcclxuXHRcdGRlcHRoID0gb2JqMTtcclxuXHRcdG9iajEgPSBvYmpzLnNoaWZ0KCk7XHJcblx0fVxyXG5cdGlmICghb2Jqcy5sZW5ndGgpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignX21lcmdlKCkgcmVxdWlyZXMgdHdvIG9yIG1vcmUgYXJyYXkvb2JqZWN0cy4nKTtcclxuXHR9XHJcblx0b2Jqcy5mb3JFYWNoKChvYmoyLCBpKSA9PiB7XHJcblx0XHRpZiAoIV9pc1R5cGVPYmplY3Qob2JqMikgJiYgIV9pc0Z1bmN0aW9uKG9iajIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdChkZWVwUHJvcHMgPyBfZ2V0QWxsUHJvcGVydHlOYW1lcyhvYmoyKSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iajIpKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdHZhciB2YWxBdE9iajEgPSBvYmoxW2tleV07XHJcblx0XHRcdHZhciB2YWxBdE9iajIgPSBvYmoyW2tleV07XHJcblx0XHRcdGlmICgoKF9pc0FycmF5KHZhbEF0T2JqMSkgJiYgX2lzQXJyYXkodmFsQXRPYmoyKSkgfHwgKF9pc09iamVjdCh2YWxBdE9iajEpICYmIF9pc09iamVjdCh2YWxBdE9iajIpKSkgXHJcblx0XHRcdCYmIChkZXB0aCA9PT0gdHJ1ZSB8fCBkZXB0aCA+IDApKSB7XHJcblx0XHRcdFx0Ly8gUkVDVVJTRS4uLlxyXG5cdFx0XHRcdG9iajFba2V5XSA9IF9pc0FycmF5KHZhbEF0T2JqMSkgJiYgX2lzQXJyYXkodmFsQXRPYmoyKSA/IFtdIDoge307XHJcblx0XHRcdFx0bWVyZ2VDYWxsYmFjayhbX2lzTnVtZXJpYyhkZXB0aCkgPyBkZXB0aCAtIDEgOiBkZXB0aCwgb2JqMVtrZXldLCB2YWxBdE9iajEsIHZhbEF0T2JqMl0sIGNhbGxiYWNrLCBkZWVwUHJvcHMsIGlzUmVwbGFjZSwgd2l0aFN5bWJvbHMpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGNhbGxiYWNrKGtleSwgb2JqMSwgb2JqMiwgaSkpIHtcclxuXHRcdFx0XHRpZiAoX2lzQXJyYXkob2JqMSkgJiYgX2lzQXJyYXkob2JqMikpIHtcclxuXHRcdFx0XHRcdGlmIChpc1JlcGxhY2UpIHtcclxuXHRcdFx0XHRcdFx0b2JqMVtrZXldID0gdmFsQXRPYmoyO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0b2JqMS5wdXNoKHZhbEF0T2JqMik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIEluIGNhc2Ugd2UncmUgc2V0dGluZyBhIHJlYWQtb25seSBwcm9wZXJ0eVxyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0aWYgKHdpdGhTeW1ib2xzKSB7XHJcblx0XHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmoyLCBrZXkpKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRvYmoxW2tleV0gPSBvYmoyW2tleV07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gY2F0Y2goZSkge31cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cdHJldHVybiBvYmoxO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFJldHVybiB0aGUgcmVtYWluZGVyIG9mIGEgc3RyaW5nIGFmdGVyIGEgZ2l2ZW4gdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgc3RyaW5nICBzdWJqZWN0XHJcbiAqIEBwYXJhbSAgc3RyaW5nICBzZWFyY2hcclxuICogQHBhcmFtICBib29sXHQgICBhZnRlckxhc3RcclxuICpcclxuICogQHJldHVybiBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN1YmplY3QsIHNlYXJjaCwgYWZ0ZXJMYXN0ID0gZmFsc2UpIHtcclxuXHRpZiAoc2VhcmNoID09ICcnKSB7XHJcblx0XHRyZXR1cm4gc3ViamVjdDtcclxuXHR9XHJcblx0dmFyIHBvcyA9IGFmdGVyTGFzdCA/IHN1YmplY3QubGFzdEluZGV4T2Yoc2VhcmNoKSA6IHN1YmplY3QuaW5kZXhPZihzZWFyY2gpO1xyXG5cdGlmIChwb3MgPT09IC0xKSB7XHJcblx0XHRyZXR1cm4gJyc7XHJcblx0fVxyXG5cdHJldHVybiBzdWJqZWN0LnN1YnN0cihwb3MgKyBzZWFyY2gubGVuZ3RoKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHBhcnQgb2YgYSBzdHJpbmcgYmVmb3JlIGEgZ2l2ZW4gdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgc3RyaW5nICBzdWJqZWN0XHJcbiAqIEBwYXJhbSAgc3RyaW5nICBzZWFyY2hcclxuICogQHBhcmFtICBib29sXHQgICBiZWZvcmVMYXN0XHJcbiAqXHJcbiAqIEByZXR1cm4gc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdWJqZWN0LCBzZWFyY2gsIGJlZm9yZUxhc3QgPSBmYWxzZSkge1xyXG5cdGlmIChzZWFyY2ggPT0gJycpIHtcclxuXHRcdHJldHVybiBzdWJqZWN0O1xyXG5cdH1cclxuXHR2YXIgcG9zID0gYmVmb3JlTGFzdCA/IHN1YmplY3QubGFzdEluZGV4T2Yoc2VhcmNoKSA6IHN1YmplY3QuaW5kZXhPZihzZWFyY2gpO1xyXG5cdGlmIChwb3MgPT09IC0xKSB7XHJcblx0XHRyZXR1cm4gc3ViamVjdDtcclxuXHR9XHJcblx0cmV0dXJuIHN1YmplY3Quc3Vic3RyKDAsIHBvcyk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfYmVmb3JlIGZyb20gJy4vYmVmb3JlLmpzJztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHBhcnQgb2YgYSBzdHJpbmcgYmVmb3JlIGxhc3Qgb2NjdXJlbmNlIG9mIGEgZ2l2ZW4gdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgc3RyaW5nICBzdWJqZWN0XHJcbiAqIEBwYXJhbSAgc3RyaW5nICBzZWFyY2hcclxuICpcclxuICogQHJldHVybiBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN1YmplY3QsIHNlYXJjaCkge1xyXG5cdHJldHVybiBfYmVmb3JlKHN1YmplY3QsIHNlYXJjaCwgdHJ1ZSk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfYWZ0ZXIgZnJvbSAnLi9hZnRlci5qcyc7XHJcbmltcG9ydCBfYmVmb3JlTGFzdCBmcm9tICcuL2JlZm9yZUxhc3QuanMnO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHN0cmluZyB3aXRob3V0IHRoZSBnaXZlbiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSAgc3RyaW5nICBzdWJqZWN0XHJcbiAqIEBwYXJhbSAgc3RyaW5nICBvcGVuaW5nVGFnXHJcbiAqIEBwYXJhbSAgc3RyaW5nICBjbG9zaW5nVGFnXHJcbiAqXHJcbiAqIEByZXR1cm4gc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdWJqZWN0LCBvcGVuaW5nVGFnLCBjbG9zaW5nVGFnKSB7XHJcblx0cmV0dXJuIF9iZWZvcmVMYXN0KF9hZnRlcihzdWJqZWN0LCBvcGVuaW5nVGFnKSwgY2xvc2luZ1RhZyk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogVGVsbHMgaWYgdGhlIHN0cmluZyBpcyB3YXJhcHBlZCB3aXRoIHRoZSBnaXZlbiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSAgc3RyaW5nICBzdWJqZWN0XHJcbiAqIEBwYXJhbSAgc3RyaW5nICBvcGVuaW5nVGFnXHJcbiAqIEBwYXJhbSAgc3RyaW5nICBjbG9zaW5nVGFnXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3ViamVjdCwgb3BlbmluZ1RhZywgY2xvc2luZ1RhZykge1xyXG5cdHJldHVybiBzdWJqZWN0LnN0YXJ0c1dpdGgob3BlbmluZ1RhZykgJiYgc3ViamVjdC5lbmRzV2l0aChjbG9zaW5nVGFnKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4uL2pzL2lzQXJyYXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIGFycmF5cztcclxuICogb3B0aW9uYWxseSB1c2luZyBhIGN1c3RvbSBtYXRjaGluZyBmdW5jdGlvbi5cclxuICpcclxuICogQHBhcmFtIGFycmF5IFx0YXJyXHJcbiAqIEBwYXJhbSBhcnJheVx0IFx0YXJyMlxyXG4gKiBAcGFyYW0gZnVuY3Rpb24gXHRjYWxsYmFja1xyXG4gKlxyXG4gKiBAcmV0dXJuIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnIsIGFycjIsIGNhbGxiYWNrID0gbnVsbCkge1xyXG5cdHJldHVybiAhX2lzQXJyYXkoYXJyMikgPyBbXSA6IGFyci5maWx0ZXIodmFsMSA9PiBjYWxsYmFjayBcclxuXHRcdD8gYXJyMi5maWx0ZXIodmFsMiA9PiBjYWxsYmFjayh2YWwxLCB2YWwyKSkubGVuZ3RoIFxyXG5cdFx0OiBhcnIyLmluZGV4T2YodmFsMSkgPT09IC0xXHJcblx0KTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBSZXR1cm5zIFRIRSBGSVJTVCBFTlRSWSBPUiBBIE5VTUJFUiBPRiBFTlRSSUVTIGNvdW50aW5nIGZvcndhcmQgZnJvbSB0aGUgYmVnaW5pbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheSBcdGFyclxyXG4gKiBAcGFyYW0gaW50XHQgXHRhbW91bnRcclxuICpcclxuICogQHJldHVybiBtaXhlZHxhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyLCBhbW91bnQgPSAxKSB7XHJcblx0dmFyIGNvdW50ID0gMDtcclxuXHRhcnIuZm9yRWFjaChpdG0gPT4ge1xyXG5cdFx0Y291bnQgKys7XHJcblx0fSk7XHJcblx0dmFyIGZpcnN0cyA9IGFyci5zbGljZShhcnIubGVuZ3RoIC0gY291bnQsIGFtb3VudCk7XHJcblx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gZmlyc3RzIDogZmlyc3RzWzBdO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi4vanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNPYmplY3QgZnJvbSAnLi4vanMvaXNPYmplY3QuanMnO1xyXG5pbXBvcnQgX2lzTnVtZXJpYyBmcm9tICcuLi9qcy9pc051bWVyaWMuanMnO1xyXG5cclxuLyoqXHJcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5IHRvIHRoZSBnaXZlbiBkZXB0aC5cclxuICpcclxuICogQHBhcmFtIGFycmF5IFx0YXJyXHJcbiAqIEBwYXJhbSBpbnQgXHQgXHRkZXB0aFxyXG4gKiBAcGFyYW0gYm9vbCBcdCBcdHdpdGhPYmplY3RzXHJcbiAqXHJcbiAqIEByZXR1cm4gYXJyYXlcclxuICovXHJcbmNvbnN0IF9mbGF0dGVuID0gZnVuY3Rpb24oYXJyLCBkZXB0aCA9IDEsIHdpdGhPYmplY3RzID0gdHJ1ZSkge1xyXG5cdGlmICghX2lzTnVtZXJpYyhkZXB0aCkgfHwgZGVwdGggPD0gMCkge1xyXG5cdFx0cmV0dXJuIGFycjtcclxuXHR9O1xyXG5cdGlmICghX2lzQXJyYXkoYXJyKSAmJiBfaXNPYmplY3QoYXJyKSAmJiB3aXRoT2JqZWN0cykge1xyXG5cdFx0YXJyID0gT2JqZWN0LnZhbHVlcyhhcnIpO1xyXG5cdH07XHJcblx0aWYgKCFfaXNBcnJheShhcnIpKSB7XHJcblx0XHRyZXR1cm4gYXJyO1xyXG5cdH07XHJcblx0cmV0dXJuIGFyci5yZWR1Y2UoKGFjYywgdmFsKSA9PiBfaXNBcnJheSh2YWwpIHx8IChfaXNPYmplY3QodmFsKSAmJiB3aXRoT2JqZWN0cykgXHJcblx0XHQ/IGFjYy5jb25jYXQoX2ZsYXR0ZW4oIV9pc0FycmF5KHZhbCkgPyBPYmplY3QudmFsdWVzKHZhbCkgOiB2YWwsIGRlcHRoIC0gMSwgd2l0aE9iamVjdHMpKSBcclxuXHRcdDogYWNjLmNvbmNhdCh2YWwpLCBbXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IF9mbGF0dGVuOyIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICcuLi9qcy9pc0FycmF5LmpzJztcclxuaW1wb3J0IF9pc1R5cGVBcnJheSBmcm9tICcuLi9qcy9pc1R5cGVBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNFbXB0eSBmcm9tICcuLi9qcy9pc0VtcHR5LmpzJztcclxuaW1wb3J0IF9pc09iamVjdCBmcm9tICcuLi9qcy9pc09iamVjdC5qcyc7XHJcblxyXG4vKipcclxuICogQ2FzdHMgYW4gYXJyYXktbGlrZSBvYmplY3QgdG8gYW4gYXJyYXkuXHJcbiAqXHJcbiAqIEBwYXJhbSBtaXhlZCBcdHZhbFxyXG4gKiBAcGFyYW0gYm9vbFx0IFx0Y2FzdE9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwsIGNhc3RPYmplY3QgPSB0cnVlKSB7XHJcblx0aWYgKF9pc0FycmF5KHZhbCkpIHtcclxuXHRcdHJldHVybiB2YWw7XHJcblx0fTtcclxuXHRpZiAoIWNhc3RPYmplY3QgJiYgX2lzT2JqZWN0KHZhbCkpIHtcclxuXHRcdHJldHVybiBbdmFsXTtcclxuXHR9O1xyXG5cdGlmICh2YWwgIT09IGZhbHNlICYmIHZhbCAhPT0gMCAmJiBfaXNFbXB0eSh2YWwpKSB7XHJcblx0XHRyZXR1cm4gW107XHJcblx0fTtcclxuXHRpZiAoX2lzVHlwZUFycmF5KHZhbCkpIHtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh2YWwpO1xyXG5cdH07XHJcblx0aWYgKF9pc09iamVjdCh2YWwpKSB7XHJcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh2YWwpO1xyXG5cdH07XHJcblx0cmV0dXJuIFt2YWxdO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi4vanMvaXNBcnJheS5qcyc7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgaW50ZXJzZWN0aW9uIG9mIHR3byBhcnJheXM7XHJcbiAqIG9wdGlvbmFsbHkgdXNpbmcgYSBjdXN0b20gbWF0Y2hpbmcgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheSBcdGFyclxyXG4gKiBAcGFyYW0gYXJyYXlcdCBcdGFycjJcclxuICogQHBhcmFtIGZ1bmN0aW9uIFx0Y2FsbGJhY2tcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyLCBhcnIyLCBjYWxsYmFjayA9IG51bGwpIHtcclxuXHRyZXR1cm4gIV9pc0FycmF5KGFycjIpID8gW10gOiBhcnIuZmlsdGVyKHZhbDEgPT4gY2FsbGJhY2sgXHJcblx0XHQ/IGFycjIuZmlsdGVyKHZhbDIgPT4gY2FsbGJhY2sodmFsMSwgdmFsMikpLmxlbmd0aCBcclxuXHRcdDogYXJyMi5pbmRleE9mKHZhbDEpICE9PSAtMVxyXG5cdCk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfZmlyc3QgZnJvbSAnLi9maXJzdC5qcyc7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBUSEUgTEFTVCBFTlRSWSBPUiBBIE5VTUJFUiBPRiBFTlRSSUVTIGNvdW50aW5nIGZvcndhcmQgdG8gdGhlIGVuZC5cclxuICpcclxuICogQHBhcmFtIGFycmF5IFx0YXJyXHJcbiAqIEBwYXJhbSBpbnRcdCBcdGFtb3VudFxyXG4gKlxyXG4gKiBAcmV0dXJuIG1peGVkfGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnIsIGFtb3VudCA9IDEpIHtcclxuXHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDFcclxuXHRcdD8gX2ZpcnN0KGFyci5zbGljZSgpLnJldmVyc2UoKSwgYW1vdW50KS5yZXZlcnNlKClcclxuXHRcdDogX2ZpcnN0KGFyci5zbGljZSgpLnJldmVyc2UoKSk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQWRkcyBhbiBpdGVtIGlmIG5vdCBhbHJlYWR5IGV4aXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXkgXHRhcnJcclxuICogQHBhcmFtIGFycmF5XHQgXHQuLi5pdG1zXHJcbiAqXHJcbiAqIEByZXR1cm4gYXJyYXlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFyciwgLi4uaXRlbXMpIHtcclxuXHRpdGVtcy5mb3JFYWNoKGl0bSA9PiB7XHJcblx0XHRpZiAoYXJyLmluZGV4T2YoaXRtKSA8IDApIHtcclxuXHRcdFx0YXJyLnB1c2goaXRtKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFJlbW92ZXMgaW5zdGFuY2VzIG9mIHJlZmVyZW5jZSB1cCB0byA8bGltaXQ+IHRpbWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXkgXHRhcnJcclxuICogQHBhcmFtIG1peGVkXHQgXHRpdG1cclxuICogQHBhcmFtIGludHxib29sIFx0bGltaXRcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyLCBpdG0sIGxpbWl0ID0gZmFsc2UpIHtcclxuXHR2YXIgaSA9IGFyci5pbmRleE9mKGl0bSk7XHJcblx0d2hpbGUgKGkgPiAtMSAmJiAobGltaXQgfHwgbGltaXQgPT09IGZhbHNlKSkge1xyXG5cdFx0YXJyLnNwbGljZShpLCAxKTtcclxuXHRcdGlmIChsaW1pdCA+IDApIHtcclxuXHRcdFx0bGltaXQgLS07XHJcblx0XHR9O1xyXG5cdFx0aSA9IGFyci5pbmRleE9mKGl0bSk7XHJcblx0fTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFJldHVybnMgYSBsaXN0IG9mIHVuaXF1ZSBpdGVtcy5cclxuICpcclxuICogQHBhcmFtIGFycmF5XHQgXHRcdFx0XHRhcnJcclxuICpcdCAqXHJcbiAqIEByZXR1cm4gYXJyYXlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFycikge1xyXG5cdGNvbnN0IGRpc3RpbmN0ID0gKHZhbHVlLCBpbmRleCwgc2VsZikgPT4ge1xyXG5cdFx0cmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xyXG5cdH07XHJcblx0cmV0dXJuIGFyci5maWx0ZXIoZGlzdGluY3QpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEluc3RhbmNlb2YgdGhhdCBzdXBwb3J0cyBvdXIgbXVsdGktaW5oZXJpdGFuY2UgaW1wbGVtZW50c3Rpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3RcdCBcdG9iajFcclxuICogQHBhcmFtIG9iamVjdFx0IFx0Y2xhc3NCXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqLCBjbGFzc0IpIHtcclxuXHRpZiAoIW9iaikge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRpZiAob2JqIGluc3RhbmNlb2YgY2xhc3NCKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0dmFyIG1peGluVGVzdCA9IGNsYXNzQSA9PiB7XHJcblx0XHR3aGlsZSAoY2xhc3NBICYmIGNsYXNzQSAhPT0gRnVuY3Rpb24ucHJvdG90eXBlKSB7XHJcblx0XHRcdGlmIChjbGFzc0EgPT09IGNsYXNzQiB8fCAoY2xhc3NBLnByb3RvdHlwZXMgJiYgY2xhc3NBLnByb3RvdHlwZXMucmVkdWNlKChwcmV2QW5zLCBwcm90b3R5cGUpID0+IHByZXZBbnMgfHwgKHByb3RvdHlwZSA9PT0gY2xhc3NCKSB8fCBtaXhpblRlc3QocHJvdG90eXBlKSwgZmFsc2UpKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNsYXNzQSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjbGFzc0EpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHJcblx0cmV0dXJuIG1peGluVGVzdChvYmouY29uc3RydWN0b3IpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwiYXJyYXlcIi5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgdW5kZWZpbmVkIG9yIGlzIG9mIHR5cGUgXCJib29sZWFuXCIuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2U7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNOdWxsIGZyb20gJy4vaXNOdWxsLmpzJztcclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICcuL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi9pc1R5cGVPYmplY3QuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBlbXB0eSBpbiBpdHMgb3duIHR5cGUuXHJcbiAqIFRoaXMgaG9sZHMgdHJ1ZSBmb3IgTlVMTHMsIFVOREVGSU5FRCwgRkFMU0UsIDAsXHJcbiAqIG9iamVjdHMgd2l0aG91dCBrZXlzLCBlbXB0eSBhcnJheXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gX2lzTnVsbCh2YWwpIHx8IF9pc1VuZGVmaW5lZCh2YWwpIHx8IHZhbCA9PT0gZmFsc2UgfHwgdmFsID09PSAwIFxyXG5cdFx0fHwgKF9pc1R5cGVPYmplY3QodmFsKSAmJiAhT2JqZWN0LmtleXModmFsKS5sZW5ndGgpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzVHlwZUZ1bmN0aW9uIGZyb20gJy4vaXNUeXBlRnVuY3Rpb24uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwiZnVuY3Rpb25cIi5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCBcdFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIF9pc1R5cGVGdW5jdGlvbih2YWwpIHx8ICh2YWwgJiYge30udG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBmdW5jdGlvbl0nKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgdW5kZWZpbmVkIG9yIGlzIG51bGwuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJyc7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogVGVsbHMgaWYgdmFsIGlzIG9mIHR5cGUgXCJudW1iZXJcIi5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyBcdHZhbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbCkge1xyXG5cdHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgb2YgdHlwZSBcInN0cmluZ1wiIG9yIGEgbnVtZXJpYyBzdHJpbmcuXHJcbiAqIFRoaXMgaG9sZHMgdHJ1ZSBmb3IgYm90aCBudW1iZXJzIGFuZCBudW1lcmljIHN0cmluZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdmFsICE9PSB0cnVlICYmIHZhbCAhPT0gZmFsc2UgJiYgdmFsICE9PSBudWxsICYmIHZhbCAhPT0gJycgJiYgIWlzTmFOKHZhbCAqIDEpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBwdXJlIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuICFBcnJheS5pc0FycmF5KHZhbCkgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIGFuIG9iamVjdCBpcyBkaXJlY3QgaW5zdGFuY2Ugb2YgT2JqZWN0LnByb3RvdHlwZS5cclxuICogUXVpdGUgdXNlZnVsIGluIGRpZmZlcmVudGlhdGluZyBuYXRpdmUgb2JqZWN0cyBhbmQgY2xhc3MgaW5zdGFuY2VzIGZyb20gcGxhaW4gb2JqZWN0cyAoe30pLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IFx0b2JqXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqKSB7XHJcblx0cmV0dXJuIF9pc09iamVjdChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBPYmplY3QucHJvdG90eXBlO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwic3RyaW5nXCIuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnLi9pc1N0cmluZy5qcyc7XHJcbmltcG9ydCBfaXNVbmRlZmluZWQgZnJvbSAnLi9pc1VuZGVmaW5lZC5qcyc7XHJcblxyXG4vKipcclxuICogVGVsbHMgaWYgdmFsIGlzIFwiYXJyYXktbGlrZVwiLlxyXG4gKiBUaGlzIGhvbGRzIHRydWUgZm9yIGFueXRoaW5nIHRoYXQgaGFzIGEgbGVuZ3RoIHByb3BlcnR5LlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gIV9pc1N0cmluZyh2YWwpICYmICFfaXNVbmRlZmluZWQodmFsLmxlbmd0aCk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogVGVsbHMgaWYgdmFsIGlzIG9mIHR5cGUgXCJmdW5jdGlvblwiLlxyXG4gKiBUaGlzIGhvbGRzIHRydWUgZm9yIGJvdGggcmVndWxhciBmdW5jdGlvbnMgYW5kIGNsYXNzZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3RcdCBcdHZhbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbCkge1xyXG5cdHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwib2JqZWN0XCIuXHJcbiAqIFRoaXMgaG9sZHMgdHJ1ZSBmb3IgYW55dGhpbmcgb2JqZWN0LCBpbmNsdWRpbmcgYnVpbHQtaW5zLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpIHx8IHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyB1bmRlZmluZWQgb3IgaXMgb2YgdHlwZSBcInVuZGVmaW5lZFwiLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggJiYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4uL2pzL2lzQXJyYXkuanMnO1xyXG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJy4uL2pzL2lzT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi4vanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc0Jvb2xlYW4gZnJvbSAnLi4vanMvaXNCb29sZWFuLmpzJztcclxuaW1wb3J0IF9lYWNoIGZyb20gJy4vZWFjaC5qcyc7XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgbWF0Y2goZXMpIGJldHdlZW4gKG1lbWJlcnMgb2YpIHR3byB2YWx1ZXM7XHJcbiAqIGFzc2VydGlvbiBvcHRpb25hbGx5IGN1c3RvbS5cclxuICpcclxuICogQHBhcmFtIG1peGVkIFx0XHRcdG9iMVxyXG4gKiBAcGFyYW0gbWl4ZWQgXHRcdFx0b2JqMlxyXG4gKiBAcGFyYW0gc3RyaW5nfGZ1bmN0aW9uXHRhc3NlcnRpb25cclxuICogQHBhcmFtIGJvb2xcdFx0XHRcdG5ldENvbXBhcmlzb25cclxuICogQHBhcmFtIGJvb2xcdFx0XHRcdGNvbnRyYXN0XHJcbiAqIEBwYXJhbSBib29sXHRcdFx0XHRyZXR1cm5PbkZpcnN0RmFsc2VcclxuICpcclxuICogQHJldHVybiBib29sfGFycmF5fG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqMSwgb2JqMiwgYXNzZXJ0aW9uID0gdHJ1ZSwgbmV0Q29tcGFyaXNvbiA9IHRydWUsIGNvbnRyYXN0ID0gZmFsc2UsIHJldHVybk9uRmlyc3RGYWxzZSA9IGZhbHNlKSB7XHJcblx0aWYgKF9pc0FycmF5KG9iajEpICYmIF9pc0FycmF5KG9iajIpKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHR2YXIgY29udG4gPSB0cnVlO1xyXG5cdFx0b2JqMS5mb3JFYWNoKHYxID0+IHtcclxuXHRcdFx0aWYgKCFjb250bikge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgdGVzdFBhc3MgPSBmYWxzZTtcclxuXHRcdFx0X2VhY2gob2JqMiwgKGssIHYyKSA9PiB7XHJcblx0XHRcdFx0aWYgKCF0ZXN0UGFzcyB8fCAobmV0Q29tcGFyaXNvbiAmJiBfaXNUeXBlT2JqZWN0KHYxKSkpIHtcclxuXHRcdFx0XHRcdHRlc3RQYXNzID0gYXNzZXJ0aW9uKHYxLCB2Mik7XHJcblx0XHRcdFx0XHRpZiAoKF9pc0FycmF5KHRlc3RQYXNzKSAmJiAhdGVzdFBhc3MubGVuZ3RoKSB8fCAoX2lzT2JqZWN0KHRlc3RQYXNzKSAmJiAhT2JqZWN0LmtleXModGVzdFBhc3MpLmxlbmd0aCkpIHtcclxuXHRcdFx0XHRcdFx0dGVzdFBhc3MgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChfaXNUeXBlT2JqZWN0KHRlc3RQYXNzKSAmJiBuZXRDb21wYXJpc29uKSB7XHJcblx0XHRcdFx0XHRcdC8vIEZ1cnRoZXIgcmVjdXJzaW9ucyBzaG91bGQgdXNlIHRoaXMgdGVzdFBhc3MgYXMgdjFcclxuXHRcdFx0XHRcdFx0djEgPSB0ZXN0UGFzcztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoX2lzVHlwZU9iamVjdCh0ZXN0UGFzcykpIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChuZXRDb21wYXJpc29uID8gdGVzdFBhc3MgOiB2MSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoIV9pc0Jvb2xlYW4odGVzdFBhc3MpKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2godGVzdFBhc3MpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKChjb250cmFzdCAmJiAhdGVzdFBhc3MpIHx8ICghY29udHJhc3QgJiYgdGVzdFBhc3MpKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2godjEpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHJldHVybk9uRmlyc3RGYWxzZSkge1xyXG5cdFx0XHRcdGNvbnRuID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblx0XHJcblx0aWYgKF9pc09iamVjdChvYmoxKSAmJiBfaXNPYmplY3Qob2JqMikpIHtcclxuXHRcdHZhciByZXN1bHQgPSB7fTtcclxuXHRcdHZhciBjb250biA9IHRydWU7XHJcblx0XHRPYmplY3Qua2V5cyhvYmoxKS5mb3JFYWNoKGsgPT4ge1xyXG5cdFx0XHRpZiAoIWNvbnRuKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciB0ZXN0UGFzcyA9IGFzc2VydGlvbihvYmoxW2tdLCBvYmoyW2tdKTtcclxuXHRcdFx0aWYgKChfaXNBcnJheSh0ZXN0UGFzcykgJiYgIXRlc3RQYXNzLmxlbmd0aCkgfHwgKF9pc09iamVjdCh0ZXN0UGFzcykgJiYgIU9iamVjdC5rZXlzKHRlc3RQYXNzKS5sZW5ndGgpKSB7XHJcblx0XHRcdFx0dGVzdFBhc3MgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoX2lzVHlwZU9iamVjdCh0ZXN0UGFzcykpIHtcclxuXHRcdFx0XHRyZXN1bHRba10gPSBuZXRDb21wYXJpc29uID8gdGVzdFBhc3MgOiBvYmoxW2tdO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCFfaXNCb29sZWFuKHRlc3RQYXNzKSkge1xyXG5cdFx0XHRcdHJlc3VsdFtrXSA9IHRlc3RQYXNzO1xyXG5cdFx0XHR9IGVsc2UgaWYgKChjb250cmFzdCAmJiAhdGVzdFBhc3MpIHx8ICghY29udHJhc3QgJiYgdGVzdFBhc3MpKSB7XHJcblx0XHRcdFx0cmVzdWx0W2tdID0gb2JqMVtrXTtcclxuXHRcdFx0fSBlbHNlIGlmIChyZXR1cm5PbkZpcnN0RmFsc2UpIHtcclxuXHRcdFx0XHRjb250biA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi4vanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICcuLi9qcy9pc0Z1bmN0aW9uLmpzJztcclxuaW1wb3J0IF9pc051bWVyaWMgZnJvbSAnLi4vanMvaXNOdW1lcmljLmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi4vanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9tZXJnZUNhbGxiYWNrIGZyb20gJy4vbWVyZ2VDYWxsYmFjay5qcyc7XHJcblxyXG4vKipcclxuICogQ29waWVzIGFuIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0b2JqXHJcbiAqIEBwYXJhbSBhcnJheVx0XHQgXHRmaWx0ZXJcclxuICpcclxuICogQHJldHVybiBvYmplY3RcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iaiwgZmlsdGVyID0gW10sIHdpdGhTeW1ib2xzID0gdHJ1ZSkge1xyXG5cdHZhciBkZXB0aCA9IDA7XHJcblx0aWYgKF9pc051bWVyaWMoYXJndW1lbnRzWzBdKSAmJiBfaXNUeXBlT2JqZWN0KGFyZ3VtZW50c1sxXSkpIHtcclxuXHRcdGRlcHRoID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0b2JqID0gYXJndW1lbnRzWzFdO1xyXG5cdFx0ZmlsdGVyID0gYXJndW1lbnRzWzJdIHx8IFtdO1xyXG5cdH1cclxuXHRyZXR1cm4gX21lcmdlQ2FsbGJhY2soW2RlcHRoLCB7fSwgb2JqXSwgKGtleSwgb2JqMSwgb2JqMikgPT4ge1xyXG5cdFx0cmV0dXJuIF9pc0Z1bmN0aW9uKGZpbHRlcikgPyBmaWx0ZXIoa2V5KSBcclxuXHRcdFx0OiAoX2lzQXJyYXkoZmlsdGVyKSAmJiBmaWx0ZXIubGVuZ3RoID8gZmlsdGVyLmluZGV4T2Yoa2V5KSA+IC0xIDogdHJ1ZSk7XHJcblx0fSwgZmFsc2UvKmRlZXBQcm9wcyovLCBmYWxzZS8qaXNSZXBsYWNlKi8sIHdpdGhTeW1ib2xzKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4uL2pzL2lzQXJyYXkuanMnO1xyXG5pbXBvcnQgX2lzRnVuY3Rpb24gZnJvbSAnLi4vanMvaXNGdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBfbWVyZ2VDYWxsYmFjayBmcm9tICcuL21lcmdlQ2FsbGJhY2suanMnO1xyXG5cclxuLyoqXHJcbiAqIENvcGllcyBvbmx5IHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHRvYmpcclxuICogQHBhcmFtIGFycmF5XHRcdCBcdG9ubHlcclxuICogQHBhcmFtIGFycmF5XHRcdCBcdGV4Y2VwdFxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqLCBmaWx0ZXIgPSBbXSkge1xyXG5cdHJldHVybiBfbWVyZ2VDYWxsYmFjayhbe30sIG9ial0sIChrZXksIG9iajEsIG9iajIpID0+IHtcclxuXHRcdGlmICghX2lzRnVuY3Rpb24ob2JqMltrZXldKSkge1xyXG5cdFx0XHRyZXR1cm4gX2lzRnVuY3Rpb24oZmlsdGVyKSA/IGZpbHRlcihrZXkpIFxyXG5cdFx0XHRcdDogKF9pc0FycmF5KGZpbHRlcikgJiYgZmlsdGVyLmxlbmd0aCA/IGZpbHRlci5pbmRleE9mKGtleSkgPiAtMSA6IHRydWUpO1xyXG5cdFx0fVxyXG5cdH0sIGZhbHNlLypkZWVwUHJvcHMqLywgZmFsc2UvKmlzUmVwbGFjZSovLCBmYWxzZS8qd2l0aFN5bWJvbHMqLyk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNUeXBlT2JqZWN0IGZyb20gJy4uL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBfaXNOdW1lcmljIGZyb20gJy4uL2pzL2lzTnVtZXJpYy5qcyc7XHJcblxyXG4vKipcclxuICogTG9vcHMgdGhydSBvYmogZmxhdGx5IHdpdGggYSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICogU3RvcHMgd2hlbiBjYWxsYmFjayByZXR1cm5zIGEgbm9uLXVuZGVmaW5lZCB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIGFycmF5fG9iamVjdCBcdFx0XHRvYmogXHRcdFx0VGhlIGFycmF5IG9yIG9iamVjdCB0byBpdGVyYXRlLlxyXG4gKiBAcGFyYW0gZnVuY3Rpb24gXHRcdFx0XHRjYWxsYmFjayBcdFx0VGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIG1peGVkfG51bGxcdFx0XHRBbnkgbm9uLW51bGwgcmV0dXJuIGZyb20gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iaiwgY2FsbGJhY2spIHtcclxuXHR2YXIgcmV0dXJuVmFsdWUgPSB1bmRlZmluZWQ7XHJcblx0aWYgKF9pc1R5cGVPYmplY3Qob2JqKSkge1xyXG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrLCBpKSA9PiB7XHJcblx0XHRcdGlmIChyZXR1cm5WYWx1ZSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm5WYWx1ZSA9IGNhbGxiYWNrKF9pc051bWVyaWMoaykgPyBwYXJzZUZsb2F0KGspIDogaywgb2JqW2tdLCBpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJldHVybiByZXR1cm5WYWx1ZTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc051bWJlciBmcm9tICcuLi9qcy9pc051bWJlci5qcyc7XHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICcuLi9qcy9pc0FycmF5LmpzJztcclxuaW1wb3J0IF9pc09iamVjdCBmcm9tICcuLi9qcy9pc09iamVjdC5qcyc7XHJcbmltcG9ydCBfaXNUeXBlT2JqZWN0IGZyb20gJy4uL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICcuLi9qcy9pc0Z1bmN0aW9uLmpzJztcclxuaW1wb3J0IF9pc1BsYWluT2JqZWN0IGZyb20gJy4uL2pzL2lzUGxhaW5PYmplY3QuanMnO1xyXG5pbXBvcnQgX2NvbXBhcmVDYWxsYmFjayBmcm9tICcuL2NvbXBhcmVDYWxsYmFjay5qcyc7XHJcblxyXG4vKipcclxuICogQXNzZXJ0cyAobWVtYmVycyBvZikgdGhlIGZpcnN0IHZhbHVlIGFnYWluc3QgKG1lbWJlcnMgb2YpIHN1YnNlcXVlbnQgdmFsdWVzLlxyXG4gKiBBc3NlcnRpb24gY291bGQgYmUgVFJVRSwgRkFMU0UsIG9yIGN1c3RvbS5cclxuICpcclxuICogQHBhcmFtIG1peGVkIFx0XHRcdG9iajFcclxuICogQHBhcmFtIG1peGVkIFx0XHRcdG9iajJcclxuICogQHBhcmFtIGJvb2x8ZnVuY3Rpb25cdFx0YXNzZXJ0aW9uXHJcbiAqIEBwYXJhbSBpbnRcdFx0XHRcdGRlcHRoXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuY29uc3QgX2V2ZW4gPSBmdW5jdGlvbihvYmoxLCBvYmoyLCBhc3NlcnRpb24gPSB0cnVlLCBkZXB0aCA9IDEpIHtcclxuXHRpZiAoX2lzQXJyYXkob2JqMSkgJiYgX2lzQXJyYXkob2JqMikgJiYgb2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gIWFzc2VydGlvbjtcclxuXHR9XHJcblx0aWYgKF9pc09iamVjdChvYmoxKSAmJiBfaXNPYmplY3Qob2JqMikpIHtcclxuXHRcdHZhciBvYmoxS2V5cyA9IE9iamVjdC5rZXlzKG9iajEpO1xyXG5cdFx0dmFyIG9iajJLZXlzID0gT2JqZWN0LmtleXMob2JqMik7XHJcblx0XHRpZiAoIW9iajFLZXlzLmxlbmd0aCAmJiAhb2JqMktleXMubGVuZ3RoKSB7XHJcblx0XHRcdC8vIE9iamVjdHMgdGhhdCB3b24ndCBzaG93IGtleXMgbXVzdCBiZSBjb21wYXJlZCBieSBpbnN0YW5jZVxyXG5cdFx0XHQvLyBNYW55IG5hdGl2ZSBvYmplY3RzIHdvbid0LiBTbyB3ZSBjYW4ndCBqdWRnZSBieSBrZXlzIGFsb25lLlxyXG5cdFx0XHRyZXR1cm4gX2lzUGxhaW5PYmplY3Qob2JqMSkgJiYgX2lzUGxhaW5PYmplY3Qob2JqMikgXHJcblx0XHRcdFx0PyBhc3NlcnRpb25cclxuXHRcdFx0XHQ6IChvYmoxID09PSBvYmoyKSA9PT0gYXNzZXJ0aW9uO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFfZXZlbihvYmoxS2V5cywgb2JqMktleXMpKSB7XHJcblx0XHRcdHJldHVybiAhYXNzZXJ0aW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZiAoZGVwdGggPiAwICYmICgoX2lzQXJyYXkob2JqMSkgJiYgX2lzQXJyYXkob2JqMikpIHx8IChfaXNPYmplY3Qob2JqMSkgJiYgX2lzT2JqZWN0KG9iajIpKSkpIHtcclxuXHRcdHZhciByZXN1bHQgPSBfY29tcGFyZUNhbGxiYWNrKG9iajEsIG9iajIsICh2MSwgdjIpID0+IHtcclxuXHRcdFx0cmV0dXJuIF9ldmVuKHYxLCB2MiwgYXNzZXJ0aW9uLCBkZXB0aCAtIDEpO1xyXG5cdFx0fSwgZmFsc2UvKm5ldENvbXBhcmlzb24qLywgZmFsc2UvKmNvbnRyYXN0Ki8sIHRydWUvKnJldHVybk9uRmlyc3RGYWxzZSovKTtcclxuXHRcdHJldHVybiBfaXNBcnJheShyZXN1bHQpIFxyXG5cdFx0XHQ/IHJlc3VsdC5sZW5ndGggPT09IG9iajEubGVuZ3RoICYmIHJlc3VsdC5sZW5ndGggPT09IG9iajIubGVuZ3RoIFxyXG5cdFx0XHQ6IChfaXNPYmplY3QocmVzdWx0KSAmJiBfaXNPYmplY3Qob2JqMSkgXHJcblx0XHRcdFx0PyBPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aCA9PT0gT2JqZWN0LmtleXMob2JqMSkubGVuZ3RoICYmIE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID09PSAgT2JqZWN0LmtleXMob2JqMikubGVuZ3RoIFxyXG5cdFx0XHRcdDogcmVzdWx0KTtcclxuXHR9XHJcblx0cmV0dXJuIF9pc0Z1bmN0aW9uKGFzc2VydGlvbikgPyBhc3NlcnRpb24ob2JqMSwgb2JqMikgOiAoXHJcblx0XHRfaXNOdW1iZXIob2JqMSkgJiYgX2lzTnVtYmVyKG9iajIpICYmIGlzTmFOKG9iajEpICYmIGlzTmFOKG9iajIpIFxyXG5cdFx0XHQ/IGFzc2VydGlvbiBcclxuXHRcdFx0OiAob2JqMSA9PT0gb2JqMikgPT09IGFzc2VydGlvblxyXG5cdCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IF9ldmVuO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX3B1c2hVbmlxdWUgZnJvbSAnLi4vYXJyL3B1c2hVbmlxdWUuanMnO1xyXG5pbXBvcnQgX2dldFByb3RvdHlwZUNoYWluIGZyb20gJy4vZ2V0UHJvdG90eXBlQ2hhaW4uanMnO1xyXG5cclxuLyoqXHJcbiAqIEVhZ2VybHkgcmV0cmlldmVzIG9iamVjdCBtZW1iZXJzIGFsbCBkb3duIHRoZSBwcm90b3R5cGUgY2hhaW4uXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3RcdCBcdG9ialxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHR1bnRpbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmosIHVudGlsKSB7XHJcblx0dmFyIGtleXNBbGwgPSBbXTtcclxuXHRfZ2V0UHJvdG90eXBlQ2hhaW4ob2JqLCB1bnRpbCkuZm9yRWFjaChvYmogPT4ge1xyXG5cdFx0X3B1c2hVbmlxdWUoa2V5c0FsbCwgLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSk7XHJcblx0fSk7XHJcblx0cmV0dXJuIGtleXNBbGw7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICcuLi9qcy9pc0FycmF5LmpzJztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwcm90b3R5cGUgY2hhaW4uXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgXHRcdG9ialxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHR1bnRpbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iaiwgdW50aWwpIHtcclxuXHR1bnRpbCA9IHVudGlsIHx8IE9iamVjdC5wcm90b3R5cGU7XHJcblx0dW50aWwgPSB1bnRpbCAmJiAhX2lzQXJyYXkodW50aWwpID8gW3VudGlsXSA6IHVudGlsO1xyXG5cdC8vIFdlIGdldCB0aGUgY2hhaW4gb2YgaW5oZXJpdGFuY2VcclxuXHR2YXIgcHJvdG90eXBhbENoYWluID0gW107XHJcblx0dmFyIG9iaiA9IG9iajtcclxuXHR3aGlsZSgob2JqICYmICghdW50aWwgfHwgdW50aWwuaW5kZXhPZihvYmopIDwgMCkgJiYgb2JqLm5hbWUgIT09ICdkZWZhdWx0JykpIHtcclxuXHRcdHByb3RvdHlwYWxDaGFpbi5wdXNoKG9iaik7XHJcblx0XHRvYmogPSBvYmogPyBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA6IG51bGw7XHJcblx0fVxyXG5cdHJldHVybiBwcm90b3R5cGFsQ2hhaW47XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfbWVyZ2VDYWxsYmFjayBmcm9tICcuL21lcmdlQ2FsbGJhY2suanMnO1xyXG5cclxuLyoqXHJcbiAgKiBNZXJnZXMgdmFsdWVzIGZyb20gc3Vic2VxdWVudCBhcnJheXMvb2JqZWN0cyBmaXJzdCBhcnJheS9vYmplY3Q7XHJcbiAgKiBvcHRpb25hbGx5IHJlY3Vyc2l2ZVxyXG4gICpcclxuICAqIEBwYXJhbSBhcnJheSAuLi5vYmpzXHJcbiAgKlxyXG4gICogQHJldHVybiB2b2lkXHJcbiAgKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oLi4ub2Jqcykge1xyXG5cdHJldHVybiBfbWVyZ2VDYWxsYmFjayhvYmpzLCAoaywgb2JqMSwgb2JqMikgPT4ge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSwgZmFsc2UvKmRlZXBQcm9wcyovLCBmYWxzZS8qaXNSZXBsYWNlKi8sIGZhbHNlLyp3aXRoU3ltYm9scyovKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4uL2pzL2lzQXJyYXkuanMnO1xyXG5pbXBvcnQgX2lzRnVuY3Rpb24gZnJvbSAnLi4vanMvaXNGdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBfaXNPYmplY3QgZnJvbSAnLi4vanMvaXNPYmplY3QuanMnO1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICcuLi9qcy9pc1R5cGVPYmplY3QuanMnO1xyXG5pbXBvcnQgX2lzTnVtZXJpYyBmcm9tICcuLi9qcy9pc051bWVyaWMuanMnO1xyXG5pbXBvcnQgX2dldEFsbFByb3BlcnR5TmFtZXMgZnJvbSAnLi9nZXRBbGxQcm9wZXJ0eU5hbWVzLmpzJztcclxuXHJcbi8qKlxyXG4gICogTWVyZ2VzIHZhbHVlcyBmcm9tIHN1YnNlcXVlbnQgYXJyYXlzL29iamVjdHMgZmlyc3QgYXJyYXkvb2JqZWN0O1xyXG4gICogb3B0aW9uYWxseSByZWN1cnNpdmVcclxuICAqXHJcbiAgKiBAcGFyYW0gYXJyYXkgLi4ub2Jqc1xyXG4gICpcclxuICAqIEByZXR1cm4gdm9pZFxyXG4gICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ2FsbGJhY2sob2JqcywgY2FsbGJhY2ssIGRlZXBQcm9wcyA9IGZhbHNlLCBpc1JlcGxhY2UgPSBmYWxzZSwgd2l0aFN5bWJvbHMgPSB0cnVlKSB7XHJcblx0dmFyIGRlcHRoID0gMDtcclxuXHR2YXIgb2JqMSA9IG9ianMuc2hpZnQoKTtcclxuXHRpZiAoX2lzTnVtZXJpYyhvYmoxKSB8fCBvYmoxID09PSB0cnVlIHx8IG9iajEgPT09IGZhbHNlKSB7XHJcblx0XHRkZXB0aCA9IG9iajE7XHJcblx0XHRvYmoxID0gb2Jqcy5zaGlmdCgpO1xyXG5cdH1cclxuXHRpZiAoIW9ianMubGVuZ3RoKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ19tZXJnZSgpIHJlcXVpcmVzIHR3byBvciBtb3JlIGFycmF5L29iamVjdHMuJyk7XHJcblx0fVxyXG5cdG9ianMuZm9yRWFjaCgob2JqMiwgaSkgPT4ge1xyXG5cdFx0aWYgKCFfaXNUeXBlT2JqZWN0KG9iajIpICYmICFfaXNGdW5jdGlvbihvYmoyKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQoZGVlcFByb3BzID8gX2dldEFsbFByb3BlcnR5TmFtZXMob2JqMikgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmoyKSkuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR2YXIgdmFsQXRPYmoxID0gb2JqMVtrZXldO1xyXG5cdFx0XHR2YXIgdmFsQXRPYmoyID0gb2JqMltrZXldO1xyXG5cdFx0XHRpZiAoKChfaXNBcnJheSh2YWxBdE9iajEpICYmIF9pc0FycmF5KHZhbEF0T2JqMikpIHx8IChfaXNPYmplY3QodmFsQXRPYmoxKSAmJiBfaXNPYmplY3QodmFsQXRPYmoyKSkpIFxyXG5cdFx0XHQmJiAoZGVwdGggPT09IHRydWUgfHwgZGVwdGggPiAwKSkge1xyXG5cdFx0XHRcdC8vIFJFQ1VSU0UuLi5cclxuXHRcdFx0XHRvYmoxW2tleV0gPSBfaXNBcnJheSh2YWxBdE9iajEpICYmIF9pc0FycmF5KHZhbEF0T2JqMikgPyBbXSA6IHt9O1xyXG5cdFx0XHRcdG1lcmdlQ2FsbGJhY2soW19pc051bWVyaWMoZGVwdGgpID8gZGVwdGggLSAxIDogZGVwdGgsIG9iajFba2V5XSwgdmFsQXRPYmoxLCB2YWxBdE9iajJdLCBjYWxsYmFjaywgZGVlcFByb3BzLCBpc1JlcGxhY2UsIHdpdGhTeW1ib2xzKTtcclxuXHRcdFx0fSBlbHNlIGlmIChjYWxsYmFjayhrZXksIG9iajEsIG9iajIsIGkpKSB7XHJcblx0XHRcdFx0aWYgKF9pc0FycmF5KG9iajEpICYmIF9pc0FycmF5KG9iajIpKSB7XHJcblx0XHRcdFx0XHRpZiAoaXNSZXBsYWNlKSB7XHJcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IHZhbEF0T2JqMjtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdG9iajEucHVzaCh2YWxBdE9iajIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBJbiBjYXNlIHdlJ3JlIHNldHRpbmcgYSByZWFkLW9ubHkgcHJvcGVydHlcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdGlmICh3aXRoU3ltYm9scykge1xyXG5cdFx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqMiwga2V5KSk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0b2JqMVtrZXldID0gb2JqMltrZXldO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGNhdGNoKGUpIHt9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHRyZXR1cm4gb2JqMTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHJlbWFpbmRlciBvZiBhIHN0cmluZyBhZnRlciBhIGdpdmVuIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHN0cmluZyAgc3ViamVjdFxyXG4gKiBAcGFyYW0gIHN0cmluZyAgc2VhcmNoXHJcbiAqIEBwYXJhbSAgYm9vbFx0ICAgYWZ0ZXJMYXN0XHJcbiAqXHJcbiAqIEByZXR1cm4gc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdWJqZWN0LCBzZWFyY2gsIGFmdGVyTGFzdCA9IGZhbHNlKSB7XHJcblx0aWYgKHNlYXJjaCA9PSAnJykge1xyXG5cdFx0cmV0dXJuIHN1YmplY3Q7XHJcblx0fVxyXG5cdHZhciBwb3MgPSBhZnRlckxhc3QgPyBzdWJqZWN0Lmxhc3RJbmRleE9mKHNlYXJjaCkgOiBzdWJqZWN0LmluZGV4T2Yoc2VhcmNoKTtcclxuXHRpZiAocG9zID09PSAtMSkge1xyXG5cdFx0cmV0dXJuICcnO1xyXG5cdH1cclxuXHRyZXR1cm4gc3ViamVjdC5zdWJzdHIocG9zICsgc2VhcmNoLmxlbmd0aCk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogUmV0dXJuIHRoZSBwYXJ0IG9mIGEgc3RyaW5nIGJlZm9yZSBhIGdpdmVuIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHN0cmluZyAgc3ViamVjdFxyXG4gKiBAcGFyYW0gIHN0cmluZyAgc2VhcmNoXHJcbiAqIEBwYXJhbSAgYm9vbFx0ICAgYmVmb3JlTGFzdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3ViamVjdCwgc2VhcmNoLCBiZWZvcmVMYXN0ID0gZmFsc2UpIHtcclxuXHRpZiAoc2VhcmNoID09ICcnKSB7XHJcblx0XHRyZXR1cm4gc3ViamVjdDtcclxuXHR9XHJcblx0dmFyIHBvcyA9IGJlZm9yZUxhc3QgPyBzdWJqZWN0Lmxhc3RJbmRleE9mKHNlYXJjaCkgOiBzdWJqZWN0LmluZGV4T2Yoc2VhcmNoKTtcclxuXHRpZiAocG9zID09PSAtMSkge1xyXG5cdFx0cmV0dXJuIHN1YmplY3Q7XHJcblx0fVxyXG5cdHJldHVybiBzdWJqZWN0LnN1YnN0cigwLCBwb3MpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2JlZm9yZSBmcm9tICcuL2JlZm9yZS5qcyc7XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBwYXJ0IG9mIGEgc3RyaW5nIGJlZm9yZSBsYXN0IG9jY3VyZW5jZSBvZiBhIGdpdmVuIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHN0cmluZyAgc3ViamVjdFxyXG4gKiBAcGFyYW0gIHN0cmluZyAgc2VhcmNoXHJcbiAqXHJcbiAqIEByZXR1cm4gc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdWJqZWN0LCBzZWFyY2gpIHtcclxuXHRyZXR1cm4gX2JlZm9yZShzdWJqZWN0LCBzZWFyY2gsIHRydWUpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2FmdGVyIGZyb20gJy4vYWZ0ZXIuanMnO1xyXG5pbXBvcnQgX2JlZm9yZUxhc3QgZnJvbSAnLi9iZWZvcmVMYXN0LmpzJztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBzdHJpbmcgd2l0aG91dCB0aGUgZ2l2ZW4gb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHN0cmluZyAgc3ViamVjdFxyXG4gKiBAcGFyYW0gIHN0cmluZyAgb3BlbmluZ1RhZ1xyXG4gKiBAcGFyYW0gIHN0cmluZyAgY2xvc2luZ1RhZ1xyXG4gKlxyXG4gKiBAcmV0dXJuIHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3ViamVjdCwgb3BlbmluZ1RhZywgY2xvc2luZ1RhZykge1xyXG5cdHJldHVybiBfYmVmb3JlTGFzdChfYWZ0ZXIoc3ViamVjdCwgb3BlbmluZ1RhZyksIGNsb3NpbmdUYWcpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHRoZSBzdHJpbmcgaXMgd2FyYXBwZWQgd2l0aCB0aGUgZ2l2ZW4gb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHN0cmluZyAgc3ViamVjdFxyXG4gKiBAcGFyYW0gIHN0cmluZyAgb3BlbmluZ1RhZ1xyXG4gKiBAcGFyYW0gIHN0cmluZyAgY2xvc2luZ1RhZ1xyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN1YmplY3QsIG9wZW5pbmdUYWcsIGNsb3NpbmdUYWcpIHtcclxuXHRyZXR1cm4gc3ViamVjdC5zdGFydHNXaXRoKG9wZW5pbmdUYWcpICYmIHN1YmplY3QuZW5kc1dpdGgoY2xvc2luZ1RhZyk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNUeXBlT2JqZWN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNGdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1N0cmluZy5qcyc7XHJcbmltcG9ydCBfaXNOdW1iZXIgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc051bWJlci5qcyc7XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHRzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBjb250ZXh0IHN0YWNrLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFueVx0XHQgXHRtYWluQ29udGV4dFxyXG5cdCAqIEBwYXJhbSBDb250ZXh0c1x0IFx0c3VwZXJDb250ZXh0XHJcblx0ICogQHBhcmFtIG9iamVjdFx0IFx0bG9jYWxDb250ZXh0XHJcblx0ICogQHBhcmFtIG9iamVjdFx0IFx0bG9jYWxDb250ZXh0TWV0YVxyXG5cdCAqXHJcblx0ICogQHJldHVybiBDb250ZXh0c1xyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKG1haW5Db250ZXh0LCBzdXBlckNvbnRleHQgPSBudWxsLCBsb2NhbENvbnRleHQgPSB7fSwgbG9jYWxDb250ZXh0TWV0YSA9IHt9KSB7XHJcblx0XHR0aGlzLm1haW5Db250ZXh0ID0gbWFpbkNvbnRleHQ7XHJcblx0XHR0aGlzLnN1cGVyQ29udGV4dCA9IHN1cGVyQ29udGV4dCA/IENvbnRleHRzLmNyZWF0ZShzdXBlckNvbnRleHQpIDogbnVsbDtcclxuXHRcdHRoaXMubG9jYWxDb250ZXh0ID0gbG9jYWxDb250ZXh0XHJcblx0XHR0aGlzLmxvY2FsQ29udGV4dE1ldGEgPSBsb2NhbENvbnRleHRNZXRhXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFRyaWVzIHRoZSBoYW5kbGVyIG9uIHRoZSBkaWZmZXJlbnQgY29udGV4dHMgaW4gdGhlIHN0YWNrLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZ3xudW1iZXIgXHRwcm9wXHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uXHRcdCBcdGNhbGxiYWNrXHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uXHRcdCBcdGZpbmFsXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIENvbnRleHRzXHJcblx0ICovXHJcblx0aGFuZGxlKHByb3AsIGNhbGxiYWNrLCBmaW5hbCwgbGV2ZWwgPSAwKSB7XHJcblx0XHR2YXIgY2FsbE1haW4gPSAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayh0aGlzLm1haW5Db250ZXh0LCBudWxsLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc3VwZXJDb250ZXh0KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdXBlckNvbnRleHQuaGFuZGxlKHByb3AsIGNhbGxiYWNrLCBmaW5hbCwgbGV2ZWwgKyAxKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGZpbmFsKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmluYWwoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIGxldmVsKTtcclxuXHRcdH07XHJcblx0XHRpZiAocHJvcCA9PT0gJ3RvU3RyaW5nJyAmJiB0aGlzLmxvY2FsQ29udGV4dC50b1N0cmluZyA9PT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZykge1xyXG5cdFx0XHRyZXR1cm4gY2FsbE1haW4oKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBjYWxsYmFjayh0aGlzLmxvY2FsQ29udGV4dCwgdGhpcy5sb2NhbENvbnRleHRNZXRhLCBjYWxsTWFpbiwgbGV2ZWwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIHByb3BlcnR5J3MgdmFsdWUgZnJvbSB0aGUgZmlyc3QgcG9zc2Vzc2luZyBjb250ZXh0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZ3xudW1iZXIgcHJvcFxyXG5cdCAqIEBwYXJhbSBvYmplY3RcdFx0dHJhcFxyXG5cdCAqIEBwYXJhbSBib29sXHRcdFx0YmluZFRoaXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRnZXQocHJvcCwgdHJhcCA9IHt9LCBiaW5kVGhpcyA9IHRydWUpIHtcclxuXHRcdGlmIChwcm9wIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcblx0XHRcdC8vIGluY2FzZSB3ZSByZWNpZXZlZCBuZXcgU3RyaW5nKClcclxuXHRcdFx0cHJvcCA9IHByb3AgKyAnJztcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmhhbmRsZShwcm9wLCAoY29udHh0T2JqLCBjb250eHRNZXRhLCBhZHZhbmNlLCBsZXZlbCkgPT4ge1xyXG5cdFx0XHR2YXIgdmFsID0gX2dldChjb250eHRPYmosIHByb3AsIHRyYXApO1xyXG5cdFx0XHQvLyBhc2tpbmcgZmlyc3QgbXVnaHQgbm90IGdvIHdlbGwgZ2VuZXJhbGx5ICYmIF9oYXModGhpc1tpXSwgcHJvcCwgdHJhcClcclxuXHRcdFx0aWYgKCFfaXNVbmRlZmluZWQodmFsKSB8fCBfaGFzKGNvbnR4dE9iaiwgcHJvcCwgdHJhcCkpIHtcclxuXHRcdFx0XHRpZiAoX2lzRnVuY3Rpb24odmFsKSAmJiBiaW5kVGhpcykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHZhbC5iaW5kKGNvbnR4dE9iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB2YWw7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGFkdmFuY2UoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIGEgcHJvcGVydHkncyB2YWx1ZSBmcm9tIHRoZSBmaXJzdCBwb3NzZXNzaW5nIGNvbnRleHQuXHJcblx0ICogT3IgYWRkcyBhIG5ldyBjb250ZXh0IHRvIHNldCB0aGUgcHJvcGVydHkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nfG51bWJlciBwcm9wXHJcblx0ICogQHBhcmFtIG1peGVkXHRcdFx0dmFsXHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHR0cmFwXHJcblx0ICogQHBhcmFtIGJvb2xcdFx0XHRpbml0S2V5d29yZFxyXG5cdCAqXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c2V0KHByb3AsIHZhbCwgdHJhcCA9IHt9LCBpbml0S2V5d29yZCA9IGZhbHNlKSB7XHJcblx0XHRpZiAocHJvcCBpbnN0YW5jZW9mIFN0cmluZykge1xyXG5cdFx0XHQvLyBpbmNhc2Ugd2UgcmVjaWV2ZWQgbmV3IFN0cmluZygpXHJcblx0XHRcdHByb3AgPSBwcm9wICsgJyc7XHJcblx0XHR9XHJcblx0XHRjb25zdCBfc2V0ID0gKGNudHh0LCBwcm9wLCB2YWwsIHRyYXApID0+IHtcclxuXHRcdFx0aWYgKHRyYXAuc2V0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRyYXAuc2V0KGNudHh0LCBwcm9wLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNudHh0W3Byb3BdID0gdmFsO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gdGhpcy5oYW5kbGUoaW5pdEtleXdvcmQgPyB0cnVlIDogcHJvcCwgKGNvbnR4dE9iaiwgbG9jYWxDb250eHRNZXRhLCBhZHZhbmNlKSA9PiB7XHJcblx0XHRcdC8vIFdoYXRldmVyIHRoZSBsZXZlbCBvZiBsb2NhbENvbnRleHQuLi5cclxuXHRcdFx0aWYgKGxvY2FsQ29udHh0TWV0YSAmJiBsb2NhbENvbnR4dE1ldGFbcHJvcF0gPT09ICdjb25zdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NPTlNUICcgKyBwcm9wICsgJ2Nhbm5vdCBiZSBtb2RpZmllZCEnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBTZXQgdGhpcyBsb2NhbGx5LCB3ZSB3b250IGJlIGdldHRpbmcgdG8gYWR2YW5jZSgpXHJcblx0XHRcdGlmIChpbml0S2V5d29yZCkge1xyXG5cdFx0XHRcdGlmICghWyd2YXInLCAnbGV0JywgJ2NvbnN0J10uaW5jbHVkZXMoaW5pdEtleXdvcmQpKSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VucmVjb2duaXplZCBkZWNsYXJhdG9yOiAnICsgaW5pdEtleXdvcmQgKyAnIScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsb2NhbENvbnR4dE1ldGFbcHJvcF0gPSBpbml0S2V5d29yZDtcclxuXHRcdFx0XHRyZXR1cm4gX3NldChjb250eHRPYmosIHByb3AsIHZhbCwgdHJhcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gRm9yIGFueSBvdGhlciBjb250ZXgsIGl0IG11c3QgYWxyZWFkeSBleGlzdHNcclxuXHRcdFx0aWYgKF9oYXMoY29udHh0T2JqLCBwcm9wLCB0cmFwKSkge1xyXG5cdFx0XHRcdHJldHVybiBfc2V0KGNvbnR4dE9iaiwgcHJvcCwgdmFsLCB0cmFwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gYWR2YW5jZSgpO1xyXG5cdFx0fSwgKCkgPT4ge3Rocm93IG5ldyBFcnJvcignXCInICsgcHJvcCArICdcIiBpcyB1bmRlZmluZWQhJyk7fSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZXMgYSBwcm9wZXJ0eSBmcm9tIHRoZSBmaXJzdCBwb3NzZXNzaW5nIGNvbnRleHQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nfG51bWJlciBwcm9wXHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHR0cmFwXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRkZWwocHJvcCwgdHJhcCA9IHt9KSB7XHJcblx0XHRpZiAocHJvcCBpbnN0YW5jZW9mIFN0cmluZykge1xyXG5cdFx0XHQvLyBpbmNhc2Ugd2UgcmVjaWV2ZWQgbmV3IFN0cmluZygpXHJcblx0XHRcdHByb3AgPSBwcm9wICsgJyc7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5oYW5kbGUocHJvcCwgKGNvbnR4dE9iaiwgY29udHh0TWV0YSwgYWR2YW5jZSkgPT4ge1xyXG5cdFx0XHRpZiAoX2hhcyhjb250eHRPYmosIHByb3AsIHRyYXApKSB7XHJcblx0XHRcdFx0aWYgKHRyYXAuZGVsZXRlUHJvcGVydHkgfHwgdHJhcC5kZWwpIHtcclxuXHRcdFx0XHRcdHJldHVybiAodHJhcC5kZWxldGVQcm9wZXJ0eSB8fCB0cmFwLmRlbCkoY29udHh0T2JqLCBwcm9wKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGVsZXRlIGNvbnR4dE9ialtwcm9wXTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gYWR2YW5jZSgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUZXN0cyBpZiBhIHByb3BlcnR5IGV4aXN0cyBpbiBhbnkgY29udGV4dC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmd8bnVtYmVyIHByb3BcclxuXHQgKiBAcGFyYW0gc3RyaW5nfG51bWJlciBwcm9wMlxyXG5cdCAqIEBwYXJhbSBvYmplY3RcdFx0dHJhcFxyXG5cdCAqXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aGFzKHByb3AsIHByb3AyLCB0cmFwID0ge30pIHtcclxuXHRcdGlmIChwcm9wIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcblx0XHRcdC8vIGluY2FzZSB3ZSByZWNpZXZlZCBuZXcgU3RyaW5nKClcclxuXHRcdFx0cHJvcCA9IHByb3AgKyAnJztcclxuXHRcdH1cclxuXHRcdGlmIChwcm9wMiBpbnN0YW5jZW9mIFN0cmluZykge1xyXG5cdFx0XHQvLyBpbmNhc2Ugd2UgcmVjaWV2ZWQgbmV3IFN0cmluZygpXHJcblx0XHRcdHByb3AyID0gcHJvcDIgKyAnJztcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmhhbmRsZShwcm9wLCAoY29udHh0T2JqLCBjb250eHRNZXRhLCBhZHZhbmNlKSA9PiB7XHJcblx0XHRcdGlmIChfaGFzKGNvbnR4dE9iaiwgcHJvcCwgdHJhcCkpIHtcclxuXHRcdFx0XHR2YXIgY29udGV4dE9iajIgPSBfZ2V0KGNvbnR4dE9iaiwgcHJvcCwgdHJhcCk7XHJcblx0XHRcdFx0cmV0dXJuIF9oYXMoY29udGV4dE9iajIsIHByb3AyLCB0cmFwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gYWR2YW5jZSgpO1xyXG5cdFx0fSwgKCkgPT4ge3Rocm93IG5ldyBFcnJvcignXCInICsgcHJvcCArICdcIiBpcyB1bmRlZmluZWQhJyk7fSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFRlc3RzIGlmIGEgcHJvcGVydHkgZXhpc3RzIGluIGFueSBjb250ZXh0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZ3xudW1iZXIgcHJvcFxyXG5cdCAqIEBwYXJhbSBhcnJheVx0XHRcdGFyZ3NcclxuXHQgKiBAcGFyYW0gb2JqZWN0XHRcdHRyYXBcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRleGVjKHByb3AsIGFyZ3MsIHRyYXAgPSB7fSkge1xyXG5cdFx0aWYgKHByb3AgaW5zdGFuY2VvZiBTdHJpbmcpIHtcclxuXHRcdFx0Ly8gaW5jYXNlIHdlIHJlY2lldmVkIG5ldyBTdHJpbmcoKVxyXG5cdFx0XHRwcm9wID0gcHJvcCArICcnO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuaGFuZGxlKHByb3AsIChjb250eHRPYmosIGNvbnR4dE1ldGEsIGFkdmFuY2UpID0+IHtcclxuXHRcdFx0dmFyIGZuID0gX2dldChjb250eHRPYmosIHByb3AsIHRyYXApO1xyXG5cdFx0XHRpZiAoIV9pc1VuZGVmaW5lZChmbikgfHwgX2hhcyhjb250eHRPYmosIHByb3AsIHRyYXApKSB7XHJcblx0XHRcdFx0aWYgKCFfaXNGdW5jdGlvbihmbikpIHtcclxuXHRcdFx0XHRcdGlmICh0cmFwLmV4ZWMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRyYXAuZXhlYyhjb250eHRPYmosIHByb3AsIGFyZ3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdcIicgKyBwcm9wICsgJ1wiIGlzIG5vdCBhIGZ1bmN0aW9uISAoQ2FsbGVkIG9uIHR5cGU6ICcgKyB0eXBlb2YgY29udHh0T2JqICsgJy4pJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0cmFwLmFwcGx5KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJhcC5hcHBseShmbiwgY29udHh0T2JqLCBhcmdzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZuLmFwcGx5KGNvbnR4dE9iaiwgYXJncyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGFkdmFuY2UoKTtcclxuXHRcdH0sICgpID0+IHtcclxuXHRcdFx0aWYgKHRyYXAuZXhlY1Vua25vd24pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJhcC5leGVjVW5rbm93bih0aGlzLCBwcm9wLCBhcmdzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIHByb3AgKyAnKClcIiBpcyB1bmRlZmluZWQhJyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZhY3RvcnkgbWV0aG9kIGZvciBtYWtpbmcgYSBDb250ZXh0cyBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheXxvYmplY3QgXHRjbnR4dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiBDb250ZXh0c1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGUoY250eHQpIHtcclxuXHRcdHJldHVybiBjbnR4dCBpbnN0YW5jZW9mIENvbnRleHRzID8gY250eHQgOiBuZXcgQ29udGV4dHMoY250eHQpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IF9nZXQgPSAoY250eHQsIHByb3AsIHRyYXApID0+IHRyYXAuZ2V0ID8gdHJhcC5nZXQoY250eHQsIHByb3ApIFxyXG5cdDogKChfaXNUeXBlT2JqZWN0KGNudHh0KSAmJiBjbnR4dCkgfHwgX2lzU3RyaW5nKGNudHh0KSB8fCBfaXNOdW1iZXIoY250eHQpID8gY250eHRbcHJvcF0gOiB1bmRlZmluZWQpOztcclxuXHJcbmNvbnN0IF9oYXMgPSAoY250eHQsIHByb3AsIHRyYXApID0+IHRyYXAuaGFzID8gdHJhcC5oYXMoY250eHQsIHByb3ApIDogKFxyXG5cdF9pc1R5cGVPYmplY3QoY250eHQpICYmIGNudHh0ID8gcHJvcCBpbiBjbnR4dCA6ICFfaXNVbmRlZmluZWQoY250eHRbcHJvcF0pXHJcbik7XHJcblxyXG5jbGFzcyBMb2NhbENvbnRleHQge307IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF93cmFwcGVkIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL3dyYXBwZWQuanMnO1xyXG5pbXBvcnQgX3Vud3JhcCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci91bndyYXAuanMnO1xyXG5pbXBvcnQgQWJzdHJhY3Rpb25JbnRlcmZhY2UgZnJvbSAnLi9BYnN0cmFjdGlvbkludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBMZXhlciBmcm9tICcuLi9MZXhlci5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFic3RyYWN0aW9uIGNsYXNzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuY29uc3QgQWJzdHJhY3Rpb24gPSBjbGFzcyBleHRlbmRzIEFic3RyYWN0aW9uSW50ZXJmYWNlIHtcclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihleHByKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5leHByID0gZXhwcjtcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0ZXZhbChjb250ZXh0ID0gbnVsbCwgdHJhcCA9IHt9KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5leHByLmV2YWwoY29udGV4dCwgdHJhcCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuXHRcdHJldHVybiAnKCcgKyB0aGlzLmV4cHIudG9TdHJpbmcoY29udGV4dCkgKyAnKSc7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0c3RhdGljIHBhcnNlKGV4cHIsIHBhcnNlQ2FsbGJhY2ssIFN0YXRpYyA9IEFic3RyYWN0aW9uKSB7XHJcblx0XHRpZiAoX3dyYXBwZWQoZXhwciwgJygnLCAnKScpICYmICFMZXhlci5tYXRjaChleHByLCBbJyAnXSkubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBuZXcgU3RhdGljKFxyXG5cdFx0XHRcdHBhcnNlQ2FsbGJhY2soX3Vud3JhcChleHByLCAnKCcsICcpJykpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdGlvbjtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFic3RyYWN0aW9uSW50ZXJmYWNlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuY29uc3QgSW50ZXJmYWNlID0gY2xhc3MgZXh0ZW5kcyBFeHBySW50ZXJmYWNlIHt9O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSW50ZXJmYWNlLnByb3RvdHlwZSwgJ2pzZW5UeXBlJywge1xyXG5cdGdldCgpIHsgcmV0dXJuICdBYnN0cmFjdGlvbic7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfd3JhcHBlZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci93cmFwcGVkLmpzJztcclxuaW1wb3J0IF91bndyYXAgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvdW53cmFwLmpzJztcclxuaW1wb3J0IEFyZ3VtZW50c0ludGVyZmFjZSBmcm9tICcuL0FyZ3VtZW50c0ludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBMZXhlciBmcm9tICcuLi9MZXhlci5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFyZ3VtZW50cyBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEFyZ3VtZW50cyA9IGNsYXNzIGV4dGVuZHMgQXJndW1lbnRzSW50ZXJmYWNlIHtcclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihsaXN0ID0gW10pIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmxpc3QgPSBsaXN0O1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pIHtcclxuXHRcdHJldHVybiB0aGlzLmxpc3QubWFwKGFyZyA9PiBhcmcuZXZhbChjb250ZXh0LCB0cmFwKSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuXHRcdHJldHVybiAnKCcgKyB0aGlzLmxpc3QubWFwKGFyZyA9PiBhcmcudG9TdHJpbmcoY29udGV4dCkpLmpvaW4oJywgJykgKyAnKSc7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0c3RhdGljIHBhcnNlKGV4cHIsIHBhcnNlQ2FsbGJhY2ssIFN0YXRpYyA9IEFyZ3VtZW50cykge1xyXG5cdFx0dmFyIGFyZ3M7IGV4cHIgPSBleHByLnRyaW0oKTtcclxuXHRcdGlmIChfd3JhcHBlZChleHByLCAnKCcsICcpJykgJiYgIUxleGVyLm1hdGNoKGV4cHIsIFsnICddKS5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMoXHJcblx0XHRcdFx0TGV4ZXIuc3BsaXQoX3Vud3JhcChleHByLCAnKCcsICcpJyksIFsnLCddKS5tYXAoYXJnID0+IHBhcnNlQ2FsbGJhY2soYXJnLnRyaW0oKSkpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBBcmd1bWVudHM7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4uL0V4cHJJbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBBcmd1bWVudHNJbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBJbnRlcmZhY2UgPSBjbGFzcyBleHRlbmRzIEV4cHJJbnRlcmZhY2Uge307XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnRlcmZhY2UucHJvdG90eXBlLCAnanNlblR5cGUnLCB7XHJcblx0Z2V0KCkgeyByZXR1cm4gJ0FyZ3VtZW50cyc7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfd3JhcHBlZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci93cmFwcGVkLmpzJztcclxuaW1wb3J0IF91bndyYXAgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvdW53cmFwLmpzJztcclxuaW1wb3J0IEFyckludGVyZmFjZSBmcm9tICcuL0FyckludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBMZXhlciBmcm9tICcuLi9MZXhlci5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFycmF5IHV0aWxzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuY29uc3QgQXJyID0gY2xhc3MgZXh0ZW5kcyBBcnJJbnRlcmZhY2Uge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZXhwcnMpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmV4cHJzID0gZXhwcnMgfHwgW107XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0aW5oZXJpdChTdXBlcikge1xyXG5cdFx0aWYgKFN1cGVyIGluc3RhbmNlb2YgQXJySW50ZXJmYWNlKSB7XHJcblx0XHRcdHZhciBuZXdFeHBycyA9IFN1cGVyLmV4cHJzLmZpbHRlcihleHByQSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZXhwcnMucmVkdWNlKCh1bmlxdWVTb0ZhciwgZXhwckIpID0+IHVuaXF1ZVNvRmFyICYmICFleHByQS5ldmVuKGV4cHJCKSwgdHJ1ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLmV4cHJzID0gbmV3RXhwcnMuY29uY2F0KHRoaXMuZXhwcnMpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGV2YWwoY29udGV4dCA9IG51bGwsIHRyYXAgPSB7fSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZXhwcnMubWFwKGV4cHIgPT4gZXhwci5ldmFsKGNvbnRleHQsIHRyYXApKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHR0b1N0cmluZyhjb250ZXh0ID0gbnVsbCkge1xyXG5cdFx0cmV0dXJuICdbJyArIHRoaXMuZXhwcnMubWFwKGV4cHIgPT4gZXhwci50b1N0cmluZyhjb250ZXh0KSkuam9pbignLCAnKSArICddJztcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyc2VDYWxsYmFjaywgU3RhdGljID0gQXJyKSB7XHJcblx0XHRpZiAoX3dyYXBwZWQoZXhwciwgJ1snLCAnXScpICYmICFMZXhlci5tYXRjaChleHByLnRyaW0oKSwgWycgJ10pLmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgc3BsaXRzID0gTGV4ZXIuc3BsaXQoX3Vud3JhcChleHByLCAnWycsICddJyksIFsnLCddKVxyXG5cdFx0XHRcdC5tYXAobiA9PiBuLnRyaW0oKSkuZmlsdGVyKG4gPT4gbikubWFwKGV4cHIgPT4gcGFyc2VDYWxsYmFjayhleHByKSk7XHJcblx0XHRcdHJldHVybiBuZXcgU3RhdGljKHNwbGl0cyk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IEFycjtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFyckludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnQXJyYXlUeXBlJzsgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IEludGVyZmFjZTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9maXJzdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9maXJzdC5qcyc7XHJcbmltcG9ydCBfZmxhdHRlbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mbGF0dGVuLmpzJztcclxuaW1wb3J0IF91bmlxdWUgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvdW5pcXVlLmpzJztcclxuaW1wb3J0IEFzc2VydGlvbkludGVyZmFjZSBmcm9tICcuL0Fzc2VydGlvbkludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBMZXhlciBmcm9tICcuLi9MZXhlci5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFzc2VydGlvbiBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEFzc2VydGlvbiA9IGNsYXNzIGV4dGVuZHMgQXNzZXJ0aW9uSW50ZXJmYWNlIHtcclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihleHBycywgbG9naWMpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmV4cHJzID0gZXhwcnM7XHJcblx0XHR0aGlzLmxvZ2ljID0gbG9naWM7XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdCBldmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pIHtcclxuXHRcdGlmICh0aGlzLmxvZ2ljID09PSAnIScpIHtcclxuXHRcdFx0cmV0dXJuICFfZmlyc3QodGhpcy5leHBycykuZXZhbChjb250ZXh0LCB0cmFwKTtcclxuXHRcdH1cclxuXHRcdHZhciBvcGVyYXRvcnMgPSBfZmxhdHRlbihBc3NlcnRpb24ub3BlcmF0b3JzKTtcclxuXHRcdHZhciBsb2dpYyA9ICh0aGlzLmxvZ2ljIHx8ICcnKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuXHRcdHZhciBpc09yID0gbG9naWMgPT09IChBc3NlcnRpb24ub3BlcmF0b3JzLm9yIHx8ICcnKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuXHRcdHZhciBpc05vciA9IGxvZ2ljID09PSAoQXNzZXJ0aW9uLm9wZXJhdG9ycy5ub3IgfHwgJycpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0dmFyIGlzQW5kID0gbG9naWMgPT09IChBc3NlcnRpb24ub3BlcmF0b3JzLmFuZCB8fCAnJykudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcblx0XHR2YXIgaXNOYW5kID0gbG9naWMgPT09IChBc3NlcnRpb24ub3BlcmF0b3JzLm5hbmQgfHwgJycpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0dmFyIGxhc3RSZXN1bHQgPSB0cnVlLCB0cnVlcyA9IDA7XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5leHBycy5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0bGFzdFJlc3VsdCA9IHRoaXMuZXhwcnNbaV0uZXZhbChjb250ZXh0LCB0cmFwKTtcclxuXHRcdFx0aWYgKGlzQW5kICYmICFsYXN0UmVzdWx0KSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChpc05hbmQgJiYgIWxhc3RSZXN1bHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaXNPciAmJiBsYXN0UmVzdWx0KSB7XHJcblx0XHRcdFx0cmV0dXJuIGxhc3RSZXN1bHQ7XHJcblx0XHRcdH1cclxuXHRcdFx0dHJ1ZXMgKz0gbGFzdFJlc3VsdCA/IDEgOiAwO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGlzT3IpIHtcclxuXHRcdFx0Ly8gV2hpY2ggaXMgZmFsc2V5LFxyXG5cdFx0XHQvLyBieSB2aXJ0dWUgb2YgZ2V0dGluZyBoZXJlXHJcblx0XHRcdHJldHVybiBsYXN0UmVzdWx0O1xyXG5cdFx0fVxyXG5cdFx0aWYgKGlzQW5kIHx8IGlzTmFuZCkge1xyXG5cdFx0XHQvLyBGb3IgQU5EIGFuZCBOQU5ELCBhbGwgZW50cmllcyBtdXN0IGJlIHRydWUgYnkgbm93LFxyXG5cdFx0XHQvLyBieSB2aXJ0dWUgb2YgZ2V0dGluZyBoZXJlLlxyXG5cdFx0XHQvLyBGb3IgQU5ELCB0aGlzIG1lYW5zIHRydWU7IGZvciBOQU5ELCBmYWxzZVxyXG5cdFx0XHRyZXR1cm4gaXNBbmQ7XHJcblx0XHR9XHJcblx0XHQvLyBGb3IgTk9SLCBhbGwgZW50cmllcyBuZWVkIHRvIGJlIGZhbHNlXHJcblx0XHRyZXR1cm4gaXNOb3IgJiYgdHJ1ZXMgPT09IDA7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0IHRvU3RyaW5nKGNvbnRleHQgPSBudWxsKSB7XHJcblx0XHRpZiAodGhpcy5sb2dpYyA9PT0gJyEnKSB7XHJcblx0XHRcdHJldHVybiAnIScgKyBfZmlyc3QodGhpcy5leHBycykudG9TdHJpbmcoY29udGV4dCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5leHBycy5tYXAoZXhwciA9PiBleHByLnRvU3RyaW5nKGNvbnRleHQpKS5qb2luKCcgJyArIHRoaXMubG9naWMgKyAnICcpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBwYXJzZShleHByLCBwYXJzZUNhbGxiYWNrLCBTdGF0aWMgPSBBc3NlcnRpb24pIHtcclxuXHRcdGlmIChleHByLnN0YXJ0c1dpdGgoJyEnKSkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFN0YXRpYyhcclxuXHRcdFx0XHRbcGFyc2VDYWxsYmFjayhleHByLnN1YnN0cigxKSldLFxyXG5cdFx0XHRcdCchJ1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHBhcnNlID0gTGV4ZXIubGV4KGV4cHIsIF9mbGF0dGVuKFN0YXRpYy5vcGVyYXRvcnMpKTtcclxuXHRcdGlmIChwYXJzZS50b2tlbnMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHR2YXIgbG9naWMgPSBfdW5pcXVlKHBhcnNlLm1hdGNoZXMpO1xyXG5cdFx0XHRpZiAobG9naWMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignXCJBTkRcIiBhbmQgXCJPUlwiIGxvZ2ljIGNhbm5vdCBiZSBhc3NlcnRlZCBpbiB0aGUgc2FtZSBleHByZXNzaW9uOiAnICsgZXhwciArICchJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMoXHJcblx0XHRcdFx0cGFyc2UudG9rZW5zLm1hcChleHByID0+IHBhcnNlQ2FsbGJhY2soZXhwci50cmltKCkpKSxcclxuXHRcdFx0XHRfZmlyc3QobG9naWMpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm9wIG9iamVjdFxyXG4gKi9cclxuQXNzZXJ0aW9uLm9wZXJhdG9ycyA9IHtcclxuXHRhbmQ6ICcmJicsXHJcblx0b3I6ICd8fCcsXHJcbn07XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IEFzc2VydGlvbjtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFzc2VydGlvbkludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnQXNzZXJ0aW9uRXhwcmVzc2lvbic7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfbGFzdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9sYXN0LmpzJztcclxuaW1wb3J0IF9iZWZvcmUgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvYmVmb3JlLmpzJztcclxuaW1wb3J0IF9hZnRlciBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci9hZnRlci5qcyc7XHJcbmltcG9ydCBfaXNVbmRlZmluZWQgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1VuZGVmaW5lZC5qcyc7XHJcbmltcG9ydCBBc3NpZ25tZW50SW50ZXJmYWNlIGZyb20gJy4vQXNzaWdubWVudEludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBSZWZlcmVuY2VJbnRlcmZhY2UgZnJvbSAnLi9SZWZlcmVuY2VJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgQ29udGV4dHMgZnJvbSAnLi4vQ29udGV4dHMuanMnO1xyXG5pbXBvcnQgTGV4ZXIgZnJvbSAnLi4vTGV4ZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBBc3NpZ25tZW50IGNsYXNzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuY29uc3QgQXNzaWdubWVudCA9IGNsYXNzIGV4dGVuZHMgQXNzaWdubWVudEludGVyZmFjZSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoaW5pdEtleXdvcmQsIHJlZmVyZW5jZSwgdmFsLCBvcGVyYXRvciA9ICc9Jykge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuaW5pdEtleXdvcmQgPSBpbml0S2V5d29yZDtcclxuXHRcdHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xyXG5cdFx0dGhpcy52YWwgPSB2YWw7XHJcblx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGV2YWwoY29udGV4dCA9IG51bGwsIHRyYXAgPSB7fSkge1xyXG5cdFx0dmFyIHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlLmdldEV2YWwoY29udGV4dCwgdHJhcCk7XHJcblx0XHR2YXIgdmFsID0gdGhpcy52YWwuZXZhbChjb250ZXh0LCB0cmFwKTtcclxuXHRcdGlmICghX2lzVW5kZWZpbmVkKHJlZmVyZW5jZS5jb250ZXh0KSAmJiAhX2lzVW5kZWZpbmVkKHJlZmVyZW5jZS5uYW1lKSkge1xyXG5cdFx0XHRyZXR1cm4gQ29udGV4dHMuY3JlYXRlKHJlZmVyZW5jZS5jb250ZXh0KS5zZXQocmVmZXJlbmNlLm5hbWUsIHZhbCwgdHJhcCwgdGhpcy5pbml0S2V5d29yZCk7XHJcblx0XHR9XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIHRoaXMgKyAnXCIgaXMgdW5kZWZpbmVkIScpO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHR0b1N0cmluZyhjb250ZXh0ID0gbnVsbCkge1xyXG5cdFx0cmV0dXJuICh0aGlzLmluaXRLZXl3b3JkID8gdGhpcy5pbml0S2V5d29yZCArICcgJyA6ICcnKVxyXG5cdFx0XHQrIFt0aGlzLnJlZmVyZW5jZS50b1N0cmluZyhjb250ZXh0KSwgdGhpcy5vcGVyYXRvciwgdGhpcy52YWwudG9TdHJpbmcoY29udGV4dCldLmpvaW4oJyAnKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyc2VDYWxsYmFjaywgU3RhdGljID0gQXNzaWdubWVudCkge1xyXG5cdFx0dmFyIHBhcnNlID0gTGV4ZXIubGV4KGV4cHIsIFN0YXRpYy5vcGVyYXRvcnMpO1xyXG5cdFx0aWYgKHBhcnNlLnRva2Vucy5sZW5ndGggPT09IDIpIHtcclxuXHRcdFx0dmFyIGluaXRLZXl3b3JkLCByZWZlcmVuY2UgPSBwYXJzZS50b2tlbnMuc2hpZnQoKS50cmltKCksIHZhbCA9IHBhcnNlLnRva2Vucy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdFx0aWYgKFsndmFyJywgJ2xldCcsICdjb25zdCddLmluY2x1ZGVzKF9iZWZvcmUocmVmZXJlbmNlLCAnICcpKSkge1xyXG5cdFx0XHRcdGluaXRLZXl3b3JkID0gX2JlZm9yZShyZWZlcmVuY2UsICcgJyk7XHJcblx0XHRcdFx0cmVmZXJlbmNlID0gX2FmdGVyKHJlZmVyZW5jZSwgJyAnKS50cmltKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCEoKHJlZmVyZW5jZSA9IHBhcnNlQ2FsbGJhY2socmVmZXJlbmNlKSkgaW5zdGFuY2VvZiBSZWZlcmVuY2VJbnRlcmZhY2UpIFxyXG5cdFx0XHR8fCAhKHZhbCA9IHBhcnNlQ2FsbGJhY2sodmFsKSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXNzaWdubWVudCBleHByZXNzaW9uOiAnICsgZXhwcik7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMoaW5pdEtleXdvcmQsIHJlZmVyZW5jZSwgdmFsLCBwYXJzZS5tYXRjaGVzWzBdLnRyaW0oKSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1x0XHJcblxyXG4vKipcclxuICogQHByb3AgYXJyYXlcclxuICovXHJcbkFzc2lnbm1lbnQub3BlcmF0b3JzID0gWycgPSAnXTtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgQXNzaWdubWVudDtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFzc2lnbm1lbnRJbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBJbnRlcmZhY2UgPSBjbGFzcyBleHRlbmRzIEV4cHJJbnRlcmZhY2Uge307XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnRlcmZhY2UucHJvdG90eXBlLCAnanNlblR5cGUnLCB7XHJcblx0Z2V0KCkgeyByZXR1cm4gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJzsgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IEludGVyZmFjZTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IExleGVyIGZyb20gJy4uL0xleGVyLmpzJztcclxuaW1wb3J0IEJvb2xJbnRlcmZhY2UgZnJvbSAnLi9Cb29sSW50ZXJmYWNlLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogQm9vbCAoYm9vbGVhbikgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBCb29sID0gY2xhc3MgZXh0ZW5kcyBCb29sSW50ZXJmYWNlIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudG9Mb3dlckNhc2UoKS50cmltKCkgPT09ICd0cnVlJztcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHR0b1N0cmluZygpIHtcclxuXHRcdHJldHVybiB0aGlzLnN0YXRlO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBwYXJzZShleHByLCBwYXJzZUNhbGxiYWNrLCBTdGF0aWMgPSBCb29sKSB7XHJcblx0XHR2YXIgZXhwciA9IGV4cHIudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcblx0XHRpZiAoZXhwciA9PT0gJ3RydWUnIHx8IGV4cHIgPT09ICdmYWxzZScpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMoZXhwcik7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBCb29sO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgRXhwckludGVyZmFjZSBmcm9tICcuLi9FeHBySW50ZXJmYWNlLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogQm9vbEludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnQm9vbGVhblR5cGUnOyB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgSW50ZXJmYWNlO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzVW5kZWZpbmVkIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNVbmRlZmluZWQuanMnO1xyXG5pbXBvcnQgUmVmZXJlbmNlSW50ZXJmYWNlIGZyb20gJy4vUmVmZXJlbmNlSW50ZXJmYWNlLmpzJztcclxuaW1wb3J0IENhbGxJbnRlcmZhY2UgZnJvbSAnLi9DYWxsSW50ZXJmYWNlLmpzJztcclxuaW1wb3J0IEFyZ3VtZW50cyBmcm9tICcuL0FyZ3VtZW50cy5qcyc7XHJcbmltcG9ydCBDb250ZXh0cyBmcm9tICcuLi9Db250ZXh0cy5qcyc7XHJcbmltcG9ydCBMZXhlciBmcm9tICcuLi9MZXhlci5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIENhbGwgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBDYWxsID0gY2xhc3MgZXh0ZW5kcyBDYWxsSW50ZXJmYWNlIHtcclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihyZWZlcmVuY2UsIGFyZ3MpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnJlZmVyZW5jZSA9IHJlZmVyZW5jZTtcclxuXHRcdHRoaXMuYXJncyA9IGFyZ3M7XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGV2YWwoY29udGV4dCA9IG51bGwsIHRyYXAgPSB7fSkge1xyXG5cdFx0dmFyIHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlLmdldEV2YWwoY29udGV4dCwgdHJhcCk7XHJcblx0XHR2YXIgYXJncyA9IHRoaXMuYXJncy5ldmFsKGNvbnRleHQsIHRyYXApO1xyXG5cdFx0aWYgKCFfaXNVbmRlZmluZWQocmVmZXJlbmNlLmNvbnRleHQpICYmICFfaXNVbmRlZmluZWQocmVmZXJlbmNlLm5hbWUpKSB7XHJcblx0XHRcdHJldHVybiBDb250ZXh0cy5jcmVhdGUocmVmZXJlbmNlLmNvbnRleHQpLmV4ZWMocmVmZXJlbmNlLm5hbWUsIGFyZ3MsIHRyYXApO1xyXG5cdFx0fVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdcIicgKyB0aGlzICsgJ1wiIGlzIHVuZGVmaW5lZCEnKTtcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlZmVyZW5jZS50b1N0cmluZyhjb250ZXh0KSArIHRoaXMuYXJncy50b1N0cmluZyhjb250ZXh0KTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyc2VDYWxsYmFjaywgU3RhdGljID0gQ2FsbCkge1xyXG5cdFx0aWYgKCFleHByLnN0YXJ0c1dpdGgoJygnKSAmJiBleHByLmVuZHNXaXRoKCcpJykgJiYgIUxleGVyLm1hdGNoKGV4cHIsIFsnICddKS5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIHRva2VucyA9IExleGVyLnNwbGl0KGV4cHIsIFtdKTtcclxuXHRcdFx0dmFyIHJlZmVyZW5jZSwgYXJncyA9IHRva2Vucy5wb3AoKTtcclxuXHRcdFx0aWYgKCEoKHJlZmVyZW5jZSA9IHBhcnNlQ2FsbGJhY2sodG9rZW5zLmpvaW4oJycpKSkgaW5zdGFuY2VvZiBSZWZlcmVuY2VJbnRlcmZhY2UpIFxyXG5cdFx0XHR8fCAhKGFyZ3MgPSBwYXJzZUNhbGxiYWNrKGFyZ3MsIFtBcmd1bWVudHNdKSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbCBkaXJlY3RpdmU6ICcgKyBleHByKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0YXRpYyhyZWZlcmVuY2UsIGFyZ3MpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcdFxyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBDYWxsO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgRXhwckludGVyZmFjZSBmcm9tICcuLi9FeHBySW50ZXJmYWNlLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogQ2FsbEludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnQ2FsbEV4cHJlc3Npb24nOyB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgSW50ZXJmYWNlO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2ZsYXR0ZW4gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZmxhdHRlbi5qcyc7XHJcbmltcG9ydCBfZmlyc3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZmlyc3QuanMnO1xyXG5pbXBvcnQgX2xhc3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvbGFzdC5qcyc7XHJcbmltcG9ydCBfZGlmZmVyZW5jZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9kaWZmZXJlbmNlLmpzJztcclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNPYmplY3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc09iamVjdC5qcyc7XHJcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1N0cmluZy5qcyc7XHJcbmltcG9ydCBfZWFjaCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9lYWNoLmpzJztcclxuaW1wb3J0IENvbXBhcmlzb25JbnRlcmZhY2UgZnJvbSAnLi9Db21wYXJpc29uSW50ZXJmYWNlLmpzJztcclxuaW1wb3J0IExleGVyIGZyb20gJy4uL0xleGVyLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogQ29tcGFyaXNvbiBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IENvbXBhcmlzb24gPSBjbGFzcyBleHRlbmRzIENvbXBhcmlzb25JbnRlcmZhY2Uge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iob3BlcmFuZDEsIG9wZXJhbmQyLCBvcGVyYXRvcikge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMub3BlcmFuZDEgPSBvcGVyYW5kMTtcclxuXHRcdHRoaXMub3BlcmFuZDIgPSBvcGVyYW5kMjtcclxuXHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0ZXZhbChjb250ZXh0ID0gbnVsbCwgdHJhcCA9IHt9KSB7XHJcblx0XHRyZXR1cm4gQ29tcGFyaXNvbi5jb21wYXJlKFxyXG5cdFx0XHR0aGlzLm9wZXJhbmQxLmV2YWwoY29udGV4dCwgdHJhcCksIFxyXG5cdFx0XHR0aGlzLm9wZXJhbmQyLmV2YWwoY29udGV4dCwgdHJhcCksIFxyXG5cdFx0XHR0aGlzLm9wZXJhdG9yXHJcblx0XHQpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHRvU3RyaW5nKGNvbnRleHQgPSBudWxsKSB7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHR0aGlzLm9wZXJhbmQxLnRvU3RyaW5nKGNvbnRleHQpLCBcclxuXHRcdFx0dGhpcy5vcGVyYXRvciwgXHJcblx0XHRcdHRoaXMub3BlcmFuZDIudG9TdHJpbmcoY29udGV4dClcclxuXHRcdF0uam9pbignICcpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBwYXJzZShleHByLCBwYXJzZUNhbGxiYWNrLCBTdGF0aWMgPSBDb21wYXJpc29uKSB7XHJcblx0XHR2YXIgb3BlcmF0b3JzID0gX2ZsYXR0ZW4oU3RhdGljLm9wZXJhdG9ycykubWFwKG9wZXIgPT4gJyAnICsgb3BlciArICcgJyk7XHJcblx0XHR2YXIgcGFyc2UgPSBMZXhlci5sZXgoZXhwciwgb3BlcmF0b3JzKTtcclxuXHRcdGlmIChwYXJzZS50b2tlbnMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRpZiAocGFyc2UudG9rZW5zLmxlbmd0aCA+IDIpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBcIkNvbXBhcmlzb25cIiBleHByZXNzaW9uOiAnICsgZXhwciArICchJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMoXHJcblx0XHRcdFx0cGFyc2VDYWxsYmFjayhfZmlyc3QocGFyc2UudG9rZW5zKS50cmltKCkpLFxyXG5cdFx0XHRcdHBhcnNlQ2FsbGJhY2soX2xhc3QocGFyc2UudG9rZW5zKS50cmltKCkpLFxyXG5cdFx0XHRcdHBhcnNlLm1hdGNoZXNbMF0udHJpbSgpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQgKi9cclxuXHQgXHJcblx0LyoqXHJcblx0ICogVXNlIHRoZSBvcGVyYXRvciB0eXBlIHRvIGNvbXBhcmUgdGhlIHR3byBvcGVyYW5kc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkXHRcdG9wZXJhbmQxXHRcdFxyXG5cdCAqIEBwYXJhbSBtaXhlZFx0XHRvcGVyYW5kMlx0XHRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIFx0b3BlcmF0b3JcdFx0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29tcGFyZShvcGVyYW5kMSwgb3BlcmFuZDIsIG9wZXJhdG9yID0gJz09Jykge1xyXG5cdFx0aWYgKF9mbGF0dGVuKENvbXBhcmlzb24ub3BlcmF0b3JzKS5pbmRleE9mKG9wZXJhdG9yKSA9PT0gLTEpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgb3BlcmF0b3IgXCInICsgb3BlcmF0b3IgKyAnXCIgaXMgbm90IHJlY29nbml6ZWQuJyk7XHJcblx0XHR9XHJcblx0XHRzd2l0Y2gob3BlcmF0b3IpIHtcclxuXHRcdFx0Y2FzZSAnPT09JzpcclxuXHRcdFx0XHRyZXR1cm4gb3BlcmFuZDEgPT09IG9wZXJhbmQyO1xyXG5cdFx0XHRjYXNlICc9PSc6XHJcblx0XHRcdGNhc2UgJz0nOlxyXG5cdFx0XHRcdHJldHVybiBvcGVyYW5kMSA9PSBvcGVyYW5kMjtcclxuXHRcdFx0Y2FzZSAnPic6XHJcblx0XHRcdFx0cmV0dXJuIG9wZXJhbmQxID4gb3BlcmFuZDI7XHJcblx0XHRcdGNhc2UgJzwnOlxyXG5cdFx0XHRcdHJldHVybiBvcGVyYW5kMSA8IG9wZXJhbmQyO1xyXG5cdFx0XHRjYXNlICc+PSc6XHJcblx0XHRcdFx0cmV0dXJuIG9wZXJhbmQxID49IG9wZXJhbmQyO1xyXG5cdFx0XHRjYXNlICc8PSc6XHJcblx0XHRcdFx0cmV0dXJuIG9wZXJhbmQxIDw9IG9wZXJhbmQyO1xyXG5cdFx0XHRjYXNlICchPSc6XHJcblx0XHRcdFx0cmV0dXJuIG9wZXJhbmQxICE9IG9wZXJhbmQyO1xyXG5cdFx0XHRjYXNlICchPT0nOlxyXG5cdFx0XHRcdHJldHVybiBvcGVyYW5kMSAhPT0gb3BlcmFuZDI7XHJcblx0XHRcdGNhc2UgJ149JzpcclxuXHRcdFx0XHRyZXR1cm4gX2lzU3RyaW5nKG9wZXJhbmQxKSAmJiBvcGVyYW5kMS5zdGFydHNXaXRoKG9wZXJhbmQyKTtcclxuXHRcdFx0Y2FzZSAnJD0nOlxyXG5cdFx0XHRcdHJldHVybiBfaXNTdHJpbmcob3BlcmFuZDEpICYmIG9wZXJhbmQxLmVuZHNXaXRoKG9wZXJhbmQyKTtcclxuXHRcdFx0Y2FzZSAnKj0nOlxyXG5cdFx0XHRcdC8vIENvbnRhaW5zXHJcblx0XHRcdFx0cmV0dXJuIF9pc0FycmF5KG9wZXJhbmQyKSB8fCBfaXNTdHJpbmcob3BlcmFuZDIpID8gb3BlcmFuZDEuaW5kZXhPZihvcGVyYW5kMikgPiAtMSA6IGZhbHNlO1xyXG5cdFx0XHRjYXNlICd+PSc6XHJcblx0XHRcdFx0Ly8gQ29udGFpbnMgd29yZFxyXG5cdFx0XHRcdHJldHVybiBfaXNTdHJpbmcob3BlcmFuZDEpICYmIF9pc1N0cmluZyhvcGVyYW5kMikgJiYgKCcgJyArIG9wZXJhbmQxICsgJyAnKS5pbmRleE9mKCcgJyArIG9wZXJhbmQyICsgJyAnKSA+IC0xO1xyXG5cdFx0XHRjYXNlICc+PTwnOiAvLyBCZXR3ZWVuXHJcblx0XHRcdFx0IGlmICghKF9pc0FycmF5KG9wZXJhbmQyKSAmJiBvcGVyYW5kMi5sZW5ndGggPT09IDIpKSB7XHJcblx0XHRcdFx0XHQgdGhyb3cgbmV3IEVycm9yKCdBIFxcJ0JldHdlZW5cXCcgY29tcGFyaXNvbiByZXF1aXJlcyBhcmd1bWVudCAyIHRvIGJlIGFuIGFycmF5IG9mIGV4YWN0bHkgMiB2YWx1ZXMuJyk7XHJcblx0XHRcdFx0IH1cclxuXHRcdFx0XHQgcmV0dXJuIG9wZXJhbmQxID49IG9wZXJhbmQyWzBdICYmIG9wZXJhbmQxIDw9IG9wZXJhbmQyWzFdO1xyXG5cdFxyXG5cdFx0XHRjYXNlICcvKiovJzogLy8gUmVnZXhcclxuXHRcdFx0XHRyZXR1cm4gb3BlcmFuZDIubWF0Y2gobmV3IFJlZ0V4cChvcGVyYW5kMSkpO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIENvbXBhcmVzIHR3byBvcGVyYW5kcyBmb3IgZGlmZmVyZW5jZXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZFx0XHRvcGVyYW5kMVx0XHRcclxuXHQgKiBAcGFyYW0gbWl4ZWRcdFx0b3BlcmFuZDJcdFx0XHJcblx0ICogQHBhcmFtIGJvb2xcdCBcdHN0cmljdFx0XHRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBkaWZmKG9wZXJhbmQxLCBvcGVyYW5kMiwgc3RyaWN0KSB7XHJcblx0XHRyZXR1cm4gIUNvbXBhcmlzb24uY29tcGFyZShvcGVyYW5kMSwgb3BlcmFuZDIsIHN0cmljdCA/ICc9PT0nIDogJz09Jyk7XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm9wIG9iamVjdFxyXG4gKi9cclxuQ29tcGFyaXNvbi5vcGVyYXRvcnMgPSB7XHJcblx0ZXhhY3Q6IHtcclxuXHRcdGlzOiAnPT09JyxcclxuXHRcdGlzTnVsbDogJz09PScsXHJcblx0XHRlcXVhbHNUbzogJz09JyxcclxuXHRcdHN0cmljdGx5Tm90RXF1YWxzVG86ICchPT0nLFxyXG5cdFx0bm90RXF1YWxzVG86ICchPScsXHJcblx0fSxcclxuXHRyZWxhdGl2ZToge1xyXG5cdFx0bGVzc2VyVGhhbjogJzwnLFxyXG5cdFx0Z3JlYXRlclRoYW46ICc+JyxcclxuXHRcdGxlc3NlclRoYW5PckVxdWFsc1RvOiAnPD0nLFxyXG5cdFx0Z3JlYXRlclRoYW5PckVxdWFsc1RvOiAnPj0nLFxyXG5cdFx0YmV0d2VlbjogJz49PCcsXHJcblx0fSxcclxuXHRwYXJ0aWFsOiB7XHJcblx0XHRzdGFydHNXaXRoOiAnXj0nLFxyXG5cdFx0ZW5kc1dpdGg6ICckPScsXHJcblx0XHRjb250YWluczogJyo9JyxcclxuXHRcdGFueTogJ349JyxcclxuXHRcdGluOiAnfj0nLFxyXG5cdFx0bWF0Y2hlczogJy8qKi8nLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IENvbXBhcmlzb247XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4uL0V4cHJJbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBDb21wYXJpc29uSW50ZXJmYWNlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuY29uc3QgSW50ZXJmYWNlID0gY2xhc3MgZXh0ZW5kcyBFeHBySW50ZXJmYWNlIHt9O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSW50ZXJmYWNlLnByb3RvdHlwZSwgJ2pzZW5UeXBlJywge1xyXG5cdGdldCgpIHsgcmV0dXJuICdDb21wYXJpc29uRXhwcmVzc2lvbic7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBMZXhlciBmcm9tICcuLi9MZXhlci5qcyc7XHJcbmltcG9ydCBDb25kaXRpb25JbnRlcmZhY2UgZnJvbSAnLi9Db25kaXRpb25JbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBDb25kaXRpb24gY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBDb25kaXRpb24gPSBjbGFzcyBleHRlbmRzIENvbmRpdGlvbkludGVyZmFjZSB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihhc3NlcnRpb24sIG9uVHJ1ZSwgb25GYWxzZSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuYXNzZXJ0aW9uID0gYXNzZXJ0aW9uO1xyXG5cdFx0dGhpcy5vblRydWUgPSBvblRydWU7XHJcblx0XHR0aGlzLm9uRmFsc2UgPSBvbkZhbHNlO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pIHtcclxuXHRcdHJldHVybiB0aGlzLmFzc2VydGlvbi5ldmFsKGNvbnRleHQsIHRyYXApIFxyXG5cdFx0XHQ/IHRoaXMub25UcnVlLmV2YWwoY29udGV4dCwgdHJhcCkgXHJcblx0XHRcdDogdGhpcy5vbkZhbHNlLmV2YWwoY29udGV4dCwgdHJhcCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdHRoaXMuYXNzZXJ0aW9uLnRvU3RyaW5nKGNvbnRleHQpLCBcclxuXHRcdFx0Q29uZGl0aW9uLm9wZXJhdG9yc1swXSwgXHJcblx0XHRcdHRoaXMub25UcnVlLnRvU3RyaW5nKGNvbnRleHQpLFxyXG5cdFx0XHRDb25kaXRpb24ub3BlcmF0b3JzWzFdLCBcclxuXHRcdFx0dGhpcy5vbkZhbHNlLnRvU3RyaW5nKGNvbnRleHQpXHJcblx0XHRdLmpvaW4oJyAnKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyc2VDYWxsYmFjaywgU3RhdGljID0gQ29uZGl0aW9uKSB7XHJcblx0XHR2YXIgc3BsaXRzID0gTGV4ZXIuc3BsaXQoZXhwciwgU3RhdGljLm9wZXJhdG9ycyk7XHJcblx0XHRpZiAoc3BsaXRzLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0aWYgKHNwbGl0cy5sZW5ndGggPT09IDIpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCB0ZXJuYXJ5IGV4cHJlc3Npb246ICcgKyBleHByICsgJyEnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0YXRpYyhcclxuXHRcdFx0XHRwYXJzZUNhbGxiYWNrKHNwbGl0c1swXS50cmltKCkpLFxyXG5cdFx0XHRcdHBhcnNlQ2FsbGJhY2soc3BsaXRzWzFdLnRyaW0oKSksXHJcblx0XHRcdFx0cGFyc2VDYWxsYmFjayhzcGxpdHNbMl0udHJpbSgpKVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvcCBvYmplY3RcclxuICovXHJcbkNvbmRpdGlvbi5vcGVyYXRvcnMgPSBbJz8nLCAnOiddO1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBDb25kaXRpb247XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4uL0V4cHJJbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBDb25kaXRpb25JbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBJbnRlcmZhY2UgPSBjbGFzcyBleHRlbmRzIEV4cHJJbnRlcmZhY2Uge307XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnRlcmZhY2UucHJvdG90eXBlLCAnanNlblR5cGUnLCB7XHJcblx0Z2V0KCkgeyByZXR1cm4gJ1Rlcm5hcnlDb25kaXRpb25hbCc7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfbGFzdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9sYXN0LmpzJztcclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IFJlZmVyZW5jZUludGVyZmFjZSBmcm9tICcuL1JlZmVyZW5jZUludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBEZWxldGlvbkludGVyZmFjZSBmcm9tICcuL0RlbGV0aW9uSW50ZXJmYWNlLmpzJztcclxuaW1wb3J0IENvbnRleHRzIGZyb20gJy4uL0NvbnRleHRzLmpzJztcclxuaW1wb3J0IExleGVyIGZyb20gJy4uL0xleGVyLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVsZXRpb24gY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBEZWxldGlvbiA9IGNsYXNzIGV4dGVuZHMgRGVsZXRpb25JbnRlcmZhY2Uge1xyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHJlZmVyZW5jZSwgb3BlcmF0b3IgPSAnZGVsZXRlJykge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xyXG5cdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pIHtcclxuXHRcdHZhciByZWZlcmVuY2UgPSB0aGlzLnJlZmVyZW5jZS5nZXRFdmFsKGNvbnRleHQsIHRyYXApO1xyXG5cdFx0aWYgKCFfaXNVbmRlZmluZWQocmVmZXJlbmNlLmNvbnRleHQpICYmICFfaXNVbmRlZmluZWQocmVmZXJlbmNlLm5hbWUpKSB7XHJcblx0XHRcdHJldHVybiBDb250ZXh0cy5jcmVhdGUocmVmZXJlbmNlLmNvbnRleHQpLmRlbChyZWZlcmVuY2UubmFtZSwgdHJhcCk7XHJcblx0XHR9XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIHRoaXMgKyAnXCIgaXMgdW5kZWZpbmVkIScpO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHR0b1N0cmluZyhjb250ZXh0ID0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIHRoaXMub3BlcmF0b3IgKyAnICcgKyB0aGlzLnJlZmVyZW5jZS50b1N0cmluZyhjb250ZXh0KTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyc2VDYWxsYmFjaywgU3RhdGljID0gRGVsZXRpb24pIHtcclxuXHRcdHZhciBwYXJzZSA9IExleGVyLmxleChleHByLCBPYmplY3QudmFsdWVzKFN0YXRpYy5vcGVyYXRvcnMpKTtcclxuXHRcdGlmIChwYXJzZS5tYXRjaGVzLmxlbmd0aCA9PT0gMSAmJiBleHByLnN0YXJ0c1dpdGgocGFyc2UubWF0Y2hlc1swXSArICcgJykpIHtcclxuXHRcdFx0dmFyIHJlZmVyZW5jZTtcclxuXHRcdFx0aWYgKCEoKHJlZmVyZW5jZSA9IHBhcnNlQ2FsbGJhY2socGFyc2UudG9rZW5zLnBvcCgpLnRyaW0oKSkpIGluc3RhbmNlb2YgUmVmZXJlbmNlSW50ZXJmYWNlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkZWxldGUgZGlyZWN0aXZlOiAnICsgZXhwcik7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMocmVmZXJlbmNlLCBwYXJzZS5tYXRjaGVzWzBdLnRyaW0oKSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1x0XHJcblxyXG4vKipcclxuICogQHByb3AgYXJyYXlcclxuICovXHJcbkRlbGV0aW9uLm9wZXJhdG9ycyA9IHtcclxuXHRyZWQ6ICdyZWR1Y2UnLCBcclxuXHRkZWw6ICdkZWxldGUnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBEZWxldGlvbjtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlbGV0aW9uSW50ZXJmYWNlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuY29uc3QgSW50ZXJmYWNlID0gY2xhc3MgZXh0ZW5kcyBFeHBySW50ZXJmYWNlIHt9O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSW50ZXJmYWNlLnByb3RvdHlwZSwgJ2pzZW5UeXBlJywge1xyXG5cdGdldCgpIHsgcmV0dXJuICdEZWxldGVFeHByZXNzaW9uJzsgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IEludGVyZmFjZTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9jb3B5IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2NvcHkuanMnO1xyXG5pbXBvcnQgX2VhY2ggZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovZWFjaC5qcyc7XHJcbmltcG9ydCBfZmxhdHRlbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mbGF0dGVuLmpzJztcclxuaW1wb3J0IF93cmFwcGVkIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL3dyYXBwZWQuanMnO1xyXG5pbXBvcnQgX3Vud3JhcCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci91bndyYXAuanMnO1xyXG5pbXBvcnQgRnVuY0ludGVyZmFjZSBmcm9tICcuL0Z1bmNJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgQ29udGV4dHMgZnJvbSAnLi4vQ29udGV4dHMuanMnO1xyXG5pbXBvcnQgTGV4ZXIgZnJvbSAnLi4vTGV4ZXIuanMnO1xyXG5pbXBvcnQgU3RhdGVtZW50cyBmcm9tICcuL1N0YXRlbWVudHMuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBGdW5jIGNsYXNzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuY29uc3QgRnVuYyA9IGNsYXNzIGV4dGVuZHMgRnVuY0ludGVyZmFjZSB7XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IocGFyYW10ZXJzLCBzdGF0ZW1lbnRzLCBhcnJvd0Z1bmN0aW9uRm9ybWF0dGluZyA9IHt9KSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5wYXJhbXRlcnMgPSBwYXJhbXRlcnMgfHwge307XHJcblx0XHR0aGlzLnN0YXRlbWVudHMgPSBzdGF0ZW1lbnRzO1xyXG5cdFx0dGhpcy5hcnJvd0Z1bmN0aW9uRm9ybWF0dGluZyA9IGFycm93RnVuY3Rpb25Gb3JtYXR0aW5nO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGluaGVyaXQoU3VwZXIpIHtcclxuXHRcdGlmIChTdXBlciBpbnN0YW5jZW9mIEZ1bmNJbnRlcmZhY2UpIHtcclxuXHRcdFx0dmFyIHBhcmVudFBhcmFtcyA9IE9iamVjdC5rZXlzKFN1cGVyLnBhcmFtdGVycyk7XHJcblx0XHRcdHZhciBvd25QYXJhbXMgPSBPYmplY3Qua2V5cyh0aGlzLnBhcmFtdGVycyk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgTWF0aC5tYXgob3duUGFyYW1zLmxlbmd0aCwgcGFyZW50UGFyYW1zLmxlbmd0aCk7IGkgKyspIHtcclxuXHRcdFx0XHR2YXIgbmFtZUluUGFyZW50ID0gcGFyZW50UGFyYW1zW2ldO1xyXG5cdFx0XHRcdHZhciBuYW1lSW5TZWxmID0gb3duUGFyYW1zW2ldO1xyXG5cdFx0XHRcdGlmICghbmFtZUluU2VsZiAmJiBuYW1lSW5QYXJlbnQpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyICMnICsgaSArICcgKCcgKyBuYW1lSW5QYXJlbnQgKyAnKSBpbiBwYXJlbnQgZnVuY3Rpb24gbXVzdCBiZSBpbXBsZW1lbnRlZC4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG5hbWVJblNlbGYgJiYgbmFtZUluUGFyZW50KSB7XHJcblx0XHRcdFx0XHR2YXIgZGVmYXVsdFZhbEluUGFyZW50ID0gU3VwZXIucGFyYW10ZXJzW25hbWVJblBhcmVudF07XHJcblx0XHRcdFx0XHR2YXIgZGVmYXVsdFZhbEluU2VsZiA9IHRoaXMucGFyYW10ZXJzW25hbWVJblNlbGZdO1xyXG5cdFx0XHRcdFx0aWYgKGRlZmF1bHRWYWxJblNlbGYgJiYgIWRlZmF1bHRWYWxJblBhcmVudCkge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciAjJyArIGkgKyAnICgnICsgbmFtZUluU2VsZiArICcpIG11c3Qgbm90IGhhdmUgYSBkZWZhdWx0IHZhbHVlIGFzIGVzdGFibGlzaGVkIGluIHBhcmVudCBmdW5jdGlvbi4nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChkZWZhdWx0VmFsSW5TZWxmICYmIGRlZmF1bHRWYWxJblBhcmVudCAmJiBkZWZhdWx0VmFsSW5TZWxmLmpzZW5UeXBlICE9PSBkZWZhdWx0VmFsSW5QYXJlbnQuanNlblR5cGUpIHtcclxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEZWZhdWx0IHZhbHVlIGZvciBwYXJhbWV0ZXIgIycgKyBpICsgJyAoJyArIG5hbWVJblNlbGYgKyAnKSBtdXN0IGJlIG9mIHR5cGUgJyArIGRlZmF1bHRWYWxJblBhcmVudC5qc2VuVHlwZSArICcgYXMgZXN0YWJsaXNoZWQgaW4gcGFyZW50IGZ1bmN0aW9uLicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnN1cCA9IFN1cGVyO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGV2YWwoY29udGV4dCA9IG51bGwsIHRyYXAgPSB7fSkge1xyXG5cdFx0cmV0dXJuICguLi5hcmdzKSA9PiB7XHJcblx0XHRcdHZhciBuZXdNYWluQ29udGV4dCA9IHt9O1xyXG5cdFx0XHRfZWFjaChPYmplY3Qua2V5cyh0aGlzLnBhcmFtdGVycyksIChpLCBuYW1lKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmF1bHRWYWwgPSB0aGlzLnBhcmFtdGVyc1tuYW1lXTtcclxuXHRcdFx0XHRpZiAoYXJncy5sZW5ndGggLSAxIDwgaSAmJiAhZGVmYXVsdFZhbCkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgcGFyYW1ldGVyIFwiJyArIG5hbWUgKyAnXCIgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG5ld01haW5Db250ZXh0W25hbWVdID0gYXJncy5sZW5ndGggPiBpIFxyXG5cdFx0XHRcdFx0PyBhcmdzW2ldIFxyXG5cdFx0XHRcdFx0OiAodGhpcy5wYXJhbXRlcnNbbmFtZV0gXHJcblx0XHRcdFx0XHRcdD8gdGhpcy5wYXJhbXRlcnNbbmFtZV0uZXZhbChjb250ZXh0LCB0cmFwKSBcclxuXHRcdFx0XHRcdFx0OiBudWxsKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdC8vIEJ1dCB0aGlzIG5ld2VyIGNvbnRleHQgc2hvdWxkIGNvbWUgZmlyc3RcclxuXHRcdFx0dmFyIG5lc3RlZENvbnRleHQgPSBuZXcgQ29udGV4dHMobmV3TWFpbkNvbnRleHQsIGNvbnRleHQpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZW1lbnRzLmV2YWwobmVzdGVkQ29udGV4dCwgdHJhcCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHRvU3RyaW5nKGNvbnRleHQgPSBudWxsKSB7XHJcblx0XHR2YXIgcGFyYW10ZXJzID0gW107XHJcblx0XHRfZWFjaCh0aGlzLnBhcmFtdGVycywgKG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0XHRcdHBhcmFtdGVycy5wdXNoKG5hbWUgKyAodmFsdWUgPyAnPScgKyB2YWx1ZS50b1N0cmluZyhjb250ZXh0KSA6ICcnKSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLmFycm93RnVuY3Rpb25Gb3JtYXR0aW5nKSB7XHJcblx0XHRcdHZhciBoZWFkTm9XcmFwID0gdGhpcy5hcnJvd0Z1bmN0aW9uRm9ybWF0dGluZy5oZWFkID09PSBmYWxzZSB8fCAocGFyYW10ZXJzLmxlbmd0aCA9PT0gMSAmJiBwYXJhbXRlcnNbMF0uaW5kZXhPZignPScpID09PSAtMSk7XHJcblx0XHRcdHZhciBib2R5Tm9XcmFwID0gdGhpcy5hcnJvd0Z1bmN0aW9uRm9ybWF0dGluZy5ib2R5ID09PSBmYWxzZVxyXG5cdFx0XHRyZXR1cm4gKGhlYWROb1dyYXAgPyBwYXJhbXRlcnNbMF0gOiAnKCcgKyBwYXJhbXRlcnMuam9pbignLCAnKSArICcpJylcclxuXHRcdFx0KyAnID0+ICcgKyAoYm9keU5vV3JhcCA/IHRoaXMuc3RhdGVtZW50cy50b1N0cmluZyhjb250ZXh0KSA6ICd7JyArIHRoaXMuc3RhdGVtZW50cy50b1N0cmluZyhjb250ZXh0KSArICd9Jyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gJ2Z1bmN0aW9uICgnICsgcGFyYW10ZXJzLmpvaW4oJywgJykgKyAnKSB7JyArIHRoaXMuc3RhdGVtZW50cy50b1N0cmluZyhjb250ZXh0KSArICd9JztcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyc2VDYWxsYmFjaywgU3RhdGljID0gRnVuYykge1xyXG5cdFx0ZXhwciA9IGV4cHIudHJpbSgpO1xyXG5cdFx0dmFyIHNwbGl0cztcclxuXHRcdGlmIChleHByLnN0YXJ0c1dpdGgoJ2Z1bmN0aW9uJykgXHJcblx0XHQmJiAoc3BsaXRzID0gTGV4ZXIuc3BsaXQoZXhwciwgW10pLnNsaWNlKDEpLmZpbHRlcihiID0+IGIudHJpbSgpKSkgJiYgc3BsaXRzLmxlbmd0aCA9PT0gMikge1xyXG5cdFx0XHR2YXIgYXJyb3dGdW5jdGlvbkZvcm1hdHRpbmcgPSBmYWxzZTtcclxuXHRcdFx0dmFyIGZ1bmNIZWFkID0gX3Vud3JhcChzcGxpdHMuc2hpZnQoKS50cmltKCksICcoJywgJyknKTtcclxuXHRcdFx0dmFyIGZ1bmNCb2R5ID0gX3Vud3JhcChzcGxpdHMuc2hpZnQoKS50cmltKCksICd7JywgJ30nKTtcclxuXHRcdH0gZWxzZSBpZiAoIWV4cHIuc3RhcnRzV2l0aCgnZnVuY3Rpb24nKSBcclxuXHRcdCYmIChzcGxpdHMgPSBMZXhlci5zcGxpdChleHByLCBbJz0+J10pKSAmJiBzcGxpdHMubGVuZ3RoID09PSAyKSB7XHJcblx0XHRcdHZhciBmdW5jSGVhZCA9IHNwbGl0cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdFx0dmFyIGZ1bmNCb2R5ID0gc3BsaXRzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0XHR2YXIgYXJyb3dGdW5jdGlvbkZvcm1hdHRpbmcgPSB7fTtcclxuXHRcdFx0aWYgKF93cmFwcGVkKGZ1bmNIZWFkLCAnKCcsICcpJykpIHtcclxuXHRcdFx0XHRmdW5jSGVhZCA9IF91bndyYXAoZnVuY0hlYWQsICcoJywgJyknKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhcnJvd0Z1bmN0aW9uRm9ybWF0dGluZy5oZWFkID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKF93cmFwcGVkKGZ1bmNCb2R5LCAneycsICd9JykpIHtcclxuXHRcdFx0XHRmdW5jQm9keSA9IF91bndyYXAoZnVuY0JvZHksICd7JywgJ30nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhcnJvd0Z1bmN0aW9uRm9ybWF0dGluZy5ib2R5ID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBwYXJhbXRlcnMgPSB7fTtcclxuXHRcdExleGVyLnNwbGl0KGZ1bmNIZWFkLCBbJywnXSkuZm9yRWFjaChwYXJhbSA9PiB7XHJcblx0XHRcdHZhciBwYXJhbVNwbGl0ID0gcGFyYW0uc3BsaXQoJz0nKTtcclxuXHRcdFx0aWYgKHBhcmFtU3BsaXRbMV0pIHtcclxuXHRcdFx0XHRwYXJhbXRlcnNbcGFyYW1TcGxpdFswXS50cmltKCldID0gcGFyc2VDYWxsYmFjayhwYXJhbVNwbGl0WzFdLnRyaW0oKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cGFyYW10ZXJzW3BhcmFtLnRyaW0oKV0gPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHZhciBzdGF0ZW1lbnRzID0gcGFyc2VDYWxsYmFjayhmdW5jQm9keSwgW1N0YXRlbWVudHNdLCB7YXNzZXJ0OmZhbHNlfSkgfHwgcGFyc2VDYWxsYmFjayhmdW5jQm9keSk7XHJcblx0XHRyZXR1cm4gbmV3IFN0YXRpYyhwYXJhbXRlcnMsIHN0YXRlbWVudHMsIGFycm93RnVuY3Rpb25Gb3JtYXR0aW5nKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogQHByb3Agb2JqZWN0XHJcbiAqL1xyXG5GdW5jLm9wZXJhdG9ycyA9IFsnPT4nLF07XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IEZ1bmM7IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEZ1bmNJbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBJbnRlcmZhY2UgPSBjbGFzcyBleHRlbmRzIEV4cHJJbnRlcmZhY2Uge307XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnRlcmZhY2UucHJvdG90eXBlLCAnanNlblR5cGUnLCB7XHJcblx0Z2V0KCkgeyByZXR1cm4gJ0Z1bmN0aW9uVHlwZSc7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfd3JhcHBlZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci93cmFwcGVkLmpzJztcclxuaW1wb3J0IF91bndyYXAgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvdW53cmFwLmpzJztcclxuaW1wb3J0IExleGVyIGZyb20gJy4uL0xleGVyLmpzJztcclxuaW1wb3J0IElmSW50ZXJmYWNlIGZyb20gJy4vSWZJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgU3RhdGVtZW50cyBmcm9tICcuL1N0YXRlbWVudHMuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBDb25kaXRpb24gY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBJZiA9IGNsYXNzIGV4dGVuZHMgSWZJbnRlcmZhY2Uge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoYXNzZXJ0aW9uLCBvblRydWUsIG9uRmFsc2UsIHBhcmFtcyA9IHt9KSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5hc3NlcnRpb24gPSBhc3NlcnRpb247XHJcblx0XHR0aGlzLm9uVHJ1ZSA9IG9uVHJ1ZTtcclxuXHRcdHRoaXMub25GYWxzZSA9IG9uRmFsc2U7XHJcblx0XHR0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0ZXZhbChjb250ZXh0ID0gbnVsbCwgdHJhcCA9IHt9KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hc3NlcnRpb24uZXZhbChjb250ZXh0LCB0cmFwKSBcclxuXHRcdFx0PyAodGhpcy5vblRydWUgPyB0aGlzLm9uVHJ1ZS5ldmFsKGNvbnRleHQsIHRyYXApIDogdW5kZWZpbmVkKVxyXG5cdFx0XHQ6ICh0aGlzLm9uRmFsc2UgPyB0aGlzLm9uRmFsc2UuZXZhbChjb250ZXh0LCB0cmFwKSA6IHVuZGVmaW5lZCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuICAgICAgICB2YXIgb25UcnVlID0gdGhpcy5wYXJhbXMub25UcnVlSXNCbG9jayBcclxuICAgICAgICAgICAgPyAneycgKyB0aGlzLm9uVHJ1ZS50b1N0cmluZyhjb250ZXh0KSArICd9JyBcclxuICAgICAgICAgICAgOiAodGhpcy5vblRydWUgPyB0aGlzLm9uVHJ1ZS50b1N0cmluZyhjb250ZXh0KSA6ICcnKTtcclxuICAgICAgICB2YXIgb25GYWxzZSA9IHRoaXMucGFyYW1zLm9uRmFsc2VJc0Jsb2NrIFxyXG4gICAgICAgICAgICA/ICd7JyArIHRoaXMub25GYWxzZS50b1N0cmluZyhjb250ZXh0KSArICd9JyBcclxuICAgICAgICAgICAgOiAodGhpcy5vbkZhbHNlID8gdGhpcy5vbkZhbHNlLnRvU3RyaW5nKGNvbnRleHQpIDogJycpO1xyXG5cdFx0cmV0dXJuICdpZiAoJyArIHRoaXMuYXNzZXJ0aW9uLnRvU3RyaW5nKGNvbnRleHQpICsgJyknICsgb25UcnVlICsgKG9uRmFsc2UgPyAnIGVsc2UgJyArIG9uRmFsc2UgOiAnJyk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0c3RhdGljIHBhcnNlKGV4cHIsIHBhcnNlQ2FsbGJhY2ssIFN0YXRpYyA9IElmKSB7XHJcbiAgICAgICAgZXhwciA9IGV4cHIudHJpbSgpO1xyXG4gICAgICAgIHZhciBzcGxpdHM7XHJcbiAgICAgICAgaWYgKGV4cHIuc3RhcnRzV2l0aCgnaWYnKSBcclxuXHRcdCYmIChzcGxpdHMgPSBMZXhlci5zcGxpdChleHByLCBbXSwge2xpbWl0OjJ9LypJTVBPUlRBTlQqLykuc2xpY2UoMSkuZmlsdGVyKGIgPT4gYi50cmltKCkpKSAmJiBzcGxpdHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIHZhciBhc3NlcnRpb24gPSBwYXJzZUNhbGxiYWNrKF91bndyYXAoc3BsaXRzLnNoaWZ0KCkudHJpbSgpLCAnKCcsICcpJykudHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIHJlc3QgPSBMZXhlci5zcGxpdChzcGxpdHMuc2hpZnQoKS50cmltKCksIFsnZWxzZSddLCB7bGltaXQ6MX0vKklNUE9SVEFOVCovKTtcclxuICAgICAgICAgICAgdmFyIG9uVHJ1ZSA9IHJlc3Quc2hpZnQoKS50cmltKCksIG9uVHJ1ZUlzQmxvY2ssIG9uRmFsc2UgPSAocmVzdC5zaGlmdCgpIHx8ICcnKS50cmltKCksIG9uRmFsc2VJc0Jsb2NrO1xyXG4gICAgICAgICAgICBpZiAoX3dyYXBwZWQob25UcnVlLCAneycsICd9JykpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBicmFjZXMgZ2l2ZXMgdXMgdGhlIG9uVHJ1ZSBibG9ja1xyXG4gICAgICAgICAgICAgICAgb25UcnVlSXNCbG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvblRydWUgPSBfdW53cmFwKG9uVHJ1ZSwgJ3snLCAnfScpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIG9uVHJ1ZSA9IHBhcnNlQ2FsbGJhY2sob25UcnVlLCBbU3RhdGVtZW50c10sIHthc3NlcnQ6ZmFsc2V9KSB8fCBwYXJzZUNhbGxiYWNrKG9uVHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvblRydWUgPSBwYXJzZUNhbGxiYWNrKG9uVHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9uRmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfd3JhcHBlZChvbkZhbHNlLCAneycsICd9JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYnJhY2VzIGdpdmVzIHVzIHRoZSBvblRydWUgYmxvY2tcclxuICAgICAgICAgICAgICAgICAgICBvbkZhbHNlSXNCbG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgb25GYWxzZSA9IF91bndyYXAob25GYWxzZSwgJ3snLCAnfScpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBvbkZhbHNlID0gcGFyc2VDYWxsYmFjayhvbkZhbHNlLCBbU3RhdGVtZW50c10sIHthc3NlcnQ6ZmFsc2V9KSB8fCBwYXJzZUNhbGxiYWNrKG9uRmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFsc2UgPSBwYXJzZUNhbGxiYWNrKG9uRmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblx0XHRcdHJldHVybiBuZXcgU3RhdGljKGFzc2VydGlvbiwgb25UcnVlLCBvbkZhbHNlLCB7b25UcnVlSXNCbG9jaywgb25GYWxzZUlzQmxvY2t9KTtcclxuICAgICAgICAgfVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgSWY7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4uL0V4cHJJbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBJZkludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnSWZDb25kaXRpb25hbCc7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNOdW1lcmljIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNOdW1lcmljLmpzJztcclxuaW1wb3J0IF9mbGF0dGVuIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2ZsYXR0ZW4uanMnO1xyXG5pbXBvcnQgX2ludGVyc2VjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9pbnRlcnNlY3QuanMnO1xyXG5pbXBvcnQgX3VuaXF1ZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci91bmlxdWUuanMnO1xyXG5pbXBvcnQgTWF0aEludGVyZmFjZSBmcm9tICcuL01hdGhJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgTGV4ZXIgZnJvbSAnLi4vTGV4ZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBNYXRoIGNsYXNzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuY29uc3QgTWF0aCA9IGNsYXNzIGV4dGVuZHMgTWF0aEludGVyZmFjZSB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih2YWwsIGV4cHJzKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy52YWwgPSB2YWw7XHJcblx0XHR0aGlzLmV4cHJzID0gZXhwcnM7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0ZXZhbChjb250ZXh0ID0gbnVsbCwgdHJhcCA9IHt9KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5leHBycy5yZWR1Y2UoKGN1cnJlbnRUb3RhbCwgZXhwcikgPT4ge1xyXG5cdFx0XHR2YXIgdmFsID0gZXhwci52YWwuZXZhbChjb250ZXh0LCB0cmFwKTtcclxuXHRcdFx0dmFyIG9wZXJhdG9yID0gZXhwci5vcGVyYXRvci50cmltKCk7XHJcblx0XHRcdGlmICgoIV9pc051bWVyaWMoY3VycmVudFRvdGFsKSB8fCAhX2lzTnVtZXJpYyh2YWwpKSAmJiBvcGVyYXRvciAhPT0gJysnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIE1hdGggZXhwcmVzc2lvbjogJyArIHRoaXMudG9TdHJpbmcoKSArICchJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3dpdGNoKG9wZXJhdG9yKSB7XHJcblx0XHRcdFx0Y2FzZSAnKyc6XHJcblx0XHRcdFx0XHRyZXR1cm4gY3VycmVudFRvdGFsICsgdmFsO1xyXG5cdFx0XHRcdGNhc2UgJy0nOlxyXG5cdFx0XHRcdFx0cmV0dXJuIGN1cnJlbnRUb3RhbCAtIHZhbDtcclxuXHRcdFx0XHRjYXNlICcqJzpcclxuXHRcdFx0XHRcdHJldHVybiBjdXJyZW50VG90YWwgKiB2YWw7XHJcblx0XHRcdFx0Y2FzZSAnLyc6XHJcblx0XHRcdFx0XHRyZXR1cm4gY3VycmVudFRvdGFsIC8gdmFsO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzLnZhbC5ldmFsKGNvbnRleHQsIHRyYXApKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHR0b1N0cmluZyhjb250ZXh0ID0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIFt0aGlzLnZhbC50b1N0cmluZyhjb250ZXh0KV0uY29uY2F0KFxyXG5cdFx0XHR0aGlzLmV4cHJzLm1hcChleHByID0+IGV4cHIub3BlcmF0b3IgKyAnICcgKyBleHByLnZhbC50b1N0cmluZyhjb250ZXh0KSlcclxuXHRcdCkuam9pbignICcpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBwYXJzZShleHByLCBwYXJzZUNhbGxiYWNrLCBTdGF0aWMgPSBNYXRoKSB7XHJcblx0XHR2YXIgcGFyc2UgPSBMZXhlci5sZXgoZXhwciwgX2ZsYXR0ZW4oU3RhdGljLm9wZXJhdG9ycykpO1xyXG5cdFx0aWYgKHBhcnNlLnRva2Vucy5sZW5ndGggPiAxICYmIHBhcnNlLm1hdGNoZXMubGVuZ3RoID09PSBwYXJzZS50b2tlbnMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHR2YXIgb3BlcmF0b3JzID0gX3VuaXF1ZShwYXJzZS5tYXRjaGVzKTtcclxuXHRcdFx0aWYgKF9pbnRlcnNlY3Qob3BlcmF0b3JzLCBNYXRoLm9wZXJhdG9ycy5zdXApLmxlbmd0aCAmJiBfaW50ZXJzZWN0KG9wZXJhdG9ycywgTWF0aC5vcGVyYXRvcnMuc3ViKS5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wiQWRkaXRpb24vc3VidHJhY3Rpb25cIiBhbmQgXCJtdWx0aXBsaWNhdGlvbi9kaXZpc2lvblwiIG9wZXJhdG9ycyBjYW5ub3QgYmUgdXNlZCBpbiB0aGUgc2FtZSBleHByZXNzaW9uOiAnICsgZXhwciArICchJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMoXHJcblx0XHRcdFx0cGFyc2VDYWxsYmFjayhwYXJzZS50b2tlbnMuc2hpZnQoKS50cmltKCkpLFxyXG5cdFx0XHRcdHBhcnNlLnRva2Vucy5tYXAoKGV4cHIsIGkpID0+IHtyZXR1cm4ge1xyXG5cdFx0XHRcdFx0b3BlcmF0b3I6IHBhcnNlLm1hdGNoZXNbaV0sXHJcblx0XHRcdFx0XHR2YWw6IHBhcnNlQ2FsbGJhY2soZXhwci50cmltKCkpXHJcblx0XHRcdFx0fTt9KVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvcCBvYmplY3RcclxuICovXHJcbk1hdGgub3BlcmF0b3JzID0ge1xyXG5cdHN1cDogWycqJywgJy8nXSxcclxuXHRzdWI6IFsnICsgJywgJyAtICddLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBNYXRoO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgRXhwckludGVyZmFjZSBmcm9tICcuLi9FeHBySW50ZXJmYWNlLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTWF0aEludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnTWF0aEV4cHJlc3Npb24nOyB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgSW50ZXJmYWNlO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzTnVtZXJpYyBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzTnVtZXJpYy5qcyc7XHJcbmltcG9ydCBOdW1JbnRlcmZhY2UgZnJvbSAnLi9OdW1JbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgTGV4ZXIgZnJvbSAnLi4vTGV4ZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBOdW0gKG51bWJlcikgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBOdW0gPSBjbGFzcyBleHRlbmRzIE51bUludGVyZmFjZSB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihpbnQsIGRlYyA9IDApIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmludCA9IGludDtcclxuXHRcdHRoaXMuZGVjID0gZGVjO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKCkge1xyXG5cdFx0cmV0dXJuIHBhcnNlRmxvYXQodGhpcy5pbnQgKyAodGhpcy5kZWMgPyAnLicgKyB0aGlzLmRlYyA6IG51bGwpKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHR0b1N0cmluZyhjb250ZXh0ID0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW50ICsgKHRoaXMuZGVjID8gJy4nICsgdGhpcy5kZWMgOiBudWxsKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyc2VDYWxsYmFjaywgU3RhdGljID0gTnVtKSB7XHJcblx0XHRpZiAoX2lzTnVtZXJpYyhleHByKSkge1xyXG5cdFx0XHR2YXIgZXhwciA9IGV4cHIuc3BsaXQoJy4nKTtcclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMoXHJcblx0XHRcdFx0cGFyc2VJbnQoZXhwci5zaGlmdCgpKSxcclxuXHRcdFx0XHRwYXJzZUludChleHByLnNoaWZ0KCkpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBOdW07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4uL0V4cHJJbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBOdW1JbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBJbnRlcmZhY2UgPSBjbGFzcyBleHRlbmRzIEV4cHJJbnRlcmZhY2Uge307XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnRlcmZhY2UucHJvdG90eXBlLCAnanNlblR5cGUnLCB7XHJcblx0Z2V0KCkgeyByZXR1cm4gJ051bWJlclR5cGUnOyB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgSW50ZXJmYWNlO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX3dyYXBwZWQgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvd3JhcHBlZC5qcyc7XHJcbmltcG9ydCBfdW53cmFwIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL3Vud3JhcC5qcyc7XHJcbmltcG9ydCBfZmlyc3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZmlyc3QuanMnO1xyXG5pbXBvcnQgX2xhc3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvbGFzdC5qcyc7XHJcbmltcG9ydCBfZWFjaCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9lYWNoLmpzJztcclxuaW1wb3J0IE9iakludGVyZmFjZSBmcm9tICcuL09iakludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBMZXhlciBmcm9tICcuLi9MZXhlci5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIE9iamVjdCB1dGlsc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IE9iaiA9IGNsYXNzIGV4dGVuZHMgT2JqSW50ZXJmYWNlIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGVudHJpZXMpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmVudHJpZXMgPSBlbnRyaWVzIHx8IHt9O1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGluaGVyaXQoU3VwZXIpIHtcclxuXHRcdGlmIChTdXBlciBpbnN0YW5jZW9mIE9iakludGVyZmFjZSkge1xyXG5cdFx0XHRfZWFjaChTdXBlci5lbnRyaWVzLCAobmFtZSwgdmFsKSA9PiB7XHJcblx0XHRcdFx0aWYgKCEobmFtZSBpbiB0aGlzLmVudHJpZXMpKSB7XHJcblx0XHRcdFx0XHR0aGlzLmVudHJpZXNbbmFtZV0gPSB2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pIHtcclxuXHRcdHZhciBpdGVtcyA9IHt9O1xyXG5cdFx0X2VhY2godGhpcy5lbnRyaWVzLCAoa2V5LCBleHByKSA9PiB7XHJcblx0XHRcdGl0ZW1zW2tleV0gPSBleHByLmV2YWwoY29udGV4dCwgdHJhcCk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuXHRcdHZhciBzdHIgPSBbXTtcclxuXHRcdF9lYWNoKHRoaXMuZW50cmllcywgKGtleSwgZXhwcikgPT4ge1xyXG5cdFx0XHRzdHIucHVzaChrZXkgKyBPYmoub3BlcmF0b3JzLnN1YiArIGV4cHIudG9TdHJpbmcoY29udGV4dCkpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gJ3snICsgc3RyLmpvaW4oT2JqLm9wZXJhdG9ycy5zdXApICsgJ30nO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBwYXJzZShleHByLCBwYXJzZUNhbGxiYWNrLCBTdGF0aWMgPSBPYmopIHtcclxuXHRcdGlmIChfd3JhcHBlZChleHByLCAneycsICd9JykgJiYgIUxleGVyLm1hdGNoKGV4cHIudHJpbSgpLCBbJyAnXSkubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBlbnRyaWVzID0ge307XHJcblx0XHRcdHZhciBfZW50cmllc1NwbGl0ID0gTGV4ZXIuc3BsaXQoX3Vud3JhcChleHByLCAneycsICd9JyksIFtPYmoub3BlcmF0b3JzLnN1cF0pXHJcblx0XHRcdFx0Lm1hcChuID0+IG4udHJpbSgpKS5maWx0ZXIobiA9PiBuKTtcclxuXHRcdFx0X2VhY2goX2VudHJpZXNTcGxpdCwgKGtleSwgZXhwcikgPT4ge1xyXG5cdFx0XHRcdHZhciBlbnRyeSA9IExleGVyLnNwbGl0KGV4cHIsIFtPYmoub3BlcmF0b3JzLnN1Yl0sIHtsaW1pdDoxfS8qSU1QT1JUQU5UKi8pO1xyXG5cdFx0XHRcdGVudHJpZXNbX2ZpcnN0KGVudHJ5KS50cmltKCldID0gcGFyc2VDYWxsYmFjayhfbGFzdChlbnRyeSkudHJpbSgpKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBuZXcgU3RhdGljKGVudHJpZXMpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvcCBvYmplY3RcclxuICovXHJcbk9iai5vcGVyYXRvcnMgPSB7XHJcblx0c3VwOiAnLCcsXHJcblx0c3ViOiAnOicsXHJcbn07XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IE9iajtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIE9iakludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnT2JqZWN0VHlwZSc7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfbGFzdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9sYXN0LmpzJztcclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IFByZXNlbmNlSW50ZXJmYWNlIGZyb20gJy4vUHJlc2VuY2VJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgUmVmZXJlbmNlSW50ZXJmYWNlIGZyb20gJy4vUmVmZXJlbmNlSW50ZXJmYWNlLmpzJztcclxuaW1wb3J0IENvbnRleHRzIGZyb20gJy4uL0NvbnRleHRzLmpzJztcclxuaW1wb3J0IExleGVyIGZyb20gJy4uL0xleGVyLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogUHJlc2VuY2UgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBQcmVzZW5jZSA9IGNsYXNzIGV4dGVuZHMgUHJlc2VuY2VJbnRlcmZhY2Uge1xyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHByb3AsIHJlZmVyZW5jZSwgb3BlcmF0b3IgPSAnaW4nKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5wcm9wID0gcHJvcDtcclxuXHRcdHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xyXG5cdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pIHtcclxuXHRcdHZhciByZWZlcmVuY2UgPSB0aGlzLnJlZmVyZW5jZS5nZXRFdmFsKGNvbnRleHQsIHRyYXApO1xyXG5cdFx0dmFyIHByb3AgPSB0aGlzLnByb3AuZXZhbChjb250ZXh0LCB0cmFwKTtcclxuXHRcdGlmICghX2lzVW5kZWZpbmVkKHJlZmVyZW5jZS5jb250ZXh0KSAmJiAhX2lzVW5kZWZpbmVkKHJlZmVyZW5jZS5uYW1lKSkge1xyXG5cdFx0XHRyZXR1cm4gQ29udGV4dHMuY3JlYXRlKHJlZmVyZW5jZS5jb250ZXh0KS5oYXMocmVmZXJlbmNlLm5hbWUsIHByb3AsIHRyYXApO1xyXG5cdFx0fVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdcIicgKyB0aGlzICsgJ1wiIGlzIHVuZGVmaW5lZCEnKTtcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuXHRcdHJldHVybiBbdGhpcy5wcm9wLnRvU3RyaW5nKGNvbnRleHQpLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnJlZmVyZW5jZS50b1N0cmluZyhjb250ZXh0KV0uam9pbignICcpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBwYXJzZShleHByLCBwYXJzZUNhbGxiYWNrLCBTdGF0aWMgPSBQcmVzZW5jZSkge1xyXG5cdFx0dmFyIHBhcnNlID0gTGV4ZXIubGV4KGV4cHIsIFN0YXRpYy5vcGVyYXRvcnMpO1xyXG5cdFx0aWYgKHBhcnNlLnRva2Vucy5sZW5ndGggPT09IDIpIHtcclxuXHRcdFx0dmFyIHByb3AsIHJlZmVyZW5jZTtcclxuXHRcdFx0aWYgKCEocHJvcCA9IHBhcnNlQ2FsbGJhY2socGFyc2UudG9rZW5zLnNoaWZ0KCkudHJpbSgpKSlcclxuXHRcdFx0fHwgISgocmVmZXJlbmNlID0gcGFyc2VDYWxsYmFjayhwYXJzZS50b2tlbnMuc2hpZnQoKS50cmltKCkpKSBpbnN0YW5jZW9mIFJlZmVyZW5jZUludGVyZmFjZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcHJlc2VuY2UgY2hlY2sgZXhwcmVzc2lvbjogJyArIGV4cHIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgU3RhdGljKHByb3AsIHJlZmVyZW5jZSwgcGFyc2UubWF0Y2hlc1swXS50cmltKCkpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcdFxyXG5cclxuLyoqXHJcbiAqIEBwcm9wIGFycmF5XHJcbiAqL1xyXG5QcmVzZW5jZS5vcGVyYXRvcnMgPSBbJyBpbiAnXTtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgUHJlc2VuY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4uL0V4cHJJbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBQcmVzZW5jZUludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnUHJlc2VuY2VPcGVyYXRvcic7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNVbmRlZmluZWQgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1VuZGVmaW5lZC5qcyc7XHJcbmltcG9ydCBfd3JhcHBlZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci93cmFwcGVkLmpzJztcclxuaW1wb3J0IF91bndyYXAgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvdW53cmFwLmpzJztcclxuaW1wb3J0IFJlZmVyZW5jZUludGVyZmFjZSBmcm9tICcuL1JlZmVyZW5jZUludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4uL0V4cHJJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgQ29udGV4dHMgZnJvbSAnLi4vQ29udGV4dHMuanMnO1xyXG5pbXBvcnQgTGV4ZXIgZnJvbSAnLi4vTGV4ZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBSZWZlcmVuY2UgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBSZWZlcmVuY2UgPSBjbGFzcyBleHRlbmRzIFJlZmVyZW5jZUludGVyZmFjZSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGV4dCwgbmFtZSwgYmFja3RpY2tzID0gZmFsc2UpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuYmFja3RpY2tzID0gYmFja3RpY2tzO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRnZXRFdmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pIHtcclxuXHRcdHZhciBzb3VyY2VDb250ZXh0ID0gY29udGV4dCwgbmFtZSA9IHRoaXMubmFtZTtcclxuXHRcdGlmICh0aGlzLmNvbnRleHQpIHtcclxuXHRcdFx0aWYgKG5hbWUgaW5zdGFuY2VvZiBFeHBySW50ZXJmYWNlKSB7XHJcblx0XHRcdFx0bmFtZSA9IG5hbWUuZXZhbChjb250ZXh0LCB0cmFwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzb3VyY2VDb250ZXh0ID0gdGhpcy5jb250ZXh0LmV2YWwoY29udGV4dCwgdHJhcCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4ge2NvbnRleHQ6c291cmNlQ29udGV4dCwgbmFtZTpuYW1lLH07XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGV2YWwoY29udGV4dCA9IG51bGwsIHRyYXAgPSB7fSkge1xyXG5cdFx0dmFyIHBhcnRzID0gdGhpcy5nZXRFdmFsKGNvbnRleHQsIHRyYXApO1xyXG5cdFx0aWYgKCFfaXNVbmRlZmluZWQocGFydHMuY29udGV4dCkgJiYgIV9pc1VuZGVmaW5lZChwYXJ0cy5uYW1lKSkge1xyXG5cdFx0XHRyZXR1cm4gQ29udGV4dHMuY3JlYXRlKHBhcnRzLmNvbnRleHQpLmdldChwYXJ0cy5uYW1lLCB0cmFwKTtcclxuXHRcdH1cclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuXHRcdHZhciBuYW1lID0gdGhpcy5uYW1lO1xyXG5cdFx0aWYgKHRoaXMuY29udGV4dCkge1xyXG5cdFx0XHR2YXIgc3ViamVjdENvbnRleHQgPSB0aGlzLmNvbnRleHQudG9TdHJpbmcoY29udGV4dCk7XHJcblx0XHRcdGlmIChuYW1lIGluc3RhbmNlb2YgRXhwckludGVyZmFjZSkge1xyXG5cdFx0XHRcdG5hbWUgPSAnWycgKyBuYW1lLnRvU3RyaW5nKGNvbnRleHQpICsgJ10nO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuYmFja3RpY2tzKSB7XHJcblx0XHRcdFx0bmFtZSA9ICdgJyArIG5hbWUgKyAnYCc7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBzdWJqZWN0Q29udGV4dCA9IGNvbnRleHQ7XHJcblx0XHRcdGlmICh0aGlzLmJhY2t0aWNrcykge1xyXG5cdFx0XHRcdG5hbWUgPSAnYCcgKyBuYW1lICsgJ2AnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKHN1YmplY3RDb250ZXh0IHx8ICcnKSArIChzdWJqZWN0Q29udGV4dCAmJiAhbmFtZS5zdGFydHNXaXRoKCdbJykgPyBSZWZlcmVuY2Uuc2VwYXJhdG9yIDogJycpICsgbmFtZTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyc2VDYWxsYmFjaywgU3RhdGljID0gUmVmZXJlbmNlKSB7XHJcblx0XHRpZiAoIUxleGVyLm1hdGNoKGV4cHIudHJpbSgpLCBbJyAnXSkubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBzcGxpdHMgPSBMZXhlci5zcGxpdChleHByLCBbXSk7XHJcblx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHQvLyBuYW1lLCBmaXJzdFxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0dmFyIGNvbnRleHQsIG5hbWUgPSBzcGxpdHMucG9wKCksIGJhY2t0aWNrcztcclxuXHRcdFx0dmFyIG5hbWVTcGxpdCA9IExleGVyLnNwbGl0KG5hbWUudHJpbSgpLCBbU3RhdGljLnNlcGFyYXRvcl0sIHtwcmVzZXJ2ZURlbGltczp0cnVlfSk7XHJcblx0XHRcdGlmIChuYW1lU3BsaXQubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdG5hbWUgPSBuYW1lU3BsaXQucG9wKCkuc3Vic3RyKDEpO1xyXG5cdFx0XHRcdHNwbGl0cyA9IHNwbGl0cy5jb25jYXQobmFtZVNwbGl0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoX3dyYXBwZWQobmFtZSwgJ2AnLCAnYCcpKSB7XHJcblx0XHRcdFx0bmFtZSA9IF91bndyYXAobmFtZSwgJ2AnLCAnYCcpO1xyXG5cdFx0XHRcdGJhY2t0aWNrcyA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdC8vIGNvbnRleHQsIHNlY29uZFxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0aWYgKHNwbGl0cy5sZW5ndGgpIHtcclxuXHRcdFx0XHRjb250ZXh0ID0gcGFyc2VDYWxsYmFjayhzcGxpdHMuam9pbignJykpO1xyXG5cdFx0XHRcdGNvbnRleHQuaXNDb250ZXh0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoX3dyYXBwZWQobmFtZSwgJ1snLCAnXScpKSB7XHJcblx0XHRcdFx0aWYgKCFjb250ZXh0KSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmVmZXJlbmNlOiAnICsgZXhwciArICchJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG5hbWUgPSBwYXJzZUNhbGxiYWNrKF91bndyYXAobmFtZSwgJ1snLCAnXScpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0YXRpYyhjb250ZXh0LCBuYW1lLCBiYWNrdGlja3MpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvcCBzdHJpbmdcclxuICovXHJcblJlZmVyZW5jZS5zZXBhcmF0b3IgPSAnLic7XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IFJlZmVyZW5jZTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFJlZmVyZW5jZUludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnUmVmZXJlbmNlJzsgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IEludGVyZmFjZTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IExleGVyIGZyb20gJy4uL0xleGVyLmpzJztcclxuaW1wb3J0IFJldHVybkludGVyZmFjZSBmcm9tICcuL1JldHVybkludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFJldCAocmV0dXJuKSBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IFJldHVybiA9IGNsYXNzIGV4dGVuZHMgUmV0dXJuSW50ZXJmYWNlIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGV4cHIpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmV4cHIgPSBleHByO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pIHtcclxuXHRcdHJldHVybiB0aGlzLmV4cHIgPyB0aGlzLmV4cHIuZXZhbChjb250ZXh0LCB0cmFwKSA6IHVuZGVmaW5lZDtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHR0b1N0cmluZyhjb250ZXh0ID0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZXhwciA/ICdyZXR1cm4gJyArIHRoaXMuZXhwci50b1N0cmluZyhjb250ZXh0KSA6ICdyZXR1cm4nO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0ICovXHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0c3RhdGljIHBhcnNlKGV4cHIsIHBhcnNlQ2FsbGJhY2ssIFN0YXRpYyA9IFJldHVybikge1xyXG5cdFx0dmFyIGV4cHJMYyA9IGV4cHIudG9Mb3dlckNhc2UoKTtcclxuXHRcdGlmIChleHByTGMuc3RhcnRzV2l0aCgncmV0dXJuICcpIHx8IGV4cHJMYyA9PT0gJ3JldHVybicpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0aWMoXHJcblx0XHRcdFx0cGFyc2VDYWxsYmFjayhleHByLnN1YnN0cig2KS50cmltKCkpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBSZXR1cm47XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4uL0V4cHJJbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBSZXR1cm5JbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBJbnRlcmZhY2UgPSBjbGFzcyBleHRlbmRzIEV4cHJJbnRlcmZhY2Uge307XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnRlcmZhY2UucHJvdG90eXBlLCAnanNlblR5cGUnLCB7XHJcblx0Z2V0KCkgeyByZXR1cm4gJ1JldHVybkRpcmVjdGl2ZSc7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfZmxhdHRlbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mbGF0dGVuLmpzJztcclxuaW1wb3J0IFN0YXRlbWVudHNJbnRlcmZhY2UgZnJvbSAnLi9TdGF0ZW1lbnRzSW50ZXJmYWNlLmpzJztcclxuaW1wb3J0IFJldHVybkludGVyZmFjZSBmcm9tICcuL1JldHVybkludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBDb250ZXh0cyBmcm9tICcuLi9Db250ZXh0cy5qcyc7XHJcbmltcG9ydCBMZXhlciBmcm9tICcuLi9MZXhlci5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFN0YXRlbWVudHMgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBTdGF0ZW1lbnRzID0gY2xhc3MgZXh0ZW5kcyBTdGF0ZW1lbnRzSW50ZXJmYWNlIHtcclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzdG10cywgZGVsaW0pIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnN0bXRzID0gc3RtdHMgfHwgW107XHJcblx0XHR0aGlzLmRlbGltID0gZGVsaW07XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdGV2YWwoY29udGV4dCA9IG51bGwsIHRyYXAgPSB7fSkge1xyXG5cdFx0Y29udGV4dCA9IENvbnRleHRzLmNyZWF0ZShjb250ZXh0KTtcclxuXHRcdHZhciBzdG10cyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0bXRzLmxlbmd0aDsgaSArKykge1xyXG5cdFx0XHRpZiAodGhpcy5zdG10c1tpXSBpbnN0YW5jZW9mIFJldHVybkludGVyZmFjZSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnN0bXRzW2ldLmV2YWwoY29udGV4dCwgdHJhcCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c3RtdHNbaV0gPSB0aGlzLnN0bXRzW2ldLmV2YWwoY29udGV4dCwgdHJhcCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBzdG10cztcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0dG9TdHJpbmcoY29udGV4dCA9IG51bGwpIHtcclxuXHRcdHJldHVybiB0aGlzLnN0bXRzLm1hcChzdG10ID0+IHN0bXQudG9TdHJpbmcoY29udGV4dCkpLmpvaW4odGhpcy5kZWxpbSk7XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBwYXJzZShleHByLCBwYXJzZUNhbGxiYWNrLCBTdGF0aWMgPSBTdGF0ZW1lbnRzKSB7XHJcblx0XHR2YXIgcGFyc2UgPSBMZXhlci5sZXgoZXhwciwgX2ZsYXR0ZW4oU3RhdGljLm9wZXJhdG9ycykuY29uY2F0KFsoYSwgYikgPT4ge1xyXG5cdFx0XHQvLyBDYXNlcyBvZiBjb2RlIGJsb2NrcyB0aGF0IHdvbid0IGVuZCBpbiBcIjtcIlxyXG5cdFx0XHRpZiAoYS5lbmRzV2l0aCgnfScpICYmICFiLnRyaW0oKS5zdGFydHNXaXRoKCdlbHNlJykpIHtcclxuXHRcdFx0XHRyZXR1cm4gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fV0pKTtcclxuXHRcdGlmIChwYXJzZS5tYXRjaGVzLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFN0YXRpYyhcclxuXHRcdFx0XHRwYXJzZS50b2tlbnMubWFwKHN0bXQgPT4gcGFyc2VDYWxsYmFjayhzdG10LnRyaW0oKSkpLmZpbHRlcihhID0+IGEpLFxyXG5cdFx0XHRcdHBhcnNlLm1hdGNoZXNbMF0udHJpbSgpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm9wIGFycmF5XHJcbiAqL1xyXG5TdGF0ZW1lbnRzLm9wZXJhdG9ycyA9IFtcclxuXHQnOycsXHJcblx0XCJcXHJcXG5cIixcclxuXTtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGVtZW50cztcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFN0YXRlbWVudHNJbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBJbnRlcmZhY2UgPSBjbGFzcyBleHRlbmRzIEV4cHJJbnRlcmZhY2Uge307XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnRlcmZhY2UucHJvdG90eXBlLCAnanNlblR5cGUnLCB7XHJcblx0Z2V0KCkgeyByZXR1cm4gJ1N0YXRlbWVudHMnOyB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgSW50ZXJmYWNlO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX3dyYXBwZWQgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvd3JhcHBlZC5qcyc7XHJcbmltcG9ydCBfdW53cmFwIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL3Vud3JhcC5qcyc7XHJcbmltcG9ydCBTdHJJbnRlcmZhY2UgZnJvbSAnLi9TdHJJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgTGV4ZXIgZnJvbSAnLi4vTGV4ZXIuanMnO1xyXG5pbXBvcnQgQm9vbCBmcm9tICcuL0Jvb2wuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBTdHJpbmcgdXRpbHNcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuY29uc3QgU3RyID0gY2xhc3MgZXh0ZW5kcyBTdHJJbnRlcmZhY2Uge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZXhwciwgcXVvdGUpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmV4cHIgPSBleHByO1xyXG5cdFx0dGhpcy5xdW90ZSA9IHF1b3RlO1xyXG5cdH1cclxuXHQgXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRldmFsKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZXhwcjtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHR0b1N0cmluZygpIHtcclxuXHRcdHJldHVybiB0aGlzLnF1b3RlICsgdGhpcy5leHByICsgdGhpcy5xdW90ZTtcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0c3RhdGljIHBhcnNlKGV4cHIsIHBhcnNlQ2FsbGJhY2ssIFN0YXRpYyA9IFN0cikge1xyXG5cdFx0ZXhwciA9IGV4cHIudHJpbSgpO1xyXG5cdFx0aWYgKChfd3JhcHBlZChleHByLCAnXCInLCAnXCInKSB8fCBfd3JhcHBlZChleHByLCBcIidcIiwgXCInXCIpKSBcclxuXHRcdCYmICFMZXhlci5tYXRjaChleHByLCBbJyAnXSkubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBxdW90ZSA9IF93cmFwcGVkKGV4cHIsICdcIicsICdcIicpID8gJ1wiJyA6IFwiJ1wiO1xyXG5cdFx0XHRyZXR1cm4gbmV3IFN0YXRpYyhcclxuXHRcdFx0XHRfdW53cmFwKGV4cHIsIHF1b3RlLCBxdW90ZSksXHJcblx0XHRcdFx0cXVvdGVcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogQGV4cG9ydHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IFN0cjtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV4cHJJbnRlcmZhY2UgZnJvbSAnLi4vRXhwckludGVyZmFjZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFN0ckludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmNvbnN0IEludGVyZmFjZSA9IGNsYXNzIGV4dGVuZHMgRXhwckludGVyZmFjZSB7fTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEludGVyZmFjZS5wcm90b3R5cGUsICdqc2VuVHlwZScsIHtcclxuXHRnZXQoKSB7IHJldHVybiAnU3RyaW5nVHlwZSc7IH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNPYmplY3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc09iamVjdC5qcyc7XHJcbmltcG9ydCBfZXZlbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9ldmVuLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRXhwckludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBDb21wYXJlcyB0aGUgY3VycmVudCBpbnN0YW5jZSB3aXRoIGFub3RoZXIgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCBFeHByXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRldmVuKEV4cHIpIHtcclxuXHRcdGlmIChfaXNPYmplY3QoRXhwcikgJiYgRXhwci5qc2VuVHlwZSA9PT0gdGhpcy5qc2VuVHlwZSkge1xyXG5cdFx0XHRyZXR1cm4gX2V2ZW4oRXhwciwgdGhpcyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEluaGVyaXRzIHByb3BlcnRpZXMgZnJvbSBhIHN1cGVyIEV4cHIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gRXhwckludGVyZmFjZSBTdXBlclxyXG5cdCAqXHJcblx0ICogQHJldHVybiB0aGlzXHJcblx0ICovXHJcblx0aW5oZXJpdChTdXBlcikge1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY29tbWVudHMgdG8gdGhlIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZ1x0IGNvbW1lbnRzXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHRoaXNcclxuXHQgKi9cclxuXHR3aXRoQ29tbWVudHMoY29tbWVudHMpIHtcclxuXHRcdGlmICghdGhpcy5tZXRhKSB7XHJcblx0XHRcdHRoaXMubWV0YSA9IHt9O1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5tZXRhLmNvbW1lbnRzID0gY29tbWVudHM7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQWRkcyB2YXJpYWJsZXMgdG8gdGhlIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5XHRcdCB2YXJzXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHRoaXNcclxuXHQgKi9cclxuXHR3aXRoVmFycyh2YXJzKSB7XHJcblx0XHRpZiAoIXRoaXMubWV0YSkge1xyXG5cdFx0XHR0aGlzLm1ldGEgPSB7fTtcclxuXHRcdH1cclxuXHRcdHRoaXMubWV0YS52YXJzID0gdmFycztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBFdmFsdWF0ZXMgdGhlIGV4cHJlc3Npb24gaW5zdGFuY2UgZm9yIGEgcmVzdWx0LFxyXG5cdCAqIG9wdGlvbmFsbHkgaW4gdGhlIGNvbnRleHQgb2YgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCBjb250ZXh0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblx0Ly9ldmFsKGNvbnRleHQgPSBudWxsLCB0cmFwID0ge30pXHJcblx0XHJcblx0LyoqXHJcblx0ICogU2VyaWFsaXplcyB0aGUgZXhwcmVzc2lvbiBpbnN0YW5jZSBiYWNrIHRvIGEgc3RyaW5nLFxyXG5cdCAqIG9wdGlvbmFsbHkgaW4gdGhlIGNvbnRleHQgb2YgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCBjb250ZXh0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdC8vdG9TdHJpbmcoY29udGV4dCA9IG51bGwpXHJcblx0XHJcblx0LyoqXHJcblx0ICogU0F0dGVtcHRzIHRvIHBhcnNlIGEgc3RyaW5nIGludG8gdGhlIGNsYXNzIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyBleHByXHJcblx0ICogQHBhcmFtIG9iamVjdCBwYXJhbXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gRXhwckludGVyZmFjZVxyXG5cdCAqL1xyXG5cdC8vc3RhdGljIHBhcnNlKGV4cHIsIHBhcmFtcyA9IHt9KVxyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX21lcmdlIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL21lcmdlLmpzJztcclxuaW1wb3J0IF9yZW1vdmUgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvcmVtb3ZlLmpzJztcclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaW5zdGFuY2VvZiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2luc3RhbmNlb2YuanMnO1xyXG5pbXBvcnQgUmVmZXJlbmNlSW50ZXJmYWNlIGZyb20gJy4vRXhwci9SZWZlcmVuY2VJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgQ2FsbEludGVyZmFjZSBmcm9tICcuL0V4cHIvQ2FsbEludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBGdW5jSW50ZXJmYWNlIGZyb20gJy4vRXhwci9GdW5jSW50ZXJmYWNlLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogSnNlbiAoYmFzZSkgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5jb25zdCBKc2VuID0gY2xhc3Mge1xyXG5cdCBcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBwYXJzZShleHByLCBQYXJzZXJzLCBwYXJhbXMgPSB7fSwgU3RhdGljID0gSnNlbikge1xyXG5cdFx0aWYgKCFwYXJhbXMubWV0YSkge1xyXG5cdFx0XHRwYXJhbXMubWV0YSA9IHt2YXJzOiBbXSwgX3ZhcnM6IFtdfTtcclxuXHRcdH1cclxuXHRcdGlmIChleHByLmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgcGFyc2VycyA9IE9iamVjdC52YWx1ZXMoUGFyc2VycyB8fCBTdGF0aWMuZ3JhbW1hcnMpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHBhcnNlcnMubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdFx0Ly8gRnJvbSB0aGlzIHBvaW50IGZvcndhcmQsIGFsbCB2YXJzIGlzIHdpdGhpbiBjdXJyZW50IHNjb3BlXHJcblx0XHRcdFx0dmFyIHZhcnNTY29wZSA9IHBhcmFtcy5tZXRhICYmIF9pc0FycmF5KHBhcmFtcy5tZXRhLnZhcnMpID8gcGFyYW1zLm1ldGEudmFycy5sZW5ndGggOiAwO1xyXG5cdFx0XHRcdHZhciBwYXJzZWQgPSBwYXJzZXJzW2ldLnBhcnNlKGV4cHIsIChfZXhwciwgX1BhcnNlcnMsIF9wYXJhbXMgPSB7fSkgPT4gSnNlbi5wYXJzZShfZXhwciwgX1BhcnNlcnMsIF9wYXJhbXMgPyBfbWVyZ2UocGFyYW1zLCBfcGFyYW1zKSA6IHBhcmFtcywgU3RhdGljKSk7XHJcblx0XHRcdFx0Ly8gQWRkL3JlbW92ZSB2YXJzIHRvIHNjb3BlXHJcblx0XHRcdFx0aWYgKHBhcnNlZCkge1xyXG5cdFx0XHRcdFx0aWYgKCFwYXJzZWQubWV0YSkge1xyXG5cdFx0XHRcdFx0XHRwYXJzZWQubWV0YSA9IHt9O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gUmVhcCB2YXJzIGludG8gc2NvcGUgZXhwclxyXG5cdFx0XHRcdFx0aWYgKF9pbnN0YW5jZW9mKHBhcnNlZCwgRnVuY0ludGVyZmFjZSkpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHNlY29uZExldmVsVmFycyA9IHBhcmFtcy5tZXRhLnZhcnMuc3BsaWNlKHZhcnNTY29wZSk7XHJcblx0XHRcdFx0XHRcdHBhcmFtcy5tZXRhLl92YXJzID0gcGFyYW1zLm1ldGEuX3ZhcnMuY29uY2F0KHNlY29uZExldmVsVmFycyk7XHJcblx0XHRcdFx0XHRcdHBhcnNlZC5tZXRhLl92YXJzID0gc2Vjb25kTGV2ZWxWYXJzO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cGFyc2VkLm1ldGEudmFycyA9IHBhcmFtcy5tZXRhLnZhcnMuc2xpY2UodmFyc1Njb3BlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIEFkZCB2YXJzIHRvIHNjb3BlXHJcblx0XHRcdFx0XHRpZiAoX2luc3RhbmNlb2YocGFyc2VkLCBSZWZlcmVuY2VJbnRlcmZhY2UpIHx8IF9pbnN0YW5jZW9mKHBhcnNlZCwgQ2FsbEludGVyZmFjZSkpIHtcclxuXHRcdFx0XHRcdFx0X3JlbW92ZShwYXJzZWQubWV0YS52YXJzLCBwYXJzZWQuY29udGV4dCk7XHJcblx0XHRcdFx0XHRcdF9yZW1vdmUocGFyYW1zLm1ldGEudmFycywgcGFyc2VkLmNvbnRleHQpO1xyXG5cdFx0XHRcdFx0XHRwYXJhbXMubWV0YS52YXJzLnB1c2gocGFyc2VkKTtcclxuXHRcdFx0XHRcdH0gXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChwYXJzZWQgJiYgX2lzQXJyYXkocGFyYW1zLmV4cGxhaW4pKSB7XHJcblx0XHRcdFx0XHRwYXJhbXMuZXhwbGFpbi5wdXNoKGV4cHIgKyAnID4+LS0tLS0tLS0tLS0tLT4+ICcgKyBwYXJzZWQuanNlblR5cGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAocGFyc2VkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocGFyYW1zLmFzc2VydCA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdbU3ludGF4IGVycm9yOl0gJyArIGV4cHIpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgSnNlbjtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc1N0cmluZyBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzU3RyaW5nLmpzJztcclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNGdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBfYXJyRnJvbSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mcm9tLmpzJztcclxuaW1wb3J0IF9mbGF0dGVuIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2ZsYXR0ZW4uanMnO1xyXG5pbXBvcnQgX2ZpcnN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2ZpcnN0LmpzJztcclxuaW1wb3J0IF9sYXN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2xhc3QuanMnO1xyXG5pbXBvcnQgX21lcmdlIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL21lcmdlLmpzJztcclxuaW1wb3J0IF9ldmVuIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2V2ZW4uanMnO1xyXG5pbXBvcnQgX2NvcHlQbGFpbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9jb3B5UGxhaW4uanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRPS0VOSVpFUlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmNvbnN0IExleGVyID0gY2xhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBGYWN0b3J5IG1ldGhvZC5cclxuXHQgKlxyXG5cdCAqIEhhbmRsZXMgY2FjaGluZy5cclxuXHQgKlxyXG5cdCAqIEBzZWUgY29uc3RydWN0b3IoKVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBsZXgoc3RyLCBkZWxpbXMsIG9wdGlvbnMgPSB7fSkge1xyXG5cdFx0aWYgKCFfaXNTdHJpbmcoc3RyKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50MSBtdXN0IGJlIGEgc3RyaW5nIScpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGNvcHlSZXN1bHQgPSByZXN1bHQgPT4ge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGRlbGltczogcmVzdWx0LmRlbGltcy5zbGljZSgpLFxyXG5cdFx0XHRcdG9wdGlvbnM6IF9jb3B5UGxhaW4ocmVzdWx0Lm9wdGlvbnMpLFxyXG5cdFx0XHRcdG5lc3Rpbmc6IHJlc3VsdC5uZXN0aW5nLnNsaWNlKCksXHJcblx0XHRcdFx0bWF4RGVwdGg6IHJlc3VsdC5tYXhEZXB0aCxcclxuXHRcdFx0XHRjb21tZW50czogcmVzdWx0LmNvbW1lbnRzLnNsaWNlKCksXHJcblx0XHRcdFx0dG9rZW5zOiByZXN1bHQudG9rZW5zLnNsaWNlKCksXHJcblx0XHRcdFx0bWF0Y2hlczogcmVzdWx0Lm1hdGNoZXMuc2xpY2UoKSxcclxuXHRcdFx0XHRtYXRjaGVzaTogX2NvcHlQbGFpbihyZXN1bHQubWF0Y2hlc2kpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHRcdC8vIEFTSyBDQUNIRSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGlmIChMZXhlci4kY2FjaGVbc3RyXSAmJiBvcHRpb25zLmNhY2hlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IExleGVyLiRjYWNoZVtzdHJdLmxlbmd0aDsgaSArKykge1xyXG5cdFx0XHRcdHZhciBjYWNoZWQgPSBMZXhlci4kY2FjaGVbc3RyXVtpXTtcclxuXHRcdFx0XHRpZiAoX2V2ZW4oY2FjaGVkLmRlbGltcywgZGVsaW1zKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNvcHlSZXN1bHQoY2FjaGVkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vIEZSRVNIIFBBUlNFXHQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0dmFyIGluc3RhbmNlID0gbmV3IExleGVyKHN0ciwgb3B0aW9ucyk7XHJcblx0XHR2YXIgcmVzdWx0ID0gaW5zdGFuY2UubGV4KGRlbGltcyk7XHJcblx0XHQvLyBTQVZFIFRPIENBQ0hFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGlmIChvcHRpb25zLmNhY2hlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRMZXhlci4kY2FjaGVbc3RyXSA9IExleGVyLiRjYWNoZVtzdHJdIHx8IFtdO1xyXG5cdFx0XHRMZXhlci4kY2FjaGVbc3RyXS5wdXNoKHJlc3VsdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY29weVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGYWN0b3J5IG1ldGhvZCBmb3IgLnNwbGl0KCkuXHJcblx0ICpcclxuXHQgKiBIYW5kbGVzIGNhY2hpbmcuXHJcblx0ICpcclxuXHQgKiBAc2VlIGNvbnN0cnVjdG9yKClcclxuXHQgKi9cclxuXHRzdGF0aWMgc3BsaXQoc3RyLCBkZWxpbXMsIG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiBMZXhlci5sZXgoc3RyLCBkZWxpbXMsIG9wdGlvbnMpLnRva2VucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZhY3RvcnkgbWV0aG9kIGZvciAubWF0Y2goKS5cclxuXHQgKlxyXG5cdCAqIEhhbmRsZXMgY2FjaGluZy5cclxuXHQgKlxyXG5cdCAqIEBzZWUgY29uc3RydWN0b3IoKVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtYXRjaChzdHIsIGRlbGltcywgb3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIExleGVyLmxleChzdHIsIGRlbGltcywgb3B0aW9ucykubWF0Y2hlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBsZXhlciBpbnN0YW5jZSBvbiBhIHN0cmluZyB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyBcdHN0clxyXG5cdCAqIEBwYXJhbSBvYmplY3RcdG9wdGlvbnM6XHJcblx0ICogQHBhcmFtIHN0cmluZyBcdFx0YmxvY2tzXHRcdFx0XHRUaGUgc3RyaW5ncyB0aGF0IGJlZ2luIGFuZCBlbmQgYSBuZXN0ZWQgc3RydWN0dXJlXHJcblx0ICogQHBhcmFtIG51bWJlciBcdFx0bGltaXRcdFx0XHRcdE1heCByZXN1bHRzIHRvIHJldHVyblxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgXHRcdGJhY2tyZWZlcmVuY2VcdFx0QSBjaGFyYWN0ZXIgbGlrZSAoXFwpIHRoYXQgcHJlZml4ZXMgbm9uLWRlbGltIGNoYXJhY3RlcnNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzdHIsIG9wdGlvbnMpIHtcclxuXHRcdGlmICghX2lzU3RyaW5nKHN0cikpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdMZXhlciByZXF1aXJlcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBzdHJpbmcuJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLiRzdHIgPSBzdHI7XHJcblx0XHR0aGlzLiRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHRcdGlmICghdGhpcy4kb3B0aW9ucy5ibG9ja3MpIHtcclxuXHRcdFx0dGhpcy4kb3B0aW9ucy5ibG9ja3MgPSBMZXhlci4kYmxvY2tzO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLiRvcHRpb25zLnF1b3Rlcykge1xyXG5cdFx0XHR0aGlzLiRvcHRpb25zLnF1b3RlcyA9IExleGVyLiRxdW90ZXM7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMuJG9wdGlvbnMuY29tbWVudHMpIHtcclxuXHRcdFx0dGhpcy4kb3B0aW9ucy5jb21tZW50cyA9IExleGVyLiRjb21tZW50cztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBhcnNlcyB0aGUgaW5zdGFuY2Ugc3RyaW5nIG9uIHRoZSBnaXZlbiBkZWxpbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogVGhpcyBtZXRob2Qgc3VwcG9ydHMgc3RhdGljIGNhbGxpbmcsXHJcblx0ICogaW4gd2hpY2ggY2FzZSBhIHN0cmluZyBpcyByZXF1aXJlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIFx0c3RyXHJcblx0ICogQHBhcmFtIG9iamVjdFx0b3B0aW9uc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRsZXgoZGVsaW1zLCBvcHRpb25zKSB7XHJcblx0XHR2YXIgcnVudGltZSA9IHtcclxuXHRcdFx0ZGVsaW1zOiBfYXJyRnJvbShkZWxpbXMpLFxyXG5cdFx0XHRvcHRpb25zOiBfbWVyZ2UodHJ1ZSwge30sIHRoaXMuJG9wdGlvbnMsIG9wdGlvbnMgfHwge30pLFxyXG5cdFx0XHRuZXN0aW5nOiBbXSxcclxuXHRcdFx0bWF4RGVwdGg6IDAsXHJcblx0XHRcdGNvbW1lbnRzOiBbXSxcclxuXHRcdFx0dG9rZW5zOiBbXSxcclxuXHRcdFx0bWF0Y2hlczogW10sXHJcblx0XHRcdG1hdGNoZXNpOiB7fSxcclxuXHRcdH07XHJcblx0XHQvLyBJdGVyYXRlIG92ZXIgZWFjaCBjaGFyYWN0ZXIsIGtlZXAgdHJhY2sgb2YgY3VycmVudCByb3cgYW5kIGNvbHVtbiAob2YgdGhlIHJldHVybmVkIGFycmF5KVxyXG5cdFx0dGhpcy5fZXZhbENoYXJzQXQocnVudGltZSwgMCk7XHJcblx0XHRpZiAocnVudGltZS5uZXN0aW5nLmxlbmd0aCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHBhcnNpbmcgdGhlIHN0cmluZzogJyArIHRoaXMuJHN0ciArICcuIFVudGVybWluYXRlZCBibG9ja3M6ICcgKyBfZmxhdHRlbihydW50aW1lLm5lc3RpbmcpLmpvaW4oJywgJykgKyAnJyk7XHJcblx0XHR9XHJcblx0XHQvLyBSRVRVUk4gTkVXIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdHJldHVybiBydW50aW1lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXhwciBoZWxwZXI6IGV2YWx1YXRlcyBhbmQgaGFuZGxlcyB0aGUgY2hhcmFjdGVyIG9uIHRoZSBjdXJyZW50IGN1cnNvci5cclxuXHQgKiBBZHZhbmNlcyB0aGUgY3Vyc29yLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCBcdHJ1bnRpbWVcclxuXHQgKiBAcGFyYW0gaW50XHRcdGlcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdF9ldmFsQ2hhcnNBdChydW50aW1lLCBpKSB7XHJcblx0XHRpZiAoaSA+PSB0aGlzLiRzdHIubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBjaGFyV2lkdGggPSAxO1xyXG5cdFx0dmFyIGNvbW1lbnRUZXN0ID0ge30sIHF1b3RlVGVzdCA9IHt9LCBuZXN0aW5nVGVzdCA9IHt9O1xyXG5cdFx0Ly8gUXVvdGVzIGluc2lkZSBjb21tZW50cyBtdXN0IGJlIGlnbm9yZWRcclxuXHRcdGlmICghcnVudGltZS5vcGVuQ29tbWVudCkge1xyXG5cdFx0XHRxdW90ZVRlc3QgPSB0aGlzLl90ZXN0UXVvdGVzKHJ1bnRpbWUsIGkpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gQ29tbWVudHMgaW5zaWRlIHF1b3RlcyBtdXN0IGJlIGlnbm9yZWRcclxuXHRcdGlmICghcnVudGltZS5vcGVuUXVvdGUpIHtcclxuXHRcdFx0Y29tbWVudFRlc3QgPSB0aGlzLl90ZXN0Q29tbWVudHMocnVudGltZSwgaSk7XHJcblx0XHR9XHJcblx0XHQvLyBTYXZlIGNvbW1lbnRzXHJcblx0XHRpZiAocnVudGltZS5vcGVuQ29tbWVudCB8fCBjb21tZW50VGVzdC5lbmRpbmcpIHtcclxuXHRcdFx0Ly8gU2F2ZSBvbmx5IG91dGVyIGNvbW1lbnRzXHJcblx0XHRcdGlmICghcnVudGltZS5uZXN0aW5nLmxlbmd0aCAmJiAhbmVzdGluZ1Rlc3QuZW5kaW5nKSB7XHJcblx0XHRcdFx0dmFyIGNoYXJzID0gY29tbWVudFRlc3Quc3RhcnRpbmcgfHwgY29tbWVudFRlc3QuZW5kaW5nIHx8IHRoaXMuJHN0cltpXTtcclxuXHRcdFx0XHRjaGFyV2lkdGggPSBjaGFycy5sZW5ndGg7XHJcblx0XHRcdFx0dGhpcy5fcHVzaChydW50aW1lLCBjaGFycywgJ2NvbW1lbnRzJywgY29tbWVudFRlc3Quc3RhcnRpbmcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3B1c2gocnVudGltZSwgdGhpcy4kc3RyW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChydW50aW1lLm9wZW5RdW90ZSB8fCBxdW90ZVRlc3QuZW5kaW5nKSB7XHJcblx0XHRcdC8vIFllcyBhZGQgcXVvdGVzXHJcblx0XHRcdHRoaXMuX3B1c2gocnVudGltZSwgdGhpcy4kc3RyW2ldKTtcclxuXHRcdH0gZWxzZSBpZiAocnVudGltZS5vcHRpb25zLmxpbWl0ICYmIHJ1bnRpbWUubWF0Y2hlcy5sZW5ndGggPT09IHJ1bnRpbWUub3B0aW9ucy5saW1pdCkge1xyXG5cdFx0XHR0aGlzLl9wdXNoKHJ1bnRpbWUsIHRoaXMuJHN0cltpXSk7XHJcblx0XHRcdHJldHVybiB0aGlzLl9ldmFsQ2hhcnNBdChydW50aW1lLCBpICsgMSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBOZXN0aW5nIHRhZ3MgaW5zaWRlIGNvbW1lbnRzIGFuZCBxdW90ZXMgaGF2ZSBiZWVuIGlnbm9yZWRcclxuXHRcdFx0bmVzdGluZ1Rlc3QgPSB0aGlzLl90ZXN0TmVzdGluZyhydW50aW1lLCBpKTtcclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdC8vIFNUT1AgT04gVEhJUyBDSEFSQUNURVIuLi4/XHJcblx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR2YXIgbmVzdGluZ1Rlc3QgPSB0aGlzLl90ZXN0TmVzdGluZyhydW50aW1lLCBpKTtcclxuXHRcdFx0Ly8gU1RPUCBDSEFSKFMpPyBhdCB0b3AgbGV2ZWw/XHJcblx0XHRcdHZhciBzdG9wQ2hhciA9IHRoaXMuX3Rlc3RDaGFycyhydW50aW1lLm9wdGlvbnMuc3RvcENoYXJzIHx8IFtdLCBydW50aW1lLCBpKTtcclxuXHRcdFx0aWYgKCFydW50aW1lLm5lc3RpbmcubGVuZ3RoICYmIHN0b3BDaGFyICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJ1bnRpbWUub3B0aW9ucy5zdG9wQ2hhciA9IHN0b3BDaGFyO1xyXG5cdFx0XHRcdHJ1bnRpbWUub3B0aW9ucy5zdG9wQ2hhckZvcndhcmQgPSB0aGlzLiRzdHIuc3Vic3RyKGkpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0Ly8gTWF0Y2ggYW5kIHNwbGl0IG5vdy4uLlxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0aWYgKCFydW50aW1lLmRlbGltcy5sZW5ndGgpIHtcclxuXHRcdFx0XHQvLyBCTE9DSy1CQVNFRCBTUExJVFRJTkcuLi5cclxuXHRcdFx0XHRpZiAocnVudGltZS5uZXN0aW5nLmxlbmd0aCA9PT0gMiAmJiBuZXN0aW5nVGVzdC5zdGFydGluZykge1xyXG5cdFx0XHRcdFx0cnVudGltZS5tYXRjaGVzLnB1c2gobnVsbCk7XHJcblx0XHRcdFx0XHR0aGlzLl9wdXNoKHJ1bnRpbWUsIG5lc3RpbmdUZXN0LnN0YXJ0aW5nKTtcclxuXHRcdFx0XHRcdGNoYXJXaWR0aCA9IG5lc3RpbmdUZXN0LnN0YXJ0aW5nLmxlbmd0aDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCFydW50aW1lLm5lc3RpbmcubGVuZ3RoICYmIG5lc3RpbmdUZXN0LmVuZGluZykge1xyXG5cdFx0XHRcdFx0dGhpcy5fcHVzaChydW50aW1lLCBuZXN0aW5nVGVzdC5lbmRpbmcpO1xyXG5cdFx0XHRcdFx0Y2hhcldpZHRoID0gbmVzdGluZ1Rlc3QuZW5kaW5nLmxlbmd0aDtcclxuXHRcdFx0XHRcdHJ1bnRpbWUubWF0Y2hlcy5wdXNoKG51bGwpO1xyXG5cdFx0XHRcdH0gZWxzZS8qbm8tbmVzdGluZyBmbGFnKi8ge1xyXG5cdFx0XHRcdFx0dGhpcy5fcHVzaChydW50aW1lLCB0aGlzLiRzdHJbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHQvLyBERUxJTVMtQkFTRUQgU1BMSVRUSU5HXHJcblx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0aWYgKCFydW50aW1lLm5lc3RpbmcubGVuZ3RoICYmICFuZXN0aW5nVGVzdC5lbmRpbmcpIHtcclxuXHRcdFx0XHRcdC8vIEluIGNhc2UgdGhlIGNoYXJzIGF0IGluZGV4IDAgaXMgYSBkZWxpbSxcclxuXHRcdFx0XHRcdC8vIHRoZSByZXN1bHRpbmcgc3BsaXQgc2hvdWxkIGZpcnN0IGhhdmUgYW4gZW1wdHkgc3RyaW5nLCBpbnN0ZWFkIG9mIHVuZGVmaW5lZFxyXG5cdFx0XHRcdFx0dGhpcy5fcHVzaChydW50aW1lLCAnJyk7XHJcblx0XHRcdFx0XHR2YXIgbWF0Y2hlZERlbGltID0gdGhpcy5fdGVzdENoYXJzKHJ1bnRpbWUuZGVsaW1zLCBydW50aW1lLCBpKTtcclxuXHRcdFx0XHRcdGlmIChtYXRjaGVkRGVsaW0gIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdHJ1bnRpbWUubWF0Y2hlcy5wdXNoKG1hdGNoZWREZWxpbSk7XHJcblx0XHRcdFx0XHRcdHJ1bnRpbWUubWF0Y2hlc2lbaV0gPSBtYXRjaGVkRGVsaW07XHJcblx0XHRcdFx0XHRcdGNoYXJXaWR0aCA9IG1hdGNoZWREZWxpbS5sZW5ndGggfHwgMTtcclxuXHRcdFx0XHRcdFx0aWYgKCFydW50aW1lLm9wdGlvbnMucHJlc2VydmVEZWxpbXMpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBUaGUgY3VycmVudCBjaGFyYWN0ZXIgaXMgYSBkZWxpbWl0ZXIuLi5cclxuXHRcdFx0XHRcdFx0XHQvLyBhbmQgc2hvdWxkIG5vdCBnZXQgdG8gYXBwZW5kaW5nIHRvIHRoZSBzcGxpdCBzZXJpZXMgZG93biB0aGUgbGluZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9ldmFsQ2hhcnNBdChydW50aW1lLCBpICsgKG1hdGNoZWREZWxpbS5sZW5ndGggfHwgMSkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLl9wdXNoKHJ1bnRpbWUsIG1hdGNoZWREZWxpbSB8fCB0aGlzLiRzdHJbaV0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YXIgY2hhcnMgPSBuZXN0aW5nVGVzdC5zdGFydGluZyB8fCBuZXN0aW5nVGVzdC5lbmRpbmcgfHwgdGhpcy4kc3RyW2ldO1xyXG5cdFx0XHRcdFx0Y2hhcldpZHRoID0gY2hhcnMubGVuZ3RoO1xyXG5cdFx0XHRcdFx0dGhpcy5fcHVzaChydW50aW1lLCBjaGFycyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fZXZhbENoYXJzQXQocnVudGltZSwgaSArIGNoYXJXaWR0aCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHByIGhlbHBlcjogdGVzdHMgZm9yIGEgcXVvdGUgc3RhcnQvZW5kIGNoYXJhY3RlciBvbiB0aGUgY3VycmVudCBjdXJzb3IuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0XHRydW50aW1lXHJcblx0ICogQHBhcmFtIGludFx0XHRpXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdF90ZXN0UXVvdGVzKHJ1bnRpbWUsIGkpIHtcclxuXHRcdHZhciByZXN1bHQgPSB7fTtcclxuXHRcdChydW50aW1lLm9wdGlvbnMucXVvdGVzIHx8IFtdKS5mb3JFYWNoKHF1b3RlID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuJHN0ci5zdWJzdHIoaSwgMSkgPT09IHF1b3RlKSB7XHJcblx0XHRcdFx0aWYgKCFydW50aW1lLm9wZW5RdW90ZSkge1xyXG5cdFx0XHRcdFx0cnVudGltZS5vcGVuUXVvdGUgPSBxdW90ZTtcclxuXHRcdFx0XHRcdHJlc3VsdC5zdGFydGluZyA9IHF1b3RlO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocXVvdGUgPT09IHJ1bnRpbWUub3BlblF1b3RlKSB7XHJcblx0XHRcdFx0XHRydW50aW1lLm9wZW5RdW90ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0cmVzdWx0LmVuZGluZyA9IHF1b3RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXhwciBoZWxwZXI6IHRlc3RzIGZvciBhIGNvbW1lbnQgc3RhcnQvZW5kIGNoYXJhY3RlciBvbiB0aGUgY3VycmVudCBjdXJzb3IuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0XHRydW50aW1lXHJcblx0ICogQHBhcmFtIGludFx0XHRpXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdF90ZXN0Q29tbWVudHMocnVudGltZSwgaSkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IHt9O1xyXG5cdFx0KHJ1bnRpbWUub3B0aW9ucy5jb21tZW50cyB8fCBbXSkuZm9yRWFjaChibG9jayA9PiB7XHJcblx0XHRcdGlmICghcnVudGltZS5vcGVuQ29tbWVudCkge1xyXG5cdFx0XHRcdHZhciBzdGFydGluZyA9IF9maXJzdChibG9jayk7XHJcblx0XHRcdFx0aWYgKHRoaXMuJHN0ci5zdWJzdHIoaSkuc3RhcnRzV2l0aChzdGFydGluZykpIHtcclxuXHRcdFx0XHRcdHJ1bnRpbWUub3BlbkNvbW1lbnQgPSBibG9jaztcclxuXHRcdFx0XHRcdHJlc3VsdC5zdGFydGluZyA9IHN0YXJ0aW5nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmIChfbGFzdChibG9jaykgPT09IF9sYXN0KHJ1bnRpbWUub3BlbkNvbW1lbnQpKSB7XHJcblx0XHRcdFx0dmFyIGVuZGluZyA9IF9sYXN0KGJsb2NrKTtcclxuXHRcdFx0XHRpZiAodGhpcy4kc3RyLnN1YnN0cihpKS5zdGFydHNXaXRoKGVuZGluZykpIHtcclxuXHRcdFx0XHRcdHJ1bnRpbWUub3BlbkNvbW1lbnQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHJlc3VsdC5lbmRpbmcgPSBlbmRpbmc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHByIGhlbHBlcjogdGVzdHMgZm9yIGEgbmVzdGluZyBzdGFydC9lbmQgY2hhcmFjdGVyIG9uIHRoZSBjdXJyZW50IGN1cnNvci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3RcdHJ1bnRpbWVcclxuXHQgKiBAcGFyYW0gaW50XHRcdGlcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0X3Rlc3ROZXN0aW5nKHJ1bnRpbWUsIGkpIHtcclxuXHRcdHZhciByZXN1bHQgPSB7fTtcclxuXHRcdChydW50aW1lLm9wdGlvbnMuYmxvY2tzIHx8IFtdKS5mb3JFYWNoKGJsb2NrID0+IHtcclxuXHRcdFx0dmFyIHN0YXJ0aW5nID0gX2ZpcnN0KGJsb2NrKTtcclxuXHRcdFx0aWYgKHRoaXMuJHN0ci5zdWJzdHIoaSkuc3RhcnRzV2l0aChzdGFydGluZykpIHtcclxuXHRcdFx0XHRydW50aW1lLm5lc3RpbmcgPSBydW50aW1lLm5lc3RpbmcuY29uY2F0KFtibG9ja10pO1xyXG5cdFx0XHRcdHJlc3VsdC5zdGFydGluZyA9IHN0YXJ0aW5nO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHJ1bnRpbWUubmVzdGluZy5sZW5ndGggJiYgX2xhc3QoYmxvY2spID09PSBfbGFzdChfbGFzdChydW50aW1lLm5lc3RpbmcpKSkge1xyXG5cdFx0XHRcdHZhciBlbmRpbmcgPSBfbGFzdChibG9jayk7XHJcblx0XHRcdFx0aWYgKHRoaXMuJHN0ci5zdWJzdHIoaSkuc3RhcnRzV2l0aChlbmRpbmcpKSB7XHJcblx0XHRcdFx0XHRydW50aW1lLm5lc3RpbmcgPSBydW50aW1lLm5lc3Rpbmcuc2xpY2UoMCwgLTEpO1xyXG5cdFx0XHRcdFx0cmVzdWx0LmVuZGluZyA9IGVuZGluZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0cnVudGltZS5tYXhEZXB0aCA9IE1hdGgubWF4KHJ1bnRpbWUubWF4RGVwdGgsIHJ1bnRpbWUubmVzdGluZy5sZW5ndGgpO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4cHIgaGVscGVyOiB0ZXN0cyBmb3IgYSBkZWxpbWl0ZXIgb3Igc3RvcCBjaGFyYWN0ZXIgb24gdGhlIGN1cnJlbnQgY3Vyc29yLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5XHRcdHRlc3RMaXN0XHJcblx0ICogQHBhcmFtIG9iamVjdCBcdHJ1bnRpbWVcclxuXHQgKiBAcGFyYW0gaW50XHRcdGlcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRfdGVzdENoYXJzKHRlc3RMaXN0LCBydW50aW1lLCBpKSB7XHJcblx0XHRmb3IgKHZhciBrID0gMDsgayA8IHRlc3RMaXN0Lmxlbmd0aDsgayArKykge1xyXG5cdFx0XHR2YXIgdGVzdCA9IHRlc3RMaXN0W2tdO1xyXG5cdFx0XHRpZiAoX2lzRnVuY3Rpb24odGVzdCkpIHtcclxuXHRcdFx0XHR2YXIgcmV0ID0gdGVzdCh0aGlzLiRzdHIuc3Vic3RyKDAsIGkpLCB0aGlzLiRzdHIuc3Vic3RyKGkpKTtcclxuXHRcdFx0XHRpZiAocmV0ICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJldDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHJ1bnRpbWUub3B0aW9ucy51c2VSZWdleCkge1xyXG5cdFx0XHRcdHZhciBtID0gdGhpcy4kc3RyLnN1YnN0cihpKS5tYXRjaChuZXcgUmVnRXhwKCdeJyArIHRlc3QsIHJ1bnRpbWUub3B0aW9ucy51c2VSZWdleCAhPT0gdHJ1ZSA/IHJ1bnRpbWUub3B0aW9ucy51c2VSZWdleCA6ICcnKSk7XHJcblx0XHRcdFx0aWYgKG0pIHtcclxuXHRcdFx0XHRcdHJldHVybiBtWzBdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoKCFydW50aW1lLm9wdGlvbnMuY2kgJiYgdGhpcy4kc3RyLnN1YnN0cihpLCB0ZXN0Lmxlbmd0aCkgPT09IHRlc3QpXHJcblx0XHRcdHx8IChydW50aW1lLm9wdGlvbnMuY2kgJiYgdGhpcy4kc3RyLnN1YnN0cihpLCB0ZXN0Lmxlbmd0aCkudG9Mb3dlckNhc2UoKSA9PT0gdGVzdC50b0xvd2VyQ2FzZSgpKSkge1xyXG5cdFx0XHRcdHJldHVybiB0ZXN0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEV4cHIgaGVscGVyOiBwdXNoZXMgYSBjaGFyYWN0ZXIgb3Igc2V0IG9mIGNoYXJhY3RlcnMgaW50byB0aGUgY3VycmVudCBzcGxpdCBzZXJpZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IFx0cnVudGltZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmdcdGNoYXJzXHJcblx0ICogQHBhcmFtIHN0cmluZ1x0dGFyZ2V0XHJcblx0ICogQHBhcmFtIGJvb2xcdFx0aXNOZXdTZXJpZXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdF9wdXNoKHJ1bnRpbWUsIGNoYXJzLCB0YXJnZXQgPSAndG9rZW5zJywgaXNOZXdTZXJpZXMgPSBmYWxzZSkge1xyXG5cdFx0dmFyIHNwbGl0U2VyaWVzID0gcnVudGltZS5tYXRjaGVzLmxlbmd0aDtcclxuXHRcdGlmIChfaXNVbmRlZmluZWQocnVudGltZS50b2tlbnNbc3BsaXRTZXJpZXNdKSkge1xyXG5cdFx0XHRydW50aW1lLnRva2Vuc1tzcGxpdFNlcmllc10gPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGFyZ2V0ID09PSAnY29tbWVudHMnKSB7XHJcblx0XHRcdGlmICghcnVudGltZS50b2tlbnNbc3BsaXRTZXJpZXNdLmNvbW1lbnRzKSB7XHJcblx0XHRcdFx0cnVudGltZS50b2tlbnNbc3BsaXRTZXJpZXNdID0gbmV3IFN0cmluZyhydW50aW1lLnRva2Vuc1tzcGxpdFNlcmllc10pO1xyXG5cdFx0XHRcdHJ1bnRpbWUudG9rZW5zW3NwbGl0U2VyaWVzXS5jb21tZW50cyA9IFtdO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBzcGxpdFNlcmllczIgPSBydW50aW1lLnRva2Vuc1tzcGxpdFNlcmllc10uY29tbWVudHMubGVuZ3RoIC0gKCFydW50aW1lLnRva2Vuc1tzcGxpdFNlcmllc10uY29tbWVudHMubGVuZ3RoIHx8IGlzTmV3U2VyaWVzID8gMCA6IDEpO1xyXG5cdFx0XHRydW50aW1lLnRva2Vuc1tzcGxpdFNlcmllc10uY29tbWVudHNbc3BsaXRTZXJpZXMyXSA9IChydW50aW1lLnRva2Vuc1tzcGxpdFNlcmllc10uY29tbWVudHNbc3BsaXRTZXJpZXMyXSB8fCAnJykgKyBjaGFycztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBjb21tZW50cyA9IHJ1bnRpbWUudG9rZW5zW3NwbGl0U2VyaWVzXS5jb21tZW50cztcclxuXHRcdFx0cnVudGltZS50b2tlbnNbc3BsaXRTZXJpZXNdID0gbmV3IFN0cmluZyhydW50aW1lLnRva2Vuc1tzcGxpdFNlcmllc10gKyBjaGFycyk7XHJcblx0XHRcdHJ1bnRpbWUudG9rZW5zW3NwbGl0U2VyaWVzXS5jb21tZW50cyA9IGNvbW1lbnRzO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3BsaXRzIHRoZSBpbnN0YW5jZSBzdHJpbmcgb24gdGhlIGdpdmVuIGRlbGltZXRlcnMgYW5kIHJldHVybnMgdGhlIHRva2Vucy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgXHRzdHJcclxuXHQgKiBAcGFyYW0gb2JqZWN0XHRvcHRpb25zXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0c3BsaXQoc3RyLCBkZWxpbXMsIG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiB0aGlzLmxleChkZWxpbXMsIG9wdGlvbnMpLnRva2VucztcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogU3BsaXRzIHRoZSBpbnN0YW5jZSBzdHJpbmcgb24gdGhlIGdpdmVuIGRlbGltZXRlcnMgYW5kIHJldHVybnMgdGhlIG1hdGNoZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIFx0c3RyXHJcblx0ICogQHBhcmFtIG9iamVjdFx0b3B0aW9uczpcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRtYXRjaChzdHIsIGRlbGltcywgb3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIHRoaXMubGV4KGRlbGltcywgb3B0aW9ucykubWF0Y2hlcztcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogUGFyc2VzIHRoZSBpbnN0YW5jZSBzdHJpbmcgb24gdGhlIGdpdmVuIGRlbGltZXRlcnMgdXNpbmcgcmVnZXguXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIFx0c3RyXHJcblx0ICogQHBhcmFtIG9iamVjdFx0b3B0aW9uc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRyZWdQYXJzZShkZWxpbXMsIG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiB0aGlzLmxleChkZWxpbXMsIF9tZXJnZSh7dXNlUmVnZXg6IHRydWV9LCBvcHRpb25zIHx8IHt9KSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFNwbGl0cyB0aGUgaW5zdGFuY2Ugc3RyaW5nIG9uIHRoZSBnaXZlbiBkZWxpbWV0ZXJzIHVzaW5nIHJlZ2V4OyByZXR1cm5zIHRoZSB0b2tlbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIFx0c3RyXHJcblx0ICogQHBhcmFtIG9iamVjdFx0b3B0aW9uc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlZ1NwbGl0KGRlbGltcywgb3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVnUGFyc2UoZGVsaW1zLCBvcHRpb25zKS50b2tlbnM7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIE1hdGNoZXMgdGhlIGluc3RhbmNlIHN0cmluZyBvbiB0aGUgZ2l2ZW4gZGVsaW1ldGVycyB1c2luZyByZWdleDsgcmV0dXJucyB0aGUgbWF0Y2hlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgXHRzdHJcclxuXHQgKiBAcGFyYW0gb2JqZWN0XHRvcHRpb25zXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cmVnTWF0Y2goZGVsaW1zLCBvcHRpb25zKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWdQYXJzZShkZWxpbXMsIG9wdGlvbnMpLm1hdGNoZXM7XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbkxleGVyLiRibG9ja3MgPSBbWycoJywgJyknXSwgWydbJywgJ10nXSwgWyd7JywgJ30nXSxdO1xyXG5cclxuLyoqXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbkxleGVyLiRxdW90ZXMgPSBbJ1wiJywgXCInXCIsICdgJyxdO1xyXG5cclxuLyoqXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbkxleGVyLiRjb21tZW50cyA9IFtbJy8qJywgJyovJ10sIFsnLy8nLCBcIlxcblwiXSxdO1xyXG5cclxuLyoqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5MZXhlci4kY2FjaGUgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBMZXhlcjtcclxuXHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBKc2VuIGZyb20gJy4vSnNlbi5qcyc7XHJcbmltcG9ydCBFeHBySW50ZXJmYWNlIGZyb20gJy4vRXhwckludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBMZXhlciBmcm9tICcuL0xleGVyLmpzJztcclxuaW1wb3J0IENvbnRleHRzIGZyb20gJy4vQ29udGV4dHMuanMnO1xyXG5pbXBvcnQgQWJzdHJhY3Rpb24gZnJvbSAnLi9FeHByL0Fic3RyYWN0aW9uLmpzJztcclxuaW1wb3J0IEFic3RyYWN0aW9uSW50ZXJmYWNlIGZyb20gJy4vRXhwci9BYnN0cmFjdGlvbkludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBBcnIgZnJvbSAnLi9FeHByL0Fyci5qcyc7XHJcbmltcG9ydCBBcnJJbnRlcmZhY2UgZnJvbSAnLi9FeHByL0FyckludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBBcmd1bWVudHMgZnJvbSAnLi9FeHByL0FyZ3VtZW50cy5qcyc7XHJcbmltcG9ydCBBcmd1bWVudHNJbnRlcmZhY2UgZnJvbSAnLi9FeHByL0FyZ3VtZW50c0ludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBBc3NlcnRpb24gZnJvbSAnLi9FeHByL0Fzc2VydGlvbi5qcyc7XHJcbmltcG9ydCBBc3NlcnRpb25JbnRlcmZhY2UgZnJvbSAnLi9FeHByL0Fzc2VydGlvbkludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBBc3NpZ25tZW50IGZyb20gJy4vRXhwci9Bc3NpZ25tZW50LmpzJztcclxuaW1wb3J0IEFzc2lnbm1lbnRJbnRlcmZhY2UgZnJvbSAnLi9FeHByL0Fzc2lnbm1lbnRJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgQm9vbCBmcm9tICcuL0V4cHIvQm9vbC5qcyc7XHJcbmltcG9ydCBCb29sSW50ZXJmYWNlIGZyb20gJy4vRXhwci9Cb29sSW50ZXJmYWNlLmpzJztcclxuaW1wb3J0IENhbGwgZnJvbSAnLi9FeHByL0NhbGwuanMnO1xyXG5pbXBvcnQgQ2FsbEludGVyZmFjZSBmcm9tICcuL0V4cHIvQ2FsbEludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBDb21wYXJpc29uIGZyb20gJy4vRXhwci9Db21wYXJpc29uLmpzJztcclxuaW1wb3J0IENvbXBhcmlzb25JbnRlcmZhY2UgZnJvbSAnLi9FeHByL0NvbXBhcmlzb25JbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgQ29uZGl0aW9uIGZyb20gJy4vRXhwci9Db25kaXRpb24uanMnO1xyXG5pbXBvcnQgQ29uZGl0aW9uSW50ZXJmYWNlIGZyb20gJy4vRXhwci9Db25kaXRpb25JbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgRGVsZXRpb24gZnJvbSAnLi9FeHByL0RlbGV0aW9uLmpzJztcclxuaW1wb3J0IERlbGV0aW9uSW50ZXJmYWNlIGZyb20gJy4vRXhwci9EZWxldGlvbkludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBGdW5jIGZyb20gJy4vRXhwci9GdW5jLmpzJztcclxuaW1wb3J0IEZ1bmNJbnRlcmZhY2UgZnJvbSAnLi9FeHByL0Z1bmNJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgSWYgZnJvbSAnLi9FeHByL0lmLmpzJztcclxuaW1wb3J0IElmSW50ZXJmYWNlIGZyb20gJy4vRXhwci9JZkludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBNYXRoIGZyb20gJy4vRXhwci9NYXRoLmpzJztcclxuaW1wb3J0IE1hdGhJbnRlcmZhY2UgZnJvbSAnLi9FeHByL01hdGhJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgTnVtIGZyb20gJy4vRXhwci9OdW0uanMnO1xyXG5pbXBvcnQgTnVtSW50ZXJmYWNlIGZyb20gJy4vRXhwci9OdW1JbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgT2JqIGZyb20gJy4vRXhwci9PYmouanMnO1xyXG5pbXBvcnQgT2JqSW50ZXJmYWNlIGZyb20gJy4vRXhwci9PYmpJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgUHJlc2VuY2UgZnJvbSAnLi9FeHByL1ByZXNlbmNlLmpzJztcclxuaW1wb3J0IFByZXNlbmNlSW50ZXJmYWNlIGZyb20gJy4vRXhwci9QcmVzZW5jZUludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBSZWZlcmVuY2UgZnJvbSAnLi9FeHByL1JlZmVyZW5jZS5qcyc7XHJcbmltcG9ydCBSZWZlcmVuY2VJbnRlcmZhY2UgZnJvbSAnLi9FeHByL1JlZmVyZW5jZUludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBSZXR1cm4gZnJvbSAnLi9FeHByL1JldHVybi5qcyc7XHJcbmltcG9ydCBSZXR1cm5JbnRlcmZhY2UgZnJvbSAnLi9FeHByL1JldHVybkludGVyZmFjZS5qcyc7XHJcbmltcG9ydCBTdGF0ZW1lbnRzIGZyb20gJy4vRXhwci9TdGF0ZW1lbnRzLmpzJztcclxuaW1wb3J0IFN0YXRlbWVudHNJbnRlcmZhY2UgZnJvbSAnLi9FeHByL1N0YXRlbWVudHNJbnRlcmZhY2UuanMnO1xyXG5pbXBvcnQgU3RyIGZyb20gJy4vRXhwci9TdHIuanMnO1xyXG5pbXBvcnQgU3RySW50ZXJmYWNlIGZyb20gJy4vRXhwci9TdHJJbnRlcmZhY2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5Kc2VuLmdyYW1tYXJzID0ge1xyXG5cdElmOiBJZixcdFx0XHRcdFx0XHQvLyBpZiAoY29uZGl0aW9uKSBleHByMSBlbHNlIGV4cHJlMlxyXG5cdC8vU3RhdGVtZW50czogU3RhdGVtZW50cyxcdFx0Ly8gZmllbGQxID0gMzsgZmllbGQyID0gdmFsMlxyXG5cdFJldHVybjogUmV0dXJuLFx0XHRcdFx0Ly8gcmV0dXJuIGZpZWxkMVxyXG5cdERlbGV0aW9uOiBEZWxldGlvbixcdFx0XHQvLyBkZWxldGUgZmllbGQxXHJcblx0QXNzaWdubWVudDogQXNzaWdubWVudCxcdFx0Ly8gZmllbGQxW2tleTFdLmtleTIgPSBrXHJcblx0UHJlc2VuY2U6IFByZXNlbmNlLFx0XHRcdC8vIGtleTEgaW4gZmllbGQxXHJcblx0RnVuYzogRnVuYyxcdFx0XHRcdFx0Ly8gKGZpZWxkMSwgZmllbGQyKSA9PiB7fVxyXG5cdEFic3RyYWN0aW9uOiBBYnN0cmFjdGlvbixcdC8vIChmaWVsZDEpXHJcblx0Q29uZGl0aW9uOiBDb25kaXRpb24sXHRcdC8vIGZpZWxkMSA+IGZpZWxkMiA/IHZhbDEgOiB2YWwyXHJcblx0QXNzZXJ0aW9uOiBBc3NlcnRpb24sXHRcdC8vICFmaWVsZDEgJiYgZmllbGQyXHJcblx0Q29tcGFyaXNvbjogQ29tcGFyaXNvbixcdFx0Ly8gZmllbGQxID4gZmllbGQyXHJcblx0TWF0aDogTWF0aCxcdFx0XHRcdFx0Ly8gZmllbGQxICsgZmllbGQyXHJcblx0QXJyOiBBcnIsXHRcdFx0XHRcdC8vIFtmaWVsZDEsIGZpZWxkMl1cclxuXHRPYmo6IE9iaixcdFx0XHRcdFx0Ly8ge2ZpZWxkMTp2YWwxLCBmaWVsZDI6dmFsMn1cclxuXHROdW06IE51bSxcdFx0XHRcdFx0Ly8gWzAtOV1cclxuXHRTdHI6IFN0cixcdFx0XHRcdFx0Ly8gXCJcIlxyXG5cdEJvb2w6IEJvb2wsXHRcdFx0XHRcdC8vIHRydWVcclxuXHRDYWxsOiBDYWxsLFx0XHRcdFx0XHQvLyBmaWVsZDEoKVxyXG5cdFJlZmVyZW5jZTogUmVmZXJlbmNlLFx0XHQvLyBmaWVsZDFcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0c1xyXG4gKi9cclxuZXhwb3J0IHtcclxuXHRFeHBySW50ZXJmYWNlLFxyXG5cdExleGVyLFxyXG5cdENvbnRleHRzXHJcbn07XHJcbmV4cG9ydCB7XHJcblx0QWJzdHJhY3Rpb24sXHJcblx0QXJyLFxyXG5cdEFyZ3VtZW50cyxcclxuXHRBc3NlcnRpb24sXHJcblx0QXNzaWdubWVudCxcclxuXHRCb29sLFxyXG5cdENhbGwsXHJcblx0Q29tcGFyaXNvbixcclxuXHRDb25kaXRpb24sXHJcblx0RGVsZXRpb24sXHJcblx0RnVuYyxcclxuXHRJZixcclxuXHRNYXRoLFxyXG5cdE51bSxcclxuXHRPYmosXHJcblx0UHJlc2VuY2UsXHJcblx0UmVmZXJlbmNlLFxyXG5cdFJldHVybixcclxuXHRTdHIsXHJcblx0U3RhdGVtZW50c1xyXG59O1xyXG5leHBvcnQge1xyXG5cdEFic3RyYWN0aW9uSW50ZXJmYWNlLFxyXG5cdEFyckludGVyZmFjZSxcclxuXHRBcmd1bWVudHNJbnRlcmZhY2UsXHJcblx0QXNzZXJ0aW9uSW50ZXJmYWNlLFxyXG5cdEFzc2lnbm1lbnRJbnRlcmZhY2UsXHJcblx0Qm9vbEludGVyZmFjZSxcclxuXHRDYWxsSW50ZXJmYWNlLFxyXG5cdENvbXBhcmlzb25JbnRlcmZhY2UsXHJcblx0Q29uZGl0aW9uSW50ZXJmYWNlLFxyXG5cdERlbGV0aW9uSW50ZXJmYWNlLFxyXG5cdEZ1bmNJbnRlcmZhY2UsXHJcblx0SWZJbnRlcmZhY2UsXHJcblx0TWF0aEludGVyZmFjZSxcclxuXHROdW1JbnRlcmZhY2UsXHJcblx0T2JqSW50ZXJmYWNlLFxyXG5cdFByZXNlbmNlSW50ZXJmYWNlLFxyXG5cdFJlZmVyZW5jZUludGVyZmFjZSxcclxuXHRSZXR1cm5JbnRlcmZhY2UsXHJcblx0U3RySW50ZXJmYWNlLFxyXG5cdFN0YXRlbWVudHNJbnRlcmZhY2VcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgSnNlbjtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiBBTEwgaXRlbXMgcGFzcyB0aGUgdGVzdC5cclxuICpcclxuICogQHBhcmFtIGFycmF5IFx0YXJyXHJcbiAqIEBwYXJhbSBmdW5jdGlvbiBcdGNhbGxiYWNrXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyLCBjYWxsYmFjaykge1xyXG5cdHJldHVybiBhcnIucmVkdWNlKChwcmV2VGVzdCwgaXRtKSA9PiBwcmV2VGVzdCAmJiBjYWxsYmFjayhpdG0pLCB0cnVlKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9wdXNoVW5pcXVlIGZyb20gJy4vcHVzaFVuaXF1ZS5qcyc7XHJcbmltcG9ydCBfZnJvbSBmcm9tICcuL2Zyb20uanMnO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgaXRlbXMgdGhhdCBkbyBub3QgYWxyZWFkeSBleGlzdC5cclxuICpcclxuICogQHBhcmFtIGFycmF5IFx0YXJyXHJcbiAqIEBwYXJhbSBhcnJheVx0IFx0Li4uYXJyc1xyXG4gKlxyXG4gKiBAcmV0dXJuIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnIsIC4uLmFycnMpIHtcclxuXHRhcnJzLmZvckVhY2goX2FyciA9PiB7XHJcblx0XHRfYXJyLmZvckVhY2goaXRtID0+IF9wdXNoVW5pcXVlKGFyciwgLi4uX2Zyb20oX2FycikpKTtcclxuXHR9KTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnLi9mcm9tLmpzJztcclxuXHJcbi8qKlxyXG4gKiBBY2NlcHRzIGEgbGlzdCBvZiBjb2x1bW4gYW5kIGpvaW5zIHRoZW0gdG8gYSB0YWJsZS5cclxuICpcclxuICogQHBhcmFtIGFycmF5IFx0YXJyXHJcbiAqXHJcbiAqIEByZXR1cm4gbnVtYmVyXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnIpIHtcclxuXHRyZXR1cm4gYXJyLnJlZHVjZSgoY3VyclRhYmxlLCBjb2x1bW4pID0+IHtcclxuXHRcdHZhciBuZXdUYWJsZSA9IFtdO1xyXG5cdFx0Y3VyclRhYmxlLmZvckVhY2gocm93ID0+IHtcclxuXHRcdFx0X2FyckZyb20oY29sdW1uKS5mb3JFYWNoKGNvbHVtbiA9PiB7XHJcblx0XHRcdFx0dmFyIF9yb3cgPSByb3cuc2xpY2UoKTtcclxuXHRcdFx0XHRfcm93LnB1c2goY29sdW1uKTtcclxuXHRcdFx0XHRuZXdUYWJsZS5wdXNoKF9yb3cpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ld1RhYmxlO1xyXG5cdH0sIFtbXV0pO1xyXG59OyIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfcmVtb3ZlIGZyb20gJy4vcmVtb3ZlLmpzJztcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFsbCBpbnN0YW5jZXMgb2YgZWFjaCBpdGVtLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXkgXHRhcnJcclxuICogQHBhcmFtIGFycmF5XHQgXHRpdG1zXHJcbiAqXHJcbiAqIEByZXR1cm4gYXJyYXlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFyciwgLi4uaXRtcykge1xyXG5cdGl0bXMuZm9yRWFjaChpdG0gPT4gX3JlbW92ZShhcnIsIGl0bSkpO1xyXG5cdHJldHVybiBhcnI7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICcuLi9qcy9pc0FycmF5LmpzJztcclxuaW1wb3J0IF9pc1R5cGVBcnJheSBmcm9tICcuLi9qcy9pc1R5cGVBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNFbXB0eSBmcm9tICcuLi9qcy9pc0VtcHR5LmpzJztcclxuaW1wb3J0IF9pc09iamVjdCBmcm9tICcuLi9qcy9pc09iamVjdC5qcyc7XHJcblxyXG4vKipcclxuICogQ2FzdHMgYW4gYXJyYXktbGlrZSBvYmplY3QgdG8gYW4gYXJyYXkuXHJcbiAqXHJcbiAqIEBwYXJhbSBtaXhlZCBcdHZhbFxyXG4gKiBAcGFyYW0gYm9vbFx0IFx0Y2FzdE9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwsIGNhc3RPYmplY3QgPSB0cnVlKSB7XHJcblx0aWYgKF9pc0FycmF5KHZhbCkpIHtcclxuXHRcdHJldHVybiB2YWw7XHJcblx0fTtcclxuXHRpZiAoIWNhc3RPYmplY3QgJiYgX2lzT2JqZWN0KHZhbCkpIHtcclxuXHRcdHJldHVybiBbdmFsXTtcclxuXHR9O1xyXG5cdGlmICh2YWwgIT09IGZhbHNlICYmIHZhbCAhPT0gMCAmJiBfaXNFbXB0eSh2YWwpKSB7XHJcblx0XHRyZXR1cm4gW107XHJcblx0fTtcclxuXHRpZiAoX2lzVHlwZUFycmF5KHZhbCkpIHtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh2YWwpO1xyXG5cdH07XHJcblx0aWYgKF9pc09iamVjdCh2YWwpKSB7XHJcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh2YWwpO1xyXG5cdH07XHJcblx0cmV0dXJuIFt2YWxdO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi4vanMvaXNBcnJheS5qcyc7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgaW50ZXJzZWN0aW9uIG9mIHR3byBhcnJheXM7XHJcbiAqIG9wdGlvbmFsbHkgdXNpbmcgYSBjdXN0b20gbWF0Y2hpbmcgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheSBcdGFyclxyXG4gKiBAcGFyYW0gYXJyYXlcdCBcdGFycjJcclxuICogQHBhcmFtIGZ1bmN0aW9uIFx0Y2FsbGJhY2tcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyLCBhcnIyLCBjYWxsYmFjayA9IG51bGwpIHtcclxuXHRyZXR1cm4gIV9pc0FycmF5KGFycjIpID8gW10gOiBhcnIuZmlsdGVyKHZhbDEgPT4gY2FsbGJhY2sgXHJcblx0XHQ/IGFycjIuZmlsdGVyKHZhbDIgPT4gY2FsbGJhY2sodmFsMSwgdmFsMikpLmxlbmd0aCBcclxuXHRcdDogYXJyMi5pbmRleE9mKHZhbDEpICE9PSAtMVxyXG5cdCk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQWRkcyBhbiBpdGVtIGlmIG5vdCBhbHJlYWR5IGV4aXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXkgXHRhcnJcclxuICogQHBhcmFtIGFycmF5XHQgXHQuLi5pdG1zXHJcbiAqXHJcbiAqIEByZXR1cm4gYXJyYXlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFyciwgLi4uaXRlbXMpIHtcclxuXHRpdGVtcy5mb3JFYWNoKGl0bSA9PiB7XHJcblx0XHRpZiAoYXJyLmluZGV4T2YoaXRtKSA8IDApIHtcclxuXHRcdFx0YXJyLnB1c2goaXRtKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFJlbW92ZXMgaW5zdGFuY2VzIG9mIHJlZmVyZW5jZSB1cCB0byA8bGltaXQ+IHRpbWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXkgXHRhcnJcclxuICogQHBhcmFtIG1peGVkXHQgXHRpdG1cclxuICogQHBhcmFtIGludHxib29sIFx0bGltaXRcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyLCBpdG0sIGxpbWl0ID0gZmFsc2UpIHtcclxuXHR2YXIgaSA9IGFyci5pbmRleE9mKGl0bSk7XHJcblx0d2hpbGUgKGkgPiAtMSAmJiAobGltaXQgfHwgbGltaXQgPT09IGZhbHNlKSkge1xyXG5cdFx0YXJyLnNwbGljZShpLCAxKTtcclxuXHRcdGlmIChsaW1pdCA+IDApIHtcclxuXHRcdFx0bGltaXQgLS07XHJcblx0XHR9O1xyXG5cdFx0aSA9IGFyci5pbmRleE9mKGl0bSk7XHJcblx0fTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFJldHVybnMgYSBsaXN0IG9mIHVuaXF1ZSBpdGVtcy5cclxuICpcclxuICogQHBhcmFtIGFycmF5XHQgXHRcdFx0XHRhcnJcclxuICpcdCAqXHJcbiAqIEByZXR1cm4gYXJyYXlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFycikge1xyXG5cdGNvbnN0IGRpc3RpbmN0ID0gKHZhbHVlLCBpbmRleCwgc2VsZikgPT4ge1xyXG5cdFx0cmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xyXG5cdH07XHJcblx0cmV0dXJuIGFyci5maWx0ZXIoZGlzdGluY3QpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHZhbCdzIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbCkge1xyXG5cdHJldHVybiB0eXBlb2YgdmFsO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwiYXJyYXlcIi5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgdW5kZWZpbmVkIG9yIGlzIG9mIHR5cGUgXCJib29sZWFuXCIuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2U7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNOdWxsIGZyb20gJy4vaXNOdWxsLmpzJztcclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICcuL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi9pc1R5cGVPYmplY3QuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBlbXB0eSBpbiBpdHMgb3duIHR5cGUuXHJcbiAqIFRoaXMgaG9sZHMgdHJ1ZSBmb3IgTlVMTHMsIFVOREVGSU5FRCwgRkFMU0UsIDAsXHJcbiAqIG9iamVjdHMgd2l0aG91dCBrZXlzLCBlbXB0eSBhcnJheXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gX2lzTnVsbCh2YWwpIHx8IF9pc1VuZGVmaW5lZCh2YWwpIHx8IHZhbCA9PT0gZmFsc2UgfHwgdmFsID09PSAwIFxyXG5cdFx0fHwgKF9pc1R5cGVPYmplY3QodmFsKSAmJiAhT2JqZWN0LmtleXModmFsKS5sZW5ndGgpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzVHlwZUZ1bmN0aW9uIGZyb20gJy4vaXNUeXBlRnVuY3Rpb24uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwiZnVuY3Rpb25cIi5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCBcdFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIF9pc1R5cGVGdW5jdGlvbih2YWwpIHx8ICh2YWwgJiYge30udG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBmdW5jdGlvbl0nKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgdW5kZWZpbmVkIG9yIGlzIG51bGwuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJyc7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogVGVsbHMgaWYgdmFsIGlzIG9mIHR5cGUgXCJudW1iZXJcIi5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyBcdHZhbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbCkge1xyXG5cdHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBUZWxscyBpZiB2YWwgaXMgb2YgdHlwZSBcInN0cmluZ1wiIG9yIGEgbnVtZXJpYyBzdHJpbmcuXHJcbiAqIFRoaXMgaG9sZHMgdHJ1ZSBmb3IgYm90aCBudW1iZXJzIGFuZCBudW1lcmljIHN0cmluZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdmFsICE9PSB0cnVlICYmIHZhbCAhPT0gZmFsc2UgJiYgdmFsICE9PSBudWxsICYmIHZhbCAhPT0gJycgJiYgIWlzTmFOKHZhbCAqIDEpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBwdXJlIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuICFBcnJheS5pc0FycmF5KHZhbCkgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRlbGxzIGlmIGFuIG9iamVjdCBpcyBkaXJlY3QgaW5zdGFuY2Ugb2YgT2JqZWN0LnByb3RvdHlwZS5cclxuICogUXVpdGUgdXNlZnVsIGluIGRpZmZlcmVudGlhdGluZyBuYXRpdmUgb2JqZWN0cyBhbmQgY2xhc3MgaW5zdGFuY2VzIGZyb20gcGxhaW4gb2JqZWN0cyAoe30pLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IFx0b2JqXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqKSB7XHJcblx0cmV0dXJuIF9pc09iamVjdChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBPYmplY3QucHJvdG90eXBlO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwic3RyaW5nXCIuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnLi9pc1N0cmluZy5qcyc7XHJcbmltcG9ydCBfaXNVbmRlZmluZWQgZnJvbSAnLi9pc1VuZGVmaW5lZC5qcyc7XHJcblxyXG4vKipcclxuICogVGVsbHMgaWYgdmFsIGlzIFwiYXJyYXktbGlrZVwiLlxyXG4gKiBUaGlzIGhvbGRzIHRydWUgZm9yIGFueXRoaW5nIHRoYXQgaGFzIGEgbGVuZ3RoIHByb3BlcnR5LlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gIV9pc1N0cmluZyh2YWwpICYmICFfaXNVbmRlZmluZWQodmFsLmxlbmd0aCk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogVGVsbHMgaWYgdmFsIGlzIG9mIHR5cGUgXCJmdW5jdGlvblwiLlxyXG4gKiBUaGlzIGhvbGRzIHRydWUgZm9yIGJvdGggcmVndWxhciBmdW5jdGlvbnMgYW5kIGNsYXNzZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3RcdCBcdHZhbFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbCkge1xyXG5cdHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyBvZiB0eXBlIFwib2JqZWN0XCIuXHJcbiAqIFRoaXMgaG9sZHMgdHJ1ZSBmb3IgYW55dGhpbmcgb2JqZWN0LCBpbmNsdWRpbmcgYnVpbHQtaW5zLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHR2YWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWwpIHtcclxuXHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpIHx8IHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIFRlbGxzIGlmIHZhbCBpcyB1bmRlZmluZWQgb3IgaXMgb2YgdHlwZSBcInVuZGVmaW5lZFwiLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIFx0dmFsXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsKSB7XHJcblx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggJiYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4uL2pzL2lzQXJyYXkuanMnO1xyXG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJy4uL2pzL2lzT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi4vanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc0Jvb2xlYW4gZnJvbSAnLi4vanMvaXNCb29sZWFuLmpzJztcclxuaW1wb3J0IF9lYWNoIGZyb20gJy4vZWFjaC5qcyc7XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgbWF0Y2goZXMpIGJldHdlZW4gKG1lbWJlcnMgb2YpIHR3byB2YWx1ZXM7XHJcbiAqIGFzc2VydGlvbiBvcHRpb25hbGx5IGN1c3RvbS5cclxuICpcclxuICogQHBhcmFtIG1peGVkIFx0XHRcdG9iMVxyXG4gKiBAcGFyYW0gbWl4ZWQgXHRcdFx0b2JqMlxyXG4gKiBAcGFyYW0gc3RyaW5nfGZ1bmN0aW9uXHRhc3NlcnRpb25cclxuICogQHBhcmFtIGJvb2xcdFx0XHRcdG5ldENvbXBhcmlzb25cclxuICogQHBhcmFtIGJvb2xcdFx0XHRcdGNvbnRyYXN0XHJcbiAqIEBwYXJhbSBib29sXHRcdFx0XHRyZXR1cm5PbkZpcnN0RmFsc2VcclxuICpcclxuICogQHJldHVybiBib29sfGFycmF5fG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqMSwgb2JqMiwgYXNzZXJ0aW9uID0gdHJ1ZSwgbmV0Q29tcGFyaXNvbiA9IHRydWUsIGNvbnRyYXN0ID0gZmFsc2UsIHJldHVybk9uRmlyc3RGYWxzZSA9IGZhbHNlKSB7XHJcblx0aWYgKF9pc0FycmF5KG9iajEpICYmIF9pc0FycmF5KG9iajIpKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHR2YXIgY29udG4gPSB0cnVlO1xyXG5cdFx0b2JqMS5mb3JFYWNoKHYxID0+IHtcclxuXHRcdFx0aWYgKCFjb250bikge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgdGVzdFBhc3MgPSBmYWxzZTtcclxuXHRcdFx0X2VhY2gob2JqMiwgKGssIHYyKSA9PiB7XHJcblx0XHRcdFx0aWYgKCF0ZXN0UGFzcyB8fCAobmV0Q29tcGFyaXNvbiAmJiBfaXNUeXBlT2JqZWN0KHYxKSkpIHtcclxuXHRcdFx0XHRcdHRlc3RQYXNzID0gYXNzZXJ0aW9uKHYxLCB2Mik7XHJcblx0XHRcdFx0XHRpZiAoKF9pc0FycmF5KHRlc3RQYXNzKSAmJiAhdGVzdFBhc3MubGVuZ3RoKSB8fCAoX2lzT2JqZWN0KHRlc3RQYXNzKSAmJiAhT2JqZWN0LmtleXModGVzdFBhc3MpLmxlbmd0aCkpIHtcclxuXHRcdFx0XHRcdFx0dGVzdFBhc3MgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChfaXNUeXBlT2JqZWN0KHRlc3RQYXNzKSAmJiBuZXRDb21wYXJpc29uKSB7XHJcblx0XHRcdFx0XHRcdC8vIEZ1cnRoZXIgcmVjdXJzaW9ucyBzaG91bGQgdXNlIHRoaXMgdGVzdFBhc3MgYXMgdjFcclxuXHRcdFx0XHRcdFx0djEgPSB0ZXN0UGFzcztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoX2lzVHlwZU9iamVjdCh0ZXN0UGFzcykpIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChuZXRDb21wYXJpc29uID8gdGVzdFBhc3MgOiB2MSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoIV9pc0Jvb2xlYW4odGVzdFBhc3MpKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2godGVzdFBhc3MpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKChjb250cmFzdCAmJiAhdGVzdFBhc3MpIHx8ICghY29udHJhc3QgJiYgdGVzdFBhc3MpKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2godjEpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHJldHVybk9uRmlyc3RGYWxzZSkge1xyXG5cdFx0XHRcdGNvbnRuID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblx0XHJcblx0aWYgKF9pc09iamVjdChvYmoxKSAmJiBfaXNPYmplY3Qob2JqMikpIHtcclxuXHRcdHZhciByZXN1bHQgPSB7fTtcclxuXHRcdHZhciBjb250biA9IHRydWU7XHJcblx0XHRPYmplY3Qua2V5cyhvYmoxKS5mb3JFYWNoKGsgPT4ge1xyXG5cdFx0XHRpZiAoIWNvbnRuKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciB0ZXN0UGFzcyA9IGFzc2VydGlvbihvYmoxW2tdLCBvYmoyW2tdKTtcclxuXHRcdFx0aWYgKChfaXNBcnJheSh0ZXN0UGFzcykgJiYgIXRlc3RQYXNzLmxlbmd0aCkgfHwgKF9pc09iamVjdCh0ZXN0UGFzcykgJiYgIU9iamVjdC5rZXlzKHRlc3RQYXNzKS5sZW5ndGgpKSB7XHJcblx0XHRcdFx0dGVzdFBhc3MgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoX2lzVHlwZU9iamVjdCh0ZXN0UGFzcykpIHtcclxuXHRcdFx0XHRyZXN1bHRba10gPSBuZXRDb21wYXJpc29uID8gdGVzdFBhc3MgOiBvYmoxW2tdO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCFfaXNCb29sZWFuKHRlc3RQYXNzKSkge1xyXG5cdFx0XHRcdHJlc3VsdFtrXSA9IHRlc3RQYXNzO1xyXG5cdFx0XHR9IGVsc2UgaWYgKChjb250cmFzdCAmJiAhdGVzdFBhc3MpIHx8ICghY29udHJhc3QgJiYgdGVzdFBhc3MpKSB7XHJcblx0XHRcdFx0cmVzdWx0W2tdID0gb2JqMVtrXTtcclxuXHRcdFx0fSBlbHNlIGlmIChyZXR1cm5PbkZpcnN0RmFsc2UpIHtcclxuXHRcdFx0XHRjb250biA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi4vanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICcuLi9qcy9pc0Z1bmN0aW9uLmpzJztcclxuaW1wb3J0IF9pc051bWVyaWMgZnJvbSAnLi4vanMvaXNOdW1lcmljLmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi4vanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9tZXJnZUNhbGxiYWNrIGZyb20gJy4vbWVyZ2VDYWxsYmFjay5qcyc7XHJcblxyXG4vKipcclxuICogQ29waWVzIGFuIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0b2JqXHJcbiAqIEBwYXJhbSBhcnJheVx0XHQgXHRmaWx0ZXJcclxuICpcclxuICogQHJldHVybiBvYmplY3RcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iaiwgZmlsdGVyID0gW10sIHdpdGhTeW1ib2xzID0gdHJ1ZSkge1xyXG5cdHZhciBkZXB0aCA9IDA7XHJcblx0aWYgKF9pc051bWVyaWMoYXJndW1lbnRzWzBdKSAmJiBfaXNUeXBlT2JqZWN0KGFyZ3VtZW50c1sxXSkpIHtcclxuXHRcdGRlcHRoID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0b2JqID0gYXJndW1lbnRzWzFdO1xyXG5cdFx0ZmlsdGVyID0gYXJndW1lbnRzWzJdIHx8IFtdO1xyXG5cdH1cclxuXHRyZXR1cm4gX21lcmdlQ2FsbGJhY2soW2RlcHRoLCB7fSwgb2JqXSwgKGtleSwgb2JqMSwgb2JqMikgPT4ge1xyXG5cdFx0cmV0dXJuIF9pc0Z1bmN0aW9uKGZpbHRlcikgPyBmaWx0ZXIoa2V5KSBcclxuXHRcdFx0OiAoX2lzQXJyYXkoZmlsdGVyKSAmJiBmaWx0ZXIubGVuZ3RoID8gZmlsdGVyLmluZGV4T2Yoa2V5KSA+IC0xIDogdHJ1ZSk7XHJcblx0fSwgZmFsc2UvKmRlZXBQcm9wcyovLCBmYWxzZS8qaXNSZXBsYWNlKi8sIHdpdGhTeW1ib2xzKTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi4vanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc051bWVyaWMgZnJvbSAnLi4vanMvaXNOdW1lcmljLmpzJztcclxuXHJcbi8qKlxyXG4gKiBMb29wcyB0aHJ1IG9iaiBmbGF0bHkgd2l0aCBhIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKiBTdG9wcyB3aGVuIGNhbGxiYWNrIHJldHVybnMgYSBub24tdW5kZWZpbmVkIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0IFx0XHRcdG9iaiBcdFx0XHRUaGUgYXJyYXkgb3Igb2JqZWN0IHRvIGl0ZXJhdGUuXHJcbiAqIEBwYXJhbSBmdW5jdGlvbiBcdFx0XHRcdGNhbGxiYWNrIFx0XHRUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gbWl4ZWR8bnVsbFx0XHRcdEFueSBub24tbnVsbCByZXR1cm4gZnJvbSBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqLCBjYWxsYmFjaykge1xyXG5cdHZhciByZXR1cm5WYWx1ZSA9IHVuZGVmaW5lZDtcclxuXHRpZiAoX2lzVHlwZU9iamVjdChvYmopKSB7XHJcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goKGssIGkpID0+IHtcclxuXHRcdFx0aWYgKHJldHVyblZhbHVlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVyblZhbHVlID0gY2FsbGJhY2soX2lzTnVtZXJpYyhrKSA/IHBhcnNlRmxvYXQoaykgOiBrLCBvYmpba10sIGkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmV0dXJuIHJldHVyblZhbHVlO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzTnVtYmVyIGZyb20gJy4uL2pzL2lzTnVtYmVyLmpzJztcclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4uL2pzL2lzQXJyYXkuanMnO1xyXG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJy4uL2pzL2lzT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi4vanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJy4uL2pzL2lzRnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgX2lzUGxhaW5PYmplY3QgZnJvbSAnLi4vanMvaXNQbGFpbk9iamVjdC5qcyc7XHJcbmltcG9ydCBfY29tcGFyZUNhbGxiYWNrIGZyb20gJy4vY29tcGFyZUNhbGxiYWNrLmpzJztcclxuXHJcbi8qKlxyXG4gKiBBc3NlcnRzIChtZW1iZXJzIG9mKSB0aGUgZmlyc3QgdmFsdWUgYWdhaW5zdCAobWVtYmVycyBvZikgc3Vic2VxdWVudCB2YWx1ZXMuXHJcbiAqIEFzc2VydGlvbiBjb3VsZCBiZSBUUlVFLCBGQUxTRSwgb3IgY3VzdG9tLlxyXG4gKlxyXG4gKiBAcGFyYW0gbWl4ZWQgXHRcdFx0b2JqMVxyXG4gKiBAcGFyYW0gbWl4ZWQgXHRcdFx0b2JqMlxyXG4gKiBAcGFyYW0gYm9vbHxmdW5jdGlvblx0XHRhc3NlcnRpb25cclxuICogQHBhcmFtIGludFx0XHRcdFx0ZGVwdGhcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5jb25zdCBfZXZlbiA9IGZ1bmN0aW9uKG9iajEsIG9iajIsIGFzc2VydGlvbiA9IHRydWUsIGRlcHRoID0gMSkge1xyXG5cdGlmIChfaXNBcnJheShvYmoxKSAmJiBfaXNBcnJheShvYmoyKSAmJiBvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuXHRcdHJldHVybiAhYXNzZXJ0aW9uO1xyXG5cdH1cclxuXHRpZiAoX2lzT2JqZWN0KG9iajEpICYmIF9pc09iamVjdChvYmoyKSkge1xyXG5cdFx0dmFyIG9iajFLZXlzID0gT2JqZWN0LmtleXMob2JqMSk7XHJcblx0XHR2YXIgb2JqMktleXMgPSBPYmplY3Qua2V5cyhvYmoyKTtcclxuXHRcdGlmICghb2JqMUtleXMubGVuZ3RoICYmICFvYmoyS2V5cy5sZW5ndGgpIHtcclxuXHRcdFx0Ly8gT2JqZWN0cyB0aGF0IHdvbid0IHNob3cga2V5cyBtdXN0IGJlIGNvbXBhcmVkIGJ5IGluc3RhbmNlXHJcblx0XHRcdC8vIE1hbnkgbmF0aXZlIG9iamVjdHMgd29uJ3QuIFNvIHdlIGNhbid0IGp1ZGdlIGJ5IGtleXMgYWxvbmUuXHJcblx0XHRcdHJldHVybiBfaXNQbGFpbk9iamVjdChvYmoxKSAmJiBfaXNQbGFpbk9iamVjdChvYmoyKSBcclxuXHRcdFx0XHQ/IGFzc2VydGlvblxyXG5cdFx0XHRcdDogKG9iajEgPT09IG9iajIpID09PSBhc3NlcnRpb247XHJcblx0XHR9XHJcblx0XHRpZiAoIV9ldmVuKG9iajFLZXlzLCBvYmoyS2V5cykpIHtcclxuXHRcdFx0cmV0dXJuICFhc3NlcnRpb247XHJcblx0XHR9XHJcblx0fVxyXG5cdGlmIChkZXB0aCA+IDAgJiYgKChfaXNBcnJheShvYmoxKSAmJiBfaXNBcnJheShvYmoyKSkgfHwgKF9pc09iamVjdChvYmoxKSAmJiBfaXNPYmplY3Qob2JqMikpKSkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IF9jb21wYXJlQ2FsbGJhY2sob2JqMSwgb2JqMiwgKHYxLCB2MikgPT4ge1xyXG5cdFx0XHRyZXR1cm4gX2V2ZW4odjEsIHYyLCBhc3NlcnRpb24sIGRlcHRoIC0gMSk7XHJcblx0XHR9LCBmYWxzZS8qbmV0Q29tcGFyaXNvbiovLCBmYWxzZS8qY29udHJhc3QqLywgdHJ1ZS8qcmV0dXJuT25GaXJzdEZhbHNlKi8pO1xyXG5cdFx0cmV0dXJuIF9pc0FycmF5KHJlc3VsdCkgXHJcblx0XHRcdD8gcmVzdWx0Lmxlbmd0aCA9PT0gb2JqMS5sZW5ndGggJiYgcmVzdWx0Lmxlbmd0aCA9PT0gb2JqMi5sZW5ndGggXHJcblx0XHRcdDogKF9pc09iamVjdChyZXN1bHQpICYmIF9pc09iamVjdChvYmoxKSBcclxuXHRcdFx0XHQ/IE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID09PSBPYmplY3Qua2V5cyhvYmoxKS5sZW5ndGggJiYgT2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGggPT09ICBPYmplY3Qua2V5cyhvYmoyKS5sZW5ndGggXHJcblx0XHRcdFx0OiByZXN1bHQpO1xyXG5cdH1cclxuXHRyZXR1cm4gX2lzRnVuY3Rpb24oYXNzZXJ0aW9uKSA/IGFzc2VydGlvbihvYmoxLCBvYmoyKSA6IChcclxuXHRcdF9pc051bWJlcihvYmoxKSAmJiBfaXNOdW1iZXIob2JqMikgJiYgaXNOYU4ob2JqMSkgJiYgaXNOYU4ob2JqMikgXHJcblx0XHRcdD8gYXNzZXJ0aW9uIFxyXG5cdFx0XHQ6IChvYmoxID09PSBvYmoyKSA9PT0gYXNzZXJ0aW9uXHJcblx0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgX2V2ZW47XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICcuLi9qcy9pc0FycmF5LmpzJztcclxuaW1wb3J0IF9pc1N0cmluZyBmcm9tICcuLi9qcy9pc1N0cmluZy5qcyc7XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFuIG9iamVjdCBmb3IgdGhlIGdpdmVuIHBhaXIocykgb2YgaW5wdXQuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmd8YXJyYXkgXHRcdFx0a2V5XHJcbiAqIEBwYXJhbSBtaXhlZHxhcnJheVx0XHRcdHZhbCBcclxuICpcclxuICogQHJldHVybiBvYmplY3RcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGtleSwgdmFsID0gbnVsbCkge1xyXG5cdHZhciBvYmogPSB7fTtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG5cdFx0aWYgKF9pc1N0cmluZyhrZXkpKSB7XHJcblx0XHRcdG9ialtrZXldID0gdmFsO1xyXG5cdFx0fSBlbHNlIGlmIChfaXNBcnJheShrZXkpICYmIF9pc0FycmF5KHZhbCkpIHtcclxuXHRcdFx0a2V5LmZvckVhY2goKGssIGkpID0+IG9ialtrXSA9IHZhbFtpXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBvYmo7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNUeXBlT2JqZWN0IGZyb20gJy4uL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBfaXNVbmRlZmluZWQgZnJvbSAnLi4vanMvaXNVbmRlZmluZWQuanMnO1xyXG5pbXBvcnQgX2lzTnVsbCBmcm9tICcuLi9qcy9pc051bGwuanMnO1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnLi4vYXJyL2Zyb20uanMnO1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlcyB0aGUgdmFsdWUgYXQgdGhlIGdpdmVuIHBhdGguXHJcbiAqXHJcbiAqIEEgcmV0dXJuIHZhbHVlIG9mIHVuZGVmaW5lZCBpcyBhbWJpZ3VvdXMsIGFuZCBjYW4gbWVhbiBlaXRoZXIgdGhhdCB0aGVcclxuICogcGF0aCBkb2VzIG5vdCBleGlzdCwgb3IgdGhhdCB0aGUgcGF0aCBhY3R1YWxseSBleGlzdHMgYnV0IHdpdGggYSB2YWx1ZSBvZiB1bmRlZmluZWQuIElmIGl0IGlzIHJlcXVpcmVkIHRvXHJcbiAqIGtub3cgd2hldGhlciB0aGUgcGF0aCBhY3R1YWxseSBleGlzdHMsIHBhc3MgYW4gb2JqZWN0IGFzIGEgdGhpcmQgYXJndW1lbnQuXHJcbiAqIFRoaXMgb2JqZWN0IHdpbGwgaGF2ZSBhbiBcImV4aXN0c1wiIGtleSBzZXQgdG8gdHJ1ZS9mYWxzZS5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCBcdFx0XHRcdGN0eHRcclxuICogQHBhcmFtIGFycmF5IFx0XHRcdFx0cGF0aFxyXG4gKiBAcGFyYW0gb2JqZWN0IFx0XHRcdFx0dHJhcFxyXG4gKiBAcGFyYW0gb2JqZWN0IFx0XHRcdFx0cmVjaWV2ZXJcclxuICpcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY3R4dCwgcGF0aCwgdHJhcCA9IHt9LCByZWNpZXZlciA9IHt9KSB7XHJcblx0cGF0aCA9IF9hcnJGcm9tKHBhdGgpLnNsaWNlKCk7XHJcblx0dmFyIF9jdHh0ID0gY3R4dDtcclxuXHR3aGlsZSghX2lzVW5kZWZpbmVkKF9jdHh0KSAmJiAhX2lzTnVsbChfY3R4dCkgJiYgcGF0aC5sZW5ndGgpIHtcclxuXHRcdHZhciBfa2V5ID0gcGF0aC5zaGlmdCgpO1xyXG5cdFx0aWYgKCEodHJhcC5nZXQgPyB0cmFwLmdldChfY3R4dCwgX2tleSkgOiAoX2lzVHlwZU9iamVjdChfY3R4dCkgPyBfa2V5IGluIF9jdHh0IDogX2N0eHRbX2tleV0pKSkge1xyXG5cdFx0XHRyZWNpZXZlci5leGlzdHMgPSBmYWxzZTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0X2N0eHQgPSB0cmFwLmdldCA/IHRyYXAuZ2V0KF9jdHh0LCBfa2V5KSA6IF9jdHh0W19rZXldO1xyXG5cdH1cclxuXHRyZWNpZXZlci5leGlzdHMgPSB0cnVlO1xyXG5cdHJldHVybiBfY3R4dDtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9wdXNoVW5pcXVlIGZyb20gJy4uL2Fyci9wdXNoVW5pcXVlLmpzJztcclxuaW1wb3J0IF9nZXRQcm90b3R5cGVDaGFpbiBmcm9tICcuL2dldFByb3RvdHlwZUNoYWluLmpzJztcclxuXHJcbi8qKlxyXG4gKiBFYWdlcmx5IHJldHJpZXZlcyBvYmplY3QgbWVtYmVycyBhbGwgZG93biB0aGUgcHJvdG90eXBlIGNoYWluLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0XHQgXHRvYmpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0dW50aWxcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqLCB1bnRpbCkge1xyXG5cdHZhciBrZXlzQWxsID0gW107XHJcblx0X2dldFByb3RvdHlwZUNoYWluKG9iaiwgdW50aWwpLmZvckVhY2gob2JqID0+IHtcclxuXHRcdF9wdXNoVW5pcXVlKGtleXNBbGwsIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikpO1xyXG5cdH0pO1xyXG5cdHJldHVybiBrZXlzQWxsO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi4vanMvaXNBcnJheS5qcyc7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgcHJvdG90eXBlIGNoYWluLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IFx0XHRvYmpcclxuICogQHBhcmFtIG9iamVjdFx0IFx0dW50aWxcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmosIHVudGlsKSB7XHJcblx0dW50aWwgPSB1bnRpbCB8fCBPYmplY3QucHJvdG90eXBlO1xyXG5cdHVudGlsID0gdW50aWwgJiYgIV9pc0FycmF5KHVudGlsKSA/IFt1bnRpbF0gOiB1bnRpbDtcclxuXHQvLyBXZSBnZXQgdGhlIGNoYWluIG9mIGluaGVyaXRhbmNlXHJcblx0dmFyIHByb3RvdHlwYWxDaGFpbiA9IFtdO1xyXG5cdHZhciBvYmogPSBvYmo7XHJcblx0d2hpbGUoKG9iaiAmJiAoIXVudGlsIHx8IHVudGlsLmluZGV4T2Yob2JqKSA8IDApICYmIG9iai5uYW1lICE9PSAnZGVmYXVsdCcpKSB7XHJcblx0XHRwcm90b3R5cGFsQ2hhaW4ucHVzaChvYmopO1xyXG5cdFx0b2JqID0gb2JqID8gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgOiBudWxsO1xyXG5cdH1cclxuXHRyZXR1cm4gcHJvdG90eXBhbENoYWluO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX21lcmdlQ2FsbGJhY2sgZnJvbSAnLi9tZXJnZUNhbGxiYWNrLmpzJztcclxuXHJcbi8qKlxyXG4gICogTWVyZ2VzIHZhbHVlcyBmcm9tIHN1YnNlcXVlbnQgYXJyYXlzL29iamVjdHMgZmlyc3QgYXJyYXkvb2JqZWN0O1xyXG4gICogb3B0aW9uYWxseSByZWN1cnNpdmVcclxuICAqXHJcbiAgKiBAcGFyYW0gYXJyYXkgLi4ub2Jqc1xyXG4gICpcclxuICAqIEByZXR1cm4gdm9pZFxyXG4gICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKC4uLm9ianMpIHtcclxuXHRyZXR1cm4gX21lcmdlQ2FsbGJhY2sob2JqcywgKGssIG9iajEsIG9iajIpID0+IHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sIGZhbHNlLypkZWVwUHJvcHMqLywgZmFsc2UvKmlzUmVwbGFjZSovLCBmYWxzZS8qd2l0aFN5bWJvbHMqLyk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICcuLi9qcy9pc0FycmF5LmpzJztcclxuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJy4uL2pzL2lzRnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJy4uL2pzL2lzT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnLi4vanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc051bWVyaWMgZnJvbSAnLi4vanMvaXNOdW1lcmljLmpzJztcclxuaW1wb3J0IF9nZXRBbGxQcm9wZXJ0eU5hbWVzIGZyb20gJy4vZ2V0QWxsUHJvcGVydHlOYW1lcy5qcyc7XHJcblxyXG4vKipcclxuICAqIE1lcmdlcyB2YWx1ZXMgZnJvbSBzdWJzZXF1ZW50IGFycmF5cy9vYmplY3RzIGZpcnN0IGFycmF5L29iamVjdDtcclxuICAqIG9wdGlvbmFsbHkgcmVjdXJzaXZlXHJcbiAgKlxyXG4gICogQHBhcmFtIGFycmF5IC4uLm9ianNcclxuICAqXHJcbiAgKiBAcmV0dXJuIHZvaWRcclxuICAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUNhbGxiYWNrKG9ianMsIGNhbGxiYWNrLCBkZWVwUHJvcHMgPSBmYWxzZSwgaXNSZXBsYWNlID0gZmFsc2UsIHdpdGhTeW1ib2xzID0gdHJ1ZSkge1xyXG5cdHZhciBkZXB0aCA9IDA7XHJcblx0dmFyIG9iajEgPSBvYmpzLnNoaWZ0KCk7XHJcblx0aWYgKF9pc051bWVyaWMob2JqMSkgfHwgb2JqMSA9PT0gdHJ1ZSB8fCBvYmoxID09PSBmYWxzZSkge1xyXG5cdFx0ZGVwdGggPSBvYmoxO1xyXG5cdFx0b2JqMSA9IG9ianMuc2hpZnQoKTtcclxuXHR9XHJcblx0aWYgKCFvYmpzLmxlbmd0aCkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdfbWVyZ2UoKSByZXF1aXJlcyB0d28gb3IgbW9yZSBhcnJheS9vYmplY3RzLicpO1xyXG5cdH1cclxuXHRvYmpzLmZvckVhY2goKG9iajIsIGkpID0+IHtcclxuXHRcdGlmICghX2lzVHlwZU9iamVjdChvYmoyKSAmJiAhX2lzRnVuY3Rpb24ob2JqMikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0KGRlZXBQcm9wcyA/IF9nZXRBbGxQcm9wZXJ0eU5hbWVzKG9iajIpIDogT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqMikpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0dmFyIHZhbEF0T2JqMSA9IG9iajFba2V5XTtcclxuXHRcdFx0dmFyIHZhbEF0T2JqMiA9IG9iajJba2V5XTtcclxuXHRcdFx0aWYgKCgoX2lzQXJyYXkodmFsQXRPYmoxKSAmJiBfaXNBcnJheSh2YWxBdE9iajIpKSB8fCAoX2lzT2JqZWN0KHZhbEF0T2JqMSkgJiYgX2lzT2JqZWN0KHZhbEF0T2JqMikpKSBcclxuXHRcdFx0JiYgKGRlcHRoID09PSB0cnVlIHx8IGRlcHRoID4gMCkpIHtcclxuXHRcdFx0XHQvLyBSRUNVUlNFLi4uXHJcblx0XHRcdFx0b2JqMVtrZXldID0gX2lzQXJyYXkodmFsQXRPYmoxKSAmJiBfaXNBcnJheSh2YWxBdE9iajIpID8gW10gOiB7fTtcclxuXHRcdFx0XHRtZXJnZUNhbGxiYWNrKFtfaXNOdW1lcmljKGRlcHRoKSA/IGRlcHRoIC0gMSA6IGRlcHRoLCBvYmoxW2tleV0sIHZhbEF0T2JqMSwgdmFsQXRPYmoyXSwgY2FsbGJhY2ssIGRlZXBQcm9wcywgaXNSZXBsYWNlLCB3aXRoU3ltYm9scyk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY2FsbGJhY2soa2V5LCBvYmoxLCBvYmoyLCBpKSkge1xyXG5cdFx0XHRcdGlmIChfaXNBcnJheShvYmoxKSAmJiBfaXNBcnJheShvYmoyKSkge1xyXG5cdFx0XHRcdFx0aWYgKGlzUmVwbGFjZSkge1xyXG5cdFx0XHRcdFx0XHRvYmoxW2tleV0gPSB2YWxBdE9iajI7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRvYmoxLnB1c2godmFsQXRPYmoyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gSW4gY2FzZSB3ZSdyZSBzZXR0aW5nIGEgcmVhZC1vbmx5IHByb3BlcnR5XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRpZiAod2l0aFN5bWJvbHMpIHtcclxuXHRcdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iajIsIGtleSkpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9iajJba2V5XTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBjYXRjaChlKSB7fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblx0cmV0dXJuIG9iajE7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogUmV0dXJuIHRoZSByZW1haW5kZXIgb2YgYSBzdHJpbmcgYWZ0ZXIgYSBnaXZlbiB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtICBzdHJpbmcgIHN1YmplY3RcclxuICogQHBhcmFtICBzdHJpbmcgIHNlYXJjaFxyXG4gKiBAcGFyYW0gIGJvb2xcdCAgIGFmdGVyTGFzdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3ViamVjdCwgc2VhcmNoLCBhZnRlckxhc3QgPSBmYWxzZSkge1xyXG5cdGlmIChzZWFyY2ggPT0gJycpIHtcclxuXHRcdHJldHVybiBzdWJqZWN0O1xyXG5cdH1cclxuXHR2YXIgcG9zID0gYWZ0ZXJMYXN0ID8gc3ViamVjdC5sYXN0SW5kZXhPZihzZWFyY2gpIDogc3ViamVjdC5pbmRleE9mKHNlYXJjaCk7XHJcblx0aWYgKHBvcyA9PT0gLTEpIHtcclxuXHRcdHJldHVybiAnJztcclxuXHR9XHJcblx0cmV0dXJuIHN1YmplY3Quc3Vic3RyKHBvcyArIHNlYXJjaC5sZW5ndGgpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBRdWVyeUV2ZW50IGZyb20gJy4vaW50ZXJuYWwvUXVlcnlFdmVudC5qcyc7XHJcbmltcG9ydCBUcmFwQmFzZSBmcm9tICcuL2ludGVybmFsL1RyYXBCYXNlLmpzJztcclxuXHJcbi8qKlxyXG4gKiBSdW5zIGEgXCJnZXRQcm9wc1wiIHR5cGUgb2YgcXVlcnkgb3BlcmF0aW9uIG9uIGEgdGFyZ2V0LlxyXG4gKiBGaXJlcyBhbnkgb2JzZXJ2ZXJzIGZvciB0aGUgc3BlY2lmaWMgdHlwZSB0aGF0IG1heSBiZSBib3VuZCB0byB0YXJnZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSBib29sXHRcdFx0b3duS2V5c1xyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHR0YXJnZXRcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3duS2V5cywgdGFyZ2V0KSB7XHJcblx0aWYgKCF0YXJnZXQgfHwgIV9pc1R5cGVPYmplY3QodGFyZ2V0KSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgbXVzdCBiZSBvZiB0eXBlIG9iamVjdCEnKTtcclxuXHR9XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gRXhlY3V0ZSBhbnkgXCJrZXlzXCIgdHJhcHMsIG90aGVyd2lzZSBcInRlc3RcIiB0aGUgZGVmYXVsdCB3YXlcclxuXHR2YXIgdHJhcEJhc2UsIGRlZmF1bHRLZXlzID0gZnVuY3Rpb24oX2tleXMpIHtcclxuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gX2tleXMgOiAoXHJcblx0XHRcdG93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpIDogT2JqZWN0LmtleXModGFyZ2V0KVxyXG5cdFx0KTtcclxuXHR9O1xyXG5cdGlmICh0cmFwQmFzZSA9IFRyYXBCYXNlLmdldEZvclRhcmdldCh0YXJnZXQpKSB7XHJcblx0XHRyZXR1cm4gdHJhcEJhc2UuZmlyZShuZXcgUXVlcnlFdmVudCh0YXJnZXQsIHt0eXBlOm93bktleXMgPyAnb3duS2V5cycgOiAna2V5cyd9KSwgZGVmYXVsdEtleXMpO1xyXG5cdH1cclxuXHRyZXR1cm4gZGVmYXVsdEtleXMoKTtcclxufVxyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZnJvbS5qcyc7XHJcbmltcG9ydCBfYWxsIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2FsbC5qcyc7XHJcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1N0cmluZy5qcyc7XHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzQXJyYXkuanMnO1xyXG5pbXBvcnQgX2lzTnVtYmVyIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNOdW1iZXIuanMnO1xyXG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNPYmplY3QuanMnO1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBNdXRhdGlvbkV2ZW50IGZyb20gJy4vaW50ZXJuYWwvTXV0YXRpb25FdmVudC5qcyc7XHJcbmltcG9ydCBRdWVyeUV2ZW50IGZyb20gJy4vaW50ZXJuYWwvUXVlcnlFdmVudC5qcyc7XHJcbmltcG9ydCBPYnNlcnZlckJhc2UgZnJvbSAnLi9pbnRlcm5hbC9PYnNlcnZlckJhc2UuanMnO1xyXG5pbXBvcnQgVHJhcEJhc2UgZnJvbSAnLi9pbnRlcm5hbC9UcmFwQmFzZS5qcyc7XHJcbmltcG9ydCB1bmxpbmsgZnJvbSAnLi91bmxpbmsuanMnO1xyXG5pbXBvcnQgbGluayBmcm9tICcuL2xpbmsuanMnO1xyXG5pbXBvcnQgcmVmbGV4SGFzIGZyb20gJy4vaGFzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlcyBhIFwiX3NldFByb3BcIiB0eXBlIG9mIG9wZXJhdGlvbiBvbiBhIHRhcmdldC5cclxuICogRmlyZXMgYW55IG9ic2VydmVycyBmb3IgdGhlIHNwZWNpZmljIHR5cGUgdGhhdCBtYXkgYmUgYm91bmQgdG8gdGFyZ2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gYm9vbFx0XHRcdGRlZmluZVxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHR0YXJnZXRcclxuICogQHBhcmFtIHN0cmluZ3xhcnJheVx0a2V5c09yUGF5bG9hZFxyXG4gKiBAcGFyYW0gbWl4ZWRcdFx0XHR2YWx1ZVxyXG4gKiBAcGFyYW0gYm9vbFx0XHRcdHJldHVybkV2ZW50XHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbHxFdmVudFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVmaW5lLCB0YXJnZXQsIGtleXNPclBheWxvYWQsIHZhbHVlID0gbnVsbCwgcmV0dXJuRXZlbnQgPSBmYWxzZSkge1xyXG5cdGlmICghdGFyZ2V0IHx8ICFfaXNUeXBlT2JqZWN0KHRhcmdldCkpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG11c3QgYmUgb2YgdHlwZSBvYmplY3QhJyk7XHJcblx0fVxyXG5cdGlmIChfaXNPYmplY3Qoa2V5c09yUGF5bG9hZCkpIHtcclxuXHRcdHJldHVybkV2ZW50ID0gdmFsdWU7XHJcblx0fVxyXG5cdHZhciBrZXlzID0ga2V5c09yUGF5bG9hZCwgX2RhdGEgPSB7fSwgZGF0YSA9IHt9LCBjcmVhdGVkID0gW107XHJcblx0dmFyIGhhbmRsZVNldCA9IChrZXksIHZhbHVlLCByZWxhdGVkKSA9PiB7XHJcblx0XHRfZGF0YVtrZXldID0gdGFyZ2V0W2tleV07XHJcblx0XHRpZiAoIXJlZmxleEhhcyh0YXJnZXQsIGtleSkpIHtcclxuXHRcdFx0Y3JlYXRlZC5wdXNoKGtleSk7XHJcblx0XHR9XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdHZhciBkZXNjcmlwdG9yO1xyXG5cdFx0aWYgKGRlZmluZSkge1xyXG5cdFx0XHRkZXNjcmlwdG9yID0gdmFsdWUgfHwge307XHJcblx0XHRcdHZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcclxuXHRcdH1cclxuXHRcdC8vIEV4ZWN1dGUgYW55IFwic2V0XCIgdHJhcHMsIG90aGVyd2lzZSBcInNldFwiIHRoZSBkZWZhdWx0IHdheVxyXG5cdFx0dmFyIHN1Y2Nlc3MsIHRyYXBCYXNlLCBkZWZhdWx0U2V0ID0gZnVuY3Rpb24oX3N1Y2Nlc3MpIHtcclxuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcblx0XHRcdFx0aWYgKGRlc2NyaXB0b3IpIHtcclxuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRhcmdldFtrZXldID0gdmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBfc3VjY2VzcztcclxuXHRcdH07XHJcblx0XHRpZiAodHJhcEJhc2UgPSBUcmFwQmFzZS5nZXRGb3JUYXJnZXQodGFyZ2V0KSkge1xyXG5cdFx0XHR2YXIgZGV0YWlscyA9IGRlc2NyaXB0b3IgXHJcblx0XHRcdFx0PyB7dHlwZTonZGVmJywgcXVlcnk6a2V5LCBkZXNjcmlwdG9yLCByZWxhdGVkfSBcclxuXHRcdFx0XHQ6IHt0eXBlOidzZXQnLCBxdWVyeTprZXksIHZhbHVlLCByZWxhdGVkfTtcclxuXHRcdFx0c3VjY2VzcyA9IHRyYXBCYXNlLmZpcmUobmV3IFF1ZXJ5RXZlbnQodGFyZ2V0LCBkZXRhaWxzKSwgZGVmYXVsdFNldCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdWNjZXNzID0gZGVmYXVsdFNldCgpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHRkYXRhW2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0aWYgKGRhdGFba2V5XSAhPT0gX2RhdGFba2V5XSkge1xyXG5cdFx0XHRcdC8vIFVub2JzZXJ2ZSBvdXRnb2luZyB2YWx1ZSBmb3IgYnViYmxpbmdcclxuXHRcdFx0XHRpZiAoX2RhdGFba2V5XSAmJiBfaXNUeXBlT2JqZWN0KF9kYXRhW2tleV0pKSB7XHJcblx0XHRcdFx0XHR1bmxpbmsodGFyZ2V0LCBrZXksIF9kYXRhW2tleV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBPYnNlcnZlIGluY29taW5nIHZhbHVlIGZvciBidWJibGluZ1xyXG5cdFx0XHRcdGlmIChkYXRhW2tleV0gJiYgX2lzVHlwZU9iamVjdChkYXRhW2tleV0pKSB7XHJcblx0XHRcdFx0XHRsaW5rKHRhcmdldCwga2V5LCBkYXRhW2tleV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkZWxldGUgZGF0YVtrZXldO1xyXG5cdFx0XHRcdGRlbGV0ZSBfZGF0YVtrZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkZWxldGUgX2RhdGFba2V5XTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdWNjZXNzO1xyXG5cdH07XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dmFyIHN1Y2Nlc3NTdGF0ZXMgPSBbXTtcclxuXHRpZiAoX2lzQXJyYXkoa2V5cykgfHwgKChfaXNTdHJpbmcoa2V5cykgfHwgX2lzTnVtYmVyKGtleXMpKSAmJiAoa2V5cyA9IF9hcnJGcm9tKGtleXMpKSkpIHtcclxuXHRcdHN1Y2Nlc3NTdGF0ZXMgPSBrZXlzLm1hcChrZXkgPT4gaGFuZGxlU2V0KGtleSwgdmFsdWUsIGtleXMpKVxyXG5cdH0gZWxzZSBpZiAoX2lzT2JqZWN0KGtleXNPclBheWxvYWQpKSB7XHJcblx0XHR2YXIgcGF5bG9hZEtleXMgPSBPYmplY3Qua2V5cyhrZXlzT3JQYXlsb2FkKTtcclxuXHRcdHN1Y2Nlc3NTdGF0ZXMgPSBwYXlsb2FkS2V5cy5tYXAoa2V5ID0+IGhhbmRsZVNldChrZXksIGtleXNPclBheWxvYWRba2V5XSwgcGF5bG9hZEtleXMpKVxyXG5cdH1cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR2YXIgZXZ0LCBtdXRhdGlvbkJhc2U7XHJcblx0aWYgKChtdXRhdGlvbkJhc2UgPSBPYnNlcnZlckJhc2UuZ2V0Rm9yVGFyZ2V0KHRhcmdldCkpIHx8IHJldHVybkV2ZW50KSB7XHJcblx0XHRldnQgPSBuZXcgTXV0YXRpb25FdmVudCh0YXJnZXQsIHt0eXBlOidzZXQnLCBkYXRhLCBfZGF0YSwgY3JlYXRlZH0pO1xyXG5cdFx0aWYgKG11dGF0aW9uQmFzZSkge1xyXG5cdFx0XHRtdXRhdGlvbkJhc2UuZmlyZShldnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gcmV0dXJuRXZlbnQgPyBldnQgOiBfYWxsKHN1Y2Nlc3NTdGF0ZXMsIHN0YXRlID0+IHN0YXRlKTtcclxufVxyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBpbml0IGZyb20gJy4vaW5pdC5qcyc7XHJcbmltcG9ydCByZWZsZXhLZXlzIGZyb20gJy4va2V5cy5qcyc7XHJcbmltcG9ydCByZWZsZXhHZXQgZnJvbSAnLi9nZXQuanMnO1xyXG5pbXBvcnQgbGluayBmcm9tICcuL2xpbmsuanMnO1xyXG5cclxuLyoqXHJcbiAqIFJlY3Vyc2l2ZWx5IFwiY29ubmVjdHNcIiBhbiBvYmplY3QncyBtZW1iZXJzIHRvIHRoZSBvYmplY3RcclxuICogZm9yIHJlZmxleCBhY3Rpb25zLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHR0YXJnZXRcclxuICogQHBhcmFtIGJvb2xcdFx0XHRfaW5pdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHZvaWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkKHRhcmdldCwgX2luaXQgPSBmYWxzZSkge1xyXG5cdGlmICghdGFyZ2V0IHx8ICFfaXNUeXBlT2JqZWN0KHRhcmdldCkpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG11c3QgYmUgb2YgdHlwZSBvYmplY3QhJyk7XHJcblx0fVxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciBrZXlzID0gcmVmbGV4S2V5cyh0YXJnZXQpO1xyXG5cdGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0dmFyIHZhbHVlID0gcmVmbGV4R2V0KHRhcmdldCwga2V5KTtcclxuXHRcdGlmIChfaXNUeXBlT2JqZWN0KHZhbHVlKSAmJiB2YWx1ZSkge1xyXG5cdFx0XHRsaW5rKHRhcmdldCwga2V5LCB2YWx1ZSk7XHJcblx0XHRcdGJ1aWxkKHZhbHVlLCBfaW5pdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0aWYgKF9pbml0KSB7XHJcblx0XHRpbml0KHRhcmdldCwga2V5cyk7XHJcblx0fVxyXG59XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfc2V0UHJvcCBmcm9tICcuL19zZXRQcm9wLmpzJztcclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlcyBhIFwic2V0XCIgb3BlcmF0aW9uIG9uIGEgdGFyZ2V0LlxyXG4gKiBGaXJlcyBhbnkgb2JzZXJ2ZXJzIHRoYXQgbWF5IGJlIGJvdW5kIHRvIHRhcmdldC5cclxuICpcclxuICogQHBhcmFtIGFycmF5fG9iamVjdFx0dGFyZ2V0XHJcbiAqIEBwYXJhbSBzdHJpbmd8YXJyYXlcdGtleXNPclBheWxvYWRcclxuICogQHBhcmFtIG1peGVkXHRcdFx0dmFsdWVcclxuICogQHBhcmFtIGJvb2xcdFx0XHRyZXR1cm5FdmVudFxyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2x8RXZlbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhcmdldCwga2V5c09yUGF5bG9hZCwgdmFsdWUgPSBudWxsLCByZXR1cm5FdmVudCA9IGZhbHNlKSB7XHJcblx0cmV0dXJuIF9zZXRQcm9wKHRydWUvKmRlZmluZSovLCAuLi5hcmd1bWVudHMpO1xyXG59XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfYXJyRnJvbSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mcm9tLmpzJztcclxuaW1wb3J0IF9hbGwgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvYWxsLmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1R5cGVPYmplY3QuanMnO1xyXG5pbXBvcnQgTXV0YXRpb25FdmVudCBmcm9tICcuL2ludGVybmFsL011dGF0aW9uRXZlbnQuanMnO1xyXG5pbXBvcnQgUXVlcnlFdmVudCBmcm9tICcuL2ludGVybmFsL1F1ZXJ5RXZlbnQuanMnO1xyXG5pbXBvcnQgT2JzZXJ2ZXJCYXNlIGZyb20gJy4vaW50ZXJuYWwvT2JzZXJ2ZXJCYXNlLmpzJztcclxuaW1wb3J0IFRyYXBCYXNlIGZyb20gJy4vaW50ZXJuYWwvVHJhcEJhc2UuanMnO1xyXG5pbXBvcnQgdW5saW5rIGZyb20gJy4vdW5saW5rLmpzJztcclxuaW1wb3J0IHJlZmxleEhhcyBmcm9tICcuL2hhcy5qcyc7XHJcblxyXG4vKipcclxuICogRXhlY3V0ZXMgYSBcImRlbGV0ZVwiIG9wZXJhdGlvbiBvbiBhIHRhcmdldC5cclxuICogRmlyZXMgYW55IG9ic2VydmVycyB0aGF0IG1heSBiZSBib3VuZCB0byB0YXJnZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3RcdHRhcmdldFxyXG4gKiBAcGFyYW0gc3RyaW5nfGFycmF5XHRrZXlzXHJcbiAqIEBwYXJhbSBib29sXHRcdFx0cmV0dXJuRXZlbnRcclxuICpcclxuICogQHJldHVybiBib29sfEV2ZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YXJnZXQsIGtleXMsIHJldHVybkV2ZW50ID0gZmFsc2UpIHtcclxuXHRpZiAoIXRhcmdldCB8fCAhX2lzVHlwZU9iamVjdCh0YXJnZXQpKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBtdXN0IGJlIG9mIHR5cGUgb2JqZWN0IScpO1xyXG5cdH1cclxuXHR2YXIga2V5cyA9IF9hcnJGcm9tKGtleXMpLCBfZGF0YSA9IHt9LCBkYXRhID0ge30sIGRlbGV0ZWQgPSBbXTtcclxuXHR2YXIgc3VjY2Vzc1N0YXRlcyA9IGtleXMubWFwKGtleSA9PiB7XHJcblx0XHRfZGF0YVtrZXldID0gdGFyZ2V0W2tleV07XHJcblx0XHRpZiAocmVmbGV4SGFzKHRhcmdldCwga2V5KSkge1xyXG5cdFx0XHRkZWxldGVkLnB1c2goa2V5KTtcclxuXHRcdH1cclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gRXhlY3V0ZSBhbnkgXCJkZWxcIiB0cmFwcywgb3RoZXJ3aXNlIFwiZGVsXCIgdGhlIGRlZmF1bHQgd2F5XHJcblx0XHR2YXIgc3VjY2VzcywgdHJhcEJhc2UsIGRlZmF1bHREZWwgPSBmdW5jdGlvbihfc3VjY2Vzcykge1xyXG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuXHRcdFx0XHRkZWxldGUgdGFyZ2V0W2tleV07XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIF9zdWNjZXNzO1xyXG5cdFx0fTtcclxuXHRcdGlmICh0cmFwQmFzZSA9IFRyYXBCYXNlLmdldEZvclRhcmdldCh0YXJnZXQpKSB7XHJcblx0XHRcdHN1Y2Nlc3MgPSB0cmFwQmFzZS5maXJlKG5ldyBRdWVyeUV2ZW50KHRhcmdldCwge3R5cGU6J2RlbCcsIHF1ZXJ5OmtleSwgcmVsYXRlZDprZXlzfSksIGRlZmF1bHREZWwpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3VjY2VzcyA9IGRlZmF1bHREZWwoKTtcclxuXHRcdH1cclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0aWYgKHN1Y2Nlc3MpIHtcclxuXHRcdFx0ZGF0YVtrZXldID0gdW5kZWZpbmVkO1xyXG5cdFx0XHQvLyBVbm9ic2VydmUgb3V0Z29pbmcgdmFsdWUgZm9yIGJ1YmJsaW5nXHJcblx0XHRcdGlmIChfZGF0YVtrZXldICYmIF9pc1R5cGVPYmplY3QoX2RhdGFba2V5XSkpIHtcclxuXHRcdFx0XHR1bmxpbmsodGFyZ2V0LCBrZXksIF9kYXRhW2tleV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3VjY2VzcztcclxuXHR9KTtcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR2YXIgZXZ0LCBtdXRhdGlvbkJhc2U7XHJcblx0aWYgKChtdXRhdGlvbkJhc2UgPSBPYnNlcnZlckJhc2UuZ2V0Rm9yVGFyZ2V0KHRhcmdldCkpIHx8IHJldHVybkV2ZW50KSB7XHJcblx0XHRldnQgPSBuZXcgTXV0YXRpb25FdmVudCh0YXJnZXQsIHt0eXBlOidkZWwnLCBkYXRhLCBfZGF0YSwgZGVsZXRlZH0pO1xyXG5cdFx0aWYgKG11dGF0aW9uQmFzZSAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGgpIHtcclxuXHRcdFx0bXV0YXRpb25CYXNlLmZpcmUoZXZ0KTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIHJldHVybkV2ZW50ID8gZXZ0IDogX2FsbChzdWNjZXNzU3RhdGVzLCBzdGF0ZSA9PiBzdGF0ZSk7XHJcbn1cclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9vYmpGcm9tIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2Zyb20uanMnO1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc0FycmF5LmpzJztcclxuaW1wb3J0IF9pc051bWVyaWMgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc051bWVyaWMuanMnO1xyXG5pbXBvcnQgX2lzRnVuY3Rpb24gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc0Z1bmN0aW9uLmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1R5cGVPYmplY3QuanMnO1xyXG5pbXBvcnQgUXVlcnlFdmVudCBmcm9tICcuL2ludGVybmFsL1F1ZXJ5RXZlbnQuanMnO1xyXG5pbXBvcnQgVHJhcEJhc2UgZnJvbSAnLi9pbnRlcm5hbC9UcmFwQmFzZS5qcyc7XHJcbmltcG9ydCB0cmFuc2FjdGlvbiBmcm9tICcuL3RyYW5zYWN0aW9uLmpzJztcclxuXHJcbi8qKlxyXG4gKiBSdW5zIGEgXCJnZXRcIiBxdWVyeSBvcGVyYXRpb24gb24gYSB0YXJnZXQuXHJcbiAqIEZpcmVzIGFueSBzdWNoIHF1ZXJ5IG9ic2VydmVycyB0aGF0IG1heSBiZSBib3VuZCB0byB0YXJnZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3RcdHRhcmdldFxyXG4gKiBAcGFyYW0gc3RyaW5nfGFycmF5XHRrZXlzXHJcbiAqXHJcbiAqIEByZXR1cm4gbWl4ZWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhcmdldCwga2V5cykge1xyXG5cdGlmICghdGFyZ2V0IHx8ICFfaXNUeXBlT2JqZWN0KHRhcmdldCkpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG11c3QgYmUgb2YgdHlwZSBvYmplY3QhJyk7XHJcblx0fVxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIEV4ZWN1dGUgYW55IFwiZ2V0XCIgdHJhcHMsIG90aGVyd2lzZSBcImdldFwiIHRoZSBkZWZhdWx0IHdheVxyXG5cdHZhciB2YWx1ZSwgdHJhcEJhc2UsIGRlZmF1bHRHZXQgPSBmdW5jdGlvbihfdmFsdWUpIHtcclxuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gX3ZhbHVlIDogKF9pc0FycmF5KGtleXMpID8gX29iakZyb20oa2V5cywgdGFyZ2V0KSA6IHRhcmdldFtrZXlzXSk7XHJcblx0fTtcclxuXHRpZiAodHJhcEJhc2UgPSBUcmFwQmFzZS5nZXRGb3JUYXJnZXQodGFyZ2V0KSkge1xyXG5cdFx0dmFsdWUgPSB0cmFwQmFzZS5maXJlKG5ldyBRdWVyeUV2ZW50KHRhcmdldCwge3R5cGU6J2dldCcsIHF1ZXJ5OmtleXN9KSwgZGVmYXVsdEdldCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhbHVlID0gZGVmYXVsdEdldCgpO1xyXG5cdH1cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBFeGVjdXRlIGFycmF5IG1ldGhvZHMgaW4gXCJtdXRhdGlvblwiIG1vZGVcclxuXHRpZiAoX2lzQXJyYXkodGFyZ2V0KSAmJiAhX2lzTnVtZXJpYyhrZXlzKSAmJiBfaXNGdW5jdGlvbih2YWx1ZSkpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiByZWZsZXhBcnJheU1ldGhvZFdyYXBwZXIoLi4uYXJncykge1xyXG5cdFx0XHRyZXR1cm4gdHJhbnNhY3Rpb24oW3RhcmdldF0sICgpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWUuYXBwbHkodGFyZ2V0LCBhcmdzKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1R5cGVPYmplY3QuanMnO1xyXG5pbXBvcnQgUXVlcnlFdmVudCBmcm9tICcuL2ludGVybmFsL1F1ZXJ5RXZlbnQuanMnO1xyXG5pbXBvcnQgVHJhcEJhc2UgZnJvbSAnLi9pbnRlcm5hbC9UcmFwQmFzZS5qcyc7XHJcblxyXG4vKipcclxuICogUnVucyBhbiBcImluXCIgcXVlcnkgb3BlcmF0aW9uIG9uIGEgdGFyZ2V0LlxyXG4gKiBGaXJlcyBhbnkgc3VjaCBxdWVyeSBvYnNlcnZlcnMgdGhhdCBtYXkgYmUgYm91bmQgdG8gdGFyZ2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHR0YXJnZXRcclxuICogQHBhcmFtIHN0cmluZ1x0XHRrZXlcclxuICpcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YXJnZXQsIGtleSkge1xyXG5cdGlmICghdGFyZ2V0IHx8ICFfaXNUeXBlT2JqZWN0KHRhcmdldCkpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG11c3QgYmUgb2YgdHlwZSBvYmplY3QhJyk7XHJcblx0fVxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIEV4ZWN1dGUgYW55IFwiaGFzXCIgdHJhcHMsIG90aGVyd2lzZSBcInRlc3RcIiB0aGUgZGVmYXVsdCB3YXlcclxuXHR2YXIgdHJhcEJhc2UsIGRlZmF1bHRIYXMgPSBmdW5jdGlvbihfc3RhdGUpIHtcclxuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gX3N0YXRlIDogKGtleSBpbiB0YXJnZXQpO1xyXG5cdH07XHJcblx0aWYgKHRyYXBCYXNlID0gVHJhcEJhc2UuZ2V0Rm9yVGFyZ2V0KHRhcmdldCkpIHtcclxuXHRcdHJldHVybiB0cmFwQmFzZS5maXJlKG5ldyBRdWVyeUV2ZW50KHRhcmdldCwge3R5cGU6J2hhcycsIHF1ZXJ5OmtleX0pLCBkZWZhdWx0SGFzKTtcclxuXHR9XHJcblx0cmV0dXJuIGRlZmF1bHRIYXMoKTtcclxufVxyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgYnVpbGQgZnJvbSAnLi9idWlsZC5qcyc7XHJcbmltcG9ydCBvYnNlcnZlIGZyb20gJy4vb2JzZXJ2ZS5qcyc7XHJcbmltcG9ydCB1bm9ic2VydmUgZnJvbSAnLi91bm9ic2VydmUuanMnO1xyXG5pbXBvcnQgdHJhcCBmcm9tICcuL3RyYXAuanMnO1xyXG5pbXBvcnQgdW50cmFwIGZyb20gJy4vdW50cmFwLmpzJztcclxuaW1wb3J0IGRlZiBmcm9tICcuL2RlZi5qcyc7XHJcbmltcG9ydCBzZXQgZnJvbSAnLi9zZXQuanMnO1xyXG5pbXBvcnQgZGVsIGZyb20gJy4vZGVsLmpzJztcclxuaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rLmpzJztcclxuaW1wb3J0IHVubGluayBmcm9tICcuL3VubGluay5qcyc7XHJcbmltcG9ydCB0cmFuc2FjdGlvbiBmcm9tICcuL3RyYW5zYWN0aW9uLmpzJztcclxuaW1wb3J0IGdldCBmcm9tICcuL2dldC5qcyc7XHJcbmltcG9ydCBoYXMgZnJvbSAnLi9oYXMuanMnO1xyXG5pbXBvcnQgaW5pdCBmcm9tICcuL2luaXQuanMnO1xyXG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xyXG5pbXBvcnQgb3duS2V5cyBmcm9tICcuL293bktleXMuanMnO1xyXG5pbXBvcnQgb24gZnJvbSAnLi9vbi5qcyc7XHJcbmltcG9ydCBvZmYgZnJvbSAnLi9vZmYuanMnO1xyXG5pbXBvcnQgdHJpZ2dlciBmcm9tICcuL3RyaWdnZXIuanMnO1xyXG5pbXBvcnQgTXV0YXRpb25FdmVudCBmcm9tICcuL2ludGVybmFsL011dGF0aW9uRXZlbnQuanMnO1xyXG5pbXBvcnQgUXVlcnlFdmVudCBmcm9tICcuL2ludGVybmFsL1F1ZXJ5RXZlbnQuanMnO1xyXG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9pbnRlcm5hbC9FdmVudC5qcyc7XHJcblxyXG4vLyBOb3cgd2UnbGwgbWltaWNrIHN0YW5kYXJkIFRyYXAgcHJvcGVydGllc1xyXG4vLyBzbyB0aGF0IGNhbiBiZSB1c2VkIGFzIHN0YW5kYXJkIFRyYXAgb3V0IG9mIHRoZSBib3guXHJcbmNvbnN0IGRlbGV0ZVByb3BlcnR5ID0gZGVsO1xyXG5jb25zdCBkZWZpbmVQcm9wZXJ0eSA9IGRlZjtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGJ1aWxkLFxyXG5cdG9ic2VydmUsXHJcblx0dW5vYnNlcnZlLFxyXG5cdHRyYXAsXHJcblx0dW50cmFwLFxyXG5cdGRlZixcclxuXHRkZWZpbmVQcm9wZXJ0eSxcclxuXHRzZXQsXHJcblx0ZGVsLFxyXG5cdGRlbGV0ZVByb3BlcnR5LFxyXG5cdGxpbmssXHJcblx0dW5saW5rLFxyXG5cdHRyYW5zYWN0aW9uLFxyXG5cdGdldCxcclxuXHRoYXMsXHJcblx0aW5pdCxcclxuXHRrZXlzLFxyXG5cdG93bktleXMsXHJcblx0b24sXHJcblx0b2ZmLFxyXG5cdHRyaWdnZXIsXHJcblx0Ly8gRXZlbnRzXHJcblx0TXV0YXRpb25FdmVudCxcclxuXHRRdWVyeUV2ZW50LFxyXG5cdEV2ZW50LFxyXG59OyIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfYXJyRnJvbSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mcm9tLmpzJztcclxuaW1wb3J0IHJlZmxleEdldCBmcm9tICcuL2dldC5qcyc7XHJcbmltcG9ydCByZWZsZXhTZXQgZnJvbSAnLi9zZXQuanMnO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIFwiUmVmbHhpdmUgZ2V0dGVyL3NldHRlclwiIHRyYXBzIG9uIHRoZSB0YXJnZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3RcdHRhcmdldFxyXG4gKiBAcGFyYW0gc3RyaW5nfGFycmF5XHRrZXlzXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFyZ2V0LCBrZXlzKSB7XHJcblx0X2FyckZyb20oa2V5cykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0dmFyIHZhbHVlID0gdGFyZ2V0W2tleV0sIG9uR2V0RmlyZSwgb25TZXRGaXJlO1xyXG5cdFx0dmFyIGN1cnJlbnREZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSlcclxuXHRcdHx8IHtlbnVtZXJhYmxlOiBrZXkgaW4gdGFyZ2V0ID8gZmFsc2UvKmV4aXN0aW5nIGJ1dCBoaWRkZW4qLyA6IHRydWV9O1xyXG5cdFx0aWYgKCd2YWx1ZScgaW4gY3VycmVudERlc2NyaXB0b3IpIHtcclxuXHRcdFx0ZGVsZXRlIGN1cnJlbnREZXNjcmlwdG9yLnZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCd3cml0YWJsZScgaW4gY3VycmVudERlc2NyaXB0b3IpIHtcclxuXHRcdFx0ZGVsZXRlIGN1cnJlbnREZXNjcmlwdG9yLndyaXRhYmxlO1xyXG5cdFx0fVxyXG5cdFx0Y3VycmVudERlc2NyaXB0b3IuZ2V0ID0gKCkgPT4ge1xyXG5cdFx0XHRpZiAob25HZXRGaXJlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdG9uR2V0RmlyZSA9IHRydWU7XHJcblx0XHRcdHZhciBfdmFsdWUgPSByZWZsZXhHZXQodGFyZ2V0LCBrZXkpO1xyXG5cdFx0XHRvbkdldEZpcmUgPSBmYWxzZTtcclxuXHRcdFx0cmV0dXJuIF92YWx1ZTtcclxuXHRcdH07XHJcblx0XHRjdXJyZW50RGVzY3JpcHRvci5zZXQgPSBuZXdWYWx1ZSA9PiB7XHJcblx0XHRcdGlmIChvblNldEZpcmUpIHtcclxuXHRcdFx0XHR2YWx1ZSA9IG5ld1ZhbHVlO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdG9uU2V0RmlyZSA9IHRydWU7XHJcblx0XHRcdHZhciByc3BucyA9IHJlZmxleFNldCh0YXJnZXQsIGtleSwgbmV3VmFsdWUpO1xyXG5cdFx0XHRvblNldEZpcmUgPSBmYWxzZTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBjdXJyZW50RGVzY3JpcHRvcik7XHJcblx0fSk7XHJcbn1cclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IF9pc09iamVjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzT2JqZWN0LmpzJztcclxuaW1wb3J0IF9lYWNoIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2VhY2guanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaGUgRXZlbnQgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheXxvYmplY3RcdFx0dGFyZ2V0XHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHRcdGRldGFpbHNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHRhcmdldCwgZGV0YWlscyA9IHt9KSB7XHJcblx0XHR0aGlzLiQgPSB7fTtcclxuXHRcdHRoaXMuJC50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHR0aGlzLiQuZGV0YWlscyA9IGRldGFpbHM7XHJcblx0XHR0aGlzLiQucHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLiQuZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy4kLnByb21pc2VzSW5zdGFuY2UgPSBudWxsO1xyXG5cdFx0dGhpcy4kLnByb21pc2VzID0gW107XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0X2VhY2goZGV0YWlscywgKHByb3AsIHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmIChwcm9wICE9PSAnJCcpIHtcclxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcCwge3ZhbHVlfSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgXCJ0YXJnZXRcIiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5fG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldCB0YXJnZXQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4kLnRhcmdldDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIFwiZGV0YWlsc1wiIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0IGRldGFpbHMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4kLmRldGFpbHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdCAqIFJFU1BPTlNFIEhBTkRMRVJTXHJcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQgKi9cclxuXHJcblx0LyoqXHJcblx0ICogU3RvcHMgdGhlIGV2bnQgZnJvbSByZWFjaGluZyBvdGhlciBsaXN0ZW5lcnMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdG9wUHJvcGFnYXRpb24oKSB7XHJcblx0XHR0aGlzLiQucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcclxuXHR9XHJcblx0XHRcclxuXHQvKipcclxuXHQgKiAoUmVhZG9ubHkpIHRlbGxzIGlmIHN0b3BQcm9wYWdhdGlvbigpIGhhcyBiZWVuIGNhbGxlZC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGdldCBwcm9wYWdhdGlvblN0b3BwZWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4kLnByb3BhZ2F0aW9uU3RvcHBlZDtcclxuXHR9XHJcblx0XHRcclxuXHQvKipcclxuXHQgKiBTZXRzIGEgZGlzcG9zaXRpb24gdGhhdCBhc2tzIGV2ZW50IGluaXRpYXRvciBub3QgdG9cclxuXHQgKiBwcm9jZWVkIHdpdGggZGVmYXVsdCBhY3Rpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2ZW50RGVmYXVsdCgpIHtcclxuXHRcdHRoaXMuJC5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTtcclxuXHR9XHJcblx0XHRcclxuXHQvKipcclxuXHQgKiAoUmVhZG9ubHkpIHRlbGxzIGlmIHByZXZlbnREZWZhdWx0KCkgaGFzIGJlZW4gY2FsbGVkLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0Z2V0IGRlZmF1bHRQcmV2ZW50ZWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4kLmRlZmF1bHRQcmV2ZW50ZWQ7XHJcblx0fVxyXG5cdFx0XHJcblx0LyoqXHJcblx0ICogU2V0cyBhIFByb21pc2UgZGlzcG9zaXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gUHJvbWlzZVx0cHJvbWlzZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJvbWlzZShwcm9taXNlKSB7XHJcblx0XHRpZiAoIShwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFdmVudC5wcm9taXNlKCkgbXVzdCBiZSBjYWxsZWQgd2l0aCBhIFByb21pc2UuJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLiQucHJvbWlzZXMucHVzaChwcm9taXNlKTtcclxuXHRcdHRoaXMuJC5wcm9taXNlc0luc3RhbmNlID0gbnVsbDtcclxuXHR9XHJcblx0XHRcclxuXHQvKipcclxuXHQgKiAoUmVhZG9ubHkpIHJldHVybnMgYWxsIHByb21pc2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBQcm9taXNlfG51bGxcclxuXHQgKi9cclxuXHRnZXQgcHJvbWlzZXMoKSB7XHJcblx0XHRpZiAoIXRoaXMuJC5wcm9taXNlc0luc3RhbmNlICYmIHRoaXMuJC5wcm9taXNlcy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy4kLnByb21pc2VzSW5zdGFuY2UgPSBQcm9taXNlLmFsbCh0aGlzLiQucHJvbWlzZXMpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuJC5wcm9taXNlc0luc3RhbmNlO1xyXG5cdH1cclxuXHRcdFxyXG5cdC8qKlxyXG5cdCAqIEV2YWx1YXRlcyB0aGUgZ2l2ZW4gZGlzcG9zaXRpb24gdmFsdWUgYW5kXHJcblx0ICogY2FsbHMgYW4gYXBwcm9wcmlhdGUgZGlzcG9zaXRpb24gbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtcyBtaXhlZCBcdHJzcG5zXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXNwb25zZShyc3Bucykge1xyXG5cdFx0dmFyIHByb21zO1xyXG5cdFx0dmFyIGlzRXZlbnQgPSBfaXNPYmplY3QocnNwbnMpICYmICFfaXNVbmRlZmluZWQocnNwbnMucHJvcGFnYXRpb25TdG9wcGVkKSAmJiAhX2lzVW5kZWZpbmVkKHJzcG5zLmRlZmF1bHRQcmV2ZW50ZWQpXHJcblx0XHRpZiAoKHJzcG5zID09PSBmYWxzZSkgfHwgKGlzRXZlbnQgJiYgcnNwbnMucHJvcGFnYXRpb25TdG9wcGVkKSkge1xyXG5cdFx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSBlbHNlIGlmICgocnNwbnMgPT09IGZhbHNlKSB8fCAoaXNFdmVudCAmJiByc3Bucy5kZWZhdWx0UHJldmVudGVkKSkge1xyXG5cdFx0XHR0aGlzLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9IGVsc2UgaWYgKChyc3BucyBpbnN0YW5jZW9mIFByb21pc2UgJiYgKHByb21zID0gcnNwbnMpKVxyXG5cdFx0fHwgKGlzRXZlbnQgJiYgKHByb21zID0gcnNwbnMucHJvbWlzZXMpKSkge1xyXG5cdFx0XHR0aGlzLnByb21pc2UocHJvbXMpO1xyXG5cdFx0fVxyXG5cdH1cclxufTsiLCJcclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaGUgRmlyZWFibGUgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYSBcImRpc2Nvbm5lY3RlZFwiIGZsYWcgb24gdGhlIEZpcmVhYmxlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZGlzY29ubmVjdCgpIHtcclxuXHRcdHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcclxuXHR9XHJcbn07IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9pbnRlcnNlY3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvaW50ZXJzZWN0LmpzJztcclxuaW1wb3J0IF9pc1R5cGVPYmplY3QgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1R5cGVPYmplY3QuanMnO1xyXG5pbXBvcnQgRmlyZWFibGUgZnJvbSAnLi9GaXJlYWJsZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBGaXJlYmFzZSBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmZpcmVhYmxlcyA9IFtdO1xyXG5cdFx0dGhpcy5jdXJyZW50bHlGaXJpbmdFdmVudHMgPSBbXTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBGaXJlYWJsZSBpbnN0YW5jZVxyXG5cdCAqIHdpdGggb3B0aW9uYWwgdGFncy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBGaXJlYWJsZVx0XHRcdGZpcmVhYmxlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEZpcmVhYmxlXHJcblx0ICovXHJcblx0YWRkRmlyZWFibGUoZmlyZWFibGUpIHtcclxuXHRcdHRoaXMuZmlyZWFibGVzLnB1c2goZmlyZWFibGUpO1xyXG5cdFx0cmV0dXJuIGZpcmVhYmxlO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIEZpcmVhYmxlIGluc3RhbmNlXHJcblx0ICogd2l0aCBvcHRpb25hbCB0YWdzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEZpcmVhYmxlXHRcdFx0ZmlyZWFibGVcclxuXHQgKiBAcGFyYW0gYXJyYXlcdFx0XHRcdHRhZ3NcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbW92ZUZpcmVhYmxlKGZpcmVhYmxlLCB0YWdzID0gW10pIHtcclxuXHRcdHRoaXMuZmlyZWFibGVzID0gdGhpcy5maXJlYWJsZXMuZmlsdGVyKF9maXJlYWJsZSA9PiBfZmlyZWFibGUgIT09IGZpcmVhYmxlKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogRmluZHMgdGhlIE9ic2VydmVyIGluc3RhbmNlc1xyXG5cdCAqIHdpdGggdGhlIGdpdmVuIHF1ZXJ5IHBhcmFtZXRlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0XHRcdFx0cXVlcnlcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRmaW5kRmlyZWFibGVzKHF1ZXJ5KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5maXJlYWJsZXMuZmlsdGVyKG9ic2VydmVyID0+IHtcclxuXHRcdFx0cmV0dXJuICghcXVlcnkuaGFuZGxlciB8fCBvYnNlcnZlci5oYW5kbGVyID09PSBxdWVyeS5oYW5kbGVyKSAmJiAoIXF1ZXJ5LnBhcmFtcyB8fCAoXHJcblx0XHRcdFx0KCFxdWVyeS5wYXJhbXMudHlwZSB8fCBvYnNlcnZlci5wYXJhbXMudHlwZSA9PT0gcXVlcnkucGFyYW1zLnR5cGUpXHJcblx0XHRcdFx0JiYgKCFxdWVyeS5wYXJhbXMudGFncyB8fCBfaW50ZXJzZWN0KG9ic2VydmVyLnBhcmFtcy50YWdzIHx8IFtdLCBxdWVyeS5wYXJhbXMudGFncykubGVuZ3RoID09PSBxdWVyeS5wYXJhbXMudGFncy5sZW5ndGgpXHJcblx0XHRcdCkpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBhbiBvYmplY3QncyBmaXJlYmFzZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheXxvYmplY3RcdG9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdHJpbmdcdFx0dHlwZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiBGaXJlYmFzZVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVGb3JUYXJnZXQgKG9iamVjdCwgdHlwZSwgQmFzZSkge1xyXG5cdFx0aWYgKG9iamVjdCAmJiBfaXNUeXBlT2JqZWN0KG9iamVjdCkpIHtcclxuXHRcdFx0dmFyIGZpcmViYXNlcztcclxuXHRcdFx0aWYgKCEoZmlyZWJhc2VzID0gb2JqZWN0W2ZpcmViYXNlS2V5XSkpIHtcclxuXHRcdFx0XHRmaXJlYmFzZXMgPSB7fTtcclxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBmaXJlYmFzZUtleSwge1xyXG5cdFx0XHRcdFx0Z2V0OigpID0+IGZpcmViYXNlcyxcclxuXHRcdFx0XHRcdHNldDp2YWx1ZSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSAhPT0gZmlyZWJhc2VzKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0IHRvIG92ZXJ3cml0ZSB0aGUgXCInICsgZmlyZWJhc2VLZXkgKyAnXCIgc3BlY2lhbCBwcm9wZXJ0eSEnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVudW1lcmFibGU6ZmFsc2UsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZmlyZWJhc2VzW3R5cGVdID0gdHlwZSA9PT0gJ2xpc3RlbmVycycgPyBuZXcgQmFzZShvYmplY3QpIDogbmV3IEJhc2U7XHJcblx0XHRcdHJldHVybiBmaXJlYmFzZXNbdHlwZV07XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYW4gb2JqZWN0J3MgZmlyZWJhc2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHRvYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nXHRcdHR5cGVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gRmlyZWJhc2VcclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0Rm9yVGFyZ2V0KG9iamVjdCwgdHlwZSkge1xyXG5cdFx0dmFyIGZpcmViYXNlcztcclxuXHRcdGlmIChvYmplY3QgJiYgX2lzVHlwZU9iamVjdChvYmplY3QpICYmIChmaXJlYmFzZXMgPSBvYmplY3RbZmlyZWJhc2VLZXldKSkge1xyXG5cdFx0XHRyZXR1cm4gZmlyZWJhc2VzW3R5cGVdO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAdmFyIHN0cmluZ1xyXG4gKi9cclxuY29uc3QgZmlyZWJhc2VLZXkgPSAnPCByIGUgZiBsIGUgeCA+JztcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEZpcmVhYmxlIGZyb20gJy4vRmlyZWFibGUuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaGUgTGlzdGVuZXIgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRmlyZWFibGUge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBmdW5jdGlvblx0XHRoYW5kbGVyXHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHRwYXJhbXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGhhbmRsZXIsIHBhcmFtcyA9IHt9KSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcclxuXHRcdHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxzIHRoZSBvYnNlcnZlcidzIGhhbmRsZXIgZnVuY3Rpb25cclxuXHQgKiBvbiBtYXRjaGluZyB3aXRoIHRoZSBldmVudCdzIGZpZWxkcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBNdXRhdGlvbkV2ZW50XHRcdFx0IFx0ZXZ0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRmaXJlKGV2dCkge1xyXG5cdFx0aWYgKHRoaXMucGFyYW1zLnR5cGUgPT09IGV2dC50eXBlKSB7XHJcblx0XHRcdGV2dC5yZXNwb25zZSh0aGlzLmhhbmRsZXIuY2FsbCh0aGlzLnRhcmdldCwgZXZ0LmUpKTtcclxuXHRcdH1cclxuXHR9XHJcbn07IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEZpcmViYXNlIGZyb20gJy4vRmlyZWJhc2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaGUgTGlzdGVuZXJCYXNlIGNsYXNzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lckJhc2UgZXh0ZW5kcyBGaXJlYmFzZSB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogRmlyZXMgYWxsIG9ic2VydmVycyB3aXRoIHRoZSBnaXZlbiBldnQgKGNoYW5nZSkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gRXZlbnRcdFx0XHRcdGV2dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiBFdmVudFxyXG5cdCAqL1xyXG5cdGZpcmUoZXZ0KSB7XHJcblx0XHR0aGlzLmZpcmVhYmxlcy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcclxuXHRcdFx0aWYgKGV2dC5wcm9wYWdhdGlvblN0b3BwZWQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0bGlzdGVuZXIuZmlyZShldnQpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gZXZ0O1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdGRvY1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVGb3JUYXJnZXQob2JqZWN0LCBTdGF0aWMgPSBMaXN0ZW5lckJhc2UpIHtcclxuXHRcdHJldHVybiBzdXBlci5jcmVhdGVGb3JUYXJnZXQob2JqZWN0LCAnbGlzdGVuZXJzJywgU3RhdGljKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0Rm9yVGFyZ2V0KG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldEZvclRhcmdldChvYmplY3QsICdsaXN0ZW5lcnMnKTtcclxuXHR9XHJcbn07IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9ldmVuIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2V2ZW4uanMnO1xyXG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9FdmVudC5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBNdXRhdGlvbkV2ZW50IGNsYXNzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheXxvYmplY3RcdFx0dGFyZ2V0XHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHRcdGRldGFpbHNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHRhcmdldCwgZGV0YWlscyA9IHt9KSB7XHJcblx0XHRpZiAoZGV0YWlscy5kYXRhKSB7XHJcblx0XHRcdGRldGFpbHMuZmllbGRzID0gT2JqZWN0LmtleXMoZGV0YWlscy5kYXRhKTtcclxuXHRcdH1cclxuXHRcdHN1cGVyKHRhcmdldCwgZGV0YWlscyk7XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0aWYgKHRoaXMuc3JjRXZ0KSB7XHJcblx0XHRcdHRoaXMuZGF0YUV2ZW4gPSB0aGlzLnNyY0V2dC5kYXRhRXZlbjtcclxuXHRcdFx0dGhpcy5vcmlnaW5hdGluZ1RhcmdldCA9IHRoaXMuc3JjRXZ0Lm9yaWdpbmF0aW5nVGFyZ2V0O1xyXG5cdFx0XHR0aGlzLm9yaWdpbmF0aW5nVHlwZSA9IHRoaXMuc3JjRXZ0Lm9yaWdpbmF0aW5nVHlwZTtcclxuXHRcdFx0dGhpcy5vcmlnaW5hdGluZ0ZpZWxkcyA9IFtdO1xyXG5cdFx0XHR0aGlzLm9yaWdpbmF0aW5nRGF0YSA9IHt9O1xyXG5cdFx0XHR0aGlzLl9vcmlnaW5hdGluZ0RhdGEgPSB7fTtcclxuXHRcdFx0dmFyIGZpZWxkID0gdGhpcy5maWVsZHNbMF07XHJcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3JjRXZ0Lm9yaWdpbmF0aW5nRGF0YSkuZm9yRWFjaChwYXRoID0+IHtcclxuXHRcdFx0XHR2YXIgX3BhdGggPSBmaWVsZCArICcuJyArIHBhdGg7XHJcblx0XHRcdFx0dGhpcy5vcmlnaW5hdGluZ0ZpZWxkcy5wdXNoKF9wYXRoKTtcclxuXHRcdFx0XHR0aGlzLm9yaWdpbmF0aW5nRGF0YVtfcGF0aF0gPSB0aGlzLnNyY0V2dC5vcmlnaW5hdGluZ0RhdGFbcGF0aF07XHJcblx0XHRcdFx0dGhpcy5fb3JpZ2luYXRpbmdEYXRhW19wYXRoXSA9IHRoaXMuc3JjRXZ0Ll9vcmlnaW5hdGluZ0RhdGFbcGF0aF07XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLm9yaWdpbmF0aW5nQ3JlYXRlZCA9IHRoaXMuc3JjRXZ0Lm9yaWdpbmF0aW5nQ3JlYXRlZDtcclxuXHRcdFx0dGhpcy5vcmlnaW5hdGluZ0RlbGV0ZWQgPSB0aGlzLnNyY0V2dC5vcmlnaW5hdGluZ0RlbGV0ZWQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmRhdGFFdmVuID0gX2V2ZW4odGhpcy5kYXRhLCB0aGlzLl9kYXRhKTtcclxuXHRcdFx0dGhpcy5vcmlnaW5hdGluZ1RhcmdldCA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0XHR0aGlzLm9yaWdpbmF0aW5nVHlwZSA9IHRoaXMudHlwZTtcclxuXHRcdFx0dGhpcy5vcmlnaW5hdGluZ0ZpZWxkcyA9IHRoaXMuZmllbGRzO1xyXG5cdFx0XHR0aGlzLm9yaWdpbmF0aW5nRGF0YSA9IHRoaXMuZGF0YTtcclxuXHRcdFx0dGhpcy5fb3JpZ2luYXRpbmdEYXRhID0gdGhpcy5fZGF0YTtcclxuXHRcdFx0dGhpcy5vcmlnaW5hdGluZ0NyZWF0ZWQgPSB0aGlzLmNyZWF0ZWQ7XHJcblx0XHRcdHRoaXMub3JpZ2luYXRpbmdEZWxldGVkID0gdGhpcy5kZWxldGVkO1xyXG5cdFx0fVxyXG5cdH1cclxufTsiLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2Nyb3NzSm9pbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9jcm9zc0pvaW4uanMnO1xyXG5pbXBvcnQgX3B1c2hVbmlxdWUgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvcHVzaFVuaXF1ZS5qcyc7XHJcbmltcG9ydCBfYXJyRnJvbSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mcm9tLmpzJztcclxuaW1wb3J0IF9zdHJBZnRlciBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci9hZnRlci5qcyc7XHJcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1N0cmluZy5qcyc7XHJcbmltcG9ydCBfaXNBcnJheSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzQXJyYXkuanMnO1xyXG5pbXBvcnQgX2NvbW1vbnNHZXQgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovZ2V0LmpzJztcclxuaW1wb3J0IEZpcmVhYmxlIGZyb20gJy4vRmlyZWFibGUuanMnO1xyXG5pbXBvcnQgTXV0YXRpb25FdmVudCBmcm9tICcuL011dGF0aW9uRXZlbnQuanMnO1xyXG5pbXBvcnQgcmVmbGV4R2V0IGZyb20gJy4uL2dldC5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBPYnNlcnZlciBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEZpcmVhYmxlIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb25cdFx0aGFuZGxlclxyXG5cdCAqIEBwYXJhbSBzdHJpbmd8YXJyYXlcdGZpZWxkc1xyXG5cdCAqIEBwYXJhbSBvYmplY3RcdFx0cGFyYW1zXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihoYW5kbGVyLCBmaWVsZHMgPSBudWxsLCBwYXJhbXMgPSB7fSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XHJcblx0XHR0aGlzLmZpZWxkcyA9IGZpZWxkcztcclxuXHRcdHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdHRoaXMuZmllbGRzQXJyYXkgPSBfYXJyRnJvbSh0aGlzLmZpZWxkcyk7XHJcblx0XHR0aGlzLmlzRHluYW1pY0ZpZWxkID0gdGhpcy5maWVsZHNBcnJheS5maWx0ZXIoXHJcblx0XHRcdGZpZWxkID0+IGZpZWxkLmluZGV4T2YoJy4uJykgPiAtMSB8fCBmaWVsZC5zdGFydHNXaXRoKCcuJykgfHwgZmllbGQuZW5kc1dpdGgoJy4nKVxyXG5cdFx0KS5sZW5ndGg7XHJcblx0XHRpZiAodGhpcy5pc0R5bmFtaWNGaWVsZCAmJiB0aGlzLmZpZWxkc0FycmF5Lmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdPbmx5IG9uZSBcIkR5bmFtaWMgRmllbGRcIiBtdXN0IGJlIG9ic2VydmVkIGF0IGEgdGltZSEgXCInICsgdGhpcy5maWVsZHNBcnJheS5qb2luKCcsICcpICsgJ1wiIGhhdmUgYmVlbiBib3VuZCB0b2dldGhlci4nKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENhbGxzIHRoZSBvYnNlcnZlcidzIGhhbmRsZXIgZnVuY3Rpb25cclxuXHQgKiBvbiBtYXRjaGluZyB3aXRoIHRoZSBldmVudCdzIGZpZWxkcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBNdXRhdGlvbkV2ZW50XHRcdFx0IFx0ZXZ0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRmaXJlKGV2dCkge1xyXG5cdFx0aWYgKHRoaXMuZGlzY29ubmVjdGVkIHx8ICh0aGlzLnBhcmFtcy50eXBlICYmIHRoaXMucGFyYW1zLnR5cGUgIT09IGV2dC50eXBlKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAoZXZ0LmRhdGFFdmVuICYmIHRoaXMucGFyYW1zLmRpZmYgIT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlyZUNhbGxiYWNrKGV2dCwgZmllbGRzID0+IHtcclxuXHRcdFx0aWYgKGZpZWxkcykge1xyXG5cdFx0XHRcdC8vIENhbGwgbGlzdGVuZXIuLi5cclxuXHRcdFx0XHR2YXIgZGF0YSA9IFtdO1xyXG5cdFx0XHRcdHZhciBfZGF0YSA9IFtdO1xyXG5cdFx0XHRcdGlmICh0aGlzLnBhcmFtcy5kYXRhICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0ZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG5cdFx0XHRcdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0XHQvLyBUaGUgTkVXL09MRCB2YWx1ZXMgb2YgdGhlIGNoYW5nZSBvZiBmaWVsZCB3aGljaCBjb3VsZCBiZSBhIHBhdGhcclxuXHRcdFx0XHRcdFx0dmFyIGZpZWxkRGF0YSA9IGV2dC5vcmlnaW5hdGluZ0ZpZWxkcy5yZWR1Y2UoKGZpZWxkRGF0YSwgb3JpZ2luYXRpbmdGaWVsZCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdC8vIFNvIGZpZWxkIGlzIHRoZSBleGFjdCBvcmlnaW5hdGluZ0ZpZWxkIHBhdGg/XHJcblx0XHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gZXZ0Lm9yaWdpbmF0aW5nRGF0YVtvcmlnaW5hdGluZ0ZpZWxkXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgX3ZhbHVlID0gZXZ0Ll9vcmlnaW5hdGluZ0RhdGFbb3JpZ2luYXRpbmdGaWVsZF07XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFmaWVsZERhdGEgJiYgZmllbGQgPT09IG9yaWdpbmF0aW5nRmllbGQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBbdmFsdWUsIF92YWx1ZV07XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdC8vIEZpZWxkIG1hdGNoZXMsIGJ1dCBpcyBkZWVwZXIgdGhhbiwgb3JpZ2luYXRpbmdGaWVsZCBwYXRoP1xyXG5cdFx0XHRcdFx0XHRcdGlmICghZmllbGREYXRhICYmIChmaWVsZCArICcuJykuc3RhcnRzV2l0aCgob3JpZ2luYXRpbmdGaWVsZCArICcuJykpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgZmllbGRRdWVyeSA9IF9zdHJBZnRlcihmaWVsZCwgb3JpZ2luYXRpbmdGaWVsZCArICcuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gW1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBOb3RpY2Ugd2UncmUgdXNpbmcgX2NvbW1vbnNHZXQgdG8gZGlnIHRoZSBwYXRoXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGJ1dCB3aXRoIHJlZmxleEdldCBhcyB0cmFwIGZvciBcInJlYWN0aXZlIGdldHRpbmdcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfY29tbW9uc0dldCh2YWx1ZSwgZmllbGRRdWVyeS5zcGxpdCgnLicpLCB7Z2V0OnJlZmxleEdldH0pLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfY29tbW9uc0dldChfdmFsdWUsIGZpZWxkUXVlcnkuc3BsaXQoJy4nKSwge2dldDpyZWZsZXhHZXR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpZWxkRGF0YTtcclxuXHRcdFx0XHRcdFx0fSwgbnVsbCk7XHJcblx0XHRcdFx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0XHRcdGlmIChmaWVsZERhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHRkYXRhLnB1c2goZmllbGREYXRhLnNoaWZ0KCkpO1xyXG5cdFx0XHRcdFx0XHRcdF9kYXRhLnB1c2goZmllbGREYXRhLnNoaWZ0KCkpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBjdXJyZW50VmFsdWUgPSBfY29tbW9uc0dldChldnQudGFyZ2V0LCBfaXNTdHJpbmcoZmllbGQpID8gZmllbGQuc3BsaXQoJy4nKSA6IGZpZWxkLCB7Z2V0OnJlZmxleEdldH0pO1xyXG5cdFx0XHRcdFx0XHRcdGRhdGEucHVzaChjdXJyZW50VmFsdWUpO1xyXG5cdFx0XHRcdFx0XHRcdF9kYXRhLnB1c2goY3VycmVudFZhbHVlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBfaXNBcnJheSh0aGlzLmZpZWxkcykgLy8gTk9URTp3ZSdyZSBhc2tpbmcgdGhlIG9yaWdpbmFsIGZvcm1hdCFcclxuXHRcdFx0XHRcdD8gZXZ0LnJlc3BvbnNlKHRoaXMuaGFuZGxlcihkYXRhLCBfZGF0YSwgZXZ0KSlcclxuXHRcdFx0XHRcdDogZXZ0LnJlc3BvbnNlKHRoaXMuaGFuZGxlcihkYXRhWzBdLCBfZGF0YVswXSwgZXZ0KSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuXHRcdFx0dmFyIF9kYXRhID0ge307XHJcblx0XHRcdGV2dC5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XHJcblx0XHRcdFx0Ly8gUmVtZWJlciB0aGF0IGV2dC5vcmlnaW5hdGluZ0RhdGEgbWlnaHQgYWN0dWFsbHkgYmUgYnViYmxpbmdcclxuXHRcdFx0XHQvLyBpbiB3aGljaCBjYXNlIHdlIGRvbid0IGV4cGVjdCB0byBzZWUgZXZlbnROYW1lIGtleS5cclxuXHRcdFx0XHR2YXIgY3VycmVudFZhbHVlID0gZmllbGQgaW4gZXZ0LmRhdGEgXHJcblx0XHRcdFx0XHQ/IGV2dC5kYXRhW2ZpZWxkXSBcclxuXHRcdFx0XHRcdDogcmVmbGV4R2V0KGV2dC50YXJnZXQsIGZpZWxkKTtcclxuXHRcdFx0XHR2YXIgcHJldlZhbHVlID0gZmllbGQgaW4gZXZ0Ll9kYXRhXHJcblx0XHRcdFx0XHQ/IGV2dC5fZGF0YVtmaWVsZF0gXHJcblx0XHRcdFx0XHQ6IGN1cnJlbnRWYWx1ZTtcclxuXHRcdFx0XHRkYXRhW2ZpZWxkXSA9IGN1cnJlbnRWYWx1ZTtcclxuXHRcdFx0XHRfZGF0YVtmaWVsZF0gPSBwcmV2VmFsdWU7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvLyBDYWxsIGxpc3RlbmVyLi4uXHJcblx0XHRcdHJldHVybiBldnQucmVzcG9uc2UodGhpcy5oYW5kbGVyKGRhdGEsIF9kYXRhLCBldnQpKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZXMgYSBwcm9wb3NlZCBmaXJlIG9wZXJhdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBNdXRhdGlvbkV2ZW50XHRcdCBcdGV2dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0ZmlyZUNhbGxiYWNrKGV2dCwgY2FsbGJhY2spIHtcclxuXHRcdGlmICh0aGlzLmZpZWxkc0FycmF5Lmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgZHluYW1pY0ZpZWxkT3V0Y29tZXMgPSBbXTtcclxuXHRcdFx0dmFyIG1hdGNoZXMgPSB0aGlzLmZpZWxkc0FycmF5LmZpbHRlcigob2JzZXJ2ZWRGaWVsZCwgaSkgPT4ge1xyXG5cdFx0XHRcdG9ic2VydmVkRmllbGQgPSBfaXNTdHJpbmcob2JzZXJ2ZWRGaWVsZCkgXHJcblx0XHRcdFx0XHQ/IG9ic2VydmVkRmllbGQucmVwbGFjZSgvYC9nLCAnJylcclxuXHRcdFx0XHRcdDogb2JzZXJ2ZWRGaWVsZDtcclxuXHRcdFx0XHRkeW5hbWljRmllbGRPdXRjb21lc1tpXSA9IFtdO1xyXG5cdFx0XHRcdC8vIG9uZSBvYnNlcnZlZEZpZWxkIGNhbiB0dXJuIG91dCB0byBiZSB0d28gaWYgZHluYW1pY1xyXG5cdFx0XHRcdC8vIGFuZCBldnQub3JpZ2luYXRpbmdGaWVsZHMgaXMgbXVsdGlwbGVcclxuXHRcdFx0XHRyZXR1cm4gZXZ0Lm9yaWdpbmF0aW5nRmllbGRzLmZpbHRlcihpbnB1dE9yaWdpbmF0aW5nRmllbGQgPT4ge1xyXG5cdFx0XHRcdFx0dmFyIGlucHV0T3JpZ2luYXRpbmdGaWVsZFNwbGl0ID0gaW5wdXRPcmlnaW5hdGluZ0ZpZWxkLnNwbGl0KCcuJyk7XHJcblx0XHRcdFx0XHR2YXIgb2JzZXJ2ZWREeW5hbWljRmllbGRPdXRjb21lID0gdGhpcy5pc0R5bmFtaWNGaWVsZCBcclxuXHRcdFx0XHRcdFx0PyBvYnNlcnZlZEZpZWxkLnNwbGl0KCcuJykubWFwKChzZWcsIGspID0+IHNlZyB8fCBpbnB1dE9yaWdpbmF0aW5nRmllbGRTcGxpdFtrXSB8fCAnJykuam9pbignLicpXHJcblx0XHRcdFx0XHRcdDogb2JzZXJ2ZWRGaWVsZDtcclxuXHRcdFx0XHRcdF9wdXNoVW5pcXVlKGR5bmFtaWNGaWVsZE91dGNvbWVzW2ldLCBvYnNlcnZlZER5bmFtaWNGaWVsZE91dGNvbWUpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIChvYnNlcnZlZER5bmFtaWNGaWVsZE91dGNvbWUgPT09IGlucHV0T3JpZ2luYXRpbmdGaWVsZCAmJiAhZXZ0LnNyY0V2dFxyXG5cdFx0XHRcdFx0XHR8fCAodGhpcy5wYXJhbXMub2JzZXJ2ZVVwICE9PSBmYWxzZSAmJiAob2JzZXJ2ZWREeW5hbWljRmllbGRPdXRjb21lICsgJy4nKS5zdGFydHNXaXRoKGlucHV0T3JpZ2luYXRpbmdGaWVsZCArICcuJykpXHJcblx0XHRcdFx0XHRcdHx8ICh0aGlzLnBhcmFtcy5vYnNlcnZlRG93biAmJiAoaW5wdXRPcmlnaW5hdGluZ0ZpZWxkICsgJy4nKS5zdGFydHNXaXRoKG9ic2VydmVkRHluYW1pY0ZpZWxkT3V0Y29tZSArICcuJykpXHJcblx0XHRcdFx0XHQpICYmICghdGhpcy5pc0R5bmFtaWNGaWVsZCB8fCAhb2JzZXJ2ZWREeW5hbWljRmllbGRPdXRjb21lLnNwbGl0KCcuJykuZmlsdGVyKHNlZyA9PiAhc2VnKS5sZW5ndGgpO1xyXG5cdFx0XHRcdH0pLmxlbmd0aDtcclxuXHRcdFx0fSkubGVuZ3RoO1xyXG5cdFx0XHRpZiAobWF0Y2hlcykge1xyXG5cdFx0XHRcdF9jcm9zc0pvaW4oZHluYW1pY0ZpZWxkT3V0Y29tZXMpLmZvckVhY2goY2FsbGJhY2spO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKCFldnQuc3JjRXZ0IHx8IHRoaXMucGFyYW1zLm9ic2VydmVEb3duKSB7XHJcblx0XHRcdGNhbGxiYWNrKCk7XHJcblx0XHR9XHJcblx0fVxyXG59OyIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfZXZlbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9ldmVuLmpzJztcclxuaW1wb3J0IF9hcnJGcm9tIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2Zyb20uanMnO1xyXG5pbXBvcnQgX2ludGVyc2VjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9pbnRlcnNlY3QuanMnO1xyXG5pbXBvcnQgX2NvbmNhdFVuaXF1ZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9jb25jYXRVbmlxdWUuanMnO1xyXG5pbXBvcnQgX2V4Y2x1ZGUgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZXhjbHVkZS5qcyc7XHJcbmltcG9ydCBfaXNVbmRlZmluZWQgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1VuZGVmaW5lZC5qcyc7XHJcbmltcG9ydCBfaXNOdWxsIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNOdWxsLmpzJztcclxuaW1wb3J0IE11dGF0aW9uRXZlbnQgZnJvbSAnLi9NdXRhdGlvbkV2ZW50LmpzJztcclxuaW1wb3J0IEZpcmViYXNlIGZyb20gJy4vRmlyZWJhc2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaGUgUmVhY3RpdmUgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXJCYXNlIGV4dGVuZHMgRmlyZWJhc2Uge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIHRoZSBPYnNlcnZlciBpbnN0YW5jZXNcclxuXHQgKiB3aXRoIHRoZSBnaXZlbiBxdWVyeSBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHRcdHF1ZXJ5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0ZmluZEZpcmVhYmxlcyhxdWVyeSkge1xyXG5cdFx0cmV0dXJuIHN1cGVyLmZpbmRGaXJlYWJsZXMocXVlcnkpLmZpbHRlcihvYnNlcnZlciA9PiB7XHJcblx0XHRcdHJldHVybiBfaXNOdWxsKHF1ZXJ5LmZpZWxkcykgfHwgX2lzVW5kZWZpbmVkKHF1ZXJ5LmZpZWxkcykgfHwgX2V2ZW4oX2FyckZyb20ob2JzZXJ2ZXIuZmllbGRzKSwgX2FyckZyb20ocXVlcnkuZmllbGRzKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogRmlyZXMgYWxsIG9ic2VydmVycyB3aXRoIHRoZSBnaXZlbiBldnQgKGNoYW5nZSkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gRXZlbnRcdFx0XHRcdGV2dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiBFdmVudFxyXG5cdCAqL1xyXG5cdGZpcmUoZXZ0KSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50bHlGaXJpbmdFdmVudHMuZmlsdGVyKGUgPT4gZS50eXBlID09PSBldnQudHlwZSAmJiBlLmZpZWxkcyA9PT0gZXZ0LmZpZWxkcykubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBldnQ7XHJcblx0XHR9XHJcblx0XHR0aGlzLmN1cnJlbnRseUZpcmluZ0V2ZW50cy5wdXNoKGV2dCk7XHJcblx0XHR0aGlzLmZpcmVhYmxlcy5mb3JFYWNoKG9ic2VydmVyID0+IHtcclxuXHRcdFx0aWYgKGV2dC5wcm9wYWdhdGlvblN0b3BwZWQgfHwgKG9ic2VydmVyLnBhcmFtcy50eXBlICYmIG9ic2VydmVyLnBhcmFtcy50eXBlICE9PSBldnQudHlwZSkpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0b2JzZXJ2ZXIuZmlyZShldnQpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmN1cnJlbnRseUZpcmluZ0V2ZW50cy5wb3AoKTtcclxuXHRcdHJldHVybiBldnQ7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0ZG9jXHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUZvclRhcmdldChvYmplY3QpIHtcclxuXHRcdHJldHVybiBzdXBlci5jcmVhdGVGb3JUYXJnZXQob2JqZWN0LCAnb2JzZXJ2ZXJzJywgT2JzZXJ2ZXJCYXNlKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0Rm9yVGFyZ2V0KG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldEZvclRhcmdldChvYmplY3QsICdvYnNlcnZlcnMnKTtcclxuXHR9XHJcbn07IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEV2ZW50IGZyb20gJy4vRXZlbnQuanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaGUgUXVlcnlFdmVudCBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50IHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHRcdHRhcmdldFxyXG5cdCAqIEBwYXJhbSBvYmplY3RcdFx0XHRkZXRhaWxzXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih0YXJnZXQsIGRldGFpbHMgPSB7fSkge1xyXG5cdFx0c3VwZXIodGFyZ2V0LCBkZXRhaWxzKTtcclxuXHR9XHJcbn07IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9hcnJGcm9tIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2Zyb20uanMnO1xyXG5pbXBvcnQgUXVlcnlFdmVudCBmcm9tICcuL1F1ZXJ5RXZlbnQuanMnO1xyXG5pbXBvcnQgRmlyZWFibGUgZnJvbSAnLi9GaXJlYWJsZS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBUcmFwIGNsYXNzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRmlyZWFibGUge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBmdW5jdGlvblx0XHRoYW5kbGVyXHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHRwYXJhbXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGhhbmRsZXIsIHBhcmFtcyA9IHt9KSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcclxuXHRcdHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG5cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQ2FsbHMgdGhlIG9ic2VydmVyJ3MgaGFuZGxlciBmdW5jdGlvblxyXG5cdCAqIG9uIG1hdGNoaW5nIHdpdGggdGhlIGV2ZW50J3MgZmllbGRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIE11dGF0aW9uRXZlbnRcdFx0XHQgXHRldnRcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb25cdFx0XHRcdFx0bmV4dFxyXG5cdCAqIEBwYXJhbSBtaXhlZFx0XHRcdFx0XHQgXHRyZWNpZXZlZFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZmlyZShldnQsIG5leHQsIHJlY2lldmVkKSB7XHJcblx0XHRpZiAodGhpcy5kaXNjb25uZWN0ZWQgfHwgKHRoaXMucGFyYW1zLnR5cGUgJiYgdGhpcy5wYXJhbXMudHlwZSAhPT0gZXZ0LnR5cGUpKSB7XHJcblx0XHRcdHJldHVybiBuZXh0KC4uLl9hcnJGcm9tKGFyZ3VtZW50cykuc2xpY2UoMikpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuaGFuZGxlcihldnQsIHJlY2lldmVkLCBuZXh0KTtcclxuXHR9XHJcbn07IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9ldmVuIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2V2ZW4uanMnO1xyXG5pbXBvcnQgUXVlcnlFdmVudCBmcm9tICcuL1F1ZXJ5RXZlbnQuanMnO1xyXG5pbXBvcnQgRmlyZWJhc2UgZnJvbSAnLi9GaXJlYmFzZS5qcyc7XHJcbmltcG9ydCBUcmFwIGZyb20gJy4vVHJhcC5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBSZWFjdGl2ZSBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFwQmFzZSBleHRlbmRzIEZpcmViYXNlIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBGaXJlcyBhbGwgb2JzZXJ2ZXJzIHdpdGggdGhlIGdpdmVuIGV2dCAoY2hhbmdlKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBFdmVudFx0XHRcdFx0ZXZ0XHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uXHRcdFx0ZGVmYXVsdEhhbmRsZXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRmaXJlKGV2dCwgZGVmYXVsdEhhbmRsZXIgPSBudWxsKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50bHlGaXJpbmdFdmVudHMuZmlsdGVyKGUgPT4gZS50eXBlID09PSBldnQudHlwZSAmJiBlLnF1ZXJ5ID09PSBldnQucXVlcnkpLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdEhhbmRsZXIgPyBkZWZhdWx0SGFuZGxlcigpIDogdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jdXJyZW50bHlGaXJpbmdFdmVudHMucHVzaChldnQpO1xyXG5cdFx0Y29uc3QgbmV4dCA9IChpbmRleCwgLi4uX2FyZ3MpID0+IHtcclxuXHRcdFx0dmFyIHRyYXAgPSB0aGlzLmZpcmVhYmxlc1tpbmRleF07XHJcblx0XHRcdGlmICh0cmFwKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRyYXAuZmlyZShldnQsICguLi5hcmdzKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV4dChpbmRleCArIDEsIC4uLmFyZ3MpO1xyXG5cdFx0XHRcdH0vKm5leHQqLywgLi4uX2FyZ3MpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBkZWZhdWx0SGFuZGxlciA/IGRlZmF1bHRIYW5kbGVyKC4uLl9hcmdzKSA6IF9hcmdzWzBdO1xyXG5cdFx0fTtcclxuXHRcdHZhciB2YWx1ZSA9IG5leHQoMCk7XHJcblx0XHR0aGlzLmN1cnJlbnRseUZpcmluZ0V2ZW50cy5wb3AoKTtcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRm9yVGFyZ2V0KG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHN1cGVyLmNyZWF0ZUZvclRhcmdldChvYmplY3QsICd0cmFwcycsIFRyYXBCYXNlKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0Rm9yVGFyZ2V0KG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldEZvclRhcmdldChvYmplY3QsICd0cmFwcycpO1xyXG5cdH1cclxufTsiLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2dldFByb3BzIGZyb20gJy4vX2dldFByb3BzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBSdW5zIGEgXCJrZXlzXCIgcXVlcnkgb3BlcmF0aW9uIG9uIGEgdGFyZ2V0LlxyXG4gKiBGaXJlcyBhbnkgc3VjaCBxdWVyeSBvYnNlcnZlcnMgdGhhdCBtYXkgYmUgYm91bmQgdG8gdGFyZ2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHR0YXJnZXRcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFyZ2V0KSB7XHJcblx0cmV0dXJuIF9nZXRQcm9wcyhmYWxzZS8qb3duS2V5cyovLCAuLi5hcmd1bWVudHMpO1xyXG59XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfb2JqRnJvbSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9mcm9tLmpzJztcclxuaW1wb3J0IE11dGF0aW9uRXZlbnQgZnJvbSAnLi9pbnRlcm5hbC9NdXRhdGlvbkV2ZW50LmpzJztcclxuaW1wb3J0IE9ic2VydmVyQmFzZSBmcm9tICcuL2ludGVybmFsL09ic2VydmVyQmFzZS5qcyc7XHJcbmltcG9ydCBvYnNlcnZlIGZyb20gJy4vb2JzZXJ2ZS5qcyc7XHJcblxyXG4vKipcclxuICogQnViYmxlIGhlbHBlclxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHR0YXJnZXRcclxuICogQHBhcmFtIHN0cmluZ1x0XHRmaWVsZFxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHRvYmplY3RcclxuICpcclxuICogQHJldHVybiB2b2lkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YXJnZXQsIGZpZWxkLCBvYmplY3QpIHtcclxuXHR2YXIgZmlyZWJhc2U7XHJcblx0b2JzZXJ2ZShvYmplY3QsIChlbnRyaWVzLCBfZW50cmllcywgZSkgPT4ge1xyXG5cdFx0aWYgKGZpcmViYXNlID0gT2JzZXJ2ZXJCYXNlLmdldEZvclRhcmdldCh0YXJnZXQpKSB7XHJcblx0XHRcdHZhciBiYXNlID0gX29iakZyb20oZmllbGQsIG9iamVjdCk7XHJcblx0XHRcdHJldHVybiBmaXJlYmFzZS5maXJlKG5ldyBNdXRhdGlvbkV2ZW50KHRhcmdldCwge3R5cGU6ZS50eXBlLCBidWJibGluZzp0cnVlLCBkYXRhOmJhc2UsIF9kYXRhOmJhc2UsIHNyY0V2dDplfSkpO1xyXG5cdFx0fVxyXG5cdH0sIHtvYnNlcnZlRG93bjp0cnVlLCB0YWdzOlsnI2UtYnViYmxpbmcnLCBmaWVsZCwgdGFyZ2V0XX0pO1xyXG59XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzRnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBfZ2V0VHlwZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2dldFR5cGUuanMnO1xyXG5pbXBvcnQgT2JzZXJ2ZXJCYXNlIGZyb20gJy4vaW50ZXJuYWwvT2JzZXJ2ZXJCYXNlLmpzJztcclxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4vaW50ZXJuYWwvT2JzZXJ2ZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gb2JzZXJ2ZXIgdG8gYW4gb2JqZWN0J3MgZmlyZWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3RcdFx0XHRcdG9iamVjdFxyXG4gKiBAcGFyYW0gc3RyaW5nfGFycmF5fGZ1bmN0aW9uXHRcdGZpZWxkc1xyXG4gKiBAcGFyYW0gZnVuY3Rpb25cdFx0XHRcdFx0Y2FsbGJhY2tcclxuICogQHBhcmFtIG9iamVjdFx0XHRcdFx0XHRwYXJhbXNcclxuICpcclxuICogQHJldHVybiBPYnNlcnZlclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqZWN0LCBmaWVsZHMsIGNhbGxiYWNrID0gbnVsbCwgcGFyYW1zID0ge30pIHtcclxuXHRpZiAoIW9iamVjdCB8fCAhX2lzVHlwZU9iamVjdChvYmplY3QpKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ09iamVjdCBtdXN0IGJlIG9mIHR5cGUgb2JqZWN0IScpO1xyXG5cdH1cclxuXHRpZiAoX2lzRnVuY3Rpb24oZmllbGRzKSkge1xyXG5cdFx0cGFyYW1zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBjYWxsYmFjayA6IHt9O1xyXG5cdFx0Y2FsbGJhY2sgPSBmaWVsZHM7XHJcblx0XHRmaWVsZHMgPSBudWxsO1xyXG5cdH1cclxuXHRpZiAoIV9pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb247IFwiJyArIF9nZXRUeXBlKGNhbGxiYWNrKSArICdcIiBnaXZlbiEnKTtcclxuXHR9XHJcblx0dmFyIGZpcmViYXNlO1xyXG5cdGlmICghKGZpcmViYXNlID0gT2JzZXJ2ZXJCYXNlLmdldEZvclRhcmdldChvYmplY3QpKSkge1xyXG5cdFx0ZmlyZWJhc2UgPSBPYnNlcnZlckJhc2UuY3JlYXRlRm9yVGFyZ2V0KG9iamVjdCk7XHJcblx0fVxyXG5cdHJldHVybiBmaXJlYmFzZS5hZGRGaXJlYWJsZShuZXcgT2JzZXJ2ZXIoY2FsbGJhY2ssIGZpZWxkcywgcGFyYW1zKSk7XHJcbn1cclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IExpc3RlbmVyQmFzZSBmcm9tICcuL2ludGVybmFsL0xpc3RlbmVyQmFzZS5qcyc7XHJcblxyXG4vKipcclxuICogVW5iaW5kcyBsaXN0ZW5lcnMgZnJvbSBhbiBlbGVtZW50J3MgZXZlbnQgY29udHJvbGxlci5cclxuICpcclxuICogQHBhcmFtIGFycmF5fG9iamVjdCBcdFx0XHRcdG9iamVjdFxyXG4gKiBAcGFyYW0gc3RyaW5nXHRcdCBcdFx0XHR0eXBlXHJcbiAqIEBwYXJhbSBmdW5jdGlvblx0XHQgXHRcdFx0b3JpZ2luYWxDYWxsYmFja1xyXG4gKiBAcGFyYW0gb2JqZWN0XHRcdFx0XHRcdHBhcmFtc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHZvaWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgdHlwZSwgb3JpZ2luYWxDYWxsYmFjayA9IG51bGwsIHBhcmFtcyA9IHt9KSB7XHJcblx0dmFyIGZpcmViYXNlO1xyXG5cdGlmIChmaXJlYmFzZSA9IExpc3RlbmVyQmFzZS5nZXRGb3JUYXJnZXQob2JqZWN0KSkge1xyXG5cdFx0ZmlyZWJhc2UuZmluZEZpcmVhYmxlcyh7aGFuZGxlcjpvcmlnaW5hbENhbGxiYWNrLCB0eXBlLCBwYXJhbXN9KS5mb3JFYWNoKGxpc3RlbmVyID0+IHtcclxuXHRcdFx0ZmlyZWJhc2UucmVtb3ZlRmlyZWFibGUobGlzdGVuZXIpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59OyIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfbWVyZ2UgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9vYmovbWVyZ2UuanMnO1xyXG5pbXBvcnQgTGlzdGVuZXJCYXNlIGZyb20gJy4vaW50ZXJuYWwvTGlzdGVuZXJCYXNlLmpzJztcclxuaW1wb3J0IExpc3RlbmVyIGZyb20gJy4vaW50ZXJuYWwvTGlzdGVuZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIEJpbmRzIGxpc3RlbmVycyB0byBhbiBlbGVtZW50J3MgZXZlbnQgY29udHJvbGxlci5cclxuICpcclxuICogQHBhcmFtIGFycmF5fG9iamVjdCBcdFx0XHRcdG9iamVjdFxyXG4gKiBAcGFyYW0gc3RyaW5nXHRcdCBcdFx0XHR0eXBlXHJcbiAqIEBwYXJhbSBmdW5jdGlvblx0XHQgXHRcdFx0Y2FsbGJhY2tcclxuICogQHBhcmFtIG9iamVjdFx0XHRcdFx0XHRwYXJhbXNcclxuICpcclxuICogQHJldHVybiBvYmplY3RcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgdHlwZSwgY2FsbGJhY2ssIHBhcmFtcyA9IHt9KSB7XHJcblx0dmFyIGZpcmViYXNlO1xyXG5cdGlmICghKGZpcmViYXNlID0gTGlzdGVuZXJCYXNlLmdldEZvclRhcmdldChvYmplY3QpKSkge1xyXG5cdFx0ZmlyZWJhc2UgPSBMaXN0ZW5lckJhc2UuY3JlYXRlRm9yVGFyZ2V0KG9iamVjdCk7XHJcblx0fVxyXG5cdHJldHVybiBmaXJlYmFzZS5hZGRGaXJlYWJsZShuZXcgTGlzdGVuZXIoY2FsbGJhY2ssIF9tZXJnZShwYXJhbXMsIHt0eXBlfSkpKTtcclxufTsiLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2dldFByb3BzIGZyb20gJy4vX2dldFByb3BzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBSdW5zIGEgXCJvd25LZXlzXCIgcXVlcnkgb3BlcmF0aW9uIG9uIGEgdGFyZ2V0LlxyXG4gKiBGaXJlcyBhbnkgc3VjaCBxdWVyeSBvYnNlcnZlcnMgdGhhdCBtYXkgYmUgYm91bmQgdG8gdGFyZ2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHR0YXJnZXRcclxuICpcclxuICogQHJldHVybiBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFyZ2V0KSB7XHJcblx0cmV0dXJuIF9nZXRQcm9wcyh0cnVlLypvd25LZXlzKi8sIC4uLmFyZ3VtZW50cyk7XHJcbn1cclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9zZXRQcm9wIGZyb20gJy4vX3NldFByb3AuanMnO1xyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGVzIGEgXCJzZXRcIiBvcGVyYXRpb24gb24gYSB0YXJnZXQuXHJcbiAqIEZpcmVzIGFueSBvYnNlcnZlcnMgdGhhdCBtYXkgYmUgYm91bmQgdG8gdGFyZ2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHR0YXJnZXRcclxuICogQHBhcmFtIHN0cmluZ3xhcnJheVx0a2V5c09yUGF5bG9hZFxyXG4gKiBAcGFyYW0gbWl4ZWRcdFx0XHR2YWx1ZVxyXG4gKiBAcGFyYW0gYm9vbFx0XHRcdHJldHVybkV2ZW50XHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbHxFdmVudFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFyZ2V0LCBrZXlzT3JQYXlsb2FkLCB2YWx1ZSA9IG51bGwsIHJldHVybkV2ZW50ID0gZmFsc2UpIHtcclxuXHRyZXR1cm4gX3NldFByb3AoZmFsc2UvKmRlZmluZSovLCAuLi5hcmd1bWVudHMpO1xyXG59XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfY29weSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9jb3B5LmpzJztcclxuaW1wb3J0IF9tZXJnZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9tZXJnZS5qcyc7XHJcbmltcG9ydCBfdW5pcXVlIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL3VuaXF1ZS5qcyc7XHJcbmltcG9ydCBfaXNUeXBlT2JqZWN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBNdXRhdGlvbkV2ZW50IGZyb20gJy4vaW50ZXJuYWwvTXV0YXRpb25FdmVudC5qcyc7XHJcbmltcG9ydCBPYnNlcnZlckJhc2UgZnJvbSAnLi9pbnRlcm5hbC9PYnNlcnZlckJhc2UuanMnO1xyXG5pbXBvcnQgdW5saW5rIGZyb20gJy4vdW5saW5rLmpzJztcclxuaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rLmpzJztcclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIG9uIGEgdGFyZ2V0IGluIFwidHJhbnNhY3Rpb25cIiBtb2RlLlxyXG4gKiBGaXJlcyBhbnkgb2JzZXJ2ZXJzIHRoYXQgbWF5IGJlIGJvdW5kIHRvIHRhcmdldCBvbiByZWNvcmRlZCBjaGFuZ2VzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXlcdFx0XHR0YXJnZXRzXHJcbiAqIEBwYXJhbSBmdW5jdGlvblx0XHRjYWxsYmFja1xyXG4gKiBAcGFyYW0gYXJyYXlcdFx0XHRrZXlzXHJcbiAqIEBwYXJhbSBib29sXHRcdFx0cmV0dXJuRXZlbnRcclxuICpcclxuICogQHJldHVybiBhcnJheXxFdmVudFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFyZ2V0cywgY2FsbGJhY2ssIGtleXMgPSBbXSwgcmV0dXJuRXZlbnQgPSBmYWxzZSkge1xyXG5cdHZhciBjb250ZXh0ID0gdGFyZ2V0cy5tYXAoKHRhcmdldCwgaSkgPT4ge1xyXG5cdFx0aWYgKCF0YXJnZXQgfHwgIV9pc1R5cGVPYmplY3QodGFyZ2V0KSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBtdXN0IGJlIG9mIHR5cGUgb2JqZWN0IScpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dGFyZ2V0LFxyXG5cdFx0XHR0YXJnZXRDb3B5OiBfY29weSh0YXJnZXQsIGtleXMpLFxyXG5cdFx0XHRzZXREYXRhOiB7fSxcclxuXHRcdFx0X3NldERhdGE6IHt9LFxyXG5cdFx0XHRkZWxEYXRhOiB7fSwgXHJcblx0XHRcdF9kZWxEYXRhOiB7fSxcclxuXHRcdFx0Y3JlYXRlZDogW10sXHJcblx0XHRcdGRlbGV0ZWQ6IFtdLFxyXG5cdFx0fTtcclxuXHR9KTtcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR2YXIgcmVzdWx0ID0gY2FsbGJhY2soLi4udGFyZ2V0cyk7XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Y29udGV4dC5tYXAoY250eHQgPT4ge1xyXG5cdFx0dmFyIGluaXRpYWxLZXlzID0gT2JqZWN0LmtleXMoY250eHQudGFyZ2V0Q29weSk7XHJcblx0XHR2YXIgY3VycmVudEtleXMgPSBPYmplY3Qua2V5cyhjbnR4dC50YXJnZXQpO1xyXG5cdFx0dmFyIGNoYW5nZWRLZXlzID0gX3VuaXF1ZShpbml0aWFsS2V5cy5jb25jYXQoY3VycmVudEtleXMpKS5maWx0ZXIoa2V5ID0+IHtcclxuXHRcdFx0aWYgKChrZXlzLmxlbmd0aCAmJiAha2V5cy5pbmNsdWRlcyhrZXkpKSBcclxuXHRcdFx0fHwgKF9pc0FycmF5KGNudHh0LnRhcmdldCkgJiYgKGtleSA9PT0gJ2xlbmd0aCcgfHwga2V5ID09PSAnPCByIGUgZiBsIGUgeCA+JykpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghY3VycmVudEtleXMuaW5jbHVkZXMoa2V5KSkge1xyXG5cdFx0XHRcdGNudHh0Ll9kZWxEYXRhW2tleV0gPSBjbnR4dC50YXJnZXRDb3B5W2tleV07XHJcblx0XHRcdFx0Y250eHQuZGVsRGF0YVtrZXldID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdGNudHh0LmRlbGV0ZWQucHVzaChrZXkpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNudHh0Ll9zZXREYXRhW2tleV0gPSBjbnR4dC50YXJnZXRDb3B5W2tleV07XHJcblx0XHRcdFx0Y250eHQuc2V0RGF0YVtrZXldID0gY250eHQudGFyZ2V0W2tleV07XHJcblx0XHRcdFx0aWYgKCFpbml0aWFsS2V5cy5pbmNsdWRlcyhrZXkpKSB7XHJcblx0XHRcdFx0XHRjbnR4dC5jcmVhdGVkLnB1c2goa2V5KTtcclxuXHRcdFx0XHR9IFxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjbnR4dC50YXJnZXRDb3B5W2tleV0gIT09IGNudHh0LnRhcmdldFtrZXldKSB7XHJcblx0XHRcdFx0Ly8gVW5vYnNlcnZlIG91dGdvaW5nIHZhbHVlIGZvciBidWJibGluZ1xyXG5cdFx0XHRcdGlmIChjbnR4dC50YXJnZXRDb3B5W2tleV0gJiYgX2lzVHlwZU9iamVjdChjbnR4dC50YXJnZXRDb3B5W2tleV0pKSB7XHJcblx0XHRcdFx0XHR1bmxpbmsoY250eHQudGFyZ2V0LCBrZXksIGNudHh0LnRhcmdldENvcHlba2V5XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIE9ic2VydmUgaW5jb21pbmcgdmFsdWUgZm9yIGJ1YmJsaW5nXHJcblx0XHRcdFx0aWYgKGNudHh0LnRhcmdldFtrZXldICYmIF9pc1R5cGVPYmplY3QoY250eHQudGFyZ2V0W2tleV0pKSB7XHJcblx0XHRcdFx0XHRsaW5rKGNudHh0LnRhcmdldCwga2V5LCBjbnR4dC50YXJnZXRba2V5XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlbGV0ZSBjbnR4dC5zZXREYXRhW2tleV07XHJcblx0XHRcdGRlbGV0ZSBjbnR4dC5fc2V0RGF0YVtrZXldO1xyXG5cdFx0fSk7XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdHZhciBldnQsIG11dGF0aW9uQmFzZTtcclxuXHRcdGlmICgobXV0YXRpb25CYXNlID0gT2JzZXJ2ZXJCYXNlLmdldEZvclRhcmdldChjbnR4dC50YXJnZXQpKSB8fCByZXR1cm5FdmVudCkge1xyXG5cdFx0XHRldnQgPSBuZXcgTXV0YXRpb25FdmVudChjbnR4dC50YXJnZXQsIHtcclxuXHRcdFx0XHR0eXBlOid0cmFuc2FjdGlvbicsIFxyXG5cdFx0XHRcdGRhdGE6X21lcmdlKGNudHh0LnNldERhdGEsIGNudHh0LmRlbERhdGEpLFxyXG5cdFx0XHRcdF9kYXRhOl9tZXJnZShjbnR4dC5fc2V0RGF0YSwgY250eHQuX2RlbERhdGEpLFxyXG5cdFx0XHRcdGNyZWF0ZWQ6Y250eHQuY3JlYXRlZCxcclxuXHRcdFx0XHRkZWxldGVkOmNudHh0LmRlbGV0ZWRcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChtdXRhdGlvbkJhc2UpIHtcclxuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXMoY250eHQuZGVsRGF0YSkubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRldnQucmVzcG9uc2UobXV0YXRpb25CYXNlLmZpcmUoXHJcblx0XHRcdFx0XHRcdG5ldyBNdXRhdGlvbkV2ZW50KGNudHh0LnRhcmdldCwge3R5cGU6J2RlbCcsIGRhdGE6Y250eHQuZGVsRGF0YSwgX2RhdGE6Y250eHQuX2RlbERhdGEsIGRlbGV0ZWQ6Y250eHQuZGVsZXRlZH0pXHJcblx0XHRcdFx0XHQpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKGNudHh0LnNldERhdGEpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0ZXZ0LnJlc3BvbnNlKG11dGF0aW9uQmFzZS5maXJlKFxyXG5cdFx0XHRcdFx0XHRuZXcgTXV0YXRpb25FdmVudChjbnR4dC50YXJnZXQsIHt0eXBlOidzZXQnLCBkYXRhOmNudHh0LnNldERhdGEsIF9kYXRhOmNudHh0Ll9zZXREYXRhLCBjcmVhdGVkOmNudHh0LmNyZWF0ZWR9KVxyXG5cdFx0XHRcdFx0KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0dXJuRXZlbnQgPyBldnQgOiBjaGFuZ2VkS2V5cztcclxuXHR9KTtcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzRnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBfZ2V0VHlwZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2dldFR5cGUuanMnO1xyXG5pbXBvcnQgVHJhcEJhc2UgZnJvbSAnLi9pbnRlcm5hbC9UcmFwQmFzZS5qcyc7XHJcbmltcG9ydCBUcmFwIGZyb20gJy4vaW50ZXJuYWwvVHJhcC5qcyc7XHJcblxyXG4vKipcclxuICogQWRkcyBhIHRyYXAgdG8gYW4gb2JqZWN0J3MgZmlyZWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3RcdFx0XHRcdG9iamVjdFxyXG4gKiBAcGFyYW0gZnVuY3Rpb25cdFx0XHRcdFx0Y2FsbGJhY2tcclxuICogQHBhcmFtIG9iamVjdFx0XHRcdFx0XHRwYXJhbXNcclxuICpcclxuICogQHJldHVybiBUcmFwXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmplY3QsIGNhbGxiYWNrLCBwYXJhbXMgPSB7fSkge1xyXG5cdGlmICghb2JqZWN0IHx8ICFfaXNUeXBlT2JqZWN0KG9iamVjdCkpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignT2JqZWN0IG11c3QgYmUgb2YgdHlwZSBvYmplY3QhJyk7XHJcblx0fVxyXG5cdGlmICghX2lzRnVuY3Rpb24oY2FsbGJhY2spKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbjsgXCInICsgX2dldFR5cGUoY2FsbGJhY2spICsgJ1wiIGdpdmVuIScpO1xyXG5cdH1cclxuXHR2YXIgZmlyZWJhc2U7XHJcblx0aWYgKCEoZmlyZWJhc2UgPSBUcmFwQmFzZS5nZXRGb3JUYXJnZXQob2JqZWN0KSkpIHtcclxuXHRcdGZpcmViYXNlID0gVHJhcEJhc2UuY3JlYXRlRm9yVGFyZ2V0KG9iamVjdCk7XHJcblx0fVxyXG5cdHJldHVybiBmaXJlYmFzZS5hZGRGaXJlYWJsZShuZXcgVHJhcChjYWxsYmFjaywgcGFyYW1zKSk7XHJcbn1cclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9tZXJnZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9tZXJnZS5qcyc7XHJcbmltcG9ydCBMaXN0ZW5lckJhc2UgZnJvbSAnLi9pbnRlcm5hbC9MaXN0ZW5lckJhc2UuanMnO1xyXG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9pbnRlcm5hbC9FdmVudC5qcyc7XHJcblxyXG4vKipcclxuICogRmlyZXMgYW4gZXZlbnQgb24gYW4gb2JqZWN0J3MgbGlzdGVuZXJCYXNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0IFx0XHRcdG9iamVjdFxyXG4gKiBAcGFyYW0gc3RyaW5nICAgICAgICAgICAgICAgIHR5cGVcclxuICogQHBhcmFtIG9iamVjdCAgICAgICAgICAgICAgICBkYXRhXHJcbiAqXHJcbiAqIEByZXR1cm4gRXZlbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgdHlwZSwgZGF0YSA9IHt9KSB7XHJcblx0dmFyIGZpcmViYXNlO1xyXG5cdGlmIChmaXJlYmFzZSA9IExpc3RlbmVyQmFzZS5nZXRGb3JUYXJnZXQob2JqZWN0KSkge1xyXG5cdFx0cmV0dXJuIGZpcmViYXNlLmZpcmUobmV3IEV2ZW50KG9iamVjdCwgX21lcmdlKGRhdGEsIHt0eXBlfSkpKTtcclxuXHR9XHJcbn07IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IHVub2JzZXJ2ZSBmcm9tICcuL3Vub2JzZXJ2ZS5qcyc7XHJcblxyXG4vKipcclxuICogVW5idWJibGUgaGVscGVyXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3RcdHRhcmdldFxyXG4gKiBAcGFyYW0gc3RyaW5nXHRcdGZpZWxkXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3RcdG9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHZvaWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhcmdldCwgZmllbGQsIG9iamVjdCkge1xyXG5cdHVub2JzZXJ2ZShvYmplY3QsIG51bGwsIHt0YWdzOlsnI2UtYnViYmxpbmcnLCBmaWVsZCwgdGFyZ2V0XX0pO1xyXG59XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfaXNOdWxsIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNOdWxsLmpzJztcclxuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNGdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBfaXNUeXBlT2JqZWN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc1VuZGVmaW5lZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVW5kZWZpbmVkLmpzJztcclxuaW1wb3J0IE9ic2VydmVyQmFzZSBmcm9tICcuL2ludGVybmFsL09ic2VydmVyQmFzZS5qcyc7XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBvYnNlcnZlciBmcm9tIGFuIG9iamVjdCdzIGZpcmViYXNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXl8b2JqZWN0XHRcdFx0XHRvYmplY3RcclxuICogQHBhcmFtIHN0cmluZ3xhcnJheXxmdW5jdGlvblx0XHRmaWVsZHNcclxuICogQHBhcmFtIGZ1bmN0aW9uXHRcdFx0XHRcdG9yaWdpbmFsQ2FsbGJhY2tcclxuICogQHBhcmFtIG9iamVjdFx0XHRcdFx0XHRwYXJhbXNcclxuICpcclxuICogQHJldHVybiB2b2lkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmplY3QsIGZpZWxkcywgb3JpZ2luYWxDYWxsYmFjayA9IG51bGwsIHBhcmFtcyA9IHt9KSB7XHJcblx0aWYgKCFvYmplY3QgfHwgIV9pc1R5cGVPYmplY3Qob2JqZWN0KSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdPYmplY3QgbXVzdCBiZSBvZiB0eXBlIG9iamVjdCEnKTtcclxuXHR9XHJcblx0aWYgKF9pc0Z1bmN0aW9uKGZpZWxkcykgfHwgX2lzTnVsbChmaWVsZHMpIHx8IF9pc1VuZGVmaW5lZChmaWVsZHMpKSB7XHJcblx0XHRwYXJhbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IG9yaWdpbmFsQ2FsbGJhY2sgOiB7fTtcclxuXHRcdG9yaWdpbmFsQ2FsbGJhY2sgPSBmaWVsZHM7XHJcblx0XHRmaWVsZHMgPSBudWxsO1xyXG5cdH1cclxuXHR2YXIgZmlyZWJhc2U7XHJcblx0aWYgKGZpcmViYXNlID0gT2JzZXJ2ZXJCYXNlLmdldEZvclRhcmdldChvYmplY3QpKSB7XHJcblx0XHRmaXJlYmFzZS5maW5kRmlyZWFibGVzKHtoYW5kbGVyOm9yaWdpbmFsQ2FsbGJhY2ssIGZpZWxkcywgcGFyYW1zfSkuZm9yRWFjaChvYnNlcnZlciA9PiB7XHJcblx0XHRcdGZpcmViYXNlLnJlbW92ZUZpcmVhYmxlKG9ic2VydmVyKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzVHlwZU9iamVjdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzVHlwZU9iamVjdC5qcyc7XHJcbmltcG9ydCBPYnNlcnZlckJhc2UgZnJvbSAnLi9pbnRlcm5hbC9PYnNlcnZlckJhc2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYSB0cmFwIGZyb20gYW4gb2JqZWN0J3MgZmlyZWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXxvYmplY3RcdFx0XHRcdG9iamVjdFxyXG4gKiBAcGFyYW0gZnVuY3Rpb25cdFx0XHRcdFx0b3JpZ2luYWxDYWxsYmFja1xyXG4gKiBAcGFyYW0gb2JqZWN0XHRcdFx0XHRcdHBhcmFtc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHZvaWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgb3JpZ2luYWxDYWxsYmFjayA9IG51bGwsIHBhcmFtcyA9IHt9KSB7XHJcblx0aWYgKCFvYmplY3QgfHwgIV9pc1R5cGVPYmplY3Qob2JqZWN0KSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdPYmplY3QgbXVzdCBiZSBvZiB0eXBlIG9iamVjdCEnKTtcclxuXHR9XHJcblx0dmFyIGZpcmViYXNlO1xyXG5cdGlmIChmaXJlYmFzZSA9IE9ic2VydmVyQmFzZS5nZXRGb3JUYXJnZXQob2JqZWN0KSkge1xyXG5cdFx0ZmlyZWJhc2UuZmluZEZpcmVhYmxlcyh7aGFuZGxlcjpvcmlnaW5hbENhbGxiYWNrLCBwYXJhbXN9KS5mb3JFYWNoKHRyYXAgPT4ge1xyXG5cdFx0XHRmaXJlYmFzZS5yZW1vdmVGaXJlYWJsZSh0cmFwKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgSnNlbiwge0NvbnRleHRzfSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9qc2VuJztcclxuaW1wb3J0IFJlZmxleCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9yZWZsZXgnO1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZnJvbS5qcyc7XHJcbmltcG9ydCBfaXNUeXBlT2JqZWN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNUeXBlT2JqZWN0LmpzJztcclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1N0cmluZy5qcyc7XHJcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzRnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgX2lzTnVtZXJpYyBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzTnVtZXJpYy5qcyc7XHJcbmltcG9ydCBfdW5pcXVlIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL3VuaXF1ZS5qcyc7XHJcbmltcG9ydCBfZm9sbG93aW5nIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2ZvbGxvd2luZy5qcyc7XHJcbmltcG9ydCBfYmVmb3JlIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL2JlZm9yZS5qcyc7XHJcbmltcG9ydCBfYmVmb3JlTGFzdCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci9iZWZvcmVMYXN0LmpzJztcclxuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi9jb3JlL2NyZWF0ZUVsZW1lbnQuanMnO1xyXG5pbXBvcnQgZGVmaW5lQnVuZGxlRWxlbWVudHMgZnJvbSAnLi9jb21wb3NpbmcvZGVmaW5lQnVuZGxlRWxlbWVudHMuanMnO1xyXG5pbXBvcnQgZGVmaW5lSW1wb3J0RWxlbWVudHMgZnJvbSAnLi9jb21wb3NpbmcvZGVmaW5lSW1wb3J0RWxlbWVudHMuanMnO1xyXG5pbXBvcnQgY3JlYXRlQnVuZGxlTWF0cml4IGZyb20gJy4vY29tcG9zaW5nL2NyZWF0ZUJ1bmRsZU1hdHJpeC5qcyc7XHJcbmltcG9ydCBwYXJzZU5hbWVzcGFjZSBmcm9tICcuL2NvbXBvc2luZy9wYXJzZU5hbWVzcGFjZS5qcyc7XHJcbmltcG9ydCByZWNvbXBvc2UgZnJvbSAnLi9jb21wb3NpbmcvcmVjb21wb3NlLmpzJztcclxuaW1wb3J0IERpcmVjdGl2ZXMgZnJvbSAnLi9EaXJlY3RpdmVzLmpzJztcclxuaW1wb3J0IENvcmUgZnJvbSAnLi9jb3JlL0NvcmUuanMnO1xyXG5pbXBvcnQgZ2xvYmFsUGFyYW1zIGZyb20gJy4vcGFyYW1zLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogVGhlIENodG1sIGNsYXNzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2h0bWwgZXh0ZW5kcyBDb3JlIHtcclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihlbCwgcGFyYW1zID0ge30pIHtcclxuXHRcdHN1cGVyKGVsLCBwYXJhbXMpO1xyXG5cclxuXHRcdC8vIENyZWF0ZSB0aGUgZmFjdG9yeSB1c2VkIGluIENvcmVcclxuXHRcdHRoaXMucGFyYW1zLmZhY3RvcnkgPSB0aGlzLmNvbnN0cnVjdG9yLmZyb207XHJcblx0XHRcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gQXV0by1pbXBvcnRlZCBlbGVtZW50c1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHR0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ltcG9ydGVkJywgZSA9PiB7XHJcblx0XHRcdHRoaXMucGFyYW1zLmZhY3RvcnkoZS50YXJnZXQpO1xyXG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tXHJcblx0XHQvLyBOQU1FU1BBQ0VcclxuXHRcdC8vIC0tLS0tLS0tLS0tLVxyXG5cdFx0XHJcblx0XHRjb25zdCBuYW1lc3BhY2VQYXJzZSA9IHBhcnNlTmFtZXNwYWNlKGVsLmdldEF0dHJpYnV0ZShnbG9iYWxQYXJhbXMuYXR0ck1hcC5uYW1lc3BhY2UpIHx8ICcnKTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbmFtZXNwYWNlJywge3ZhbHVlOm5hbWVzcGFjZVBhcnNlLm5hbWVzcGFjZSwgZW51bWVyYWJsZTp0cnVlLH0pO1xyXG5cdFx0XHJcblx0XHQvLyAtLS0tLS0tLS0tLS1cclxuXHRcdC8vIE1JUlJPUlxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tXHJcblx0XHRcclxuXHRcdFJlZmxleC5pbml0KHRoaXMsIGdsb2JhbFBhcmFtcy5iaW5kaW5nUHJvcGVydHkpO1xyXG5cdFx0Ly8gU2V0dXAgbWlycm9yXHJcblx0XHRSZWZsZXgub2JzZXJ2ZSh0aGlzLCBnbG9iYWxQYXJhbXMuYmluZGluZ1Byb3BlcnR5LCAoZGF0YSwgX2RhdGEsIGUpID0+IHtcclxuXHRcdFx0aWYgKG5hbWVzcGFjZVBhcnNlLnN1Ym5hbWVzcGFjZSkge1xyXG5cdFx0XHRcdGlmIChfaXNUeXBlT2JqZWN0KGRhdGEpICYmIGRhdGEpIHtcclxuXHRcdFx0XHRcdC8vIE1pcnJvclxyXG5cdFx0XHRcdFx0UmVmbGV4Lm9ic2VydmUoZGF0YSwgY2hhbmdlcyA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnBvcHVsYXRlKGRhdGEsIG5hbWVzcGFjZVBhcnNlLnN1Ym5hbWVzcGFjZSwgZ2xvYmFsUGFyYW1zLnJlbW9kZWxDYWxsYmFjayk7XHJcblx0XHRcdFx0XHR9LCB7dGFnczpbJyNtaXJyb3InLCB0aGlzXX0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoX2lzVHlwZU9iamVjdChfZGF0YSkgJiYgX2RhdGEpIHtcclxuXHRcdFx0XHRcdC8vIFVubWlycm9yXHJcblx0XHRcdFx0XHRSZWZsZXgudW5vYnNlcnZlKF9kYXRhLCBudWxsLCBudWxsLCB7dGFnczpbJyNtaXJyb3InLCB0aGlzXX0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBJbml0aWFsIFN5bmMuLi5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5wb3B1bGF0ZShkYXRhIHx8IHt9LCBuYW1lc3BhY2VQYXJzZS5zdWJuYW1lc3BhY2UsIGdsb2JhbFBhcmFtcy5yZW1vZGVsQ2FsbGJhY2spO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tXHJcblx0XHQvLyBESVJFQ1RJVkVTXHJcblx0XHQvLyAtLS0tLS0tLS0tLS1cclxuXHRcdFxyXG5cdFx0Y29uc3QgZGlyZWN0aXZlcyA9IFtdO1xyXG5cdFx0UmVmbGV4LmRlZmluZVByb3BlcnR5KHRoaXMsICdkaXJlY3RpdmVzJywge3ZhbHVlOmRpcmVjdGl2ZXMsIGVudW1lcmFibGU6dHJ1ZSx9KTtcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHQvLyBldmFsdWF0aW9uQ29udGV4dCB3aWxsIGJlIFwidGhpc1wiIGFzIG1haW4gY29udGV4dCwgYW5kIHBhcmFtcy5lbnYgYXMgc3VwZXIgY29udGV4dFxyXG5cdFx0dmFyIGxvY2FsQ29udGV4dCA9IHt9O1xyXG5cdFx0dmFyIHN1cGVyQ29udGV4dCA9IHRoaXMucGFyYW1zLmVudjtcclxuXHRcdHZhciBldmFsdWF0aW9uQ29udGV4dCA9IG5ldyBDb250ZXh0cyh0aGlzLCBzdXBlckNvbnRleHQsIGxvY2FsQ29udGV4dCk7XHJcblx0XHQvLyBEZXNjZW5kYW50cyB3aWxsIHJlY2lldmUgbXkgbG9jYWxDb250ZXh0IGFuZCBzdXBlckNvbnRleHRcclxuXHRcdHRoaXMuZGVzY2VuZGFudFBhcmFtcy5lbnYgPSBuZXcgQ29udGV4dHMobG9jYWxDb250ZXh0LCBzdXBlckNvbnRleHQpO1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdC8vIFN0cmluZ2lmaWVzIEpTRU4gdmFyc1xyXG5cdFx0dmFyIHN0cmluZ2lmeUVhY2ggPSBsaXN0ID0+IF91bmlxdWUobGlzdC5tYXAoZXhwciA9PiBfYmVmb3JlKF9iZWZvcmUoZXhwci50b1N0cmluZygpLCAnWycpLCAnKCcpKSk7XHJcblx0XHQvLyBXZSBoYW5kbGUgZGlyZWN0aXZlcyBhcyB0aGV5IG1ha2UgZW50cnlcclxuXHRcdFJlZmxleC5vYnNlcnZlKHRoaXMuZGlyZWN0aXZlcywgKGVudHJpZXMsIGV4aXRzLCBlKSA9PiB7XHJcblx0XHRcdE9iamVjdC5rZXlzKGVudHJpZXMpLmZvckVhY2goayA9PiB7XHJcblx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0Ly8gVW5iaW5kIGV4aXRzXHJcblx0XHRcdFx0aWYgKGV4aXRzW2tdKSB7XHJcblx0XHRcdFx0XHRSZWZsZXgudW5vYnNlcnZlKHRoaXMsIG51bGwsIG51bGwsIHt0YWdzOlsnI2RpcmVjdGl2ZScsIGV4aXRzW2tdXSx9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0Ly8gQmluZCBlbnRyaWVzXHJcblx0XHRcdFx0aWYgKGVudHJpZXNba10pIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmF1dG9FdmFsICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRlbnRyaWVzW2tdLmV2YWwoZXZhbHVhdGlvbkNvbnRleHQsIFJlZmxleCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRSZWZsZXgub2JzZXJ2ZSh0aGlzLCBzdHJpbmdpZnlFYWNoKGVudHJpZXNba10ubWV0YS52YXJzKSwgKG5ld1N0YXRlLCBvbGRTdGF0ZSwgZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR2YXIgZXZhbFJldHVybiA9IGVudHJpZXNba10uZXZhbChldmFsdWF0aW9uQ29udGV4dCwgUmVmbGV4KTtcclxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlIHJlc3VsdCBvZiB0aGlzIGV2YWx1YXRpb24gaXMgZmFsc2UsXHJcblx0XHRcdFx0XHRcdC8vIGUuc3RvcFByb3BhZ2F0aW9uIHdpbGwgYmUgY2FsbGVkIGFuZCBzdWJzZXF1ZW50IGV4cHJlc3Npb25zXHJcblx0XHRcdFx0XHRcdC8vIHdpbGwgbm90IGJlIGV2YWx1YXRlZC4gU28gd2UgbXVzdCBub3QgYWxsb3cgZmFsc2UgdG8gYmUgcmV0dXJuZWQuXHJcblx0XHRcdFx0XHRcdC8vIEFsbCBleHByZXNzaW9ucyBhcmUgbWVhbnQgdG8gYmUgZXZhbHVhdGVkIGluIHBhcmFsbGVsLCBpbmRlcGVuZGVudCBvZiBlYWNoIG90aGVyLlxyXG5cdFx0XHRcdFx0XHRpZiAoZXZhbFJldHVybiAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZXZhbFJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSwge2RhdGE6IGZhbHNlLCB0YWdzOlsnI2RpcmVjdGl2ZScsIGVudHJpZXNba11dfSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YUJsb2NrU2NyaXB0ID0gX2FyckZyb20oZWwuY2hpbGRyZW4pLmZpbHRlcihub2RlID0+IG5vZGUubWF0Y2hlcyhnbG9iYWxQYXJhbXMudGFnTWFwLmpzZW4pKVswXSkge1xyXG5cdFx0XHRcdHZhciBkaXJlY3RpdmVzUHVzaCA9IFJlZmxleC5nZXQodGhpcy5kaXJlY3RpdmVzLCAncHVzaCcpO1xyXG5cdFx0XHRcdERpcmVjdGl2ZXMucGFyc2UoKHRoaXMuZGF0YUJsb2NrU2NyaXB0LnRleHRDb250ZW50IHx8ICcnKS50cmltKCkpLmZpbHRlcigpLmZvckVhY2goZGlyZWN0aXZlID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuYXV0b0V2YWwgPSBnbG9iYWxQYXJhbXMuaW5pdGlhbFJlbmRlcmluZztcclxuXHRcdFx0XHRcdGRpcmVjdGl2ZXNQdXNoKGRpcmVjdGl2ZSk7XHJcblx0XHRcdFx0XHR0aGlzLmF1dG9FdmFsID0gdHJ1ZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS1cclxuXHRcdFx0aWYgKHRoaXMuZGF0YUJsb2NrU2NyaXB0ICYmIGdsb2JhbFBhcmFtcy5oaWRlRGF0YUJsb2NrU2NyaXB0KSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhQmxvY2tTY3JpcHQucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIDApO1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tXHJcblx0XHRcclxuXHRcdC8vIENIVE1MIGlzIHNpbmdsZXRvblxyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGVsLCAnPCBjIGggdCBtIGwgPicsIHt2YWx1ZTogdGhpc30pO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBBbGlhcyBvZiBzdXBlci5nZXROb2RlcygpLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyBcdFx0bm9kZU5hbWVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gQ2h0bWxcclxuXHQgKi9cclxuXHRnZXQobm9kZU5hbWUpIHtcclxuXHRcdHJldHVybiBzdXBlci5nZXROb2Rlcyhub2RlTmFtZSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGEgKHJlYWN0aXZlKSBjb250ZXh0IG9iamVjdCBvciBsb2dpY2FsIG9iamVjdCB0byB0aGUgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IFx0XHRjb250ZXh0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEV2ZW50XHJcblx0ICovXHJcblx0YmluZChjb250ZXh0KSB7XHJcblx0XHRpZiAoIWdsb2JhbFBhcmFtcy5iaW5kaW5nUHJvcGVydHkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEYXRhIGtleSBoYXMgbm90IGJlZW4gc2V0IScpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFJlZmxleC5zZXQodGhpcywgZ2xvYmFsUGFyYW1zLmJpbmRpbmdQcm9wZXJ0eSwgY29udGV4dCk7XHJcblx0fVx0XHJcblx0LyoqXHJcblx0ICogQ2xlYXJzIHRoZSBpbnN0YW5jZSBvZiBpdHMgY29udGV4dC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gRXZlbnRcclxuXHQgKi9cclxuXHR1bmJpbmQoKSB7XHJcblx0XHRpZiAoIWdsb2JhbFBhcmFtcy5iaW5kaW5nUHJvcGVydHkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEYXRhIGtleSBoYXMgbm90IGJlZW4gc2V0IScpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFJlZmxleC5zZXQodGhpcywgZ2xvYmFsUGFyYW1zLmJpbmRpbmdQcm9wZXJ0eSwgbnVsbCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGEgKHJlYWN0aXZlKSBsaXN0IGNvbnRleHQgdG8gdGhlIGluc3RhbmNlLlxyXG5cdCAqIENoaWxkbm9kZXMgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQvcmVtb3ZlZCBwZXIga2V5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IFx0XHRzcmNNb2RlbFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgXHRcdHN1Ym5hbWVzcGFjZVxyXG5cdCAqIEBwYXJhbSBmdW5jdGlvbiBcdFx0cmVtb2RlbENhbGxiYWNrXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIFJlZmxleC5NdXRhdGlvbkV2ZW50XHJcblx0ICovXHJcblx0cG9wdWxhdGUoc3JjTW9kZWwsIHN1Ym5hbWVzcGFjZSwgcmVtb2RlbENhbGxiYWNrID0gbnVsbCkge1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS1cclxuXHRcdHZhciBub2RlTmFtZXNwYWNlQXJyYXkgPSBzdWJuYW1lc3BhY2Uuc3BsaXQoJy8vJyk7XHJcblx0XHQvLyBDcmVhdGUgYSBuYW1lc3BhY2UgaGFzaC4uLlxyXG5cdFx0aWYgKG5vZGVOYW1lc3BhY2VBcnJheVswXS5pbmRleE9mKCdbJykgPiAtMSkge1xyXG5cdFx0XHRub2RlTmFtZXNwYWNlQXJyYXlbMF0gPSAnXCInICsgbm9kZU5hbWVzcGFjZUFycmF5WzBdLnJlcGxhY2UoL1xcWy9nLCAnXCIgKyAnKS5yZXBsYWNlKC9cXF0vZywgJyArIFwiJykgKyAnXCInO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHNyY01vZGVsS2V5cyA9IFJlZmxleC5rZXlzKHNyY01vZGVsKTtcclxuXHRcdHZhciBjdXJyZW50Tm9kZU5hbWVzID0gUmVmbGV4LmtleXModGhpc1tnbG9iYWxQYXJhbXMudHJlZVByb3BlcnR5XSk7XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLVxyXG5cdFx0dmFyIGUgPSBuZXcgUmVmbGV4Lk11dGF0aW9uRXZlbnQodGhpcy5lbCwge3R5cGU6J3JlbW9kZWxsaW5nJ30pO1xyXG5cdFx0X3VuaXF1ZShzcmNNb2RlbEtleXMuY29uY2F0KGN1cnJlbnROb2RlTmFtZXMpKS5mb3JFYWNoKG5vZGVOYW1lID0+IHtcclxuXHRcdFx0bm9kZU5hbWUgPSBfaXNOdW1lcmljKG5vZGVOYW1lKSA/IHBhcnNlSW50KG5vZGVOYW1lKSA6IG5vZGVOYW1lO1xyXG5cdFx0XHR2YXIgZXhpc3RpbmdOb2RlID0gdGhpcy5nZXROb2Rlcyhub2RlTmFtZSk7XHJcblx0XHRcdHZhciByc3BucztcclxuXHRcdFx0aWYgKFJlZmxleC5oYXMoc3JjTW9kZWwsIG5vZGVOYW1lKSkge1xyXG5cdFx0XHRcdHZhciBzcmNJdGVtID0gUmVmbGV4LmdldChzcmNNb2RlbCwgbm9kZU5hbWUpLCBpc05ld05vZGUgPSBmYWxzZTtcclxuXHRcdFx0XHRpZiAoIWV4aXN0aW5nTm9kZSkge1xyXG5cdFx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdHZhciBub2RlTmFtZXNwYWNlQXJyYXlDb3B5ID0gbm9kZU5hbWVzcGFjZUFycmF5LnNsaWNlKCk7XHJcblx0XHRcdFx0XHRpZiAobm9kZU5hbWVzcGFjZUFycmF5Q29weVswXS5pbmRleE9mKCdcIicpID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0bm9kZU5hbWVzcGFjZUFycmF5Q29weVswXSA9IEpzZW4ucGFyc2Uobm9kZU5hbWVzcGFjZUFycmF5Q29weVswXSkuZXZhbChzcmNJdGVtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG5vZGVOYW1lc3BhY2VBcnJheUNvcHlbMF0gKz0gJy8nICsgbm9kZU5hbWU7XHJcblx0XHRcdFx0XHR2YXIgbm9kZUVsID0gQ2h0bWwuaW1wb3J0KG5vZGVOYW1lc3BhY2VBcnJheUNvcHkuam9pbignLy8nKSk7XHJcblx0XHRcdFx0XHQvLyAtLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0aWYgKG5vZGVFbCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgZm9sbG93aW5nID0gX2ZvbGxvd2luZyhzcmNNb2RlbEtleXMsIG5vZGVOYW1lICsgJycvKm51bWVyaWMgbm9kZU5hbWUgbmVlZHMgdGhpcyovLCB0cnVlLypsZW5ndGgqLylcclxuXHRcdFx0XHRcdFx0XHQucmVkdWNlKChjbG9zZXN0LCBfbm9kZU5hbWUpID0+IGNsb3Nlc3QgfHwgdGhpcy5nZXROb2Rlcyhfbm9kZU5hbWUpLCBudWxsKTtcclxuXHRcdFx0XHRcdFx0aWYgKGZvbGxvd2luZykge1xyXG5cdFx0XHRcdFx0XHRcdGZvbGxvd2luZy5lbC5iZWZvcmUobm9kZUVsKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmVsLmFwcGVuZChub2RlRWwpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGV4aXN0aW5nTm9kZSA9IHRoaXMuYWRkTm9kZShub2RlTmFtZSwgbm9kZUVsKTtcclxuXHRcdFx0XHRcdFx0aXNOZXdOb2RlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGV4aXN0aW5nTm9kZSkge1xyXG5cdFx0XHRcdFx0aWYgKF9pc0Z1bmN0aW9uKHJlbW9kZWxDYWxsYmFjaykpIHtcclxuXHRcdFx0XHRcdFx0cnNwbnMgPSByZW1vZGVsQ2FsbGJhY2soZXhpc3RpbmdOb2RlLCBzcmNJdGVtLCBub2RlTmFtZSwgaXNOZXdOb2RlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJzcG5zID0gZXhpc3RpbmdOb2RlLmJpbmQoc3JjSXRlbSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKGV4aXN0aW5nTm9kZSkge1xyXG5cdFx0XHRcdGlmIChfaXNGdW5jdGlvbihyZW1vZGVsQ2FsbGJhY2spKSB7XHJcblx0XHRcdFx0XHRyc3BucyA9IHJlbW9kZWxDYWxsYmFjayhleGlzdGluZ05vZGUsIG5vZGVOYW1lKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cnNwbnMgPSBleGlzdGluZ05vZGUudW5iaW5kKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciByZW1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHRleGlzdGluZ05vZGUuZGVzdHJveSgpO1xyXG5cdFx0XHRcdFx0ZXhpc3RpbmdOb2RlLmVsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0aWYgKHJzcG5zIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG5cdFx0XHRcdFx0cnNwbnMudGhlbihyZW1vdmUpLmNhdGNoKHJlbW92ZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlLnJlc3BvbnNlKHJzcG5zKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGU7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEZyZWVzIHRoZSBpbnN0YW5jZSBvZiBvYnNlcnZlZCBkaXJlY3RpdmVzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZGVzdHJveSgpIHtcclxuXHRcdHRoaXMuZGlyZWN0aXZlcy5mb3JFYWNoKFxyXG5cdFx0XHRiaW5kaW5nID0+IFJlZmxleC51bm9ic2VydmUodGhpcywgbnVsbCwgbnVsbCwge3RhZ3M6WycjZGlyZWN0aXZlJywgYmluZGluZ119KVxyXG5cdFx0KTtcclxuXHRcdGRlbGV0ZSB0aGlzLmVsWyc8IGMgaCB0IG0gbCA+J107XHJcblx0XHRpZiAodGhpcy5kYXRhQmxvY2tTY3JpcHQgJiYgZ2xvYmFsUGFyYW1zLmhpZGVEYXRhQmxvY2tTY3JpcHQpIHtcclxuXHRcdFx0dGhpcy5wcmVwZW5kKHRoaXMuZGF0YUJsb2NrU2NyaXB0KTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdCAqIElOU1RBTkNFLVJFTEFURUQgTUVUSE9EU1xyXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQgKi9cclxuXHRcclxuXHQvKipcclxuXHQgKiBUaGUgXCJpbml0XCIgZnVuY3Rpb24uXHJcblx0ICogR2l2ZXMgQ0hUTUwgYSBnbG9iYWwgd2luZG93IGNvbnRleHRcclxuXHQgKiBhbmQgbGV0cyBpdCBwZXJmb3JtIG90aGVyIG5lY2Vzc2FyeSBpbml0aWFsaXphdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0XHRjb250ZXh0V2luZG93XHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uXHRidW5kbGVzQ2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0KGNvbnRleHRXaW5kb3csIGJ1bmRsZXNDYWxsYmFjayA9IG51bGwpIHtcclxuXHRcdFxyXG5cdFx0Z2xvYmFsUGFyYW1zLmNvbnRleHQgPSBjb250ZXh0V2luZG93O1xyXG5cdFx0Ly8gV2luZG93IG11c3QgYmUgc2V0IGFib3ZlLi4uIGJlZm9yZSB0aGlzXHJcblx0XHRkZWZpbmVCdW5kbGVFbGVtZW50cygpO1xyXG5cdFx0XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdC8vIENodG1sLmNvbnRlbnRMb2FkZWRQcm9taXNlXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdENodG1sLmNvbnRlbnRMb2FkZWRQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdGlmIChjb250ZXh0V2luZG93LmRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7IHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb250ZXh0V2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZXNvbHZlLCBmYWxzZSk7XHJcblx0XHRcdGNvbnRleHRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc29sdmUsIGZhbHNlKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdC8vIGdsb2JhbFBhcmFtcy5idW5kbGVzXHJcblx0XHQvLyBDaHRtbC5sb2FkaW5nQnVuZGxlc1Byb21pc2VcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Q2h0bWwuY29udGVudExvYWRlZFByb21pc2UudGhlbigoKSA9PiB7XHJcblx0XHRcdHZhciBidW5kbGVFbGVtZW50cztcclxuXHRcdFx0aWYgKGJ1bmRsZXNDYWxsYmFjayAmJiAoYnVuZGxlRWxlbWVudHMgPSBidW5kbGVzQ2FsbGJhY2soKSkpIHtcclxuXHRcdFx0XHRpZiAoIV9pc0FycmF5KGJ1bmRsZUVsZW1lbnRzKSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYnVuZGxlc0NhbGxiYWNrKCkgZnVuY3Rpb24gbXVzdCByZXR1cm4gYW4gYXJyYXkhJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGdsb2JhbFBhcmFtcy5idW5kbGVzID0gY3JlYXRlQnVuZGxlTWF0cml4KGJ1bmRsZUVsZW1lbnRzLCBsb2FkaW5nQnVuZGxlc1Byb21pc2UgPT4ge1xyXG5cdFx0XHRcdFx0Q2h0bWwubG9hZGluZ0J1bmRsZXNQcm9taXNlID0gbG9hZGluZ0J1bmRsZXNQcm9taXNlO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGRlZmluZUltcG9ydEVsZW1lbnRzKGxvYWRpbmdCdW5kbGVzUHJvbWlzZSk7XHJcblx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFRoZSBcInJlYWR5XCIgZnVuY3Rpb24uXHJcblx0ICogQ2FsbHMgdXMgd2hlbiBpdCBiZWNvbWVzIHNhZmUgdG8gcnVuIGJ1bmRsZS1yZWxhdGVkIGNvZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb25cdFx0XHRjYWxsYmFja1xyXG5cdCAqIEBwYXJhbSBib29sXHRcdFx0XHR3YWl0Rm9yQnVuZGxlc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHJlYWR5KGNhbGxiYWNrLCB3YWl0Rm9yQnVuZGxlcyA9IHRydWUpIHtcclxuXHRcdENodG1sLmNvbnRlbnRMb2FkZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRpZiAoIXdhaXRGb3JCdW5kbGVzKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soKTsgcmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdENodG1sLmxvYWRpbmdCdW5kbGVzUHJvbWlzZS50aGVuKGNhbGxiYWNrKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIENodG1sIG92ZXIgYSByb290IHJlc29sdmVkIGZyb20gZGVmaW5pdGlvbiBvciBtYXJrdXAgc3RyaW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZ3xkb2N1bWVudHxIVE1MRWxlbWVudFx0aW5wdXRcclxuXHQgKiBAcGFyYW0gb2JqZWN0XHRcdFx0XHRcdFx0cGFyYW1zXHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHRcdFx0XHRcdFN0YXRpY1xyXG5cdCAqXHJcblx0ICogQHJldHVybiBDaHRtbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmcm9tKGlucHV0LCBwYXJhbXMgPSB7fSwgU3RhdGljID0gQ2h0bWwpIHtcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHQvLyBSZXNvbHZlIGVsZW1lbnQgZnJvbSBpbnB1dFxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdHZhciBlbCA9IGlucHV0O1xyXG5cdFx0aWYgKF9pc1N0cmluZyhpbnB1dCkgJiYgIWlucHV0LnRyaW0oKS5zdGFydHNXaXRoKCc8JykgJiYgaW5wdXQuaW5kZXhPZignLycpICE9PSAtMSkge1xyXG5cdFx0XHRpZiAoIShlbCA9IENodG1sLmltcG9ydChfYmVmb3JlKGlucHV0LCAnLy8nKSkpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdObyBlbGVtZW50IGZvdW5kIG9uIHRoZSBuYW1lc3BhY2UgXCInICsgaW5wdXQgKyAnXCIhJyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChfaXNTdHJpbmcoaW5wdXQpKSB7XHJcblx0XHRcdFx0aWYgKCEoZWwgPSBjcmVhdGVFbGVtZW50KGlucHV0KSkpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHJlc29sdmUgdGhlIHN0cmluZyBcIicgK2lucHV0ICsgJ1wiIHRvIGFuIGVsZW1lbnQhJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBucywgc3VwZXJOcywgc3VwZXJFbCwgaXNJbXBvcnQgPSBlbC5tYXRjaGVzKGdsb2JhbFBhcmFtcy50YWdNYXAuaW1wb3J0KTtcclxuXHRcdFx0aWYgKChucyA9IF9iZWZvcmUoZWwuZ2V0QXR0cmlidXRlKGdsb2JhbFBhcmFtcy5hdHRyTWFwLm5hbWVzcGFjZSkgfHwgJycsICcvLycpKVxyXG5cdFx0XHQvLyBUaGUgZW50aXJlIG5hbWVzcGFjZSBpcyB1c2VkIGZvciBlbGVtZW50cyBvZiB0eXBlIGltcG9ydC5cclxuXHRcdFx0Ly8gVGhlIHN1cGVybmFtZXNwYWNlIGlzIHVzZWQgZm9yIG5vcm1hbCBlbGVtZW50c1xyXG5cdFx0XHQmJiAoKGlzSW1wb3J0ICYmIChzdXBlck5zID0gbnMpKSB8fCAoc3VwZXJOcyA9IF9iZWZvcmVMYXN0KG5zLCAnLycpKSAmJiBzdXBlck5zLmluZGV4T2YoJy8nKSA+IC0xKVxyXG5cdFx0XHQmJiAoc3VwZXJFbCA9IENodG1sLmltcG9ydChzdXBlck5zKSkpIHtcclxuXHRcdFx0XHR2YXIgX2VsID0gZWw7XHJcblx0XHRcdFx0ZWwgPSByZWNvbXBvc2Uoc3VwZXJFbCwgZWwpO1xyXG5cdFx0XHRcdGlmIChpc0ltcG9ydCkge1xyXG5cdFx0XHRcdFx0X2VsLnJlcGxhY2VXaXRoKGVsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAobnMpIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ05hbWVzcGFjZSByZXNvbHV0aW9uIGZhaWxlZDogJyArIG5zKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGVsWyc8IGMgaCB0IG0gbCA+J10gfHwgbmV3IFN0YXRpYyhlbCwgcGFyYW1zKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogSW1wb3J0cyBhIG1vZHVsZSBmcm9tIGJ1bmRsZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nXHRcdFx0XHRcdFx0bmFtZXNwYWNlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGltcG9ydChuYW1lc3BhY2UpIHtcclxuXHRcdGlmIChnbG9iYWxQYXJhbXMuYnVuZGxlcykge1xyXG5cdFx0XHRyZXR1cm4gZ2xvYmFsUGFyYW1zLmJ1bmRsZXMuZmluZChuYW1lc3BhY2UpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEpzZW4sIHtcclxuXHRTdGF0ZW1lbnRzXHJcbn0gZnJvbSAnQHdlYi1uYXRpdmUtanMvanNlbic7XHJcbmltcG9ydCBfd3JhcHBlZCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci93cmFwcGVkLmpzJztcclxuaW1wb3J0IF91bndyYXAgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvdW53cmFwLmpzJztcclxuaW1wb3J0IF9tZXJnZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9tZXJnZS5qcyc7XHJcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc1N0cmluZy5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIENhbGwgY2xhc3NcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1x0XHRcdFx0XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RpdmVzIGV4dGVuZHMgU3RhdGVtZW50cyB7XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBmbGF0IGxpc3Qgb2YgcnVsZXMgd2hvc2VcclxuXHQgKiB0aGF0IGhhdmUgbm90IGJlZW4gb3ZlcnJpZGVuLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGZpbHRlcigpIHtcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdC8vIENBU0NBRElORyBBTkQgT1ZFUlJJRElOR1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0dmFyIGRpcmVjdGl2ZXMgPSBbXTtcclxuXHRcdHRoaXMuc3RtdHMuZm9yRWFjaChkaXJlY3RpdmUgPT4ge1xyXG5cdFx0XHREaXJlY3RpdmVzLmZsYXR0ZW4oZGlyZWN0aXZlLCBfZGlyZWN0aXZlID0+IHtcclxuXHRcdFx0XHRkaXJlY3RpdmVzLnB1c2goX2RpcmVjdGl2ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRkaXJlY3RpdmVzID0gZGlyZWN0aXZlcy5yZWR1Y2UoKGJ1aWxkLCBjdXJyZW50KSA9PiB7XHJcblx0XHRcdGJ1aWxkLmZvckVhY2goZXhpc3RpbmcgPT4ge1xyXG5cdFx0XHRcdGlmIChleGlzdGluZy5pc0R1cGxpY2F0ZSB8fCBleGlzdGluZy5vdmVycmlkZGVuKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjdXJyZW50LnRvU3RyaW5nKCkgPT09IGV4aXN0aW5nLnRvU3RyaW5nKCkgXHJcblx0XHRcdFx0JiYgKGN1cnJlbnQuaW1wb3J0YW50ID09PSBleGlzdGluZy5pbXBvcnRhbnQgfHwgY3VycmVudC5mYWxsYmFjayA9PT0gZXhpc3RpbmcuZmFsbGJhY2spKSB7XHJcblx0XHRcdFx0XHRjdXJyZW50LmlzRHVwbGljYXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnQuaW1wb3J0YW50ICB8fCBleGlzdGluZy5mYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0ZXhpc3Rpbmcub3ZlcnJpZGRlbiA9IHRydWU7XHJcblx0XHRcdFx0fSBlbHNlIGlmICgoZXhpc3RpbmcuaW1wb3J0YW50IHx8IGN1cnJlbnQuZmFsbGJhY2spKSB7XHJcblx0XHRcdFx0XHRjdXJyZW50Lm92ZXJyaWRkZW4gPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBidWlsZC5jb25jYXQoW2N1cnJlbnRdKTtcclxuXHRcdH0sIFtdKTtcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdC8vIEZJTkFMIEZJTFRFUklORyBBTkQgUEFSU0lOR1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0cmV0dXJuIGRpcmVjdGl2ZXMuZmlsdGVyKGRpcmVjdGl2ZSA9PiAhZGlyZWN0aXZlLmlzRHVwbGljYXRlICYmICFkaXJlY3RpdmUub3ZlcnJpZGRlbik7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJld3JpdGVzIGRpcmVjdGl2ZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0c3RhdGljIGZsYXR0ZW4oZGlyZWN0aXZlLCBjYWxsYmFjaywgYXNzZXJ0aW9uID0gJycpIHtcclxuXHRcdGlmIChkaXJlY3RpdmUuanNlblR5cGUgPT09ICdJZkNvbmRpdGlvbmFsJykge1xyXG5cdFx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHRcdC8vIE9uIHRydWVcclxuXHRcdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0XHR2YXIgX2Fzc2VydGlvbiA9ICcoJyArIGRpcmVjdGl2ZS5hc3NlcnRpb24udG9TdHJpbmcoKSArICcpJztcclxuXHRcdFx0aWYgKGRpcmVjdGl2ZS5vblRydWUpIHtcclxuXHRcdFx0XHRpZiAoZGlyZWN0aXZlLm9uVHJ1ZS5qc2VuVHlwZSA9PT0gJ1N0YXRlbWVudHMnKSB7XHJcblx0XHRcdFx0XHRkaXJlY3RpdmUub25UcnVlLnN0bXRzLmZvckVhY2goX2RpcmVjdGl2ZSA9PiB7XHJcblx0XHRcdFx0XHRcdERpcmVjdGl2ZXMuZmxhdHRlbihfZGlyZWN0aXZlLCBjYWxsYmFjaywgKGFzc2VydGlvbiA/IGFzc2VydGlvbiArICcgJiYgJyA6ICcnKSArIF9hc3NlcnRpb24pXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0RGlyZWN0aXZlcy5mbGF0dGVuKGRpcmVjdGl2ZS5vblRydWUsIGNhbGxiYWNrLCAoYXNzZXJ0aW9uID8gYXNzZXJ0aW9uICsgJyAmJiAnIDogJycpICsgX2Fzc2VydGlvbilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0XHQvLyBPbiBmYWxzZVxyXG5cdFx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHRcdGlmIChkaXJlY3RpdmUub25GYWxzZSkge1xyXG5cdFx0XHRcdGlmIChkaXJlY3RpdmUub25GYWxzZS5qc2VuVHlwZSA9PT0gJ1N0YXRlbWVudHMnKSB7XHJcblx0XHRcdFx0XHRkaXJlY3RpdmUub25GYWxzZS5zdG10cy5mb3JFYWNoKF9kaXJlY3RpdmUgPT4ge1xyXG5cdFx0XHRcdFx0XHREaXJlY3RpdmVzLmZsYXR0ZW4oX2RpcmVjdGl2ZSwgY2FsbGJhY2ssIChhc3NlcnRpb24gPyBhc3NlcnRpb24gKyAnICYmICcgOiAnJykgKyAnIScgKyBfYXNzZXJ0aW9uKVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdERpcmVjdGl2ZXMuZmxhdHRlbihkaXJlY3RpdmUub25GYWxzZSwgY2FsbGJhY2ssIChhc3NlcnRpb24gPyBhc3NlcnRpb24gKyAnICYmICcgOiAnJykgKyAnIScgKyBfYXNzZXJ0aW9uKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKGFzc2VydGlvbikge1xyXG5cdFx0XHRcdGNhbGxiYWNrKEpzZW4ucGFyc2UoYXNzZXJ0aW9uICsgJyAmJiBcIltFTkRJRl1cIiAmJiAoJyArIGRpcmVjdGl2ZS50b1N0cmluZygpICsgJyknKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soZGlyZWN0aXZlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXRkb2NcclxuXHQgKi9cclxuXHRzdGF0aWMgcGFyc2UoZXhwciwgcGFyYW1zID0ge30pIHtcclxuXHRcdHJldHVybiBzdXBlci5wYXJzZShcclxuXHRcdFx0IWV4cHIudHJpbSgpLmVuZHNXaXRoKCc7JykgPyBleHByICsgJzsnIDogZXhwciwgXHJcblx0XHRcdChfZXhwciwgX1BhcnNlcnMgPSBudWxsLCBfcGFyYW1zID0gbnVsbCkgID0+IEpzZW4ucGFyc2UoX2V4cHIsIF9QYXJzZXJzLCBfcGFyYW1zID8gX21lcmdlKHBhcmFtcywgX3BhcmFtcykgOiBwYXJhbXMpLypwYXJzZUNhbGxiYWNrKi8sIFxyXG5cdFx0XHREaXJlY3RpdmVzLypTdGF0aWMqL1xyXG5cdFx0KTtcclxuXHR9XHJcbn07IiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IHBhcmFtcyBmcm9tICcuL3BhcmFtcy5qcyc7XHJcbmltcG9ydCBDaHRtbCBmcm9tICcuL2luZGV4LmpzJztcclxuaW1wb3J0IFJlZmxleCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9yZWZsZXgnO1xyXG5pbXBvcnQgSnNlbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9qc2VuJztcclxucGFyYW1zLmVudiA9ICdicm93c2VyJztcclxuXHJcbi8vIEFzIGdsb2JhbHNcclxuaWYgKCF3aW5kb3cuV2ViTmF0aXZlKSB7XHJcblx0d2luZG93LldlYk5hdGl2ZSA9IHt9O1xyXG59XHJcbndpbmRvdy5XZWJOYXRpdmUuQ2h0bWwgPSBDaHRtbDtcclxud2luZG93LldlYk5hdGl2ZS5DaHRtbC5wYXJhbXMgPSBwYXJhbXM7XHJcbndpbmRvdy5XZWJOYXRpdmUuQ2h0bWwuUmVmbGV4ID0gUmVmbGV4O1xyXG53aW5kb3cuV2ViTmF0aXZlLkNodG1sLkpzZW4gPSBKc2VuO1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZnJvbS5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBNYXRyaXggbG9hZGVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4IHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hdHJpeCBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSBcdFx0XHRzb3VyY2VzXHJcblx0ICogQHBhcmFtIHN0cmluZ3xhcnJheSBcdFx0bmFtZXNwYWNlXHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uIFx0XHRcdGdldHRlclxyXG5cdCAqIEBwYXJhbSBNYXRyaXhJbnRlcmZhY2VcdGNhcnJ5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHRoaXNcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihzb3VyY2VzLCBuYW1lc3BhY2UsIGdldHRlciwgY2FycnkgPSBudWxsKSB7XHJcblx0XHR0aGlzLnNvdXJjZXMgPSBfYXJyRnJvbShzb3VyY2VzKTtcclxuXHRcdHRoaXMubmFtZXNwYWNlID0gX2FyckZyb20obmFtZXNwYWNlKTtcclxuXHRcdHRoaXMuZ2V0dGVyID0gZ2V0dGVyO1xyXG5cdFx0dGhpcy5jYXJyeSA9IGNhcnJ5O1xyXG5cdFx0dGhpcy5jb2xsZWN0aW9ucyA9IHt9O1xyXG5cdFx0dGhpcy52YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudGVycyBpbnRvIGEgc3ViIGNvbGxlY3Rpb24gaWYgZXhpc3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyBcdFx0XHRuYW1lXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIE1hdHJpeEludGVyZmFjZVxyXG5cdCAqL1xyXG5cdGVudGVyKG5hbWUpIHtcclxuXHRcdGlmICghKG5hbWUgaW4gdGhpcy5jb2xsZWN0aW9ucykpIHtcclxuXHRcdFx0dGhpcy5jb2xsZWN0aW9uc1tuYW1lXSA9IG5ldyBNYXRyaXgoXHJcblx0XHRcdFx0dGhpcy5zb3VyY2VzLCBcclxuXHRcdFx0XHR0aGlzLm5hbWVzcGFjZS5jb25jYXQobmFtZSksXHJcblx0XHRcdFx0dGhpcy5nZXR0ZXIsXHJcblx0XHRcdFx0dGhpcyBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmNvbGxlY3Rpb25zW25hbWVdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTGVhdmVzIHRoZSBjdXJyZW50IGN1cnJlbnQgY29sbGVjdGlvbiBpbnRvIHRoZSBzdXBlciBjb2xsZWN0aW9uIGlmIGV4aXN0cy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gTWF0cml4SW50ZXJmYWNlXHJcblx0ICovXHJcblx0bGVhdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jYXJyeTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExhenktbG9hZHMgYSBwcm9wZXJ0eSBmcm9tIHNvdXJjZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblx0Z2V0KCkge1xyXG5cdFx0aWYgKCF0aGlzLnZhbHVlKSB7XHJcblx0XHRcdHZhciBuYW1lc3BhY2UgPSB0aGlzLm5hbWVzcGFjZS5zbGljZSgpO1xyXG5cdFx0XHR2YXIgdmFsdWUgPSB0aGlzLmNhcnJ5ID8gdGhpcy5jYXJyeS5nZXQoKSA6IG51bGw7XHJcblx0XHRcdHRoaXMuc291cmNlcy5mb3JFYWNoKChzb3VyY2UsIGkpID0+IHtcclxuXHRcdFx0XHRpZiAodmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKG51bGwsIHNvdXJjZSwgbmFtZXNwYWNlLCB2YWx1ZSwgaSkpIHtcclxuXHRcdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIHRoZSBtb3N0LXNwZWNpZmljIG1vZHVsZSBmb3IgdGhlIGdpdmVuIG5hbWVzcGFjZSBmcm9tIHNvdXJjZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RpbmdcdFx0XHRcdFx0bmFtZXNwYWNlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGZpbmQobmFtZXNwYWNlKSB7XHJcblx0XHR2YXIgbnNBcnJheSA9IG5hbWVzcGFjZS5zcGxpdCgnLycpO1xyXG5cdFx0dmFyIHN1Yk1hdHJpeCwgbnNLZXksIG5zRHJpbGwgPSB0aGlzO1xyXG5cdFx0d2hpbGUoKG5zS2V5ID0gbnNBcnJheS5zaGlmdCgpKSAmJiAobnNEcmlsbCA9IG5zRHJpbGwuZW50ZXIobnNLZXkpKSkge1xyXG5cdFx0XHRzdWJNYXRyaXggPSBuc0RyaWxsOyBcclxuXHRcdH1cclxuXHRcdC8vIENsb25lIG5vdy4uLlxyXG5cdFx0dmFyIGVsID0gc3ViTWF0cml4LmdldCgpO1xyXG5cdFx0aWYgKGVsKSB7XHJcblx0XHRcdHJldHVybiBlbC5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZnJvbS5qcyc7XHJcbmltcG9ydCBfZGl2aWRlIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2RpdmlkZS5qcyc7XHJcbmltcG9ydCBnbG9iYWxQYXJhbXMgZnJvbSAnLi4vcGFyYW1zLmpzJztcclxuaW1wb3J0IHJlY29tcG9zZSBmcm9tICcuL3JlY29tcG9zZS5qcyc7XHJcbmltcG9ydCBNYXRyaXggZnJvbSAnLi9NYXRyaXguanMnO1xyXG5cclxuLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaGUgY2xpZW50LWJ1aWxkIGVudHJ5XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYnVuZGxlRWxlbWVudHMsIHByb21pc2VSZWNpZXZlciA9IG51bGwpIHtcclxuXHRcclxuXHR2YXIgW2xvYWRpbmdCdW5kbGVzLCByZWFkeUJ1bmRsZXNdID0gX2RpdmlkZShidW5kbGVFbGVtZW50cywgYiA9PiBiIGluc3RhbmNlb2YgUHJvbWlzZSk7XHJcblx0Y29uc3QgbG9hZGluZ0J1bmRsZXNQcm9taXNlID0gUHJvbWlzZS5hbGwobG9hZGluZ0J1bmRsZXMpLnRoZW4oZmV0Y2hlZEJ1bmRsZXMgPT4ge1xyXG5cdFx0cmVhZHlCdW5kbGVzLnB1c2goLi4uZmV0Y2hlZEJ1bmRsZXMpO1xyXG5cdFx0bG9hZGluZ0J1bmRsZXMgPSBbXTtcclxuXHR9KTtcclxuXHRpZiAocHJvbWlzZVJlY2lldmVyKSB7XHJcblx0XHRwcm9taXNlUmVjaWV2ZXIobG9hZGluZ0J1bmRsZXNQcm9taXNlKTtcclxuXHR9XHJcblx0dmFyIHdhcm5lZEVhcmx5QnVuZGxlQWNjZXNzO1xyXG5cdGNvbnN0IGFudGljeWNsaWNCdW5kbGVzUXVlcnkgPSBbXTtcclxuXHRjb25zdCBidW5kbGVNYXRyaXggPSBuZXcgTWF0cml4KHJlYWR5QnVuZGxlcy8qc291cmNlcyovLCBbXS8qbmFtZXNwYWNlKi8sIChidW5kbGUsIG5hbWVzcGFjZSwgc3VwZXJFbCwgYnVuZGxlSW5kZXgpID0+IHtcclxuXHRcdHZhciBfbmFtZXNwYWNlID0gbmFtZXNwYWNlLmpvaW4oJy8nKTtcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gSXMgdGhlIGN1cnJlbnQgaW1wb3J0IHByb2Nlc3MgdHJ5aW5nIHRvIGJlIGN5Y2xpYz9cclxuXHRcdC8vIFdlIG1vdmUgb25lLWxldmVsIHVwIHRoZSBuYW1lc3BhY2UgaGllcmFyY2h5LlxyXG5cdFx0aWYgKGFudGljeWNsaWNCdW5kbGVzUXVlcnkuaW5jbHVkZXMoX25hbWVzcGFjZSkpIHtcclxuXHRcdFx0cmV0dXJuIGJ1bmRsZU1hdHJpeC5maW5kKG5hbWVzcGFjZS5zbGljZSgwLCAtMSkuam9pbignLycpKTtcclxuXHRcdH1cclxuXHRcdGFudGljeWNsaWNCdW5kbGVzUXVlcnkucHVzaChfbmFtZXNwYWNlKTtcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gSXMgc29tZW9uZSB0cnlpbmcgdG8gaW1wb3J0IHdoaWxlIGJ1bmRsZXMgYXJlIHN0aWxsIGxvYWRpbmc/XHJcblx0XHRpZiAobG9hZGluZ0J1bmRsZXMubGVuZ3RoICYmICF3YXJuZWRFYXJseUJ1bmRsZUFjY2Vzcykge1xyXG5cdFx0XHR3YXJuZWRFYXJseUJ1bmRsZUFjY2VzcyA9IHRydWU7XHJcblx0XHRcdGNvbnNvbGUud2FybignUmVtb3RlIGJ1bmRsZXMgYXJlIHN0aWxsIGxvYWRpbmcgYXQgdGhpcyB0aW1lISBZb3Ugc2hvdWxkIHByb2JhYmJseSB3cmFwIGJ1bmRsZS1kZXBlbmRlbnQgY29kZSB3aXRoaW4gQ2h0bWwucmVhZHkoY2FsbGJhY2tbLCB0cnVlLyp3YWl0Rm9yQnVuZGxlcyovXSkuJyk7XHJcblx0XHR9XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdC8vIFdlIHF1ZXJ5IG5vdy4uLlxyXG5cdFx0dmFyIENTU0VzY2FwZSA9IGdsb2JhbFBhcmFtcy5jb250ZXh0LkNTUyBcclxuXHRcdFx0PyBnbG9iYWxQYXJhbXMuY29udGV4dC5DU1MuZXNjYXBlIFxyXG5cdFx0XHQ6IHN0ciA9PiBzdHI7XHJcblx0XHR2YXIgZWwgPSBfYXJyRnJvbShidW5kbGUuY29udGVudC5jaGlsZHJlbikuZmlsdGVyKG5vZGUgPT4gbm9kZS5tYXRjaGVzKCdbJyArIENTU0VzY2FwZShnbG9iYWxQYXJhbXMuYXR0ck1hcC5uYW1lc3BhY2UpICsgJz1cIicgKyBfbmFtZXNwYWNlICsgJ1wiXScpKVswXVxyXG5cclxuXHRcdGlmIChlbCAmJiBzdXBlckVsKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0dmFyIG5vcmVjb21wb3NlID0gW107XHJcblx0XHRcdFx0aWYgKGJ1bmRsZS5oYXNBdHRyaWJ1dGUoJ25vcmVjb21wb3NlJykpIHtcclxuXHRcdFx0XHRcdG5vcmVjb21wb3NlID0gKGJ1bmRsZS5nZXRBdHRyaWJ1dGUoJ25vcmVjb21wb3NlJykgfHwgJyonKS5zcGxpdCgnICcpLm1hcCh2YWwgPT4gdmFsLnRyaW0oKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsID0gcmVjb21wb3NlKHN1cGVyRWwsIGVsLCAncHJlcGVuZCcsIG5vcmVjb21wb3NlKTtcclxuXHRcdFx0fSBjYXRjaChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignW0luaGVyaXRhbmNlIGVycm9yIGF0IHNvdXJjZSAjJyArIGJ1bmRsZUluZGV4ICsgJ106ICcgKyBlLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGFudGljeWNsaWNCdW5kbGVzUXVlcnkucG9wKCk7XHJcblx0XHRcdHJldHVybiBlbDtcclxuXHRcdH1cclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gVXBkYXRlIGN5Y2xpY2lzbS4uLiBsb2xcclxuXHRcdGFudGljeWNsaWNCdW5kbGVzUXVlcnkucG9wKCk7XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdC8vIElmIHRoZXJlIHdhcyBubyBtb2R1bGUgd2l0aCB0aGUgcmVxdWVzdGVkIG5hbWVzcGFjZVxyXG5cdFx0Ly8gd2UgcmV0dXJuIHRoZSBzdXBlciBtb2R1bGVcclxuXHRcdHJldHVybiBlbCA/IGVsLmNsb25lTm9kZSh0cnVlKSA6IChcclxuXHRcdFx0c3VwZXJFbCA/IHN1cGVyRWwuY2xvbmVOb2RlKHRydWUpIDogbnVsbFxyXG5cdFx0KTtcclxuXHR9LypnZXR0ZXIqLyk7XHJcblx0XHJcblx0cmV0dXJuIGJ1bmRsZU1hdHJpeDtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9iZWZvcmUgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvYmVmb3JlLmpzJztcclxuaW1wb3J0IHJlY29tcG9zZSBmcm9tICcuL3JlY29tcG9zZS5qcyc7XHJcbmltcG9ydCBnbG9iYWxQYXJhbXMgZnJvbSAnLi4vcGFyYW1zLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogVGhlIGNsaWVudC1idWlsZCBlbnRyeVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdGNvbnN0IFdpbmRvdyA9IGdsb2JhbFBhcmFtcy5jb250ZXh0O1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmUgdGhlIGN1c3RvbWl6ZWQgYnVpbHQtaW4gdGVtcGxhdGUgZWxlbWVudFxyXG5cdCAqIHRoYXQgc3VwcG9ydHMgcmVtb3RlIGNvbnRlbnQuXHJcblx0ICovXHJcblx0V2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShnbG9iYWxQYXJhbXMuYXR0ck1hcC5idW5kbGUsIGNsYXNzIGV4dGVuZHMgV2luZG93LkhUTUxUZW1wbGF0ZUVsZW1lbnQge1xyXG5cdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIGhhbmRsZXMgYm90aCB0cmlnZ2VycyByZW1vdGUgbG9hZGluZ1xyXG5cdFx0ICogd2hlbiBzbyBkZWZpbmVkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBzdHJpbmdcdG5hbWVcclxuXHRcdCAqIEBwYXJhbSBzdHJpbmdcdG9sZFZhbHVlXHJcblx0XHQgKiBAcGFyYW0gc3RyaW5nXHRuZXdWYWx1ZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gdm9pZFxyXG5cdFx0ICovXHJcblx0XHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XHJcblx0XHRcdGlmIChuZXdWYWx1ZSkge1xyXG5cdFx0XHRcdHRoaXMubG9hZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIEF0dGVtcHQgdG8gbG9hZCByZW1vdGUgY29udGVudCBpZiBzbyBkZWZpbmVkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gdm9pZFxyXG5cdFx0ICovXHJcblx0XHRsb2FkKCkge1xyXG5cdFx0XHR2YXIgc3JjID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG5cdFx0XHRpZiAoc3JjICYmIHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ0EgQ0hUTUwgYnVuZGxlIG11c3QgZGVmaW5lIG9ubHkgZWl0aGVyIGEgcmVtb3RlIGNvbnRlbnQgb3IgbG9jYWwgY29udGVudCEgQnVuZGxlIGlnbm9yZWQuJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAoc3JjKSB7XHJcblx0XHRcdFx0Ly8gTWlzc2luZyBpbiBqc2RvbVxyXG5cdFx0XHRcdGlmIChXaW5kb3cuZmV0Y2gpIHtcclxuXHRcdFx0XHRcdFdpbmRvdy5mZXRjaChzcmMpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzcG9uc2Uub2sgPyByZXNwb25zZS50ZXh0KCkgOiBQcm9taXNlLnJlamVjdChyZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuXHRcdFx0XHRcdH0pLnRoZW4oY29udGVudCA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHRcdFx0XHRcdFx0Ly8gRGlzcGF0Y2ggdGhlIGV2ZW50LlxyXG5cdFx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdpbmRvdy5FdmVudCgnYnVuZGxlbG9hZHN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0XHRcdFx0YnViYmxlczp0cnVlLFxyXG5cdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XHJcblx0XHRcdFx0XHRcdC8vIERpc3BhdGNoIHRoZSBldmVudC5cclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdFcnJvciBmZXRjaGluZyB0aGUgYnVuZGxlIGF0ICcgKyBzcmMgKyAnLiAoJyArIGVycm9yICsgJyknKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBXaW5kb3cuRXZlbnQoJ2J1bmRsZWxvYWRlcnJvcicsIHtcclxuXHRcdFx0XHRcdFx0XHRidWJibGVzOnRydWUsXHJcblx0XHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCB0aGlzIGV2ZW50IHdpbGwgZmlyZSBCRUZPUkUgdGhlIGNvZGUgdGhhdCBiaW5kcyB0byBpdFxyXG5cdFx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdpbmRvdy5FdmVudCgnYnVuZGxlbG9hZHN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0XHRcdFx0YnViYmxlczp0cnVlLFxyXG5cdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGF0dHJpYnV0ZXMgd2Ugd2FudCB0byBvYnNlcnZlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gYXJyYXlcclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRcdHJldHVybiBbJ3NyYyddO1xyXG5cdFx0fVxyXG5cdH0sIHtleHRlbmRzOiAndGVtcGxhdGUnfSk7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfYmVmb3JlIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvc3RyL2JlZm9yZS5qcyc7XHJcbmltcG9ydCByZWNvbXBvc2UgZnJvbSAnLi9yZWNvbXBvc2UuanMnO1xyXG5pbXBvcnQgZ2xvYmFsUGFyYW1zIGZyb20gJy4uL3BhcmFtcy5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBjbGllbnQtYnVpbGQgZW50cnlcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihsb2FkaW5nQnVuZGxlc1Byb21pc2UpIHtcclxuXHRcclxuXHRjb25zdCBXaW5kb3cgPSBnbG9iYWxQYXJhbXMuY29udGV4dDtcclxuXHRcdFx0XHRcclxuXHQvKipcclxuXHQgKiBEZWZpbmUgdGhlIGN1c3RvbSBpbXBvcnQgZWxlbWVudFxyXG5cdCAqL1xyXG5cdFdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoZ2xvYmFsUGFyYW1zLnRhZ01hcC5pbXBvcnQsIGNsYXNzIGV4dGVuZHMgV2luZG93LkhUTUxFbGVtZW50IHtcclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogVGVzdHMgaWYgY29uZGl0aW9ucyBhcmUgcmlnaHQgdG8gcmVzb2x2ZSB0aGUgaW1wb3J0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gYm9vbFxyXG5cdFx0ICovXHJcblx0XHRzaG91bGRSZXNvbHZlKCkge1xyXG5cdFx0XHRyZXR1cm4gIXRoaXMuaGFzQXR0cmlidXRlKCdvbmRlbWFuZCcpXHJcblx0XHRcdFx0JiYgIXRoaXMuY2xvc2VzdCgndGVtcGxhdGUnKVxyXG5cdFx0XHRcdCYmICF0aGlzLmNsb3Nlc3QoZ2xvYmFsUGFyYW1zLnRhZ01hcC5pbXBvcnQgKyAnW29uZGVtYW5kXScpO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHRyaWdnZXJzIHNlbGYtcmVwbGFjZW1lbnRcclxuXHRcdCAqIHdoZW4gc28gZGVmaW5lZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHZvaWRcclxuXHRcdCAqL1xyXG5cdFx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcblx0XHRcdHRoaXMucHJvY2Vzc2VkID0gZmFsc2U7XHJcblx0XHRcdGlmICh0aGlzLnNob3VsZFJlc29sdmUoKSkge1xyXG5cdFx0XHRcdHRoaXMucmVzb2x2ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgdHJpZ2dlcnMgc2VsZi1yZXBsYWNlbWVudFxyXG5cdFx0ICogd2hlbiBzbyBkZWZpbmVkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBzdHJpbmdcdG5hbWVcclxuXHRcdCAqIEBwYXJhbSBzdHJpbmdcdG9sZFZhbHVlXHJcblx0XHQgKiBAcGFyYW0gc3RyaW5nXHRuZXdWYWx1ZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gdm9pZFxyXG5cdFx0ICovXHJcblx0XHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XHJcblx0XHRcdGlmICh0aGlzLnNob3VsZFJlc29sdmUoKSkge1xyXG5cdFx0XHRcdHRoaXMucmVzb2x2ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIEF0dGVtcHQgc2VsZi1yZXBsYWNlbWVudCBpZiBzbyBkZWZpbmVkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gdm9pZFxyXG5cdFx0ICovXHJcblx0XHRyZXNvbHZlKCkge1xyXG5cdFx0XHRpZiAoIXRoaXMucGFyZW50Tm9kZSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRsb2FkaW5nQnVuZGxlc1Byb21pc2UudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0dmFyIHJlcGxhY2VtZW50LCBuYW1lc3BhY2UsIG5hbWVzcGFjZUF0dHIgPSBnbG9iYWxQYXJhbXMuYXR0ck1hcC5uYW1lc3BhY2U7XHJcblx0XHRcdFx0aWYgKChuYW1lc3BhY2UgPSBfYmVmb3JlKHRoaXMuZ2V0QXR0cmlidXRlKG5hbWVzcGFjZUF0dHIpIHx8ICcnLCAnLy8nKSlcclxuXHRcdFx0XHQmJiAobmFtZXNwYWNlICE9PSB0aGlzLl9fbmFtZXNwYWNlKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fX25hbWVzcGFjZSA9IG5hbWVzcGFjZTtcclxuXHRcdFx0XHRcdGlmICghZ2xvYmFsUGFyYW1zLmJ1bmRsZXMgfHwgIShyZXBsYWNlbWVudCA9IGdsb2JhbFBhcmFtcy5idW5kbGVzLmZpbmQobmFtZXNwYWNlKSkpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pbm5uZXJUZXh0ID0gJ05vIGVsZW1lbnQgZm91bmQgb24gdGhlIG5hbWVzcGFjZSBcIicgKyBuYW1lc3BhY2UgKyAnXCIhJztcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHZhciByZXNvbHZlZCA9IHJlY29tcG9zZShyZXBsYWNlbWVudCwgdGhpcyk7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnc2hhZG93JykpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMucGFyZW50Tm9kZS5zaGFkb3dSb290KSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcclxuXHRcdFx0XHRcdFx0XHR9IFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5zaGFkb3dSb290LmFwcGVuZChyZXNvbHZlZCk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlcGxhY2VXaXRoKHJlc29sdmVkKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXNvbHZlZC5zZXRBdHRyaWJ1dGUoJ2F1dG9pbXBvcnRlZCcsICd0cnVlJyk7XHJcblx0XHRcdFx0XHRcdHJlc29sdmVkLmRpc3BhdGNoRXZlbnQobmV3IFdpbmRvdy5FdmVudCgnaW1wb3J0ZWQnLCB7XHJcblx0XHRcdFx0XHRcdFx0YnViYmxlczp0cnVlLFxyXG5cdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGF0dHJpYnV0ZXMgd2Ugd2FudCB0byBvYnNlcnZlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gYXJyYXlcclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRcdHJldHVybiBbJ29uZGVtYW5kJywgZ2xvYmFsUGFyYW1zLmF0dHJNYXAubmFtZXNwYWNlXTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IF9iZWZvcmUgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9zdHIvYmVmb3JlLmpzJztcclxuaW1wb3J0IF9hZnRlciBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci9hZnRlci5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBhbiBlbGVtZW50J3MgQ0hUTUwgbmFtZXNwYWNlLlxyXG4gKiBUaGlzIGV4cGxhaW5zIGhvdyBhbiBlbGVtZW50J3MgbmFtZXNwYWNlIGlzIHVzZWQgaW4gQ0hUTUwuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmdcdFx0XHRcdFx0bmFtZXNwYWNlU3RyXHJcbiAqXHJcbiAqIEByZXR1cm4gb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lc3BhY2VTdHIpIHtcclxuXHR2YXIgbmFtZXNwYWNlUGFyc2UgPSB7cm9hZG1hcDpuYW1lc3BhY2VTdHJ9O1xyXG5cdGlmIChuYW1lc3BhY2VQYXJzZS5yb2FkbWFwKSB7XHJcblx0XHRuYW1lc3BhY2VQYXJzZS5uYW1lc3BhY2UgPSBfYmVmb3JlKG5hbWVzcGFjZVBhcnNlLnJvYWRtYXAsICcvLycpO1xyXG5cdFx0bmFtZXNwYWNlUGFyc2Uuc3VibmFtZXNwYWNlID0gX2FmdGVyKG5hbWVzcGFjZVBhcnNlLnJvYWRtYXAsICcvLycpO1xyXG5cdFx0Ly8gSW4gY2FzZSB0aGlzIGlzIHRoZSAvLy8gc3BvdC4uLlxyXG5cdFx0aWYgKG5hbWVzcGFjZVBhcnNlLnN1Ym5hbWVzcGFjZS5zdGFydHNXaXRoKCcvJykpIHtcclxuXHRcdFx0bmFtZXNwYWNlUGFyc2Uuc3VibmFtZXNwYWNlID0gX2FmdGVyKG5hbWVzcGFjZVBhcnNlLnN1Ym5hbWVzcGFjZSwgJy8nKTtcclxuXHRcdH1cclxuXHRcdGlmIChuYW1lc3BhY2VQYXJzZS5zdWJuYW1lc3BhY2UuZW5kc1dpdGgoJy8vJykgJiYgbmFtZXNwYWNlUGFyc2Uuc3VibmFtZXNwYWNlLmluZGV4T2YoJy8vLycpID09PSAtMSkge1xyXG5cdFx0XHRuYW1lc3BhY2VQYXJzZS5zdWJuYW1lc3BhY2UgPSBuYW1lc3BhY2VQYXJzZS5zdWJuYW1lc3BhY2UgKyBuYW1lc3BhY2VQYXJzZS5uYW1lc3BhY2UgKyAnLy8nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbmFtZXNwYWNlUGFyc2U7XHJcbn07XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCByZWNvbXBvc2VOb2RlcyBmcm9tICcuL3JlY29tcG9zZU5vZGVzLmpzJztcclxuaW1wb3J0IHJlY29tcG9zZURpcmVjdGl2ZXMgZnJvbSAnLi9yZWNvbXBvc2VEaXJlY3RpdmVzLmpzJztcclxuaW1wb3J0IGdsb2JhbFBhcmFtcyBmcm9tICcuLi9wYXJhbXMuanMnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvc2VzIGEgY29tcG9uZW50IGZyb20gYSBzdXBlciBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEFsbCBkZWZpbml0aW9ucyB3aWxsIGJlIGluaGVyaXRlZC5cclxuICogSWYgdGhlIGlkZWEgaXMgdG8gaW1wb3J0LCB0aGUgc3VwZXIgY29tcG9uZW50J3MgZWxlbWVudCB3aWxsIGJlIHJldHVybmVkLFxyXG4gKiAoT24gaW1wb3J0LCBub2RlcyBpbiBjb21wb25lbnQgKGFzIGRlZmluZWQsIGlmKSB3aWxsIGJlIHVwbG9hZGVkIGludG8gc2xvdHMgaW4gdGhlIHN1cGVyIGNvbXBvbmVudC4pXHJcbiAqXHJcbiAqIEBwYXJhbSBIVE1MRWxlbWVudFx0XHRcdFx0ZWxUb1xyXG4gKiBAcGFyYW0gSFRNTEVsZW1lbnRcdFx0XHRcdGVsRnJvbVxyXG4gKlxyXG4gKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbEZyb20sIGVsVG8pIHtcclxuXHRpZiAoZWxUby5tYXRjaGVzKGdsb2JhbFBhcmFtcy50YWdNYXAuaW1wb3J0KSkge1xyXG5cdFx0cmV0dXJuIHJlY29tcG9zZU5vZGVzKGVsVG8vKmZyb20gaW1wb3J0IGFjdHVhbGx5Ki8sIGVsRnJvbS8qdG8gZWxlbWVudCBhY3R1YWxseSovKTtcclxuXHR9XHJcblx0Ly8gV2Ugd2lsbCBhcHBlbmQgZGVmcyBmcm9tIHRoZSBlbEZyb20gaW50byBlbFRvXHJcblx0cmV0dXJuIHJlY29tcG9zZURpcmVjdGl2ZXMoZWxGcm9tLCBlbFRvLCAncHJlcGVuZCcpO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZnJvbS5qcyc7XHJcbmltcG9ydCBfdW5pcXVlIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL3VuaXF1ZS5qcyc7XHJcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzRnVuY3Rpb24uanMnO1xyXG5pbXBvcnQgX2lzU3RyaW5nIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNTdHJpbmcuanMnO1xyXG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9qcy9pc0FycmF5LmpzJztcclxuaW1wb3J0IHJlY29tcG9zZURpcmVjdGl2ZXMgZnJvbSAnLi9yZWNvbXBvc2VEaXJlY3RpdmVzLmpzJztcclxuaW1wb3J0IGdsb2JhbFBhcmFtcyBmcm9tICcuLi9wYXJhbXMuanMnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvc2VzIGRlZmluaXRpb25zIGZyb20gZWxGcm9tIGludG8gZWxUby5cclxuICpcclxuICogQHBhcmFtIEhUTUxFbGVtZW50XHRcdFx0XHRlbEZyb21cclxuICogQHBhcmFtIEhUTUxFbGVtZW50XHRcdFx0XHRlbFRvXHJcbiAqIEBwYXJhbSBzdHJpbmdcdFx0XHRcdFx0YXBwZW5kT3JQcmVwZW5kXHJcbiAqIEBwYXJhbSBhcnJheVx0XHRcdFx0XHRcdG5vcmVjb21wb3NlXHJcbiAqXHJcbiAqIEByZXR1cm4gSFRNTEVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVsRnJvbSwgZWxUbywgYXBwZW5kT3JQcmVwZW5kLCBub3JlY29tcG9zZSA9IFtdKSB7XHJcblx0bm9yZWNvbXBvc2UgPSBub3JlY29tcG9zZS5jb25jYXQoW2dsb2JhbFBhcmFtcy5hdHRyTWFwLm5hbWVzcGFjZSwgLi4uZ2xvYmFsUGFyYW1zLmF0dHJNYXAubm9jb21wb3NlXSk7XHJcblx0aWYgKGVsVG8uaGFzQXR0cmlidXRlKCdub3JlY29tcG9zZScpKSB7XHJcblx0XHRub3JlY29tcG9zZSA9IG5vcmVjb21wb3NlLmNvbmNhdCgoZWxUby5nZXRBdHRyaWJ1dGUoJ25vcmVjb21wb3NlJykgfHwgJyonKS5zcGxpdCgnICcpLm1hcCh2YWwgPT4gdmFsLnRyaW0oKSkpO1xyXG5cdH1cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gQ3VzdG9tIENvbXBvc2l0aW9uLi4uXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGlmIChfaXNGdW5jdGlvbihnbG9iYWxQYXJhbXMucmVjb21wb3NlQ2FsbGJhY2spKSB7XHJcblx0XHR2YXIgZGlzcG9zaXRpb24gPSBnbG9iYWxQYXJhbXMucmVjb21wb3NlQ2FsbGJhY2soZWxGcm9tLCBlbFRvLCBhcHBlbmRPclByZXBlbmQsIG5vcmVjb21wb3NlKTtcclxuXHRcdGlmIChkaXNwb3NpdGlvbiA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIGlmIChfaXNTdHJpbmcoZGlzcG9zaXRpb24pIHx8IF9pc0FycmF5KGRpc3Bvc2l0aW9uKSkge1xyXG5cdFx0XHRub3JlY29tcG9zZSA9IG5vcmVjb21wb3NlLmNvbmNhdChkaXNwb3NpdGlvbik7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBNZXJnZSBsaXN0IGF0dHJpYnV0ZXMuLi5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0X3VuaXF1ZShnbG9iYWxQYXJhbXMubGlzdEF0dHJpYnV0ZXMuY29uY2F0KFtnbG9iYWxQYXJhbXMuYXR0ck1hcC5oaW50LCBnbG9iYWxQYXJhbXMuYXR0ck1hcC5zdXBlcnJvbGUsIGdsb2JhbFBhcmFtcy5hdHRyTWFwLnN1YnJvbGUsICdyb2xlJywgJ2NsYXNzJ10pKS5mb3JFYWNoKHR5cGUgPT4ge1xyXG5cdFx0dmFyIGJfYXR0ciwgYV9hdHRyO1xyXG5cdFx0aWYgKCFub3JlY29tcG9zZS5pbmNsdWRlcyh0eXBlKSAmJiAhbm9yZWNvbXBvc2UuaW5jbHVkZXMoJyonKSAmJiAoYl9hdHRyID0gZWxGcm9tLmdldEF0dHJpYnV0ZSh0eXBlKSkpIHtcclxuXHRcdFx0aWYgKGFfYXR0ciA9IGVsVG8uZ2V0QXR0cmlidXRlKHR5cGUpKSB7XHJcblx0XHRcdFx0dmFyIGpvaW50TGlzdCA9IGFwcGVuZE9yUHJlcGVuZCA9PT0gJ3ByZXBlbmQnID8gW2JfYXR0ciwgYV9hdHRyXSA6IFthX2F0dHIsIGJfYXR0cl07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGpvaW50TGlzdCA9IFtiX2F0dHJdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsVG8uc2V0QXR0cmlidXRlKHR5cGUsIF91bmlxdWUoam9pbnRMaXN0LmpvaW4oJyAnKS5zcGxpdCgnICcpLm1hcChyID0+IHIudHJpbSgpKSkuam9pbignICcpKTtcclxuXHRcdFx0bm9yZWNvbXBvc2UucHVzaCh0eXBlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gTWVyZ2Uga2V5L3ZhbCBhdHRyaWJ1dGVzLi4uXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdF91bmlxdWUoZ2xvYmFsUGFyYW1zLmtleVZhbEF0dHJpYnV0ZXMuY29uY2F0KCdzdHlsZScpKS5mb3JFYWNoKHR5cGUgPT4ge1xyXG5cdFx0dmFyIGJfYXR0ciwgYV9hdHRyO1xyXG5cdFx0aWYgKCFub3JlY29tcG9zZS5pbmNsdWRlcyh0eXBlKSAmJiAhbm9yZWNvbXBvc2UuaW5jbHVkZXMoJyonKSAmJiAoYl9hdHRyID0gZWxGcm9tLmdldEF0dHJpYnV0ZSh0eXBlKSkpIHtcclxuXHRcdFx0aWYgKGFfYXR0ciA9IGVsVG8uZ2V0QXR0cmlidXRlKHR5cGUpKSB7XHJcblx0XHRcdFx0dmFyIGpvaW50RGVmcyA9IGFwcGVuZE9yUHJlcGVuZCA9PT0gJ3ByZXBlbmQnID8gW2JfYXR0ciwgYV9hdHRyXSA6IFthX2F0dHIsIGJfYXR0cl07XHJcblx0XHRcdFx0aWYgKCFqb2ludERlZnNbMF0udHJpbSgpLmVuZHNXaXRoKCc7JykpIHtcclxuXHRcdFx0XHRcdGpvaW50RGVmc1swXSA9IGpvaW50RGVmc1swXSArICc7JztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGpvaW50RGVmcyA9IFtiX2F0dHJdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsVG8uc2V0QXR0cmlidXRlKHR5cGUsIGpvaW50RGVmcy5qb2luKCcgJykpO1xyXG5cdFx0XHRub3JlY29tcG9zZS5wdXNoKHR5cGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBQb3J0IGFsbCBvdGhlciBhdHRyaWJ1dGVzLi4uXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZWxGcm9tLmF0dHJpYnV0ZXMubGVuZ3RoOyBpICsrKSB7XHJcblx0XHR2YXIgYXR0ciA9IGVsRnJvbS5hdHRyaWJ1dGVzW2ldO1xyXG5cdFx0aWYgKCFub3JlY29tcG9zZS5pbmNsdWRlcyhhdHRyLm5hbWUpICYmICFub3JlY29tcG9zZS5pbmNsdWRlcygnKicpICYmICFlbFRvLmhhc0F0dHJpYnV0ZShhdHRyLm5hbWUpKSB7XHJcblx0XHRcdGVsVG8uc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XHJcblx0XHRcdG5vcmVjb21wb3NlLnB1c2goYXR0ci5uYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIEZvciBkYXRhIGJsb2Nrcy4uLlxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRpZiAoIW5vcmVjb21wb3NlLmluY2x1ZGVzKCdAZGlyZWN0aXZlcycpICYmICFub3JlY29tcG9zZS5pbmNsdWRlcygnKicpKSB7XHJcblx0XHR2YXIgZWxUb0RlZnMgPSBfYXJyRnJvbSgoZWxUby5zaGFkb3dSb290IHx8IGVsVG8pLmNoaWxkcmVuKVxyXG5cdFx0XHQuZmlsdGVyKG5vZGUgPT4gbm9kZS5tYXRjaGVzKGdsb2JhbFBhcmFtcy50YWdNYXAuanNlbikpO1xyXG5cdFx0dmFyIGVsRnJvbURlZnMgPSBfYXJyRnJvbSgoZWxGcm9tLnNoYWRvd1Jvb3QgfHwgZWxGcm9tKS5jaGlsZHJlbilcclxuXHRcdFx0LmZpbHRlcihub2RlID0+IG5vZGUubWF0Y2hlcyhnbG9iYWxQYXJhbXMudGFnTWFwLmpzZW4pKTtcclxuXHRcdGlmIChlbEZyb21EZWZzLmxlbmd0aCkge1xyXG5cdFx0XHRpZiAoZWxUb0RlZnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0ZWxUb0RlZnNbMF1bYXBwZW5kT3JQcmVwZW5kXShlbEZyb21EZWZzWzBdLnRleHRDb250ZW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbFRvLnByZXBlbmQoZWxGcm9tRGVmc1swXS5jbG9uZU5vZGUodHJ1ZSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBlbFRvO1xyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZnJvbS5qcyc7XHJcbmltcG9ydCByZWNvbXBvc2VEaXJlY3RpdmVzIGZyb20gJy4vcmVjb21wb3NlRGlyZWN0aXZlcy5qcyc7XHJcbmltcG9ydCBnbG9iYWxQYXJhbXMgZnJvbSAnLi4vcGFyYW1zLmpzJztcclxuXHRcclxuLyoqXHJcbiAqIENvbXBvc2VzIGEgY29tcG9uZW50IGZyb20gYSBzdXBlciBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEFsbCBkZWZpbml0aW9ucyB3aWxsIGJlIGluaGVyaXRlZC5cclxuICogSWYgdGhlIGlkZWEgaXMgdG8gaW1wb3J0LCB0aGUgc3VwZXIgY29tcG9uZW50J3MgZWxlbWVudCB3aWxsIGJlIHJldHVybmVkLFxyXG4gKiAoT24gaW1wb3J0LCBub2RlcyBpbiBjb21wb25lbnQgKGFzIGRlZmluZWQsIGlmKSB3aWxsIGJlIHVwbG9hZGVkIGludG8gc2xvdHMgaW4gdGhlIHN1cGVyIGNvbXBvbmVudC4pXHJcbiAqXHJcbiAqIEBwYXJhbSBIVE1MRWxlbWVudFx0XHRcdFx0ZWxGcm9tXHJcbiAqIEBwYXJhbSBIVE1MRWxlbWVudFx0XHRcdFx0ZWxUb1xyXG4gKlxyXG4gKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbEZyb20sIGVsVG8pIHtcclxuXHRlbFRvID0gZWxUby5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0dmFyIGVsRnJvbU5zID0gZWxGcm9tLmdldEF0dHJpYnV0ZShnbG9iYWxQYXJhbXMuYXR0ck1hcC5uYW1lc3BhY2UpO1xyXG5cdHZhciBlbFRvTnMgPSBlbFRvLmdldEF0dHJpYnV0ZShnbG9iYWxQYXJhbXMuYXR0ck1hcC5uYW1lc3BhY2UpO1xyXG5cdHZhciBlbFRvUm9sZXMgPSAoZWxUby5nZXRBdHRyaWJ1dGUoZ2xvYmFsUGFyYW1zLmF0dHJNYXAuc3VwZXJyb2xlKSB8fCAnJykuc3BsaXQoJyAnKS5tYXAociA9PiByLnRyaW0oKSk7XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIFNvIHdlIGNvbmNhdCgpIHRoZSByb2xlIGF0dHJpYnV0ZVxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRlbFRvLnNldEF0dHJpYnV0ZShnbG9iYWxQYXJhbXMuYXR0ck1hcC5uYW1lc3BhY2UsIGVsRnJvbU5zKTtcclxuXHQvLyBXZSB3aWxsIHByZXBlbmQgZGVmcyBmcm9tIHRoZSBlbEZyb20gaW50byBlbFRvXHJcblx0cmVjb21wb3NlRGlyZWN0aXZlcyhlbEZyb20sIGVsVG8sICdhcHBlbmQnKTtcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gVXBsb2FkIG5vZGVzIGludG8gZWxUbyBqdXN0IHRoZSB3YXkgc2xvdHMgd29yayBpbiBXZWIgQ29tcG9vbmVudHNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0X2FyckZyb20oKGVsRnJvbS5zaGFkb3dSb290IHx8IGVsRnJvbSkuY2hpbGRyZW4pLmZvckVhY2goKHJlcGxhY2VtZW50Tm9kZSwgaSkgPT4ge1xyXG5cdFx0aWYgKHJlcGxhY2VtZW50Tm9kZS5tYXRjaGVzKGdsb2JhbFBhcmFtcy50YWdNYXAuanNlbikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0cmVwbGFjZW1lbnROb2RlID0gcmVwbGFjZW1lbnROb2RlLmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdHZhciBhcHBsaWNhYmxlQ29udGV4dFJvbGVzID0gW10sIGFwcGxpY2FibGVSZXBsYWNlbWVudE5vZGVSb2xlcyA9IFtdO1xyXG5cdFx0dmFyIHJlcGxhY2VtZW50Tm9kZVJvbGVzID0gKHJlcGxhY2VtZW50Tm9kZS5nZXRBdHRyaWJ1dGUoZ2xvYmFsUGFyYW1zLmF0dHJNYXAuc3Vicm9sZSkgfHwgJycpLnNwbGl0KCcgJykubWFwKHIgPT4gci50cmltKCkpO1xyXG5cdFx0cmVwbGFjZW1lbnROb2RlUm9sZXMuZm9yRWFjaChyZXBsYWNlbWVudE5vZGVSb2xlID0+IHtcclxuXHRcdFx0dmFyIF9hcHBsaWNhYmxlQ29udGV4dFJvbGVzID0gZWxUb1JvbGVzLmZpbHRlcihjb250ZXh0Um9sZSA9PiByZXBsYWNlbWVudE5vZGVSb2xlLnN0YXJ0c1dpdGgoY29udGV4dFJvbGUgKyAnLScpKTtcclxuXHRcdFx0aWYgKF9hcHBsaWNhYmxlQ29udGV4dFJvbGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdGFwcGxpY2FibGVDb250ZXh0Um9sZXMucHVzaChfYXBwbGljYWJsZUNvbnRleHRSb2xlc1swXSk7XHJcblx0XHRcdFx0YXBwbGljYWJsZVJlcGxhY2VtZW50Tm9kZVJvbGVzLnB1c2gocmVwbGFjZW1lbnROb2RlUm9sZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dmFyIENTU0VzY2FwZSA9IGdsb2JhbFBhcmFtcy5jb250ZXh0LkNTUyA/IGdsb2JhbFBhcmFtcy5jb250ZXh0LkNTUy5lc2NhcGUgOiBzdHIgPT4gc3RyO1xyXG5cdFx0aWYgKGFwcGxpY2FibGVDb250ZXh0Um9sZXMubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBzbG90Tm9kZXM7XHJcblx0XHRcdHZhciBjb250ZXh0U2VsZWN0b3IgPSBhcHBsaWNhYmxlQ29udGV4dFJvbGVzLm1hcChjb250ZXh0Um9sZSA9PiAnWycgKyBDU1NFc2NhcGUoZ2xvYmFsUGFyYW1zLmF0dHJNYXAuc3VwZXJyb2xlKSArICd+PVwiJyArIGNvbnRleHRSb2xlICsgJ1wiXScpO1xyXG5cdFx0XHR2YXIgc2xvdE5vZGVTZWxlY3RvciA9IGFwcGxpY2FibGVSZXBsYWNlbWVudE5vZGVSb2xlcy5tYXAocmVwbGFjZW1lbnROb2RlUm9sZSA9PiAnWycgKyBDU1NFc2NhcGUoZ2xvYmFsUGFyYW1zLmF0dHJNYXAuc3Vicm9sZSkgKyAnfj1cIicgKyByZXBsYWNlbWVudE5vZGVSb2xlICsgJ1wiXScpO1xyXG5cdFx0XHRpZiAoKGVsVG8uc2hhZG93Um9vdCAmJiAoc2xvdE5vZGVzID0gZWxUby5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2xvdE5vZGVTZWxlY3RvcikpKVxyXG5cdFx0XHR8fCAoKHNsb3ROb2RlcyA9IGVsVG8ucXVlcnlTZWxlY3RvckFsbChzbG90Tm9kZVNlbGVjdG9yKSkubGVuZ3RoID09PSAxICYmIHNsb3ROb2Rlc1swXS5jbG9zZXN0KGNvbnRleHRTZWxlY3RvcikgPT09IGVsVG8pKSB7XHJcblx0XHRcdFx0Ly8gV2Ugd2lsbCBwcmVwZW5kIGRlZnMgZnJvbSB0aGUgc2xvdCBub2RlIGludG8gcmVwbGFjZW1lbnQgbm9kZVxyXG5cdFx0XHRcdHJlY29tcG9zZURpcmVjdGl2ZXMoc2xvdE5vZGVzWzBdLCByZXBsYWNlbWVudE5vZGUsICdwcmVwZW5kJyk7XHJcblx0XHRcdFx0Ly8gUG9ydCB0byB0YXJnZXQuLi5cclxuXHRcdFx0XHRzbG90Tm9kZXNbMF0ucmVwbGFjZVdpdGgocmVwbGFjZW1lbnROb2RlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvL3Rocm93IG5ldyBFcnJvcignQ29tcG9zaXRpb24gRXJyb3I6IE5vZGUgIycgKyBpICsgJyAoYXQgJyArIGVsRnJvbU5zICsgJykgbXVzdCBtYXRjaCBleGFjdGx5IG9uZSB0YXJnZXROb2RlIGluICcgKyBlbFRvTnMgKyAnISAoJyArIHNsb3ROb2Rlcy5sZW5ndGggKyAnIG1hdGNoZWQpJyk7XHJcblx0XHRcdFx0ZWxUby5hcHBlbmQocmVwbGFjZW1lbnROb2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWxUby5hcHBlbmQocmVwbGFjZW1lbnROb2RlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRyZXR1cm4gZWxUbztcclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IEpzZW4gZnJvbSAnQHdlYi1uYXRpdmUtanMvanNlbic7XHJcbmltcG9ydCBSZWZsZXggZnJvbSAnQHdlYi1uYXRpdmUtanMvcmVmbGV4JztcclxuaW1wb3J0IF9pc1N0cmluZyBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2pzL2lzU3RyaW5nLmpzJztcclxuaW1wb3J0IF9pc0FycmF5IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNBcnJheS5qcyc7XHJcbmltcG9ydCBfaXNOdW1lcmljIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNOdW1lcmljLmpzJztcclxuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNGdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBfYXJyRnJvbSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mcm9tLmpzJztcclxuaW1wb3J0IF9tZXJnZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9tZXJnZS5qcyc7XHJcbmltcG9ydCBfZWFjaCBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL29iai9lYWNoLmpzJztcclxuaW1wb3J0IF9jb3B5IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvb2JqL2NvcHkuanMnO1xyXG5pbXBvcnQgX2JlZm9yZSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL3N0ci9iZWZvcmUuanMnO1xyXG5pbXBvcnQgZGlzY29ubmVjdGVkQ2FsbGJhY2sgZnJvbSAnLi9kaXNjb25uZWN0ZWRDYWxsYmFjay5qcyc7XHJcbmltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4vY3JlYXRlRWxlbWVudC5qcyc7XHJcbmltcG9ydCBzY2hlbWEgZnJvbSAnLi9zY2hlbWEuanMnO1xyXG5pbXBvcnQgZ2xvYmFsUGFyYW1zIGZyb20gJy4uL3BhcmFtcy5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBDaHRtbCBjbGFzc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHRcdFx0XHRcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvcmUge1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgbmV3IENodG1sIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGRvY3VtZW50fEhUTUxFbGVtZW50XHRlbFxyXG5cdCAqIEBwYXJhbSBvYmplY3RcdFx0XHRcdHBhcmFtc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZWwsIHBhcmFtcyA9IHt9KSB7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3BhcmFtcycsIHtcclxuXHRcdFx0dmFsdWU6X21lcmdlKGdsb2JhbFBhcmFtcywgcGFyYW1zKSxcclxuXHRcdH0pO1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Rlc2NlbmRhbnRQYXJhbXMnLCB7XHJcblx0XHRcdHZhbHVlOl9jb3B5KHRoaXMucGFyYW1zKSxcclxuXHRcdH0pO1xyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19lbCcsIHt2YWx1ZTplbCwgZW51bWVyYWJsZTp0cnVlLH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdlbCcsIHtcclxuXHRcdFx0dmFsdWU6ZWwubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnID8gZWwucXVlcnlTZWxlY3RvcignaHRtbCcpIDogZWwsXHJcblx0XHRcdGVudW1lcmFibGU6dHJ1ZSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIC0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gUk9MRVNcclxuXHRcdC8vIC0tLS0tLS0tLS0tLVxyXG5cdFx0XHJcblx0XHRjb25zdCByb2xlcyA9IChlbC5nZXRBdHRyaWJ1dGUoZ2xvYmFsUGFyYW1zLmF0dHJNYXAuc3VwZXJyb2xlKSB8fCAnJylcclxuXHRcdFx0LnNwbGl0KCcgJykubWFwKHIgPT4gci50cmltKCkpLmZpbHRlcihyID0+IHIpO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyb2xlcycsIHt2YWx1ZTpyb2xlcywgZW51bWVyYWJsZTp0cnVlLH0pO1xyXG5cdFx0XHJcblx0XHQvLyAtLS0tLS0tLS0tLS1cclxuXHRcdC8vIFRSRUVcclxuXHRcdC8vIC0tLS0tLS0tLS0tLVxyXG5cdFx0XHJcblx0XHRjb25zdCB0cmVlID0ge307XHJcblx0XHRSZWZsZXguZGVmaW5lUHJvcGVydHkodGhpcywgZ2xvYmFsUGFyYW1zLnRyZWVQcm9wZXJ0eSwge3ZhbHVlOnRyZWUsIGVudW1lcmFibGU6dHJ1ZSx9KTtcclxuXHRcdFJlZmxleC50cmFwKHRyZWUsIChlLCByZWNpZXZlZCwgbmV4dCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gbmV4dChyZWNpZXZlZCB8fCB0aGlzLmdldE5vZGVzKGUucXVlcnkpKTtcclxuXHRcdH0sIHt0eXBlOidnZXQnfSk7XHJcblx0XHQvLyBUaGUgZm9sbG93aW5nIG5vZGVzLCBiZWluZyBwcmVsaXN0ZWQsXHJcblx0XHQvLyBjYW4gYmUgYWNjZXNzZWQgZHluYW1pY2FsbHlcclxuXHRcdGNvbnN0IG5vZGVzSGludCA9IChlbC5nZXRBdHRyaWJ1dGUoZ2xvYmFsUGFyYW1zLmF0dHJNYXAuaGludCkgfHwgJycpXHJcblx0XHRcdC5zcGxpdCgnICcpLm1hcChyID0+IHIudHJpbSgpKS5maWx0ZXIociA9PiByKTtcclxuXHRcdFJlZmxleC5pbml0KHRoaXNbZ2xvYmFsUGFyYW1zLnRyZWVQcm9wZXJ0eV0sIG5vZGVzSGludCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEdldHMgYSBub2RlIG9yIGxpc3Qgb2Ygbm9kZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nfGludHxhcnJheVx0IG5vZGVOYW1lc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiBDaHRtbHxhcnJheXxvYmplY3RcclxuXHQgKi9cclxuXHRnZXROb2Rlcyhub2RlTmFtZXMpIHtcclxuXHRcdF9hcnJGcm9tKG5vZGVOYW1lcykuZm9yRWFjaChub2RlTmFtZSA9PiB7XHJcblx0XHRcdGlmIChub2RlTmFtZSBpbiB0aGlzW2dsb2JhbFBhcmFtcy50cmVlUHJvcGVydHldICYmIHRoaXNbZ2xvYmFsUGFyYW1zLnRyZWVQcm9wZXJ0eV1bbm9kZU5hbWVdIGluc3RhbmNlb2YgQ29yZSkge1xyXG5cdFx0XHRcdC8vIEFycmF5cyBtdXN0IG5vdCBiZSByZXVzZWQhXHJcblx0XHRcdFx0Ly8gVGhlaXIgc291cmNlcyBvZiBub2RlcyBjYW50IGJlIGd1YXJhbnRlZWQgdG8gYmUgc2FtZS5cclxuXHRcdFx0XHQvLyB0aGlzW2dsb2JhbFBhcmFtcy50cmVlUHJvcGVydHldW25vZGVOYW1lXSBjb3VsZCBhbHNvIGJlIGFuIGVtcHR5IGdldHRlci9zZXR0ZXJcclxuXHRcdFx0XHQvLyBTbyB0aGUgaW5zdGFuY2VvZiBpcyB0aGUgd2F5IHRvIGdvIGZvciBib3RoIHByb2JsZW1zXHJcblx0XHRcdFx0cmV0dXJuIHRoaXNbZ2xvYmFsUGFyYW1zLnRyZWVQcm9wZXJ0eV1bbm9kZU5hbWVdO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBub2RlO1xyXG5cdFx0XHRpZiAoKG5vZGUgPSB0aGlzLmdldEV4cGxpY2l0Tm9kZShub2RlTmFtZSkpXHJcblx0XHRcdHx8IChub2RlID0gdGhpcy5nZXRJbXBsaWNpdE5vZGUobm9kZU5hbWUpKSkge1xyXG5cdFx0XHRcdHRoaXMuYWRkTm9kZShub2RlTmFtZSwgbm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIF9pc0FycmF5KG5vZGVOYW1lcykgPyBfb2JqRnJvbShub2RlTmFtZXMsIHRoaXNbZ2xvYmFsUGFyYW1zLnRyZWVQcm9wZXJ0eV0pIDogdGhpc1tnbG9iYWxQYXJhbXMudHJlZVByb3BlcnR5XVtub2RlTmFtZXNdO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBBdHRlbXB0cyB0byByZXNvbHZlIGEgbm9kZSBmcm9tIGV4cGxpY2l0IHRyZWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nXHRcdFx0XHRyZXF1ZXN0Tm9kZU5hbWVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTEVsZW1lbnRcclxuXHQgKi9cclxuXHRnZXRFeHBsaWNpdE5vZGUocmVxdWVzdE5vZGVOYW1lKSB7XHJcblx0XHQvLyBJZiBnaXZlbiBhIHJvbGVjYXNlLCB3ZSBjYW4gcGVyZm9ybSBhIHF1ZXJ5IGlmIHdlIHVuZGVyc3RhbmQgdGhlIHNlbWFudGljcy5cclxuXHRcdGlmICh0aGlzLnJvbGVzICYmIHRoaXMucm9sZXMubGVuZ3RoKSB7XHJcblx0XHRcdHZhciByb2xlcyA9IGdsb2JhbFBhcmFtcy5yb2xlY2FzZSA/IFtnbG9iYWxQYXJhbXMucm9sZWNhc2VdIDogdGhpcy5yb2xlcztcclxuXHRcdFx0Ly8gRmluZCBtYXRjaGVzLi4uXHJcblx0XHRcdHZhciBDU1NFc2NhcGUgPSBnbG9iYWxQYXJhbXMuY29udGV4dC5DU1MgPyBnbG9iYWxQYXJhbXMuY29udGV4dC5DU1MuZXNjYXBlIDogc3RyID0+IHN0cjtcclxuXHRcdFx0cmV0dXJuIHJvbGVzLnJlZHVjZSgobWF0Y2hlZE5vZGUsIHJvbGUpID0+IHtcclxuXHRcdFx0XHRpZiAoIW1hdGNoZWROb2RlKSB7XHJcblx0XHRcdFx0XHR2YXIgY2xvc2VzdFN1cGVyU2VsZWN0b3IgPSAnWycgKyBDU1NFc2NhcGUoZ2xvYmFsUGFyYW1zLmF0dHJNYXAuc3VwZXJyb2xlKSArICd+PVwiJyArIHJvbGUgKyAnXCJdJztcclxuXHRcdFx0XHRcdHZhciBub2RlU2VsZWN0b3IgPSAnWycgKyBDU1NFc2NhcGUoZ2xvYmFsUGFyYW1zLmF0dHJNYXAuc3Vicm9sZSkgKyAnfj1cIicgKyByb2xlICsgJy0nICsgcmVxdWVzdE5vZGVOYW1lICsgJ1wiXSc7XHJcblx0XHRcdFx0XHR2YXIgY2xvc2VzdFN1cGVyLCBfbWF0Y2hlZE5vZGU7XHJcblx0XHRcdFx0XHRpZiAoKF9tYXRjaGVkTm9kZSA9ICh0aGlzLmVsLnNoYWRvd1Jvb3QgfHwgdGhpcy5lbCkucXVlcnlTZWxlY3Rvcihub2RlU2VsZWN0b3IpKVxyXG5cdFx0XHRcdFx0Ly8gSWYgdGhpcy5lbCBoYXMgYSBzaGFkb3dSb290LCB3ZSBkb24ndCBleHBlY3QgX21hdGNoZWROb2RlIHRvIGJlIGFibGUgdG8gZmluZCBpcyBzdXBlclJvbGUgZWxlbWVudC5cclxuXHRcdFx0XHRcdC8vIElmIGl0IGZpbmRzIG9uZSwgdGhlbiBpdHMgbm90IGZvciB0aGUgY3VycmVuIHN1cGVyUm9sZSBlbGVtZW50LlxyXG5cdFx0XHRcdFx0JiYgKCh0aGlzLmVsLnNoYWRvd1Jvb3QgJiYgIShfbWF0Y2hlZE5vZGUucGFyZW50Tm9kZS5jbG9zZXN0ICYmIF9tYXRjaGVkTm9kZS5wYXJlbnROb2RlLmNsb3Nlc3QoY2xvc2VzdFN1cGVyU2VsZWN0b3IpKSlcclxuXHRcdFx0XHRcdC8vIF9tYXRjaGVkTm9kZSBtdXN0IGZpbmQgdGhpcy5lbCBhcyBpdHMgc3VwZXJSb2xlIGVsZW1lbnQgdG8gcXVhbGlmeS5cclxuXHRcdFx0XHRcdFx0fHwgKCF0aGlzLmVsLnNoYWRvd1Jvb3QgJiYgX21hdGNoZWROb2RlLnBhcmVudE5vZGUgJiYgKGNsb3Nlc3RTdXBlciA9IF9tYXRjaGVkTm9kZS5wYXJlbnROb2RlLmNsb3Nlc3QoY2xvc2VzdFN1cGVyU2VsZWN0b3IpKSAmJiBjbG9zZXN0U3VwZXIuaXNTYW1lTm9kZSh0aGlzLmVsKSlcclxuXHRcdFx0XHRcdCkpIHtcclxuXHRcdFx0XHRcdFx0bWF0Y2hlZE5vZGUgPSBfbWF0Y2hlZE5vZGU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBtYXRjaGVkTm9kZTtcclxuXHRcdFx0fSwgbnVsbCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEF0dGVtcHRzIHRvIHJlc29sdmUgYSBub2RlIGZyb20gaW1wbGljaXQgdHJlZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmdcdFx0XHRcdHJlcXVlc3ROb2RlTmFtZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRWxlbWVudHxhcnJheVxyXG5cdCAqL1xyXG5cdGdldEltcGxpY2l0Tm9kZShyZXF1ZXN0Tm9kZU5hbWUpIHtcclxuXHRcdGlmIChfaXNOdW1lcmljKHJlcXVlc3ROb2RlTmFtZSkgfHwgcmVxdWVzdE5vZGVOYW1lLm1hdGNoKC9bXmEtekEtWjAtOVxcLV0vKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQvLyBVc2Ugc2NoZW1hLi4uXHJcblx0XHR2YXIgbm9kZVNjaGVtYSwgbm9kZVNlbGVjdG9yID0gW107XHJcblx0XHR2YXIgdHJpZXMgPSBbXTtcclxuXHRcdGlmIChzY2hlbWEuYXJpYVtyZXF1ZXN0Tm9kZU5hbWVdKSB7XHJcblx0XHRcdHRyaWVzLnB1c2goe1xyXG5cdFx0XHRcdHNjaGVtYTogc2NoZW1hLmFyaWFbcmVxdWVzdE5vZGVOYW1lXSxcclxuXHRcdFx0XHRzZWxlY3RvcjogWydbcm9sZT1cIicgKyByZXF1ZXN0Tm9kZU5hbWUgKyAnXCJdJ10sXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dHJpZXMucHVzaCh7XHJcblx0XHRcdFx0c2NoZW1hOiBzY2hlbWEuc3RkW3JlcXVlc3ROb2RlTmFtZV0gfHwgc2NoZW1hLmFyaWFbcmVxdWVzdE5vZGVOYW1lXSxcclxuXHRcdFx0XHRzZWxlY3RvcjogW3JlcXVlc3ROb2RlTmFtZSwgJ1tyb2xlPVwiJyArIHJlcXVlc3ROb2RlTmFtZSArICdcIl0nXSxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRfZWFjaChzY2hlbWEuc3RkLCAodGFnbmFtZSwgc2NoZW1hKSA9PiB7XHJcblx0XHRcdGlmIChzY2hlbWEuaW1wbGljaXRSb2xlID09PSByZXF1ZXN0Tm9kZU5hbWUpIHtcclxuXHRcdFx0XHR0cmllcy5wdXNoKHtcclxuXHRcdFx0XHRcdHNjaGVtYTogc2NoZW1hLFxyXG5cdFx0XHRcdFx0c2VsZWN0b3I6IFt0YWduYW1lXSxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR2YXIgbWF0Y2hlcyA9IG51bGw7XHJcblx0XHR0cmllcy5mb3JFYWNoKHRyaWUgPT4ge1xyXG5cdFx0XHQodGhpcy5lbC5zaGFkb3dSb290IHx8IHRoaXMuZWwpLnF1ZXJ5U2VsZWN0b3JBbGwodHJpZS5zZWxlY3Rvci5qb2luKCcsJykpLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdFx0aWYgKHNjaGVtYS5hc3NlcnROb2RlQmVsb25nc0luU2NvcGVBcyh0aGlzLmVsLCBub2RlLCB0cmllLnNjaGVtYSkpIHtcclxuXHRcdFx0XHRcdGlmICh0cmllLnNjaGVtYSAmJiB0cmllLnNjaGVtYS5zaW5nbGV0b24pIHtcclxuXHRcdFx0XHRcdFx0bWF0Y2hlcyA9IG5vZGU7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCFtYXRjaGVzIHx8IF9pc0FycmF5KG1hdGNoZXMpKSB7XHJcblx0XHRcdFx0XHRcdG1hdGNoZXMgPSBtYXRjaGVzIHx8IFtdO1xyXG5cdFx0XHRcdFx0XHRtYXRjaGVzLnB1c2gobm9kZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKCFtYXRjaGVzICYmIHRyaWUuc2NoZW1hICYmICF0cmllLnNjaGVtYS5zaW5nbGV0b24pIHtcclxuXHRcdFx0XHRtYXRjaGVzID0gW107XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG1hdGNoZXM7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBub2RlIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZ3xpbnRcdCBub2RlTmFtZVxyXG5cdCAqIEBwYXJhbSBtaXhlZFx0XHRcdCBub2RlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIENvcmVcclxuXHQgKi9cclxuXHRhZGROb2RlKG5vZGVOYW1lLCBub2RlKSB7XHJcblx0XHR2YXIgbm9kZUNvbXBvbmVudCwgZmFjdG9yeSA9IHRoaXMucGFyYW1zLmZhY3RvcnkgfHwgKChlbCwgcGFyYW1zKSA9PiBuZXcgQ29yZShlbCwgcGFyYW1zKSk7XHJcblx0XHRpZiAoX2lzQXJyYXkobm9kZSkpIHtcclxuXHRcdFx0Ly8gU3RpbGwgc2V0IHRoZSBjb2xsZWN0aW9uIGFzIG5vZGUsIGV2ZW4gdGhvIGl0IHdvbnQgYmUgcmV1c2VkLlxyXG5cdFx0XHRub2RlQ29tcG9uZW50ID0gbm9kZS5tYXAoX25vZGUgPT4gZmFjdG9yeShfbm9kZSwgdGhpcy5kZXNjZW5kYW50UGFyYW1zKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRub2RlQ29tcG9uZW50ID0gZmFjdG9yeShub2RlLCB0aGlzLmRlc2NlbmRhbnRQYXJhbXMpO1xyXG5cdFx0XHQvLyBXZSdsbCByZW1vdmUgZnJvbSB0cmVlIGF0IHRoZVxyXG5cdFx0XHQvLyB0aW1lIGl0IGxlYXZlcyB0aGUgRE9NXHJcblx0XHRcdGRpc2Nvbm5lY3RlZENhbGxiYWNrKG5vZGUsICgpID0+IHtcclxuXHRcdFx0XHRSZWZsZXguZGVsKHRoaXNbZ2xvYmFsUGFyYW1zLnRyZWVQcm9wZXJ0eV0sIG5vZGVOYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRSZWZsZXguc2V0KHRoaXNbZ2xvYmFsUGFyYW1zLnRyZWVQcm9wZXJ0eV0sIG5vZGVOYW1lLCBub2RlQ29tcG9uZW50KTtcclxuXHRcdHJldHVybiBub2RlQ29tcG9uZW50O1xyXG5cdH1cclxufTtcclxuIiwiXHJcbi8qKlxyXG4gKiBAaW1wb3J0c1xyXG4gKi9cclxuaW1wb3J0IGdsb2JhbFBhcmFtcyBmcm9tICcuLi9wYXJhbXMuanMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgb3IgZmluZHMgYSBET00gZWxlbWVudCBmcm9tIHNvdXJjZS5cclxuICpcclxuICogQHBhcmFtIHN0cmluZ1x0XHRzb3VyY2VcclxuICogQHBhcmFtIG9iamVjdFx0XHRjb250ZXh0RG9jdW1lbnRcclxuICpcclxuICogQHJldHVybiBIVE1MRWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc291cmNlLCBjb250ZXh0RG9jdW1lbnQgPSBudWxsKSB7XHJcblx0Y29udGV4dERvY3VtZW50ID0gY29udGV4dERvY3VtZW50IHx8IGdsb2JhbFBhcmFtcy5jb250ZXh0LmRvY3VtZW50O1xyXG5cdGlmIChjb250ZXh0RG9jdW1lbnQpIHtcclxuXHRcdHZhciBlbDtcclxuXHRcdGlmIChzb3VyY2UudHJpbSgpLnN0YXJ0c1dpdGgoJzwnKSkge1xyXG5cdFx0XHQvLyBDcmVhdGUgYSBub2RlIGZyb20gbWFya3VwXHJcblx0XHRcdHZhciB0ZW1wID0gY29udGV4dERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHR0ZW1wLmlubmVySHRtbCA9IHNvdXJjZTtcclxuXHRcdFx0ZWwgPSB0ZW1wLmZpcnN0Q2hpbGQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbCA9IGNvbnRleHREb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNvdXJjZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZWw7XHJcblx0fVxyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2FyckZyb20gZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvZnJvbS5qcyc7XHJcbmltcG9ydCBnbG9iYWxQYXJhbXMgZnJvbSAnLi4vcGFyYW1zLmpzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgTXV0YXRpb25PYnNlcnZlciB0aGF0IGZpcmVzIHdoZW5cclxuICogdGhlIGVsZW1lbnQgbGVhdmVzIHRoZSBET00uXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmdcdFx0XHRcdFx0XHRpbnB1dFxyXG4gKiBAcGFyYW0gZnVuY3Rpb25cdFx0XHRcdFx0Y2FsbGJhY2tcclxuICpcclxuICogQHJldHVybiB2b2lkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNjb25uZWN0ZWRDYWxsYmFjayhlbCwgY2FsbGJhY2spIHtcclxuXHRpZiAoZWwucGFyZW50Tm9kZSAmJiBnbG9iYWxQYXJhbXMuY29udGV4dC5NdXRhdGlvbk9ic2VydmVyKSB7XHJcblx0XHR2YXIgY2FsbGVkID0gZmFsc2U7XHJcblx0XHR2YXIgb2JzZXJ2ZXIgPSBuZXcgZ2xvYmFsUGFyYW1zLmNvbnRleHQuTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xyXG5cdFx0XHRtdXRhdGlvbnMuZm9yRWFjaChtID0+IHtcclxuXHRcdFx0XHRpZiAoIWNhbGxlZCAmJiBfYXJyRnJvbShtLnJlbW92ZWROb2RlcykuaW5jbHVkZXMoZWwpKSB7XHJcblx0XHRcdFx0XHRjYWxsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0XHRvYnNlcnZlci5vYnNlcnZlKGVsLnBhcmVudE5vZGUsIHtjaGlsZExpc3Q6dHJ1ZX0pO1xyXG5cdFx0ZGlzY29ubmVjdGVkQ2FsbGJhY2soZWwucGFyZW50Tm9kZSwgKCkgPT4ge1xyXG5cdFx0XHRpZiAoIWNhbGxlZCkge1xyXG5cdFx0XHRcdGNhbGxlZCA9IHRydWU7XHJcblx0XHRcdFx0Y2FsbGJhY2soKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG4iLCJcclxuLyoqXHJcbiAqIEBpbXBvcnRzXHJcbiAqL1xyXG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvanMvaXNPYmplY3QuanMnO1xyXG5pbXBvcnQgX3B1c2hVbmlxdWUgZnJvbSAnQHdlYi1uYXRpdmUtanMvY29tbW9ucy9hcnIvcHVzaFVuaXF1ZS5qcyc7XHJcbmltcG9ydCBfaW50ZXJzZWN0IGZyb20gJ0B3ZWItbmF0aXZlLWpzL2NvbW1vbnMvYXJyL2ludGVyc2VjdC5qcyc7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRoZSBIVE1MIENvbnRleHQgTW9kZWwgU2NoZW1hLlxyXG4gKiBAc2VlIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cdFx0XHRcdFxyXG5cclxuLyoqXHJcbiAqIEBvYmplY3RcclxuICovXHJcbmNvbnN0IFNjaGVtYSA9IHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBAb2JqZWN0XHJcblx0ICovXHJcblx0c3RkOiB7XHJcblx0XHQvKipcclxuXHRcdCAqIEB1bmNhdGVnb3JpemVkXHJcblx0XHQgKi9cclxuXHRcdGh0bWw6IHtcclxuXHRcdFx0dHlwZTogWycjc2VjdGlvbmluZy1yb290J10sXHJcblx0XHRcdG1vZGVsOiBbJ2hlYWQnLCAnYm9keSddLFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0Y2FwdGlvbjoge1xyXG5cdFx0XHRtb2RlbDogWycjZmxvdycsICchdGFibGUnXSxcclxuXHRcdFx0c2luZ2xldG9uOiB0cnVlLFxyXG5cdFx0fSxcclxuXHRcdGNvbDoge1xyXG5cdFx0XHRtb2RlbDogWycjbm90aGluZyddLFxyXG5cdFx0fSxcclxuXHRcdGNvbGdyb3VwOiB7XHJcblx0XHRcdG1vZGVsOiBbeydjb2xncm91cFtzcGFuXSc6IFsnI25vdGhpbmcnXX0sIHsnOm5vdChjb2xncm91cFtzcGFuXSknOiBbJ2NvbCcsICd0ZW1wbGF0ZSddfV0sXHJcblx0XHRcdHNpbmdsZXRvbjogdHJ1ZSxcclxuXHRcdH0sXHJcblx0XHRkZDoge1xyXG5cdFx0XHRtb2RlbDogWycjZmxvdyddLFxyXG5cdFx0XHRpbXBsaWNpdFJvbGU6ICdkZWZpbml0aW9uJyxcclxuXHRcdH0sXHJcblx0XHRkdDoge1xyXG5cdFx0XHRtb2RlbDogWycjZmxvdycsICchI2hlYWRpbmcnLCAnISNzZWN0aW9uaW5nJywgJyFoZWFkZXInLCAnIWZvb3RlciddLFxyXG5cdFx0XHRpbXBsaWNpdFJvbGU6ICd0ZXJtJyxcclxuXHRcdH0sXHJcblx0XHRmaWdjYXB0aW9uOiB7XHJcblx0XHRcdG1vZGVsOiBbJyNmbG93J10sXHJcblx0XHRcdHNpbmdsZXRvbjogdHJ1ZSxcclxuXHRcdH0sXHJcblx0XHRoZWFkOiB7XHJcblx0XHRcdG1vZGVsOiBbJyNtZXRhZGF0YSddLFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0bGVnZW5kOiB7XHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0bGk6IHtcclxuXHRcdFx0bW9kZWw6IFsnI2Zsb3cnXSxcclxuXHRcdFx0aW1wbGljaXRSb2xlOiAnbGlzdGl0ZW0nLFxyXG5cdFx0fSxcclxuXHRcdG9wdGdyb3VwOiB7XHJcblx0XHRcdG1vZGVsOiBbJ29wdGlvbicsICcjc2NyaXB0LXN1cHBvcnRpbmcnXSxcclxuXHRcdFx0aW1wbGljaXRSb2xlOiAnZ3JvdXAnLFxyXG5cdFx0fSxcclxuXHRcdG9wdGlvbjoge1xyXG5cdFx0XHRtb2RlbDogW3snb3B0aW9uW2xhYmVsXVt2YWx1ZV0nOiBbJyNub3RoaW5nJ119LCB7J29wdGlvbltsYWJlbF06bm90KG9wdGlvblt2YWx1ZV0pJzogWycjdGV4dCddfSwgeyc6bm90KG9wdGlvbltsYWJlbF0pJzogWycjdGV4dCddfV0sXHJcblx0XHR9LFxyXG5cdFx0cGFyYW06IHtcclxuXHRcdFx0bW9kZWw6IFsnI25vdGhpbmcnXSxcclxuXHRcdH0sXHJcblx0XHRycDoge1xyXG5cdFx0XHRtb2RlbDogWycjdGV4dCddLFxyXG5cdFx0fSxcclxuXHRcdHJ0OiB7XHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0fSxcclxuXHRcdHNvdXJjZToge1xyXG5cdFx0XHRtb2RlbDogWycjbm90aGluZyddLFxyXG5cdFx0fSxcclxuXHRcdHN1bW1hcnk6IHtcclxuXHRcdFx0Lypjb21wbGljYXRlZCovXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZycsICcjaGVhZGluZyddLFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0dHJhY2s6IHtcclxuXHRcdFx0bW9kZWw6IFsnI25vdGhpbmcnXSxcclxuXHRcdH0sXHJcblx0XHR0Ym9keToge1xyXG5cdFx0XHRtb2RlbDogWycjc2NyaXB0LXN1cHBvcnRpbmcnLCAndHInXSxcclxuXHRcdH0sXHJcblx0XHR0ZDoge1xyXG5cdFx0XHRtb2RlbDogWycjZmxvdycsICchI2hlYWRpbmcnLCAnISNzZWN0aW9uaW5nJywgJyFoZWFkZXInLCAnIWZvb3RlciddLFxyXG5cdFx0fSxcclxuXHRcdHRmb290OiB7XHJcblx0XHRcdG1vZGVsOiBbJ3RyJywgJyNzY3JpcHQtc3VwcG9ydGluZyddLFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0dGhlYWQ6IHtcclxuXHRcdFx0bW9kZWw6IFsndHInLCAnI3NjcmlwdC1zdXBwb3J0aW5nJ10sXHJcblx0XHRcdHNpbmdsZXRvbjogdHJ1ZSxcclxuXHRcdH0sXHJcblx0XHR0cjoge1xyXG5cdFx0XHRtb2RlbDogWycjc2NyaXB0LXN1cHBvcnRpbmcnLCAndGQnLCAndGgnXSxcclxuXHRcdH0sXHJcblx0XHQvKipcclxuXHRcdCAqIEBjYXRlZ29yaXplZFxyXG5cdFx0ICovXHJcblx0XHRhOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgeydhW2hyZWZdJzogWycjaW50ZXJhY3RpdmUnLCAnI3BhbHBhYmxlJ119XSwgXHJcblx0XHRcdG1vZGVsOiBbJyN0cmFuc3BhcmVudCcsICchI2ludGVyYWN0aXZlJywgJyFhJ10sXHJcblx0XHR9LFxyXG5cdFx0YWJicjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZScsICcjcGhyYXNpbmcnXSxcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJyxdLFxyXG5cdFx0fSxcclxuXHRcdGFkZHJlc3M6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNmbG93JywgJyEjaGVhZGluZycsICchI3NlY3Rpb25pbmcnLCAnIWhlYWRlcicsICchZm9vdGVyJywgJyFhZGRyZXNzJyxdLFxyXG5cdFx0fSxcclxuXHRcdC8vIElmIGEgY2hpbGQgb2YgPG1hcD5cclxuXHRcdGFyZWE6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGhyYXNpbmcnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNub3RoaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0YXJ0aWNsZToge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZScsICcjc2VjdGlvbmluZy1jb250ZW50J10sIFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdyddLFxyXG5cdFx0XHRpbXBsaWNpdFJvbGU6ICdhcnRpY2xlJyxcclxuXHRcdFx0YWNjZXB0YWJsZVJvbGVzOiBbJ2FwcGxpY2F0aW9uJywgJ2FydGljbGUnLCAnZG9jdW1lbnQnLCAnbWFpbicsXSxcclxuXHRcdH0sXHJcblx0XHRhc2lkZToge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZScsICcjc2VjdGlvbmluZy1jb250ZW50J10sIFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdyddLFxyXG5cdFx0XHRpbXBsaWNpdFJvbGU6ICdjb21wbGVtZW50YXJ5JyxcclxuXHRcdFx0YWNjZXB0YWJsZVJvbGVzOiBbJ2NvbXBsZW1lbnRhcnknLCAnbm90ZScsICdzZWFyY2gnLF0sXHJcblx0XHR9LFxyXG5cdFx0YXVkaW86IHtcclxuXHRcdFx0dHlwZTogWycjZW1iZWRkZWQnLCAnI2Zsb3cnLCAnI3BocmFzaW5nJywgeydhdWRpb1tjb250cm9sc10nOiBbJyNpbnRlcmFjdGl2ZScsICcjcGFscGFibGUnXX1dLCBcclxuXHRcdFx0bW9kZWw6IFsnI3RyYW5zcGFyZW50JywgJyEjbWVkaWEnLCAndHJhY2snLCB7Jzpub3QoYXVkaW9bc3JjXSknOiBbJ3NvdXJjZSddfV0sXHJcblx0XHR9LFxyXG5cdFx0Yjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZScsICcjcGhyYXNpbmcnXSxcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0YmFzZToge1xyXG5cdFx0XHR0eXBlOiBbJyNtZXRhZGF0YSddLFxyXG5cdFx0XHRtb2RlbDogWycjbm90aGluZyddLFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0YmRpOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BhbHBhYmxlJywgJyNwaHJhc2luZyddLFxyXG5cdFx0XHRtb2RlbDogWycjcGhyYXNpbmcnXSxcclxuXHRcdH0sXHJcblx0XHRiZG86IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGFscGFibGUnLCAnI3BocmFzaW5nJ10sXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0fSxcclxuXHRcdGJsb2NrcXVvdGU6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGFscGFibGUnLCAnI3NlY3Rpb25pbmctcm9vdCddLFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdyddLFxyXG5cdFx0fSxcclxuXHRcdGJvZHk6IHtcclxuXHRcdFx0dHlwZTogWycjc2VjdGlvbmluZy1yb290J10sIFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdycsICdAYmFubmVyJywgJ0Bjb250ZW50aW5mbycsICdAY29tcGxlbWVudGFyeScsICdAbWFpbiddLFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0YnI6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGhyYXNpbmcnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNub3RoaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0YnV0dG9uOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI2ludGVyYWN0aXZlJywgJyNwYWxwYWJsZScsICcjcGhyYXNpbmcnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZycsICchI2ludGVyYWN0aXZlJ10sXHJcblx0XHR9LFxyXG5cdFx0Y2FudmFzOiB7XHJcblx0XHRcdHR5cGU6IFsnI2VtYmVkZGVkJywgJyNmbG93JywgJyNwYWxwYWJsZScsICcjcGhyYXNpbmcnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyN0cmFuc3BhcmVudCcsICchI2ludGVyYWN0aXZlJywgJ2EnLCAnaW1nW3VzZW1hcF0nLCAnYnV0dG9uJywgJ2lucHV0W3R5cGU9XCJidXR0b25cIl0nLCAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScsICdzZWxlY3RbbXVsdGlwbGVdJywgJ3NlbGVjdFtzaXplPj0xXScsIC8qaGFzIHRhYmluZGV4IGJ1dCBub3QgI2ludGVyYWN0aXZlKi8nW3RhYmluZGV4XSEjaW50ZXJhY3RpdmUnXSxcclxuXHRcdH0sXHJcblx0XHRjaXRlOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BhbHBhYmxlJywgJyNwaHJhc2luZyddLFxyXG5cdFx0XHRtb2RlbDogWycjcGhyYXNpbmcnXSxcclxuXHRcdH0sXHJcblx0XHRjb2RlOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BhbHBhYmxlJywgJyNwaHJhc2luZyddLFxyXG5cdFx0XHRtb2RlbDogWycjcGhyYXNpbmcnXSxcclxuXHRcdH0sXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BhbHBhYmxlJywgJyNwaHJhc2luZyddLFxyXG5cdFx0XHRtb2RlbDogWycjcGhyYXNpbmcnXSxcclxuXHRcdH0sXHJcblx0XHRkYXRhbGlzdDoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwaHJhc2luZyddLFxyXG5cdFx0XHRtb2RlbDogWycjcGhyYXNpbmcnLCAnI3NjcmlwdC1zdXBwb3J0aW5nJywgJ29wdGlvbiddLFxyXG5cdFx0fSxcclxuXHRcdGRlbDoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwaHJhc2luZyddLFxyXG5cdFx0XHRtb2RlbDogWycjdHJhbnNwYXJlbnQnXSxcclxuXHRcdH0sXHJcblx0XHRkZXRhaWxzOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI2ludGVyYWN0aXZlJywgJyNwYWxwYWJsZScsICcjc2VjdGlvbmluZy1yb290J10sXHJcblx0XHRcdG1vZGVsOiBbJyNmbG93JywgJ3N1bW1hcnknXSxcclxuXHRcdH0sXHJcblx0XHRkZm46IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGFscGFibGUnLCAnI3BocmFzaW5nJ10sXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZycsICchZGZuJ10sXHJcblx0XHRcdGltcGxpY2l0Um9sZTogJ3Rlcm0nLFxyXG5cdFx0fSxcclxuXHRcdGRpYWxvZzoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNzZWN0aW9uaW5nLXJvb3QnXSxcclxuXHRcdFx0bW9kZWw6IFsnI2Zsb3cnXSxcclxuXHRcdFx0aW1wbGljaXRSb2xlOiAnZGlhbG9nJyxcclxuXHRcdH0sXHJcblx0XHRkaXY6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGFscGFibGUnXSxcclxuXHRcdFx0Lypjb21wbGljYXRlZCovXHJcblx0XHRcdG1vZGVsOiBbeydkbCA+IGRpdic6IFsnZHQnLCAnZGQnXX0sIHtkaXYvKlRPRE8nOm5vdChkbCA+IGRpdiknKi86IFsnI2Zsb3cnXX1dLFxyXG5cdFx0fSxcclxuXHRcdGRsOiB7XHJcblx0XHRcdC8qY29tcGxpY2F0ZWQqL1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgLyp7OmNvbnRhaW5zKD4gKiBuYW1lLXZhbHVlIGdyb3VwKTogWycjcGFscGFibGUnXX0qL10sXHJcblx0XHRcdC8qY29tcGxpY2F0ZWQqL1xyXG5cdFx0XHRtb2RlbDogWycjc2NyaXB0LXN1cHBvcnRpbmcnLCAnZGwnLCAnZHQnLCAnZGl2J10sXHJcblx0XHR9LFxyXG5cdFx0ZW06IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGFscGFibGUnLCAnI3BocmFzaW5nJ10sXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0fSxcclxuXHRcdGVtYmVkOiB7XHJcblx0XHRcdHR5cGU6IFsnI2VtYmVkZGVkJywgJyNmbG93JywgJyNwaHJhc2luZycsICcjaW50ZXJhY3RpdmUnLCAnI3BhbHBhYmxlJ10sIFxyXG5cdFx0XHRtb2RlbDogWycjbm90aGluZyddLFxyXG5cdFx0fSxcclxuXHRcdGZpZWxkc2V0OiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3NlY3Rpb25pbmctcm9vdCcsICcjcGFscGFibGUnXSxcclxuXHRcdFx0bW9kZWw6IFsnbGVnZW5kJywgJyNmbG93J10sXHJcblx0XHR9LFxyXG5cdFx0ZmlndXJlOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3NlY3Rpb25pbmctcm9vdCcsICcjcGFscGFibGUnXSxcclxuXHRcdFx0bW9kZWw6IFsnI2Zsb3cnLCAnZmlnY2FwdGlvbiddLFxyXG5cdFx0XHRpbXBsaWNpdFJvbGU6ICdmaWd1cmUnLFxyXG5cdFx0fSxcclxuXHRcdGZvb3Rlcjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZSddLFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdycsICchaGVhZGVyJywgJyFmb290ZXInXSxcclxuXHRcdFx0YWNjZXB0YWJsZVJvbGVzOiBbJ2NvbnRlbnRpbmZvJyxdLFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0Zm9ybToge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZSddLFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdycsICchZm9ybSddLFxyXG5cdFx0fSxcclxuXHRcdGgxOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI2hlYWRpbmcnLCAnI3BhbHBhYmxlJ10sXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0XHRpbXBsaWNpdFJvbGU6ICdoZWFkaW5nJyxcclxuXHRcdH0sXHJcblx0XHRoMjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNoZWFkaW5nJywgJyNwYWxwYWJsZSddLFxyXG5cdFx0XHRtb2RlbDogWycjcGhyYXNpbmcnXSxcclxuXHRcdFx0aW1wbGljaXRSb2xlOiAnaGVhZGluZycsXHJcblx0XHR9LFxyXG5cdFx0aDM6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjaGVhZGluZycsICcjcGFscGFibGUnXSxcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHRcdGltcGxpY2l0Um9sZTogJ2hlYWRpbmcnLFxyXG5cdFx0fSxcclxuXHRcdGg0OiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI2hlYWRpbmcnLCAnI3BhbHBhYmxlJ10sXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0XHRpbXBsaWNpdFJvbGU6ICdoZWFkaW5nJyxcclxuXHRcdH0sXHJcblx0XHRoNToge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNoZWFkaW5nJywgJyNwYWxwYWJsZSddLFxyXG5cdFx0XHRtb2RlbDogWycjcGhyYXNpbmcnXSxcclxuXHRcdFx0aW1wbGljaXRSb2xlOiAnaGVhZGluZycsXHJcblx0XHR9LFxyXG5cdFx0aDY6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjaGVhZGluZycsICcjcGFscGFibGUnXSxcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHRcdGltcGxpY2l0Um9sZTogJ2hlYWRpbmcnLFxyXG5cdFx0fSxcclxuXHRcdGhlYWRlcjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZSddLFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdycsICchaGVhZGVyJywgJyFmb290ZXInXSxcclxuXHRcdFx0YWNjZXB0YWJsZVJvbGVzOiBbJ2Jhbm5lcicsXSxcclxuXHRcdFx0c2luZ2xldG9uOiB0cnVlLFxyXG5cdFx0fSxcclxuXHRcdGhncm91cDoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNoZWFkaW5nJywgJyNwYWxwYWJsZSddLFxyXG5cdFx0XHRtb2RlbDogWydoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICcjc2NyaXB0LXN1cHBvcnRpbmcnXSxcclxuXHRcdH0sXHJcblx0XHRocjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93J10sXHJcblx0XHRcdG1vZGVsOiBbJyNub3RoaW5nJ10sXHJcblx0XHRcdGltcGxpY2l0Um9sZTogJ3NlcGFyYXRvcicsXHJcblx0XHR9LFxyXG5cdFx0aToge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZScsICcjcGhyYXNpbmcnXSxcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0aWZyYW1lOiB7XHJcblx0XHRcdHR5cGU6IFsnI2VtYmVkZGVkJywgJyNmbG93JywgJyNwaHJhc2luZycsICcjaW50ZXJhY3RpdmUnLCAnI3BhbHBhYmxlJ10sIFxyXG5cdFx0XHRtb2RlbDogWycjbm90aGluZyddLFxyXG5cdFx0fSxcclxuXHRcdGltZzoge1xyXG5cdFx0XHR0eXBlOiBbJyNlbWJlZGRlZCcsICcjZmxvdycsICcjcGhyYXNpbmcnLCB7J2ltZ1t1c2VtYXBdJzogWycjaW50ZXJhY3RpdmUnLCAnI3BhbHBhYmxlJ119XSwgXHJcblx0XHRcdG1vZGVsOiBbJyNub3RoaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0aW5wdXQ6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGhyYXNpbmcnLCB7J2lucHV0Om5vdChbdHlwZSE9XCJoaWRkZW5cIl0pJzogWycjaW50ZXJhY3RpdmUnLCAnI3BhbHBhYmxlJ119XSwgXHJcblx0XHRcdG1vZGVsOiBbJyNub3RoaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0aW5zOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3RyYW5zcGFyZW50J10sXHJcblx0XHR9LFxyXG5cdFx0a2JkOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0bGFiZWw6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGhyYXNpbmcnLCAnI2ludGVyYWN0aXZlJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJywgJyFsYWJlbCddLFxyXG5cdFx0fSxcclxuXHRcdGxpbms6IHtcclxuXHRcdFx0dHlwZTogWycjbWV0YWRhdGEnLCB7J2JvZHkgbGluayc6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJ119XSwgXHJcblx0XHRcdG1vZGVsOiBbJyNub3RoaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0bWFpbjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI2Zsb3cnXSxcclxuXHRcdFx0aW1wbGljaXRSb2xlOiAnbWFpbicsXHJcblx0XHRcdHNpbmdsZXRvbjogdHJ1ZSxcclxuXHRcdH0sXHJcblx0XHRtYXA6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGhyYXNpbmcnLCAnI3BhbHBhYmxlJ10sIFxyXG5cdFx0XHRtb2RlbDogWycjdHJhbnNwYXJlbnQnXSxcclxuXHRcdH0sXHJcblx0XHRtYXJrOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3RyYW5zcGFyZW50J10sXHJcblx0XHR9LFxyXG5cdFx0bWF0aDoge1xyXG5cdFx0XHR0eXBlOiBbJyNlbWJlZGRlZCcsICcjZmxvdycsICcjcGhyYXNpbmcnLCAnI3BhbHBhYmxlJ10sIFxyXG5cdFx0XHQvKmNvbXBsaWNhdGVkKi9cclxuXHRcdFx0bW9kZWw6IFtdLFxyXG5cdFx0fSxcclxuXHRcdG1lbnU6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsIHsnOmNvbnRhaW5zKD4gbGkpJzogWycjcGFscGFibGUnXX1dLCBcclxuXHRcdFx0bW9kZWw6IFsnI3NjcmlwdC1zdXBwb3J0aW5nJywgJ2xpJ10sXHJcblx0XHRcdGltcGxpY2l0Um9sZTogJ2xpc3QnLFxyXG5cdFx0fSxcclxuXHRcdG1ldGE6IHtcclxuXHRcdFx0dHlwZTogWycjbWV0YWRhdGEnLCB7J21ldGFbaXRlbXByb3BdJzogWycjZmxvdycsICcjcGhyYXNpbmcnXX1dLCBcclxuXHRcdFx0bW9kZWw6IFsnI25vdGhpbmcnXSxcclxuXHRcdFx0bmFtZXM6IFsnYXBwbGljYXRpb24tbmFtZScsICdhdXRob3InLCAnZGVzY3JpcHRpb24nLCAnZ2VuZXJhdG9yJywgJ2tleXdvcmRzJywgJ3JlZmVycmVyJywgJ3RoZW1lLWNvbG9yJ10sXHJcblx0XHR9LFxyXG5cdFx0bWV0ZXI6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjbGFiZWxhYmxlJywgJyNwaHJhc2luZycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZycsICchbWV0ZXInXSxcclxuXHRcdH0sXHJcblx0XHRuYXY6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjc2VjdGlvbmluZy1jb250ZW50JywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI2Zsb3cnXSxcclxuXHRcdFx0aW1wbGljaXRSb2xlOiAnbmF2aWdhdGlvbicsXHJcblx0XHRcdGFjY2VwdGFibGVSb2xlczogWyduYXZpZ2F0aW9uJyxdLFxyXG5cdFx0fSxcclxuXHRcdG5vc2NyaXB0OiB7XHJcblx0XHRcdHR5cGU6IFsnI21ldGFkYXRhJywgJyNmbG93JywgJyNwaHJhc2luZyddLCBcclxuXHRcdFx0bW9kZWw6IFt7J2hlYWQgbGluayc6IFsnc3R5bGUnLCAnbWV0YScsICdsaW5rJ119LCB7Jzpub3QoaGVhZCBsaW5rKSc6IFsnI3RyYW5zcGFyZW50JywgJyFub3NjcmlwdCddfV0sXHJcblx0XHR9LFxyXG5cdFx0b2JqZWN0OiB7XHJcblx0XHRcdHR5cGU6IFsnI2VtYmVkZGVkJywgJyNmbG93JywgJyNwaHJhc2luZycsIHsnb2JqZWN0W3VzZW1hcF0nOiBbJyNpbnRlcmFjdGl2ZScsICcjcGFscGFibGUnXX1dLCBcclxuXHRcdFx0bW9kZWw6IFsnI3RyYW5zcGFyZW50JywgJ3BhcmFtJ10sXHJcblx0XHR9LFxyXG5cdFx0b2w6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsIHsnOmNvbnRhaW5zKD4gbGkpJzogWycjcGFscGFibGUnXX1dLCBcclxuXHRcdFx0bW9kZWw6IFsnI3NjcmlwdC1zdXBwb3J0aW5nJywgJ2xpJ10sXHJcblx0XHRcdGltcGxpY2l0Um9sZTogJ2xpc3QnLFxyXG5cdFx0fSxcclxuXHRcdG91dHB1dDoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNsYWJlbGFibGUnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJywgJyFtZXRlciddLFxyXG5cdFx0fSxcclxuXHRcdHA6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0fSxcclxuXHRcdHBpY3R1cmU6IHtcclxuXHRcdFx0dHlwZTogWycjZW1iZWRkZWQnLCAnI2Zsb3cnLCAnI3BocmFzaW5nJ10sIFxyXG5cdFx0XHRtb2RlbDogWydzb3VyY2UnLCAnaW1nJywgJyNhY3JpcHQtc3VwcG9ydGluZyddLFxyXG5cdFx0fSxcclxuXHRcdHByZToge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0cHJvZ3Jlc3M6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjbGFiZWxhYmxlJywgJyNwaHJhc2luZycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZycsICchcHJvZ3Jlc3MnXSxcclxuXHRcdH0sXHJcblx0XHRxOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0cnVieToge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwaHJhc2luZycsICcjcGFscGFibGUnXSxcclxuXHRcdFx0Lypjb21wbGljYXRlZCovIFxyXG5cdFx0XHRtb2RlbDogWydycCcsICdydCddLFxyXG5cdFx0fSxcclxuXHRcdHM6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGhyYXNpbmcnLCAnI3BhbHBhYmxlJ10sIFxyXG5cdFx0XHRtb2RlbDogWycjcGhyYXNpbmcnXSxcclxuXHRcdH0sXHJcblx0XHRzYW1wOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0c2NyaXB0OiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI21ldGFkYXRhJywgJyNwaHJhc2luZycsICcjYWNyaXB0LXN1cHBvcnRpbmcnXSwgXHJcblx0XHRcdG1vZGVsOiBbeydzY3JpcHRbc3JjXSc6IFtdfV0sXHJcblx0XHR9LFxyXG5cdFx0c2VjdGlvbjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNzZWN0aW9uaW5nLWNvbnRlbnQnLCAnI3BhbHBhYmxlJ10sIFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdyddLFxyXG5cdFx0XHRpbXBsaWNpdFJvbGU6ICdyZWdpb24nLFxyXG5cdFx0XHRhY2NlcHRhYmxlUm9sZXM6IFsnYWxlcnQnLCAnYWxlcnRkaWFsb2cnLCAnYXBwbGljYXRpb24nLCAnY29udGVudGluZm8nLCAnZGlhbG9nJywgJ2RvY3VtZW50JywgJ2xvZycsICdtYWluJywgJ21hcnF1ZWUnLCAncmVnaW9uJywgJ3NlYXJjaCcsICdzdGF0dXMnLF0sXHJcblx0XHR9LFxyXG5cdFx0c2VsZWN0OiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI2ludGVyYWN0aXZlJywgJyNsYWJlbGFibGUnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnb3B0aW9uJywgJ29wdGdyb3VwJywgJyNhY3JpcHQtc3VwcG9ydGluZyddLFxyXG5cdFx0fSxcclxuXHRcdHNsb3Q6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGhyYXNpbmcnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyN0cmFuc3BhcmVudCddLFxyXG5cdFx0fSxcclxuXHRcdHNtYWxsOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0c3Bhbjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwaHJhc2luZycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0fSxcclxuXHRcdHN0cm9uZzoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwaHJhc2luZycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0fSxcclxuXHRcdHN0eWxlOiB7XHJcblx0XHRcdHR5cGU6IFsnI21ldGFkYXRhJ10sXHJcblx0XHRcdG1vZGVsOiBbJyN0ZXh0J10sXHJcblx0XHR9LFxyXG5cdFx0c3ViOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0c3VwOiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0c3ZnOiB7XHJcblx0XHRcdHR5cGU6IFsnI2VtYmVkZGVkJywgJyNmbG93JywgJyNwaHJhc2luZycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdC8qY29tcGxpY2F0ZWQqL1xyXG5cdFx0XHRtb2RlbDogW10sXHJcblx0XHR9LFxyXG5cdFx0dGFibGU6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdG1vZGVsOiBbJ2NhcHRpb24nLCAnY29sZ3JvdXAnLCAndGhlYWQnLCAndGJvZHknLCAndHInLCAndGZvb3QnLCAnI3NjcmlwdC1zdXBwb3J0aW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0dGQ6IHtcclxuXHRcdFx0dHlwZTogWycjc2VjdGlvbmluZy1yb290J10sIFxyXG5cdFx0XHRtb2RlbDogWycjZmxvdyddLFxyXG5cdFx0fSxcclxuXHRcdHRlbXBsYXRlOiB7XHJcblx0XHRcdHR5cGU6IFsnI21ldGFkYXRhJywgJyNmbG93JywgJyNwaHJhc2luZycsICcjc2NyaXB0LXN1cHBvcnRpbmcnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNub3RoaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0dGV4dGFyZWE6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjaW50ZXJhY3RpdmUnLCAnI2xhYmVsYWJsZScsICcjcGhyYXNpbmcnLCAnI3BhbHBhYmxlJ10sIFxyXG5cdFx0XHRtb2RlbDogWycjdGV4dCddLFxyXG5cdFx0fSxcclxuXHRcdHRpbWU6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsICcjcGhyYXNpbmcnLCAnI3BhbHBhYmxlJ10sIFxyXG5cdFx0XHRtb2RlbDogW3sndGltZVtkYXRldGltZV0nOiBbJyNwaHJhc2luZyddfSwgeyc6bm90KHRpbWVbZGF0ZXRpbWVdKSc6IFsnI3RleHQnXX1dLFxyXG5cdFx0fSxcclxuXHRcdHRpdGxlOiB7XHJcblx0XHRcdHR5cGU6IFsnI21ldGFkYXRhJ10sXHJcblx0XHRcdG1vZGVsOiBbJyN0ZXh0J10sXHJcblx0XHRcdHNpbmdsZXRvbjogdHJ1ZSxcclxuXHRcdH0sXHJcblx0XHR1OiB7XHJcblx0XHRcdHR5cGU6IFsnI2Zsb3cnLCAnI3BocmFzaW5nJywgJyNwYWxwYWJsZSddLCBcclxuXHRcdFx0bW9kZWw6IFsnI3BocmFzaW5nJ10sXHJcblx0XHR9LFxyXG5cdFx0dWw6IHtcclxuXHRcdFx0dHlwZTogWycjZmxvdycsIHsnOmNvbnRhaW5zKD4gbGkpJzogWycjcGFscGFibGUnXX1dLCBcclxuXHRcdFx0bW9kZWw6IFsnI3NjcmlwdC1zdXBwb3J0aW5nJywgJ2xpJ10sXHJcblx0XHRcdGltcGxpY2l0Um9sZTogJ2xpc3QnLFxyXG5cdFx0fSxcclxuXHRcdHZhcjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwaHJhc2luZycsICcjcGFscGFibGUnXSwgXHJcblx0XHRcdG1vZGVsOiBbJyNwaHJhc2luZyddLFxyXG5cdFx0fSxcclxuXHRcdHZpZGVvOiB7XHJcblx0XHRcdHR5cGU6IFsnI2VtYmVkZGVkJywgJyNmbG93JywgJyNwaHJhc2luZycsIHsndmlkZW9bY29udHJvbHNdJzogWycjaW50ZXJhY3RpdmUnLCAnI3BhbHBhYmxlJ119XSwgXHJcblx0XHRcdG1vZGVsOiBbJyN0cmFuc3BhcmVudCcsICchI21lZGlhJywgJ3RyYWNrJywgeyc6bm90KHZpZGVvW3NyY10pJzogWydzb3VyY2UnXX1dLFxyXG5cdFx0fSxcclxuXHRcdHdicjoge1xyXG5cdFx0XHR0eXBlOiBbJyNmbG93JywgJyNwaHJhc2luZyddLCBcclxuXHRcdFx0bW9kZWw6IFsnI25vdGhpbmcnXSxcclxuXHRcdH0sXHJcblx0fSxcclxuXHRcclxuXHQvKipcclxuXHQgKiBAb2JqZWN0XHJcblx0ICovXHJcblx0YXJpYToge1xyXG5cdFx0YmFubmVyOiB7XHJcblx0XHRcdHR5cGU6IFsnQGJhbm5lciddLCBcclxuXHRcdFx0c2luZ2xldG9uOiB0cnVlLFxyXG5cdFx0fSxcclxuXHRcdGNvbnRlbnRpbmZvOiB7XHJcblx0XHRcdHR5cGU6IFsnQGNvbnRlbnRpbmZvJ10sIFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0Y29tcGxlbWVudGFyeToge1xyXG5cdFx0XHR0eXBlOiBbJ0Bjb21wbGVtZW50YXJ5J10sIFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0bmF2aWdhdGlvbjoge1xyXG5cdFx0XHR0eXBlOiBbJ0BuYXZpZ2F0aW9uJ10sIFxyXG5cdFx0XHRzaW5nbGV0b246IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0bGlzdDoge1xyXG5cdFx0XHR0eXBlOiBbJ0BsaXN0J10sIFxyXG5cdFx0fSxcclxuXHRcdGxpc3RpdGVtOiB7XHJcblx0XHRcdHR5cGU6IFsnQGxpc3RpdGVtJ10sIFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHNlbWFudGljIGNvbnRlbnQgbW9kZWwgZm9yIHRoZSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHRcdFx0XHRlbFxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGdldENvbnRlbnRNb2RlbEZvcihlbCkgeyBcclxuXHRcdHZhciBlbFRhZ05hbWUgPSBlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0cmV0dXJuIFNjaGVtYS5zdGRbZWxUYWdOYW1lXSA/IFNjaGVtYS5leHBhbmRSdWxlcyhlbCwgU2NoZW1hLnN0ZFtlbFRhZ05hbWVdLm1vZGVsIHx8IFtdKSA6IFtdO1xyXG5cdH0sXHJcblx0XHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgc2VtYW50aWMgY2F0ZWdvcmllcyBmb3IgdGhlIGdpdmVuIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnRcdFx0XHRcdGVsXHJcblx0ICogQHBhcmFtIGJvb2xcdFx0XHRcdFx0XHRyb2xlSW5jbHVzaXZlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0Z2V0Q2F0ZWdvcmllc0ZvcihlbCwgcm9sZUluY2x1c2l2ZSA9IHRydWUpIHtcclxuXHRcdHZhciBlbFRhZ05hbWUgPSBlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0dmFyIGVsU2NoZW1hID0gU2NoZW1hLnN0ZFtlbFRhZ05hbWVdIHx8IFNjaGVtYS5hcmlhW2VsVGFnTmFtZV0gfHwge307XHJcblx0XHR2YXIgY3VycmVudEVsQ2F0ZWdvcmllcyA9IFtdO1xyXG5cdFx0aWYgKHJvbGVJbmNsdXNpdmUgJiYgIWVsLm5vZGVOYW1lLnN0YXJ0c1dpdGgoJyMnKSBcclxuXHRcdCYmIChlbC5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSB8fCBlbFNjaGVtYS5pbXBsaWNpdFJvbGUpKSB7XHJcblx0XHRcdC8vIEN1cnJlbnQgZWwncyBpbXBsaWFibGUvYWNjZXB0YWJsZSByb2xlc1xyXG5cdFx0XHQvLyAoVGhlc2UgdGFrZSBwcmVjZWRlbmNlIG92ZXIgbmF0aXZlIHNlbWFudGljcylcclxuXHRcdFx0aWYgKGVsLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XHJcblx0XHRcdFx0dmFyIGRlZmluZWRSb2xlcyA9IGVsLmdldEF0dHJpYnV0ZSgncm9sZScpLnNwbGl0KCcgJyk7XHJcblx0XHRcdFx0ZWwuZ2V0QXR0cmlidXRlKCdyb2xlJykuc3BsaXQoJyAnKS5mb3JFYWNoKHJvbGUgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGVsU2NoZW1hICYmIGVsU2NoZW1hLmFjY2VwdGFibGVSb2xlcyAmJiAhZWxTY2hlbWEuYWNjZXB0YWJsZVJvbGVzLmluY2x1ZGVzKHJvbGUpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJvbGUgPSByb2xlLnRyaW0oKTtcclxuXHRcdFx0XHRcdGN1cnJlbnRFbENhdGVnb3JpZXMucHVzaCgnQCcgKyByb2xlKTtcclxuXHRcdFx0XHRcdGlmIChTY2hlbWEuYXJpYVtyb2xlXSAmJiBTY2hlbWEuYXJpYVtyb2xlXS50eXBlKSB7XHJcblx0XHRcdFx0XHRcdGN1cnJlbnRFbENhdGVnb3JpZXMgPSBjdXJyZW50RWxDYXRlZ29yaWVzLmNvbmNhdChTY2hlbWEuZXhwYW5kUnVsZXMoZWwsIFNjaGVtYS5hcmlhW3JvbGVdLnR5cGUgfHwgW10pKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIGlmIChlbFNjaGVtYS5pbXBsaWNpdFJvbGUpIHtcclxuXHRcdFx0XHRfcHVzaFVuaXF1ZShjdXJyZW50RWxDYXRlZ29yaWVzLCAnQCcgKyBlbFNjaGVtYS5pbXBsaWNpdFJvbGUsIGVsVGFnTmFtZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIEN1cnJlbnQgbm9kZSdzIGNhdGVnb3JpZXMvdGFnbmFtZVxyXG5cdFx0XHR2YXIgY3VycmVudEVsQ2F0ZWdvcmllcyA9IF9wdXNoVW5pcXVlKFNjaGVtYS5leHBhbmRSdWxlcyhlbCwgZWxTY2hlbWEudHlwZSB8fCBbXSksIGVsVGFnTmFtZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY3VycmVudEVsQ2F0ZWdvcmllcztcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZXMgdGhhdCB0aGUgZ2l2ZW4gbm9kZSBiZWxvbmdzIGluIHRoZSBjb250ZXh0J3MgY29udGVudCBtb2RlbFxyXG5cdCAqIGdvaW5nIGJ5IHRoZSBzZW1hbnRpY3NcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MRWxlbWVudFx0XHRcdFx0Y29udGV4dFxyXG5cdCAqIEBwYXJhbSBIVE1MRWxlbWVudFx0XHRcdFx0bm9kZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0YXNzZXJ0Tm9kZUJlbG9uZ3NJbkNvbnRlbnRNb2RlbChjb250ZXh0LCBub2RlKSB7XHJcblx0XHR2YXIgY29udGV4dE1vZGVsID0gY29udGV4dCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IFxyXG5cdFx0XHQ/IFNjaGVtYS5nZXRDb250ZW50TW9kZWxGb3IoY29udGV4dClcclxuXHRcdFx0OiBjb250ZXh0O1xyXG5cdFx0dmFyIG5vZGVDYXRlZ29yaWVzID0gbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IFxyXG5cdFx0XHQ/IFNjaGVtYS5nZXRDYXRlZ29yaWVzRm9yKG5vZGUpXHJcblx0XHRcdDogbm9kZTtcclxuXHRcdGlmIChfaW50ZXJzZWN0KGNvbnRleHRNb2RlbCwgWycjbm90aGluZycsICcjdGV4dCddKS5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHZhbGlkO1xyXG5cdFx0Ly8gU28gY3VycmVudCBjb250ZW50IG1vZGVsIGhhcyB0byBsaXN0IGVpdGhlciB0aGlzIG5vZGUncyBjYXRlZ29yaWVzLFxyXG5cdFx0Ly8gdGFnbmFtZSwgb3IgaW1wbGlhYmxlL2FjY2VwdGFibGUgcm9sZXNcclxuXHRcdGNvbnRleHRNb2RlbC5mb3JFYWNoKGFsbG93ZWROb2RlID0+IHtcclxuXHRcdFx0aWYgKGFsbG93ZWROb2RlLnN0YXJ0c1dpdGgoJyEnKSkge1xyXG5cdFx0XHRcdHZhciBkaXNhbGxvd2VkTm9kZSA9IGFsbG93ZWROb2RlLnN1YnN0cigxKTtcclxuXHRcdFx0XHRpZiAobm9kZUNhdGVnb3JpZXMuaW5jbHVkZXMoZGlzYWxsb3dlZE5vZGUpKSB7XHJcblx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh2YWxpZCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRpZiAobm9kZUNhdGVnb3JpZXMuaW5jbHVkZXMoYWxsb3dlZE5vZGUpKSB7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB2YWxpZCAmJiB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIFZhbGlkYXRlcyB0aGF0IHRoZSBnaXZlbiBub2RlIGlzIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRleHQgZGlyZWN0bHlcclxuXHQgKiBnb2luZyBieSB0aGUgc2VtYW50aWNzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnRcdFx0XHRcdHNjb3BlXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHRcdFx0XHRub2RlXHJcblx0ICogQHBhcmFtIG9iamVjdFx0XHRcdFx0XHRub2RlU2NoZW1hXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRhc3NlcnROb2RlQmVsb25nc0luU2NvcGVBcyhzY29wZSwgbm9kZSwgbm9kZVNjaGVtYSA9IG51bGwpIHtcclxuXHRcdHZhciBjb250ZXh0Q2F0ZWdvcmllcyA9IFNjaGVtYS5nZXRDYXRlZ29yaWVzRm9yKHNjb3BlKTtcclxuXHRcdHZhciBjbG9zZXN0LCBjdXJyZW50ID0gbm9kZSwgbm9kZU1vZGVsO1xyXG5cdFx0d2hpbGUgKCFjbG9zZXN0ICYmIChjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlKSkge1xyXG5cdFx0XHRpZiAoX2ludGVyc2VjdChjb250ZXh0Q2F0ZWdvcmllcywgU2NoZW1hLmdldENhdGVnb3JpZXNGb3IoY3VycmVudCkpLmxlbmd0aFxyXG5cdFx0XHRcdCYmIFNjaGVtYS5hc3NlcnROb2RlQmVsb25nc0luQ29udGVudE1vZGVsKGN1cnJlbnQsIG5vZGVTY2hlbWEgPyAobm9kZVNjaGVtYS50eXBlIHx8IG5vZGUpIDogbm9kZSlcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0Y2xvc2VzdCA9IGN1cnJlbnQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjbG9zZXN0ID09PSBzY29wZTtcclxuXHR9LFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEZsYXR0ZW5zIHRoZSBzY2hlbWEgcnVsZXMgZm9yIHRoZSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHRcdFx0XHRlbFxyXG5cdCAqIEBwYXJhbSBhcnJheVx0XHRcdFx0XHRcdHJ1bGVzXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0ZXhwYW5kUnVsZXMoZWwsIHJ1bGVzKSB7XHJcblx0XHR2YXIgcmxlcyA9IHJ1bGVzLnJlZHVjZSgoY2F0ZWdvcmllcywgcnVsZSkgPT4ge1xyXG5cdFx0XHRpZiAoX2lzT2JqZWN0KHJ1bGUpKSB7XHJcblx0XHRcdFx0aWYgKGVsLm1hdGNoZXMoT2JqZWN0LmtleXMocnVsZSlbMF0pKSB7XHJcblx0XHRcdFx0XHRjYXRlZ29yaWVzID0gY2F0ZWdvcmllcy5jb25jYXQoT2JqZWN0LnZhbHVlcyhydWxlKVswXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNhdGVnb3JpZXMucHVzaChydWxlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY2F0ZWdvcmllcztcclxuXHRcdH0sIFtdKTtcclxuXHRcdGlmIChybGVzLmluY2x1ZGVzKCcjc2VjdGlvbmluZy1yb290JykpIHtcclxuXHRcdFx0cmxlcy5wdXNoKCcjc2VjdGlvbmluZy1jb250ZW50Jyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmxlcztcclxuXHR9LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBTY2hlbWE7XHJcbiIsIlxyXG4vKipcclxuICogQGltcG9ydHNcclxuICovXHJcbmltcG9ydCBfYXJyRnJvbSBmcm9tICdAd2ViLW5hdGl2ZS1qcy9jb21tb25zL2Fyci9mcm9tLmpzJztcclxuaW1wb3J0IEpzZW4gZnJvbSAnQHdlYi1uYXRpdmUtanMvanNlbic7XHJcbmltcG9ydCBSZWZsZXggZnJvbSAnQHdlYi1uYXRpdmUtanMvcmVmbGV4JztcclxuaW1wb3J0IHBhcmFtcyBmcm9tICcuL3BhcmFtcy5qcyc7XHJcbmltcG9ydCBDaHRtbCBmcm9tICcuL0NodG1sLmpzJztcclxuXHJcbi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogVGhlIGNsaWVudC1idWlsZCBlbnRyeVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4vKipcclxuICogQ29uZmlndXJlIENIVE0gd2l0aFxyXG4gKiBhIGdsb2JhbCB3aW5kb3cuXHJcbiAqL1xyXG4oZnVuY3Rpb24oV2luZG93KSB7XHJcblx0Q2h0bWwuaW5pdChXaW5kb3csICgpID0+IHtcclxuXHRcdHZhciBidW5kbGVzID0gX2FyckZyb20oV2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLnRhZ01hcC5idW5kbGUpKS5yZXZlcnNlKCk7XHJcblx0XHRyZXR1cm4gYnVuZGxlcy5tYXAoYiA9PiB7XHJcblx0XHRcdGlmIChiLmhhc0F0dHJpYnV0ZSgnc3JjJykgJiYgIWIuY29udGVudC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0XHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2J1bmRsZWxvYWRzdWNjZXNzJywgKCkgPT4gcmVzb2x2ZShiKSk7XHJcblx0XHRcdFx0XHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2J1bmRsZWxvYWRlcnJvcicsICgpID0+IHJlc29sdmUoYikpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBiO1xyXG5cdFx0fSlcclxuXHR9KTtcclxufSkodGhpcyB8fCB3aW5kb3cpO1xyXG5cclxuLyoqXHJcbiAqIEBleHBvcnRzXHJcbiAqL1xyXG5leHBvcnQge1xyXG5cdHBhcmFtcyxcclxuXHRKc2VuLFxyXG5cdFJlZmxleCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ2h0bWw7XHJcbiIsIlxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS1cclxuICogU3RhdGljIHBhcmFtZXRlcnNcclxuICogdXNlZCBhY3Jvc3MgQ0hUTUxcclxuICogLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRlbnY6ICcnLFxyXG5cdGNvbnRleHQ6e30sXHJcblx0YXR0ck1hcDoge1xyXG5cdFx0aGludDogJ2RhdGEtdHJlZScsXHJcblx0XHRuYW1lc3BhY2U6ICdkYXRhLW5hbWVzcGFjZScsXHJcblx0XHRzdXBlcnJvbGU6ICdkYXRhLXJvbGUnLFxyXG5cdFx0c3Vicm9sZTogJ2RhdGEtcm9sZScsXHJcblx0XHRidW5kbGU6ICdjaHRtbC1idW5kbGUnLFxyXG5cdFx0bm9jb21wb3NlOiBbJ25vY29tcG9zZScsICdzaGFkb3cnLF0sXHJcblx0fSxcclxuXHR0YWdNYXA6IHtcclxuXHRcdGpzZW46ICdzY3JpcHRbdHlwZT1cInRleHQvc2NvcGVkLWpzXCJdJyxcclxuXHRcdGJ1bmRsZTogJ3RlbXBsYXRlW2lzPVwiY2h0bWwtYnVuZGxlXCJdJyxcclxuXHRcdGltcG9ydDogJ2NodG1sLWltcG9ydCcsXHJcblx0fSxcclxuXHR0cmVlUHJvcGVydHk6J3RyZWUnLFxyXG5cdGJpbmRpbmdQcm9wZXJ0eTonYmluZGluZycsXHJcblx0a2V5VmFsQXR0cmlidXRlczpbXSxcclxuXHRsaXN0QXR0cmlidXRlczpbXSxcclxuXHRyZW1vZGVsQ2FsbGJhY2s6bnVsbCxcclxuXHRyZWNvbXBvc2VDYWxsYmFjazpudWxsLFxyXG5cdGhpZGVEYXRhQmxvY2tTY3JpcHQ6dHJ1ZSxcclxufTsiXSwic291cmNlUm9vdCI6IiJ9