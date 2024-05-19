const Car = require('../models/car');
const { Op } = require('sequelize');


exports.findAvailableByLocation = async (req, res) => {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ message: "Latitude, longitude, and radius are required" });
    }

    try {
        const cars = await Car.findAll({
            where: {
                available: true,
                [Op.and]: [
                    Car.sequelize.literal(
                        `ST_Distance_Sphere(POINT(longitude, latitude), POINT(${longitude}, ${latitude})) <= ${radius}`
                    )
                ]
            }
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
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