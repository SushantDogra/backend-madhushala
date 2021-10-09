"use strict";
const Joi = require("joi").extend(require("@hapi/joi-date"));

const getAllLiqourDetailsForGivenLocationSchema = Joi.object({
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});

const addLiqourSchema = Joi.object({
  type: Joi.string().required(),
  brand: Joi.string().required(),
  name: Joi.string().required(),
});

const updateLiqourPriceForGivenBottleSizeAndLocationSchema = Joi.object({});

const updateLiqourAvailabilityForGivenBottleSizeAndLocationSchema = Joi.object(
  {}
);

const getLiqourDetailsForGivenLocationSchema = Joi.object({});

const deleteLiqourSchema = Joi.object({});

const getLiqourSchema = Joi.object({});

const updateLiqourSchema = Joi.object({});

module.exports = {
  getAllLiqourDetailsForGivenLocationSchema,
  addLiqourSchema,
  updateLiqourPriceForGivenBottleSizeAndLocationSchema,
  updateLiqourAvailabilityForGivenBottleSizeAndLocationSchema,
  getLiqourDetailsForGivenLocationSchema,
  deleteLiqourSchema,
  getLiqourSchema,
  updateLiqourSchema,
};
