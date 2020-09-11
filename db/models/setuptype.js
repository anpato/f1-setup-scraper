'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class SetupType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SetupType.belongsTo(models.GrandPrix, {
        foreignKey: 'gp_id',
        onDelete: 'CASCADE'
      })
    }
  }
  SetupType.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      setupType: {
        type: DataTypes.ENUM(['wet', 'dry']),
        field: 'setup_type'
      },
      gpId: {
        field: 'gp_id',
        references: {
          model: 'grand_prixes',
          key: 'id'
        },
        type: DataTypes.UUID
      }
    },
    {
      sequelize,
      modelName: 'SetupType',
      tableName: 'setup_types',
      freezeTableName: true
    }
  )
  return SetupType
}
