module.exports = musiker => {
    const musikers = require("../controllers/musiker.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Musiker
    router.post("/", musikers.create);
  
    musiker.use('/api/musiker', router);
  };