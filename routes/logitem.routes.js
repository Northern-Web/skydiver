module.exports = app => {
  const logitemController = require("../controllers/logitem.controller.js");

  // Create a new Log Item
  //app.post("/api/logitems", logitemController.create);

  // Retrieve all Log Item
  app.get("/api/logitems", logitemController.findAll);

  // Retrieve a single Log Item with logitemId
  app.get("/api/logitems/:logitemId", logitemController.findOne);

  // Update a Log Item with logitemId
  //app.put("/api/logitems/:logitemId", logitemController.update);

  // Delete a Log Item with logitemId
  //app.delete("/api/logitems/:logitemId", logitemController.delete);
};
