const authorize = require("../_middleware/authorize.js");

module.exports = app => {
  const homeController = require("../controllers/home.controller.js");

  app.get("/", homeController.getIndexPage);
  app.get("/dashboard", authorize, homeController.getDashboardPage);



};
