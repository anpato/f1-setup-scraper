'use strict'
const Setups = require('../../utils/SimSetup')
const { Setup } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const setups = await Setups()
    return await Setup.bulkCreate(setups, { ignoreDuplicates: true })
  },

  down: async (queryInterface, Sequelize) => {
    return await Setup.bulkDelete({}, null)
  }
}
