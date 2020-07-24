'use strict';

const Controller = require('egg').Controller;

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
    const checkDataRes = ctx.helper._checkData(ctx, 'title');

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.books.add(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/books/add-words 为单词书增加单词
 * @apiGroup Books
 * @apiParam {Number} id 单词书ID
 * @apiParam {Array} words 单词id的数组
 * @apiParamExample {json} 参数实例
{
	"id":2,
	"words":[1,2]
}
 * @apiSuccessExample  {json} 成功返回
{
    "code": 200,
    "msg": "成功操作"
}
 */

  async addWords() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, 'id', 'words');

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.books.addWords(body);
    } else {
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/books/remove-words 为单词书去除单词
 * @apiGroup Books
 * @apiParam {Number} id 单词书ID
 * @apiParam {Array} words 要去除的单词id的数组
 * @apiParamExample {json} 参数实例
{
	"id":2,
	"words":[1,2]
}
 * @apiSuccessExample  {json} 成功返回
{
    "code": 200,
    "msg": "成功操作"
}
 */

  async removeWords() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, 'id', 'words');

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.books.removeWords(body);
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
   * @api {Get} /api/books/get-words 获得单词书含有的单词
   * @apiGroup Books
   * @apiParam {Number} id 单词书ID
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
  async getWords() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, 'id');
    if (checkDataRes.is_pass) {
      const query = ctx.query;
      ctx.body = await service.books.getWords(query);
    } else {
      ctx.status = 400;
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
    const checkDataRes = ctx.helper._checkData(ctx, 'id');
    console.log(123);

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.books.update(body);
    } else {
      ctx.status = 400;
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
    const checkDataRes = ctx.helper._checkData(ctx, 'id');
    if (checkDataRes.is_pass) {
      const query = ctx.query;
      ctx.body = await service.books.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = BooksController;
