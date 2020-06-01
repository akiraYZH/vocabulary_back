const Service = require('egg').Service;

class loginService extends Service {
  async login(account,password) {
    return await this.app.mysql.get("p_user", { account, password });
  }
}

module.exports = loginService;