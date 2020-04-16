// module.exports = (sequelize, Sequelize) => {
//     const Instrument = sequelize.define("musiker", {
//       name: {
//           type: Sequelize.STRING
//       }
//     });
    
//     Instrument.hasMany(Musiker, {
//         foreignKey: 'instrumentid'
//     });

//     return Instrument;
//   };

'use strict';
module.exports = (sequelize, DataTypes) => {
    var Instrument = sequelize.define('Instrument', {
        name: DataTypes.STRING
    });

    Instrument.associate = function(models) {
        models.Instrument.hasMany(models.Musiker);
    };

    return Instrument;
};