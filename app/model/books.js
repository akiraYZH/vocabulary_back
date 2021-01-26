"use strict";
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  // vocabulary_books table
  const Books = app.model.define("books", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "Book id",
    },
    title: {
      type: STRING(255),
      comment: "Book name",
      allowNull: false,
    },
  });

  // add foreign key and link two tables
  Books.associate = function () {
    app.model.Books.hasMany(app.model.Users, {
      foreignKey: "now_book",
      onDelete: "SET NULL",
    });
    app.model.Books.belongsToMany(app.model.Vocabulary, {
      through: "vocabulary_and_books",
      foreignKey: "book_id",
      onDelete: "cascade",
      as: "words",
    });
  };

  return Books;
};
