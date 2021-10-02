"use strict";

const config = require("../../config/config");
const clientAccess = require("../../config/client_access");
const APIError = require("../errors/api_error");
const ENVS = require("../../config/envs");

const appEnv = process.env.NODE_ENV || ENVS.dev;

function authenticate(userToken) {
  return userToken === clientAccess.user_access_key[appEnv];
}

const sendReject = (res, apiError) => {
  console.log(apiError.logMessage);
  res.status(apiError.statusCode).json({ message: apiError.logMessage });
};

module.exports = async function (req, res, next) {
  try {
    if (
      req.get(config.getConfig("HEADER.X_USER_TOKEN")) ||
      publicRoutes.indexOf(req.originalUrl.split("?")[0]) === -1
    ) {
      const userTokenHeaderKey = config.getConfig("HEADER.X_USER_TOKEN");
      const userToken = req.get(userTokenHeaderKey);
      if (!userToken) {
        sendReject(
          res,
          new APIError(
            "40150",
            null,
            `Missing ${config.getConfig("HEADER.X_USER_TOKEN")} header`
          )
        );
        return false;
      }

      const authResponse = authenticate(userToken);

      if (!authResponse) {
        sendReject(
          res,
          new APIError("40130", null, "Invalid user access token")
        );
      }
    }
  } catch (err) {
    sendReject(res, new APIError("40130", null, "User validation failed"));
    return false;
  }

  next();
};
