"use strict";

const Controller = require("egg").Controller;

class UsersController extends Controller {
  /**
 * @api {Post} /api/users/add Add user
 * @apiGroup Users
 *
 * @apiParam {String} nickname user account
 * @apiParam {String} password user password
 * @apiParam {String} email user email
 * @apiSuccessExample  {json} Success
 {
    "code": 1,
    "msg": "Success",
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
 * @api {Post} /api/users/login user login
 * @apiGroup Users
 *
 * @apiParam {String} email user account
 * @apiParam {String} password user password
 *
 * @apiSuccessExample  {json} Success
 {
    "code": 1,
    "msg": "Success",
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
 * @api {Post} /api/users/login-token login with token
 * @apiGroup Users
 *
 * @apiParam {Header} authentication token
 *
 * @apiSuccessExample  {json} Success
 {
    "code": 200,
    "msg": "Success",
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
 * @api {Get} /api/users/get get user list
 * @apiGroup Users
 * @apiParam {Number} id (optional:accurat)user ID
 * @apiParam {String} keyword (optional:blur)search by account or email
 * @apiParam {Number} current(optional) current page
 * @apiParam {Number} size(optional)page size
 *
 *
 * @apiSuccessExample  {json} Success
{
    "code": 1,
    "msg": "Success",
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
 * @api {Post} /api/users/checkNickname Check if nickname exists
 * @apiGroup Users
 * @apiParam {String} nickname user account
 *
 *
 * @apiSuccessExample  {json} Success
  {
    "code": 1,
    "msg": "This nickname is available"
}
* @apiSuccessExample  {json} Fail
{
    "code": 3,
    "msg": "This nickname is used"
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
 * @api {Post} /api/users/check-email Check user email exists
 * @apiGroup Users
 * @apiParam {String} email user email
 *
 *
 * @apiSuccessExample  {json} Success
  {
    "code": 1,
    "msg": "This email is available"
}
* @apiSuccessExample  {json} fail
{
    "code": 3,
    "msg": "This email is used"
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
 * @api {Post} /api/users/chooseBook update user
 * @apiGroup Users
 * @apiParam {Number} id user ID
 * @apiParam {Number} num_day task number per day
 * @apiParam {Number} book_id book id
 *
 *
 * @apiSuccessExample  {json} Success
{
    "code": 1,
    "msg": "Success"
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
 * @api {Put} /api/users/update update user
 * @apiGroup Users
 * @apiParam {Number} id user ID
 * @apiParam {String} password user password (optional)
 * @apiParam {String} email user email（optional）
 * @apiParam {Array} not_learned_arr words not learned（optional）
 * @apiParam {Array} learned_arr words learned （optional）
 * @apiParam {Number} task_completed task：1:complete，0:not complete（optional）
 * @apiParam {Number} num_day number to remember per day
 * @apiParam {Number} now_book book id
 *
 *
 * @apiSuccessExample  {json} Success
{
    "code": 1
    "msg": "Success"
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
 * @api {Put} /api/users/changePass Update user
 * @apiGroup Users
 * @apiParam {String} password user password
 * @apiParam {String} auth token
 *
 *
 * @apiSuccessExample  {json} Success
{
    "code": 1
    "msg": "Success"
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
 * @api {Post} /api/users/del delete user
 * @apiGroup Users
 * @apiParam {Number} id user ID
 *
 *
 * @apiSuccessExample  {json} Success
 {
    "code": 1,
    "msg": "Success"
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
   * @api {Post} /api/users/get-exams get exam
   * @apiGroup Users
   *
   * @apiParam {Array} id_arr words id
   * @apiSuccessExample
{{
    "code": 200,
    "msg": "Success",
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
