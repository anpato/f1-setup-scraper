const ProfileController = require('../controllers/ProfileController')
const Router = require('express').Router()

Router.post('/favorites/add', ProfileController.favoriteSetup)
Router.get('/favorites/list', ProfileController.getFavorites)
Router.put('/update/:user_id', ProfileController.updateProfile)
Router.delete('/favorites/remove', ProfileController.removeFavorite)
module.exports = {
  path: '/profile',
  Router
}
