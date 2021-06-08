'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [selectedOng] = await queryInterface.sequelize.query(
      "SELECT id from public.ongs WHERE name = 'Master';"
    );

    if (!selectedOng || !selectedOng[0]) return;

    const [selectedGroups] = await queryInterface.sequelize.query(
      "SELECT id from public.cash_register_groups WHERE ong_id = ? LIMIT 2;",
      {
        replacements: [selectedOng[0].id]
      }
    );

    if (!selectedGroups || !selectedGroups[0]) return;

    const [selectedUser] = await queryInterface.sequelize.query(
      "SELECT id from public.users WHERE ong_id = ? LIMIT 1;",
      {
        replacements: [selectedOng[0].id]
      }
    );

    if (!selectedUser || !selectedUser[0]) return;

    const values = [];

    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const lastDay = (new Date(y, m + 1, 0)).getDate();

    for (let i = 0; i < 15; i += 1) {
      const typeIn = randomNumber(2) > 1;
      const paid = new Date();
      const rand = randomNumber(lastDay);
      paid.setDate(rand);

      values.push({
        description: typeIn ? `Entrada ${i + 1}` : `Saída ${i + 1}`,
        paid_in: paid,
        value: randomNumber(150),
        cash_register_group_id: typeIn ? selectedGroups[0].id : (selectedGroups[1]?.id || selectedGroups[0].id),
        type: typeIn ? 'in' : 'out',
        ong_id: selectedOng[0].id,
        user_id: selectedUser[0].id,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert({ tableName: 'cash_registers' }, values);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'users' })
  }
};

const randomNumber = (max) => {
    return Math.floor(Math.random() * max) + 1;
}