'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TasksUsers', {
      id: {
        type: Sequelize.INTEGER,
        unique: 'taskIdUserId',
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: 'taskIdUserId',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      taskId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TasksUsers');
  }
};