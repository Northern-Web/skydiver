const sql = require("./db.js");

// Constructor
const User = function (user) {
  this.userid       = user.userid;
  this.name         = user.name;
  this.email        = user.email;
  this.password     = user.password;
  this.isactive     = user.isactive;
  this.created      = user.created;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { ...newUser });
    result(null, { "message": "User was successully created!"});
  });
}


module.exports = User;
