"use strict";
const util = require("util");

function isObject(o) {
  return o === Object(o) && !Array.isArray(o) && typeof o !== "function";
}

module.exports = {
  isObject,
};
