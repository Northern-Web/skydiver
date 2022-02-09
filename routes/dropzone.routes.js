const authorize = require("../_middleware/authorize.js");

module.exports = app => {
  const dropzoneController = require("../controllers/dropzone.controller.js");

  // Retrieve all dropzones
  app.get("/api/dropzones/:countryCode", dropzoneController.findByCode);

};
