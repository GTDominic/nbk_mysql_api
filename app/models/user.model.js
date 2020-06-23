module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rank: {
        type: Sequelize.ENUM('Admin', 'Event', 'User'),
        defaultValue: 'User'
      },
      last_login: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    });
  
    return User;
  };