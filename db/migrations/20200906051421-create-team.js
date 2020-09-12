'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      teamName: {
        type: Sequelize.STRING,
        unique: true,
        field: 'team_name'
      },
      teamCar: {
        type: Sequelize.TEXT,
        field: 'team_car'
      },
      teamColor: {
        type: Sequelize.STRING,
        field: 'team_color'
      },
      teamLogo: {
        type: Sequelize.TEXT,
        field: 'team_logo'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams')
  }
}
