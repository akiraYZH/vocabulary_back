'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Permissions = app.model.define(
    'permissions',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'User id',
      },
      name: {
        type: STRING(50),
        comment: 'Permissions',
      },
    }
  );


  return Permissions;
};
