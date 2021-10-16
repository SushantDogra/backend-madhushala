"use strict";
const config = require(`../../../config/config`);

const commonController = require("../controllers/common_controller");
const commonRequestSchema = require("../schemas/common_schema");

module.exports = {
  getHomePageDataRoute: {
    method: "get",
    path: "/homePage",
    function: commonController.getHomePageDataController,
  },
};
