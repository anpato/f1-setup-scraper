'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Setup, { as: 'author', foreignKey: 'author_id' })
      User.belongsToMany(models.Setup, {
        as: 'favorites',
        through: 'user_favorites',
        foreignKey: 'user_id'
      })
    }
  }
  /**
   * TODO: Add User Display Name:{unique}
   */
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      displayName: {
        type: DataTypes.STRING,
        unique: true,
        field: 'display_name'
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_digest'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_active'
      },
      signUpToken: {
        type: DataTypes.STRING,
        field: 'sign_up_token'
      },
      tokenExpiry: {
        type: DataTypes.DATE,
        defaultValue: new Date(new Date() + 360000),
        allowNull: true,
        field: 'token_expiry'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
