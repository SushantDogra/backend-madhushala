"use strict";

const commonService = require("../services/common_service");

module.exports = {
  getHomePageDataController: async (req, res) => {
    try {
      const result = await commonService.getHomePageData();
      res.status(200).json(result);
    } catch (error) {
      console.log("error", error);
    }
  },
};
