"use strict";

const apiError = require("../../../errors/api_error");
const database = require("./database");
const helper = require("./helper");
const commonService = require("../common_service");
const { isNullOrUndefined } = require("../../../utils/common_utils");

async function getAllLiqourDetailsForGivenLocation(city, state, country) {
  let locationInformation;
  try {
    locationInformation = await commonService.getLocation(city, state, country);
    if (isNullOrUndefined(locationInformation)) {
      throw new Error(
        `this location is not added to our database, city: ${city}, state: ${state}, country: ${country}`
      );
    }
  } catch (err) {
    console.log(
      `Error in getAllLiqourDetailsForGivenLocation, Error: ${err.message}`
    );
    return [];
  }

  const rawLiqourPriceInformation =
    await database.getAllLiqourPriceDetailsForGivenLocationFromDataBase(
      locationInformation
    );
  const rawLiqourAvailabilityInformation =
    await database.getAllLiqourAvailabilityDetailsForGivenLocationFromDataBase(
      locationInformation
    );
  const transformedLiqourInformation = helper.transformLiqourInformation(
    rawLiqourPriceInformation,
    rawLiqourAvailabilityInformation
  );
  return transformedLiqourInformation;
}

module.exports = {
  getAllLiqourDetailsForGivenLocation,
};
