module.exports = musiker => {
    const instruments = require("../controllers/instrument.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Musiker
    router.post("/", instruments.create);

    // Update a Musiker with id
    router.put("/:id", instruments.update);

    // Delete a Musiker with id
    router.delete("/:id", instruments.delete);

    // Retrieve all Musiker
    router.get("/", instruments.findAll);
  
    musiker.use('/api/instrument', router);
  };