module.exports = async (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const {vocabulary_books, vocabulary}=app.model.models;
  // console.log(app.model.models);
  
  const vocabulary_to_books = app.model.define(
    "vocabulary_to_books",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "记录id",
      }
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      timestamps: false,
      tableName: "vocabulary_to_books",
    }
  );

  // getVocabularies: [Function],
  // countVocabularies: [Function],
  // hasVocabulary: [Function],
  // hasVocabularies: [Function],
  // setVocabularies: [Function],
  // addVocabulary: [Function],
  // addVocabularies: [Function],
  // removeVocabulary: [Function],
  // removeVocabularies: [Function],
  // createVocabulary: [Function]
  vocabulary_books.belongsToMany(vocabulary, { through: vocabulary_to_books, foreignKey:"book_id"});
  

  // getVocabulary_books: [Function],
  // countVocabulary_books: [Function],
  // hasVocabulary_book: [Function],
  // hasVocabulary_books: [Function],
  // setVocabulary_books: [Function],
  // addVocabulary_book: [Function],
  // addVocabulary_books: [Function],
  // removeVocabulary_book: [Function],
  // removeVocabulary_books: [Function],
  // createVocabulary_book: [Function]
  vocabulary.belongsToMany(vocabulary_books, { through: vocabulary_to_books, foreignKey:"word_id"});
  console.log(app.model.models);
  // return vocabulary_to_books;
};
