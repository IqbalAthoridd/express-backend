const { getItemModel, searchItemModel, countGetItemModel } = require('../models/items')
const { listData } = require('../helpers/database_query')
const { response } = require('../helpers/response')
const { pagination } = require('../helpers/pagination')

module.exports = {
  newProducts: async (req, res) => {
    const limit = 15
    const offset = 0
    const item = [['%' + '' + '%'], limit, offset]
    const searchKey = 'name'
    const sort = ['create_at', 'DESC']
    const data = await searchItemModel(searchKey, sort, item)
    if (data) {
      res.send({ succes: true, message: 'New Items', data: data })
    } else {
      response(res, 'data not found')
    }
  },
  detailProduct: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getItemModel(id)
      result.length
        ? response(res, 'Product', { data: result })
        : response(res, 'internal server error', {}, false, 500)
    } catch (error) {

    }
  },
  pupularProduct: async (req, res) => {
    const limit = 15
    const offset = 0
    const item = [['%' + '' + '%'], limit, offset]
    const searchKey = 'name'
    const sort = ['ratings', 'DESC']
    const data = await searchItemModel(searchKey, sort, item)
    if (data) {
      res.send({ succes: true, message: 'New Items', data: data })
    }
  },
  categoryList: async (req, res) => {
    const sortTo = 'ASC'
    const table = 'categories'
    const limit = 200
    const offset = 0
    const data = [
      [table],
      ['%' + '' + '%'],
      [+limit],
      [offset]
    ]
    const result = await listData(data, sortTo)
    if (result.length) {
      response(res, 'Category list', { data: result })
    } else {
      response(res, 'Failed', {}, false, 400)
    }
  },
  searchCategory: async (req, res) => {
    const { page = 1, limit = 5, sortBy } = req.query
    const { name } = req.params
    console.log(name)

    const searchKey = 'category'
    const searchValue = name
    let sortName = ''
    let sortValue = name

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
  }

}
