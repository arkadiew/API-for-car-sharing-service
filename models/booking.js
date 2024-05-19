const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Car = require('./Car');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    carId: {
        type: DataTypes.INTEGER,
        references: {
            model: Car,
            key: 'id'
        }
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

User.hasMany(Booking, { foreignKey: 'userId' });
Car.hasMany(Booking, { foreignKey: 'carId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Car, { foreignKey: 'carId' });

module.exports = Booking;
