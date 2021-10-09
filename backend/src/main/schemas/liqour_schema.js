"use strict";
const Joi = require("joi").extend(require("@hapi/joi-date"));

const getAllLiqourDetailsForGivenLocationSchema = Joi.object({
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});

module.exports = {
  getAllLiqourDetailsForGivenLocationSchema,
};
