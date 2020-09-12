const TrackController = require('../controllers/TrackController')

const Router = require('express').Router()

Router.get('/', TrackController.getTracks)
Router.get('/details/:track_id', TrackController.getTrackById)
Router.get('/setups', TrackController.listSetups)
module.exports = {
  path: '/tracks',
  Router
}
