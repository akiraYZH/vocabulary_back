"use strict";
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Vocabulary = app.model.define(
    "vocabulary",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "单词id",
      },
      spelling: {
        type: STRING(100),
        comment: "单词拼写",
        allowNull: false,
      },
      spelling_m: {
        type: STRING(255),
        comment: "单词阳性拼写",
        allowNull: false,
      },
      spelling_f: {
        type: STRING(255),
        comment: "单词阴性拼写",
        allowNull: false,
      },
      phonetic: {
        type: STRING(255),
        comment: "单词音标",
        allowNull: true,
      },
      primary_explaination: {
        type: STRING(255),
        comment: "主要含义",
        allowNull: true,
      },
      difficulty: {
        type: INTEGER,
        comment: "难度：1为基础， 2为中级， 3为高级",
        defaultValue: 1,
        allowNull: false,
      },
      image: {
        type: STRING(255),
        comment: "图片地址",
        allowNull: true,
      },
      audio: {
        type: STRING(255),
        comment: "单词音频地址",
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["spelling"],
        },
      ],
    }
  );

  Vocabulary.associate = function () {
    app.model.Vocabulary.hasMany(app.model.Explainations, {
      foreignKey: "word_id",
      onDelete: "cascade",
    });
    app.model.Vocabulary.belongsToMany(app.model.Books, {
      through: "vocabulary_and_books",
      foreignKey: "word_id",
      onDelete: "cascade",
      as: "words",
    });
    app.model.Vocabulary.belongsTo(app.model.Types, {
      foreignKey: "primary_type_id",
      as: "primary_type",
    });
  };

  return Vocabulary;
};
