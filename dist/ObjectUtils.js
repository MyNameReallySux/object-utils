'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isSwappable = exports.swap = exports.ObjectUtils = undefined;

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
		key: 'resetPrototype',
		value: function resetPrototype() {
			Object.prototype = ObjectUtils.OBJECT_PROTOTYPE;
		}
	}]);

	return ObjectUtils;
}();

/* ##########################
  Exports
########################## */

ObjectUtils.OBJECT_PROTOTYPE = Object.prototype;

ObjectUtils.modifyPrototype = function () {
	Object.prototype.swap = function (obj) {
		ObjectUtils.swap(this);
	};

	Object.prototype.isSwappable = function (obj) {
		ObjectUtils.isSwappable(this);
	};
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
	var set = new Set(Object.values(obj));
	return set.size == Object.keys(obj).length;
};

var swap = ObjectUtils.swap,
    isSwappable = ObjectUtils.isSwappable;

exports.default = ObjectUtils;
exports.ObjectUtils = ObjectUtils;
exports.swap = swap;
exports.isSwappable = isSwappable;