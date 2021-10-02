"use strict";
const config = require("../../../../config/config");
const db = config.getDb();
const tables = require("../../../tables");

function getAllUsersFromDb() {
  return db.select("*").from(tables.PUBLIC_USER_INFORMATION.NAME);
}

module.exports = {
  getAllUsersFromDb,
};
