module.exports = (app) => {
    const { STRING, INTEGER, TEXT} = app.Sequelize;
    const Permissions = app.model.define(
      "permissions",
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "用户id",
        },
        // apis: {
        //   type: TEXT,
        //   comment: "接口"
        // },
        name:{
            type:STRING(50),
            comment: "权限标识符"
        }
      }
    );
  

    return Permissions;
  };