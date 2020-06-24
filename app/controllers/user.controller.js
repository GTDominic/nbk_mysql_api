const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bCrypt = require('bcrypt-nodejs');

// Signup a new user
exports.signup = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    return;
    }

    var username = req.body.username;
    var email = req.body.email;

    // Check if username is in use
    // User.findOne({
    //   where: {username: username}
    // }).then(data => {
    //   userver = data;
    // }).catch(err => {});

    // Check if email is in use
    // User.findByPk(id)
    //   .then(data => {
    //     res.send("I'm here!");
    //   }).catch(err => {});

    // if(userver == false){
    //   res.status(400).send({
    //     message: "Username already in use!"
    //   })
    //   return;
    // }
    // if(emailver == false){
    //   res.status(400).send({
    //     message: "Email already in use!"
    //   })
    //   return;
    // }

    const emailver = User.findOne({where: { email: email } });

    if(emailver === null){}else{
      res.send("Email already in use!");
      return;
    }
    
    // hashing password
    var hashedPassword = bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null);

    // Create a User
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });  
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

// Find a single User with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     User.findByPk(id)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving User with id=" + id
//         });
//       });
//   };

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };

// Find all published Users
exports.findAllPublished = (req, res) => {
    User.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };
