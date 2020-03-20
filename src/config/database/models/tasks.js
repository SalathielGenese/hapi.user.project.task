'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
      validate: { len: [ 1 ] },
    },
    description: {
      type: DataTypes.STRING
    },
    score: {
      defaultValue: 1,
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: { len: [ 1 ] },
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
  Tasks.associate = function ({ TasksUsers, Projects, Users }) {
    Tasks.belongsTo( Projects, { as: 'project', foreignKey: 'projectId' });
    Tasks.belongsToMany( Users, { through: TasksUsers, foreignKey: 'taskId', as: 'assignees' });
  };
  return Tasks;
};
