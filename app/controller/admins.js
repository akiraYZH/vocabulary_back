"use strict";

const Controller = require("egg").Controller;

class AdminsController extends Controller {
  /**
 * @api {Post} /api/admins/add 增加管理者
 * @apiGroup Admins
 *
 * @apiParam {String} account 管理者账号
 * @apiParam {String} password 管理者密码
 * @apiParam {String} email 管理者邮箱
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
      "email",
      "role_id"
    );

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.admins.add(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/login 登陆
 * @apiGroup Admins
 *
 * @apiParam {String} account 管理者账号
 * @apiParam {String} password 管理者密码
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 200,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "account": "akira",
        "email": "664753092@qq.com",
        "role": {
            "id": 1,
            "name": "admin",
            "permissions": [
                {
                    "name": "home"
                },
                {
                    "name": "about"
                },
                {
                    "name": "test"
                }
            ]
        }
    }
}
 */
  async login() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "account", "password");
    if (checkDataRes.is_pass) {
      // console.log(ctx.request.body);
      const body = ctx.request.body;
      ctx.body = await service.admins.login(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/login-token 用token登陆
 * @apiGroup Admins
 *
 * @apiParam {Header} authentication token
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 200,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "account": "akira",
        "email": "664753092@qq.com",
        "role": {
            "id": 1,
            "name": "admin",
            "permissions": [
                {
                    "name": "home"
                },
                {
                    "name": "about"
                },
                {
                    "name": "test"
                }
            ]
        }
    }
}
 */
  async loginToken() {
    const { ctx, service } = this;
    ctx.body = await service.admins.loginToken();
  }

  /**
 * @api {Get} /api/admins/get 获得管理者列表
 * @apiGroup Admins
 * @apiParam {Number} id (可选：精准)管理者ID
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
            "role": {
                "id": 1,
                "name": "admin"
            }
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
    ctx.body = await service.admins.get(query);
  }

  /**
 * @api {Post} /api/admins/check-account 检查账户是否已经存在
 * @apiGroup Admins
 * @apiParam {String} account 管理者账号
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
      ctx.body = await service.admins.checkAccount(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admins/check-email 检查账户是否已经存在
 * @apiGroup Admins
 * @apiParam {String} email 管理者邮箱
 * @apiParam {Number} id 要过滤的管理者id(可选)
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
      ctx.body = await service.admins.checkEmail(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admins/update 修改管理者
 * @apiGroup Admins
 * @apiParam {Number} id 管理者ID
 * @apiParam {String} password 管理者密码()
 * @apiParam {String} email 管理者邮箱
 * @apiParam {String} role_id 角色id
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
      ctx.body = await service.admins.update(body);
    } else {
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
      ctx.body = await service.admins.del(query);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = AdminsController;
