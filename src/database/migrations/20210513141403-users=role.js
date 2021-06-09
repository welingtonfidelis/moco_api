'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'role',
      {
        allowNull: false,
        type: Sequelize.ENUM('user', 'manager', 'admin'),
        defaultValue: 'user'
      })
      .then(() => {
        queryInterface.addIndex('users', ['role'])
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'role');
  }
};
