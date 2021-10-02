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
      ROLE: "role",
      IS_VERIFIED: "is_verified",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
  PRIVATE_USER_INFORMATION: {
    NAME: "user_management.private_user_information",
    FIELDS: {
      USERNAME: "username",
      PASSWORD: "password",
      KYC_DATA: "kyc_data",
    },
  },
};
