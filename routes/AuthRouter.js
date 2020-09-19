const AuthController = require('../controllers/AuthController')
const { getToken } = require('../middleware')
const Router = require('express').Router()

Router.post('/login', AuthController.login)
Router.post('/register', AuthController.register)
Router.post('/verify/activate', AuthController.verifyAccount)
Router.post('/token/validate', getToken, AuthController.verifyTokenValid)

module.exports = { path: '/auth', Router }
