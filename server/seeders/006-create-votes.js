module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get IDs of users, polls, and candidates
    const [users, polls, candidates] = await Promise.all([
      queryInterface.sequelize.query('SELECT id FROM User WHERE role = "Voter"', { type: queryInterface.sequelize.QueryTypes.SELECT }),
      queryInterface.sequelize.query('SELECT id FROM Poll', { type: queryInterface.sequelize.QueryTypes.SELECT }),
      queryInterface.sequelize.query('SELECT id FROM Candidate', { type: queryInterface.sequelize.QueryTypes.SELECT })
    ]);

    // Create votes for each voter in each poll
    const votes = [];
    
    // For each poll
    for (const poll of polls) {
      // Get candidates for this poll
      const pollCandidates = await queryInterface.sequelize.query(
        'SELECT id FROM Candidate WHERE poll_id = ?',
        { 
          replacements: [poll.id],
          type: queryInterface.sequelize.QueryTypes.SELECT 
        }
      );

      // For each voter
      for (const user of users) {
        // Randomly select a candidate
        const randomCandidate = pollCandidates[Math.floor(Math.random() * pollCandidates.length)];
        votes.push({
          user_id: user.id,
          poll_id: poll.id,
          candidate_id: randomCandidate.id,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Vote', votes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vote', null, {});
  }
};
