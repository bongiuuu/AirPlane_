'use strict';

const Promise = require('bluebird');
const Sequelize = require('sequelize');
const config = require('config')
// const logger = require('../shared/logger')('shared:data:db');
//const uuid = require('uuid');
const fs = require('fs');
let sequelize = null;

class Db {
    constructor() {
        console.log('constructor start');
        if (!sequelize) {
            console.log('creating singleton instance');
            console.log(`new instance of sequelize with config - dbname: ${config.db.dbname} - username: ${config.db.username} - dialect: ${config.db.options.dialect}`);

            let dialectOptions = config.db.options.dialectOptions || {};
            dialectOptions = {
                useUTC: false, //for reading from database
                dateStrings: true,
                typeCast: function (field, next) { // for reading from database
                    if (field.type === 'DATE') {
                        return field.string()
                    }
                    return next()
                }
            }
            if (config.db.ssl !== undefined) {
                let ssl = {
                    ca: fs.readFileSync(config.db.ssl.ca),
                    cert: fs.readFileSync(config.db.ssl.cert),
                    key: fs.readFileSync(config.db.ssl.key)
                }
                dialectOptions['ssl'] = ssl;
            }
            if (config.db.socketPath !== undefined && config.db.socketPath !== '') {
                dialectOptions['socketPath'] = config.db.socketPath;
            }
            let options = config.db.options;
            options['dialectOptions'] = dialectOptions;
            console.log('connection config', options);

            sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, options);
        }
    }

    connect() {
        console.log('connect start');
        let connectPromise = sequelize.authenticate()
            .then(() => {
                console.log('sequelize authenticated');
                return sequelize.sync({ force: config.recreateDB })
                    .then(() => {
                        console.log('sequelize synced');
                        return sequelize;
                    })
            }).catch((error) => {
                throw error;
            })
        this.initModels();
        return connectPromise;
    }

    get sequelize() {

        return sequelize;
    }

    //merge the properties from models into this Db object
    initModels() {
        console.log('initialize models');
        // this.cars = sequelize.import('./cars');
        // this.reservation = sequelize.import('./reservation')
        this.model = sequelize.import('./model')
        this.plane = sequelize.import('./plane')
        this.plane_test = sequelize.import('./plane_test')
        this.technician = sequelize.import('./technician')
        this.tech_model = sequelize.import('./tech_model')
        this.test = sequelize.import('./test')

        // this.cars.belongsTo(this.user, { as: 'user', foreignKey: 'userId' })
        // this.user.hasMany(this.cars, { as: 'cars', foreignKey: 'userId' })

        this.plane.hasMany(this.plane_test, { as: 'plane_test', foreignKey: 'registrationNo'})
        this.plane_test.belongsTo(this.plane, { as: 'plane', foreignKey: 'registrationNo' })

        this.test.hasMany(this.plane_test, { as: 'plane_test', foreignKey: 'faaNo'})
        this.plane_test.belongsTo(this.test, { as: 'test', foreignKey: 'faaNo'})

        this.technician.hasMany(this.tech_model, { as: 'tech_model', foreignKey: 'techId'})
        this.tech_model.belongsTo(this.technician, { as: 'technician', foreignKey: 'techId'})

        this.model.hasMany(this.tech_model, { as: 'tech_model', foreignKey: 'modelNo'})
        this.tech_model.belongsTo(this.model, { as: 'model', foreignKey: 'modelNo'})
      
        this.model.hasMany(this.plane, { as: 'plane', foreignKey: 'modelNo'})
        this.plane.belongsTo(this.model, { as: 'model', foreignKey: 'modelNo'})


    }

    initData() {
    }
}

module.exports = new Db();
