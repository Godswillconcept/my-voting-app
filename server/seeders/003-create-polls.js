module.exports = {
  up: async (queryInterface, Sequelize) => {
    const polls = [
      {
        name: 'Presidential Election 2025',
        description: 'Election for the next president',
        start_time: new Date('2025-11-01T00:00:00'),
        end_time: new Date('2025-11-01T23:59:59'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Local Council Vote',
        description: 'Vote for local council representatives',
        start_time: new Date('2025-10-15T00:00:00'),
        end_time: new Date('2025-10-15T23:59:59'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('Poll', polls, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Poll', null, {});
  }
};
