"use strict";

const Controller = require("egg").Controller;

class WordsController extends Controller {
  /**
 * @api {Post} /api/words/add 增加单词
 * @apiGroup Words
 *
 * @apiParam {String} spelling 单词
 * @apiParam {String} spelling_m 单词阳性拼写
 * @apiParam {String} spelling_f 单词阴性拼写
 * @apiParam {String} phonetic 单词音标
 * @apiParam {Array} explainations 单词解释数组
 * @apiParam {Number} difficulty 难度：1为基础， 2为中级， 3为高级
 * @apiParam {Number} primary_type_id 词性id
 * @apiParam {String} primary_explaination 主要含义
 * @apiParamExample {json} 参数例子
  {
	"spelling":"bas",
	"spelling_m":"bas",
	"spelling_f":"basse",
	"phonetic":"[bɑ, -s]",
	"difficulty":1,
	"primary_type_id":7,
	"primary_explaination":"低的, 矮的；浅的",
	"explainations":[{
		"type_id":7,
		"explaination_cn":"低的, 矮的；浅的",
		"sentence_fr":"Il marche la tête basse.",
		"sentence_cn":"他低着头走路。",
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
      "difficulty",
      "primary_type_id",
      "primary_explaination"
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
   * @apiParam {Number} primary_type_id 主要词性id(可选)
   * @apiParam {String} keyword (可选：模糊)按spelling或者explaination_cn模糊搜索
   * @apiParam {Number} current(可选)当前页
   * @apiParam {Number} size(可选)每页个数
   * @apiSuccessExample
{{
    "code": 200,
    "msg": "成功操作",
    "data": [
        {
            "id": 2,
            "spelling": "bas",
            "spelling_m": "bas",
            "spelling_f": "basse",
            "phonetic": "[bɑ, -s]",
            "image": null,
            "audio": null,
            "difficulty": 1,
            "explainations": [
                {
                    "id": 2,
                    "explaination_cn": "低的, 矮的；浅的",
                    "sentence_fr": "Il marche la tête basse.",
                    "sentence_cn": "他低着头走路。",
                    "audio": null,
                    "type": {
                        "id": 7,
                        "type_abbr": "adj.",
                        "type": "Adjectif",
                        "type_cn": "形容词"
                    }
                }
            ],
            "primary_type": {
                "id": 7,
                "type_abbr": "adj.",
                "type": "Adjectif",
                "type_cn": "形容词"
            }
        },
        {
            "id": 1,
            "spelling": "pomme",
            "spelling_m": "",
            "spelling_f": "",
            "phonetic": "[pɔm]",
            "image": null,
            "audio": null,
            "difficulty": 1,
            "explainations": [
                {
                    "id": 1,
                    "explaination_cn": "苹果",
                    "sentence_fr": "On coupe cette pomme en quatre quartiers.",
                    "sentence_cn": "我们把苹果切成四份。",
                    "audio": null,
                    "type": null
                }
            ],
            "primary_type": {
                "id": 3,
                "type_abbr": "n.f.",
                "type": "Nom féminin",
                "type_cn": "阴性名词"
            }
        }
    ],
    "pagging": {
        "size": 10,
        "current": 1,
        "total": 2
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
   * @apiParam {String} spelling_m 单词阳性拼写
   * @apiParam {String} spelling_f 单词阴性拼写
   * @apiParam {String} phonetic 单词音标
   * @apiParam {Array} explainations 单词解释数组
   * @apiParam {Number} difficulty 难度：1为基础， 2为中级， 3为高级
   * @apiParam {Number} primary_type_id 词性id
   * @apiParam {String} primary_explaination 主要含义
   * @apiParamExample {json} 参数例子
    {
      "id":2,
      "spelling":"bas",
      "spelling_m":"bas",
      "spelling_f":"basse",
      "phonetic":"[bɑ, -s]",
      "difficulty":1,
      "primary_type_id":7,
      "primary_explaination":"低的, 矮的；浅的",
      "explainations":[{
        "type_id":7,
        "explaination_cn":"低的, 矮的；浅的",
        "sentence_fr":"Il marche la tête basse.",
        "sentence_cn":"他低着头走路。",
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
      "spelling_m",
      "spelling_f",
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
