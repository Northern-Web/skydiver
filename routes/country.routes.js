const authorize = require("../_middleware/authorize.js");

module.exports = app => {
  const countryController = require("../controllers/country.controller.js");

  // Retrieve all Log Item
  app.get("/api/countries", authorize, countryController.findAll);

};
