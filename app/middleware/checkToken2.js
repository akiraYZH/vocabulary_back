const { decodeToken, updateToken, setToken } = require("../utils/Token.js");

module.exports = (options, app) => {
  return async function checkToken(ctx, next) {
    // 规定token写在header 的 'token'
    let token = undefined;

    if (ctx.request.headers.authentication) {
      token = ctx.request.headers.authentication;
    }

    // 解码
    if (token) {
      //  获取到token
      let res = decodeToken(token);
      console.log(token);
      console.log(res);
      console.log(res.exp, new Date() / 1000);
      if (res && res.exp <= new Date() / 1000) {
        ctx.body = {
          msg: "token过期",
          code: -1,
        };
      } else {
        let newToken = updateToken(token);
        setToken(ctx.res, newToken);

        ctx.body = {
          msg: "解析成功",
          code: 1,
        };
        await next();
      }
    } else {
      // 没有取到token
      ctx.body = {
        msg: "没有token",
        code: -3,
      };
    }
  };
};
