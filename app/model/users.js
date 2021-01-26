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
        comment: "user id",
      },
      nickname: {
        type: STRING(50),
        unique: false,
        comment: "user nickname",
        allowNull: false,
      },
      email: { type: STRING(50), comment: "email", allowNull: false },
      password: { type: STRING(50), comment: "password", allowNull: false },
      now_book: {
        type: INTEGER,
        comment: "selected book id， default: null",
        allowNull: true,
      },
      not_learned_arr: {
        type: TEXT,
        comment: "not learned words ids",
        allowNull: true,
      },
      learned_arr: { type: TEXT, comment: "learned words", allowNull: true },
      favorite_arr: { type: TEXT, comment: "fav words", allowNull: true },
      task_today: { type: TEXT, comment: "to learn words", allowNull: true },
      task_completed: {
        type: INTEGER,
        comment: "1:complete， 0:not complete",
        allowNull: false,
        defaultValue: 0,
      },
      num_day: {
        type: INTEGER,
        comment: "task per day",
        allowNull: false,
        defaultValue: 0,
      },
      last_login_time: {
        type: STRING(13),
        comment: "login time last time",
        allowNull: true,
      },
    },
    {
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
