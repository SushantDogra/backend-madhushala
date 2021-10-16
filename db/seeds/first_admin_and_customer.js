exports.seed = async function (knex) {
  await knex("user_management.public_user_information").insert([
    {
      username: "user100001",
      first_name: "jon",
      last_name: "snow",
      email: "jonsnow-100001@dispostable.com",
      role: "customer",
      is_verified: true,
    },
    {
      username: "user100002",
      first_name: "jack",
      last_name: "sparrow",
      email: "jacksparrow-100002@dispostable.com",
      role: "admin",
      is_verified: true,
    },
  ]);

  await knex("user_management.private_user_information").insert([
    {
      username: "user100001",
      password: "P@ssw0rd",
      kyc_data: { aadhar_number: "220153858785" },
    },
    {
      username: "user100002",
      password: "P@ssw0rd",
      kyc_data: { aadhar_number: "660166856685" },
    },
  ]);
};
