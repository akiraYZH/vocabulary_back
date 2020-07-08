module.exports = async (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const VocabularyAndBooks = app.model.define("vocabulary_and_books", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "记录id",
    },
  });

  

  return VocabularyAndBooks;
};
