"use strict";
const config = require("../../config/config");
const API_RESPONSE_CODES = config.getApiResponseCodes();

module.exports = (() => {
  /**
   *
   * @param reasonCode a string as one of the reasoncode defined in config
   * @param logMessage optional
   * @constructor
   */
  function APIError(reasonCode, originalError, logMessage) {
    this.reasonCode = reasonCode;
    this.statusCode = reasonCode && parseInt(reasonCode.slice(0, 3));
    this.stack = !originalError ? "" : originalError.stack;
    this.errorCode = reasonCode;
    if (logMessage) {
      this.logMessage = `${logMessage}`;
    } else {
      const message = originalError
        ? originalError.message
        : API_RESPONSE_CODES.REASON_CODES[reasonCode];
      this.logMessage = `${message}`;
    }
  }

  APIError.prototype.constructor = APIError;

  return APIError;
})();
