"use strict";

const database = require("./database");

async function getAllUsers() {
  const users = await database.getAllUsersFromDb();
  return users;
}

module.exports = {
  getAllUsers,
};
