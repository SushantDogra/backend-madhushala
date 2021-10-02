"use strict";

const userManagementService = require("../services/user_management_service");

module.exports = {
  getAllUsersController: async (req, res) => {
    try {
      const result = await userManagementService.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      console.log("error", error);
    }
  },
};
