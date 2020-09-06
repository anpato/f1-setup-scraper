'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class GrandPrix extends Model {
    static associate(models) {
      GrandPrix.hasMany(models.SetupType, { foreignKey: 'gp_id' })
    }
  }
  GrandPrix.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'GrandPrix',
      tableName: 'grand_prixes',
      freezeTableName: true
    }
  )
  return GrandPrix
}
