module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get IDs of users and polls
    const [users, polls] = await Promise.all([
      queryInterface.sequelize.query('SELECT id FROM User WHERE role = "Voter"', { type: queryInterface.sequelize.QueryTypes.SELECT }),
      queryInterface.sequelize.query('SELECT id FROM Poll', { type: queryInterface.sequelize.QueryTypes.SELECT })
    ]);

    // Create reviews for each voter in each poll
    const reviews = [];
    const comments = [
      'Great experience with the voting process.',
      'Easy to use and secure.',
      'Had some technical issues but got resolved quickly.',
      'Very satisfied with the platform.',
      'Could use some improvements in user interface.',
      'Overall good experience.'
    ];

    for (const poll of polls) {
      for (const user of users) {
        // Randomly decide if this user leaves a review
        if (Math.random() > 0.5) {
          reviews.push({
            comment: comments[Math.floor(Math.random() * comments.length)],
            user_id: user.id,
            poll_id: poll.id,
            created_at: new Date(),
            updated_at: new Date()
          });
        }
      }
    }

    await queryInterface.bulkInsert('Review', reviews, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Review', null, {});
  }
};
