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
      let body = ctx.request.body;
      ctx.body = await service.books.add(body);
    } else {
      ctx.status = 400;
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
            "id": 1,
            "title": "基本词汇"
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
    let checkDataRes = ctx.helper._checkData(ctx, "id");
    console.log(123);

    if (checkDataRes.is_pass) {
      let body = ctx.request.body;
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
    let checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      let query = ctx.query;
      ctx.body = await service.books.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = BooksController;
