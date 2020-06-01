module.exports = async (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const {user}=app.model.models;
  const vocabulary_books = app.model.define(
    "vocabulary_books",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "单词书id",
      },
      title: {
        type: STRING(255),
        comment: "单词书名称",
        allowNull: false,
      },
      status: {
        type: INTEGER(11),
        defaultValue: 1,
        comment: "1:正常 0:停止使用",
      },
    },
    {
      timestamps: false,
      tableName: "vocabulary_books"
    }
  );
  
  // // app.model.models.vocabulary_books.belongsToMany(app.model.models.user, {through: user,foreignKey:'now_book'})
  // vocabulary_books.associate=function(){
    
    
  //   app.model.models.vocabulary_books.belongsToMany(app.model.models.user, {through: user,foreignKey:'now_book'})
   
    
  // }
  
  

  // p_user.sync({
  //   //改变表的结构，保留数据
  //   alter: true
  // }).then(() => {
  //   console.log("p_user Table has been created");
  // });
  // return vocabulary_books;
};
