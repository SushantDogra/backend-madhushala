"use strict";
const { isNullOrUndefined } = require("../../../utils/common_utils");
const database = require("./database");

function getHomePageData() {
  return { text: "I am Madhushala, the liquor delivery service" };
}

async function createLocation(city, state, country) {
  if (
    isNullOrUndefined(city) ||
    isNullOrUndefined(state || isNullOrUndefined(country))
  ) {
    throw new Error(
      `Error while trying to add location,city: ${city}, state: ${state}, country: ${country}`
    );
  }
  const createdLocation = await database.createLocationInDatabase(
    city,
    state,
    country
  );
  return createdLocation;
}

async function getLocation(city, state, country) {
  if (
    isNullOrUndefined(city) ||
    isNullOrUndefined(state || isNullOrUndefined(country))
  ) {
    throw new Error(
      `Error while trying to get location,city: ${city}, state: ${state}, country: ${country}`
    );
  }
  const location = database.getLocationFromDatabase(city, state, country);
  return location;
}

module.exports = {
  getHomePageData,
  createLocation,
  getLocation,
};
