const { GrandPrix, Setup, Team } = require('../db/models')
const { Op } = require('sequelize')
module.exports = {
  getTracks: async (req, res) => {
    try {
      const tracks = await GrandPrix.findAll({ order: [['name', 'ASC']] })
      res.send(tracks)
    } catch (error) {
      throw error
    }
  },
  getTrackById: async (req, res) => {
    try {
      const track = await GrandPrix.findByPk(req.params.track_id)
      res.send(track)
    } catch (error) {
      throw error
    }
  },
  listSetups: async (req, res) => {
    try {
      const { query, value } = req.query
      const setups = await Setup.findAll({
        where: { [query]: value },
        attributes: ['id', 'lapTime', 'raceMode', 'conditions'],
        include: [{ model: Team }]
      })
      res.send(setups)
    } catch (error) {
      throw error
    }
  }
}
