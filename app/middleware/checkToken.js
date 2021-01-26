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

  //Check if it is in white list
  allowList.forEach((item) => {
    if (url.startsWith(item)) {
      is_pass = true;
    }
    is_pass = true;
  });

  // login, no check
  if (is_pass) {
    await next();
  } else {
    // set token in header 'token'
    let token = undefined;

    if (ctx.request.headers.token) {
      token = ctx.request.headers.token;
    }

    // decode
    if (token) {
      //  get token
      let res = decodeToken(token);

      if (res && res.exp <= new Date() / 1000) {
        ctx.body = {
          message: "token过期",
          code: 9,
        };
      } else {

        let newToken = updateToken(token);
        setToken(ctx.res, newToken);

        ctx.body = {
          message: "解析成功",
          code: 1,
        };
        await next();
      }
    } else {
      // no token
      ctx.body = {
        message: "no token",
        code: -3,
      };
    }
  }
}

module.exports = () => checkToken;
