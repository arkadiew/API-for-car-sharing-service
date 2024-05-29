const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define('Location', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

}, {
    tableName: 'locations',
    timestamps: false
});

module.exports = Location;
