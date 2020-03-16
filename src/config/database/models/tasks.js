'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    score: {
      defaultValue: 1,
      validate: { min: 1 },
      type: DataTypes.INTEGER
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: [ 'ACTIVE', 'INACTIVE' ],
    },
    declined: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    complete: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
  }, {});
  Tasks.associate = function(models) {
    // associations can be defined here
  };
  return Tasks;
};
