"use strict";
const config = require("../../../../config/config");
const db = config.getDb();
const tables = require("../../../tables");

function getAllUsersFromDb() {
  return db.select("*").from(tables.PUBLIC_USER_INFORMATION.NAME);
}

function validateUserCredentialsFromDb(username, password) {
  return db
    .select(tables.PRIVATE_USER_INFORMATION.FIELDS.USERNAME)
    .from(`${tables.PRIVATE_USER_INFORMATION.NAME}`)
    .where(`${tables.PRIVATE_USER_INFORMATION.FIELDS.USERNAME}`, username)
    .where(`${tables.PRIVATE_USER_INFORMATION.FIELDS.PASSWORD}`, password)
    .first();
}

function getUserFromDb(username) {
  return db
    .select(
      `pubUser.${tables.PUBLIC_USER_INFORMATION.FIELDS.USERNAME}`,
      `pubUser.${tables.PUBLIC_USER_INFORMATION.FIELDS.FIRST_NAME}`,
      `pubUser.${tables.PUBLIC_USER_INFORMATION.FIELDS.LAST_NAME}`,
      `pubUser.${tables.PUBLIC_USER_INFORMATION.FIELDS.EMAIL}`,
      `pubUser.${tables.PUBLIC_USER_INFORMATION.FIELDS.ROLE}`,
      `privUser.${tables.PRIVATE_USER_INFORMATION.FIELDS.KYC_DATA}`
    )
    .from(`${tables.PUBLIC_USER_INFORMATION.NAME} as pubUser`)
    .join(`${tables.PRIVATE_USER_INFORMATION.NAME} as privUser`, function () {
      this.on(
        `pubUser.${tables.PUBLIC_USER_INFORMATION.FIELDS.USERNAME}`,
        `privUser.${tables.PRIVATE_USER_INFORMATION.FIELDS.USERNAME}`
      );
    })
    .where(
      `privUser.${tables.PRIVATE_USER_INFORMATION.FIELDS.USERNAME}`,
      username
    )
    .first();
}

function InsertPublicUserInformation(userInformation) {
  const { username, first_name, last_name, email, role } = userInformation;
  return db(tables.PUBLIC_USER_INFORMATION.NAME)
    .insert([
      {
        [tables.PUBLIC_USER_INFORMATION.FIELDS.USERNAME]: username,
        [tables.PUBLIC_USER_INFORMATION.FIELDS.FIRST_NAME]: first_name,
        [tables.PUBLIC_USER_INFORMATION.FIELDS.LAST_NAME]: last_name,
        [tables.PUBLIC_USER_INFORMATION.FIELDS.EMAIL]: email,
        [tables.PUBLIC_USER_INFORMATION.FIELDS.ROLE]: role,
        [tables.PUBLIC_USER_INFORMATION.FIELDS.IS_VERIFIED]: true,
      },
    ])
    .returning("*");
}

function InsertPrivateUserInformation(userInformation) {
  const { username, password, kyc_data } = userInformation;
  return db(tables.PRIVATE_USER_INFORMATION.NAME).insert([
    {
      [tables.PRIVATE_USER_INFORMATION.FIELDS.USERNAME]: username,
      [tables.PRIVATE_USER_INFORMATION.FIELDS.PASSWORD]: password,
      [tables.PRIVATE_USER_INFORMATION.FIELDS.KYC_DATA]: kyc_data,
    },
  ]);
}

function doesFieldAlreadyExistInUserPublicInformation(fieldName, fieldValue) {
  return db
    .select("*")
    .from(tables.PUBLIC_USER_INFORMATION.NAME)
    .where(fieldName, fieldValue)
    .first();
}

module.exports = {
  getAllUsersFromDb,
  getUserFromDb,
  InsertPublicUserInformation,
  InsertPrivateUserInformation,
  validateUserCredentialsFromDb,
  doesFieldAlreadyExistInUserPublicInformation,
};
