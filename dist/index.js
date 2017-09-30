'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ObjectUtils = require('./ObjectUtils');

Object.keys(_ObjectUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ObjectUtils[key];
    }
  });
});