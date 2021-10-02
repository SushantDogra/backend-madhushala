exports.up = async function (knex) {
  console.log("[Schema : app_data]  Creating table : liqour_price");

  await knex.schema
    .withSchema("app_data")
    .createTable("liqour_price", (table) => {
      table.increments("id").primary();
      table
        .integer("liqour_id")
        .notNullable()
        .references("id")
        .inTable("app_data.liqour");
      table.string("bottle_size").notNullable();
      table
        .integer("location_id")
        .notNullable()
        .references("id")
        .inTable("app_data.location");
      table.string("currency_type").notNullable();
      table.float("currency_value").notNullable();
      table.timestamps(true, true);
      table.unique(["liqour_id", "bottle_size", "location_id"]);
    });

  await knex.raw(
    "ALTER SEQUENCE app_data.liqour_price_id_seq RESTART WITH 1000000"
  );
};

exports.down = async function (knex) {
  console.log("[Schema : app_data]  Dropping table : liqour_price");
  await knex.raw("DROP TABLE IF EXISTS app_data.liqour_price;");
};
