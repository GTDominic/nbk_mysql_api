const db = require("../models");
const Musiker = db.musiker;
const dbConfig = require("../config/db.config.js");
// const Op = db.Sequelize.Op;

// Creates a new Musiker
/* Standard form:
{
    "name": "",
    "instrumentid": ""
}
*/
exports.create = (req, res) => {
    // Check if create function is deactivated in config
    if(dbConfig.musikerEditing == false){
        res.status(405).send({
            message: "Editing and deleting of Musikers deactivated in config."
        });
        return;
    }

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }

    // Create a Musiker
    const musiker = {
        name: req.body.name,
        instrumentid: req.body.instrumentid
    };

    // Save Musiker in the database
    Musiker.create(musiker)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Musiker."
            });
        });
};

exports.update = (req, res) => {
    // Check if update function is deactivated in config
    if(dbConfig.musikerEditing == false){
        res.status(405).send({
            message: "Editing and deleting of Musikers deactivated in config."
        });
        return;
    }

    const id = req.params.id;
  
    Musiker.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Musiker was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update Musiker with id=${id}. Maybe Musiker was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Musiker with id=" + id
        });
    });
};

// Delete a Musiker with the specified id in the request
exports.delete = (req, res) => {
    // Check if update function is deactivated in config
    if(dbConfig.musikerEditing == false){
        res.status(405).send({
            message: "Editing and deleting of Musikers deactivated in config."
        });
        return;
    }
    
    const id = req.params.id;
  
    Musiker.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "Musiker was deleted successfully!"
          });
        } else {
          res.status(400).send({
            message: `Cannot delete Musiker with id=${id}. Maybe Musiker was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Musiker with id=" + id
        });
      });
  };

  // Retrieve all Musikers from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Musiker.findAll({ where: condition })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Musikers."
        });
      });
  };