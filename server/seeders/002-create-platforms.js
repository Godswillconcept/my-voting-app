module.exports = {
  up: async (queryInterface, Sequelize) => {
    const platforms = [
      {
        name: 'Democratic Party',
        description: 'Party focused on progressive policies and social equality.',
        emblem: 'democratic-party.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Republican Party',
        description: 'Party focused on conservative values and fiscal responsibility.',
        emblem: 'republican-party.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Independent',
        description: 'Non-partisan candidates running independently.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('Platform', platforms, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Platform', null, {});
  }
};
