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