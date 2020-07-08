"use strict";

const Controller = require("egg").Controller;

class RolesController extends Controller {
  /**
 * @api {Post} /api/role/add 角色
 * @apiGroup Admin
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
    const checkDataRes = ctx.helper._checkData(ctx, "name", "permissions");

    if (checkDataRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.roles.add(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Get} /api/roles/get 获得权限角色列表
   * @apiGroup Role
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
   * @apiGroup Role
   * @apiParam {Number} id 管理者ID
   * @apiParam {String} name 管理者名字（可选
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
    let checkDataRes = ctx.helper._checkData(ctx, "id");
    console.log(123);
    
    if(checkDataRes.is_pass){
      let body = ctx.request.body;
    ctx.body = await service.roles.update(body);
    }else{
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }

    
  }
  /**
 * @api {Delete} /api/admin/del 删除管理者
 * @apiGroup Admin
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
    let checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      let query = ctx.query;
      ctx.body = await service.roles.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = RolesController;
