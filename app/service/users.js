"use strict";

const helper = require("../extend/helper");

const Service = require("egg").Service;
const Op = require("sequelize").Op;

class UsersService extends Service {
  async add(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const newUser = await Users.create(data);

      if (newUser) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: newUser.id });
      }
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async get(data) {
    const { ctx } = this;
    const { Users, Books } = this.app.model;

    try {
      const limit = Number(data.size) || 10;
      const offset = Number(data.current)
        ? (Number(data.current) - 1) * limit
        : 0;

      const result = await ctx.helper.selectWithPagging(Users, {
        attributes: ["id", "nickname", "email", "password"],
        where: {
          id: data.id,
          [Op.or]: {
            nickname: { [Op.like]: `%${data.keyword}%` },
            email: { [Op.like]: `%${data.keyword}%` },
          },
        },
        include: {
          model: Books,
          attributes: ["id", "title"],
          required: false,
          as: "book",
        },
        offset,
        limit,
      });

      if (result.data.length) {
        ctx.status = 200;
        return Object.assign(new ctx.helper._success(), result);
      }
      ctx.status = 200;
      return new ctx.helper._success("暂无数据");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async login(data) {
    const { ctx } = this;
    const { Users, Books } = this.app.model;

    try {
      const user = await Users.findOne({
        attributes: [
          "id",
          "nickname",
          "email",
          "not_learned_arr",
          "learned_arr",
          "task_today",
          "task_completed",
          "num_day",
          "last_login_time",
        ],
        where: {
          email: data.email,
          password: data.password,
        },
        include: {
          model: Books,
          required: false,
          attributes: ["id", "title"],
          as: "book",
        },
      });

      if (user) {
        await user.update({ last_login_time: Date.now() });

        // 保存到redis
        const token = ctx.helper.addToken({ email: user.email });
        ctx.helper._setRedis(user.email, user);
        ctx.helper.setToken(ctx.res, token);

        ctx.status = 200;
        return new ctx.helper._success(user);
      }
      ctx.status = 200;
      return new ctx.helper._error("账号或密码错误");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async update(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const condition = { id: data.id };
      delete data.id;
      const result = await Users.update(data, { where: condition });

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("没有修改");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async changePass(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const originalData = helper.decodeToken(data.auth);
      console.log(originalData);
      const condition = { email: originalData.email };
      const result = await Users.update(
        { password: data.password },
        { where: condition }
      );

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("没有修改");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async chooseBook(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const condition = { id: data.id };
      delete data.id;
      const result = await Users.update(
        { now_book: data.book_id },
        { where: condition }
      );

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("没有修改");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { Users } = this.app.model;
    try {
      const condition = { id: data.id };
      const result = await Users.destroy({ where: condition });
      console.log(result);

      if (result) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("没有删除");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async checkNickname(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const condition = { nickname: data.nickname };
      const result = await Users.findOne({ where: condition });

      if (!result) {
        ctx.status = 200;
        return new ctx.helper._success("此昵称可以使用");
      }
      ctx.status = 200;
      return new ctx.helper._existed("此昵称已被占用");
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async checkEmail(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      let condition = null;
      if (data.id) {
        condition = { email: data.email, id: { [Op.ne]: data.id } };
      } else {
        condition = { email: data.email };
      }

      const result = await Users.findOne({ where: condition });
      if (!result) {
        ctx.status = 200;
        return new ctx.helper._success("此邮箱可以使用");
      }
      ctx.status = 200;
      return new ctx.helper._existed("此邮箱已被占用");
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
}

module.exports = UsersService;
