const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Car = require('./car');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    carId: {
        type: DataTypes.INTEGER,
        references: {
            model: Car,
            key: 'id'
        },
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
});


User.hasMany(Booking, { foreignKey: 'userId' });
Car.hasMany(Booking, { foreignKey: 'carId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Car, { foreignKey: 'carId' });

module.exports = Booking;
