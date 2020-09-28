const model = require('../models/public')
const { getItemModel } = require('../models/items')
const { response } = require('../helpers/response')

module.exports = {
  newProducts: async (req, res) => {
    const data = await model.newProduct()
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
