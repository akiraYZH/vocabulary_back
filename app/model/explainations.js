'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Explainations = app.model.define(
    'explainations',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '解释id',
      },
      explaination_cn: {
        type: STRING(255),
        comment: '中文解释',
        allowNull: false,
      },
      sentence_fr: {
        type: STRING(255),
        comment: '法语例句',
        allowNull: true,
      },
      audio: {
        type: STRING(255),
        comment: '法语句子音频',
        allowNull: true,
      },
      sentence_cn: {
        type: STRING(255),
        comment: '中文例句',
        allowNull: true,
      },
      sort: {
        type: INTEGER,
        comment: '排序',
        allowNull: false,
      },
    }
  );

  Explainations.associate = function() {
    app.model.Explainations.belongsTo(app.model.Types, { foreignKey: 'type_id', as: 'type' });
  };

  return Explainations;
};
