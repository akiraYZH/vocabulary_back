module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const user_admin = app.model.define(
    "user_admin",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "管理者id",
      },
      account: {
        type: STRING(50),
        comment: "管理者的账号",
        allowNull: false,
      },
      // phone: { type: STRING(11), comment: "用户电话", allowNull: true },
      password: { type: STRING(50), comment: "密码", allowNull: false },
      role: {
        type: STRING(30),
        comment: "权限",
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
      tableName: "user_admin",
      indexes: [
        {
          unique: true,
          fields: ["account"],
        },
      ],
    }
  );

  // p_user.sync({
  //   //改变表的结构，保留数据
  //   alter: true
  // }).then(() => {
  //   console.log("p_user Table has been created");
  // });
  // return user_admin;
};
