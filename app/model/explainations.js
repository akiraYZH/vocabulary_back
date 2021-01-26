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
        comment: 'explaination id',
      },
      explaination_cn: {
        type: STRING(255),
        comment: 'explaination',
        allowNull: false,
      },
      sentence_fr: {
        type: STRING(255),
        comment: 'French sentence',
        allowNull: true,
      },
      audio: {
        type: STRING(255),
        comment: 'French sentence audio',
        allowNull: true,
      },
      sentence_cn: {
        type: STRING(255),
        comment: 'Sentence',
        allowNull: true,
      },
      sort: {
        type: INTEGER,
        comment: 'Order',
        allowNull: false,
      },
    }
  );

  Explainations.associate = function() {
    app.model.Explainations.belongsTo(app.model.Types, { foreignKey: 'type_id', as: 'type' });
  };

  return Explainations;
};
