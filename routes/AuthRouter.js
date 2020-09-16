const AuthController = require('../controllers/AuthController')
const Router = require('express').Router()

Router.post('/login', AuthController.login)
Router.post('/register', AuthController.register)
Router.post('/verify/activate', AuthController.verifyAccount)

module.exports = { path: '/auth', Router }
