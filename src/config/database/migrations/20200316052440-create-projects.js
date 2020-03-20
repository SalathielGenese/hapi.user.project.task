'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
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
      body: {
        allowNull: false,
        defaultValue: "",
        type: Sequelize.TEXT
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
      assignerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};
