'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('setups', 'team_id', {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: 'teams',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('setups', 'team_id')
  }
}
