"use strict";
const Service = require("egg").Service;

class TypesService extends Service {
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
    const { Types } = this.app.model;
    try {
      const newType = await Types.create(data);

      if (newType) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: newType.id });
      }
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async get() {
    const { ctx } = this;
    const { Types } = this.app.model;

    try {
      const result = await Types.findAll({
        attributes: ["id", "type_abbr", "type", "type_cn"],
      });

      if (result.length) {
        ctx.status = 200;
        return new ctx.helper._success(result);
      }
      ctx.status = 200;
      return new ctx.helper._error("暂无数据");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async update(data) {
    const { ctx } = this;
    const { Types } = this.app.model;

    try {
      const condition = { id: data.id };
      const result = await Types.update(data, { where: condition });

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._success("没有修改");
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { Types } = this.app.model;
    try {
      const condition = { id: data.id };
      const result = await Types.destroy({ where: condition });

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

module.exports = TypesService;
