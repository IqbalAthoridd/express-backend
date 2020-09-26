
const qs = require('querystring')
const { upload } = require('../helpers/init_multer')
const { createItemSchema, updatePartialsSchema } = require('../helpers/validation_schema')
const { response } = require('../helpers/response')

const {
  getItemModel,
  createItemModel,
  updateItemModel,
  deleteItemModel,
  searchItemModel,
  countGetItemModel,
  createImageModel
} = require('../models/items')

module.exports = {
  createItem: async (req, res) => {
    upload(req, res, async (_err) => {
      try {
        _err && response(res, _err.message, {}, false, 400)
        const data = await createItemSchema.validateAsync({ ...req.body })
        const result = await await createItemModel(data)

        if (result.affectedRows) {
          const images = req.files.map(data => {
            return [result.insertId, data.path.replace(/\\/g, '/')]
          })
          const { affectedRows } = await createImageModel(images, result.insertId)

          affectedRows
            ? response(res, 'item has been cretaed', { data: { id: result.id, ...req.body } })
            : response(res, 'Internal Server Error', {}, false, 500)
        } else {
          response(res, 'Internal Server Error', {}, false, 500)
        }
      } catch (err) {
        err.isJoi === true && response(res, err.message, false, 400)
      }
    })
  },

  getDetailItem: async (req, res) => {
    const { id } = req.params

    const result = await getItemModel(id)

    result.length
      ? response(res, 'Data', { data: result })
      : response(res, "Data does't exist", {}, false, 404)
  },
  getItem: async (req, res) => {
    let { page, limit, search, sortBy, sortTo = 'ASC', sortTime, price = 0 } = req.query
    let searchKey = ''
    let searchValue = ''
    let sortName = ''
    let sortValue = ''

    if (price === '') {
      price = 0
    }

    if (sortTime === undefined) {
      sortTime = ''
    } else {
      sortTime = `ORDER BY create_at ${sortTime}`
    }

    if (typeof sortBy === 'object') {
      sortName = Object.keys(sortBy)[0]
      sortValue = Object.values(sortBy)[0]
    }

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit

    let sort = `HAVING ${sortName} = ${sortValue}`
    if (sortBy === undefined) {
      sort = ''
    }

    const result = await searchItemModel([searchKey, searchValue], [limit, offset], sort, sortTo,
      sortTime, price)
    if (result) {
      const pageInfo = {
        count: 0,
        pages: 0,
        currentPage: page,
        limitPerPage: limit,
        nextLink: null,
        prevLink: null
      }
      if (result.length) {
        const data = await countGetItemModel([searchKey, searchValue], sort)
        const { count } = data[0]
        pageInfo.count = count
        pageInfo.pages = Math.ceil(count / limit)
        const { pages, currentPage } = pageInfo
        if (currentPage < pages) {
          pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
        }

        if (currentPage > 1) {
          pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
        }
        res.send({
          success: true,
          message: 'List of item',
          data: result,
          pageInfo
        })
      } else {
        res.send({
          success: false,
          message: 'Data not found'
        })
      }
    } else {
      res.status(500).send({
        success: false,
        messgae: 'Internal Server Error'
      })
    }
  },
  updateItem: async (req, res) => {
    try {
      const { id } = req.params
      const data = await createItemSchema.validateAsync({ ...req.body })
      const dataResult = await getItemModel(id)
      if (dataResult.length) {
        const result = await updateItemModel(id, data)
        result.affectedRows
          ? response(res, 'Data updated !')
          : response(res, 'Failed to update', {}, false, 500)
      } else {
        response(res, `Data with id ${id} does't exist`, {}, false, 404)
      }
    } catch (err) {
      err.isJoi === true && response(res, err.message, false, 400)
    }
  },
  updatePatrialItem: async (req, res) => {
    try {
      const { id } = req.params
      const data = await updatePartialsSchema.validateAsync({ ...req.body })
      const result = await getItemModel(id)
      if (result.length) {
        const update = await updateItemModel(id, data)
        update.affectedRows
          ? response(res, 'Data updated !')
          : response(res, 'Failed to update', {}, false, 500)
      } else {
        response(res, `Data with id ${id} does't exist`, {}, false, 404)
      }
    } catch (err) {
      err.isJoi === true && response(res, err.message, false, 400)
    }
  },

  deleteItem: async (req, res) => {
    const { id } = req.params
    const dataResult = await getItemModel(id)

    if (dataResult.length) {
      const result = await deleteItemModel(id)
      result.affectedRow
        ? response(res, 'data has been deleted')
        : response(res, 'Failed to delete', {}, false, 400)
    } else {
      response(res, `Data with id ${id} does't exist`, false, 404)
    }
  }
}
