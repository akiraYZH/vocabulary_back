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
        comment: "word id",
      },
      spelling: {
        type: STRING(100),
        comment: "spelling of the word",
        allowNull: false,
      },
      spelling_m: {
        type: STRING(255),
        comment: "spelling_m",
        allowNull: false,
      },
      spelling_f: {
        type: STRING(255),
        comment: "spelling_f",
        allowNull: false,
      },
      phonetic: {
        type: STRING(255),
        comment: "phonetic of word",
        allowNull: true,
      },
      primary_explaination: {
        type: STRING(255),
        comment: "main meaning",
        allowNull: true,
      },
      difficulty: {
        type: INTEGER,
        comment: "difficulty：1 basic， 2 medium， 3 addvanced",
        defaultValue: 1,
        allowNull: false,
      },
      image: {
        type: STRING(255),
        comment: "image url",
        allowNull: true,
      },
      audio: {
        type: STRING(255),
        comment: "audio url",
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
