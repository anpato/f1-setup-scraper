'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFavorite.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }
  UserFavorite.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      setupId: {
        type: DataTypes.UUID,
        field: 'setup_id',
        references: {
          model: 'setups',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'UserFavorite',
      tableName: 'user_favorites'
    }
  )
  return UserFavorite
}
