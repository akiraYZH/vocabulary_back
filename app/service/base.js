const Service = require("egg").Service;
const svgCaptcha = require("svg-captcha");

class ToolsService extends Service {
  // 产生验证码
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 30,
      width: 100,
      height: 26,
      bacground: "#cc9966",
    });
    this.ctx.session.code = captcha.text;
    // await this.ctx.render("captcha");
    console.log(this.ctx.session.code, 9999);
    return captcha;
  }
}

module.exports = ToolsService;
