"use strict";

const Controller = require("egg").Controller;

class RolesController extends Controller {
  /**
 * @api {Post} /api/roles/add Add role
 * @apiGroup Roles
 *
 * @apiParam {String} name role name
 * @apiParam {Array} permissions permissions
 * @apiSuccessExample  {json} Success
{
    "code": 200,
    "msg": "Success",
    "data": {
        "insertId": 1
    }
}
 */

  async add() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "name", "permissions");

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.roles.add(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Get} /api/roles/get Get role list
   * @apiGroup Roles
   *
   * @apiSuccessExample
   {
    "code": 200,
    "msg": "Success",
    "data": [
        {
            "id": 1,
            "name": "admin",
            "router": [
                "home",
                "about"
            ]
        }
    ]
}
   *
   */
  async get() {
    const { ctx, service } = this;
    console.log(321);

    ctx.body = await service.roles.get();
  }

  /**
   * @api {Put} /api/roles/update update role info
   * @apiGroup Roles
   * @apiParam {Number} id role ID
   * @apiParam {String} name role name（optional）
   * @apiParam {Arrary} permissions permissions（optional）
   *
   * @apiSuccessExample
   {
    "code": 200,
    "msg": "Success"
}
   *
   */
  async update() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id");
    console.log(123);

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.roles.update(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
  /**
 * @api {Delete} /api/roles/del Delete role
 * @apiGroup Rols
 * @apiParam {Number} id role ID
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
      ctx.body = await service.roles.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = RolesController;
