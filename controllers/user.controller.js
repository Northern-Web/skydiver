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
    country:  req.body.country,
    isactive: IS_ACTIVE,
    created:  new Date(),
    logbookShared: 0
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
          message: "E-mail or password is incorrect!",
          status: 500
        });
      } else {
        res.status(500).send({
          message: "An error occured during authentication.",
          status: 500
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
              msg: 'Username or password is incorrect!',
              status: 401
            });
          }

          if (bResult) {
            const token = jwt.sign({
              name:   data.name,
              email:  data.email,
              userid: data.userid
            },
            global.gConfig.web_token_secret, {
              expiresIn: "1h"
            });

            data.lastlogin = new Date();

            User.updateById(data.userid, data, (err, updatedUser) => {
              return res.cookie("access_token", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production"
              }).status(200).send({
                msg: "Authorization Successful",
                status: 200,
                token: token
              });
            });
          } else {
            return res.status(401).send({
              msg: 'Username or password is incorrect!',
              status: 401
            });
          }

        });
      } else {
        return res.status(401).send({
          msg: 'Username or password is incorrect!',
          status: 401
        });
      }

      }
});
}

exports.logout = (req, res) => {
  return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out." });
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

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const user = new User ({
    userid:         req.body.userid,
    name:           req.body.name,
    email:          req.body.email,
    password:       req.body.password,
    country:        req.body.country,
    isactive:       req.body.isactive,
    created:        req.body.created,
    logbookShared:  req.body.logbookShared,
    lastlogin:      req.body.lastlogin
  });

  User.updateById(req.body.userid, user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
}
