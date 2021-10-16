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

async function addLiqour({
  type,
  brand,
  name,
  description,
  image_url,
  details = {},
}) {
  //TODO @sushant: Validate user context and only allow admin to add liqour
  const addedLiqour = await database.addLiqourToDatabase({
    type,
    brand,
    name,
    description,
    image_url,
    details,
  });
  return addedLiqour[0];
}

async function updateLiqourPriceForGivenBottleSizeAndLocation() {}

async function updateLiqourAvailabilityForGivenBottleSizeAndLocation() {}

async function getLiqourDetailsForGivenLocation() {}

async function deleteLiqour() {}

async function updateLiqour() {}

async function getLiqour() {}

module.exports = {
  getAllLiqourDetailsForGivenLocation,
  addLiqour,
  updateLiqourPriceForGivenBottleSizeAndLocation,
  updateLiqourAvailabilityForGivenBottleSizeAndLocation,
  getLiqourDetailsForGivenLocation,
  deleteLiqour,
  updateLiqour,
  getLiqour,
};
