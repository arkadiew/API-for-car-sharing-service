const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authJwt = require("../middleware/authJwt");
const jwt = require('jsonwebtoken');


console.log('auth:'+authJwt)
router.put('/user/:id',[authJwt.verifyToken], userController.updateUser);
router.delete('/user/:id',[authJwt.verifyToken], userController.deleteUser);
router.get('/user', userController.findAll);
router.get('/user/:username', userController.findUsersByUsername);


router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});



router.get("/api/test/all", userController.allAccess);
router.get("/api/test/user", [authJwt.verifyToken], userController.userBoard);

module.exports = router;
