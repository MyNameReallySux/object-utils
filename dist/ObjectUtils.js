'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isSwappable = exports.swap = exports.size = exports.setDeep = exports.omit = exports.mergeDeep = exports.merge = exports.extend = exports.ObjectUtils = undefined;

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

	Object.prototype.omit = function (props, fcn) {
		ObjectUtils.omit(this, props, fcn);
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

ObjectUtils.extend = function (object) {
	for (var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		objects[_key2 - 1] = arguments[_key2];
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

ObjectUtils.merge = function () {
	for (var _len3 = arguments.length, objects = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
		objects[_key3] = arguments[_key3];
	}

	return Object.assign.apply(Object, [{}].concat(objects));
};

ObjectUtils.mergeDeep = function (target) {
	for (var _len4 = arguments.length, sources = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
		sources[_key4 - 1] = arguments[_key4];
	}

	if (!sources.length) return target;
	var source = sources.shift();

	if ((0, _typeUtils.isObject)(target) && (0, _typeUtils.isObject)(source)) {
		for (var key in source) {
			if ((0, _typeUtils.isObject)(source[key])) {
				if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
				ObjectUtils.mergeDeep(target[key], source[key]);
			}if ((0, _typeUtils.isArray)(source[key]) && (0, _typeUtils.isArray)(target[key])) {
				target[key] = target[key].concat(source[key]);
			} else {
				Object.assign(target, _defineProperty({}, key, source[key]));
			}
		}
	}

	return ObjectUtils.mergeDeep.apply(ObjectUtils, [target].concat(sources));
};

ObjectUtils.omit = function (obj, props, func) {
	if (!(0, _typeUtils.isObject)(obj)) return {};

	if ((0, _typeUtils.isFunction)(props)) {
		func = props;
		props = [];
	}

	if ((0, _typeUtils.isString)(props)) {
		props = [props];
	}

	if (!(0, _typeUtils.isArray)(props)) return {};

	return Object.entries(obj).reduce(function (collection, _ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    key = _ref2[0],
		    value = _ref2[1];

		var propsDoNotExist = !props,
		    keyIsInProps = props.indexOf(key) === -1,
		    lastParamIsNotFunction = !(0, _typeUtils.isFunction)(func) || func(value, key, obj);

		if (propsDoNotExist || keyIsInProps && lastParamIsNotFunction) {
			collection[key] = value;
		}

		return collection;
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

	return Object.entries(obj).reduce(function (swapped, _ref3) {
		var _ref4 = _slicedToArray(_ref3, 2),
		    key = _ref4[0],
		    value = _ref4[1];

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

var extend = ObjectUtils.extend,
    merge = ObjectUtils.merge,
    mergeDeep = ObjectUtils.mergeDeep,
    omit = ObjectUtils.omit,
    setDeep = ObjectUtils.setDeep,
    size = ObjectUtils.size,
    swap = ObjectUtils.swap,
    isSwappable = ObjectUtils.isSwappable;

exports.default = ObjectUtils;
exports.ObjectUtils = ObjectUtils;
exports.extend = extend;
exports.merge = merge;
exports.mergeDeep = mergeDeep;
exports.omit = omit;
exports.setDeep = setDeep;
exports.size = size;
exports.swap = swap;
exports.isSwappable = isSwappable;