const express = require('express');
const paymentController = require('../controllers/paymentController');
const authJwt = require('../middlewares/authJwt');
const router = express.Router();

router.post('/', [authJwt.verifyToken], paymentController.createPayment);


module.exports = router;
