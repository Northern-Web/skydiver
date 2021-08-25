const mysql = require("mysql");
const dbConfig = require("../config/config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host:     global.gConfig.database_host,
  user:     global.gConfig.database_user,
  password: global.gConfig.database_password,
  database: global.gConfig.database
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
