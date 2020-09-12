'use strict'
const GetCars = require('../../utils/getCars')
const { Team } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const teams = await GetCars()
    return await Team.bulkCreate(teams, { ignoreDuplicates: true })
  },

  down: async (queryInterface, Sequelize) => {
    return await Team.bulkDelete({}, null)
  }
}
