const { randomPlatformName, randomDescription, randomPhoto } = require('./index');

module.exports = {
  generate: () => {
    return {
      name: randomPlatformName(),
      description: randomDescription(),
      emblem: randomPhoto(),
      created_at: new Date(),
      updated_at: new Date()
    };
  },

  generateMany: (count) => {
    return Array.from({ length: count }, () => this.generate());
  }
};
