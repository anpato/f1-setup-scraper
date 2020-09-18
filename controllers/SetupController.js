const { Op } = require('sequelize')
const { Setup, Team, UserFavorite, User } = require('../db/models')
module.exports = {
  getSetups: async (req, res) => {
    try {
      const { query, value, conditions } = req.query
      const setups = await Setup.findAll({
        where: conditions
          ? { [Op.and]: [{ [query]: value }, { conditions }] }
          : { [query]: value },
        attributes: ['id', 'lapTime', 'raceMode', 'conditions'],
        include: [{ model: Team }]
      })
      res.send(setups)
    } catch (error) {
      throw error
    }
  },
  getSetupById: async (req, res) => {
    try {
      const setup = await Setup.findByPk(req.params.setup_id, {
        attributes: {
          exclude: ['gp_id', 'gpId', 'updatedAt', 'team_id', 'teamId']
        },
        include: [{ model: User, as: 'author', attributes: ['displayName'] }],
        raw: false
      })
      res.send(setup)
    } catch (error) {
      throw error
    }
  }
}
