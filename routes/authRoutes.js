const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const verifySignUp = require('../middlewares/verifySignUp');
router.post('/register',[
    verifySignUp.checkDuplicateUsernameOrEmail,

  ], authController.register);
router.post('/login',  authController.login);

module.exports = router;
