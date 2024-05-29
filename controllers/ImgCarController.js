const { ImgCar } = require('../models');

// Create a new ImgCar
exports.createImgCar = async (req, res) => {
    try {
        const imgCar = await ImgCar.create(req.body);
        res.status(201).json(imgCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.findAllImgCars = async (req, res) => {
    try {
        const imgCars = await ImgCar.findAll();
        res.status(200).json(imgCars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.findImgCarById = async (req, res) => {
    try {
        const imgCar = await ImgCar.findByPk(req.params.img_id);
        if (!imgCar) {
            return res.status(404).json({ message: 'ImgCar not found' });
        }
        res.status(200).json(imgCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateImgCar = async (req, res) => {
    try {
        const imgCar = await ImgCar.findByPk(req.params.img_id);
        if (!imgCar) {
            return res.status(404).json({ message: 'ImgCar not found' });
        }
        await imgCar.update(req.body);
        res.status(200).json(imgCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteImgCar = async (req, res) => {
    try {
        const imgCar = await ImgCar.findByPk(req.params.img_id);
        if (!imgCar) {
            return res.status(404).json({ message: 'ImgCar not found' });
        }
        await imgCar.destroy();
        res.status(204).json({ message: 'ImgCar deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
