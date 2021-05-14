'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cash_register_groups', {
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
        type: Sequelize.STRING,
      },
      ong_id: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'ongs',
          key: 'id'
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
    },
    {
      uniqueKeys: {
        actions_unique: {
          fields: ['description', 'ong_id']
        }

      }
    })
    .then(() => {
      queryInterface.addIndex('cash_register_groups', ['description'])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cash_register_groups');
  }
};
