const sql = require("./db.js");

// Constructor
const Dropzone = function (dropzone) {
  this.dzid         = dropzone.dzid;
  this.name         = dropzone.name;
  this.country      = dropzone.country;
  this.country_code = dropzone.country_code;
  this.latitude     = dropzone.latitude;
  this.longitude    = dropzone.longitude;
  this.address      = dropzone.address;
  this.city         = dropzone.city;
  this.zipcode      = dropzone.zipcode;
  this.website      = dropzone.website;
  this.phone        = dropzone.phone;
  this.email        = dropzone.email;
};

Dropzone.getAll = (result) => {
  sql.query("SELECT * FROM dropzones ORDER BY name ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("dropzone items: ", res);
    result(null, res);
  });
};

Dropzone.findByCode = (countryCode, result) => {
  sql.query(`SELECT * FROM dropzones WHERE country_code = "${countryCode}" ORDER BY name ASC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("dropzones: ", res);
    result(null, res);
  });
};

module.exports = Dropzone;
