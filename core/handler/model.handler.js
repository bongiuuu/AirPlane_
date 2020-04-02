const db = require('../../db')
// const moment = require('moment')
const _ = require('lodash')



class handler {
  
  async listAll(query) {
    try {
      let cars = await db.model.findAll({
        // attributes: ['id', 'model'],
      })
      return cars
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async add(req) {

    let body = req.body;

    if (Object.keys(body).length === 0) {
      return "Body can not be Empty"
    }

    try {

      let checkModel = await db.model.findOne({ where: { modelNo: body.modelNo } })

      if (checkModel) {
        throw new Error("Model exist !")
      }

      let cartDb = await db.model.create(body)

      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }



}

module.exports = new handler()