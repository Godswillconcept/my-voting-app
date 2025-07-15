const { randomName, randomBio, randomPhoto, randomBoolean } = require('./index');

module.exports = {
  generate: (platformId, pollId) => {
    const { first_name, last_name } = randomName();
    return {
      name: `${first_name} ${last_name}`,
      bio: randomBio(),
      platform_id: platformId,
      poll_id: pollId,
      photo: randomPhoto(),
      is_independent: randomBoolean(),
      created_at: new Date(),
      updated_at: new Date()
    };
  },

  generateMany: (platformIds, pollId, count = 3) => {
    const candidates = [];
    
    // Create candidates for each platform
    platformIds.forEach(platformId => {
      for (let i = 0; i < count; i++) {
        candidates.push(this.generate(platformId, pollId));
      }
    });

    // Create independent candidates
    for (let i = 0; i < Math.floor(count * 0.3); i++) {
      candidates.push(this.generate(null, pollId));
    }

    return candidates;
  }
};
