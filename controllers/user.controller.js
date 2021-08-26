const User = require("../models/user.model.js");
const crypto = require("crypto");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const IS_ACTIVE = true;

  // Create a User
  const user = new User({
    userid: crypto.randomBytes(16).toString("hex"),
    name:     req.body.name,
    email:    req.body.email,
    password: "test",
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
