"use strict";
const Service = require("egg").Service;
const Op = require("sequelize").Op;
const { delImg } = require("../utils/uploadImg");

class WordsService extends Service {
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
    const { Vocabulary, Explainations } = this.app.model;
    // Create transaction
    const transaction = await this.ctx.model.transaction();
    try {
      const newWord = await Vocabulary.create(data, { transaction });
      const newExplainations = await Explainations.bulkCreate(
        data.explainations,
        { transaction }
      );
      await newWord.addExplainations(newExplainations, { transaction });
      await transaction.commit();
      ctx.status = 200;
      return new ctx.helper._success({ insertId: newWord.id });
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async get(data) {
    const { ctx } = this;
    const { Vocabulary, Explainations, Types } = this.app.model;

    try {
      const limit = Number(data.size) || 10;
      const offset = Number(data.current)
        ? (Number(data.current) - 1) * limit
        : 0;

      if (data.keyword) {
        if (/^[a-zA-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]*$/.test(data.keyword)) {
          // french
          data.keyword_fr = data.keyword;
        } else if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(data.keyword)) {
          // chinese
          data.keyword_cn = data.keyword;
        }
      }
      const result = await ctx.helper.selectWithPagging(Vocabulary, {
        attributes: [
          "id",
          "spelling",
          "spelling_m",
          "spelling_f",
          "phonetic",
          "image",
          "audio",
          "difficulty",
        ],
        include: [
          {
            model: Explainations,
            required: false,
            attributes: [
              "id",
              "explaination_cn",
              "sentence_fr",
              "sentence_cn",
              "audio",
              "sort",
            ],
            where: {
              explaination_cn: { [Op.like]: `%${data.keyword_cn}%` },
            },
            order: [["sort", "ASC"]],
            include: {
              model: Types,
              required: false,
              attributes: ["id", "type_abbr", "type", "type_cn"],
              where: {
                id: data.type_id,
              },
              as: "type",
            },
          },
          {
            model: Types,
            required: false,
            attributes: ["id", "type_abbr", "type", "type_cn"],
            where: {
              id: data.primary_type_id,
            },
            as: "primary_type",
          },
        ],
        where: {
          spelling: { [Op.like]: `%${data.keyword_fr}%` },
          id: data.id,
          difficulty: data.difficulty,
        },
        order: [["spelling", "ASC"]],
        limit,
        offset,
      });

      if (result.data.length) {
        ctx.status = 200;
        return Object.assign(new ctx.helper._success(), result);
      }
      ctx.status = 200;
      return new ctx.helper._error("No data");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async getWords(data) {
    const { ctx } = this;
    const { Vocabulary, Explainations, Types } = this.app.model;

    try {
      const result = await Vocabulary.findAll({
        attributes: [
          "id",
          "spelling",
          "spelling_m",
          "spelling_f",
          "phonetic",
          "image",
          "audio",
          "difficulty",
        ],
        include: [
          {
            model: Explainations,
            required: false,
            attributes: [
              "id",
              "explaination_cn",
              "sentence_fr",
              "sentence_cn",
              "audio",
              "sort",
            ],
            include: {
              model: Types,
              required: false,
              attributes: ["id", "type_abbr", "type", "type_cn"],
              as: "type",
            },
          },
          {
            model: Types,
            required: false,
            attributes: ["id", "type_abbr", "type", "type_cn"],
            as: "primary_type",
          },
        ],
        where: {
          id: data.id_arr,
        },
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
    const { Vocabulary, Explainations } = this.app.model;

    const transaction = await this.ctx.model.transaction();

    try {
      const condition = { id: data.id };
      const word = await Vocabulary.findOne({ where: condition });
      let updateExplainations = false;
      const result = await word.update(data, { transaction });

      if (data.explainations) {
        updateExplainations = true;
        const wordExplainations = await word.getExplainations();
        // clear
        wordExplainations.forEach(
          async (explaination) => await explaination.destroy({ transaction })
        );

        // insert
        const newExplainations = await Explainations.bulkCreate(
          data.explainations,
          { transaction }
        );
        await word.addExplainations(newExplainations, { transaction });
      }

      await transaction.commit();

      if (result || updateExplainations) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._success("No modifications");
    } catch (error) {
      transaction.rollback();
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { Vocabulary } = this.app.model;
    try {
      const condition = { id: data.id };
      const result = await Vocabulary.destroy({ where: condition });

      if (result) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("delete failed");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async img(data) {
    const { ctx } = this;
    const { Vocabulary } = this.app.model;

    const transaction = await this.ctx.model.transaction();

    try {
      const condition = { id: data.id };
      const word = await Vocabulary.findOne({ where: condition });

      if (word.image) {
        delImg(word.image, "words");
      }

      const result = await word.update({ image: data.newImg }, { transaction });

      console.log(result);
      await transaction.commit();

      if (result) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._success("No modifications");
    } catch (error) {
      console.log(error);
      transaction.rollback();
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
}

module.exports = WordsService;
