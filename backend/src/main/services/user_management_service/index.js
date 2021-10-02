"use strict";

const users = [
  { firstName: "First", lastName: "User" },
  { firstName: "Second", lastName: "User" },
];

function getAllUsers() {
  return users;
}

module.exports = {
  getAllUsers,
};
