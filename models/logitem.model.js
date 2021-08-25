const sql = require("./db.js");

// Constructor
const LogItem = function (logitem) {
  this.jumpid       = logitem.jumpid;
  this.jumpdate     = logitem.jumpdate;
  this.aircraft     = logitem.aircraft;
  this.dropzone     = logitem.dropzone;
  this.canopy       = logitem.canopy;
  this.altitude     = logitem.altitude;
  this.freefalltime = logitem.freefalltime;
  this.jumptype     = logitem.jumptype;
  this.description  = logitem.description;
  this.instructor   = logitem.instructor;
  this.remark       = logitem.remark;
  this.license      = logitem.license;
  this.approved     = logitem.approved;

};

LogItem.create = (newLogItem, result) => {
  sql.query("INSERT INTO logbook SET ?", newLogItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
}


LogItem.findById = (logItemId, result) => {
  sql.query(`SELECT * FROM logbook WHERE jumpid = ${logItemId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found log item: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Log Item with the id
    result({ kind: "not_found" }, null);
  });
};

LogItem.getAll = result => {
  sql.query("SELECT * FROM logbook", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("log items: ", res);
    result(null, res);
  });
};

module.exports = LogItem;
