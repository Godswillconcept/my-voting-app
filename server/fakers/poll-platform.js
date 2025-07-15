module.exports = {
  generate: (platformId, pollId) => {
    return {
      platform_id: platformId,
      poll_id: pollId,
      created_at: new Date(),
      updated_at: new Date()
    };
  },

  generateMany: (platformIds, pollIds) => {
    const associations = [];
    
    // Create random associations between platforms and polls
    platformIds.forEach(platformId => {
      // Randomly select polls for this platform
      const selectedPolls = pollIds.filter(() => Math.random() > 0.3);
      selectedPolls.forEach(pollId => {
        associations.push(this.generate(platformId, pollId));
      });
    });

    return associations;
  }
};
