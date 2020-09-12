const fs = require('fs')
const path = require('path')
const Router = require('express').Router()

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && path.extname(file) === '.js')
  .forEach((f) => {
    let route = require(`${__dirname}/${f}`)
    Router.use(route.path, route.Router)
  })

module.exports = Router
