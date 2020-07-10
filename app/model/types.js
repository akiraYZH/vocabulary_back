module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Types = app.model.define("types", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "词性id",
    },
    type_abbr: {
      type: STRING(50),
      unique: false,
      comment: "词性缩写",
      allowNull: false,
    },
    type: {
      type: STRING(50),
      unique: false,
      comment: "词性全写",
      allowNull: false,
    },
    type_cn: {
      type: STRING(50),
      unique: false,
      comment: "词性中文",
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
