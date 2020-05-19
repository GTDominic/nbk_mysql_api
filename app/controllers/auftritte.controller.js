const db = require("../models");
const Auftritte = db.auftritte;
const dbConfig = require("../config/db.config.js");
// const Op = db.Sequelize.Op;

// Creates a new Auftritte
/* Standard form:
{
    "name": "",
    "location": "",
    "start": "",
    "end": ""
}
*/
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name || !req.body.location || !req.body.start || !req.body.end) {
        res.status(400).send({
            message: "Name/Location/Start/End can not be empty!"
        });
        return;
    }

    // Create a Auftritte
    const auftritte = {
        name: req.body.name,
        location: req.body.location,
        start: req.body.start,
        end: req.body.end
    };

    // Save Auftritte in the database
    Auftritte.create(auftritte)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Auftritte."
            });
        });
};

exports.update = (req, res) => {

    const id = req.params.id;
  
    Auftritte.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Auftritte was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update Auftritte with id=${id}. Maybe Auftritte was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Auftritte with id=" + id
        });
    });
};

// Delete a Auftritte with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;
  
    Auftritte.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "Auftritte was deleted successfully!"
          });
        } else {
          res.status(400).send({
            message: `Cannot delete Auftritte with id=${id}. Maybe Auftritte was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Auftritte with id=" + id
        });
      });
  };

  // Retrieve all Auftrittes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Auftritte.findAll({ where: condition })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Auftrittes."
        });
      });
  };