exports.up = async function (knex) {
  console.log(
    "[Schema : user_management]  Creating table : private_user_information"
  );

  await knex.schema
    .withSchema("user_management")
    .createTable("private_user_information", (table) => {
      table.increments("id").primary();
      table
        .string("username")
        .notNullable()
        .references("username")
        .inTable("user_management.public_user_information");
      table.string("password").notNullable();
      table.boolean("is_verified").notNullable().defaultTo(false);
      table.jsonb("kyc_data").notNullable();
      table.timestamps(true, true);
      table.unique("username");
    });

  await knex.raw(
    "ALTER SEQUENCE user_management.private_user_information_id_seq RESTART WITH 1000000"
  );
};

exports.down = async function (knex) {
  console.log(
    "[Schema : user_management]  Dropping table : private_user_information"
  );
  await knex.raw(
    "DROP TABLE IF EXISTS user_management.private_user_information;"
  );
};
