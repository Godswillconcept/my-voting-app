const { faker } = require('@faker-js/faker');

module.exports = {
  // Generate a random date between start and end
  randomDate: (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  },

  // Generate a random gender
  randomGender: () => {
    const genders = ['Male', 'Female'];
    return genders[Math.floor(Math.random() * genders.length)];
  },

  // Generate a random role
  randomRole: () => {
    const roles = ['Voter', 'Admin'];
    return roles[Math.floor(Math.random() * roles.length)];
  },

  // Generate a random boolean
  randomBoolean: () => {
    return Math.random() >= 0.5;
  },

  // Generate a random date in the future
  futureDate: (days = 30) => {
    const now = new Date();
    return new Date(now.getTime() + Math.random() * days * 24 * 60 * 60 * 1000);
  },

  // Generate a random date in the past
  pastDate: (days = 30) => {
    const now = new Date();
    return new Date(now.getTime() - Math.random() * days * 24 * 60 * 60 * 1000);
  },

  // Generate a random photo URL
  randomPhoto: () => {
    return faker.image.avatar();
  },

  // Generate a random description
  randomDescription: () => {
    return faker.lorem.paragraph();
  },

  // Generate a random bio
  randomBio: () => {
    return faker.lorem.paragraphs(2);
  },

  // Generate a random comment
  randomComment: () => {
    return faker.lorem.paragraph();
  },

  // Generate a random name
  randomName: () => {
    return {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName()
    };
  },

  // Generate a random phone number
  randomPhone: () => {
    return faker.phone.number('+1##########');
  },

  // Generate a random email
  randomEmail: () => {
    return faker.internet.email();
  },

  // Generate a random username
  randomUsername: () => {
    return faker.internet.username();
  },

  // Generate a random password
  randomPassword: () => {
    return faker.internet.password();
  },

  // Generate a random platform name
  randomPlatformName: () => {
    const partyTypes = ['Party', 'Movement', 'Alliance', 'Front'];
    const adjectives = ['Democratic', 'Republican', 'Progressive', 'Liberal', 'Conservative', 'Socialist'];
    const nouns = ['Unity', 'Freedom', 'Justice', 'Prosperity', 'Future'];

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const partyType = partyTypes[Math.floor(Math.random() * partyTypes.length)];

    return `${adjective} ${noun} ${partyType}`;
  },

  // Generate a random poll name
  randomPollName: () => {
    const types = ['Election', 'Referendum', 'Vote', 'Ballot'];
    const topics = ['Presidential', 'Local', 'National', 'Regional'];
    const years = ['2025', '2026', '2027'];

    const type = types[Math.floor(Math.random() * types.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const year = years[Math.floor(Math.random() * years.length)];

    return `${topic} ${type} ${year}`;
  }
};
