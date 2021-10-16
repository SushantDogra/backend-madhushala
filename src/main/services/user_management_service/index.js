"use strict";

const apiError = require("../../../errors/api_error");
const tables = require("../../../tables");
const database = require("./database");

async function validateUserCredentials(username, password) {
  const validCredentials = await database.validateUserCredentialsFromDb(
    username,
    password
  );
  if (!validCredentials) {
    throw new apiError("40120", null, "incorrect Password");
  }
}

async function doesUserNameAlreadyExist(username) {
  const isExisting =
    await database.doesFieldAlreadyExistInUserPublicInformation(
      tables.PUBLIC_USER_INFORMATION.FIELDS.USERNAME,
      username
    );
  if (isExisting) {
    throw new apiError(
      "40120",
      null,
      "a user with this username already exists"
    );
  }
}

async function doesEmailAlreadyExist(email) {
  const isExisting =
    await database.doesFieldAlreadyExistInUserPublicInformation(
      tables.PUBLIC_USER_INFORMATION.FIELDS.EMAIL,
      email
    );
  if (isExisting) {
    throw new apiError("40120", null, "a user with this email already exists");
  }
}

async function validateUserCredentials(username, password) {
  const validCredentials = await database.validateUserCredentialsFromDb(
    username,
    password
  );
  if (!validCredentials) {
    throw new apiError("40120", null, "incorrect Password");
  }
}

async function getAllUsersPublicInformation() {
  const users = await database.getAllUsersFromDb();
  return users;
}
async function createUser(username, userInformation) {
  const { first_name, last_name, email, role, password, aadhar_number } =
    userInformation;

  await doesEmailAlreadyExist(email);
  await doesUserNameAlreadyExist(username);
  const publicInformation = await database.InsertPublicUserInformation({
    username,
    first_name,
    last_name,
    email,
    role,
  });

  await database.InsertPrivateUserInformation({
    username,
    password,
    kyc_data: { aadhar_number },
  });

  return publicInformation;
}

async function getUser(username, password) {
  await validateUserCredentials(username, password);
  const userInformation = await database.getUserFromDb(username);
  return userInformation;
}

module.exports = {
  getAllUsersPublicInformation,
  createUser,
  getUser,
};
