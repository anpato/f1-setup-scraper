const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { app_secret, salt_rounds } = require('../env')
const crypto = require('crypto')
module.exports = {
  verifyOrigin: (req, res, next) => {
    if (!req.headers.referer && req.headers.referer !== 'http://localhost:8080')
      return res.status(403).json({ msg: 'Unauthorized' })
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  },
  verifyPassword: async (iP, cP) => await bcrypt.compare(iP, cP),
  getToken: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    this.verifyToken(token)
    res.locals.token = token

    next()
  },
  hashPassword: async (uP) => await bcrypt.hash(uP, salt_rounds),
  verifyToken: (token) => {
    return jwt.verify(token, app_secret)
  },
  assignToken: (payload) => jwt.sign(payload, app_secret, { expiresIn: '4h' }),
  genAuthToken: () => crypto.randomBytes(20).toString('hex'),
  verifyActive: (user) => user.isActive
}
