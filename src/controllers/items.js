
const { createItemSchema, updatePartialsSchema } = require('../helpers/validation_schema')
const { response } = require('../helpers/response')
const { pagination } = require('../helpers/pagination')
const table = 'products'

const {
  getItemModel,
  createItemModel,
  deleteItemModel,
  searchItemModel,
  countGetItemModel,
  createImageModel
} = require('../models/items')
const { createData, updateData, getDataById, updateDataPart } = require('../helpers/database_query')

module.exports = {
  createItem: async (req, res) => {
    try {
      req.files.length === 0 && response(res, 'at least 1 picture uploded', {}, false, 400)
      const { userid } = req.payload
      const data = await createItemSchema.validateAsync({ ...req.body })
      const { colorName, hexcode, ...itemsData } = data
      const result = await await createItemModel({ ...itemsData, user_id: userid })
      if (result.affectedRows) {
        const colors = await createData('product_colors', { product_id: result.insertId, name: colorName, hexcode })
        const images = req.files.map(data => {
          return [result.insertId, data.path.replace(/\\/g, '/')]
        })
        const { affectedRows } = await createImageModel(images, result.insertId)

        affectedRows && colors.affectedRows
          ? response(res, 'item has been cretaed', { data: { id: result.id, ...req.body } })
          : response(res, 'Internal Server Error', {}, false, 500)
      } else {
        response(res, 'Internal Server Error', {}, false, 500)
      }
    } catch (err) {
      err.isJoi === true && response(res, err.message, false, 400)
    }
  },

  getDetailItem: async (req, res) => {
    const { id } = req.params

    const result = await getItemModel(id)

    result.length
      ? response(res, 'Data', { data: result })
      : response(res, "Data does't exist", {}, false, 404)
  },
  getItem: async (req, res) => {
    const { page = 1, limit = 5, search, sortBy } = req.query

    let searchKey = ''
    let searchValue = ''
    let sortName = ''
    let sortValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }

    if (typeof sortBy === 'object') {
      sortName = Object.keys(sortBy)[0]
      sortValue = Object.values(sortBy)[0]
    } else {
      sortName = 'creat_at'
      sortValue = 'ASC'
    }

    const offset = (page - 1) * limit

    const data = [
      ['%' + searchValue + '%'],
      +limit,
      offset
    ]

    const result = await searchItemModel(searchKey, [sortName, sortValue], data)
    if (result.length) {
      const data = await countGetItemModel([searchKey, searchValue])
      const { count } = data[0]
      const pageInfo = await pagination(req.query, page, limit, count)
      response(res, 'List of Products', { data: result, pageInfo })
    } else {
      response(res, 'Data not found', {}, false, 404)
    }
  },
  updateItem: async (req, res) => {
    try {
      const { id } = req.params
      const data = await createItemSchema.validateAsync({ ...req.body })
      const { colorName, hexcode, name, price, description, quantity, condition_id, category_id } = data
      const dataResult = await getItemModel(id)
      if (dataResult.length) {
        const colors = await updateData('product_colors', id, { name: colorName, hexcode })
        const result = await updateData(table, id, { name, price, description, quantity, condition_id, category_id })
        result.affectedRows && colors.affectedRows
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
      // const { colorName, hexcode,name,price,description,condition_id,category_id } = req.body
      const data = await updatePartialsSchema.validateAsync({ ...req.body })
      const result = await getDataById(table, { id })
      if (result.length) {
        let colors = {}
        if (data.colorName === undefined) {
          colors = await updateDataPart('product_colors', { product_id: id }, { hexcode: data.hexcode })
        } else if (data.hexcode === undefined) {
          colors = await updateDataPart('product_colors', { product_id: id }, { name: data.colorName })
        } else {
          colors = await updateDataPart('product_colors', { product_id: id }, { name: data.colorName, hexcode: data.hexcode })
        }
        let update = {}

        if (data.colorName === undefined && data.hexcode === undefined) {
          update = await updateData(table, id, data)
        } else {
          delete data.colorName
          delete data.hexcode
          update = await updateData(table, id, data)
        }

        update.affectedRows || colors.affectedRows
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
      result.affectedRows
        ? response(res, 'data has been deleted')
        : response(res, 'Failed to delete', {}, false, 400)
    } else {
      response(res, `Data with id ${id} does't exist`, false, 404)
    }
  }
}
