"use strict";

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
      const newBook = await Books.create(data);

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

  async distributeWords(data) {
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
      const book = await Books.findOne({ where: { id: data.id } });
      if (data.toAdd) {
        const toAddWords = await Vocabulary.findAll({
          where: { id: data.toAdd },
        });
        await book.addVocabularies(toAddWords);
      }

      if (data.toRemove) {
        const toRemoveWords = await Vocabulary.findAll({
          where: { id: data.toRemove },
        });

        await book.removeVocabularies(toRemoveWords);
      }

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
      const result = await Books.findAll({
        attributes: [
          "id",
          "title",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vocabulary_and_books WHERE books.id = vocabulary_and_books.book_id)"
            ),
            "count",
          ],
        ],
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

  async getWords(data) {
    const { ctx } = this;
    const { Books, Vocabulary } = this.app.model;

    try {
      if (data.keyword) {
        if (/^[a-zA-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]*$/.test(data.keyword)) {
          // 匹配法语
          data.keyword_fr = data.keyword;
        } else if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(data.keyword)) {
          // 匹配中文
          data.keyword_cn = data.keyword;
        }
      }

      const book = await Books.findOne({
        attributes: ["id", "title"],
        where: {
          id: data.id,
        },
      });

      //包含单词
      const words = await book.getVocabularies(
        ctx.helper.fixObj({
          attributes: [
            "id",
            "spelling",
            "primary_explaination",
            "phonetic",
            "difficulty",
            "image",
            "audio",
          ],
          where: {
            spelling: { [Op.like]: `%${data.keyword_fr}%` },
            difficulty: data.difficulty,
          },
          order: [["spelling", "ASC"]],
        })
      );

      // 获得单词书包含的单词id数组
      const aBooKWordsId = [];
      words.forEach((word) => {
        aBooKWordsId.push(word.id);
      });

      // 不包含单词
      const unincludedWords = await Vocabulary.findAll(
        ctx.helper.fixObj({
          attributes: [
            "id",
            "spelling",
            "primary_explaination",
            "phonetic",
            "difficulty",
            "image",
            "audio",
          ],
          where: {
            id: { [Op.notIn]: aBooKWordsId },
            spelling: { [Op.like]: `%${data.keyword_fr}%` },
            difficulty: data.difficulty,
          },
          order: [["spelling", "ASC"]],
        })
      );

      // 清除不需要的联表信息
      for (let i = 0; i < words.length; i++) {
        delete words[i].dataValues.vocabulary_and_books;
      }

      const resObj = {
        included: words,
        unincluded: unincludedWords,
      };

      if (words.length || unincludedWords.length) {
        ctx.status = 200;
        return Object.assign(new ctx.helper._success(), resObj);
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
    const { Books } = this.app.model;

    try {
      const condition = { id: data.id };
      const result = await Books.update(data, { where: condition });

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
    const { Books } = this.app.model;
    try {
      const condition = { id: data.id };
      const result = await Books.destroy({ where: condition });

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

module.exports = BooksService;
