'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.addColumn('setups', 'author_id', {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      }),
      queryInterface.addColumn('users', 'display_name', {
        type: Sequelize.STRING,
        unique: true
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.removeColumn('setups', 'author_id'),
      queryInterface.removeColumn('users', 'display_name')
    ])
  }
}
