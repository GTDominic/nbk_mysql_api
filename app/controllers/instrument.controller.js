const db = require("../models");
const Instrument = db.instrument;
const dbConfig = require("../config/db.config.js");
// const Op = db.Sequelize.Op;

// Creates a new Instrument
/* Standard form:
{
    "name": ""
}
*/
exports.create = (req, res) => {
    // Check if create function is deactivated in config
    if(dbConfig.instrumentEditing == false){
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

    // Create a Instrument
    const instrument = {
        name: req.body.name,
        instrumentid: req.body.instrumentid
    };

    // Save Instrument in the database
    Instrument.create(instrument)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Instrument."
            });
        });
};

exports.update = (req, res) => {
    // Check if update function is deactivated in config
    if(dbConfig.instrumentEditing == false){
        res.status(405).send({
            message: "Editing and deleting of Musikers deactivated in config."
        });
        return;
    }

    const id = req.params.id;
  
    Instrument.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Instrument was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update Instrument with id=${id}. Maybe Instrument was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Instrument with id=" + id
        });
    });
};

// Delete a Instrument with the specified id in the request
exports.delete = (req, res) => {
    // Check if update function is deactivated in config
    if(dbConfig.instrumentEditing == false){
        res.status(405).send({
            message: "Editing and deleting of Musikers deactivated in config."
        });
        return;
    }
    
    const id = req.params.id;
  
    Instrument.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "Instrument was deleted successfully!"
          });
        } else {
          res.status(400).send({
            message: `Cannot delete Instrument with id=${id}. Maybe Instrument was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Instrument with id=" + id
        });
      });
  };

  // Retrieve all Musikers from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Instrument.findAll({ where: condition })
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