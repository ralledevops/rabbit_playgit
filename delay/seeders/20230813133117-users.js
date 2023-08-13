'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password', 10);

    const demoUsers = [
      { firstName: 'John',  lastName: 'Doe',     email: 'john.doe@example.com' },
      { firstName: 'Jane',  lastName: 'Smith',   email: 'jane.smith@example.com' },
      { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
      { firstName: 'Bob',   lastName: 'Brown',   email: 'bob.brown@example.com' },
      { firstName: 'Chris', lastName: 'White',   email: 'chris.white@example.com' },
      { firstName: 'David', lastName: 'Black',   email: 'david.black@example.com' },
      { firstName: 'Eva',   lastName: 'Green',   email: 'eva.green@example.com' },
      { firstName: 'Frank', lastName: 'Blue',    email: 'frank.blue@example.com' },
      { firstName: 'Grace', lastName: 'Gray',    email: 'grace.gray@example.com' },
      { firstName: 'Henry', lastName: 'Adams',   email: 'henry.adams@example.com' }
    ].map(user => ({
      ...user,
      password: hashedPassword,
      birthDate: new Date('1990-01-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('users', demoUsers);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
