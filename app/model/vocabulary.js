module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
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
        type: STRING(255),
        comment: "单词拼写",
        allowNull: false,
      },
      phonetic: {
        type: STRING(255),
        comment: "单词音标",
        allowNull: true,
      },
      detail: {
        type: TEXT,
        comment: "词性：type+解释：text",
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
      sentences: {
        type: TEXT,
        comment: "例句:fr法语例句， cn中文例句",
        allowNull: true,
      },
      status: {
        type: INTEGER(11),
        defaultValue: 1,
        comment: "1:正常 0:停止使用",
      },
    },
  );

  

  Vocabulary.associate = function(){
    app.model.Vocabulary.hasMany(app.model.Explainations, {foreignKey: "word_id"});
    app.model.Vocabulary.belongsToMany(app.model.Books, {
      through: "vocabulary_and_books",
      foreignKey: "word_id",
    });
  }
  
  
  return Vocabulary;
};
