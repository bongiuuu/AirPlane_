'use strict';

const db = require('../../db')
const Op = require('sequelize')
const moment = require('moment')
const _ = require('lodash')




class ProductHandler {

  async getAll(query) {

    try {

      let products = await db.technician.findAndCountAll({
        attributes: ['name','phone' , 'address', 'salary' ],
        include: [{
          attributes: ['id'],
          model: db.tech_model,
          required: true, // when tech_model not null
          as: 'tech_model',
          include: [{
            attributes: ['modelNo','capacity','weight'],
            model: db.model,
            required: false, // when model not null
            as: 'model', 
            include: [{
              attributes: ['registrationNo'],
              model: db.plane,
              required: false, // when model not null
              as: 'plane',
              
            }
  
            ]
            
          }

          ]
        }]
      })

      return products.rows

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async add(req) {

    if (Object.keys(req.body).length === 0) {
      throw new Error("Body can not be Empty")
    }

    const body = req.body

    if (!body.name) {
      throw new Error("name can not be null")
    }

    if (!body.phone) {
      throw new Error("phone can not be null")
    }

    if (!body.address) {
      throw new Error("address can not be null")
    }

    if (!body.salary) {
      throw new Error("salary can not be null")
    }

    let t = await db.sequelize.transaction()

    try {
      await db.technician.create(body, { transaction: t })
      t.commit()
      return body
    } catch (error) {
      t.rollback()
      console.log(error)
      throw error
    }
  }
}

module.exports = new ProductHandler()