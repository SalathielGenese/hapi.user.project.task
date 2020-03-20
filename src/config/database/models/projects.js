'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
      validate: { len: [ 1 ] },
    },
    body: {
      defaultValue: "",
      allowNull: false,
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
  }, {
    timestamps: false,
  });
  Projects.associate = function ({ ProjectsUsersAssignees, Tasks, Users }) {
    Projects.hasMany( Tasks, { as: 'tasks', foreignKey: 'projectId' });
    Projects.belongsTo( Users, { as: 'assigner', foreignKey: 'assignerId' } );
    Projects.belongsToMany( Users, { through: ProjectsUsersAssignees, foreignKey: 'projectId', as: 'assignees' } );
  };
  return Projects;
};
