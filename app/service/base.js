const Service = require("egg").Service;
const svgCaptcha = require("svg-captcha");
const sendMail = require("../utils/sendMail");

class ToolsService extends Service {
  // Generate verification code
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 30,
      width: 100,
      height: 26,
      bacground: "#cc9966",
    });
    this.ctx.session.code = captcha.text;
    return captcha;
  }

  async forgetVerify(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const user = await Users.findOne({
        attributes: ["id", "nickname", "email"],
        where: {
          email: data.email,
        },
      });

      if (user) {
        const captcha = svgCaptcha.create();
        this.ctx.session.forgetInfo = {
          email: user.email,
          code: captcha.text,
        };
        sendMail(user.email, "Verification code", captcha.text);
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("Account not exists");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async forgetVerifyConfirm(data) {
    const { ctx } = this;

    try {
      if (
        data.code.toLowerCase() == ctx.session.forgetInfo.code.toLowerCase()
      ) {
        const token = ctx.helper.addToken(ctx.session.forgetInfo);
        ctx.status = 200;
        return new ctx.helper._success({ auth: token });
      } else {
        return new ctx.helper._error("Wrong verification code");
      }
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
}

module.exports = ToolsService;
