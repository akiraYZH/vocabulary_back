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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_yzh";

  // add your middleware config here
  config.middleware = ["checkToken"];

  config.security = {
    csrf: {
      enable: false,
    },
  };
  console.log(process.env.NODE_ENV);

  // config.cors = {
  //   credentials: true,
  //   origin: process.env.NODE_ENV=='development'?'http://localhost:9527':'http://francais.akirayu.cn',
  //   allowMethods: 'GET,POST',

  // };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: "localhost",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "root",
      // 数据库名
      database: "vocabulary",
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // add your user config here

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "vocabulary",
    username: "root", //账号
    password: "root", //密码
    define: {
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      underscored: true,
    },
  };

  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
