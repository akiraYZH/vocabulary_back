"use strict";

const Controller = require("egg").Controller;

class AdminsController extends Controller {
  /**
 * @api {Post} /api/admins/add Add new admin
 * @apiGroup Admins
 *
 * @apiParam {String} account admin account
 * @apiParam {String} password admin password
 * @apiParam {String} email admin email
 * @apiSuccessExample  {json} Success
 {
    "code": 200,
    "msg": "Success",
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
 * @api {Post} /api/admin/login login
 * @apiGroup Admins
 *
 * @apiParam {String} account admin account
 * @apiParam {String} password admin password
 *
 * @apiSuccessExample  {json} Success
 {
    "code": 200,
    "msg": "Success",
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
 * @api {Post} /api/admin/login-token login with token
 * @apiGroup Admins
 *
 * @apiParam {Header} authentication token
 *
 * @apiSuccessExample  {json} Success
 {
    "code": 200,
    "msg": "Success",
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
 * @api {Get} /api/admins/get get admin list
 * @apiGroup Admins
 * @apiParam {Number} id (optional：accurate)admin ID
 * @apiParam {String} keyword (optional：blur) search by account or email
 * @apiParam {Number} current(optional) current page
 * @apiParam {Number} size(optional) page size
 *
 *
 * @apiSuccessExample  {json} Success
{
    "code": 200,
    "msg": "Success",
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
 * @api {Post} /api/admins/check-account Check if account exists
 * @apiGroup Admins
 * @apiParam {String} account admin account
 *
 *
 * @apiSuccessExample  {json} Success
  {
    "code": 200,
    "msg": "This account is available"
}
* @apiSuccessExample  {json} Fail
{
    "code": 400,
    "msg": "this account is taken"
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
 * @api {Post} /api/admins/check-email Check if admin email exists
 * @apiGroup Admins
 * @apiParam {String} email admin email
 * @apiParam {Number} id admin id(optional)
 *
 *
 * @apiSuccessExample  {json} Success
  {
    "code": 200,
    "msg": "This email is available"
}
* @apiSuccessExample  {json} Fail
{
    "code": 400,
    "msg": "This email is used"
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
 * @api {Post} /api/admins/update update admin info
 * @apiGroup Admins
 * @apiParam {Number} id admin ID
 * @apiParam {String} password admin password
 * @apiParam {String} email admin email
 * @apiParam {String} role_id role id
 *
 *
 * @apiSuccessExample  {json} Success
{
    "code": 200,
    "msg": "Success"
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
 * @api {Post} /api/admin/del Delete admin
 * @apiGroup Admins
 * @apiParam {Number} id admin ID
 *
 *
 * @apiSuccessExample  {json} Success
 {
    "code": 200,
    "msg": "Success"
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
