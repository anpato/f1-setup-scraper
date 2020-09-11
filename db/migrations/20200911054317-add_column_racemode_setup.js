'use strict'
const { Setup } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('setups', 'race_mode').then(() => {
      return Promise.all([
        queryInterface.addColumn('setups', 'race_mode', {
          type: Sequelize.ENUM(['Grand Prix', 'Time Trial'])
        }),
        queryInterface.addColumn('setups', 'conditions', {
          type: Sequelize.ENUM(['wet', 'dry'])
        })
      ])
    })
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('setups', 'conditions'),
      queryInterface.changeColumn('setups', 'race_mode', {
        type: Sequelize.STRING
      })
    ])
  }
}
