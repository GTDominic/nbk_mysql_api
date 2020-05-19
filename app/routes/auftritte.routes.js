module.exports = auftritte => {
    const auftrittes = require("../controllers/auftritte.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Musiker
    router.post("/", auftrittes.create);

    // Update a Musiker with id
    router.put("/:id", auftrittes.update);

    // Delete a Musiker with id
    router.delete("/:id", auftrittes.delete);

    // Retrieve all Musiker
    router.get("/", auftrittes.findAll);
  
    auftritte.use('/api/auftritte', router);
  };