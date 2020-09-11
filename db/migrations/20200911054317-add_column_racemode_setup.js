'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('setups', 'race_mode', {
        type: Sequelize.ENUM(['Grand Prix', 'Time Trial'])
      }),
      queryInterface.addColumn('setups', 'conditions', {
        type: Sequelize.ENUM('wet', 'dry')
      })
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('setups', 'race_mode', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('setups', 'conditions')
    ])
  }
}
