"use strict";

module.exports = () => {
  return async function responseOption(ctx, next) {
    //white list
    const allowURL = "akirayu.cn";
    if (process.env.NODE_ENV == "development") {
      ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
    } else if (ctx.request.headers.origin.includes(allowURL)) {
      // if contains the domain name
      ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
    }

    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Allow-Headers", "authentication, Content-Type");
    ctx.set("Access-Control-Expose-Headers", "authentication");

    // Specify the source domain that the server allows for cross-domain resource access. 
    // The wildcard * can be used to indicate that JavaScript of any domain is allowed to access resources, 
    // but when responding to an HTTP request carrying identity information (Credential), 
    // a specific domain must be specified, and wildcards cannot be used
    
    /* OPTIONS */
    if (ctx.request.method === "OPTIONS") {
      ctx.response.status = 204;
    }
    await next();
  };
};
