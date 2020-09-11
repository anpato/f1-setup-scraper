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
      Setup.belongsTo(models.Team, {
        foreignKey: 'team_id',
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
      raceMode: {
        type: DataTypes.ENUM(['Grand Prix', 'Time Trial']),
        allowNull: false,
        field: 'race_mode'
      },
      lapTime: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'lap_time'
      },
      frontWing: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'front_wing'
      },
      rearWing: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'rear_wing'
      },
      differentialAdjustmentOnThrottle: {
        type: DataTypes.INTEGER,
        validate: {
          min: 50,
          max: 100
        },
        allowNull: false,
        get: (v) => `${v}%`,
        field: 'differential_adjustment_on_throttle'
      },
      differentialAdjustmentOffThrottle: {
        type: DataTypes.INTEGER,
        validate: {
          min: 50,
          max: 100
        },
        allowNull: false,
        get: (v) => `${v}%`,
        field: 'differential_adjustment_off_throttle'
      },
      frontCamber: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
          min: -1.5,
          max: -2.5
        },
        allowNull: false,
        field: 'front_camber'
      },
      rearCamber: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
          min: -1.5,
          max: -2.5
        },
        allowNull: false,
        field: 'rear_camber'
      },
      frontToe: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
          min: 0,
          max: 1
        },
        allowNull: false,
        field: 'front_toe'
      },
      rearToe: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
          min: 0,
          max: 1
        },
        allowNull: false,
        field: 'rear_toe'
      },
      frontSuspension: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'front_suspension'
      },
      rearSuspension: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'rear_suspension'
      },
      frontAntiRollBar: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'front_anti_roll_bar'
      },
      rearAntiRollBar: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'rear_anti_roll_bar'
      },
      frontRideHeight: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'front_ride_height'
      },
      rearRideHeight: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'rear_ride_height'
      },
      brakePressure: {
        type: DataTypes.INTEGER,
        validate: {
          min: 50,
          max: 100
        },
        allowNull: false,
        get: (v) => `${v}%`,
        field: 'brake_pressure'
      },
      frontBrakeBias: {
        type: DataTypes.INTEGER,
        validate: {
          min: 50,
          max: 100
        },
        allowNull: false,
        get: (v) => `${v}%`,
        field: 'front_brake_bias'
      },
      frontRightTyrePressure: {
        type: DataTypes.DECIMAL(10, 1),
        validate: {
          min: 21.0,
          max: 25.0
        },
        allowNull: false,
        get: (v) => `${v} psi`,
        field: 'front_right_tyre_pressure'
      },
      frontLeftTyrePressure: {
        type: DataTypes.DECIMAL(10, 1),
        validate: {
          min: 21.0,
          max: 25.0
        },
        allowNull: false,
        get: (v) => `${v} psi`,
        field: 'front_left_tyre_pressure'
      },
      rearRightTyrePressure: {
        type: DataTypes.DECIMAL(10, 1),
        validate: {
          min: 19.5,
          max: 23.5
        },
        allowNull: false,
        get: (v) => `${v} psi`,
        field: 'rear_right_tyre_pressure'
      },
      rearLeftTyrePressure: {
        type: DataTypes.DECIMAL(10, 1),
        validate: {
          min: 19.5,
          max: 23.5
        },
        allowNull: false,
        get: (v) => `${v} psi`,
        field: 'rear_left_tyre_pressure'
      },
      conditions: {
        type: DataTypes.ENUM(['wet', 'dry']),
        allowNull: false,
        field: 'conditions'
      },
      gpId: {
        field: 'gp_id',
        references: {
          model: 'grand_prixes',
          key: 'id'
        },
        type: DataTypes.UUID
      },
      teamId: {
        field: 'team_id',
        references: {
          model: 'teams',
          key: 'id'
        },
        allowNull: true,
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
