exports.up = async function (knex) {
  console.log("[Schema : app_data]  Creating table : location");

  await knex.schema.withSchema("app_data").createTable("location", (table) => {
    table.increments("id").primary();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("country").notNullable();
    table.timestamps(true, true);
    table.unique(["city", "state", "country"]);
  });

  await knex.raw(
    "ALTER SEQUENCE app_data.location_id_seq RESTART WITH 1000000"
  );
};

exports.down = async function (knex) {
  console.log("[Schema : app_data]  Dropping table : location");
  await knex.raw("DROP TABLE IF EXISTS app_data.location;");
};
