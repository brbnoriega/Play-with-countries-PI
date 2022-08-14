const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  
  sequelize.define(
    'activity',
    {
      id: {
        
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
          max: 5,
          min: 1
      }
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )
}