"use strict";
const Service = require("egg").Service;

class RolesService extends Service {
  async add(data) {
    const { ctx } = this;
    // getPermissions: [Function],
    // countPermissions: [Function],
    // hasPermission: [Function],
    // hasPermissions: [Function],
    // setPermissions: [Function],
    // addPermission: [Function],
    // addPermissions: [Function],
    // removePermission: [Function],
    // removePermissions: [Function],
    // createPermission: [Function]
    const { Roles, Permissions } = this.app.model;

    // 创建事务对象
    const transaction = await this.ctx.model.transaction();
    try {
      const newRole = await Roles.create(data, { transaction });

      for (let i = 0; i < data.permissions.length; i++) {
        const newPermission = await Permissions.create(
          { name: data.permissions[i] },
          {
            transaction,
          }
        );
        await newRole.addPermission(newPermission, { transaction });
      }

      await transaction.commit();

      if (newRole) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: newRole.id });
      }
    } catch (error) {
      // 回滚
      console.log(error);

      await transaction.rollback();
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async get() {
    const { ctx } = this;
    const { Roles, Permissions } = this.app.model;

    try {
      const result = await Roles.findAll({
        attributes: ["id", "name"],
        include: {
          model: Permissions,
          attributes: ["name"],
          required: false,
          as: "permissions",
        },
      });

      result.forEach((role) => {
        const permissions = [];
        role.permissions.forEach((item) => {
          permissions.push(item.name);
        });
        delete role.dataValues.permissions;
        role.dataValues.router = permissions;
      });

      if (result.length) {
        ctx.status = 200;
        return new ctx.helper._success(result);
      }
      ctx.status = 200;
      return new ctx.helper._success("暂无数据");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async update(data) {
    const { ctx } = this;
    const { Roles, Permissions } = this.app.model;
    let updatePermissions = false;

    const transaction = await this.ctx.model.transaction();

    try {
      const condition = { id: data.id };
      const role = await Roles.findOne({ where: condition });

      const result = await role.update(data, { transaction });

      if (data.permissions) {
        updatePermissions = true;
        const rolePermissions = await role.getPermissions();
        // clear
        rolePermissions.forEach(
          async (permission) => await permission.destroy({ transaction })
        );

        // insert
        for (let i = 0; i < data.permissions.length; i++) {
          const permission = { name: data.permissions[i] };
          const newPermission = await Permissions.create(permission, {
            transaction,
          });
          await role.addPermission(newPermission, { transaction });
        }
      }

      await transaction.commit();
      if (result || updatePermissions) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._success("没有修改");
    } catch (error) {
      transaction.rollback();
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { Roles } = this.app.model;
    try {
      const condition = { id: data.id };
      const result = await Roles.destroy({ where: condition });

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
}

module.exports = RolesService;
