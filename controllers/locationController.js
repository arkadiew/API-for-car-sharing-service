
const Location = require('../models/location');
const Car = require('../models/car');


exports.findAll = async (req, res) => {
    try {
        const cars = await Location.findAll();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const car = await Location.create(req.body);
        res.status(201).json(car);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        await location.update(req.body);
        res.status(200).json(location);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

