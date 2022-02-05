const sql = require("./db.js");

// Constructor
const Country = function (country) {
  this.country_id   = country.country_id;
  this.country_name = country.country_name;
  this.country_code = country.country_code;
};

Country.getAll = (result) => {
  sql.query("SELECT * FROM countries ORDER BY country_name ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("country items: ", res);
    result(null, res);
  });
};

module.exports = Country;
