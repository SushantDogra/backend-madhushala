"use strict";
const config = require(`../../../config/config`);

const userManagementController = require("../controllers/user_management_controller");
const userManagementRequestSchema = require("../schemas/user_management_schema");

module.exports = {
  getAllUsersPublicInformationRoute: {
    method: "get",
    path: "/users",
    function: userManagementController.getAllUsersPublicInformationController,
  },
  createUserRoute: {
    method: "post",
    path: "/users/:username",
    validatorSchema: userManagementRequestSchema.createUserSchema,
    function: userManagementController.createUserController,
  },
  getUserRoute: {
    method: "get",
    path: "/users/:username",
    validatorSchema: userManagementRequestSchema.getUserSchema,
    function: userManagementController.getUserController,
  },
};
