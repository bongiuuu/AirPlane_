'use strict';
const reservationSchema = require('./plane.schema');
const eservationClassMethods = require('./plane.classMethods');

class Reservation {
    getDefinition(sequelize, DataTypes) {
        let schema = reservationSchema.getSchema(DataTypes);
        let options = { freezeTableName: true, timestamps: false };
        let model = sequelize.define('plane', schema, options);
        eservationClassMethods.getClassMethods(model);
        return model;
    }
}

module.exports = (sequelize, DataTypes) => {
    let cars = new Reservation();
    return cars.getDefinition(sequelize, DataTypes);
}