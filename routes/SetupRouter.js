const SetupController = require('../controllers/SetupController')

const Router = require('express').Router()

Router.get('/', SetupController.getSetups)
Router.get('/view/:setup_id', SetupController.getSetupById)
Router.get('/search', SetupController.getSetups)
module.exports = {
  path: '/setups',
  Router
}
