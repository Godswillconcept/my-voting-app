module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get IDs of platforms and polls
    const [platforms, polls] = await Promise.all([
      queryInterface.sequelize.query('SELECT id FROM Platform WHERE name != "Independent"', { type: queryInterface.sequelize.QueryTypes.SELECT }),
      queryInterface.sequelize.query('SELECT id FROM Poll', { type: queryInterface.sequelize.QueryTypes.SELECT })
    ]);

    // Create candidates for each party in each poll
    const candidates = [
      // First poll candidates
      {
        name: 'John Smith',
        bio: 'Experienced politician with a focus on economic growth.',
        platform_id: platforms[0].id,
        poll_id: polls[0].id,
        photo: 'john-smith.jpg',
        is_independent: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sarah Johnson',
        bio: 'Education reform advocate and community leader.',
        platform_id: platforms[1].id,
        poll_id: polls[0].id,
        photo: 'sarah-johnson.jpg',
        is_independent: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Second poll candidates
      {
        name: 'Michael Brown',
        bio: 'Local business owner and community activist.',
        platform_id: platforms[0].id,
        poll_id: polls[1].id,
        photo: 'michael-brown.jpg',
        is_independent: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Emily Wilson',
        bio: 'Environmental advocate and youth leader.',
        platform_id: platforms[1].id,
        poll_id: polls[1].id,
        photo: 'emily-wilson.jpg',
        is_independent: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Independent candidates
      {
        name: 'David Lee',
        bio: 'Independent candidate with a focus on local issues.',
        platform_id: null,
        poll_id: polls[0].id,
        photo: 'david-lee.jpg',
        is_independent: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Rachel Chen',
        bio: 'Independent candidate advocating for healthcare reform.',
        platform_id: null,
        poll_id: polls[1].id,
        photo: 'rachel-chen.jpg',
        is_independent: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('Candidate', candidates, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Candidate', null, {});
  }
};
