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