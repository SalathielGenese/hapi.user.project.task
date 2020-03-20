'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectsUsersAssignees = sequelize.define('ProjectsUsersAssignees', {
    userId: {
      unique: 'projectIdUserId',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    projectId: {
      unique: 'projectIdUserId',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id',
      },
    },
  }, {
    timestamps: false,
  });
  ProjectsUsersAssignees.associate = function(models) {
    // associations can be defined here
  };
  return ProjectsUsersAssignees;
};