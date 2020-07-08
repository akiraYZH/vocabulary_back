const Service = require("egg").Service;
const Op = require("sequelize").Op;

class AdminsService extends Service {
  async add(data) {
    const { ctx } = this;
    const { Admins } = this.app.model;

    try {
      let newAdmin = await Admins.create(data);

      if (newAdmin) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: newAdmin.id });
      }
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async get(data) {
    const { ctx } = this;
    const { Admins, Roles, Permissions } = this.app.model;

    try {
      let limit = Number(data.size) || 10;
      let offset = Number(data.current)
        ? (Number(data.current) - 1) * limit
        : 0;

      let result = await ctx.helper.selectWithPagging(Admins, {
        attributes: ["id", "account", "email", "password"],
        where: {
          id: data.id,
          [Op.or]: {
            account: { [Op.like]: `%${data.keyword}%` },
            email: { [Op.like]: `%${data.keyword}%` },
          },
        },
        include: {
          model: Roles,
          attributes: ["id", "name"],
          required: false,
          as: "role",
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
    const { Admins, Roles, Permissions } = this.app.model;

    try {
      const loginRes = await Admins.findOne({
        attributes: ["id", "account", "email"],
        where: {
          account: data.account,
          password: data.password,
        },
        include: {
          model: Roles,
          required: false,
          attributes: ["id", "name"],
          as: "role",
          include: {
            model: Permissions,
            required: false,
            as: "permissions",
            attributes: ["name"],
          },
        },
      });

      if (loginRes) {
        let router = [];
        loginRes.role.permissions.forEach((permission) => {
          router.push(permission.name);
        });

        delete loginRes.role.dataValues.permissions;
        loginRes.role.dataValues.router = router;

        let token = ctx.helper.addToken({ account: loginRes.account });
        ctx.helper._setRedis(loginRes.account, loginRes);
        ctx.helper.setToken(ctx.res, token);

        ctx.status = 200;
        return new ctx.helper._success(loginRes);
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
    const { Admins } = this.app.model;

    try {
      let condition = { id: data.id };
      delete data.id;
      let result = await Admins.update(data, { where: condition });

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 400;
        return new ctx.helper._error("没有修改");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { Admins } = this.app.model;
    try {
      let condition = { id: data.id };
      let result = await Admins.destroy({ where: condition });
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
    const { Admins } = this.app.model;

    try {
      let condition = { account: data.account };
      let result = await Admins.findOne({ where: condition });

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
    const { Admins } = this.app.model;

    try {
      let condition = { email: data.email };
      let result = await Admins.findOne({ where: condition });

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

module.exports = AdminsService;
