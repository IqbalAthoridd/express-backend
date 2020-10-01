const model = require('../models/public')
const { getItemModel, searchItemModel } = require('../models/items')
const { listData } = require('../helpers/database_query')
const { response } = require('../helpers/response')

module.exports = {
  newProducts: async (req, res) => {
    const limit = 15
    const offset = 2
    const item = [['%' + '' + '%'], limit, offset]
    const searchKey = 'name'
    const sort = ['create_at', 'DESC']
    const data = await searchItemModel(searchKey, sort, item)
    if (data) {
      res.send({ succes: true, message: 'New Items', data: data })
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
  categoryList: async (req, res) => {
    const page = 1
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
  }

}
