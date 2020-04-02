'use strict';
const carsSchema = require('./model.schema');
const carsClassMethods = require('./model.classMethods');

class Cars {
    getDefinition(sequelize, DataTypes) {
        let schema = carsSchema.getSchema(DataTypes);
        let options = { freezeTableName: true, timestamps: false };
        let model = sequelize.define('model', schema, options);
        carsClassMethods.getClassMethods(model);
        return model;
    }
}

module.exports = (sequelize, DataTypes) => {
    let cars = new Cars();
    return cars.getDefinition(sequelize, DataTypes);
}