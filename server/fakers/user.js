const { randomName, randomEmail, randomUsername, randomPhone, randomGender, randomRole, randomPhoto, randomPassword } = require('./index');

module.exports = {
  generate: () => {
    const { first_name, last_name } = randomName();
    return {
      first_name,
      last_name,
      username: randomUsername(),
      email: randomEmail(),
      gender: randomGender(),
      dob: new Date('1970-01-01' + Math.floor(Math.random() * 20000)), // Random date between 1970 and 2020
      photo: randomPhoto(),
      password: randomPassword(),
      phone: randomPhone(),
      role: randomRole(),
      created_at: new Date(),
      updated_at: new Date()
    };
  },

  generateMany: (count) => {
    return Array.from({ length: count }, () => this.generate());
  }
};
