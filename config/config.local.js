/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // config.cluster = {
  //   listen: {
  //     port: 7003,
  //     hostname: "127.0.0.1",
  //   },
  // };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1592361444817_6388";

  // add your middleware config here
  config.middleware = ["cors"];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "vocabulary",
    username: "root", //account
    password: "root", //password
    define: {
      // fields splited by（_)
      underscored: true,
      //prevent sequelize turn table names to plurial
      freezeTableName: true,
      // paranoid:true
    },
    timezone: "+08:00",
  };

  config.session = {
    key: "SESSION_ID",
    maxAge: 864000,
    httpOnly: true,
    encrypt: true,
    renew: true, 
  };
  return {
    ...config,
    ...userConfig,
  };
};
