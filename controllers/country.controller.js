const Country = require("../models/country.model.js");

// Retrieve all countries from the database.
exports.findAll = (req, res) => {
  Country.getAll( (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving log items."
    });
  else res.send(data);
});
};
