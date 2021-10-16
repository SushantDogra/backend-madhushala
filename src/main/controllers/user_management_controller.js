"use strict";

const userManagementService = require("../services/user_management_service");
const respondError = require("../../utils/respond_error");

module.exports = {
  getAllUsersPublicInformationController: async (req, res) => {
    try {
      const result = await userManagementService.getAllUsersPublicInformation();
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },

  createUserController: async (req, res) => {
    try {
      const payload = req.body;
      const { username } = req.params;
      const response = await userManagementService.createUser(
        username,
        payload
      );
      res.status(201).json(response);
    } catch (error) {
      respondError(res, error);
    }
  },

  getUserController: async (req, res) => {
    try {
      const { password } = req.body;
      const { username } = req.params;
      const response = await userManagementService.getUser(username, password);
      res.status(200).json(response);
    } catch (error) {
      respondError(res, error);
    }
  },
};
