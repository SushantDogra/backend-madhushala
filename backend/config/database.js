"use strict";

const ENVS = require("./envs");

module.exports = {
  PG_CONNECTION_OBJECT: {
    [ENVS.dev]: {
      host: "localhost",
      database: "madhushala",
      port: "5500",
      user: "postgres",
      password: "password",
    },
  },
  MIN_POOL_SIZE: {
    [ENVS.dev]: 4,
    default: 4,
  },
  MAX_POOL_SIZE: {
    [ENVS.dev]: 10,
    default: 10,
  },
};
