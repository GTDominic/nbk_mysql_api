module.exports = (sequelize, Sequelize) => {
  const Auftritte = sequelize.define("auftritte", {
    name: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    start: {
      type: Sequelize.DATE
    },
    end: {
      type: Sequelize.DATE
    }
  });

  return Auftritte;
};