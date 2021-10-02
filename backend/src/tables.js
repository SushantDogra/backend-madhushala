"use strict";

module.exports = {
  PUBLIC_USER_INFORMATION: {
    NAME: "user_management.public_user_information",
    FIELDS: {
      ID: "id",
      USERNAME: "username",
      FIRST_NAME: "first_name",
      LAST_NAME: "last_name",
      EMAIL: "email",
      ROLL: "role",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
  PRIVATE_USER_INFORMATION: {
    NAME: "user_management.private_user_information",
    FIELDS: {
      USER_ID: "user_id",
      PASSWORD: "password",
      IS_VERIFIED: "is_verified",
      KYC_DATA: "kyc_data",
    },
  },
};
