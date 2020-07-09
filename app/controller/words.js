"use strict";

const Controller = require("egg").Controller;

class WordsController extends Controller {
  /**
 * @api {Post} /api/words/add 增加单词
 * @apiGroup Words
 *
 * @apiParam {String} spelling 单词
 * @apiParam {String} phonetic 单词音标
 * @apiParam {Array} explainations 单词解释数组
 * @apiParam {Number} difficulty 难度：1为基础， 2为中级， 3为高级
 * @apiParamExample {json} 参数例子
  {
	"spelling":"pomme",
	"phonetic":"[pɔm]",
	"difficulty":1,
	"explainations":[{
		"type":"n.f.",
		"explaination_cn":"苹果",
		"sentence_fr":"On coupe cette pomme en quatre quartiers.",
		"sentence_cn":"我们把苹果切成四份。",
		"sort":1
	}]
}
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
    const checkDataRes = ctx.helper._checkData(
      ctx,
      "spelling",
      "phonetic",
      "explainations",
      "difficulty"
    );

    if (checkDataRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.words.add(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Get} /api/words/get 获得单词列表
   * @apiGroup Words
   * 
   * @apiParam {Number} id (可选：精准)用户ID
   * @apiParam {Number} difficulty 难度：1为基础， 2为中级， 3为高级(可选)
   * @apiParam {String} keyword (可选：模糊)按spelling或者explaination_cn模糊搜索
   * @apiParam {Number} current(可选)当前页
   * @apiParam {Number} size(可选)每页个数
   * @apiSuccessExample
{
    "code": 200,
    "msg": "成功操作",
    "data": [
        {
            "id": 8,
            "spelling": "pomme",
            "phonetic": "[pɔm]",
            "image": null,
            "audio": null,
            "difficulty": 1,
            "explainations": [
                {
                    "id": 1,
                    "type": "n.f.",
                    "explaination_cn": "苹果",
                    "sentence_fr": "On coupe cette pomme en quatre quartiers.",
                    "sentence_cn": "我们把苹果切成四份。",
                    "audio": null
                }
            ]
        }
    ],
    "pagging": {
        "size": 10,
        "current": 1,
        "total": 1
    }
}
   * 
   */
  async get() {
    const { ctx, service } = this;
    let query = ctx.query;
    ctx.body = await service.words.get(query);
  }

  /**
   * @api {Put} /api/words/update 更改单词书名称
   * @apiGroup Words
   * @apiParam {Number} id 单词ID
   * @apiParam {String} spelling 单词
   * @apiParam {String} phonetic 单词音标
   * @apiParam {Array} explainations 单词解释数组
   * @apiParam {Number} difficulty 难度：1为基础， 2为中级， 3为高级
   * @apiParamExample {json} 参数例子
    {
    "spelling":"pomme",
    "phonetic":"[pɔm]",
    "difficulty":1,
    "explainations":[{
      "type":"n.f.",
      "explaination_cn":"苹果",
      "sentence_fr":"On coupe cette pomme en quatre quartiers.",
      "sentence_cn":"我们把苹果切成四份。",
      "sort":1
    }]
  }
   * 
   */
  async update() {
    const { ctx, service } = this;
    let checkDataRes = ctx.helper._checkData(
      ctx,
      "spelling",
      "phonetic",
      "explainations",
      "difficulty"
    );

    if (checkDataRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.words.update(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
  /**
 * @api {Delete} /api/words/del 删除单词
 * @apiGroup Words
 * @apiParam {Number} id 单词ID
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
      ctx.body = await service.words.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = WordsController;
