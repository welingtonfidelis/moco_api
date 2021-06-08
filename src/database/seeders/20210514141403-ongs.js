'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'ongs' },
      [{
        name: 'Master',
        email: 'master@email.com',
        social_1: null,
        social_2: null,
        logo: 'logo.png',
        cnpj: '000.000.000/0000-01',
        state_law: '00.000/001',
        municipal_law: '0.000/01',
        created_at: new Date(),
        updated_at: new Date()
      },
      ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'ongs' });
  }
};
