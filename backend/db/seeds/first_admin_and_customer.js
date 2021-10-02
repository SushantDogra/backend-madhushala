exports.seed = async function (knex) {
  await knex("user_management.public_user_information").insert([
    {
      username: "user100001",
      first_name: "jon",
      last_name: "snow",
      email: "jonsnow-100001@dispostable.com",
      role: "customer",
    },
    {
      username: "user100002",
      first_name: "jack",
      last_name: "sparrow",
      email: "jacksparrow-100002@dispostable.com",
      role: "admin",
    },
  ]);

  await knex("user_management.private_user_information").insert([
    {
      username: "user100001",
      password: "P@ssw0rd",
      is_verified: true,
      kyc_data: { aadhar_id: "2201-5385-8785" },
    },
    {
      username: "user100002",
      password: "P@ssw0rd",
      is_verified: true,
      kyc_data: { aadhar_id: "6601-6685-6685" },
    },
  ]);
};
