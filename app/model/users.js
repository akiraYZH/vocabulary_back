"use strict";
module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  // user table
  const Users = app.model.define(
    "users",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "用户id",
      },
      nickname: {
        type: STRING(50),
        unique: false,
        comment: "用户昵称",
        allowNull: false,
      },
      email: { type: STRING(50), comment: "邮箱", allowNull: false },
      password: { type: STRING(50), comment: "密码", allowNull: false },
      now_book: {
        type: INTEGER,
        comment: "选中单词书id， 为选为null",
        allowNull: true,
      },
      not_learned_arr: {
        type: TEXT,
        comment: "还没学习的单词",
        allowNull: true,
      },
      learned_arr: { type: TEXT, comment: "学习过的单词", allowNull: true },
      favorite_arr: { type: TEXT, comment: "收藏的单词", allowNull: true },
      task_today: { type: TEXT, comment: "今天要学习的单词", allowNull: true },
      task_completed: {
        type: INTEGER,
        comment: "1:完成， 0:未完成",
        allowNull: false,
        defaultValue: 0,
      },
      num_day: {
        type: INTEGER,
        comment: "一天背诵个数",
        allowNull: false,
        defaultValue: 0,
      },
      last_login_time: {
        type: STRING(13),
        comment: "上一次登陆时间",
        allowNull: true,
      },
    },
    {
      // timestamp:true会自动创建created_at和updated_at字段
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["nickname", "email"],
        },
      ],
    }
  );

  Users.associate = function () {
    // add foreign key and link two tables
    app.model.Users.belongsTo(app.model.Books, {
      foreignKey: "now_book",
      onDelete: "SET NULL",
    });
  };

  return Users;
};
