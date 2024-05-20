const  User  = require('../models/User');

checkDuplicateUsernameOrEmail = (req, res, next) => {


    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        return res.status(400).send({
          message: "Failed! Email is already in use!"
        });
      }

      next();
    });

};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
