"use strict";

module.exports = (app) => {
  const favicon = require("serve-favicon");
  const express = require("express");
  const cors = require("cors");
  const helmet = require("helmet");
  const requestIp = require("request-ip");
  const config = require("../config/config");
  const errorHandler = require("./middlewares/error_handler");
  const about = require("./middlewares/about");
  const accessControl = require("./middlewares/access_control");
  const APIError = require("./errors/api_error");
  const { allowedRoutes } = require("../config/routes");
  const reqBodyValidator = require("./middlewares/req_body_validator");

  const appAccessControlAllowOriginRegex = config.getConfig(
    `APP_ACCESS_CONTROL_ALLOW_ORIGIN_REGEX`
  );

  app.use(favicon(`${__dirname}/../favicon.ico`));
  app.use(express.json());
  app.use(requestIp.mw());
  app.use(helmet());
  app.use(helmet.frameguard({ action: "deny" }));
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "must-revalidate, proxy-revalidate");
    next();
  });

  app.use(
    cors({
      origin: function (origin, cb) {
        if (!origin) {
          return cb(null, true);
        }

        const regex = new RegExp(`${appAccessControlAllowOriginRegex}`);

        if (regex.test(origin)) {
          cb(null, true);
        } else {
          cb({ statusCode: 401, stack: `Origin Not Allowed by CORS` });
        }
      },
      exposedHeaders: [
        config.getConfig("HEADER.X_USER_TOKEN"),
        config.getConfig("HEADER.X_TOTAL_COUNT"),
      ],
    })
  );

  app.get("/aboutme", about);

  //app.use(accessControl);

  for (const route in allowedRoutes) {
    const routeDef = allowedRoutes[route];

    switch (routeDef.method) {
      case "get":
        typeof routeDef.middlewares === "undefined"
          ? app.get(
              routeDef.path,
              [reqBodyValidator(routeDef.path)],
              routeDef.function
            )
          : app.get(
              routeDef.path,
              [...routeDef.middlewares, reqBodyValidator(routeDef.path)],
              routeDef.function
            );
        break;
      case "post":
        typeof routeDef.middlewares === "undefined"
          ? app.post(
              routeDef.path,
              [reqBodyValidator(routeDef.path)],
              routeDef.function
            )
          : app.post(
              routeDef.path,
              [...routeDef.middlewares, reqBodyValidator(routeDef.path)],
              routeDef.function
            );
        break;
      case "put":
        typeof routeDef.middlewares === "undefined"
          ? app.put(
              routeDef.path,
              [reqBodyValidator(routeDef.path)],
              routeDef.function
            )
          : app.put(
              routeDef.path,
              [...routeDef.middlewares, reqBodyValidator(routeDef.path)],
              routeDef.function
            );
        break;
      case "delete":
        typeof routeDef.middlewares === "undefined"
          ? app.delete(
              routeDef.path,
              [reqBodyValidator(routeDef.path)],
              routeDef.function
            )
          : app.delete(
              routeDef.path,
              [...routeDef.middlewares, reqBodyValidator(routeDef.path)],
              routeDef.function
            );
        break;
      case "patch":
        typeof routeDef.middlewares === "undefined"
          ? app.patch(
              routeDef.path,
              [reqBodyValidator(routeDef.path)],
              routeDef.function
            )
          : app.patch(
              routeDef.path,
              [...routeDef.middlewares, reqBodyValidator(routeDef.path)],
              routeDef.function
            );
        break;
      default:
        console.log(
          `Bad method ${routeDef.method} for resource ${routeDef.path} in route definition`
        );
    }
  }

  app.get("/", (req, res) => {
    res.status(200).send("welcome to madhushala, the liqour delivery service");
  });

  app.all("*", (req, res) => {
    const err = new APIError(
      "40410",
      null,
      `Resource by ${req.method} request was not found: ${req.path}`
    );
    res.status(err.statusCode).send(err.message);
  });

  app.use(errorHandler({ includeDetails: !config.isProdEnv() }));
  return app;
};
