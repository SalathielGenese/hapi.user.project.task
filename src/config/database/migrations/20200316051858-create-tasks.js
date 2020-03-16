'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      score: {
        defaultValue: 1,
        validate: { min: 1 },
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [ 'ACTIVE', 'INACTIVE' ],
      },
      declined: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      complete: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};
