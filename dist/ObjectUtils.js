'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isSwappable = exports.swap = exports.size = exports.extend = exports.ObjectUtils = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* ##########################
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Imports
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ########################## */

var _typeUtils = require('@beautiful-code/type-utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ##########################
  Class Definition
########################## */

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

	}]);

	return ObjectUtils;
}();

/* ##########################
  Exports
########################## */

ObjectUtils.extendedPrototypes = new Map();

ObjectUtils.modifyPrototype = function () {
	Object.prototype.size = function () {
		Object.Utils.size(this);
	};

	Object.prototype.swap = function (obj) {
		ObjectUtils.swap(this);
	};

	Object.prototype.isSwappable = function (obj) {
		ObjectUtils.isSwappable(this);
	};
};

ObjectUtils.extend = function (object) {
	for (var _len = arguments.length, objects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		objects[_key - 1] = arguments[_key];
	}

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var extension = _step.value;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = Object.entries(extension)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var _step2$value = _slicedToArray(_step2.value, 2),
					    name = _step2$value[0],
					    property = _step2$value[1];

					if (extension.hasOwnProperty(name)) {
						object[name] = property;
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return object;
};

ObjectUtils.size = function (obj) {
	if (!_typeUtils.TypeUtils.isObject(obj)) throw new Error('Tried to get size of a non-object. Type was ' + _typeUtils.TypeUtils.getType(obj) + '.');

	return Object.keys(obj).length;
};

ObjectUtils.swap = function (obj) {
	if (!_typeUtils.TypeUtils.isObject(obj)) throw new Error('Tried to swap a non-object. Type was ' + _typeUtils.TypeUtils.getType(obj) + '.');

	return Object.entries(obj).reduce(function (swapped, _ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    key = _ref2[0],
		    value = _ref2[1];

		var hasValidPropTypes = _typeUtils.TypeUtils.isString(value) || _typeUtils.TypeUtils.isNumber(value);
		if (!hasValidPropTypes) throw new Error('Tried to swap an object with non-string or non-number properties. Type was ' + _typeUtils.TypeUtils.getType(value) + '.');

		if (swapped.hasOwnProperty(value)) throw new Error('Tried to swap object with duplicate values. {' + swapped[value] + ':' + value + '} and {' + key + ':' + value + '} ');

		var numerical = parseFloat(key);
		key = _typeUtils.TypeUtils.isNumber(numerical) && !isNaN(numerical) ? numerical : key;

		swapped[value] = key;
		return swapped;
	}, {});
};

ObjectUtils.isSwappable = function (obj) {
	if (!_typeUtils.TypeUtils.isObject(obj)) throw new Error('Tried to check if a non-object was swappable. Type was ' + _typeUtils.TypeUtils.getType(obj) + '.');

	var set = new Set(Object.values(obj));
	return set.size == Object.keys(obj).length;
};

var extend = ObjectUtils.extend,
    size = ObjectUtils.size,
    swap = ObjectUtils.swap,
    isSwappable = ObjectUtils.isSwappable;

exports.default = ObjectUtils;
exports.ObjectUtils = ObjectUtils;
exports.extend = extend;
exports.size = size;
exports.swap = swap;
exports.isSwappable = isSwappable;