"use strict";

const Controller = require("egg").Controller;

class UsersController extends Controller {
  /**
 * @api {Post} /api/users/add 增加用户
 * @apiGroup Users
 *
 * @apiParam {String} account 用户账号
 * @apiParam {String} password 用户密码
 * @apiParam {String} email 用户邮箱
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 200,
    "msg": "成功注册",
    "data": {
        "insertId": 38
    }
}
 */

  async add() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(
      ctx,
      "account",
      "password",
      "email"
    );

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.add(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/user/login 登陆
 * @apiGroup Users
 *
 * @apiParam {String} account 用户账号
 * @apiParam {String} password 用户密码
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 200,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "account": "akira",
        "email": "664753092@qq.com",
        "not_learned_arr": null,
        "learned_arr": null,
        "task_today": null,
        "task_completed": 0,
        "num_day": 0,
        "last_login_time": null,
        "book": null
    }
}
 */
  async login() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "account", "password");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.login(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Get} /api/users/get 获得用户列表
 * @apiGroup Users
 * @apiParam {Number} id (可选：精准)用户ID
 * @apiParam {String} keyword (可选：模糊)按account或者email模糊搜索
 * @apiParam {Number} current(可选)当前页
 * @apiParam {Number} size(可选)每页个数
 *
 *
 * @apiSuccessExample  {json} 成功返回
{
    "code": 200,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "account": "akira",
            "email": "664753092@qq.com",
            "password": "123456",
            "book": null
        }
    ],
    "pagging": {
        "size": 10,
        "current": 1,
        "total": 1
    }
}
 */

  async get() {
    const { ctx, service } = this;
    const query = ctx.query;
    ctx.body = await service.users.get(query);
  }

  /**
 * @api {Post} /api/users/checkAccount 检查账户是否已经存在
 * @apiGroup Users
 * @apiParam {String} account 用户账号
 *
 *
 * @apiSuccessExample  {json} 成功返回
  {
    "code": 200,
    "msg": "此账号可以使用"
}
* @apiSuccessExample  {json} 失败返回
{
    "code": 400,
    "msg": "此账号已被占用"
}
 */
  async checkAccount() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "account");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.checkAccount(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/users/check-email 检查账户是否已经存在
 * @apiGroup Users
 * @apiParam {String} email 用户邮箱
 *
 *
 * @apiSuccessExample  {json} 成功返回
  {
    "code": 200,
    "msg": "此邮箱可以使用"
}
* @apiSuccessExample  {json} 失败返回
{
    "code": 400,
    "msg": "此邮箱已被占用"
}
 */
  async checkEmail() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "email");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.checkEmail(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/users/chooseBook 修改用户
 * @apiGroup Users
 * @apiParam {Number} id 用户ID
 * @apiParam {Number} book_id 单词书id
 *
 *
 * @apiSuccessExample  {json} 成功返回
{
    "code": 200,
    "msg": "成功操作"
}
 */
  async chooseBook() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id", "book_id");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.chooseBook(body);
    } else {
      ctx.status = 400;
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Put} /api/users/update 修改用户
 * @apiGroup Users
 * @apiParam {Number} id 用户ID
 * @apiParam {String} password 用户密码(可选)
 * @apiParam {String} email 用户邮箱（可选）
 * @apiParam {Array} not_learned_arr 还没学习的单词数组（可选）
 * @apiParam {Array} learned_arr 已经学习的单词（可选）
 * @apiParam {Number} task_completed 每天任务：1:完成，0:未完成（可选）
 * @apiParam {Number} num_day 一天背诵个数可选）
 * @apiParam {Number} now_book 单词书id
 *
 *
 * @apiSuccessExample  {json} 成功返回
{
    "code": 200,
    "msg": "成功操作"
}
 */
  async update() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.update(body);
    } else {
      ctx.status = 400;
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/del 删除管理者
 * @apiGroup Admins
 * @apiParam {Number} id 管理者ID
 *
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 200,
    "msg": "成功操作"
}
 */
  async del() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      const query = ctx.query;
      ctx.body = await service.users.del(query);
    } else {
      ctx.status = 400;
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = UsersController;
