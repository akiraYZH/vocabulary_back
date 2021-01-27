const Controller = require("egg").Controller;
class BaseController extends Controller {
  async verify() {
    const { ctx } = this;
    let captcha = await this.service.base.captcha(); 
    ctx.response.type = "image/svg+xml"; 
  }

  // Verifiy
  async verify_code() {
    const { ctx, app } = this;
    let headersCC = ctx.session.code; //get verification code stored in session
    ctx.body = headersCC;
  }

  async forgetVerify() {
    const { ctx } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "email");

    if (checkDataRes.is_pass) {
      const query = ctx.request.query;
      ctx.body = await this.service.base.forgetVerify(query);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }


  async forgetVerifyConfirm() {
    const { ctx } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "code");

    if (checkDataRes.is_pass) {
      const query = ctx.request.query;
      ctx.body = await this.service.base.forgetVerifyConfirm(query);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = BaseController;
