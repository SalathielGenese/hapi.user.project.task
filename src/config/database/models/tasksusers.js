'use strict';
module.exports = (sequelize, DataTypes) => {
  const TasksUsers = sequelize.define('TasksUsers', {
    userId: {
      type: DataTypes.INTEGER,
      unique: 'taskIdUserId',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    taskId: {
      type: DataTypes.INTEGER,
      unique: 'taskIdUserId',
      allowNull: false,
      references: {
        model: 'Tasks',
        key: 'id',
      },
    },
  }, {
    timestamps: false,
  });
  TasksUsers.associate = function(models) {
    // associations can be defined here
  };
  return TasksUsers;
};