const express = require('express');
const paymentController = require('../controllers/paymentController');
const authJwt = require('../middlewares/authJwt');
const router = express.Router();

router.post('/', [authJwt.verifyToken], paymentController.create);
router.put('/process/:paymentId', [authJwt.verifyToken], paymentController.processPayment);
router.put('/cancel/:paymentcancelId', [authJwt.verifyToken], paymentController.cancel);

module.exports = router;
