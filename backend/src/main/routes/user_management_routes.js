"use strict";
const config = require(`../../../config/config`);

const userManagementController = require("../controllers/user_management_controller");
const userManagementRequestSchema = require("../schemas/user_management_schema");

module.exports = {
  getAllUsersRoute: {
    method: "get",
    path: "/users",
    function: userManagementController.getAllUsersController,
  },
};
