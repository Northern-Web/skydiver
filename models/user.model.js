const sql = require("./db.js");

// Constructor
const User = function (user) {
  this.userid       = user.userid;
  this.name         = user.name;
  this.email        = user.email;
  this.password     = user.password;
  this.isactive     = user.isactive;
  this.created      = user.created;
  this.lastlogin    = user.lastlogin;
};

User.create = async (newUser, result) => {
  /*if (await sql.query("SELECT * FROM users WHERE email = ?", newUser.email)) {
      console.log("User already exists.");
      result(null, { "message": "User already exists." });
      return;
  }*/

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

User.findById = (userId, result) => {
  sql.query("SELECT * FROM users WHERE id = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByEmail = (userEmail, result) => {
  sql.query("SELECT * FROM users WHERE email = ?", userEmail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (result.length < 1) {
      console.log("Username or password is incorrect!");
      result(err, null);
    }

    console.log("found user: ", res[0]);
    result(null, res[0]);
    return;
  });
}

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, email = ?, password = ?, isactive = ?, created = ?, lastlogin = ? WHERE userid = ?",
    [user.name, user.email, user.password, user.isactive, user.created, user.lastlogin, id],
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    });
}


module.exports = User;
