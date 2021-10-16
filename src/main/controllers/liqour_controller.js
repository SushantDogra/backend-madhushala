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

  addLiqourController: async (req, res) => {
    try {
      const { type, brand, name, description, image_url } = req.body;
      const result = await liqourService.addLiqour({
        type,
        brand,
        name,
        description,
        image_url,
      });
      res.status(201).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },

  updateLiqourPriceForGivenBottleSizeAndLocationController: async (
    req,
    res
  ) => {
    try {
      const result =
        await liqourService.updateLiqourPriceForGivenBottleSizeAndLocation({});
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },

  updateLiqourAvailabilityForGivenBottleSizeAndLocationController: async (
    req,
    res
  ) => {
    try {
      const result =
        await liqourService.updateLiqourAvailabilityForGivenBottleSizeAndLocation(
          {}
        );
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },

  getLiqourDetailsForGivenLocationController: async (req, res) => {
    try {
      const result = await liqourService.getLiqourDetailsForGivenLocation({});
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },

  deleteLiqourController: async (req, res) => {
    try {
      const result = await liqourService.deleteLiqour({});
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },

  updateLiqourController: async (req, res) => {
    try {
      const result = await liqourService.updateLiqour({});
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },

  getLiqourController: async (req, res) => {
    try {
      const result = await liqourService.getLiqour({});
      res.status(200).json(result);
    } catch (error) {
      respondError(res, error);
    }
  },
};
