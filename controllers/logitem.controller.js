const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.json');
const LogItem = require("../models/logitem.model.js");
const crypto  = require("crypto");

exports.create = async (req, res) => {
  LogItem.countCurrentJumps(req.userData.userid, (err, currentJumps) => {

    // Create a Logbook item
    const logItem = new LogItem({
      jumpid:             crypto.randomBytes(16).toString("hex"),
      jumpdate:           new Date(req.body.jumpdate),
      jumpnum:            currentJumps + 1,
      aircraft:           req.body.aircraft,
      country_code:       req.body.country_code,
      dropzone:           req.body.dropzone,
      canopy:             req.body.canopy,
      altitude:           req.body.altitude,
      freefalltime:       req.body.freefalltime,
      jumptype:           req.body.jumptype,
      emergencyprocedure: req.body.emergencyprocedure,
      twin:               req.body.twin,
      description:        req.body.description,
      instructor:         req.body.instructor,
      remark:             req.body.remark,
      license:            req.body.license,
      approved:           req.body.approved,
      owner:              req.userData.userid
    });

    // Save LogItem in the database
    LogItem.create(logItem, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Log Item."
        });
      else res.send(data);
    });
  });
}

// Retrieve all Logitems from the database.
exports.findAll = (req, res) => {
  const OWNER = req.params.userid;
  LogItem.getAll(OWNER, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving log items."
    });
  else res.send(data);
});
};

exports.findAnonymousLogItems = (req, res) => {
  LogItem.getAnonymousLogItems((err, data) => {
    if (err) {
      res.status(500).send({
        message: 'Error retreiving log items.'
      });
    } else {
      res.send(data);
    }
  });
}

// Find a single Log Item with a logItemId
exports.findOne = (req, res) => {
  LogItem.findById(req.params.logitemId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Log Item with id ${req.params.logitemId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Log Item with id " + req.params.logitemId
        });
      }
    } else res.send(data);
  });
};



/*exports.getDashboardStatistics = (req, res) => {
  const OWNER = req.userData.userid;
};*/
