module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Explainations = app.model.define(
    "explainations",
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
      explaination_cn: {
        type: STRING(255),
        comment: "中文解释",
        allowNull: false,
      },
      sentence_fr: {
        type: STRING(255),
        comment: "法语例句",
        allowNull:true,
      },
      audio:{
        type: STRING(255),
        comment: "法语句子音频",
        allowNull:true,
      },
      sentence_cn: {
        type: STRING(255),
        comment: "中文例句",
        allowNull: true,
      },
      sort:{
        type:INTEGER,
        comment:"排序",
        allowNull:false
      }
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      // timestamps: false
    }
  );

  return Explainations;
};
