"use strict";
const util = require("util");

function isObject(o) {
  return o === Object(o) && !Array.isArray(o) && typeof o !== "function";
}

function isNullOrUndefined(object) {
  return !object;
}

module.exports = {
  isObject,
  isNullOrUndefined,
};
