const model = require('../models/public')
const { getItemModel, searchItemModel } = require('../models/items')
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
  }
}
