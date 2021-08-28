const User   = require("../models/user.model.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const config = require("../config/config.js");
const jwt    = require("jsonwebtoken");

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const IS_ACTIVE = true;
  const SALT_ROUNDS = 10;

  // Create a User
  const user = new User({
    userid:   crypto.randomBytes(16).toString("hex"),
    name:     req.body.name,
    email:    req.body.email,
    password: await bcrypt.hash(req.body.password, SALT_ROUNDS),
    isactive: IS_ACTIVE,
    created:  new Date()
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.login = (req, res) => {
  User.findByEmail(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "E-mail or password is incorrect!"
        });
      } else {
        res.status(500).send({
          message: "An error occured during authentication."
        });
      }

    } else {
      // Check if data object exists
      if (data) {
     // Check password
     bcrypt.compare(req.body.password, data.password, (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }

          if (bResult) {
            const token = jwt.sign({
              username: data.username,
              userId: data.userid
            },
            global.gConfig.web_token_secret, {
              expiresIn: '1d'
            });

            data.lastlogin = new Date();

            User.updateById(data.userid, data, (err, updatedUser) => {
              return res.status(200).send({
                msg: "Authorization Successful",
                token
              });
            });
          } else {
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }

        });
      } else {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }

      }
});
}


// Find a single Log Item with a logItemId
exports.findOne = (req, res) => {
  User.findById(req.params.userid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.logitemId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.logitemId
        });
      }
    } else res.send(data);
  });
};
