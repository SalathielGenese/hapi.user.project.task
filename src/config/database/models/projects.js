'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    body: {
      defaultValue: "",
      type: DataTypes.TEXT
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
  Projects.associate = function(models) {
    // associations can be defined here
  };
  return Projects;
};
