const Service = require("egg").Service;
const Op = require("sequelize").Op;

class UsersService extends Service {
  async add(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      let newUser = await Users.create(data);

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
      let limit = Number(data.size) || 10;
      let offset = Number(data.current)
        ? (Number(data.current) - 1) * limit
        : 0;

      let result = await ctx.helper.selectWithPagging(Users, {
        attributes: ["id", "account", "email","password"],
        where: {
          id: data.id,
          [Op.or]: {
            account: { [Op.like]: `%${data.keyword}%` },
            email: { [Op.like]: `%${data.keyword}%` },
          },
        },
        include: {
          model: Books,
          attributes: ["id", "title"],
          required: false,
          as: "book",
        },
        offset: offset,
        limit: limit,
      });

      if (result.data.length) {
        ctx.status = 200;
        return Object.assign(new ctx.helper._success(), result);
      } else {
        ctx.status = 200;
        return new ctx.helper._success("暂无数据");
      }
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async login(data) {
    const { ctx } = this;
    const { Users, Books} = this.app.model;

    try {
      const user = await Users.findOne({
        attributes: [
          "id",
          "account",
          "email",
          "not_learned_arr",
          "learned_arr",
          "task_today",
          "task_completed",
          "num_day",
          "last_login_time",
        ],
        where: {
          account: data.account,
          password: data.password,
        },
        include: {
          model: Books,
          required: false,
          attributes: ["id", "title"],
          as: "book"
        },
      });

      if (user) {
        await user.update({last_login_time:Date.now()});

        console.log(user.book,123);
        

        //保存到redis
        let token = ctx.helper.addToken({ account: user.account });
        ctx.helper._setRedis(user.account, user);
        ctx.helper.setToken(ctx.res, token);

        ctx.status = 200;
        return new ctx.helper._success(user);
      } else {
        ctx.status = 400;
        return new ctx.helper._error("账号或密码错误");
      }
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
      let condition = { id: data.id };
      delete data.id;
      let result = await Users.update(data, { where: condition });

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 400;
        return new ctx.helper._error("没有修改");
      }
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
      let condition = { id: data.id };
      let result = await Users.destroy({ where: condition });
      console.log(result);

      if (result) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 200;
        return new ctx.helper._error("没有删除");
      }
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async checkAccount(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      let condition = { account: data.account };
      let result = await Users.findOne({ where: condition });

      if (!result) {
        ctx.status = 200;
        return new ctx.helper._success("此账号可以使用");
      } else {
        ctx.status = 400;
        return new ctx.helper._existed("此账号已被占用");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async checkEmail(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      let condition = { email: data.email };
      let result = await Users.findOne({ where: condition });

      if (!result) {
        ctx.status = 200;
        return new ctx.helper._success("此邮箱可以使用");
      } else {
        ctx.status = 400;
        return new ctx.helper._existed("此邮箱已被占用");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
}

module.exports = UsersService;
