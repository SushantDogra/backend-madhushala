"use struct";

const DB = require("./config/database");
const ENVS = require("./config/envs");
const appEnv = process.env.NODE_ENV || ENVS.dev;

module.exports = {
  [appEnv]: {
    client: "pg",
    connection: DB.PG_CONNECTION_OBJECT[appEnv],
    migrations: {
      directory: __dirname + "/db/migrations",
      schemaName: "public",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
