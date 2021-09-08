const Logbook = require("../models/logitem.model.js");

exports.getIndexPage = (req, res) => {
  res.status(200).render('home/index', {
    pageTitle: 'Skydiver',
    path: '/'
  });
};

exports.getDashboardPage = async (req, res) => {
  Logbook.countCurrentJumps(req.userData.userid, (err, currentJumps) => {

  res.status(200).render("home/dashboard", {
    pageTitle: "Skydiving Logbook",
    path: "/dashboard",
    username: req.userData.name,
    totalJumps: currentJumps
  });
});
}
