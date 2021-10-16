"use strict";
const tables = require("../../../tables");
const { isNullOrUndefined } = require("../../../utils/common_utils");
const { BOTTLE_SIZE } = require("../../../utils/global_constants");

function initializeLiqourSizePriceAvailabilityMap(liqourObject) {
  const liqourSizePriceAvailabilityMap = {
    liqour_id: liqourObject.liqour_id,
    type: liqourObject.type,
    brand: liqourObject.brand,
    name: liqourObject.name,
    description: liqourObject.description,
    image_url: liqourObject.image_url,
    details: liqourObject.details,
    size_price_availability_map: {
      [BOTTLE_SIZE.PINT]: {},
      [BOTTLE_SIZE.CAN]: {},
      [BOTTLE_SIZE.QUARTER]: {},
      [BOTTLE_SIZE.HALF]: {},
      [BOTTLE_SIZE.FULL]: {},
    },
  };

  return liqourSizePriceAvailabilityMap;
}

function transformLiqourInformation(
  rawLiqourPriceInformation,
  rawLiqourAvailabilityInformation
) {
  let transformedLiqourInformation = [];
  let liqourSizePriceAvailabilityMap = {};

  for (let i = 0; i < rawLiqourPriceInformation.length; i++) {
    const key = `${
      rawLiqourPriceInformation[i][tables.LIQOUR_PRICE.FIELDS.LIQOUR_ID]
    }`;
    const size = rawLiqourPriceInformation[i].bottle_size;
    const price = {
      currency_type: rawLiqourPriceInformation[i].currency_type,
      cuurency_value: rawLiqourPriceInformation[i].currency_value,
    };
    if (isNullOrUndefined(liqourSizePriceAvailabilityMap[key])) {
      liqourSizePriceAvailabilityMap[key] =
        initializeLiqourSizePriceAvailabilityMap(rawLiqourPriceInformation[i]);
    }

    liqourSizePriceAvailabilityMap[key][`size_price_availability_map`][size][
      `price`
    ] = price;
  }

  for (let i = 0; i < rawLiqourAvailabilityInformation.length; i++) {
    const key = `${
      rawLiqourAvailabilityInformation[i][
        tables.LIQOUR_AVAILABILITY.FIELDS.LIQOUR_ID
      ]
    }`;
    const size =
      rawLiqourAvailabilityInformation[i][
        tables.LIQOUR_AVAILABILITY.FIELDS.BOTTLE_SIZE
      ];
    const availableQuantity =
      rawLiqourAvailabilityInformation[i][
        tables.LIQOUR_AVAILABILITY.FIELDS.AVAILABLE_QUANTITY
      ];
    if (isNullOrUndefined(liqourSizePriceAvailabilityMap[key])) {
      liqourSizePriceAvailabilityMap[key] =
        initializeLiqourSizePriceAvailabilityMap(
          rawLiqourAvailabilityInformation[i]
        );
    }
    liqourSizePriceAvailabilityMap[key][`size_price_availability_map`][size][
      tables.LIQOUR_AVAILABILITY.FIELDS.AVAILABLE_QUANTITY
    ] = availableQuantity;
  }

  const keys = Object.keys(liqourSizePriceAvailabilityMap);

  keys.forEach((key, index) => {
    transformedLiqourInformation.push(liqourSizePriceAvailabilityMap[key]);
  });

  return transformedLiqourInformation;
}

module.exports = {
  transformLiqourInformation,
};
