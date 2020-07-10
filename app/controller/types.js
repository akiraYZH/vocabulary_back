"use strict";

const Controller = require("egg").Controller;

class TypesController extends Controller {
  /**
 * @api {Post} /api/types/add 增加词性
 * @apiGroup Types
 *
 * @apiParam {String} type_abbr 词性缩写
 * @apiParam {String} type 词性全拼
 * @apiParam {String} type_cn 词性中文
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
    const checkDataRes = ctx.helper._checkData(ctx, "type_abbr","type","type_cn");

    if (checkDataRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.types.add(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }



  /**
   * @api {Get} /api/types/get 获得词性列表
   * @apiGroup Types
   * 
   * @apiSuccessExample
   {
    "code": 200,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "type_abbr": "n.",
            "type": "Nom",
            "type_cn": "名词"
        },
        {
            "id": 2,
            "type_abbr": "n.m.",
            "type": "Nom masculin",
            "type_cn": "阳性名词"
        },
        {
            "id": 3,
            "type_abbr": "n.f.",
            "type": "Nom féminin",
            "type_cn": "阴性名词"
        },
        {
            "id": 4,
            "type_abbr": "v.",
            "type": "Verbe",
            "type_cn": "动词"
        },
        {
            "id": 5,
            "type_abbr": "v.t.",
            "type": "Verbe transitif",
            "type_cn": "及物动词"
        },
        {
            "id": 6,
            "type_abbr": "v.i.",
            "type": "Verbe intransitif",
            "type_cn": "不及物动词"
        },
        {
            "id": 7,
            "type_abbr": "adj.",
            "type": "Adjectif",
            "type_cn": "形容词"
        },
        {
            "id": 8,
            "type_abbr": "adv.",
            "type": "Adverbe",
            "type_cn": "副词"
        },
        {
            "id": 9,
            "type_abbr": "prép.",
            "type": "Préposition",
            "type_cn": "介词"
        },
        {
            "id": 10,
            "type_abbr": "pron.",
            "type": "Pronom",
            "type_cn": "代词"
        },
        {
            "id": 11,
            "type_abbr": "interj.",
            "type": "Interjection",
            "type_cn": "感叹词"
        }
    ]
}
   * 
   */
  async get() {
    const { ctx, service } = this;
    ctx.body = await service.types.get();
  }

  
  /**
   * @api {Put} /api/types/update 更改词性
   * @apiGroup Types
   * @apiParam {String} type_abbr 词性缩写(可选)
   * @apiParam {String} type 词性全拼（可选）
   * @apiParam {String} type_cn 词性中文（可选）
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


    if (checkDataRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.types.update(body);
    } else {
      ctx.status=400;
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
  /**
 * @api {Delete} /api/types/del 删除词性
 * @apiGroup Types
 * @apiParam {Number} id 词性ID
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
      ctx.body = await service.types.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = TypesController;
