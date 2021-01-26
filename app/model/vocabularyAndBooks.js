"use strict";
module.exports = async (app) => {
  const { INTEGER } = app.Sequelize;

  const VocabularyAndBooks = app.model.define(
    "vocabulary_and_books",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "record id",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["book_id", "word_id"],
        },
      ],
    }
  );

  return VocabularyAndBooks;
};
