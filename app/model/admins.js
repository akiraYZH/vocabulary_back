module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Admins = app.model.define(
    "admins",
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
      email: { type: STRING(50), comment: "邮箱", allowNull: false },
      password: { type: STRING(50), comment: "密码", allowNull: false },
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      // timestamps: false,
      paranoid:true,
      indexes: [
        {
          unique: true,
          fields: ["account","email"],
        },
      ],
    }
  );

  Admins.associate=function(){
    app.model.Admins.belongsTo(app.model.Roles, {foreignKey:"role_id", as:"role", onDelete:"SET NULL"});
  }
  // p_user.sync({
  //   //改变表的结构，保留数据
  //   alter: true
  // }).then(() => {
  //   console.log("p_user Table has been created");
  // });
  return Admins;
};
