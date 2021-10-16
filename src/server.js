#!/usr/bin/env node
"use strict";

require("dotenv").config();
require(`module-alias/register`);

const http = require("http");
const events = require("events");
const Express = require("express");
const semver = require("semver");

const { engines } = require("../package.json");
const version = engines.node;

const config = require("../config/config");

const app = new Express();

http.globalAgent.maxSockets = Infinity;
process.setMaxListeners(50);
events.EventEmitter.defaultMaxListeners = 50;

// Shared App Configuration settings
app.set("port", config.getPort());

require("./router")(app);

http.createServer(app).listen(app.get("port"), () => {
  app.set("initialized", true);
  app.emit("app:initialized");
  console.log(
    "Server listening on PORT " +
      app.get("port") +
      ". ENV: " +
      config.getAppEnv()
  );
});
