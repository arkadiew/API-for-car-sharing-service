const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();
const authJwt = require('../middlewares/authJwt');

router.get('/car', [authJwt.verifyToken], carController.findAll);
router.post('/car',[authJwt.verifyToken], carController.create);
router.put('/:id',[authJwt.verifyToken], carController.update);
router.delete('/:id',[authJwt.verifyToken], carController.delete);
router.get('/locations/:longitude/:latitude/cars' ,[authJwt.verifyToken],carController.findAvailableByLocation);

module.exports = router;
