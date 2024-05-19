const Car = require('../models/car');

exports.getAvailableCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cars', error });
  }
};
