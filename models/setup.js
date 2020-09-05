'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Setup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Setup.belongsTo(models.GrandPrix, {
        foreignKey: 'gp_id',
        onDelete: 'CASCADE'
      })
      Setup.belongsTo(models.SetupType, {
        foreignKey: 'type_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Setup.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      data: {
        type: DataTypes.JSON,
        unique: true
      },
      gpId: {
        field: 'gp_id',
        references: {
          model: 'grand_prixes',
          key: 'id'
        },
        type: DataTypes.UUID
      },
      typeId: {
        field: 'type_id',
        references: {
          model: 'setup_types',
          key: 'id'
        },
        type: DataTypes.UUID
      }
    },
    {
      sequelize,
      modelName: 'Setup',
      tableName: 'setups',
      freezeTableName: true
    }
  )
  return Setup
}
