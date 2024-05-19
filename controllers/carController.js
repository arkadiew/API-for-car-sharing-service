const Car = require('../models/Car');

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error: error.message });
    }
};
