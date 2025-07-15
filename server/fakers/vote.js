module.exports = {
  generate: (userId, pollId, candidateId) => {
    return {
      user_id: userId,
      poll_id: pollId,
      candidate_id: candidateId,
      created_at: new Date(),
      updated_at: new Date()
    };
  },

  generateMany: (userIds, pollId, candidateIds) => {
    const votes = [];
    
    // Create votes for each user
    userIds.forEach(userId => {
      // Randomly select a candidate for this user
      const candidateId = candidateIds[Math.floor(Math.random() * candidateIds.length)];
      votes.push(this.generate(userId, pollId, candidateId));
    });

    return votes;
  }
};
