exports.up = async function (knex) {
  console.log("[Schema : app_data]  Creating table : liqour");

  await knex.schema.withSchema("app_data").createTable("liqour", (table) => {
    table.increments("id").primary();
    table.string("type").notNullable();
    table.string("brand").notNullable();
    table.string("name").notNullable();
    table.string("description");
    table.string("image_url");
    table.jsonb("details");
    table.timestamps(true, true);
    table.unique(["type", "brand", "name"]);
  });

  await knex.raw("ALTER SEQUENCE app_data.liqour_id_seq RESTART WITH 1000000");
};

exports.down = async function (knex) {
  console.log("[Schema : app_data]  Dropping table : liqour");
  await knex.raw("DROP TABLE IF EXISTS app_data.liqour;");
};
