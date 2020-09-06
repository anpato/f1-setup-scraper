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
      raceMode: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'race_mode'
      },
      lapTime: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'lap_time'
      },
      frontWing: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'front_wing'
      },
      rearWing: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'rear_wing'
      },
      differentialAdjustmentOnThrottle: {
        type: Sequelize.INTEGER,
        validate: {
          min: 50,
          max: 100
        },
        allowNull: false,
        get: (v) => `${v}%`,
        field: 'differential_adjustment_on_throttle'
      },
      differentialAdjustmentOffThrottle: {
        type: Sequelize.INTEGER,
        validate: {
          min: 50,
          max: 100
        },
        allowNull: false,
        get: (v) => `${v}%`,
        field: 'differential_adjustment_off_throttle'
      },
      frontCamber: {
        type: Sequelize.DECIMAL(10, 2),
        validate: {
          min: 1.5,
          max: 2.5
        },
        allowNull: false,
        get: (v) => `-${v}`,
        field: 'front_camber'
      },
      rearCamber: {
        type: Sequelize.DECIMAL(10, 2),
        validate: {
          min: 1.5,
          max: 2.5
        },
        allowNull: false,
        get: (v) => `-${v}`,
        field: 'rear_camber'
      },
      frontToe: {
        type: Sequelize.DECIMAL(10, 2),
        validate: {
          min: 1.5,
          max: 2.5
        },
        allowNull: false,
        get: (v) => `-${v}`,
        field: 'front_toe'
      },
      rearToe: {
        type: Sequelize.DECIMAL(10, 2),
        validate: {
          min: 1.5,
          max: 2.5
        },
        allowNull: false,
        get: (v) => `-${v}`,
        field: 'rear_toe'
      },
      frontSuspension: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'front_suspension'
      },
      rearSuspension: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'rear_suspension'
      },
      frontAntiRollBar: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'front_anti_roll_bar'
      },
      rearAntiRollBar: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'rear_anti_roll_bar'
      },
      frontRideHeight: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'front_ride_height'
      },
      rearRideHeight: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 10
        },
        allowNull: false,
        field: 'rear_ride_height'
      },
      brakePressure: {
        type: Sequelize.INTEGER,
        validate: {
          min: 50,
          max: 100
        },
        allowNull: false,
        get: (v) => `${v}%`,
        field: 'brake_pressure'
      },
      frontBrakeBias: {
        type: Sequelize.INTEGER,
        validate: {
          min: 50,
          max: 100
        },
        allowNull: false,
        get: (v) => `${v}%`,
        field: 'front_brake_bias'
      },
      frontRightTyrePressure: {
        type: Sequelize.DECIMAL(10, 1),
        validate: {
          min: 21.0,
          max: 25.0
        },
        allowNull: false,
        get: (v) => `${v} psi`,
        field: 'front_right_tyre_pressure'
      },
      frontLeftTyrePressure: {
        type: Sequelize.DECIMAL(10, 1),
        validate: {
          min: 21.0,
          max: 25.0
        },
        allowNull: false,
        get: (v) => `${v} psi`,
        field: 'front_left_tyre_pressure'
      },
      rearRightTyrePressure: {
        type: Sequelize.DECIMAL(10, 1),
        validate: {
          min: 19.5,
          max: 23.5
        },
        allowNull: false,
        get: (v) => `${v} psi`,
        field: 'rear_right_tyre_pressure'
      },
      rearLeftTyrePressure: {
        type: Sequelize.DECIMAL(10, 1),
        validate: {
          min: 19.5,
          max: 23.5
        },
        allowNull: false,
        get: (v) => `${v} psi`,
        field: 'rear_left_tyre_pressure'
      },
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
