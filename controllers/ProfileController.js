const { User, Setup, UserFavorite, GrandPrix, Team } = require('../db/models')

module.exports = {
  getProfile: async ({ query }, res, next) => {
    try {
      const profile = await User.findByPk(query.user, {
        include: [
          { model: Setup, as: 'authored', include: [GrandPrix, Team] },
          { model: Setup, as: 'favorites' }
        ]
      })
      res.send(profile)
    } catch (error) {
      throw error
    }
  },
  favoriteSetup: async ({ query }, res, next) => {
    try {
      const favorite = await UserFavorite.create({
        userId: query.user,
        setupId: query.setup
      })
      res.send(favorite)
    } catch (error) {
      throw error
    }
  },
  getFavorites: async ({ query }, res, next) => {
    try {
      const profile = await User.findByPk(query.user, {
        attributes: ['id', 'is_active', 'name'],
        include: [
          {
            model: Setup,
            as: 'favorites',
            attributes: { exclude: ['gpId', 'gp_id', 'teamId', 'team_id'] },
            through: { attributes: [] },
            include: [GrandPrix, Team]
          }
        ]
      })
      res.send(profile)
    } catch (error) {
      throw error
    }
  },
  removeFavorite: async ({ query }, res, next) => {
    try {
      await UserFavorite.destroy({
        where: { userId: query.user, setupId: query.setup }
      })
      res.json({ msg: 'Remove From Favorites' })
    } catch (error) {
      throw error
    }
  },
  updateProfile: async ({ params, body }, res, next) => {
    try {
      const user = await User.update(body, {
        where: { id: params.user_id },
        returning: true,
        raw: true
      })
      res.send(user[1][0])
    } catch (error) {
      throw error
    }
  }
}
