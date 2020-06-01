module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const vocabulary = app.model.define(
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
    {
      //timestamp:true会自动创建created_at和updated_at字段
      timestamps: false,
      tableName: "vocabulary",
    }
  );

  const explaination = app.model.define(
    "explaination",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "解释id",
      },
      type: {
        type: STRING(255),
        comment: "词性",
        allowNull: false,
      },
      explaination: {
        type: STRING(255),
        defaultValue: 1,
        comment: "中文解释",
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
      tableName: "explaination",
    }
  );


  app.model.models.explaination.belongsTo(app.model.models.vocabulary, {
    foreignKey: "word_id",
  });
  
  
  // app.ready(function () {
  //   console.log(app.model.models);
  //   // app.model.models.vocabulary.hasMany(app.model.models.explaination, {
  //   //   foreignKey: "word_id",
  //   // });

  //   app.model.models.explaination.belongsTo(app.model.models.vocabulary, {
  //     foreignKey: "word_id",
  //   });
  // });
  // vocabulary.associate = function () {
  //   // console.log(app.model.models.vocabulary, 9999999);
  //   app.model.models.vocabulary.hasMany(app.model.models.explaination, {
  //     foreignKey: "word_id",
  //   });
  // }
  // app.model.models.vocabulary.hasMany(app.model.models.explaination, {
  //   foreignKey: "word_id",
  // });
  // app.ready(async () => {
  //   // app.model.models.explaination.belongsTo(vocabulary,{foreignKey:"word_id"})
    
    // vocabulary.associate = function () {
    //   // console.log(app.model.models.vocabulary, 9999999);
    //   app.model.models.vocabulary.hasMany(app.model.models.explaination, {
    //     foreignKey: "word_id",
    //   });
  //   };
  // });
  // p_user.sync({
  //   //改变表的结构，保留数据
  //   alter: true
  // }).then(() => {
  //   console.log("p_user Table has been created");
  // });

  // return vocabulary;
};
