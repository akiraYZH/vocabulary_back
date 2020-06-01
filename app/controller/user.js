"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  /**
 * @api {Post} /api/user/register 增加管理者
 * @apiGroup User
 *
 * @apiParam {String} account 管理者账号
 * @apiParam {String} password 管理者密码
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功注册",
    "data": {
        "insertId": 38
    }
}
 */
  async register() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "account", "password");

    if (checkDataRes.is_pass) {
      let result = await service.common.insert("user", {
        account: ctx.request.body.account,
        password: ctx.request.body.password,
        last_login_time: Date.now(),
      });
      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success("成功注册", {
          insertId: result.insertId,
        });
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      } else {
        this.ctx.body = new this.ctx.helper._error("注册失败");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/login 登陆
 * @apiGroup User
 *
 * @apiParam {header} token "bearer "+token值
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "account": "admin",
        "password": "123456",
        "now_book": 0,
        "not_learned_arr": null,
        "learned_arr": null,
        "task_today": null,
        "task_completed": 0,
        "days": 0,
        "last_login_time": "1588909848155"
    }
}
 */
  async login() {
    const { ctx, service } = this;
    const { user, vocabulary_books } = ctx.model.models;
    const checkDataRes = ctx.helper._checkData(ctx, "account", "password");

    if (checkDataRes.is_pass) {
      let loginRes = await service.common.get("user", {
        account: ctx.request.body.account,
        password: ctx.request.body.password,
      });

      if (loginRes) {
        const time = Date.now();
        await service.common.update(
          "user",
          { last_login_time: time },
          { account: ctx.request.body.account }
        );
        let userInfo = await user.findOne({
          attributes: [
            "id",
            "account",
            "not_learned_arr",
            "learned_arr",
            "task_today",
            "task_completed",
            "num_day",
            "last_login_time",
          ],
          where: {
            account: ctx.request.body.account,
            password: ctx.request.body.password,
          },
          include: [
            {
              model: vocabulary_books,
              attributes: ["id", "title"],
            },
          ],
        });

        ctx.helper._setRedis("user_" + loginRes.account, userInfo);
        ctx.helper.setToken(
          ctx.res,
          ctx.helper.addToken({ account: ctx.request.body.account })
        );

        this.ctx.body = new this.ctx.helper._success(userInfo);
      } else {
        this.ctx.body = new this.ctx.helper._error("账号或密码错误");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }

  /**
 * @api {Post} /api/user/getUserInfo 通过token获得用户信息
 * c
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "account": "admin",
        "now_book": 0,
        "not_learned_arr": null,
        "learned_arr": null,
        "task_today": null,
        "task_completed": 0,
        "days": 0,
        "last_login_time": "1590031570677"
    }
}
 */
  async getUserInfo() {
    const { ctx, service } = this;
    try {
      let token = ctx.request.headers.token;
      console.log(token);

      let { account } = ctx.helper.decodeToken(token);
      // let res=  ctx.helper.decodeToken(token);
      // console.log(res,123);
      const userInfo = await ctx.helper._getRedis("user_" + account);

      if (userInfo) {
        this.ctx.body = new this.ctx.helper._success(userInfo);
      } else {
        this.ctx.body = new this.ctx.helper._error("账号或密码错误");
      }
    } catch (error) {
      // console.log(error);

      this.ctx.body = new this.ctx.helper._error("token解析失败");
    }
  }

  /**
 * @api {Get} /api/user/getList 获得管理者列表
 * @apiGroup User
 * @apiParam {Number} id (可选：精准)管理者ID
 * @apiParam {String} account (可选：模糊)管理者账号
 * @apiParam {Number} page_now (可选)当前页
 * @apiParam {Number} num_in_page(可选)每页个数
 * 
 *
 * @apiSuccessExample  {json} 成功返回
  {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "is_success": true,
        "page_total": 1,
        "page_now": 1,
        "num_in_page": 10,
        "list": [
            {
                "id": 1,
                "account": "admin",
                "password": "123456",
                "now_book": 0,
                "last_login_time": "1590031795477"
            }
        ]
    }
}
 */

  async getList() {
    const { ctx, service } = this;
    let result = await service.common.selectPagination({
      db: "user",
      param: {
        id: ctx.query.id,
        status: 1,
        page_now: ctx.query.page_now,
        num_in_page: ctx.query.num_in_page,
      },
      columns: ["id", "account", "password", "now_book", "last_login_time"],
      search: {
        account: ctx.query.account,
      },
    });
    if (result.is_success) {
      ctx.body = new this.ctx.helper._success(result);
    } else if (result.msg) {
      this.ctx.body = new this.ctx.helper._error(result.msg);
    }
  }

  /**
 * @api {Get} /api/user/checkAccount 检查账户是否已经存在
 * @apiGroup User
 * @apiParam {String} account 用户账号
 * 
 *
 * @apiSuccessExample  {json} 成功返回
  {
    "code": 1,
    "msg": "此账号可以使用"
}
* @apiSuccessExample  {json} 失败返回
{
    "code": 0,
    "msg": "此账号已经存在"
}
 */

  async checkAccount() {
    const { ctx, service } = this;
    let checkDataRes = ctx.helper._checkData(ctx, "account");
    if (checkDataRes.is_pass) {
      let result = await service.common.select("user", {
        account: ctx.query.account,
      });
      console.log(result, ctx.query.account);

      if (result.length) {
        ctx.body = new this.ctx.helper._error("此账号已经存在");
      } else {
        this.ctx.body = new this.ctx.helper._success("此账号可以使用");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/user/updatePassword 修改用户
 * @apiGroup User
 * @apiParam {Number} id 用户ID
 * @apiParam {String} password 用户账号
 * 
 *
 * @apiSuccessExample  {json} 成功返回
  {
      "code": 1,
      "msg": "成功操作"
  }
 */
  async updatePassword() {
    const { ctx, service } = this;
    let checkDataRes = ctx.helper._checkData(ctx, "id", "password");
    if (checkDataRes.is_pass) {
      let result = await service.common.update(
        "user",
        {
          password: ctx.request.body.password,
        },
        { id: ctx.request.body.id, status: 1 }
      );

      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success();
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      }
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/del 删除用户
 * @apiGroup User
 * @apiParam {Number} id 用户ID
 * 
 *
 * @apiSuccessExample  {json} 成功返回
  {
      "code": 1,
      "msg": "成功操作"
  }
 */
  async del() {
    const { ctx, service } = this;
    let checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      let result = await service.common.update(
        "user",
        {
          status: 0,
        },
        { id: ctx.request.body.id }
      );

      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success();
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      }
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = UserController;
