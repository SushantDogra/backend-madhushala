"use strict";

const APIError = require("../errors/api_error");

module.exports = (res, error) => {
  const apiError =
    error instanceof APIError
      ? error
      : typeof error.asAPIError === "function"
      ? error.asAPIError()
      : new APIError("50090", error);
  console.log(apiError.logMessage + ": " + apiError.stack || error.stack || "");
  res
    .status(apiError.statusCode)
    .json({ errorCode: apiError.errorCode, errorMessage: apiError.logMessage });
};
