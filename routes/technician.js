const handler = require('../core/handler/teachnician.handler');
const cResponse = require('../response/response');
var express = require('express')
var router = express.Router()
var multer = require("multer");
var path = require("path")
class Product {
    productRoutes() {
      
        router.route('/').post((req, res, next) => {
            let query = req.query
            return handler.add(req).then((product) => {
                cResponse.ok(res, product)
            }).catch((error) => {
                cResponse.fail(res, error.message)
            })
        });


        router.route('/').get((req, res, next) => {
            let query = req.query
            return handler.getAll(query).then((product) => {
                cResponse.ok(res, product)
            }).catch((error) => {
                cResponse.fail(res, error.message)
            })
        });


        return router;
    }
}
const productRoutes = new Product();
module.exports = productRoutes.productRoutes();