const sequelize = require('../config/database');
const Car = require('./car');
const ImgCar = require('./img_car');
const Payment = require('./payment');
const User = require('./user');
const Location = require('./location');
const Booking = require('./booking');


ImgCar.belongsTo(Car, { foreignKey: 'car_id' });
Car.hasMany(ImgCar, { foreignKey: 'car_id' });

Payment.belongsTo(Booking, { foreignKey: 'bookingId' });
Booking.hasMany(Payment, { foreignKey: 'bookingId' });

Booking.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'userId' });

Booking.belongsTo(Car, { foreignKey: 'carId' });
Car.hasMany(Booking, { foreignKey: 'carId' });

Location.belongsTo(Car, { foreignKey: 'car_id' });
Car.hasMany(Location, { foreignKey: 'car_id' });

module.exports = {
    sequelize,
    Car,
    ImgCar,
    Payment,
    User,
    Location,
    Booking,
};
