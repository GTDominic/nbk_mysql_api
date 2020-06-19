const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config.js");
const passport = require('passport');
const session = require('express-session');

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.sequelize.sync({ force: dbConfig.forceSync }).then(() => {
    console.log("Re-sync db.");
  });

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API of the Neuleininger Blaskapelle." });
});

// require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/musiker.routes.js")(app);
require("./app/routes/instrument.routes.js")(app);
require("./app/routes/auftritte.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
