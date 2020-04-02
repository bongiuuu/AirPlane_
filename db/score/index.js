'use strict';
const cartSchema = require('./score.schema');
const cartClassMethods = require('./score.classMethods');

class Cart {
    getDefinition(sequelize, DataTypes) {
        let schema = cartSchema.getSchema(DataTypes);
        let options = { freezeTableName: true, timestamps: false };
        let model = sequelize.define('score', schema, options);
        cartClassMethods.getClassMethods(model);
        return model;
    }
}

module.exports = (sequelize, DataTypes) => {
    let cart = new Cart();
    return cart.getDefinition(sequelize, DataTypes);
}