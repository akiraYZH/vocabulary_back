"use strict";

const Controller = require("egg").Controller;

class BooksController extends Controller {
  /**
 * @api {Post} /api/books/add add word book
 * @apiGroup Books
 *
 * @apiParam {String} title book name
 *
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
    const checkDataRes = ctx.helper._checkData(ctx, "title");

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.books.add(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/books/distribute-words Add word to book
 * @apiGroup Books
 * @apiParam {Number} id book ID
 * @apiParam {Array} toAdd ids of words to book
 * @apiParam {Array} toRemove  ids of words to remove from book
 * @apiParamExample {json} Param example
{
	"id":2,
  "toAdd":[1,2],
  "toRemove":[1,2],
}
 * @apiSuccessExample  {json} Success
{
    "code": 200,
    "msg": "Success"
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
   * @api {Get} /api/books/get Get book list
   * @apiGroup Books
   *
   * @apiSuccessExample
   {
    "code": 200,
    "msg": "Success",
    "data": [
        {
            "id": 2,
            "title": "Basic",
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
   * @api {Get} /api/books/get-words get words info of book
   * @apiGroup Books
   * @apiParam {Number} id word ID
   * @apiParam {String} keyword keyword
   * @apiSuccessExample
   {
    "code": 1,
    "msg": "Success",
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
   * @api {Put} /api/books/update modify book info
   * @apiGroup Books
   * @apiParam {Number} id book ID
   * @apiParam {String} title book title（optional）
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
      ctx.body = await service.books.update(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
  /**
 * @api {Delete} /api/books/del Delete book
 * @apiGroup Books
 * @apiParam {Number} id book ID
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
      ctx.body = await service.books.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = BooksController;
