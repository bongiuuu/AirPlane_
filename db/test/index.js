'use strict';
const bannerSchema = require('./test.schema');
const bannerClassMethods = require('./test.classMethods');

class Banner {
    getDefinition(sequelize, DataTypes) {
        let schema = bannerSchema.getSchema(DataTypes);
        let options = { freezeTableName: true, timestamps: false };
        let model = sequelize.define('test', schema, options);
        bannerClassMethods.getClassMethods(model);
        return model;
    }
}

module.exports = (sequelize, DataTypes) => {
    let banner = new Banner();
    return banner.getDefinition(sequelize, DataTypes);
}