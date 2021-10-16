"use strict";

const commonUtils = require("../src/utils/common_utils");
const ENVS = require("./envs");
const DB = require("./database");
const SETTINGS = require("./settings");

const appEnv = process.env.NODE_ENV || ENVS.dev;

const knex = require("knex")({
  client: "pg",
  connection: DB.PG_CONNECTION_OBJECT[appEnv],
  searchPath: ["knex", "public"],
  pool: {
    min: DB.MIN_POOL_SIZE[appEnv],
    max: DB.MAX_POOL_SIZE[appEnv],
    afterCreate: function (connection, callback) {
      connection.query('SET timezone="GMT";', function (err) {
        console.log(`DB connection created for env ${appEnv}`);
        callback(err, connection);
      });
    },
  },
  acquireConnectionTimeout: 10000,
});

const API_RESPONSE_CODES = {
  STATUS_CODES: {
    200: "Ok",
    201: "Created",
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
    429: "Too Many Requests",
    440: "Login expired",
    500: "Server error",
    504: "Gateway Timeout",
  },
};

module.exports = {
  getAppEnv: () => {
    return appEnv;
  },
  isDevEnv: () => {
    return appEnv === ENVS.dev;
  },
  isProdEnv: () => {
    return appEnv === ENVS.prod;
  },
  isStagingEnv: () => {
    return appEnv === ENVS.staging;
  },
  getDb: () => {
    return knex;
  },
  getPort() {
    return process.env.PORT || SETTINGS.APP_SETTINGS.PORT;
  },
  getApiResponseCodes: () => {
    return API_RESPONSE_CODES;
  },
  getConfig(key, defaultValue) {
    let currentObj = SETTINGS;
    const props = key.split(".");
    for (let i = 0, len = props.length; i < len; i++) {
      if (Object.prototype.hasOwnProperty.call(currentObj, props[i])) {
        currentObj = currentObj[props[i]];
      } else if (defaultValue) {
        return defaultValue;
      } else {
        return null;
      }
    }
    if (commonUtils.isObject(currentObj)) {
      return currentObj[appEnv] || currentObj.default;
    } else {
      return currentObj;
    }
  },
};
