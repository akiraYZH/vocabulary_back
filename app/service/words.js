const Service = require("egg").Service;
const Op = require("sequelize").Op;

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
    //创建事务对象
    let transaction = await this.ctx.model.transaction();
    try {
      let newWord = await Vocabulary.create(data, { transaction });
      let newExplainations = await Explainations.bulkCreate(
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
    const { Vocabulary, Explainations } = this.app.model;

    try {
      let limit = Number(data.size) || 10;
      let offset = Number(data.current)
        ? (Number(data.current) - 1) * limit
        : 0;

      if (data.keyword) {
        if (/^[a-zA-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]*$/.test(data.keyword)) {
          //匹配法语
          data.keyword_fr = data.keyword;
        } else if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(data.keyword)) {
          //匹配中文
          data.keyword_cn = data.keyword;
        }
      }
      let result = await ctx.helper.selectWithPagging(Vocabulary, {
        attributes: [
          "id",
          "spelling",
          "phonetic",
          "image",
          "audio",
          "difficulty",
        ],
        include: {
          model: Explainations,
          required: false,
          attributes: [
            "id",
            "type",
            "explaination_cn",
            "sentence_fr",
            "sentence_cn",
            "audio",
          ],
          where: {
            explaination_cn: { [Op.like]: `%${data.keyword_cn}%` },
          },
          order: [["sord", "ASC"]],
        },
        where: {
          spelling: { [Op.like]: `%${data.keyword_fr}%` },
          id: data.id,
          difficulty: data.difficulty,
        },
        order: [["spelling", "ASC"]],
        limit: limit,
        offset: offset,
      });

      if (result.data.length) {
        ctx.status = 200;
        return Object.assign(new ctx.helper._success(), result);
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
    const { Vocabulary, Explainations } = this.app.model;
    let updateExplainations = false;

    let transaction = await this.ctx.model.transaction();

    try {
      let condition = { id: data.id };
      let word = await Vocabulary.findOne({ where: condition });

      let result = await word.update(data, { transaction });

      if (data.explainations) {
        updateExplainations = true;
        let wordExplainations = await word.getExplainations();
        //先清空
        wordExplainations.forEach(
          async (explaination) => await explaination.destroy({ transaction })
        );

        //再插入
        let newExplainations = await Explainations.bulkCreate(
          data.explainations,
          { transaction }
        );
        await word.addExplainations(newExplainations, { transaction });
      }

      await transaction.commit();

      console.log(result);
      
      if (result) {
        ctx.status = 200;
        return new ctx.helper._success();
      }else{
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
    const { Vocabulary } = this.app.model;
    try {
      let condition = { id: data.id };
      let result = await Vocabulary.destroy({ where: condition });

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

module.exports = WordsService;
