module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "testnbk",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  forceSync: false,     //Enable dropping and creating tables. Should be deactivated if not in testing.
  musikerEditing: true,
  instrumentEditing: true
};