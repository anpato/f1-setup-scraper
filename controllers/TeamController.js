const { Team } = require('../db/models')

module.exports = {
  getTeams: async (req, res) => {
    try {
      const teams = await Team.findAll()
      res.send(teams)
    } catch (error) {
      throw error
    }
  },
  getTeamById: async (req, res) => {
    try {
      const team = await Team.findByPk(req.params.team_id)
      res.send(team)
    } catch (error) {
      throw error
    }
  }
}
