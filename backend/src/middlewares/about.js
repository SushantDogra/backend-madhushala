"use strict";

const os = require("os");
const config = require("../../config/config.js");
const db = config.getDb();

module.exports = async function (req, res) {
  const data = {
    name: "madhushala",
    version: "0.1",
    instance_id: os.hostname(),
  };

  res.status(200).json(data);
};
