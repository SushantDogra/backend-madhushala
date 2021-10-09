"use strict";

const liqourService = require("../services/liqour_service");
const respondError = require("../../utils/respond_error");

module.exports = {
  getAllLiqourDetailsForGivenLocationController: async (req, res) => {
    try {
      const { city, state, country } = req.body;
      const result = await liqourService.getAllLiqourDetailsForGivenLocation(
        city,
        state,
        country
      );
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },
};
