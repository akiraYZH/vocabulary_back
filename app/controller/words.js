"use strict";

const Controller = require("egg").Controller;
const { uploadImg } = require("../utils/uploadImg");

class WordsController extends Controller {
  /**
 * @api {Post} /api/words/add Add word
 * @apiGroup Words
 *
 * @apiParam {String} spelling spelling of word
 * @apiParam {String} spelling_m spelling of word(m)
 * @apiParam {String} spelling_f spelling of word(f)
 * @apiParam {String} phonetic phonetic
 * @apiParam {Array} explainations explainations
 * @apiParam {Number} difficulty fifficulty：1 basic， 2 intermediate， 3 advanced
 * @apiParam {Number} primary_type_id type id
 * @apiParam {String} primary_explaination primary meaning
 * @apiParamExample {json} param example
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
      const body = ctx.request.body;
      ctx.body = await service.words.add(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Get} /api/words/get get words list
   * @apiGroup Words
   *
   * @apiParam {Number} id (optional: accurate)wordID
   * @apiParam {Number} difficulty difficulty：1 basic， 2 intermediate， 3 advanced(optional)
   * @apiParam {Number} primary_type_id primary type id(optional)
   * @apiParam {String} keyword (optional：blur)search by spelling or explaination_cn
   * @apiParam {Number} current(optional) current page
   * @apiParam {Number} size(optional) page size
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
    const query = ctx.query;
    ctx.body = await service.words.get(query);
  }

  /**
   * @api {Get} /api/words/get-words get words list
   * @apiGroup Words
   *
   * @apiParam {Array} id_arr word ids
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
  async getWords() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id_arr");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.words.getWords(body);
    } else {
      ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Put} /api/words/update update word
   * @apiGroup Words
   * @apiParam {Number} id word ID
   * @apiParam {String} spelling word spelling
   * @apiParam {String} spelling_m word spelling(m)
   * @apiParam {String} spelling_f word spelling(f)
   * @apiParam {String} phonetic phonetic
   * @apiParam {Array} explainations explainations
   * @apiParam {Number} difficulty difficulty：1 basis， 2 intermediate， 3 advanced
   * @apiParam {Number} primary_type_id type id
   * @apiParam {String} primary_explaination primary meaning
   * @apiParamExample {json} param example
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
    const checkDataRes = ctx.helper._checkData(
      ctx,
      "spelling",
      "spelling_m",
      "spelling_f",
      "phonetic",
      "explainations",
      "difficulty"
    );

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.words.update(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
  /**
 * @api {Delete} /api/words/del delete word
 * @apiGroup Words
 * @apiParam {Number} id word ID
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
      ctx.body = await service.words.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/words/upload-img upload img
 * @apiGroup Words
 *
 *
 * @apiSuccessExample  {json} Success
  {
      "code": 200,
      "msg": "Success"
  }
 */
  async uploadImg() {
    const { ctx, service } = this;
    ctx.body = await uploadImg(ctx.req, "words");
  }

  /**
 * @api {Post} /api/words/img Change image url
 * @apiGroup Words
 * @apiParam {Number} id word ID
 * @apiParam {String} oldImg old img url
 * @apiParam {String} newImg new img url
 *
 *
 * @apiSuccessExample  {json} Success
  {
      "code": 200,
      "msg": "Success"
  }
 */
  async img() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id", "newImg");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.words.img(body);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = WordsController;
