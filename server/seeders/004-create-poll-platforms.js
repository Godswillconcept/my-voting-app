module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, get the IDs of platforms and polls
    const [platforms, polls] = await Promise.all([
      queryInterface.sequelize.query('SELECT id FROM Platform', { type: queryInterface.sequelize.QueryTypes.SELECT }),
      queryInterface.sequelize.query('SELECT id FROM Poll', { type: queryInterface.sequelize.QueryTypes.SELECT })
    ]);

    // Create associations between polls and platforms
    const pollPlatforms = [
      // Associate first poll with first two platforms
      {
        platform_id: platforms[0].id,
        poll_id: polls[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        platform_id: platforms[1].id,
        poll_id: polls[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Associate second poll with all platforms
      {
        platform_id: platforms[0].id,
        poll_id: polls[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        platform_id: platforms[1].id,
        poll_id: polls[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        platform_id: platforms[2].id,
        poll_id: polls[1].id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('PollPlatform', pollPlatforms, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PollPlatform', null, {});
  }
};
