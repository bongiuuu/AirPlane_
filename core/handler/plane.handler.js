const db = require('../../db')
// const moment = require('moment')
const _ = require('lodash')



class CategoryHandler {
  async getAll(query) {

    let fromDate = query.fromDate;
    let toDate = query.toDate;
    const conditions = {}
  
    let { limit, page, key, tags } = query
    let options = {}
    let tagsWhere = {}
    options.where = {}
    limit = limit ? Number(limit) : 3
    page = page ? Number(page) : 0
    let offset = limit * page

    
    if (fromDate && !toDate) {
      conditions.createdDate = { $gte: fromDate } 
    } else if (!fromDate && toDate) {
      toDate =   moment.tz(toDate + ' 23:59', 'Asia/Ho_Chi_Minh')
      conditions.createdDate = { $lte: toDate } 
    } else if (fromDate && toDate) {
      fromDate = moment.tz(fromDate + ' 00:00', 'Asia/Ho_Chi_Minh')
      toDate =   moment.tz(toDate + ' 23:59', 'Asia/Ho_Chi_Minh')
      conditions.createdDate = { $and: [{ $gte: fromDate }, { $lte: toDate }] }
    }
   
    options.where = {
      isDeleted: 0,
      ...conditions
    }

    if (key) {
      let $or = [
          { nameVn: { $like: `%${key}%` } },
          { nameEn: { $like: `%${key}%` } },
          { desVn: { $like: `%${key}%` } },
          { desEn: { $like: `%${key}%` } }
      ]
      options.where.$or = $or
    }

    options.offset = offset
    options.limit = limit
    options.subQuery = false
    options.order = [['priority', 'desc']]

    try {

      let products = await db.category.findAndCountAll(options)
      let total = products.count
      let pages = Math.ceil(total / limit);

      return {
        total: total,
        pages,
        products: products.rows
    }
  
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

    if(!body.registrationNo) {
      throw new Error("registrationNo can not be null")
    }

    if(!body.modelNo) {
      throw new Error("modelNo can not be null")
    }
 
    let t = await db.sequelize.transaction()
    try {

      let checkModelNo = await db.model.findOne({ where : { modelNo : body.modelNo }}) 
      if(!checkModelNo) {
        throw new Error("Model not exist")
      }

      let checkPlane = await db.plane.findOne({ where : { registrationNo : body.registrationNo }}) 
      if(checkPlane) {
        throw new Error("Plan exist")
      }

      let plane = await db.plane.create(body,{ transaction : t })

      t.commit()
      return body
    } catch (error) {
      t.rollback()
      console.log(error)
      throw error
    }
  }


 
}

module.exports = new CategoryHandler()