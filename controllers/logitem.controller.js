const LogItem = require("../models/logitem.model.js");


// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  LogItem.getAll((err, data) => {
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
