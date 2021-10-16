exports.seed = async function (knex) {
  await knex("app_data.location").insert([
    {
      city: "mumbai",
      state: "maharashtra",
      country: "india",
    },
    {
      city: "jaipur",
      state: "rajasthan",
      country: "india",
    },
    {
      city: "bangalore",
      state: "karnataka",
      country: "india",
    },
    {
      city: "gwalior",
      state: "madhya pradesh",
      country: "india",
    },
  ]);

  await knex("app_data.liqour").insert([
    {
      type: "WHISKEY",
      brand: "JOHNNIE_WALKER",
      name: "Black Label",
    },
    {
      type: "WHISKEY",
      brand: "JOHNNIE_WALKER",
      name: "Red Label",
    },
    {
      type: "BEER",
      brand: "KINGFISHER",
      name: "ULTRA",
    },
  ]);

  await knex("app_data.liqour_price").insert([
    {
      liqour_id: 1000000,
      location_id: 1000003,
      bottle_size: "FULL",
      currency_type: "INR",
      currency_value: 5000,
    },
    {
      liqour_id: 1000000,
      location_id: 1000003,
      bottle_size: "HALF",
      currency_type: "INR",
      currency_value: 2600,
    },
    {
      liqour_id: 1000002,
      location_id: 1000003,
      bottle_size: "FULL",
      currency_type: "INR",
      currency_value: 330,
    },
  ]);

  await knex("app_data.liqour_availability").insert([
    {
      liqour_id: 1000000,
      location_id: 1000003,
      bottle_size: "FULL",
      available_quantity: 50,
    },
    {
      liqour_id: 1000000,
      location_id: 1000003,
      bottle_size: "HALF",
      available_quantity: 72,
    },
    {
      liqour_id: 1000002,
      location_id: 1000003,
      bottle_size: "FULL",
      available_quantity: 5003,
    },
  ]);
};
