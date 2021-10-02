"use strict";
const APIError = require("./api_error");

module.exports = (() => {
  function PayloadValidationError(errorMessage) {
    this.message = errorMessage;
  }

  PayloadValidationError.prototype.constructor = PayloadValidationError;

  PayloadValidationError.prototype.asAPIError = function () {
    return new APIError("42220", this);
  };

  return PayloadValidationError;
})();
