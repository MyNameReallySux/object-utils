'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.swap = exports.size = exports.setDeep = exports.merge = exports.omit = exports.isSwappable = exports.extend = exports.exclude = exports.clean = exports.ObjectUtils = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* ##########################
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Imports
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ########################## */

var _typeUtils = require('@beautiful-code/type-utils');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ##########################
  Class Definition
########################## */

/** 
 * The ObjectUtils class has various methods related to managing, manipulating, and configuring objects.
 * 
 * @author Chris Coppola <mynamereallysux@gmail.com>
 */
var ObjectUtils = function () {
	function ObjectUtils() {
		_classCallCheck(this, ObjectUtils);
	}

	_createClass(ObjectUtils, null, [{
		key: 'getInstanceMethods',


		/* ##########################
  	Properties
  ########################## */

		value: function getInstanceMethods(instance) {
			return Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
		}
	}, {
		key: 'getInstanceProps',
		value: function getInstanceProps(instance) {
			return Object.entries(instance);
		}
	}, {
		key: 'getStaticProps',
		value: function getStaticProps(clazz) {
			return Object.getOwnPropertyNames(clazz);
		}

		/* ##########################
  	Prototypes
  ########################## */

	}, {
		key: 'extendPrototype',
		value: function extendPrototype(clazz, extension) {
			if (!ObjectUtils.extendedPrototypes.has(clazz)) {
				ObjectUtils.extendedPrototypes.set(clazz, clazz.prototype);
			}
			ObjectUtils.extend(clazz.prototype, {});
		}
	}, {
		key: 'resetPrototype',
		value: function resetPrototype(clazz) {
			if (ObjectUtils.extendedPrototypes.has(clazz)) {
				clazz.prototype = ObjectUtils.extendedPrototypes.get(clazz);
			}
		}

		/* ##########################
  	Object Utils
  ########################## */

		/** 
      * Removes all null values from an object. Null values are 'undefined', 'null', or an empty string.
      * 
      * @param {!Object} object Object that should be cleaned.
   * @param {?Array} exclusions List of values that should be removed.
   * @returns {Object} Returns an object without any null values.
      * 
   * @function
   * @public
      */


		/** 
      * Extends an object with a series of other objects, taking into account and ignoring null values in the source object and extension objects.
      * 
      * @param {Object} source Object that will be extended.
   * @returns {Object} Returns a merged object.
      * 
   * @function
   * @public
      */

	}]);

	return ObjectUtils;
}();

/* ##########################
  Exports
########################## */

ObjectUtils.extendedPrototypes = new Map();

ObjectUtils.modifyPrototype = function () {
	Object.prototype.extend = function (object) {
		ObjectUtils.extend(this, object);
	};

	Object.prototype.merge = function (object) {
		ObjectUtils.merge(this, object);
	};

	Object.prototype.mergeDeep = function () {
		for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
			sources[_key] = arguments[_key];
		}

		ObjectUtils.mergeDeep.apply(ObjectUtils, [this].concat(sources));
	};

	Object.prototype.setDeep = function (value, path) {
		ObjectUtils.setDeep(this, value, path);
	};

	Object.prototype.omit = function (props, fn) {
		ObjectUtils.omit(this, props, fn);
	};

	Object.prototype.size = function () {
		ObjectUtils.size(this);
	};

	Object.prototype.swap = function () {
		ObjectUtils.swap(this);
	};

	Object.prototype.isSwappable = function () {
		ObjectUtils.isSwappable(this);
	};
};

ObjectUtils.clean = function (object) {
	var exclusions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [undefined, null, ''];
	return ObjectUtils.exclude(object, exclusions);
};

ObjectUtils.exclude = function () {
	var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var exclusions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
		return false;
	};

	if ((0, _typeUtils.isFunction)(exclusions)) {
		fn = exclusions;
		exclusions = [];
	}
	if (!(0, _typeUtils.isArray)(exclusions)) exclusions = [exclusions];

	return Object.entries(object).filter(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    key = _ref2[0],
		    value = _ref2[1];

		return !exclusions.includes(value);
	}).reduce(function (object, _ref3) {
		var _ref4 = _slicedToArray(_ref3, 2),
		    key = _ref4[0],
		    value = _ref4[1];

		return _extends({}, object, _defineProperty({}, key, value));
	}, {});
};

ObjectUtils.extend = function (source) {
	for (var _len2 = arguments.length, extensions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		extensions[_key2 - 1] = arguments[_key2];
	}

	if (!_typeUtils.isObject) return {};
	if (!extensions.length) return source;
	return ObjectUtils.clean(Object.assign.apply(Object, [source].concat(extensions)));
};

