'use strict';
const bannerSchema = require('./technician.schema');
const bannerClassMethods = require('./technician.classMethods');

class Banner {
    getDefinition(sequelize, DataTypes) {
        let schema = bannerSchema.getSchema(DataTypes);
        let options = { freezeTableName: true, timestamps: false };
        let model = sequelize.define('technician', schema, options);
        bannerClassMethods.getClassMethods(model);
        return model;
    }
}

module.exports = (sequelize, DataTypes) => {
    let banner = new Banner();
    return banner.getDefinition(sequelize, DataTypes);
}