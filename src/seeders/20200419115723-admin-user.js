'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
    npx sequelize-cli db:seed:all

      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
     */
       return queryInterface.bulkInsert('users', [{
        firstname: 'admin',
        lastname: 'admin',
        username: 'admin',
        email: 'admin@admin.com',
        password: 'password',
        role: 'ADMIN'
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
    the most recent:
    npx sequelize-cli db:seed:undo

    npx sequelize-cli db:seed:undo:all

      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('users', null, {});

  }
};
