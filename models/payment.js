const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

function generateRandomString(n) {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < n; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars[randomIndex];
    }
    return randomString;
}

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bookingId: { type: DataTypes.INTEGER, allowNull: false },
    amount: DataTypes.FLOAT,
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
    transactionId: { type: DataTypes.STRING, allowNull: false, defaultValue: function() {
        return generateRandomString(6);
    }},
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Payment;
