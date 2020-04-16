// module.exports = (sequelize, Sequelize) => {
//     const Musiker = sequelize.define("musiker", {
//       name: {
//           type: Sequelize.STRING
//       }
//     }),
//     Instrument = sequelize.define("musiker", {
//         name: {
//             type: Sequelize.STRING
//         }
//     });
    
//     Musiker.belongsTo(Instrument);
      
//     Instrument.hasMany(Musiker, {
//         foreignKey: 'instrumentid'
//     });

//     return Musiker;
//   };

'use strict';
module.exports = (sequelize, DataTypes) => {
    var Musiker = sequelize.define('Musiker', {
        title: DataTypes.STRING,
        instrumentid: {
            type: DataTypes.INTEGER,
            references: {model: sequelize.models.Instrument, key: 'id'}
        }
    });

    Musiker.associate = function (models) {
        models.Musiker.belongsTo(models.Instrument, {
            as: 'Instrument',
            foreignKey: 'instrumentid'
        });
    };

    return Musiker;
};