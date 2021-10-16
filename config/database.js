"use strict";

const ENVS = require("./envs");

module.exports = {
  PG_CONNECTION_OBJECT: {
    [ENVS.dev]: {
      host: "localhost",
      database: "madhushala",
      port: "5500",
      user: "postgres",
      password: "password",
    },
    [ENVS.production]: {
      host: "ec2-54-90-211-192.compute-1.amazonaws.com",
      database: "d2etqc76m13gqh",
      port: "5432",
      user: "fazacozgkzunmq",
      password:
        "5db3a665528a1ce0631dd3d63903ce9275c770cb0bbfa5f9c1d59688744f45b3",
    },
  },
  MIN_POOL_SIZE: {
    [ENVS.dev]: 4,
    default: 4,
  },
  MAX_POOL_SIZE: {
    [ENVS.dev]: 10,
    default: 10,
  },
};
