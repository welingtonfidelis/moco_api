'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cash_registers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      observation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      value: {
        allowNull: false,
        type: Sequelize.REAL
      },
      paid_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('in', 'out')
      },
      cash_register_group_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'cash_register_groups',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      ong_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ongs',
          key: 'id',
          onDelete: 'cascade',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    })
    .then(() => {
      queryInterface.addIndex('cash_registers', ['description', 'paid_in'])
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cash_registers');
  }
};
