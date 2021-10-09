"use strict";
const config = require(`../../../config/config`);

const liqourController = require("../controllers/liqour_controller");
const liqourRequestSchema = require("../schemas/liqour_schema");

module.exports = {
  getAllLiqourDetailsForGivenLocation: {
    method: "get",
    path: "/liqour",
    validatorSchema:
      liqourRequestSchema.getAllLiqourDetailsForGivenLocationSchema,
    function: liqourController.getAllLiqourDetailsForGivenLocationController,
  },
};
