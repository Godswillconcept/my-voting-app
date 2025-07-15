const { randomComment, randomBoolean } = require('./index');

module.exports = {
  generate: (userId, pollId) => {
    return {
      comment: randomComment(),
      user_id: userId,
      poll_id: pollId,
      created_at: new Date(),
      updated_at: new Date()
    };
  },

  generateMany: (userIds, pollId, reviewProbability = 0.3) => {
    const reviews = [];
    
    // Create reviews for each user with a certain probability
    userIds.forEach(userId => {
      if (randomBoolean() && Math.random() < reviewProbability) {
        reviews.push(this.generate(userId, pollId));
      }
    });

    return reviews;
  }
};
