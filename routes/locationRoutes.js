const express = require('express');
const locationController = require('../controllers/locationController');
const router = express.Router();
const authJwt = require('../middlewares/authJwt');

router.get('/location', [authJwt.verifyToken], locationController.findAll);
router.post('/location',[authJwt.verifyToken], locationController.create);
router.put('/location/:id',[authJwt.verifyToken], locationController.update);
router.delete('/location/:id',[authJwt.verifyToken], locationController.delete);


module.exports = router;
