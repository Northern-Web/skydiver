const Dropzone = require("../models/dropzone.model.js");

// Retrieve all countries from the database.
exports.findByCode = (req, res) => {
  const countryCode = req.params.countryCode;

  if (!countryCode) {
    res.status(400).send({
      message: "Invalid request!"
    });
  }

  Dropzone.findByCode(countryCode, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving dropzones."
    });
  else res.send(data);
});
};
