const handler = require('../core/handler/model.handler');
const cResponse = require('../response/response');
var express = require('express')
var router = express.Router()


class Cars {
    carsRoutes() {
        router.route('/listAll').get((req, res, next) => {
            let query = req.query
            return handler.listAll(query).then((cars) => {
                cResponse.ok(res, cars)
            }).catch((error) => {
                cResponse.fail(res, error.message)
            })
        });

        router.route('/').post((req, res, next) => {
            let query = req.query
            return handler.add(req).then((cars) => {
                cResponse.ok(res, cars)
            }).catch((error) => {
                cResponse.fail(res, error.message)
            })
        });

        router.route('/').get((req, res, next) => {
            let query = req.query
            return handler.listAll(query).then((cars) => {
                cResponse.ok(res, cars)
            }).catch((error) => {
                cResponse.fail(res, error.message)
            })
        });


        return router;
    }
}
const carsRoutes = new Cars();
module.exports = carsRoutes.carsRoutes();