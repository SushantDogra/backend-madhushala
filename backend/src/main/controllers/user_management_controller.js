"use strict";

const userManagementService = require("../services/user_management_service");
const respondError = require("../../utils/respond_error");

module.exports = {
  getAllUsersController: async (req, res) => {
    try {
      const result = await userManagementService.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },
};
