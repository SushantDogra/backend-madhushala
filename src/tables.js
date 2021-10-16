"use strict";

module.exports = {
  LOCATION: {
    NAME: "app_data.location",
    FIELDS: {
      ID: "id",
      CITY: "city",
      STATE: "state",
      COUNTRY: "country",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },

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
      LOCATION_ID: "location_id",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
  LIQOUR: {
    NAME: "app_data.liqour",
    FIELDS: {
      ID: "id",
      TYPE: "type",
      BRAND: "brand",
      NAME: "name",
      DESCRIPTION: "description",
      IMAGE_URL: "image_url",
      DETAILS: "details",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
  LIQOUR_PRICE: {
    NAME: "app_data.liqour_price",
    FIELDS: {
      ID: "id",
      LIQOUR_ID: "liqour_id",
      LOCATION_ID: "location_id",
      BOTTLE_SIZE: "bottle_size",
      CURRENCY_TYPE: "currency_type",
      CURRENCY_VALUE: "currency_value",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
  LIQOUR_AVAILABILITY: {
    NAME: "app_data.liqour_availability",
    FIELDS: {
      ID: "id",
      LIQOUR_ID: "liqour_id",
      LOCATION_ID: "location_id",
      BOTTLE_SIZE: "bottle_size",
      AVAILABLE_QUANTITY: "available_quantity",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
};
