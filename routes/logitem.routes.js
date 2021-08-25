module.exports = app => {
  const logitemController = require("../controllers/logitem.controller.js");

  // Create a new Log Item
  //app.post("/customers", logitemController.create);

  // Retrieve all Log Item
  app.get("/logitems", logitemController.findAll);

  // Retrieve a single Log Item with logitemId
  app.get("/logitems/:logitemId", logitemController.findOne);

  // Update a Log Item with logitemId
  //app.put("/customers/:customerId", logitemController.update);

  // Delete a Log Item with logItemId
  //app.delete("/customers/:customerId", logitemController.delete);

  // Create a new Log Item
  //app.delete("/customers", logitemController.deleteAll);
};
