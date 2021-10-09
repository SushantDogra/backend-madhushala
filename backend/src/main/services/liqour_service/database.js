"use strict";
const config = require("../../../../config/config");
const db = config.getDb();
const tables = require("../../../tables");

function getAllLiqourPriceDetailsForGivenLocationFromDataBase(
  locationInformation
) {
  const { id: location_id } = locationInformation;
  return db
    .select("*")
    .from(`${tables.LIQOUR.NAME} as lq`)
    .join(`${tables.LIQOUR_PRICE.NAME} as lqp`, function () {
      this.on(
        `lqp.${tables.LIQOUR_PRICE.FIELDS.LIQOUR_ID}`,
        `lq.${tables.LIQOUR.FIELDS.ID}`
      );
    })
    .where(`lqp.${tables.LIQOUR_PRICE.FIELDS.LOCATION_ID}`, location_id);
}

function getAllLiqourAvailabilityDetailsForGivenLocationFromDataBase(
  locationInformation
) {
  const { id: location_id } = locationInformation;
  return db
    .select("*")
    .from(`${tables.LIQOUR.NAME} as lq`)
    .join(`${tables.LIQOUR_AVAILABILITY.NAME} as lqa`, function () {
      this.on(
        `lqa.${tables.LIQOUR_AVAILABILITY.FIELDS.LIQOUR_ID}`,
        `lq.${tables.LIQOUR.FIELDS.ID}`
      );
    })
    .where(`lqa.${tables.LIQOUR_AVAILABILITY.FIELDS.LOCATION_ID}`, location_id);
}
module.exports = {
  getAllLiqourPriceDetailsForGivenLocationFromDataBase,
  getAllLiqourAvailabilityDetailsForGivenLocationFromDataBase,
};
