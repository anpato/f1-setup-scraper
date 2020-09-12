const TeamController = require('../controllers/TeamController')

const Router = require('express').Router()

Router.get('/', TeamController.getTeams)
Router.get('/info/:team_id', TeamController.getTeamById)

module.exports = {
  path: '/teams',
  Router
}
