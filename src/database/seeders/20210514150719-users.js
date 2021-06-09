'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [selectedOng] = await queryInterface.sequelize.query(
      "SELECT id from public.ongs WHERE name = 'Master';"
    );

    if (!selectedOng || !selectedOng[0]) return;

    return queryInterface.bulkInsert({ tableName: 'users' },
      [{
        name: 'Administrator',
        email: 'admmaster@email.com',
        user: 'admmaster',
        birth: '1990-07-28 00:00:00',
        password: bcrypt.hashSync('1234', 10),
        profile: 'admin',
        ong_id: selectedOng[0].id,
        created_at: new Date(),
        updated_at: new Date()
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'users' })
  }
};
