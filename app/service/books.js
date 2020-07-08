const Service = require("egg").Service;

class BooksService extends Service {
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
    const { Books } = this.app.model;
    try {
      let newBook = await Books.create(data);

      if (newBook) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: newBook.id });
      }
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async get() {
    const { ctx } = this;
    const { Books } = this.app.model;

    try {
      let result = await Books.findAll({
        attributes: ["id", "title"]
      });


      if (result.length) {
        ctx.status = 200;
        return new ctx.helper._success(result);
      } else {
        ctx.status = 200;
        return new ctx.helper._error("暂无数据");
      }
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }



  async update(data) {
    const { ctx } = this;
    const { Books } = this.app.model;

    try {
      let condition = { id: data.id };
      let result = await Books.update(data,{ where: condition });
      
      if (result[0] > 0) {
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
    const { Books } = this.app.model;
    try {
      let condition = { id: data.id };
      let result = await Books.destroy({ where: condition });

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

module.exports = BooksService;
