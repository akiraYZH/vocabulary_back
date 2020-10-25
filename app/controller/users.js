"use strict";

const Controller = require("egg").Controller;

class UsersController extends Controller {
  /**
 * @api {Post} /api/users/add 增加用户
 * @apiGroup Users
 *
 * @apiParam {String} nickname 用户账号
 * @apiParam {String} password 用户密码
 * @apiParam {String} email 用户邮箱
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功注册",
    "data": {
        "insertId": 38
    }
}
 */

  async add() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(
      ctx,
      "nickname",
      "password",
      "email"
    );

    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.add(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/users/login 登陆
 * @apiGroup Users
 *
 * @apiParam {String} email 用户账号
 * @apiParam {String} password 用户密码
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "nickname": "akira",
        "email": "664753092@qq.com",
        "not_learned_arr": null,
        "learned_arr": null,
        "task_today": null,
        "task_completed": 0,
        "num_day": 0,
        "last_login_time": null,
        "book": null
    }
}
 */
  async login() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "email", "password");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.login(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/users/login-token 用token登陆
 * @apiGroup Users
 *
 * @apiParam {Header} authentication token
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 200,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "account": "akira",
        "email": "664753092@qq.com",
        "role": {
            "id": 1,
            "name": "admin",
            "permissions": [
                {
                    "name": "home"
                },
                {
                    "name": "about"
                },
                {
                    "name": "test"
                }
            ]
        }
    }
}
 */
  async loginToken() {
    const { ctx, service } = this;
    ctx.body = await service.users.loginToken();
  }
  /**
 * @api {Get} /api/users/get 获得用户列表
 * @apiGroup Users
 * @apiParam {Number} id (可选：精准)用户ID
 * @apiParam {String} keyword (可选：模糊)按account或者email模糊搜索
 * @apiParam {Number} current(可选)当前页
 * @apiParam {Number} size(可选)每页个数
 *
 *
 * @apiSuccessExample  {json} 成功返回
{
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "nickname": "akira",
            "email": "664753092@qq.com",
            "password": "123456",
            "book": null
        }
    ],
    "pagging": {
        "size": 10,
        "current": 1,
        "total": 1
    }
}
 */

  async get() {
    const { ctx, service } = this;
    const query = ctx.query;
    ctx.body = await service.users.get(query);
  }

  /**
 * @api {Post} /api/users/checkNickname 检查昵称是否已经存在
 * @apiGroup Users
 * @apiParam {String} nickname 用户账号
 *
 *
 * @apiSuccessExample  {json} 成功返回
  {
    "code": 1,
    "msg": "此昵称可以使用"
}
* @apiSuccessExample  {json} 失败返回
{
    "code": 3,
    "msg": "此昵称已被占用"
}
 */
  async checkNickname() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "nickname");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.checkNickname(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/users/check-email 检查账户是否已经存在
 * @apiGroup Users
 * @apiParam {String} email 用户邮箱
 *
 *
 * @apiSuccessExample  {json} 成功返回
  {
    "code": 1,
    "msg": "此邮箱可以使用"
}
* @apiSuccessExample  {json} 失败返回
{
    "code": 3,
    "msg": "此邮箱已被占用"
}
 */
  async checkEmail() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "email");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.checkEmail(body);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/users/chooseBook 修改用户
 * @apiGroup Users
 * @apiParam {Number} id 用户ID
 * @apiParam {Number} num_day 一天背诵单词个数
 * @apiParam {Number} book_id 单词书id
 *
 *
 * @apiSuccessExample  {json} 成功返回
{
    "code": 1,
    "msg": "成功操作"
}
 */
  async chooseBook() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id", "book_id", "num_day");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.chooseBook(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Put} /api/users/update 修改用户
 * @apiGroup Users
 * @apiParam {Number} id 用户ID
 * @apiParam {String} password 用户密码(可选)
 * @apiParam {String} email 用户邮箱（可选）
 * @apiParam {Array} not_learned_arr 还没学习的单词数组（可选）
 * @apiParam {Array} learned_arr 已经学习的单词（可选）
 * @apiParam {Number} task_completed 每天任务：1:完成，0:未完成（可选）
 * @apiParam {Number} num_day 一天背诵个数可选）
 * @apiParam {Number} now_book 单词书id
 *
 *
 * @apiSuccessExample  {json} 成功返回
{
    "code": 1
    "msg": "成功操作"
}
 */
  async update() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.update(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Put} /api/users/changePass 修改用户
 * @apiGroup Users
 * @apiParam {String} password 用户密码
 * @apiParam {String} auth token值
 *
 *
 * @apiSuccessExample  {json} 成功返回
{
    "code": 1
    "msg": "成功操作"
}
 */
  async changePass() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "password", "auth");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.changePass(body);
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
  /**
 * @api {Post} /api/users/del 删除用户
 * @apiGroup Users
 * @apiParam {Number} id 用户ID
 *
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功操作"
}
 */
  async del() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      const query = ctx.query;
      ctx.body = await service.users.del(query);
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Post} /api/users/get-exams 获得测试
   * @apiGroup Users
   *
   * @apiParam {Array} id_arr 单词id
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
  async getExam() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "id_arr");
    if (checkDataRes.is_pass) {
      const body = ctx.request.body;
      ctx.body = await service.users.getExam(body);
    } else {
      ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = UsersController;
