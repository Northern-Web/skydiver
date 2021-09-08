const authorize = require("../_middleware/authorize.js");

module.exports = app => {
  const logitemController = require("../controllers/logitem.controller.js");

  // Create a new Log Item
  app.post("/api/logitems", authorize, logitemController.create);

  // Retrieve all Log Item
  app.get("/api/logitems", authorize, logitemController.findAll);

  // Retrieve a single Log Item with logitemId
  app.get("/api/logitems/:logitemId", authorize, logitemController.findOne);

  // Update a Log Item with logitemId
  //app.put("/api/logitems/:logitemId", logitemController.update);

  // Delete a Log Item with logitemId
  //app.delete("/api/logitems/:logitemId", logitemController.delete);
};
