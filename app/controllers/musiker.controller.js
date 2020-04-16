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