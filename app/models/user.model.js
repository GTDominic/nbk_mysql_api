module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM('user','event','admin'),
      defaultValue: 'user'
    },
    salt: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    last_login: {
      type: Sequelize.DATE
    }
  });

  return User;
};