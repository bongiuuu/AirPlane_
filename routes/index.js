const modelRouter = require('./model');
const planeRouter = require('./plane');
const technicianRouter = require('./technician');
const testRouter = require('./test');
const config = require('config');
const apiRoutes = require('express').Router();

class RouterIndex {

    constructor(app) {
        this.app = app
    }

    registerRoutes() {
        this.app.use(config.router_root, apiRoutes)
        apiRoutes.use('/model', modelRouter)
        apiRoutes.use('/plane', planeRouter)
        apiRoutes.use('/technician', technicianRouter)
        apiRoutes.use('/test', testRouter)
    }

}

module.exports = (app) => { return new RouterIndex(app) }