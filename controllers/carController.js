const Car = require('../models/car');
const { Op } = require('sequelize');
const Location = require('../models/location');

exports.findAvailableByLocation = async (req, res) => {
    try {
        const ipAddress = req.params.ip;  // Получаем IP-адрес из параметров URL
        
        const location = await Location.findOne({ where: { ip_address: ipAddress } });
        if (!location) {
            return res.status(404).json({ message: 'Location not found for the given IP address.' });
        }

        const cars = await Car.findAll({ where: { location_id: location.id } });
        
        res.json({
            city: location.city,
            cars: cars
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cars', error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json(car);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByPk(id, req.body, { new: true });
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
      const car = await Car.findByPk(id);
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      await car.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};