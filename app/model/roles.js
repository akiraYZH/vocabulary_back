'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Roles = app.model.define('roles', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户id',
    },
    name: {
      type: STRING(50),
      unique: false,
      comment: '角色名',
      allowNull: false,
    },
  });

  Roles.associate = function() {
    app.model.Roles.hasMany(app.model.Permissions, {
      foreignKey: 'role_id',
      as: 'permissions',
      onDelete: 'cascade',
    });
  };

  return Roles;
};
