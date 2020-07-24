'use strict';
const Service = require('egg').Service;
const Op = require('sequelize').Op;

class AdminsService extends Service {
  async add(data) {
    const { ctx } = this;
    const { Admins } = this.app.model;

    try {
      const newAdmin = await Admins.create(data);

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
    const { Admins, Roles } = this.app.model;

    try {
      const limit = Number(data.size) || 10;
      const offset = Number(data.current)
        ? (Number(data.current) - 1) * limit
        : 0;

      const result = await ctx.helper.selectWithPagging(Admins, {
        attributes: [ 'id', 'account', 'email', 'password' ],
        where: {
          id: data.id,
          [Op.or]: {
            account: { [Op.like]: `%${data.keyword}%` },
            email: { [Op.like]: `%${data.keyword}%` },
          },
        },
        include: {
          model: Roles,
          attributes: [ 'id', 'name' ],
          required: false,
          as: 'role',
        },
        offset,
        limit,
      });

      if (result.data.length) {
        ctx.status = 200;
        return Object.assign(new ctx.helper._success(), result);
      }
      ctx.status = 200;
      return new ctx.helper._success('暂无数据');

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
        attributes: [ 'id', 'account', 'email' ],
        where: {
          account: data.account,
          password: data.password,
        },
        include: {
          model: Roles,
          required: false,
          attributes: [ 'id', 'name' ],
          as: 'role',
          include: {
            model: Permissions,
            required: false,
            as: 'permissions',
            attributes: [ 'name' ],
          },
        },
      });

      if (loginRes) {
        const router = [];
        loginRes.role.permissions.forEach(permission => {
          router.push(permission.name);
        });

        delete loginRes.role.dataValues.permissions;
        loginRes.role.dataValues.router = router;

        const token = ctx.helper.addToken({ account: loginRes.account });
        ctx.helper._setRedis("admin_"+loginRes.account, loginRes);
        ctx.helper.setToken(ctx.res, token);

        ctx.status = 200;
        return new ctx.helper._success(loginRes);
      }
      return new ctx.helper._error('账号或密码错误');

    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async loginToken(data) {
    const { ctx } = this;

    try {
      let token = ctx.headers.authentication;
      let result = await ctx.helper._getRedis("admin_"+ctx.helper.decodeToken(token).account);
      return new ctx.helper._success(result);

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
      const condition = { id: data.id };
      delete data.id;
      const result = await Admins.update(data, { where: condition });

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      return new ctx.helper._error('没有修改');

    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { Admins } = this.app.model;
    try {
      const condition = { id: data.id };
      const result = await Admins.destroy({ where: condition });
      console.log(result);

      if (result) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error('没有删除');

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
      const condition = { account: data.account };
      const result = await Admins.findOne({ where: condition });

      if (!result) {
        ctx.status = 200;
        return new ctx.helper._success('此账号可以使用');
      }
      ctx.status = 200;
      return new ctx.helper._existed('此账号已被占用');

    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async checkEmail(data) {
    const { ctx } = this;
    const { Admins } = this.app.model;

    try {
      const condition = { email: data.email };
      const result = await Admins.findOne({ where: condition });

      if (!result) {
        ctx.status = 200;
        return new ctx.helper._success('此邮箱可以使用');
      }
      ctx.status = 200;
      return new ctx.helper._existed('此邮箱已被占用');

    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
}

module.exports = AdminsService;
