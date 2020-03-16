'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    score: DataTypes.INTEGER,
    status: DataTypes.ENUM,
    declined: DataTypes.BOOLEAN,
    complete: DataTypes.BOOLEAN
  }, {});
  Tasks.associate = function(models) {
    // associations can be defined here
  };
  return Tasks;
};