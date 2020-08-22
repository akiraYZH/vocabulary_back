"use strict";

module.exports = () => {
  return async function responseOption(ctx, next) {
    //放行的域名
    const allowURL = "akirayu.cn";
    if (process.env.NODE_ENV == "development") {
      ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
    } else if (ctx.request.headers.origin.includes(allowURL)) {
      // 如果包含域名就放行
      ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
    }

    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Allow-Headers", "authentication, Content-Type");
    ctx.set("Access-Control-Expose-Headers", "authentication");

    // 指定服务器端允许进行跨域资源访问的来源域。可以用通配符*表示允许任何域的JavaScript访问资源，但是在响应一个携带身份信息(Credential)的HTTP请求时，必需指定具体的域，不能用通配符
    /* 解决OPTIONS请求 */
    if (ctx.request.method === "OPTIONS") {
      ctx.response.status = 204;
    }
    await next();
  };
};
