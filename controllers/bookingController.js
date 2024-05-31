
const Booking = require('../models/booking');
const Car = require('../models/car');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.body;
        const token =  req.headers["x-access-token"];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET,); 
        const userId = decodedToken.userId;

        const car = await Car.findByPk(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const booking = await Booking.create({ carId, userId, startDate, endDate });
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.cancel = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        booking.status = 'cancelled';
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
