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
      // timestamps: false
    }
  );

  return Explainations;
};
