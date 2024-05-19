const express = require('express');
const { createBooking } = require('../controllers/bookingController.js');
const router = express.Router();

router.post('/', createBooking);

module.exports = router;