ObjectUtils.merge = function (source) {
	for (var _len3 = arguments.length, extensions = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		extensions[_key3 - 1] = arguments[_key3];
	}

	if (!(0, _typeUtils.isObject)(source)) return {};
	if (!extensions.length) return source;

	return extensions.reduce(function (collection, extension) {
		!(0, _typeUtils.isObject)(extension) ? collection : Object.entries(extension).filter(function (_ref5) {
			var _ref6 = _slicedToArray(_ref5, 2),
			    key = _ref6[0],
			    value = _ref6[1];

			return value !== undefined;
		}).forEach(function (_ref7) {
			var _ref8 = _slicedToArray(_ref7, 2),
			    key = _ref8[0],
			    value = _ref8[1];

			var result = {};
			if ((0, _typeUtils.isObject)(value) && (0, _typeUtils.isObject)(source[key])) result = ObjectUtils.merge(source[key], value);else if ((0, _typeUtils.isArray)(value) && (0, _typeUtils.isArray)(source[key])) result = source[key].concat(value);else result = value;

			collection = Object.assign({}, collection, _defineProperty({}, key, result));
		});

		return collection;
	}, ObjectUtils.clean(source));
};

ObjectUtils.omit = function () {
	var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var omissions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
		return false;
	};

	if ((0, _typeUtils.isFunction)(omissions)) {
		fn = omissions;
		omissions = [];
	}
	if (!(0, _typeUtils.isArray)(omissions)) omissions = [omissions];

	return Object.entries(object).filter(function (_ref9) {
		var _ref10 = _slicedToArray(_ref9, 2),
		    key = _ref10[0],
		    value = _ref10[1];

		return !omissions.includes(key) || fn();
	}).reduce(function (object, _ref11) {
		var _ref12 = _slicedToArray(_ref11, 2),
		    key = _ref12[0],
		    value = _ref12[1];

		return _extends({}, object, _defineProperty({}, key, value));
	}, {});
};

ObjectUtils.setDeep = function () {
	var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var value = arguments[1];
	var path = arguments[2];

	var parts = path.split('.'),
	    regexp = /([a-zA-Z]+)(\[(\d)\])+/; // matches:  item[0]

	var selector = void 0,
	    match = null,
	    context = object;

	parts.map(function (part) {
		match = regexp.exec(part);
		if (match !== null) context = context[match[1]][match[3]];else {
			if (context && !context.hasOwnProperty(part)) context[part] = {};

			context = context[part];
		}
	});

	match = regexp.exec([parts[parts.length - 1]]);

	if (match !== null) context[match[1]][match[3]] = value;else context[parts[parts.length - 1]] = value;

	return object;
};

ObjectUtils.size = function (obj) {
	if (!(0, _typeUtils.isObject)(obj)) throw new Error('Tried to get size of a non-object. Type was ' + (0, _typeUtils.getType)(obj) + '.');

	return Object.keys(obj).length;
};

ObjectUtils.swap = function (obj) {
	if (!(0, _typeUtils.isObject)(obj)) throw new Error('Tried to swap a non-object. Type was ' + (0, _typeUtils.getType)(obj) + '.');

	return Object.entries(obj).reduce(function (swapped, _ref13) {
		var _ref14 = _slicedToArray(_ref13, 2),
		    key = _ref14[0],
		    value = _ref14[1];

		var hasValidPropTypes = (0, _typeUtils.isString)(value) || (0, _typeUtils.isNumber)(value);
		if (!hasValidPropTypes) throw new Error('Tried to swap an object with non-string or non-number properties. Type was ' + (0, _typeUtils.getType)(value) + '.');

		if (swapped.hasOwnProperty(value)) throw new Error('Tried to swap object with duplicate values. {' + swapped[value] + ':' + value + '} and {' + key + ':' + value + '} ');

		var numerical = parseFloat(key);
		key = (0, _typeUtils.isNumber)(numerical) && !isNaN(numerical) ? numerical : key;

		swapped[value] = key;
		return swapped;
	}, {});
};

ObjectUtils.isSwappable = function (obj) {
	if (!(0, _typeUtils.isObject)(obj)) throw new Error('Tried to check if a non-object was swappable. Type was ' + (0, _typeUtils.getType)(obj) + '.');

	var set = new Set(Object.values(obj));
	return set.size == Object.keys(obj).length;
};

var clean = ObjectUtils.clean,
    exclude = ObjectUtils.extend,
    extend = ObjectUtils.extend,
    isSwappable = ObjectUtils.isSwappable;
exports.merge = merge = ObjectUtils.merge, exports.omit = omit = ObjectUtils.omit, exports.setDeep = setDeep = ObjectUtils.setDeep, exports.size = size = ObjectUtils.size, exports.swap = swap = ObjectUtils.swap;

exports.default = ObjectUtils;
exports.ObjectUtils = ObjectUtils;
exports.clean = clean;
exports.exclude = exclude;
exports.extend = extend;
exports.isSwappable = isSwappable;
exports.omit = omit;
exports.merge = merge;
exports.setDeep = setDeep;
exports.size = size;
exports.swap = swap;