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

    console.log("created logbook: ", { id: res.insertId, ...newLogItem });
    result(null, { id: res.insertId, ...newLogItem });
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

LogItem.updateById = (id, logitem, result) => {
  sql.query(
    "UPDATE logbook SET jumpdate = ?, aircraft = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

LogItem.countCurrentJumps = async (userId, result) => {
  const count = await sql.query(`SELECT COUNT(*) AS jumpCount FROM logbook WHERE owner = ?`, userId);
  return count.jumpCount;
}

module.exports = LogItem;
