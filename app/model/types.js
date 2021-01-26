'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Types = app.model.define('types', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'Type the word id',
    },
    type_abbr: {
      type: STRING(50),
      unique: false,
      comment: 'abbr type',
      allowNull: false,
    },
    type: {
      type: STRING(50),
      unique: false,
      comment: 'full type name',
      allowNull: false,
    },
    type_cn: {
      type: STRING(50),
      unique: false,
      comment: 'type (cn)',
      allowNull: false,
    },
  });

  // Types.associate = function () {
  //   app.model.Types.hasMany(app.model.Vocabulary, {
  //     foreignKey: "type_id",
  //     as: "type"
  //   });
  // };

  return Types;
};
