'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('setups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      data: { type: Sequelize.JSONB, unique: true },
      gpId: {
        field: 'gp_id',
        references: {
          model: 'grand_prixes',
          key: 'id'
        },
        type: Sequelize.UUID
      },
      typeId: {
        field: 'type_id',
        references: {
          model: 'setup_types',
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
    await queryInterface.dropTable('setups')
  }
}
