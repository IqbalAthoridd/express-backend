const { pagination } = require('../helpers/pagination')
const { response } = require('../helpers/response')
const { upload2 } = require('../helpers/init_multer')

const { categorySchema } = require('../helpers/validation_schema')
const { createData, getDataById, deleteDataById, updateData, listData, countData } = require('../helpers/database_query')
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
  getAllCategory: async (req, res) => {
    const { search = '', sortTo = 'ASC', limit = 5, page = 1 } = req.query
    const offset = (page - 1) * limit
    const data = [
      [table],
      ['%' + search + '%'],
      [+limit],
      [offset]
    ]
    const result = await listData(data, sortTo)
    if (result.length) {
      const data = await countData([[table], ['%' + search + '%']])
      const { count } = data[0]
      const pageInfo = await pagination(req.query, page, limit, count)
      response(res, 'List of Category', { data: result, pageInfo })
    } else {
      response(res, 'Data not found', {}, false, 404)
    }
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
