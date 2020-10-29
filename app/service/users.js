"use strict";
const sequelize = require("sequelize");
const helper = require("../extend/helper");
const getRandomArrayElements = require("../utils/getRandomArrayElements");
const { includes } = require("../utils/rolesList");

const Service = require("egg").Service;
const Op = require("sequelize").Op;

class UsersService extends Service {
  async add(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const newUser = await Users.create(data);

      if (newUser) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: newUser.id });
      }
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async get(data) {
    const { ctx } = this;
    const { Users, Books } = this.app.model;

    try {
      const limit = Number(data.size) || 10;
      const offset = Number(data.current)
        ? (Number(data.current) - 1) * limit
        : 0;

      const result = await ctx.helper.selectWithPagging(Users, {
        attributes: ["id", "nickname", "email", "password"],
        where: {
          id: data.id,
          [Op.or]: {
            nickname: { [Op.like]: `%${data.keyword}%` },
            email: { [Op.like]: `%${data.keyword}%` },
          },
        },
        include: {
          model: Books,
          attributes: ["id", "title"],
          required: false,
          as: "book",
        },
        offset,
        limit,
        distinct: true,
      });

      if (result.data.length) {
        ctx.status = 200;
        return Object.assign(new ctx.helper._success(), result);
      }
      ctx.status = 200;
      return new ctx.helper._success("暂无数据");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async login(data) {
    const { ctx } = this;
    const { Users, Books } = this.app.model;

    try {
      const user = await Users.findOne({
        attributes: [
          "id",
          "nickname",
          "email",
          "not_learned_arr",
          "learned_arr",
          "favorite_arr",
          "task_today",
          "task_completed",
          "num_day",
          "last_login_time",
        ],
        where: {
          email: data.email,
          password: data.password,
        },
        include: {
          model: Books,
          required: false,
          attributes: [
            "id",
            "title",
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM vocabulary_and_books, books WHERE books.id = vocabulary_and_books.book_id)"
              ),
              "count",
            ],
          ],
          as: "book",
        },
      });

      if (user) {
        //更新上一次登陆时间
        await user.update({ last_login_time: Date.now() });

        // 将下列字段从string变为array
        user.dataValues.learned_arr = JSON.parse(user.dataValues.learned_arr);
        user.dataValues.not_learned_arr = JSON.parse(
          user.dataValues.not_learned_arr
        );
        user.dataValues.task_today = JSON.parse(user.dataValues.task_today);

        // 保存到redis
        const token = ctx.helper.addToken({ email: user.email });
        ctx.helper._setRedis("user_" + user.email, user);
        ctx.helper.setToken(ctx.res, token);

        ctx.status = 200;
        return new ctx.helper._success(user);
      }
      ctx.status = 200;
      return new ctx.helper._error("账号或密码错误");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
  async loginToken(data) {
    const { ctx } = this;
    const { Users, Books } = this.app.model;

    try {
      let token = ctx.headers.authentication;
      const user = await Users.findOne({
        attributes: [
          "id",
          "nickname",
          "email",
          "not_learned_arr",
          "learned_arr",
          "favorite_arr",
          "task_today",
          "task_completed",
          "num_day",
          "last_login_time",
        ],
        where: {
          email: ctx.helper.decodeToken(token).email,
        },
        include: {
          model: Books,
          required: false,
          attributes: [
            "id",
            "title",
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM vocabulary_and_books, books WHERE books.id = vocabulary_and_books.book_id)"
              ),
              "count",
            ],
          ],
          as: "book",
        },
      });

      if (user) {
        await user.update({ last_login_time: Date.now() });

        // 将下列字段从string变为array
        user.dataValues.learned_arr = JSON.parse(user.dataValues.learned_arr);
        user.dataValues.not_learned_arr = JSON.parse(
          user.dataValues.not_learned_arr
        );
        user.dataValues.task_today = JSON.parse(user.dataValues.task_today);

        // 保存到redis
        const token = ctx.helper.addToken({ email: user.email });
        ctx.helper._setRedis("user_" + user.email, user);
        ctx.helper.setToken(ctx.res, token);

        ctx.status = 200;
        return new ctx.helper._success(user);
      }

      return new ctx.helper._success(user);
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
  async update(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const condition = { id: data.id };
      delete data.id;

      //处理需要变成string的数据
      if (data.not_learned_arr) {
        data.not_learned_arr = JSON.stringify(data.not_learned_arr);
      }
      if (data.learned_arr) {
        data.learned_arr = JSON.stringify(data.learned_arr);
      }
      if (data.task_today) {
        data.task_today = JSON.stringify(data.task_today);
      }

      const result = await Users.update(data, { where: condition });

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("没有修改");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async changePass(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const originalData = helper.decodeToken(data.auth);

      const condition = { email: originalData.email };
      const result = await Users.update(
        { password: data.password },
        { where: condition }
      );

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("没有修改");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async chooseBook(data) {
    const { ctx } = this;
    const { Users, Books, Vocabulary } = this.app.model;

    try {
      const book = await Books.findOne({
        where: {
          id: data.book_id,
        },
        include: {
          attributes: ["id"],
          model: Vocabulary,
          as: "words",
        },
      });

      // 每天要背的单词数量如果比书的单词总量大， 取书的单词总量
      const count =
        data.num_day <= book.words.length ? data.num_day : book.words.length;

      // 还没学习的单词id
      const not_learned_arr = book.words.map((word) => word.id);

      //今天要学习的单词id
      const task_today = ctx.helper.getRandomArrayElements(
        not_learned_arr,
        count
      );

      // where的条件
      const condition = { id: data.id };
      delete data.id;

      // 初始化数据
      const result = await Users.update(
        {
          now_book: data.book_id,
          num_day: data.num_day,
          not_learned_arr: JSON.stringify(not_learned_arr),
          learned_arr: JSON.stringify([]),
          task_today: JSON.stringify(task_today),
          task_completed: 0,
        },
        { where: condition }
      );

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }
      ctx.status = 200;
      return new ctx.helper._error("没有修改");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { Users } = this.app.model;
    try {
      const condition = { id: data.id };
      const result = await Users.destroy({ where: condition });

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

  async checkNickname(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      const condition = { nickname: data.nickname };
      const result = await Users.findOne({ where: condition });

      if (!result) {
        ctx.status = 200;
        return new ctx.helper._success("此昵称可以使用");
      }
      ctx.status = 200;
      return new ctx.helper._existed("此昵称已被占用");
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async checkEmail(data) {
    const { ctx } = this;
    const { Users } = this.app.model;

    try {
      let condition = null;
      if (data.id) {
        condition = { email: data.email, id: { [Op.ne]: data.id } };
      } else {
        condition = { email: data.email };
      }

      const result = await Users.findOne({ where: condition });
      if (!result) {
        ctx.status = 200;
        return new ctx.helper._success("此邮箱可以使用");
      }
      ctx.status = 200;
      return new ctx.helper._existed("此邮箱已被占用");
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async getExam(data) {
    const { ctx } = this;
    const { Vocabulary, Explainations, Types } = this.app.model;

    try {
      let result = await Vocabulary.findAll({
        attributes: [
          "id",
          "spelling",
          "spelling_m",
          "spelling_f",
          "phonetic",
          "image",
          "audio",
          "difficulty",
          "primary_explaination",
        ],
        include: [
          // {
          //   model: Explainations,
          //   required: false,
          //   attributes: [
          //     "id",
          //     "explaination_cn",
          //     "sentence_fr",
          //     "sentence_cn",
          //     "audio",
          //     "sort",
          //   ],
          //   include: {
          //     model: Types,
          //     required: false,
          //     attributes: ["id", "type_abbr", "type", "type_cn"],
          //     as: "type",
          //   },
          // },
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

      let allWords = await Vocabulary.findAll({
        attributes: [
          "id",
          "spelling",
          "spelling_m",
          "spelling_f",
          "phonetic",
          "image",
          "audio",
          "difficulty",
          "primary_explaination",
        ],
        include: [
          {
            model: Types,
            required: false,
            attributes: ["id", "type_abbr", "type", "type_cn"],
            as: "primary_type",
          },
        ],
      });

      // 生成选项
      let exam = [];
      result.forEach((word) => {
        // 过滤本身
        let options = allWords.filter(
          (item) => item.dataValues.id !== word.dataValues.id
        );

        let randomOptions = ctx.helper.getRandomArrayElements(options, 3);
        let _randomOptions = randomOptions.map((item) => {
          return {
            id: item.dataValues.id,
            image: item.dataValues.image,
            primary_explaination: item.dataValues.primary_explaination,
          };
        });

        console.log(_randomOptions);
        exam.unshift(word.dataValues);
        exam[0]["options"] = _randomOptions;
      });

      if (exam.length) {
        ctx.status = 200;
        return new ctx.helper._success(exam);
      }
      ctx.status = 200;
      return new ctx.helper._error("暂无数据");
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  //自动任务
  async updateTask() {
    const { ctx } = this;
    const { Users, Books } = this.app.model;
    try {
      let users = await Users.findAll({ where: { task_completed: 1 } });

      users.forEach((user) => {
        const not_learned_arr = JSON.parse(user.dataValues.not_learned_arr);
        const num_day =
          user.dataValues.num_day < not_learned_arr.length
            ? user.dataValues.num_day
            : not_learned_arr.length;
        const task_today = getRandomArrayElements(not_learned_arr, num_day);
        user.update({
          task_today: JSON.stringify(task_today),
          task_completed: 0,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = UsersService;
