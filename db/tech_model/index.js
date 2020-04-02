'use strict';
const categorySchema = require('./tech_model.schema');
const categoryClassMethods = require('./tech_model.classMethods');

class Category {
    getDefinition(sequelize, DataTypes) {
        let schema = categorySchema.getSchema(DataTypes);
        let options = { freezeTableName: true, timestamps: false };
        let model = sequelize.define('tech_model', schema, options);
        categoryClassMethods.getClassMethods(model);
        return model;
    }
}

module.exports = (sequelize, DataTypes) => {
    let category = new Category();
    return category.getDefinition(sequelize, DataTypes);
}