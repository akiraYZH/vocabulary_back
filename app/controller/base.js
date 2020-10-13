const Controller = require("egg").Controller;
class BaseController extends Controller {
  async verify() {
    const { ctx } = this;
    let captcha = await this.service.base.captcha(); // 服务里面的方法
    ctx.response.type = "image/svg+xml"; // 知道你个返回的类型
    ctx.body = captcha.data; // 返回一张图片
  }

  // 对比验证码
  async verify_code() {
    console.log("进入了测试");
    const { ctx, app } = this;
    let headersCC = ctx.session.code; //获得session中的验证码
    // await ctx.render("verify_code", { code });
    console.log(headersCC, "查看token的内容");
    ctx.body = headersCC;
  }
}

module.exports = BaseController;
