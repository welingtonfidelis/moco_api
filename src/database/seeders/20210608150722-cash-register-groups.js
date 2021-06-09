'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [selectedOng] = await queryInterface.sequelize.query(
      "SELECT id from public.ongs WHERE name = 'Master';"
    );

    if (!selectedOng || !selectedOng[0]) return;

    const values = [];

    for(let i = 0; i < 2; i += 1) {
      values.push({
        description: `Grupo ${i+1}`,
        ong_id: selectedOng[0].id,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert({ tableName: 'cash_register_groups' }, values);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'users' })
  }
};
