"use strict";
const Joi = require("joi").extend(require("@hapi/joi-date"));
const { USER_ROLES } = require("../../utils/global_constants");

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .required(),
  aadhar_number: Joi.string().required(),
  password: Joi.string().required(),
});

const getUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

module.exports = {
  createUserSchema,
  getUserSchema,
};
