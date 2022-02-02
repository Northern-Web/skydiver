const Logbook = require("../models/logitem.model.js");

exports.getIndexPage = (req, res) => {
  res.status(200).render('home/index', {
    pageTitle: 'Skydiver',
    path: '/'
  });
};

exports.getDashboardPage = async (req, res) => {
  Logbook.countCurrentJumps(req.userData.userid, (err, currentJumps) => {
    Logbook.getTotalAltitude(req.userData.userid, (err, totalAltitude) => {
      Logbook.getTotalFreefalltime(req.userData.userid, (err, totalFreefalltime) => {
        res.status(200).render("home/dashboard", {
          pageTitle: "Skydiving Logbook",
          path: "/dashboard",
          username: req.userData.name,
          totalJumps: currentJumps,
          totalAltitude: totalAltitude,
          totalFreefalltime: totalFreefalltime
        });
      });
    });
  });
}
