"use strict";

const Controller = require("egg").Controller;

class BooksController extends Controller {
  /**
 * @api {Post} /api/books/add 增加单词书
 * @apiGroup Books
 *
 * @apiParam {String} title 书名
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
    const checkDataRes = ctx.helper._checkData(ctx, "title");

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.books.add(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/books/distribute-words 为单词书增加单词
 * @apiGroup Books
 * @apiParam {Number} id 单词书ID
 * @apiParam {Array} toAdd 要增加的单词id的数组
 * @apiParam {Array} toRemove 要去除的单词id的数组
 * @apiParamExample {json} 参数实例
{
	"id":2,
  "toAdd":[1,2],
  "toRemove":[1,2],
}
 * @apiSuccessExample  {json} 成功返回
{
    "code": 200,
    "msg": "成功操作"
}
 */

  async distributeWords() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id");

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.books.distributeWords(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Get} /api/books/get 获得单词书列表
   * @apiGroup Books
   *
   * @apiSuccessExample
   {
    "code": 200,
    "msg": "成功操作",
    "data": [
        {
            "id": 2,
            "title": "基本词汇",
            "count": 1
        }
    ]
}
   *
   */
  async get() {
    const { ctx, service } = this;
    ctx.body = await service.books.get();
  }

  /**
   * @api {Get} /api/books/get-words 获得单词书含有和不含有的单词
   * @apiGroup Books
   * @apiParam {Number} id 单词书ID
   * @apiParam {String} keyword 关键词
   * @apiSuccessExample
   {
    "code": 1,
    "msg": "成功操作",
    "included": [
        {
            "id": 2,
            "spelling": "bas",
            "primary_explaination": "低的, 矮的；浅的",
            "phonetic": "[bɑ, -s]",
            "difficulty": 1,
            "image": null,
            "audio": null
        },
        {
            "id": 1,
            "spelling": "pomme",
            "primary_explaination": "苹果",
            "phonetic": "[pɔm]",
            "difficulty": 1,
            "image": null,
            "audio": null
        }
    ],
    "unincluded": [
        {
            "id": 4,
            "spelling": "a",
            "primary_explaination": "a",
            "phonetic": "a",
            "difficulty": 1,
            "image": null,
            "audio": null
        },
        {
            "id": 3,
            "spelling": "ab",
            "primary_explaination": "",
            "phonetic": "a",
            "difficulty": 1,
            "image": null,
            "audio": null
        },
        {
            "id": 5,
            "spelling": "b",
            "primary_explaination": "",
            "phonetic": "b",
            "difficulty": 1,
            "image": null,
            "audio": null
        },
        {
            "id": 7,
            "spelling": "bb",
            "primary_explaination": "",
            "phonetic": "b",
            "difficulty": 1,
            "image": null,
            "audio": null
        },
        {
            "id": 8,
            "spelling": "c",
            "primary_explaination": "",
            "phonetic": "c",
            "difficulty": 1,
            "image": null,
            "audio": null
        },
        {
            "id": 10,
            "spelling": "ccc",
            "primary_explaination": "",
            "phonetic": "c",
            "difficulty": 1,
            "image": null,
            "audio": null
        }
    ]
}
   *
   */
  async getWords() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      const query = ctx.query;
      ctx.body = await service.books.getWords(query);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Put} /api/books/update 更改单词书名称
   * @apiGroup Books
   * @apiParam {Number} id 单词书ID
   * @apiParam {String} title 单词书名（可选）
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
    const checkDataRes = ctx.helper._checkData(ctx, "id");
    console.log(123);

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.books.update(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
  /**
 * @api {Delete} /api/books/del 删除管理者
 * @apiGroup Books
 * @apiParam {Number} id 书本ID
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
      ctx.body = await service.books.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = BooksController;
