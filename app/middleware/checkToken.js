const { decodeToken, updateToken, setToken } = require("../utils/Token.js");

async function checkToken(ctx, next) {
  let is_pass = false;

  let url = ctx.request.url;
  // let allowList = [
  //     "/ycwAdmin/admin/login",
  //     "/api/user/login",
  //     "/api/user/wxlogin",
  //     "/api/productUser/searchProductAppointment",
  //     "/api/productUser/searchProductRate",
  //     "/api/productUser/searchProduct",
  //     "/api/productRate/search",
  //     "/api/productImg/search",
  //     "/api/product/search",
  //     "/api/room/getRoom",
  //     "/ycw/rooms/getroomRateList",
  //     " /ycw/rooms/getImage",
  //     "/api/attraction/getList",
  //     "/api/attraction/getDetail",
  //     "/api/attraction/getPhoto",
  //     "/api/attraction/getRate",
  //     "/api/carousel/getImgs",
  //     "/api/user/getUserInfo",
  //     "/upload"
  // ];

  let allowList = ["/api/user/register", "/api/user/login", "/api/admin/login"];

  //检测是否在白名单中
  allowList.forEach((item) => {
    if (url.startsWith(item)) {
      is_pass = true;
    }
    is_pass = true;
  });

  // 登录 不用检查
  if (is_pass) {
    await next();
  } else {
    // 规定token写在header 的 'token'
    let token = undefined;

    if (ctx.request.headers.token) {
      token = ctx.request.headers.token;
    }

    // 解码
    if (token) {
      //  获取到token
      let res = decodeToken(token);
      // console.log(res, 123);

      if (res && res.exp <= new Date() / 1000) {
        ctx.body = {
          message: "token过期",
          code: 9,
        };
      } else {
        // console.log(token);
        console.log(token, 123);

        let newToken = updateToken(token);
        setToken(ctx.res, newToken);
        // console.log(newToken);

        // console.log(newTokens);

        ctx.body = {
          message: "解析成功",
          code: 1,
        };
        await next();
      }
    } else {
      // 没有取到token
      ctx.body = {
        message: "没有token",
        code: -3,
      };
    }
  }
}

module.exports = () => checkToken;
