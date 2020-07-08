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

    //创建事务对象
    let transaction = await this.ctx.model.transaction();
    try {
      let newRole = await Roles.create(data, { transaction });

      for (let i = 0; i < data.permissions.length; i++) {
        let newPermission = await Permissions.create(
          { name: data.permissions[i] },
          {
            transaction,
          }
        );
        await newRole.addPermission(newPermission, { transaction });
      }

      await transaction.commit();
      console.log(newRole);

      if (newRole) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: newRole.id });
      }
    } catch (error) {
      //回滚
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
      let result = await Roles.findAll({
        attributes: ["id", "name"],
        include: {
          model: Permissions,
          attributes: ["name"],
          required: false,
          as: "permissions",
        },
      });

      console.log(result);

      result.forEach((role) => {
        let permissions = [];
        role.permissions.forEach((item) => {
          permissions.push(item.name);
        });
        delete role.dataValues.permissions;
        role.dataValues.router = permissions;
      });

      if (result.length) {
        ctx.status = 200;
        return new ctx.helper._success(result);
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

  // async permissions(data) {
  //   const { ctx } = this;
  //   const { Roles, Permissions } = this.app.model.Tables;
  //   let routes = [];
  //   try {
  //     let role = await Roles.findOne({
  //       where: { status: 1 },
  //       include: {
  //         model: PPermission,
  //         attributes: ["id", "name", "apis"],
  //         where: {
  //           status: 1,
  //         },
  //         required: false,
  //         as: "permissions",
  //       },
  //     });

  //     console.log(role);
  //     role.permissions.forEach((item) => {
  //       routes.push(item.name);
  //     });

  //     ctx.status = 200;
  //     return new ctx.helper._success(routes);
  //   } catch (error) {
  //     console.log(error);

  //     ctx.status = 500;
  //     return new ctx.helper._error(error);
  //   }
  // }

  async update(data) {
    const { ctx } = this;
    const { Roles, Permissions } = this.app.model;
    let updatePermissions = false;

    let transaction = await this.ctx.model.transaction();

    try {
      let condition = { id: data.id };
      let role = await Roles.findOne({ where: condition });

      let result = await role.update(data, { transaction });

      if (data.permissions) {
        updatePermissions = true;
        let rolePermissions = await role.getPermissions();
        //先清空
        rolePermissions.forEach(
          async (permission) => await permission.destroy({ transaction })
        );

        //再插入
        for (let i = 0; i < data.permissions.length; i++) {
          let permission = {name:data.permissions[i]};
          let newPermission = await Permissions.create(permission, {
            transaction,
          });
          await role.addPermission(newPermission, { transaction });
        }
      }

      await transaction.commit();

      if (result[0] > 0 || updatePermissions) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 200;
        return new ctx.helper._success("没有修改");
      }
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
      let condition = { id: data.id };
      let result = await Roles.destroy({ where: condition });
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
}

module.exports = RolesService;
