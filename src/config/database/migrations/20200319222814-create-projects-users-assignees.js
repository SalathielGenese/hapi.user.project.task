'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectsUsersAssignees', {
      id: {
        unique: 'projectIdUserId',
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        unique: 'projectIdUserId',
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      projectId: {
        unique: 'projectIdUserId',
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectsUsersAssignees');
  }
};