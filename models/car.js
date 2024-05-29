const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Location = require('./location');

const Car = sequelize.define('Car', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pricePerDay: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Location,
            key: 'id'
        }
    }
}, {
    tableName: 'cars',
    timestamps: false
});

module.exports = Car;