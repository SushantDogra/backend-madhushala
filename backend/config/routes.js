`use strict`;

const userManagementRoutes = require("../src/main/routes/user_management_routes");
const commonRoutes = require("../src/main/routes/common_routes");

let validatorMap = {};
const allowedRoutes = ((routes) => {
  const allowedRoutes = {};
  for (const rt in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, rt)) {
      for (const key in routes[rt]) {
        if (key in allowedRoutes) {
          throw Error(`Duplicate Route Declaration:${key}`);
        } else {
          allowedRoutes[key] = routes[rt][key];
          if (routes[rt][key].validatorSchema) {
            if (!(routes[rt][key].path in validatorMap)) {
              validatorMap[routes[rt][key].path] = {};
            }
            validatorMap[routes[rt][key].path][routes[rt][key].method] =
              routes[rt][key].validatorSchema;
          }
        }
      }
    }
  }
  return allowedRoutes;
})([userManagementRoutes, commonRoutes]);

module.exports = {
  allowedRoutes,
  validatorMap,
};
