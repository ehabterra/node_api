'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
  
      Example:
    */
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('users',
        {
          id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          firstname: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: false,
          },
          lastname: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: false,
          },
          username: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: false,
            unique: true
          },
          email: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: false,
            unique: true
          },
          role: {
            type: new Sequelize.DataTypes.STRING(100),
            allowNull: false,
          },
          password: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: false
          },
          createdAt: {
            field: 'createdAt',
            type: Sequelize.DATE,
          },
          updatedAt: {
            field: 'updatedAt',
            type: Sequelize.DATE,
          },
        })

      await queryInterface.createTable('restaurants',
        {
          id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: false
          },
          website: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: true,
          },
          email: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: true,
          },
          latitude: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: true,
          },
          longitude: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: true,
          },
          createdAt: {
            field: 'createdAt',
            type: Sequelize.DATE,
          },
          updatedAt: {
            field: 'updatedAt',
            type: Sequelize.DATE,
          },
        })

      await queryInterface.createTable('menuitems',
        {
          id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          item: {
            type: new Sequelize.DataTypes.STRING(250),
            allowNull: false
          },
          price: {
            type: Sequelize.DataTypes.DOUBLE.UNSIGNED,
            allowNull: true,
          },
          description: {
            type: new Sequelize.DataTypes.STRING(500),
            allowNull: true,
          },
          category: {
            type: Sequelize.DataTypes.STRING(500),
            allowNull: true,
          },
          restaurantId: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
              model: {
                tableName: 'restaurants',
                // schema: 'schema'
              },
              key: 'id'
            }
          },
          createdAt: {
            field: 'createdAt',
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
          },
          updatedAt: {
            field: 'updatedAt',
            type: Sequelize.DATE,
          },
        })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err;
    }

  },
  async down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
  
      Example:
    */

    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('users');
      await queryInterface.dropTable('menuitems');
      await queryInterface.dropTable('restaurants');

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};