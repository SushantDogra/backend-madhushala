"use strict";
const config = require(`../../../config/config`);

const liqourController = require("../controllers/liqour_controller");
const liqourRequestSchema = require("../schemas/liqour_schema");

module.exports = {
  addLiqour: {
    method: "post",
    path: "/liqour",
    validatorSchema: liqourRequestSchema.addLiqourSchema,
    function: liqourController.addLiqourController,
  },

  deleteLiqour: {
    method: "delete",
    path: "/liqour/:liqour_id",
    validatorSchema: liqourRequestSchema.deleteLiqourSchema,
    function: liqourController.deleteLiqourController,
  },

  getLiqour: {
    method: "get",
    path: "/liqour/:liqour_id",
    validatorSchema: liqourRequestSchema.getLiqourSchema,
    function: liqourController.getLiqourController,
  },

  updateLiqour: {
    method: "patch",
    path: "/liqour/:liqour_id",
    validatorSchema: liqourRequestSchema.updateLiqourSchema,
    function: liqourController.updateLiqourController,
  },

  getAllLiqourDetailsForGivenLocation: {
    method: "get",
    path: "/location/liqour",
    validatorSchema:
      liqourRequestSchema.getAllLiqourDetailsForGivenLocationSchema,
    function: liqourController.getAllLiqourDetailsForGivenLocationController,
  },

  getLiqourDetailsForGivenLocation: {
    method: "get",
    path: "/location/liqour/:liqour_id",
    validatorSchema: liqourRequestSchema.getLiqourDetailsForGivenLocationSchema,
    function: liqourController.getLiqourDetailsForGivenLocationController,
  },

  updateLiqourPriceForGivenBottleSizeAndLocation: {
    method: "patch",
    path: "/location/liqour/:liqour_id/price",
    validatorSchema:
      liqourRequestSchema.updateLiqourPriceForGivenBottleSizeAndLocationSchema,
    function:
      liqourController.updateLiqourPriceForGivenBottleSizeAndLocationController,
  },

  updateLiqourAvailabilityForGivenBottleSizeAndLocation: {
    method: "patch",
    path: "/location/liqour/:liqour_id/availability",
    validatorSchema:
      liqourRequestSchema.updateLiqourAvailabilityForGivenBottleSizeAndLocationSchema,
    function:
      liqourController.updateLiqourAvailabilityForGivenBottleSizeAndLocationController,
  },
};
