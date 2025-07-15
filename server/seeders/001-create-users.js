const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        first_name: 'Admin',
        last_name: 'User',
        username: 'admin',
        email: 'admin@example.com',
        gender: 'Male',
        dob: new Date('1990-01-01'),
        password: bcrypt.hashSync('admin123', 10),
        phone: '+1234567890',
        role: 'Admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        gender: 'Male',
        dob: new Date('1995-05-15'),
        password: bcrypt.hashSync('password123', 10),
        phone: '+1234567891',
        role: 'Voter',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        gender: 'Female',
        dob: new Date('1992-03-20'),
        password: bcrypt.hashSync('password123', 10),
        phone: '+1234567892',
        role: 'Voter',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('User', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
