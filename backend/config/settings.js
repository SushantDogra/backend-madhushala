"use strict";

module.exports = {
  APP_SETTINGS: {
    PORT: 4444,
    MAX_CONNECTIONS: 500,
  },
  APP_ACCESS_CONTROL_ALLOW_ORIGIN_REGEX: `^http(s)?:\/\/localhost:(4200|4300|4444))$`,
  HEADER: {
    X_API_KEY: "X-Api-Key",
    X_USER_ID: "X-User-Id",
    X_ACTOR_KEY: "X-Actor-Key",
    X_USER_TOKEN: "X-ms-User-Token",
    X_TRACE_CONTEXT: "X-Trace-Context",
    X_CLIENT_SOURCE: "X-Client-Source",
    X_TOTAL_COUNT: "X-Total-Count",
    X_APP_ID: "X-ApplicationId",
    CONTENT_TYPE: "Content-Type",
    AUTHORIZATION: "Authorization",
  },
};
