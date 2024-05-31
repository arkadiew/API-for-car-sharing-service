const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    carId: { type: DataTypes.INTEGER, allowNull: false },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Booking;
