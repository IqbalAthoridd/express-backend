const qs = require('querystring')
const { pagination } = require('../helpers/pagination')
const { response } = require('../helpers/response')
const { upload2 } = require('../helpers/init_multer')

const { categorySchema } = require('../helpers/validation_schema')

const {
  getAllCategoryModel,
  countGetCategoryModel
} = require('../models/category')
const { createData, getDataById, deleteDataById, updateData } = require('../helpers/database_query')
const table = 'categories'

module.exports = {
  createCategory: async (req, res) => {
    upload2(req, res, async (_err) => {
      try {
        _err && response(res, _err.message, {}, false, 400)
        let { path } = req.file
        path = path.replace(/\\/g, '/')
        let data = await categorySchema.validateAsync({ ...req.body })
        data = {
          ...data,
          picture: path
        }
        const { affectedRows } = await createData(table, data)
        affectedRows
          ? response(res, 'Category created!', { data }, true, 201)
          : response(res, 'Failed Created!', {}, false, 400)
      } catch (err) {
        err.isJoi === true && response(res, err.message, false, 400)
      }
    })
  },
  getCategory: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getDataById(table, id)
      result.length
        ? response(res, 'Category found', { data: result })
        : response(res, `Data with id ${id} does't exist`)
    } catch (error) {
      console.log(error)
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params
      const { affectedRows } = await deleteDataById(table, id)
      affectedRows
        ? response(res, 'Data has been deleted')
        : response(res, `Data with id ${id} does't exist`, {}, false, 404)
    } catch (error) {

    }
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
      const data = await categorySchema.validateAsync({ ...req.body })
      const { affectedRows } = await updateData(table, id, data)
      affectedRows
        ? response(res, 'Category updated!')
        : response(res, `Category with id ${id} does't exist`, {}, false, 404)
    } catch (err) {
      err.isJoi === true && response(res, err.message, false, 400)
    }
  }
}
