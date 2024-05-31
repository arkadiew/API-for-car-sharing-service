const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Car = sequelize.define('Car', {
    car_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    pricePerDay: DataTypes.FLOAT,
    color: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    mileage: DataTypes.INTEGER,
    transmission_type: DataTypes.STRING,
    fuel_type: DataTypes.STRING,
    number_of_seats: DataTypes.INTEGER,
    license_plate: DataTypes.STRING,
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "ready" },
});

module.exports = Car;
