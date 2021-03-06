'use strict';
module.exports = (sequelize, DataTypes) => {
    var Musiker = sequelize.define('Musiker', {
        name: DataTypes.STRING,
        instrumentid: {
            type: DataTypes.INTEGER,
            references: {model: sequelize.models.Instrument, key: 'id'}
        },
        vorstandtype1: DataTypes.INTEGER,
        vorstandtype2: DataTypes.INTEGER
    });

    Musiker.associate = function (models) {
        models.Musiker.belongsTo(models.Instrument, {
            as: 'Instrument',
            foreignKey: 'instrumentid'
        });
    };

    return Musiker;
};