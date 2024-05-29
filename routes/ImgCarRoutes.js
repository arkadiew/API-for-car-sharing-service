const express = require('express');
const router = express.Router();
const imgCarController = require('../controllers/ImgCarController');
const authJwt = require('../middlewares/authJwt');
router.post('/imgcars', [authJwt.verifyToken],  imgCarController.createImgCar);
router.get('/imgcars', [authJwt.verifyToken],  imgCarController.findAllImgCars);
router.get('/imgcars/:img_id', [authJwt.verifyToken],  imgCarController.findImgCarById);
router.put('/imgcars/:img_id', [authJwt.verifyToken],  imgCarController.updateImgCar);
router.delete('/imgcars/:img_id', [authJwt.verifyToken], imgCarController.deleteImgCar);

module.exports = router;
