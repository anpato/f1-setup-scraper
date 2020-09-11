'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.addColumn('grand_prixes', 'location', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('grand_prixes', 'location_flag', {
        type: Sequelize.TEXT
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.removeColumn('grand_prixes', 'location'),
      queryInterface.removeColumn('grand_prixes', 'location_flag')
    ])
  }
}
