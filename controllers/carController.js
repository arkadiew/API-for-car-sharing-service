const Car = require('../models/car');
const { Op } = require('sequelize');
const Location = require('../models/location');









exports.findAvailableByLocation = async (req, res) => {
    try {
        const { longitude, latitude } = req.params;

        if (!longitude || !latitude) {
            return res.status(400).json({ message: 'Longitude and latitude are required.' });
        }

        // console.log('Received coordinates:', { longitude, latitude });

        const long = parseFloat(longitude);
        const lat = parseFloat(latitude);

        // console.log('Parsed coordinates:', { long, lat });
        const range = 0.001;
        const allLocations = await Location.findAll();
        // console.log('All locations:', JSON.stringify(allLocations, null, 2));

        const location = await Location.findOne({
            where: {
                longitude: { [Op.between]: [long - range, long + range] },
                latitude: { [Op.between]: [lat - range, lat + range] }
            }
        });

        if (!location) {
            return res.status(404).json({ message: 'Location not found for the given coordinates.' });
        }

        // console.log('Found location:', location);

        const cars = await Car.findAll({ where: { location_id: location.id } });

        // console.log('Found cars:', cars);

        res.json({
            longitude: location.longitude,
            latitude: location.latitude,
            cars: cars
        });
    } catch (error) {
        console.error('Error:', error);
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
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ error: 'Location not found' });
        }
        await car.update(req.body);
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        car.status = 'repair';
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};