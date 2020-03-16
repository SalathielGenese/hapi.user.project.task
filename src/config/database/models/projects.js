'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    name: DataTypes.STRING,
    body: DataTypes.TEXT,
    status: DataTypes.ENUM,
    declined: DataTypes.BOOLEAN,
    complete: DataTypes.BOOLEAN
  }, {});
  Projects.associate = function(models) {
    // associations can be defined here
  };
  return Projects;
};