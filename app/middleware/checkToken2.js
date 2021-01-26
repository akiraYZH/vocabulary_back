const { decodeToken, updateToken, setToken } = require("../utils/Token.js");

module.exports = (options, app) => {
  return async function checkToken(ctx, next) {
    // set token in header 'token'
    let token = undefined;

    if (ctx.request.headers.authentication) {
      token = ctx.request.headers.authentication;
    }

    // decode
    if (token) {
      //  get token
      let res = decodeToken(token);
      if (res && res.exp <= new Date() / 1000) {
        ctx.body = {
          msg: "token expired",
          code: -1,
        };
      } else {
        let newToken = updateToken(token);
        setToken(ctx.res, newToken);

        ctx.body = {
          msg: "decoded successfully",
          code: 1,
        };
        await next();
      }
    } else {
      // 没有取到token
      ctx.body = {
        msg: "No token",
        code: -3,
      };
    }
  };
};
