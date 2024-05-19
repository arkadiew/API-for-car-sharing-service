const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();
const authJwt = require('../middlewares/authJwt');
router.get('/available', [authJwt.verifyToken], carController.getAvailableCars);

module.exports = router;
