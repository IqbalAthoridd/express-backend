const db = require('../helpers/db')
const { categorySchema } = require('../helpers/validation_schema')

const { getCategorModel, createCategoryModel } = require('../models/category')

module.exports = {
  createCategory: async (req, res) => {
    try {
      const data = await categorySchema.validateAsync(req.body)

      createCategoryModel(data, result => {
        if (result.affectedRows > 0) {
          res.send({
            success: true,
            message: 'data created',
            data: data
          })
        } else {
          res.send({
            success: false,
            message: 'Internal Server Error'
          })
        }
      })
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  },
  getCategoryById: (req, res) => {
    const { id } = req.params

    getCategorModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: 'Category data',
          data: result
        })
      } else {
        res.send({
          success: false,
          message: `Data with id ${id} does't exist`
        })
      }
    })
  }
}
