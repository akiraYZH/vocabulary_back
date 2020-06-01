"use strict";

const Controller = require("egg").Controller;

class VocabularyController extends Controller {
  /**
 * @api {Post} /api/vocabulary/add 增加单词
 * @apiGroup Admin
 *
 * @apiParam {String} spelling 拼写
 * @apiParam {String} phonetic （可选）单词音标
 * @apiParam {String} detail 词性：type+解释：text
 * @apiParam {String} sentences 例句:fr法语例句， cn中文例句
 * 
 * @apiParamExample 参数实例
 {
	"spelling":"la pomme",
	"phonetic":"[pɔm]",
	"detail":[{
		"type":"f.",
		"explaination":"苹果"
	}],
	"sentences":[{
		"fr":"La pomme est délicieuse.",
		"cn":"这个苹果很好吃。"
	}]
}
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功添加",
    "data": {
        "insertId": 24
    }
}
 */

  async add() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(
      ctx,
      "spelling",
      "detail",
    );

    if (checkDataRes.is_pass) {
      let result = await service.common.insert("vocabulary", {
        spelling: ctx.request.body.spelling,
        detail: JSON.stringify(ctx.request.body.detail),
        sentences:JSON.stringify(ctx.request.body.sentences),
      });
      console.log(result);
      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success("成功添加", {insertId:result.insertId});
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      } else {
        this.ctx.body = new this.ctx.helper._error("添加失败");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/login 登陆
 * @apiGroup Admin
 *
 * @apiParam {String} account 管理者账号
 * @apiParam {String} password 管理者密码
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiNjY0NzUzMDkyIiwiaWF0IjoxNTg5OTQ0NDUzLCJleHAiOjE1ODk5NDgwNTN9.o14Nc-dR881PzhTVfcvGYi11E9HyuZcHw3WCtFwRp3A"
    }
}
 */
  async login() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper._checkData(ctx, "account", "password");
    if (checkDataRes.is_pass) {
      // console.log(ctx.request.body);
      const loginRes = await service.common.get("user_admin", {
        account: ctx.request.body.account,
        password: ctx.request.body.password,
      });
      // console.log(loginRes);

      if (loginRes) {
        const time = Date.now();
        ctx.helper._setRedis(loginRes.account, loginRes);
        let token = ctx.helper.addToken({ account: ctx.request.body.account });
        ctx.helper.setToken(ctx.res, token);

        this.ctx.body = new this.ctx.helper._success({ token: token });
      } else {
        this.ctx.body = new this.ctx.helper._error("账号或密码错误");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/getUserInfo 通过token获得用户信息
 * @apiGroup Admin
 * @apiParam {header} token "bearer "+token值
 *
 * @apiSuccessExample  {json} 成功返回
 {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "id": 38,
        "account": "664753092",
        "password": "zhihao8177",
        "role": "editor",
        "status": 1
    }
}
 */
  async getUserInfo() {
    const { ctx, service } = this;
    try {
      let token = ctx.request.headers.token;
      console.log(token);

      let { account } = ctx.helper.decodeToken(token);
      // let res=  ctx.helper.decodeToken(token);
      // console.log(res,123);
      const userInfo = await ctx.helper._getRedis(account);

      if (userInfo) {
        this.ctx.body = new this.ctx.helper._success(userInfo);
      } else {
        this.ctx.body = new this.ctx.helper._error("账号或密码错误");
      }
    } catch (error) {
      // console.log(error);

      this.ctx.body = new this.ctx.helper._error("token解析失败");
    }
  }

  /**
 * @api {Get} /api/admin/getList 获得管理者列表
 * @apiGroup Admin
 * @apiParam {Number} id (可选：精准)管理者ID
 * @apiParam {String} account (可选：模糊)管理者账号
 * @apiParam {Number} page_now (可选)当前页
 * @apiParam {Number} num_in_page(可选)每页个数
 * 
 *
 * @apiSuccessExample  {json} 成功返回
  {
      "code": 1,
      "msg": "成功操作",
      "data": {
          "is_success": true,
          "page_total": 1,
          "page_now": 1,
          "num_in_page": 10,
          "list": [
              {
                  "id": 23,
                  "account": "abc",
                  "password": "123456",
                  "role": "editor"
              }
          ]
      }
  }
 */

  async getList() {
    const { ctx, service } = this;
    let result = await service.common.selectPagination({
      db: "user_admin",
      param: {
        id: ctx.query.id,
        status: 1,
        page_now: ctx.query.page_now,
        num_in_page: ctx.query.num_in_page,
      },
      columns: ["id", "account", "password", "role"],
      search: {
        account: ctx.query.account,
      },
    });
    if (result.is_success) {
      ctx.body = new this.ctx.helper._success(result);
    } else if (result.msg) {
      this.ctx.body = new this.ctx.helper._error(result.msg);
    }
  }

  /**
 * @api {Get} /api/admin/checkAccount 检查账户是否已经存在
 * @apiGroup Admin
 * @apiParam {String} account 管理者账号
 * 
 *
 * @apiSuccessExample  {json} 成功返回
  {
    "code": 1,
    "msg": "此账号可以使用"
}
* @apiSuccessExample  {json} 失败返回
{
    "code": 0,
    "msg": "此账号已经存在"
}
 */

  async checkAccount() {
    const { ctx, service } = this;
    let checkDataRes = ctx.helper._checkData(ctx, "account");
    if (checkDataRes.is_pass) {
      let result = await service.common.select("user_admin", {
        account: ctx.query.account,
      });
      console.log(result,ctx.query.account);
      
      if (result.length) {
        ctx.body = new this.ctx.helper._error("此账号已经存在");
      } else {
        this.ctx.body = new this.ctx.helper._success("此账号可以使用");
      }
    }else{
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/update 修改管理者
 * @apiGroup Admin
 * @apiParam {Number} id 管理者ID
 * @apiParam {String} password 管理者账号
 * @apiParam {String} Role 管理者角色（admin， editor）
 * 
 *
 * @apiSuccessExample  {json} 成功返回
  {
      "code": 1,
      "msg": "成功操作"
  }
 */
  async update() {
    const { ctx, service } = this;
    let checkDataRes = ctx.helper._checkData(ctx, "id", "password", "role");
    if (checkDataRes.is_pass) {
      let result = await service.common.update(
        "user_admin",
        {
          password: ctx.request.body.password,
          role: ctx.request.body.role,
        },
        { id: ctx.request.body.id, status: 1 }
      );

      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success();
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      }
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
 * @api {Post} /api/admin/del 删除管理者
 * @apiGroup Admin
 * @apiParam {Number} id 管理者ID
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
    let checkDataRes = ctx.helper._checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      let result = await service.common.update(
        "user_admin",
        {
          status: 0,
        },
        { id: ctx.request.body.id }
      );

      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success();
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      }
    } else {
      ctx.body = ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = VocabularyController;
