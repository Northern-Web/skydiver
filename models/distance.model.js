const sql = require("./db.js");

const Distance = function (distance) {
  this.distanceid = distance.distanceid;
  this.name       = distance.name;
  this.distance   = distance.distance;
}

Distance.create = (newDistance, result) => {
  sql.query("INSERT INTO distances SET ?", newDistance, (err, res) => {
    if (err){
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created distance: ", { id: res.insertId, ...newDistance });
    result(null, { id: res.insertId, ...newDistance });
  });
}

Distance.findByName = (distanceName, result) => {
  sql.query(`SELECT * FROM distances WHERE name = "${distanceName}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found distance item: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Log Item with the id
    result({ kind: "not_found" }, null);
  });
}

Distance.getAll = (result) => {
  sql.query("SELECT * FROM distances", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("distance items: ", res);
    result(null, res);
  });
};

module.exports = Distance;
