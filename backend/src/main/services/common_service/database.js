"use strict";
const config = require("../../../../config/config");
const db = config.getDb();
const tables = require("../../../tables");

function createLocationInDatabase(city, state, country) {
  return db(tables.LOCATION.NAME)
    .insert([{ city, state, country }])
    .onConflict(["city", "state", "country"])
    .merge()
    .returning("*");
}

function getLocationFromDatabase(city, state, country) {
  return db
    .select("*")
    .from(tables.LOCATION.NAME)
    .where(tables.LOCATION.FIELDS.CITY, city)
    .where(tables.LOCATION.FIELDS.STATE, state)
    .where(tables.LOCATION.FIELDS.COUNTRY, country)
    .first();
}

module.exports = {
  createLocationInDatabase,
  getLocationFromDatabase,
};
