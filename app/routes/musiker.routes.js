module.exports = musiker => {
    const musikers = require("../controllers/musiker.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Musiker
    router.post("/", musikers.create);

    // Update a Musiker with id
    router.put("/:id", musikers.update);

    // Delete a Musiker with id
    router.delete("/:id", musikers.delete);

    // Retrieve all Musiker
    router.get("/", musikers.findAll);
  
    musiker.use('/api/musiker', router);
  };