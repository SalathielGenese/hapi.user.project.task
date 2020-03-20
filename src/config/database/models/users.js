'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
    name: {
      allowNull: false,
      validate: { min: 1 },
      type: DataTypes.STRING
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  });
  Users.associate = function ({ ProjectsUsersAssignees, TasksUsers, Tasks, Projects }) {
    Users.hasMany( Projects, { as: 'assignerProjects', foreignKey: 'assignerId' });
    Users.belongsToMany( Tasks, { through: TasksUsers, foreignKey: 'userId', as: 'tasks' });
    Users.belongsToMany( Projects, { through: ProjectsUsersAssignees, foreignKey: 'userId', as: 'assignedProjects' });
  };
  return Users;
};
