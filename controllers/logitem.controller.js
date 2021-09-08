const LogItem = require("../models/logitem.model.js");
const crypto  = require("crypto");

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const currentJumps = await LogItem.countCurrentJumps(req.body.owner);

  res.send("Retur: " + currentJumps);

  /*// Create a Customer
  const logItem = new LogItem({
    jumpid: crypto.randomBytes(16).toString("hex"),
    jumpdate: new Date(),
    active: req.body.active
  });

// Save Customer in the database
Customer.create(customer, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Customer."
    });
  else res.send(data);
});*/
}

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const OWNER = req.userData.userid;
  console.log(OWNER);
  LogItem.getAll(OWNER, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving log items."
    });
  else res.send(data);
});
};

// Find a single Log Item with a logItemId
exports.findOne = (req, res) => {
  LogItem.findById(req.params.logitemId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Log Item with id ${req.params.logitemId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Log Item with id " + req.params.logitemId
        });
      }
    } else res.send(data);
  });
};
