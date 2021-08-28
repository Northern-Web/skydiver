module.exports = app => {
  const userController = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/api/users", userController.create);

  // Retrieve all User
  //app.get("/api/users", userController.findAll);

  // Retrieve a single User with userid
  app.get("/api/users/:userid", userController.findOne);

  // Update a User with userid
  //app.put("/api/users/:userid", userController.update);

  // Delete a User Item with userid
  //app.delete("/api/users/:userid", userController.delete);

  // Authenticate User
  app.post("/api/users/authenticate", userController.login);
};
