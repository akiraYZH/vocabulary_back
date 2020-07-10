const vocabulary = require("../model/vocabulary");
const sequelize = require("sequelize");
const Op = require("sequelize").Op;
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

  async addWords(data) {
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
    const { Books, Vocabulary } = this.app.model;
    try {
      let book = await Books.findOne({ where: { id: data.id } });
      let words = await Vocabulary.findAll({ where: { id: data.words } });

      await book.addVocabularies(words);

      ctx.status = 200;
      return new ctx.helper._success();
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }


  async removeWords(data) {
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
    const { Books, Vocabulary } = this.app.model;
    try {
      let book = await Books.findOne({ where: { id: data.id } });
      let words = await Vocabulary.findAll({ where: { id: data.words } });

      await book.removeVocabularies(words);

      ctx.status = 200;
      return new ctx.helper._success();
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
        attributes: ["id", "title",[sequelize.literal(`(SELECT COUNT(*) FROM vocabulary_and_books WHERE books.id = vocabulary_and_books.book_id)`), 'count']],
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

  async getWords(data) {
    const { ctx } = this;
    const { Books, Vocabulary, Explainations, Types} = this.app.model;

    try {

      if (data.keyword) {
        if (/^[a-zA-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]*$/.test(data.keyword)) {
          //匹配法语
          data.keyword_fr = data.keyword;
        } else if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(data.keyword)) {
          //匹配中文
          data.keyword_cn = data.keyword;
        }
      }


      let book = await Books.findOne({
        attributes: ["id", "title"],
        where: {
          id: data.id,
        }
      });

      let words = await book.getVocabularies(ctx.helper.fixObj({
        attributes:["id","spelling","primary_explaination","phonetic","difficulty","image","audio"],
        where: {
          spelling: { [Op.like]: `%${data.keyword_fr}%` },
          difficulty: data.difficulty,
        },
        order: [["spelling", "ASC"]],
      }));

      //清除不需要的联表信息
      for(let i = 0;i<words.length;i++){
        delete words[i].dataValues.vocabulary_and_books;
      }

      if (words.length) {
        ctx.status = 200;
        return new ctx.helper._success(words);
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
      let result = await Books.update(data, { where: condition });

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 200;
        return new ctx.helper._success("没有修改");
      }
    } catch (error) {
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
