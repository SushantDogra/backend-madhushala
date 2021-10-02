exports.up = async function (knex) {
  console.log(
    "[Schema : user_management]  Creating table : public_user_information"
  );

  await knex.schema
    .withSchema("user_management")
    .createTable("public_user_information", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name");
      table.string("email").notNullable();
      table.string("role").notNullable();
      table.timestamps(true, true);
      table.unique("username");
      table.unique("email");
    });

  await knex.raw(
    "ALTER SEQUENCE user_management.public_user_information_id_seq RESTART WITH 1000000"
  );
};

exports.down = async function (knex) {
  console.log(
    `dropping public_user_information table from the user_management schema`
  );
  await knex.raw(
    "DROP TABLE IF EXISTS user_management.public_user_information;"
  );
};
