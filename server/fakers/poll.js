const { randomPollName, randomDescription, randomDate, futureDate } = require('./index');

module.exports = {
  generate: () => {
    const now = new Date();
    const start = randomDate(now, futureDate(30));
    const end = randomDate(start, futureDate(30));

    return {
      name: randomPollName(),
      description: randomDescription(),
      start_time: start,
      end_time: end,
      created_at: now,
      updated_at: now
    };
  },

  generateMany: (count) => {
    return Array.from({ length: count }, () => this.generate());
  }
};
