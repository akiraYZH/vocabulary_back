module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const {vocabulary_books}=app.model.models;
  // const book = require("./vocabulary_books");
  const user = app.model.define(
    "user",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "用户id",
      },
      account: {
        type: STRING(50),
        unique: false,
        comment: "用户的账号",
        allowNull: false,
      },
      // phone: { type: STRING(11), comment: "用户电话", allowNull: true },
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
        allowNull: false,
      },
      status: {
        type: INTEGER(11),
        defaultValue: 1,
        comment: "1:正常 0:停止使用",
      },
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      timestamps: false,
      tableName: "user",
      indexes: [
        {
          unique: true,
          fields: ["account"],
        },
      ],
    }
  );

  
  user.associate=function(){
    // console.log(user.prototype);
    
    
    app.model.models.user.belongsTo(app.model.models.vocabulary_books, {foreignKey:"now_book", onDelete:"SET NULL"})
  }

  // return user;
};
