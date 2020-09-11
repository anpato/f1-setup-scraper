const { Team } = require('../db/models')
module.exports = {
  getTeams: async (req, res) => {
    try {
      const teams = await Team.findAll()
      return teams
    } catch (error) {
      return error
    }
  }
}
