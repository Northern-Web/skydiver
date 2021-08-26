const express = require("express");
const app     = express();
const mysql   = require("mysql");
const config   = require('./config/config.js');
const bodyParser = require("body-parser");


app.use(bodyParser.json());



app.get("/", (req, res, next) => {
/*  connection.query("SELECT * FROM logbook", (err, rows) => {
    if (err) throw err;
    console.log("Data from the logbook table are:\n", rows);
    connection.end();
  })*/
});

require("./routes/logitem.routes.js")(app);
require("./routes/user.routes.js")(app);


app.listen(process.env.PORT || 3000, () => {
/*  const connection = mysql.createConnection({
    host:     global.gConfig.database_host,
    user:     global.gConfig.database_user,
    password: global.gConfig.database_password,
    database: global.gConfig.database
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log(`Server booting in \"${global.gConfig.config_id}\" mode...`)
    console.log(`Succsessful connection to MySql database \"${global.gConfig.database}\"`);
  });*/
  console.log(`Server booting in \"${global.gConfig.config_id}\" mode...`)
  console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
})
