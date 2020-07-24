'use strict';

const Controller = require('egg').Controller;

class RolesController extends Controller {
  /**
 * @api {Post} /api/roles/add 角色
 * @apiGroup Roles
 *
 * @apiParam {String} name 角色名
 *
 * @apiSuccessExample  {json} 成功返回
{
    "code": 200,
    "msg": "成功操作",
    "data": {
        "insertId": 1
    }
}
 */

  async add() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, 'name', 'permissions');

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.roles.add(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Get} /api/roles/get 获得权限角色列表
   * @apiGroup Roles
   *
   * @apiSuccessExample
   {
    "code": 200,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "name": "admin",
            "_permissions": [
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
   * @api {Put} /api/roles/update 获得权限角色列表
   * @apiGroup Roles
   * @apiParam {Number} id 角色ID
   * @apiParam {String} name 角色名字（可选）
   * @apiParam {Arrary} permissions 权限标识符数组（可选）
   *
   * @apiSuccessExample
   {
    "code": 200,
    "msg": "成功操作"
}
   *
   */
  async update() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, 'id');
    console.log(123);

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.roles.update(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }


  }
  /**
 * @api {Delete} /api/roles/del 删除角色
 * @apiGroup Rols
 * @apiParam {Number} id 角色ID
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
    const checkDataRes = ctx.helper._checkData(ctx, 'id');
    if (checkDataRes.is_pass) {
      const query = ctx.query;
      ctx.body = await service.roles.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = RolesController;
