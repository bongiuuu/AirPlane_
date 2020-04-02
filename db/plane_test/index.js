'use strict';
const cartitemSchema = require('./plane_test.schema');
const cartitemClassMethods = require('./plane_test.classMethods');

class CartItem {
    getDefinition(sequelize, DataTypes) {
        let schema = cartitemSchema.getSchema(DataTypes);
        let options = { freezeTableName: true, timestamps: false };
        let model = sequelize.define('plane_test', schema, options);
        cartitemClassMethods.getClassMethods(model);
        return model;
    }
}

module.exports = (sequelize, DataTypes) => {
    let cartitem = new CartItem();
    return cartitem.getDefinition(sequelize, DataTypes);
}