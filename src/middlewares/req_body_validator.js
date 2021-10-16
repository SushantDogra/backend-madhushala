"use strict";
const validatorMap = require("../../config/routes").validatorMap;
const JoiValidation = require("../utils/joi_validation");
const PayloadValidationError = require("../errors/payload_validation_error");
const respondError = require("../utils/respond_error");

module.exports = function (routePath) {
  return async (req, res, next) => {
    try {
      let _method = req.method.toLowerCase();
      let schema =
        routePath in validatorMap ? validatorMap[routePath][_method] : null;
      if (schema) {
        const payload = {};
        for (let keys in req.body) {
          payload[keys] = req.body[keys];
        }
        for (let keys in req.params) {
          payload[keys] = req.params[keys];
        }
        for (let keys in req.query) {
          payload[keys] = req.query[keys];
        }

        const { validatedPayload, error: payloadValidationError } =
          JoiValidation.validate(schema, payload);

        if (payloadValidationError) {
          console.log(
            `method: ${req.method} | route: ${routePath} | message : ${payloadValidationError.message}`
          );
          const errMessage = payloadValidationError.message;
          const resMessage =
            errMessage.indexOf("fails") > 0
              ? `${errMessage.slice(0, errMessage.indexOf("fails"))} is invalid`
              : errMessage;
          throw new PayloadValidationError(`Invalid payload : ${resMessage}`);
        }

        req.validated_payload = validatedPayload;
      }
      next();
    } catch (error) {
      respondError(res, error);
    }
  };
};
