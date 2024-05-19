const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Booking = require('./booking');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookingId: {
        type: DataTypes.INTEGER,
        references: {
            model: Booking,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Booking.hasMany(Payment, { foreignKey: 'bookingId' });
Payment.belongsTo(Booking, { foreignKey: 'bookingId' });

module.exports = Payment;
