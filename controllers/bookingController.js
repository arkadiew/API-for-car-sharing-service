const Booking = require('../models/booking');
const Car = require('../models/car');

exports.createBooking = async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;

    try {
        const car = await Car.findByPk(carId);
        const durationInDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        const totalPrice = car.pricePerDay * durationInDays;

        const booking = await Booking.create({ userId, carId, startDate, endDate, totalPrice });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};
