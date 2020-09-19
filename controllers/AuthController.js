const { User } = require('../db/models')
const {
  hashPassword,
  assignToken,
  verifyPassword,
  genAuthToken,
  verifyActive,
  verifyToken,
  decodeToken
} = require('../middleware')

module.exports = {
  login: async ({ body }, res) => {
    try {
      const user = await User.findOne({
        where: { email: body.email },
        raw: true
      })
      if (
        user &&
        (await verifyPassword(body.password, user.passwordDigest)) &&
        verifyActive(user)
      ) {
        const { id, displayName } = user
        const token = assignToken({ id, displayName })
        return res.send({
          token,
          user: { name: user.name, id: user.id }
        })
      }
      res.status(401).json({ msg: 'Unauthorized' })
    } catch (error) {
      throw error
    }
  },
  register: async ({ body }, res) => {
    try {
      const { name, email, password, displayName } = body
      const passwordDigest = await hashPassword(password)
      const firstToken = genAuthToken()
      await User.create({
        name,
        email,
        displayName,
        passwordDigest,
        signUpToken: firstToken
      })
      res.status(201).json({ msg: 'Profile Created' })
    } catch (error) {
      throw error
    }
  },
  verifyAccount: async ({ query }, res) => {
    try {
      const { token, id } = query
      if (!token && !id) return res.status(401).json({ msg: 'Unauthorized' })
      const user = await User.findOne({
        where: { id: id, signUpToken: token }
      })

      if (user && user.dataValues.tokenExpiry <= new Date(Date.now())) {
        await user.update({
          tokenExpiry: null,
          signUpToken: null,
          isActive: true
        })
        return res.json({ msg: 'Account Verified' })
      }
      res.status(401).json({ msg: 'Unauthorized' })
    } catch (error) {
      throw error
    }
  },
  verifyTokenValid: async (req, res, next) => {
    try {
      res.locals.token
      if (verifyToken(res.locals.token)) {
        const user = decodeToken(res.locals.token)
        return res.send({ msg: 'Token Valid', user })
      }
      return res.status(401).json({ msg: 'Unauthorized' })
    } catch (error) {
      res.status(401).json({ msg: 'Unauthorized' })
    }
  }
}
