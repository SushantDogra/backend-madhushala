"use strict";

module.exports = {
  validate: (schema, payload) => {
    const { value: validatedPayload, error } = schema.validate(payload, {
      abortEarly: false,
    });
    return { validatedPayload, error };
  },
};
