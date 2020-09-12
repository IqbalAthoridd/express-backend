const qs = require('querystring')

const { categorySchema } = require('../helpers/validation_schema')

const {
  getCategorModel,
  createCategoryModel,
  deleteCategoryModel,
  getAllCategoryModel,
  countGetCategoryModel,
  updateCategoryModel
} = require('../models/category')

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
  getCategory: (req, res) => {
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
  },
  deleteCategory: (req, res) => {
    const { id } = req.params
    deleteCategoryModel(id, result => {
      if (result.affectedRows > 0) {
        res.send({
          success: true,
          message: 'Category has deleted'
        })
      } else {
        res.send({
          success: false,
          message: `Data with id ${id} does't exist`
        })
      }
    })
  },
  getAllCategory: (req, res) => {
    let { search = '', limit = 5, page = 1 } = req.query

    page = (page - 1) * limit
    getAllCategoryModel(search, [limit, page], result => {
      if (page === 0) {
        page = 1
      }
      if (result) {
        const pageInfo = {
          count: 0,
          pages: 0,
          currentPage: page,
          limitPerPage: +limit,
          nextLink: null,
          prevLink: null
        }

        if (result.length) {
          countGetCategoryModel(search, data => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)
            const { pages, currentPage } = pageInfo
            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8080/category?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/category?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }
            res.send({
              success: true,
              message: 'List of category',
              data: result,
              pageInfo
            })
          })
        } else {
          res.send({
            success: false,
            message: 'Data not found'
          })
        }
      }
    })
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params
      const { name } = req.body
      const data = await categorySchema.validateAsync({ name })
      updateCategoryModel(id, data, result => {
        if (result.affectedRows > 0) {
          res.send({
            success: true,
            message: 'Data updated',
            data: { id, name }
          })
        } else {
          res.send({
            success: false,
            message: `Data with id ${id} does't exist`
          })
        }
      })
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  }
}
