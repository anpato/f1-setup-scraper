'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      teamName: {
        type: DataTypes.STRING,
        field: 'team_name'
      },
      teamCar: {
        type: DataTypes.TEXT,
        field: 'team_car'
      },
      teamColor: {
        type: DataTypes.STRING,
        field: 'team_color'
      },
      teamLogo: {
        type: DataTypes.TEXT,
        field: 'team_logo'
      }
    },
    {
      sequelize,
      modelName: 'Team',
      tableName: 'teams'
    }
  )
  return Team
}
