'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('setup_types', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      setupType: {
        type: Sequelize.STRING,
        field: 'setup_type'
      },
      url: {
        type: Sequelize.TEXT,
        unqiue: true
      },
      gpId: {
        field: 'gp_id',
        references: {
          model: 'grand_prixes',
          key: 'id'
        },
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('setup_types')
  }
}
