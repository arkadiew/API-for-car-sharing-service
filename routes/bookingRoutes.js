const express = require('express');
const bookingController = require('../controllers/bookingController.js');
const authJwt = require('../middlewares/authJwt');
const router = express.Router();

router.post('/', [authJwt.verifyToken], bookingController.createBooking);


module.exports = router;
