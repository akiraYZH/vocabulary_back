"use strict";

module.exports = () => {
  return async function responseOption(ctx, next) {
    /* 解决OPTIONS请求 */
    ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Allow-Headers", "Authentication");
    ctx.set("Access-Control-Expose-Headers", "Authentication");
    
    // 指定服务器端允许进行跨域资源访问的来源域。可以用通配符*表示允许任何域的JavaScript访问资源，但是在响应一个携带身份信息(Credential)的HTTP请求时，必需指定具体的域，不能用通配符

    if (ctx.request.method === "OPTIONS") {
      ctx.response.status = 204;
    }
    await next();
  };
};
