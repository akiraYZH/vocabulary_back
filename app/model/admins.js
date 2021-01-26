'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Admins = app.model.define(
    'admins',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'admin id',
      },
      account: {
        type: STRING(50),
        comment: 'admin account',
        allowNull: false,
      },
      email: { type: STRING(50), comment: 'email', allowNull: false },
      password: { type: STRING(50), comment: 'password', allowNull: false },
    },
    {
      // timestamp:true    automatically create "created_at" and "updated_at" fields
      // timestamps: false,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: [ 'account', 'email' ],
        },
      ],
    }
  );

  Admins.associate = function() {
    app.model.Admins.belongsTo(app.model.Roles, { foreignKey: 'role_id', as: 'role', onDelete: 'SET NULL' });
  };
  // p_user.sync({
  //   //change structure of table, but keep the data
  //   alter: true
  // }).then(() => {
  //   console.log("p_user Table has been created");
  // });
  return Admins;
};
