"use strict";

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
    return SETTINGS.APP_SETTINGS.PORT;
  },
};
