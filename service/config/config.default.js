/* eslint valid-jsdoc: "off" */

"use strict";

const path = require("path");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1587473325677_2100";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.bodyParser = {
    jsonLimit: "10mb",
    formLimit: "10mb",
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: "localhost",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "343356",
      // database
      database: "react_blog",
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["http://localhost:3000", "http://localhost:3040"],
  };
  config.cors = {
    // origin: "*",
    credentials: true,
    allowMethods: "GET,POST,HEAD,PUT,DELETE,OPTIONS,PATCH",
  };

  config.multipart = {
    mode: "stream",
  };

  return {
    ...config,
    ...userConfig,
  };
};
