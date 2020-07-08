/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592361444817_6388';

  // add your middleware config here
  config.middleware = ["checkToken"];
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
    username: "root", //账号
    password: "root", //密码
    define: {
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      underscored: true,
      //防止sequelize把表名变成复数
      freezeTableName: true,
      // paranoid:true
    },
    timezone: "+08:00",
    
  };

  return {
    ...config,
    ...userConfig,
  };
};
